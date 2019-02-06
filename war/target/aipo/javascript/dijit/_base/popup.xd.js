dojo._xdResourceLoaded({depends:[["provide","dijit._base.popup"],["require","dijit._base.focus"],["require","dijit._base.place"],["require","dijit._base.window"]],defineResource:function(A){if(!A._hasResource["dijit._base.popup"]){A._hasResource["dijit._base.popup"]=true;
A.provide("dijit._base.popup");
A.require("dijit._base.focus");
A.require("dijit._base.place");
A.require("dijit._base.window");
dijit.popup=new function(){var B=[],C=1000,D=1;
this.open=function(M){var L=M.popup,K=M.orient||{BL:"TL",TL:"BL"},N=M.around,G=(M.around&&M.around.id)?(M.around.id+"_dropdown"):("popup_"+D++);
var F=A.doc.createElement("div");
F.id=G;
F.className="dijitPopup";
F.style.zIndex=C+B.length;
F.style.visibility="hidden";
if(M.parent){F.dijitPopupParent=M.parent.id
}A.body().appendChild(F);
L.domNode.style.display="";
F.appendChild(L.domNode);
var J=new dijit.BackgroundIframe(F);
var I=N?dijit.placeOnScreenAroundElement(F,N,K,L.orient?A.hitch(L,"orient"):null):dijit.placeOnScreen(F,M,K=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
F.style.visibility="visible";
var H=[];
function E(){for(var O=B.length-1;
O>0&&B[O].parent===B[O-1].widget;
O--){}return B[O]
}H.push(A.connect(F,"onkeypress",this,function(O){if(O.keyCode==A.keys.ESCAPE&&M.onCancel){M.onCancel()
}else{if(O.keyCode==A.keys.TAB){A.stopEvent(O);
var P=E();
if(P&&P.onCancel){P.onCancel()
}}}}));
if(L.onCancel){H.push(A.connect(L,"onCancel",null,M.onCancel))
}H.push(A.connect(L,L.onExecute?"onExecute":"onChange",null,function(){var O=E();
if(O&&O.onExecute){O.onExecute()
}}));
B.push({wrapper:F,iframe:J,widget:L,parent:M.parent,onExecute:M.onExecute,onCancel:M.onCancel,onClose:M.onClose,handlers:H});
if(L.onOpen){L.onOpen(I)
}return I
};
this.close=function(F){while(A.some(B,function(K){return K.widget==F
})){var I=B.pop(),J=I.wrapper,G=I.iframe,H=I.widget,E=I.onClose;
if(H.onClose){H.onClose()
}A.forEach(I.handlers,A.disconnect);
if(!H||!H.domNode){return 
}A.style(H.domNode,"display","none");
A.body().appendChild(H.domNode);
G.destroy();
A._destroyElement(J);
if(E){E()
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
}}});