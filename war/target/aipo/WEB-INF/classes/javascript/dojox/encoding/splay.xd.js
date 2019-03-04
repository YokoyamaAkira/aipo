dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.splay"]],defineResource:function(A){if(!A._hasResource["dojox.encoding.splay"]){A._hasResource["dojox.encoding.splay"]=true;
A.provide("dojox.encoding.splay");
dojox.encoding.Splay=function(B){this.up=new Array(2*B+1);
this.left=new Array(B);
this.right=new Array(B);
this.reset()
};
A.extend(dojox.encoding.Splay,{reset:function(){for(var B=1;
B<this.up.length;
this.up[B]=Math.floor((B-1)/2),++B){}for(var B=0;
B<this.left.length;
this.left[B]=2*B+1,this.right[B]=2*B+2,++B){}},splay:function(D){var C=D+this.left.length;
do{var F=this.up[C];
if(F){var E=this.up[F];
var B=this.left[E];
if(F==B){B=this.right[E];
this.right[E]=C
}else{this.left[E]=C
}this[C==this.left[F]?"left":"right"][F]=B;
this.up[C]=E;
this.up[B]=F;
C=E
}else{C=F
}}while(C)
},encode:function(E,F){var D=[],C=E+this.left.length;
do{D.push(this.right[this.up[C]]==C);
C=this.up[C]
}while(C);
this.splay(E);
var B=D.length;
while(D.length){F.putBits(D.pop()?1:0,1)
}return B
},decode:function(C){var B=0;
do{B=this[C.getBits(1)?"right":"left"][B]
}while(B<this.left.length);
B-=this.left.length;
this.splay(B);
return B
}})
}}});