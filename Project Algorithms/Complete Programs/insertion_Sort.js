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
				4) perform insertion sort
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
		this.element_Array[index].value = index + 1;
		this.element_Array[index].id = "rect" + index;
	}        
			
	this.svg = d3.select(id).append("svg");
	this.svg.attr("height", this.height)
			.attr("width", this.width);      
					
	this.randomise_Elements()
	this.display_Rectangles();
			
	this.frame_Work = new Array();
			
	this.create_Frame_Work(function(){
				
		return d3.select(id).transition();
	});
		
	this.insertion_Sort(); 
			
	this.activate_Sort = false;
}

/*
	Name: 		reset_Insertion_Button
	
	Operations:	1) initialise new rectangle array
				2) display new randomised elements
				3) enable insertion sort
				4) enable start button  
				5) halt process
*/
graphical_Application.prototype.reset_Insertion_Button = function(){
		
	this.frame_Work = new Array();
	this.current_Element = 0;
								
	this.randomise_Elements();
	this.display_Rectangles();
	this.insertion_Sort();
		
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
			
	this.insertion_Program;
			
	this.frame_Work.push(function(){    
			
		initialise().each("end", function(element){
					
			if(element != insertion_Program.frame_Work.length && insertion_Program.activate_Sort){
								
				insertion_Program.frame_Work[element](element);
				return;
			}
			else
				return;
			
		}.bind(null, insertion_Program.current_Element++));
	});
}

/*
	Name: 		insertion_Sort
	
	Operations:	1) assign colour to selected element
				2) continue comparisons until previous element is greater than selected element
				3) push smaller element onto array to be transitioned
				4) move all newly assigned indexes to correct positions
*/
graphical_Application.prototype.insertion_Sort = function(){

	for (var index = 0; index < this.element_Array.length - 1; index++) {
			
		var moved_Element = new Array();
		var next_Position = index + 1;
		
		this.update_Selected_Element(this.element_Array[next_Position].id);
		var temporary = this.element_Array[next_Position];
			
		while (next_Position != 0 && temporary.value > this.element_Array[next_Position-1].value) {
			
			moved_Element.push("#" + this.element_Array[next_Position-1].id);
			this.compare_Elements(this.element_Array[next_Position-1].id);
			this.element_Array[next_Position] = this.element_Array[next_Position-1];
				
			next_Position--;
		}
				
		this.element_Array[next_Position] = temporary;   
			
		this.update_Position(moved_Element, temporary.id);
		this.update_Sorted_Element(next_Position);
	}
}