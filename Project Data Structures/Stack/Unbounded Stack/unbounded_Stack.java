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
		
		T temp = head.item;
		head = head.next;
	
		return temp;
	}
	
	public int size(){
		
		Node<T> temp = head;
		int count = 0;
		
		if(temp != null){
			count++;
			temp = temp.next;
		}
		
		return count;
	}
}
	
	