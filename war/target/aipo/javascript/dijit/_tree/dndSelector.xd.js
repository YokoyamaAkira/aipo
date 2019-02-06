dojo._xdResourceLoaded({depends:[["provide","dijit._tree.dndSelector"],["require","dojo.dnd.common"],["require","dijit._tree.dndContainer"]],defineResource:function(A){if(!A._hasResource["dijit._tree.dndSelector"]){A._hasResource["dijit._tree.dndSelector"]=true;
A.provide("dijit._tree.dndSelector");
A.require("dojo.dnd.common");
A.require("dijit._tree.dndContainer");
A.declare("dijit._tree.dndSelector",dijit._tree.dndContainer,{constructor:function(B,C){this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(A.connect(this.tree.domNode,"onmousedown",this,"onMouseDown"),A.connect(this.tree.domNode,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedItems:function(){var C=[];
for(var B in this.selection){C.push(dijit.getEnclosingWidget(this.selection[B]).item)
}return C
},getSelectedNodes:function(){return this.selection
},selectNone:function(){return this._removeSelection()._removeAnchor()
},insertItems:function(C,B){},destroy:function(){A.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},onMouseDown:function(C){if(!this.current){return 
}var B=dijit.getEnclosingWidget(this.current).item;
var D=this.tree.store.getIdentity(B);
if(!this.current.id){this.current.id=D
}if(!this.current.type){this.current.type="data"
}if(!this.singular&&!A.dnd.getCopyKeyState(C)&&!C.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
A.stopEvent(C);
return 
}if(this.singular){if(this.anchor==this.current){if(A.dnd.getCopyKeyState(C)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}}else{if(!this.singular&&C.shiftKey){if(A.dnd.getCopyKeyState(C)){}else{}}else{if(A.dnd.getCopyKeyState(C)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
this._removeAnchor()
}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id]
}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected")
}this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=this.current
}}}else{var B=dijit.getEnclosingWidget(this.current).item;
var D=this.tree.store.getIdentity(B);
if(!(D in this.selection)){this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[D]=this.current
}}}}A.stopEvent(C)
},onMouseMove:function(){},onOverEvent:function(){this.onmousemoveEvent=A.connect(this.node,"onmousemove",this,"onMouseMove")
},onMouseUp:function(B){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}},_removeSelection:function(){var D=A.dnd._empty;
for(var B in this.selection){if(B in D){continue
}var C=A.byId(B);
if(C){this._removeItemClass(C,"Selected")
}}this.selection={};
return this
},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this.anchor=null
}return this
}})
}}});