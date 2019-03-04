if(!dojo._hasResource["dojox.grid._grid.lib"]){dojo._hasResource["dojox.grid._grid.lib"]=true;
dojo.provide("dojox.grid._grid.lib");
dojo.isNumber=function(A){return(typeof A=="number")||(A instanceof Number)
};
dojo.mixin(dojox.grid,{na:"...",nop:function(){},getTdIndex:function(A){return A.cellIndex>=0?A.cellIndex:dojo.indexOf(A.parentNode.cells,A)
},getTrIndex:function(A){return A.rowIndex>=0?A.rowIndex:dojo.indexOf(A.parentNode.childNodes,A)
},getTr:function(B,A){return B&&((B.rows||0)[A]||B.childNodes[A])
},getTd:function(B,C,A){return(dojox.grid.getTr(inTable,C)||0)[A]
},findTable:function(A){for(var B=A;
B&&B.tagName!="TABLE";
B=B.parentNode){}return B
},ascendDom:function(C,A){for(var B=C;
B&&A(B);
B=B.parentNode){}return B
},makeNotTagName:function(B){var A=B.toUpperCase();
return function(C){return C.tagName!=A
}
},fire:function(A,D,B){var C=A&&D&&A[D];
return C&&(B?C.apply(A,B):A[D]())
},setStyleText:function(B,A){if(B.style.cssText==undefined){B.setAttribute("style",A)
}else{B.style.cssText=A
}},getStyleText:function(B,A){return(B.style.cssText==undefined?B.getAttribute("style"):B.style.cssText)
},setStyle:function(C,A,B){if(C&&C.style[A]!=B){C.style[A]=B
}},setStyleHeightPx:function(B,A){if(A>=0){dojox.grid.setStyle(B,"height",A+"px")
}},mouseEvents:["mouseover","mouseout","mousedown","mouseup","click","dblclick","contextmenu"],keyEvents:["keyup","keydown","keypress"],funnelEvents:function(G,E,D,F){var B=(F?F:dojox.grid.mouseEvents.concat(dojox.grid.keyEvents));
for(var C=0,A=B.length;
C<A;
C++){dojo.connect(G,"on"+B[C],E,D)
}},removeNode:function(A){A=dojo.byId(A);
A&&A.parentNode&&A.parentNode.removeChild(A);
return A
},getScrollbarWidth:function(){if(this._scrollBarWidth){return this._scrollBarWidth
}this._scrollBarWidth=18;
try{var B=document.createElement("div");
B.style.cssText="top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
document.body.appendChild(B);
this._scrollBarWidth=B.offsetWidth-B.clientWidth;
document.body.removeChild(B);
delete B
}catch(A){}return this._scrollBarWidth
},getRef:function(A,D,C){var G=C||dojo.global,F=A.split("."),H=F.pop();
for(var B=0,E;
G&&(E=F[B]);
B++){G=(E in G?G[E]:(D?G[E]={}:undefined))
}return{obj:G,prop:H}
},getProp:function(name,create,context){with(dojox.grid.getRef(name,create,context)){return(obj)&&(prop)&&(prop in obj?obj[prop]:(create?obj[prop]={}:undefined))
}},indexInParent:function(D){var A=0,C,B=D.parentNode;
while(C=B.childNodes[A++]){if(C==D){return A-1
}}return -1
},cleanNode:function(E){if(!E){return 
}var D=function(F){return F.domNode&&dojo.isDescendant(F.domNode,E,true)
};
var B=dijit.registry.filter(D);
for(var C=0,A;
(A=B[C]);
C++){A.destroy()
}delete B
},getTagName:function(A){var B=dojo.byId(A);
return(B&&B.tagName?B.tagName.toLowerCase():"")
},nodeKids:function(E,D){var A=[];
var B=0,C;
while(C=E.childNodes[B++]){if(dojox.grid.getTagName(C)==D){A.push(C)
}}return A
},divkids:function(A){return dojox.grid.nodeKids(A,"div")
},focusSelectNode:function(B){try{dojox.grid.fire(B,"focus");
dojox.grid.fire(B,"select")
}catch(A){}},whenIdle:function(){setTimeout(dojo.hitch.apply(dojo,arguments),0)
},arrayCompare:function(D,C){for(var B=0,A=D.length;
B<A;
B++){if(D[B]!=C[B]){return false
}}return(D.length==C.length)
},arrayInsert:function(B,C,A){if(B.length<=C){B[C]=A
}else{B.splice(C,0,A)
}},arrayRemove:function(A,B){A.splice(B,1)
},arraySwap:function(D,B,A){var C=D[B];
D[B]=D[A];
D[A]=C
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
}},jobs:[],job:function(C,D,A){dojox.grid.jobs.cancelJob(C);
var B=function(){delete dojox.grid.jobs.jobs[C];
A()
};
dojox.grid.jobs.jobs[C]=setTimeout(B,D)
},cancelJob:function(A){dojox.grid.jobs.cancel(dojox.grid.jobs.jobs[A])
}}
};