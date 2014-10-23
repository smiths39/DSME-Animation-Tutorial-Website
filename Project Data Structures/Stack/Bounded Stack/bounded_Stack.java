class bounded_Stack<T>{
	
	private T[] sequence = (T[])(new Object[10000]);
	private int size = 0;
	
	public boolean isEmpty(){
		
		return size == 0;
	}
	
	public int size(){
	
		return size;
	}
	
	public boolean push(T t){
		
		if(size >= sequence.length){
			T[] sequence_2 = (T[])(new Object[sequence.length * 2]);
			System.arraycopy(sequence, 0, sequence_2, 0, sequence.length);
			sequence = sequence_2;
		}
		
		sequence[size] = t;
		size++;
		
		return true;
	}
	
	public T pop(){
		
		if(isEmpty())
			return null;
		else{
			T temp = sequence[size];
			size--;
			
			return temp;
		}
	}
}
	
	