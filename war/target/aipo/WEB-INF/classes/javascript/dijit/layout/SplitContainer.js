if(!dojo._hasResource["dijit.layout.SplitContainer"]){dojo._hasResource["dijit.layout.SplitContainer"]=true;
dojo.provide("dijit.layout.SplitContainer");
dojo.require("dojo.cookie");
dojo.require("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout.SplitContainer",dijit.layout._LayoutWidget,{activeSizing:false,sizerWidth:7,orientation:"horizontal",persist:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.isHorizontal=(this.orientation=="horizontal")
},postCreate:function(){this.inherited("postCreate",arguments);
this.sizers=[];
dojo.addClass(this.domNode,"dijitSplitContainer");
if(dojo.isMozilla){this.domNode.style.overflow="-moz-scrollbars-none"
}if(typeof this.sizerWidth=="object"){try{this.sizerWidth=parseInt(this.sizerWidth.toString())
}catch(A){this.sizerWidth=7
}}var B=this.virtualSizer=document.createElement("div");
B.style.position="relative";
B.style.zIndex=10;
B.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(B);
dojo.setSelectable(B,false)
},startup:function(){if(this._started){return 
}dojo.forEach(this.getChildren(),function(B,A,C){this._injectChild(B);
if(A<C.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(A){A.domNode.style.position="absolute";
dojo.addClass(A.domNode,"dijitSplitPane")
},_addSizer:function(){var B=this.sizers.length;
var D=this.sizers[B]=document.createElement("div");
D.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var A=document.createElement("div");
A.className="thumb";
D.appendChild(A);
var E=this;
var C=(function(){var F=B;
return function(G){E.beginSizing(G,F)
}
})();
dojo.connect(D,"onmousedown",C);
this.domNode.appendChild(D);
dojo.setSelectable(D,false)
},removeChild:function(A){if(this.sizers.length&&dojo.indexOf(this.getChildren(),A)!=-1){var B=this.sizers.length-1;
dojo._destroyElement(this.sizers[B]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(B,C){this.inherited("addChild",arguments);
if(this._started){this._injectChild(B);
var A=this.getChildren();
if(A.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var G=this.getChildren();
if(!G.length){return 
}var B=this.isHorizontal?this.paneWidth:this.paneHeight;
if(G.length>1){B-=this.sizerWidth*(G.length-1)
}var A=0;
dojo.forEach(G,function(H){A+=H.sizeShare
});
var C=B/A;
var E=0;
dojo.forEach(G.slice(0,G.length-1),function(H){var I=Math.round(C*H.sizeShare);
H.sizeActual=I;
E+=I
});
G[G.length-1].sizeActual=B-E;
this._checkSizes();
var D=0;
var F=G[0].sizeActual;
this._movePanel(G[0],D,F);
G[0].position=D;
D+=F;
if(!this.sizers){return 
}dojo.some(G.slice(1),function(H,I){if(!this.sizers[I]){return true
}this._moveSlider(this.sizers[I],D,this.sizerWidth);
this.sizers[I].position=D;
D+=this.sizerWidth;
F=H.sizeActual;
this._movePanel(H,D,F);
H.position=D;
D+=F
},this)
},_movePanel:function(D,C,A){if(this.isHorizontal){D.domNode.style.left=C+"px";
D.domNode.style.top=0;
var B={w:A,h:this.paneHeight};
if(D.resize){D.resize(B)
}else{dojo.marginBox(D.domNode,B)
}}else{D.domNode.style.left=0;
D.domNode.style.top=C+"px";
var B={w:this.paneWidth,h:A};
if(D.resize){D.resize(B)
}else{dojo.marginBox(D.domNode,B)
}}},_moveSlider:function(A,B,C){if(this.isHorizontal){A.style.left=B+"px";
A.style.top=0;
dojo.marginBox(A,{w:C,h:this.paneHeight})
}else{A.style.left=0;
A.style.top=B+"px";
dojo.marginBox(A,{w:this.paneWidth,h:C})
}},_growPane:function(B,A){if(B>0){if(A.sizeActual>A.sizeMin){if((A.sizeActual-A.sizeMin)>B){A.sizeActual=A.sizeActual-B;
B=0
}else{B-=A.sizeActual-A.sizeMin;
A.sizeActual=A.sizeMin
}}}return B
},_checkSizes:function(){var C=0;
var A=0;
var B=this.getChildren();
dojo.forEach(B,function(F){A+=F.sizeActual;
C+=F.sizeMin
});
if(C<=A){var E=0;
dojo.forEach(B,function(F){if(F.sizeActual<F.sizeMin){E+=F.sizeMin-F.sizeActual;
F.sizeActual=F.sizeMin
}});
if(E>0){var D=this.isDraggingLeft?B.reverse():B;
dojo.forEach(D,function(F){E=this._growPane(E,F)
},this)
}}else{dojo.forEach(B,function(F){F.sizeActual=Math.round(A*(F.sizeMin/C))
})
}},beginSizing:function(E,C){var B=this.getChildren();
this.paneBefore=B[C];
this.paneAfter=B[C+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[C];
if(!this.cover){this.cover=dojo.doc.createElement("div");
this.domNode.appendChild(this.cover);
var D=this.cover.style;
D.position="absolute";
D.zIndex=1;
D.top=0;
D.left=0;
D.width="100%";
D.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=dojo.coords(B[0].domNode,true);
if(this.isHorizontal){var F=(E.layerX?E.layerX:E.offsetX);
var A=E.pageX;
this.originPos=this.originPos.x
}else{var F=(E.layerY?E.layerY:E.offsetY);
var A=E.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=A;
this.screenToClientOffset=A-F;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(dojo.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(dojo.connect(document.documentElement,"onmouseup",this,"endSizing"));
dojo.stopEvent(E)
},changeSizing:function(A){if(!this.isSizing){return 
}this.lastPoint=this.isHorizontal?A.pageX:A.pageY;
this.movePoint();
if(this.activeSizing){this._updateSize()
}else{this._moveSizingLine()
}dojo.stopEvent(A)
},endSizing:function(A){if(!this.isSizing){return 
}if(this.cover){this.cover.style.zIndex=-1
}if(!this.activeSizing){this._hideSizingLine()
}this._updateSize();
this.isSizing=false;
if(this.persist){this._saveState(this)
}dojo.forEach(this._connects,dojo.disconnect)
},movePoint:function(){var A=this.lastPoint-this.screenToClientOffset;
var B=A-this.dragOffset;
B=this.legaliseSplitPoint(B);
A=B+this.dragOffset;
this.lastPoint=A+this.screenToClientOffset
},legaliseSplitPoint:function(A){A+=this.sizingSplitter.position;
this.isDraggingLeft=!!(A>0);
if(!this.activeSizing){var B=this.paneBefore.position+this.paneBefore.sizeMin;
if(A<B){A=B
}var C=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(A>C){A=C
}}A-=this.sizingSplitter.position;
this._checkSizes();
return A
},_updateSize:function(){var B=this.lastPoint-this.dragOffset-this.originPos;
var C=this.paneBefore.position;
var A=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=B-C;
this.paneAfter.position=B+this.sizerWidth;
this.paneAfter.sizeActual=A-this.paneAfter.position;
dojo.forEach(this.getChildren(),function(D){D.sizeShare=D.sizeActual
});
if(this._started){this.layout()
}},_showSizingLine:function(){this._moveSizingLine();
dojo.marginBox(this.virtualSizer,this.isHorizontal?{w:this.sizerWidth,h:this.paneHeight}:{w:this.paneWidth,h:this.sizerWidth});
this.virtualSizer.style.display="block"
},_hideSizingLine:function(){this.virtualSizer.style.display="none"
},_moveSizingLine:function(){var A=(this.lastPoint-this.startPoint)+this.sizingSplitter.position;
dojo.style(this.virtualSizer,(this.isHorizontal?"left":"top"),A+"px")
},_getCookieName:function(A){return this.id+"_"+A
},_restoreState:function(){dojo.forEach(this.getChildren(),function(D,E){var C=this._getCookieName(E);
var A=dojo.cookie(C);
if(A){var B=parseInt(A);
if(typeof B=="number"){D.sizeShare=B
}}},this)
},_saveState:function(){dojo.forEach(this.getChildren(),function(A,B){dojo.cookie(this._getCookieName(B),A.sizeShare)
},this)
}});
dojo.extend(dijit._Widget,{sizeMin:10,sizeShare:10})
};