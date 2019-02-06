dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"],["provide","dijit._base.manager"],["provide","dijit._base.place"],["provide","dijit._base.window"],["provide","dijit._base.popup"],["provide","dijit._base.scroll"],["provide","dijit._base.sniff"],["provide","dijit._base.bidi"],["provide","dijit._base.typematic"],["provide","dijit._base.wai"],["provide","dijit._base"],["provide","dojo.date.stamp"],["provide","dojo.parser"],["provide","dijit._Widget"],["provide","dojo.string"],["provide","dijit._Templated"],["provide","dijit._Container"],["provide","dijit.layout._LayoutWidget"],["provide","dijit.form._FormWidget"],["provide","dijit.dijit"]],defineResource:function(A){if(!A._hasResource["dijit._base.focus"]){A._hasResource["dijit._base.focus"]=true;
A.provide("dijit._base.focus");
A.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var B=A.global;
var D=A.doc;
if(D.selection){return !D.selection.createRange().text
}else{if(B.getSelection){var C=B.getSelection();
if(A.isString(C)){return !C
}else{return C.isCollapsed||!C.toString()
}}}},getBookmark:function(){var B,D=A.doc.selection;
if(D){var C=D.createRange();
if(D.type.toUpperCase()=="CONTROL"){B=C.length?A._toArray(C):null
}else{B=C.getBookmark()
}}else{if(A.global.getSelection){D=A.global.getSelection();
if(D){var C=D.getRangeAt(0);
B=C.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return B
},moveToBookmark:function(D){var C=A.doc;
if(C.selection){var B;
if(A.isArray(D)){B=C.body.createControlRange();
A.forEach(D,B.addElement)
}else{B=C.selection.createRange();
B.moveToBookmark(D)
}B.select()
}else{var E=A.global.getSelection&&A.global.getSelection();
if(E&&E.removeAllRanges){E.removeAllRanges();
E.addRange(D)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(B,C){return{node:B&&A.isDescendant(dijit._curFocus,B.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!A.withGlobal(C||A.global,dijit.isCollapsed)?A.withGlobal(C||A.global,dijit.getBookmark):null,openedForWindow:C}
},focus:function(C){if(!C){return 
}var B="node" in C?C.node:C,G=C.bookmark,F=C.openedForWindow;
if(B){var E=(B.tagName.toLowerCase()=="iframe")?B.contentWindow:B;
if(E&&E.focus){try{E.focus()
}catch(D){}}dijit._onFocusNode(B)
}if(G&&A.withGlobal(F||A.global,dijit.isCollapsed)){if(F){F.focus()
}try{A.withGlobal(F||A.global,moveToBookmark,null,[G])
}catch(D){}}},_activeStack:[],registerWin:function(B){if(!B){B=window
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
}},_setStack:function(B){var F=dijit._activeStack;
dijit._activeStack=B;
for(var E=0;
E<Math.min(F.length,B.length);
E++){if(F[E]!=B[E]){break
}}for(var C=F.length-1;
C>=E;
C--){var D=dijit.byId(F[C]);
if(D){A.publish("widgetBlur",[D]);
if(D._onBlur){D._onBlur()
}}}for(var C=E;
C<B.length;
C++){var D=dijit.byId(B[C]);
if(D){A.publish("widgetFocus",[D]);
if(D._onFocus){D._onFocus()
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
dijit.getViewport=function(){var C=A.global;
var J=A.doc;
var H=0,B=0;
if(A.isMozilla){var G,F,E,D;
if(J.body.clientWidth>J.documentElement.clientWidth){G=J.documentElement.clientWidth;
E=J.body.clientWidth
}else{E=J.documentElement.clientWidth;
G=J.body.clientWidth
}if(J.body.clientHeight>J.documentElement.clientHeight){F=J.documentElement.clientHeight;
D=J.body.clientHeight
}else{D=J.documentElement.clientHeight;
F=J.body.clientHeight
}H=(E>C.innerWidth)?G:E;
B=(D>C.innerHeight)?F:D
}else{if(!A.isOpera&&C.innerWidth){H=C.innerWidth;
B=C.innerHeight
}else{if(A.isIE&&J.documentElement&&J.documentElement.clientHeight){H=J.documentElement.clientWidth;
B=J.documentElement.clientHeight
}else{if(A.body().clientWidth){H=A.body().clientWidth;
B=A.body().clientHeight
}}}}var I=A._docScroll();
return{w:H,h:B,l:I.x,t:I.y}
};
dijit.placeOnScreen=function(F,B,E,D){var C=A.map(E,function(G){return{corner:G,pos:B}
});
return dijit._place(F,C)
};
dijit._place=function(O,M,L){var K=dijit.getViewport();
if(!O.parentNode||String(O.parentNode.tagName).toLowerCase()!="body"){A.body().appendChild(O)
}var R=null;
for(var I=0;
I<M.length;
I++){var Q=M[I].corner;
var S=M[I].pos;
if(L){L(Q)
}var P=O.style.display;
var N=O.style.visibility;
O.style.visibility="hidden";
O.style.display="";
var J=A.marginBox(O);
O.style.display=P;
O.style.visibility=N;
var H=(Q.charAt(1)=="L"?S.x:Math.max(K.l,S.x-J.w)),G=(Q.charAt(0)=="T"?S.y:Math.max(K.t,S.y-J.h)),F=(Q.charAt(1)=="L"?Math.min(K.l+K.w,H+J.w):S.x),E=(Q.charAt(0)=="T"?Math.min(K.t+K.h,G+J.h):S.y),D=F-H,C=E-G,B=(J.w-D)+(J.h-C);
if(R==null||B<R.overflow){R={corner:Q,aroundCorner:M[I].aroundCorner,x:H,y:G,w:D,h:C,overflow:B}
}if(B==0){break
}}O.style.left=R.x+"px";
O.style.top=R.y+"px";
return R
};
dijit.placeOnScreenAroundElement=function(C,K,I,H){K=A.byId(K);
var G=K.style.display;
K.style.display="";
var F=K.offsetWidth;
var E=K.offsetHeight;
var D=A.coords(K,true);
K.style.display=G;
var B=[];
for(var J in I){B.push({aroundCorner:J,corner:I[J],pos:{x:D.x+(J.charAt(1)=="L"?0:F),y:D.y+(J.charAt(0)=="T"?0:E)}})
}return dijit._place(C,B,H)
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
dijit.popup=new function(){var B=[],D=1000,C=1;
this.open=function(F){var E=F.popup,N=F.orient||{BL:"TL",TL:"BL"},M=F.around,H=(F.around&&F.around.id)?(F.around.id+"_dropdown"):("popup_"+C++);
var K=A.doc.createElement("div");
K.id=H;
K.className="dijitPopup";
K.style.zIndex=D+B.length;
K.style.visibility="hidden";
if(F.parent){K.dijitPopupParent=F.parent.id
}A.body().appendChild(K);
E.domNode.style.display="";
K.appendChild(E.domNode);
var L=new dijit.BackgroundIframe(K);
var J=M?dijit.placeOnScreenAroundElement(K,M,N,E.orient?A.hitch(E,"orient"):null):dijit.placeOnScreen(K,F,N=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
K.style.visibility="visible";
var I=[];
function G(){for(var O=B.length-1;
O>0&&B[O].parent===B[O-1].widget;
O--){}return B[O]
}I.push(A.connect(K,"onkeypress",this,function(O){if(O.keyCode==A.keys.ESCAPE&&F.onCancel){F.onCancel()
}else{if(O.keyCode==A.keys.TAB){A.stopEvent(O);
var P=G();
if(P&&P.onCancel){P.onCancel()
}}}}));
if(E.onCancel){I.push(A.connect(E,"onCancel",null,F.onCancel))
}I.push(A.connect(E,E.onExecute?"onExecute":"onChange",null,function(){var O=G();
if(O&&O.onExecute){O.onExecute()
}}));
B.push({wrapper:K,iframe:L,widget:E,parent:F.parent,onExecute:F.onExecute,onCancel:F.onCancel,onClose:F.onClose,handlers:I});
if(E.onOpen){E.onOpen(J)
}return J
};
this.close=function(E){while(A.some(B,function(K){return K.widget==E
})){var I=B.pop(),G=I.wrapper,F=I.iframe,J=I.widget,H=I.onClose;
if(J.onClose){J.onClose()
}A.forEach(I.handlers,A.disconnect);
if(!J||!J.domNode){return 
}A.style(J.domNode,"display","none");
A.body().appendChild(J.domNode);
F.destroy();
A._destroyElement(G);
if(H){H()
}}}
}();
dijit._frames=new function(){var B=[];
this.pop=function(){var C;
if(B.length){C=B.pop();
C.style.display=""
}else{if(A.isIE){var D="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
C=A.doc.createElement(D)
}else{var C=A.doc.createElement("iframe");
C.src='javascript:""';
C.className="dijitBackgroundIframe"
}C.tabIndex=-1;
A.body().appendChild(C)
}return C
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
dijit.scrollIntoView=function(B){if(A.isIE){if(A.marginBox(B.parentNode).h<=B.parentNode.scrollHeight){B.scrollIntoView(false)
}}else{if(A.isMozilla){B.scrollIntoView(false)
}else{var E=B.parentNode;
var D=E.scrollTop+A.marginBox(E).h;
var C=B.offsetTop+A.marginBox(B).h;
if(D<C){E.scrollTop+=(C-D)
}else{if(E.scrollTop>B.offsetTop){E.scrollTop-=(E.scrollTop-B.offsetTop)
}}}}}
}if(!A._hasResource["dijit._base.sniff"]){A._hasResource["dijit._base.sniff"]=true;
A.provide("dijit._base.sniff");
(function(){var C=A;
var F=C.isIE;
var D=C.isOpera;
var H=Math.floor;
var B={dj_ie:F,dj_ie6:H(F)==6,dj_ie7:H(F)==7,dj_iequirks:F&&C.isQuirks,dj_opera:D,dj_opera8:H(D)==8,dj_opera9:H(D)==9,dj_khtml:C.isKhtml,dj_safari:C.isSafari,dj_gecko:C.isMozilla};
for(var E in B){if(B[E]){var G=A.doc.documentElement;
if(G.className){G.className+=" "+E
}else{G.className=E
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
},trigger:function(H,D,C,G,E,B,F){if(E!=this._obj){this.stop();
this._initialDelay=F||500;
this._subsequentDelay=B||0.9;
this._obj=E;
this._evt=H;
this._node=C;
this._currentTimeout=-1;
this._count=-1;
this._callback=A.hitch(D,G);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(F,D,C,B,G,E){return[A.connect(F,"onkeypress",this,function(H){if(H.keyCode==D.keyCode&&(!D.charCode||D.charCode==H.charCode)&&(D.ctrlKey===undefined||D.ctrlKey==H.ctrlKey)&&(D.altKey===undefined||D.altKey==H.ctrlKey)&&(D.shiftKey===undefined||D.shiftKey==H.ctrlKey)){A.stopEvent(H);
dijit.typematic.trigger(D,C,F,B,D,G,E)
}else{if(dijit.typematic._obj==D){dijit.typematic.stop()
}}}),A.connect(F,"onkeyup",this,function(H){if(dijit.typematic._obj==D){dijit.typematic.stop()
}})]
},addMouseListener:function(F,C,G,E,D){var B=A.connect;
return[B(F,"mousedown",this,function(H){A.stopEvent(H);
dijit.typematic.trigger(H,C,F,G,F,E,D)
}),B(F,"mouseup",this,function(H){A.stopEvent(H);
dijit.typematic.stop()
}),B(F,"mouseout",this,function(H){A.stopEvent(H);
dijit.typematic.stop()
}),B(F,"mousemove",this,function(H){A.stopEvent(H)
}),B(F,"dblclick",this,function(H){A.stopEvent(H);
if(A.isIE){dijit.typematic.trigger(H,C,F,G,F,E,D);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(C,H,G,B,F,D,E){return this.addKeyListener(H,G,B,F,D,E).concat(this.addMouseListener(C,B,F,D,E))
}}
}if(!A._hasResource["dijit._base.wai"]){A._hasResource["dijit._base.wai"]=true;
A.provide("dijit._base.wai");
dijit.wai={onload:function(){var B=document.createElement("div");
B.id="a11yTestNode";
B.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+A.moduleUrl("dijit","form/templates/blank.gif")+'");';
A.body().appendChild(B);
function C(){var E=A.getComputedStyle(B);
if(E){var F=E.backgroundImage;
var D=(E.borderTopColor==E.borderRightColor)||(F!=null&&(F=="none"||F=="url(invalid-url:)"));
A[D?"addClass":"removeClass"](A.body(),"dijit_a11y")
}}C();
if(A.isIE){setInterval(C,4000)
}}};
if(A.isIE||A.isMoz){A._loaders.unshift(dijit.wai.onload)
}A.mixin(dijit,{hasWaiRole:function(B){if(B.hasAttribute){return B.hasAttribute("role")
}else{return B.getAttribute("role")?true:false
}},getWaiRole:function(B){var D=B.getAttribute("role");
if(D){var C=D.indexOf(":");
return C==-1?D:D.substring(C+1)
}else{return""
}},setWaiRole:function(C,B){if(A.isFF&&A.isFF<3){C.setAttribute("role","wairole:"+B)
}else{C.setAttribute("role",B)
}},removeWaiRole:function(B){B.removeAttribute("role")
},hasWaiState:function(B,C){if(A.isFF&&A.isFF<3){return B.hasAttributeNS("http://www.w3.org/2005/07/aaa",C)
}else{if(B.hasAttribute){return B.hasAttribute("aria-"+C)
}else{return B.getAttribute("aria-"+C)?true:false
}}},getWaiState:function(D,B){if(A.isFF&&A.isFF<3){return D.getAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{var C=D.getAttribute("aria-"+B);
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
A.date.stamp.fromISOString=function(C,G){if(!A.date.stamp._isoRegExp){A.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var F=A.date.stamp._isoRegExp.exec(C);
var D=null;
if(F){F.shift();
F[1]&&F[1]--;
F[6]&&(F[6]*=1000);
if(G){G=new Date(G);
A.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(H){return G["get"+H]()
}).forEach(function(I,H){if(F[H]===undefined){F[H]=I
}})
}D=new Date(F[0]||1970,F[1]||0,F[2]||0,F[3]||0,F[4]||0,F[5]||0,F[6]||0);
var E=0;
var B=F[7]&&F[7].charAt(0);
if(B!="Z"){E=((F[8]||0)*60)+(Number(F[9])||0);
if(B!="-"){E*=-1
}}if(B){E-=D.getTimezoneOffset()
}if(E){D.setTime(D.getTime()+E*60000)
}}return D
};
A.date.stamp.toISOString=function(H,G){var I=function(L){return(L<10)?"0"+L:L
};
G=G||{};
var F=[];
var E=G.zulu?"getUTC":"get";
var D="";
if(G.selector!="time"){D=[H[E+"FullYear"](),I(H[E+"Month"]()+1),I(H[E+"Date"]())].join("-")
}F.push(D);
if(G.selector!="date"){var C=[I(H[E+"Hours"]()),I(H[E+"Minutes"]()),I(H[E+"Seconds"]())].join(":");
var B=H[E+"Milliseconds"]();
if(G.milliseconds){C+="."+(B<100?"0":"")+I(B)
}if(G.zulu){C+="Z"
}else{if(G.selector!="time"){var K=H.getTimezoneOffset();
var J=Math.abs(K);
C+=(K>0?"-":"+")+I(Math.floor(J/60))+":"+I(J%60)
}}F.push(C)
}return F.join("T")
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
}function E(H,G){switch(G){case"string":return H;
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
}}var D={};
function F(K){if(!D[K]){var G=B.getObject(K);
if(!B.isFunction(G)){throw new Error("Could not load class '"+K+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var I=G.prototype;
var H={};
for(var L in I){if(L.charAt(0)=="_"){continue
}var J=I[L];
H[L]=C(J)
}D[K]={cls:G,params:H}
}return D[K]
}this._functionFromScript=function(K){var J="";
var H="";
var G=K.getAttribute("args");
if(G){B.forEach(G.split(/\s*,\s*/),function(M,L){J+="var "+M+" = arguments["+L+"]; "
})
}var I=K.getAttribute("with");
if(I&&I.length){B.forEach(I.split(/\s*,\s*/),function(L){J+="with("+L+"){";
H+="}"
})
}return new Function(J+K.innerHTML+H)
};
this.instantiate=function(H){var G=[];
B.forEach(H,function(P){if(!P){return 
}var O=P.getAttribute("dojoType");
if((!O)||(!O.length)){return 
}var M=F(O);
var X=M.cls;
var L=X._noScript||X.prototype._noScript;
var J={};
var V=P.attributes;
for(var U in M.params){var T=V.getNamedItem(U);
if(!T||(!T.specified&&(!A.isIE||U.toLowerCase()!="value"))){continue
}var S=T.value;
switch(U){case"class":S=P.className;
break;
case"style":S=P.style&&P.style.cssText
}var Q=M.params[U];
J[U]=E(S,Q)
}if(!L){var W=[],I=[];
B.query("> script[type^='dojo/']",P).orphan().forEach(function(Z){var Y=Z.getAttribute("event"),a=Z.getAttribute("type"),b=B.parser._functionFromScript(Z);
if(Y){if(a=="dojo/connect"){W.push({event:Y,func:b})
}else{J[Y]=b
}}else{I.push(b)
}})
}var R=X.markupFactory;
if(!R&&X.prototype){R=X.prototype.markupFactory
}var N=R?R(J,P,X):new X(J,P);
G.push(N);
var K=P.getAttribute("jsId");
if(K){B.setObject(K,N)
}if(!L){A.forEach(W,function(Y){A.connect(N,Y.event,null,Y.func)
});
A.forEach(I,function(Y){Y.call(N)
})
}});
B.forEach(G,function(I){if(I&&(I.startup)&&((!I.getParent)||(!I.getParent()))){I.startup()
}});
return G
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
A.parser._nameAnonFunc=function(G,C){var F="$joinpoint";
var E=(C||A.parser._anon);
if(A.isIE){var B=G.__dojoNameCache;
if(B&&E[B]===G){return G.__dojoNameCache
}}var D="__"+A.parser._anonCtr++;
while(typeof E[D]!="undefined"){D="__"+A.parser._anonCtr++
}E[D]=G;
return D
}
}if(!A._hasResource["dijit._Widget"]){A._hasResource["dijit._Widget"]=true;
A.provide("dijit._Widget");
A.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(C,B){this.create(C,B)
},create:function(B,F){this.srcNodeRef=A.byId(F);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(B){A.mixin(this,B)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var C in this.attributeMap){var E=this[this.attributeMap[C]||"domNode"];
var D=this[C];
if(typeof D!="object"&&(D!==""||(B&&B[C]))){switch(C){case"class":A.addClass(E,D);
break;
case"style":if(E.style.cssText){E.style.cssText+="; "+D
}else{E.style.cssText=D
}break;
default:E.setAttribute(C,D)
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
},nodesWithKeyClick:["input","button"],connect:function(E,C,B){var F=[];
if(C=="ondijitclick"){var D=this;
if(!this.nodesWithKeyClick[E.nodeName]){F.push(A.connect(E,"onkeydown",this,function(G){if(G.keyCode==A.keys.ENTER){return(A.isString(B))?D[B](G):B.call(D,G)
}else{if(G.keyCode==A.keys.SPACE){A.stopEvent(G)
}}}));
F.push(A.connect(E,"onkeyup",this,function(G){if(G.keyCode==A.keys.SPACE){return A.isString(B)?D[B](G):B.call(D,G)
}}))
}C="onclick"
}F.push(A.connect(E,C,this,B));
this._connects.push(F);
return F
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
A.string.substitute=function(E,B,D,C){return E.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(H,I,G){var F=A.getObject(I,false,B);
if(G){F=A.getObject(G,false,C)(F)
}if(D){F=D(F,I)
}return F.toString()
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
A.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var C=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var F;
if(A.isString(C)){var E=this.declaredClass,B=this;
var G=A.string.substitute(C,this,function(I,J){if(J.charAt(0)=="!"){I=B[J.substr(1)]
}if(typeof I=="undefined"){throw new Error(E+" template:"+J)
}if(!I){return""
}return J.charAt(0)=="!"?I:I.toString().replace(/"/g,"&quot;")
},this);
F=dijit._Templated._createNodesFromText(G)[0]
}else{F=C.cloneNode(true)
}this._attachTemplateNodes(F);
var D=this.srcNodeRef;
if(D&&D.parentNode){D.parentNode.replaceChild(F,D)
}this.domNode=F;
if(this.widgetsInTemplate){var H=A.parser.parse(F);
this._attachTemplateNodes(H,function(J,I){return J[I]
})
}this._fillContent(D)
},_fillContent:function(C){var B=this.containerNode;
if(C&&B){while(C.hasChildNodes()){B.appendChild(C.firstChild)
}}},_attachTemplateNodes:function(H,G){G=G||function(S,R){return S.getAttribute(R)
};
var C=A.isArray(H)?H:(H.all||H.getElementsByTagName("*"));
var I=A.isArray(H)?0:-1;
for(;
I<C.length;
I++){var O=(I==-1)?H:C[I];
if(this.widgetsInTemplate&&G(O,"dojoType")){continue
}var N=G(O,"dojoAttachPoint");
if(N){var E,F=N.split(/\s*,\s*/);
while(E=F.shift()){if(A.isArray(this[E])){this[E].push(O)
}else{this[E]=O
}}}var D=G(O,"dojoAttachEvent");
if(D){var B,Q=D.split(/\s*,\s*/);
var K=A.trim;
while(B=Q.shift()){if(B){var M=null;
if(B.indexOf(":")!=-1){var L=B.split(":");
B=K(L[0]);
M=K(L[1])
}else{B=K(B)
}if(!M){M=B
}this.connect(O,B,M)
}}}var P=G(O,"waiRole");
if(P){dijit.setWaiRole(O,P)
}var J=G(O,"waiState");
if(J){A.forEach(J.split(/\s*,\s*/),function(R){if(R.indexOf("-")!=-1){var S=R.split("-");
dijit.setWaiState(O,S[0],S[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(D,C,G){var F=dijit._Templated._templateCache;
var E=C||D;
var B=F[E];
if(B){return B
}if(!C){C=dijit._Templated._sanitizeTemplateString(A._getText(D))
}C=A.string.trim(C);
if(C.match(/\$\{([^\}]+)\}/g)||G){return(F[E]=C)
}else{return(F[E]=dijit._Templated._createNodesFromText(C)[0])
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
}(function(){var B={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var C;
dijit._Templated._createNodesFromText=function(D){if(!C){C=A.doc.createElement("div");
C.style.display="none";
A.body().appendChild(C)
}var G="none";
var F=D.replace(/^\s+/,"");
for(var H in B){var J=B[H];
if(J.re.test(F)){G=H;
D=J.pre+D+J.post;
break
}}C.innerHTML=D;
if(C.normalize){C.normalize()
}var E={cell:"tr",row:"tbody",section:"table"}[G];
var I=(typeof E!="undefined")?C.getElementsByTagName(E)[0]:C;
var K=[];
while(I.firstChild){K.push(I.removeChild(I.firstChild))
}C.innerHTML="";
return K
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
},_getSibling:function(B){var C=this.domNode;
do{C=C[B+"Sibling"]
}while(C&&C.nodeType!=1);
if(!C){return null
}var D=C.getAttribute("widgetId");
return dijit.byId(D)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
A.declare("dijit._Container",null,{isContainer:true,addChild:function(B,E){if(E===undefined){E="last"
}var D=this.containerNode||this.domNode;
if(E&&typeof E=="number"){var C=A.query("> [widgetid]",D);
if(C&&C.length>=E){D=C[E-1];
E="after"
}}A.place(B.domNode,D,E);
if(this._started&&!B._started){B.startup()
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
},_getSiblingOfChild:function(C,E){var B=C.domNode;
var D=(E>0?"nextSibling":"previousSibling");
do{B=B[D]
}while(B&&(B.nodeType!=1||!dijit.byNode(B)));
return B?dijit.byNode(B):null
}});
A.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(D,C){var B=this._keyNavCodes={};
var F=A.hitch(this,this.focusPrev);
var E=A.hitch(this,this.focusNext);
A.forEach(D,function(G){B[G]=F
});
A.forEach(C,function(G){B[G]=E
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
}},focusChild:function(C,B){if(C){if(this.focusedChild&&C!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=C;
if(B&&C.focusFocalNode){C.focusFocalNode(B)
}else{C.focus()
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
dijit.layout.layoutChildren=function(D,E,F){E=A.mixin({},E);
A.addClass(D,"dijitLayoutContainer");
F=A.filter(F,function(G){return G.layoutAlign!="client"
}).concat(A.filter(F,function(G){return G.layoutAlign=="client"
}));
A.forEach(F,function(G){var J=G.domNode,I=G.layoutAlign;
var H=J.style;
H.left=E.l+"px";
H.top=E.t+"px";
H.bottom=H.right="auto";
A.addClass(J,"dijitAlign"+B(I));
if(I=="top"||I=="bottom"){C(G,{w:E.w});
E.h-=G.h;
if(I=="top"){E.t+=G.h
}else{H.top=E.t+E.h+"px"
}}else{if(I=="left"||I=="right"){C(G,{h:E.h});
E.w-=G.w;
if(I=="left"){E.l+=G.w
}else{H.left=E.l+E.w+"px"
}}else{if(I=="client"){C(G,E)
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
},setValue:function(C,B){this._lastValue=C;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(B===undefined){B=true
}if(this._lastValueReported==undefined&&B===null){this._lastValueReported=C
}if((this.intermediateChanges||B)&&((C&&C.toString)?C.toString():C)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=C;
this.onChange(C)
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