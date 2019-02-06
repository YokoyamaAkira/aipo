if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dojo.require("dijit._base.focus");
dojo.require("dijit._base.place");
dojo.require("dijit._base.window");
dijit.popup=new function(){var C=[],A=1000,B=1;
this.open=function(D){var M=D.popup,L=D.orient||{BL:"TL",TL:"BL"},E=D.around,H=(D.around&&D.around.id)?(D.around.id+"_dropdown"):("popup_"+B++);
var G=dojo.doc.createElement("div");
G.id=H;
G.className="dijitPopup";
G.style.zIndex=A+C.length;
G.style.visibility="hidden";
if(D.parent){G.dijitPopupParent=D.parent.id
}dojo.body().appendChild(G);
M.domNode.style.display="";
G.appendChild(M.domNode);
var K=new dijit.BackgroundIframe(G);
var J=E?dijit.placeOnScreenAroundElement(G,E,L,M.orient?dojo.hitch(M,"orient"):null):dijit.placeOnScreen(G,D,L=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
G.style.visibility="visible";
var I=[];
function F(){for(var N=C.length-1;
N>0&&C[N].parent===C[N-1].widget;
N--){}return C[N]
}I.push(dojo.connect(G,"onkeypress",this,function(N){if(N.keyCode==dojo.keys.ESCAPE&&D.onCancel){D.onCancel()
}else{if(N.keyCode==dojo.keys.TAB){dojo.stopEvent(N);
var O=F();
if(O&&O.onCancel){O.onCancel()
}}}}));
if(M.onCancel){I.push(dojo.connect(M,"onCancel",null,D.onCancel))
}I.push(dojo.connect(M,M.onExecute?"onExecute":"onChange",null,function(){var N=F();
if(N&&N.onExecute){N.onExecute()
}}));
C.push({wrapper:G,iframe:K,widget:M,parent:D.parent,onExecute:D.onExecute,onCancel:D.onCancel,onClose:D.onClose,handlers:I});
if(M.onOpen){M.onOpen(J)
}return J
};
this.close=function(F){while(dojo.some(C,function(J){return J.widget==F
})){var I=C.pop(),E=I.wrapper,G=I.iframe,H=I.widget,D=I.onClose;
if(H.onClose){H.onClose()
}dojo.forEach(I.handlers,dojo.disconnect);
if(!H||!H.domNode){return 
}dojo.style(H.domNode,"display","none");
dojo.body().appendChild(H.domNode);
G.destroy();
dojo._destroyElement(E);
if(D){D()
}}}
}();
dijit._frames=new function(){var A=[];
this.pop=function(){var B;
if(A.length){B=A.pop();
B.style.display=""
}else{if(dojo.isIE){var C="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
B=dojo.doc.createElement(C)
}else{var B=dojo.doc.createElement("iframe");
B.src='javascript:""';
B.className="dijitBackgroundIframe"
}B.tabIndex=-1;
dojo.body().appendChild(B)
}return B
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
};