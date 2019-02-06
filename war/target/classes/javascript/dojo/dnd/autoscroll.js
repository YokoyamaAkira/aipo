if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var C=dojo.doc,A=C.documentElement,B=window,D=dojo.body();
if(dojo.isMozilla){return{w:A.clientWidth,h:B.innerHeight}
}else{if(!dojo.isOpera&&B.innerWidth){return{w:B.innerWidth,h:B.innerHeight}
}else{if(!dojo.isOpera&&A&&A.clientWidth){return{w:A.clientWidth,h:A.clientHeight}
}else{if(D.clientWidth){return{w:D.clientWidth,h:D.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(C){var B=dojo.dnd.getViewport(),A=0,D=0;
if(C.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){A=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(C.clientX>B.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){A=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(C.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){D=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(C.clientY>B.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){D=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(A,D)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(A){for(var K=A.target;
K;
){if(K.nodeType==1&&(K.tagName.toLowerCase() in dojo.dnd._validNodes)){var H=dojo.getComputedStyle(K);
if(H.overflow.toLowerCase() in dojo.dnd._validOverflow){var B=dojo._getContentBox(K,H),F=dojo._abs(K,true);
B.l+=F.x+K.scrollLeft;
B.t+=F.y+K.scrollTop;
var D=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,B.w/2),N=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,B.h/2),J=A.pageX-B.l,I=A.pageY-B.t,G=0,E=0;
if(J>0&&J<B.w){if(J<D){G=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(J>B.w-D){G=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(I>0&&I<B.h){if(I<N){E=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(I>B.h-N){E=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var L=K.scrollLeft,M=K.scrollTop;
K.scrollLeft=K.scrollLeft+G;
K.scrollTop=K.scrollTop+E;
if(L!=K.scrollLeft||M!=K.scrollTop){return 
}}}try{K=K.parentNode
}catch(C){K=null
}}dojo.dnd.autoScroll(A)
}
};