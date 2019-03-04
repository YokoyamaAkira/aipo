dojo._xdResourceLoaded({depends:[["provide","dojox.collections.BinaryTree"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.BinaryTree"]){A._hasResource["dojox.collections.BinaryTree"]=true;
A.provide("dojox.collections.BinaryTree");
A.require("dojox.collections._base");
dojox.collections.BinaryTree=function(I){function F(K,L,J){this.value=K||null;
this.right=L||null;
this.left=J||null;
this.clone=function(){var M=new F();
if(this.value.value){M.value=this.value.clone()
}else{M.value=this.value
}if(this.left!=null){M.left=this.left.clone()
}if(this.right!=null){M.right=this.right.clone()
}return M
};
this.compare=function(M){if(this.value>M.value){return 1
}if(this.value<M.value){return -1
}return 0
};
this.compareData=function(M){if(this.value>M){return 1
}if(this.value<M){return -1
}return 0
}
}function D(K,J){if(K){D(K.left,J);
J.push(K.value);
D(K.right,J)
}}function H(L,J){var K="";
if(L){K=L.value.toString()+J;
K+=H(L.left,J);
K+=H(L.right,J)
}return K
}function G(L,J){var K="";
if(L){K=G(L.left,J);
K+=L.value.toString()+J;
K+=G(L.right,J)
}return K
}function E(L,J){var K="";
if(L){K=E(L.left,J);
K+=E(L.right,J);
K+=L.value.toString()+J
}return K
}function C(L,K){if(!L){return null
}var J=L.compareData(K);
if(J==0){return L
}if(J>0){return C(L.left,K)
}else{return C(L.right,K)
}}this.add=function(L){var N=new F(L);
var J;
var M=B;
var K=null;
while(M){J=M.compare(N);
if(J==0){return 
}K=M;
if(J>0){M=M.left
}else{M=M.right
}}this.count++;
if(!K){B=N
}else{J=K.compare(N);
if(J>0){K.left=N
}else{K.right=N
}}};
this.clear=function(){B=null;
this.count=0
};
this.clone=function(){var K=new dojox.collections.BinaryTree();
var J=this.getIterator();
while(!J.atEnd()){K.add(J.get())
}return K
};
this.contains=function(J){return this.search(J)!=null
};
this.deleteData=function(N){var O=B;
var K=null;
var J=O.compareData(N);
while(J!=0&&O!=null){if(J>0){K=O;
O=O.left
}else{if(J<0){K=O;
O=O.right
}}J=O.compareData(N)
}if(!O){return 
}this.count--;
if(!O.right){if(!K){B=O.left
}else{J=K.compare(O);
if(J>0){K.left=O.left
}else{if(J<0){K.right=O.left
}}}}else{if(!O.right.left){if(!K){B=O.right
}else{J=K.compare(O);
if(J>0){K.left=O.right
}else{if(J<0){K.right=O.right
}}}}else{var M=O.right.left;
var L=O.right;
while(M.left!=null){L=M;
M=M.left
}L.left=M.right;
M.left=O.left;
M.right=O.right;
if(!K){B=M
}else{J=K.compare(O);
if(J>0){K.left=M
}else{if(J<0){K.right=M
}}}}}};
this.getIterator=function(){var J=[];
D(B,J);
return new dojox.collections.Iterator(J)
};
this.search=function(J){return C(B,J)
};
this.toString=function(J,K){if(!J){J=dojox.collections.BinaryTree.TraversalMethods.Inorder
}if(!K){K=","
}var L="";
switch(J){case dojox.collections.BinaryTree.TraversalMethods.Preorder:L=H(B,K);
break;
case dojox.collections.BinaryTree.TraversalMethods.Inorder:L=G(B,K);
break;
case dojox.collections.BinaryTree.TraversalMethods.Postorder:L=E(B,K);
break
}if(L.length==0){return""
}else{return L.substring(0,L.length-K.length)
}};
this.count=0;
var B=this.root=null;
if(I){this.add(I)
}};
dojox.collections.BinaryTree.TraversalMethods={Preorder:1,Inorder:2,Postorder:3}
}}});