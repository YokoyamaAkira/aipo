if(!dojo._hasResource["dojox.dtl.tag.event"]){dojo._hasResource["dojox.dtl.tag.event"]=true;
dojo.provide("dojox.dtl.tag.event");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.event.EventNode=function(A,B){this._type=A;
this.contents=B
};
dojo.extend(dojox.dtl.tag.event.EventNode,{render:function(A,B){if(!this._clear){B.getParent()[this._type]=null;
this._clear=true
}if(this.contents&&!this._rendered){if(!A.getThis()){throw new Error("You must use Context.setObject(instance)")
}this._rendered=dojo.connect(B.getParent(),this._type,A.getThis(),this.contents)
}return B
},unrender:function(A,B){if(this._rendered){dojo.disconnect(this._rendered);
this._rendered=false
}return B
},clone:function(){return new dojox.dtl.tag.event.EventNode(this._type,this.contents)
},toString:function(){return"dojox.dtl.tag.event."+this._type
}});
dojox.dtl.tag.event.on=function(B,A){var C=A.split(" ");
return new dojox.dtl.tag.event.EventNode(C[0],C[1])
}
};