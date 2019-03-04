dojo._xdResourceLoaded({depends:[["provide","dojo._base.event"],["require","dojo._base.connect"]],defineResource:function(A){if(!A._hasResource["dojo._base.event"]){A._hasResource["dojo._base.event"]=true;
A.provide("dojo._base.event");
A.require("dojo._base.connect");
(function(){var B=A._event_listener={add:function(K,J,I){if(!K){return 
}J=B._normalizeEventName(J);
I=B._fixCallback(J,I);
var L=J;
if((!A.isIE)&&((J=="mouseenter")||(J=="mouseleave"))){var L=J;
var M=I;
J=(J=="mouseenter")?"mouseover":"mouseout";
I=function(N){var O=A.isDescendant(N.relatedTarget,K);
if(O==false){return M.call(this,N)
}}
}K.addEventListener(J,I,false);
return I
},remove:function(J,I,K){(J)&&(J.removeEventListener(B._normalizeEventName(I),K,false))
},_normalizeEventName:function(I){return(I.slice(0,2)=="on"?I.slice(2):I)
},_fixCallback:function(J,I){return(J!="keypress"?I:function(K){return I.call(this,B._fixEvent(K,this))
})
},_fixEvent:function(I,J){switch(I.type){case"keypress":B._setKeyChar(I);
break
}return I
},_setKeyChar:function(I){I.keyChar=(I.charCode?String.fromCharCode(I.charCode):"")
}};
A.fixEvent=function(I,J){return B._fixEvent(I,J)
};
A.stopEvent=function(I){I.preventDefault();
I.stopPropagation()
};
var E=A._listener;
A._connect=function(M,J,K,I,Q){var P=M&&(M.nodeType||M.attachEvent||M.addEventListener);
var O=!P?0:(!Q?1:2),L=[A._listener,B,E][O];
var N=L.add(M,J,A.hitch(K,I));
return[M,J,N,O]
};
A._disconnect=function(L,I,K,J){([A._listener,B,E][J]).remove(L,I,K)
};
A.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};
if(A.isIE){var G=function(J,I){try{return(J.keyCode=I)
}catch(J){return 0
}};
var C=A._listener;
if(!djConfig._allow_leaks){E=C=A._ie_listener={handlers:[],add:function(K,M,J){K=K||A.global;
var I=K[M];
if(!I||!I._listeners){var L=A._getIeDispatcher();
L.target=I&&(F.push(I)-1);
L._listeners=[];
I=K[M]=L
}return I._listeners.push(F.push(J)-1)
},remove:function(L,M,K){var J=(L||A.global)[M],I=J&&J._listeners;
if(J&&I&&K--){delete F[I[K]];
delete I[K]
}}};
var F=C.handlers
}A.mixin(B,{add:function(L,K,J){if(!L){return 
}K=B._normalizeEventName(K);
if(K=="onkeypress"){var I=L.onkeydown;
if(!I||!I._listeners||!I._stealthKeydown){B.add(L,"onkeydown",B._stealthKeyDown);
L.onkeydown._stealthKeydown=true
}}return C.add(L,K,B._fixCallback(J))
},remove:function(J,I,K){C.remove(J,B._normalizeEventName(I),K)
},_normalizeEventName:function(I){return(I.slice(0,2)!="on"?"on"+I:I)
},_nop:function(){},_fixEvent:function(J,K){if(!J){var I=(K)&&((K.ownerDocument||K.document||K).parentWindow)||window;
J=I.event
}if(!J){return(J)
}J.target=J.srcElement;
J.currentTarget=(K||J.srcElement);
J.layerX=J.offsetX;
J.layerY=J.offsetY;
var M=J.srcElement,N=(M&&M.ownerDocument)||document;
var L=((A.isIE<6)||(N.compatMode=="BackCompat"))?N.body:N.documentElement;
var O=A._getIeDocumentElementOffset();
J.pageX=J.clientX+A._fixIeBiDiScrollLeft(L.scrollLeft||0)-O.x;
J.pageY=J.clientY+(L.scrollTop||0)-O.y;
if(J.type=="mouseover"){J.relatedTarget=J.fromElement
}if(J.type=="mouseout"){J.relatedTarget=J.toElement
}J.stopPropagation=B._stopPropagation;
J.preventDefault=B._preventDefault;
return B._fixKeys(J)
},_fixKeys:function(I){switch(I.type){case"keypress":var J=("charCode" in I?I.charCode:I.keyCode);
if(J==10){J=0;
I.keyCode=13
}else{if(J==13||J==27){J=0
}else{if(J==3){J=99
}}}I.charCode=J;
B._setKeyChar(I);
break
}return I
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39},_stealthKeyDown:function(I){var L=I.currentTarget.onkeypress;
if(!L||!L._listeners){return 
}var K=I.keyCode;
var M=(K!=13)&&(K!=32)&&(K!=27)&&(K<48||K>90)&&(K<96||K>111)&&(K<186||K>192)&&(K<219||K>222);
if(M||I.ctrlKey){var N=(M?0:K);
if(I.ctrlKey){if(K==3||K==13){return 
}else{if(N>95&&N<106){N-=48
}else{if((!I.shiftKey)&&(N>=65&&N<=90)){N+=32
}else{N=B._punctMap[N]||N
}}}}var J=B._synthesizeEvent(I,{type:"keypress",faux:true,charCode:N});
L.call(I.currentTarget,J);
I.cancelBubble=J.cancelBubble;
I.returnValue=J.returnValue;
G(I,J.keyCode)
}},_stopPropagation:function(){this.cancelBubble=true
},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){G(this,0)
}this.returnValue=false
}});
A.stopEvent=function(I){I=I||window.event;
B._stopPropagation.call(I);
B._preventDefault.call(I)
}
}B._synthesizeEvent=function(I,K){var J=A.mixin({},I,K);
B._setKeyChar(J);
J.preventDefault=function(){I.preventDefault()
};
J.stopPropagation=function(){I.stopPropagation()
};
return J
};
if(A.isOpera){A.mixin(B,{_fixEvent:function(I,J){switch(I.type){case"keypress":var K=I.which;
if(K==3){K=99
}K=((K<41)&&(!I.shiftKey)?0:K);
if((I.ctrlKey)&&(!I.shiftKey)&&(K>=65)&&(K<=90)){K+=32
}return B._synthesizeEvent(I,{charCode:K})
}return I
}})
}if(A.isSafari){A.mixin(B,{_fixEvent:function(I,K){switch(I.type){case"keypress":var M=I.charCode,L=I.shiftKey,J=I.keyCode;
J=J||H[I.keyIdentifier]||0;
if(I.keyIdentifier=="Enter"){M=0
}else{if((I.ctrlKey)&&(M>0)&&(M<27)){M+=96
}else{if(M==A.keys.SHIFT_TAB){M=A.keys.TAB;
L=true
}else{M=(M>=32&&M<63232?M:0)
}}}return B._synthesizeEvent(I,{charCode:M,shiftKey:L,keyCode:J})
}return I
}});
A.mixin(A.keys,{SHIFT_TAB:25,UP_ARROW:63232,DOWN_ARROW:63233,LEFT_ARROW:63234,RIGHT_ARROW:63235,F1:63236,F2:63237,F3:63238,F4:63239,F5:63240,F6:63241,F7:63242,F8:63243,F9:63244,F10:63245,F11:63246,F12:63247,PAUSE:63250,DELETE:63272,HOME:63273,END:63275,PAGE_UP:63276,PAGE_DOWN:63277,INSERT:63302,PRINT_SCREEN:63248,SCROLL_LOCK:63249,NUM_LOCK:63289});
var D=A.keys,H={Up:D.UP_ARROW,Down:D.DOWN_ARROW,Left:D.LEFT_ARROW,Right:D.RIGHT_ARROW,PageUp:D.PAGE_UP,PageDown:D.PAGE_DOWN}
}})();
if(A.isIE){A._getIeDispatcher=function(){return function(){var E=Array.prototype,F=A._ie_listener.handlers,H=arguments.callee,B=H._listeners,D=F[H.target];
var G=D&&D.apply(this,arguments);
for(var C in B){if(!(C in E)){F[B[C]].apply(this,arguments)
}}return G
}
};
A._event_listener._fixCallback=function(B){var C=A._event_listener._fixEvent;
return function(D){return B.call(this,C(D,this))
}
}
}}}});