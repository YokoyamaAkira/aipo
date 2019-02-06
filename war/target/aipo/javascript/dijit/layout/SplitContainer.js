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
}catch(B){this.sizerWidth=7
}}var A=this.virtualSizer=document.createElement("div");
A.style.position="relative";
A.style.zIndex=10;
A.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(A);
dojo.setSelectable(A,false)
},startup:function(){if(this._started){return 
}dojo.forEach(this.getChildren(),function(C,B,A){this._injectChild(C);
if(B<A.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(A){A.domNode.style.position="absolute";
dojo.addClass(A.domNode,"dijitSplitPane")
},_addSizer:function(){var C=this.sizers.length;
var E=this.sizers[C]=document.createElement("div");
E.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var B=document.createElement("div");
B.className="thumb";
E.appendChild(B);
var A=this;
var D=(function(){var F=C;
return function(G){A.beginSizing(G,F)
}
})();
dojo.connect(E,"onmousedown",D);
this.domNode.appendChild(E);
dojo.setSelectable(E,false)
},removeChild:function(B){if(this.sizers.length&&dojo.indexOf(this.getChildren(),B)!=-1){var A=this.sizers.length-1;
dojo._destroyElement(this.sizers[A]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(C,A){this.inherited("addChild",arguments);
if(this._started){this._injectChild(C);
var B=this.getChildren();
if(B.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var C=this.getChildren();
if(!C.length){return 
}var E=this.isHorizontal?this.paneWidth:this.paneHeight;
if(C.length>1){E-=this.sizerWidth*(C.length-1)
}var D=0;
dojo.forEach(C,function(H){D+=H.sizeShare
});
var F=E/D;
var A=0;
dojo.forEach(C.slice(0,C.length-1),function(I){var H=Math.round(F*I.sizeShare);
I.sizeActual=H;
A+=H
});
C[C.length-1].sizeActual=E-A;
this._checkSizes();
var G=0;
var B=C[0].sizeActual;
this._movePanel(C[0],G,B);
C[0].position=G;
G+=B;
if(!this.sizers){return 
}dojo.some(C.slice(1),function(I,H){if(!this.sizers[H]){return true
}this._moveSlider(this.sizers[H],G,this.sizerWidth);
this.sizers[H].position=G;
G+=this.sizerWidth;
B=I.sizeActual;
this._movePanel(I,G,B);
I.position=G;
G+=B
},this)
},_movePanel:function(A,D,B){if(this.isHorizontal){A.domNode.style.left=D+"px";
A.domNode.style.top=0;
var C={w:B,h:this.paneHeight};
if(A.resize){A.resize(C)
}else{dojo.marginBox(A.domNode,C)
}}else{A.domNode.style.left=0;
A.domNode.style.top=D+"px";
var C={w:this.paneWidth,h:B};
if(A.resize){A.resize(C)
}else{dojo.marginBox(A.domNode,C)
}}},_moveSlider:function(B,C,A){if(this.isHorizontal){B.style.left=C+"px";
B.style.top=0;
dojo.marginBox(B,{w:A,h:this.paneHeight})
}else{B.style.left=0;
B.style.top=C+"px";
dojo.marginBox(B,{w:this.paneWidth,h:A})
}},_growPane:function(A,B){if(A>0){if(B.sizeActual>B.sizeMin){if((B.sizeActual-B.sizeMin)>A){B.sizeActual=B.sizeActual-A;
A=0
}else{A-=B.sizeActual-B.sizeMin;
B.sizeActual=B.sizeMin
}}}return A
},_checkSizes:function(){var D=0;
var B=0;
var C=this.getChildren();
dojo.forEach(C,function(F){B+=F.sizeActual;
D+=F.sizeMin
});
if(D<=B){var A=0;
dojo.forEach(C,function(F){if(F.sizeActual<F.sizeMin){A+=F.sizeMin-F.sizeActual;
F.sizeActual=F.sizeMin
}});
if(A>0){var E=this.isDraggingLeft?C.reverse():C;
dojo.forEach(E,function(F){A=this._growPane(A,F)
},this)
}}else{dojo.forEach(C,function(F){F.sizeActual=Math.round(B*(F.sizeMin/D))
})
}},beginSizing:function(F,D){var C=this.getChildren();
this.paneBefore=C[D];
this.paneAfter=C[D+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[D];
if(!this.cover){this.cover=dojo.doc.createElement("div");
this.domNode.appendChild(this.cover);
var E=this.cover.style;
E.position="absolute";
E.zIndex=1;
E.top=0;
E.left=0;
E.width="100%";
E.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=dojo.coords(C[0].domNode,true);
if(this.isHorizontal){var A=(F.layerX?F.layerX:F.offsetX);
var B=F.pageX;
this.originPos=this.originPos.x
}else{var A=(F.layerY?F.layerY:F.offsetY);
var B=F.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=B;
this.screenToClientOffset=B-A;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(dojo.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(dojo.connect(document.documentElement,"onmouseup",this,"endSizing"));
dojo.stopEvent(F)
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
},movePoint:function(){var B=this.lastPoint-this.screenToClientOffset;
var A=B-this.dragOffset;
A=this.legaliseSplitPoint(A);
B=A+this.dragOffset;
this.lastPoint=B+this.screenToClientOffset
},legaliseSplitPoint:function(B){B+=this.sizingSplitter.position;
this.isDraggingLeft=!!(B>0);
if(!this.activeSizing){var C=this.paneBefore.position+this.paneBefore.sizeMin;
if(B<C){B=C
}var A=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(B>A){B=A
}}B-=this.sizingSplitter.position;
this._checkSizes();
return B
},_updateSize:function(){var C=this.lastPoint-this.dragOffset-this.originPos;
var A=this.paneBefore.position;
var B=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=C-A;
this.paneAfter.position=C+this.sizerWidth;
this.paneAfter.sizeActual=B-this.paneAfter.position;
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
},_restoreState:function(){dojo.forEach(this.getChildren(),function(E,A){var D=this._getCookieName(A);
var B=dojo.cookie(D);
if(B){var C=parseInt(B);
if(typeof C=="number"){E.sizeShare=C
}}},this)
},_saveState:function(){dojo.forEach(this.getChildren(),function(B,A){dojo.cookie(this._getCookieName(A),B.sizeShare)
},this)
}});
dojo.extend(dijit._Widget,{sizeMin:10,sizeShare:10})
};