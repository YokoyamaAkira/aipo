dojo._xdResourceLoaded({depends:[["provide","dijit._tree.dndSelector"],["require","dojo.dnd.common"],["require","dijit._tree.dndContainer"]],defineResource:function(A){if(!A._hasResource["dijit._tree.dndSelector"]){A._hasResource["dijit._tree.dndSelector"]=true;
A.provide("dijit._tree.dndSelector");
A.require("dojo.dnd.common");
A.require("dijit._tree.dndContainer");
A.declare("dijit._tree.dndSelector",dijit._tree.dndContainer,{constructor:function(C,B){this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(A.connect(this.tree.domNode,"onmousedown",this,"onMouseDown"),A.connect(this.tree.domNode,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedItems:function(){var B=[];
for(var C in this.selection){B.push(dijit.getEnclosingWidget(this.selection[C]).item)
}return B
},getSelectedNodes:function(){return this.selection
},selectNone:function(){return this._removeSelection()._removeAnchor()
},insertItems:function(B,C){},destroy:function(){A.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},onMouseDown:function(D){if(!this.current){return 
}var C=dijit.getEnclosingWidget(this.current).item;
var B=this.tree.store.getIdentity(C);
if(!this.current.id){this.current.id=B
}if(!this.current.type){this.current.type="data"
}if(!this.singular&&!A.dnd.getCopyKeyState(D)&&!D.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
A.stopEvent(D);
return 
}if(this.singular){if(this.anchor==this.current){if(A.dnd.getCopyKeyState(D)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}}else{if(!this.singular&&D.shiftKey){if(A.dnd.getCopyKeyState(D)){}else{}}else{if(A.dnd.getCopyKeyState(D)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
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
}}}}A.stopEvent(D)
},onMouseMove:function(){},onOverEvent:function(){this.onmousemoveEvent=A.connect(this.node,"onmousemove",this,"onMouseMove")
},onMouseUp:function(B){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=this.current
}},_removeSelection:function(){var B=A.dnd._empty;
for(var C in this.selection){if(C in B){continue
}var D=A.byId(C);
if(D){this._removeItemClass(D,"Selected")
}}this.selection={};
return this
},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this.anchor=null
}return this
}})
}}});