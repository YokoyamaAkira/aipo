dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.event"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.event"]){A._hasResource["dojox.dtl.tag.event"]=true;
A.provide("dojox.dtl.tag.event");
A.require("dojox.dtl._base");
dojox.dtl.tag.event.EventNode=function(C,B){this._type=C;
this.contents=B
};
A.extend(dojox.dtl.tag.event.EventNode,{render:function(C,B){if(!this._clear){B.getParent()[this._type]=null;
this._clear=true
}if(this.contents&&!this._rendered){if(!C.getThis()){throw new Error("You must use Context.setObject(instance)")
}this._rendered=A.connect(B.getParent(),this._type,C.getThis(),this.contents)
}return B
},unrender:function(C,B){if(this._rendered){A.disconnect(this._rendered);
this._rendered=false
}return B
},clone:function(){return new dojox.dtl.tag.event.EventNode(this._type,this.contents)
},toString:function(){return"dojox.dtl.tag.event."+this._type
}});
dojox.dtl.tag.event.on=function(D,C){var B=C.split(" ");
return new dojox.dtl.tag.event.EventNode(B[0],B[1])
}
}}});