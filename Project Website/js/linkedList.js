/* 
	Author:					Sean Smith & Feargal Karney 
	Date of creation:		12/03/2013
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
    background_Colour = background_Canvas.getContext('2d');

    user_Control();
});

/*	
	Name:		user_Control
	
	Operations: 1) permit insert ability and connect randomly generated values to animation
				2) construct enable and disable button settings
				3) construct node animation upon optional insertion call
				4) clear canvas and recreate LinkedList with removal of node upon optional removal call
*/
function user_Control() {

    $('#insert_First_Key').click(function() {
	
		var value = document.getElementById('first_Value').value;

		node_Array[end_Position] = value;
		
		for(var index = end_Position; index > start_Position; index--){
		
			var temp = node_Array[index];
			node_Array[index] = node_Array[index-1];
			node_Array[index-1] = temp;
		}
		
		end_Position++;   
		position_Counter++;

		set_Removal_Button(position_Counter);
		
		var new_LinkedList = list_Input(create_Data_Structure(), node_Array[end_Position]);
        new_LinkedList.construct_Animation(foreground_Colour, background_Colour, foreground_Canvas.width, foreground_Canvas.height);		
    });

	$('#insert_Last_Key').click(function() {
	
		var value = document.getElementById('last_Value').value;

		node_Array[end_Position] = value;

		position_Counter++;
		end_Position++;
		
		set_Removal_Button(position_Counter);
		
		var new_LinkedList = list_Input(create_Data_Structure(), node_Array[end_Position]);
        new_LinkedList.construct_Animation(foreground_Colour, background_Colour, foreground_Canvas.width, foreground_Canvas.height);		
    });
	
	$('#insert_Index_Key').click(function(){
	
		var value = document.getElementById('index_Value').value;
		var index = document.getElementById('index_Location').value;
		
		node_Array[end_Position] = value;
		
		for(var i = end_Position; i > index; i--){
			
			var temporary = node_Array[i];
			node_Array[i] = node_Array[i-1];
			node_Array[i-1] = temporary;
		}
		
		end_Position++;
		position_Counter++;
		
		set_Removal_Button(position_Counter);
		
		var new_LinkedList = list_Input(create_Data_Structure(), node_Array[end_Position]);
        new_LinkedList.construct_Animation(foreground_Colour, background_Colour, foreground_Canvas.width, foreground_Canvas.height);	
	});
	
	$('#remove_First_Key').click(function() {
		
		position_Counter--;
		start_Position++;
		
		set_Removal_Button(position_Counter)
		
		var new_LinkedList = list_Input(create_Data_Structure(), node_Array[end_Position]);
        new_LinkedList.construct_Animation(foreground_Colour, background_Colour, foreground_Canvas.width, foreground_Canvas.height);	
    });
	
	$('#remove_Last_Key').click(function() {
	
		position_Counter--;
		end_Position--;
		
		set_Removal_Button(position_Counter)
		
		var new_LinkedList = list_Input(create_Data_Structure(), node_Array[end_Position]);
        new_LinkedList.construct_Animation(foreground_Colour, background_Colour, foreground_Canvas.width, foreground_Canvas.height);	
	});
}

/*	
	Name:		set_Removal_Button
	
	Operations: 1) disable removal ability if no elements within LinkedList, otherwise enable 
				2) disable insertion ability if seven elements within LinkedList, otherwise enable
*/
function set_Removal_Button(position_Counter){

	if(position_Counter != 0){
	
		$('#remove_First_Key').removeAttr("disabled");
		$('#remove_Last_Key').removeAttr("disabled");
	}
	else{
		
		$('#remove_First_Key').attr("disabled", "disabled");
		$('#remove_Last_Key').attr("disabled", "disabled");
	}
	
	if(position_Counter == 7){
	
		$('#insert_First_Key').attr("disabled", "disabled");
		$('#insert_Last_Key').attr("disabled", "disabled");
		$('#insert_Index_Key').attr("disabled", "disabled");
	}
	else{
		
		$('#insert_First_Key').removeAttr("disabled", "disabled");
		$('#insert_Last_Key').removeAttr("disabled", "disabled");
		$('#insert_Index_Key').removeAttr("disabled", "disabled");
	}
}

/*	
	Name:		list_Input
	
	Operations: 1) insert numeric value into LinkedList
*/
function list_Input(new_LinkedList, element) {

    for (var index = start_Position; index < end_Position; index++) 
        new_LinkedList.insert(parseInt(node_Array[index], 0));
   
    return new_LinkedList;
}