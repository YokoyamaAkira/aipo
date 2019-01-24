dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.widget"],["require","dijit._Widget"],["require","dijit._Container"],["require","dojox.dtl.html"],["require","dojox.dtl.render.html"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.widget"]){A._hasResource["dojox.dtl.widget"]=true;
A.provide("dojox.dtl.widget");
A.require("dijit._Widget");
A.require("dijit._Container");
A.require("dojox.dtl.html");
A.require("dojox.dtl.render.html");
A.declare("dojox.dtl._Widget",[dijit._Widget,dijit._Contained],{buffer:0,buildRendering:function(){this.domNode=this.srcNodeRef;
if(this.domNode){var B=this.getParent();
if(B){this.setAttachPoint(B)
}}},setAttachPoint:function(B){this._attach=B
},render:function(B,C){if(!this._attach){throw new Error("You must use an attach point with dojox.dtl.TemplatedWidget")
}C.setThis(this);
this._attach.render(B,C)
}});
A.declare("dojox.dtl.AttachPoint",[dijit._Widget,dijit._Container],{constructor:function(B,C){this._render=new dojox.dtl.render.html.Render(C)
},render:function(B,C){this._render.render(B,C)
}})
}}});