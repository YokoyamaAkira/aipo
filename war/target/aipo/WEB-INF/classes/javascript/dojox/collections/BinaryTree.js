if(!dojo._hasResource["dojox.collections.BinaryTree"]){dojo._hasResource["dojox.collections.BinaryTree"]=true;
dojo.provide("dojox.collections.BinaryTree");
dojo.require("dojox.collections._base");
dojox.collections.BinaryTree=function(C){function H(K,I,J){this.value=K||null;
this.right=I||null;
this.left=J||null;
this.clone=function(){var L=new H();
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
}function F(I,J){if(I){F(I.left,J);
J.push(I.value);
F(I.right,J)
}}function B(I,J){var K="";
if(I){K=I.value.toString()+J;
K+=B(I.left,J);
K+=B(I.right,J)
}return K
}function A(I,J){var K="";
if(I){K=A(I.left,J);
K+=I.value.toString()+J;
K+=A(I.right,J)
}return K
}function G(I,J){var K="";
if(I){K=G(I.left,J);
K+=G(I.right,J);
K+=I.value.toString()+J
}return K
}function E(I,K){if(!I){return null
}var J=I.compareData(K);
if(J==0){return I
}if(J>0){return E(I.left,K)
}else{return E(I.right,K)
}}this.add=function(M){var J=new H(M);
var K;
var I=D;
var L=null;
while(I){K=I.compare(J);
if(K==0){return 
}L=I;
if(K>0){I=I.left
}else{I=I.right
}}this.count++;
if(!L){D=J
}else{K=L.compare(J);
if(K>0){L.left=J
}else{L.right=J
}}};
this.clear=function(){D=null;
this.count=0
};
this.clone=function(){var I=new dojox.collections.BinaryTree();
var J=this.getIterator();
while(!J.atEnd()){I.add(J.get())
}return I
};
this.contains=function(I){return this.search(I)!=null
};
this.deleteData=function(J){var K=D;
var M=null;
var L=K.compareData(J);
while(L!=0&&K!=null){if(L>0){M=K;
K=K.left
}else{if(L<0){M=K;
K=K.right
}}L=K.compareData(J)
}if(!K){return 
}this.count--;
if(!K.right){if(!M){D=K.left
}else{L=M.compare(K);
if(L>0){M.left=K.left
}else{if(L<0){M.right=K.left
}}}}else{if(!K.right.left){if(!M){D=K.right
}else{L=M.compare(K);
if(L>0){M.left=K.right
}else{if(L<0){M.right=K.right
}}}}else{var I=K.right.left;
var N=K.right;
while(I.left!=null){N=I;
I=I.left
}N.left=I.right;
I.left=K.left;
I.right=K.right;
if(!M){D=I
}else{L=M.compare(K);
if(L>0){M.left=I
}else{if(L<0){M.right=I
}}}}}};
this.getIterator=function(){var I=[];
F(D,I);
return new dojox.collections.Iterator(I)
};
this.search=function(I){return E(D,I)
};
this.toString=function(J,K){if(!J){J=dojox.collections.BinaryTree.TraversalMethods.Inorder
}if(!K){K=","
}var I="";
switch(J){case dojox.collections.BinaryTree.TraversalMethods.Preorder:I=B(D,K);
break;
case dojox.collections.BinaryTree.TraversalMethods.Inorder:I=A(D,K);
break;
case dojox.collections.BinaryTree.TraversalMethods.Postorder:I=G(D,K);
break
}if(I.length==0){return""
}else{return I.substring(0,I.length-K.length)
}};
this.count=0;
var D=this.root=null;
if(C){this.add(C)
}};
dojox.collections.BinaryTree.TraversalMethods={Preorder:1,Inorder:2,Postorder:3}
};