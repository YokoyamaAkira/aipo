dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Source"],["require","dojo.dnd.Selector"],["require","dojo.dnd.Manager"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Source"]){A._hasResource["dojo.dnd.Source"]=true;
A.provide("dojo.dnd.Source");
A.require("dojo.dnd.Selector");
A.require("dojo.dnd.Manager");
A.declare("dojo.dnd.Source",A.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,skipForm:false,withHandles:false,accept:["text"],constructor:function(D,E){if(!E){E={}
}this.isSource=typeof E.isSource=="undefined"?true:E.isSource;
var C=E.accept instanceof Array?E.accept:["text"];
this.accept=null;
if(C.length){this.accept={};
for(var B=0;
B<C.length;
++B){this.accept[C[B]]=1
}}this.horizontal=E.horizontal;
this.copyOnly=E.copyOnly;
this.withHandles=E.withHandles;
this.isDragging=false;
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
},checkAcceptance:function(G,C){if(this==G){return true
}for(var E=0;
E<C.length;
++E){var F=G.getItem(C[E].id).type;
var B=false;
for(var D=0;
D<F.length;
++D){if(F[D] in this.accept){B=true;
break
}}if(!B){return false
}}return true
},copyState:function(B){return this.copyOnly||B
},destroy:function(){A.dnd.Source.superclass.destroy.call(this);
A.forEach(this.topics,A.unsubscribe);
this.targetAnchor=null
},markupFactory:function(C,B){C._skipStartup=true;
return new A.dnd.Source(B,C)
},onMouseMove:function(E){if(this.isDragging&&this.targetState=="Disabled"){return 
}A.dnd.Source.superclass.onMouseMove.call(this,E);
var B=A.dnd.manager();
if(this.isDragging){var D=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:A.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){D=(E.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{D=(E.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||D!=this.before){this._markTargetAnchor(D);
B.canDrop(!this.current||B.source!=this||!(this.current.id in this.selection))
}}else{if(this.mouseDown&&this.isSource){var C=this.getSelectedNodes();
if(C.length){B.startDrag(this,C,this.copyState(A.dnd.getCopyKeyState(E)))
}}}},onMouseDown:function(B){if(this._legalMouseDown(B)&&(!this.skipForm||!A.dnd.isFormElement(B))){this.mouseDown=true;
this.mouseButton=B.button;
A.dnd.Source.superclass.onMouseDown.call(this,B)
}},onMouseUp:function(B){if(this.mouseDown){this.mouseDown=false;
A.dnd.Source.superclass.onMouseUp.call(this,B)
}},onDndSourceOver:function(C){if(this!=C){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var B=A.dnd.manager();
B.canDrop(this.targetState!="Disabled"&&(!this.current||B.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(C,B,E){if(this.isSource){this._changeState("Source",this==C?(E?"Copied":"Moved"):"")
}var D=this.accept&&this.checkAcceptance(C,B);
this._changeState("Target",D?"":"Disabled");
if(D&&this==C){A.dnd.manager().overSource(this)
}this.isDragging=true
},onDndDrop:function(D,B,E){do{if(this.containerState!="Over"){break
}var C=this._normalizedCreator;
if(this!=D){if(this.creator){this._normalizedCreator=function(F,G){return C.call(this,D.getItem(F.id).data,G)
}
}else{if(E){this._normalizedCreator=function(G,H){var F=D.getItem(G.id);
var I=G.cloneNode(true);
I.id=A.dnd.getUniqueId();
return{node:I,data:F.data,type:F.type}
}
}else{this._normalizedCreator=function(G,H){var F=D.getItem(G.id);
D.delItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}}else{if(this.current&&this.current.id in this.selection){break
}if(this.creator){if(E){this._normalizedCreator=function(F,G){return C.call(this,D.getItem(F.id).data,G)
}
}else{if(!this.current){break
}this._normalizedCreator=function(G,H){var F=D.getItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}else{if(E){this._normalizedCreator=function(G,H){var F=D.getItem(G.id);
var I=G.cloneNode(true);
I.id=A.dnd.getUniqueId();
return{node:I,data:F.data,type:F.type}
}
}else{if(!this.current){break
}this._normalizedCreator=function(G,H){var F=D.getItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}}this._removeSelection();
if(this!=D){this._removeAnchor()
}if(this!=D&&!E&&!this.creator){D.selectNone()
}this.insertNodes(true,B,this.before,this.current);
if(this!=D&&!E&&this.creator){D.deleteSelectedNodes()
}this._normalizedCreator=C
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
},onOverEvent:function(){A.dnd.Source.superclass.onOverEvent.call(this);
A.dnd.manager().overSource(this)
},onOutEvent:function(){A.dnd.Source.superclass.onOutEvent.call(this);
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
},_legalMouseDown:function(E){if(!this.withHandles){return true
}for(var D=E.target;
D&&!A.hasClass(D,"dojoDndItem");
D=D.parentNode){if(A.hasClass(D,"dojoDndHandle")){var C=E;
if(!C){C=window.event
}var F={x:C.clientX,y:C.clientY};
var B=false;
A.query("a",D).forEach(function(H){if(!B){var G=H.getBoundingClientRect();
B=(G.left<=F.x&&F.x<=G.right&&G.top<=F.y&&F.y<=G.bottom)
}});
if(B){return false
}return true
}}return false
}});
A.declare("dojo.dnd.Target",A.dnd.Source,{constructor:function(B,C){this.isSource=false;
A.removeClass(this.node,"dojoDndSource")
},markupFactory:function(C,B){C._skipStartup=true;
return new A.dnd.Target(B,C)
}})
}}});