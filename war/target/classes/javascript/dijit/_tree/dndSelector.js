if(!dojo._hasResource["dijit._tree.dndSelector"]){dojo._hasResource["dijit._tree.dndSelector"]=true;
dojo.provide("dijit._tree.dndSelector");
dojo.require("dojo.dnd.common");
dojo.require("dijit._tree.dndContainer");
dojo.declare("dijit._tree.dndSelector",dijit._tree.dndContainer,{constructor:function(B,A){this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.tree.domNode,"onmousedown",this,"onMouseDown"),dojo.connect(this.tree.domNode,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedItems:function(){var A=[];
for(var B in this.selection){A.push(dijit.getEnclosingWidget(this.selection[B]).item)
}return A
},getSelectedNodes:function(){return this.selection
},selectNone:function(){return this._removeSelection()._removeAnchor()
},insertItems:function(A,B){},destroy:function(){dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},onMouseDown:function(A){if(!this.current){return 
}var C=dijit.getEnclosingWidget(this.current).item;
var B=this.tree.store.getIdentity(C);
if(!this.current.id){this.current.id=B
}if(!this.current.type){this.current.type="data"
}if(!this.singular&&!dojo.dnd.getCopyKeyState(A)&&!A.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
dojo.stopEvent(A);
return 
}if(this.singular){if(this.anchor==this.current){if(dojo.dnd.getCopyKeyState(A)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}}else{if(!this.singular&&A.shiftKey){if(dojo.dnd.getCopyKeyState(A)){}else{}}else{if(dojo.dnd.getCopyKeyState(A)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
this._removeAnchor()
}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id]
}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected")
}this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=this.current
}}}else{var C=dijit.getEnclosingWidget(this.current).item;
var B=this.tree.store.getIdentity(C);
if(!(B in this.selection)){this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[B]=this.current
}}}}dojo.stopEvent(A)
},onMouseMove:function(){},onOverEvent:function(){this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove")
},onMouseUp:function(A){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}},_removeSelection:function(){var B=dojo.dnd._empty;
for(var C in this.selection){if(C in B){continue
}var A=dojo.byId(C);
if(A){this._removeItemClass(A,"Selected")
}}this.selection={};
return this
},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this.anchor=null
}return this
}})
};