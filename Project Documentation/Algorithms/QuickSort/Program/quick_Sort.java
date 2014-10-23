class quick_Sort{

	private static void swap(int [] quick_Array, int low, int high){
	
		int temporary = quick_Array[low];
		quick_Array[low] = quick_Array[high];
		quick_Array[high] = temporary;
	}
	
	public static void quick(int [] quick_Array, int low, int high){
	
		int lo = low;
		int hi = high;
  
		if (lo >= hi) 
			return;
		
		int pivot = quick_Array[(lo + hi) / 2];
		
		while (lo < hi) {
		  
			while (quick_Array[lo] < pivot) 
				lo++;
			
			while (quick_Array[hi] > pivot) 
				hi--;
  
			swap(quick_Array, lo, hi);
			
		}
  
		if (hi < lo) {
		
			swap(quick_Array, hi, lo);
		}
  
		int element = lo;
		
		if(lo == low)
			element++;
	
		quick(quick_Array, low, lo);
		quick(quick_Array, element, high);
	}
   
	public static void main(String [] args){
	
		System.out.print("Enter the number of elements: ");
		int size = Console.readInt();
		
		int [] quick_Array = new int[size];
		
		System.out.print('\n' + "Enter the elements: ");
		
		for(int index_1 = 0; index_1 < size; index_1++){
		
			int element = Console.readInt();
			quick_Array[index_1] = element;
		}
	  
		quick(quick_Array, 0, size-1);
		
		System.out.print('\n' + "The sorted list is: ");
		
		for(int index_2 = 0; index_2 < size; index_2++)
			System.out.print(quick_Array[index_2] + " ");
	}
}