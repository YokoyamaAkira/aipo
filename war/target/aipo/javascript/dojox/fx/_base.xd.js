dojo._xdResourceLoaded({depends:[["provide","dojox.fx._base"],["require","dojo.fx"]],defineResource:function(A){if(!A._hasResource["dojox.fx._base"]){A._hasResource["dojox.fx._base"]=true;
A.provide("dojox.fx._base");
A.require("dojo.fx");
dojox.fx.chain=A.fx.chain;
dojox.fx.combine=A.fx.combine;
dojox.fx.wipeIn=A.fx.wipeIn;
dojox.fx.wipeOut=A.fx.wipeOut;
dojox.fx.slideTo=A.fx.slideTo;
dojox.fx.sizeTo=function(I){var E=(I.node=A.byId(I.node));
var L=A.getComputedStyle;
var B=I.method||"chain";
if(B=="chain"){I.duration=Math.floor(I.duration/2)
}var K,J,D,M,C,N=null;
var O=(function(){var P=E;
return function(){var R=L(P).position;
K=(R=="absolute"?E.offsetTop:parseInt(L(E).top)||0);
D=(R=="absolute"?E.offsetLeft:parseInt(L(E).left)||0);
C=parseInt(A.style(E,"width"));
N=parseInt(A.style(E,"height"));
M=D-Math.floor((I.width-C)/2);
J=K-Math.floor((I.height-N)/2);
if(R!="absolute"&&R!="relative"){var Q=A.coords(P,true);
K=Q.y;
D=Q.x;
P.style.position="absolute";
P.style.top=K+"px";
P.style.left=D+"px"
}}
})();
O();
var H=A.animateProperty(A.mixin({properties:{height:{start:N,end:I.height||0,unit:"px"},top:{start:K,end:J}}},I));
var G=A.animateProperty(A.mixin({properties:{width:{start:C,end:I.width||0,unit:"px"},left:{start:D,end:M}}},I));
var F=A.fx[((I.method=="combine")?"combine":"chain")]([H,G]);
A.connect(F,"beforeBegin",F,O);
return F
};
dojox.fx.slideBy=function(B){var D=(B.node=A.byId(B.node));
var G=A.getComputedStyle;
var F=null;
var E=null;
var H=(function(){var I=D;
return function(){var K=G(I,"position");
F=(K=="absolute"?D.offsetTop:parseInt(G(D,"top"))||0);
E=(K=="absolute"?D.offsetLeft:parseInt(G(D,"left"))||0);
if(K!="absolute"&&K!="relative"){var J=A.coords(I,true);
F=J.y;
E=J.x;
I.style.position="absolute";
I.style.top=F+"px";
I.style.left=E+"px"
}}
})();
H();
var C=A.animateProperty(A.mixin({properties:{top:{end:F+(B.top||0)},left:{end:E+(B.left||0)}}},B));
A.connect(C,"beforeBegin",C,H);
return C
};
dojox.fx.crossFade=function(D){if(A.isArray(D.nodes)){var C=D.nodes[0]=A.byId(D.nodes[0]);
var G=A.style(C,"opacity");
var B=D.nodes[1]=A.byId(D.nodes[1]);
var E=A.style(B,"opacity");
var F=A.fx.combine([A[((G==0)?"fadeIn":"fadeOut")](A.mixin({node:C},D)),A[((G==0)?"fadeOut":"fadeIn")](A.mixin({node:B},D))]);
return F
}else{return false
}};
dojox.fx.highlight=function(B){var E=(B.node=A.byId(B.node));
B.duration=B.duration||400;
var G=B.color||"#ffff99";
var D=A.style(E,"backgroundColor");
var C=(D=="transparent"||D=="rgba(0, 0, 0, 0)");
var F=A.animateProperty(A.mixin({properties:{backgroundColor:{start:G,end:D}}},B));
A.connect(F,"onEnd",F,function(){if(C){E.style.backgroundColor="transparent"
}});
return F
}
}}});