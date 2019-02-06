if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dojo.require("dijit._base.focus");
dojo.require("dijit._base.place");
dojo.require("dijit._base.window");
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
};