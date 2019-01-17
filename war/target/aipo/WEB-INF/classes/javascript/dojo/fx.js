if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
dojo.fx.chain=function(C){var B=C.shift();
var A=B;
dojo.forEach(C,function(D){dojo.connect(A,"onEnd",D,"play");
A=D
});
return B
};
dojo.fx.combine=function(B){var A=new dojo._Animation({curve:[0,1]});
if(!B.length){return A
}A.duration=B[0].duration;
dojo.forEach(B,function(C){dojo.forEach(["play","pause","stop"],function(D){if(C[D]){dojo.connect(A,D,C,D)
}})
});
return A
};
dojo.declare("dojo.fx.Toggler",null,{constructor:function(A){var B=this;
dojo.mixin(B,A);
B.node=A.node;
B._showArgs=dojo.mixin({},A);
B._showArgs.node=B.node;
B._showArgs.duration=B.showDuration;
B.showAnim=B.showFunc(B._showArgs);
B._hideArgs=dojo.mixin({},A);
B._hideArgs.node=B.node;
B._hideArgs.duration=B.hideDuration;
B.hideAnim=B.hideFunc(B._hideArgs);
dojo.connect(B.showAnim,"beforeBegin",dojo.hitch(B.hideAnim,"stop",true));
dojo.connect(B.hideAnim,"beforeBegin",dojo.hitch(B.showAnim,"stop",true))
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(A){return this.showAnim.play(A||0)
},hide:function(A){return this.hideAnim.play(A||0)
}});
dojo.fx.wipeIn=function(A){A.node=dojo.byId(A.node);
var C=A.node,B=C.style;
var D=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){B.overflow="hidden";
if(B.visibility=="hidden"||B.display=="none"){B.height="1px";
B.display="";
B.visibility="";
return 1
}else{var E=dojo.style(C,"height");
return Math.max(E,1)
}},end:function(){return C.scrollHeight
}}}},A));
dojo.connect(D,"onEnd",function(){B.height="auto"
});
return D
};
dojo.fx.wipeOut=function(A){var C=A.node=dojo.byId(A.node);
var B=C.style;
var D=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},A));
dojo.connect(D,"beforeBegin",function(){B.overflow="hidden";
B.display=""
});
dojo.connect(D,"onEnd",function(){B.height="auto";
B.display="none"
});
return D
};
dojo.fx.slideTo=function(A){var B=(A.node=dojo.byId(A.node));
var E=null;
var D=null;
var F=(function(G){return function(){var I=dojo.getComputedStyle(G);
var J=I.position;
E=(J=="absolute"?G.offsetTop:parseInt(I.top)||0);
D=(J=="absolute"?G.offsetLeft:parseInt(I.left)||0);
if(J!="absolute"&&J!="relative"){var H=dojo.coords(G,true);
E=H.y;
D=H.x;
G.style.position="absolute";
G.style.top=E+"px";
G.style.left=D+"px"
}}
})(B);
F();
var C=dojo.animateProperty(dojo.mixin({properties:{top:{end:A.top||0},left:{end:A.left||0}}},A));
dojo.connect(C,"beforeBegin",C,F);
return C
}
};