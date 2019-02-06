if(!dojo._hasResource["dojo.dnd.Source"]){dojo._hasResource["dojo.dnd.Source"]=true;
dojo.provide("dojo.dnd.Source");
dojo.require("dojo.dnd.Selector");
dojo.require("dojo.dnd.Manager");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,skipForm:false,withHandles:false,accept:["text"],constructor:function(B,C){if(!C){C={}
}this.isSource=typeof C.isSource=="undefined"?true:C.isSource;
var A=C.accept instanceof Array?C.accept:["text"];
this.accept=null;
if(A.length){this.accept={};
for(var D=0;
D<A.length;
++D){this.accept[A[D]]=1
}}this.horizontal=C.horizontal;
this.copyOnly=C.copyOnly;
this.withHandles=C.withHandles;
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
},checkAcceptance:function(E,A){if(this==E){return true
}for(var C=0;
C<A.length;
++C){var D=E.getItem(A[C].id).type;
var F=false;
for(var B=0;
B<D.length;
++B){if(D[B] in this.accept){F=true;
break
}}if(!F){return false
}}return true
},copyState:function(A){return this.copyOnly||A
},destroy:function(){dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null
},markupFactory:function(A,B){A._skipStartup=true;
return new dojo.dnd.Source(B,A)
},onMouseMove:function(C){if(this.isDragging&&this.targetState=="Disabled"){return 
}dojo.dnd.Source.superclass.onMouseMove.call(this,C);
var D=dojo.dnd.manager();
if(this.isDragging){var B=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){B=(C.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{B=(C.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||B!=this.before){this._markTargetAnchor(B);
D.canDrop(!this.current||D.source!=this||!(this.current.id in this.selection))
}}else{if(this.mouseDown&&this.isSource){var A=this.getSelectedNodes();
if(A.length){D.startDrag(this,A,this.copyState(dojo.dnd.getCopyKeyState(C)))
}}}},onMouseDown:function(A){if(this._legalMouseDown(A)&&(!this.skipForm||!dojo.dnd.isFormElement(A))){this.mouseDown=true;
this.mouseButton=A.button;
dojo.dnd.Source.superclass.onMouseDown.call(this,A)
}},onMouseUp:function(A){if(this.mouseDown){this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,A)
}},onDndSourceOver:function(A){if(this!=A){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var B=dojo.dnd.manager();
B.canDrop(this.targetState!="Disabled"&&(!this.current||B.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(A,D,C){if(this.isSource){this._changeState("Source",this==A?(C?"Copied":"Moved"):"")
}var B=this.accept&&this.checkAcceptance(A,D);
this._changeState("Target",B?"":"Disabled");
if(B&&this==A){dojo.dnd.manager().overSource(this)
}this.isDragging=true
},onDndDrop:function(B,D,C){do{if(this.containerState!="Over"){break
}var A=this._normalizedCreator;
if(this!=B){if(this.creator){this._normalizedCreator=function(F,E){return A.call(this,B.getItem(F.id).data,E)
}
}else{if(C){this._normalizedCreator=function(G,H){var F=B.getItem(G.id);
var E=G.cloneNode(true);
E.id=dojo.dnd.getUniqueId();
return{node:E,data:F.data,type:F.type}
}
}else{this._normalizedCreator=function(G,E){var F=B.getItem(G.id);
B.delItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}}else{if(this.current&&this.current.id in this.selection){break
}if(this.creator){if(C){this._normalizedCreator=function(F,E){return A.call(this,B.getItem(F.id).data,E)
}
}else{if(!this.current){break
}this._normalizedCreator=function(G,E){var F=B.getItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}else{if(C){this._normalizedCreator=function(G,H){var F=B.getItem(G.id);
var E=G.cloneNode(true);
E.id=dojo.dnd.getUniqueId();
return{node:E,data:F.data,type:F.type}
}
}else{if(!this.current){break
}this._normalizedCreator=function(G,E){var F=B.getItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}}this._removeSelection();
if(this!=B){this._removeAnchor()
}if(this!=B&&!C&&!this.creator){B.selectNone()
}this.insertNodes(true,D,this.before,this.current);
if(this!=B&&!C&&this.creator){B.deleteSelectedNodes()
}this._normalizedCreator=A
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
},_legalMouseDown:function(C){if(!this.withHandles){return true
}for(var B=C.target;
B&&!dojo.hasClass(B,"dojoDndItem");
B=B.parentNode){if(dojo.hasClass(B,"dojoDndHandle")){var A=C;
if(!A){A=window.event
}var D={x:A.clientX,y:A.clientY};
var E=false;
dojo.query("a",B).forEach(function(F){if(!E){var G=F.getBoundingClientRect();
E=(G.left<=D.x&&D.x<=G.right&&G.top<=D.y&&D.y<=G.bottom)
}});
if(E){return false
}return true
}}return false
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(B,A){this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource")
},markupFactory:function(A,B){A._skipStartup=true;
return new dojo.dnd.Target(B,A)
}})
};