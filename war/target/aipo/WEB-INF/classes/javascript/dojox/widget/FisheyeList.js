if(!dojo._hasResource["dojox.widget.FisheyeList"]){dojo._hasResource["dojox.widget.FisheyeList"]=true;
dojo.provide("dojox.widget.FisheyeList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.declare("dojox.widget.FisheyeList",[dijit._Widget,dijit._Templated,dijit._Container],{constructor:function(){this.pos={x:-1,y:-1};
this.timerScale=1
},EDGE:{CENTER:0,LEFT:1,RIGHT:2,TOP:3,BOTTOM:4},templateString:'<div class="dojoxFisheyeListBar" dojoAttachPoint="containerNode"></div>',snarfChildDomOutput:true,itemWidth:40,itemHeight:40,itemMaxWidth:150,itemMaxHeight:150,imgNode:null,orientation:"horizontal",isFixed:false,conservativeTrigger:false,effectUnits:2,itemPadding:10,attachEdge:"center",labelEdge:"bottom",postCreate:function(){var A=this.EDGE;
dojo.setSelectable(this.domNode,false);
var B=this.isHorizontal=(this.orientation=="horizontal");
this.selectedNode=-1;
this.isOver=false;
this.hitX1=-1;
this.hitY1=-1;
this.hitX2=-1;
this.hitY2=-1;
this.anchorEdge=this._toEdge(this.attachEdge,A.CENTER);
this.labelEdge=this._toEdge(this.labelEdge,A.TOP);
if(this.labelEdge==A.CENTER){this.labelEdge=A.TOP
}if(B){if(this.anchorEdge==A.LEFT){this.anchorEdge=A.CENTER
}if(this.anchorEdge==A.RIGHT){this.anchorEdge=A.CENTER
}if(this.labelEdge==A.LEFT){this.labelEdge=A.TOP
}if(this.labelEdge==A.RIGHT){this.labelEdge=A.TOP
}}else{if(this.anchorEdge==A.TOP){this.anchorEdge=A.CENTER
}if(this.anchorEdge==A.BOTTOM){this.anchorEdge=A.CENTER
}if(this.labelEdge==A.TOP){this.labelEdge=A.LEFT
}if(this.labelEdge==A.BOTTOM){this.labelEdge=A.LEFT
}}var C=this.effectUnits;
this.proximityLeft=this.itemWidth*(C-0.5);
this.proximityRight=this.itemWidth*(C-0.5);
this.proximityTop=this.itemHeight*(C-0.5);
this.proximityBottom=this.itemHeight*(C-0.5);
if(this.anchorEdge==A.LEFT){this.proximityLeft=0
}if(this.anchorEdge==A.RIGHT){this.proximityRight=0
}if(this.anchorEdge==A.TOP){this.proximityTop=0
}if(this.anchorEdge==A.BOTTOM){this.proximityBottom=0
}if(this.anchorEdge==A.CENTER){this.proximityLeft/=2;
this.proximityRight/=2;
this.proximityTop/=2;
this.proximityBottom/=2
}},startup:function(){this.children=this.getChildren();
this._initializePositioning();
if(!this.conservativeTrigger){this._onMouseMoveHandle=dojo.connect(document.documentElement,"onmousemove",this,"_onMouseMove")
}if(this.isFixed){this._onScrollHandle=dojo.connect(document,"onscroll",this,"_onScroll")
}this._onMouseOutHandle=dojo.connect(document.documentElement,"onmouseout",this,"_onBodyOut");
this._addChildHandle=dojo.connect(this,"addChild",this,"_initializePositioning");
this._onResizeHandle=dojo.connect(window,"onresize",this,"_initializePositioning")
},_initializePositioning:function(){this.itemCount=this.children.length;
this.barWidth=(this.isHorizontal?this.itemCount:1)*this.itemWidth;
this.barHeight=(this.isHorizontal?1:this.itemCount)*this.itemHeight;
this.totalWidth=this.proximityLeft+this.proximityRight+this.barWidth;
this.totalHeight=this.proximityTop+this.proximityBottom+this.barHeight;
for(var A=0;
A<this.children.length;
A++){this.children[A].posX=this.itemWidth*(this.isHorizontal?A:0);
this.children[A].posY=this.itemHeight*(this.isHorizontal?0:A);
this.children[A].cenX=this.children[A].posX+(this.itemWidth/2);
this.children[A].cenY=this.children[A].posY+(this.itemHeight/2);
var B=this.isHorizontal?this.itemWidth:this.itemHeight;
var H=this.effectUnits*B;
var E=this.isHorizontal?this.children[A].cenX:this.children[A].cenY;
var K=this.isHorizontal?this.proximityLeft:this.proximityTop;
var C=this.isHorizontal?this.proximityRight:this.proximityBottom;
var J=this.isHorizontal?this.barWidth:this.barHeight;
var G=H;
var I=H;
if(G>E+K){G=E+K
}if(I>(J-E+C)){I=J-E+C
}this.children[A].effectRangeLeft=G/B;
this.children[A].effectRangeRght=I/B
}this.domNode.style.width=this.barWidth+"px";
this.domNode.style.height=this.barHeight+"px";
for(var A=0;
A<this.children.length;
A++){var F=this.children[A];
var D=F.domNode;
D.style.left=F.posX+"px";
D.style.top=F.posY+"px";
D.style.width=this.itemWidth+"px";
D.style.height=this.itemHeight+"px";
F.imgNode.style.left=this.itemPadding+"%";
F.imgNode.style.top=this.itemPadding+"%";
F.imgNode.style.width=(100-2*this.itemPadding)+"%";
F.imgNode.style.height=(100-2*this.itemPadding)+"%"
}this._calcHitGrid()
},_overElement:function(H,I){H=dojo.byId(H);
var A={x:I.pageX,y:I.pageY};
var B=dojo._getBorderBox(H);
var D=dojo.coords(H,true);
var C=D.y;
var F=C+B.h;
var G=D.x;
var E=G+B.w;
return(A.x>=G&&A.x<=E&&A.y>=C&&A.y<=F)
},_onBodyOut:function(A){if(this._overElement(dojo.body(),A)){return 
}this._setDormant(A)
},_setDormant:function(A){if(!this.isOver){return 
}this.isOver=false;
if(this.conservativeTrigger){dojo.disconnect(this._onMouseMoveHandle)
}this._onGridMouseMove(-1,-1)
},_setActive:function(A){if(this.isOver){return 
}this.isOver=true;
if(this.conservativeTrigger){this._onMouseMoveHandle=dojo.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this.timerScale=0;
this._onMouseMove(A);
this._expandSlowly()
}},_onMouseMove:function(A){if((A.pageX>=this.hitX1)&&(A.pageX<=this.hitX2)&&(A.pageY>=this.hitY1)&&(A.pageY<=this.hitY2)){if(!this.isOver){this._setActive(A)
}this._onGridMouseMove(A.pageX-this.hitX1,A.pageY-this.hitY1)
}else{if(this.isOver){this._setDormant(A)
}}},_onScroll:function(){this._calcHitGrid()
},onResized:function(){this._calcHitGrid()
},_onGridMouseMove:function(B,A){this.pos={x:B,y:A};
this._paint()
},_paint:function(){var H=this.pos.x;
var E=this.pos.y;
if(this.itemCount<=0){return 
}var F=this.isHorizontal?H:E;
var N=this.isHorizontal?this.proximityLeft:this.proximityTop;
var I=this.isHorizontal?this.itemWidth:this.itemHeight;
var G=this.isHorizontal?(1-this.timerScale)*this.itemWidth+this.timerScale*this.itemMaxWidth:(1-this.timerScale)*this.itemHeight+this.timerScale*this.itemMaxHeight;
var B=((F-N)/I)-0.5;
var D=(G/I)-0.5;
if(D>this.effectUnits){D=this.effectUnits
}var L=0;
if(this.anchorEdge==this.EDGE.BOTTOM){var C=(E-this.proximityTop)/this.itemHeight;
L=(C>0.5)?1:E/(this.proximityTop+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.TOP){var C=(E-this.proximityTop)/this.itemHeight;
L=(C<0.5)?1:(this.totalHeight-E)/(this.proximityBottom+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.RIGHT){var C=(H-this.proximityLeft)/this.itemWidth;
L=(C>0.5)?1:H/(this.proximityLeft+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.LEFT){var C=(H-this.proximityLeft)/this.itemWidth;
L=(C<0.5)?1:(this.totalWidth-H)/(this.proximityRight+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.CENTER){if(this.isHorizontal){L=E/(this.totalHeight)
}else{L=H/(this.totalWidth)
}if(L>0.5){L=1-L
}L*=2
}for(var K=0;
K<this.itemCount;
K++){var M=this._weighAt(B,K);
if(M<0){M=0
}this._setItemSize(K,M*L)
}var A=Math.round(B);
var J=0;
if(B<0){A=0
}else{if(B>this.itemCount-1){A=this.itemCount-1
}else{J=(B-A)*((this.isHorizontal?this.itemWidth:this.itemHeight)-this.children[A].sizeMain)
}}this._positionElementsFrom(A,J)
},_weighAt:function(A,B){var C=Math.abs(A-B);
var D=((A-B)>0)?this.children[B].effectRangeRght:this.children[B].effectRangeLeft;
return(C>D)?0:(1-C/D)
},_setItemSize:function(C,D){D*=this.timerScale;
var A=Math.round(this.itemWidth+((this.itemMaxWidth-this.itemWidth)*D));
var B=Math.round(this.itemHeight+((this.itemMaxHeight-this.itemHeight)*D));
if(this.isHorizontal){this.children[C].sizeW=A;
this.children[C].sizeH=B;
this.children[C].sizeMain=A;
this.children[C].sizeOff=B;
var E=0;
if(this.anchorEdge==this.EDGE.TOP){E=(this.children[C].cenY-(this.itemHeight/2))
}else{if(this.anchorEdge==this.EDGE.BOTTOM){E=(this.children[C].cenY-(B-(this.itemHeight/2)))
}else{E=(this.children[C].cenY-(B/2))
}}this.children[C].usualX=Math.round(this.children[C].cenX-(A/2));
this.children[C].domNode.style.top=E+"px";
this.children[C].domNode.style.left=this.children[C].usualX+"px"
}else{this.children[C].sizeW=A;
this.children[C].sizeH=B;
this.children[C].sizeOff=A;
this.children[C].sizeMain=B;
var F=0;
if(this.anchorEdge==this.EDGE.LEFT){F=this.children[C].cenX-(this.itemWidth/2)
}else{if(this.anchorEdge==this.EDGE.RIGHT){F=this.children[C].cenX-(A-(this.itemWidth/2))
}else{F=this.children[C].cenX-(A/2)
}}this.children[C].domNode.style.left=F+"px";
this.children[C].usualY=Math.round(this.children[C].cenY-(B/2));
this.children[C].domNode.style.top=this.children[C].usualY+"px"
}this.children[C].domNode.style.width=A+"px";
this.children[C].domNode.style.height=B+"px";
if(this.children[C].svgNode){this.children[C].svgNode.setSize(A,B)
}},_positionElementsFrom:function(C,D){var E=0;
if(this.isHorizontal){E=Math.round(this.children[C].usualX+D);
this.children[C].domNode.style.left=E+"px"
}else{E=Math.round(this.children[C].usualY+D);
this.children[C].domNode.style.top=E+"px"
}this._positionLabel(this.children[C]);
var F=E;
for(var A=C-1;
A>=0;
A--){F-=this.children[A].sizeMain;
if(this.isHorizontal){this.children[A].domNode.style.left=F+"px"
}else{this.children[A].domNode.style.top=F+"px"
}this._positionLabel(this.children[A])
}var B=E;
for(var A=C+1;
A<this.itemCount;
A++){B+=this.children[A-1].sizeMain;
if(this.isHorizontal){this.children[A].domNode.style.left=B+"px"
}else{this.children[A].domNode.style.top=B+"px"
}this._positionLabel(this.children[A])
}},_positionLabel:function(C){var D=0;
var B=0;
var A=dojo.marginBox(C.lblNode);
if(this.labelEdge==this.EDGE.TOP){D=Math.round((C.sizeW/2)-(A.w/2));
B=-A.h
}if(this.labelEdge==this.EDGE.BOTTOM){D=Math.round((C.sizeW/2)-(A.w/2));
B=C.sizeH
}if(this.labelEdge==this.EDGE.LEFT){D=-A.w;
B=Math.round((C.sizeH/2)-(A.h/2))
}if(this.labelEdge==this.EDGE.RIGHT){D=C.sizeW;
B=Math.round((C.sizeH/2)-(A.h/2))
}C.lblNode.style.left=D+"px";
C.lblNode.style.top=B+"px"
},_calcHitGrid:function(){var A=dojo.coords(this.domNode,true);
this.hitX1=A.x-this.proximityLeft;
this.hitY1=A.y-this.proximityTop;
this.hitX2=this.hitX1+this.totalWidth;
this.hitY2=this.hitY1+this.totalHeight
},_toEdge:function(B,A){return this.EDGE[B.toUpperCase()]||A
},_expandSlowly:function(){if(!this.isOver){return 
}this.timerScale+=0.2;
this._paint();
if(this.timerScale<1){setTimeout(dojo.hitch(this,"_expandSlowly"),10)
}},destroyRecursive:function(){dojo.disconnect(this._onMouseOutHandle);
dojo.disconnect(this._onMouseMoveHandle);
dojo.disconnect(this._addChildHandle);
if(this.isFixed){dojo.disconnect(this._onScrollHandle)
}dojo.disconnect(this._onResizeHandle);
this.inherited("destroyRecursive",arguments)
}});
dojo.declare("dojox.widget.FisheyeListItem",[dijit._Widget,dijit._Templated,dijit._Contained],{iconSrc:"",label:"",id:"",_blankImgPath:dojo.moduleUrl("dojox.widget","FisheyeList/blank.gif"),templateString:'<div class="dojoxFisheyeListItem">  <img class="dojoxFisheyeListItemImage" dojoAttachPoint="imgNode" dojoAttachEvent="onmouseover:onMouseOver,onmouseout:onMouseOut,onclick:onClick">  <div class="dojoxFisheyeListItemLabel" dojoAttachPoint="lblNode"></div></div>',_isNode:function(B){if(typeof Element=="function"){try{return B instanceof Element
}catch(A){}}else{return B&&!isNaN(B.nodeType)
}},_hasParent:function(A){return Boolean(A&&A.parentNode&&this._isNode(A.parentNode))
},postCreate:function(){if((this.iconSrc.toLowerCase().substring(this.iconSrc.length-4)==".png")&&(dojo.isIE)&&(dojo.isIE<7)){if(this._hasParent(this.imgNode)&&this.id!=""){var A=this.imgNode.parentNode;
A.setAttribute("id",this.id)
}this.imgNode.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.iconSrc+"', sizingMethod='scale')";
this.imgNode.src=this._blankImgPath.toString()
}else{if(this._hasParent(this.imgNode)&&this.id!=""){var A=this.imgNode.parentNode;
A.setAttribute("id",this.id)
}this.imgNode.src=this.iconSrc
}if(this.lblNode){this.lblNode.appendChild(document.createTextNode(this.label))
}dojo.setSelectable(this.domNode,false);
this.startup()
},startup:function(){this.parent=this.getParent()
},onMouseOver:function(A){if(!this.parent.isOver){this.parent._setActive(A)
}if(this.label!=""){dojo.addClass(this.lblNode,"dojoxFishSelected");
this.parent._positionLabel(this)
}},onMouseOut:function(A){dojo.removeClass(this.lblNode,"dojoxFishSelected")
},onClick:function(A){}})
};