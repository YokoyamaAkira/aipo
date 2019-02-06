if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var B=dojo.global;
var A=dojo.doc;
if(A.selection){return !A.selection.createRange().text
}else{if(B.getSelection){var C=B.getSelection();
if(dojo.isString(C)){return !C
}else{return C.isCollapsed||!C.toString()
}}}},getBookmark:function(){var B,A=dojo.doc.selection;
if(A){var C=A.createRange();
if(A.type.toUpperCase()=="CONTROL"){B=C.length?dojo._toArray(C):null
}else{B=C.getBookmark()
}}else{if(dojo.global.getSelection){A=dojo.global.getSelection();
if(A){var C=A.getRangeAt(0);
B=C.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return B
},moveToBookmark:function(B){var A=dojo.doc;
if(A.selection){var D;
if(dojo.isArray(B)){D=A.body.createControlRange();
dojo.forEach(B,D.addElement)
}else{D=A.selection.createRange();
D.moveToBookmark(B)
}D.select()
}else{var C=dojo.global.getSelection&&dojo.global.getSelection();
if(C&&C.removeAllRanges){C.removeAllRanges();
C.addRange(B)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(A,B){return{node:A&&dojo.isDescendant(dijit._curFocus,A.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(B||dojo.global,dijit.isCollapsed)?dojo.withGlobal(B||dojo.global,dijit.getBookmark):null,openedForWindow:B}
},focus:function(A){if(!A){return 
}var F="node" in A?A.node:A,E=A.bookmark,D=A.openedForWindow;
if(F){var C=(F.tagName.toLowerCase()=="iframe")?F.contentWindow:F;
if(C&&C.focus){try{C.focus()
}catch(B){}}dijit._onFocusNode(F)
}if(E&&dojo.withGlobal(D||dojo.global,dijit.isCollapsed)){if(D){D.focus()
}try{dojo.withGlobal(D||dojo.global,moveToBookmark,null,[E])
}catch(B){}}},_activeStack:[],registerWin:function(A){if(!A){A=window
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
},_onFocusNode:function(B){if(B&&B.tagName&&B.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(B);
if(B==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=B;
dojo.publish("focusNode",[B]);
var A=dijit.getEnclosingWidget(B);
if(A&&A._setStateClass){A._focused=true;
A._setStateClass()
}},_setStack:function(E){var D=dijit._activeStack;
dijit._activeStack=E;
for(var C=0;
C<Math.min(D.length,E.length);
C++){if(D[C]!=E[C]){break
}}for(var A=D.length-1;
A>=C;
A--){var B=dijit.byId(D[A]);
if(B){dojo.publish("widgetBlur",[B]);
if(B._onBlur){B._onBlur()
}}}for(var A=C;
A<E.length;
A++){var B=dijit.byId(E[A]);
if(B){dojo.publish("widgetFocus",[B]);
if(B._onFocus){B._onFocus()
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
dijit.getViewport=function(){var I=dojo.global;
var H=dojo.doc;
var E=0,F=0;
if(dojo.isMozilla){var D,C,B,A;
if(H.body.clientWidth>H.documentElement.clientWidth){D=H.documentElement.clientWidth;
B=H.body.clientWidth
}else{B=H.documentElement.clientWidth;
D=H.body.clientWidth
}if(H.body.clientHeight>H.documentElement.clientHeight){C=H.documentElement.clientHeight;
A=H.body.clientHeight
}else{A=H.documentElement.clientHeight;
C=H.body.clientHeight
}E=(B>I.innerWidth)?D:B;
F=(A>I.innerHeight)?C:A
}else{if(!dojo.isOpera&&I.innerWidth){E=I.innerWidth;
F=I.innerHeight
}else{if(dojo.isIE&&H.documentElement&&H.documentElement.clientHeight){E=H.documentElement.clientWidth;
F=H.documentElement.clientHeight
}else{if(dojo.body().clientWidth){E=dojo.body().clientWidth;
F=dojo.body().clientHeight
}}}}var G=dojo._docScroll();
return{w:E,h:F,l:G.x,t:G.y}
};
dijit.placeOnScreen=function(C,D,B,A){var E=dojo.map(B,function(F){return{corner:F,pos:D}
});
return dijit._place(C,E)
};
dijit._place=function(O,M,L){var K=dijit.getViewport();
if(!O.parentNode||String(O.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(O)
}var J=null;
for(var H=0;
H<M.length;
H++){var Q=M[H].corner;
var R=M[H].pos;
if(L){L(Q)
}var P=O.style.display;
var N=O.style.visibility;
O.style.visibility="hidden";
O.style.display="";
var I=dojo.marginBox(O);
O.style.display=P;
O.style.visibility=N;
var G=(Q.charAt(1)=="L"?R.x:Math.max(K.l,R.x-I.w)),F=(Q.charAt(0)=="T"?R.y:Math.max(K.t,R.y-I.h)),E=(Q.charAt(1)=="L"?Math.min(K.l+K.w,G+I.w):R.x),D=(Q.charAt(0)=="T"?Math.min(K.t+K.h,F+I.h):R.y),C=E-G,B=D-F,A=(I.w-C)+(I.h-B);
if(J==null||A<J.overflow){J={corner:Q,aroundCorner:M[H].aroundCorner,x:G,y:F,w:C,h:B,overflow:A}
}if(A==0){break
}}O.style.left=J.x+"px";
O.style.top=J.y+"px";
return J
};
dijit.placeOnScreenAroundElement=function(B,J,G,F){J=dojo.byId(J);
var E=J.style.display;
J.style.display="";
var D=J.offsetWidth;
var C=J.offsetHeight;
var A=dojo.coords(J,true);
J.style.display=E;
var I=[];
for(var H in G){I.push({aroundCorner:H,corner:G[H],pos:{x:A.x+(H.charAt(1)=="L"?0:D),y:A.y+(H.charAt(0)=="T"?0:C)}})
}return dijit._place(B,I,F)
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
dijit.popup=new function(){var B=[],A=1000,C=1;
this.open=function(I){var E=I.popup,D=I.orient||{BL:"TL",TL:"BL"},M=I.around,G=(I.around&&I.around.id)?(I.around.id+"_dropdown"):("popup_"+C++);
var L=dojo.doc.createElement("div");
L.id=G;
L.className="dijitPopup";
L.style.zIndex=A+B.length;
L.style.visibility="hidden";
if(I.parent){L.dijitPopupParent=I.parent.id
}dojo.body().appendChild(L);
E.domNode.style.display="";
L.appendChild(E.domNode);
var J=new dijit.BackgroundIframe(L);
var K=M?dijit.placeOnScreenAroundElement(L,M,D,E.orient?dojo.hitch(E,"orient"):null):dijit.placeOnScreen(L,I,D=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
L.style.visibility="visible";
var H=[];
function F(){for(var N=B.length-1;
N>0&&B[N].parent===B[N-1].widget;
N--){}return B[N]
}H.push(dojo.connect(L,"onkeypress",this,function(N){if(N.keyCode==dojo.keys.ESCAPE&&I.onCancel){I.onCancel()
}else{if(N.keyCode==dojo.keys.TAB){dojo.stopEvent(N);
var O=F();
if(O&&O.onCancel){O.onCancel()
}}}}));
if(E.onCancel){H.push(dojo.connect(E,"onCancel",null,I.onCancel))
}H.push(dojo.connect(E,E.onExecute?"onExecute":"onChange",null,function(){var N=F();
if(N&&N.onExecute){N.onExecute()
}}));
B.push({wrapper:L,iframe:J,widget:E,parent:I.parent,onExecute:I.onExecute,onCancel:I.onCancel,onClose:I.onClose,handlers:H});
if(E.onOpen){E.onOpen(K)
}return K
};
this.close=function(H){while(dojo.some(B,function(J){return J.widget==H
})){var E=B.pop(),D=E.wrapper,I=E.iframe,G=E.widget,F=E.onClose;
if(G.onClose){G.onClose()
}dojo.forEach(E.handlers,dojo.disconnect);
if(!G||!G.domNode){return 
}dojo.style(G.domNode,"display","none");
dojo.body().appendChild(G.domNode);
I.destroy();
dojo._destroyElement(D);
if(F){F()
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
}dijit.BackgroundIframe=function(B){if(!B.id){throw new Error("no id")
}if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){var A=dijit._frames.pop();
B.appendChild(A);
if(dojo.isIE){A.style.setExpression("width","document.getElementById('"+B.id+"').offsetWidth");
A.style.setExpression("height","document.getElementById('"+B.id+"').offsetHeight")
}this.iframe=A
}};
dojo.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(C){if(dojo.isIE){if(dojo.marginBox(C.parentNode).h<=C.parentNode.scrollHeight){C.scrollIntoView(false)
}}else{if(dojo.isMozilla){C.scrollIntoView(false)
}else{var B=C.parentNode;
var A=B.scrollTop+dojo.marginBox(B).h;
var D=C.offsetTop+dojo.marginBox(C).h;
if(A<D){B.scrollTop+=(D-A)
}else{if(B.scrollTop>C.offsetTop){B.scrollTop-=(B.scrollTop-C.offsetTop)
}}}}}
}if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var D=dojo;
var C=D.isIE;
var B=D.isOpera;
var E=Math.floor;
var G={dj_ie:C,dj_ie6:E(C)==6,dj_ie7:E(C)==7,dj_iequirks:C&&D.isQuirks,dj_opera:B,dj_opera8:E(B)==8,dj_opera9:E(B)==9,dj_khtml:D.isKhtml,dj_safari:D.isSafari,dj_gecko:D.isMozilla};
for(var A in G){if(G[A]){var F=dojo.doc.documentElement;
if(F.className){F.className+=" "+A
}else{F.className=A
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
},trigger:function(F,B,A,G,C,E,D){if(C!=this._obj){this.stop();
this._initialDelay=D||500;
this._subsequentDelay=E||0.9;
this._obj=C;
this._evt=F;
this._node=A;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(B,G);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(D,B,A,F,E,C){return[dojo.connect(D,"onkeypress",this,function(G){if(G.keyCode==B.keyCode&&(!B.charCode||B.charCode==G.charCode)&&(B.ctrlKey===undefined||B.ctrlKey==G.ctrlKey)&&(B.altKey===undefined||B.altKey==G.ctrlKey)&&(B.shiftKey===undefined||B.shiftKey==G.ctrlKey)){dojo.stopEvent(G);
dijit.typematic.trigger(B,A,D,F,B,E,C)
}else{if(dijit.typematic._obj==B){dijit.typematic.stop()
}}}),dojo.connect(D,"onkeyup",this,function(G){if(dijit.typematic._obj==B){dijit.typematic.stop()
}})]
},addMouseListener:function(D,B,E,C,A){var F=dojo.connect;
return[F(D,"mousedown",this,function(G){dojo.stopEvent(G);
dijit.typematic.trigger(G,B,D,E,D,C,A)
}),F(D,"mouseup",this,function(G){dojo.stopEvent(G);
dijit.typematic.stop()
}),F(D,"mouseout",this,function(G){dojo.stopEvent(G);
dijit.typematic.stop()
}),F(D,"mousemove",this,function(G){dojo.stopEvent(G)
}),F(D,"dblclick",this,function(G){dojo.stopEvent(G);
if(dojo.isIE){dijit.typematic.trigger(G,B,D,E,D,C,A);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(C,G,F,E,D,B,A){return this.addKeyListener(G,F,E,D,B,A).concat(this.addMouseListener(C,E,D,B,A))
}}
}if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var A=document.createElement("div");
A.id="a11yTestNode";
A.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(A);
function B(){var D=dojo.getComputedStyle(A);
if(D){var C=D.backgroundImage;
var E=(D.borderTopColor==D.borderRightColor)||(C!=null&&(C=="none"||C=="url(invalid-url:)"));
dojo[E?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}B();
if(dojo.isIE){setInterval(B,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(A){if(A.hasAttribute){return A.hasAttribute("role")
}else{return A.getAttribute("role")?true:false
}},getWaiRole:function(B){var A=B.getAttribute("role");
if(A){var C=A.indexOf(":");
return C==-1?A:A.substring(C+1)
}else{return""
}},setWaiRole:function(A,B){if(dojo.isFF&&dojo.isFF<3){A.setAttribute("role","wairole:"+B)
}else{A.setAttribute("role",B)
}},removeWaiRole:function(A){A.removeAttribute("role")
},hasWaiState:function(A,B){if(dojo.isFF&&dojo.isFF<3){return A.hasAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{if(A.hasAttribute){return A.hasAttribute("aria-"+B)
}else{return A.getAttribute("aria-"+B)?true:false
}}},getWaiState:function(A,C){if(dojo.isFF&&dojo.isFF<3){return A.getAttributeNS("http://www.w3.org/2005/07/aaa",C)
}else{var B=A.getAttribute("aria-"+C);
return B?B:""
}},setWaiState:function(C,B,A){if(dojo.isFF&&dojo.isFF<3){C.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+B,A)
}else{C.setAttribute("aria-"+B,A)
}},removeWaiState:function(A,B){if(dojo.isFF&&dojo.isFF<3){A.removeAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{A.removeAttribute("aria-"+B)
}}})
}if(!dojo._hasResource["dijit._base"]){dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base")
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(E,D){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var C=dojo.date.stamp._isoRegExp.exec(E);
var A=null;
if(C){C.shift();
C[1]&&C[1]--;
C[6]&&(C[6]*=1000);
if(D){D=new Date(D);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(G){return D["get"+G]()
}).forEach(function(G,H){if(C[H]===undefined){C[H]=G
}})
}A=new Date(C[0]||1970,C[1]||0,C[2]||0,C[3]||0,C[4]||0,C[5]||0,C[6]||0);
var B=0;
var F=C[7]&&C[7].charAt(0);
if(F!="Z"){B=((C[8]||0)*60)+(Number(C[9])||0);
if(F!="-"){B*=-1
}}if(F){B-=A.getTimezoneOffset()
}if(B){A.setTime(A.getTime()+B*60000)
}}return A
};
dojo.date.stamp.toISOString=function(E,D){var F=function(K){return(K<10)?"0"+K:K
};
D=D||{};
var C=[];
var B=D.zulu?"getUTC":"get";
var A="";
if(D.selector!="time"){A=[E[B+"FullYear"](),F(E[B+"Month"]()+1),F(E[B+"Date"]())].join("-")
}C.push(A);
if(D.selector!="date"){var J=[F(E[B+"Hours"]()),F(E[B+"Minutes"]()),F(E[B+"Seconds"]())].join(":");
var I=E[B+"Milliseconds"]();
if(D.milliseconds){J+="."+(I<100?"0":"")+F(I)
}if(D.zulu){J+="Z"
}else{if(D.selector!="time"){var H=E.getTimezoneOffset();
var G=Math.abs(H);
J+=(H>0?"-":"+")+F(Math.floor(G/60))+":"+F(G%60)
}}C.push(J)
}return C.join("T")
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
}function B(H,G){switch(G){case"string":return H;
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
}}var A={};
function C(G){if(!A[G]){var H=D.getObject(G);
if(!D.isFunction(H)){throw new Error("Could not load class '"+G+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var K=H.prototype;
var J={};
for(var I in K){if(I.charAt(0)=="_"){continue
}var F=K[I];
J[I]=E(F)
}A[G]={cls:H,params:J}
}return A[G]
}this._functionFromScript=function(G){var F="";
var I="";
var H=G.getAttribute("args");
if(H){D.forEach(H.split(/\s*,\s*/),function(L,K){F+="var "+L+" = arguments["+K+"]; "
})
}var J=G.getAttribute("with");
if(J&&J.length){D.forEach(J.split(/\s*,\s*/),function(K){F+="with("+K+"){";
I+="}"
})
}return new Function(F+G.innerHTML+I)
};
this.instantiate=function(F){var G=[];
D.forEach(F,function(R){if(!R){return 
}var Q=R.getAttribute("dojoType");
if((!Q)||(!Q.length)){return 
}var P=C(Q);
var N=P.cls;
var M=N._noScript||N.prototype._noScript;
var J={};
var W=R.attributes;
for(var L in P.params){var K=W.getNamedItem(L);
if(!K||(!K.specified&&(!dojo.isIE||L.toLowerCase()!="value"))){continue
}var I=K.value;
switch(L){case"class":I=R.className;
break;
case"style":I=R.style&&R.style.cssText
}var U=P.params[L];
J[L]=B(I,U)
}if(!M){var S=[],H=[];
D.query("> script[type^='dojo/']",R).orphan().forEach(function(Z){var Y=Z.getAttribute("event"),a=Z.getAttribute("type"),X=D.parser._functionFromScript(Z);
if(Y){if(a=="dojo/connect"){S.push({event:Y,func:X})
}else{J[Y]=X
}}else{H.push(X)
}})
}var V=N.markupFactory;
if(!V&&N.prototype){V=N.prototype.markupFactory
}var T=V?V(J,R,N):new N(J,R);
G.push(T);
var O=R.getAttribute("jsId");
if(O){D.setObject(O,T)
}if(!M){dojo.forEach(S,function(X){dojo.connect(T,X.event,null,X.func)
});
dojo.forEach(H,function(X){X.call(T)
})
}});
D.forEach(G,function(H){if(H&&(H.startup)&&((!H.getParent)||(!H.getParent()))){H.startup()
}});
return G
};
this.parse=function(H){var F=D.query("[dojoType]",H);
var G=this.instantiate(F);
return G
}
}();
(function(){var A=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,A)
}else{dojo._loaders.unshift(A)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(D,C){var B="$joinpoint";
var A=(C||dojo.parser._anon);
if(dojo.isIE){var E=D.__dojoNameCache;
if(E&&A[E]===D){return D.__dojoNameCache
}}var F="__"+dojo.parser._anonCtr++;
while(typeof A[F]!="undefined"){F="__"+dojo.parser._anonCtr++
}A[F]=D;
return F
}
}if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(A,B){this.create(A,B)
},create:function(D,C){this.srcNodeRef=dojo.byId(C);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(D){dojo.mixin(this,D)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var E in this.attributeMap){var B=this[this.attributeMap[E]||"domNode"];
var A=this[E];
if(typeof A!="object"&&(A!==""||(D&&D[E]))){switch(E){case"class":dojo.addClass(B,A);
break;
case"style":if(B.style.cssText){B.style.cssText+="; "+A
}else{B.style.cssText=A
}break;
default:B.setAttribute(E,A)
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
},nodesWithKeyClick:["input","button"],connect:function(C,B,E){var D=[];
if(B=="ondijitclick"){var A=this;
if(!this.nodesWithKeyClick[C.nodeName]){D.push(dojo.connect(C,"onkeydown",this,function(F){if(F.keyCode==dojo.keys.ENTER){return(dojo.isString(E))?A[E](F):E.call(A,F)
}else{if(F.keyCode==dojo.keys.SPACE){dojo.stopEvent(F)
}}}));
D.push(dojo.connect(C,"onkeyup",this,function(F){if(F.keyCode==dojo.keys.SPACE){return dojo.isString(E)?A[E](F):E.call(A,F)
}}))
}B="onclick"
}D.push(dojo.connect(C,B,this,E));
this._connects.push(D);
return D
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
dojo.string.substitute=function(D,C,B,A){return D.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(H,E,F){var G=dojo.getObject(E,false,C);
if(F){G=dojo.getObject(F,false,A)(G)
}if(B){G=B(G,E)
}return G.toString()
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
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var D=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var A;
if(dojo.isString(D)){var C=this.declaredClass,G=this;
var E=dojo.string.substitute(D,this,function(H,I){if(I.charAt(0)=="!"){H=G[I.substr(1)]
}if(typeof H=="undefined"){throw new Error(C+" template:"+I)
}if(!H){return""
}return I.charAt(0)=="!"?H:H.toString().replace(/"/g,"&quot;")
},this);
A=dijit._Templated._createNodesFromText(E)[0]
}else{A=D.cloneNode(true)
}this._attachTemplateNodes(A);
var B=this.srcNodeRef;
if(B&&B.parentNode){B.parentNode.replaceChild(A,B)
}this.domNode=A;
if(this.widgetsInTemplate){var F=dojo.parser.parse(A);
this._attachTemplateNodes(F,function(H,I){return H[I]
})
}this._fillContent(B)
},_fillContent:function(A){var B=this.containerNode;
if(A&&B){while(A.hasChildNodes()){B.appendChild(A.firstChild)
}}},_attachTemplateNodes:function(E,D){D=D||function(Q,R){return Q.getAttribute(R)
};
var B=dojo.isArray(E)?E:(E.all||E.getElementsByTagName("*"));
var F=dojo.isArray(E)?0:-1;
for(;
F<B.length;
F++){var O=(F==-1)?E:B[F];
if(this.widgetsInTemplate&&D(O,"dojoType")){continue
}var M=D(O,"dojoAttachPoint");
if(M){var K,I=M.split(/\s*,\s*/);
while(K=I.shift()){if(dojo.isArray(this[K])){this[K].push(O)
}else{this[K]=O
}}}var C=D(O,"dojoAttachEvent");
if(C){var A,P=C.split(/\s*,\s*/);
var G=dojo.trim;
while(A=P.shift()){if(A){var L=null;
if(A.indexOf(":")!=-1){var J=A.split(":");
A=G(J[0]);
L=G(J[1])
}else{A=G(A)
}if(!L){L=A
}this.connect(O,A,L)
}}}var N=D(O,"waiRole");
if(N){dijit.setWaiRole(O,N)
}var H=D(O,"waiState");
if(H){dojo.forEach(H.split(/\s*,\s*/),function(R){if(R.indexOf("-")!=-1){var Q=R.split("-");
dijit.setWaiState(O,Q[0],Q[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(A,F,E){var D=dijit._Templated._templateCache;
var B=F||A;
var C=D[B];
if(C){return C
}if(!F){F=dijit._Templated._sanitizeTemplateString(dojo._getText(A))
}F=dojo.string.trim(F);
if(F.match(/\$\{([^\}]+)\}/g)||E){return(D[B]=F)
}else{return(D[B]=dijit._Templated._createNodesFromText(F)[0])
}};
dijit._Templated._sanitizeTemplateString=function(B){if(B){B=B.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var A=B.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(A){B=A[1]
}}else{B=""
}return B
};
if(dojo.isIE){dojo.addOnUnload(function(){var B=dijit._Templated._templateCache;
for(var C in B){var A=B[C];
if(!isNaN(A.nodeType)){dojo._destroyElement(A)
}delete B[C]
}})
}(function(){var A={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var B;
dijit._Templated._createNodesFromText=function(J){if(!B){B=dojo.doc.createElement("div");
B.style.display="none";
dojo.body().appendChild(B)
}var D="none";
var H=J.replace(/^\s+/,"");
for(var I in A){var E=A[I];
if(E.re.test(H)){D=I;
J=E.pre+J+E.post;
break
}}B.innerHTML=J;
if(B.normalize){B.normalize()
}var G={cell:"tr",row:"tbody",section:"table"}[D];
var F=(typeof G!="undefined")?B.getElementsByTagName(G)[0]:B;
var C=[];
while(F.firstChild){C.push(F.removeChild(F.firstChild))
}B.innerHTML="";
return C
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
},_getSibling:function(C){var A=this.domNode;
do{A=A[C+"Sibling"]
}while(A&&A.nodeType!=1);
if(!A){return null
}var B=A.getAttribute("widgetId");
return dijit.byId(B)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(B,C){if(C===undefined){C="last"
}var A=this.containerNode||this.domNode;
if(C&&typeof C=="number"){var D=dojo.query("> [widgetid]",A);
if(D&&D.length>=C){A=D[C-1];
C="after"
}}dojo.place(B.domNode,A,C);
if(this._started&&!B._started){B.startup()
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
},_getSiblingOfChild:function(D,B){var C=D.domNode;
var A=(B>0?"nextSibling":"previousSibling");
do{C=C[A]
}while(C&&(C.nodeType!=1||!dijit.byNode(C)));
return C?dijit.byNode(C):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(B,A){var E=this._keyNavCodes={};
var D=dojo.hitch(this,this.focusPrev);
var C=dojo.hitch(this,this.focusNext);
dojo.forEach(B,function(F){E[F]=D
});
dojo.forEach(A,function(F){E[F]=C
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
}},focusChild:function(B,A){if(B){if(this.focusedChild&&B!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=B;
if(A&&B.focusFocalNode){B.focusFocalNode(A)
}else{B.focus()
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
},_getNextFocusableChild:function(D,A){if(D){D=this._getSiblingOfChild(D,A)
}var C=this.getChildren();
for(var B=0;
B<C.length;
B++){if(!D){D=C[(A>0)?0:(C.length-1)]
}if(D.isFocusable()){return D
}D=this._getSiblingOfChild(D,A)
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
(function(){var B=function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
};
var A=function(D,C){D.resize?D.resize(C):dojo.marginBox(D.domNode,C);
dojo.mixin(D,dojo.marginBox(D.domNode));
dojo.mixin(D,C)
};
dijit.layout.layoutChildren=function(D,E,C){E=dojo.mixin({},E);
dojo.addClass(D,"dijitLayoutContainer");
C=dojo.filter(C,function(F){return F.layoutAlign!="client"
}).concat(dojo.filter(C,function(F){return F.layoutAlign=="client"
}));
dojo.forEach(C,function(F){var I=F.domNode,H=F.layoutAlign;
var G=I.style;
G.left=E.l+"px";
G.top=E.t+"px";
G.bottom=G.right="auto";
dojo.addClass(I,"dijitAlign"+B(H));
if(H=="top"||H=="bottom"){A(F,{w:E.w});
E.h-=F.h;
if(H=="top"){E.t+=F.h
}else{G.top=E.t+E.h+"px"
}}else{if(H=="left"||H=="right"){A(F,{h:E.h});
E.w-=F.w;
if(H=="left"){E.l+=F.w
}else{G.left=E.l+E.w+"px"
}}else{if(H=="client"){A(F,E)
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
},_onMouse:function(C){var B=C.target;
if(B&&B.getAttribute){this.stateModifier=B.getAttribute("stateModifier")||""
}if(!this.disabled){switch(C.type){case"mouseenter":case"mouseover":this._hovering=true;
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