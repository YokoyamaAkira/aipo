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
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(B,C,H){H=dojo.i18n.normalizeLocale(H);
var A=H.split("-");
var D=[B,"nls",C].join(".");
var J=dojo._loadedModules[D];
if(J){var I;
for(var E=A.length;
E>0;
E--){var G=A.slice(0,E).join("_");
if(J[G]){I=J[G];
break
}}if(!I){I=J.ROOT
}if(I){var F=function(){};
F.prototype=I;
return new F()
}}throw new Error("Bundle not found: "+C+" in "+B+" , locale="+H)
};
dojo.i18n.normalizeLocale=function(B){var A=B?B.toLowerCase():dojo.locale;
if(A=="root"){A="ROOT"
}return A
};
dojo.i18n._requireLocalization=function(A,B,O,K){var H=dojo.i18n.normalizeLocale(O);
var E=[A,"nls",B].join(".");
var D="";
if(K){var N=K.split(",");
for(var I=0;
I<N.length;
I++){if(H.indexOf(N[I])==0){if(N[I].length>D.length){D=N[I]
}}}if(!D){D="ROOT"
}}var L=K?D:H;
var Q=dojo._loadedModules[E];
var C=null;
if(Q){if(djConfig.localizationComplete&&Q._built){return 
}var G=L.replace(/-/g,"_");
var M=E+"."+G;
C=dojo._loadedModules[M]
}if(!C){Q=dojo.provide(E);
var F=dojo._getModuleSymbols(A);
var J=F.concat("nls").join("/");
var P;
dojo.i18n._searchLocalePath(L,K,function(V){var W=V.replace(/-/g,"_");
var U=E+"."+W;
var S=false;
if(!dojo._loadedModules[U]){dojo.provide(U);
var T=[J];
if(V!="ROOT"){T.push(V)
}T.push(B);
var R=T.join("/")+".js";
S=dojo._loadPath(R,null,function(Z){var Y=function(){};
Y.prototype=P;
Q[W]=new Y();
for(var X in Z){Q[W][X]=Z[X]
}})
}else{S=true
}if(S&&Q[W]){P=Q[W]
}else{Q[W]=P
}if(K){return true
}})
}if(K&&H!=D){Q[H.replace(/-/g,"_")]=Q[D.replace(/-/g,"_")]
}};
(function(){var A=djConfig.extraLocale;
if(A){if(!A instanceof Array){A=[A]
}var B=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(E,D,C,G){B(E,D,C,G);
if(C){return 
}for(var F=0;
F<A.length;
F++){B(E,D,A[F],G)
}}
}})();
dojo.i18n._searchLocalePath=function(H,I,C){H=dojo.i18n.normalizeLocale(H);
var A=H.split("-");
var B=[];
for(var E=A.length;
E>0;
E--){B.push(A.slice(0,E).join("-"))
}B.push(false);
if(I){B.reverse()
}for(var D=B.length-1;
D>=0;
D--){var F=B[D]||"ROOT";
var G=C(F);
if(G){break
}}};
dojo.i18n._preloadLocalizations=function(E,B){function C(F){F=dojo.i18n.normalizeLocale(F);
dojo.i18n._searchLocalePath(F,true,function(H){for(var G=0;
G<B.length;
G++){if(B[G]==H){dojo.require(E+"_"+H);
return true
}}return false
})
}C();
var A=djConfig.extraLocale||[];
for(var D=0;
D<A.length;
D++){C(A[D])
}}
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(A){var B={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var C=dojo.cldr.supplemental._region(A);
var D=B[C];
return(typeof D=="undefined")?1:D
};
dojo.cldr.supplemental._region=function(A){A=dojo.i18n.normalizeLocale(A);
var B=A.split("-");
var C=B[1];
if(!C){C={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[B[0]]
}else{if(C.length==4){C=B[2]
}}return C
};
dojo.cldr.supplemental.getWeekend=function(B){var D={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var A={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var E=dojo.cldr.supplemental._region(B);
var F=D[E];
var C=A[E];
if(typeof F=="undefined"){F=6
}if(typeof C=="undefined"){C=0
}return{start:F,end:C}
}
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(A){var B=A.getMonth();
var C=[31,28,31,30,31,30,31,31,30,31,30,31];
if(B==1&&dojo.date.isLeapYear(A)){return 29
}return C[B]
};
dojo.date.isLeapYear=function(B){var A=B.getFullYear();
return !(A%400)||(!(A%4)&&!!(A%100))
};
dojo.date.getTimezoneName=function(C){var D=C.toString();
var F="";
var B;
var E=D.indexOf("(");
if(E>-1){F=D.substring(++E,D.indexOf(")"))
}else{var A=/([A-Z\/]+) \d{4}$/;
if((B=D.match(A))){F=B[1]
}else{D=C.toLocaleString();
A=/ ([A-Z\/]+)$/;
if((B=D.match(A))){F=B[1]
}}}return(F=="AM"||F=="PM")?"":F
};
dojo.date.compare=function(C,B,A){C=new Date(Number(C));
B=new Date(Number(B||new Date()));
if(typeof A!=="undefined"){if(A=="date"){C.setHours(0,0,0,0);
B.setHours(0,0,0,0)
}else{if(A=="time"){C.setFullYear(0,0,0);
B.setFullYear(0,0,0)
}}}if(C>B){return 1
}if(C<B){return -1
}return 0
};
dojo.date.add=function(D,C,E){var G=new Date(Number(D));
var B=false;
var K="Date";
switch(C){case"day":break;
case"weekday":var L,A;
var I=0;
var J=E%5;
if(!J){L=(E>0)?5:-5;
A=(E>0)?((E-5)/5):((E+5)/5)
}else{L=J;
A=parseInt(E/5)
}var F=D.getDay();
if(F==6&&E>0){I=1
}else{if(F==0&&E<0){I=-1
}}var H=F+L;
if(H==0||H==6){I=(E>0)?2:-2
}E=7*A+L+I;
break;
case"year":K="FullYear";
B=true;
break;
case"week":E*=7;
break;
case"quarter":E*=3;
case"month":B=true;
K="Month";
break;
case"hour":case"minute":case"second":case"millisecond":K=C.charAt(0).toUpperCase()+C.substring(1)+"s"
}if(K){G["setUTC"+K](G["getUTC"+K]()+E)
}if(B&&(G.getDate()<D.getDate())){G.setDate(0)
}return G
};
dojo.date.difference=function(P,N,D){N=N||new Date();
D=D||"day";
var C=N.getFullYear()-P.getFullYear();
var L=1;
switch(D){case"quarter":var Q=P.getMonth();
var O=N.getMonth();
var I=Math.floor(Q/3)+1;
var H=Math.floor(O/3)+1;
H+=(C*4);
L=H-I;
break;
case"weekday":var M=Math.round(dojo.date.difference(P,N,"day"));
var A=parseInt(dojo.date.difference(P,N,"week"));
var K=M%7;
if(K==0){M=A*5
}else{var J=0;
var G=P.getDay();
var E=N.getDay();
A=parseInt(M/7);
K=M%7;
var F=new Date(P);
F.setDate(F.getDate()+(A*7));
var B=F.getDay();
if(M>0){switch(true){case G==6:J=-1;
break;
case G==0:J=0;
break;
case E==6:J=-1;
break;
case E==0:J=-2;
break;
case (B+K)>5:J=-2
}}else{if(M<0){switch(true){case G==6:J=0;
break;
case G==0:J=1;
break;
case E==6:J=2;
break;
case E==0:J=1;
break;
case (B+K)<0:J=2
}}}M+=J;
M-=(A*2)
}L=M;
break;
case"year":L=C;
break;
case"month":L=(N.getMonth()-P.getMonth())+(C*12);
break;
case"week":L=parseInt(dojo.date.difference(P,N,"day")/7);
break;
case"day":L/=24;
case"hour":L/=60;
case"minute":L/=60;
case"second":L/=1000;
case"millisecond":L*=N.getTime()-P.getTime()
}return Math.round(L)
}
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(B,A){return B.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(C){if(A&&A.indexOf(C)!=-1){return C
}return"\\"+C
})
};
dojo.regexp.buildGroupRE=function(B,E,D){if(!(B instanceof Array)){return E(B)
}var A=[];
for(var C=0;
C<B.length;
C++){A.push(E(B[C]))
}return dojo.regexp.group(A.join("|"),D)
};
dojo.regexp.group=function(B,A){return"("+(A?"?:":"")+B+")"
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function B(E,D,F){return F.replace(/([a-z])\1*/ig,function(S){var W;
var V=S.charAt(0);
var N=S.length;
var K;
var L=["abbr","wide","narrow"];
switch(V){case"G":W=D[(N<4)?"eraAbbr":"eraNames"][E.getFullYear()<0?0:1];
break;
case"y":W=E.getFullYear();
switch(N){case 1:break;
case 2:W=String(W);
W=W.substr(W.length-2);
break;
default:K=true
}break;
case"Q":case"q":W=Math.ceil((E.getMonth()+1)/3);
K=true;
break;
case"M":case"L":var M=E.getMonth();
var I;
switch(N){case 1:case 2:W=M+1;
K=true;
break;
case 3:case 4:case 5:I=L[N-3];
break
}if(I){var U=(V=="L")?"standalone":"format";
var H=["months",U,I].join("-");
W=D[H][M]
}break;
case"w":var G=0;
W=dojo.date.locale._getWeekOfYear(E,G);
K=true;
break;
case"d":W=E.getDate();
K=true;
break;
case"D":W=dojo.date.locale._getDayOfYear(E);
K=true;
break;
case"E":case"e":case"c":var T=E.getDay();
var I;
switch(N){case 1:case 2:if(V=="e"){var R=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
T=(T-R+7)%7
}if(V!="c"){W=T+1;
K=true;
break
}case 3:case 4:case 5:I=L[N-3];
break
}if(I){var U=(V=="c")?"standalone":"format";
var H=["days",U,I].join("-");
W=D[H][T]
}break;
case"a":var J=(E.getHours()<12)?"am":"pm";
W=D[J];
break;
case"h":case"H":case"K":case"k":var Q=E.getHours();
switch(V){case"h":W=(Q%12)||12;
break;
case"H":W=Q;
break;
case"K":W=(Q%12);
break;
case"k":W=Q||24;
break
}K=true;
break;
case"m":W=E.getMinutes();
K=true;
break;
case"s":W=E.getSeconds();
K=true;
break;
case"S":W=Math.round(E.getMilliseconds()*Math.pow(10,N-3));
break;
case"v":case"z":W=dojo.date.getTimezoneName(E);
if(W){break
}N=4;
case"Z":var P=E.getTimezoneOffset();
var O=[(P<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(P)/60),2),dojo.string.pad(Math.abs(P)%60,2)];
if(N==4){O.splice(0,0,"GMT");
O.splice(3,0,":")
}W=O.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+F)
}if(K){W=dojo.string.pad(W,N)
}return W
})
}dojo.date.locale.format=function(F,L){L=L||{};
var I=dojo.i18n.normalizeLocale(L.locale);
var M=L.formatLength||"short";
var N=dojo.date.locale._getGregorianBundle(I);
var G=[];
var E=dojo.hitch(this,B,F,N);
if(L.selector=="year"){var H=F.getFullYear();
if(I.match(/^zh|^ja/)){H+="\u5E74"
}return H
}if(L.selector!="time"){var D=L.datePattern||N["dateFormat-"+M];
if(D){G.push(C(D,E))
}}if(L.selector!="date"){var K=L.timePattern||N["timeFormat-"+M];
if(K){G.push(C(K,E))
}}var J=G.join(" ");
return J
};
dojo.date.locale.regexp=function(D){return dojo.date.locale._parseInfo(D).regexp
};
dojo.date.locale._parseInfo=function(I){I=I||{};
var G=dojo.i18n.normalizeLocale(I.locale);
var K=dojo.date.locale._getGregorianBundle(G);
var J=I.formatLength||"short";
var D=I.datePattern||K["dateFormat-"+J];
var L=I.timePattern||K["timeFormat-"+J];
var E;
if(I.selector=="date"){E=D
}else{if(I.selector=="time"){E=L
}else{E=D+" "+L
}}var F=[];
var H=C(E,dojo.hitch(this,A,F,K,I));
return{regexp:H,tokens:F,bundle:K}
};
dojo.date.locale.parse=function(K,N){var D=dojo.date.locale._parseInfo(N);
var H=D.tokens,O=D.bundle;
var L=new RegExp("^"+D.regexp+"$");
var F=L.exec(K);
if(!F){return null
}var E=["abbr","wide","narrow"];
var M=new Date(1972,0);
var G={};
var J="";
dojo.forEach(F,function(b,V){if(!V){return 
}var S=H[V-1];
var T=S.length;
switch(S.charAt(0)){case"y":if(T!=2){M.setFullYear(b);
G.year=b
}else{if(b<100){b=Number(b);
var a=""+new Date().getFullYear();
var U=a.substring(0,2)*100;
var X=Number(a.substring(2,4));
var Q=Math.min(X+20,99);
var W=(b<Q)?U+b:U-100+b;
M.setFullYear(W);
G.year=W
}else{if(N.strict){return null
}M.setFullYear(b);
G.year=b
}}break;
case"M":if(T>2){var P=O["months-format-"+E[T-3]].concat();
if(!N.strict){b=b.replace(".","").toLowerCase();
P=dojo.map(P,function(d){return d.replace(".","").toLowerCase()
})
}b=dojo.indexOf(P,b);
if(b==-1){return null
}}else{b--
}M.setMonth(b);
G.month=b;
break;
case"E":case"e":var c=O["days-format-"+E[T-3]].concat();
if(!N.strict){b=b.toLowerCase();
c=dojo.map(c,"".toLowerCase)
}b=dojo.indexOf(c,b);
if(b==-1){return null
}break;
case"d":M.setDate(b);
G.date=b;
break;
case"D":M.setMonth(0);
M.setDate(b);
break;
case"a":var Y=N.am||O.am;
var R=N.pm||O.pm;
if(!N.strict){var Z=/\./g;
b=b.replace(Z,"").toLowerCase();
Y=Y.replace(Z,"").toLowerCase();
R=R.replace(Z,"").toLowerCase()
}if(N.strict&&b!=Y&&b!=R){return null
}J=(b==R)?"p":(b==Y)?"a":"";
break;
case"K":if(b==24){b=0
}case"h":case"H":case"k":if(b>23){return null
}M.setHours(b);
break;
case"m":M.setMinutes(b);
break;
case"s":M.setSeconds(b);
break;
case"S":M.setMilliseconds(b)
}});
var I=M.getHours();
if(J==="p"&&I<12){M.setHours(I+12)
}else{if(J==="a"&&I==12){M.setHours(0)
}}if(G.year&&M.getFullYear()!=G.year){return null
}if(G.month&&M.getMonth()!=G.month){return null
}if(G.date&&M.getDate()!=G.date){return null
}return M
};
function C(H,D,J,G){var E=function(K){return K
};
D=D||E;
J=J||E;
G=G||E;
var I=H.match(/(''|[^'])+/g);
var F=false;
dojo.forEach(I,function(K,L){if(!K){I[L]=""
}else{I[L]=(F?J:D)(K);
F=!F
}});
return G(I.join(""))
}function A(G,D,E,F){F=dojo.regexp.escapeString(F);
if(!E.strict){F=F.replace(" a"," ?a")
}return F.replace(/([a-z])\1*/ig,function(I){var K;
var O=I.charAt(0);
var H=I.length;
var N="",M="";
if(E.strict){if(H>1){N="0{"+(H-1)+"}"
}if(H>2){M="0{"+(H-2)+"}"
}}else{N="0?";
M="0{0,2}"
}switch(O){case"y":K="\\d{2,4}";
break;
case"M":K=(H>2)?"\\S+":N+"[1-9]|1[0-2]";
break;
case"D":K=N+"[1-9]|"+M+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":K=N+"[1-9]|[12]\\d|3[01]";
break;
case"w":K=N+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":K="\\S+";
break;
case"h":K=N+"[1-9]|1[0-2]";
break;
case"k":K=N+"\\d|1[01]";
break;
case"H":K=N+"\\d|1\\d|2[0-3]";
break;
case"K":K=N+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":K="[0-5]\\d";
break;
case"S":K="\\d{"+H+"}";
break;
case"a":var L=E.am||D.am||"AM";
var J=E.pm||D.pm||"PM";
if(E.strict){K=L+"|"+J
}else{K=L+"|"+J;
if(L!=L.toLowerCase()){K+="|"+L.toLowerCase()
}if(J!=J.toLowerCase()){K+="|"+J.toLowerCase()
}}break;
default:K=".*"
}if(G){G.push(I)
}return"("+K+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var A=[];
dojo.date.locale.addCustomFormats=function(B,C){A.push({pkg:B,name:C})
};
dojo.date.locale._getGregorianBundle=function(B){var C={};
dojo.forEach(A,function(E){var D=dojo.i18n.getLocalization(E.pkg,E.name,B);
C=dojo.mixin(C,D)
},this);
return C
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(F,E,B,A){var C;
var G=dojo.date.locale._getGregorianBundle(A);
var D=[F,B,E];
if(B=="standAlone"){C=G[D.join("-")]
}D[1]="format";
return(C||G[D.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(D,A){var C=dojo.cldr.supplemental.getWeekend(A);
var B=(D||new Date()).getDay();
if(C.end<C.start){C.end+=7;
if(B<C.start){B+=7
}}return B>=C.start&&B<=C.end
};
dojo.date.locale._getDayOfYear=function(A){return dojo.date.difference(new Date(A.getFullYear(),0,1),A)+1
};
dojo.date.locale._getWeekOfYear=function(E,B){if(arguments.length==1){B=0
}var C=new Date(E.getFullYear(),0,1).getDay();
var A=(C-B+7)%7;
var D=Math.floor((dojo.date.locale._getDayOfYear(E)+A-1)/7);
if(C==B){D++
}return D
}
}if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templatePath:dojo.moduleUrl("dijit","templates/Calendar.html"),value:new Date(),dayWidth:"narrow",setValue:function(A){if(!this.value||dojo.date.compare(A,this.value)){A=new Date(A);
this.displayMonth=new Date(A);
if(!this.isDisabledDate(A,this.lang)){this.value=A;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(A,B){while(A.firstChild){A.removeChild(A.firstChild)
}A.appendChild(document.createTextNode(B))
},_populateGrid:function(){var F=this.displayMonth;
F.setDate(1);
var A=F.getDay();
var B=dojo.date.getDaysInMonth(F);
var I=dojo.date.getDaysInMonth(dojo.date.add(F,"month",-1));
var G=new Date();
var C=this.value;
var K=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(K>A){K-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(Q,P){P+=K;
var O=new Date(F);
var R,N="dijitCalendar",L=0;
if(P<A){R=I-A+P+1;
L=-1;
N+="Previous"
}else{if(P>=(A+B)){R=P-A-B+1;
L=1;
N+="Next"
}else{R=P-A+1;
N+="Current"
}}if(L){O=dojo.date.add(O,"month",L)
}O.setDate(R);
if(!dojo.date.compare(O,G,"date")){N="dijitCalendarCurrentDate "+N
}if(!dojo.date.compare(O,C,"date")){N="dijitCalendarSelectedDate "+N
}if(this.isDisabledDate(O,this.lang)){N="dijitCalendarDisabledDate "+N
}Q.className=N+"Month dijitCalendarDateTemplate";
Q.dijitDateValue=O.valueOf();
var M=dojo.query(".dijitCalendarDateLabel",Q)[0];
this._setText(M,O.getDate())
},this);
var D=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,D[F.getMonth()]);
var H=F.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(L){this._setText(this[L+"YearLabelNode"],dojo.date.locale.format(new Date(H++,0),{selector:"year",locale:this.lang}))
},this);
var E=this;
var J=function(M,N,L){dijit.typematic.addMouseListener(E[M],E,function(O){if(O>=0){E._adjustDisplay(N,L)
}},0.8,500)
};
J("incrementMonth","month",1);
J("decrementMonth","month",-1);
J("nextYearLabelNode","year",1);
J("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var B=dojo.hitch(this,function(E,H){var G=dojo.query(E,this.domNode)[0];
for(var F=0;
F<H;
F++){G.parentNode.appendChild(G.cloneNode(true))
}});
B(".dijitCalendarDayLabelTemplate",6);
B(".dijitCalendarDateTemplate",6);
B(".dijitCalendarWeekTemplate",5);
var D=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var A=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(E,F){this._setText(E,D[(F+A)%7])
},this);
var C=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(C,function(F){var E=dojo.doc.createElement("div");
this._setText(E,F);
this.monthLabelSpacer.appendChild(E)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(A,B){this.displayMonth=dojo.date.add(this.displayMonth,A,B);
this._populateGrid()
},_onDayClick:function(A){var B=A.target;
dojo.stopEvent(A);
while(!B.dijitDateValue){B=B.parentNode
}if(!dojo.hasClass(B,"dijitCalendarDisabledDate")){this.setValue(B.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(A){},onChange:function(A){},isDisabledDate:function(B,A){return false
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
},_checkIfSingleChild:function(){var B=dojo.query(">",this.containerNode||this.domNode),A=B.filter("[widgetId]");
if(B.length==1&&A.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(A[0])
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
},resize:function(A){dojo.marginBox(this.domNode,A);
var B=this.containerNode||this.domNode,C=dojo.mixin(dojo.marginBox(B),A||{});
this._contentBox=dijit.layout.marginBox2contentBox(B,C);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(A){this.cancel();
this.isLoaded=false;
this._loadCheck(A)
},_loadCheck:function(B){var A=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(B||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&A&&!this._xhrDfd)||(!this.isLoaded&&A&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var B=this;
var C={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(C,this.ioArgs)
}var A=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(C);
A.addCallback(function(D){try{B.onDownloadEnd.call(B);
B._isDownloaded=true;
B.setContent.call(B,D)
}catch(E){B._onError.call(B,"Content",E)
}delete B._xhrDfd;
return D
});
A.addErrback(function(D){if(!A.cancelled){B._onError.call(B,"Download",D)
}delete B._xhrDfd;
return D
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(A){this.destroyDescendants();
try{var B=this.containerNode||this.domNode;
while(B.firstChild){dojo._destroyElement(B.firstChild)
}if(typeof A=="string"){if(this.extractContent){match=A.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){A=match[1]
}}B.innerHTML=A
}else{if(A.nodeType){B.appendChild(A)
}else{dojo.forEach(A,function(E){B.appendChild(E.cloneNode(true))
})
}}}catch(D){var C=this.onContentError(D);
try{B.innerHTML=C
}catch(D){console.error("Fatal "+this.id+" could not change content due to "+D.message,D)
}}},_onError:function(B,D,A){var C=this["on"+B+"Error"].call(this,D);
if(A){console.error(A,D)
}else{if(C){this._setContent.call(this,C)
}}},_createSubWidgets:function(){var A=this.containerNode||this.domNode;
try{dojo.parser.parse(A,true)
}catch(B){this._onError("Content",B,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(A){},onUnload:function(A){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(A){},onDownloadError:function(A){return this.errorMessage
},onDownloadEnd:function(){}})
}if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(A){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(A){dojo.stopEvent(A);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(E){var D={};
dojo.forEach(this.getDescendants(),function(G){if(!G.name){return 
}var F=D[G.name]||(D[G.name]=[]);
F.push(G)
});
for(var B in D){var C=D[B],A=dojo.getObject(B,false,E);
if(!dojo.isArray(A)){A=[A]
}if(C[0].setChecked){dojo.forEach(C,function(F,G){F.setChecked(dojo.indexOf(A,F.value)!=-1)
})
}else{dojo.forEach(C,function(F,G){F.setValue(A[G])
})
}}},getValues:function(){var A={};
dojo.forEach(this.getDescendants(),function(E){var D=E.getValue?E.getValue():E.value;
var B=E.name;
if(!B){return 
}if(E.setChecked){if(/Radio/.test(E.declaredClass)){if(E.checked){dojo.setObject(B,D,A)
}}else{var C=dojo.getObject(B,false,A);
if(!C){C=[];
dojo.setObject(B,C,A)
}if(E.checked){C.push(D)
}}}else{dojo.setObject(B,D,A)
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
},layout:function(){var A=dijit.getViewport();
var C=this.node.style,D=this.domNode.style;
D.top=A.t+"px";
D.left=A.l+"px";
C.width=A.w+"px";
C.height=A.h+"px";
var B=dijit.getViewport();
if(A.w!=B.w){C.width=B.w+"px"
}if(A.h!=B.h){C.height=B.h+"px"
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
}var A=dijit.getViewport();
var C=dojo.marginBox(this.domNode);
var B=this.domNode.style;
B.left=Math.floor((A.l+(A.w-C.w)/2))+"px";
B.top=Math.floor((A.t+(A.h-C.h)/2))+"px"
},_findLastFocus:function(A){this._lastFocused=A.target
},_cycleFocus:function(A){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(A){if(A.keyCode){var B=A.target;
if(B==this.titleBar&&A.shiftKey&&A.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(A)
}else{while(B){if(B==this.domNode){if(A.keyCode==dojo.keys.ESCAPE){this.hide()
}else{return 
}}B=B.parentNode
}if(A.keyCode!=dojo.keys.TAB){dojo.stopEvent(A)
}else{if(!dojo.isOpera){try{this.titleBar.focus()
}catch(C){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
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
},_onButtonClick:function(D){dojo.stopEvent(D);
var C=this._onClick(D)!==false;
if(this.type=="submit"&&C){for(var A=this.domNode;
A;
A=A.parentNode){var B=dijit.byNode(A);
if(B&&B._onSubmit){B._onSubmit(D);
break
}if(A.tagName.toLowerCase()=="form"){if(!A.onsubmit||A.onsubmit()){A.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var A="";
this.label=this.containerNode.innerHTML;
A=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=A;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(A){return true
},_clicked:function(A){},setLabel:function(A){this.containerNode.innerHTML=this.label=A;
if(dojo.isMozilla){var B=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var C=this;
setTimeout(function(){C.domNode.style.display=B
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
},_onDropDownClick:function(B){var A=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!A||B.detail!=0||this._seenKeydown){this._onArrowClick(B)
}this._seenKeydown=false
},_onDropDownKeydown:function(A){this._seenKeydown=true
},_onDropDownBlur:function(A){this._seenKeydown=false
},_onKey:function(A){if(this.disabled){return 
}if(A.keyCode==dojo.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){dojo.stopEvent(A);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var C=this.dropDown;
if(!C){return false
}if(!C.isShowingNow){if(C.href&&!C.isLoaded){var A=this;
var B=dojo.connect(C,"onLoad",function(){dojo.disconnect(B);
A._openDropDown()
});
C._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var E=this.dropDown;
var B=E.domNode.style.width;
var C=this;
dijit.popup.open({parent:this,popup:E,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){C._closeDropDown(true)
},onCancel:function(){C._closeDropDown(true)
},onClose:function(){E.domNode.style.width=B;
C.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>E.domNode.offsetWidth){var D=null;
if(!this.isLeftToRight()){D=E.domNode.parentNode;
var A=D.offsetLeft+D.offsetWidth
}dojo.marginBox(E.domNode,{w:this.domNode.offsetWidth});
if(D){D.style.left=A-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(E.focus){E.focus()
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
}},_iframeContentWindow:function(A){var B=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(A))||dijit.Menu._iframeContentDocument(A)["__parent__"]||(A.name&&document.frames[A.name])||null;
return B
},_iframeContentDocument:function(A){var B=A.contentDocument||(A.contentWindow&&A.contentWindow.document)||(A.name&&document.frames[A.name]&&document.frames[A.name].document)||null;
return B
},bindDomNode:function(A){A=dojo.byId(A);
var B=dijit.getDocumentWindow(A.ownerDocument);
if(A.tagName.toLowerCase()=="iframe"){B=this._iframeContentWindow(A);
A=dojo.withGlobal(B,dojo.body)
}var C=(A==dojo.body()?dojo.doc:A);
A[this.id]=this._bindings.push([dojo.connect(C,"oncontextmenu",this,"_openMyself"),dojo.connect(C,"onkeydown",this,"_contextKey"),dojo.connect(C,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(D){var C=dojo.byId(D);
var B=C[this.id]-1,A=this._bindings[B];
dojo.forEach(A,dojo.disconnect);
delete this._bindings[B]
},_contextKey:function(B){this._contextMenuWithMouse=false;
if(B.keyCode==dojo.keys.F10){dojo.stopEvent(B);
if(B.shiftKey&&B.type=="keydown"){var A={target:B.target,pageX:B.pageX,pageY:B.pageY};
A.preventDefault=A.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(A)
}),1)
}}},_contextMouse:function(A){this._contextMenuWithMouse=true
},_openMyself:function(F){dojo.stopEvent(F);
var A,G;
if(dojo.isSafari||this._contextMenuWithMouse){A=F.pageX;
G=F.pageY
}else{var E=dojo.coords(F.target,true);
A=E.x+10;
G=E.y+10
}var C=this;
var B=dijit.getFocus(this);
function D(){dijit.focus(B);
dijit.popup.close(C)
}dijit.popup.open({popup:this,x:A,y:G,onExecute:D,onCancel:D,orient:this.isLeftToRight()?"L":"R"});
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
var A=this.focusedChild;
var B=A.popup;
if(B.isShowingNow){return 
}B.parentMenu=this;
var C=this;
dijit.popup.open({parent:this,popup:B,around:A.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(B);
A.focus();
C.currentPopup=null
}});
this.currentPopup=B;
if(B.focus){B.focus()
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
},show:function(D,A){if(this.aroundNode&&this.aroundNode===A){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=D;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var C=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var B=dijit.placeOnScreenAroundElement(this.domNode,A,C);
this.domNode.className="dijitTooltip dijitTooltip"+(B.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=A
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
dijit.showTooltip=function(B,A){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(B,A)
};
dijit.hideTooltip=function(A){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(A)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(B){var A=dojo.byId(B);
if(A){this._connectNodes.push(A);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(C){this.connect(A,C.toLowerCase(),"_"+C)
},this);
if(dojo.isIE){A.style.zoom=1
}}},this)
},_onMouseOver:function(A){this._onHover(A)
},_onMouseOut:function(A){if(dojo.isDescendant(A.relatedTarget,A.target)){return 
}this._onUnHover(A)
},_onFocus:function(A){this._focus=true;
this._onHover(A)
},_onBlur:function(A){this._focus=false;
this._onUnHover(A)
},_onHover:function(B){if(!this._showTimer){var A=B.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(A)
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
},setValue:function(D,C,B){var A=this.filter(D);
if((typeof A==typeof D)&&(B==null||B==undefined)){B=this.format(A,this.constraints)
}if(B!=null&&B!=undefined){this.textbox.value=B
}dijit.form.TextBox.superclass.setValue.call(this,A,C)
},setDisplayedValue:function(A){this.textbox.value=A;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(A,B){return((A==null||A==undefined)?"":(A.toString?A.toString():A))
},parse:function(A,B){return A
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){dojo.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var B=this.domNode;
var A=B.style.opacity;
B.style.opacity="0.999";
setTimeout(function(){B.style.opacity=A
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
},validator:function(A,B){return(new RegExp("^("+this.regExpGen(B)+")"+(this.required?"":"?")+"$")).test(A)&&(!this.required||!this._isEmpty(A))&&(this._isEmpty(A)||this.parse(A,B)!==null)
},isValid:function(A){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(A){return/^\s*$/.test(A)
},getErrorMessage:function(A){return this.invalidMessage
},getPromptMessage:function(A){return this.promptMessage
},validate:function(A){var B="";
var C=this.isValid(A);
var D=this._isEmpty(this.textbox.value);
this.state=(C||(!this._hasBeenBlurred&&D))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(C?"false":"true"));
if(A){if(D){B=this.getPromptMessage(true)
}if(!B&&!C){B=this.getErrorMessage(true)
}}this._displayMessage(B)
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
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(B,A){return(B.toString?B.toString():"")
},toString:function(){var A=this.filter(this.getValue());
return(A!=null)?((typeof A=="string")?A:this.serialize(A,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var B=this.textbox;
var A=(this.valueNode=document.createElement("input"));
A.setAttribute("type",B.type);
A.setAttribute("value",this.toString());
dojo.style(A,"display","none");
A.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(A,B,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(B,A){return B-A
},rangeCheck:function(A,D){var C=(typeof D.min!="undefined");
var B=(typeof D.max!="undefined");
if(C||B){return(!C||this.compare(A,D.min)>=0)&&(!B||this.compare(A,D.max)<=0)
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
},_getCaretPos:function(A){if(typeof (A.selectionStart)=="number"){return A.selectionStart
}else{if(dojo.isIE){var C=document.selection.createRange().duplicate();
var B=A.createTextRange();
C.move("character",0);
B.move("character",0);
try{B.setEndPoint("EndToEnd",C);
return String(B.text).replace(/\r/g,"").length
}catch(D){return 0
}}}},_setCaretPos:function(B,A){A=parseInt(A);
this._setSelectedRange(B,A,A)
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
}}}},onkeypress:function(A){if(A.altKey||(A.ctrlKey&&A.charCode!=118)){return 
}var C=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(A)
}switch(A.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
C=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(A);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(A);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var D;
if(this._isShowingNow&&(D=this._popupWidget.getHighlightedOption())){if(D==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(A);
break
}else{if(D==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(A);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}A.preventDefault();
case dojo.keys.TAB:var B=this.getDisplayedValue();
if(this._popupWidget&&(B==this._popupWidget._messages.previousMessage||B==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(A);
this._selectOption();
this._hideResultList()
}else{C=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(A)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
C=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||A.charCode!=0){C=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(C){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(A){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(A))){var B=this._getCaretPos(this.focusNode);
if((B+1)>this.focusNode.value.length){this.focusNode.value=A;
this._setSelectedRange(this.focusNode,B,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",A)
}}else{this.focusNode.value=A;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",A)
}},_openResultList:function(A,B){if(this.disabled||B.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!A.length){this._hideResultList();
return 
}var C=new String(this.store.getValue(A[0],this.searchAttr));
if(C&&this.autoComplete&&!this._prev_key_backspace&&(B.query[this.searchAttr]!="*")){this._autoCompleteText(C);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",C)
}this._popupWidget.createOptions(A,B,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(B.direction){if(B.direction==1){this._popupWidget.highlightFirstOption()
}else{if(B.direction==-1){this._popupWidget.highlightLastOption()
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
},_announceOption:function(A){if(A==null){return 
}var B;
if(A==this._popupWidget.nextButton||A==this._popupWidget.previousButton){B=A.innerHTML
}else{B=this.store.getValue(A.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(B)
},_selectOption:function(A){var B=null;
if(!A){A={target:this._popupWidget.getHighlightedOption()}
}if(!A.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{B=A.target
}if(!A.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(B.item,this.searchAttr).length)
}this._doSelect(B)
},_doSelect:function(A){this.item=A.item;
this.setValue(this.store.getValue(A.item,this.searchAttr),true)
},_onArrowMouseDown:function(A){if(this.disabled){return 
}dojo.stopEvent(A);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(A){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var C=this.query;
this._lastQuery=C[this.searchAttr]=A+"*";
var B=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:C,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function D(E,F){E.start+=E.count*F;
E.direction=F;
E.store.fetch(E)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,D,B)
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
},_createOption:function(C,B){var A=B(C);
var D=document.createElement("div");
if(A.html){D.innerHTML=A.label
}else{D.appendChild(document.createTextNode(A.label))
}if(D.innerHTML==""){D.innerHTML="&nbsp;"
}D.item=C;
return D
},createOptions:function(B,C,A){this.previousButton.style.display=C.start==0?"none":"";
var D=this;
dojo.forEach(B,function(E){var F=D._createOption(E,A);
F.className="dijitMenuItem";
D.domNode.insertBefore(F,D.nextButton)
});
this.nextButton.style.display=C.count==B.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(A){dojo.stopEvent(A)
},onmouseup:function(A){if(A.target===this.domNode){return 
}else{if(A.target==this.previousButton){this.onPage(-1)
}else{if(A.target==this.nextButton){this.onPage(1)
}else{var B=A.target;
while(!B.item){B=B.parentNode
}this.setValue({target:B},true)
}}}},onmouseover:function(A){if(A.target===this.domNode){return 
}var B=A.target;
if(!(B==this.previousButton||B==this.nextButton)){while(!B.item){B=B.parentNode
}}this._focusOptionNode(B)
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
},_page:function(B){var E=0;
var C=this.domNode.scrollTop;
var A=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(E<A){if(B){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var D=this.domNode.scrollTop;
E+=(D-C)*(B?-1:1);
C=D
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