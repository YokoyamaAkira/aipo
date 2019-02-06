dojo._xdResourceLoaded({depends:[["provide","dojo.fx"],["provide","dojo.fx.Toggler"]],defineResource:function(A){if(!A._hasResource["dojo.fx"]){A._hasResource["dojo.fx"]=true;
A.provide("dojo.fx");
A.provide("dojo.fx.Toggler");
A.fx.chain=function(B){var D=B.shift();
var C=D;
A.forEach(B,function(E){A.connect(C,"onEnd",E,"play");
C=E
});
return D
};
A.fx.combine=function(B){var C=new A._Animation({curve:[0,1]});
if(!B.length){return C
}C.duration=B[0].duration;
A.forEach(B,function(D){A.forEach(["play","pause","stop"],function(E){if(D[E]){A.connect(C,E,D,E)
}})
});
return C
};
A.declare("dojo.fx.Toggler",null,{constructor:function(C){var B=this;
A.mixin(B,C);
B.node=C.node;
B._showArgs=A.mixin({},C);
B._showArgs.node=B.node;
B._showArgs.duration=B.showDuration;
B.showAnim=B.showFunc(B._showArgs);
B._hideArgs=A.mixin({},C);
B._hideArgs.node=B.node;
B._hideArgs.duration=B.hideDuration;
B.hideAnim=B.hideFunc(B._hideArgs);
A.connect(B.showAnim,"beforeBegin",A.hitch(B.hideAnim,"stop",true));
A.connect(B.hideAnim,"beforeBegin",A.hitch(B.showAnim,"stop",true))
},node:null,showFunc:A.fadeIn,hideFunc:A.fadeOut,showDuration:200,hideDuration:200,show:function(B){return this.showAnim.play(B||0)
},hide:function(B){return this.hideAnim.play(B||0)
}});
A.fx.wipeIn=function(C){C.node=A.byId(C.node);
var E=C.node,D=E.style;
var B=A.animateProperty(A.mixin({properties:{height:{start:function(){D.overflow="hidden";
if(D.visibility=="hidden"||D.display=="none"){D.height="1px";
D.display="";
D.visibility="";
return 1
}else{var F=A.style(E,"height");
return Math.max(F,1)
}},end:function(){return E.scrollHeight
}}}},C));
A.connect(B,"onEnd",function(){D.height="auto"
});
return B
};
A.fx.wipeOut=function(C){var E=C.node=A.byId(C.node);
var D=E.style;
var B=A.animateProperty(A.mixin({properties:{height:{end:1}}},C));
A.connect(B,"beforeBegin",function(){D.overflow="hidden";
D.display=""
});
A.connect(B,"onEnd",function(){D.height="auto";
D.display="none"
});
return B
};
A.fx.slideTo=function(C){var D=(C.node=A.byId(C.node));
var G=null;
var F=null;
var B=(function(H){return function(){var J=A.getComputedStyle(H);
var K=J.position;
G=(K=="absolute"?H.offsetTop:parseInt(J.top)||0);
F=(K=="absolute"?H.offsetLeft:parseInt(J.left)||0);
if(K!="absolute"&&K!="relative"){var I=A.coords(H,true);
G=I.y;
F=I.x;
H.style.position="absolute";
H.style.top=G+"px";
H.style.left=F+"px"
}}
})(D);
B();
var E=A.animateProperty(A.mixin({properties:{top:{end:C.top||0},left:{end:C.left||0}}},C));
A.connect(E,"beforeBegin",E,B);
return E
}
}}});