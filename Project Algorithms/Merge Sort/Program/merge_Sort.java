class merge_Sort{

	public static void sort(int [] input){
	
		mergeSort(input, 0, input.length - 1);
	}
	
    public static void mergeSort(int [] array, int low, int high){
	
		merge_Sort_Test_Program test = new merge_Sort_Test_Program();
		
		if(low < high){
		
			int mid = (low + high)/2;
			mergeSort(array, low, mid);
			mergeSort(array, mid + 1, high);
			merge(array, low, mid, high);
			test.printArray(array);
		}
	}
	
	public static void merge(int [] array, int low, int mid, int high){
		
		int [] temporary = new int[high - low + 1];
		int left = low;
		int right = mid + 1;
		int element = 0;
		
		while(left <= mid && right <= high){
		
			if(array[left] < array[right]){
			
				temporary[element] = array[left];
				left++;
			}
			else{
			
				temporary[element] = array[right];
				right++;
			}
			
			element++;
		}
		
		if(left <= mid){
		
			while(left <= mid){
			
				temporary[element] = array[left];
				left++;
				element++;
			}
		}
		else if(right <= high){
		
			while(right <= high){
			
				temporary[element] = array[right];
				right++;
				element++;
			}
		}
		
		for(int index = 0; index < temporary.length; index++)
			array[index + low] = temporary[index];
	}
}