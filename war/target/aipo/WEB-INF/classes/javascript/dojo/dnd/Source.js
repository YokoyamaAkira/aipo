if(!dojo._hasResource["dojo.dnd.Source"]){dojo._hasResource["dojo.dnd.Source"]=true;
dojo.provide("dojo.dnd.Source");
dojo.require("dojo.dnd.Selector");
dojo.require("dojo.dnd.Manager");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,skipForm:false,withHandles:false,accept:["text"],constructor:function(C,D){if(!D){D={}
}this.isSource=typeof D.isSource=="undefined"?true:D.isSource;
var B=D.accept instanceof Array?D.accept:["text"];
this.accept=null;
if(B.length){this.accept={};
for(var A=0;
A<B.length;
++A){this.accept[B[A]]=1
}}this.horizontal=D.horizontal;
this.copyOnly=D.copyOnly;
this.withHandles=D.withHandles;
this.isDragging=false;
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
},checkAcceptance:function(F,B){if(this==F){return true
}for(var D=0;
D<B.length;
++D){var E=F.getItem(B[D].id).type;
var A=false;
for(var C=0;
C<E.length;
++C){if(E[C] in this.accept){A=true;
break
}}if(!A){return false
}}return true
},copyState:function(A){return this.copyOnly||A
},destroy:function(){dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null
},markupFactory:function(B,A){B._skipStartup=true;
return new dojo.dnd.Source(A,B)
},onMouseMove:function(D){if(this.isDragging&&this.targetState=="Disabled"){return 
}dojo.dnd.Source.superclass.onMouseMove.call(this,D);
var A=dojo.dnd.manager();
if(this.isDragging){var C=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){C=(D.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{C=(D.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||C!=this.before){this._markTargetAnchor(C);
A.canDrop(!this.current||A.source!=this||!(this.current.id in this.selection))
}}else{if(this.mouseDown&&this.isSource){var B=this.getSelectedNodes();
if(B.length){A.startDrag(this,B,this.copyState(dojo.dnd.getCopyKeyState(D)))
}}}},onMouseDown:function(A){if(this._legalMouseDown(A)&&(!this.skipForm||!dojo.dnd.isFormElement(A))){this.mouseDown=true;
this.mouseButton=A.button;
dojo.dnd.Source.superclass.onMouseDown.call(this,A)
}},onMouseUp:function(A){if(this.mouseDown){this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,A)
}},onDndSourceOver:function(B){if(this!=B){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var A=dojo.dnd.manager();
A.canDrop(this.targetState!="Disabled"&&(!this.current||A.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(B,A,D){if(this.isSource){this._changeState("Source",this==B?(D?"Copied":"Moved"):"")
}var C=this.accept&&this.checkAcceptance(B,A);
this._changeState("Target",C?"":"Disabled");
if(C&&this==B){dojo.dnd.manager().overSource(this)
}this.isDragging=true
},onDndDrop:function(C,A,D){do{if(this.containerState!="Over"){break
}var B=this._normalizedCreator;
if(this!=C){if(this.creator){this._normalizedCreator=function(E,F){return B.call(this,C.getItem(E.id).data,F)
}
}else{if(D){this._normalizedCreator=function(F,G){var E=C.getItem(F.id);
var H=F.cloneNode(true);
H.id=dojo.dnd.getUniqueId();
return{node:H,data:E.data,type:E.type}
}
}else{this._normalizedCreator=function(F,G){var E=C.getItem(F.id);
C.delItem(F.id);
return{node:F,data:E.data,type:E.type}
}
}}}else{if(this.current&&this.current.id in this.selection){break
}if(this.creator){if(D){this._normalizedCreator=function(E,F){return B.call(this,C.getItem(E.id).data,F)
}
}else{if(!this.current){break
}this._normalizedCreator=function(F,G){var E=C.getItem(F.id);
return{node:F,data:E.data,type:E.type}
}
}}else{if(D){this._normalizedCreator=function(F,G){var E=C.getItem(F.id);
var H=F.cloneNode(true);
H.id=dojo.dnd.getUniqueId();
return{node:H,data:E.data,type:E.type}
}
}else{if(!this.current){break
}this._normalizedCreator=function(F,G){var E=C.getItem(F.id);
return{node:F,data:E.data,type:E.type}
}
}}}this._removeSelection();
if(this!=C){this._removeAnchor()
}if(this!=C&&!D&&!this.creator){C.selectNone()
}this.insertNodes(true,A,this.before,this.current);
if(this!=C&&!D&&this.creator){C.deleteSelectedNodes()
}this._normalizedCreator=B
}while(false);
this.onDndCancel()
},onDndCancel:function(){if(this.targetAnchor){this._unmarkTargetAnchor();
this.targetAnchor=null
}this.before=true;
this.isDragging=false;
this.mouseDown=false;
delete this.mouseButton;
this._changeState("Source","");
this._changeState("Target","")
},onOverEvent:function(){dojo.dnd.Source.superclass.onOverEvent.call(this);
dojo.dnd.manager().overSource(this)
},onOutEvent:function(){dojo.dnd.Source.superclass.onOutEvent.call(this);
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
},_legalMouseDown:function(D){if(!this.withHandles){return true
}for(var C=D.target;
C&&!dojo.hasClass(C,"dojoDndItem");
C=C.parentNode){if(dojo.hasClass(C,"dojoDndHandle")){var B=D;
if(!B){B=window.event
}var E={x:B.clientX,y:B.clientY};
var A=false;
dojo.query("a",C).forEach(function(G){if(!A){var F=G.getBoundingClientRect();
A=(F.left<=E.x&&E.x<=F.right&&F.top<=E.y&&E.y<=F.bottom)
}});
if(A){return false
}return true
}}return false
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(A,B){this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource")
},markupFactory:function(B,A){B._skipStartup=true;
return new dojo.dnd.Target(A,B)
}})
};