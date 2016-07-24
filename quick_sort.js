function quick_sort(arr,begin,end) {
	if(begin<end){
		mid=_partition(arr,begin,end);
		quick_sort(arr,begin,mid-1);
		quick_sort(arr,mid+1,end);
	}
}
function _partition(arr,begin,end){
	var x=arr[end];
	var i=begin;
	for(var j=i;j<=end-1;j++){
		if(arr[j]<=x){
			if(i!=j){
				var temp=arr[j];
				arr[j]=arr[i];
				arr[i]=temp;
			}
			i=i+1;
		}
	}
	var temp=arr[i];
	arr[i]=arr[end];
	arr[end]=temp;
	return i;
}