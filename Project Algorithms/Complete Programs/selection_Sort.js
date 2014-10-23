/* 
	Author:					Sean Smith & Feargal Karney 
	Date of creation:		04/03/2013
	Date of modification:	19/03/2013
 */

/* 
	Name: 		graphical_Application
	
	Operations:	1) create array of 15 objects
				2) set height and width of application
				3) display rectangles in random order 
				4) perform selection sort
				5) disable program after completion
*/
function graphical_Application(id, w, h){
			
	this.width = w;
	this.height = h;
		
	this.graphical_Switch = d3.select(id).transition();

	this.current_Element = 0;
	this.element_Array = new Array();
			
	for(var index = 0; index < 15; index++){
				
		this.element_Array[index] = new Object();
		this.element_Array[index].id = "rect" + index;
		this.element_Array[index].value = index + 1;
	}        
			
	this.svg = d3.select(id).append("svg");
	this.svg.attr("height", this.height)
			.attr("width", this.width);      
					
	this.randomise_Elements();
	this.display_Rectangles();
						
	this.frame_Work = new Array();
			
	this.create_Frame_Work(function(){
				
		return d3.select(id).transition();
	});
		
	this.selection_Sort(); 

	this.activate_Sort = false;
}

/*
	Name: 		reset_Selection_Button
	
	Operations:	1) initialise new rectangle array
				2) display new randomised elements
				3) enable selection sort
				4) enable start button  
				5) halt process
*/
graphical_Application.prototype.reset_Selection_Button = function(){
		
	this.frame_Work = new Array();
	this.current_Element = 0;
								
	this.randomise_Elements();
	this.display_Rectangles();
	
	this.selection_Sort();
		
	d3.select("#start_Program").attr("disabled", null);
	this.activate_Sort = false;
}

/*
	Name: 		create_Frame_Work
	
	Operations:	1) push function onto array
				2) perform function on each element until the 'end' of array is reached
				3) place element in corresponding index location in the array 
*/
graphical_Application.prototype.create_Frame_Work = function(initialise){
			
	this.selection_Program;	
	
	this.frame_Work.push(function(){    
			
		initialise().each("end", function(element){
					
			if(element != selection_Program.frame_Work.length && selection_Program.activate_Sort){
								
				selection_Program.frame_Work[element](element);
				return;
			}
			else
				return;
			
		}.bind(null, selection_Program.current_Element++));
	});
}

/*
	Name: 		selection_Sort
	
	Operations:	1) initialise a starting maximum value 
				2) change maximum value if a selected value is larger than current maximum value 
				3) swap rectangles 
				4) swap values
				5) update display with correctly assigned colours
*/
graphical_Application.prototype.selection_Sort = function(){

    for (var index_1 = 0; index_1 < this.element_Array.length - 1; index_1++) {
	
        var maximum_Rectangle = index_1;
		
		/* -1 is set as an index to avoid the change of colour of previously transitioned rectangles */
        this.initialise_Maximum(-1, index_1);
		
        for (var index_2 = index_1 + 1; index_2 < this.element_Array.length; index_2++) {
			
            if (this.element_Array[index_2].value > this.element_Array[maximum_Rectangle].value){
			
                this.initialise_Maximum(maximum_Rectangle, index_2);
                maximum_Rectangle = index_2;
            }
        }
		
        this.swap_Rectangles(index_1, maximum_Rectangle, this.element_Array[index_1].id, this.element_Array[maximum_Rectangle].id);
         
		this.swap(index_1, maximum_Rectangle);
		
        this.update_Sorted_Element(index_1);
    } 
}


/*
	Name: 		initialise_Maximum
	
	Operations:	1) if no longer the maximum element, reset to unsorted colour
				2) assign selected colour to new maximum index
*/
graphical_Application.prototype.initialise_Maximum = function(previous_Max, new_Max) {
		
		this.create_Frame_Work(function(previous_Index, new_Index){
        
            d3.select("#" + previous_Index).attr("fill", graphical_Application.unsorted_Colour); 
        
        d3.select("#" + new_Index).attr("fill", graphical_Application.selected_Colour);  
        return d3.select("#" + new_Index).transition();
		 
	/* if (?) else (:) */
    }.bind(null, previous_Max < 0 ? null : this.element_Array[previous_Max].id, this.element_Array[new_Max].id));      
}
