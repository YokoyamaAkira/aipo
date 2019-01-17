dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Selector"],["require","dojo.dnd.common"],["require","dojo.dnd.Container"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Selector"]){A._hasResource["dojo.dnd.Selector"]=true;
A.provide("dojo.dnd.Selector");
A.require("dojo.dnd.common");
A.require("dojo.dnd.Container");
A.declare("dojo.dnd.Selector",A.dnd.Container,{constructor:function(B,C){if(!C){C={}
}this.singular=C.singular;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(A.connect(this.node,"onmousedown",this,"onMouseDown"),A.connect(this.node,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedNodes:function(){var C=new A.NodeList();
var D=A.dnd._empty;
for(var B in this.selection){if(B in D){continue
}C.push(A.byId(B))
}return C
},selectNone:function(){return this._removeSelection()._removeAnchor()
},selectAll:function(){this.forInItems(function(B,C){this._addItemClass(A.byId(C),"Selected");
this.selection[C]=1
},this);
return this._removeAnchor()
},deleteSelectedNodes:function(){var C=A.dnd._empty;
for(var B in this.selection){if(B in C){continue
}var D=A.byId(B);
this.delItem(B);
A._destroyElement(D)
}this.anchor=null;
this.selection={};
return this
},insertNodes:function(B,F,E,C){var D=this._normalizedCreator;
this._normalizedCreator=function(H,I){var G=D.call(this,H,I);
if(B){if(!this.anchor){this.anchor=G.node;
this._removeItemClass(G.node,"Selected");
this._addItemClass(this.anchor,"Anchor")
}else{if(this.anchor!=G.node){this._removeItemClass(G.node,"Anchor");
this._addItemClass(G.node,"Selected")
}}this.selection[G.node.id]=1
}else{this._removeItemClass(G.node,"Selected");
this._removeItemClass(G.node,"Anchor")
}return G
};
A.dnd.Selector.superclass.insertNodes.call(this,F,E,C);
this._normalizedCreator=D;
return this
},destroy:function(){A.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},markupFactory:function(C,B){C._skipStartup=true;
return new A.dnd.Selector(B,C)
},onMouseDown:function(D){if(!this.current){return 
}if(!this.singular&&!A.dnd.getCopyKeyState(D)&&!D.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
A.stopEvent(D);
return 
}if(!this.singular&&D.shiftKey){if(!A.dnd.getCopyKeyState(D)){this._removeSelection()
}var E=A.query("> .dojoDndItem",this.parent);
if(E.length){if(!this.anchor){this.anchor=E[0];
this._addItemClass(this.anchor,"Anchor")
}this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){var B=0;
for(;
B<E.length;
++B){var C=E[B];
if(C==this.anchor||C==this.current){break
}}for(++B;
B<E.length;
++B){var C=E[B];
if(C==this.anchor||C==this.current){break
}this._addItemClass(C,"Selected");
this.selection[C.id]=1
}this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1
}}}else{if(this.singular){if(this.anchor==this.current){if(A.dnd.getCopyKeyState(D)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}}else{if(A.dnd.getCopyKeyState(D)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
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
}}}}A.stopEvent(D)
},onMouseUp:function(B){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}},onMouseMove:function(B){this.simpleSelection=false
},onOverEvent:function(){this.onmousemoveEvent=A.connect(this.node,"onmousemove",this,"onMouseMove")
},onOutEvent:function(){A.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent
},_removeSelection:function(){var D=A.dnd._empty;
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