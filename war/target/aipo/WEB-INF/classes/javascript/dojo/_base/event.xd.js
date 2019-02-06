dojo._xdResourceLoaded({depends:[["provide","dojo._base.event"],["require","dojo._base.connect"]],defineResource:function(A){if(!A._hasResource["dojo._base.event"]){A._hasResource["dojo._base.event"]=true;
A.provide("dojo._base.event");
A.require("dojo._base.connect");
(function(){var G=A._event_listener={add:function(L,K,J){if(!L){return 
}K=G._normalizeEventName(K);
J=G._fixCallback(K,J);
var M=K;
if((!A.isIE)&&((K=="mouseenter")||(K=="mouseleave"))){var M=K;
var I=J;
K=(K=="mouseenter")?"mouseover":"mouseout";
J=function(O){var N=A.isDescendant(O.relatedTarget,L);
if(N==false){return I.call(this,O)
}}
}L.addEventListener(K,J,false);
return J
},remove:function(J,I,K){(J)&&(J.removeEventListener(G._normalizeEventName(I),K,false))
},_normalizeEventName:function(I){return(I.slice(0,2)=="on"?I.slice(2):I)
},_fixCallback:function(J,I){return(J!="keypress"?I:function(K){return I.call(this,G._fixEvent(K,this))
})
},_fixEvent:function(I,J){switch(I.type){case"keypress":G._setKeyChar(I);
break
}return I
},_setKeyChar:function(I){I.keyChar=(I.charCode?String.fromCharCode(I.charCode):"")
}};
A.fixEvent=function(I,J){return G._fixEvent(I,J)
};
A.stopEvent=function(I){I.preventDefault();
I.stopPropagation()
};
var D=A._listener;
A._connect=function(O,L,M,K,J){var I=O&&(O.nodeType||O.attachEvent||O.addEventListener);
var Q=!I?0:(!J?1:2),N=[A._listener,G,D][Q];
var P=N.add(O,L,A.hitch(M,K));
return[O,L,P,Q]
};
A._disconnect=function(L,I,K,J){([A._listener,G,D][J]).remove(L,I,K)
};
A.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};
if(A.isIE){var F=function(J,I){try{return(J.keyCode=I)
}catch(J){return 0
}};
var H=A._listener;
if(!djConfig._allow_leaks){D=H=A._ie_listener={handlers:[],add:function(L,I,K){L=L||A.global;
var J=L[I];
if(!J||!J._listeners){var M=A._getIeDispatcher();
M.target=J&&(E.push(J)-1);
M._listeners=[];
J=L[I]=M
}return J._listeners.push(E.push(K)-1)
},remove:function(M,I,L){var K=(M||A.global)[I],J=K&&K._listeners;
if(K&&J&&L--){delete E[J[L]];
delete J[L]
}}};
var E=H.handlers
}A.mixin(G,{add:function(L,K,J){if(!L){return 
}K=G._normalizeEventName(K);
if(K=="onkeypress"){var I=L.onkeydown;
if(!I||!I._listeners||!I._stealthKeydown){G.add(L,"onkeydown",G._stealthKeyDown);
L.onkeydown._stealthKeydown=true
}}return H.add(L,K,G._fixCallback(J))
},remove:function(J,I,K){H.remove(J,G._normalizeEventName(I),K)
},_normalizeEventName:function(I){return(I.slice(0,2)!="on"?"on"+I:I)
},_nop:function(){},_fixEvent:function(M,N){if(!M){var K=(N)&&((N.ownerDocument||N.document||N).parentWindow)||window;
M=K.event
}if(!M){return(M)
}M.target=M.srcElement;
M.currentTarget=(N||M.srcElement);
M.layerX=M.offsetX;
M.layerY=M.offsetY;
var L=M.srcElement,I=(L&&L.ownerDocument)||document;
var O=((A.isIE<6)||(I.compatMode=="BackCompat"))?I.body:I.documentElement;
var J=A._getIeDocumentElementOffset();
M.pageX=M.clientX+A._fixIeBiDiScrollLeft(O.scrollLeft||0)-J.x;
M.pageY=M.clientY+(O.scrollTop||0)-J.y;
if(M.type=="mouseover"){M.relatedTarget=M.fromElement
}if(M.type=="mouseout"){M.relatedTarget=M.toElement
}M.stopPropagation=G._stopPropagation;
M.preventDefault=G._preventDefault;
return G._fixKeys(M)
},_fixKeys:function(I){switch(I.type){case"keypress":var J=("charCode" in I?I.charCode:I.keyCode);
if(J==10){J=0;
I.keyCode=13
}else{if(J==13||J==27){J=0
}else{if(J==3){J=99
}}}I.charCode=J;
G._setKeyChar(I);
break
}return I
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39},_stealthKeyDown:function(K){var N=K.currentTarget.onkeypress;
if(!N||!N._listeners){return 
}var M=K.keyCode;
var I=(M!=13)&&(M!=32)&&(M!=27)&&(M<48||M>90)&&(M<96||M>111)&&(M<186||M>192)&&(M<219||M>222);
if(I||K.ctrlKey){var J=(I?0:M);
if(K.ctrlKey){if(M==3||M==13){return 
}else{if(J>95&&J<106){J-=48
}else{if((!K.shiftKey)&&(J>=65&&J<=90)){J+=32
}else{J=G._punctMap[J]||J
}}}}var L=G._synthesizeEvent(K,{type:"keypress",faux:true,charCode:J});
N.call(K.currentTarget,L);
K.cancelBubble=L.cancelBubble;
K.returnValue=L.returnValue;
F(K,L.keyCode)
}},_stopPropagation:function(){this.cancelBubble=true
},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){F(this,0)
}this.returnValue=false
}});
A.stopEvent=function(I){I=I||window.event;
G._stopPropagation.call(I);
G._preventDefault.call(I)
}
}G._synthesizeEvent=function(I,K){var J=A.mixin({},I,K);
G._setKeyChar(J);
J.preventDefault=function(){I.preventDefault()
};
J.stopPropagation=function(){I.stopPropagation()
};
return J
};
if(A.isOpera){A.mixin(G,{_fixEvent:function(I,J){switch(I.type){case"keypress":var K=I.which;
if(K==3){K=99
}K=((K<41)&&(!I.shiftKey)?0:K);
if((I.ctrlKey)&&(!I.shiftKey)&&(K>=65)&&(K<=90)){K+=32
}return G._synthesizeEvent(I,{charCode:K})
}return I
}})
}if(A.isSafari){A.mixin(G,{_fixEvent:function(J,L){switch(J.type){case"keypress":var I=J.charCode,M=J.shiftKey,K=J.keyCode;
K=K||B[J.keyIdentifier]||0;
if(J.keyIdentifier=="Enter"){I=0
}else{if((J.ctrlKey)&&(I>0)&&(I<27)){I+=96
}else{if(I==A.keys.SHIFT_TAB){I=A.keys.TAB;
M=true
}else{I=(I>=32&&I<63232?I:0)
}}}return G._synthesizeEvent(J,{charCode:I,shiftKey:M,keyCode:K})
}return J
}});
A.mixin(A.keys,{SHIFT_TAB:25,UP_ARROW:63232,DOWN_ARROW:63233,LEFT_ARROW:63234,RIGHT_ARROW:63235,F1:63236,F2:63237,F3:63238,F4:63239,F5:63240,F6:63241,F7:63242,F8:63243,F9:63244,F10:63245,F11:63246,F12:63247,PAUSE:63250,DELETE:63272,HOME:63273,END:63275,PAGE_UP:63276,PAGE_DOWN:63277,INSERT:63302,PRINT_SCREEN:63248,SCROLL_LOCK:63249,NUM_LOCK:63289});
var C=A.keys,B={Up:C.UP_ARROW,Down:C.DOWN_ARROW,Left:C.LEFT_ARROW,Right:C.RIGHT_ARROW,PageUp:C.PAGE_UP,PageDown:C.PAGE_DOWN}
}})();
if(A.isIE){A._getIeDispatcher=function(){return function(){var D=Array.prototype,E=A._ie_listener.handlers,C=arguments.callee,G=C._listeners,B=E[C.target];
var F=B&&B.apply(this,arguments);
for(var H in G){if(!(H in D)){E[G[H]].apply(this,arguments)
}}return F
}
};
A._event_listener._fixCallback=function(C){var B=A._event_listener._fixEvent;
return function(D){return C.call(this,B(D,this))
}
}
}}}});