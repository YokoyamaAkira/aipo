if(!dojo._hasResource["dojox.grid._grid.lib"]){dojo._hasResource["dojox.grid._grid.lib"]=true;
dojo.provide("dojox.grid._grid.lib");
dojo.isNumber=function(A){return(typeof A=="number")||(A instanceof Number)
};
dojo.mixin(dojox.grid,{na:"...",nop:function(){},getTdIndex:function(A){return A.cellIndex>=0?A.cellIndex:dojo.indexOf(A.parentNode.cells,A)
},getTrIndex:function(A){return A.rowIndex>=0?A.rowIndex:dojo.indexOf(A.parentNode.childNodes,A)
},getTr:function(A,B){return A&&((A.rows||0)[B]||A.childNodes[B])
},getTd:function(A,B,C){return(dojox.grid.getTr(inTable,B)||0)[C]
},findTable:function(B){for(var A=B;
A&&A.tagName!="TABLE";
A=A.parentNode){}return A
},ascendDom:function(B,C){for(var A=B;
A&&C(A);
A=A.parentNode){}return A
},makeNotTagName:function(A){var B=A.toUpperCase();
return function(C){return C.tagName!=B
}
},fire:function(D,C,A){var B=D&&C&&D[C];
return B&&(A?B.apply(D,A):D[C]())
},setStyleText:function(A,B){if(A.style.cssText==undefined){A.setAttribute("style",B)
}else{A.style.cssText=B
}},getStyleText:function(A,B){return(A.style.cssText==undefined?A.getAttribute("style"):A.style.cssText)
},setStyle:function(B,C,A){if(B&&B.style[C]!=A){B.style[C]=A
}},setStyleHeightPx:function(A,B){if(B>=0){dojox.grid.setStyle(A,"height",B+"px")
}},mouseEvents:["mouseover","mouseout","mousedown","mouseup","click","dblclick","contextmenu"],keyEvents:["keyup","keydown","keypress"],funnelEvents:function(D,B,A,C){var F=(C?C:dojox.grid.mouseEvents.concat(dojox.grid.keyEvents));
for(var G=0,E=F.length;
G<E;
G++){dojo.connect(D,"on"+F[G],B,A)
}},removeNode:function(A){A=dojo.byId(A);
A&&A.parentNode&&A.parentNode.removeChild(A);
return A
},getScrollbarWidth:function(){if(this._scrollBarWidth){return this._scrollBarWidth
}this._scrollBarWidth=18;
try{var A=document.createElement("div");
A.style.cssText="top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
document.body.appendChild(A);
this._scrollBarWidth=A.offsetWidth-A.clientWidth;
document.body.removeChild(A);
delete A
}catch(B){}return this._scrollBarWidth
},getRef:function(D,G,F){var B=F||dojo.global,A=D.split("."),C=A.pop();
for(var E=0,H;
B&&(H=A[E]);
E++){B=(H in B?B[H]:(G?B[H]={}:undefined))
}return{obj:B,prop:C}
},getProp:function(name,create,context){with(dojox.grid.getRef(name,create,context)){return(obj)&&(prop)&&(prop in obj?obj[prop]:(create?obj[prop]={}:undefined))
}},indexInParent:function(C){var D=0,B,A=C.parentNode;
while(B=A.childNodes[D++]){if(B==C){return D-1
}}return -1
},cleanNode:function(D){if(!D){return 
}var C=function(F){return F.domNode&&dojo.isDescendant(F.domNode,D,true)
};
var A=dijit.registry.filter(C);
for(var B=0,E;
(E=A[B]);
B++){E.destroy()
}delete A
},getTagName:function(B){var A=dojo.byId(B);
return(A&&A.tagName?A.tagName.toLowerCase():"")
},nodeKids:function(D,C){var E=[];
var A=0,B;
while(B=D.childNodes[A++]){if(dojox.grid.getTagName(B)==C){E.push(B)
}}return E
},divkids:function(A){return dojox.grid.nodeKids(A,"div")
},focusSelectNode:function(A){try{dojox.grid.fire(A,"focus");
dojox.grid.fire(A,"select")
}catch(B){}},whenIdle:function(){setTimeout(dojo.hitch.apply(dojo,arguments),0)
},arrayCompare:function(C,B){for(var A=0,D=C.length;
A<D;
A++){if(C[A]!=B[A]){return false
}}return(C.length==B.length)
},arrayInsert:function(A,B,C){if(A.length<=B){A[B]=C
}else{A.splice(B,0,C)
}},arrayRemove:function(B,A){B.splice(A,1)
},arraySwap:function(C,A,D){var B=C[A];
C[A]=C[D];
C[D]=B
},initTextSizePoll:function(inInterval){var f=document.createElement("div");
with(f.style){top="0px";
left="0px";
position="absolute";
visibility="hidden"
}f.innerHTML="TheQuickBrownFoxJumpedOverTheLazyDog";
document.body.appendChild(f);
var fw=f.offsetWidth;
var job=function(){if(f.offsetWidth!=fw){fw=f.offsetWidth;
dojox.grid.textSizeChanged()
}};
window.setInterval(job,inInterval||200);
dojox.grid.initTextSizePoll=dojox.grid.nop
},textSizeChanged:function(){}});
dojox.grid.jobs={cancel:function(A){if(A){window.clearTimeout(A)
}},jobs:[],job:function(B,C,D){dojox.grid.jobs.cancelJob(B);
var A=function(){delete dojox.grid.jobs.jobs[B];
D()
};
dojox.grid.jobs.jobs[B]=setTimeout(A,C)
},cancelJob:function(A){dojox.grid.jobs.cancel(dojox.grid.jobs.jobs[A])
}}
};