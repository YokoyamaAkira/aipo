dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Selector"],["require","dojo.dnd.common"],["require","dojo.dnd.Container"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Selector"]){A._hasResource["dojo.dnd.Selector"]=true;
A.provide("dojo.dnd.Selector");
A.require("dojo.dnd.common");
A.require("dojo.dnd.Container");
A.declare("dojo.dnd.Selector",A.dnd.Container,{constructor:function(C,B){if(!B){B={}
}this.singular=B.singular;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(A.connect(this.node,"onmousedown",this,"onMouseDown"),A.connect(this.node,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedNodes:function(){var D=new A.NodeList();
var B=A.dnd._empty;
for(var C in this.selection){if(C in B){continue
}D.push(A.byId(C))
}return D
},selectNone:function(){return this._removeSelection()._removeAnchor()
},selectAll:function(){this.forInItems(function(C,B){this._addItemClass(A.byId(B),"Selected");
this.selection[B]=1
},this);
return this._removeAnchor()
},deleteSelectedNodes:function(){var D=A.dnd._empty;
for(var C in this.selection){if(C in D){continue
}var B=A.byId(C);
this.delItem(C);
A._destroyElement(B)
}this.anchor=null;
this.selection={};
return this
},insertNodes:function(C,B,F,D){var E=this._normalizedCreator;
this._normalizedCreator=function(H,I){var G=E.call(this,H,I);
if(C){if(!this.anchor){this.anchor=G.node;
this._removeItemClass(G.node,"Selected");
this._addItemClass(this.anchor,"Anchor")
}else{if(this.anchor!=G.node){this._removeItemClass(G.node,"Anchor");
this._addItemClass(G.node,"Selected")
}}this.selection[G.node.id]=1
}else{this._removeItemClass(G.node,"Selected");
this._removeItemClass(G.node,"Anchor")
}return G
};
A.dnd.Selector.superclass.insertNodes.call(this,B,F,D);
this._normalizedCreator=E;
return this
},destroy:function(){A.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},markupFactory:function(B,C){B._skipStartup=true;
return new A.dnd.Selector(C,B)
},onMouseDown:function(E){if(!this.current){return 
}if(!this.singular&&!A.dnd.getCopyKeyState(E)&&!E.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
A.stopEvent(E);
return 
}if(!this.singular&&E.shiftKey){if(!A.dnd.getCopyKeyState(E)){this._removeSelection()
}var B=A.query("> .dojoDndItem",this.parent);
if(B.length){if(!this.anchor){this.anchor=B[0];
this._addItemClass(this.anchor,"Anchor")
}this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){var C=0;
for(;
C<B.length;
++C){var D=B[C];
if(D==this.anchor||D==this.current){break
}}for(++C;
C<B.length;
++C){var D=B[C];
if(D==this.anchor||D==this.current){break
}this._addItemClass(D,"Selected");
this.selection[D.id]=1
}this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1
}}}else{if(this.singular){if(this.anchor==this.current){if(A.dnd.getCopyKeyState(E)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}}else{if(A.dnd.getCopyKeyState(E)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
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
}}}}A.stopEvent(E)
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
},_removeSelection:function(){var B=A.dnd._empty;
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