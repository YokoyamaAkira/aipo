dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"],["provide","dijit._base.manager"],["provide","dijit._base.place"],["provide","dijit._base.window"],["provide","dijit._base.popup"],["provide","dijit._base.scroll"],["provide","dijit._base.sniff"],["provide","dijit._base.bidi"],["provide","dijit._base.typematic"],["provide","dijit._base.wai"],["provide","dijit._base"],["provide","dojo.date.stamp"],["provide","dojo.parser"],["provide","dijit._Widget"],["provide","dojo.string"],["provide","dijit._Templated"],["provide","dijit._Container"],["provide","dijit.layout._LayoutWidget"],["provide","dijit.form._FormWidget"],["provide","dijit.dijit"]],defineResource:function(A){if(!A._hasResource["dijit._base.focus"]){A._hasResource["dijit._base.focus"]=true;
A.provide("dijit._base.focus");
A.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var B=A.global;
var C=A.doc;
if(C.selection){return !C.selection.createRange().text
}else{if(B.getSelection){var D=B.getSelection();
if(A.isString(D)){return !D
}else{return D.isCollapsed||!D.toString()
}}}},getBookmark:function(){var B,D=A.doc.selection;
if(D){var C=D.createRange();
if(D.type.toUpperCase()=="CONTROL"){B=C.length?A._toArray(C):null
}else{B=C.getBookmark()
}}else{if(A.global.getSelection){D=A.global.getSelection();
if(D){var C=D.getRangeAt(0);
B=C.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return B
},moveToBookmark:function(B){var C=A.doc;
if(C.selection){var D;
if(A.isArray(B)){D=C.body.createControlRange();
A.forEach(B,D.addElement)
}else{D=C.selection.createRange();
D.moveToBookmark(B)
}D.select()
}else{var E=A.global.getSelection&&A.global.getSelection();
if(E&&E.removeAllRanges){E.removeAllRanges();
E.addRange(B)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(B,C){return{node:B&&A.isDescendant(dijit._curFocus,B.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!A.withGlobal(C||A.global,dijit.isCollapsed)?A.withGlobal(C||A.global,dijit.getBookmark):null,openedForWindow:C}
},focus:function(F){if(!F){return 
}var E="node" in F?F.node:F,D=F.bookmark,C=F.openedForWindow;
if(E){var B=(E.tagName.toLowerCase()=="iframe")?E.contentWindow:E;
if(B&&B.focus){try{B.focus()
}catch(G){}}dijit._onFocusNode(E)
}if(D&&A.withGlobal(C||A.global,dijit.isCollapsed)){if(C){C.focus()
}try{A.withGlobal(C||A.global,moveToBookmark,null,[D])
}catch(G){}}},_activeStack:[],registerWin:function(B){if(!B){B=window
}A.connect(B.document,"onmousedown",null,function(D){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(D.target||D.srcElement)
});
var C=B.document.body||B.document.getElementsByTagName("body")[0];
if(C){if(A.isIE){C.attachEvent("onactivate",function(D){if(D.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(D.srcElement)
}});
C.attachEvent("ondeactivate",function(D){dijit._onBlurNode(D.srcElement)
})
}else{C.addEventListener("focus",function(D){dijit._onFocusNode(D.target)
},true);
C.addEventListener("blur",function(D){dijit._onBlurNode(D.target)
},true)
}}C=null
},_onBlurNode:function(B){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var C=dijit.getEnclosingWidget(B);
if(C&&C._setStateClass){C._focused=false;
C._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(D){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var C=[];
try{while(D){if(D.dijitPopupParent){D=dijit.byId(D.dijitPopupParent).domNode
}else{if(D.tagName&&D.tagName.toLowerCase()=="body"){if(D===A.body()){break
}D=A.query("iframe").filter(function(F){return F.contentDocument.body===D
})[0]
}else{var B=D.getAttribute&&D.getAttribute("widgetId");
if(B){C.unshift(B)
}D=D.parentNode
}}}}catch(E){}dijit._setStack(C)
},_onFocusNode:function(B){if(B&&B.tagName&&B.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(B);
if(B==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=B;
A.publish("focusNode",[B]);
var C=dijit.getEnclosingWidget(B);
if(C&&C._setStateClass){C._focused=true;
C._setStateClass()
}},_setStack:function(C){var B=dijit._activeStack;
dijit._activeStack=C;
for(var E=0;
E<Math.min(B.length,C.length);
E++){if(B[E]!=C[E]){break
}}for(var D=B.length-1;
D>=E;
D--){var F=dijit.byId(B[D]);
if(F){A.publish("widgetBlur",[F]);
if(F._onBlur){F._onBlur()
}}}for(var D=E;
D<C.length;
D++){var F=dijit.byId(C[D]);
if(F){A.publish("widgetFocus",[F]);
if(F._onFocus){F._onFocus()
}}}}});
A.addOnLoad(dijit.registerWin)
}if(!A._hasResource["dijit._base.manager"]){A._hasResource["dijit._base.manager"]=true;
A.provide("dijit._base.manager");
A.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(B){if(this._hash[B.id]){throw new Error("Tried to register widget with id=="+B.id+" but that id is already registered")
}this._hash[B.id]=B
},remove:function(B){delete this._hash[B]
},forEach:function(C){for(var B in this._hash){C(this._hash[B])
}},filter:function(B){var C=new dijit.WidgetSet();
this.forEach(function(D){if(B(D)){C.add(D)
}});
return C
},byId:function(B){return this._hash[B]
},byClass:function(B){return this.filter(function(C){return C.declaredClass==B
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(C){var B;
do{B=C+"_"+(dijit._widgetTypeCtr[C]!==undefined?++dijit._widgetTypeCtr[C]:dijit._widgetTypeCtr[C]=0)
}while(dijit.byId(B));
return B
};
if(A.isIE){A.addOnUnload(function(){dijit.registry.forEach(function(B){B.destroy()
})
})
}dijit.byId=function(B){return(A.isString(B))?dijit.registry.byId(B):B
};
dijit.byNode=function(B){return dijit.registry.byId(B.getAttribute("widgetId"))
};
dijit.getEnclosingWidget=function(B){while(B){if(B.getAttribute&&B.getAttribute("widgetId")){return dijit.registry.byId(B.getAttribute("widgetId"))
}B=B.parentNode
}return null
}
}if(!A._hasResource["dijit._base.place"]){A._hasResource["dijit._base.place"]=true;
A.provide("dijit._base.place");
dijit.getViewport=function(){var I=A.global;
var F=A.doc;
var G=0,B=0;
if(A.isMozilla){var H,C,D,J;
if(F.body.clientWidth>F.documentElement.clientWidth){H=F.documentElement.clientWidth;
D=F.body.clientWidth
}else{D=F.documentElement.clientWidth;
H=F.body.clientWidth
}if(F.body.clientHeight>F.documentElement.clientHeight){C=F.documentElement.clientHeight;
J=F.body.clientHeight
}else{J=F.documentElement.clientHeight;
C=F.body.clientHeight
}G=(D>I.innerWidth)?H:D;
B=(J>I.innerHeight)?C:J
}else{if(!A.isOpera&&I.innerWidth){G=I.innerWidth;
B=I.innerHeight
}else{if(A.isIE&&F.documentElement&&F.documentElement.clientHeight){G=F.documentElement.clientWidth;
B=F.documentElement.clientHeight
}else{if(A.body().clientWidth){G=A.body().clientWidth;
B=A.body().clientHeight
}}}}var E=A._docScroll();
return{w:G,h:B,l:E.x,t:E.y}
};
dijit.placeOnScreen=function(D,B,C,E){var F=A.map(C,function(G){return{corner:G,pos:B}
});
return dijit._place(D,F)
};
dijit._place=function(F,C,Q){var R=dijit.getViewport();
if(!F.parentNode||String(F.parentNode.tagName).toLowerCase()!="body"){A.body().appendChild(F)
}var N=null;
for(var G=0;
G<C.length;
G++){var P=C[G].corner;
var O=C[G].pos;
if(Q){Q(P)
}var B=F.style.display;
var K=F.style.visibility;
F.style.visibility="hidden";
F.style.display="";
var J=A.marginBox(F);
F.style.display=B;
F.style.visibility=K;
var I=(P.charAt(1)=="L"?O.x:Math.max(R.l,O.x-J.w)),H=(P.charAt(0)=="T"?O.y:Math.max(R.t,O.y-J.h)),M=(P.charAt(1)=="L"?Math.min(R.l+R.w,I+J.w):O.x),L=(P.charAt(0)=="T"?Math.min(R.t+R.h,H+J.h):O.y),D=M-I,S=L-H,E=(J.w-D)+(J.h-S);
if(N==null||E<N.overflow){N={corner:P,aroundCorner:C[G].aroundCorner,x:I,y:H,w:D,h:S,overflow:E}
}if(E==0){break
}}F.style.left=N.x+"px";
F.style.top=N.y+"px";
return N
};
dijit.placeOnScreenAroundElement=function(K,D,E,B){D=A.byId(D);
var G=D.style.display;
D.style.display="";
var H=D.offsetWidth;
var C=D.offsetHeight;
var F=A.coords(D,true);
D.style.display=G;
var I=[];
for(var J in E){I.push({aroundCorner:J,corner:E[J],pos:{x:F.x+(J.charAt(1)=="L"?0:H),y:F.y+(J.charAt(0)=="T"?0:C)}})
}return dijit._place(K,I,B)
}
}if(!A._hasResource["dijit._base.window"]){A._hasResource["dijit._base.window"]=true;
A.provide("dijit._base.window");
dijit.getDocumentWindow=function(B){if(A.isSafari&&!B._parentWindow){var C=function(F){F.document._parentWindow=F;
for(var E=0;
E<F.frames.length;
E++){C(F.frames[E])
}};
C(window.top)
}if(A.isIE&&window!==document.parentWindow&&!B._parentWindow){B.parentWindow.execScript("document._parentWindow = window;","Javascript");
var D=B._parentWindow;
B._parentWindow=null;
return D
}return B._parentWindow||B.parentWindow||B.defaultView
}
}if(!A._hasResource["dijit._base.popup"]){A._hasResource["dijit._base.popup"]=true;
A.provide("dijit._base.popup");
dijit.popup=new function(){var C=[],D=1000,B=1;
this.open=function(E){var N=E.popup,M=E.orient||{BL:"TL",TL:"BL"},F=E.around,I=(E.around&&E.around.id)?(E.around.id+"_dropdown"):("popup_"+B++);
var H=A.doc.createElement("div");
H.id=I;
H.className="dijitPopup";
H.style.zIndex=D+C.length;
H.style.visibility="hidden";
if(E.parent){H.dijitPopupParent=E.parent.id
}A.body().appendChild(H);
N.domNode.style.display="";
H.appendChild(N.domNode);
var L=new dijit.BackgroundIframe(H);
var K=F?dijit.placeOnScreenAroundElement(H,F,M,N.orient?A.hitch(N,"orient"):null):dijit.placeOnScreen(H,E,M=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
H.style.visibility="visible";
var J=[];
function G(){for(var O=C.length-1;
O>0&&C[O].parent===C[O-1].widget;
O--){}return C[O]
}J.push(A.connect(H,"onkeypress",this,function(O){if(O.keyCode==A.keys.ESCAPE&&E.onCancel){E.onCancel()
}else{if(O.keyCode==A.keys.TAB){A.stopEvent(O);
var P=G();
if(P&&P.onCancel){P.onCancel()
}}}}));
if(N.onCancel){J.push(A.connect(N,"onCancel",null,E.onCancel))
}J.push(A.connect(N,N.onExecute?"onExecute":"onChange",null,function(){var O=G();
if(O&&O.onExecute){O.onExecute()
}}));
C.push({wrapper:H,iframe:L,widget:N,parent:E.parent,onExecute:E.onExecute,onCancel:E.onCancel,onClose:E.onClose,handlers:J});
if(N.onOpen){N.onOpen(K)
}return K
};
this.close=function(J){while(A.some(C,function(K){return K.widget==J
})){var G=C.pop(),I=G.wrapper,E=G.iframe,F=G.widget,H=G.onClose;
if(F.onClose){F.onClose()
}A.forEach(G.handlers,A.disconnect);
if(!F||!F.domNode){return 
}A.style(F.domNode,"display","none");
A.body().appendChild(F.domNode);
E.destroy();
A._destroyElement(I);
if(H){H()
}}}
}();
dijit._frames=new function(){var B=[];
this.pop=function(){var D;
if(B.length){D=B.pop();
D.style.display=""
}else{if(A.isIE){var C="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
D=A.doc.createElement(C)
}else{var D=A.doc.createElement("iframe");
D.src='javascript:""';
D.className="dijitBackgroundIframe"
}D.tabIndex=-1;
A.body().appendChild(D)
}return D
};
this.push=function(C){C.style.display="";
if(A.isIE){C.style.removeExpression("width");
C.style.removeExpression("height")
}B.push(C)
}
}();
if(A.isIE&&A.isIE<7){A.addOnLoad(function(){var B=dijit._frames;
A.forEach([B.pop()],B.push)
})
}dijit.BackgroundIframe=function(B){if(!B.id){throw new Error("no id")
}if((A.isIE&&A.isIE<7)||(A.isFF&&A.isFF<3&&A.hasClass(A.body(),"dijit_a11y"))){var C=dijit._frames.pop();
B.appendChild(C);
if(A.isIE){C.style.setExpression("width","document.getElementById('"+B.id+"').offsetWidth");
C.style.setExpression("height","document.getElementById('"+B.id+"').offsetHeight")
}this.iframe=C
}};
A.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}if(!A._hasResource["dijit._base.scroll"]){A._hasResource["dijit._base.scroll"]=true;
A.provide("dijit._base.scroll");
dijit.scrollIntoView=function(E){if(A.isIE){if(A.marginBox(E.parentNode).h<=E.parentNode.scrollHeight){E.scrollIntoView(false)
}}else{if(A.isMozilla){E.scrollIntoView(false)
}else{var C=E.parentNode;
var D=C.scrollTop+A.marginBox(C).h;
var B=E.offsetTop+A.marginBox(E).h;
if(D<B){C.scrollTop+=(B-D)
}else{if(C.scrollTop>E.offsetTop){C.scrollTop-=(C.scrollTop-E.offsetTop)
}}}}}
}if(!A._hasResource["dijit._base.sniff"]){A._hasResource["dijit._base.sniff"]=true;
A.provide("dijit._base.sniff");
(function(){var C=A;
var F=C.isIE;
var G=C.isOpera;
var H=Math.floor;
var D={dj_ie:F,dj_ie6:H(F)==6,dj_ie7:H(F)==7,dj_iequirks:F&&C.isQuirks,dj_opera:G,dj_opera8:H(G)==8,dj_opera9:H(G)==9,dj_khtml:C.isKhtml,dj_safari:C.isSafari,dj_gecko:C.isMozilla};
for(var E in D){if(D[E]){var B=A.doc.documentElement;
if(B.className){B.className+=" "+E
}else{B.className=E
}}}})()
}if(!A._hasResource["dijit._base.bidi"]){A._hasResource["dijit._base.bidi"]=true;
A.provide("dijit._base.bidi");
A.addOnLoad(function(){if(!A._isBodyLtr()){A.addClass(A.body(),"dijitRtl")
}})
}if(!A._hasResource["dijit._base.typematic"]){A._hasResource["dijit._base.typematic"]=true;
A.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(A.hitch(this,"_fireEventAndReload"),this._currentTimeout)
},trigger:function(G,C,B,F,E,H,D){if(E!=this._obj){this.stop();
this._initialDelay=D||500;
this._subsequentDelay=H||0.9;
this._obj=E;
this._evt=G;
this._node=B;
this._currentTimeout=-1;
this._count=-1;
this._callback=A.hitch(C,F);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(E,C,B,G,D,F){return[A.connect(E,"onkeypress",this,function(H){if(H.keyCode==C.keyCode&&(!C.charCode||C.charCode==H.charCode)&&(C.ctrlKey===undefined||C.ctrlKey==H.ctrlKey)&&(C.altKey===undefined||C.altKey==H.ctrlKey)&&(C.shiftKey===undefined||C.shiftKey==H.ctrlKey)){A.stopEvent(H);
dijit.typematic.trigger(C,B,E,G,C,D,F)
}else{if(dijit.typematic._obj==C){dijit.typematic.stop()
}}}),A.connect(E,"onkeyup",this,function(H){if(dijit.typematic._obj==C){dijit.typematic.stop()
}})]
},addMouseListener:function(E,C,G,D,F){var B=A.connect;
return[B(E,"mousedown",this,function(H){A.stopEvent(H);
dijit.typematic.trigger(H,C,E,G,E,D,F)
}),B(E,"mouseup",this,function(H){A.stopEvent(H);
dijit.typematic.stop()
}),B(E,"mouseout",this,function(H){A.stopEvent(H);
dijit.typematic.stop()
}),B(E,"mousemove",this,function(H){A.stopEvent(H)
}),B(E,"dblclick",this,function(H){A.stopEvent(H);
if(A.isIE){dijit.typematic.trigger(H,C,E,G,E,D,F);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(D,E,G,C,F,H,B){return this.addKeyListener(E,G,C,F,H,B).concat(this.addMouseListener(D,C,F,H,B))
}}
}if(!A._hasResource["dijit._base.wai"]){A._hasResource["dijit._base.wai"]=true;
A.provide("dijit._base.wai");
dijit.wai={onload:function(){var B=document.createElement("div");
B.id="a11yTestNode";
B.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+A.moduleUrl("dijit","form/templates/blank.gif")+'");';
A.body().appendChild(B);
function C(){var E=A.getComputedStyle(B);
if(E){var D=E.backgroundImage;
var F=(E.borderTopColor==E.borderRightColor)||(D!=null&&(D=="none"||D=="url(invalid-url:)"));
A[F?"addClass":"removeClass"](A.body(),"dijit_a11y")
}}C();
if(A.isIE){setInterval(C,4000)
}}};
if(A.isIE||A.isMoz){A._loaders.unshift(dijit.wai.onload)
}A.mixin(dijit,{hasWaiRole:function(B){if(B.hasAttribute){return B.hasAttribute("role")
}else{return B.getAttribute("role")?true:false
}},getWaiRole:function(D){var B=D.getAttribute("role");
if(B){var C=B.indexOf(":");
return C==-1?B:B.substring(C+1)
}else{return""
}},setWaiRole:function(C,B){if(A.isFF&&A.isFF<3){C.setAttribute("role","wairole:"+B)
}else{C.setAttribute("role",B)
}},removeWaiRole:function(B){B.removeAttribute("role")
},hasWaiState:function(C,B){if(A.isFF&&A.isFF<3){return C.hasAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{if(C.hasAttribute){return C.hasAttribute("aria-"+B)
}else{return C.getAttribute("aria-"+B)?true:false
}}},getWaiState:function(C,B){if(A.isFF&&A.isFF<3){return C.getAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{var D=C.getAttribute("aria-"+B);
return D?D:""
}},setWaiState:function(C,B,D){if(A.isFF&&A.isFF<3){C.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+B,D)
}else{C.setAttribute("aria-"+B,D)
}},removeWaiState:function(C,B){if(A.isFF&&A.isFF<3){C.removeAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{C.removeAttribute("aria-"+B)
}}})
}if(!A._hasResource["dijit._base"]){A._hasResource["dijit._base"]=true;
A.provide("dijit._base")
}if(!A._hasResource["dojo.date.stamp"]){A._hasResource["dojo.date.stamp"]=true;
A.provide("dojo.date.stamp");
A.date.stamp.fromISOString=function(G,D){if(!A.date.stamp._isoRegExp){A.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var E=A.date.stamp._isoRegExp.exec(G);
var C=null;
if(E){E.shift();
E[1]&&E[1]--;
E[6]&&(E[6]*=1000);
if(D){D=new Date(D);
A.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(H){return D["get"+H]()
}).forEach(function(I,H){if(E[H]===undefined){E[H]=I
}})
}C=new Date(E[0]||1970,E[1]||0,E[2]||0,E[3]||0,E[4]||0,E[5]||0,E[6]||0);
var B=0;
var F=E[7]&&E[7].charAt(0);
if(F!="Z"){B=((E[8]||0)*60)+(Number(E[9])||0);
if(F!="-"){B*=-1
}}if(F){B-=C.getTimezoneOffset()
}if(B){C.setTime(C.getTime()+B*60000)
}}return C
};
A.date.stamp.toISOString=function(E,I){var H=function(L){return(L<10)?"0"+L:L
};
I=I||{};
var D=[];
var F=I.zulu?"getUTC":"get";
var B="";
if(I.selector!="time"){B=[E[F+"FullYear"](),H(E[F+"Month"]()+1),H(E[F+"Date"]())].join("-")
}D.push(B);
if(I.selector!="date"){var K=[H(E[F+"Hours"]()),H(E[F+"Minutes"]()),H(E[F+"Seconds"]())].join(":");
var J=E[F+"Milliseconds"]();
if(I.milliseconds){K+="."+(J<100?"0":"")+H(J)
}if(I.zulu){K+="Z"
}else{if(I.selector!="time"){var G=E.getTimezoneOffset();
var C=Math.abs(G);
K+=(G>0?"-":"+")+H(Math.floor(C/60))+":"+H(C%60)
}}D.push(K)
}return D.join("T")
}
}if(!A._hasResource["dojo.parser"]){A._hasResource["dojo.parser"]=true;
A.provide("dojo.parser");
A.parser=new function(){var B=A;
function C(G){if(B.isString(G)){return"string"
}if(typeof G=="number"){return"number"
}if(typeof G=="boolean"){return"boolean"
}if(B.isFunction(G)){return"function"
}if(B.isArray(G)){return"array"
}if(G instanceof Date){return"date"
}if(G instanceof B._Url){return"url"
}return"object"
}function D(H,G){switch(G){case"string":return H;
case"number":return H.length?Number(H):NaN;
case"boolean":return typeof H=="boolean"?H:!(H.toLowerCase()=="false");
case"function":if(B.isFunction(H)){H=H.toString();
H=B.trim(H.substring(H.indexOf("{")+1,H.length-1))
}try{if(H.search(/[^\w\.]+/i)!=-1){H=B.parser._nameAnonFunc(new Function(H),this)
}return B.getObject(H,false)
}catch(I){return new Function()
}case"array":return H.split(/\s*,\s*/);
case"date":switch(H){case"":return new Date("");
case"now":return new Date();
default:return B.date.stamp.fromISOString(H)
}case"url":return B.baseUrl+H;
default:return B.fromJson(H)
}}var F={};
function E(G){if(!F[G]){var K=B.getObject(G);
if(!B.isFunction(K)){throw new Error("Could not load class '"+G+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var H=K.prototype;
var J={};
for(var L in H){if(L.charAt(0)=="_"){continue
}var I=H[L];
J[L]=C(I)
}F[G]={cls:K,params:J}
}return F[G]
}this._functionFromScript=function(H){var I="";
var K="";
var G=H.getAttribute("args");
if(G){B.forEach(G.split(/\s*,\s*/),function(M,L){I+="var "+M+" = arguments["+L+"]; "
})
}var J=H.getAttribute("with");
if(J&&J.length){B.forEach(J.split(/\s*,\s*/),function(L){I+="with("+L+"){";
K+="}"
})
}return new Function(I+H.innerHTML+K)
};
this.instantiate=function(G){var H=[];
B.forEach(G,function(M){if(!M){return 
}var U=M.getAttribute("dojoType");
if((!U)||(!U.length)){return 
}var R=E(U);
var S=R.cls;
var K=S._noScript||S.prototype._noScript;
var N={};
var P=M.attributes;
for(var L in R.params){var W=P.getNamedItem(L);
if(!W||(!W.specified&&(!A.isIE||L.toLowerCase()!="value"))){continue
}var I=W.value;
switch(L){case"class":I=M.className;
break;
case"style":I=M.style&&M.style.cssText
}var Q=R.params[L];
N[L]=D(I,Q)
}if(!K){var O=[],X=[];
B.query("> script[type^='dojo/']",M).orphan().forEach(function(a){var Y=a.getAttribute("event"),b=a.getAttribute("type"),Z=B.parser._functionFromScript(a);
if(Y){if(b=="dojo/connect"){O.push({event:Y,func:Z})
}else{N[Y]=Z
}}else{X.push(Z)
}})
}var V=S.markupFactory;
if(!V&&S.prototype){V=S.prototype.markupFactory
}var J=V?V(N,M,S):new S(N,M);
H.push(J);
var T=M.getAttribute("jsId");
if(T){B.setObject(T,J)
}if(!K){A.forEach(O,function(Y){A.connect(J,Y.event,null,Y.func)
});
A.forEach(X,function(Y){Y.call(J)
})
}});
B.forEach(H,function(I){if(I&&(I.startup)&&((!I.getParent)||(!I.getParent()))){I.startup()
}});
return H
};
this.parse=function(G){var H=B.query("[dojoType]",G);
var I=this.instantiate(H);
return I
}
}();
(function(){var B=function(){if(djConfig.parseOnLoad==true){A.parser.parse()
}};
if(A.exists("dijit.wai.onload")&&(dijit.wai.onload===A._loaders[0])){A._loaders.splice(1,0,B)
}else{A._loaders.unshift(B)
}})();
A.parser._anonCtr=0;
A.parser._anon={};
A.parser._nameAnonFunc=function(C,G){var F="$joinpoint";
var E=(G||A.parser._anon);
if(A.isIE){var B=C.__dojoNameCache;
if(B&&E[B]===C){return C.__dojoNameCache
}}var D="__"+A.parser._anonCtr++;
while(typeof E[D]!="undefined"){D="__"+A.parser._anonCtr++
}E[D]=C;
return D
}
}if(!A._hasResource["dijit._Widget"]){A._hasResource["dijit._Widget"]=true;
A.provide("dijit._Widget");
A.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(B,C){this.create(B,C)
},create:function(B,D){this.srcNodeRef=A.byId(D);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(B){A.mixin(this,B)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var C in this.attributeMap){var F=this[this.attributeMap[C]||"domNode"];
var E=this[C];
if(typeof E!="object"&&(E!==""||(B&&B[C]))){switch(C){case"class":A.addClass(F,E);
break;
case"style":if(F.style.cssText){F.style.cssText+="; "+E
}else{F.style.cssText=E
}break;
default:F.setAttribute(C,E)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||A.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(B){this.destroyDescendants();
this.destroy()
},destroy:function(B){this.uninitialize();
A.forEach(this._connects,function(C){A.forEach(C,A.disconnect)
});
this.destroyRendering(B);
dijit.registry.remove(this.id)
},destroyRendering:function(B){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){A._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){A._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){A.forEach(this.getDescendants(),function(B){B.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var B=A.query("[widgetId]",this.domNode);
return B.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(F,E,B){var D=[];
if(E=="ondijitclick"){var C=this;
if(!this.nodesWithKeyClick[F.nodeName]){D.push(A.connect(F,"onkeydown",this,function(G){if(G.keyCode==A.keys.ENTER){return(A.isString(B))?C[B](G):B.call(C,G)
}else{if(G.keyCode==A.keys.SPACE){A.stopEvent(G)
}}}));
D.push(A.connect(F,"onkeyup",this,function(G){if(G.keyCode==A.keys.SPACE){return A.isString(B)?C[B](G):B.call(C,G)
}}))
}E="onclick"
}D.push(A.connect(F,E,this,B));
this._connects.push(D);
return D
},disconnect:function(B){for(var C=0;
C<this._connects.length;
C++){if(this._connects[C]==B){A.forEach(B,A.disconnect);
this._connects.splice(C,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=A.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(A.style(this.domNode,"display")!="none")
}})
}if(!A._hasResource["dojo.string"]){A._hasResource["dojo.string"]=true;
A.provide("dojo.string");
A.string.pad=function(B,E,F,C){var D=String(B);
if(!F){F="0"
}while(D.length<E){if(C){D+=F
}else{D=F+D
}}return D
};
A.string.substitute=function(E,B,D,C){return E.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(F,G,I){var H=A.getObject(G,false,B);
if(I){H=A.getObject(I,false,C)(H)
}if(D){H=D(H,G)
}return H.toString()
})
};
A.string.trim=function(B){B=B.replace(/^\s+/,"");
for(var C=B.length-1;
C>0;
C--){if(/\S/.test(B.charAt(C))){B=B.substring(0,C+1);
break
}}return B
}
}if(!A._hasResource["dijit._Templated"]){A._hasResource["dijit._Templated"]=true;
A.provide("dijit._Templated");
A.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var D=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var E;
if(A.isString(D)){var C=this.declaredClass,B=this;
var G=A.string.substitute(D,this,function(J,I){if(I.charAt(0)=="!"){J=B[I.substr(1)]
}if(typeof J=="undefined"){throw new Error(C+" template:"+I)
}if(!J){return""
}return I.charAt(0)=="!"?J:J.toString().replace(/"/g,"&quot;")
},this);
E=dijit._Templated._createNodesFromText(G)[0]
}else{E=D.cloneNode(true)
}this._attachTemplateNodes(E);
var F=this.srcNodeRef;
if(F&&F.parentNode){F.parentNode.replaceChild(E,F)
}this.domNode=E;
if(this.widgetsInTemplate){var H=A.parser.parse(E);
this._attachTemplateNodes(H,function(J,I){return J[I]
})
}this._fillContent(F)
},_fillContent:function(B){var C=this.containerNode;
if(B&&C){while(B.hasChildNodes()){C.appendChild(B.firstChild)
}}},_attachTemplateNodes:function(L,O){O=O||function(S,R){return S.getAttribute(R)
};
var K=A.isArray(L)?L:(L.all||L.getElementsByTagName("*"));
var C=A.isArray(L)?0:-1;
for(;
C<K.length;
C++){var E=(C==-1)?L:K[C];
if(this.widgetsInTemplate&&O(E,"dojoType")){continue
}var M=O(E,"dojoAttachPoint");
if(M){var D,G=M.split(/\s*,\s*/);
while(D=G.shift()){if(A.isArray(this[D])){this[D].push(E)
}else{this[D]=E
}}}var B=O(E,"dojoAttachEvent");
if(B){var J,H=B.split(/\s*,\s*/);
var N=A.trim;
while(J=H.shift()){if(J){var P=null;
if(J.indexOf(":")!=-1){var I=J.split(":");
J=N(I[0]);
P=N(I[1])
}else{J=N(J)
}if(!P){P=J
}this.connect(E,J,P)
}}}var Q=O(E,"waiRole");
if(Q){dijit.setWaiRole(E,Q)
}var F=O(E,"waiState");
if(F){A.forEach(F.split(/\s*,\s*/),function(S){if(S.indexOf("-")!=-1){var R=S.split("-");
dijit.setWaiState(E,R[0],R[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(E,F,C){var G=dijit._Templated._templateCache;
var B=F||E;
var D=G[B];
if(D){return D
}if(!F){F=dijit._Templated._sanitizeTemplateString(A._getText(E))
}F=A.string.trim(F);
if(F.match(/\$\{([^\}]+)\}/g)||C){return(G[B]=F)
}else{return(G[B]=dijit._Templated._createNodesFromText(F)[0])
}};
dijit._Templated._sanitizeTemplateString=function(C){if(C){C=C.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var B=C.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(B){C=B[1]
}}else{C=""
}return C
};
if(A.isIE){A.addOnUnload(function(){var C=dijit._Templated._templateCache;
for(var D in C){var B=C[D];
if(!isNaN(B.nodeType)){A._destroyElement(B)
}delete C[D]
}})
}(function(){var B={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var C;
dijit._Templated._createNodesFromText=function(J){if(!C){C=A.doc.createElement("div");
C.style.display="none";
A.body().appendChild(C)
}var H="none";
var F=J.replace(/^\s+/,"");
for(var I in B){var K=B[I];
if(K.re.test(F)){H=I;
J=K.pre+J+K.post;
break
}}C.innerHTML=J;
if(C.normalize){C.normalize()
}var E={cell:"tr",row:"tbody",section:"table"}[H];
var D=(typeof E!="undefined")?C.getElementsByTagName(E)[0]:C;
var G=[];
while(D.firstChild){G.push(D.removeChild(D.firstChild))
}C.innerHTML="";
return G
}
})();
A.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}if(!A._hasResource["dijit._Container"]){A._hasResource["dijit._Container"]=true;
A.provide("dijit._Container");
A.declare("dijit._Contained",null,{getParent:function(){for(var D=this.domNode.parentNode;
D;
D=D.parentNode){var B=D.getAttribute&&D.getAttribute("widgetId");
if(B){var C=dijit.byId(B);
return C.isContainer?C:null
}}return null
},_getSibling:function(D){var C=this.domNode;
do{C=C[D+"Sibling"]
}while(C&&C.nodeType!=1);
if(!C){return null
}var B=C.getAttribute("widgetId");
return dijit.byId(B)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
A.declare("dijit._Container",null,{isContainer:true,addChild:function(B,C){if(C===undefined){C="last"
}var D=this.containerNode||this.domNode;
if(C&&typeof C=="number"){var E=A.query("> [widgetid]",D);
if(E&&E.length>=C){D=E[C-1];
C="after"
}}A.place(B.domNode,D,C);
if(this._started&&!B._started){B.startup()
}},removeChild:function(B){var C=B.domNode;
C.parentNode.removeChild(C)
},_nextElement:function(B){do{B=B.nextSibling
}while(B&&B.nodeType!=1);
return B
},_firstElement:function(B){B=B.firstChild;
if(B&&B.nodeType!=1){B=this._nextElement(B)
}return B
},getChildren:function(){return A.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var B=this.containerNode||this.domNode;
return !!this._firstElement(B)
},_getSiblingOfChild:function(B,C){var D=B.domNode;
var E=(C>0?"nextSibling":"previousSibling");
do{D=D[E]
}while(D&&(D.nodeType!=1||!dijit.byNode(D)));
return D?dijit.byNode(D):null
}});
A.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(C,B){var D=this._keyNavCodes={};
var F=A.hitch(this,this.focusPrev);
var E=A.hitch(this,this.focusNext);
A.forEach(C,function(G){D[G]=F
});
A.forEach(B,function(G){D[G]=E
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(A.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){A.forEach(this.getChildren(),A.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(B,C){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(B)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var B=this._getNextFocusableChild(this.focusedChild,1);
if(B.getFocalNodes){this.focusChild(B,B.getFocalNodes()[0])
}else{this.focusChild(B)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var B=this._getNextFocusableChild(this.focusedChild,-1);
if(B.getFocalNodes){var C=B.getFocalNodes();
this.focusChild(B,C[C.length-1])
}else{this.focusChild(B)
}},focusChild:function(B,C){if(B){if(this.focusedChild&&B!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=B;
if(C&&B.focusFocalNode){B.focusFocalNode(C)
}else{B.focus()
}}},_setTabIndexMinusOne:function(B){if(B.getFocalNodes){A.forEach(B.getFocalNodes(),function(C){C.setAttribute("tabIndex",-1)
})
}else{(B.focusNode||B.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(C){this.domNode.setAttribute("tabIndex",-1);
if(C.target===this.domNode){this.focusFirstChild()
}else{var B=dijit.getEnclosingWidget(C.target);
if(B&&B.isFocusable()){this.focusedChild=B
}}},_onContainerBlur:function(B){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(C){if(C.ctrlKey||C.altKey){return 
}var B=this._keyNavCodes[C.keyCode];
if(B){B();
A.stopEvent(C)
}},_onChildBlur:function(B){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(B,C){if(B){B=this._getSiblingOfChild(B,C)
}var E=this.getChildren();
for(var D=0;
D<E.length;
D++){if(!B){B=E[(C>0)?0:(E.length-1)]
}if(B.isFocusable()){return B
}B=this._getSiblingOfChild(B,C)
}}})
}if(!A._hasResource["dijit.layout._LayoutWidget"]){A._hasResource["dijit.layout._LayoutWidget"]=true;
A.provide("dijit.layout._LayoutWidget");
A.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){A.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){A.forEach(this.getChildren(),function(B){B.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(C){var D=this.domNode;
if(C){A.marginBox(D,C);
if(C.t){D.style.top=C.t+"px"
}if(C.l){D.style.left=C.l+"px"
}}var B=A.mixin(A.marginBox(D),C||{});
this._contentBox=dijit.layout.marginBox2contentBox(D,B);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(F,B){var D=A.getComputedStyle(F);
var E=A._getMarginExtents(F,D);
var C=A._getPadBorderExtents(F,D);
return{l:A._toPixelValue(F,D.paddingLeft),t:A._toPixelValue(F,D.paddingTop),w:B.w-(E.w+C.w),h:B.h-(E.h+C.h)}
};
(function(){var B=function(D){return D.substring(0,1).toUpperCase()+D.substring(1)
};
var C=function(D,E){D.resize?D.resize(E):A.marginBox(D.domNode,E);
A.mixin(D,A.marginBox(D.domNode));
A.mixin(D,E)
};
dijit.layout.layoutChildren=function(D,F,E){F=A.mixin({},F);
A.addClass(D,"dijitLayoutContainer");
E=A.filter(E,function(G){return G.layoutAlign!="client"
}).concat(A.filter(E,function(G){return G.layoutAlign=="client"
}));
A.forEach(E,function(J){var I=J.domNode,H=J.layoutAlign;
var G=I.style;
G.left=F.l+"px";
G.top=F.t+"px";
G.bottom=G.right="auto";
A.addClass(I,"dijitAlign"+B(H));
if(H=="top"||H=="bottom"){C(J,{w:F.w});
F.h-=J.h;
if(H=="top"){F.t+=J.h
}else{G.top=F.t+F.h+"px"
}}else{if(H=="left"||H=="right"){C(J,{h:F.h});
F.w-=J.w;
if(H=="left"){F.l+=J.w
}else{G.left=F.l+F.w+"px"
}}else{if(H=="client"){C(J,F)
}}}})
}
})()
}if(!A._hasResource["dijit.form._FormWidget"]){A._hasResource["dijit.form._FormWidget"]=true;
A.provide("dijit.form._FormWidget");
A.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",value:"",name:"",id:"",alt:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,attributeMap:A.mixin(A.clone(dijit._Widget.prototype.attributeMap),{id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),setDisabled:function(B){this.domNode.disabled=this.disabled=B;
if(this.focusNode){this.focusNode.disabled=B
}if(B){this._hovering=false;
this._active=false
}dijit.setWaiState(this.focusNode||this.domNode,"disabled",B);
this._setStateClass()
},_onMouse:function(E){var B=E.target;
if(B&&B.getAttribute){this.stateModifier=B.getAttribute("stateModifier")||""
}if(!this.disabled){switch(E.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var C=this;
var D=this.connect(A.body(),"onmouseup",function(){C._active=false;
C._setStateClass();
C.disconnect(D)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(A.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var B=[this.baseClass];
function C(D){B=B.concat(A.map(B,function(E){return E+D
}))
}if(this.checked){C("Checked")
}if(this.state){C(this.state)
}if(this.selected){C("Selected")
}if(this.disabled){C("Disabled")
}else{if(this._active){C(this.stateModifier+"Active")
}else{if(this._focused){C("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){C(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+B.join(" ")
},onChange:function(B){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(B,C){this._lastValue=B;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(C===undefined){C=true
}if(this._lastValueReported==undefined&&C===null){this._lastValueReported=B
}if((this.intermediateChanges||C)&&((B&&B.toString)?B.toString():B)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=B;
this.onChange(B)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(D){if(D.keyCode==A.keys.ESCAPE&&!D.shiftKey&&!D.ctrlKey&&!D.altKey){var C=this.getValue();
var B=this._lastValueReported;
if((typeof B!="undefined")&&((C!==null&&C.toString)?C.toString():null)!==B.toString()){this.undo();
A.stopEvent(D);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}if(!A._hasResource["dijit.dijit"]){A._hasResource["dijit.dijit"]=true;
A.provide("dijit.dijit")
}}});