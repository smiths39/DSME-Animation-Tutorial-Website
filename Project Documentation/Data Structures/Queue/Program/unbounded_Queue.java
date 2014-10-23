class unbounded_Queue<T>{

	private static class Node<T>{
	
		private T item;
		private Node<T> next = null;
		
		Node(T item0, Node<T> next0){
		
			item = item0;
			next = next0;
		}
	}
	
	private Node<T> head = null;
	private Node<T> tail = null;
	
	public boolean isEmpty(){
	
		return head == null;
	}
	
	public boolean enq(T t){
	
		Node<T> tNode = new Node<T>(t, null);
		
		if(tail != null)
			tail.next = tNode;
		else
			head = tNode;
			
		tail = tNode;
		return true;
	}
	
	public T deq(){
	
		if(isEmpty())
			tail = null;
			
		T temp = head.item;
		head = head.next;
		return temp;
	}
	
	public static void main(String [] args){

		unbounded_Queue<Integer> queue = new unbounded_Queue<Integer>();
		
		System.out.println('\n' + "ADDED TO QUEUE");
		System.out.println("===============");
		
		for(int index = 10; index <= 100; index += 10){
		
			System.out.print(index + " ");
			queue.enq(index);
		}
		
		System.out.println();
		System.out.println('\n' + "REMOVED FROM QUEUE");
		System.out.println("=================");
		
		while(!queue.isEmpty()){
		
			int element = queue.deq();
			System.out.print(element + " ");
		}
	}
}