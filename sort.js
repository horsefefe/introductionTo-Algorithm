define(function(require, exports){
	// insertion sort
	function insertionSort(arr){
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
	function _merge(arr,p,q,r){
		var leftArr=[];
		var rightArr=[];
		//left part length
		var n1=q-p+1;
		//right part length
		var n2=r-q;
		for(var i=0;i<n1;i++){
			leftArr[i]=arr[p+i];
		}
		for(var j=0;j<n2;j++){
			rightArr[j]=arr[q+1+j];
		}
		leftArr[n1]=Infinity;
		rightArr[n2]=Infinity;
		i=0;
		j=0;
		for(var k=p;k<r+1;k++){
			if(leftArr[i]<=rightArr[j]){
				arr[k]=leftArr[i];
				i=i+1;
			}else{
				arr[k]=rightArr[j];
				j=j+1;
			}
		}
	}
	function mergeSort(arr,p,r){
		if(typeof p=='undefined'){
			p=0;
		}
		if(typeof r=='undefined'){
			r=arr.length-1;
		}
		var q;
		if(p<r){
			q=Math.floor((p+r)/2);
			mergeSort(arr,p,q);
			mergeSort(arr,q+1,r);
			_merge(arr,p,q,r);
		}
	}
	return {
		insertionSort:insertionSort,
		mergeSort:mergeSort
	}
});