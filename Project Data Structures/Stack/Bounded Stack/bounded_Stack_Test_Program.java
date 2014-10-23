class bounded_Stack_Test_Program{
	
	public static void main(String [] args){
		
		bounded_Stack<String> stack = new bounded_Stack<String>();
		
		System.out.print("Push words onto stack (press CTRL-Z to end): ");
		
		/* Push elements onto stack */
		while(!Console.EndOfFile()){
			String word = Console.readToken();
			stack.push(word);
		}
		
		System.out.println('\n' + "Size of stack: " + stack.size() + '\n');
		
		System.out.println("Pop words off stack" + '\n');

		/* Pop all elements off of stack */
		while(!stack.isEmpty())
			stack.pop();
			
		System.out.println("Size of stack: " + stack.size());
	}
}