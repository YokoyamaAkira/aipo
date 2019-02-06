if(!dojo._hasResource["dojox.collections.BinaryTree"]){dojo._hasResource["dojox.collections.BinaryTree"]=true;
dojo.provide("dojox.collections.BinaryTree");
dojo.require("dojox.collections._base");
dojox.collections.BinaryTree=function(H){function E(J,K,I){this.value=J||null;
this.right=K||null;
this.left=I||null;
this.clone=function(){var L=new E();
if(this.value.value){L.value=this.value.clone()
}else{L.value=this.value
}if(this.left!=null){L.left=this.left.clone()
}if(this.right!=null){L.right=this.right.clone()
}return L
};
this.compare=function(L){if(this.value>L.value){return 1
}if(this.value<L.value){return -1
}return 0
};
this.compareData=function(L){if(this.value>L){return 1
}if(this.value<L){return -1
}return 0
}
}function C(J,I){if(J){C(J.left,I);
I.push(J.value);
C(J.right,I)
}}function G(K,I){var J="";
if(K){J=K.value.toString()+I;
J+=G(K.left,I);
J+=G(K.right,I)
}return J
}function F(K,I){var J="";
if(K){J=F(K.left,I);
J+=K.value.toString()+I;
J+=F(K.right,I)
}return J
}function D(K,I){var J="";
if(K){J=D(K.left,I);
J+=D(K.right,I);
J+=K.value.toString()+I
}return J
}function B(K,J){if(!K){return null
}var I=K.compareData(J);
if(I==0){return K
}if(I>0){return B(K.left,J)
}else{return B(K.right,J)
}}this.add=function(K){var M=new E(K);
var I;
var L=A;
var J=null;
while(L){I=L.compare(M);
if(I==0){return 
}J=L;
if(I>0){L=L.left
}else{L=L.right
}}this.count++;
if(!J){A=M
}else{I=J.compare(M);
if(I>0){J.left=M
}else{J.right=M
}}};
this.clear=function(){A=null;
this.count=0
};
this.clone=function(){var J=new dojox.collections.BinaryTree();
var I=this.getIterator();
while(!I.atEnd()){J.add(I.get())
}return J
};
this.contains=function(I){return this.search(I)!=null
};
this.deleteData=function(M){var N=A;
var J=null;
var I=N.compareData(M);
while(I!=0&&N!=null){if(I>0){J=N;
N=N.left
}else{if(I<0){J=N;
N=N.right
}}I=N.compareData(M)
}if(!N){return 
}this.count--;
if(!N.right){if(!J){A=N.left
}else{I=J.compare(N);
if(I>0){J.left=N.left
}else{if(I<0){J.right=N.left
}}}}else{if(!N.right.left){if(!J){A=N.right
}else{I=J.compare(N);
if(I>0){J.left=N.right
}else{if(I<0){J.right=N.right
}}}}else{var L=N.right.left;
var K=N.right;
while(L.left!=null){K=L;
L=L.left
}K.left=L.right;
L.left=N.left;
L.right=N.right;
if(!J){A=L
}else{I=J.compare(N);
if(I>0){J.left=L
}else{if(I<0){J.right=L
}}}}}};
this.getIterator=function(){var I=[];
C(A,I);
return new dojox.collections.Iterator(I)
};
this.search=function(I){return B(A,I)
};
this.toString=function(I,J){if(!I){I=dojox.collections.BinaryTree.TraversalMethods.Inorder
}if(!J){J=","
}var K="";
switch(I){case dojox.collections.BinaryTree.TraversalMethods.Preorder:K=G(A,J);
break;
case dojox.collections.BinaryTree.TraversalMethods.Inorder:K=F(A,J);
break;
case dojox.collections.BinaryTree.TraversalMethods.Postorder:K=D(A,J);
break
}if(K.length==0){return""
}else{return K.substring(0,K.length-J.length)
}};
this.count=0;
var A=this.root=null;
if(H){this.add(H)
}};
dojox.collections.BinaryTree.TraversalMethods={Preorder:1,Inorder:2,Postorder:3}
};