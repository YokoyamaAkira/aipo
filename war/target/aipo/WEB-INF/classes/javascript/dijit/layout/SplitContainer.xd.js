dojo._xdResourceLoaded({depends:[["provide","dijit.layout.SplitContainer"],["require","dojo.cookie"],["require","dijit.layout._LayoutWidget"]],defineResource:function(A){if(!A._hasResource["dijit.layout.SplitContainer"]){A._hasResource["dijit.layout.SplitContainer"]=true;
A.provide("dijit.layout.SplitContainer");
A.require("dojo.cookie");
A.require("dijit.layout._LayoutWidget");
A.declare("dijit.layout.SplitContainer",dijit.layout._LayoutWidget,{activeSizing:false,sizerWidth:7,orientation:"horizontal",persist:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.isHorizontal=(this.orientation=="horizontal")
},postCreate:function(){this.inherited("postCreate",arguments);
this.sizers=[];
A.addClass(this.domNode,"dijitSplitContainer");
if(A.isMozilla){this.domNode.style.overflow="-moz-scrollbars-none"
}if(typeof this.sizerWidth=="object"){try{this.sizerWidth=parseInt(this.sizerWidth.toString())
}catch(B){this.sizerWidth=7
}}var C=this.virtualSizer=document.createElement("div");
C.style.position="relative";
C.style.zIndex=10;
C.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(C);
A.setSelectable(C,false)
},startup:function(){if(this._started){return 
}A.forEach(this.getChildren(),function(B,D,C){this._injectChild(B);
if(D<C.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(B){B.domNode.style.position="absolute";
A.addClass(B.domNode,"dijitSplitPane")
},_addSizer:function(){var E=this.sizers.length;
var B=this.sizers[E]=document.createElement("div");
B.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var D=document.createElement("div");
D.className="thumb";
B.appendChild(D);
var C=this;
var F=(function(){var G=E;
return function(H){C.beginSizing(H,G)
}
})();
A.connect(B,"onmousedown",F);
this.domNode.appendChild(B);
A.setSelectable(B,false)
},removeChild:function(B){if(this.sizers.length&&A.indexOf(this.getChildren(),B)!=-1){var C=this.sizers.length-1;
A._destroyElement(this.sizers[C]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(B,C){this.inherited("addChild",arguments);
if(this._started){this._injectChild(B);
var D=this.getChildren();
if(D.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var C=this.getChildren();
if(!C.length){return 
}var E=this.isHorizontal?this.paneWidth:this.paneHeight;
if(C.length>1){E-=this.sizerWidth*(C.length-1)
}var D=0;
A.forEach(C,function(I){D+=I.sizeShare
});
var F=E/D;
var G=0;
A.forEach(C.slice(0,C.length-1),function(J){var I=Math.round(F*J.sizeShare);
J.sizeActual=I;
G+=I
});
C[C.length-1].sizeActual=E-G;
this._checkSizes();
var B=0;
var H=C[0].sizeActual;
this._movePanel(C[0],B,H);
C[0].position=B;
B+=H;
if(!this.sizers){return 
}A.some(C.slice(1),function(J,I){if(!this.sizers[I]){return true
}this._moveSlider(this.sizers[I],B,this.sizerWidth);
this.sizers[I].position=B;
B+=this.sizerWidth;
H=J.sizeActual;
this._movePanel(J,B,H);
J.position=B;
B+=H
},this)
},_movePanel:function(C,B,D){if(this.isHorizontal){C.domNode.style.left=B+"px";
C.domNode.style.top=0;
var E={w:D,h:this.paneHeight};
if(C.resize){C.resize(E)
}else{A.marginBox(C.domNode,E)
}}else{C.domNode.style.left=0;
C.domNode.style.top=B+"px";
var E={w:this.paneWidth,h:D};
if(C.resize){C.resize(E)
}else{A.marginBox(C.domNode,E)
}}},_moveSlider:function(D,B,C){if(this.isHorizontal){D.style.left=B+"px";
D.style.top=0;
A.marginBox(D,{w:C,h:this.paneHeight})
}else{D.style.left=0;
D.style.top=B+"px";
A.marginBox(D,{w:this.paneWidth,h:C})
}},_growPane:function(C,B){if(C>0){if(B.sizeActual>B.sizeMin){if((B.sizeActual-B.sizeMin)>C){B.sizeActual=B.sizeActual-C;
C=0
}else{C-=B.sizeActual-B.sizeMin;
B.sizeActual=B.sizeMin
}}}return C
},_checkSizes:function(){var F=0;
var D=0;
var E=this.getChildren();
A.forEach(E,function(G){D+=G.sizeActual;
F+=G.sizeMin
});
if(F<=D){var C=0;
A.forEach(E,function(G){if(G.sizeActual<G.sizeMin){C+=G.sizeMin-G.sizeActual;
G.sizeActual=G.sizeMin
}});
if(C>0){var B=this.isDraggingLeft?E.reverse():E;
A.forEach(B,function(G){C=this._growPane(C,G)
},this)
}}else{A.forEach(E,function(G){G.sizeActual=Math.round(D*(G.sizeMin/F))
})
}},beginSizing:function(C,F){var E=this.getChildren();
this.paneBefore=E[F];
this.paneAfter=E[F+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[F];
if(!this.cover){this.cover=A.doc.createElement("div");
this.domNode.appendChild(this.cover);
var G=this.cover.style;
G.position="absolute";
G.zIndex=1;
G.top=0;
G.left=0;
G.width="100%";
G.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=A.coords(E[0].domNode,true);
if(this.isHorizontal){var B=(C.layerX?C.layerX:C.offsetX);
var D=C.pageX;
this.originPos=this.originPos.x
}else{var B=(C.layerY?C.layerY:C.offsetY);
var D=C.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=D;
this.screenToClientOffset=D-B;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(A.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(A.connect(document.documentElement,"onmouseup",this,"endSizing"));
A.stopEvent(C)
},changeSizing:function(B){if(!this.isSizing){return 
}this.lastPoint=this.isHorizontal?B.pageX:B.pageY;
this.movePoint();
if(this.activeSizing){this._updateSize()
}else{this._moveSizingLine()
}A.stopEvent(B)
},endSizing:function(B){if(!this.isSizing){return 
}if(this.cover){this.cover.style.zIndex=-1
}if(!this.activeSizing){this._hideSizingLine()
}this._updateSize();
this.isSizing=false;
if(this.persist){this._saveState(this)
}A.forEach(this._connects,A.disconnect)
},movePoint:function(){var B=this.lastPoint-this.screenToClientOffset;
var C=B-this.dragOffset;
C=this.legaliseSplitPoint(C);
B=C+this.dragOffset;
this.lastPoint=B+this.screenToClientOffset
},legaliseSplitPoint:function(D){D+=this.sizingSplitter.position;
this.isDraggingLeft=!!(D>0);
if(!this.activeSizing){var B=this.paneBefore.position+this.paneBefore.sizeMin;
if(D<B){D=B
}var C=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(D>C){D=C
}}D-=this.sizingSplitter.position;
this._checkSizes();
return D
},_updateSize:function(){var B=this.lastPoint-this.dragOffset-this.originPos;
var C=this.paneBefore.position;
var D=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=B-C;
this.paneAfter.position=B+this.sizerWidth;
this.paneAfter.sizeActual=D-this.paneAfter.position;
A.forEach(this.getChildren(),function(E){E.sizeShare=E.sizeActual
});
if(this._started){this.layout()
}},_showSizingLine:function(){this._moveSizingLine();
A.marginBox(this.virtualSizer,this.isHorizontal?{w:this.sizerWidth,h:this.paneHeight}:{w:this.paneWidth,h:this.sizerWidth});
this.virtualSizer.style.display="block"
},_hideSizingLine:function(){this.virtualSizer.style.display="none"
},_moveSizingLine:function(){var B=(this.lastPoint-this.startPoint)+this.sizingSplitter.position;
A.style(this.virtualSizer,(this.isHorizontal?"left":"top"),B+"px")
},_getCookieName:function(B){return this.id+"_"+B
},_restoreState:function(){A.forEach(this.getChildren(),function(B,C){var F=this._getCookieName(C);
var D=A.cookie(F);
if(D){var E=parseInt(D);
if(typeof E=="number"){B.sizeShare=E
}}},this)
},_saveState:function(){A.forEach(this.getChildren(),function(B,C){A.cookie(this._getCookieName(C),B.sizeShare)
},this)
}});
A.extend(dijit._Widget,{sizeMin:10,sizeShare:10})
}}});