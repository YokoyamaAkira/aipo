dojo._xdResourceLoaded({depends:[["provide","dijit._tree.dndSource"],["require","dijit._tree.dndSelector"],["require","dojo.dnd.Manager"]],defineResource:function(A){if(!A._hasResource["dijit._tree.dndSource"]){A._hasResource["dijit._tree.dndSource"]=true;
A.provide("dijit._tree.dndSource");
A.require("dijit._tree.dndSelector");
A.require("dojo.dnd.Manager");
A.declare("dijit._tree.dndSource",dijit._tree.dndSelector,{isSource:true,copyOnly:false,skipForm:false,accept:["text"],constructor:function(D,E){if(!E){E={}
}A.mixin(this,E);
this.isSource=typeof E.isSource=="undefined"?true:E.isSource;
var C=E.accept instanceof Array?E.accept:["text"];
this.accept=null;
if(C.length){this.accept={};
for(var B=0;
B<C.length;
++B){this.accept[C[B]]=1
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
},startup:function(){},checkAcceptance:function(C,B){return true
},copyState:function(B){return this.copyOnly||B
},destroy:function(){this.inherited("destroy",arguments);
A.forEach(this.topics,A.unsubscribe);
this.targetAnchor=null
},markupFactory:function(C,B){C._skipStartup=true;
return new dijit._tree.dndSource(B,C)
},onMouseMove:function(F){if(this.isDragging&&this.targetState=="Disabled"){return 
}this.inherited("onMouseMove",arguments);
var B=A.dnd.manager();
if(this.isDragging){if(this.allowBetween){var E=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:A.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){E=(F.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{E=(F.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||E!=this.before){this._markTargetAnchor(E);
B.canDrop(!this.current||B.source!=this||!(this.current.id in this.selection))
}}}else{if(this.mouseDown&&this.isSource){var G=this.getSelectedNodes();
var C=[];
for(var D in G){C.push(G[D])
}if(C.length){B.startDrag(this,C,this.copyState(A.dnd.getCopyKeyState(F)))
}}}},onMouseDown:function(B){this.mouseDown=true;
this.mouseButton=B.button;
this.inherited("onMouseDown",arguments)
},onMouseUp:function(B){if(this.mouseDown){this.mouseDown=false;
this.inherited("onMouseUp",arguments)
}},onMouseOver:function(D){var E=D.relatedTarget;
while(E){if(E==this.node){break
}try{E=E.parentNode
}catch(C){E=null
}}if(!E){this._changeState("Container","Over");
this.onOverEvent()
}E=this._getChildByEvent(D);
if(this.current==E){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(E){this._addItemClass(E,"Over");
if(this.isDragging){var B=A.dnd.manager();
if(this.checkItemAcceptance(E,B.source)){B.canDrop(this.targetState!="Disabled"&&(!this.current||B.source!=this||!(this.current.id in this.selection)))
}else{B.canDrop(false)
}}}else{if(this.isDragging){var B=A.dnd.manager();
if(B.source&&this.checkAcceptance(B.source,B.source.getSelectedNodes())){B.canDrop(this.targetState!="Disabled"&&(!this.current||B.source!=this||!(this.current.id in this.selection)))
}else{B.canDrop(false)
}}}this.current=E
},checkItemAcceptance:function(B,C){return true
},onDndSourceOver:function(C){if(this!=C){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var B=A.dnd.manager();
B.canDrop(this.targetState!="Disabled"&&(!this.current||B.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(C,B,E){if(this.isSource){this._changeState("Source",this==C?(E?"Copied":"Moved"):"")
}var D=this.checkAcceptance(C,B);
this._changeState("Target",D?"":"Disabled");
if(D){A.dnd.manager().overSource(this)
}this.isDragging=true
},itemCreator:function(C){var B=[];
for(var D=0;
D<C.length;
D++){B.push({name:C[D].textContent,id:C[D].id})
}return B
},onDndDrop:function(F,C,H){if(this.containerState=="Over"){this.isDragging=false;
var G=this.current;
var B=this.itemCreator(C,G);
if(!G||G==this.tree.domNode){for(var E=0;
E<B.length;
E++){this.tree.store.newItem(B[E],null)
}}else{for(var E=0;
E<B.length;
E++){pInfo={parent:dijit.getEnclosingWidget(G).item,attribute:"children"};
var D=this.tree.store.newItem(B[E],pInfo);
console.log("newItem:",D)
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
A.declare("dijit._tree.dndTarget",dijit._tree.dndSource,{constructor:function(B,C){this.isSource=false;
A.removeClass(this.node,"dojoDndSource")
},markupFactory:function(C,B){C._skipStartup=true;
return new dijit._tree.dndTarget(B,C)
}})
}}});