if(!dojo._hasResource["dijit._base.place"]){dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){var F=dojo.global;
var C=dojo.doc;
var D=0,H=0;
if(dojo.isMozilla){var E,I,A,G;
if(C.body.clientWidth>C.documentElement.clientWidth){E=C.documentElement.clientWidth;
A=C.body.clientWidth
}else{A=C.documentElement.clientWidth;
E=C.body.clientWidth
}if(C.body.clientHeight>C.documentElement.clientHeight){I=C.documentElement.clientHeight;
G=C.body.clientHeight
}else{G=C.documentElement.clientHeight;
I=C.body.clientHeight
}D=(A>F.innerWidth)?E:A;
H=(G>F.innerHeight)?I:G
}else{if(!dojo.isOpera&&F.innerWidth){D=F.innerWidth;
H=F.innerHeight
}else{if(dojo.isIE&&C.documentElement&&C.documentElement.clientHeight){D=C.documentElement.clientWidth;
H=C.documentElement.clientHeight
}else{if(dojo.body().clientWidth){D=dojo.body().clientWidth;
H=dojo.body().clientHeight
}}}}var B=dojo._docScroll();
return{w:D,h:H,l:B.x,t:B.y}
};
dijit.placeOnScreen=function(A,D,E,B){var C=dojo.map(E,function(F){return{corner:F,pos:D}
});
return dijit._place(A,C)
};
dijit._place=function(E,B,P){var Q=dijit.getViewport();
if(!E.parentNode||String(E.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(E)
}var M=null;
for(var F=0;
F<B.length;
F++){var O=B[F].corner;
var N=B[F].pos;
if(P){P(O)
}var A=E.style.display;
var J=E.style.visibility;
E.style.visibility="hidden";
E.style.display="";
var I=dojo.marginBox(E);
E.style.display=A;
E.style.visibility=J;
var H=(O.charAt(1)=="L"?N.x:Math.max(Q.l,N.x-I.w)),G=(O.charAt(0)=="T"?N.y:Math.max(Q.t,N.y-I.h)),L=(O.charAt(1)=="L"?Math.min(Q.l+Q.w,H+I.w):N.x),K=(O.charAt(0)=="T"?Math.min(Q.t+Q.h,G+I.h):N.y),C=L-H,R=K-G,D=(I.w-C)+(I.h-R);
if(M==null||D<M.overflow){M={corner:O,aroundCorner:B[F].aroundCorner,x:H,y:G,w:C,h:R,overflow:D}
}if(D==0){break
}}E.style.left=M.x+"px";
E.style.top=M.y+"px";
return M
};
dijit.placeOnScreenAroundElement=function(H,A,B,I){A=dojo.byId(A);
var D=A.style.display;
A.style.display="";
var E=A.offsetWidth;
var J=A.offsetHeight;
var C=dojo.coords(A,true);
A.style.display=D;
var F=[];
for(var G in B){F.push({aroundCorner:G,corner:B[G],pos:{x:C.x+(G.charAt(1)=="L"?0:E),y:C.y+(G.charAt(0)=="T"?0:J)}})
}return dijit._place(H,F,I)
}
};