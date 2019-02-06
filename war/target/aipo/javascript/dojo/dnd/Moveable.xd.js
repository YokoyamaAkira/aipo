dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Moveable"],["require","dojo.dnd.Mover"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Moveable"]){A._hasResource["dojo.dnd.Moveable"]=true;
A.provide("dojo.dnd.Moveable");
A.require("dojo.dnd.Mover");
A.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(B,C){this.node=A.byId(B);
if(!C){C={}
}this.handle=C.handle?A.byId(C.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=C.delay>0?C.delay:0;
this.skip=C.skip;
this.mover=C.mover?C.mover:A.dnd.Mover;
this.events=[A.connect(this.handle,"onmousedown",this,"onMouseDown"),A.connect(this.handle,"ondragstart",this,"onSelectStart"),A.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(C,B){return new A.dnd.Moveable(B,C)
},destroy:function(){A.forEach(this.events,A.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(B){if(this.skip&&A.dnd.isFormElement(B)){return 
}if(this.delay){this.events.push(A.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(A.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=B.pageX;
this._lastY=B.pageY
}else{new this.mover(this.node,B,this)
}A.stopEvent(B)
},onMouseMove:function(B){if(Math.abs(B.pageX-this._lastX)>this.delay||Math.abs(B.pageY-this._lastY)>this.delay){this.onMouseUp(B);
new this.mover(this.node,B,this)
}A.stopEvent(B)
},onMouseUp:function(B){A.disconnect(this.events.pop());
A.disconnect(this.events.pop())
},onSelectStart:function(B){if(!this.skip||!A.dnd.isFormElement(B)){A.stopEvent(B)
}},onMoveStart:function(B){A.publish("/dnd/move/start",[B]);
A.addClass(A.body(),"dojoMove");
A.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(B){A.publish("/dnd/move/stop",[B]);
A.removeClass(A.body(),"dojoMove");
A.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(B){},onMove:function(C,B){this.onMoving(C,B);
A.marginBox(C.node,B);
this.onMoved(C,B)
},onMoving:function(C,B){},onMoved:function(C,B){}})
}}});