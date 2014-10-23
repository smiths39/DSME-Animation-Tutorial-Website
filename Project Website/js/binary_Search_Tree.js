/* 
	Author:					Sean Smith & Feargal Karney 
	Date of creation:		14/03/2013
	Date of modification:	17/03/2013
*/

var tree = new Array();

/* 
	Name: 		animation
	
	Operations:	1) initialise a node for the Binary Tree
				2) initialise a Binary Tree with a root value of null
*/
tree.animation = {
  
    Node : function(node_Key, element) {
	
        this.node_Key = node_Key;
        this.element = element;
        this.left_Side = null;
        this.right_Side = null;
        this.tree_Size = 1;
    },

    bst : function() {
	
        this.root_Node = null;
    }
}

/* 
	Name: 		insert_Tree
	
	Operations:	1) insert a node into the Binary Tree
				2) insert node's corresponding element
*/
tree.animation.bst.prototype.insert_Tree = function(node_Key, element) {

    this.root_Node = this.insert_Node(this.root_Node, node_Key, element);
}

/* 
	Name: 		insert_Node
	
	Operations:	1) place a node into the Binary Tree
				2) assign node to correct subtree
				3) obtain size of Binary Tree after insertion
*/
tree.animation.bst.prototype.insert_Node = function(selected_Node, node_Key, element) {
    
	if (selected_Node == null) 
        return new tree.animation.Node(node_Key, element);

    if (node_Key < selected_Node.node_Key) 
        selected_Node.left_Side = this.insert_Node(selected_Node.left_Side, node_Key, element);
	else if (node_Key > selected_Node.node_Key)
        selected_Node.right_Side = this.insert_Node(selected_Node.right_Side, node_Key, element);
    
    selected_Node.tree_Size = this.height_Value(selected_Node);

    return selected_Node;
}

/* 
	Name: 		tree_Height
	
	Operations:	1) obtain height of Binary Tree
*/
tree.animation.bst.prototype.tree_Height = function () {

    return this.height_Value(this.root_Node);
}

/* 
	Name: 		height_Value
	
	Operations:	1) obtain size of Binary Tree
*/
tree.animation.bst.prototype.height_Value = function(selected_Node) {
  
	if(selected_Node == null)
		return 0;
	else if(selected_Node.left_Side == null && selected_Node.right_Side == null)
		return 0;
	
	return this.height_Value(selected_Node.left_Side) + 1 + this.height_Value(selected_Node.right_Side);
}
 
/* 
	Name: 		construct_Animation
	
	Operations:	1) construct animation to be displayed on the canvas
				2) clear canvas when nodes are removed 
				3) define measurements
				4) define line colour and size
				4) initialise construction of node
*/
tree.animation.bst.prototype.construct_Animation = function (foreground_Colour, background_Colour, width, height) {
 
    foreground_Colour.clearRect(0, 0, width, height);
    background_Colour.clearRect(0, 0, width, height);

	var minimum_X = width * 0.3;
    var maximum_X = width - minimum_X;
    var minimum_Y = height * 0.1;
	var maximum_Y = 250 / this.tree_Height();

    foreground_Colour.strokeStyle = '#000000';
    background_Colour.strokeStyle = '#000000';
    background_Colour.lineWidth = 6;
	
    background_Colour.beginPath();
    this.construct_Node(foreground_Colour, background_Colour, this.root_Node, minimum_X, maximum_X, minimum_Y, maximum_Y);
    background_Colour.closePath();
}

/* 
	Name: 		construct_Node
	
	Operations:	1) define spacial placement of extending nodes
				2) define graphical animation of node  
				3) define style and positioning of text within nodes
				4) initialise connection of line between nodes
				4) initialise construction of next node to be inserted based on subtree
*/
tree.animation.bst.prototype.construct_Node = function (foreground_Colour, background_Colour, selected_Node, minimum_X, maximum_X, minimum_Y, maximum_Y) {

    var line_Position = minimum_X + (maximum_X - minimum_X) * this.size_Line(selected_Node);
	
    var line_Side = (maximum_X + minimum_X) / 3;
	
    foreground_Colour.beginPath();
    foreground_Colour.arc(line_Side, minimum_Y, 20, 0, Math.PI * 2, true);
	foreground_Colour.fillStyle = "white";
    foreground_Colour.fill();
    foreground_Colour.stroke();

    foreground_Colour.font = '15px tahoma';
	foreground_Colour.fillStyle = "black";
    foreground_Colour.fillText(selected_Node.node_Key, (line_Side - selected_Node.node_Key.toString().length), minimum_Y);
	foreground_Colour.textAlign = "center";

    background_Colour.lineTo(line_Side, minimum_Y);
    background_Colour.stroke();
    foreground_Colour.closePath();
	
    if (selected_Node.left_Side != null) {
	
        background_Colour.beginPath();
        background_Colour.moveTo(line_Side, minimum_Y);
        this.construct_Node(foreground_Colour, background_Colour, selected_Node.left_Side, minimum_X, line_Position, (minimum_Y + maximum_Y), maximum_Y);
		background_Colour.closePath();
    }

    if (selected_Node.right_Side != null) {
	
        background_Colour.beginPath();
        background_Colour.moveTo(line_Side, minimum_Y);
        this.construct_Node(foreground_Colour, background_Colour, selected_Node.right_Side, line_Position, maximum_X, (minimum_Y + maximum_Y), maximum_Y);
		background_Colour.closePath();
    }
}

/* 
	Name: 		size_Line
	
	Operations:	1) notify if empty subtree's are present
				2) calculate value of half Binary Tree size
*/
tree.animation.bst.prototype.size_Line = function(selected_Node) {
  
	if(selected_Node.left_Side == null && selected_Node.right_Side == null)
		return null;
	else
		return this.node_Value(selected_Node.left_Side) / this.node_Value(selected_Node);
}

/* 
	Name: 		node_Value
	
	Operations:	1) return appropriate value of tree size
*/
tree.animation.bst.prototype.node_Value = function(selected_Node) {
	
	if(selected_Node == null)
		return 0;
	else
		return selected_Node.tree_Size;
}