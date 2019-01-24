dojo._xdResourceLoaded({depends:[["provide","dijit._tree.dndContainer"],["require","dojo.dnd.common"],["require","dojo.dnd.Container"]],defineResource:function(A){if(!A._hasResource["dijit._tree.dndContainer"]){A._hasResource["dijit._tree.dndContainer"]=true;
A.provide("dijit._tree.dndContainer");
A.require("dojo.dnd.common");
A.require("dojo.dnd.Container");
A.declare("dijit._tree.dndContainer",null,{constructor:function(B,C){this.tree=B;
this.node=B.domNode;
A.mixin(this,C);
this.map={};
this.current=null;
this.ContainerState="";
A.addClass(this.node,"dojoDndContainer");
if(!(C&&C._skipStartup)){this.startup()
}this.events=[A.connect(this.node,"onmouseover",this,"onMouseOver"),A.connect(this.node,"onmouseout",this,"onMouseOut"),A.connect(this.node,"ondragstart",A,"stopEvent"),A.connect(this.node,"onselectstart",A,"stopEvent")]
},getItem:function(B){return this.selection[B]
},onMouseOver:function(C){var D=C.relatedTarget;
while(D){if(D==this.node){break
}try{D=D.parentNode
}catch(B){D=null
}}if(!D){this._changeState("Container","Over");
this.onOverEvent()
}D=this._getChildByEvent(C);
if(this.current==D){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(D){this._addItemClass(D,"Over")
}this.current=D
},onMouseOut:function(C){for(var D=C.relatedTarget;
D;
){if(D==this.node){return 
}try{D=D.parentNode
}catch(B){D=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},_changeState:function(B,E){var D="dojoDnd"+B;
var C=B.toLowerCase()+"State";
A.removeClass(this.node,D+this[C]);
A.addClass(this.node,D+E);
this[C]=E
},_getChildByEvent:function(C){var B=C.target;
if(B&&A.hasClass(B,"dijitTreeLabel")){return B
}return null
},markupFactory:function(B,C){C._skipStartup=true;
return new dijit._tree.dndContainer(B,C)
},_addItemClass:function(C,B){A.addClass(C,"dojoDndItem"+B)
},_removeItemClass:function(C,B){A.removeClass(C,"dojoDndItem"+B)
},onOverEvent:function(){console.log("onOverEvent parent")
},onOutEvent:function(){}})
}}});