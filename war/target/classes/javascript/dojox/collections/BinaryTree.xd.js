dojo._xdResourceLoaded({depends:[["provide","dojox.collections.BinaryTree"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.BinaryTree"]){A._hasResource["dojox.collections.BinaryTree"]=true;
A.provide("dojox.collections.BinaryTree");
A.require("dojox.collections._base");
dojox.collections.BinaryTree=function(C){function B(K,L,J){this.value=K||null;
this.right=L||null;
this.left=J||null;
this.clone=function(){var M=new B();
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
}function H(K,J){if(K){H(K.left,J);
J.push(K.value);
H(K.right,J)
}}function E(L,J){var K="";
if(L){K=L.value.toString()+J;
K+=E(L.left,J);
K+=E(L.right,J)
}return K
}function D(L,J){var K="";
if(L){K=D(L.left,J);
K+=L.value.toString()+J;
K+=D(L.right,J)
}return K
}function I(L,J){var K="";
if(L){K=I(L.left,J);
K+=I(L.right,J);
K+=L.value.toString()+J
}return K
}function G(L,K){if(!L){return null
}var J=L.compareData(K);
if(J==0){return L
}if(J>0){return G(L.left,K)
}else{return G(L.right,K)
}}this.add=function(N){var K=new B(N);
var L;
var J=F;
var M=null;
while(J){L=J.compare(K);
if(L==0){return 
}M=J;
if(L>0){J=J.left
}else{J=J.right
}}this.count++;
if(!M){F=K
}else{L=M.compare(K);
if(L>0){M.left=K
}else{M.right=K
}}};
this.clear=function(){F=null;
this.count=0
};
this.clone=function(){var K=new dojox.collections.BinaryTree();
var J=this.getIterator();
while(!J.atEnd()){K.add(J.get())
}return K
};
this.contains=function(J){return this.search(J)!=null
};
this.deleteData=function(K){var L=F;
var N=null;
var M=L.compareData(K);
while(M!=0&&L!=null){if(M>0){N=L;
L=L.left
}else{if(M<0){N=L;
L=L.right
}}M=L.compareData(K)
}if(!L){return 
}this.count--;
if(!L.right){if(!N){F=L.left
}else{M=N.compare(L);
if(M>0){N.left=L.left
}else{if(M<0){N.right=L.left
}}}}else{if(!L.right.left){if(!N){F=L.right
}else{M=N.compare(L);
if(M>0){N.left=L.right
}else{if(M<0){N.right=L.right
}}}}else{var J=L.right.left;
var O=L.right;
while(J.left!=null){O=J;
J=J.left
}O.left=J.right;
J.left=L.left;
J.right=L.right;
if(!N){F=J
}else{M=N.compare(L);
if(M>0){N.left=J
}else{if(M<0){N.right=J
}}}}}};
this.getIterator=function(){var J=[];
H(F,J);
return new dojox.collections.Iterator(J)
};
this.search=function(J){return G(F,J)
};
this.toString=function(J,K){if(!J){J=dojox.collections.BinaryTree.TraversalMethods.Inorder
}if(!K){K=","
}var L="";
switch(J){case dojox.collections.BinaryTree.TraversalMethods.Preorder:L=E(F,K);
break;
case dojox.collections.BinaryTree.TraversalMethods.Inorder:L=D(F,K);
break;
case dojox.collections.BinaryTree.TraversalMethods.Postorder:L=I(F,K);
break
}if(L.length==0){return""
}else{return L.substring(0,L.length-K.length)
}};
this.count=0;
var F=this.root=null;
if(C){this.add(C)
}};
dojox.collections.BinaryTree.TraversalMethods={Preorder:1,Inorder:2,Postorder:3}
}}});