if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var B=dojo.global;
var C=dojo.doc;
if(C.selection){return !C.selection.createRange().text
}else{if(B.getSelection){var A=B.getSelection();
if(dojo.isString(A)){return !A
}else{return A.isCollapsed||!A.toString()
}}}},getBookmark:function(){var B,A=dojo.doc.selection;
if(A){var C=A.createRange();
if(A.type.toUpperCase()=="CONTROL"){B=C.length?dojo._toArray(C):null
}else{B=C.getBookmark()
}}else{if(dojo.global.getSelection){A=dojo.global.getSelection();
if(A){var C=A.getRangeAt(0);
B=C.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return B
},moveToBookmark:function(C){var D=dojo.doc;
if(D.selection){var A;
if(dojo.isArray(C)){A=D.body.createControlRange();
dojo.forEach(C,A.addElement)
}else{A=D.selection.createRange();
A.moveToBookmark(C)
}A.select()
}else{var B=dojo.global.getSelection&&dojo.global.getSelection();
if(B&&B.removeAllRanges){B.removeAllRanges();
B.addRange(C)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(A,B){return{node:A&&dojo.isDescendant(dijit._curFocus,A.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(B||dojo.global,dijit.isCollapsed)?dojo.withGlobal(B||dojo.global,dijit.getBookmark):null,openedForWindow:B}
},focus:function(C){if(!C){return 
}var B="node" in C?C.node:C,A=C.bookmark,F=C.openedForWindow;
if(B){var E=(B.tagName.toLowerCase()=="iframe")?B.contentWindow:B;
if(E&&E.focus){try{E.focus()
}catch(D){}}dijit._onFocusNode(B)
}if(A&&dojo.withGlobal(F||dojo.global,dijit.isCollapsed)){if(F){F.focus()
}try{dojo.withGlobal(F||dojo.global,moveToBookmark,null,[A])
}catch(D){}}},_activeStack:[],registerWin:function(A){if(!A){A=window
}dojo.connect(A.document,"onmousedown",null,function(C){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(C.target||C.srcElement)
});
var B=A.document.body||A.document.getElementsByTagName("body")[0];
if(B){if(dojo.isIE){B.attachEvent("onactivate",function(C){if(C.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(C.srcElement)
}});
B.attachEvent("ondeactivate",function(C){dijit._onBlurNode(C.srcElement)
})
}else{B.addEventListener("focus",function(C){dijit._onFocusNode(C.target)
},true);
B.addEventListener("blur",function(C){dijit._onBlurNode(C.target)
},true)
}}B=null
},_onBlurNode:function(A){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var B=dijit.getEnclosingWidget(A);
if(B&&B._setStateClass){B._focused=false;
B._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(A){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var D=[];
try{while(A){if(A.dijitPopupParent){A=dijit.byId(A.dijitPopupParent).domNode
}else{if(A.tagName&&A.tagName.toLowerCase()=="body"){if(A===dojo.body()){break
}A=dojo.query("iframe").filter(function(E){return E.contentDocument.body===A
})[0]
}else{var C=A.getAttribute&&A.getAttribute("widgetId");
if(C){D.unshift(C)
}A=A.parentNode
}}}}catch(B){}dijit._setStack(D)
},_onFocusNode:function(A){if(A&&A.tagName&&A.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(A);
if(A==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=A;
dojo.publish("focusNode",[A]);
var B=dijit.getEnclosingWidget(A);
if(B&&B._setStateClass){B._focused=true;
B._setStateClass()
}},_setStack:function(E){var D=dijit._activeStack;
dijit._activeStack=E;
for(var B=0;
B<Math.min(D.length,E.length);
B++){if(D[B]!=E[B]){break
}}for(var A=D.length-1;
A>=B;
A--){var C=dijit.byId(D[A]);
if(C){dojo.publish("widgetBlur",[C]);
if(C._onBlur){C._onBlur()
}}}for(var A=B;
A<E.length;
A++){var C=dijit.byId(E[A]);
if(C){dojo.publish("widgetFocus",[C]);
if(C._onFocus){C._onFocus()
}}}}});
dojo.addOnLoad(dijit.registerWin)
}if(!dojo._hasResource["dijit._base.manager"]){dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(A){if(this._hash[A.id]){throw new Error("Tried to register widget with id=="+A.id+" but that id is already registered")
}this._hash[A.id]=A
},remove:function(A){delete this._hash[A]
},forEach:function(B){for(var A in this._hash){B(this._hash[A])
}},filter:function(A){var B=new dijit.WidgetSet();
this.forEach(function(C){if(A(C)){B.add(C)
}});
return B
},byId:function(A){return this._hash[A]
},byClass:function(A){return this.filter(function(B){return B.declaredClass==A
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(B){var A;
do{A=B+"_"+(dijit._widgetTypeCtr[B]!==undefined?++dijit._widgetTypeCtr[B]:dijit._widgetTypeCtr[B]=0)
}while(dijit.byId(A));
return A
};
if(dojo.isIE){dojo.addOnUnload(function(){dijit.registry.forEach(function(A){A.destroy()
})
})
}dijit.byId=function(A){return(dojo.isString(A))?dijit.registry.byId(A):A
};
dijit.byNode=function(A){return dijit.registry.byId(A.getAttribute("widgetId"))
};
dijit.getEnclosingWidget=function(A){while(A){if(A.getAttribute&&A.getAttribute("widgetId")){return dijit.registry.byId(A.getAttribute("widgetId"))
}A=A.parentNode
}return null
}
}if(!dojo._hasResource["dijit._base.place"]){dojo._hasResource["dijit._base.place"]=true;
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
}if(!dojo._hasResource["dijit._base.window"]){dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(B){if(dojo.isSafari&&!B._parentWindow){var C=function(D){D.document._parentWindow=D;
for(var E=0;
E<D.frames.length;
E++){C(D.frames[E])
}};
C(window.top)
}if(dojo.isIE&&window!==document.parentWindow&&!B._parentWindow){B.parentWindow.execScript("document._parentWindow = window;","Javascript");
var A=B._parentWindow;
B._parentWindow=null;
return A
}return B._parentWindow||B.parentWindow||B.defaultView
}
}if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup=new function(){var C=[],A=1000,B=1;
this.open=function(D){var M=D.popup,L=D.orient||{BL:"TL",TL:"BL"},E=D.around,H=(D.around&&D.around.id)?(D.around.id+"_dropdown"):("popup_"+B++);
var G=dojo.doc.createElement("div");
G.id=H;
G.className="dijitPopup";
G.style.zIndex=A+C.length;
G.style.visibility="hidden";
if(D.parent){G.dijitPopupParent=D.parent.id
}dojo.body().appendChild(G);
M.domNode.style.display="";
G.appendChild(M.domNode);
var K=new dijit.BackgroundIframe(G);
var J=E?dijit.placeOnScreenAroundElement(G,E,L,M.orient?dojo.hitch(M,"orient"):null):dijit.placeOnScreen(G,D,L=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
G.style.visibility="visible";
var I=[];
function F(){for(var N=C.length-1;
N>0&&C[N].parent===C[N-1].widget;
N--){}return C[N]
}I.push(dojo.connect(G,"onkeypress",this,function(N){if(N.keyCode==dojo.keys.ESCAPE&&D.onCancel){D.onCancel()
}else{if(N.keyCode==dojo.keys.TAB){dojo.stopEvent(N);
var O=F();
if(O&&O.onCancel){O.onCancel()
}}}}));
if(M.onCancel){I.push(dojo.connect(M,"onCancel",null,D.onCancel))
}I.push(dojo.connect(M,M.onExecute?"onExecute":"onChange",null,function(){var N=F();
if(N&&N.onExecute){N.onExecute()
}}));
C.push({wrapper:G,iframe:K,widget:M,parent:D.parent,onExecute:D.onExecute,onCancel:D.onCancel,onClose:D.onClose,handlers:I});
if(M.onOpen){M.onOpen(J)
}return J
};
this.close=function(F){while(dojo.some(C,function(J){return J.widget==F
})){var I=C.pop(),E=I.wrapper,G=I.iframe,H=I.widget,D=I.onClose;
if(H.onClose){H.onClose()
}dojo.forEach(I.handlers,dojo.disconnect);
if(!H||!H.domNode){return 
}dojo.style(H.domNode,"display","none");
dojo.body().appendChild(H.domNode);
G.destroy();
dojo._destroyElement(E);
if(D){D()
}}}
}();
dijit._frames=new function(){var A=[];
this.pop=function(){var B;
if(A.length){B=A.pop();
B.style.display=""
}else{if(dojo.isIE){var C="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
B=dojo.doc.createElement(C)
}else{var B=dojo.doc.createElement("iframe");
B.src='javascript:""';
B.className="dijitBackgroundIframe"
}B.tabIndex=-1;
dojo.body().appendChild(B)
}return B
};
this.push=function(B){B.style.display="";
if(dojo.isIE){B.style.removeExpression("width");
B.style.removeExpression("height")
}A.push(B)
}
}();
if(dojo.isIE&&dojo.isIE<7){dojo.addOnLoad(function(){var A=dijit._frames;
dojo.forEach([A.pop()],A.push)
})
}dijit.BackgroundIframe=function(A){if(!A.id){throw new Error("no id")
}if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){var B=dijit._frames.pop();
A.appendChild(B);
if(dojo.isIE){B.style.setExpression("width","document.getElementById('"+A.id+"').offsetWidth");
B.style.setExpression("height","document.getElementById('"+A.id+"').offsetHeight")
}this.iframe=B
}};
dojo.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(B){if(dojo.isIE){if(dojo.marginBox(B.parentNode).h<=B.parentNode.scrollHeight){B.scrollIntoView(false)
}}else{if(dojo.isMozilla){B.scrollIntoView(false)
}else{var D=B.parentNode;
var A=D.scrollTop+dojo.marginBox(D).h;
var C=B.offsetTop+dojo.marginBox(B).h;
if(A<C){D.scrollTop+=(C-A)
}else{if(D.scrollTop>B.offsetTop){D.scrollTop-=(D.scrollTop-B.offsetTop)
}}}}}
}if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var D=dojo;
var C=D.isIE;
var E=D.isOpera;
var F=Math.floor;
var A={dj_ie:C,dj_ie6:F(C)==6,dj_ie7:F(C)==7,dj_iequirks:C&&D.isQuirks,dj_opera:E,dj_opera8:F(E)==8,dj_opera9:F(E)==9,dj_khtml:D.isKhtml,dj_safari:D.isSafari,dj_gecko:D.isMozilla};
for(var B in A){if(A[B]){var G=dojo.doc.documentElement;
if(G.className){G.className+=" "+B
}else{G.className=B
}}}})()
}if(!dojo._hasResource["dijit._base.bidi"]){dojo._hasResource["dijit._base.bidi"]=true;
dojo.provide("dijit._base.bidi");
dojo.addOnLoad(function(){if(!dojo._isBodyLtr()){dojo.addClass(dojo.body(),"dijitRtl")
}})
}if(!dojo._hasResource["dijit._base.typematic"]){dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout)
},trigger:function(E,D,G,C,B,F,A){if(B!=this._obj){this.stop();
this._initialDelay=A||500;
this._subsequentDelay=F||0.9;
this._obj=B;
this._evt=E;
this._node=G;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(D,C);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(B,F,E,D,A,C){return[dojo.connect(B,"onkeypress",this,function(G){if(G.keyCode==F.keyCode&&(!F.charCode||F.charCode==G.charCode)&&(F.ctrlKey===undefined||F.ctrlKey==G.ctrlKey)&&(F.altKey===undefined||F.altKey==G.ctrlKey)&&(F.shiftKey===undefined||F.shiftKey==G.ctrlKey)){dojo.stopEvent(G);
dijit.typematic.trigger(F,E,B,D,F,A,C)
}else{if(dijit.typematic._obj==F){dijit.typematic.stop()
}}}),dojo.connect(B,"onkeyup",this,function(G){if(dijit.typematic._obj==F){dijit.typematic.stop()
}})]
},addMouseListener:function(B,E,D,A,C){var F=dojo.connect;
return[F(B,"mousedown",this,function(G){dojo.stopEvent(G);
dijit.typematic.trigger(G,E,B,D,B,A,C)
}),F(B,"mouseup",this,function(G){dojo.stopEvent(G);
dijit.typematic.stop()
}),F(B,"mouseout",this,function(G){dojo.stopEvent(G);
dijit.typematic.stop()
}),F(B,"mousemove",this,function(G){dojo.stopEvent(G)
}),F(B,"dblclick",this,function(G){dojo.stopEvent(G);
if(dojo.isIE){dijit.typematic.trigger(G,E,B,D,B,A,C);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(A,B,E,D,C,F,G){return this.addKeyListener(B,E,D,C,F,G).concat(this.addMouseListener(A,D,C,F,G))
}}
}if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var A=document.createElement("div");
A.id="a11yTestNode";
A.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(A);
function B(){var E=dojo.getComputedStyle(A);
if(E){var D=E.backgroundImage;
var C=(E.borderTopColor==E.borderRightColor)||(D!=null&&(D=="none"||D=="url(invalid-url:)"));
dojo[C?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}B();
if(dojo.isIE){setInterval(B,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(A){if(A.hasAttribute){return A.hasAttribute("role")
}else{return A.getAttribute("role")?true:false
}},getWaiRole:function(A){var B=A.getAttribute("role");
if(B){var C=B.indexOf(":");
return C==-1?B:B.substring(C+1)
}else{return""
}},setWaiRole:function(B,A){if(dojo.isFF&&dojo.isFF<3){B.setAttribute("role","wairole:"+A)
}else{B.setAttribute("role",A)
}},removeWaiRole:function(A){A.removeAttribute("role")
},hasWaiState:function(B,A){if(dojo.isFF&&dojo.isFF<3){return B.hasAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{if(B.hasAttribute){return B.hasAttribute("aria-"+A)
}else{return B.getAttribute("aria-"+A)?true:false
}}},getWaiState:function(C,B){if(dojo.isFF&&dojo.isFF<3){return C.getAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{var A=C.getAttribute("aria-"+B);
return A?A:""
}},setWaiState:function(C,B,A){if(dojo.isFF&&dojo.isFF<3){C.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+B,A)
}else{C.setAttribute("aria-"+B,A)
}},removeWaiState:function(B,A){if(dojo.isFF&&dojo.isFF<3){B.removeAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{B.removeAttribute("aria-"+A)
}}})
}if(!dojo._hasResource["dijit._base"]){dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base")
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(D,A){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var B=dojo.date.stamp._isoRegExp.exec(D);
var F=null;
if(B){B.shift();
B[1]&&B[1]--;
B[6]&&(B[6]*=1000);
if(A){A=new Date(A);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(G){return A["get"+G]()
}).forEach(function(G,H){if(B[H]===undefined){B[H]=G
}})
}F=new Date(B[0]||1970,B[1]||0,B[2]||0,B[3]||0,B[4]||0,B[5]||0,B[6]||0);
var E=0;
var C=B[7]&&B[7].charAt(0);
if(C!="Z"){E=((B[8]||0)*60)+(Number(B[9])||0);
if(C!="-"){E*=-1
}}if(C){E-=F.getTimezoneOffset()
}if(E){F.setTime(F.getTime()+E*60000)
}}return F
};
dojo.date.stamp.toISOString=function(B,F){var E=function(K){return(K<10)?"0"+K:K
};
F=F||{};
var A=[];
var C=F.zulu?"getUTC":"get";
var I="";
if(F.selector!="time"){I=[B[C+"FullYear"](),E(B[C+"Month"]()+1),E(B[C+"Date"]())].join("-")
}A.push(I);
if(F.selector!="date"){var H=[E(B[C+"Hours"]()),E(B[C+"Minutes"]()),E(B[C+"Seconds"]())].join(":");
var G=B[C+"Milliseconds"]();
if(F.milliseconds){H+="."+(G<100?"0":"")+E(G)
}if(F.zulu){H+="Z"
}else{if(F.selector!="time"){var D=B.getTimezoneOffset();
var J=Math.abs(D);
H+=(D>0?"-":"+")+E(Math.floor(J/60))+":"+E(J%60)
}}A.push(H)
}return A.join("T")
}
}if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.parser=new function(){var D=dojo;
function E(F){if(D.isString(F)){return"string"
}if(typeof F=="number"){return"number"
}if(typeof F=="boolean"){return"boolean"
}if(D.isFunction(F)){return"function"
}if(D.isArray(F)){return"array"
}if(F instanceof Date){return"date"
}if(F instanceof D._Url){return"url"
}return"object"
}function A(H,G){switch(G){case"string":return H;
case"number":return H.length?Number(H):NaN;
case"boolean":return typeof H=="boolean"?H:!(H.toLowerCase()=="false");
case"function":if(D.isFunction(H)){H=H.toString();
H=D.trim(H.substring(H.indexOf("{")+1,H.length-1))
}try{if(H.search(/[^\w\.]+/i)!=-1){H=D.parser._nameAnonFunc(new Function(H),this)
}return D.getObject(H,false)
}catch(F){return new Function()
}case"array":return H.split(/\s*,\s*/);
case"date":switch(H){case"":return new Date("");
case"now":return new Date();
default:return D.date.stamp.fromISOString(H)
}case"url":return D.baseUrl+H;
default:return D.fromJson(H)
}}var C={};
function B(I){if(!C[I]){var G=D.getObject(I);
if(!D.isFunction(G)){throw new Error("Could not load class '"+I+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var J=G.prototype;
var F={};
for(var H in J){if(H.charAt(0)=="_"){continue
}var K=J[H];
F[H]=E(K)
}C[I]={cls:G,params:F}
}return C[I]
}this._functionFromScript=function(H){var I="";
var F="";
var G=H.getAttribute("args");
if(G){D.forEach(G.split(/\s*,\s*/),function(L,K){I+="var "+L+" = arguments["+K+"]; "
})
}var J=H.getAttribute("with");
if(J&&J.length){D.forEach(J.split(/\s*,\s*/),function(K){I+="with("+K+"){";
F+="}"
})
}return new Function(I+H.innerHTML+F)
};
this.instantiate=function(G){var F=[];
D.forEach(G,function(O){if(!O){return 
}var J=O.getAttribute("dojoType");
if((!J)||(!J.length)){return 
}var T=B(J);
var U=T.cls;
var M=U._noScript||U.prototype._noScript;
var P={};
var R=O.attributes;
for(var N in T.params){var H=R.getNamedItem(N);
if(!H||(!H.specified&&(!dojo.isIE||N.toLowerCase()!="value"))){continue
}var L=H.value;
switch(N){case"class":L=O.className;
break;
case"style":L=O.style&&O.style.cssText
}var S=T.params[N];
P[N]=A(L,S)
}if(!M){var Q=[],I=[];
D.query("> script[type^='dojo/']",O).orphan().forEach(function(Z){var X=Z.getAttribute("event"),a=Z.getAttribute("type"),Y=D.parser._functionFromScript(Z);
if(X){if(a=="dojo/connect"){Q.push({event:X,func:Y})
}else{P[X]=Y
}}else{I.push(Y)
}})
}var K=U.markupFactory;
if(!K&&U.prototype){K=U.prototype.markupFactory
}var W=K?K(P,O,U):new U(P,O);
F.push(W);
var V=O.getAttribute("jsId");
if(V){D.setObject(V,W)
}if(!M){dojo.forEach(Q,function(X){dojo.connect(W,X.event,null,X.func)
});
dojo.forEach(I,function(X){X.call(W)
})
}});
D.forEach(F,function(H){if(H&&(H.startup)&&((!H.getParent)||(!H.getParent()))){H.startup()
}});
return F
};
this.parse=function(G){var H=D.query("[dojoType]",G);
var F=this.instantiate(H);
return F
}
}();
(function(){var A=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,A)
}else{dojo._loaders.unshift(A)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(F,D){var C="$joinpoint";
var B=(D||dojo.parser._anon);
if(dojo.isIE){var E=F.__dojoNameCache;
if(E&&B[E]===F){return F.__dojoNameCache
}}var A="__"+dojo.parser._anonCtr++;
while(typeof B[A]!="undefined"){A="__"+dojo.parser._anonCtr++
}B[A]=F;
return A
}
}if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(A,B){this.create(A,B)
},create:function(D,A){this.srcNodeRef=dojo.byId(A);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(D){dojo.mixin(this,D)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var E in this.attributeMap){var C=this[this.attributeMap[E]||"domNode"];
var B=this[E];
if(typeof B!="object"&&(B!==""||(D&&D[E]))){switch(E){case"class":dojo.addClass(C,B);
break;
case"style":if(C.style.cssText){C.style.cssText+="; "+B
}else{C.style.cssText=B
}break;
default:C.setAttribute(E,B)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||dojo.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(A){this.destroyDescendants();
this.destroy()
},destroy:function(A){this.uninitialize();
dojo.forEach(this._connects,function(B){dojo.forEach(B,dojo.disconnect)
});
this.destroyRendering(A);
dijit.registry.remove(this.id)
},destroyRendering:function(A){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){dojo._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){dojo._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){dojo.forEach(this.getDescendants(),function(A){A.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var A=dojo.query("[widgetId]",this.domNode);
return A.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(C,B,D){var A=[];
if(B=="ondijitclick"){var E=this;
if(!this.nodesWithKeyClick[C.nodeName]){A.push(dojo.connect(C,"onkeydown",this,function(F){if(F.keyCode==dojo.keys.ENTER){return(dojo.isString(D))?E[D](F):D.call(E,F)
}else{if(F.keyCode==dojo.keys.SPACE){dojo.stopEvent(F)
}}}));
A.push(dojo.connect(C,"onkeyup",this,function(F){if(F.keyCode==dojo.keys.SPACE){return dojo.isString(D)?E[D](F):D.call(E,F)
}}))
}B="onclick"
}A.push(dojo.connect(C,B,this,D));
this._connects.push(A);
return A
},disconnect:function(A){for(var B=0;
B<this._connects.length;
B++){if(this._connects[B]==A){dojo.forEach(A,dojo.disconnect);
this._connects.splice(B,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=dojo.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(dojo.style(this.domNode,"display")!="none")
}})
}if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(D,B,C,E){var A=String(D);
if(!C){C="0"
}while(A.length<B){if(E){A+=C
}else{A=C+A
}}return A
};
dojo.string.substitute=function(B,C,A,D){return B.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(F,G,E){var H=dojo.getObject(G,false,C);
if(E){H=dojo.getObject(E,false,D)(H)
}if(A){H=A(H,G)
}return H.toString()
})
};
dojo.string.trim=function(A){A=A.replace(/^\s+/,"");
for(var B=A.length-1;
B>0;
B--){if(/\S/.test(A.charAt(B))){A=A.substring(0,B+1);
break
}}return A
}
}if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var A=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var B;
if(dojo.isString(A)){var G=this.declaredClass,D=this;
var E=dojo.string.substitute(A,this,function(H,I){if(I.charAt(0)=="!"){H=D[I.substr(1)]
}if(typeof H=="undefined"){throw new Error(G+" template:"+I)
}if(!H){return""
}return I.charAt(0)=="!"?H:H.toString().replace(/"/g,"&quot;")
},this);
B=dijit._Templated._createNodesFromText(E)[0]
}else{B=A.cloneNode(true)
}this._attachTemplateNodes(B);
var C=this.srcNodeRef;
if(C&&C.parentNode){C.parentNode.replaceChild(B,C)
}this.domNode=B;
if(this.widgetsInTemplate){var F=dojo.parser.parse(B);
this._attachTemplateNodes(F,function(H,I){return H[I]
})
}this._fillContent(C)
},_fillContent:function(A){var B=this.containerNode;
if(A&&B){while(A.hasChildNodes()){B.appendChild(A.firstChild)
}}},_attachTemplateNodes:function(J,M){M=M||function(Q,R){return Q.getAttribute(R)
};
var H=dojo.isArray(J)?J:(J.all||J.getElementsByTagName("*"));
var A=dojo.isArray(J)?0:-1;
for(;
A<H.length;
A++){var I=(A==-1)?J:H[A];
if(this.widgetsInTemplate&&M(I,"dojoType")){continue
}var K=M(I,"dojoAttachPoint");
if(K){var B,D=K.split(/\s*,\s*/);
while(B=D.shift()){if(dojo.isArray(this[B])){this[B].push(I)
}else{this[B]=I
}}}var P=M(I,"dojoAttachEvent");
if(P){var G,E=P.split(/\s*,\s*/);
var L=dojo.trim;
while(G=E.shift()){if(G){var N=null;
if(G.indexOf(":")!=-1){var F=G.split(":");
G=L(F[0]);
N=L(F[1])
}else{G=L(G)
}if(!N){N=G
}this.connect(I,G,N)
}}}var O=M(I,"waiRole");
if(O){dijit.setWaiRole(I,O)
}var C=M(I,"waiState");
if(C){dojo.forEach(C.split(/\s*,\s*/),function(Q){if(Q.indexOf("-")!=-1){var R=Q.split("-");
dijit.setWaiState(I,R[0],R[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(B,C,E){var D=dijit._Templated._templateCache;
var F=C||B;
var A=D[F];
if(A){return A
}if(!C){C=dijit._Templated._sanitizeTemplateString(dojo._getText(B))
}C=dojo.string.trim(C);
if(C.match(/\$\{([^\}]+)\}/g)||E){return(D[F]=C)
}else{return(D[F]=dijit._Templated._createNodesFromText(C)[0])
}};
dijit._Templated._sanitizeTemplateString=function(B){if(B){B=B.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var A=B.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(A){B=A[1]
}}else{B=""
}return B
};
if(dojo.isIE){dojo.addOnUnload(function(){var C=dijit._Templated._templateCache;
for(var A in C){var B=C[A];
if(!isNaN(B.nodeType)){dojo._destroyElement(B)
}delete C[A]
}})
}(function(){var A={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var B;
dijit._Templated._createNodesFromText=function(D){if(!B){B=dojo.doc.createElement("div");
B.style.display="none";
dojo.body().appendChild(B)
}var J="none";
var G=D.replace(/^\s+/,"");
for(var C in A){var E=A[C];
if(E.re.test(G)){J=C;
D=E.pre+D+E.post;
break
}}B.innerHTML=D;
if(B.normalize){B.normalize()
}var F={cell:"tr",row:"tbody",section:"table"}[J];
var I=(typeof F!="undefined")?B.getElementsByTagName(F)[0]:B;
var H=[];
while(I.firstChild){H.push(I.removeChild(I.firstChild))
}B.innerHTML="";
return H
}
})();
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}if(!dojo._hasResource["dijit._Container"]){dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Contained",null,{getParent:function(){for(var A=this.domNode.parentNode;
A;
A=A.parentNode){var B=A.getAttribute&&A.getAttribute("widgetId");
if(B){var C=dijit.byId(B);
return C.isContainer?C:null
}}return null
},_getSibling:function(A){var C=this.domNode;
do{C=C[A+"Sibling"]
}while(C&&C.nodeType!=1);
if(!C){return null
}var B=C.getAttribute("widgetId");
return dijit.byId(B)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(C,D){if(D===undefined){D="last"
}var A=this.containerNode||this.domNode;
if(D&&typeof D=="number"){var B=dojo.query("> [widgetid]",A);
if(B&&B.length>=D){A=B[D-1];
D="after"
}}dojo.place(C.domNode,A,D);
if(this._started&&!C._started){C.startup()
}},removeChild:function(A){var B=A.domNode;
B.parentNode.removeChild(B)
},_nextElement:function(A){do{A=A.nextSibling
}while(A&&A.nodeType!=1);
return A
},_firstElement:function(A){A=A.firstChild;
if(A&&A.nodeType!=1){A=this._nextElement(A)
}return A
},getChildren:function(){return dojo.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var A=this.containerNode||this.domNode;
return !!this._firstElement(A)
},_getSiblingOfChild:function(C,D){var A=C.domNode;
var B=(D>0?"nextSibling":"previousSibling");
do{A=A[B]
}while(A&&(A.nodeType!=1||!dijit.byNode(A)));
return A?dijit.byNode(A):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(E,D){var A=this._keyNavCodes={};
var C=dojo.hitch(this,this.focusPrev);
var B=dojo.hitch(this,this.focusNext);
dojo.forEach(E,function(F){A[F]=C
});
dojo.forEach(D,function(F){A[F]=B
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(dojo.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){dojo.forEach(this.getChildren(),dojo.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(A,B){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(A)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var A=this._getNextFocusableChild(this.focusedChild,1);
if(A.getFocalNodes){this.focusChild(A,A.getFocalNodes()[0])
}else{this.focusChild(A)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var A=this._getNextFocusableChild(this.focusedChild,-1);
if(A.getFocalNodes){var B=A.getFocalNodes();
this.focusChild(A,B[B.length-1])
}else{this.focusChild(A)
}},focusChild:function(A,B){if(A){if(this.focusedChild&&A!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=A;
if(B&&A.focusFocalNode){A.focusFocalNode(B)
}else{A.focus()
}}},_setTabIndexMinusOne:function(A){if(A.getFocalNodes){dojo.forEach(A.getFocalNodes(),function(B){B.setAttribute("tabIndex",-1)
})
}else{(A.focusNode||A.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(B){this.domNode.setAttribute("tabIndex",-1);
if(B.target===this.domNode){this.focusFirstChild()
}else{var A=dijit.getEnclosingWidget(B.target);
if(A&&A.isFocusable()){this.focusedChild=A
}}},_onContainerBlur:function(A){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(B){if(B.ctrlKey||B.altKey){return 
}var A=this._keyNavCodes[B.keyCode];
if(A){A();
dojo.stopEvent(B)
}},_onChildBlur:function(A){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(C,D){if(C){C=this._getSiblingOfChild(C,D)
}var B=this.getChildren();
for(var A=0;
A<B.length;
A++){if(!C){C=B[(D>0)?0:(B.length-1)]
}if(C.isFocusable()){return C
}C=this._getSiblingOfChild(C,D)
}}})
}if(!dojo._hasResource["dijit.layout._LayoutWidget"]){dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){dojo.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){dojo.forEach(this.getChildren(),function(A){A.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(C){var A=this.domNode;
if(C){dojo.marginBox(A,C);
if(C.t){A.style.top=C.t+"px"
}if(C.l){A.style.left=C.l+"px"
}}var B=dojo.mixin(dojo.marginBox(A),C||{});
this._contentBox=dijit.layout.marginBox2contentBox(A,B);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(C,D){var A=dojo.getComputedStyle(C);
var B=dojo._getMarginExtents(C,A);
var E=dojo._getPadBorderExtents(C,A);
return{l:dojo._toPixelValue(C,A.paddingLeft),t:dojo._toPixelValue(C,A.paddingTop),w:D.w-(B.w+E.w),h:D.h-(B.h+E.h)}
};
(function(){var A=function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
};
var B=function(D,C){D.resize?D.resize(C):dojo.marginBox(D.domNode,C);
dojo.mixin(D,dojo.marginBox(D.domNode));
dojo.mixin(D,C)
};
dijit.layout.layoutChildren=function(D,C,E){C=dojo.mixin({},C);
dojo.addClass(D,"dijitLayoutContainer");
E=dojo.filter(E,function(F){return F.layoutAlign!="client"
}).concat(dojo.filter(E,function(F){return F.layoutAlign=="client"
}));
dojo.forEach(E,function(I){var H=I.domNode,G=I.layoutAlign;
var F=H.style;
F.left=C.l+"px";
F.top=C.t+"px";
F.bottom=F.right="auto";
dojo.addClass(H,"dijitAlign"+A(G));
if(G=="top"||G=="bottom"){B(I,{w:C.w});
C.h-=I.h;
if(G=="top"){C.t+=I.h
}else{F.top=C.t+C.h+"px"
}}else{if(G=="left"||G=="right"){B(I,{h:C.h});
C.w-=I.w;
if(G=="left"){C.l+=I.w
}else{F.left=C.l+C.w+"px"
}}else{if(G=="client"){B(I,C)
}}}})
}
})()
}if(!dojo._hasResource["dijit.form._FormWidget"]){dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",value:"",name:"",id:"",alt:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),setDisabled:function(A){this.domNode.disabled=this.disabled=A;
if(this.focusNode){this.focusNode.disabled=A
}if(A){this._hovering=false;
this._active=false
}dijit.setWaiState(this.focusNode||this.domNode,"disabled",A);
this._setStateClass()
},_onMouse:function(B){var C=B.target;
if(C&&C.getAttribute){this.stateModifier=C.getAttribute("stateModifier")||""
}if(!this.disabled){switch(B.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var D=this;
var A=this.connect(dojo.body(),"onmouseup",function(){D._active=false;
D._setStateClass();
D.disconnect(A)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(dojo.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var A=[this.baseClass];
function B(C){A=A.concat(dojo.map(A,function(D){return D+C
}))
}if(this.checked){B("Checked")
}if(this.state){B(this.state)
}if(this.selected){B("Selected")
}if(this.disabled){B("Disabled")
}else{if(this._active){B(this.stateModifier+"Active")
}else{if(this._focused){B("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){B(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+A.join(" ")
},onChange:function(A){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(A,B){this._lastValue=A;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(B===undefined){B=true
}if(this._lastValueReported==undefined&&B===null){this._lastValueReported=A
}if((this.intermediateChanges||B)&&((A&&A.toString)?A.toString():A)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=A;
this.onChange(A)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(A){if(A.keyCode==dojo.keys.ESCAPE&&!A.shiftKey&&!A.ctrlKey&&!A.altKey){var C=this.getValue();
var B=this._lastValueReported;
if((typeof B!="undefined")&&((C!==null&&C.toString)?C.toString():null)!==B.toString()){this.undo();
dojo.stopEvent(A);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}if(!dojo._hasResource["dijit.dijit"]){dojo._hasResource["dijit.dijit"]=true;
dojo.provide("dijit.dijit")
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(H,I,D){D=dojo.i18n.normalizeLocale(D);
var G=D.split("-");
var J=[H,"nls",I].join(".");
var F=dojo._loadedModules[J];
if(F){var E;
for(var A=G.length;
A>0;
A--){var C=G.slice(0,A).join("_");
if(F[C]){E=F[C];
break
}}if(!E){E=F.ROOT
}if(E){var B=function(){};
B.prototype=E;
return new B()
}}throw new Error("Bundle not found: "+I+" in "+H+" , locale="+D)
};
dojo.i18n.normalizeLocale=function(A){var B=A?A.toLowerCase():dojo.locale;
if(B=="root"){B="ROOT"
}return B
};
dojo.i18n._requireLocalization=function(F,G,C,P){var M=dojo.i18n.normalizeLocale(C);
var J=[F,"nls",G].join(".");
var I="";
if(P){var B=P.split(",");
for(var N=0;
N<B.length;
N++){if(M.indexOf(B[N])==0){if(B[N].length>I.length){I=B[N]
}}}if(!I){I="ROOT"
}}var Q=P?I:M;
var E=dojo._loadedModules[J];
var H=null;
if(E){if(djConfig.localizationComplete&&E._built){return 
}var L=Q.replace(/-/g,"_");
var A=J+"."+L;
H=dojo._loadedModules[A]
}if(!H){E=dojo.provide(J);
var K=dojo._getModuleSymbols(F);
var O=K.concat("nls").join("/");
var D;
dojo.i18n._searchLocalePath(Q,P,function(W){var R=W.replace(/-/g,"_");
var V=J+"."+R;
var T=false;
if(!dojo._loadedModules[V]){dojo.provide(V);
var U=[O];
if(W!="ROOT"){U.push(W)
}U.push(G);
var S=U.join("/")+".js";
T=dojo._loadPath(S,null,function(Z){var Y=function(){};
Y.prototype=D;
E[R]=new Y();
for(var X in Z){E[R][X]=Z[X]
}})
}else{T=true
}if(T&&E[R]){D=E[R]
}else{E[R]=D
}if(P){return true
}})
}if(P&&M!=I){E[M.replace(/-/g,"_")]=E[I.replace(/-/g,"_")]
}};
(function(){var B=djConfig.extraLocale;
if(B){if(!B instanceof Array){B=[B]
}var A=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(F,E,D,C){A(F,E,D,C);
if(D){return 
}for(var G=0;
G<B.length;
G++){A(F,E,B[G],C)
}}
}})();
dojo.i18n._searchLocalePath=function(D,E,H){D=dojo.i18n.normalizeLocale(D);
var F=D.split("-");
var G=[];
for(var A=F.length;
A>0;
A--){G.push(F.slice(0,A).join("-"))
}G.push(false);
if(E){G.reverse()
}for(var I=G.length-1;
I>=0;
I--){var B=G[I]||"ROOT";
var C=H(B);
if(C){break
}}};
dojo.i18n._preloadLocalizations=function(D,A){function B(F){F=dojo.i18n.normalizeLocale(F);
dojo.i18n._searchLocalePath(F,true,function(H){for(var G=0;
G<A.length;
G++){if(A[G]==H){dojo.require(D+"_"+H);
return true
}}return false
})
}B();
var E=djConfig.extraLocale||[];
for(var C=0;
C<E.length;
C++){B(E[C])
}}
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(D){var A={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var B=dojo.cldr.supplemental._region(D);
var C=A[B];
return(typeof C=="undefined")?1:C
};
dojo.cldr.supplemental._region=function(C){C=dojo.i18n.normalizeLocale(C);
var A=C.split("-");
var B=A[1];
if(!B){B={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[A[0]]
}else{if(B.length==4){B=A[2]
}}return B
};
dojo.cldr.supplemental.getWeekend=function(A){var C={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var F={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var D=dojo.cldr.supplemental._region(A);
var E=C[D];
var B=F[D];
if(typeof E=="undefined"){E=6
}if(typeof B=="undefined"){B=0
}return{start:E,end:B}
}
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(C){var A=C.getMonth();
var B=[31,28,31,30,31,30,31,31,30,31,30,31];
if(A==1&&dojo.date.isLeapYear(C)){return 29
}return B[A]
};
dojo.date.isLeapYear=function(A){var B=A.getFullYear();
return !(B%400)||(!(B%4)&&!!(B%100))
};
dojo.date.getTimezoneName=function(B){var C=B.toString();
var E="";
var A;
var D=C.indexOf("(");
if(D>-1){E=C.substring(++D,C.indexOf(")"))
}else{var F=/([A-Z\/]+) \d{4}$/;
if((A=C.match(F))){E=A[1]
}else{C=B.toLocaleString();
F=/ ([A-Z\/]+)$/;
if((A=C.match(F))){E=A[1]
}}}return(E=="AM"||E=="PM")?"":E
};
dojo.date.compare=function(B,A,C){B=new Date(Number(B));
A=new Date(Number(A||new Date()));
if(typeof C!=="undefined"){if(C=="date"){B.setHours(0,0,0,0);
A.setHours(0,0,0,0)
}else{if(C=="time"){B.setFullYear(0,0,0);
A.setFullYear(0,0,0)
}}}if(B>A){return 1
}if(B<A){return -1
}return 0
};
dojo.date.add=function(L,K,A){var C=new Date(Number(L));
var J=false;
var G="Date";
switch(K){case"day":break;
case"weekday":var H,I;
var E=0;
var F=A%5;
if(!F){H=(A>0)?5:-5;
I=(A>0)?((A-5)/5):((A+5)/5)
}else{H=F;
I=parseInt(A/5)
}var B=L.getDay();
if(B==6&&A>0){E=1
}else{if(B==0&&A<0){E=-1
}}var D=B+H;
if(D==0||D==6){E=(A>0)?2:-2
}A=7*I+H+E;
break;
case"year":G="FullYear";
J=true;
break;
case"week":A*=7;
break;
case"quarter":A*=3;
case"month":J=true;
G="Month";
break;
case"hour":case"minute":case"second":case"millisecond":G=K.charAt(0).toUpperCase()+K.substring(1)+"s"
}if(G){C["setUTC"+G](C["getUTC"+G]()+A)
}if(J&&(C.getDate()<L.getDate())){C.setDate(0)
}return C
};
dojo.date.difference=function(D,B,I){B=B||new Date();
I=I||"day";
var H=B.getFullYear()-D.getFullYear();
var Q=1;
switch(I){case"quarter":var E=D.getMonth();
var C=B.getMonth();
var N=Math.floor(E/3)+1;
var M=Math.floor(C/3)+1;
M+=(H*4);
Q=M-N;
break;
case"weekday":var A=Math.round(dojo.date.difference(D,B,"day"));
var F=parseInt(dojo.date.difference(D,B,"week"));
var P=A%7;
if(P==0){A=F*5
}else{var O=0;
var L=D.getDay();
var J=B.getDay();
F=parseInt(A/7);
P=A%7;
var K=new Date(D);
K.setDate(K.getDate()+(F*7));
var G=K.getDay();
if(A>0){switch(true){case L==6:O=-1;
break;
case L==0:O=0;
break;
case J==6:O=-1;
break;
case J==0:O=-2;
break;
case (G+P)>5:O=-2
}}else{if(A<0){switch(true){case L==6:O=0;
break;
case L==0:O=1;
break;
case J==6:O=2;
break;
case J==0:O=1;
break;
case (G+P)<0:O=2
}}}A+=O;
A-=(F*2)
}Q=A;
break;
case"year":Q=H;
break;
case"month":Q=(B.getMonth()-D.getMonth())+(H*12);
break;
case"week":Q=parseInt(dojo.date.difference(D,B,"day")/7);
break;
case"day":Q/=24;
case"hour":Q/=60;
case"minute":Q/=60;
case"second":Q/=1000;
case"millisecond":Q*=B.getTime()-D.getTime()
}return Math.round(Q)
}
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(A,B){return A.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(C){if(B&&B.indexOf(C)!=-1){return C
}return"\\"+C
})
};
dojo.regexp.buildGroupRE=function(A,D,C){if(!(A instanceof Array)){return D(A)
}var E=[];
for(var B=0;
B<A.length;
B++){E.push(D(A[B]))
}return dojo.regexp.group(E.join("|"),C)
};
dojo.regexp.group=function(A,B){return"("+(B?"?:":"")+A+")"
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function A(F,E,D){return D.replace(/([a-z])\1*/ig,function(V){var I;
var H=V.charAt(0);
var Q=V.length;
var N;
var O=["abbr","wide","narrow"];
switch(H){case"G":I=E[(Q<4)?"eraAbbr":"eraNames"][F.getFullYear()<0?0:1];
break;
case"y":I=F.getFullYear();
switch(Q){case 1:break;
case 2:I=String(I);
I=I.substr(I.length-2);
break;
default:N=true
}break;
case"Q":case"q":I=Math.ceil((F.getMonth()+1)/3);
N=true;
break;
case"M":case"L":var P=F.getMonth();
var L;
switch(Q){case 1:case 2:I=P+1;
N=true;
break;
case 3:case 4:case 5:L=O[Q-3];
break
}if(L){var G=(H=="L")?"standalone":"format";
var K=["months",G,L].join("-");
I=E[K][P]
}break;
case"w":var J=0;
I=dojo.date.locale._getWeekOfYear(F,J);
N=true;
break;
case"d":I=F.getDate();
N=true;
break;
case"D":I=dojo.date.locale._getDayOfYear(F);
N=true;
break;
case"E":case"e":case"c":var W=F.getDay();
var L;
switch(Q){case 1:case 2:if(H=="e"){var U=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
W=(W-U+7)%7
}if(H!="c"){I=W+1;
N=true;
break
}case 3:case 4:case 5:L=O[Q-3];
break
}if(L){var G=(H=="c")?"standalone":"format";
var K=["days",G,L].join("-");
I=E[K][W]
}break;
case"a":var M=(F.getHours()<12)?"am":"pm";
I=E[M];
break;
case"h":case"H":case"K":case"k":var T=F.getHours();
switch(H){case"h":I=(T%12)||12;
break;
case"H":I=T;
break;
case"K":I=(T%12);
break;
case"k":I=T||24;
break
}N=true;
break;
case"m":I=F.getMinutes();
N=true;
break;
case"s":I=F.getSeconds();
N=true;
break;
case"S":I=Math.round(F.getMilliseconds()*Math.pow(10,Q-3));
break;
case"v":case"z":I=dojo.date.getTimezoneName(F);
if(I){break
}Q=4;
case"Z":var S=F.getTimezoneOffset();
var R=[(S<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(S)/60),2),dojo.string.pad(Math.abs(S)%60,2)];
if(Q==4){R.splice(0,0,"GMT");
R.splice(3,0,":")
}I=R.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+D)
}if(N){I=dojo.string.pad(I,Q)
}return I
})
}dojo.date.locale.format=function(H,N){N=N||{};
var K=dojo.i18n.normalizeLocale(N.locale);
var D=N.formatLength||"short";
var E=dojo.date.locale._getGregorianBundle(K);
var I=[];
var G=dojo.hitch(this,A,H,E);
if(N.selector=="year"){var J=H.getFullYear();
if(K.match(/^zh|^ja/)){J+="\u5E74"
}return J
}if(N.selector!="time"){var F=N.datePattern||E["dateFormat-"+D];
if(F){I.push(B(F,G))
}}if(N.selector!="date"){var M=N.timePattern||E["timeFormat-"+D];
if(M){I.push(B(M,G))
}}var L=I.join(" ");
return L
};
dojo.date.locale.regexp=function(D){return dojo.date.locale._parseInfo(D).regexp
};
dojo.date.locale._parseInfo=function(K){K=K||{};
var I=dojo.i18n.normalizeLocale(K.locale);
var D=dojo.date.locale._getGregorianBundle(I);
var L=K.formatLength||"short";
var F=K.datePattern||D["dateFormat-"+L];
var E=K.timePattern||D["timeFormat-"+L];
var G;
if(K.selector=="date"){G=F
}else{if(K.selector=="time"){G=E
}else{G=F+" "+E
}}var H=[];
var J=B(G,dojo.hitch(this,C,H,D,K));
return{regexp:J,tokens:H,bundle:D}
};
dojo.date.locale.parse=function(M,D){var G=dojo.date.locale._parseInfo(D);
var J=G.tokens,E=G.bundle;
var N=new RegExp("^"+G.regexp+"$");
var H=N.exec(M);
if(!H){return null
}var F=["abbr","wide","narrow"];
var O=new Date(1972,0);
var I={};
var L="";
dojo.forEach(H,function(Q,Y){if(!Y){return 
}var U=J[Y-1];
var V=U.length;
switch(U.charAt(0)){case"y":if(V!=2){O.setFullYear(Q);
I.year=Q
}else{if(Q<100){Q=Number(Q);
var P=""+new Date().getFullYear();
var X=P.substring(0,2)*100;
var a=Number(P.substring(2,4));
var W=Math.min(a+20,99);
var Z=(Q<W)?X+Q:X-100+Q;
O.setFullYear(Z);
I.year=Z
}else{if(D.strict){return null
}O.setFullYear(Q);
I.year=Q
}}break;
case"M":if(V>2){var T=E["months-format-"+F[V-3]].concat();
if(!D.strict){Q=Q.replace(".","").toLowerCase();
T=dojo.map(T,function(d){return d.replace(".","").toLowerCase()
})
}Q=dojo.indexOf(T,Q);
if(Q==-1){return null
}}else{Q--
}O.setMonth(Q);
I.month=Q;
break;
case"E":case"e":var S=E["days-format-"+F[V-3]].concat();
if(!D.strict){Q=Q.toLowerCase();
S=dojo.map(S,"".toLowerCase)
}Q=dojo.indexOf(S,Q);
if(Q==-1){return null
}break;
case"d":O.setDate(Q);
I.date=Q;
break;
case"D":O.setMonth(0);
O.setDate(Q);
break;
case"a":var b=D.am||E.am;
var R=D.pm||E.pm;
if(!D.strict){var c=/\./g;
Q=Q.replace(c,"").toLowerCase();
b=b.replace(c,"").toLowerCase();
R=R.replace(c,"").toLowerCase()
}if(D.strict&&Q!=b&&Q!=R){return null
}L=(Q==R)?"p":(Q==b)?"a":"";
break;
case"K":if(Q==24){Q=0
}case"h":case"H":case"k":if(Q>23){return null
}O.setHours(Q);
break;
case"m":O.setMinutes(Q);
break;
case"s":O.setSeconds(Q);
break;
case"S":O.setMilliseconds(Q)
}});
var K=O.getHours();
if(L==="p"&&K<12){O.setHours(K+12)
}else{if(L==="a"&&K==12){O.setHours(0)
}}if(I.year&&O.getFullYear()!=I.year){return null
}if(I.month&&O.getMonth()!=I.month){return null
}if(I.date&&O.getDate()!=I.date){return null
}return O
};
function B(H,G,E,F){var J=function(K){return K
};
G=G||J;
E=E||J;
F=F||J;
var I=H.match(/(''|[^'])+/g);
var D=false;
dojo.forEach(I,function(K,L){if(!K){I[L]=""
}else{I[L]=(D?E:G)(K);
D=!D
}});
return F(I.join(""))
}function C(D,E,F,G){G=dojo.regexp.escapeString(G);
if(!F.strict){G=G.replace(" a"," ?a")
}return G.replace(/([a-z])\1*/ig,function(M){var O;
var J=M.charAt(0);
var K=M.length;
var I="",H="";
if(F.strict){if(K>1){I="0{"+(K-1)+"}"
}if(K>2){H="0{"+(K-2)+"}"
}}else{I="0?";
H="0{0,2}"
}switch(J){case"y":O="\\d{2,4}";
break;
case"M":O=(K>2)?"\\S+":I+"[1-9]|1[0-2]";
break;
case"D":O=I+"[1-9]|"+H+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":O=I+"[1-9]|[12]\\d|3[01]";
break;
case"w":O=I+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":O="\\S+";
break;
case"h":O=I+"[1-9]|1[0-2]";
break;
case"k":O=I+"\\d|1[01]";
break;
case"H":O=I+"\\d|1\\d|2[0-3]";
break;
case"K":O=I+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":O="[0-5]\\d";
break;
case"S":O="\\d{"+K+"}";
break;
case"a":var L=F.am||E.am||"AM";
var N=F.pm||E.pm||"PM";
if(F.strict){O=L+"|"+N
}else{O=L+"|"+N;
if(L!=L.toLowerCase()){O+="|"+L.toLowerCase()
}if(N!=N.toLowerCase()){O+="|"+N.toLowerCase()
}}break;
default:O=".*"
}if(D){D.push(M)
}return"("+O+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var A=[];
dojo.date.locale.addCustomFormats=function(C,B){A.push({pkg:C,name:B})
};
dojo.date.locale._getGregorianBundle=function(C){var B={};
dojo.forEach(A,function(E){var D=dojo.i18n.getLocalization(E.pkg,E.name,C);
B=dojo.mixin(B,D)
},this);
return B
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(C,B,F,E){var G;
var D=dojo.date.locale._getGregorianBundle(E);
var A=[C,F,B];
if(F=="standAlone"){G=D[A.join("-")]
}A[1]="format";
return(G||D[A.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(C,D){var B=dojo.cldr.supplemental.getWeekend(D);
var A=(C||new Date()).getDay();
if(B.end<B.start){B.end+=7;
if(A<B.start){A+=7
}}return A>=B.start&&A<=B.end
};
dojo.date.locale._getDayOfYear=function(A){return dojo.date.difference(new Date(A.getFullYear(),0,1),A)+1
};
dojo.date.locale._getWeekOfYear=function(D,A){if(arguments.length==1){A=0
}var B=new Date(D.getFullYear(),0,1).getDay();
var E=(B-A+7)%7;
var C=Math.floor((dojo.date.locale._getDayOfYear(D)+E-1)/7);
if(B==A){C++
}return C
}
}if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templatePath:dojo.moduleUrl("dijit","templates/Calendar.html"),value:new Date(),dayWidth:"narrow",setValue:function(A){if(!this.value||dojo.date.compare(A,this.value)){A=new Date(A);
this.displayMonth=new Date(A);
if(!this.isDisabledDate(A,this.lang)){this.value=A;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(B,A){while(B.firstChild){B.removeChild(B.firstChild)
}B.appendChild(document.createTextNode(A))
},_populateGrid:function(){var B=this.displayMonth;
B.setDate(1);
var H=B.getDay();
var I=dojo.date.getDaysInMonth(B);
var E=dojo.date.getDaysInMonth(dojo.date.add(B,"month",-1));
var C=new Date();
var J=this.value;
var G=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(G>H){G-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(Q,P){P+=G;
var O=new Date(B);
var R,N="dijitCalendar",L=0;
if(P<H){R=E-H+P+1;
L=-1;
N+="Previous"
}else{if(P>=(H+I)){R=P-H-I+1;
L=1;
N+="Next"
}else{R=P-H+1;
N+="Current"
}}if(L){O=dojo.date.add(O,"month",L)
}O.setDate(R);
if(!dojo.date.compare(O,C,"date")){N="dijitCalendarCurrentDate "+N
}if(!dojo.date.compare(O,J,"date")){N="dijitCalendarSelectedDate "+N
}if(this.isDisabledDate(O,this.lang)){N="dijitCalendarDisabledDate "+N
}Q.className=N+"Month dijitCalendarDateTemplate";
Q.dijitDateValue=O.valueOf();
var M=dojo.query(".dijitCalendarDateLabel",Q)[0];
this._setText(M,O.getDate())
},this);
var K=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,K[B.getMonth()]);
var D=B.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(L){this._setText(this[L+"YearLabelNode"],dojo.date.locale.format(new Date(D++,0),{selector:"year",locale:this.lang}))
},this);
var A=this;
var F=function(M,N,L){dijit.typematic.addMouseListener(A[M],A,function(O){if(O>=0){A._adjustDisplay(N,L)
}},0.8,500)
};
F("incrementMonth","month",1);
F("decrementMonth","month",-1);
F("nextYearLabelNode","year",1);
F("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var A=dojo.hitch(this,function(F,E){var H=dojo.query(F,this.domNode)[0];
for(var G=0;
G<E;
G++){H.parentNode.appendChild(H.cloneNode(true))
}});
A(".dijitCalendarDayLabelTemplate",6);
A(".dijitCalendarDateTemplate",6);
A(".dijitCalendarWeekTemplate",5);
var C=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var D=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(F,E){this._setText(F,C[(E+D)%7])
},this);
var B=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(B,function(E){var F=dojo.doc.createElement("div");
this._setText(F,E);
this.monthLabelSpacer.appendChild(F)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(B,A){this.displayMonth=dojo.date.add(this.displayMonth,B,A);
this._populateGrid()
},_onDayClick:function(B){var A=B.target;
dojo.stopEvent(B);
while(!A.dijitDateValue){A=A.parentNode
}if(!dojo.hasClass(A,"dijitCalendarDisabledDate")){this.setValue(A.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(A){},onChange:function(A){},isDisabledDate:function(A,B){return false
}})
}if(!dojo._hasResource["dijit.layout.ContentPane"]){dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var A=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,A);
this.errorMessage=dojo.string.substitute(this.errorMessage,A);
dojo.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var A=dojo.query(">",this.containerNode||this.domNode),B=A.filter("[widgetId]");
if(A.length==1&&B.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(B[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(A){this.href=A;
return this._prepareLoad()
},setContent:function(A){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(A||"");
this._isDownloaded=false;
if(this.parseOnLoad){this._createSubWidgets()
}this._checkIfSingleChild();
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}this._onLoadHandler()
},cancel:function(){if(this._xhrDfd&&(this._xhrDfd.fired==-1)){this._xhrDfd.cancel()
}delete this._xhrDfd
},destroy:function(){if(this._beingDestroyed){return 
}this._onUnloadHandler();
this._beingDestroyed=true;
this.inherited("destroy",arguments)
},resize:function(C){dojo.marginBox(this.domNode,C);
var A=this.containerNode||this.domNode,B=dojo.mixin(dojo.marginBox(A),C||{});
this._contentBox=dijit.layout.marginBox2contentBox(A,B);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(A){this.cancel();
this.isLoaded=false;
this._loadCheck(A)
},_loadCheck:function(A){var B=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(A||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&B&&!this._xhrDfd)||(!this.isLoaded&&B&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var A=this;
var B={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(B,this.ioArgs)
}var C=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(B);
C.addCallback(function(E){try{A.onDownloadEnd.call(A);
A._isDownloaded=true;
A.setContent.call(A,E)
}catch(D){A._onError.call(A,"Content",D)
}delete A._xhrDfd;
return E
});
C.addErrback(function(D){if(!C.cancelled){A._onError.call(A,"Download",D)
}delete A._xhrDfd;
return D
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(D){this.destroyDescendants();
try{var A=this.containerNode||this.domNode;
while(A.firstChild){dojo._destroyElement(A.firstChild)
}if(typeof D=="string"){if(this.extractContent){match=D.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){D=match[1]
}}A.innerHTML=D
}else{if(D.nodeType){A.appendChild(D)
}else{dojo.forEach(D,function(E){A.appendChild(E.cloneNode(true))
})
}}}catch(C){var B=this.onContentError(C);
try{A.innerHTML=B
}catch(C){console.error("Fatal "+this.id+" could not change content due to "+C.message,C)
}}},_onError:function(A,C,D){var B=this["on"+A+"Error"].call(this,C);
if(D){console.error(D,C)
}else{if(B){this._setContent.call(this,B)
}}},_createSubWidgets:function(){var B=this.containerNode||this.domNode;
try{dojo.parser.parse(B,true)
}catch(A){this._onError("Content",A,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(A){},onUnload:function(A){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(A){},onDownloadError:function(A){return this.errorMessage
},onDownloadEnd:function(){}})
}if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(A){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(A){dojo.stopEvent(A);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(D){var C={};
dojo.forEach(this.getDescendants(),function(F){if(!F.name){return 
}var G=C[F.name]||(C[F.name]=[]);
G.push(F)
});
for(var A in C){var B=C[A],E=dojo.getObject(A,false,D);
if(!dojo.isArray(E)){E=[E]
}if(B[0].setChecked){dojo.forEach(B,function(G,F){G.setChecked(dojo.indexOf(E,G.value)!=-1)
})
}else{dojo.forEach(B,function(G,F){G.setValue(E[F])
})
}}},getValues:function(){var A={};
dojo.forEach(this.getDescendants(),function(B){var E=B.getValue?B.getValue():B.value;
var C=B.name;
if(!C){return 
}if(B.setChecked){if(/Radio/.test(B.declaredClass)){if(B.checked){dojo.setObject(C,E,A)
}}else{var D=dojo.getObject(C,false,A);
if(!D){D=[];
dojo.setObject(C,D,A)
}if(B.checked){D.push(E)
}}}else{dojo.setObject(C,E,A)
}});
return A
},isValid:function(){return dojo.every(this.getDescendants(),function(A){return !A.isValid||A.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}if(!dojo._hasResource["dijit.Dialog"]){dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var D=dijit.getViewport();
var B=this.node.style,C=this.domNode.style;
C.top=D.t+"px";
C.left=D.l+"px";
B.width=D.w+"px";
B.height=D.h+"px";
var A=dijit.getViewport();
if(D.w!=A.w){B.width=A.w+"px"
}if(D.h!=A.h){B.height=A.h+"px"
}},show:function(){this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="block"
}this._resizeHandler=this.connect(window,"onresize","layout")
},hide:function(){this.domNode.style.display="none";
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.disconnect(this._resizeHandler)
},uninitialize:function(){if(this.bgIframe){this.bgIframe.destroy()
}}});
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{templateString:null,templatePath:dojo.moduleUrl("dijit","templates/Dialog.html"),open:false,duration:400,_lastFocusItem:null,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{title:"titleBar"}),postCreate:function(){dojo.body().appendChild(this.domNode);
this.inherited("postCreate",arguments);
this.domNode.style.display="none";
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide")
},onLoad:function(){this._position();
this.inherited("onLoad",arguments)
},_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new dijit.DialogUnderlay();
var A=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:A,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:A,duration:this.duration,onEnd:function(){A.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var C=dijit.getViewport();
var B=dojo.marginBox(this.domNode);
var A=this.domNode.style;
A.left=Math.floor((C.l+(C.w-B.w)/2))+"px";
A.top=Math.floor((C.t+(C.h-B.h)/2))+"px"
},_findLastFocus:function(A){this._lastFocused=A.target
},_cycleFocus:function(A){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(C){if(C.keyCode){var A=C.target;
if(A==this.titleBar&&C.shiftKey&&C.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(C)
}else{while(A){if(A==this.domNode){if(C.keyCode==dojo.keys.ESCAPE){this.hide()
}else{return 
}}A=A.parentNode
}if(C.keyCode!=dojo.keys.TAB){dojo.stopEvent(C)
}else{if(!dojo.isOpera){try{this.titleBar.focus()
}catch(B){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(document.documentElement,"onkeypress",this,"_onKey"));
var A=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(dojo.connect(this.containerNode,A,this,"_findLastFocus"));
dojo.style(this.domNode,"opacity",0);
this.domNode.style.display="block";
this.open=true;
this._loadCheck();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
setTimeout(dojo.hitch(this,function(){dijit.focus(this.titleBar)
}),50)
},hide:function(){if(!this._alreadyInitialized){return 
}if(this._fadeIn.status()=="playing"){this._fadeIn.stop()
}this._fadeOut.play();
if(this._scrollConnected){this._scrollConnected=false
}dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
this.connect(this._fadeOut,"onEnd",dojo.hitch(this,function(){dijit.focus(this._savedFocus)
}));
this.open=false
},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout();
this._position()
}}});
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{title:"",_lastFocusItem:null,templateString:null,templatePath:dojo.moduleUrl("dijit.layout","templates/TooltipDialog.html"),postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
var A=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,A,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(A){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(A.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(A.charAt(0)=="T"?"Below":"Above")
},onOpen:function(A){this.orient(A.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(A){if(A.keyCode==dojo.keys.ESCAPE){this.onCancel()
}else{if(A.target==this.containerNode&&A.shiftKey&&A.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(A)
}else{if(A.keyCode==dojo.keys.TAB){A.stopPropagation()
}}}},_findLastFocus:function(A){this._lastFocused=A.target
},_cycleFocus:function(A){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}if(!dojo._hasResource["dijit.Toolbar"]){dojo._hasResource["dijit.Toolbar"]=true;
dojo.provide("dijit.Toolbar");
dojo.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:'<div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div>',tabIndex:"0",postCreate:function(){this.connectKeyNavHandlers(this.isLeftToRight()?[dojo.keys.LEFT_ARROW]:[dojo.keys.RIGHT_ARROW],this.isLeftToRight()?[dojo.keys.RIGHT_ARROW]:[dojo.keys.LEFT_ARROW])
},startup:function(){this.startupKeyNavChildren()
}});
dojo.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:'<div class="dijitToolbarSeparator dijitInline"></div>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.form.Button"]){dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\n\t><div class=\'dijitRight\'\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \n\t\t\t></span\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\n\t\t></button\n\t></div\n></div>\n',_onClick:function(A){if(this.disabled){return false
}this._clicked();
return this.onClick(A)
},_onButtonClick:function(C){dojo.stopEvent(C);
var B=this._onClick(C)!==false;
if(this.type=="submit"&&B){for(var D=this.domNode;
D;
D=D.parentNode){var A=dijit.byNode(D);
if(A&&A._onSubmit){A._onSubmit(C);
break
}if(D.tagName.toLowerCase()=="form"){if(!D.onsubmit||D.onsubmit()){D.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var A="";
this.label=this.containerNode.innerHTML;
A=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=A;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(A){return true
},_clicked:function(A){},setLabel:function(C){this.containerNode.innerHTML=this.label=C;
if(dojo.isMozilla){var A=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var B=this;
setTimeout(function(){B.domNode.style.display=A
},1)
}if(this.showLabel==false){this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label">${label}</span\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\n\t</button>\n</div></div>\n',_fillContent:function(){if(this.srcNodeRef){var A=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,A[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var A=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(A);
delete this.dropDownContainer
}dojo.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(A){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(A){var B=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!B||A.detail!=0||this._seenKeydown){this._onArrowClick(A)
}this._seenKeydown=false
},_onDropDownKeydown:function(A){this._seenKeydown=true
},_onDropDownBlur:function(A){this._seenKeydown=false
},_onKey:function(A){if(this.disabled){return 
}if(A.keyCode==dojo.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){dojo.stopEvent(A);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var B=this.dropDown;
if(!B){return false
}if(!B.isShowingNow){if(B.href&&!B.isLoaded){var C=this;
var A=dojo.connect(B,"onLoad",function(){dojo.disconnect(A);
C._openDropDown()
});
B._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var D=this.dropDown;
var A=D.domNode.style.width;
var B=this;
dijit.popup.open({parent:this,popup:D,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){B._closeDropDown(true)
},onCancel:function(){B._closeDropDown(true)
},onClose:function(){D.domNode.style.width=A;
B.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>D.domNode.offsetWidth){var C=null;
if(!this.isLeftToRight()){C=D.domNode.parentNode;
var E=C.offsetLeft+C.offsetWidth
}dojo.marginBox(D.domNode,{w:this.domNode.offsetWidth});
if(C){C.style.left=E-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(D.focus){D.focus()
}},_closeDropDown:function(A){if(this._opened){dijit.popup.close(this.dropDown);
if(A){this.focus()
}this._opened=false
}}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\n\tcellspacing=\'0\' cellpadding=\'0\'\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\n\t<tr>\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\n\t\t\ttabIndex="${tabIndex}"\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\n\t\t</td>\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\n\t\t\tstateModifier="DownArrow"\n\t\t\ttitle="${optionsTitle}" name="${name}"\n\t\t\twaiRole="button" waiState="haspopup-true"\n\t\t><div waiRole="presentation">&#9660;</div>\n\t</td></tr>\n</table>\n',attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
dojo.forEach(this._focalNodes,dojo.hitch(this,function(A){if(dojo.isIE){this.connect(A,"onactivate",this._onNodeFocus)
}else{this.connect(A,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(A){this._focusedNode=A;
dijit.focus(A)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(A){this._focusedNode=A.currentTarget
},_onBlur:function(A){this.inherited(arguments);
this._focusedNode=null
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(A){this.setChecked(!this.checked)
},setChecked:function(A){this.checked=A;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(A)
}})
}if(!dojo._hasResource["dijit.Menu"]){dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(dojo.body())
}else{dojo.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([dojo.keys.UP_ARROW],[dojo.keys.DOWN_ARROW])
},startup:function(){dojo.forEach(this.getChildren(),function(A){A.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(A){},_moveToPopup:function(A){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(A)
}},_onKeyPress:function(A){if(A.ctrlKey||A.altKey){return 
}switch(A.keyCode){case dojo.keys.RIGHT_ARROW:this._moveToPopup(A);
dojo.stopEvent(A);
break;
case dojo.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{dojo.stopEvent(A)
}break
}},onItemHover:function(A){this.focusChild(A);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(A){dijit.popup.close(A.popup);
A._blur();
this._stopPopupTimer()
},onItemUnhover:function(A){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var A=this;
A.parentMenu;
A=A.parentMenu){}return A
},onItemClick:function(A){if(A.disabled){return false
}if(A.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
A.onClick()
}},_iframeContentWindow:function(B){var A=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(B))||dijit.Menu._iframeContentDocument(B)["__parent__"]||(B.name&&document.frames[B.name])||null;
return A
},_iframeContentDocument:function(B){var A=B.contentDocument||(B.contentWindow&&B.contentWindow.document)||(B.name&&document.frames[B.name]&&document.frames[B.name].document)||null;
return A
},bindDomNode:function(C){C=dojo.byId(C);
var A=dijit.getDocumentWindow(C.ownerDocument);
if(C.tagName.toLowerCase()=="iframe"){A=this._iframeContentWindow(C);
C=dojo.withGlobal(A,dojo.body)
}var B=(C==dojo.body()?dojo.doc:C);
C[this.id]=this._bindings.push([dojo.connect(B,"oncontextmenu",this,"_openMyself"),dojo.connect(B,"onkeydown",this,"_contextKey"),dojo.connect(B,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(C){var B=dojo.byId(C);
var A=B[this.id]-1,D=this._bindings[A];
dojo.forEach(D,dojo.disconnect);
delete this._bindings[A]
},_contextKey:function(A){this._contextMenuWithMouse=false;
if(A.keyCode==dojo.keys.F10){dojo.stopEvent(A);
if(A.shiftKey&&A.type=="keydown"){var B={target:A.target,pageX:A.pageX,pageY:A.pageY};
B.preventDefault=B.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(B)
}),1)
}}},_contextMouse:function(A){this._contextMenuWithMouse=true
},_openMyself:function(C){dojo.stopEvent(C);
var E,D;
if(dojo.isSafari||this._contextMenuWithMouse){E=C.pageX;
D=C.pageY
}else{var B=dojo.coords(C.target,true);
E=B.x+10;
D=B.y+10
}var G=this;
var F=dijit.getFocus(this);
function A(){dijit.focus(F);
dijit.popup.close(G)
}dijit.popup.open({popup:this,x:E,y:D,onExecute:A,onCancel:A,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(A){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var C=this.focusedChild;
var A=C.popup;
if(A.isShowingNow){return 
}A.parentMenu=this;
var B=this;
dijit.popup.open({parent:this,popup:A,around:C.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(A);
C.focus();
B.currentPopup=null
}});
this.currentPopup=A;
if(A.focus){A.focus()
}}});
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){dojo.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(A){this.getParent().onItemClick(this);
dojo.stopEvent(A)
},onClick:function(){},focus:function(){dojo.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(A){}},_blur:function(){dojo.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(A){this.disabled=A;
dojo[A?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",A?"true":"false")
}});
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var A=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,A[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var A=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(A)
}dojo.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
dojo.addClass(this.expand,"dijitMenuExpandEnabled");
dojo.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.Tooltip"]){dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\n\t<div class="dijitTooltipConnector"></div>\n</div>\n',postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")})
},show:function(C,D){if(this.aroundNode&&this.aroundNode===D){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=C;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var B=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var A=dijit.placeOnScreenAroundElement(this.domNode,D,B);
this.domNode.className="dijitTooltip dijitTooltip"+(A.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=D
},_onShow:function(){if(dojo.isIE){this.domNode.style.filter=""
}},hide:function(A){if(!this.aroundNode||this.aroundNode!==A){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play()
},_onHide:function(){this.domNode.style.cssText="";
if(this._onDeck){this.show.apply(this,this._onDeck);
this._onDeck=null
}}});
dijit.showTooltip=function(A,B){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(A,B)
};
dijit.hideTooltip=function(A){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(A)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(A){var B=dojo.byId(A);
if(B){this._connectNodes.push(B);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(C){this.connect(B,C.toLowerCase(),"_"+C)
},this);
if(dojo.isIE){B.style.zoom=1
}}},this)
},_onMouseOver:function(A){this._onHover(A)
},_onMouseOut:function(A){if(dojo.isDescendant(A.relatedTarget,A.target)){return 
}this._onUnHover(A)
},_onFocus:function(A){this._focus=true;
this._onHover(A)
},_onBlur:function(A){this._focus=false;
this._onUnHover(A)
},_onHover:function(A){if(!this._showTimer){var B=A.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(B)
}),this.showDelay)
}},_onUnHover:function(A){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(A){A=A||this._connectNodes[0];
if(!A){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,A);
this._connectNode=A
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}if(!dojo._hasResource["dijit.form.TextBox"]){dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\n\tautocomplete="off" type="${type}"\n\t/>\n',baseClass:"dijitTextBox",attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(C,B,A){var D=this.filter(C);
if((typeof D==typeof C)&&(A==null||A==undefined)){A=this.format(D,this.constraints)
}if(A!=null&&A!=undefined){this.textbox.value=A
}dijit.form.TextBox.superclass.setValue.call(this,D,B)
},setDisplayedValue:function(A){this.textbox.value=A;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(B,A){return((B==null||B==undefined)?"":(B.toString?B.toString():B))
},parse:function(B,A){return B
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){dojo.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var A=this.domNode;
var B=A.style.opacity;
A.style.opacity="0.999";
setTimeout(function(){A.style.opacity=B
},0)
}},filter:function(A){if(A==undefined||A==null){return""
}else{if(typeof A!="string"){return A
}}if(this.trim){A=dojo.trim(A)
}if(this.uppercase){A=A.toUpperCase()
}if(this.lowercase){A=A.toLowerCase()
}if(this.propercase){A=A.replace(/[^\s]+/g,function(B){return B.substring(0,1).toUpperCase()+B.substring(1)
})
}return A
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}if(!dojo._hasResource["dijit.form.ValidationTextBox"]){dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.requireLocalization("dijit.form","validate",null,"ko,zh-cn,zh,ja,zh-tw,ru,it,hu,ROOT,fr,pt,pl,es,de,cs");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\n\tid="widget_${id}" name="${name}"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\n\t><tr class="dijitReset"\n\t\t><td class="dijitReset dijitInputField" width="100%"\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\n\t\t\ttype=\'${type}\' name=\'${name}\'\n\t\t/></td\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\n\t\t></td\n\t></tr\n></table>\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(A){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(B,A){return(new RegExp("^("+this.regExpGen(A)+")"+(this.required?"":"?")+"$")).test(B)&&(!this.required||!this._isEmpty(B))&&(this._isEmpty(B)||this.parse(B,A)!==null)
},isValid:function(A){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(A){return/^\s*$/.test(A)
},getErrorMessage:function(A){return this.invalidMessage
},getPromptMessage:function(A){return this.promptMessage
},validate:function(D){var A="";
var B=this.isValid(D);
var C=this._isEmpty(this.textbox.value);
this.state=(B||(!this._hasBeenBlurred&&C))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(B?"false":"true"));
if(D){if(C){A=this.getPromptMessage(true)
}if(!A&&!B){A=this.getErrorMessage(true)
}}this._displayMessage(A)
},_message:"",_displayMessage:function(A){if(this._message==A){return 
}this._message=A;
this.displayMessage(A)
},displayMessage:function(A){if(A){dijit.showTooltip(A,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(A){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(A){this.validate(true);
this._onMouse(A)
},onkeyup:function(A){this.onfocus(A)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var A=this.regExpGen(this.constraints);
this.regExp=A
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(A,B){return(A.toString?A.toString():"")
},toString:function(){var A=this.filter(this.getValue());
return(A!=null)?((typeof A=="string")?A:this.serialize(A,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var A=this.textbox;
var B=(this.valueNode=document.createElement("input"));
B.setAttribute("type",A.type);
B.setAttribute("value",this.toString());
dojo.style(B,"display","none");
B.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(B,A,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(A,B){return A-B
},rangeCheck:function(D,C){var B=(typeof C.min!="undefined");
var A=(typeof C.max!="undefined");
if(B||A){return(!B||this.compare(D,C.min)>=0)&&(!A||this.compare(D,C.max)<=0)
}else{return true
}},isInRange:function(A){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(A){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(A))
},getErrorMessage:function(A){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(A)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
}if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.requireLocalization("dijit.form","ComboBox",null,"ko,zh,ja,zh-tw,ru,it,hu,ROOT,fr,pt,pl,es,de,cs");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\n\t><tr class="dijitReset"\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\n\t\t\t><input type="text" autocomplete="off" name="${name}"\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\n\t\t/></td\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\n\t\t></td\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\n\t\t\tdojoAttachPoint="downArrowNode"\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\n\t\t\t></div\n\t\t></td\t\n\t></tr\n></table>\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(A){this._lastDisplayedValue=A;
this.setValue(A,true)
},_getCaretPos:function(D){if(typeof (D.selectionStart)=="number"){return D.selectionStart
}else{if(dojo.isIE){var B=document.selection.createRange().duplicate();
var A=D.createTextRange();
B.move("character",0);
A.move("character",0);
try{A.setEndPoint("EndToEnd",B);
return String(A.text).replace(/\r/g,"").length
}catch(C){return 0
}}}},_setCaretPos:function(A,B){B=parseInt(B);
this._setSelectedRange(A,B,B)
},_setSelectedRange:function(element,start,end){if(!end){end=element.value.length
}if(element.setSelectionRange){dijit.focus(element);
element.setSelectionRange(start,end)
}else{if(element.createTextRange){var range=element.createTextRange();
with(range){collapse(true);
moveEnd("character",end);
moveStart("character",start);
select()
}}else{element.value=element.value;
element.blur();
dijit.focus(element);
var dist=parseInt(element.value.length)-end;
var tchar=String.fromCharCode(37);
var tcc=tchar.charCodeAt(0);
for(var x=0;
x<dist;
x++){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
element.dispatchEvent(te)
}}}},onkeypress:function(D){if(D.altKey||(D.ctrlKey&&D.charCode!=118)){return 
}var B=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(D)
}switch(D.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
B=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(D);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(D);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var C;
if(this._isShowingNow&&(C=this._popupWidget.getHighlightedOption())){if(C==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(D);
break
}else{if(C==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(D);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}D.preventDefault();
case dojo.keys.TAB:var A=this.getDisplayedValue();
if(this._popupWidget&&(A==this._popupWidget._messages.previousMessage||A==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(D);
this._selectOption();
this._hideResultList()
}else{B=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(D)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
B=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||D.charCode!=0){B=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(B){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(B){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(B))){var A=this._getCaretPos(this.focusNode);
if((A+1)>this.focusNode.value.length){this.focusNode.value=B;
this._setSelectedRange(this.focusNode,A,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",B)
}}else{this.focusNode.value=B;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",B)
}},_openResultList:function(C,A){if(this.disabled||A.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!C.length){this._hideResultList();
return 
}var B=new String(this.store.getValue(C[0],this.searchAttr));
if(B&&this.autoComplete&&!this._prev_key_backspace&&(A.query[this.searchAttr]!="*")){this._autoCompleteText(B);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",B)
}this._popupWidget.createOptions(C,A,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(A.direction){if(A.direction==1){this._popupWidget.highlightFirstOption()
}else{if(A.direction==-1){this._popupWidget.highlightLastOption()
}}this._announceOption(this._popupWidget.getHighlightedOption())
}},_showResultList:function(){this._hideResultList();
var items=this._popupWidget.getItems(),visibleCount=Math.min(items.length,this.maxListLength);
this._arrowPressed();
this._displayMessage("");
with(this._popupWidget.domNode.style){width="";
height=""
}var best=this.open();
var popupbox=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==popupbox.h)&&(best.w==popupbox.w))?"hidden":"auto";
var newwidth=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){newwidth+=16
}dojo.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(newwidth,this.domNode.offsetWidth)})
},_hideResultList:function(){if(this._isShowingNow){dijit.popup.close(this._popupWidget);
this._arrowIdle();
this._isShowingNow=false
}},_onBlur:function(){this._hasFocus=false;
this._hasBeenBlurred=true;
this._hideResultList();
this._arrowIdle();
var A=this.getDisplayedValue();
if(this._popupWidget&&(A==this._popupWidget._messages.previousMessage||A==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(A)
}},onfocus:function(A){this._hasFocus=true;
this._onMouse(A)
},_announceOption:function(B){if(B==null){return 
}var A;
if(B==this._popupWidget.nextButton||B==this._popupWidget.previousButton){A=B.innerHTML
}else{A=this.store.getValue(B.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(A)
},_selectOption:function(B){var A=null;
if(!B){B={target:this._popupWidget.getHighlightedOption()}
}if(!B.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{A=B.target
}if(!B.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(A.item,this.searchAttr).length)
}this._doSelect(A)
},_doSelect:function(A){this.item=A.item;
this.setValue(this.store.getValue(A.item,this.searchAttr),true)
},_onArrowMouseDown:function(A){if(this.disabled){return 
}dojo.stopEvent(A);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(D){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var B=this.query;
this._lastQuery=B[this.searchAttr]=D+"*";
var A=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:B,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function C(F,E){F.start+=F.count*E;
F.direction=E;
F.store.fetch(F)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,C,A)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){dojo.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(A){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var A=this.srcNodeRef?dojo.query("> option",this.srcNodeRef).map(function(B){B.style.display="none";
return{value:B.getAttribute("value"),name:String(B.innerHTML)}
}):{};
this.store=new dojo.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:A}});
if(A&&A.length&&!this.value){this.value=A[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(A){return{html:false,label:this.store.getValue(A,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(A){this.value=A;
this.onChange(A)
},onChange:function(A){},onPage:function(A){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(B,A){var D=A(B);
var C=document.createElement("div");
if(D.html){C.innerHTML=D.label
}else{C.appendChild(document.createTextNode(D.label))
}if(C.innerHTML==""){C.innerHTML="&nbsp;"
}C.item=B;
return C
},createOptions:function(A,B,D){this.previousButton.style.display=B.start==0?"none":"";
var C=this;
dojo.forEach(A,function(F){var E=C._createOption(F,D);
E.className="dijitMenuItem";
C.domNode.insertBefore(E,C.nextButton)
});
this.nextButton.style.display=B.count==A.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(A){dojo.stopEvent(A)
},onmouseup:function(B){if(B.target===this.domNode){return 
}else{if(B.target==this.previousButton){this.onPage(-1)
}else{if(B.target==this.nextButton){this.onPage(1)
}else{var A=B.target;
while(!A.item){A=A.parentNode
}this.setValue({target:A},true)
}}}},onmouseover:function(B){if(B.target===this.domNode){return 
}var A=B.target;
if(!(A==this.previousButton||A==this.nextButton)){while(!A.item){A=A.parentNode
}}this._focusOptionNode(A)
},onmouseout:function(A){if(A.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(A){if(this._highlighted_option!=A){this._blurOptionNode();
this._highlighted_option=A;
dojo.addClass(this._highlighted_option,"dijitMenuItemHover")
}},_blurOptionNode:function(){if(this._highlighted_option){dojo.removeClass(this._highlighted_option,"dijitMenuItemHover");
this._highlighted_option=null
}},_highlightNextOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.firstChild.style.display=="none"?this.domNode.firstChild.nextSibling:this.domNode.firstChild)
}else{if(this._highlighted_option.nextSibling&&this._highlighted_option.nextSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.nextSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},highlightFirstOption:function(){this._focusOptionNode(this.domNode.firstChild.nextSibling);
dijit.scrollIntoView(this._highlighted_option)
},highlightLastOption:function(){this._focusOptionNode(this.domNode.lastChild.previousSibling);
dijit.scrollIntoView(this._highlighted_option)
},_highlightPrevOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.lastChild.style.display=="none"?this.domNode.lastChild.previousSibling:this.domNode.lastChild)
}else{if(this._highlighted_option.previousSibling&&this._highlighted_option.previousSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.previousSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},_page:function(A){var D=0;
var B=this.domNode.scrollTop;
var E=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(D<E){if(A){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var C=this.domNode.scrollTop;
D+=(C-B)*(A?-1:1);
B=C
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(A){switch(A.keyCode){case dojo.keys.DOWN_ARROW:this._highlightNextOption();
break;
case dojo.keys.PAGE_DOWN:this.pageDown();
break;
case dojo.keys.UP_ARROW:this._highlightPrevOption();
break;
case dojo.keys.PAGE_UP:this.pageUp();
break
}}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.ValidationTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}dojo.i18n._preloadLocalizations("dijit.nls.dijit-all",["es-es","es","hu","it-it","de","pt-br","pl","fr-fr","zh-cn","pt","en-us","zh","ru","xx","fr","zh-tw","it","cs","en-gb","de-de","ja-jp","ko-kr","ko","en","ROOT","ja"]);