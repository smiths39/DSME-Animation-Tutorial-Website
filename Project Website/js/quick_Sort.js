/* 
	Author:					Sean Smith & Feargal Karney 
	Date of creation:		08/03/2013
	Date of modification:	19/03/2013
 */

/* 
	Name: 		graphical_Application
	
	Operations:	1) create array of 15 objects
				2) set height and width of application
				3) display rectangles in random order 
				4) perform quick sort
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
			
    this.randomise_Elements();
    this.display_Rectangles();
    
    this.frame_Work = new Array();
	
    this.create_Frame_Work(function(){
        return d3.select(id).transition();
    });
	
    this.quick_Sort(); 
	
    this.activate_Sort = false;
}

/*
	Name: 		reset_Quick_Button

	Operations:	1) initialise new rectangle array
				2) display new randomised elements	
				3) enable quick sort
				4) enable start button  
				5) halt process
*/
graphical_Application.prototype.reset_Quick_Button = function(){
		
	this.frame_Work = new Array();
	this.current_Element = 0;
								
	this.randomise_Elements();
	this.display_Rectangles();
	this.quick_Sort();
		
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
    
	var quick_program = this; 
	
    this.frame_Work.push(function(){     
	
		initialise().each("end", function(element){
		
            if(element != quick_program.frame_Work.length && quick_program.activate_Sort){
                
				quick_program.frame_Work[element](element);
                return;
            }
			else
				return;
        }.bind(null, quick_program.current_Element++));
    });
}

/*
	Name: 		quick_Sort
	
	Operations:	1) sort entire array
				2) remove border lines after completion
				3) reactivate border lines if program is reset
*/
graphical_Application.prototype.quick_Sort = function(){

    this.sorting(0, this.element_Array.length);

    d3.select("#left_Side").remove();
    d3.select("#right_Side").remove();  
	
	this.left_Side = null;
	this.right_Side = null;
}

/* 
	Name: 		sorting
		
	Operations:	1) display border lines
				2) activate pivot to be selected 
				3) push contained elements onto an array to hold exchanged values
				4) assign colour to element higher than pivot
				5) swap rectangles
				6) swap values
				7) assign colour to element lower than pivot
				8) swap border locations
				9) assign correct colour to element that is sorted
				10) perform recursion
*/
graphical_Application.prototype.sorting = function(left_Borderline, right_Borderline){
    
	if(left_Borderline < right_Borderline){ 
	
        this.display_Border(left_Borderline, right_Borderline);

        this.initialise_Pivot(this.element_Array[left_Borderline].id);
        var start_Border = left_Borderline;
        
        var exchanged = new Array();
		
        for(var index = left_Borderline + 1; index < right_Borderline; index++){ 
            
            exchanged.push(this.element_Array[index]);
			
            if(this.element_Array[left_Borderline].value < this.element_Array[index].value){ 
                
				start_Border++;
			
                this.initialise_High_Pivot(this.element_Array[index].id);
                this.swap_Rectangles(index, start_Border, this.element_Array[index].id, this.element_Array[start_Border].id);
                this.swap(start_Border, index);
                
            }
			else
                this.initialise_Low_Pivot(this.element_Array[index].id);
        }
        
        this.swap_Rectangles(left_Borderline, start_Border, this.element_Array[left_Borderline].id, this.element_Array[start_Border].id);
        this.swap(start_Border, left_Borderline);      
        
        this.update_Sorted_Element(start_Border);
        this.initialise_New_Colours(exchanged);

        this.sorting(left_Borderline, start_Border);
        this.sorting(start_Border + 1, right_Borderline);
    }    
}

/*
	Name: 		initialise_Pivot
	
	Operations:	1) assign colour to selected pivot
*/
graphical_Application.prototype.initialise_Pivot = function(rectangle){

    this.create_Frame_Work(function(){
	
        d3.select("#" + rectangle).attr("fill", graphical_Application.pivot_Colour);
       
	    return d3.select("svg").transition();                          
    });  
}   

/*
	Name: 		initialise_High_Pivot
	
	Operations:	1) assign colour to high pivot
*/
graphical_Application.prototype.initialise_High_Pivot = function(rectangle) {
    
	this.create_Frame_Work(function(){
	
        d3.select("#" + rectangle).attr("fill", graphical_Application.high_Pivot_Colour);
    
		return d3.select("svg").transition();                        
    });  
} 

/*
	Name: 		initialise_Low_Pivot
	
	Operations:	1) assign colour to low pivot
*/
graphical_Application.prototype.initialise_Low_Pivot = function(rectangle){
    
	this.create_Frame_Work(function(){
        
		d3.select("#" + rectangle).attr("fill", graphical_Application.low_Pivot_Colour);
		
		return d3.select("svg").transition();                         
    });  
} 

/*
	Name: 		initialise_New_Colours
	
	Operations:	1) assign colour to all unsorted elements
*/
graphical_Application.prototype.initialise_New_Colours = function(arr){
  
	this.create_Frame_Work(function(){
        
		for(var index = 0; index < arr.length; index++)
            arr[index].rect.attr("fill", graphical_Application.unsorted_Colour);
        
        return d3.select("svg").transition();
                                       
    });     
}

/* BORDER LIMITS */
graphical_Application.prototype.left_Side;
graphical_Application.prototype.right_Side;