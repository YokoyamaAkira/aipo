if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var C=dojo.global;
var A=dojo.doc;
if(A.selection){return !A.selection.createRange().text
}else{if(C.getSelection){var B=C.getSelection();
if(dojo.isString(B)){return !B
}else{return B.isCollapsed||!B.toString()
}}}},getBookmark:function(){var C,B=dojo.doc.selection;
if(B){var A=B.createRange();
if(B.type.toUpperCase()=="CONTROL"){C=A.length?dojo._toArray(A):null
}else{C=A.getBookmark()
}}else{if(dojo.global.getSelection){B=dojo.global.getSelection();
if(B){var A=B.getRangeAt(0);
C=A.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return C
},moveToBookmark:function(D){var A=dojo.doc;
if(A.selection){var B;
if(dojo.isArray(D)){B=A.body.createControlRange();
dojo.forEach(D,B.addElement)
}else{B=A.selection.createRange();
B.moveToBookmark(D)
}B.select()
}else{var C=dojo.global.getSelection&&dojo.global.getSelection();
if(C&&C.removeAllRanges){C.removeAllRanges();
C.addRange(D)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(B,A){return{node:B&&dojo.isDescendant(dijit._curFocus,B.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(A||dojo.global,dijit.isCollapsed)?dojo.withGlobal(A||dojo.global,dijit.getBookmark):null,openedForWindow:A}
},focus:function(D){if(!D){return 
}var C="node" in D?D.node:D,B=D.bookmark,A=D.openedForWindow;
if(C){var F=(C.tagName.toLowerCase()=="iframe")?C.contentWindow:C;
if(F&&F.focus){try{F.focus()
}catch(E){}}dijit._onFocusNode(C)
}if(B&&dojo.withGlobal(A||dojo.global,dijit.isCollapsed)){if(A){A.focus()
}try{dojo.withGlobal(A||dojo.global,moveToBookmark,null,[B])
}catch(E){}}},_activeStack:[],registerWin:function(B){if(!B){B=window
}dojo.connect(B.document,"onmousedown",null,function(C){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(C.target||C.srcElement)
});
var A=B.document.body||B.document.getElementsByTagName("body")[0];
if(A){if(dojo.isIE){A.attachEvent("onactivate",function(C){if(C.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(C.srcElement)
}});
A.attachEvent("ondeactivate",function(C){dijit._onBlurNode(C.srcElement)
})
}else{A.addEventListener("focus",function(C){dijit._onFocusNode(C.target)
},true);
A.addEventListener("blur",function(C){dijit._onBlurNode(C.target)
},true)
}}A=null
},_onBlurNode:function(B){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var A=dijit.getEnclosingWidget(B);
if(A&&A._setStateClass){A._focused=false;
A._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(B){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var A=[];
try{while(B){if(B.dijitPopupParent){B=dijit.byId(B.dijitPopupParent).domNode
}else{if(B.tagName&&B.tagName.toLowerCase()=="body"){if(B===dojo.body()){break
}B=dojo.query("iframe").filter(function(E){return E.contentDocument.body===B
})[0]
}else{var D=B.getAttribute&&B.getAttribute("widgetId");
if(D){A.unshift(D)
}B=B.parentNode
}}}}catch(C){}dijit._setStack(A)
},_onFocusNode:function(B){if(B&&B.tagName&&B.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(B);
if(B==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=B;
dojo.publish("focusNode",[B]);
var A=dijit.getEnclosingWidget(B);
if(A&&A._setStateClass){A._focused=true;
A._setStateClass()
}},_setStack:function(A){var E=dijit._activeStack;
dijit._activeStack=A;
for(var C=0;
C<Math.min(E.length,A.length);
C++){if(E[C]!=A[C]){break
}}for(var B=E.length-1;
B>=C;
B--){var D=dijit.byId(E[B]);
if(D){dojo.publish("widgetBlur",[D]);
if(D._onBlur){D._onBlur()
}}}for(var B=C;
B<A.length;
B++){var D=dijit.byId(A[B]);
if(D){dojo.publish("widgetFocus",[D]);
if(D._onFocus){D._onFocus()
}}}}});
dojo.addOnLoad(dijit.registerWin)
}if(!dojo._hasResource["dijit._base.manager"]){dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(A){if(this._hash[A.id]){throw new Error("Tried to register widget with id=="+A.id+" but that id is already registered")
}this._hash[A.id]=A
},remove:function(A){delete this._hash[A]
},forEach:function(A){for(var B in this._hash){A(this._hash[B])
}},filter:function(B){var A=new dijit.WidgetSet();
this.forEach(function(C){if(B(C)){A.add(C)
}});
return A
},byId:function(A){return this._hash[A]
},byClass:function(A){return this.filter(function(B){return B.declaredClass==A
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(A){var B;
do{B=A+"_"+(dijit._widgetTypeCtr[A]!==undefined?++dijit._widgetTypeCtr[A]:dijit._widgetTypeCtr[A]=0)
}while(dijit.byId(B));
return B
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
dijit.getViewport=function(){var A=dojo.global;
var G=dojo.doc;
var H=0,C=0;
if(dojo.isMozilla){var I,D,E,B;
if(G.body.clientWidth>G.documentElement.clientWidth){I=G.documentElement.clientWidth;
E=G.body.clientWidth
}else{E=G.documentElement.clientWidth;
I=G.body.clientWidth
}if(G.body.clientHeight>G.documentElement.clientHeight){D=G.documentElement.clientHeight;
B=G.body.clientHeight
}else{B=G.documentElement.clientHeight;
D=G.body.clientHeight
}H=(E>A.innerWidth)?I:E;
C=(B>A.innerHeight)?D:B
}else{if(!dojo.isOpera&&A.innerWidth){H=A.innerWidth;
C=A.innerHeight
}else{if(dojo.isIE&&G.documentElement&&G.documentElement.clientHeight){H=G.documentElement.clientWidth;
C=G.documentElement.clientHeight
}else{if(dojo.body().clientWidth){H=dojo.body().clientWidth;
C=dojo.body().clientHeight
}}}}var F=dojo._docScroll();
return{w:H,h:C,l:F.x,t:F.y}
};
dijit.placeOnScreen=function(B,E,A,C){var D=dojo.map(A,function(F){return{corner:F,pos:E}
});
return dijit._place(B,D)
};
dijit._place=function(O,L,H){var I=dijit.getViewport();
if(!O.parentNode||String(O.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(O)
}var E=null;
for(var P=0;
P<L.length;
P++){var G=L[P].corner;
var F=L[P].pos;
if(H){H(G)
}var K=O.style.display;
var B=O.style.visibility;
O.style.visibility="hidden";
O.style.display="";
var A=dojo.marginBox(O);
O.style.display=K;
O.style.visibility=B;
var R=(G.charAt(1)=="L"?F.x:Math.max(I.l,F.x-A.w)),Q=(G.charAt(0)=="T"?F.y:Math.max(I.t,F.y-A.h)),D=(G.charAt(1)=="L"?Math.min(I.l+I.w,R+A.w):F.x),C=(G.charAt(0)=="T"?Math.min(I.t+I.h,Q+A.h):F.y),M=D-R,J=C-Q,N=(A.w-M)+(A.h-J);
if(E==null||N<E.overflow){E={corner:G,aroundCorner:L[P].aroundCorner,x:R,y:Q,w:M,h:J,overflow:N}
}if(N==0){break
}}O.style.left=E.x+"px";
O.style.top=E.y+"px";
return E
};
dijit.placeOnScreenAroundElement=function(B,E,F,C){E=dojo.byId(E);
var H=E.style.display;
E.style.display="";
var I=E.offsetWidth;
var D=E.offsetHeight;
var G=dojo.coords(E,true);
E.style.display=H;
var J=[];
for(var A in F){J.push({aroundCorner:A,corner:F[A],pos:{x:G.x+(A.charAt(1)=="L"?0:I),y:G.y+(A.charAt(0)=="T"?0:D)}})
}return dijit._place(B,J,C)
}
}if(!dojo._hasResource["dijit._base.window"]){dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(C){if(dojo.isSafari&&!C._parentWindow){var A=function(E){E.document._parentWindow=E;
for(var D=0;
D<E.frames.length;
D++){A(E.frames[D])
}};
A(window.top)
}if(dojo.isIE&&window!==document.parentWindow&&!C._parentWindow){C.parentWindow.execScript("document._parentWindow = window;","Javascript");
var B=C._parentWindow;
C._parentWindow=null;
return B
}return C._parentWindow||C.parentWindow||C.defaultView
}
}if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup=new function(){var A=[],B=1000,C=1;
this.open=function(L){var K=L.popup,J=L.orient||{BL:"TL",TL:"BL"},M=L.around,F=(L.around&&L.around.id)?(L.around.id+"_dropdown"):("popup_"+C++);
var E=dojo.doc.createElement("div");
E.id=F;
E.className="dijitPopup";
E.style.zIndex=B+A.length;
E.style.visibility="hidden";
if(L.parent){E.dijitPopupParent=L.parent.id
}dojo.body().appendChild(E);
K.domNode.style.display="";
E.appendChild(K.domNode);
var I=new dijit.BackgroundIframe(E);
var H=M?dijit.placeOnScreenAroundElement(E,M,J,K.orient?dojo.hitch(K,"orient"):null):dijit.placeOnScreen(E,L,J=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
E.style.visibility="visible";
var G=[];
function D(){for(var N=A.length-1;
N>0&&A[N].parent===A[N-1].widget;
N--){}return A[N]
}G.push(dojo.connect(E,"onkeypress",this,function(N){if(N.keyCode==dojo.keys.ESCAPE&&L.onCancel){L.onCancel()
}else{if(N.keyCode==dojo.keys.TAB){dojo.stopEvent(N);
var O=D();
if(O&&O.onCancel){O.onCancel()
}}}}));
if(K.onCancel){G.push(dojo.connect(K,"onCancel",null,L.onCancel))
}G.push(dojo.connect(K,K.onExecute?"onExecute":"onChange",null,function(){var N=D();
if(N&&N.onExecute){N.onExecute()
}}));
A.push({wrapper:E,iframe:I,widget:K,parent:L.parent,onExecute:L.onExecute,onCancel:L.onCancel,onClose:L.onClose,handlers:G});
if(K.onOpen){K.onOpen(H)
}return H
};
this.close=function(E){while(dojo.some(A,function(J){return J.widget==E
})){var H=A.pop(),I=H.wrapper,F=H.iframe,G=H.widget,D=H.onClose;
if(G.onClose){G.onClose()
}dojo.forEach(H.handlers,dojo.disconnect);
if(!G||!G.domNode){return 
}dojo.style(G.domNode,"display","none");
dojo.body().appendChild(G.domNode);
F.destroy();
dojo._destroyElement(I);
if(D){D()
}}}
}();
dijit._frames=new function(){var A=[];
this.pop=function(){var C;
if(A.length){C=A.pop();
C.style.display=""
}else{if(dojo.isIE){var B="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
C=dojo.doc.createElement(B)
}else{var C=dojo.doc.createElement("iframe");
C.src='javascript:""';
C.className="dijitBackgroundIframe"
}C.tabIndex=-1;
dojo.body().appendChild(C)
}return C
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
}else{var A=C.parentNode;
var B=A.scrollTop+dojo.marginBox(A).h;
var D=C.offsetTop+dojo.marginBox(C).h;
if(B<D){A.scrollTop+=(D-B)
}else{if(A.scrollTop>C.offsetTop){A.scrollTop-=(A.scrollTop-C.offsetTop)
}}}}}
}if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var G=dojo;
var F=G.isIE;
var A=G.isOpera;
var B=Math.floor;
var D={dj_ie:F,dj_ie6:B(F)==6,dj_ie7:B(F)==7,dj_iequirks:F&&G.isQuirks,dj_opera:A,dj_opera8:B(A)==8,dj_opera9:B(A)==9,dj_khtml:G.isKhtml,dj_safari:G.isSafari,dj_gecko:G.isMozilla};
for(var E in D){if(D[E]){var C=dojo.doc.documentElement;
if(C.className){C.className+=" "+E
}else{C.className=E
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
},trigger:function(A,G,C,F,E,B,D){if(E!=this._obj){this.stop();
this._initialDelay=D||500;
this._subsequentDelay=B||0.9;
this._obj=E;
this._evt=A;
this._node=C;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(G,F);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(C,A,F,E,B,D){return[dojo.connect(C,"onkeypress",this,function(G){if(G.keyCode==A.keyCode&&(!A.charCode||A.charCode==G.charCode)&&(A.ctrlKey===undefined||A.ctrlKey==G.ctrlKey)&&(A.altKey===undefined||A.altKey==G.ctrlKey)&&(A.shiftKey===undefined||A.shiftKey==G.ctrlKey)){dojo.stopEvent(G);
dijit.typematic.trigger(A,F,C,E,A,B,D)
}else{if(dijit.typematic._obj==A){dijit.typematic.stop()
}}}),dojo.connect(C,"onkeyup",this,function(G){if(dijit.typematic._obj==A){dijit.typematic.stop()
}})]
},addMouseListener:function(C,F,E,B,D){var A=dojo.connect;
return[A(C,"mousedown",this,function(G){dojo.stopEvent(G);
dijit.typematic.trigger(G,F,C,E,C,B,D)
}),A(C,"mouseup",this,function(G){dojo.stopEvent(G);
dijit.typematic.stop()
}),A(C,"mouseout",this,function(G){dojo.stopEvent(G);
dijit.typematic.stop()
}),A(C,"mousemove",this,function(G){dojo.stopEvent(G)
}),A(C,"dblclick",this,function(G){dojo.stopEvent(G);
if(dojo.isIE){dijit.typematic.trigger(G,F,C,E,C,B,D);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(D,E,A,G,F,B,C){return this.addKeyListener(E,A,G,F,B,C).concat(this.addMouseListener(D,G,F,B,C))
}}
}if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var B=document.createElement("div");
B.id="a11yTestNode";
B.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(B);
function A(){var D=dojo.getComputedStyle(B);
if(D){var C=D.backgroundImage;
var E=(D.borderTopColor==D.borderRightColor)||(C!=null&&(C=="none"||C=="url(invalid-url:)"));
dojo[E?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}A();
if(dojo.isIE){setInterval(A,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(A){if(A.hasAttribute){return A.hasAttribute("role")
}else{return A.getAttribute("role")?true:false
}},getWaiRole:function(B){var C=B.getAttribute("role");
if(C){var A=C.indexOf(":");
return A==-1?C:C.substring(A+1)
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
}},setWaiState:function(A,C,B){if(dojo.isFF&&dojo.isFF<3){A.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+C,B)
}else{A.setAttribute("aria-"+C,B)
}},removeWaiState:function(A,B){if(dojo.isFF&&dojo.isFF<3){A.removeAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{A.removeAttribute("aria-"+B)
}}})
}if(!dojo._hasResource["dijit._base"]){dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base")
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(E,B){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var C=dojo.date.stamp._isoRegExp.exec(E);
var A=null;
if(C){C.shift();
C[1]&&C[1]--;
C[6]&&(C[6]*=1000);
if(B){B=new Date(B);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(G){return B["get"+G]()
}).forEach(function(H,G){if(C[G]===undefined){C[G]=H
}})
}A=new Date(C[0]||1970,C[1]||0,C[2]||0,C[3]||0,C[4]||0,C[5]||0,C[6]||0);
var F=0;
var D=C[7]&&C[7].charAt(0);
if(D!="Z"){F=((C[8]||0)*60)+(Number(C[9])||0);
if(D!="-"){F*=-1
}}if(D){F-=A.getTimezoneOffset()
}if(F){A.setTime(A.getTime()+F*60000)
}}return A
};
dojo.date.stamp.toISOString=function(F,J){var I=function(K){return(K<10)?"0"+K:K
};
J=J||{};
var E=[];
var G=J.zulu?"getUTC":"get";
var C="";
if(J.selector!="time"){C=[F[G+"FullYear"](),I(F[G+"Month"]()+1),I(F[G+"Date"]())].join("-")
}E.push(C);
if(J.selector!="date"){var B=[I(F[G+"Hours"]()),I(F[G+"Minutes"]()),I(F[G+"Seconds"]())].join(":");
var A=F[G+"Milliseconds"]();
if(J.milliseconds){B+="."+(A<100?"0":"")+I(A)
}if(J.zulu){B+="Z"
}else{if(J.selector!="time"){var H=F.getTimezoneOffset();
var D=Math.abs(H);
B+=(H>0?"-":"+")+I(Math.floor(D/60))+":"+I(D%60)
}}E.push(B)
}return E.join("T")
}
}if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.parser=new function(){var E=dojo;
function A(F){if(E.isString(F)){return"string"
}if(typeof F=="number"){return"number"
}if(typeof F=="boolean"){return"boolean"
}if(E.isFunction(F)){return"function"
}if(E.isArray(F)){return"array"
}if(F instanceof Date){return"date"
}if(F instanceof E._Url){return"url"
}return"object"
}function B(G,F){switch(F){case"string":return G;
case"number":return G.length?Number(G):NaN;
case"boolean":return typeof G=="boolean"?G:!(G.toLowerCase()=="false");
case"function":if(E.isFunction(G)){G=G.toString();
G=E.trim(G.substring(G.indexOf("{")+1,G.length-1))
}try{if(G.search(/[^\w\.]+/i)!=-1){G=E.parser._nameAnonFunc(new Function(G),this)
}return E.getObject(G,false)
}catch(H){return new Function()
}case"array":return G.split(/\s*,\s*/);
case"date":switch(G){case"":return new Date("");
case"now":return new Date();
default:return E.date.stamp.fromISOString(G)
}case"url":return E.baseUrl+G;
default:return E.fromJson(G)
}}var D={};
function C(H){if(!D[H]){var F=E.getObject(H);
if(!E.isFunction(F)){throw new Error("Could not load class '"+H+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var I=F.prototype;
var K={};
for(var G in I){if(G.charAt(0)=="_"){continue
}var J=I[G];
K[G]=A(J)
}D[H]={cls:F,params:K}
}return D[H]
}this._functionFromScript=function(G){var H="";
var J="";
var F=G.getAttribute("args");
if(F){E.forEach(F.split(/\s*,\s*/),function(L,K){H+="var "+L+" = arguments["+K+"]; "
})
}var I=G.getAttribute("with");
if(I&&I.length){E.forEach(I.split(/\s*,\s*/),function(K){H+="with("+K+"){";
J+="}"
})
}return new Function(H+G.innerHTML+J)
};
this.instantiate=function(F){var G=[];
E.forEach(F,function(J){if(!J){return 
}var R=J.getAttribute("dojoType");
if((!R)||(!R.length)){return 
}var O=C(R);
var P=O.cls;
var H=P._noScript||P.prototype._noScript;
var K={};
var M=J.attributes;
for(var I in O.params){var V=M.getNamedItem(I);
if(!V||(!V.specified&&(!dojo.isIE||I.toLowerCase()!="value"))){continue
}var T=V.value;
switch(I){case"class":T=J.className;
break;
case"style":T=J.style&&J.style.cssText
}var N=O.params[I];
K[I]=B(T,N)
}if(!H){var L=[],W=[];
E.query("> script[type^='dojo/']",J).orphan().forEach(function(X){var Z=X.getAttribute("event"),Y=X.getAttribute("type"),a=E.parser._functionFromScript(X);
if(Z){if(Y=="dojo/connect"){L.push({event:Z,func:a})
}else{K[Z]=a
}}else{W.push(a)
}})
}var S=P.markupFactory;
if(!S&&P.prototype){S=P.prototype.markupFactory
}var U=S?S(K,J,P):new P(K,J);
G.push(U);
var Q=J.getAttribute("jsId");
if(Q){E.setObject(Q,U)
}if(!H){dojo.forEach(L,function(X){dojo.connect(U,X.event,null,X.func)
});
dojo.forEach(W,function(X){X.call(U)
})
}});
E.forEach(G,function(H){if(H&&(H.startup)&&((!H.getParent)||(!H.getParent()))){H.startup()
}});
return G
};
this.parse=function(F){var G=E.query("[dojoType]",F);
var H=this.instantiate(G);
return H
}
}();
(function(){var A=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,A)
}else{dojo._loaders.unshift(A)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(A,E){var D="$joinpoint";
var C=(E||dojo.parser._anon);
if(dojo.isIE){var F=A.__dojoNameCache;
if(F&&C[F]===A){return A.__dojoNameCache
}}var B="__"+dojo.parser._anonCtr++;
while(typeof C[B]!="undefined"){B="__"+dojo.parser._anonCtr++
}C[B]=A;
return B
}
}if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(B,A){this.create(B,A)
},create:function(E,B){this.srcNodeRef=dojo.byId(B);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(E){dojo.mixin(this,E)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var A in this.attributeMap){var D=this[this.attributeMap[A]||"domNode"];
var C=this[A];
if(typeof C!="object"&&(C!==""||(E&&E[A]))){switch(A){case"class":dojo.addClass(D,C);
break;
case"style":if(D.style.cssText){D.style.cssText+="; "+C
}else{D.style.cssText=C
}break;
default:D.setAttribute(A,C)
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
},nodesWithKeyClick:["input","button"],connect:function(D,C,E){var B=[];
if(C=="ondijitclick"){var A=this;
if(!this.nodesWithKeyClick[D.nodeName]){B.push(dojo.connect(D,"onkeydown",this,function(F){if(F.keyCode==dojo.keys.ENTER){return(dojo.isString(E))?A[E](F):E.call(A,F)
}else{if(F.keyCode==dojo.keys.SPACE){dojo.stopEvent(F)
}}}));
B.push(dojo.connect(D,"onkeyup",this,function(F){if(F.keyCode==dojo.keys.SPACE){return dojo.isString(E)?A[E](F):E.call(A,F)
}}))
}C="onclick"
}B.push(dojo.connect(D,C,this,E));
this._connects.push(B);
return B
},disconnect:function(B){for(var A=0;
A<this._connects.length;
A++){if(this._connects[A]==B){dojo.forEach(B,dojo.disconnect);
this._connects.splice(A,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=dojo.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(dojo.style(this.domNode,"display")!="none")
}})
}if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(E,C,D,A){var B=String(E);
if(!D){D="0"
}while(B.length<C){if(A){B+=D
}else{B=D+B
}}return B
};
dojo.string.substitute=function(C,D,B,A){return C.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(E,F,H){var G=dojo.getObject(F,false,D);
if(H){G=dojo.getObject(H,false,A)(G)
}if(B){G=B(G,F)
}return G.toString()
})
};
dojo.string.trim=function(B){B=B.replace(/^\s+/,"");
for(var A=B.length-1;
A>0;
A--){if(/\S/.test(B.charAt(A))){B=B.substring(0,A+1);
break
}}return B
}
}if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var D=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var E;
if(dojo.isString(D)){var C=this.declaredClass,G=this;
var A=dojo.string.substitute(D,this,function(I,H){if(H.charAt(0)=="!"){I=G[H.substr(1)]
}if(typeof I=="undefined"){throw new Error(C+" template:"+H)
}if(!I){return""
}return H.charAt(0)=="!"?I:I.toString().replace(/"/g,"&quot;")
},this);
E=dijit._Templated._createNodesFromText(A)[0]
}else{E=D.cloneNode(true)
}this._attachTemplateNodes(E);
var F=this.srcNodeRef;
if(F&&F.parentNode){F.parentNode.replaceChild(E,F)
}this.domNode=E;
if(this.widgetsInTemplate){var B=dojo.parser.parse(E);
this._attachTemplateNodes(B,function(I,H){return I[H]
})
}this._fillContent(F)
},_fillContent:function(B){var A=this.containerNode;
if(B&&A){while(B.hasChildNodes()){A.appendChild(B.firstChild)
}}},_attachTemplateNodes:function(D,G){G=G||function(R,Q){return R.getAttribute(Q)
};
var B=dojo.isArray(D)?D:(D.all||D.getElementsByTagName("*"));
var K=dojo.isArray(D)?0:-1;
for(;
K<B.length;
K++){var C=(K==-1)?D:B[K];
if(this.widgetsInTemplate&&G(C,"dojoType")){continue
}var E=G(C,"dojoAttachPoint");
if(E){var L,N=E.split(/\s*,\s*/);
while(L=N.shift()){if(dojo.isArray(this[L])){this[L].push(C)
}else{this[L]=C
}}}var J=G(C,"dojoAttachEvent");
if(J){var A,O=J.split(/\s*,\s*/);
var F=dojo.trim;
while(A=O.shift()){if(A){var H=null;
if(A.indexOf(":")!=-1){var P=A.split(":");
A=F(P[0]);
H=F(P[1])
}else{A=F(A)
}if(!H){H=A
}this.connect(C,A,H)
}}}var I=G(C,"waiRole");
if(I){dijit.setWaiRole(C,I)
}var M=G(C,"waiState");
if(M){dojo.forEach(M.split(/\s*,\s*/),function(R){if(R.indexOf("-")!=-1){var Q=R.split("-");
dijit.setWaiState(C,Q[0],Q[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(C,D,F){var E=dijit._Templated._templateCache;
var A=D||C;
var B=E[A];
if(B){return B
}if(!D){D=dijit._Templated._sanitizeTemplateString(dojo._getText(C))
}D=dojo.string.trim(D);
if(D.match(/\$\{([^\}]+)\}/g)||F){return(E[A]=D)
}else{return(E[A]=dijit._Templated._createNodesFromText(D)[0])
}};
dijit._Templated._sanitizeTemplateString=function(A){if(A){A=A.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var B=A.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(B){A=B[1]
}}else{A=""
}return A
};
if(dojo.isIE){dojo.addOnUnload(function(){var A=dijit._Templated._templateCache;
for(var B in A){var C=A[B];
if(!isNaN(C.nodeType)){dojo._destroyElement(C)
}delete A[B]
}})
}(function(){var B={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var A;
dijit._Templated._createNodesFromText=function(J){if(!A){A=dojo.doc.createElement("div");
A.style.display="none";
dojo.body().appendChild(A)
}var F="none";
var D=J.replace(/^\s+/,"");
for(var G in B){var H=B[G];
if(H.re.test(D)){F=G;
J=H.pre+J+H.post;
break
}}A.innerHTML=J;
if(A.normalize){A.normalize()
}var C={cell:"tr",row:"tbody",section:"table"}[F];
var I=(typeof C!="undefined")?A.getElementsByTagName(C)[0]:A;
var E=[];
while(I.firstChild){E.push(I.removeChild(I.firstChild))
}A.innerHTML="";
return E
}
})();
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}if(!dojo._hasResource["dijit._Container"]){dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Contained",null,{getParent:function(){for(var B=this.domNode.parentNode;
B;
B=B.parentNode){var C=B.getAttribute&&B.getAttribute("widgetId");
if(C){var A=dijit.byId(C);
return A.isContainer?A:null
}}return null
},_getSibling:function(B){var A=this.domNode;
do{A=A[B+"Sibling"]
}while(A&&A.nodeType!=1);
if(!A){return null
}var C=A.getAttribute("widgetId");
return dijit.byId(C)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(D,A){if(A===undefined){A="last"
}var B=this.containerNode||this.domNode;
if(A&&typeof A=="number"){var C=dojo.query("> [widgetid]",B);
if(C&&C.length>=A){B=C[A-1];
A="after"
}}dojo.place(D.domNode,B,A);
if(this._started&&!D._started){D.startup()
}},removeChild:function(B){var A=B.domNode;
A.parentNode.removeChild(A)
},_nextElement:function(A){do{A=A.nextSibling
}while(A&&A.nodeType!=1);
return A
},_firstElement:function(A){A=A.firstChild;
if(A&&A.nodeType!=1){A=this._nextElement(A)
}return A
},getChildren:function(){return dojo.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var A=this.containerNode||this.domNode;
return !!this._firstElement(A)
},_getSiblingOfChild:function(D,A){var B=D.domNode;
var C=(A>0?"nextSibling":"previousSibling");
do{B=B[C]
}while(B&&(B.nodeType!=1||!dijit.byNode(B)));
return B?dijit.byNode(B):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(A,E){var B=this._keyNavCodes={};
var D=dojo.hitch(this,this.focusPrev);
var C=dojo.hitch(this,this.focusNext);
dojo.forEach(A,function(F){B[F]=D
});
dojo.forEach(E,function(F){B[F]=C
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(dojo.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){dojo.forEach(this.getChildren(),dojo.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(B,A){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(B)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var A=this._getNextFocusableChild(this.focusedChild,1);
if(A.getFocalNodes){this.focusChild(A,A.getFocalNodes()[0])
}else{this.focusChild(A)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var B=this._getNextFocusableChild(this.focusedChild,-1);
if(B.getFocalNodes){var A=B.getFocalNodes();
this.focusChild(B,A[A.length-1])
}else{this.focusChild(B)
}},focusChild:function(B,A){if(B){if(this.focusedChild&&B!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=B;
if(A&&B.focusFocalNode){B.focusFocalNode(A)
}else{B.focus()
}}},_setTabIndexMinusOne:function(A){if(A.getFocalNodes){dojo.forEach(A.getFocalNodes(),function(B){B.setAttribute("tabIndex",-1)
})
}else{(A.focusNode||A.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(A){this.domNode.setAttribute("tabIndex",-1);
if(A.target===this.domNode){this.focusFirstChild()
}else{var B=dijit.getEnclosingWidget(A.target);
if(B&&B.isFocusable()){this.focusedChild=B
}}},_onContainerBlur:function(A){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(A){if(A.ctrlKey||A.altKey){return 
}var B=this._keyNavCodes[A.keyCode];
if(B){B();
dojo.stopEvent(A)
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
}},resize:function(A){var B=this.domNode;
if(A){dojo.marginBox(B,A);
if(A.t){B.style.top=A.t+"px"
}if(A.l){B.style.left=A.l+"px"
}}var C=dojo.mixin(dojo.marginBox(B),A||{});
this._contentBox=dijit.layout.marginBox2contentBox(B,C);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(D,E){var B=dojo.getComputedStyle(D);
var C=dojo._getMarginExtents(D,B);
var A=dojo._getPadBorderExtents(D,B);
return{l:dojo._toPixelValue(D,B.paddingLeft),t:dojo._toPixelValue(D,B.paddingTop),w:E.w-(C.w+A.w),h:E.h-(C.h+A.h)}
};
(function(){var B=function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
};
var A=function(C,D){C.resize?C.resize(D):dojo.marginBox(C.domNode,D);
dojo.mixin(C,dojo.marginBox(C.domNode));
dojo.mixin(C,D)
};
dijit.layout.layoutChildren=function(C,E,D){E=dojo.mixin({},E);
dojo.addClass(C,"dijitLayoutContainer");
D=dojo.filter(D,function(F){return F.layoutAlign!="client"
}).concat(dojo.filter(D,function(F){return F.layoutAlign=="client"
}));
dojo.forEach(D,function(I){var H=I.domNode,G=I.layoutAlign;
var F=H.style;
F.left=E.l+"px";
F.top=E.t+"px";
F.bottom=F.right="auto";
dojo.addClass(H,"dijitAlign"+B(G));
if(G=="top"||G=="bottom"){A(I,{w:E.w});
E.h-=I.h;
if(G=="top"){E.t+=I.h
}else{F.top=E.t+E.h+"px"
}}else{if(G=="left"||G=="right"){A(I,{h:E.h});
E.w-=I.w;
if(G=="left"){E.l+=I.w
}else{F.left=E.l+E.w+"px"
}}else{if(G=="client"){A(I,E)
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
},_onMouse:function(C){var D=C.target;
if(D&&D.getAttribute){this.stateModifier=D.getAttribute("stateModifier")||""
}if(!this.disabled){switch(C.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var A=this;
var B=this.connect(dojo.body(),"onmouseup",function(){A._active=false;
A._setStateClass();
A.disconnect(B)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(dojo.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var B=[this.baseClass];
function A(C){B=B.concat(dojo.map(B,function(D){return D+C
}))
}if(this.checked){A("Checked")
}if(this.state){A(this.state)
}if(this.selected){A("Selected")
}if(this.disabled){A("Disabled")
}else{if(this._active){A(this.stateModifier+"Active")
}else{if(this._focused){A("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){A(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+B.join(" ")
},onChange:function(A){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(B,A){this._lastValue=B;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(A===undefined){A=true
}if(this._lastValueReported==undefined&&A===null){this._lastValueReported=B
}if((this.intermediateChanges||A)&&((B&&B.toString)?B.toString():B)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=B;
this.onChange(B)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(B){if(B.keyCode==dojo.keys.ESCAPE&&!B.shiftKey&&!B.ctrlKey&&!B.altKey){var A=this.getValue();
var C=this._lastValueReported;
if((typeof C!="undefined")&&((A!==null&&A.toString)?A.toString():null)!==C.toString()){this.undo();
dojo.stopEvent(B);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}if(!dojo._hasResource["dijit.dijit"]){dojo._hasResource["dijit.dijit"]=true;
dojo.provide("dijit.dijit")
};