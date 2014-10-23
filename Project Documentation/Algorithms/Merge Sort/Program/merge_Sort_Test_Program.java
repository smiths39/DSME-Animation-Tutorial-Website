class merge_Sort_Test_Program{

	public static int [] readInputArray(){
	
		int [] merge_Array = {80, 32, 56, 37, 69, 76};
		return merge_Array;
	}

	public static void printArray(int [] array){
	
		for(int index = 0; index < array.length; index++)
			System.out.print(array[index] + " , ");
			
		System.out.println("**********************");
	}
	
	public static void main(String [] args){
		
		merge_Sort merge = new merge_Sort();
		
		int [] input_Array = readInputArray();
		
		System.out.println("INPUT ARRAY: ");
		printArray(input_Array);
		
		merge.sort(input_Array);
		
		System.out.println("SORTED ARRAY");
		printArray(input_Array);
	}	
}