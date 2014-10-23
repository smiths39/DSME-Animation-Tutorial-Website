/* 
	Author:					Sean Smith & Feargal Karney 
	Date of creation:		14/03/2013
	Date of modification:	17/03/2013
*/

var foreground_Canvas = "";
var background_Canvas = "";

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
	
	Operations: 1) permit user input and connect values to animation
				2) clear canvas of all elements and construct a new Binary Search Tree
*/
function user_Control() {

    $('#comparison_Key').keyup(function() {
        var new_BST = user_Input(create_BST(), $(this).val());
        new_BST.construct_Animation(foreground_Colour, background_Colour, foreground_Canvas.width, foreground_Canvas.height);
    });

    $('#clear').click(function() {
	        $('#comparison_Key').val('');
        var new_BST = create_BST();
		  new_BST.construct_Animation(foreground_Colour, background_Colour, foreground_Canvas.width, foreground_Canvas.height);
    });

    
}

/*	
	Name:		user_Input
	
	Operations: 1) check comma is present between each inserted element
				2) insert numeric value into Binary Search Tree
*/
function user_Input(new_BST, element) {

    var input_Range = element.split(',');
	
    for (var index = 0; index < input_Range.length; index++) 
        new_BST.insert_Tree(parseInt(input_Range[index], 0));
    
    return new_BST;
}

/*	
	Name:		create_BST
	
	Operations: 1) create a Binary Search Tree based on previously defined functions
*/
function create_BST() {

        return new tree.animation.bst();
}