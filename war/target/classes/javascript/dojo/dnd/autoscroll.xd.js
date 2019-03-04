dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.autoscroll"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.autoscroll"]){A._hasResource["dojo.dnd.autoscroll"]=true;
A.provide("dojo.dnd.autoscroll");
A.dnd.getViewport=function(){var E=A.doc,C=E.documentElement,D=window,B=A.body();
if(A.isMozilla){return{w:C.clientWidth,h:D.innerHeight}
}else{if(!A.isOpera&&D.innerWidth){return{w:D.innerWidth,h:D.innerHeight}
}else{if(!A.isOpera&&C&&C.clientWidth){return{w:C.clientWidth,h:C.clientHeight}
}else{if(B.clientWidth){return{w:B.clientWidth,h:B.clientHeight}
}}}}return null
};
A.dnd.V_TRIGGER_AUTOSCROLL=32;
A.dnd.H_TRIGGER_AUTOSCROLL=32;
A.dnd.V_AUTOSCROLL_VALUE=16;
A.dnd.H_AUTOSCROLL_VALUE=16;
A.dnd.autoScroll=function(E){var D=A.dnd.getViewport(),C=0,B=0;
if(E.clientX<A.dnd.H_TRIGGER_AUTOSCROLL){C=-A.dnd.H_AUTOSCROLL_VALUE
}else{if(E.clientX>D.w-A.dnd.H_TRIGGER_AUTOSCROLL){C=A.dnd.H_AUTOSCROLL_VALUE
}}if(E.clientY<A.dnd.V_TRIGGER_AUTOSCROLL){B=-A.dnd.V_AUTOSCROLL_VALUE
}else{if(E.clientY>D.h-A.dnd.V_TRIGGER_AUTOSCROLL){B=A.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(C,B)
};
A.dnd._validNodes={div:1,p:1,td:1};
A.dnd._validOverflow={auto:1,scroll:1};
A.dnd.autoScrollNodes=function(H){for(var D=H.target;
D;
){if(D.nodeType==1&&(D.tagName.toLowerCase() in A.dnd._validNodes)){var O=A.getComputedStyle(D);
if(O.overflow.toLowerCase() in A.dnd._validOverflow){var I=A._getContentBox(D,O),M=A._abs(D,true);
I.l+=M.x+D.scrollLeft;
I.t+=M.y+D.scrollTop;
var K=Math.min(A.dnd.H_TRIGGER_AUTOSCROLL,I.w/2),G=Math.min(A.dnd.V_TRIGGER_AUTOSCROLL,I.h/2),C=H.pageX-I.l,B=H.pageY-I.t,N=0,L=0;
if(C>0&&C<I.w){if(C<K){N=-A.dnd.H_AUTOSCROLL_VALUE
}else{if(C>I.w-K){N=A.dnd.H_AUTOSCROLL_VALUE
}}}if(B>0&&B<I.h){if(B<G){L=-A.dnd.V_AUTOSCROLL_VALUE
}else{if(B>I.h-G){L=A.dnd.V_AUTOSCROLL_VALUE
}}}var E=D.scrollLeft,F=D.scrollTop;
D.scrollLeft=D.scrollLeft+N;
D.scrollTop=D.scrollTop+L;
if(E!=D.scrollLeft||F!=D.scrollTop){return 
}}}try{D=D.parentNode
}catch(J){D=null
}}A.dnd.autoScroll(H)
}
}}});