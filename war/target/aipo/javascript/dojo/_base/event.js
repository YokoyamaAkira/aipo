if(!dojo._hasResource["dojo._base.event"]){dojo._hasResource["dojo._base.event"]=true;
dojo.provide("dojo._base.event");
dojo.require("dojo._base.connect");
(function(){var A=dojo._event_listener={add:function(J,I,H){if(!J){return 
}I=A._normalizeEventName(I);
H=A._fixCallback(I,H);
var K=I;
if((!dojo.isIE)&&((I=="mouseenter")||(I=="mouseleave"))){var K=I;
var L=H;
I=(I=="mouseenter")?"mouseover":"mouseout";
H=function(M){var N=dojo.isDescendant(M.relatedTarget,J);
if(N==false){return L.call(this,M)
}}
}J.addEventListener(I,H,false);
return H
},remove:function(I,H,J){(I)&&(I.removeEventListener(A._normalizeEventName(H),J,false))
},_normalizeEventName:function(H){return(H.slice(0,2)=="on"?H.slice(2):H)
},_fixCallback:function(I,H){return(I!="keypress"?H:function(J){return H.call(this,A._fixEvent(J,this))
})
},_fixEvent:function(H,I){switch(H.type){case"keypress":A._setKeyChar(H);
break
}return H
},_setKeyChar:function(H){H.keyChar=(H.charCode?String.fromCharCode(H.charCode):"")
}};
dojo.fixEvent=function(H,I){return A._fixEvent(H,I)
};
dojo.stopEvent=function(H){H.preventDefault();
H.stopPropagation()
};
var D=dojo._listener;
dojo._connect=function(L,I,J,H,P){var O=L&&(L.nodeType||L.attachEvent||L.addEventListener);
var N=!O?0:(!P?1:2),K=[dojo._listener,A,D][N];
var M=K.add(L,I,dojo.hitch(J,H));
return[L,I,M,N]
};
dojo._disconnect=function(K,H,J,I){([dojo._listener,A,D][I]).remove(K,H,J)
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};
if(dojo.isIE){var F=function(I,H){try{return(I.keyCode=H)
}catch(I){return 0
}};
var B=dojo._listener;
if(!djConfig._allow_leaks){D=B=dojo._ie_listener={handlers:[],add:function(J,L,I){J=J||dojo.global;
var H=J[L];
if(!H||!H._listeners){var K=dojo._getIeDispatcher();
K.target=H&&(E.push(H)-1);
K._listeners=[];
H=J[L]=K
}return H._listeners.push(E.push(I)-1)
},remove:function(K,L,J){var I=(K||dojo.global)[L],H=I&&I._listeners;
if(I&&H&&J--){delete E[H[J]];
delete H[J]
}}};
var E=B.handlers
}dojo.mixin(A,{add:function(K,J,I){if(!K){return 
}J=A._normalizeEventName(J);
if(J=="onkeypress"){var H=K.onkeydown;
if(!H||!H._listeners||!H._stealthKeydown){A.add(K,"onkeydown",A._stealthKeyDown);
K.onkeydown._stealthKeydown=true
}}return B.add(K,J,A._fixCallback(I))
},remove:function(I,H,J){B.remove(I,A._normalizeEventName(H),J)
},_normalizeEventName:function(H){return(H.slice(0,2)!="on"?"on"+H:H)
},_nop:function(){},_fixEvent:function(I,J){if(!I){var H=(J)&&((J.ownerDocument||J.document||J).parentWindow)||window;
I=H.event
}if(!I){return(I)
}I.target=I.srcElement;
I.currentTarget=(J||I.srcElement);
I.layerX=I.offsetX;
I.layerY=I.offsetY;
var L=I.srcElement,M=(L&&L.ownerDocument)||document;
var K=((dojo.isIE<6)||(M.compatMode=="BackCompat"))?M.body:M.documentElement;
var N=dojo._getIeDocumentElementOffset();
I.pageX=I.clientX+dojo._fixIeBiDiScrollLeft(K.scrollLeft||0)-N.x;
I.pageY=I.clientY+(K.scrollTop||0)-N.y;
if(I.type=="mouseover"){I.relatedTarget=I.fromElement
}if(I.type=="mouseout"){I.relatedTarget=I.toElement
}I.stopPropagation=A._stopPropagation;
I.preventDefault=A._preventDefault;
return A._fixKeys(I)
},_fixKeys:function(H){switch(H.type){case"keypress":var I=("charCode" in H?H.charCode:H.keyCode);
if(I==10){I=0;
H.keyCode=13
}else{if(I==13||I==27){I=0
}else{if(I==3){I=99
}}}H.charCode=I;
A._setKeyChar(H);
break
}return H
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39},_stealthKeyDown:function(H){var K=H.currentTarget.onkeypress;
if(!K||!K._listeners){return 
}var J=H.keyCode;
var L=(J!=13)&&(J!=32)&&(J!=27)&&(J<48||J>90)&&(J<96||J>111)&&(J<186||J>192)&&(J<219||J>222);
if(L||H.ctrlKey){var M=(L?0:J);
if(H.ctrlKey){if(J==3||J==13){return 
}else{if(M>95&&M<106){M-=48
}else{if((!H.shiftKey)&&(M>=65&&M<=90)){M+=32
}else{M=A._punctMap[M]||M
}}}}var I=A._synthesizeEvent(H,{type:"keypress",faux:true,charCode:M});
K.call(H.currentTarget,I);
H.cancelBubble=I.cancelBubble;
H.returnValue=I.returnValue;
F(H,I.keyCode)
}},_stopPropagation:function(){this.cancelBubble=true
},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){F(this,0)
}this.returnValue=false
}});
dojo.stopEvent=function(H){H=H||window.event;
A._stopPropagation.call(H);
A._preventDefault.call(H)
}
}A._synthesizeEvent=function(H,J){var I=dojo.mixin({},H,J);
A._setKeyChar(I);
I.preventDefault=function(){H.preventDefault()
};
I.stopPropagation=function(){H.stopPropagation()
};
return I
};
if(dojo.isOpera){dojo.mixin(A,{_fixEvent:function(H,I){switch(H.type){case"keypress":var J=H.which;
if(J==3){J=99
}J=((J<41)&&(!H.shiftKey)?0:J);
if((H.ctrlKey)&&(!H.shiftKey)&&(J>=65)&&(J<=90)){J+=32
}return A._synthesizeEvent(H,{charCode:J})
}return H
}})
}if(dojo.isSafari){dojo.mixin(A,{_fixEvent:function(H,J){switch(H.type){case"keypress":var L=H.charCode,K=H.shiftKey,I=H.keyCode;
I=I||G[H.keyIdentifier]||0;
if(H.keyIdentifier=="Enter"){L=0
}else{if((H.ctrlKey)&&(L>0)&&(L<27)){L+=96
}else{if(L==dojo.keys.SHIFT_TAB){L=dojo.keys.TAB;
K=true
}else{L=(L>=32&&L<63232?L:0)
}}}return A._synthesizeEvent(H,{charCode:L,shiftKey:K,keyCode:I})
}return H
}});
dojo.mixin(dojo.keys,{SHIFT_TAB:25,UP_ARROW:63232,DOWN_ARROW:63233,LEFT_ARROW:63234,RIGHT_ARROW:63235,F1:63236,F2:63237,F3:63238,F4:63239,F5:63240,F6:63241,F7:63242,F8:63243,F9:63244,F10:63245,F11:63246,F12:63247,PAUSE:63250,DELETE:63272,HOME:63273,END:63275,PAGE_UP:63276,PAGE_DOWN:63277,INSERT:63302,PRINT_SCREEN:63248,SCROLL_LOCK:63249,NUM_LOCK:63289});
var C=dojo.keys,G={Up:C.UP_ARROW,Down:C.DOWN_ARROW,Left:C.LEFT_ARROW,Right:C.RIGHT_ARROW,PageUp:C.PAGE_UP,PageDown:C.PAGE_DOWN}
}})();
if(dojo.isIE){dojo._getIeDispatcher=function(){return function(){var D=Array.prototype,E=dojo._ie_listener.handlers,G=arguments.callee,A=G._listeners,C=E[G.target];
var F=C&&C.apply(this,arguments);
for(var B in A){if(!(B in D)){E[A[B]].apply(this,arguments)
}}return F
}
};
dojo._event_listener._fixCallback=function(A){var B=dojo._event_listener._fixEvent;
return function(C){return A.call(this,B(C,this))
}
}
}};