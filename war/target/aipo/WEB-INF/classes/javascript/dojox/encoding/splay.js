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
this.left[A]=2*A+1,this.right[A]=2*A+2,++A){}},splay:function(B){var A=B+this.left.length;
do{var D=this.up[A];
if(D){var C=this.up[D];
var E=this.left[C];
if(D==E){E=this.right[C];
this.right[C]=A
}else{this.left[C]=A
}this[A==this.left[D]?"left":"right"][D]=E;
this.up[A]=C;
this.up[E]=D;
A=C
}else{A=D
}}while(A)
},encode:function(C,D){var B=[],A=C+this.left.length;
do{B.push(this.right[this.up[A]]==A);
A=this.up[A]
}while(A);
this.splay(C);
var E=B.length;
while(B.length){D.putBits(B.pop()?1:0,1)
}return E
},decode:function(A){var B=0;
do{B=this[A.getBits(1)?"right":"left"][B]
}while(B<this.left.length);
B-=this.left.length;
this.splay(B);
return B
}})
};