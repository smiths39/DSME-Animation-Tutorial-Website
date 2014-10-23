class bounded_Queue<T>{

	private T[] sequence = (T[])(new Object[10000]);
	private int size = 0;
	private int head = 0;
	private int tail = 0;
	
	public boolean isEmpty(){
	
		return size == 0;
	}
	
	public boolean enq(T t){
	
		if(size >= sequence.length){
		
			T[] sequence_2 = (T[])(new Object[sequence.length * 2]);
			System.arraycopy(sequence, 0, sequence_2, 0, sequence.length);
			sequence = sequence_2;
		}
		
		sequence[tail] = t;
		tail = (tail + 1) % sequence.length;
		size++;
		return true;
	}
	
	public T deq(){
	
		if(isEmpty())
			return null;
		else{
			
			T temp = sequence[head];
			head = (head+1)%sequence.length;
			size--;
			return temp;
		}
	}

	public static void main(String [] args){
	
		bounded_Queue<Integer> queue = new bounded_Queue<Integer>();
		
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