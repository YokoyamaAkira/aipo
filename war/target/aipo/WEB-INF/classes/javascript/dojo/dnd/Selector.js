if(!dojo._hasResource["dojo.dnd.Selector"]){dojo._hasResource["dojo.dnd.Selector"]=true;
dojo.provide("dojo.dnd.Selector");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.Container");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(B,A){if(!A){A={}
}this.singular=A.singular;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedNodes:function(){var A=new dojo.NodeList();
var B=dojo.dnd._empty;
for(var C in this.selection){if(C in B){continue
}A.push(dojo.byId(C))
}return A
},selectNone:function(){return this._removeSelection()._removeAnchor()
},selectAll:function(){this.forInItems(function(B,A){this._addItemClass(dojo.byId(A),"Selected");
this.selection[A]=1
},this);
return this._removeAnchor()
},deleteSelectedNodes:function(){var A=dojo.dnd._empty;
for(var C in this.selection){if(C in A){continue
}var B=dojo.byId(C);
this.delItem(C);
dojo._destroyElement(B)
}this.anchor=null;
this.selection={};
return this
},insertNodes:function(E,D,C,A){var B=this._normalizedCreator;
this._normalizedCreator=function(H,F){var G=B.call(this,H,F);
if(E){if(!this.anchor){this.anchor=G.node;
this._removeItemClass(G.node,"Selected");
this._addItemClass(this.anchor,"Anchor")
}else{if(this.anchor!=G.node){this._removeItemClass(G.node,"Anchor");
this._addItemClass(G.node,"Selected")
}}this.selection[G.node.id]=1
}else{this._removeItemClass(G.node,"Selected");
this._removeItemClass(G.node,"Anchor")
}return G
};
dojo.dnd.Selector.superclass.insertNodes.call(this,D,C,A);
this._normalizedCreator=B;
return this
},destroy:function(){dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},markupFactory:function(A,B){A._skipStartup=true;
return new dojo.dnd.Selector(B,A)
},onMouseDown:function(B){if(!this.current){return 
}if(!this.singular&&!dojo.dnd.getCopyKeyState(B)&&!B.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
dojo.stopEvent(B);
return 
}if(!this.singular&&B.shiftKey){if(!dojo.dnd.getCopyKeyState(B)){this._removeSelection()
}var C=dojo.query("> .dojoDndItem",this.parent);
if(C.length){if(!this.anchor){this.anchor=C[0];
this._addItemClass(this.anchor,"Anchor")
}this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){var D=0;
for(;
D<C.length;
++D){var A=C[D];
if(A==this.anchor||A==this.current){break
}}for(++D;
D<C.length;
++D){var A=C[D];
if(A==this.anchor||A==this.current){break
}this._addItemClass(A,"Selected");
this.selection[A.id]=1
}this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1
}}}else{if(this.singular){if(this.anchor==this.current){if(dojo.dnd.getCopyKeyState(B)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}}else{if(dojo.dnd.getCopyKeyState(B)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
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
}}}}dojo.stopEvent(B)
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
},_removeSelection:function(){var B=dojo.dnd._empty;
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