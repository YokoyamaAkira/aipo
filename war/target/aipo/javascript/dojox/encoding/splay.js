if(!dojo._hasResource["dojox.encoding.splay"]){dojo._hasResource["dojox.encoding.splay"]=true;
dojo.provide("dojox.encoding.splay");
dojox.encoding.Splay=function(A){this.up=new Array(2*A+1);
this.left=new Array(A);
this.right=new Array(A);
this.reset()
};
dojo.extend(dojox.encoding.Splay,{reset:function(){for(var A=1;
A<this.up.length;
this.up[A]=Math.floor((A-1)/2),++A){}for(var A=0;
A<this.left.length;
this.left[A]=2*A+1,this.right[A]=2*A+2,++A){}},splay:function(C){var B=C+this.left.length;
do{var E=this.up[B];
if(E){var D=this.up[E];
var A=this.left[D];
if(E==A){A=this.right[D];
this.right[D]=B
}else{this.left[D]=B
}this[B==this.left[E]?"left":"right"][E]=A;
this.up[B]=D;
this.up[A]=E;
B=D
}else{B=E
}}while(B)
},encode:function(D,E){var C=[],B=D+this.left.length;
do{C.push(this.right[this.up[B]]==B);
B=this.up[B]
}while(B);
this.splay(D);
var A=C.length;
while(C.length){E.putBits(C.pop()?1:0,1)
}return A
},decode:function(B){var A=0;
do{A=this[B.getBits(1)?"right":"left"][A]
}while(A<this.left.length);
A-=this.left.length;
this.splay(A);
return A
}})
};