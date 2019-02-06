if(!dojo._hasResource["dojox.dtl.tag.event"]){dojo._hasResource["dojox.dtl.tag.event"]=true;
dojo.provide("dojox.dtl.tag.event");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.event.EventNode=function(B,A){this._type=B;
this.contents=A
};
dojo.extend(dojox.dtl.tag.event.EventNode,{render:function(B,A){if(!this._clear){A.getParent()[this._type]=null;
this._clear=true
}if(this.contents&&!this._rendered){if(!B.getThis()){throw new Error("You must use Context.setObject(instance)")
}this._rendered=dojo.connect(A.getParent(),this._type,B.getThis(),this.contents)
}return A
},unrender:function(B,A){if(this._rendered){dojo.disconnect(this._rendered);
this._rendered=false
}return A
},clone:function(){return new dojox.dtl.tag.event.EventNode(this._type,this.contents)
},toString:function(){return"dojox.dtl.tag.event."+this._type
}});
dojox.dtl.tag.event.on=function(C,B){var A=B.split(" ");
return new dojox.dtl.tag.event.EventNode(A[0],A[1])
}
};