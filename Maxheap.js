define(function(require, exports){
	function parent(i){
		return Math.ceil(i/2);
	}
	function left(i){
		//js index start at 0
		return 2*i+1;
	}
	function right(i){
		return 2*i+1+1;
	}
	function Maxheap(arr){
		if(!arr||arr.length==0){
			return false;
		}
		this.heap=arr;
		this.isSorted=false;
		bulidMaxHeap.call(this);
	}
	function bulidMaxHeap(){
		var len=this.heap.length;
		var loopSize=Math.floor(len/2);
		for(var i=loopSize;i>=0;i--){
			maxHeapify.call(this,i);
		}
		this.isSorted=false;
	}
	function maxHeapify(i){
		var l=left(i);
		var r=right(i);
		var a=this.heap;
		var largest=0;
		if(l<=a.length&&a[l]>a[i]){
			largest=l;
		}else{
			largest=i;
		}
		if(r<=a.length&&a[r]>a[largest]){
			largest=r;
		}
		if(largest!=i){
			var temp=a[i];
			a[i]=a[largest];
			a[largest]=temp;
			maxHeapify.call(this,largest);
		}
	}
	Maxheap.prototype.resetMax=bulidMaxHeap;
	Maxheap.prototype.update=function(item,i){
		var a=this.heap;
		if(i<0||!i){
			i=0;
		}else if(i>a.length-1){
			i=a.length-1;
		}
		// less than original
		if(item<a[i]){

		}else{
			//large than original
			a[i]=item;
			while(i>0&&a[parent(i)]<a[i]){
				var temp=a[i];
				a[i]=a[parent(i)];
				a[parent(i)]=temp;
				i=parent(i);
			}
		}
	}
	function getIndex(item,start,end){
		var a=this.heap;
		if(start==0){
			var idx=Math.ceil(a.length/2);
		}else{
			var idx=Math.ceil((start+end)/2);
		}
		if(item<a[idx]){
			if(item>a[idx-1]){
				return idx;
			}else{
				return getIndex.call(this,start,Math.ceil(start+end)/2);
			}
		}else if(item>a[idx]){
			if(item<a[idx+1]){
				return idx+1;
			}else{
				return getIndex.call(this,Math.floor(start+end)/2,end);
			}
		}else{
			// equal
			return i;
		}
	}
	Maxheap.prototype.add=function(item){
		var a=this.heap;
		if(this.isSorted===true){
			var idx=getIndex.call(this,item);
			for(var i=a.length-1;i>=idx;i--){
				a[i+1]=a[i];
			}
			a[idx]=item;
			return this.heap;
		}else{
			a.push(item);
			var i=a.length-1;
			while(i>0&&a[parent(i)]<a[i]){
				var temp=a[i];
				a[i]=a[parent(i)];
				a[parent(i)]=temp;
				i=parent(i);
			}
			return this.heap;
		}
	}
	Maxheap.prototype.getMax=function(){
		if(this.isSorted===true){
			return this.heap[this.heap.lenfth-1];
		}else{
			return this.heap[0];
		}
	}
	// popfirst
	Maxheap.prototype.extractMax=function(){
		var a=this.heap;
		if(this.isSorted===true){
			return a.pop();
		}else{
			if(a.length<1){
				return false;
			}else{
				var max=a[0];
				a[0]=a.pop();
				maxHeapify.call(this,0);
				return max;
			}
		}
	}
	Maxheap.prototype.heapsort=function(){
		//bulidMaxHeap.call(this);
		var arr=[];
		var a=this.heap;
		var len=a.length;
		for(var i=len;i>=1;i--){
			arr.unshift(a[0]);
			a.shift();
			maxHeapify.call(this,0);
		}
		this.heap=arr;
		this.isSorted=true;
		return arr;
	}
	return Maxheap;
});