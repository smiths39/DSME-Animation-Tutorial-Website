class unbounded_Stack_Test_Program{
	
	public static void main(String [] args){
		
		unbounded_Stack<String> stack = new unbounded_Stack<String>();
		
		System.out.print("Push words onto stack (press CTRL-Z to end): ");
		
		while(!Console.EndOfFile()){
			String word = Console.readToken();
			stack.push(word);
		}
		
		System.out.println('\n' + "Size of stack: " + stack.size() + '\n');
		
		System.out.println("Pop words off stack" + '\n');

		while(!stack.isEmpty())
			stack.pop();
		
		System.out.println("Size of stack: " + stack.size());
	}
}