dojo._xdResourceLoaded({depends:[["provide","dojo.fx"],["provide","dojo.fx.Toggler"]],defineResource:function(A){if(!A._hasResource["dojo.fx"]){A._hasResource["dojo.fx"]=true;
A.provide("dojo.fx");
A.provide("dojo.fx.Toggler");
A.fx.chain=function(D){var C=D.shift();
var B=C;
A.forEach(D,function(E){A.connect(B,"onEnd",E,"play");
B=E
});
return C
};
A.fx.combine=function(C){var B=new A._Animation({curve:[0,1]});
if(!C.length){return B
}B.duration=C[0].duration;
A.forEach(C,function(D){A.forEach(["play","pause","stop"],function(E){if(D[E]){A.connect(B,E,D,E)
}})
});
return B
};
A.declare("dojo.fx.Toggler",null,{constructor:function(B){var C=this;
A.mixin(C,B);
C.node=B.node;
C._showArgs=A.mixin({},B);
C._showArgs.node=C.node;
C._showArgs.duration=C.showDuration;
C.showAnim=C.showFunc(C._showArgs);
C._hideArgs=A.mixin({},B);
C._hideArgs.node=C.node;
C._hideArgs.duration=C.hideDuration;
C.hideAnim=C.hideFunc(C._hideArgs);
A.connect(C.showAnim,"beforeBegin",A.hitch(C.hideAnim,"stop",true));
A.connect(C.hideAnim,"beforeBegin",A.hitch(C.showAnim,"stop",true))
},node:null,showFunc:A.fadeIn,hideFunc:A.fadeOut,showDuration:200,hideDuration:200,show:function(B){return this.showAnim.play(B||0)
},hide:function(B){return this.hideAnim.play(B||0)
}});
A.fx.wipeIn=function(B){B.node=A.byId(B.node);
var D=B.node,C=D.style;
var E=A.animateProperty(A.mixin({properties:{height:{start:function(){C.overflow="hidden";
if(C.visibility=="hidden"||C.display=="none"){C.height="1px";
C.display="";
C.visibility="";
return 1
}else{var F=A.style(D,"height");
return Math.max(F,1)
}},end:function(){return D.scrollHeight
}}}},B));
A.connect(E,"onEnd",function(){C.height="auto"
});
return E
};
A.fx.wipeOut=function(B){var D=B.node=A.byId(B.node);
var C=D.style;
var E=A.animateProperty(A.mixin({properties:{height:{end:1}}},B));
A.connect(E,"beforeBegin",function(){C.overflow="hidden";
C.display=""
});
A.connect(E,"onEnd",function(){C.height="auto";
C.display="none"
});
return E
};
A.fx.slideTo=function(B){var C=(B.node=A.byId(B.node));
var F=null;
var E=null;
var G=(function(H){return function(){var J=A.getComputedStyle(H);
var K=J.position;
F=(K=="absolute"?H.offsetTop:parseInt(J.top)||0);
E=(K=="absolute"?H.offsetLeft:parseInt(J.left)||0);
if(K!="absolute"&&K!="relative"){var I=A.coords(H,true);
F=I.y;
E=I.x;
H.style.position="absolute";
H.style.top=F+"px";
H.style.left=E+"px"
}}
})(C);
G();
var D=A.animateProperty(A.mixin({properties:{top:{end:B.top||0},left:{end:B.left||0}}},B));
A.connect(D,"beforeBegin",D,G);
return D
}
}}});