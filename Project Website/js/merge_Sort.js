/* 
	Author:					Sean Smith & Feargal Karney 
	Date of creation:		09/03/2013
	Date of modification:	19/03/2013
 */

/* 
	Name: 		graphical_Application
	
	Operations:	1) create array of 16 objects
				2) set height and width of application
				3) display rectangles in random order 
				4) perform merge sort
				5) disable program after completion
*/

function graphical_Application(id, w, h){
			
	this.width = w;
	this.height = h;
		
	this.graphical_Switch = d3.select(id).transition();

	this.current_Element = 0;
	this.element_Array = new Array();
			
	for(var index = 0; index < 16; index++){
				
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
		
	this.merge_Sort(); 
	
	this.activate_Sort = false;
}

/*
	Name: 		reset_Merge_Button
	
	Operations:	1) initialise new rectangle array
				2) display new randomised elements
				3) enable merge sort
				4) enable start button  
				5) halt process
*/
graphical_Application.prototype.reset_Merge_Button = function(){
		
	this.frame_Work = new Array();
	this.current_Element = 0;
								
	this.randomise_Elements();
	this.display_Rectangles();
	this.merge_Sort();
	
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
			
	this.merge_Program;
			
	this.frame_Work.push(function(){    
			
		initialise().each("end", function(element){
					
			if(element != merge_Program.frame_Work.length && merge_Program.activate_Sort){
								
				merge_Program.frame_Work[element](element);
				return;
			}
			else
				return;
			
		}.bind(null, merge_Program.current_Element++));
	});
}

/*
	Name: 		merge_Sort
	
	Operations:	1) divide areas of application to sort
				2) remove border lines after completion
				3) reactivate border lines if program is reset
*/
graphical_Application.prototype.merge_Sort = function(){

	var count = 2;
	
	while(count <= 16){
	
		this.sort_Area(count);
		count *= 2;
	}
	
	this.left_Side = null;
	this.right_Side = null;
	
	d3.select("#left_Side").remove();
    d3.select("#right_Side").remove();  
}

/*
	Name: 		sort_Area
	
	Operations:	1) display border between specified arguments
				2) merge elements between specified arguments
*/
graphical_Application.prototype.sort_Area = function(number){
	
	for(var index_1 = 0; index_1 < this.element_Array.length; index_1 += number){
		
		this.display_Border(index_1, index_1 + number);
		this.merge(index_1, index_1 + (number-1));
	}
}

/*
	Name: 		merge
	
	Operations:	1) assign colour to selected element
				2) continue comparisons until previous element is greater than selected element
				3) push smaller element onto array to be transitioned
				4) move all newly assigned indexes to correct positions
*/
graphical_Application.prototype.merge = function(start, end){

	for (var index = start; index < end; index++) {
		
		var next_Position = index + 1;	
		var moved_Element = new Array();		
		
		this.update_Selected_Element(this.element_Array[next_Position].id);
		var temporary = this.element_Array[next_Position];
	
		while (next_Position != start && temporary.value > this.element_Array[next_Position-1].value) {
				
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
