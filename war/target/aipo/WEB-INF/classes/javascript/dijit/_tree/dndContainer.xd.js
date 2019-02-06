dojo._xdResourceLoaded({depends:[["provide","dijit._tree.dndContainer"],["require","dojo.dnd.common"],["require","dojo.dnd.Container"]],defineResource:function(A){if(!A._hasResource["dijit._tree.dndContainer"]){A._hasResource["dijit._tree.dndContainer"]=true;
A.provide("dijit._tree.dndContainer");
A.require("dojo.dnd.common");
A.require("dojo.dnd.Container");
A.declare("dijit._tree.dndContainer",null,{constructor:function(C,B){this.tree=C;
this.node=C.domNode;
A.mixin(this,B);
this.map={};
this.current=null;
this.ContainerState="";
A.addClass(this.node,"dojoDndContainer");
if(!(B&&B._skipStartup)){this.startup()
}this.events=[A.connect(this.node,"onmouseover",this,"onMouseOver"),A.connect(this.node,"onmouseout",this,"onMouseOut"),A.connect(this.node,"ondragstart",A,"stopEvent"),A.connect(this.node,"onselectstart",A,"stopEvent")]
},getItem:function(B){return this.selection[B]
},onMouseOver:function(D){var B=D.relatedTarget;
while(B){if(B==this.node){break
}try{B=B.parentNode
}catch(C){B=null
}}if(!B){this._changeState("Container","Over");
this.onOverEvent()
}B=this._getChildByEvent(D);
if(this.current==B){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(B){this._addItemClass(B,"Over")
}this.current=B
},onMouseOut:function(D){for(var B=D.relatedTarget;
B;
){if(B==this.node){return 
}try{B=B.parentNode
}catch(C){B=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},_changeState:function(C,B){var E="dojoDnd"+C;
var D=C.toLowerCase()+"State";
A.removeClass(this.node,E+this[D]);
A.addClass(this.node,E+B);
this[D]=B
},_getChildByEvent:function(B){var C=B.target;
if(C&&A.hasClass(C,"dijitTreeLabel")){return C
}return null
},markupFactory:function(C,B){B._skipStartup=true;
return new dijit._tree.dndContainer(C,B)
},_addItemClass:function(B,C){A.addClass(B,"dojoDndItem"+C)
},_removeItemClass:function(B,C){A.removeClass(B,"dojoDndItem"+C)
},onOverEvent:function(){console.log("onOverEvent parent")
},onOutEvent:function(){}})
}}});