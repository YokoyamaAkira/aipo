dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"],["provide","dijit._base.manager"],["provide","dijit._base.place"],["provide","dijit._base.window"],["provide","dijit._base.popup"],["provide","dijit._base.scroll"],["provide","dijit._base.sniff"],["provide","dijit._base.bidi"],["provide","dijit._base.typematic"],["provide","dijit._base.wai"],["provide","dijit._base"],["provide","dojo.date.stamp"],["provide","dojo.parser"],["provide","dijit._Widget"],["provide","dojo.string"],["provide","dijit._Templated"],["provide","dijit._Container"],["provide","dijit.layout._LayoutWidget"],["provide","dijit.form._FormWidget"],["provide","dijit.dijit"]],defineResource:function(A){if(!A._hasResource["dijit._base.focus"]){A._hasResource["dijit._base.focus"]=true;
A.provide("dijit._base.focus");
A.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var D=A.global;
var B=A.doc;
if(B.selection){return !B.selection.createRange().text
}else{if(D.getSelection){var C=D.getSelection();
if(A.isString(C)){return !C
}else{return C.isCollapsed||!C.toString()
}}}},getBookmark:function(){var D,C=A.doc.selection;
if(C){var B=C.createRange();
if(C.type.toUpperCase()=="CONTROL"){D=B.length?A._toArray(B):null
}else{D=B.getBookmark()
}}else{if(A.global.getSelection){C=A.global.getSelection();
if(C){var B=C.getRangeAt(0);
D=B.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return D
},moveToBookmark:function(E){var B=A.doc;
if(B.selection){var C;
if(A.isArray(E)){C=B.body.createControlRange();
A.forEach(E,C.addElement)
}else{C=B.selection.createRange();
C.moveToBookmark(E)
}C.select()
}else{var D=A.global.getSelection&&A.global.getSelection();
if(D&&D.removeAllRanges){D.removeAllRanges();
D.addRange(E)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(C,B){return{node:C&&A.isDescendant(dijit._curFocus,C.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!A.withGlobal(B||A.global,dijit.isCollapsed)?A.withGlobal(B||A.global,dijit.getBookmark):null,openedForWindow:B}
},focus:function(E){if(!E){return 
}var D="node" in E?E.node:E,C=E.bookmark,B=E.openedForWindow;
if(D){var G=(D.tagName.toLowerCase()=="iframe")?D.contentWindow:D;
if(G&&G.focus){try{G.focus()
}catch(F){}}dijit._onFocusNode(D)
}if(C&&A.withGlobal(B||A.global,dijit.isCollapsed)){if(B){B.focus()
}try{A.withGlobal(B||A.global,moveToBookmark,null,[C])
}catch(F){}}},_activeStack:[],registerWin:function(C){if(!C){C=window
}A.connect(C.document,"onmousedown",null,function(D){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(D.target||D.srcElement)
});
var B=C.document.body||C.document.getElementsByTagName("body")[0];
if(B){if(A.isIE){B.attachEvent("onactivate",function(D){if(D.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(D.srcElement)
}});
B.attachEvent("ondeactivate",function(D){dijit._onBlurNode(D.srcElement)
})
}else{B.addEventListener("focus",function(D){dijit._onFocusNode(D.target)
},true);
B.addEventListener("blur",function(D){dijit._onBlurNode(D.target)
},true)
}}B=null
},_onBlurNode:function(C){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var B=dijit.getEnclosingWidget(C);
if(B&&B._setStateClass){B._focused=false;
B._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(C){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var B=[];
try{while(C){if(C.dijitPopupParent){C=dijit.byId(C.dijitPopupParent).domNode
}else{if(C.tagName&&C.tagName.toLowerCase()=="body"){if(C===A.body()){break
}C=A.query("iframe").filter(function(F){return F.contentDocument.body===C
})[0]
}else{var E=C.getAttribute&&C.getAttribute("widgetId");
if(E){B.unshift(E)
}C=C.parentNode
}}}}catch(D){}dijit._setStack(B)
},_onFocusNode:function(C){if(C&&C.tagName&&C.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(C);
if(C==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=C;
A.publish("focusNode",[C]);
var B=dijit.getEnclosingWidget(C);
if(B&&B._setStateClass){B._focused=true;
B._setStateClass()
}},_setStack:function(B){var F=dijit._activeStack;
dijit._activeStack=B;
for(var D=0;
D<Math.min(F.length,B.length);
D++){if(F[D]!=B[D]){break
}}for(var C=F.length-1;
C>=D;
C--){var E=dijit.byId(F[C]);
if(E){A.publish("widgetBlur",[E]);
if(E._onBlur){E._onBlur()
}}}for(var C=D;
C<B.length;
C++){var E=dijit.byId(B[C]);
if(E){A.publish("widgetFocus",[E]);
if(E._onFocus){E._onFocus()
}}}}});
A.addOnLoad(dijit.registerWin)
}if(!A._hasResource["dijit._base.manager"]){A._hasResource["dijit._base.manager"]=true;
A.provide("dijit._base.manager");
A.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(B){if(this._hash[B.id]){throw new Error("Tried to register widget with id=="+B.id+" but that id is already registered")
}this._hash[B.id]=B
},remove:function(B){delete this._hash[B]
},forEach:function(B){for(var C in this._hash){B(this._hash[C])
}},filter:function(C){var B=new dijit.WidgetSet();
this.forEach(function(D){if(C(D)){B.add(D)
}});
return B
},byId:function(B){return this._hash[B]
},byClass:function(B){return this.filter(function(C){return C.declaredClass==B
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(B){var C;
do{C=B+"_"+(dijit._widgetTypeCtr[B]!==undefined?++dijit._widgetTypeCtr[B]:dijit._widgetTypeCtr[B]=0)
}while(dijit.byId(C));
return C
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
dijit.getViewport=function(){var B=A.global;
var H=A.doc;
var I=0,D=0;
if(A.isMozilla){var J,E,F,C;
if(H.body.clientWidth>H.documentElement.clientWidth){J=H.documentElement.clientWidth;
F=H.body.clientWidth
}else{F=H.documentElement.clientWidth;
J=H.body.clientWidth
}if(H.body.clientHeight>H.documentElement.clientHeight){E=H.documentElement.clientHeight;
C=H.body.clientHeight
}else{C=H.documentElement.clientHeight;
E=H.body.clientHeight
}I=(F>B.innerWidth)?J:F;
D=(C>B.innerHeight)?E:C
}else{if(!A.isOpera&&B.innerWidth){I=B.innerWidth;
D=B.innerHeight
}else{if(A.isIE&&H.documentElement&&H.documentElement.clientHeight){I=H.documentElement.clientWidth;
D=H.documentElement.clientHeight
}else{if(A.body().clientWidth){I=A.body().clientWidth;
D=A.body().clientHeight
}}}}var G=A._docScroll();
return{w:I,h:D,l:G.x,t:G.y}
};
dijit.placeOnScreen=function(C,F,B,D){var E=A.map(B,function(G){return{corner:G,pos:F}
});
return dijit._place(C,E)
};
dijit._place=function(P,M,I){var J=dijit.getViewport();
if(!P.parentNode||String(P.parentNode.tagName).toLowerCase()!="body"){A.body().appendChild(P)
}var F=null;
for(var Q=0;
Q<M.length;
Q++){var H=M[Q].corner;
var G=M[Q].pos;
if(I){I(H)
}var L=P.style.display;
var C=P.style.visibility;
P.style.visibility="hidden";
P.style.display="";
var B=A.marginBox(P);
P.style.display=L;
P.style.visibility=C;
var S=(H.charAt(1)=="L"?G.x:Math.max(J.l,G.x-B.w)),R=(H.charAt(0)=="T"?G.y:Math.max(J.t,G.y-B.h)),E=(H.charAt(1)=="L"?Math.min(J.l+J.w,S+B.w):G.x),D=(H.charAt(0)=="T"?Math.min(J.t+J.h,R+B.h):G.y),N=E-S,K=D-R,O=(B.w-N)+(B.h-K);
if(F==null||O<F.overflow){F={corner:H,aroundCorner:M[Q].aroundCorner,x:S,y:R,w:N,h:K,overflow:O}
}if(O==0){break
}}P.style.left=F.x+"px";
P.style.top=F.y+"px";
return F
};
dijit.placeOnScreenAroundElement=function(C,F,G,D){F=A.byId(F);
var I=F.style.display;
F.style.display="";
var J=F.offsetWidth;
var E=F.offsetHeight;
var H=A.coords(F,true);
F.style.display=I;
var K=[];
for(var B in G){K.push({aroundCorner:B,corner:G[B],pos:{x:H.x+(B.charAt(1)=="L"?0:J),y:H.y+(B.charAt(0)=="T"?0:E)}})
}return dijit._place(C,K,D)
}
}if(!A._hasResource["dijit._base.window"]){A._hasResource["dijit._base.window"]=true;
A.provide("dijit._base.window");
dijit.getDocumentWindow=function(D){if(A.isSafari&&!D._parentWindow){var B=function(F){F.document._parentWindow=F;
for(var E=0;
E<F.frames.length;
E++){B(F.frames[E])
}};
B(window.top)
}if(A.isIE&&window!==document.parentWindow&&!D._parentWindow){D.parentWindow.execScript("document._parentWindow = window;","Javascript");
var C=D._parentWindow;
D._parentWindow=null;
return C
}return D._parentWindow||D.parentWindow||D.defaultView
}
}if(!A._hasResource["dijit._base.popup"]){A._hasResource["dijit._base.popup"]=true;
A.provide("dijit._base.popup");
dijit.popup=new function(){var B=[],C=1000,D=1;
this.open=function(M){var L=M.popup,K=M.orient||{BL:"TL",TL:"BL"},N=M.around,G=(M.around&&M.around.id)?(M.around.id+"_dropdown"):("popup_"+D++);
var F=A.doc.createElement("div");
F.id=G;
F.className="dijitPopup";
F.style.zIndex=C+B.length;
F.style.visibility="hidden";
if(M.parent){F.dijitPopupParent=M.parent.id
}A.body().appendChild(F);
L.domNode.style.display="";
F.appendChild(L.domNode);
var J=new dijit.BackgroundIframe(F);
var I=N?dijit.placeOnScreenAroundElement(F,N,K,L.orient?A.hitch(L,"orient"):null):dijit.placeOnScreen(F,M,K=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
F.style.visibility="visible";
var H=[];
function E(){for(var O=B.length-1;
O>0&&B[O].parent===B[O-1].widget;
O--){}return B[O]
}H.push(A.connect(F,"onkeypress",this,function(O){if(O.keyCode==A.keys.ESCAPE&&M.onCancel){M.onCancel()
}else{if(O.keyCode==A.keys.TAB){A.stopEvent(O);
var P=E();
if(P&&P.onCancel){P.onCancel()
}}}}));
if(L.onCancel){H.push(A.connect(L,"onCancel",null,M.onCancel))
}H.push(A.connect(L,L.onExecute?"onExecute":"onChange",null,function(){var O=E();
if(O&&O.onExecute){O.onExecute()
}}));
B.push({wrapper:F,iframe:J,widget:L,parent:M.parent,onExecute:M.onExecute,onCancel:M.onCancel,onClose:M.onClose,handlers:H});
if(L.onOpen){L.onOpen(I)
}return I
};
this.close=function(F){while(A.some(B,function(K){return K.widget==F
})){var I=B.pop(),J=I.wrapper,G=I.iframe,H=I.widget,E=I.onClose;
if(H.onClose){H.onClose()
}A.forEach(I.handlers,A.disconnect);
if(!H||!H.domNode){return 
}A.style(H.domNode,"display","none");
A.body().appendChild(H.domNode);
G.destroy();
A._destroyElement(J);
if(E){E()
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
}dijit.BackgroundIframe=function(C){if(!C.id){throw new Error("no id")
}if((A.isIE&&A.isIE<7)||(A.isFF&&A.isFF<3&&A.hasClass(A.body(),"dijit_a11y"))){var B=dijit._frames.pop();
C.appendChild(B);
if(A.isIE){B.style.setExpression("width","document.getElementById('"+C.id+"').offsetWidth");
B.style.setExpression("height","document.getElementById('"+C.id+"').offsetHeight")
}this.iframe=B
}};
A.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}if(!A._hasResource["dijit._base.scroll"]){A._hasResource["dijit._base.scroll"]=true;
A.provide("dijit._base.scroll");
dijit.scrollIntoView=function(D){if(A.isIE){if(A.marginBox(D.parentNode).h<=D.parentNode.scrollHeight){D.scrollIntoView(false)
}}else{if(A.isMozilla){D.scrollIntoView(false)
}else{var B=D.parentNode;
var C=B.scrollTop+A.marginBox(B).h;
var E=D.offsetTop+A.marginBox(D).h;
if(C<E){B.scrollTop+=(E-C)
}else{if(B.scrollTop>D.offsetTop){B.scrollTop-=(B.scrollTop-D.offsetTop)
}}}}}
}if(!A._hasResource["dijit._base.sniff"]){A._hasResource["dijit._base.sniff"]=true;
A.provide("dijit._base.sniff");
(function(){var H=A;
var G=H.isIE;
var B=H.isOpera;
var C=Math.floor;
var E={dj_ie:G,dj_ie6:C(G)==6,dj_ie7:C(G)==7,dj_iequirks:G&&H.isQuirks,dj_opera:B,dj_opera8:C(B)==8,dj_opera9:C(B)==9,dj_khtml:H.isKhtml,dj_safari:H.isSafari,dj_gecko:H.isMozilla};
for(var F in E){if(E[F]){var D=A.doc.documentElement;
if(D.className){D.className+=" "+F
}else{D.className=F
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
},trigger:function(B,H,D,G,F,C,E){if(F!=this._obj){this.stop();
this._initialDelay=E||500;
this._subsequentDelay=C||0.9;
this._obj=F;
this._evt=B;
this._node=D;
this._currentTimeout=-1;
this._count=-1;
this._callback=A.hitch(H,G);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(D,B,G,F,C,E){return[A.connect(D,"onkeypress",this,function(H){if(H.keyCode==B.keyCode&&(!B.charCode||B.charCode==H.charCode)&&(B.ctrlKey===undefined||B.ctrlKey==H.ctrlKey)&&(B.altKey===undefined||B.altKey==H.ctrlKey)&&(B.shiftKey===undefined||B.shiftKey==H.ctrlKey)){A.stopEvent(H);
dijit.typematic.trigger(B,G,D,F,B,C,E)
}else{if(dijit.typematic._obj==B){dijit.typematic.stop()
}}}),A.connect(D,"onkeyup",this,function(H){if(dijit.typematic._obj==B){dijit.typematic.stop()
}})]
},addMouseListener:function(D,G,F,C,E){var B=A.connect;
return[B(D,"mousedown",this,function(H){A.stopEvent(H);
dijit.typematic.trigger(H,G,D,F,D,C,E)
}),B(D,"mouseup",this,function(H){A.stopEvent(H);
dijit.typematic.stop()
}),B(D,"mouseout",this,function(H){A.stopEvent(H);
dijit.typematic.stop()
}),B(D,"mousemove",this,function(H){A.stopEvent(H)
}),B(D,"dblclick",this,function(H){A.stopEvent(H);
if(A.isIE){dijit.typematic.trigger(H,G,D,F,D,C,E);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(E,F,B,H,G,C,D){return this.addKeyListener(F,B,H,G,C,D).concat(this.addMouseListener(E,H,G,C,D))
}}
}if(!A._hasResource["dijit._base.wai"]){A._hasResource["dijit._base.wai"]=true;
A.provide("dijit._base.wai");
dijit.wai={onload:function(){var C=document.createElement("div");
C.id="a11yTestNode";
C.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+A.moduleUrl("dijit","form/templates/blank.gif")+'");';
A.body().appendChild(C);
function B(){var E=A.getComputedStyle(C);
if(E){var D=E.backgroundImage;
var F=(E.borderTopColor==E.borderRightColor)||(D!=null&&(D=="none"||D=="url(invalid-url:)"));
A[F?"addClass":"removeClass"](A.body(),"dijit_a11y")
}}B();
if(A.isIE){setInterval(B,4000)
}}};
if(A.isIE||A.isMoz){A._loaders.unshift(dijit.wai.onload)
}A.mixin(dijit,{hasWaiRole:function(B){if(B.hasAttribute){return B.hasAttribute("role")
}else{return B.getAttribute("role")?true:false
}},getWaiRole:function(C){var D=C.getAttribute("role");
if(D){var B=D.indexOf(":");
return B==-1?D:D.substring(B+1)
}else{return""
}},setWaiRole:function(B,C){if(A.isFF&&A.isFF<3){B.setAttribute("role","wairole:"+C)
}else{B.setAttribute("role",C)
}},removeWaiRole:function(B){B.removeAttribute("role")
},hasWaiState:function(B,C){if(A.isFF&&A.isFF<3){return B.hasAttributeNS("http://www.w3.org/2005/07/aaa",C)
}else{if(B.hasAttribute){return B.hasAttribute("aria-"+C)
}else{return B.getAttribute("aria-"+C)?true:false
}}},getWaiState:function(B,D){if(A.isFF&&A.isFF<3){return B.getAttributeNS("http://www.w3.org/2005/07/aaa",D)
}else{var C=B.getAttribute("aria-"+D);
return C?C:""
}},setWaiState:function(B,D,C){if(A.isFF&&A.isFF<3){B.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+D,C)
}else{B.setAttribute("aria-"+D,C)
}},removeWaiState:function(B,C){if(A.isFF&&A.isFF<3){B.removeAttributeNS("http://www.w3.org/2005/07/aaa",C)
}else{B.removeAttribute("aria-"+C)
}}})
}if(!A._hasResource["dijit._base"]){A._hasResource["dijit._base"]=true;
A.provide("dijit._base")
}if(!A._hasResource["dojo.date.stamp"]){A._hasResource["dojo.date.stamp"]=true;
A.provide("dojo.date.stamp");
A.date.stamp.fromISOString=function(F,C){if(!A.date.stamp._isoRegExp){A.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var D=A.date.stamp._isoRegExp.exec(F);
var B=null;
if(D){D.shift();
D[1]&&D[1]--;
D[6]&&(D[6]*=1000);
if(C){C=new Date(C);
A.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(H){return C["get"+H]()
}).forEach(function(I,H){if(D[H]===undefined){D[H]=I
}})
}B=new Date(D[0]||1970,D[1]||0,D[2]||0,D[3]||0,D[4]||0,D[5]||0,D[6]||0);
var G=0;
var E=D[7]&&D[7].charAt(0);
if(E!="Z"){G=((D[8]||0)*60)+(Number(D[9])||0);
if(E!="-"){G*=-1
}}if(E){G-=B.getTimezoneOffset()
}if(G){B.setTime(B.getTime()+G*60000)
}}return B
};
A.date.stamp.toISOString=function(G,K){var J=function(L){return(L<10)?"0"+L:L
};
K=K||{};
var F=[];
var H=K.zulu?"getUTC":"get";
var D="";
if(K.selector!="time"){D=[G[H+"FullYear"](),J(G[H+"Month"]()+1),J(G[H+"Date"]())].join("-")
}F.push(D);
if(K.selector!="date"){var C=[J(G[H+"Hours"]()),J(G[H+"Minutes"]()),J(G[H+"Seconds"]())].join(":");
var B=G[H+"Milliseconds"]();
if(K.milliseconds){C+="."+(B<100?"0":"")+J(B)
}if(K.zulu){C+="Z"
}else{if(K.selector!="time"){var I=G.getTimezoneOffset();
var E=Math.abs(I);
C+=(I>0?"-":"+")+J(Math.floor(E/60))+":"+J(E%60)
}}F.push(C)
}return F.join("T")
}
}if(!A._hasResource["dojo.parser"]){A._hasResource["dojo.parser"]=true;
A.provide("dojo.parser");
A.parser=new function(){var F=A;
function B(G){if(F.isString(G)){return"string"
}if(typeof G=="number"){return"number"
}if(typeof G=="boolean"){return"boolean"
}if(F.isFunction(G)){return"function"
}if(F.isArray(G)){return"array"
}if(G instanceof Date){return"date"
}if(G instanceof F._Url){return"url"
}return"object"
}function C(H,G){switch(G){case"string":return H;
case"number":return H.length?Number(H):NaN;
case"boolean":return typeof H=="boolean"?H:!(H.toLowerCase()=="false");
case"function":if(F.isFunction(H)){H=H.toString();
H=F.trim(H.substring(H.indexOf("{")+1,H.length-1))
}try{if(H.search(/[^\w\.]+/i)!=-1){H=F.parser._nameAnonFunc(new Function(H),this)
}return F.getObject(H,false)
}catch(I){return new Function()
}case"array":return H.split(/\s*,\s*/);
case"date":switch(H){case"":return new Date("");
case"now":return new Date();
default:return F.date.stamp.fromISOString(H)
}case"url":return F.baseUrl+H;
default:return F.fromJson(H)
}}var E={};
function D(I){if(!E[I]){var G=F.getObject(I);
if(!F.isFunction(G)){throw new Error("Could not load class '"+I+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var J=G.prototype;
var L={};
for(var H in J){if(H.charAt(0)=="_"){continue
}var K=J[H];
L[H]=B(K)
}E[I]={cls:G,params:L}
}return E[I]
}this._functionFromScript=function(H){var I="";
var K="";
var G=H.getAttribute("args");
if(G){F.forEach(G.split(/\s*,\s*/),function(M,L){I+="var "+M+" = arguments["+L+"]; "
})
}var J=H.getAttribute("with");
if(J&&J.length){F.forEach(J.split(/\s*,\s*/),function(L){I+="with("+L+"){";
K+="}"
})
}return new Function(I+H.innerHTML+K)
};
this.instantiate=function(G){var H=[];
F.forEach(G,function(K){if(!K){return 
}var S=K.getAttribute("dojoType");
if((!S)||(!S.length)){return 
}var P=D(S);
var Q=P.cls;
var I=Q._noScript||Q.prototype._noScript;
var L={};
var N=K.attributes;
for(var J in P.params){var W=N.getNamedItem(J);
if(!W||(!W.specified&&(!A.isIE||J.toLowerCase()!="value"))){continue
}var U=W.value;
switch(J){case"class":U=K.className;
break;
case"style":U=K.style&&K.style.cssText
}var O=P.params[J];
L[J]=C(U,O)
}if(!I){var M=[],X=[];
F.query("> script[type^='dojo/']",K).orphan().forEach(function(Y){var a=Y.getAttribute("event"),Z=Y.getAttribute("type"),b=F.parser._functionFromScript(Y);
if(a){if(Z=="dojo/connect"){M.push({event:a,func:b})
}else{L[a]=b
}}else{X.push(b)
}})
}var T=Q.markupFactory;
if(!T&&Q.prototype){T=Q.prototype.markupFactory
}var V=T?T(L,K,Q):new Q(L,K);
H.push(V);
var R=K.getAttribute("jsId");
if(R){F.setObject(R,V)
}if(!I){A.forEach(M,function(Y){A.connect(V,Y.event,null,Y.func)
});
A.forEach(X,function(Y){Y.call(V)
})
}});
F.forEach(H,function(I){if(I&&(I.startup)&&((!I.getParent)||(!I.getParent()))){I.startup()
}});
return H
};
this.parse=function(G){var H=F.query("[dojoType]",G);
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
A.parser._nameAnonFunc=function(B,F){var E="$joinpoint";
var D=(F||A.parser._anon);
if(A.isIE){var G=B.__dojoNameCache;
if(G&&D[G]===B){return B.__dojoNameCache
}}var C="__"+A.parser._anonCtr++;
while(typeof D[C]!="undefined"){C="__"+A.parser._anonCtr++
}D[C]=B;
return C
}
}if(!A._hasResource["dijit._Widget"]){A._hasResource["dijit._Widget"]=true;
A.provide("dijit._Widget");
A.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(C,B){this.create(C,B)
},create:function(F,C){this.srcNodeRef=A.byId(C);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(F){A.mixin(this,F)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var B in this.attributeMap){var E=this[this.attributeMap[B]||"domNode"];
var D=this[B];
if(typeof D!="object"&&(D!==""||(F&&F[B]))){switch(B){case"class":A.addClass(E,D);
break;
case"style":if(E.style.cssText){E.style.cssText+="; "+D
}else{E.style.cssText=D
}break;
default:E.setAttribute(B,D)
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
},nodesWithKeyClick:["input","button"],connect:function(E,D,F){var C=[];
if(D=="ondijitclick"){var B=this;
if(!this.nodesWithKeyClick[E.nodeName]){C.push(A.connect(E,"onkeydown",this,function(G){if(G.keyCode==A.keys.ENTER){return(A.isString(F))?B[F](G):F.call(B,G)
}else{if(G.keyCode==A.keys.SPACE){A.stopEvent(G)
}}}));
C.push(A.connect(E,"onkeyup",this,function(G){if(G.keyCode==A.keys.SPACE){return A.isString(F)?B[F](G):F.call(B,G)
}}))
}D="onclick"
}C.push(A.connect(E,D,this,F));
this._connects.push(C);
return C
},disconnect:function(C){for(var B=0;
B<this._connects.length;
B++){if(this._connects[B]==C){A.forEach(C,A.disconnect);
this._connects.splice(B,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=A.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(A.style(this.domNode,"display")!="none")
}})
}if(!A._hasResource["dojo.string"]){A._hasResource["dojo.string"]=true;
A.provide("dojo.string");
A.string.pad=function(F,D,E,B){var C=String(F);
if(!E){E="0"
}while(C.length<D){if(B){C+=E
}else{C=E+C
}}return C
};
A.string.substitute=function(D,E,C,B){return D.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(F,G,I){var H=A.getObject(G,false,E);
if(I){H=A.getObject(I,false,B)(H)
}if(C){H=C(H,G)
}return H.toString()
})
};
A.string.trim=function(C){C=C.replace(/^\s+/,"");
for(var B=C.length-1;
B>0;
B--){if(/\S/.test(C.charAt(B))){C=C.substring(0,B+1);
break
}}return C
}
}if(!A._hasResource["dijit._Templated"]){A._hasResource["dijit._Templated"]=true;
A.provide("dijit._Templated");
A.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var E=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var F;
if(A.isString(E)){var D=this.declaredClass,H=this;
var B=A.string.substitute(E,this,function(J,I){if(I.charAt(0)=="!"){J=H[I.substr(1)]
}if(typeof J=="undefined"){throw new Error(D+" template:"+I)
}if(!J){return""
}return I.charAt(0)=="!"?J:J.toString().replace(/"/g,"&quot;")
},this);
F=dijit._Templated._createNodesFromText(B)[0]
}else{F=E.cloneNode(true)
}this._attachTemplateNodes(F);
var G=this.srcNodeRef;
if(G&&G.parentNode){G.parentNode.replaceChild(F,G)
}this.domNode=F;
if(this.widgetsInTemplate){var C=A.parser.parse(F);
this._attachTemplateNodes(C,function(J,I){return J[I]
})
}this._fillContent(G)
},_fillContent:function(C){var B=this.containerNode;
if(C&&B){while(C.hasChildNodes()){B.appendChild(C.firstChild)
}}},_attachTemplateNodes:function(E,H){H=H||function(S,R){return S.getAttribute(R)
};
var C=A.isArray(E)?E:(E.all||E.getElementsByTagName("*"));
var L=A.isArray(E)?0:-1;
for(;
L<C.length;
L++){var D=(L==-1)?E:C[L];
if(this.widgetsInTemplate&&H(D,"dojoType")){continue
}var F=H(D,"dojoAttachPoint");
if(F){var M,O=F.split(/\s*,\s*/);
while(M=O.shift()){if(A.isArray(this[M])){this[M].push(D)
}else{this[M]=D
}}}var K=H(D,"dojoAttachEvent");
if(K){var B,P=K.split(/\s*,\s*/);
var G=A.trim;
while(B=P.shift()){if(B){var I=null;
if(B.indexOf(":")!=-1){var Q=B.split(":");
B=G(Q[0]);
I=G(Q[1])
}else{B=G(B)
}if(!I){I=B
}this.connect(D,B,I)
}}}var J=H(D,"waiRole");
if(J){dijit.setWaiRole(D,J)
}var N=H(D,"waiState");
if(N){A.forEach(N.split(/\s*,\s*/),function(S){if(S.indexOf("-")!=-1){var R=S.split("-");
dijit.setWaiState(D,R[0],R[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(D,E,G){var F=dijit._Templated._templateCache;
var B=E||D;
var C=F[B];
if(C){return C
}if(!E){E=dijit._Templated._sanitizeTemplateString(A._getText(D))
}E=A.string.trim(E);
if(E.match(/\$\{([^\}]+)\}/g)||G){return(F[B]=E)
}else{return(F[B]=dijit._Templated._createNodesFromText(E)[0])
}};
dijit._Templated._sanitizeTemplateString=function(B){if(B){B=B.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var C=B.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(C){B=C[1]
}}else{B=""
}return B
};
if(A.isIE){A.addOnUnload(function(){var B=dijit._Templated._templateCache;
for(var C in B){var D=B[C];
if(!isNaN(D.nodeType)){A._destroyElement(D)
}delete B[C]
}})
}(function(){var C={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var B;
dijit._Templated._createNodesFromText=function(K){if(!B){B=A.doc.createElement("div");
B.style.display="none";
A.body().appendChild(B)
}var G="none";
var E=K.replace(/^\s+/,"");
for(var H in C){var I=C[H];
if(I.re.test(E)){G=H;
K=I.pre+K+I.post;
break
}}B.innerHTML=K;
if(B.normalize){B.normalize()
}var D={cell:"tr",row:"tbody",section:"table"}[G];
var J=(typeof D!="undefined")?B.getElementsByTagName(D)[0]:B;
var F=[];
while(J.firstChild){F.push(J.removeChild(J.firstChild))
}B.innerHTML="";
return F
}
})();
A.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}if(!A._hasResource["dijit._Container"]){A._hasResource["dijit._Container"]=true;
A.provide("dijit._Container");
A.declare("dijit._Contained",null,{getParent:function(){for(var C=this.domNode.parentNode;
C;
C=C.parentNode){var D=C.getAttribute&&C.getAttribute("widgetId");
if(D){var B=dijit.byId(D);
return B.isContainer?B:null
}}return null
},_getSibling:function(C){var B=this.domNode;
do{B=B[C+"Sibling"]
}while(B&&B.nodeType!=1);
if(!B){return null
}var D=B.getAttribute("widgetId");
return dijit.byId(D)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
A.declare("dijit._Container",null,{isContainer:true,addChild:function(E,B){if(B===undefined){B="last"
}var C=this.containerNode||this.domNode;
if(B&&typeof B=="number"){var D=A.query("> [widgetid]",C);
if(D&&D.length>=B){C=D[B-1];
B="after"
}}A.place(E.domNode,C,B);
if(this._started&&!E._started){E.startup()
}},removeChild:function(C){var B=C.domNode;
B.parentNode.removeChild(B)
},_nextElement:function(B){do{B=B.nextSibling
}while(B&&B.nodeType!=1);
return B
},_firstElement:function(B){B=B.firstChild;
if(B&&B.nodeType!=1){B=this._nextElement(B)
}return B
},getChildren:function(){return A.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var B=this.containerNode||this.domNode;
return !!this._firstElement(B)
},_getSiblingOfChild:function(E,B){var C=E.domNode;
var D=(B>0?"nextSibling":"previousSibling");
do{C=C[D]
}while(C&&(C.nodeType!=1||!dijit.byNode(C)));
return C?dijit.byNode(C):null
}});
A.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(B,F){var C=this._keyNavCodes={};
var E=A.hitch(this,this.focusPrev);
var D=A.hitch(this,this.focusNext);
A.forEach(B,function(G){C[G]=E
});
A.forEach(F,function(G){C[G]=D
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(A.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){A.forEach(this.getChildren(),A.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(C,B){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(C)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var B=this._getNextFocusableChild(this.focusedChild,1);
if(B.getFocalNodes){this.focusChild(B,B.getFocalNodes()[0])
}else{this.focusChild(B)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var C=this._getNextFocusableChild(this.focusedChild,-1);
if(C.getFocalNodes){var B=C.getFocalNodes();
this.focusChild(C,B[B.length-1])
}else{this.focusChild(C)
}},focusChild:function(C,B){if(C){if(this.focusedChild&&C!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=C;
if(B&&C.focusFocalNode){C.focusFocalNode(B)
}else{C.focus()
}}},_setTabIndexMinusOne:function(B){if(B.getFocalNodes){A.forEach(B.getFocalNodes(),function(C){C.setAttribute("tabIndex",-1)
})
}else{(B.focusNode||B.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(B){this.domNode.setAttribute("tabIndex",-1);
if(B.target===this.domNode){this.focusFirstChild()
}else{var C=dijit.getEnclosingWidget(B.target);
if(C&&C.isFocusable()){this.focusedChild=C
}}},_onContainerBlur:function(B){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(B){if(B.ctrlKey||B.altKey){return 
}var C=this._keyNavCodes[B.keyCode];
if(C){C();
A.stopEvent(B)
}},_onChildBlur:function(B){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(E,B){if(E){E=this._getSiblingOfChild(E,B)
}var D=this.getChildren();
for(var C=0;
C<D.length;
C++){if(!E){E=D[(B>0)?0:(D.length-1)]
}if(E.isFocusable()){return E
}E=this._getSiblingOfChild(E,B)
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
}},resize:function(B){var C=this.domNode;
if(B){A.marginBox(C,B);
if(B.t){C.style.top=B.t+"px"
}if(B.l){C.style.left=B.l+"px"
}}var D=A.mixin(A.marginBox(C),B||{});
this._contentBox=dijit.layout.marginBox2contentBox(C,D);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(E,F){var C=A.getComputedStyle(E);
var D=A._getMarginExtents(E,C);
var B=A._getPadBorderExtents(E,C);
return{l:A._toPixelValue(E,C.paddingLeft),t:A._toPixelValue(E,C.paddingTop),w:F.w-(D.w+B.w),h:F.h-(D.h+B.h)}
};
(function(){var C=function(D){return D.substring(0,1).toUpperCase()+D.substring(1)
};
var B=function(D,E){D.resize?D.resize(E):A.marginBox(D.domNode,E);
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
A.addClass(I,"dijitAlign"+C(H));
if(H=="top"||H=="bottom"){B(J,{w:F.w});
F.h-=J.h;
if(H=="top"){F.t+=J.h
}else{G.top=F.t+F.h+"px"
}}else{if(H=="left"||H=="right"){B(J,{h:F.h});
F.w-=J.w;
if(H=="left"){F.l+=J.w
}else{G.left=F.l+F.w+"px"
}}else{if(H=="client"){B(J,F)
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
},_onMouse:function(D){var E=D.target;
if(E&&E.getAttribute){this.stateModifier=E.getAttribute("stateModifier")||""
}if(!this.disabled){switch(D.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var B=this;
var C=this.connect(A.body(),"onmouseup",function(){B._active=false;
B._setStateClass();
B.disconnect(C)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(A.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var C=[this.baseClass];
function B(D){C=C.concat(A.map(C,function(E){return E+D
}))
}if(this.checked){B("Checked")
}if(this.state){B(this.state)
}if(this.selected){B("Selected")
}if(this.disabled){B("Disabled")
}else{if(this._active){B(this.stateModifier+"Active")
}else{if(this._focused){B("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){B(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+C.join(" ")
},onChange:function(B){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(C,B){this._lastValue=C;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(B===undefined){B=true
}if(this._lastValueReported==undefined&&B===null){this._lastValueReported=C
}if((this.intermediateChanges||B)&&((C&&C.toString)?C.toString():C)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=C;
this.onChange(C)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(C){if(C.keyCode==A.keys.ESCAPE&&!C.shiftKey&&!C.ctrlKey&&!C.altKey){var B=this.getValue();
var D=this._lastValueReported;
if((typeof D!="undefined")&&((B!==null&&B.toString)?B.toString():null)!==D.toString()){this.undo();
A.stopEvent(C);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}if(!A._hasResource["dijit.dijit"]){A._hasResource["dijit.dijit"]=true;
A.provide("dijit.dijit")
}}});