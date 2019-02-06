dojo._xdResourceLoaded({depends:[["provide","dojox.layout.BorderContainer"],["require","dijit.layout._LayoutWidget"]],defineResource:function(A){if(!A._hasResource["dojox.layout.BorderContainer"]){A._hasResource["dojox.layout.BorderContainer"]=true;
A.provide("dojox.layout.BorderContainer");
A.require("dijit.layout._LayoutWidget");
A.experimental("dojox.layout.BorderContainer");
A.declare("dojox.layout.BorderContainer",dijit.layout._LayoutWidget,{top:{},bottom:{},left:{},right:{},center:{},layout:function(){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(B,C){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(B){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},_layoutChildren:function(M,C,E){this.domNode.style.position="relative";
A.addClass(M,"dijitBorderContainer");
A.forEach(E,function(P){var O=P.domNode.style;
O.position="absolute";
if(P.position){this[P.position]=P.domNode
}},this);
var G=this.top.style;
var H=this.right.style;
var B=this.left.style;
var K=this.center.style;
var I=this.bottom.style;
var L=A.coords(this.right);
var D=A.coords(this.left);
var N=A.coords(this.center);
var F=A.coords(this.bottom);
var J=A.coords(this.top);
H.top=B.top=K.top=J.h+"px";
G.top=G.left=G.right="0px";
I.left=I.bottom=I.right="0px";
B.left=H.right="0px";
K.left=D.w+"px";
K.right=L.w+"px";
H.bottom=B.bottom=K.bottom=F.h+"px"
},resize:function(B){this.layout()
}});
A.extend(dijit._Widget,{position:"none"})
}}});