class bubble_Sort{

	private static void swap(int [] bubble_Array, int a, int b){
	
		int temporary = bubble_Array[a];
		bubble_Array[a] = bubble_Array[b];
		bubble_Array[b] = temporary;
	}
	
	public static void bubble(int [] bubble_Array, int size){
  
		for(int index_1 = 0; index_1 < size; index_1++){
  
			for(int index_2 = 1; index_2 < (size-index_1); index_2++){
 
				if(bubble_Array[index_2-1] > bubble_Array[index_2])
					swap(bubble_Array, index_2-1, index_2);
				
			}
		}
	}
	
	public static void main(String [] args){
  	
		System.out.print("Enter the number of elements: ");
		int size = Console.readInt();
		
		int [] bubble_Array = new int[size];
		
		System.out.print('\n' + "Enter the elements: ");
		
		for(int index_1 = 0; index_1 < size; index_1++){
		
			int element = Console.readInt();
			bubble_Array[index_1] = element;
		}
	  
		bubble(bubble_Array, size);
		
		System.out.print('\n' + "The sorted list is: ");
		
		for(int index_2 = 0; index_2 < size; index_2++)
			System.out.print(bubble_Array[index_2] + " ");
	}

}