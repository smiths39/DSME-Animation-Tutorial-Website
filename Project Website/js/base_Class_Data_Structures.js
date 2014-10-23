/* 
	Author:					Sean Smith & Feargal Karney 
	Date of creation:		10/03/2013
	Date of modification:	19/03/2013
 */

var data_Array = new Array();
 
/* 
	Name: 		animation
	
	Functions:	1) stack
				2) queue
				3) linkedList
				
	Operations:	1) initialise a node for the data structure
				2) initialise a data structure with a head value of null
*/
data_Array.animation = {
  
    Node : function(node_Key, element) {
	
        this.node_Key = node_Key;
        this.element = element;
        this.next_Node = null;
        this.size = 1;
    },

    structure : function() {
	
        this.head_Node = null;
    }
}

/* 
	Name: 		insert
	
	Functions:	1) stack
				2) queue
				3) linkedList
				
	Operations:	1) insert a node into the data structure
				2) newly inserted node becomes the head node
*/
data_Array.animation.structure.prototype.insert = function(node_Key, element) {

    this.head_Node = this.insert_Node(this.head_Node, node_Key, element);
}

/* 
	Name: 		insert_Node
	
	Functions:	1) stack
				2) queue
				3) linkedList
				
	Operations:	1) place a node into the next location of the data structure
				2) obtain size of data structure after insertion
*/
data_Array.animation.structure.prototype.insert_Node = function(selected_Node, node_Key, element) {
    
	if (selected_Node == null) 
        return new data_Array.animation.Node(node_Key, element);
		
    selected_Node.next_Node = this.insert_Node(selected_Node.next_Node, node_Key, element);

    selected_Node.size = this.amount(selected_Node);

    return selected_Node;
}

/* 
	Name: 		size_Count
	
	Functions:	1) stack
				2) queue
				3) linkedList
				
	Operations:	1) obtain size of data structure 
*/
data_Array.animation.structure.prototype.size_Count = function () {

    return this.amount(this.head_Node);
}

/* 
	Name: 		amount
	
	Functions:	1) stack
				2) queue
				3) linkedList
				
	Operations:	1) obtain size of data structure based on selected node
*/
data_Array.animation.structure.prototype.amount = function(selected_Node) {

    if(selected_Node == null)
		return 0;
	else if(selected_Node.next_Node == null)
		return 0;
	
	return 1 + this.amount(selected_Node.next_Node);
}

/* 
	Name: 		construct_Animation
	
	Functions:	1) stack
				2) queue
				3) linkedList
				
	Operations:	1) construct animation to be displayed on the canvas
				2) clear canvas when nodes are removed 
				3) define measurements
				4) initialise construction of node
*/
data_Array.animation.structure.prototype.construct_Animation = function (foreground_Colour, background_Colour, width, height) {
 
    foreground_Colour.clearRect(0, 0, width, height);
    background_Colour.clearRect(0, 0, width, height);

	var minimum_X = width * 0.3;
    var maximum_X = width - minimum_X;
    var minimum_Y = height * 0.1;
	var maximum_Y = 250/this.size_Count();

    background_Colour.beginPath();
    this.construct_Node(foreground_Colour, background_Colour, this.head_Node, minimum_X, maximum_X, minimum_Y, maximum_Y);
    background_Colour.closePath();
}

/* 
	Name: 		construct_Node
	
	Functions:	1) stack
				2) queue
				3) linkedList
				
	Operations:	1) define spacial placement of extending nodes
				2) define graphical animation of node  
				3) define style and positioning of text within nodes
				4) initialise construction of next node to be inserted
*/
data_Array.animation.structure.prototype.construct_Node = function (foreground_Colour, background_Colour, selected_Node, minimum_X, maximum_X, minimum_Y, maximum_Y) {

    var node_Placement = minimum_X + (maximum_X - minimum_X) * this.node_Value(selected_Node);
    var node_Space = (maximum_X + minimum_X) / 15;
	
    foreground_Colour.beginPath();
    foreground_Colour.rect(node_Space, minimum_Y, 80, 60);
	foreground_Colour.fillStyle = "white";
    foreground_Colour.fill();
    foreground_Colour.stroke();
    foreground_Colour.font = '15px tahoma';
	foreground_Colour.fillStyle = "black";
    foreground_Colour.fillText(selected_Node.node_Key, (node_Space - selected_Node.node_Key.toString().length) + 40, minimum_Y + 40);
	foreground_Colour.textAlign = "center";

    background_Colour.stroke();
    foreground_Colour.closePath();

    if (selected_Node.next_Node != null) {
	
        background_Colour.beginPath();
		
		/* NOTE: addition of 1000 increments the size space of next inserted node */
        this.construct_Node(foreground_Colour, background_Colour, selected_Node.next_Node, node_Placement, ((minimum_X + 1000) + maximum_X), minimum_Y, maximum_Y);
		
		background_Colour.closePath();
    }
}

/* 
	Name: 		node_Value
	
	Functions:	1) stack
				2) queue
				3) linkedList
				
	Operations:	1) notify if null node is present
*/
data_Array.animation.structure.prototype.node_Value = function(selected_Node) {
  
	if(selected_Node.next_Node == null)
		return null;
	else
		return 0;
}

/*	
	Name:		create_Data_Structure
	
	Functions:	1) stack
				2) queue
				3) linkedList
				
	Operations: 1) create a data structure based on previously defined functions
*/
function create_Data_Structure() {

        return new data_Array.animation.structure();
}