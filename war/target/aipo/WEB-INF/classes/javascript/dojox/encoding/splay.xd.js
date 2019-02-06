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
this.left[B]=2*B+1,this.right[B]=2*B+2,++B){}},splay:function(E){var D=E+this.left.length;
do{var B=this.up[D];
if(B){var F=this.up[B];
var C=this.left[F];
if(B==C){C=this.right[F];
this.right[F]=D
}else{this.left[F]=D
}this[D==this.left[B]?"left":"right"][B]=C;
this.up[D]=F;
this.up[C]=B;
D=F
}else{D=B
}}while(D)
},encode:function(F,B){var E=[],D=F+this.left.length;
do{E.push(this.right[this.up[D]]==D);
D=this.up[D]
}while(D);
this.splay(F);
var C=E.length;
while(E.length){B.putBits(E.pop()?1:0,1)
}return C
},decode:function(B){var C=0;
do{C=this[B.getBits(1)?"right":"left"][C]
}while(C<this.left.length);
C-=this.left.length;
this.splay(C);
return C
}})
}}});