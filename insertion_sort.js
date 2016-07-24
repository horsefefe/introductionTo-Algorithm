function insertion_sort(arr){
	var len=arr.length;
	for(var j=1;j<len;j++){
		var key=arr[j];
		var i=j-1;
		while(i>=0&&arr[i]>key){
			arr[i+1]=arr[i];
			i=i-1;
		}
		arr[i+1]=key;
	}
}