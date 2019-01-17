dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"],["provide","dijit._base.manager"],["provide","dijit._base.place"],["provide","dijit._base.window"],["provide","dijit._base.popup"],["provide","dijit._base.scroll"],["provide","dijit._base.sniff"],["provide","dijit._base.bidi"],["provide","dijit._base.typematic"],["provide","dijit._base.wai"],["provide","dijit._base"],["provide","dojo.date.stamp"],["provide","dojo.parser"],["provide","dijit._Widget"],["provide","dojo.string"],["provide","dijit._Templated"],["provide","dijit._Container"],["provide","dijit.layout._LayoutWidget"],["provide","dijit.form._FormWidget"],["provide","dijit.dijit"]],defineResource:function(A){if(!A._hasResource["dijit._base.focus"]){A._hasResource["dijit._base.focus"]=true;
A.provide("dijit._base.focus");
A.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var D=A.global;
var C=A.doc;
if(C.selection){return !C.selection.createRange().text
}else{if(D.getSelection){var B=D.getSelection();
if(A.isString(B)){return !B
}else{return B.isCollapsed||!B.toString()
}}}},getBookmark:function(){var D,C=A.doc.selection;
if(C){var B=C.createRange();
if(C.type.toUpperCase()=="CONTROL"){D=B.length?A._toArray(B):null
}else{D=B.getBookmark()
}}else{if(A.global.getSelection){C=A.global.getSelection();
if(C){var B=C.getRangeAt(0);
D=B.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return D
},moveToBookmark:function(C){var B=A.doc;
if(B.selection){var E;
if(A.isArray(C)){E=B.body.createControlRange();
A.forEach(C,E.addElement)
}else{E=B.selection.createRange();
E.moveToBookmark(C)
}E.select()
}else{var D=A.global.getSelection&&A.global.getSelection();
if(D&&D.removeAllRanges){D.removeAllRanges();
D.addRange(C)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(C,B){return{node:C&&A.isDescendant(dijit._curFocus,C.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!A.withGlobal(B||A.global,dijit.isCollapsed)?A.withGlobal(B||A.global,dijit.getBookmark):null,openedForWindow:B}
},focus:function(B){if(!B){return 
}var G="node" in B?B.node:B,F=B.bookmark,E=B.openedForWindow;
if(G){var D=(G.tagName.toLowerCase()=="iframe")?G.contentWindow:G;
if(D&&D.focus){try{D.focus()
}catch(C){}}dijit._onFocusNode(G)
}if(F&&A.withGlobal(E||A.global,dijit.isCollapsed)){if(E){E.focus()
}try{A.withGlobal(E||A.global,moveToBookmark,null,[F])
}catch(C){}}},_activeStack:[],registerWin:function(C){if(!C){C=window
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
}},_setStack:function(F){var E=dijit._activeStack;
dijit._activeStack=F;
for(var D=0;
D<Math.min(E.length,F.length);
D++){if(E[D]!=F[D]){break
}}for(var B=E.length-1;
B>=D;
B--){var C=dijit.byId(E[B]);
if(C){A.publish("widgetBlur",[C]);
if(C._onBlur){C._onBlur()
}}}for(var B=D;
B<F.length;
B++){var C=dijit.byId(F[B]);
if(C){A.publish("widgetFocus",[C]);
if(C._onFocus){C._onFocus()
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
dijit.getViewport=function(){var E=A.global;
var C=A.doc;
var J=0,D=0;
if(A.isMozilla){var I,H,G,F;
if(C.body.clientWidth>C.documentElement.clientWidth){I=C.documentElement.clientWidth;
G=C.body.clientWidth
}else{G=C.documentElement.clientWidth;
I=C.body.clientWidth
}if(C.body.clientHeight>C.documentElement.clientHeight){H=C.documentElement.clientHeight;
F=C.body.clientHeight
}else{F=C.documentElement.clientHeight;
H=C.body.clientHeight
}J=(G>E.innerWidth)?I:G;
D=(F>E.innerHeight)?H:F
}else{if(!A.isOpera&&E.innerWidth){J=E.innerWidth;
D=E.innerHeight
}else{if(A.isIE&&C.documentElement&&C.documentElement.clientHeight){J=C.documentElement.clientWidth;
D=C.documentElement.clientHeight
}else{if(A.body().clientWidth){J=A.body().clientWidth;
D=A.body().clientHeight
}}}}var B=A._docScroll();
return{w:J,h:D,l:B.x,t:B.y}
};
dijit.placeOnScreen=function(E,F,D,C){var B=A.map(D,function(G){return{corner:G,pos:F}
});
return dijit._place(E,B)
};
dijit._place=function(G,E,D){var C=dijit.getViewport();
if(!G.parentNode||String(G.parentNode.tagName).toLowerCase()!="body"){A.body().appendChild(G)
}var J=null;
for(var S=0;
S<E.length;
S++){var I=E[S].corner;
var K=E[S].pos;
if(D){D(I)
}var H=G.style.display;
var F=G.style.visibility;
G.style.visibility="hidden";
G.style.display="";
var B=A.marginBox(G);
G.style.display=H;
G.style.visibility=F;
var R=(I.charAt(1)=="L"?K.x:Math.max(C.l,K.x-B.w)),Q=(I.charAt(0)=="T"?K.y:Math.max(C.t,K.y-B.h)),P=(I.charAt(1)=="L"?Math.min(C.l+C.w,R+B.w):K.x),O=(I.charAt(0)=="T"?Math.min(C.t+C.h,Q+B.h):K.y),N=P-R,M=O-Q,L=(B.w-N)+(B.h-M);
if(J==null||L<J.overflow){J={corner:I,aroundCorner:E[S].aroundCorner,x:R,y:Q,w:N,h:M,overflow:L}
}if(L==0){break
}}G.style.left=J.x+"px";
G.style.top=J.y+"px";
return J
};
dijit.placeOnScreenAroundElement=function(E,C,K,J){C=A.byId(C);
var I=C.style.display;
C.style.display="";
var H=C.offsetWidth;
var G=C.offsetHeight;
var F=A.coords(C,true);
C.style.display=I;
var D=[];
for(var B in K){D.push({aroundCorner:B,corner:K[B],pos:{x:F.x+(B.charAt(1)=="L"?0:H),y:F.y+(B.charAt(0)=="T"?0:G)}})
}return dijit._place(E,D,J)
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
dijit.popup=new function(){var D=[],C=1000,B=1;
this.open=function(N){var M=N.popup,L=N.orient||{BL:"TL",TL:"BL"},K=N.around,F=(N.around&&N.around.id)?(N.around.id+"_dropdown"):("popup_"+B++);
var I=A.doc.createElement("div");
I.id=F;
I.className="dijitPopup";
I.style.zIndex=C+D.length;
I.style.visibility="hidden";
if(N.parent){I.dijitPopupParent=N.parent.id
}A.body().appendChild(I);
M.domNode.style.display="";
I.appendChild(M.domNode);
var J=new dijit.BackgroundIframe(I);
var H=K?dijit.placeOnScreenAroundElement(I,K,L,M.orient?A.hitch(M,"orient"):null):dijit.placeOnScreen(I,N,L=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
I.style.visibility="visible";
var G=[];
function E(){for(var O=D.length-1;
O>0&&D[O].parent===D[O-1].widget;
O--){}return D[O]
}G.push(A.connect(I,"onkeypress",this,function(O){if(O.keyCode==A.keys.ESCAPE&&N.onCancel){N.onCancel()
}else{if(O.keyCode==A.keys.TAB){A.stopEvent(O);
var P=E();
if(P&&P.onCancel){P.onCancel()
}}}}));
if(M.onCancel){G.push(A.connect(M,"onCancel",null,N.onCancel))
}G.push(A.connect(M,M.onExecute?"onExecute":"onChange",null,function(){var O=E();
if(O&&O.onExecute){O.onExecute()
}}));
D.push({wrapper:I,iframe:J,widget:M,parent:N.parent,onExecute:N.onExecute,onCancel:N.onCancel,onClose:N.onClose,handlers:G});
if(M.onOpen){M.onOpen(H)
}return H
};
this.close=function(G){while(A.some(D,function(K){return K.widget==G
})){var J=D.pop(),I=J.wrapper,H=J.iframe,F=J.widget,E=J.onClose;
if(F.onClose){F.onClose()
}A.forEach(J.handlers,A.disconnect);
if(!F||!F.domNode){return 
}A.style(F.domNode,"display","none");
A.body().appendChild(F.domNode);
H.destroy();
A._destroyElement(I);
if(E){E()
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
dijit.scrollIntoView=function(E){if(A.isIE){if(A.marginBox(E.parentNode).h<=E.parentNode.scrollHeight){E.scrollIntoView(false)
}}else{if(A.isMozilla){E.scrollIntoView(false)
}else{var D=E.parentNode;
var C=D.scrollTop+A.marginBox(D).h;
var B=E.offsetTop+A.marginBox(E).h;
if(C<B){D.scrollTop+=(B-C)
}else{if(D.scrollTop>E.offsetTop){D.scrollTop-=(D.scrollTop-E.offsetTop)
}}}}}
}if(!A._hasResource["dijit._base.sniff"]){A._hasResource["dijit._base.sniff"]=true;
A.provide("dijit._base.sniff");
(function(){var H=A;
var G=H.isIE;
var E=H.isOpera;
var C=Math.floor;
var D={dj_ie:G,dj_ie6:C(G)==6,dj_ie7:C(G)==7,dj_iequirks:G&&H.isQuirks,dj_opera:E,dj_opera8:C(E)==8,dj_opera9:C(E)==9,dj_khtml:H.isKhtml,dj_safari:H.isSafari,dj_gecko:H.isMozilla};
for(var F in D){if(D[F]){var B=A.doc.documentElement;
if(B.className){B.className+=" "+F
}else{B.className=F
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
},trigger:function(C,E,D,B,F,H,G){if(F!=this._obj){this.stop();
this._initialDelay=G||500;
this._subsequentDelay=H||0.9;
this._obj=F;
this._evt=C;
this._node=D;
this._currentTimeout=-1;
this._count=-1;
this._callback=A.hitch(E,B);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(E,C,B,G,F,D){return[A.connect(E,"onkeypress",this,function(H){if(H.keyCode==C.keyCode&&(!C.charCode||C.charCode==H.charCode)&&(C.ctrlKey===undefined||C.ctrlKey==H.ctrlKey)&&(C.altKey===undefined||C.altKey==H.ctrlKey)&&(C.shiftKey===undefined||C.shiftKey==H.ctrlKey)){A.stopEvent(H);
dijit.typematic.trigger(C,B,E,G,C,F,D)
}else{if(dijit.typematic._obj==C){dijit.typematic.stop()
}}}),A.connect(E,"onkeyup",this,function(H){if(dijit.typematic._obj==C){dijit.typematic.stop()
}})]
},addMouseListener:function(E,G,F,D,C){var B=A.connect;
return[B(E,"mousedown",this,function(H){A.stopEvent(H);
dijit.typematic.trigger(H,G,E,F,E,D,C)
}),B(E,"mouseup",this,function(H){A.stopEvent(H);
dijit.typematic.stop()
}),B(E,"mouseout",this,function(H){A.stopEvent(H);
dijit.typematic.stop()
}),B(E,"mousemove",this,function(H){A.stopEvent(H)
}),B(E,"dblclick",this,function(H){A.stopEvent(H);
if(A.isIE){dijit.typematic.trigger(H,G,E,F,E,D,C);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(D,C,B,H,G,E,F){return this.addKeyListener(C,B,H,G,E,F).concat(this.addMouseListener(D,H,G,E,F))
}}
}if(!A._hasResource["dijit._base.wai"]){A._hasResource["dijit._base.wai"]=true;
A.provide("dijit._base.wai");
dijit.wai={onload:function(){var C=document.createElement("div");
C.id="a11yTestNode";
C.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+A.moduleUrl("dijit","form/templates/blank.gif")+'");';
A.body().appendChild(C);
function B(){var E=A.getComputedStyle(C);
if(E){var F=E.backgroundImage;
var D=(E.borderTopColor==E.borderRightColor)||(F!=null&&(F=="none"||F=="url(invalid-url:)"));
A[D?"addClass":"removeClass"](A.body(),"dijit_a11y")
}}B();
if(A.isIE){setInterval(B,4000)
}}};
if(A.isIE||A.isMoz){A._loaders.unshift(dijit.wai.onload)
}A.mixin(dijit,{hasWaiRole:function(B){if(B.hasAttribute){return B.hasAttribute("role")
}else{return B.getAttribute("role")?true:false
}},getWaiRole:function(D){var C=D.getAttribute("role");
if(C){var B=C.indexOf(":");
return B==-1?C:C.substring(B+1)
}else{return""
}},setWaiRole:function(B,C){if(A.isFF&&A.isFF<3){B.setAttribute("role","wairole:"+C)
}else{B.setAttribute("role",C)
}},removeWaiRole:function(B){B.removeAttribute("role")
},hasWaiState:function(C,B){if(A.isFF&&A.isFF<3){return C.hasAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{if(C.hasAttribute){return C.hasAttribute("aria-"+B)
}else{return C.getAttribute("aria-"+B)?true:false
}}},getWaiState:function(C,D){if(A.isFF&&A.isFF<3){return C.getAttributeNS("http://www.w3.org/2005/07/aaa",D)
}else{var B=C.getAttribute("aria-"+D);
return B?B:""
}},setWaiState:function(D,C,B){if(A.isFF&&A.isFF<3){D.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+C,B)
}else{D.setAttribute("aria-"+C,B)
}},removeWaiState:function(C,B){if(A.isFF&&A.isFF<3){C.removeAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{C.removeAttribute("aria-"+B)
}}})
}if(!A._hasResource["dijit._base"]){A._hasResource["dijit._base"]=true;
A.provide("dijit._base")
}if(!A._hasResource["dojo.date.stamp"]){A._hasResource["dojo.date.stamp"]=true;
A.provide("dojo.date.stamp");
A.date.stamp.fromISOString=function(G,F){if(!A.date.stamp._isoRegExp){A.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var E=A.date.stamp._isoRegExp.exec(G);
var C=null;
if(E){E.shift();
E[1]&&E[1]--;
E[6]&&(E[6]*=1000);
if(F){F=new Date(F);
A.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(H){return F["get"+H]()
}).forEach(function(I,H){if(E[H]===undefined){E[H]=I
}})
}C=new Date(E[0]||1970,E[1]||0,E[2]||0,E[3]||0,E[4]||0,E[5]||0,E[6]||0);
var D=0;
var B=E[7]&&E[7].charAt(0);
if(B!="Z"){D=((E[8]||0)*60)+(Number(E[9])||0);
if(B!="-"){D*=-1
}}if(B){D-=C.getTimezoneOffset()
}if(D){C.setTime(C.getTime()+D*60000)
}}return C
};
A.date.stamp.toISOString=function(J,I){var K=function(L){return(L<10)?"0"+L:L
};
I=I||{};
var H=[];
var G=I.zulu?"getUTC":"get";
var F="";
if(I.selector!="time"){F=[J[G+"FullYear"](),K(J[G+"Month"]()+1),K(J[G+"Date"]())].join("-")
}H.push(F);
if(I.selector!="date"){var E=[K(J[G+"Hours"]()),K(J[G+"Minutes"]()),K(J[G+"Seconds"]())].join(":");
var D=J[G+"Milliseconds"]();
if(I.milliseconds){E+="."+(D<100?"0":"")+K(D)
}if(I.zulu){E+="Z"
}else{if(I.selector!="time"){var C=J.getTimezoneOffset();
var B=Math.abs(C);
E+=(C>0?"-":"+")+K(Math.floor(B/60))+":"+K(B%60)
}}H.push(E)
}return H.join("T")
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
}function D(H,G){switch(G){case"string":return H;
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
}}var C={};
function E(L){if(!C[L]){var I=F.getObject(L);
if(!F.isFunction(I)){throw new Error("Could not load class '"+L+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var K=I.prototype;
var J={};
for(var H in K){if(H.charAt(0)=="_"){continue
}var G=K[H];
J[H]=B(G)
}C[L]={cls:I,params:J}
}return C[L]
}this._functionFromScript=function(K){var J="";
var H="";
var G=K.getAttribute("args");
if(G){F.forEach(G.split(/\s*,\s*/),function(M,L){J+="var "+M+" = arguments["+L+"]; "
})
}var I=K.getAttribute("with");
if(I&&I.length){F.forEach(I.split(/\s*,\s*/),function(L){J+="with("+L+"){";
H+="}"
})
}return new Function(J+K.innerHTML+H)
};
this.instantiate=function(H){var G=[];
F.forEach(H,function(N){if(!N){return 
}var M=N.getAttribute("dojoType");
if((!M)||(!M.length)){return 
}var K=E(M);
var X=K.cls;
var J=X._noScript||X.prototype._noScript;
var V={};
var T=N.attributes;
for(var S in K.params){var R=T.getNamedItem(S);
if(!R||(!R.specified&&(!A.isIE||S.toLowerCase()!="value"))){continue
}var Q=R.value;
switch(S){case"class":Q=N.className;
break;
case"style":Q=N.style&&N.style.cssText
}var O=K.params[S];
V[S]=D(Q,O)
}if(!J){var W=[],U=[];
F.query("> script[type^='dojo/']",N).orphan().forEach(function(b){var a=b.getAttribute("event"),Y=b.getAttribute("type"),Z=F.parser._functionFromScript(b);
if(a){if(Y=="dojo/connect"){W.push({event:a,func:Z})
}else{V[a]=Z
}}else{U.push(Z)
}})
}var P=X.markupFactory;
if(!P&&X.prototype){P=X.prototype.markupFactory
}var L=P?P(V,N,X):new X(V,N);
G.push(L);
var I=N.getAttribute("jsId");
if(I){F.setObject(I,L)
}if(!J){A.forEach(W,function(Y){A.connect(L,Y.event,null,Y.func)
});
A.forEach(U,function(Y){Y.call(L)
})
}});
F.forEach(G,function(I){if(I&&(I.startup)&&((!I.getParent)||(!I.getParent()))){I.startup()
}});
return G
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
A.parser._nameAnonFunc=function(F,B){var E="$joinpoint";
var D=(B||A.parser._anon);
if(A.isIE){var G=F.__dojoNameCache;
if(G&&D[G]===F){return F.__dojoNameCache
}}var C="__"+A.parser._anonCtr++;
while(typeof D[C]!="undefined"){C="__"+A.parser._anonCtr++
}D[C]=F;
return C
}
}if(!A._hasResource["dijit._Widget"]){A._hasResource["dijit._Widget"]=true;
A.provide("dijit._Widget");
A.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(B,C){this.create(B,C)
},create:function(F,E){this.srcNodeRef=A.byId(E);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(F){A.mixin(this,F)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var B in this.attributeMap){var D=this[this.attributeMap[B]||"domNode"];
var C=this[B];
if(typeof C!="object"&&(C!==""||(F&&F[B]))){switch(B){case"class":A.addClass(D,C);
break;
case"style":if(D.style.cssText){D.style.cssText+="; "+C
}else{D.style.cssText=C
}break;
default:D.setAttribute(B,C)
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
},nodesWithKeyClick:["input","button"],connect:function(D,B,F){var E=[];
if(B=="ondijitclick"){var C=this;
if(!this.nodesWithKeyClick[D.nodeName]){E.push(A.connect(D,"onkeydown",this,function(G){if(G.keyCode==A.keys.ENTER){return(A.isString(F))?C[F](G):F.call(C,G)
}else{if(G.keyCode==A.keys.SPACE){A.stopEvent(G)
}}}));
E.push(A.connect(D,"onkeyup",this,function(G){if(G.keyCode==A.keys.SPACE){return A.isString(F)?C[F](G):F.call(C,G)
}}))
}B="onclick"
}E.push(A.connect(D,B,this,F));
this._connects.push(E);
return E
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
A.string.substitute=function(D,E,C,B){return D.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(H,I,G){var F=A.getObject(I,false,E);
if(G){F=A.getObject(G,false,B)(F)
}if(C){F=C(F,I)
}return F.toString()
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
A.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var H=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var G;
if(A.isString(H)){var F=this.declaredClass,D=this;
var B=A.string.substitute(H,this,function(I,J){if(J.charAt(0)=="!"){I=D[J.substr(1)]
}if(typeof I=="undefined"){throw new Error(F+" template:"+J)
}if(!I){return""
}return J.charAt(0)=="!"?I:I.toString().replace(/"/g,"&quot;")
},this);
G=dijit._Templated._createNodesFromText(B)[0]
}else{G=H.cloneNode(true)
}this._attachTemplateNodes(G);
var E=this.srcNodeRef;
if(E&&E.parentNode){E.parentNode.replaceChild(G,E)
}this.domNode=G;
if(this.widgetsInTemplate){var C=A.parser.parse(G);
this._attachTemplateNodes(C,function(J,I){return J[I]
})
}this._fillContent(E)
},_fillContent:function(B){var C=this.containerNode;
if(B&&C){while(B.hasChildNodes()){C.appendChild(B.firstChild)
}}},_attachTemplateNodes:function(P,O){O=O||function(S,R){return S.getAttribute(R)
};
var L=A.isArray(P)?P:(P.all||P.getElementsByTagName("*"));
var Q=A.isArray(P)?0:-1;
for(;
Q<L.length;
Q++){var H=(Q==-1)?P:L[Q];
if(this.widgetsInTemplate&&O(H,"dojoType")){continue
}var G=O(H,"dojoAttachPoint");
if(G){var D,N=G.split(/\s*,\s*/);
while(D=N.shift()){if(A.isArray(this[D])){this[D].push(H)
}else{this[D]=H
}}}var M=O(H,"dojoAttachEvent");
if(M){var K,J=M.split(/\s*,\s*/);
var C=A.trim;
while(K=J.shift()){if(K){var F=null;
if(K.indexOf(":")!=-1){var E=K.split(":");
K=C(E[0]);
F=C(E[1])
}else{K=C(K)
}if(!F){F=K
}this.connect(H,K,F)
}}}var I=O(H,"waiRole");
if(I){dijit.setWaiRole(H,I)
}var B=O(H,"waiState");
if(B){A.forEach(B.split(/\s*,\s*/),function(R){if(R.indexOf("-")!=-1){var S=R.split("-");
dijit.setWaiState(H,S[0],S[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(C,G,F){var E=dijit._Templated._templateCache;
var D=G||C;
var B=E[D];
if(B){return B
}if(!G){G=dijit._Templated._sanitizeTemplateString(A._getText(C))
}G=A.string.trim(G);
if(G.match(/\$\{([^\}]+)\}/g)||F){return(E[D]=G)
}else{return(E[D]=dijit._Templated._createNodesFromText(G)[0])
}};
dijit._Templated._sanitizeTemplateString=function(C){if(C){C=C.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var B=C.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(B){C=B[1]
}}else{C=""
}return C
};
if(A.isIE){A.addOnUnload(function(){var D=dijit._Templated._templateCache;
for(var B in D){var C=D[B];
if(!isNaN(C.nodeType)){A._destroyElement(C)
}delete D[B]
}})
}(function(){var C={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var B;
dijit._Templated._createNodesFromText=function(J){if(!B){B=A.doc.createElement("div");
B.style.display="none";
A.body().appendChild(B)
}var F="none";
var E=J.replace(/^\s+/,"");
for(var G in C){var H=C[G];
if(H.re.test(E)){F=G;
J=H.pre+J+H.post;
break
}}B.innerHTML=J;
if(B.normalize){B.normalize()
}var D={cell:"tr",row:"tbody",section:"table"}[F];
var K=(typeof D!="undefined")?B.getElementsByTagName(D)[0]:B;
var I=[];
while(K.firstChild){I.push(K.removeChild(K.firstChild))
}B.innerHTML="";
return I
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
},_getSibling:function(D){var B=this.domNode;
do{B=B[D+"Sibling"]
}while(B&&B.nodeType!=1);
if(!B){return null
}var C=B.getAttribute("widgetId");
return dijit.byId(C)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
A.declare("dijit._Container",null,{isContainer:true,addChild:function(E,D){if(D===undefined){D="last"
}var C=this.containerNode||this.domNode;
if(D&&typeof D=="number"){var B=A.query("> [widgetid]",C);
if(B&&B.length>=D){C=B[D-1];
D="after"
}}A.place(E.domNode,C,D);
if(this._started&&!E._started){E.startup()
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
},_getSiblingOfChild:function(B,D){var E=B.domNode;
var C=(D>0?"nextSibling":"previousSibling");
do{E=E[C]
}while(E&&(E.nodeType!=1||!dijit.byNode(E)));
return E?dijit.byNode(E):null
}});
A.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(C,B){var F=this._keyNavCodes={};
var E=A.hitch(this,this.focusPrev);
var D=A.hitch(this,this.focusNext);
A.forEach(C,function(G){F[G]=E
});
A.forEach(B,function(G){F[G]=D
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
}},focusChild:function(B,C){if(B){if(this.focusedChild&&B!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=B;
if(C&&B.focusFocalNode){B.focusFocalNode(C)
}else{B.focus()
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
A.addClass(J,"dijitAlign"+C(I));
if(I=="top"||I=="bottom"){B(G,{w:E.w});
E.h-=G.h;
if(I=="top"){E.t+=G.h
}else{H.top=E.t+E.h+"px"
}}else{if(I=="left"||I=="right"){B(G,{h:E.h});
E.w-=G.w;
if(I=="left"){E.l+=G.w
}else{H.left=E.l+E.w+"px"
}}else{if(I=="client"){B(G,E)
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
},setValue:function(B,C){this._lastValue=B;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(C===undefined){C=true
}if(this._lastValueReported==undefined&&C===null){this._lastValueReported=B
}if((this.intermediateChanges||C)&&((B&&B.toString)?B.toString():B)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=B;
this.onChange(B)
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