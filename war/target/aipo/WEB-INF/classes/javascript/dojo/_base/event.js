if(!dojo._hasResource["dojo._base.event"]){dojo._hasResource["dojo._base.event"]=true;
dojo.provide("dojo._base.event");
dojo.require("dojo._base.connect");
(function(){var E=dojo._event_listener={add:function(K,J,I){if(!K){return 
}J=E._normalizeEventName(J);
I=E._fixCallback(J,I);
var L=J;
if((!dojo.isIE)&&((J=="mouseenter")||(J=="mouseleave"))){var L=J;
var H=I;
J=(J=="mouseenter")?"mouseover":"mouseout";
I=function(M){var N=dojo.isDescendant(M.relatedTarget,K);
if(N==false){return H.call(this,M)
}}
}K.addEventListener(J,I,false);
return I
},remove:function(J,I,H){(J)&&(J.removeEventListener(E._normalizeEventName(I),H,false))
},_normalizeEventName:function(H){return(H.slice(0,2)=="on"?H.slice(2):H)
},_fixCallback:function(H,I){return(H!="keypress"?I:function(J){return I.call(this,E._fixEvent(J,this))
})
},_fixEvent:function(I,H){switch(I.type){case"keypress":E._setKeyChar(I);
break
}return I
},_setKeyChar:function(H){H.keyChar=(H.charCode?String.fromCharCode(H.charCode):"")
}};
dojo.fixEvent=function(I,H){return E._fixEvent(I,H)
};
dojo.stopEvent=function(H){H.preventDefault();
H.stopPropagation()
};
var A=dojo._listener;
dojo._connect=function(P,M,N,L,K){var J=P&&(P.nodeType||P.attachEvent||P.addEventListener);
var I=!J?0:(!K?1:2),O=[dojo._listener,E,A][I];
var H=O.add(P,M,dojo.hitch(N,L));
return[P,M,H,I]
};
dojo._disconnect=function(H,I,K,J){([dojo._listener,E,A][J]).remove(H,I,K)
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};
if(dojo.isIE){var C=function(H,I){try{return(H.keyCode=I)
}catch(H){return 0
}};
var F=dojo._listener;
if(!djConfig._allow_leaks){A=F=dojo._ie_listener={handlers:[],add:function(K,H,J){K=K||dojo.global;
var I=K[H];
if(!I||!I._listeners){var L=dojo._getIeDispatcher();
L.target=I&&(B.push(I)-1);
L._listeners=[];
I=K[H]=L
}return I._listeners.push(B.push(J)-1)
},remove:function(L,H,K){var J=(L||dojo.global)[H],I=J&&J._listeners;
if(J&&I&&K--){delete B[I[K]];
delete I[K]
}}};
var B=F.handlers
}dojo.mixin(E,{add:function(H,K,J){if(!H){return 
}K=E._normalizeEventName(K);
if(K=="onkeypress"){var I=H.onkeydown;
if(!I||!I._listeners||!I._stealthKeydown){E.add(H,"onkeydown",E._stealthKeyDown);
H.onkeydown._stealthKeydown=true
}}return F.add(H,K,E._fixCallback(J))
},remove:function(J,I,H){F.remove(J,E._normalizeEventName(I),H)
},_normalizeEventName:function(H){return(H.slice(0,2)!="on"?"on"+H:H)
},_nop:function(){},_fixEvent:function(L,M){if(!L){var K=(M)&&((M.ownerDocument||M.document||M).parentWindow)||window;
L=K.event
}if(!L){return(L)
}L.target=L.srcElement;
L.currentTarget=(M||L.srcElement);
L.layerX=L.offsetX;
L.layerY=L.offsetY;
var H=L.srcElement,I=(H&&H.ownerDocument)||document;
var N=((dojo.isIE<6)||(I.compatMode=="BackCompat"))?I.body:I.documentElement;
var J=dojo._getIeDocumentElementOffset();
L.pageX=L.clientX+dojo._fixIeBiDiScrollLeft(N.scrollLeft||0)-J.x;
L.pageY=L.clientY+(N.scrollTop||0)-J.y;
if(L.type=="mouseover"){L.relatedTarget=L.fromElement
}if(L.type=="mouseout"){L.relatedTarget=L.toElement
}L.stopPropagation=E._stopPropagation;
L.preventDefault=E._preventDefault;
return E._fixKeys(L)
},_fixKeys:function(I){switch(I.type){case"keypress":var H=("charCode" in I?I.charCode:I.keyCode);
if(H==10){H=0;
I.keyCode=13
}else{if(H==13||H==27){H=0
}else{if(H==3){H=99
}}}I.charCode=H;
E._setKeyChar(I);
break
}return I
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39},_stealthKeyDown:function(J){var M=J.currentTarget.onkeypress;
if(!M||!M._listeners){return 
}var L=J.keyCode;
var H=(L!=13)&&(L!=32)&&(L!=27)&&(L<48||L>90)&&(L<96||L>111)&&(L<186||L>192)&&(L<219||L>222);
if(H||J.ctrlKey){var I=(H?0:L);
if(J.ctrlKey){if(L==3||L==13){return 
}else{if(I>95&&I<106){I-=48
}else{if((!J.shiftKey)&&(I>=65&&I<=90)){I+=32
}else{I=E._punctMap[I]||I
}}}}var K=E._synthesizeEvent(J,{type:"keypress",faux:true,charCode:I});
M.call(J.currentTarget,K);
J.cancelBubble=K.cancelBubble;
J.returnValue=K.returnValue;
C(J,K.keyCode)
}},_stopPropagation:function(){this.cancelBubble=true
},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){C(this,0)
}this.returnValue=false
}});
dojo.stopEvent=function(H){H=H||window.event;
E._stopPropagation.call(H);
E._preventDefault.call(H)
}
}E._synthesizeEvent=function(I,H){var J=dojo.mixin({},I,H);
E._setKeyChar(J);
J.preventDefault=function(){I.preventDefault()
};
J.stopPropagation=function(){I.stopPropagation()
};
return J
};
if(dojo.isOpera){dojo.mixin(E,{_fixEvent:function(I,J){switch(I.type){case"keypress":var H=I.which;
if(H==3){H=99
}H=((H<41)&&(!I.shiftKey)?0:H);
if((I.ctrlKey)&&(!I.shiftKey)&&(H>=65)&&(H<=90)){H+=32
}return E._synthesizeEvent(I,{charCode:H})
}return I
}})
}if(dojo.isSafari){dojo.mixin(E,{_fixEvent:function(I,K){switch(I.type){case"keypress":var H=I.charCode,L=I.shiftKey,J=I.keyCode;
J=J||D[I.keyIdentifier]||0;
if(I.keyIdentifier=="Enter"){H=0
}else{if((I.ctrlKey)&&(H>0)&&(H<27)){H+=96
}else{if(H==dojo.keys.SHIFT_TAB){H=dojo.keys.TAB;
L=true
}else{H=(H>=32&&H<63232?H:0)
}}}return E._synthesizeEvent(I,{charCode:H,shiftKey:L,keyCode:J})
}return I
}});
dojo.mixin(dojo.keys,{SHIFT_TAB:25,UP_ARROW:63232,DOWN_ARROW:63233,LEFT_ARROW:63234,RIGHT_ARROW:63235,F1:63236,F2:63237,F3:63238,F4:63239,F5:63240,F6:63241,F7:63242,F8:63243,F9:63244,F10:63245,F11:63246,F12:63247,PAUSE:63250,DELETE:63272,HOME:63273,END:63275,PAGE_UP:63276,PAGE_DOWN:63277,INSERT:63302,PRINT_SCREEN:63248,SCROLL_LOCK:63249,NUM_LOCK:63289});
var G=dojo.keys,D={Up:G.UP_ARROW,Down:G.DOWN_ARROW,Left:G.LEFT_ARROW,Right:G.RIGHT_ARROW,PageUp:G.PAGE_UP,PageDown:G.PAGE_DOWN}
}})();
if(dojo.isIE){dojo._getIeDispatcher=function(){return function(){var A=Array.prototype,B=dojo._ie_listener.handlers,D=arguments.callee,E=D._listeners,G=B[D.target];
var C=G&&G.apply(this,arguments);
for(var F in E){if(!(F in A)){B[E[F]].apply(this,arguments)
}}return C
}
};
dojo._event_listener._fixCallback=function(B){var A=dojo._event_listener._fixEvent;
return function(C){return B.call(this,A(C,this))
}
}
}};