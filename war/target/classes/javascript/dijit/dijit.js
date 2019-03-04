if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var C=dojo.global;
var B=dojo.doc;
if(B.selection){return !B.selection.createRange().text
}else{if(C.getSelection){var A=C.getSelection();
if(dojo.isString(A)){return !A
}else{return A.isCollapsed||!A.toString()
}}}},getBookmark:function(){var C,B=dojo.doc.selection;
if(B){var A=B.createRange();
if(B.type.toUpperCase()=="CONTROL"){C=A.length?dojo._toArray(A):null
}else{C=A.getBookmark()
}}else{if(dojo.global.getSelection){B=dojo.global.getSelection();
if(B){var A=B.getRangeAt(0);
C=A.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return C
},moveToBookmark:function(C){var B=dojo.doc;
if(B.selection){var A;
if(dojo.isArray(C)){A=B.body.createControlRange();
dojo.forEach(C,A.addElement)
}else{A=B.selection.createRange();
A.moveToBookmark(C)
}A.select()
}else{var D=dojo.global.getSelection&&dojo.global.getSelection();
if(D&&D.removeAllRanges){D.removeAllRanges();
D.addRange(C)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(B,A){return{node:B&&dojo.isDescendant(dijit._curFocus,B.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(A||dojo.global,dijit.isCollapsed)?dojo.withGlobal(A||dojo.global,dijit.getBookmark):null,openedForWindow:A}
},focus:function(B){if(!B){return 
}var A="node" in B?B.node:B,F=B.bookmark,E=B.openedForWindow;
if(A){var D=(A.tagName.toLowerCase()=="iframe")?A.contentWindow:A;
if(D&&D.focus){try{D.focus()
}catch(C){}}dijit._onFocusNode(A)
}if(F&&dojo.withGlobal(E||dojo.global,dijit.isCollapsed)){if(E){E.focus()
}try{dojo.withGlobal(E||dojo.global,moveToBookmark,null,[F])
}catch(C){}}},_activeStack:[],registerWin:function(B){if(!B){B=window
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
},_onFocusNode:function(A){if(A&&A.tagName&&A.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(A);
if(A==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=A;
dojo.publish("focusNode",[A]);
var B=dijit.getEnclosingWidget(A);
if(B&&B._setStateClass){B._focused=true;
B._setStateClass()
}},_setStack:function(A){var E=dijit._activeStack;
dijit._activeStack=A;
for(var D=0;
D<Math.min(E.length,A.length);
D++){if(E[D]!=A[D]){break
}}for(var B=E.length-1;
B>=D;
B--){var C=dijit.byId(E[B]);
if(C){dojo.publish("widgetBlur",[C]);
if(C._onBlur){C._onBlur()
}}}for(var B=D;
B<A.length;
B++){var C=dijit.byId(A[B]);
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
dijit.getViewport=function(){var D=dojo.global;
var C=dojo.doc;
var I=0,A=0;
if(dojo.isMozilla){var H,G,F,E;
if(C.body.clientWidth>C.documentElement.clientWidth){H=C.documentElement.clientWidth;
F=C.body.clientWidth
}else{F=C.documentElement.clientWidth;
H=C.body.clientWidth
}if(C.body.clientHeight>C.documentElement.clientHeight){G=C.documentElement.clientHeight;
E=C.body.clientHeight
}else{E=C.documentElement.clientHeight;
G=C.body.clientHeight
}I=(F>D.innerWidth)?H:F;
A=(E>D.innerHeight)?G:E
}else{if(!dojo.isOpera&&D.innerWidth){I=D.innerWidth;
A=D.innerHeight
}else{if(dojo.isIE&&C.documentElement&&C.documentElement.clientHeight){I=C.documentElement.clientWidth;
A=C.documentElement.clientHeight
}else{if(dojo.body().clientWidth){I=dojo.body().clientWidth;
A=dojo.body().clientHeight
}}}}var B=dojo._docScroll();
return{w:I,h:A,l:B.x,t:B.y}
};
dijit.placeOnScreen=function(D,E,C,B){var A=dojo.map(C,function(F){return{corner:F,pos:E}
});
return dijit._place(D,A)
};
dijit._place=function(G,E,D){var C=dijit.getViewport();
if(!G.parentNode||String(G.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(G)
}var B=null;
for(var R=0;
R<E.length;
R++){var I=E[R].corner;
var J=E[R].pos;
if(D){D(I)
}var H=G.style.display;
var F=G.style.visibility;
G.style.visibility="hidden";
G.style.display="";
var A=dojo.marginBox(G);
G.style.display=H;
G.style.visibility=F;
var Q=(I.charAt(1)=="L"?J.x:Math.max(C.l,J.x-A.w)),P=(I.charAt(0)=="T"?J.y:Math.max(C.t,J.y-A.h)),O=(I.charAt(1)=="L"?Math.min(C.l+C.w,Q+A.w):J.x),N=(I.charAt(0)=="T"?Math.min(C.t+C.h,P+A.h):J.y),M=O-Q,L=N-P,K=(A.w-M)+(A.h-L);
if(B==null||K<B.overflow){B={corner:I,aroundCorner:E[R].aroundCorner,x:Q,y:P,w:M,h:L,overflow:K}
}if(K==0){break
}}G.style.left=B.x+"px";
G.style.top=B.y+"px";
return B
};
dijit.placeOnScreenAroundElement=function(F,D,A,J){D=dojo.byId(D);
var I=D.style.display;
D.style.display="";
var H=D.offsetWidth;
var G=D.offsetHeight;
var E=dojo.coords(D,true);
D.style.display=I;
var C=[];
for(var B in A){C.push({aroundCorner:B,corner:A[B],pos:{x:E.x+(B.charAt(1)=="L"?0:H),y:E.y+(B.charAt(0)=="T"?0:G)}})
}return dijit._place(F,C,J)
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
dijit.popup=new function(){var C=[],B=1000,A=1;
this.open=function(G){var M=G.popup,L=G.orient||{BL:"TL",TL:"BL"},K=G.around,E=(G.around&&G.around.id)?(G.around.id+"_dropdown"):("popup_"+A++);
var J=dojo.doc.createElement("div");
J.id=E;
J.className="dijitPopup";
J.style.zIndex=B+C.length;
J.style.visibility="hidden";
if(G.parent){J.dijitPopupParent=G.parent.id
}dojo.body().appendChild(J);
M.domNode.style.display="";
J.appendChild(M.domNode);
var H=new dijit.BackgroundIframe(J);
var I=K?dijit.placeOnScreenAroundElement(J,K,L,M.orient?dojo.hitch(M,"orient"):null):dijit.placeOnScreen(J,G,L=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
J.style.visibility="visible";
var F=[];
function D(){for(var N=C.length-1;
N>0&&C[N].parent===C[N-1].widget;
N--){}return C[N]
}F.push(dojo.connect(J,"onkeypress",this,function(N){if(N.keyCode==dojo.keys.ESCAPE&&G.onCancel){G.onCancel()
}else{if(N.keyCode==dojo.keys.TAB){dojo.stopEvent(N);
var O=D();
if(O&&O.onCancel){O.onCancel()
}}}}));
if(M.onCancel){F.push(dojo.connect(M,"onCancel",null,G.onCancel))
}F.push(dojo.connect(M,M.onExecute?"onExecute":"onChange",null,function(){var N=D();
if(N&&N.onExecute){N.onExecute()
}}));
C.push({wrapper:J,iframe:H,widget:M,parent:G.parent,onExecute:G.onExecute,onCancel:G.onCancel,onClose:G.onClose,handlers:F});
if(M.onOpen){M.onOpen(I)
}return I
};
this.close=function(G){while(dojo.some(C,function(J){return J.widget==G
})){var I=C.pop(),D=I.wrapper,H=I.iframe,F=I.widget,E=I.onClose;
if(F.onClose){F.onClose()
}dojo.forEach(I.handlers,dojo.disconnect);
if(!F||!F.domNode){return 
}dojo.style(F.domNode,"display","none");
dojo.body().appendChild(F.domNode);
H.destroy();
dojo._destroyElement(D);
if(E){E()
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
dijit.scrollIntoView=function(D){if(dojo.isIE){if(dojo.marginBox(D.parentNode).h<=D.parentNode.scrollHeight){D.scrollIntoView(false)
}}else{if(dojo.isMozilla){D.scrollIntoView(false)
}else{var C=D.parentNode;
var B=C.scrollTop+dojo.marginBox(C).h;
var A=D.offsetTop+dojo.marginBox(D).h;
if(B<A){C.scrollTop+=(A-B)
}else{if(C.scrollTop>D.offsetTop){C.scrollTop-=(C.scrollTop-D.offsetTop)
}}}}}
}if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var G=dojo;
var F=G.isIE;
var E=G.isOpera;
var A=Math.floor;
var C={dj_ie:F,dj_ie6:A(F)==6,dj_ie7:A(F)==7,dj_iequirks:F&&G.isQuirks,dj_opera:E,dj_opera8:A(E)==8,dj_opera9:A(E)==9,dj_khtml:G.isKhtml,dj_safari:G.isSafari,dj_gecko:G.isMozilla};
for(var D in C){if(C[D]){var B=dojo.doc.documentElement;
if(B.className){B.className+=" "+D
}else{B.className=D
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
},trigger:function(B,E,D,C,F,A,G){if(F!=this._obj){this.stop();
this._initialDelay=G||500;
this._subsequentDelay=A||0.9;
this._obj=F;
this._evt=B;
this._node=D;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(E,C);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(E,C,B,A,F,D){return[dojo.connect(E,"onkeypress",this,function(G){if(G.keyCode==C.keyCode&&(!C.charCode||C.charCode==G.charCode)&&(C.ctrlKey===undefined||C.ctrlKey==G.ctrlKey)&&(C.altKey===undefined||C.altKey==G.ctrlKey)&&(C.shiftKey===undefined||C.shiftKey==G.ctrlKey)){dojo.stopEvent(G);
dijit.typematic.trigger(C,B,E,A,C,F,D)
}else{if(dijit.typematic._obj==C){dijit.typematic.stop()
}}}),dojo.connect(E,"onkeyup",this,function(G){if(dijit.typematic._obj==C){dijit.typematic.stop()
}})]
},addMouseListener:function(E,C,F,D,B){var A=dojo.connect;
return[A(E,"mousedown",this,function(G){dojo.stopEvent(G);
dijit.typematic.trigger(G,C,E,F,E,D,B)
}),A(E,"mouseup",this,function(G){dojo.stopEvent(G);
dijit.typematic.stop()
}),A(E,"mouseout",this,function(G){dojo.stopEvent(G);
dijit.typematic.stop()
}),A(E,"mousemove",this,function(G){dojo.stopEvent(G)
}),A(E,"dblclick",this,function(G){dojo.stopEvent(G);
if(dojo.isIE){dijit.typematic.trigger(G,C,E,F,E,D,B);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(F,C,B,A,G,E,D){return this.addKeyListener(C,B,A,G,E,D).concat(this.addMouseListener(F,A,G,E,D))
}}
}if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var B=document.createElement("div");
B.id="a11yTestNode";
B.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(B);
function A(){var C=dojo.getComputedStyle(B);
if(C){var E=C.backgroundImage;
var D=(C.borderTopColor==C.borderRightColor)||(E!=null&&(E=="none"||E=="url(invalid-url:)"));
dojo[D?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}A();
if(dojo.isIE){setInterval(A,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(A){if(A.hasAttribute){return A.hasAttribute("role")
}else{return A.getAttribute("role")?true:false
}},getWaiRole:function(C){var B=C.getAttribute("role");
if(B){var A=B.indexOf(":");
return A==-1?B:B.substring(A+1)
}else{return""
}},setWaiRole:function(B,A){if(dojo.isFF&&dojo.isFF<3){B.setAttribute("role","wairole:"+A)
}else{B.setAttribute("role",A)
}},removeWaiRole:function(A){A.removeAttribute("role")
},hasWaiState:function(B,A){if(dojo.isFF&&dojo.isFF<3){return B.hasAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{if(B.hasAttribute){return B.hasAttribute("aria-"+A)
}else{return B.getAttribute("aria-"+A)?true:false
}}},getWaiState:function(B,A){if(dojo.isFF&&dojo.isFF<3){return B.getAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{var C=B.getAttribute("aria-"+A);
return C?C:""
}},setWaiState:function(A,C,B){if(dojo.isFF&&dojo.isFF<3){A.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+C,B)
}else{A.setAttribute("aria-"+C,B)
}},removeWaiState:function(B,A){if(dojo.isFF&&dojo.isFF<3){B.removeAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{B.removeAttribute("aria-"+A)
}}})
}if(!dojo._hasResource["dijit._base"]){dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base")
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(F,E){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var D=dojo.date.stamp._isoRegExp.exec(F);
var B=null;
if(D){D.shift();
D[1]&&D[1]--;
D[6]&&(D[6]*=1000);
if(E){E=new Date(E);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(G){return E["get"+G]()
}).forEach(function(H,G){if(D[G]===undefined){D[G]=H
}})
}B=new Date(D[0]||1970,D[1]||0,D[2]||0,D[3]||0,D[4]||0,D[5]||0,D[6]||0);
var C=0;
var A=D[7]&&D[7].charAt(0);
if(A!="Z"){C=((D[8]||0)*60)+(Number(D[9])||0);
if(A!="-"){C*=-1
}}if(A){C-=B.getTimezoneOffset()
}if(C){B.setTime(B.getTime()+C*60000)
}}return B
};
dojo.date.stamp.toISOString=function(I,H){var J=function(K){return(K<10)?"0"+K:K
};
H=H||{};
var G=[];
var F=H.zulu?"getUTC":"get";
var E="";
if(H.selector!="time"){E=[I[F+"FullYear"](),J(I[F+"Month"]()+1),J(I[F+"Date"]())].join("-")
}G.push(E);
if(H.selector!="date"){var D=[J(I[F+"Hours"]()),J(I[F+"Minutes"]()),J(I[F+"Seconds"]())].join(":");
var C=I[F+"Milliseconds"]();
if(H.milliseconds){D+="."+(C<100?"0":"")+J(C)
}if(H.zulu){D+="Z"
}else{if(H.selector!="time"){var B=I.getTimezoneOffset();
var A=Math.abs(B);
D+=(B>0?"-":"+")+J(Math.floor(A/60))+":"+J(A%60)
}}G.push(D)
}return G.join("T")
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
}function C(G,F){switch(F){case"string":return G;
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
}}var B={};
function D(K){if(!B[K]){var G=E.getObject(K);
if(!E.isFunction(G)){throw new Error("Could not load class '"+K+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var J=G.prototype;
var I={};
for(var H in J){if(H.charAt(0)=="_"){continue
}var F=J[H];
I[H]=A(F)
}B[K]={cls:G,params:I}
}return B[K]
}this._functionFromScript=function(F){var J="";
var H="";
var G=F.getAttribute("args");
if(G){E.forEach(G.split(/\s*,\s*/),function(L,K){J+="var "+L+" = arguments["+K+"]; "
})
}var I=F.getAttribute("with");
if(I&&I.length){E.forEach(I.split(/\s*,\s*/),function(K){J+="with("+K+"){";
H+="}"
})
}return new Function(J+F.innerHTML+H)
};
this.instantiate=function(G){var F=[];
E.forEach(G,function(M){if(!M){return 
}var L=M.getAttribute("dojoType");
if((!L)||(!L.length)){return 
}var K=D(L);
var I=K.cls;
var H=I._noScript||I.prototype._noScript;
var W={};
var U=M.attributes;
for(var T in K.params){var S=U.getNamedItem(T);
if(!S||(!S.specified&&(!dojo.isIE||T.toLowerCase()!="value"))){continue
}var R=S.value;
switch(T){case"class":R=M.className;
break;
case"style":R=M.style&&M.style.cssText
}var P=K.params[T];
W[T]=C(R,P)
}if(!H){var N=[],V=[];
E.query("> script[type^='dojo/']",M).orphan().forEach(function(X){var a=X.getAttribute("event"),Y=X.getAttribute("type"),Z=E.parser._functionFromScript(X);
if(a){if(Y=="dojo/connect"){N.push({event:a,func:Z})
}else{W[a]=Z
}}else{V.push(Z)
}})
}var Q=I.markupFactory;
if(!Q&&I.prototype){Q=I.prototype.markupFactory
}var O=Q?Q(W,M,I):new I(W,M);
F.push(O);
var J=M.getAttribute("jsId");
if(J){E.setObject(J,O)
}if(!H){dojo.forEach(N,function(X){dojo.connect(O,X.event,null,X.func)
});
dojo.forEach(V,function(X){X.call(O)
})
}});
E.forEach(F,function(H){if(H&&(H.startup)&&((!H.getParent)||(!H.getParent()))){H.startup()
}});
return F
};
this.parse=function(G){var H=E.query("[dojoType]",G);
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
dojo.parser._nameAnonFunc=function(E,D){var C="$joinpoint";
var B=(D||dojo.parser._anon);
if(dojo.isIE){var F=E.__dojoNameCache;
if(F&&B[F]===E){return E.__dojoNameCache
}}var A="__"+dojo.parser._anonCtr++;
while(typeof B[A]!="undefined"){A="__"+dojo.parser._anonCtr++
}B[A]=E;
return A
}
}if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(B,A){this.create(B,A)
},create:function(E,D){this.srcNodeRef=dojo.byId(D);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(E){dojo.mixin(this,E)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var A in this.attributeMap){var C=this[this.attributeMap[A]||"domNode"];
var B=this[A];
if(typeof B!="object"&&(B!==""||(E&&E[A]))){switch(A){case"class":dojo.addClass(C,B);
break;
case"style":if(C.style.cssText){C.style.cssText+="; "+B
}else{C.style.cssText=B
}break;
default:C.setAttribute(A,B)
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
},nodesWithKeyClick:["input","button"],connect:function(D,C,A){var E=[];
if(C=="ondijitclick"){var B=this;
if(!this.nodesWithKeyClick[D.nodeName]){E.push(dojo.connect(D,"onkeydown",this,function(F){if(F.keyCode==dojo.keys.ENTER){return(dojo.isString(A))?B[A](F):A.call(B,F)
}else{if(F.keyCode==dojo.keys.SPACE){dojo.stopEvent(F)
}}}));
E.push(dojo.connect(D,"onkeyup",this,function(F){if(F.keyCode==dojo.keys.SPACE){return dojo.isString(A)?B[A](F):A.call(B,F)
}}))
}C="onclick"
}E.push(dojo.connect(D,C,this,A));
this._connects.push(E);
return E
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
dojo.string.substitute=function(A,D,C,B){return A.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(G,H,E){var F=dojo.getObject(H,false,D);
if(E){F=dojo.getObject(E,false,B)(F)
}if(C){F=C(F,H)
}return F.toString()
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
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var G=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var D;
if(dojo.isString(G)){var F=this.declaredClass,C=this;
var A=dojo.string.substitute(G,this,function(I,H){if(H.charAt(0)=="!"){I=C[H.substr(1)]
}if(typeof I=="undefined"){throw new Error(F+" template:"+H)
}if(!I){return""
}return H.charAt(0)=="!"?I:I.toString().replace(/"/g,"&quot;")
},this);
D=dijit._Templated._createNodesFromText(A)[0]
}else{D=G.cloneNode(true)
}this._attachTemplateNodes(D);
var E=this.srcNodeRef;
if(E&&E.parentNode){E.parentNode.replaceChild(D,E)
}this.domNode=D;
if(this.widgetsInTemplate){var B=dojo.parser.parse(D);
this._attachTemplateNodes(B,function(I,H){return I[H]
})
}this._fillContent(E)
},_fillContent:function(B){var A=this.containerNode;
if(B&&A){while(B.hasChildNodes()){A.appendChild(B.firstChild)
}}},_attachTemplateNodes:function(O,N){N=N||function(R,Q){return R.getAttribute(Q)
};
var L=dojo.isArray(O)?O:(O.all||O.getElementsByTagName("*"));
var P=dojo.isArray(O)?0:-1;
for(;
P<L.length;
P++){var I=(P==-1)?O:L[P];
if(this.widgetsInTemplate&&N(I,"dojoType")){continue
}var G=N(I,"dojoAttachPoint");
if(G){var E,C=G.split(/\s*,\s*/);
while(E=C.shift()){if(dojo.isArray(this[E])){this[E].push(I)
}else{this[E]=I
}}}var M=N(I,"dojoAttachEvent");
if(M){var K,J=M.split(/\s*,\s*/);
var A=dojo.trim;
while(K=J.shift()){if(K){var F=null;
if(K.indexOf(":")!=-1){var D=K.split(":");
K=A(D[0]);
F=A(D[1])
}else{K=A(K)
}if(!F){F=K
}this.connect(I,K,F)
}}}var H=N(I,"waiRole");
if(H){dijit.setWaiRole(I,H)
}var B=N(I,"waiState");
if(B){dojo.forEach(B.split(/\s*,\s*/),function(Q){if(Q.indexOf("-")!=-1){var R=Q.split("-");
dijit.setWaiState(I,R[0],R[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(B,A,F){var E=dijit._Templated._templateCache;
var C=A||B;
var D=E[C];
if(D){return D
}if(!A){A=dijit._Templated._sanitizeTemplateString(dojo._getText(B))
}A=dojo.string.trim(A);
if(A.match(/\$\{([^\}]+)\}/g)||F){return(E[C]=A)
}else{return(E[C]=dijit._Templated._createNodesFromText(A)[0])
}};
dijit._Templated._sanitizeTemplateString=function(A){if(A){A=A.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var B=A.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(B){A=B[1]
}}else{A=""
}return A
};
if(dojo.isIE){dojo.addOnUnload(function(){var C=dijit._Templated._templateCache;
for(var A in C){var B=C[A];
if(!isNaN(B.nodeType)){dojo._destroyElement(B)
}delete C[A]
}})
}(function(){var B={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var A;
dijit._Templated._createNodesFromText=function(I){if(!A){A=dojo.doc.createElement("div");
A.style.display="none";
dojo.body().appendChild(A)
}var G="none";
var E=I.replace(/^\s+/,"");
for(var F in B){var H=B[F];
if(H.re.test(E)){G=F;
I=H.pre+I+H.post;
break
}}A.innerHTML=I;
if(A.normalize){A.normalize()
}var D={cell:"tr",row:"tbody",section:"table"}[G];
var C=(typeof D!="undefined")?A.getElementsByTagName(D)[0]:A;
var J=[];
while(C.firstChild){J.push(C.removeChild(C.firstChild))
}A.innerHTML="";
return J
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
},_getSibling:function(A){var B=this.domNode;
do{B=B[A+"Sibling"]
}while(B&&B.nodeType!=1);
if(!B){return null
}var C=B.getAttribute("widgetId");
return dijit.byId(C)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(C,D){if(D===undefined){D="last"
}var B=this.containerNode||this.domNode;
if(D&&typeof D=="number"){var A=dojo.query("> [widgetid]",B);
if(A&&A.length>=D){B=A[D-1];
D="after"
}}dojo.place(C.domNode,B,D);
if(this._started&&!C._started){C.startup()
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
},_getSiblingOfChild:function(A,C){var D=A.domNode;
var B=(C>0?"nextSibling":"previousSibling");
do{D=D[B]
}while(D&&(D.nodeType!=1||!dijit.byNode(D)));
return D?dijit.byNode(D):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(C,B){var A=this._keyNavCodes={};
var E=dojo.hitch(this,this.focusPrev);
var D=dojo.hitch(this,this.focusNext);
dojo.forEach(C,function(F){A[F]=E
});
dojo.forEach(B,function(F){A[F]=D
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
}},focusChild:function(A,B){if(A){if(this.focusedChild&&A!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=A;
if(B&&A.focusFocalNode){A.focusFocalNode(B)
}else{A.focus()
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
},_getNextFocusableChild:function(A,B){if(A){A=this._getSiblingOfChild(A,B)
}var D=this.getChildren();
for(var C=0;
C<D.length;
C++){if(!A){A=D[(B>0)?0:(D.length-1)]
}if(A.isFocusable()){return A
}A=this._getSiblingOfChild(A,B)
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
(function(){var A=function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
};
var B=function(C,D){C.resize?C.resize(D):dojo.marginBox(C.domNode,D);
dojo.mixin(C,dojo.marginBox(C.domNode));
dojo.mixin(C,D)
};
dijit.layout.layoutChildren=function(C,D,E){D=dojo.mixin({},D);
dojo.addClass(C,"dijitLayoutContainer");
E=dojo.filter(E,function(F){return F.layoutAlign!="client"
}).concat(dojo.filter(E,function(F){return F.layoutAlign=="client"
}));
dojo.forEach(E,function(F){var I=F.domNode,H=F.layoutAlign;
var G=I.style;
G.left=D.l+"px";
G.top=D.t+"px";
G.bottom=G.right="auto";
dojo.addClass(I,"dijitAlign"+A(H));
if(H=="top"||H=="bottom"){B(F,{w:D.w});
D.h-=F.h;
if(H=="top"){D.t+=F.h
}else{G.top=D.t+D.h+"px"
}}else{if(H=="left"||H=="right"){B(F,{h:D.h});
D.w-=F.w;
if(H=="left"){D.l+=F.w
}else{G.left=D.l+D.w+"px"
}}else{if(H=="client"){B(F,D)
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
},_onMouse:function(D){var C=D.target;
if(C&&C.getAttribute){this.stateModifier=C.getAttribute("stateModifier")||""
}if(!this.disabled){switch(D.type){case"mouseenter":case"mouseover":this._hovering=true;
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