if(!dojo._hasResource["dojox.fx._base"]){dojo._hasResource["dojox.fx._base"]=true;
dojo.provide("dojox.fx._base");
dojo.require("dojo.fx");
dojox.fx.chain=dojo.fx.chain;
dojox.fx.combine=dojo.fx.combine;
dojox.fx.wipeIn=dojo.fx.wipeIn;
dojox.fx.wipeOut=dojo.fx.wipeOut;
dojox.fx.slideTo=dojo.fx.slideTo;
dojox.fx.sizeTo=function(B){var L=(B.node=dojo.byId(B.node));
var E=dojo.getComputedStyle;
var I=B.method||"chain";
if(I=="chain"){B.duration=Math.floor(B.duration/2)
}var D,C,K,F,J,G=null;
var H=(function(){var O=L;
return function(){var Q=E(O).position;
D=(Q=="absolute"?L.offsetTop:parseInt(E(L).top)||0);
K=(Q=="absolute"?L.offsetLeft:parseInt(E(L).left)||0);
J=parseInt(dojo.style(L,"width"));
G=parseInt(dojo.style(L,"height"));
F=K-Math.floor((B.width-J)/2);
C=D-Math.floor((B.height-G)/2);
if(Q!="absolute"&&Q!="relative"){var P=dojo.coords(O,true);
D=P.y;
K=P.x;
O.style.position="absolute";
O.style.top=D+"px";
O.style.left=K+"px"
}}
})();
H();
var A=dojo.animateProperty(dojo.mixin({properties:{height:{start:G,end:B.height||0,unit:"px"},top:{start:D,end:C}}},B));
var N=dojo.animateProperty(dojo.mixin({properties:{width:{start:J,end:B.width||0,unit:"px"},left:{start:K,end:F}}},B));
var M=dojo.fx[((B.method=="combine")?"combine":"chain")]([A,N]);
dojo.connect(M,"beforeBegin",M,H);
return M
};
dojox.fx.slideBy=function(E){var G=(E.node=dojo.byId(E.node));
var C=dojo.getComputedStyle;
var B=null;
var A=null;
var D=(function(){var H=G;
return function(){var J=C(H,"position");
B=(J=="absolute"?G.offsetTop:parseInt(C(G,"top"))||0);
A=(J=="absolute"?G.offsetLeft:parseInt(C(G,"left"))||0);
if(J!="absolute"&&J!="relative"){var I=dojo.coords(H,true);
B=I.y;
A=I.x;
H.style.position="absolute";
H.style.top=B+"px";
H.style.left=A+"px"
}}
})();
D();
var F=dojo.animateProperty(dojo.mixin({properties:{top:{end:B+(E.top||0)},left:{end:A+(E.left||0)}}},E));
dojo.connect(F,"beforeBegin",F,D);
return F
};
dojox.fx.crossFade=function(B){if(dojo.isArray(B.nodes)){var A=B.nodes[0]=dojo.byId(B.nodes[0]);
var E=dojo.style(A,"opacity");
var F=B.nodes[1]=dojo.byId(B.nodes[1]);
var C=dojo.style(F,"opacity");
var D=dojo.fx.combine([dojo[((E==0)?"fadeIn":"fadeOut")](dojo.mixin({node:A},B)),dojo[((E==0)?"fadeOut":"fadeIn")](dojo.mixin({node:F},B))]);
return D
}else{return false
}};
dojox.fx.highlight=function(F){var C=(F.node=dojo.byId(F.node));
F.duration=F.duration||400;
var E=F.color||"#ffff99";
var B=dojo.style(C,"backgroundColor");
var A=(B=="transparent"||B=="rgba(0, 0, 0, 0)");
var D=dojo.animateProperty(dojo.mixin({properties:{backgroundColor:{start:E,end:B}}},F));
dojo.connect(D,"onEnd",D,function(){if(A){C.style.backgroundColor="transparent"
}});
return D
}
};