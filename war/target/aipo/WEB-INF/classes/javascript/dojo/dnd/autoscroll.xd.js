dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.autoscroll"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.autoscroll"]){A._hasResource["dojo.dnd.autoscroll"]=true;
A.provide("dojo.dnd.autoscroll");
A.dnd.getViewport=function(){var B=A.doc,D=B.documentElement,E=window,C=A.body();
if(A.isMozilla){return{w:D.clientWidth,h:E.innerHeight}
}else{if(!A.isOpera&&E.innerWidth){return{w:E.innerWidth,h:E.innerHeight}
}else{if(!A.isOpera&&D&&D.clientWidth){return{w:D.clientWidth,h:D.clientHeight}
}else{if(C.clientWidth){return{w:C.clientWidth,h:C.clientHeight}
}}}}return null
};
A.dnd.V_TRIGGER_AUTOSCROLL=32;
A.dnd.H_TRIGGER_AUTOSCROLL=32;
A.dnd.V_AUTOSCROLL_VALUE=16;
A.dnd.H_AUTOSCROLL_VALUE=16;
A.dnd.autoScroll=function(B){var E=A.dnd.getViewport(),D=0,C=0;
if(B.clientX<A.dnd.H_TRIGGER_AUTOSCROLL){D=-A.dnd.H_AUTOSCROLL_VALUE
}else{if(B.clientX>E.w-A.dnd.H_TRIGGER_AUTOSCROLL){D=A.dnd.H_AUTOSCROLL_VALUE
}}if(B.clientY<A.dnd.V_TRIGGER_AUTOSCROLL){C=-A.dnd.V_AUTOSCROLL_VALUE
}else{if(B.clientY>E.h-A.dnd.V_TRIGGER_AUTOSCROLL){C=A.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(D,C)
};
A.dnd._validNodes={div:1,p:1,td:1};
A.dnd._validOverflow={auto:1,scroll:1};
A.dnd.autoScrollNodes=function(C){for(var E=C.target;
E;
){if(E.nodeType==1&&(E.tagName.toLowerCase() in A.dnd._validNodes)){var K=A.getComputedStyle(E);
if(K.overflow.toLowerCase() in A.dnd._validOverflow){var D=A._getContentBox(E,K),I=A._abs(E,true);
D.l+=I.x+E.scrollLeft;
D.t+=I.y+E.scrollTop;
var G=Math.min(A.dnd.H_TRIGGER_AUTOSCROLL,D.w/2),B=Math.min(A.dnd.V_TRIGGER_AUTOSCROLL,D.h/2),M=C.pageX-D.l,L=C.pageY-D.t,J=0,H=0;
if(M>0&&M<D.w){if(M<G){J=-A.dnd.H_AUTOSCROLL_VALUE
}else{if(M>D.w-G){J=A.dnd.H_AUTOSCROLL_VALUE
}}}if(L>0&&L<D.h){if(L<B){H=-A.dnd.V_AUTOSCROLL_VALUE
}else{if(L>D.h-B){H=A.dnd.V_AUTOSCROLL_VALUE
}}}var N=E.scrollLeft,O=E.scrollTop;
E.scrollLeft=E.scrollLeft+J;
E.scrollTop=E.scrollTop+H;
if(N!=E.scrollLeft||O!=E.scrollTop){return 
}}}try{E=E.parentNode
}catch(F){E=null
}}A.dnd.autoScroll(C)
}
}}});