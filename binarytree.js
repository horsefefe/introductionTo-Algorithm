define(function(require, exports){
	function traverseTree(x,func,context){
		if(x!=null){
			traverseTree(x.left,func,context);
			func.call(context||null,x.key);
			traverseTree(x.right,func,context);
		}
	}
	function binarytree(){
		this.root=null;
	}
	var prop=binarytree.prototype;
	prop.traverseTree=function(func,context){
		traverseTree.call(this,this.root,func,context);
	}
	prop.treeMin=function(x){
		if(!x){
			x=this.root;
		}
		while(x.left!=null){
			x=x.left;
		}
		return x;
	}
	prop.treeMax=function(x){
		if(!x){
			x=this.root;
		}
		while(x.right!=null){
			x=x.right;
		}
		return x;
	}
	prop.treeSuccessor=function(x){
		if(x.right!=null){
			return this.treeMin(x.right);
		}
		var y=x.parent;
		while(y!=null&&x==y.right){
			x=y;
			y=y.parent;
		}
		return y;
	}
	prop.treePredecessor=function(x){
		if(x.left!=null){
			return this.treeMax(x.left);
		}
		var y=x.parent;
		while(y!=null&&x==y.left){
			x=y;
			y=y.parent;
		}
		return y;
	}
	prop.treeSearch=function(x,key){
		if(typeof x!='object'){
			key=x;
			x=this.root;
		}
		if(key==x.key){
			return x;
		}
		if(x.key<key){
			return this.treeSearch(x.right,key);
		}else{
			return this.treeSearch(x.left,key);
		}
	}
	prop.treeInsert=function(z){
		if(typeof z!='object'){
			var z={
				key:z
			}
		}
		z.left=null;
		z.right=null;
		z.parent=null;
		y=null;
		x=this.root;
		while(x!=null){
			y=x;
			if(z.key<x.key){
				x=x.left;
			}else{
				x=x.right;
			}
		}
		z.parent=y;
		if(y==null){
			this.root=z;
		}else{
			if(z.key<y.key){
				y.left=z;
			}else{
				y.right=z;
			}
		}
	}
	prop.treeDelKey=function(key){
		var tempObj=this.treeSearch(key);
		return this.treeDel(tempObj);
	}
	prop.treeDel=function(z){
		if(z.left==null||z.right==null){
			y=z;
		}else{
			y=this.treeSuccessor(z);
		}
		if(y.left!=null){
			x=y.left;
		}else{
			x=y.right;
		}
		if(x!=null){
			x.parent=y.parent;
		}
		if(y.parent==null){
			this.root=x;
		}else if(y==y.parent.left){
			y.parent.left=x;
		}else{
			y.parent.right=x;
		}
		if(y!=z){
			z.key=y.key;
		}
		return y;
	}
	return binarytree;
});