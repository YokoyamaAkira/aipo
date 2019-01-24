if(!dojo._hasResource["dijit._tree.dndSource"]){dojo._hasResource["dijit._tree.dndSource"]=true;
dojo.provide("dijit._tree.dndSource");
dojo.require("dijit._tree.dndSelector");
dojo.require("dojo.dnd.Manager");
dojo.declare("dijit._tree.dndSource",dijit._tree.dndSelector,{isSource:true,copyOnly:false,skipForm:false,accept:["text"],constructor:function(C,D){if(!D){D={}
}dojo.mixin(this,D);
this.isSource=typeof D.isSource=="undefined"?true:D.isSource;
var B=D.accept instanceof Array?D.accept:["text"];
this.accept=null;
if(B.length){this.accept={};
for(var A=0;
A<B.length;
++A){this.accept[B[A]]=1
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
},startup:function(){},checkAcceptance:function(B,A){return true
},copyState:function(A){return this.copyOnly||A
},destroy:function(){this.inherited("destroy",arguments);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null
},markupFactory:function(B,A){B._skipStartup=true;
return new dijit._tree.dndSource(A,B)
},onMouseMove:function(E){if(this.isDragging&&this.targetState=="Disabled"){return 
}this.inherited("onMouseMove",arguments);
var A=dojo.dnd.manager();
if(this.isDragging){if(this.allowBetween){var D=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){D=(E.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{D=(E.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||D!=this.before){this._markTargetAnchor(D);
A.canDrop(!this.current||A.source!=this||!(this.current.id in this.selection))
}}}else{if(this.mouseDown&&this.isSource){var F=this.getSelectedNodes();
var B=[];
for(var C in F){B.push(F[C])
}if(B.length){A.startDrag(this,B,this.copyState(dojo.dnd.getCopyKeyState(E)))
}}}},onMouseDown:function(A){this.mouseDown=true;
this.mouseButton=A.button;
this.inherited("onMouseDown",arguments)
},onMouseUp:function(A){if(this.mouseDown){this.mouseDown=false;
this.inherited("onMouseUp",arguments)
}},onMouseOver:function(C){var D=C.relatedTarget;
while(D){if(D==this.node){break
}try{D=D.parentNode
}catch(B){D=null
}}if(!D){this._changeState("Container","Over");
this.onOverEvent()
}D=this._getChildByEvent(C);
if(this.current==D){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(D){this._addItemClass(D,"Over");
if(this.isDragging){var A=dojo.dnd.manager();
if(this.checkItemAcceptance(D,A.source)){A.canDrop(this.targetState!="Disabled"&&(!this.current||A.source!=this||!(this.current.id in this.selection)))
}else{A.canDrop(false)
}}}else{if(this.isDragging){var A=dojo.dnd.manager();
if(A.source&&this.checkAcceptance(A.source,A.source.getSelectedNodes())){A.canDrop(this.targetState!="Disabled"&&(!this.current||A.source!=this||!(this.current.id in this.selection)))
}else{A.canDrop(false)
}}}this.current=D
},checkItemAcceptance:function(A,B){return true
},onDndSourceOver:function(B){if(this!=B){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var A=dojo.dnd.manager();
A.canDrop(this.targetState!="Disabled"&&(!this.current||A.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(B,A,D){if(this.isSource){this._changeState("Source",this==B?(D?"Copied":"Moved"):"")
}var C=this.checkAcceptance(B,A);
this._changeState("Target",C?"":"Disabled");
if(C){dojo.dnd.manager().overSource(this)
}this.isDragging=true
},itemCreator:function(B){var A=[];
for(var C=0;
C<B.length;
C++){A.push({name:B[C].textContent,id:B[C].id})
}return A
},onDndDrop:function(E,B,G){if(this.containerState=="Over"){this.isDragging=false;
var F=this.current;
var A=this.itemCreator(B,F);
if(!F||F==this.tree.domNode){for(var D=0;
D<A.length;
D++){this.tree.store.newItem(A[D],null)
}}else{for(var D=0;
D<A.length;
D++){pInfo={parent:dijit.getEnclosingWidget(F).item,attribute:"children"};
var C=this.tree.store.newItem(A[D],pInfo);
console.log("newItem:",C)
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
dojo.declare("dijit._tree.dndTarget",dijit._tree.dndSource,{constructor:function(A,B){this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource")
},markupFactory:function(B,A){B._skipStartup=true;
return new dijit._tree.dndTarget(A,B)
}})
};