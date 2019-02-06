if(!dojo._hasResource["dijit._base.place"]){dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){var A=dojo.global;
var G=dojo.doc;
var H=0,C=0;
if(dojo.isMozilla){var I,D,E,B;
if(G.body.clientWidth>G.documentElement.clientWidth){I=G.documentElement.clientWidth;
E=G.body.clientWidth
}else{E=G.documentElement.clientWidth;
I=G.body.clientWidth
}if(G.body.clientHeight>G.documentElement.clientHeight){D=G.documentElement.clientHeight;
B=G.body.clientHeight
}else{B=G.documentElement.clientHeight;
D=G.body.clientHeight
}H=(E>A.innerWidth)?I:E;
C=(B>A.innerHeight)?D:B
}else{if(!dojo.isOpera&&A.innerWidth){H=A.innerWidth;
C=A.innerHeight
}else{if(dojo.isIE&&G.documentElement&&G.documentElement.clientHeight){H=G.documentElement.clientWidth;
C=G.documentElement.clientHeight
}else{if(dojo.body().clientWidth){H=dojo.body().clientWidth;
C=dojo.body().clientHeight
}}}}var F=dojo._docScroll();
return{w:H,h:C,l:F.x,t:F.y}
};
dijit.placeOnScreen=function(B,E,A,C){var D=dojo.map(A,function(F){return{corner:F,pos:E}
});
return dijit._place(B,D)
};
dijit._place=function(O,L,H){var I=dijit.getViewport();
if(!O.parentNode||String(O.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(O)
}var E=null;
for(var P=0;
P<L.length;
P++){var G=L[P].corner;
var F=L[P].pos;
if(H){H(G)
}var K=O.style.display;
var B=O.style.visibility;
O.style.visibility="hidden";
O.style.display="";
var A=dojo.marginBox(O);
O.style.display=K;
O.style.visibility=B;
var R=(G.charAt(1)=="L"?F.x:Math.max(I.l,F.x-A.w)),Q=(G.charAt(0)=="T"?F.y:Math.max(I.t,F.y-A.h)),D=(G.charAt(1)=="L"?Math.min(I.l+I.w,R+A.w):F.x),C=(G.charAt(0)=="T"?Math.min(I.t+I.h,Q+A.h):F.y),M=D-R,J=C-Q,N=(A.w-M)+(A.h-J);
if(E==null||N<E.overflow){E={corner:G,aroundCorner:L[P].aroundCorner,x:R,y:Q,w:M,h:J,overflow:N}
}if(N==0){break
}}O.style.left=E.x+"px";
O.style.top=E.y+"px";
return E
};
dijit.placeOnScreenAroundElement=function(B,E,F,C){E=dojo.byId(E);
var H=E.style.display;
E.style.display="";
var I=E.offsetWidth;
var D=E.offsetHeight;
var G=dojo.coords(E,true);
E.style.display=H;
var J=[];
for(var A in F){J.push({aroundCorner:A,corner:F[A],pos:{x:G.x+(A.charAt(1)=="L"?0:I),y:G.y+(A.charAt(0)=="T"?0:D)}})
}return dijit._place(B,J,C)
}
};