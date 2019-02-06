dojo._xdResourceLoaded({depends:[["provide","dojox.fx._base"],["require","dojo.fx"]],defineResource:function(A){if(!A._hasResource["dojox.fx._base"]){A._hasResource["dojox.fx._base"]=true;
A.provide("dojox.fx._base");
A.require("dojo.fx");
dojox.fx.chain=A.fx.chain;
dojox.fx.combine=A.fx.combine;
dojox.fx.wipeIn=A.fx.wipeIn;
dojox.fx.wipeOut=A.fx.wipeOut;
dojox.fx.slideTo=A.fx.slideTo;
dojox.fx.sizeTo=function(D){var N=(D.node=A.byId(D.node));
var H=A.getComputedStyle;
var L=D.method||"chain";
if(L=="chain"){D.duration=Math.floor(D.duration/2)
}var G,F,E,I,M,J=null;
var K=(function(){var P=N;
return function(){var R=H(P).position;
G=(R=="absolute"?N.offsetTop:parseInt(H(N).top)||0);
E=(R=="absolute"?N.offsetLeft:parseInt(H(N).left)||0);
M=parseInt(A.style(N,"width"));
J=parseInt(A.style(N,"height"));
I=E-Math.floor((D.width-M)/2);
F=G-Math.floor((D.height-J)/2);
if(R!="absolute"&&R!="relative"){var Q=A.coords(P,true);
G=Q.y;
E=Q.x;
P.style.position="absolute";
P.style.top=G+"px";
P.style.left=E+"px"
}}
})();
K();
var C=A.animateProperty(A.mixin({properties:{height:{start:J,end:D.height||0,unit:"px"},top:{start:G,end:F}}},D));
var B=A.animateProperty(A.mixin({properties:{width:{start:M,end:D.width||0,unit:"px"},left:{start:E,end:I}}},D));
var O=A.fx[((D.method=="combine")?"combine":"chain")]([C,B]);
A.connect(O,"beforeBegin",O,K);
return O
};
dojox.fx.slideBy=function(G){var C=(G.node=A.byId(G.node));
var F=A.getComputedStyle;
var E=null;
var D=null;
var B=(function(){var I=C;
return function(){var K=F(I,"position");
E=(K=="absolute"?C.offsetTop:parseInt(F(C,"top"))||0);
D=(K=="absolute"?C.offsetLeft:parseInt(F(C,"left"))||0);
if(K!="absolute"&&K!="relative"){var J=A.coords(I,true);
E=J.y;
D=J.x;
I.style.position="absolute";
I.style.top=E+"px";
I.style.left=D+"px"
}}
})();
B();
var H=A.animateProperty(A.mixin({properties:{top:{end:E+(G.top||0)},left:{end:D+(G.left||0)}}},G));
A.connect(H,"beforeBegin",H,B);
return H
};
dojox.fx.crossFade=function(E){if(A.isArray(E.nodes)){var D=E.nodes[0]=A.byId(E.nodes[0]);
var C=A.style(D,"opacity");
var B=E.nodes[1]=A.byId(E.nodes[1]);
var F=A.style(B,"opacity");
var G=A.fx.combine([A[((C==0)?"fadeIn":"fadeOut")](A.mixin({node:D},E)),A[((C==0)?"fadeOut":"fadeIn")](A.mixin({node:B},E))]);
return G
}else{return false
}};
dojox.fx.highlight=function(C){var F=(C.node=A.byId(C.node));
C.duration=C.duration||400;
var B=C.color||"#ffff99";
var E=A.style(F,"backgroundColor");
var D=(E=="transparent"||E=="rgba(0, 0, 0, 0)");
var G=A.animateProperty(A.mixin({properties:{backgroundColor:{start:B,end:E}}},C));
A.connect(G,"onEnd",G,function(){if(D){F.style.backgroundColor="transparent"
}});
return G
}
}}});