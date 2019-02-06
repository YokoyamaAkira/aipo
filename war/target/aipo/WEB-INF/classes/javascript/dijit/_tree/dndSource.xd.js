dojo._xdResourceLoaded({depends:[["provide","dijit._tree.dndSource"],["require","dijit._tree.dndSelector"],["require","dojo.dnd.Manager"]],defineResource:function(A){if(!A._hasResource["dijit._tree.dndSource"]){A._hasResource["dijit._tree.dndSource"]=true;
A.provide("dijit._tree.dndSource");
A.require("dijit._tree.dndSelector");
A.require("dojo.dnd.Manager");
A.declare("dijit._tree.dndSource",dijit._tree.dndSelector,{isSource:true,copyOnly:false,skipForm:false,accept:["text"],constructor:function(E,B){if(!B){B={}
}A.mixin(this,B);
this.isSource=typeof B.isSource=="undefined"?true:B.isSource;
var D=B.accept instanceof Array?B.accept:["text"];
this.accept=null;
if(D.length){this.accept={};
for(var C=0;
C<D.length;
++C){this.accept[D[C]]=1
}}this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this.sourceState="";
if(this.isSource){A.addClass(this.node,"dojoDndSource")
}this.targetState="";
if(this.accept){A.addClass(this.node,"dojoDndTarget")
}if(this.horizontal){A.addClass(this.node,"dojoDndHorizontal")
}this.topics=[A.subscribe("/dnd/source/over",this,"onDndSourceOver"),A.subscribe("/dnd/start",this,"onDndStart"),A.subscribe("/dnd/drop",this,"onDndDrop"),A.subscribe("/dnd/cancel",this,"onDndCancel")]
},startup:function(){},checkAcceptance:function(B,C){return true
},copyState:function(B){return this.copyOnly||B
},destroy:function(){this.inherited("destroy",arguments);
A.forEach(this.topics,A.unsubscribe);
this.targetAnchor=null
},markupFactory:function(B,C){B._skipStartup=true;
return new dijit._tree.dndSource(C,B)
},onMouseMove:function(G){if(this.isDragging&&this.targetState=="Disabled"){return 
}this.inherited("onMouseMove",arguments);
var C=A.dnd.manager();
if(this.isDragging){if(this.allowBetween){var F=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:A.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){F=(G.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{F=(G.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||F!=this.before){this._markTargetAnchor(F);
C.canDrop(!this.current||C.source!=this||!(this.current.id in this.selection))
}}}else{if(this.mouseDown&&this.isSource){var B=this.getSelectedNodes();
var D=[];
for(var E in B){D.push(B[E])
}if(D.length){C.startDrag(this,D,this.copyState(A.dnd.getCopyKeyState(G)))
}}}},onMouseDown:function(B){this.mouseDown=true;
this.mouseButton=B.button;
this.inherited("onMouseDown",arguments)
},onMouseUp:function(B){if(this.mouseDown){this.mouseDown=false;
this.inherited("onMouseUp",arguments)
}},onMouseOver:function(E){var B=E.relatedTarget;
while(B){if(B==this.node){break
}try{B=B.parentNode
}catch(D){B=null
}}if(!B){this._changeState("Container","Over");
this.onOverEvent()
}B=this._getChildByEvent(E);
if(this.current==B){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(B){this._addItemClass(B,"Over");
if(this.isDragging){var C=A.dnd.manager();
if(this.checkItemAcceptance(B,C.source)){C.canDrop(this.targetState!="Disabled"&&(!this.current||C.source!=this||!(this.current.id in this.selection)))
}else{C.canDrop(false)
}}}else{if(this.isDragging){var C=A.dnd.manager();
if(C.source&&this.checkAcceptance(C.source,C.source.getSelectedNodes())){C.canDrop(this.targetState!="Disabled"&&(!this.current||C.source!=this||!(this.current.id in this.selection)))
}else{C.canDrop(false)
}}}this.current=B
},checkItemAcceptance:function(C,B){return true
},onDndSourceOver:function(B){if(this!=B){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var C=A.dnd.manager();
C.canDrop(this.targetState!="Disabled"&&(!this.current||C.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(D,C,B){if(this.isSource){this._changeState("Source",this==D?(B?"Copied":"Moved"):"")
}var E=this.checkAcceptance(D,C);
this._changeState("Target",E?"":"Disabled");
if(E){A.dnd.manager().overSource(this)
}this.isDragging=true
},itemCreator:function(D){var C=[];
for(var B=0;
B<D.length;
B++){C.push({name:D[B].textContent,id:D[B].id})
}return C
},onDndDrop:function(E,H,C){if(this.containerState=="Over"){this.isDragging=false;
var F=this.current;
var G=this.itemCreator(H,F);
if(!F||F==this.tree.domNode){for(var D=0;
D<G.length;
D++){this.tree.store.newItem(G[D],null)
}}else{for(var D=0;
D<G.length;
D++){pInfo={parent:dijit.getEnclosingWidget(F).item,attribute:"children"};
var B=this.tree.store.newItem(G[D],pInfo);
console.log("newItem:",B)
}}}this.onDndCancel()
},onDndCancel:function(){if(this.targetAnchor){this._unmarkTargetAnchor();
this.targetAnchor=null
}this.before=true;
this.isDragging=false;
this.mouseDown=false;
delete this.mouseButton;
this._changeState("Source","");
this._changeState("Target","")
},onOverEvent:function(){this.inherited("onOverEvent",arguments);
A.dnd.manager().overSource(this)
},onOutEvent:function(){this.inherited("onOutEvent",arguments);
A.dnd.manager().outSource(this)
},_markTargetAnchor:function(B){if(this.current==this.targetAnchor&&this.before==B){return 
}if(this.targetAnchor){this._removeItemClass(this.targetAnchor,this.before?"Before":"After")
}this.targetAnchor=this.current;
this.targetBox=null;
this.before=B;
if(this.targetAnchor){this._addItemClass(this.targetAnchor,this.before?"Before":"After")
}},_unmarkTargetAnchor:function(){if(!this.targetAnchor){return 
}this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true
},_markDndStatus:function(B){this._changeState("Source",B?"Copied":"Moved")
}});
A.declare("dijit._tree.dndTarget",dijit._tree.dndSource,{constructor:function(C,B){this.isSource=false;
A.removeClass(this.node,"dojoDndSource")
},markupFactory:function(B,C){B._skipStartup=true;
return new dijit._tree.dndTarget(C,B)
}})
}}});