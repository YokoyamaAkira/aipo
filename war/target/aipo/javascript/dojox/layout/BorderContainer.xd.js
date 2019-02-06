dojo._xdResourceLoaded({depends:[["provide","dojox.layout.BorderContainer"],["require","dijit.layout._LayoutWidget"]],defineResource:function(A){if(!A._hasResource["dojox.layout.BorderContainer"]){A._hasResource["dojox.layout.BorderContainer"]=true;
A.provide("dojox.layout.BorderContainer");
A.require("dijit.layout._LayoutWidget");
A.experimental("dojox.layout.BorderContainer");
A.declare("dojox.layout.BorderContainer",dijit.layout._LayoutWidget,{top:{},bottom:{},left:{},right:{},center:{},layout:function(){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(C,B){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(B){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},_layoutChildren:function(B,F,D){this.domNode.style.position="relative";
A.addClass(B,"dijitBorderContainer");
A.forEach(D,function(P){var O=P.domNode.style;
O.position="absolute";
if(P.position){this[P.position]=P.domNode
}},this);
var I=this.top.style;
var J=this.right.style;
var E=this.left.style;
var M=this.center.style;
var K=this.bottom.style;
var N=A.coords(this.right);
var G=A.coords(this.left);
var C=A.coords(this.center);
var H=A.coords(this.bottom);
var L=A.coords(this.top);
J.top=E.top=M.top=L.h+"px";
I.top=I.left=I.right="0px";
K.left=K.bottom=K.right="0px";
E.left=J.right="0px";
M.left=G.w+"px";
M.right=N.w+"px";
J.bottom=E.bottom=M.bottom=H.h+"px"
},resize:function(B){this.layout()
}});
A.extend(dijit._Widget,{position:"none"})
}}});