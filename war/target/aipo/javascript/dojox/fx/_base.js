if(!dojo._hasResource["dojox.fx._base"]){dojo._hasResource["dojox.fx._base"]=true;
dojo.provide("dojox.fx._base");
dojo.require("dojo.fx");
dojox.fx.chain=dojo.fx.chain;
dojox.fx.combine=dojo.fx.combine;
dojox.fx.wipeIn=dojo.fx.wipeIn;
dojox.fx.wipeOut=dojo.fx.wipeOut;
dojox.fx.slideTo=dojo.fx.slideTo;
dojox.fx.sizeTo=function(H){var D=(H.node=dojo.byId(H.node));
var K=dojo.getComputedStyle;
var A=H.method||"chain";
if(A=="chain"){H.duration=Math.floor(H.duration/2)
}var J,I,C,L,B,M=null;
var N=(function(){var O=D;
return function(){var Q=K(O).position;
J=(Q=="absolute"?D.offsetTop:parseInt(K(D).top)||0);
C=(Q=="absolute"?D.offsetLeft:parseInt(K(D).left)||0);
B=parseInt(dojo.style(D,"width"));
M=parseInt(dojo.style(D,"height"));
L=C-Math.floor((H.width-B)/2);
I=J-Math.floor((H.height-M)/2);
if(Q!="absolute"&&Q!="relative"){var P=dojo.coords(O,true);
J=P.y;
C=P.x;
O.style.position="absolute";
O.style.top=J+"px";
O.style.left=C+"px"
}}
})();
N();
var G=dojo.animateProperty(dojo.mixin({properties:{height:{start:M,end:H.height||0,unit:"px"},top:{start:J,end:I}}},H));
var F=dojo.animateProperty(dojo.mixin({properties:{width:{start:B,end:H.width||0,unit:"px"},left:{start:C,end:L}}},H));
var E=dojo.fx[((H.method=="combine")?"combine":"chain")]([G,F]);
dojo.connect(E,"beforeBegin",E,N);
return E
};
dojox.fx.slideBy=function(A){var C=(A.node=dojo.byId(A.node));
var F=dojo.getComputedStyle;
var E=null;
var D=null;
var G=(function(){var H=C;
return function(){var J=F(H,"position");
E=(J=="absolute"?C.offsetTop:parseInt(F(C,"top"))||0);
D=(J=="absolute"?C.offsetLeft:parseInt(F(C,"left"))||0);
if(J!="absolute"&&J!="relative"){var I=dojo.coords(H,true);
E=I.y;
D=I.x;
H.style.position="absolute";
H.style.top=E+"px";
H.style.left=D+"px"
}}
})();
G();
var B=dojo.animateProperty(dojo.mixin({properties:{top:{end:E+(A.top||0)},left:{end:D+(A.left||0)}}},A));
dojo.connect(B,"beforeBegin",B,G);
return B
};
dojox.fx.crossFade=function(C){if(dojo.isArray(C.nodes)){var B=C.nodes[0]=dojo.byId(C.nodes[0]);
var F=dojo.style(B,"opacity");
var A=C.nodes[1]=dojo.byId(C.nodes[1]);
var D=dojo.style(A,"opacity");
var E=dojo.fx.combine([dojo[((F==0)?"fadeIn":"fadeOut")](dojo.mixin({node:B},C)),dojo[((F==0)?"fadeOut":"fadeIn")](dojo.mixin({node:A},C))]);
return E
}else{return false
}};
dojox.fx.highlight=function(A){var D=(A.node=dojo.byId(A.node));
A.duration=A.duration||400;
var F=A.color||"#ffff99";
var C=dojo.style(D,"backgroundColor");
var B=(C=="transparent"||C=="rgba(0, 0, 0, 0)");
var E=dojo.animateProperty(dojo.mixin({properties:{backgroundColor:{start:F,end:C}}},A));
dojo.connect(E,"onEnd",E,function(){if(B){D.style.backgroundColor="transparent"
}});
return E
}
};