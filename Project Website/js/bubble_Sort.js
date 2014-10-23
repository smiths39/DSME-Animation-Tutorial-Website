/* 
	Author:					Sean Smith & Feargal Karney 
	Date of creation:		06/03/2013
	Date of modification:	19/03/2013
*/

/* 
	Name: 		graphical_Application
	
	Operations:	1) create array of 15 objects
				2) set height and width of application
				3) display rectangles in random order 
				4) perform bubble sorting
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
		
	this.bubble_Sort(); 
	
	this.activate_Sort = false;
}

/*
	Name: 		reset_Button
	
	Operations:	1) initialise new rectangle array
				2) display new randomised elements
				3) enable bubble sort
				4) enable start button  
				5) halt process
*/
graphical_Application.prototype.reset_Bubble_Button = function(){
	
	this.frame_Work = new Array();
	this.current_Element = 0;
								
	this.randomise_Elements();
	this.display_Rectangles();
	this.display_Rectangles();
	this.bubble_Sort();
	
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
			
	this.bubble_Program;
			
	this.frame_Work.push(function(){    
			
		initialise().each("end", function(element){
					
			if(element != bubble_Program.frame_Work.length && bubble_Program.activate_Sort){
								
				bubble_Program.frame_Work[element](element);
				return;
			}
			else
				return;
			
		}.bind(null, bubble_Program.current_Element++));
	});
}

/*
	Name: 		bubble_Sort
	
	Operations:	1) change values if selected rectangle is less than the next rectangle
				2) swap rectangles
				3) swap values
				4) update display with correctly assigned colours
*/
graphical_Application.prototype.bubble_Sort = function() {

	for(var index_1 = 0; index_1 < this.element_Array.length - 1; index_1++){
	
		var exclude_Last = this.element_Array.length - index_1 - 1;
		
		for(var index_2 = 0; index_2 < exclude_Last; index_2++){
		
			if(this.element_Array[index_2 + 1].value > this.element_Array[index_2].value){
				
				this.switch_Rectangles(index_2, this.element_Array[index_2].id, this.element_Array[index_2 + 1].id);
				this.swap(index_2, index_2 + 1);
			}
			else
				this.unswap_Rectangles(this.element_Array[index_2].id, this.element_Array[index_2 + 1].id);
		}
		
		this.update_Sorted_Rectangle(index_1);
	}
}
			
/*
	Name: 		switch_Rectangles
	
	Operations:	1) assign correct colour to both rectangles being swapped 
				2) transition initial element and selected element to opposite locations 
				3) initialise appropriate transition speed
				4) assign colour to unsorted elements
*/
graphical_Application.prototype.switch_Rectangles = function(index, rectangle_1, rectangle_2) {

	this.create_Frame_Work(function(){
	
		d3.select("#" + rectangle_1).attr("fill", graphical_Application.check_Colour);
		d3.select("#" + rectangle_2).attr("fill", graphical_Application.check_Colour);     
		
		d3.select("#" + rectangle_1).transition()
									.duration(450)
									.attr("x", (index + 1) * 40)
									.each("end", function(){
															d3.select("#" + rectangle_1).attr("fill", graphical_Application.unsorted_Colour);
															d3.select("#" + rectangle_2).attr("fill", graphical_Application.unsorted_Colour);	
									});
	
		return d3.select("#" + rectangle_2).transition()
										   .duration(450)					   
										   .attr("x", index * 40);
	});
}	

/*
	Name: 		unswap_Rectangles
	
	Operations:	1) assign correct colour to rectangles being compared but not being swapped
				2) initialise appropriate transition speed
				3) assign colour to unsorted elements
*/
graphical_Application.prototype.unswap_Rectangles = function(rectangle_1, rectangle_2) {
			
	this.create_Frame_Work(function(){
	
		d3.select("#" + rectangle_1).attr("fill", graphical_Application.check_Colour);
		d3.select("#" + rectangle_2).attr("fill", graphical_Application.check_Colour);
		
		d3.select("#" + rectangle_1).transition()
									.duration(450)
									.each("end", function(){
															d3.select("#" + rectangle_1).attr("fill", graphical_Application.unsorted_Colour);
															d3.select("#" + rectangle_2).attr("fill", graphical_Application.unsorted_Colour);
									});
			
		return d3.select("#" + rectangle_2).transition();								   
	});  
}   

/*
	Name: 		update_Sorted_Rectangle
	
	Operations:	1) assign sorted colour to last sorted element in array
				2) assign sorted colour to remaining sorted elements in array
*/
graphical_Application.prototype.update_Sorted_Rectangle = function(position) {
		
	this.create_Frame_Work(function(){

		if((this.element_Array.length - 2) == position)
			d3.select("#rect" + (position + 1)).attr("fill", graphical_Application.sorted_Colour);
			
		d3.select("#rect" + position).attr("fill", graphical_Application.sorted_Colour);    
		
		return d3.select("#rect" + position).transition();
			
	}.bind(this, position));     
}   