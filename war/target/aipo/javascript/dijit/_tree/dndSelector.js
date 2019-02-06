if(!dojo._hasResource["dijit._tree.dndSelector"]){dojo._hasResource["dijit._tree.dndSelector"]=true;
dojo.provide("dijit._tree.dndSelector");
dojo.require("dojo.dnd.common");
dojo.require("dijit._tree.dndContainer");
dojo.declare("dijit._tree.dndSelector",dijit._tree.dndContainer,{constructor:function(A,B){this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.tree.domNode,"onmousedown",this,"onMouseDown"),dojo.connect(this.tree.domNode,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedItems:function(){var B=[];
for(var A in this.selection){B.push(dijit.getEnclosingWidget(this.selection[A]).item)
}return B
},getSelectedNodes:function(){return this.selection
},selectNone:function(){return this._removeSelection()._removeAnchor()
},insertItems:function(B,A){},destroy:function(){dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},onMouseDown:function(B){if(!this.current){return 
}var A=dijit.getEnclosingWidget(this.current).item;
var C=this.tree.store.getIdentity(A);
if(!this.current.id){this.current.id=C
}if(!this.current.type){this.current.type="data"
}if(!this.singular&&!dojo.dnd.getCopyKeyState(B)&&!B.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
dojo.stopEvent(B);
return 
}if(this.singular){if(this.anchor==this.current){if(dojo.dnd.getCopyKeyState(B)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}}else{if(!this.singular&&B.shiftKey){if(dojo.dnd.getCopyKeyState(B)){}else{}}else{if(dojo.dnd.getCopyKeyState(B)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
this._removeAnchor()
}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id]
}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected")
}this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=this.current
}}}else{var A=dijit.getEnclosingWidget(this.current).item;
var C=this.tree.store.getIdentity(A);
if(!(C in this.selection)){this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[C]=this.current
}}}}dojo.stopEvent(B)
},onMouseMove:function(){},onOverEvent:function(){this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove")
},onMouseUp:function(A){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}},_removeSelection:function(){var C=dojo.dnd._empty;
for(var A in this.selection){if(A in C){continue
}var B=dojo.byId(A);
if(B){this._removeItemClass(B,"Selected")
}}this.selection={};
return this
},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this.anchor=null
}return this
}})
};