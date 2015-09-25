define(function(require, exports){
	var binarytree=require('./binarytree');
	function RBTree(){
		this.root=this.nilT={
			color:'black',
			key:null
		};
		this.root.parent=this.nilT;
	}
	//left rotate
	function leftRotate(x){
		var y=x.right;
		x.right=y.left;
		y.left.parent=x;
		y.parent=x.parent;
		if(x.parent==this.nilT){
			this.root=y;
		}else if(x==x.parent.left){
			x.parent.left=y;
		}else{
			x.parent.right=y;
		}
		y.left=x;
		x.parent=y;
	}
	//right rotate
	function rightRotate(x){
		var y=x.left;
		x.left=y.right;
		y.right.parent=x;
		y.parent=x.parent;
		if(x.parent==this.nilT){
			this.root=y;
		}else if(x==x.parent.left){
			x.parent.left=y;
		}else{
			x.parent.right=y;
		}
		y.right=x;
		x.parent=y;
	}
	// RBTree insert fix
	function RBInsertFix(z){
		while(z.parent.color=='red'){
			if(z.parent==z.parent.parent.left){
				y=z.parent.parent.right;
				if(y.color=='red'){
					z.parent.color='black';
					y.color='black';
					z.parent.parent.color='red';
					z=z.parent.parent;
				}else if(z==z.parent.right){
					z=z.parent;
					leftRotate.call(this,z);
				}else{
					z.parent.color='black';
					z.parent.parent.color='red';
					rightRotate.call(this,z.parent.parent);
				}
			}else{
				y=z.parent.parent.left;
				if(y.color=='red'){
					z.parent.color='black';
					y.color='black';
					z.parent.parent.color='red';
					z=z.parent.parent;
				}else if(z==z.parent.left){
					z=z.parent;
					rightRotate.call(this,z);
				}else{
					z.parent.color='black';
					z.parent.parent.color='red';
					leftRotate.call(this,z.parent.parent);
				}
			}
		}
		this.root.color='black';
	}
	function RBDeleteFix(x){
		while(x!=this.root&&x.color=='black'){
			if(x==x.parent.left){
				var w=x.parent.right;
				if(w.color=='red'){
					w.color='black';
					x.parent.color='red';
					leftRotate.call(x.parent);
					w=x.parent.right;
				}
				if(w.left.color=='black'&&w.right.color=='black'){
					w.color='red';
					x=x.parent;
				}else if(w.right.color=='black'){
					w.left.color='black';
					rightRotate.call(this,w);
					w=x.parent.right;
				}else{
					w.color=x.parent.color;
					x.parent.color='black';
					leftRotate.call(this,x.parent);
					x=this.root;
				}
			}else{
				var w=x.parent.left;
				if(w.color=='red'){
					w.color='black';
					x.parent.color='red';
					rightRotate.call(x.parent);
					w=x.parent.left;
				}
				if(w.right.color=='black'&&w.left.color=='black'){
					w.color='red';
					x=x.parent;
				}else if(x.left.color=='black'){
					w.right.color='black';
					leftRotate.call(this,w);
					w=x.parent.left;
				}else{
					w.color=x.parent.color;
					x.parent.color='black';
					rightRotate.call(this,x.parent);
					x=this.root;
				}
			}
		}
		x.color='black';
	}
	RBTree.prototype=binarytree.prototype;
	function traverseTree(x,func,context){
		if(x!=null){
			traverseTree(x.left,func,context);
			if(x.key!=null){
				func.call(context||null,x.key);
			}
			traverseTree(x.right,func,context);
		}
	}
	var prop=RBTree.prototype;
	prop.traverseTree=function(func,context){
		traverseTree.call(this,this.root,func,context);
	}
	prop.treeInsert=function(z){
		if(typeof z!='object'){
			var z={
				key:z
			}
		}
		var y=this.nilT;
		var x=this.root;
		while(x!=this.nilT){
			y=x;
			if(z.key<x.key){
				x=x.left;
			}else{
				x=x.right;
			}
		}
		z.parent=y;
		if(y==this.nilT){
			this.root=z;
		}else if(z.key<y.key){
			y.left=z;
		}else{
			y.right=z;
		}
		z.left=this.nilT;
		z.right=this.nilT;
		z.color='red';
		RBInsertFix.call(this,z);
	}
	prop.treeDel=function(z){
		if(z.left==this.nilT||z.right==this.nilT){
			y=z;
		}else{
			y=treeSuccessor.call(this,z);
		}
		if(y.left==this.nilT){
			x=y.left;
		}else{
			x=y.right;
		}
		x.parent=y.parent;
		if(y.parent==this.nilT){
			this.root=x;
		}else if(y==y.parent.left){
			y.parent.left=x;
		}else{
			y.parent.right=x;
		}
		if(y!=z){
			z.key=y.key;
		}
		if(color.y=='black'){
			RBDeleteFix.call(this,x);
		}
		return y;
	}
	return RBTree;
});