if(!dojo._hasResource["dojo.dnd.Selector"]){dojo._hasResource["dojo.dnd.Selector"]=true;
dojo.provide("dojo.dnd.Selector");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.Container");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(A,B){if(!B){B={}
}this.singular=B.singular;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedNodes:function(){var B=new dojo.NodeList();
var C=dojo.dnd._empty;
for(var A in this.selection){if(A in C){continue
}B.push(dojo.byId(A))
}return B
},selectNone:function(){return this._removeSelection()._removeAnchor()
},selectAll:function(){this.forInItems(function(A,B){this._addItemClass(dojo.byId(B),"Selected");
this.selection[B]=1
},this);
return this._removeAnchor()
},deleteSelectedNodes:function(){var B=dojo.dnd._empty;
for(var A in this.selection){if(A in B){continue
}var C=dojo.byId(A);
this.delItem(A);
dojo._destroyElement(C)
}this.anchor=null;
this.selection={};
return this
},insertNodes:function(A,E,D,B){var C=this._normalizedCreator;
this._normalizedCreator=function(G,H){var F=C.call(this,G,H);
if(A){if(!this.anchor){this.anchor=F.node;
this._removeItemClass(F.node,"Selected");
this._addItemClass(this.anchor,"Anchor")
}else{if(this.anchor!=F.node){this._removeItemClass(F.node,"Anchor");
this._addItemClass(F.node,"Selected")
}}this.selection[F.node.id]=1
}else{this._removeItemClass(F.node,"Selected");
this._removeItemClass(F.node,"Anchor")
}return F
};
dojo.dnd.Selector.superclass.insertNodes.call(this,E,D,B);
this._normalizedCreator=C;
return this
},destroy:function(){dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},markupFactory:function(B,A){B._skipStartup=true;
return new dojo.dnd.Selector(A,B)
},onMouseDown:function(C){if(!this.current){return 
}if(!this.singular&&!dojo.dnd.getCopyKeyState(C)&&!C.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
dojo.stopEvent(C);
return 
}if(!this.singular&&C.shiftKey){if(!dojo.dnd.getCopyKeyState(C)){this._removeSelection()
}var D=dojo.query("> .dojoDndItem",this.parent);
if(D.length){if(!this.anchor){this.anchor=D[0];
this._addItemClass(this.anchor,"Anchor")
}this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){var A=0;
for(;
A<D.length;
++A){var B=D[A];
if(B==this.anchor||B==this.current){break
}}for(++A;
A<D.length;
++A){var B=D[A];
if(B==this.anchor||B==this.current){break
}this._addItemClass(B,"Selected");
this.selection[B.id]=1
}this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1
}}}else{if(this.singular){if(this.anchor==this.current){if(dojo.dnd.getCopyKeyState(C)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}}else{if(dojo.dnd.getCopyKeyState(C)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
this._removeAnchor()
}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id]
}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected")
}this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1
}}}else{if(!(this.current.id in this.selection)){this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1
}}}}dojo.stopEvent(C)
},onMouseUp:function(A){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}},onMouseMove:function(A){this.simpleSelection=false
},onOverEvent:function(){this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove")
},onOutEvent:function(){dojo.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent
},_removeSelection:function(){var C=dojo.dnd._empty;
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