dojo._xdResourceLoaded({depends:[["provide","dojox.widget.FisheyeList"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"]],defineResource:function(A){if(!A._hasResource["dojox.widget.FisheyeList"]){A._hasResource["dojox.widget.FisheyeList"]=true;
A.provide("dojox.widget.FisheyeList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("dijit._Container");
A.declare("dojox.widget.FisheyeList",[dijit._Widget,dijit._Templated,dijit._Container],{constructor:function(){this.pos={x:-1,y:-1};
this.timerScale=1
},EDGE:{CENTER:0,LEFT:1,RIGHT:2,TOP:3,BOTTOM:4},templateString:'<div class="dojoxFisheyeListBar" dojoAttachPoint="containerNode"></div>',snarfChildDomOutput:true,itemWidth:40,itemHeight:40,itemMaxWidth:150,itemMaxHeight:150,imgNode:null,orientation:"horizontal",isFixed:false,conservativeTrigger:false,effectUnits:2,itemPadding:10,attachEdge:"center",labelEdge:"bottom",postCreate:function(){var C=this.EDGE;
A.setSelectable(this.domNode,false);
var D=this.isHorizontal=(this.orientation=="horizontal");
this.selectedNode=-1;
this.isOver=false;
this.hitX1=-1;
this.hitY1=-1;
this.hitX2=-1;
this.hitY2=-1;
this.anchorEdge=this._toEdge(this.attachEdge,C.CENTER);
this.labelEdge=this._toEdge(this.labelEdge,C.TOP);
if(this.labelEdge==C.CENTER){this.labelEdge=C.TOP
}if(D){if(this.anchorEdge==C.LEFT){this.anchorEdge=C.CENTER
}if(this.anchorEdge==C.RIGHT){this.anchorEdge=C.CENTER
}if(this.labelEdge==C.LEFT){this.labelEdge=C.TOP
}if(this.labelEdge==C.RIGHT){this.labelEdge=C.TOP
}}else{if(this.anchorEdge==C.TOP){this.anchorEdge=C.CENTER
}if(this.anchorEdge==C.BOTTOM){this.anchorEdge=C.CENTER
}if(this.labelEdge==C.TOP){this.labelEdge=C.LEFT
}if(this.labelEdge==C.BOTTOM){this.labelEdge=C.LEFT
}}var B=this.effectUnits;
this.proximityLeft=this.itemWidth*(B-0.5);
this.proximityRight=this.itemWidth*(B-0.5);
this.proximityTop=this.itemHeight*(B-0.5);
this.proximityBottom=this.itemHeight*(B-0.5);
if(this.anchorEdge==C.LEFT){this.proximityLeft=0
}if(this.anchorEdge==C.RIGHT){this.proximityRight=0
}if(this.anchorEdge==C.TOP){this.proximityTop=0
}if(this.anchorEdge==C.BOTTOM){this.proximityBottom=0
}if(this.anchorEdge==C.CENTER){this.proximityLeft/=2;
this.proximityRight/=2;
this.proximityTop/=2;
this.proximityBottom/=2
}},startup:function(){this.children=this.getChildren();
this._initializePositioning();
if(!this.conservativeTrigger){this._onMouseMoveHandle=A.connect(document.documentElement,"onmousemove",this,"_onMouseMove")
}if(this.isFixed){this._onScrollHandle=A.connect(document,"onscroll",this,"_onScroll")
}this._onMouseOutHandle=A.connect(document.documentElement,"onmouseout",this,"_onBodyOut");
this._addChildHandle=A.connect(this,"addChild",this,"_initializePositioning");
this._onResizeHandle=A.connect(window,"onresize",this,"_initializePositioning")
},_initializePositioning:function(){this.itemCount=this.children.length;
this.barWidth=(this.isHorizontal?this.itemCount:1)*this.itemWidth;
this.barHeight=(this.isHorizontal?1:this.itemCount)*this.itemHeight;
this.totalWidth=this.proximityLeft+this.proximityRight+this.barWidth;
this.totalHeight=this.proximityTop+this.proximityBottom+this.barHeight;
for(var F=0;
F<this.children.length;
F++){this.children[F].posX=this.itemWidth*(this.isHorizontal?F:0);
this.children[F].posY=this.itemHeight*(this.isHorizontal?0:F);
this.children[F].cenX=this.children[F].posX+(this.itemWidth/2);
this.children[F].cenY=this.children[F].posY+(this.itemHeight/2);
var G=this.isHorizontal?this.itemWidth:this.itemHeight;
var B=this.effectUnits*G;
var J=this.isHorizontal?this.children[F].cenX:this.children[F].cenY;
var E=this.isHorizontal?this.proximityLeft:this.proximityTop;
var H=this.isHorizontal?this.proximityRight:this.proximityBottom;
var D=this.isHorizontal?this.barWidth:this.barHeight;
var L=B;
var C=B;
if(L>J+E){L=J+E
}if(C>(D-J+H)){C=D-J+H
}this.children[F].effectRangeLeft=L/G;
this.children[F].effectRangeRght=C/G
}this.domNode.style.width=this.barWidth+"px";
this.domNode.style.height=this.barHeight+"px";
for(var F=0;
F<this.children.length;
F++){var K=this.children[F];
var I=K.domNode;
I.style.left=K.posX+"px";
I.style.top=K.posY+"px";
I.style.width=this.itemWidth+"px";
I.style.height=this.itemHeight+"px";
K.imgNode.style.left=this.itemPadding+"%";
K.imgNode.style.top=this.itemPadding+"%";
K.imgNode.style.width=(100-2*this.itemPadding)+"%";
K.imgNode.style.height=(100-2*this.itemPadding)+"%"
}this._calcHitGrid()
},_overElement:function(D,E){D=A.byId(D);
var F={x:E.pageX,y:E.pageY};
var G=A._getBorderBox(D);
var I=A.coords(D,true);
var H=I.y;
var B=H+G.h;
var C=I.x;
var J=C+G.w;
return(F.x>=C&&F.x<=J&&F.y>=H&&F.y<=B)
},_onBodyOut:function(B){if(this._overElement(A.body(),B)){return 
}this._setDormant(B)
},_setDormant:function(B){if(!this.isOver){return 
}this.isOver=false;
if(this.conservativeTrigger){A.disconnect(this._onMouseMoveHandle)
}this._onGridMouseMove(-1,-1)
},_setActive:function(B){if(this.isOver){return 
}this.isOver=true;
if(this.conservativeTrigger){this._onMouseMoveHandle=A.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this.timerScale=0;
this._onMouseMove(B);
this._expandSlowly()
}},_onMouseMove:function(B){if((B.pageX>=this.hitX1)&&(B.pageX<=this.hitX2)&&(B.pageY>=this.hitY1)&&(B.pageY<=this.hitY2)){if(!this.isOver){this._setActive(B)
}this._onGridMouseMove(B.pageX-this.hitX1,B.pageY-this.hitY1)
}else{if(this.isOver){this._setDormant(B)
}}},_onScroll:function(){this._calcHitGrid()
},onResized:function(){this._calcHitGrid()
},_onGridMouseMove:function(B,C){this.pos={x:B,y:C};
this._paint()
},_paint:function(){var O=this.pos.x;
var L=this.pos.y;
if(this.itemCount<=0){return 
}var M=this.isHorizontal?O:L;
var G=this.isHorizontal?this.proximityLeft:this.proximityTop;
var B=this.isHorizontal?this.itemWidth:this.itemHeight;
var N=this.isHorizontal?(1-this.timerScale)*this.itemWidth+this.timerScale*this.itemMaxWidth:(1-this.timerScale)*this.itemHeight+this.timerScale*this.itemMaxHeight;
var I=((M-G)/B)-0.5;
var K=(N/B)-0.5;
if(K>this.effectUnits){K=this.effectUnits
}var E=0;
if(this.anchorEdge==this.EDGE.BOTTOM){var J=(L-this.proximityTop)/this.itemHeight;
E=(J>0.5)?1:L/(this.proximityTop+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.TOP){var J=(L-this.proximityTop)/this.itemHeight;
E=(J<0.5)?1:(this.totalHeight-L)/(this.proximityBottom+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.RIGHT){var J=(O-this.proximityLeft)/this.itemWidth;
E=(J>0.5)?1:O/(this.proximityLeft+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.LEFT){var J=(O-this.proximityLeft)/this.itemWidth;
E=(J<0.5)?1:(this.totalWidth-O)/(this.proximityRight+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.CENTER){if(this.isHorizontal){E=L/(this.totalHeight)
}else{E=O/(this.totalWidth)
}if(E>0.5){E=1-E
}E*=2
}for(var D=0;
D<this.itemCount;
D++){var F=this._weighAt(I,D);
if(F<0){F=0
}this._setItemSize(D,F*E)
}var H=Math.round(I);
var C=0;
if(I<0){H=0
}else{if(I>this.itemCount-1){H=this.itemCount-1
}else{C=(I-H)*((this.isHorizontal?this.itemWidth:this.itemHeight)-this.children[H].sizeMain)
}}this._positionElementsFrom(H,C)
},_weighAt:function(C,D){var E=Math.abs(C-D);
var B=((C-D)>0)?this.children[D].effectRangeRght:this.children[D].effectRangeLeft;
return(E>B)?0:(1-E/B)
},_setItemSize:function(E,F){F*=this.timerScale;
var C=Math.round(this.itemWidth+((this.itemMaxWidth-this.itemWidth)*F));
var D=Math.round(this.itemHeight+((this.itemMaxHeight-this.itemHeight)*F));
if(this.isHorizontal){this.children[E].sizeW=C;
this.children[E].sizeH=D;
this.children[E].sizeMain=C;
this.children[E].sizeOff=D;
var G=0;
if(this.anchorEdge==this.EDGE.TOP){G=(this.children[E].cenY-(this.itemHeight/2))
}else{if(this.anchorEdge==this.EDGE.BOTTOM){G=(this.children[E].cenY-(D-(this.itemHeight/2)))
}else{G=(this.children[E].cenY-(D/2))
}}this.children[E].usualX=Math.round(this.children[E].cenX-(C/2));
this.children[E].domNode.style.top=G+"px";
this.children[E].domNode.style.left=this.children[E].usualX+"px"
}else{this.children[E].sizeW=C;
this.children[E].sizeH=D;
this.children[E].sizeOff=C;
this.children[E].sizeMain=D;
var B=0;
if(this.anchorEdge==this.EDGE.LEFT){B=this.children[E].cenX-(this.itemWidth/2)
}else{if(this.anchorEdge==this.EDGE.RIGHT){B=this.children[E].cenX-(C-(this.itemWidth/2))
}else{B=this.children[E].cenX-(C/2)
}}this.children[E].domNode.style.left=B+"px";
this.children[E].usualY=Math.round(this.children[E].cenY-(D/2));
this.children[E].domNode.style.top=this.children[E].usualY+"px"
}this.children[E].domNode.style.width=C+"px";
this.children[E].domNode.style.height=D+"px";
if(this.children[E].svgNode){this.children[E].svgNode.setSize(C,D)
}},_positionElementsFrom:function(E,F){var G=0;
if(this.isHorizontal){G=Math.round(this.children[E].usualX+F);
this.children[E].domNode.style.left=G+"px"
}else{G=Math.round(this.children[E].usualY+F);
this.children[E].domNode.style.top=G+"px"
}this._positionLabel(this.children[E]);
var B=G;
for(var C=E-1;
C>=0;
C--){B-=this.children[C].sizeMain;
if(this.isHorizontal){this.children[C].domNode.style.left=B+"px"
}else{this.children[C].domNode.style.top=B+"px"
}this._positionLabel(this.children[C])
}var D=G;
for(var C=E+1;
C<this.itemCount;
C++){D+=this.children[C-1].sizeMain;
if(this.isHorizontal){this.children[C].domNode.style.left=D+"px"
}else{this.children[C].domNode.style.top=D+"px"
}this._positionLabel(this.children[C])
}},_positionLabel:function(E){var B=0;
var D=0;
var C=A.marginBox(E.lblNode);
if(this.labelEdge==this.EDGE.TOP){B=Math.round((E.sizeW/2)-(C.w/2));
D=-C.h
}if(this.labelEdge==this.EDGE.BOTTOM){B=Math.round((E.sizeW/2)-(C.w/2));
D=E.sizeH
}if(this.labelEdge==this.EDGE.LEFT){B=-C.w;
D=Math.round((E.sizeH/2)-(C.h/2))
}if(this.labelEdge==this.EDGE.RIGHT){B=E.sizeW;
D=Math.round((E.sizeH/2)-(C.h/2))
}E.lblNode.style.left=B+"px";
E.lblNode.style.top=D+"px"
},_calcHitGrid:function(){var B=A.coords(this.domNode,true);
this.hitX1=B.x-this.proximityLeft;
this.hitY1=B.y-this.proximityTop;
this.hitX2=this.hitX1+this.totalWidth;
this.hitY2=this.hitY1+this.totalHeight
},_toEdge:function(B,C){return this.EDGE[B.toUpperCase()]||C
},_expandSlowly:function(){if(!this.isOver){return 
}this.timerScale+=0.2;
this._paint();
if(this.timerScale<1){setTimeout(A.hitch(this,"_expandSlowly"),10)
}},destroyRecursive:function(){A.disconnect(this._onMouseOutHandle);
A.disconnect(this._onMouseMoveHandle);
A.disconnect(this._addChildHandle);
if(this.isFixed){A.disconnect(this._onScrollHandle)
}A.disconnect(this._onResizeHandle);
this.inherited("destroyRecursive",arguments)
}});
A.declare("dojox.widget.FisheyeListItem",[dijit._Widget,dijit._Templated,dijit._Contained],{iconSrc:"",label:"",id:"",_blankImgPath:A.moduleUrl("dojox.widget","FisheyeList/blank.gif"),templateString:'<div class="dojoxFisheyeListItem">  <img class="dojoxFisheyeListItemImage" dojoAttachPoint="imgNode" dojoAttachEvent="onmouseover:onMouseOver,onmouseout:onMouseOut,onclick:onClick">  <div class="dojoxFisheyeListItemLabel" dojoAttachPoint="lblNode"></div></div>',_isNode:function(B){if(typeof Element=="function"){try{return B instanceof Element
}catch(C){}}else{return B&&!isNaN(B.nodeType)
}},_hasParent:function(B){return Boolean(B&&B.parentNode&&this._isNode(B.parentNode))
},postCreate:function(){if((this.iconSrc.toLowerCase().substring(this.iconSrc.length-4)==".png")&&(A.isIE)&&(A.isIE<7)){if(this._hasParent(this.imgNode)&&this.id!=""){var B=this.imgNode.parentNode;
B.setAttribute("id",this.id)
}this.imgNode.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.iconSrc+"', sizingMethod='scale')";
this.imgNode.src=this._blankImgPath.toString()
}else{if(this._hasParent(this.imgNode)&&this.id!=""){var B=this.imgNode.parentNode;
B.setAttribute("id",this.id)
}this.imgNode.src=this.iconSrc
}if(this.lblNode){this.lblNode.appendChild(document.createTextNode(this.label))
}A.setSelectable(this.domNode,false);
this.startup()
},startup:function(){this.parent=this.getParent()
},onMouseOver:function(B){if(!this.parent.isOver){this.parent._setActive(B)
}if(this.label!=""){A.addClass(this.lblNode,"dojoxFishSelected");
this.parent._positionLabel(this)
}},onMouseOut:function(B){A.removeClass(this.lblNode,"dojoxFishSelected")
},onClick:function(B){}})
}}});