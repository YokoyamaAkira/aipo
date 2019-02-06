if(!dojo._hasResource["dojox.widget.FisheyeList"]){dojo._hasResource["dojox.widget.FisheyeList"]=true;
dojo.provide("dojox.widget.FisheyeList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.declare("dojox.widget.FisheyeList",[dijit._Widget,dijit._Templated,dijit._Container],{constructor:function(){this.pos={x:-1,y:-1};
this.timerScale=1
},EDGE:{CENTER:0,LEFT:1,RIGHT:2,TOP:3,BOTTOM:4},templateString:'<div class="dojoxFisheyeListBar" dojoAttachPoint="containerNode"></div>',snarfChildDomOutput:true,itemWidth:40,itemHeight:40,itemMaxWidth:150,itemMaxHeight:150,imgNode:null,orientation:"horizontal",isFixed:false,conservativeTrigger:false,effectUnits:2,itemPadding:10,attachEdge:"center",labelEdge:"bottom",postCreate:function(){var B=this.EDGE;
dojo.setSelectable(this.domNode,false);
var C=this.isHorizontal=(this.orientation=="horizontal");
this.selectedNode=-1;
this.isOver=false;
this.hitX1=-1;
this.hitY1=-1;
this.hitX2=-1;
this.hitY2=-1;
this.anchorEdge=this._toEdge(this.attachEdge,B.CENTER);
this.labelEdge=this._toEdge(this.labelEdge,B.TOP);
if(this.labelEdge==B.CENTER){this.labelEdge=B.TOP
}if(C){if(this.anchorEdge==B.LEFT){this.anchorEdge=B.CENTER
}if(this.anchorEdge==B.RIGHT){this.anchorEdge=B.CENTER
}if(this.labelEdge==B.LEFT){this.labelEdge=B.TOP
}if(this.labelEdge==B.RIGHT){this.labelEdge=B.TOP
}}else{if(this.anchorEdge==B.TOP){this.anchorEdge=B.CENTER
}if(this.anchorEdge==B.BOTTOM){this.anchorEdge=B.CENTER
}if(this.labelEdge==B.TOP){this.labelEdge=B.LEFT
}if(this.labelEdge==B.BOTTOM){this.labelEdge=B.LEFT
}}var A=this.effectUnits;
this.proximityLeft=this.itemWidth*(A-0.5);
this.proximityRight=this.itemWidth*(A-0.5);
this.proximityTop=this.itemHeight*(A-0.5);
this.proximityBottom=this.itemHeight*(A-0.5);
if(this.anchorEdge==B.LEFT){this.proximityLeft=0
}if(this.anchorEdge==B.RIGHT){this.proximityRight=0
}if(this.anchorEdge==B.TOP){this.proximityTop=0
}if(this.anchorEdge==B.BOTTOM){this.proximityBottom=0
}if(this.anchorEdge==B.CENTER){this.proximityLeft/=2;
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
for(var E=0;
E<this.children.length;
E++){this.children[E].posX=this.itemWidth*(this.isHorizontal?E:0);
this.children[E].posY=this.itemHeight*(this.isHorizontal?0:E);
this.children[E].cenX=this.children[E].posX+(this.itemWidth/2);
this.children[E].cenY=this.children[E].posY+(this.itemHeight/2);
var F=this.isHorizontal?this.itemWidth:this.itemHeight;
var A=this.effectUnits*F;
var I=this.isHorizontal?this.children[E].cenX:this.children[E].cenY;
var D=this.isHorizontal?this.proximityLeft:this.proximityTop;
var G=this.isHorizontal?this.proximityRight:this.proximityBottom;
var C=this.isHorizontal?this.barWidth:this.barHeight;
var K=A;
var B=A;
if(K>I+D){K=I+D
}if(B>(C-I+G)){B=C-I+G
}this.children[E].effectRangeLeft=K/F;
this.children[E].effectRangeRght=B/F
}this.domNode.style.width=this.barWidth+"px";
this.domNode.style.height=this.barHeight+"px";
for(var E=0;
E<this.children.length;
E++){var J=this.children[E];
var H=J.domNode;
H.style.left=J.posX+"px";
H.style.top=J.posY+"px";
H.style.width=this.itemWidth+"px";
H.style.height=this.itemHeight+"px";
J.imgNode.style.left=this.itemPadding+"%";
J.imgNode.style.top=this.itemPadding+"%";
J.imgNode.style.width=(100-2*this.itemPadding)+"%";
J.imgNode.style.height=(100-2*this.itemPadding)+"%"
}this._calcHitGrid()
},_overElement:function(C,D){C=dojo.byId(C);
var E={x:D.pageX,y:D.pageY};
var F=dojo._getBorderBox(C);
var H=dojo.coords(C,true);
var G=H.y;
var A=G+F.h;
var B=H.x;
var I=B+F.w;
return(E.x>=B&&E.x<=I&&E.y>=G&&E.y<=A)
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
},_onGridMouseMove:function(A,B){this.pos={x:A,y:B};
this._paint()
},_paint:function(){var N=this.pos.x;
var K=this.pos.y;
if(this.itemCount<=0){return 
}var L=this.isHorizontal?N:K;
var F=this.isHorizontal?this.proximityLeft:this.proximityTop;
var A=this.isHorizontal?this.itemWidth:this.itemHeight;
var M=this.isHorizontal?(1-this.timerScale)*this.itemWidth+this.timerScale*this.itemMaxWidth:(1-this.timerScale)*this.itemHeight+this.timerScale*this.itemMaxHeight;
var H=((L-F)/A)-0.5;
var J=(M/A)-0.5;
if(J>this.effectUnits){J=this.effectUnits
}var D=0;
if(this.anchorEdge==this.EDGE.BOTTOM){var I=(K-this.proximityTop)/this.itemHeight;
D=(I>0.5)?1:K/(this.proximityTop+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.TOP){var I=(K-this.proximityTop)/this.itemHeight;
D=(I<0.5)?1:(this.totalHeight-K)/(this.proximityBottom+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.RIGHT){var I=(N-this.proximityLeft)/this.itemWidth;
D=(I>0.5)?1:N/(this.proximityLeft+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.LEFT){var I=(N-this.proximityLeft)/this.itemWidth;
D=(I<0.5)?1:(this.totalWidth-N)/(this.proximityRight+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.CENTER){if(this.isHorizontal){D=K/(this.totalHeight)
}else{D=N/(this.totalWidth)
}if(D>0.5){D=1-D
}D*=2
}for(var C=0;
C<this.itemCount;
C++){var E=this._weighAt(H,C);
if(E<0){E=0
}this._setItemSize(C,E*D)
}var G=Math.round(H);
var B=0;
if(H<0){G=0
}else{if(H>this.itemCount-1){G=this.itemCount-1
}else{B=(H-G)*((this.isHorizontal?this.itemWidth:this.itemHeight)-this.children[G].sizeMain)
}}this._positionElementsFrom(G,B)
},_weighAt:function(B,C){var D=Math.abs(B-C);
var A=((B-C)>0)?this.children[C].effectRangeRght:this.children[C].effectRangeLeft;
return(D>A)?0:(1-D/A)
},_setItemSize:function(D,E){E*=this.timerScale;
var B=Math.round(this.itemWidth+((this.itemMaxWidth-this.itemWidth)*E));
var C=Math.round(this.itemHeight+((this.itemMaxHeight-this.itemHeight)*E));
if(this.isHorizontal){this.children[D].sizeW=B;
this.children[D].sizeH=C;
this.children[D].sizeMain=B;
this.children[D].sizeOff=C;
var F=0;
if(this.anchorEdge==this.EDGE.TOP){F=(this.children[D].cenY-(this.itemHeight/2))
}else{if(this.anchorEdge==this.EDGE.BOTTOM){F=(this.children[D].cenY-(C-(this.itemHeight/2)))
}else{F=(this.children[D].cenY-(C/2))
}}this.children[D].usualX=Math.round(this.children[D].cenX-(B/2));
this.children[D].domNode.style.top=F+"px";
this.children[D].domNode.style.left=this.children[D].usualX+"px"
}else{this.children[D].sizeW=B;
this.children[D].sizeH=C;
this.children[D].sizeOff=B;
this.children[D].sizeMain=C;
var A=0;
if(this.anchorEdge==this.EDGE.LEFT){A=this.children[D].cenX-(this.itemWidth/2)
}else{if(this.anchorEdge==this.EDGE.RIGHT){A=this.children[D].cenX-(B-(this.itemWidth/2))
}else{A=this.children[D].cenX-(B/2)
}}this.children[D].domNode.style.left=A+"px";
this.children[D].usualY=Math.round(this.children[D].cenY-(C/2));
this.children[D].domNode.style.top=this.children[D].usualY+"px"
}this.children[D].domNode.style.width=B+"px";
this.children[D].domNode.style.height=C+"px";
if(this.children[D].svgNode){this.children[D].svgNode.setSize(B,C)
}},_positionElementsFrom:function(D,E){var F=0;
if(this.isHorizontal){F=Math.round(this.children[D].usualX+E);
this.children[D].domNode.style.left=F+"px"
}else{F=Math.round(this.children[D].usualY+E);
this.children[D].domNode.style.top=F+"px"
}this._positionLabel(this.children[D]);
var A=F;
for(var B=D-1;
B>=0;
B--){A-=this.children[B].sizeMain;
if(this.isHorizontal){this.children[B].domNode.style.left=A+"px"
}else{this.children[B].domNode.style.top=A+"px"
}this._positionLabel(this.children[B])
}var C=F;
for(var B=D+1;
B<this.itemCount;
B++){C+=this.children[B-1].sizeMain;
if(this.isHorizontal){this.children[B].domNode.style.left=C+"px"
}else{this.children[B].domNode.style.top=C+"px"
}this._positionLabel(this.children[B])
}},_positionLabel:function(D){var A=0;
var C=0;
var B=dojo.marginBox(D.lblNode);
if(this.labelEdge==this.EDGE.TOP){A=Math.round((D.sizeW/2)-(B.w/2));
C=-B.h
}if(this.labelEdge==this.EDGE.BOTTOM){A=Math.round((D.sizeW/2)-(B.w/2));
C=D.sizeH
}if(this.labelEdge==this.EDGE.LEFT){A=-B.w;
C=Math.round((D.sizeH/2)-(B.h/2))
}if(this.labelEdge==this.EDGE.RIGHT){A=D.sizeW;
C=Math.round((D.sizeH/2)-(B.h/2))
}D.lblNode.style.left=A+"px";
D.lblNode.style.top=C+"px"
},_calcHitGrid:function(){var A=dojo.coords(this.domNode,true);
this.hitX1=A.x-this.proximityLeft;
this.hitY1=A.y-this.proximityTop;
this.hitX2=this.hitX1+this.totalWidth;
this.hitY2=this.hitY1+this.totalHeight
},_toEdge:function(A,B){return this.EDGE[A.toUpperCase()]||B
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
dojo.declare("dojox.widget.FisheyeListItem",[dijit._Widget,dijit._Templated,dijit._Contained],{iconSrc:"",label:"",id:"",_blankImgPath:dojo.moduleUrl("dojox.widget","FisheyeList/blank.gif"),templateString:'<div class="dojoxFisheyeListItem">  <img class="dojoxFisheyeListItemImage" dojoAttachPoint="imgNode" dojoAttachEvent="onmouseover:onMouseOver,onmouseout:onMouseOut,onclick:onClick">  <div class="dojoxFisheyeListItemLabel" dojoAttachPoint="lblNode"></div></div>',_isNode:function(A){if(typeof Element=="function"){try{return A instanceof Element
}catch(B){}}else{return A&&!isNaN(A.nodeType)
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