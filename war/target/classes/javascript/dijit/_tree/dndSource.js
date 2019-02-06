if(!dojo._hasResource["dijit._tree.dndSource"]){dojo._hasResource["dijit._tree.dndSource"]=true;
dojo.provide("dijit._tree.dndSource");
dojo.require("dijit._tree.dndSelector");
dojo.require("dojo.dnd.Manager");
dojo.declare("dijit._tree.dndSource",dijit._tree.dndSelector,{isSource:true,copyOnly:false,skipForm:false,accept:["text"],constructor:function(B,C){if(!C){C={}
}dojo.mixin(this,C);
this.isSource=typeof C.isSource=="undefined"?true:C.isSource;
var A=C.accept instanceof Array?C.accept:["text"];
this.accept=null;
if(A.length){this.accept={};
for(var D=0;
D<A.length;
++D){this.accept[A[D]]=1
}}this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this.sourceState="";
if(this.isSource){dojo.addClass(this.node,"dojoDndSource")
}this.targetState="";
if(this.accept){dojo.addClass(this.node,"dojoDndTarget")
}if(this.horizontal){dojo.addClass(this.node,"dojoDndHorizontal")
}this.topics=[dojo.subscribe("/dnd/source/over",this,"onDndSourceOver"),dojo.subscribe("/dnd/start",this,"onDndStart"),dojo.subscribe("/dnd/drop",this,"onDndDrop"),dojo.subscribe("/dnd/cancel",this,"onDndCancel")]
},startup:function(){},checkAcceptance:function(A,B){return true
},copyState:function(A){return this.copyOnly||A
},destroy:function(){this.inherited("destroy",arguments);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null
},markupFactory:function(A,B){A._skipStartup=true;
return new dijit._tree.dndSource(B,A)
},onMouseMove:function(D){if(this.isDragging&&this.targetState=="Disabled"){return 
}this.inherited("onMouseMove",arguments);
var F=dojo.dnd.manager();
if(this.isDragging){if(this.allowBetween){var C=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){C=(D.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{C=(D.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||C!=this.before){this._markTargetAnchor(C);
F.canDrop(!this.current||F.source!=this||!(this.current.id in this.selection))
}}}else{if(this.mouseDown&&this.isSource){var E=this.getSelectedNodes();
var A=[];
for(var B in E){A.push(E[B])
}if(A.length){F.startDrag(this,A,this.copyState(dojo.dnd.getCopyKeyState(D)))
}}}},onMouseDown:function(A){this.mouseDown=true;
this.mouseButton=A.button;
this.inherited("onMouseDown",arguments)
},onMouseUp:function(A){if(this.mouseDown){this.mouseDown=false;
this.inherited("onMouseUp",arguments)
}},onMouseOver:function(B){var C=B.relatedTarget;
while(C){if(C==this.node){break
}try{C=C.parentNode
}catch(A){C=null
}}if(!C){this._changeState("Container","Over");
this.onOverEvent()
}C=this._getChildByEvent(B);
if(this.current==C){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(C){this._addItemClass(C,"Over");
if(this.isDragging){var D=dojo.dnd.manager();
if(this.checkItemAcceptance(C,D.source)){D.canDrop(this.targetState!="Disabled"&&(!this.current||D.source!=this||!(this.current.id in this.selection)))
}else{D.canDrop(false)
}}}else{if(this.isDragging){var D=dojo.dnd.manager();
if(D.source&&this.checkAcceptance(D.source,D.source.getSelectedNodes())){D.canDrop(this.targetState!="Disabled"&&(!this.current||D.source!=this||!(this.current.id in this.selection)))
}else{D.canDrop(false)
}}}this.current=C
},checkItemAcceptance:function(B,A){return true
},onDndSourceOver:function(A){if(this!=A){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var B=dojo.dnd.manager();
B.canDrop(this.targetState!="Disabled"&&(!this.current||B.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(A,D,C){if(this.isSource){this._changeState("Source",this==A?(C?"Copied":"Moved"):"")
}var B=this.checkAcceptance(A,D);
this._changeState("Target",B?"":"Disabled");
if(B){dojo.dnd.manager().overSource(this)
}this.isDragging=true
},itemCreator:function(A){var C=[];
for(var B=0;
B<A.length;
B++){C.push({name:A[B].textContent,id:A[B].id})
}return C
},onDndDrop:function(B,F,D){if(this.containerState=="Over"){this.isDragging=false;
var C=this.current;
var E=this.itemCreator(F,C);
if(!C||C==this.tree.domNode){for(var A=0;
A<E.length;
A++){this.tree.store.newItem(E[A],null)
}}else{for(var A=0;
A<E.length;
A++){pInfo={parent:dijit.getEnclosingWidget(C).item,attribute:"children"};
var G=this.tree.store.newItem(E[A],pInfo);
console.log("newItem:",G)
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
dojo.dnd.manager().overSource(this)
},onOutEvent:function(){this.inherited("onOutEvent",arguments);
dojo.dnd.manager().outSource(this)
},_markTargetAnchor:function(A){if(this.current==this.targetAnchor&&this.before==A){return 
}if(this.targetAnchor){this._removeItemClass(this.targetAnchor,this.before?"Before":"After")
}this.targetAnchor=this.current;
this.targetBox=null;
this.before=A;
if(this.targetAnchor){this._addItemClass(this.targetAnchor,this.before?"Before":"After")
}},_unmarkTargetAnchor:function(){if(!this.targetAnchor){return 
}this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true
},_markDndStatus:function(A){this._changeState("Source",A?"Copied":"Moved")
}});
dojo.declare("dijit._tree.dndTarget",dijit._tree.dndSource,{constructor:function(B,A){this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource")
},markupFactory:function(A,B){A._skipStartup=true;
return new dijit._tree.dndTarget(B,A)
}})
};