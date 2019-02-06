dojo._xdResourceLoaded({depends:[["provide","dijit._base.place"]],defineResource:function(A){if(!A._hasResource["dijit._base.place"]){A._hasResource["dijit._base.place"]=true;
A.provide("dijit._base.place");
dijit.getViewport=function(){var B=A.global;
var H=A.doc;
var I=0,D=0;
if(A.isMozilla){var J,E,F,C;
if(H.body.clientWidth>H.documentElement.clientWidth){J=H.documentElement.clientWidth;
F=H.body.clientWidth
}else{F=H.documentElement.clientWidth;
J=H.body.clientWidth
}if(H.body.clientHeight>H.documentElement.clientHeight){E=H.documentElement.clientHeight;
C=H.body.clientHeight
}else{C=H.documentElement.clientHeight;
E=H.body.clientHeight
}I=(F>B.innerWidth)?J:F;
D=(C>B.innerHeight)?E:C
}else{if(!A.isOpera&&B.innerWidth){I=B.innerWidth;
D=B.innerHeight
}else{if(A.isIE&&H.documentElement&&H.documentElement.clientHeight){I=H.documentElement.clientWidth;
D=H.documentElement.clientHeight
}else{if(A.body().clientWidth){I=A.body().clientWidth;
D=A.body().clientHeight
}}}}var G=A._docScroll();
return{w:I,h:D,l:G.x,t:G.y}
};
dijit.placeOnScreen=function(C,F,B,D){var E=A.map(B,function(G){return{corner:G,pos:F}
});
return dijit._place(C,E)
};
dijit._place=function(P,M,I){var J=dijit.getViewport();
if(!P.parentNode||String(P.parentNode.tagName).toLowerCase()!="body"){A.body().appendChild(P)
}var F=null;
for(var Q=0;
Q<M.length;
Q++){var H=M[Q].corner;
var G=M[Q].pos;
if(I){I(H)
}var L=P.style.display;
var C=P.style.visibility;
P.style.visibility="hidden";
P.style.display="";
var B=A.marginBox(P);
P.style.display=L;
P.style.visibility=C;
var S=(H.charAt(1)=="L"?G.x:Math.max(J.l,G.x-B.w)),R=(H.charAt(0)=="T"?G.y:Math.max(J.t,G.y-B.h)),E=(H.charAt(1)=="L"?Math.min(J.l+J.w,S+B.w):G.x),D=(H.charAt(0)=="T"?Math.min(J.t+J.h,R+B.h):G.y),N=E-S,K=D-R,O=(B.w-N)+(B.h-K);
if(F==null||O<F.overflow){F={corner:H,aroundCorner:M[Q].aroundCorner,x:S,y:R,w:N,h:K,overflow:O}
}if(O==0){break
}}P.style.left=F.x+"px";
P.style.top=F.y+"px";
return F
};
dijit.placeOnScreenAroundElement=function(C,F,G,D){F=A.byId(F);
var I=F.style.display;
F.style.display="";
var J=F.offsetWidth;
var E=F.offsetHeight;
var H=A.coords(F,true);
F.style.display=I;
var K=[];
for(var B in G){K.push({aroundCorner:B,corner:G[B],pos:{x:H.x+(B.charAt(1)=="L"?0:J),y:H.y+(B.charAt(0)=="T"?0:E)}})
}return dijit._place(C,K,D)
}
}}});