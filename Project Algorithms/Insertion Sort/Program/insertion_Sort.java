class insertion_Sort{

	public static void insertion(int [] insert_Array, int size){
  
		for (int i = 1; i < size; i++){
		
			int index = i;
			int element = insert_Array[index];
		  
			while ((index > 0) && (insert_Array[index-1] > element)){
				
				insert_Array[index] = insert_Array[index-1];
				index--;
			}
		 
			insert_Array[index] = element;
		}
	}
  
	public static void main(String [] args){
		
		System.out.print("Enter the number of elements: ");
		int size = Console.readInt();
		
		int [] insert_Array = new int[size];
		
		System.out.print('\n' + "Enter the elements: ");
		
		for(int index_1 = 0; index_1 < size; index_1++){
		
			int element = Console.readInt();
			insert_Array[index_1] = element;
		}
	  
		insertion(insert_Array, size); 
		
		System.out.print('\n' + "The sorted list is: ");
		
		for(int index_2 = 0; index_2 < size; index_2++)
			System.out.print(insert_Array[index_2] + " ");
	}
}