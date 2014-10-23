/* 
	Author:					Sean Smith & Feargal Karney 
	Date of creation:		19/03/2013
	Date of modification:	19/03/2013
*/

/*
	Name: 		start_Button

	Functions:	1) insertion_Sort
				2) selection_Sort
				3) bubble_Sort
				4) merge_Sort
				5) quick_Sort
				
	Operations:	1) enable start button
				2) activate program
*/
graphical_Application.prototype.start_Button = function(){
		
	d3.select("#start_Program").attr("disabled", null);
	d3.select("#reset_Program").attr("disabled", null);
	this.activate_Sort = true;

	this.frame_Work[this.current_Element](this.current_Element);
}

/*
	Name: 		randomise_Elements
	
	Functions:	1) insertion_Sort
				2) selection_Sort
				3) bubble_Sort
				4) merge_Sort
				5) quick_Sort
				
	Operations:	1) generate random whole (Math.floor) numbers 
				2) swap element into random positions
*/
graphical_Application.prototype.randomise_Elements = function() {
		
	for(var index_1 = 0; index_1 < this.element_Array.length-1; index_1++) {
			
		var index_2 = Math.floor(Math.random() * index_1);
		this.swap(index_2, index_1);
	}
}

/*
	Name: 		swap
	
	Functions:	1) insertion_Sort
				2) selection_Sort
				3) bubble_Sort
				4) merge_Sort
				5) quick_Sort
				
	Operations:	1) swap elements
*/
graphical_Application.prototype.swap = function(a, b){
		
	var temporary = this.element_Array[a];
	this.element_Array[a] = this.element_Array[b];
	this.element_Array[b] = temporary;
}

/*
	Name: 		display_Rectangles
	
	Functions:	1) insertion_Sort
				2) selection_Sort
				3) bubble_Sort
				4) merge_Sort
				5) quick_Sort
	
	Operations:	1) remove all rectangles in previous run
				2) initialise appearance settings on each element contained in array
*/
graphical_Application.prototype.display_Rectangles = function(){
			
	d3.selectAll("rect").remove();
			
	for(index = 0; index < this.element_Array.length; index++){
				
		this.element_Array[index].rect = this.svg.append("rect").attr("id", this.element_Array[index].id)
																.attr("width", 40)
																.attr("fill", graphical_Application.unsorted_Colour)
																.attr("stroke", graphical_Application.outline_Colour)
														
																/* top half of rectangle */
																.attr("height", this.element_Array[index].value*9)
																		
																/* space between each rectangle */
																.attr("x", index * 40)
																		
																/* bottom half of rectangle  */
																.attr("y", this.height - this.element_Array[index].value*9);
	}    
}

/*
	Name: 		update_Position
	
	
	Functions:	1) insertion_Sort
				2) merge_Sort
				
	Operations:	1) ensure transition to correct direction and distance		
*/
graphical_Application.prototype.update_Position = function(array, object_ID) {
			
	this.create_Frame_Work(function(){
				
		for(var index = 0; index < array.length; index++){
				
				
			d3.select(array[index]).transition().attr("x", function(rectangle){
																return parseInt(rectangle.attr("x")) + 40
														   }.bind(null, d3.select(array[index]))
													 );
		}
		
		return d3.select("#" + object_ID).transition().attr("x", function(rectangle){
																	return parseInt(rectangle.attr("x")) - 40 * array.length
																 }.bind(null, d3.select("#" + object_ID))
															);
	});      
}

/*
	Name: 		update_Sorted_Element
	
	Functions:	1) insertion_Sort
				2) selection_Sort
				3) merge_Sort
				4) quick_Sort
	
	Operations:	1) assign colour to sorted element	
*/
graphical_Application.prototype.update_Sorted_Element = function(position) {
		
	this.create_Frame_Work(function(id){
	
		d3.select("#" + id).attr("fill", graphical_Application.sorted_Colour);    
		return d3.select("#rect" + (position)).transition();
			
	}.bind(null, this.element_Array[position].id));     
}   

