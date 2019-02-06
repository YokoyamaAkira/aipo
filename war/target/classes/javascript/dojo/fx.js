if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
dojo.fx.chain=function(B){var A=B.shift();
var C=A;
dojo.forEach(B,function(D){dojo.connect(C,"onEnd",D,"play");
C=D
});
return A
};
dojo.fx.combine=function(A){var B=new dojo._Animation({curve:[0,1]});
if(!A.length){return B
}B.duration=A[0].duration;
dojo.forEach(A,function(C){dojo.forEach(["play","pause","stop"],function(D){if(C[D]){dojo.connect(B,D,C,D)
}})
});
return B
};
dojo.declare("dojo.fx.Toggler",null,{constructor:function(B){var A=this;
dojo.mixin(A,B);
A.node=B.node;
A._showArgs=dojo.mixin({},B);
A._showArgs.node=A.node;
A._showArgs.duration=A.showDuration;
A.showAnim=A.showFunc(A._showArgs);
A._hideArgs=dojo.mixin({},B);
A._hideArgs.node=A.node;
A._hideArgs.duration=A.hideDuration;
A.hideAnim=A.hideFunc(A._hideArgs);
dojo.connect(A.showAnim,"beforeBegin",dojo.hitch(A.hideAnim,"stop",true));
dojo.connect(A.hideAnim,"beforeBegin",dojo.hitch(A.showAnim,"stop",true))
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(A){return this.showAnim.play(A||0)
},hide:function(A){return this.hideAnim.play(A||0)
}});
dojo.fx.wipeIn=function(D){D.node=dojo.byId(D.node);
var B=D.node,A=B.style;
var C=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){A.overflow="hidden";
if(A.visibility=="hidden"||A.display=="none"){A.height="1px";
A.display="";
A.visibility="";
return 1
}else{var E=dojo.style(B,"height");
return Math.max(E,1)
}},end:function(){return B.scrollHeight
}}}},D));
dojo.connect(C,"onEnd",function(){A.height="auto"
});
return C
};
dojo.fx.wipeOut=function(D){var B=D.node=dojo.byId(D.node);
var A=B.style;
var C=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},D));
dojo.connect(C,"beforeBegin",function(){A.overflow="hidden";
A.display=""
});
dojo.connect(C,"onEnd",function(){A.height="auto";
A.display="none"
});
return C
};
dojo.fx.slideTo=function(F){var A=(F.node=dojo.byId(F.node));
var D=null;
var C=null;
var E=(function(G){return function(){var I=dojo.getComputedStyle(G);
var J=I.position;
D=(J=="absolute"?G.offsetTop:parseInt(I.top)||0);
C=(J=="absolute"?G.offsetLeft:parseInt(I.left)||0);
if(J!="absolute"&&J!="relative"){var H=dojo.coords(G,true);
D=H.y;
C=H.x;
G.style.position="absolute";
G.style.top=D+"px";
G.style.left=C+"px"
}}
})(A);
E();
var B=dojo.animateProperty(dojo.mixin({properties:{top:{end:F.top||0},left:{end:F.left||0}}},F));
dojo.connect(B,"beforeBegin",B,E);
return B
}
};