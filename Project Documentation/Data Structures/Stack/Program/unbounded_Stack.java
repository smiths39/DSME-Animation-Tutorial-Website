class unbounded_Stack<T>{
	
	private static class Node<T>{
	
		private T item;
		private Node<T> next = null;
	
		Node(T item0, Node<T> next0){
		
			item = item0;
			next = next0;
		}
	}
	
	private Node<T> head = null;
	
	public boolean isEmpty(){
	
		return head == null;
	}
	
	public boolean push(T t){
	
		head = new Node<T>(t, head);
		return true;
	}
	
	public T pop(){
	
		if(isEmpty())
			return null;
			
		T t = head.item;
		head = head.next;
		
		return t;
	}

	public static void main(String [] args){
	
		unbounded_Stack<Integer> stack = new unbounded_Stack<Integer>();
		
		System.out.println('\n' + "ELEMENTS");
		System.out.println("===============");
		
		for(int index = 10; index <= 100; index += 10){
		
			System.out.print(index + " ");
			stack.push(index);
		}
		
		System.out.println();
		System.out.println('\n' + "REVERSED ELEMENTS");
		System.out.println("=================");
		
		while(!stack.isEmpty()){
			
			System.out.print(stack.pop() + " ");
		}
	}
}