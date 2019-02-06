if(!dojo._hasResource["dijit._tree.dndContainer"]){dojo._hasResource["dijit._tree.dndContainer"]=true;
dojo.provide("dijit._tree.dndContainer");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.Container");
dojo.declare("dijit._tree.dndContainer",null,{constructor:function(A,B){this.tree=A;
this.node=A.domNode;
dojo.mixin(this,B);
this.map={};
this.current=null;
this.ContainerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(B&&B._skipStartup)){this.startup()
}this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",dojo,"stopEvent"),dojo.connect(this.node,"onselectstart",dojo,"stopEvent")]
},getItem:function(A){return this.selection[A]
},onMouseOver:function(B){var C=B.relatedTarget;
while(C){if(C==this.node){break
}try{C=C.parentNode
}catch(A){C=null
}}if(!C){this._changeState("Container","Over");
this.onOverEvent()
}C=this._getChildByEvent(B);
if(this.current==C){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(C){this._addItemClass(C,"Over")
}this.current=C
},onMouseOut:function(B){for(var C=B.relatedTarget;
C;
){if(C==this.node){return 
}try{C=C.parentNode
}catch(A){C=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},_changeState:function(A,D){var C="dojoDnd"+A;
var B=A.toLowerCase()+"State";
dojo.removeClass(this.node,C+this[B]);
dojo.addClass(this.node,C+D);
this[B]=D
},_getChildByEvent:function(B){var A=B.target;
if(A&&dojo.hasClass(A,"dijitTreeLabel")){return A
}return null
},markupFactory:function(A,B){B._skipStartup=true;
return new dijit._tree.dndContainer(A,B)
},_addItemClass:function(B,A){dojo.addClass(B,"dojoDndItem"+A)
},_removeItemClass:function(B,A){dojo.removeClass(B,"dojoDndItem"+A)
},onOverEvent:function(){console.log("onOverEvent parent")
},onOutEvent:function(){}})
};