if(!dojo._hasResource["dojox.layout.BorderContainer"]){dojo._hasResource["dojox.layout.BorderContainer"]=true;
dojo.provide("dojox.layout.BorderContainer");
dojo.require("dijit.layout._LayoutWidget");
dojo.experimental("dojox.layout.BorderContainer");
dojo.declare("dojox.layout.BorderContainer",dijit.layout._LayoutWidget,{top:{},bottom:{},left:{},right:{},center:{},layout:function(){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(A,B){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(A){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},_layoutChildren:function(J,A,L){this.domNode.style.position="relative";
dojo.addClass(J,"dijitBorderContainer");
dojo.forEach(L,function(N){var O=N.domNode.style;
O.position="absolute";
if(N.position){this[N.position]=N.domNode
}},this);
var D=this.top.style;
var E=this.right.style;
var M=this.left.style;
var H=this.center.style;
var F=this.bottom.style;
var I=dojo.coords(this.right);
var B=dojo.coords(this.left);
var K=dojo.coords(this.center);
var C=dojo.coords(this.bottom);
var G=dojo.coords(this.top);
E.top=M.top=H.top=G.h+"px";
D.top=D.left=D.right="0px";
F.left=F.bottom=F.right="0px";
M.left=E.right="0px";
H.left=B.w+"px";
H.right=I.w+"px";
E.bottom=M.bottom=H.bottom=C.h+"px"
},resize:function(A){this.layout()
}});
dojo.extend(dijit._Widget,{position:"none"})
};