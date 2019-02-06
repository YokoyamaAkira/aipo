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
};