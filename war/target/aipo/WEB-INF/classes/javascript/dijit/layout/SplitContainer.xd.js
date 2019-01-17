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
}catch(C){this.sizerWidth=7
}}var B=this.virtualSizer=document.createElement("div");
B.style.position="relative";
B.style.zIndex=10;
B.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(B);
A.setSelectable(B,false)
},startup:function(){if(this._started){return 
}A.forEach(this.getChildren(),function(D,C,B){this._injectChild(D);
if(C<B.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(B){B.domNode.style.position="absolute";
A.addClass(B.domNode,"dijitSplitPane")
},_addSizer:function(){var D=this.sizers.length;
var F=this.sizers[D]=document.createElement("div");
F.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var C=document.createElement("div");
C.className="thumb";
F.appendChild(C);
var B=this;
var E=(function(){var G=D;
return function(H){B.beginSizing(H,G)
}
})();
A.connect(F,"onmousedown",E);
this.domNode.appendChild(F);
A.setSelectable(F,false)
},removeChild:function(C){if(this.sizers.length&&A.indexOf(this.getChildren(),C)!=-1){var B=this.sizers.length-1;
A._destroyElement(this.sizers[B]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(D,B){this.inherited("addChild",arguments);
if(this._started){this._injectChild(D);
var C=this.getChildren();
if(C.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var D=this.getChildren();
if(!D.length){return 
}var F=this.isHorizontal?this.paneWidth:this.paneHeight;
if(D.length>1){F-=this.sizerWidth*(D.length-1)
}var E=0;
A.forEach(D,function(I){E+=I.sizeShare
});
var G=F/E;
var B=0;
A.forEach(D.slice(0,D.length-1),function(J){var I=Math.round(G*J.sizeShare);
J.sizeActual=I;
B+=I
});
D[D.length-1].sizeActual=F-B;
this._checkSizes();
var H=0;
var C=D[0].sizeActual;
this._movePanel(D[0],H,C);
D[0].position=H;
H+=C;
if(!this.sizers){return 
}A.some(D.slice(1),function(J,I){if(!this.sizers[I]){return true
}this._moveSlider(this.sizers[I],H,this.sizerWidth);
this.sizers[I].position=H;
H+=this.sizerWidth;
C=J.sizeActual;
this._movePanel(J,H,C);
J.position=H;
H+=C
},this)
},_movePanel:function(B,E,C){if(this.isHorizontal){B.domNode.style.left=E+"px";
B.domNode.style.top=0;
var D={w:C,h:this.paneHeight};
if(B.resize){B.resize(D)
}else{A.marginBox(B.domNode,D)
}}else{B.domNode.style.left=0;
B.domNode.style.top=E+"px";
var D={w:this.paneWidth,h:C};
if(B.resize){B.resize(D)
}else{A.marginBox(B.domNode,D)
}}},_moveSlider:function(C,D,B){if(this.isHorizontal){C.style.left=D+"px";
C.style.top=0;
A.marginBox(C,{w:B,h:this.paneHeight})
}else{C.style.left=0;
C.style.top=D+"px";
A.marginBox(C,{w:this.paneWidth,h:B})
}},_growPane:function(B,C){if(B>0){if(C.sizeActual>C.sizeMin){if((C.sizeActual-C.sizeMin)>B){C.sizeActual=C.sizeActual-B;
B=0
}else{B-=C.sizeActual-C.sizeMin;
C.sizeActual=C.sizeMin
}}}return B
},_checkSizes:function(){var E=0;
var C=0;
var D=this.getChildren();
A.forEach(D,function(G){C+=G.sizeActual;
E+=G.sizeMin
});
if(E<=C){var B=0;
A.forEach(D,function(G){if(G.sizeActual<G.sizeMin){B+=G.sizeMin-G.sizeActual;
G.sizeActual=G.sizeMin
}});
if(B>0){var F=this.isDraggingLeft?D.reverse():D;
A.forEach(F,function(G){B=this._growPane(B,G)
},this)
}}else{A.forEach(D,function(G){G.sizeActual=Math.round(C*(G.sizeMin/E))
})
}},beginSizing:function(G,E){var D=this.getChildren();
this.paneBefore=D[E];
this.paneAfter=D[E+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[E];
if(!this.cover){this.cover=A.doc.createElement("div");
this.domNode.appendChild(this.cover);
var F=this.cover.style;
F.position="absolute";
F.zIndex=1;
F.top=0;
F.left=0;
F.width="100%";
F.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=A.coords(D[0].domNode,true);
if(this.isHorizontal){var B=(G.layerX?G.layerX:G.offsetX);
var C=G.pageX;
this.originPos=this.originPos.x
}else{var B=(G.layerY?G.layerY:G.offsetY);
var C=G.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=C;
this.screenToClientOffset=C-B;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(A.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(A.connect(document.documentElement,"onmouseup",this,"endSizing"));
A.stopEvent(G)
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
},movePoint:function(){var C=this.lastPoint-this.screenToClientOffset;
var B=C-this.dragOffset;
B=this.legaliseSplitPoint(B);
C=B+this.dragOffset;
this.lastPoint=C+this.screenToClientOffset
},legaliseSplitPoint:function(C){C+=this.sizingSplitter.position;
this.isDraggingLeft=!!(C>0);
if(!this.activeSizing){var D=this.paneBefore.position+this.paneBefore.sizeMin;
if(C<D){C=D
}var B=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(C>B){C=B
}}C-=this.sizingSplitter.position;
this._checkSizes();
return C
},_updateSize:function(){var D=this.lastPoint-this.dragOffset-this.originPos;
var B=this.paneBefore.position;
var C=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=D-B;
this.paneAfter.position=D+this.sizerWidth;
this.paneAfter.sizeActual=C-this.paneAfter.position;
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
},_restoreState:function(){A.forEach(this.getChildren(),function(F,B){var E=this._getCookieName(B);
var C=A.cookie(E);
if(C){var D=parseInt(C);
if(typeof D=="number"){F.sizeShare=D
}}},this)
},_saveState:function(){A.forEach(this.getChildren(),function(C,B){A.cookie(this._getCookieName(B),C.sizeShare)
},this)
}});
A.extend(dijit._Widget,{sizeMin:10,sizeShare:10})
}}});