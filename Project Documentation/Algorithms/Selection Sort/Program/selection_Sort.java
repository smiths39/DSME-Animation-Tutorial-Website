class selection_Sort{
	
	private static void swap(int [] selection_Array, int index, int minimum){
	
		int temporary = selection_Array[index];
		selection_Array[index] = selection_Array[minimum];
		selection_Array[minimum] = temporary;
	}
	
	public static void selection(int [] selection_Array, int size){
  
		for(int index_1 = 0; index_1 < size - 1; index_1++){
			int minimum_Index = index_1;
  
			for(int index_2 = index_1 + 1; index_2 < size; index_2++){
  
				if(selection_Array[minimum_Index] > selection_Array[index_2])
					minimum_Index = index_2;
			}
  
			swap(selection_Array, index_1, minimum_Index);
		}
	}
  
  	public static void main(String [] args){
  	
		System.out.print("Enter the number of elements: ");
		int size = Console.readInt();
		
		int [] selection_Array = new int[size];
		
		System.out.print('\n' + "Enter the elements: ");
		
		for(int index_1 = 0; index_1 < size; index_1++){
		
			int element = Console.readInt();
			selection_Array[index_1] = element;
		}
	  
		selection(selection_Array, size);
		
		System.out.print('\n' + "The sorted list is: ");
		
		for(int index_2 = 0; index_2 < size; index_2++)
			System.out.print(selection_Array[index_2] + " ");
	}

}