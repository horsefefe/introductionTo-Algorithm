function BinaryTree(){
	this.root=null;
}
BinaryTree.prototype.inorder_tree_walk=function(x){
	if(typeof x=='undefined'){
		x=this.root;
	}
	if(!!x){
		this.inorder_tree_walk(x.left);
		console.log(x.key);
		this.inorder_tree_walk(x.right);
	}
}
BinaryTree.prototype.tree_search=function(x,key){
	if(typeof x=='undefined'){
		x=this.root;
	}
	if(x==null||key==x.key){
		return x;
	}
	if(key<x.key){
		return this.tree_search(x.left,key);
	}else{
		return this.tree_search(x.right,key);
	}
}
BinaryTree.prototype.minimun=function(x){
	while(x.left!=null){
		return this.minimun(x.left);
	}
	return x;
}
BinaryTree.prototype.maximun=function(x){
	while(x.right!=null){
		return this.maximun(x.right);
	}
	return x;
}
BinaryTree.prototype.successor=function(x){
	if(x.right!=null){
		return this.minimun(x.right);
	}
	var y=x.parent;
	while(y!=null&&x==y.right){
		x=y;
		y=y.parent;
	}
	return y;
}
BinaryTree.prototype.predecessor=function(x){
	if(x.left!=null){
		return this.maximun(x.left);
	}
	var y=x.parent;
	while(y!=null&&x==y.left){
		x=y;
		y=y.parent;
	}
	return y;
}
/*
	node {
		left:null,
		right:null,
		key
	}
 */
BinaryTree.prototype.insert=function(node){
	var y=null;
	var x=this.root;
	while(x!=null){
		y=x;
		if(node.key<x.key){
			x=x.left;
		}else{
			x=x.right;
		}
	}
	node.parent=y;
	if(y==null){
		this.root=node;
	}else if(node.key<y.key){
		y.left=node;
	}else{
		y.right=node;
	}
}
function _transplant(t,u,v){
	if(u.parent==null){
		// delete node ,node left null,node parent null => node.right to be root;
		// delete node ,node right null,node parent null => node.left to be root; 
		t.root=v;
	}else if(u==u.parent.left){
		//delete node is its parent left node
		u.parent.left=v;
	}else{
		//delet node is its parent right node;
		u.parent.right=v;
	}
	if(v!=null){
		// fix pointer;
		v.parent=u.parent;
	}
}
BinaryTree.prototype.delete=function(node){
	if(node.left==null){
		_transplant(this,node,node.right);
	}else if(node.right==null){
		_transplant(this,node,node.left);
	}else{
		var y=this.minimun(node.right);
		if(y.parent!=node){
			// successor left node must be null;
			_transplant(this,y,y.right);
			y.right=node.right;
			y.right.parent=y;
		}
		_transplant(this,node,y);
		y.left=node.left;
		y.left.parent=y;
	}
}