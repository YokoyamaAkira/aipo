dojo._xdResourceLoaded({depends:[["provide","dijit._base.place"]],defineResource:function(A){if(!A._hasResource["dijit._base.place"]){A._hasResource["dijit._base.place"]=true;
A.provide("dijit._base.place");
dijit.getViewport=function(){var I=A.global;
var F=A.doc;
var G=0,B=0;
if(A.isMozilla){var H,C,D,J;
if(F.body.clientWidth>F.documentElement.clientWidth){H=F.documentElement.clientWidth;
D=F.body.clientWidth
}else{D=F.documentElement.clientWidth;
H=F.body.clientWidth
}if(F.body.clientHeight>F.documentElement.clientHeight){C=F.documentElement.clientHeight;
J=F.body.clientHeight
}else{J=F.documentElement.clientHeight;
C=F.body.clientHeight
}G=(D>I.innerWidth)?H:D;
B=(J>I.innerHeight)?C:J
}else{if(!A.isOpera&&I.innerWidth){G=I.innerWidth;
B=I.innerHeight
}else{if(A.isIE&&F.documentElement&&F.documentElement.clientHeight){G=F.documentElement.clientWidth;
B=F.documentElement.clientHeight
}else{if(A.body().clientWidth){G=A.body().clientWidth;
B=A.body().clientHeight
}}}}var E=A._docScroll();
return{w:G,h:B,l:E.x,t:E.y}
};
dijit.placeOnScreen=function(D,B,C,E){var F=A.map(C,function(G){return{corner:G,pos:B}
});
return dijit._place(D,F)
};
dijit._place=function(F,C,Q){var R=dijit.getViewport();
if(!F.parentNode||String(F.parentNode.tagName).toLowerCase()!="body"){A.body().appendChild(F)
}var N=null;
for(var G=0;
G<C.length;
G++){var P=C[G].corner;
var O=C[G].pos;
if(Q){Q(P)
}var B=F.style.display;
var K=F.style.visibility;
F.style.visibility="hidden";
F.style.display="";
var J=A.marginBox(F);
F.style.display=B;
F.style.visibility=K;
var I=(P.charAt(1)=="L"?O.x:Math.max(R.l,O.x-J.w)),H=(P.charAt(0)=="T"?O.y:Math.max(R.t,O.y-J.h)),M=(P.charAt(1)=="L"?Math.min(R.l+R.w,I+J.w):O.x),L=(P.charAt(0)=="T"?Math.min(R.t+R.h,H+J.h):O.y),D=M-I,S=L-H,E=(J.w-D)+(J.h-S);
if(N==null||E<N.overflow){N={corner:P,aroundCorner:C[G].aroundCorner,x:I,y:H,w:D,h:S,overflow:E}
}if(E==0){break
}}F.style.left=N.x+"px";
F.style.top=N.y+"px";
return N
};
dijit.placeOnScreenAroundElement=function(K,D,E,B){D=A.byId(D);
var G=D.style.display;
D.style.display="";
var H=D.offsetWidth;
var C=D.offsetHeight;
var F=A.coords(D,true);
D.style.display=G;
var I=[];
for(var J in E){I.push({aroundCorner:J,corner:E[J],pos:{x:F.x+(J.charAt(1)=="L"?0:H),y:F.y+(J.charAt(0)=="T"?0:C)}})
}return dijit._place(K,I,B)
}
}}});