/*
	Name: 		update_Selected_Element
	
	Functions:	1) insertion_Sort
				2) merge_Sort
	
	Operations:	1) assign colour to selected element	
*/
graphical_Application.prototype.update_Selected_Element = function(id) {
			
	this.create_Frame_Work(function(){
			
		d3.select("#" + id).attr("fill", graphical_Application.selected_Colour);
		return d3.select("svg").transition();								   
	});  
}   

/*
	Name: 		swap_Rectangles
	
	Functions:	1) selection_Sort
				2) quick_Sort

	Operations:	1) assign correct colour to rectangle that remains unsorted
				2) transition maximum element and selected element to opposite locations 
				3) initialise appropriate transition speed
*/
graphical_Application.prototype.swap_Rectangles = function(index, max, index_ID, max_ID) {

    this.create_Frame_Work(function(){
		
        d3.select("#" + index_ID).attr("fill", graphical_Application.unsorted_Colour);
                     
        if(index != max){
	
            d3.select("#" + index_ID).transition()
									 .duration(450)
									 .attr("x", max*40);
									 
            return d3.select("#" + max_ID).transition()
										  .duration(450)
										  .attr("x", index*40);
        }
		else
			return d3.select("#" + index_ID).transition();                  
    });      
}   

/* 
	Name: 		display_Border
		
	Functions:	1) merge_Sort
				2) quick_Sort
				
	Operations:	1) initialise border line to signify beginning of pivot
				2) initialise border line to signify end of pivot
				3) display pivot start border line up to height of application border
				4) display pivot end border line up to height of application border
				5) construct alignments of borders
*/
graphical_Application.prototype.display_Border = function(left_Borderline, right_Borderline) {
   
   this.create_Frame_Work(function(){
       
	   if(this.left_Side == null && this.right_Side == null){
          
			this.left_Side = d3.select("svg").append("line")
											 .attr("id", "left_Side");
					
            this.right_Side = d3.select("svg").append("line")
											  .attr("id", "right_Side");
 
            this.left_Side.attr("y2", this.height);
            this.left_Side.attr("style", "stroke: green; stroke-width: 5");
            
            this.right_Side.attr("y2", this.height); 
            this.right_Side.attr("style", "stroke: green; stroke-width: 5");
        }
        
        this.left_Side.attr("x1", left_Borderline * 40);
        this.left_Side.attr("x2", left_Borderline * 40);
        
        this.right_Side.attr("x1", right_Borderline * 40);
        this.right_Side.attr("x2", right_Borderline * 40);        
        
        return d3.select("svg").transition();
	/* 'this' activates border line */
    }.bind(this));      
}

/*
	Name: 		compare_Elements
	
	Functions:	1) insertion_Sort
				2) merge_Sort
	
	Operations:	1) assign color to element being compared against
				2) initialise appropriate transition speed
				3) assign colour to sorted element
*/
graphical_Application.prototype.compare_Elements = function(id) {
			
	this.create_Frame_Work(function(){
	
		d3.select("#" + id).attr("fill", graphical_Application.check_Colour);
								
	
		d3.select("svg").transition()
						.duration(450)
						.each("end", function(){
									
												d3.select("#" + id).attr("fill", graphical_Application.sorted_Colour);                        
							});
			
		return d3.select("#" + id).transition()
								  .duration(450);								   
	});  
}   


/* APPLICATION COLOURS */
graphical_Application.unsorted_Colour = "#5E9DC8";
graphical_Application.check_Colour = "#D9CCB9";
graphical_Application.sorted_Colour = "#E95D22";
graphical_Application.outline_Colour = "#000000";
graphical_Application.selected_Colour ="#613D2D";
graphical_Application.pivot_Colour = "#613D2D";
graphical_Application.low_Pivot_Colour = "#D9CCB9";
graphical_Application.high_Pivot_Colour = "#CB45CB";

