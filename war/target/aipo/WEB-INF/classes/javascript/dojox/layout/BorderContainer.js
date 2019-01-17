if(!dojo._hasResource["dojox.layout.BorderContainer"]){dojo._hasResource["dojox.layout.BorderContainer"]=true;
dojo.provide("dojox.layout.BorderContainer");
dojo.require("dijit.layout._LayoutWidget");
dojo.experimental("dojox.layout.BorderContainer");
dojo.declare("dojox.layout.BorderContainer",dijit.layout._LayoutWidget,{top:{},bottom:{},left:{},right:{},center:{},layout:function(){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(B,A){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(A){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},_layoutChildren:function(A,E,C){this.domNode.style.position="relative";
dojo.addClass(A,"dijitBorderContainer");
dojo.forEach(C,function(O){var N=O.domNode.style;
N.position="absolute";
if(O.position){this[O.position]=O.domNode
}},this);
var H=this.top.style;
var I=this.right.style;
var D=this.left.style;
var L=this.center.style;
var J=this.bottom.style;
var M=dojo.coords(this.right);
var F=dojo.coords(this.left);
var B=dojo.coords(this.center);
var G=dojo.coords(this.bottom);
var K=dojo.coords(this.top);
I.top=D.top=L.top=K.h+"px";
H.top=H.left=H.right="0px";
J.left=J.bottom=J.right="0px";
D.left=I.right="0px";
L.left=F.w+"px";
L.right=M.w+"px";
I.bottom=D.bottom=L.bottom=G.h+"px"
},resize:function(A){this.layout()
}});
dojo.extend(dijit._Widget,{position:"none"})
};