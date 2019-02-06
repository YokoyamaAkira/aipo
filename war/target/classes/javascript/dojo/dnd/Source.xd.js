dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Source"],["require","dojo.dnd.Selector"],["require","dojo.dnd.Manager"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Source"]){A._hasResource["dojo.dnd.Source"]=true;
A.provide("dojo.dnd.Source");
A.require("dojo.dnd.Selector");
A.require("dojo.dnd.Manager");
A.declare("dojo.dnd.Source",A.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,skipForm:false,withHandles:false,accept:["text"],constructor:function(E,B){if(!B){B={}
}this.isSource=typeof B.isSource=="undefined"?true:B.isSource;
var D=B.accept instanceof Array?B.accept:["text"];
this.accept=null;
if(D.length){this.accept={};
for(var C=0;
C<D.length;
++C){this.accept[D[C]]=1
}}this.horizontal=B.horizontal;
this.copyOnly=B.copyOnly;
this.withHandles=B.withHandles;
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
},checkAcceptance:function(C,D){if(this==C){return true
}for(var F=0;
F<D.length;
++F){var G=C.getItem(D[F].id).type;
var B=false;
for(var E=0;
E<G.length;
++E){if(G[E] in this.accept){B=true;
break
}}if(!B){return false
}}return true
},copyState:function(B){return this.copyOnly||B
},destroy:function(){A.dnd.Source.superclass.destroy.call(this);
A.forEach(this.topics,A.unsubscribe);
this.targetAnchor=null
},markupFactory:function(B,C){B._skipStartup=true;
return new A.dnd.Source(C,B)
},onMouseMove:function(B){if(this.isDragging&&this.targetState=="Disabled"){return 
}A.dnd.Source.superclass.onMouseMove.call(this,B);
var C=A.dnd.manager();
if(this.isDragging){var E=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:A.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){E=(B.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{E=(B.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||E!=this.before){this._markTargetAnchor(E);
C.canDrop(!this.current||C.source!=this||!(this.current.id in this.selection))
}}else{if(this.mouseDown&&this.isSource){var D=this.getSelectedNodes();
if(D.length){C.startDrag(this,D,this.copyState(A.dnd.getCopyKeyState(B)))
}}}},onMouseDown:function(B){if(this._legalMouseDown(B)&&(!this.skipForm||!A.dnd.isFormElement(B))){this.mouseDown=true;
this.mouseButton=B.button;
A.dnd.Source.superclass.onMouseDown.call(this,B)
}},onMouseUp:function(B){if(this.mouseDown){this.mouseDown=false;
A.dnd.Source.superclass.onMouseUp.call(this,B)
}},onDndSourceOver:function(B){if(this!=B){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var C=A.dnd.manager();
C.canDrop(this.targetState!="Disabled"&&(!this.current||C.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(D,C,B){if(this.isSource){this._changeState("Source",this==D?(B?"Copied":"Moved"):"")
}var E=this.accept&&this.checkAcceptance(D,C);
this._changeState("Target",E?"":"Disabled");
if(E&&this==D){A.dnd.manager().overSource(this)
}this.isDragging=true
},onDndDrop:function(E,C,B){do{if(this.containerState!="Over"){break
}var D=this._normalizedCreator;
if(this!=E){if(this.creator){this._normalizedCreator=function(F,G){return D.call(this,E.getItem(F.id).data,G)
}
}else{if(B){this._normalizedCreator=function(G,H){var F=E.getItem(G.id);
var I=G.cloneNode(true);
I.id=A.dnd.getUniqueId();
return{node:I,data:F.data,type:F.type}
}
}else{this._normalizedCreator=function(G,H){var F=E.getItem(G.id);
E.delItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}}else{if(this.current&&this.current.id in this.selection){break
}if(this.creator){if(B){this._normalizedCreator=function(F,G){return D.call(this,E.getItem(F.id).data,G)
}
}else{if(!this.current){break
}this._normalizedCreator=function(G,H){var F=E.getItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}else{if(B){this._normalizedCreator=function(G,H){var F=E.getItem(G.id);
var I=G.cloneNode(true);
I.id=A.dnd.getUniqueId();
return{node:I,data:F.data,type:F.type}
}
}else{if(!this.current){break
}this._normalizedCreator=function(G,H){var F=E.getItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}}this._removeSelection();
if(this!=E){this._removeAnchor()
}if(this!=E&&!B&&!this.creator){E.selectNone()
}this.insertNodes(true,C,this.before,this.current);
if(this!=E&&!B&&this.creator){E.deleteSelectedNodes()
}this._normalizedCreator=D
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
},_legalMouseDown:function(F){if(!this.withHandles){return true
}for(var E=F.target;
E&&!A.hasClass(E,"dojoDndItem");
E=E.parentNode){if(A.hasClass(E,"dojoDndHandle")){var D=F;
if(!D){D=window.event
}var B={x:D.clientX,y:D.clientY};
var C=false;
A.query("a",E).forEach(function(H){if(!C){var G=H.getBoundingClientRect();
C=(G.left<=B.x&&B.x<=G.right&&G.top<=B.y&&B.y<=G.bottom)
}});
if(C){return false
}return true
}}return false
}});
A.declare("dojo.dnd.Target",A.dnd.Source,{constructor:function(C,B){this.isSource=false;
A.removeClass(this.node,"dojoDndSource")
},markupFactory:function(B,C){B._skipStartup=true;
return new A.dnd.Target(C,B)
}})
}}});