dojo._xdResourceLoaded({depends:[["provide","dijit._base.popup"],["require","dijit._base.focus"],["require","dijit._base.place"],["require","dijit._base.window"]],defineResource:function(A){if(!A._hasResource["dijit._base.popup"]){A._hasResource["dijit._base.popup"]=true;
A.provide("dijit._base.popup");
A.require("dijit._base.focus");
A.require("dijit._base.place");
A.require("dijit._base.window");
dijit.popup=new function(){var C=[],D=1000,B=1;
this.open=function(E){var N=E.popup,M=E.orient||{BL:"TL",TL:"BL"},F=E.around,I=(E.around&&E.around.id)?(E.around.id+"_dropdown"):("popup_"+B++);
var H=A.doc.createElement("div");
H.id=I;
H.className="dijitPopup";
H.style.zIndex=D+C.length;
H.style.visibility="hidden";
if(E.parent){H.dijitPopupParent=E.parent.id
}A.body().appendChild(H);
N.domNode.style.display="";
H.appendChild(N.domNode);
var L=new dijit.BackgroundIframe(H);
var K=F?dijit.placeOnScreenAroundElement(H,F,M,N.orient?A.hitch(N,"orient"):null):dijit.placeOnScreen(H,E,M=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
H.style.visibility="visible";
var J=[];
function G(){for(var O=C.length-1;
O>0&&C[O].parent===C[O-1].widget;
O--){}return C[O]
}J.push(A.connect(H,"onkeypress",this,function(O){if(O.keyCode==A.keys.ESCAPE&&E.onCancel){E.onCancel()
}else{if(O.keyCode==A.keys.TAB){A.stopEvent(O);
var P=G();
if(P&&P.onCancel){P.onCancel()
}}}}));
if(N.onCancel){J.push(A.connect(N,"onCancel",null,E.onCancel))
}J.push(A.connect(N,N.onExecute?"onExecute":"onChange",null,function(){var O=G();
if(O&&O.onExecute){O.onExecute()
}}));
C.push({wrapper:H,iframe:L,widget:N,parent:E.parent,onExecute:E.onExecute,onCancel:E.onCancel,onClose:E.onClose,handlers:J});
if(N.onOpen){N.onOpen(K)
}return K
};
this.close=function(J){while(A.some(C,function(K){return K.widget==J
})){var G=C.pop(),I=G.wrapper,E=G.iframe,F=G.widget,H=G.onClose;
if(F.onClose){F.onClose()
}A.forEach(G.handlers,A.disconnect);
if(!F||!F.domNode){return 
}A.style(F.domNode,"display","none");
A.body().appendChild(F.domNode);
E.destroy();
A._destroyElement(I);
if(H){H()
}}}
}();
dijit._frames=new function(){var B=[];
this.pop=function(){var D;
if(B.length){D=B.pop();
D.style.display=""
}else{if(A.isIE){var C="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
D=A.doc.createElement(C)
}else{var D=A.doc.createElement("iframe");
D.src='javascript:""';
D.className="dijitBackgroundIframe"
}D.tabIndex=-1;
A.body().appendChild(D)
}return D
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
}}});