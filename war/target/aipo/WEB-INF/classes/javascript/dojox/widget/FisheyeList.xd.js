dojo._xdResourceLoaded({depends:[["provide","dojox.widget.FisheyeList"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"]],defineResource:function(A){if(!A._hasResource["dojox.widget.FisheyeList"]){A._hasResource["dojox.widget.FisheyeList"]=true;
A.provide("dojox.widget.FisheyeList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("dijit._Container");
A.declare("dojox.widget.FisheyeList",[dijit._Widget,dijit._Templated,dijit._Container],{constructor:function(){this.pos={x:-1,y:-1};
this.timerScale=1
},EDGE:{CENTER:0,LEFT:1,RIGHT:2,TOP:3,BOTTOM:4},templateString:'<div class="dojoxFisheyeListBar" dojoAttachPoint="containerNode"></div>',snarfChildDomOutput:true,itemWidth:40,itemHeight:40,itemMaxWidth:150,itemMaxHeight:150,imgNode:null,orientation:"horizontal",isFixed:false,conservativeTrigger:false,effectUnits:2,itemPadding:10,attachEdge:"center",labelEdge:"bottom",postCreate:function(){var D=this.EDGE;
A.setSelectable(this.domNode,false);
var B=this.isHorizontal=(this.orientation=="horizontal");
this.selectedNode=-1;
this.isOver=false;
this.hitX1=-1;
this.hitY1=-1;
this.hitX2=-1;
this.hitY2=-1;
this.anchorEdge=this._toEdge(this.attachEdge,D.CENTER);
this.labelEdge=this._toEdge(this.labelEdge,D.TOP);
if(this.labelEdge==D.CENTER){this.labelEdge=D.TOP
}if(B){if(this.anchorEdge==D.LEFT){this.anchorEdge=D.CENTER
}if(this.anchorEdge==D.RIGHT){this.anchorEdge=D.CENTER
}if(this.labelEdge==D.LEFT){this.labelEdge=D.TOP
}if(this.labelEdge==D.RIGHT){this.labelEdge=D.TOP
}}else{if(this.anchorEdge==D.TOP){this.anchorEdge=D.CENTER
}if(this.anchorEdge==D.BOTTOM){this.anchorEdge=D.CENTER
}if(this.labelEdge==D.TOP){this.labelEdge=D.LEFT
}if(this.labelEdge==D.BOTTOM){this.labelEdge=D.LEFT
}}var C=this.effectUnits;
this.proximityLeft=this.itemWidth*(C-0.5);
this.proximityRight=this.itemWidth*(C-0.5);
this.proximityTop=this.itemHeight*(C-0.5);
this.proximityBottom=this.itemHeight*(C-0.5);
if(this.anchorEdge==D.LEFT){this.proximityLeft=0
}if(this.anchorEdge==D.RIGHT){this.proximityRight=0
}if(this.anchorEdge==D.TOP){this.proximityTop=0
}if(this.anchorEdge==D.BOTTOM){this.proximityBottom=0
}if(this.anchorEdge==D.CENTER){this.proximityLeft/=2;
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
for(var D=0;
D<this.children.length;
D++){this.children[D].posX=this.itemWidth*(this.isHorizontal?D:0);
this.children[D].posY=this.itemHeight*(this.isHorizontal?0:D);
this.children[D].cenX=this.children[D].posX+(this.itemWidth/2);
this.children[D].cenY=this.children[D].posY+(this.itemHeight/2);
var E=this.isHorizontal?this.itemWidth:this.itemHeight;
var K=this.effectUnits*E;
var H=this.isHorizontal?this.children[D].cenX:this.children[D].cenY;
var C=this.isHorizontal?this.proximityLeft:this.proximityTop;
var F=this.isHorizontal?this.proximityRight:this.proximityBottom;
var B=this.isHorizontal?this.barWidth:this.barHeight;
var J=K;
var L=K;
if(J>H+C){J=H+C
}if(L>(B-H+F)){L=B-H+F
}this.children[D].effectRangeLeft=J/E;
this.children[D].effectRangeRght=L/E
}this.domNode.style.width=this.barWidth+"px";
this.domNode.style.height=this.barHeight+"px";
for(var D=0;
D<this.children.length;
D++){var I=this.children[D];
var G=I.domNode;
G.style.left=I.posX+"px";
G.style.top=I.posY+"px";
G.style.width=this.itemWidth+"px";
G.style.height=this.itemHeight+"px";
I.imgNode.style.left=this.itemPadding+"%";
I.imgNode.style.top=this.itemPadding+"%";
I.imgNode.style.width=(100-2*this.itemPadding)+"%";
I.imgNode.style.height=(100-2*this.itemPadding)+"%"
}this._calcHitGrid()
},_overElement:function(B,C){B=A.byId(B);
var D={x:C.pageX,y:C.pageY};
var E=A._getBorderBox(B);
var G=A.coords(B,true);
var F=G.y;
var I=F+E.h;
var J=G.x;
var H=J+E.w;
return(D.x>=J&&D.x<=H&&D.y>=F&&D.y<=I)
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
},_onGridMouseMove:function(C,B){this.pos={x:C,y:B};
this._paint()
},_paint:function(){var K=this.pos.x;
var H=this.pos.y;
if(this.itemCount<=0){return 
}var I=this.isHorizontal?K:H;
var B=this.isHorizontal?this.proximityLeft:this.proximityTop;
var L=this.isHorizontal?this.itemWidth:this.itemHeight;
var J=this.isHorizontal?(1-this.timerScale)*this.itemWidth+this.timerScale*this.itemMaxWidth:(1-this.timerScale)*this.itemHeight+this.timerScale*this.itemMaxHeight;
var E=((I-B)/L)-0.5;
var G=(J/L)-0.5;
if(G>this.effectUnits){G=this.effectUnits
}var N=0;
if(this.anchorEdge==this.EDGE.BOTTOM){var F=(H-this.proximityTop)/this.itemHeight;
N=(F>0.5)?1:H/(this.proximityTop+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.TOP){var F=(H-this.proximityTop)/this.itemHeight;
N=(F<0.5)?1:(this.totalHeight-H)/(this.proximityBottom+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.RIGHT){var F=(K-this.proximityLeft)/this.itemWidth;
N=(F>0.5)?1:K/(this.proximityLeft+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.LEFT){var F=(K-this.proximityLeft)/this.itemWidth;
N=(F<0.5)?1:(this.totalWidth-K)/(this.proximityRight+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.CENTER){if(this.isHorizontal){N=H/(this.totalHeight)
}else{N=K/(this.totalWidth)
}if(N>0.5){N=1-N
}N*=2
}for(var D=0;
D<this.itemCount;
D++){var O=this._weighAt(E,D);
if(O<0){O=0
}this._setItemSize(D,O*N)
}var C=Math.round(E);
var M=0;
if(E<0){C=0
}else{if(E>this.itemCount-1){C=this.itemCount-1
}else{M=(E-C)*((this.isHorizontal?this.itemWidth:this.itemHeight)-this.children[C].sizeMain)
}}this._positionElementsFrom(C,M)
},_weighAt:function(D,E){var B=Math.abs(D-E);
var C=((D-E)>0)?this.children[E].effectRangeRght:this.children[E].effectRangeLeft;
return(B>C)?0:(1-B/C)
},_setItemSize:function(F,G){G*=this.timerScale;
var D=Math.round(this.itemWidth+((this.itemMaxWidth-this.itemWidth)*G));
var E=Math.round(this.itemHeight+((this.itemMaxHeight-this.itemHeight)*G));
if(this.isHorizontal){this.children[F].sizeW=D;
this.children[F].sizeH=E;
this.children[F].sizeMain=D;
this.children[F].sizeOff=E;
var C=0;
if(this.anchorEdge==this.EDGE.TOP){C=(this.children[F].cenY-(this.itemHeight/2))
}else{if(this.anchorEdge==this.EDGE.BOTTOM){C=(this.children[F].cenY-(E-(this.itemHeight/2)))
}else{C=(this.children[F].cenY-(E/2))
}}this.children[F].usualX=Math.round(this.children[F].cenX-(D/2));
this.children[F].domNode.style.top=C+"px";
this.children[F].domNode.style.left=this.children[F].usualX+"px"
}else{this.children[F].sizeW=D;
this.children[F].sizeH=E;
this.children[F].sizeOff=D;
this.children[F].sizeMain=E;
var B=0;
if(this.anchorEdge==this.EDGE.LEFT){B=this.children[F].cenX-(this.itemWidth/2)
}else{if(this.anchorEdge==this.EDGE.RIGHT){B=this.children[F].cenX-(D-(this.itemWidth/2))
}else{B=this.children[F].cenX-(D/2)
}}this.children[F].domNode.style.left=B+"px";
this.children[F].usualY=Math.round(this.children[F].cenY-(E/2));
this.children[F].domNode.style.top=this.children[F].usualY+"px"
}this.children[F].domNode.style.width=D+"px";
this.children[F].domNode.style.height=E+"px";
if(this.children[F].svgNode){this.children[F].svgNode.setSize(D,E)
}},_positionElementsFrom:function(F,G){var C=0;
if(this.isHorizontal){C=Math.round(this.children[F].usualX+G);
this.children[F].domNode.style.left=C+"px"
}else{C=Math.round(this.children[F].usualY+G);
this.children[F].domNode.style.top=C+"px"
}this._positionLabel(this.children[F]);
var B=C;
for(var D=F-1;
D>=0;
D--){B-=this.children[D].sizeMain;
if(this.isHorizontal){this.children[D].domNode.style.left=B+"px"
}else{this.children[D].domNode.style.top=B+"px"
}this._positionLabel(this.children[D])
}var E=C;
for(var D=F+1;
D<this.itemCount;
D++){E+=this.children[D-1].sizeMain;
if(this.isHorizontal){this.children[D].domNode.style.left=E+"px"
}else{this.children[D].domNode.style.top=E+"px"
}this._positionLabel(this.children[D])
}},_positionLabel:function(B){var C=0;
var E=0;
var D=A.marginBox(B.lblNode);
if(this.labelEdge==this.EDGE.TOP){C=Math.round((B.sizeW/2)-(D.w/2));
E=-D.h
}if(this.labelEdge==this.EDGE.BOTTOM){C=Math.round((B.sizeW/2)-(D.w/2));
E=B.sizeH
}if(this.labelEdge==this.EDGE.LEFT){C=-D.w;
E=Math.round((B.sizeH/2)-(D.h/2))
}if(this.labelEdge==this.EDGE.RIGHT){C=B.sizeW;
E=Math.round((B.sizeH/2)-(D.h/2))
}B.lblNode.style.left=C+"px";
B.lblNode.style.top=E+"px"
},_calcHitGrid:function(){var B=A.coords(this.domNode,true);
this.hitX1=B.x-this.proximityLeft;
this.hitY1=B.y-this.proximityTop;
this.hitX2=this.hitX1+this.totalWidth;
this.hitY2=this.hitY1+this.totalHeight
},_toEdge:function(C,B){return this.EDGE[C.toUpperCase()]||B
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
A.declare("dojox.widget.FisheyeListItem",[dijit._Widget,dijit._Templated,dijit._Contained],{iconSrc:"",label:"",id:"",_blankImgPath:A.moduleUrl("dojox.widget","FisheyeList/blank.gif"),templateString:'<div class="dojoxFisheyeListItem">  <img class="dojoxFisheyeListItemImage" dojoAttachPoint="imgNode" dojoAttachEvent="onmouseover:onMouseOver,onmouseout:onMouseOut,onclick:onClick">  <div class="dojoxFisheyeListItemLabel" dojoAttachPoint="lblNode"></div></div>',_isNode:function(C){if(typeof Element=="function"){try{return C instanceof Element
}catch(B){}}else{return C&&!isNaN(C.nodeType)
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