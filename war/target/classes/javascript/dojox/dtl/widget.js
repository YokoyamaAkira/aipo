if(!dojo._hasResource["dojox.dtl.widget"]){dojo._hasResource["dojox.dtl.widget"]=true;
dojo.provide("dojox.dtl.widget");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dojox.dtl.html");
dojo.require("dojox.dtl.render.html");
dojo.declare("dojox.dtl._Widget",[dijit._Widget,dijit._Contained],{buffer:0,buildRendering:function(){this.domNode=this.srcNodeRef;
if(this.domNode){var A=this.getParent();
if(A){this.setAttachPoint(A)
}}},setAttachPoint:function(A){this._attach=A
},render:function(B,A){if(!this._attach){throw new Error("You must use an attach point with dojox.dtl.TemplatedWidget")
}A.setThis(this);
this._attach.render(B,A)
}});
dojo.declare("dojox.dtl.AttachPoint",[dijit._Widget,dijit._Container],{constructor:function(B,A){this._render=new dojox.dtl.render.html.Render(A)
},render:function(B,A){this._render.render(B,A)
}})
};