dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.event"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.event"]){A._hasResource["dojox.dtl.tag.event"]=true;
A.provide("dojox.dtl.tag.event");
A.require("dojox.dtl._base");
dojox.dtl.tag.event.EventNode=function(B,C){this._type=B;
this.contents=C
};
A.extend(dojox.dtl.tag.event.EventNode,{render:function(B,C){if(!this._clear){C.getParent()[this._type]=null;
this._clear=true
}if(this.contents&&!this._rendered){if(!B.getThis()){throw new Error("You must use Context.setObject(instance)")
}this._rendered=A.connect(C.getParent(),this._type,B.getThis(),this.contents)
}return C
},unrender:function(B,C){if(this._rendered){A.disconnect(this._rendered);
this._rendered=false
}return C
},clone:function(){return new dojox.dtl.tag.event.EventNode(this._type,this.contents)
},toString:function(){return"dojox.dtl.tag.event."+this._type
}});
dojox.dtl.tag.event.on=function(B,D){var C=D.split(" ");
return new dojox.dtl.tag.event.EventNode(C[0],C[1])
}
}}});