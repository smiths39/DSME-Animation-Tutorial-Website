/* 
	Author:					Sean Smith & Feargal Karney 
	Date of creation:		11/03/2013
	Date of modification:	19/03/2013
 */
 
var foreground_Canvas = "";
var background_Canvas = "";

var node_Array = new Array();

var end_Position = 0;
var start_Position = 0;
var position_Counter = 0;

/*	
	Operations: 1) define canvas elements
				2) display width and height appropriately within canvas
				3) establish user control operations
*/
$(document).ready(function() {

    foreground_Canvas = document.getElementById('foreground_Style');
    background_Canvas = document.getElementById('background_Style');

    foreground_Canvas.width = foreground_Canvas.offsetWidth;
	background_Canvas.width = background_Canvas.offsetWidth;
    foreground_Canvas.height = foreground_Canvas.offsetHeight;
	background_Canvas.height = background_Canvas.offsetHeight;

    foreground_Colour = foreground_Canvas.getContext('2d');
    foreground_Colour = foreground_Canvas.getContext('2d');
    background_Colour = background_Canvas.getContext('2d');

    user_Control();
});

/*	
	Name:		user_Control
	
	Operations: 1) permit push ability and connect input values to animation
				2) construct enable and disable button settings
				3) construct node animation upon push call
				4) clear canvas and recreate Stack with removal of node upon pop call
*/
function user_Control() {

    $('#push_Key').click(function() {
		
		var value = document.getElementById('value').value;

		node_Array[end_Position] = value;
			
		end_Position++;   
		position_Counter++;
		
		set_Removal_Button(position_Counter);
		
		var new_Stack = stack_Input(create_Data_Structure(), node_Array[end_Position]);
        new_Stack.construct_Animation(foreground_Colour, background_Colour, foreground_Canvas.width, foreground_Canvas.height);
    });

    $('#pop_Key').click(function() {

		position_Counter--;
		end_Position--;
		
		set_Removal_Button(position_Counter);
		
		var new_Stack = stack_Input(create_Data_Structure(), node_Array[end_Position]);
		new_Stack.construct_Animation(foreground_Colour, background_Colour, foreground_Canvas.width, foreground_Canvas.height);
			
    });
}

/*	
	Name:		set_Removal_Button
	
	Operations: 1) disable pop if no elements within stack, otherwise enable 
				2) disable push if seven elements within stack, otherwise enable
*/
function set_Removal_Button(position_Counter){

	if(position_Counter != 0)
		$('#pop_Key').removeAttr("disabled");
	else
		$('#pop_Key').attr("disabled", "disabled");
	
	if(position_Counter == 7)
		$('#push_Key').attr("disabled", "disabled");
	else
		$('#push_Key').removeAttr("disabled");
	
}

/*	
	Name:		stack_Input
	
	Operations: 1) insert numeric value into Stack
*/
function stack_Input(new_Stack, element) {
	
    for (var index = start_Position; index < end_Position; index++) 
        new_Stack.insert(parseInt(node_Array[index], 0));
    
    return new_Stack;
}

