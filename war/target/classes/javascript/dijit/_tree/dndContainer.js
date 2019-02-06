if(!dojo._hasResource["dijit._tree.dndContainer"]){dojo._hasResource["dijit._tree.dndContainer"]=true;
dojo.provide("dijit._tree.dndContainer");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.Container");
dojo.declare("dijit._tree.dndContainer",null,{constructor:function(B,A){this.tree=B;
this.node=B.domNode;
dojo.mixin(this,A);
this.map={};
this.current=null;
this.ContainerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(A&&A._skipStartup)){this.startup()
}this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",dojo,"stopEvent"),dojo.connect(this.node,"onselectstart",dojo,"stopEvent")]
},getItem:function(A){return this.selection[A]
},onMouseOver:function(A){var B=A.relatedTarget;
while(B){if(B==this.node){break
}try{B=B.parentNode
}catch(C){B=null
}}if(!B){this._changeState("Container","Over");
this.onOverEvent()
}B=this._getChildByEvent(A);
if(this.current==B){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(B){this._addItemClass(B,"Over")
}this.current=B
},onMouseOut:function(A){for(var B=A.relatedTarget;
B;
){if(B==this.node){return 
}try{B=B.parentNode
}catch(C){B=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},_changeState:function(D,C){var B="dojoDnd"+D;
var A=D.toLowerCase()+"State";
dojo.removeClass(this.node,B+this[A]);
dojo.addClass(this.node,B+C);
this[A]=C
},_getChildByEvent:function(A){var B=A.target;
if(B&&dojo.hasClass(B,"dijitTreeLabel")){return B
}return null
},markupFactory:function(B,A){A._skipStartup=true;
return new dijit._tree.dndContainer(B,A)
},_addItemClass:function(A,B){dojo.addClass(A,"dojoDndItem"+B)
},_removeItemClass:function(A,B){dojo.removeClass(A,"dojoDndItem"+B)
},onOverEvent:function(){console.log("onOverEvent parent")
},onOutEvent:function(){}})
};