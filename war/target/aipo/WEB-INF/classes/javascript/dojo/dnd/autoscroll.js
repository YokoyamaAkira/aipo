if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var D=dojo.doc,B=D.documentElement,C=window,A=dojo.body();
if(dojo.isMozilla){return{w:B.clientWidth,h:C.innerHeight}
}else{if(!dojo.isOpera&&C.innerWidth){return{w:C.innerWidth,h:C.innerHeight}
}else{if(!dojo.isOpera&&B&&B.clientWidth){return{w:B.clientWidth,h:B.clientHeight}
}else{if(A.clientWidth){return{w:A.clientWidth,h:A.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(D){var C=dojo.dnd.getViewport(),B=0,A=0;
if(D.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){B=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(D.clientX>C.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){B=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(D.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){A=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(D.clientY>C.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){A=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(B,A)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(G){for(var C=G.target;
C;
){if(C.nodeType==1&&(C.tagName.toLowerCase() in dojo.dnd._validNodes)){var N=dojo.getComputedStyle(C);
if(N.overflow.toLowerCase() in dojo.dnd._validOverflow){var H=dojo._getContentBox(C,N),L=dojo._abs(C,true);
H.l+=L.x+C.scrollLeft;
H.t+=L.y+C.scrollTop;
var J=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,H.w/2),F=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,H.h/2),B=G.pageX-H.l,A=G.pageY-H.t,M=0,K=0;
if(B>0&&B<H.w){if(B<J){M=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(B>H.w-J){M=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(A>0&&A<H.h){if(A<F){K=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(A>H.h-F){K=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var D=C.scrollLeft,E=C.scrollTop;
C.scrollLeft=C.scrollLeft+M;
C.scrollTop=C.scrollTop+K;
if(D!=C.scrollLeft||E!=C.scrollTop){return 
}}}try{C=C.parentNode
}catch(I){C=null
}}dojo.dnd.autoScroll(G)
}
};