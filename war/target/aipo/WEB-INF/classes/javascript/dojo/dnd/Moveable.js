if(!dojo._hasResource["dojo.dnd.Moveable"]){dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.require("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(B,A){this.node=dojo.byId(B);
if(!A){A={}
}this.handle=A.handle?dojo.byId(A.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=A.delay>0?A.delay:0;
this.skip=A.skip;
this.mover=A.mover?A.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(A,B){return new dojo.dnd.Moveable(B,A)
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(A){if(this.skip&&dojo.dnd.isFormElement(A)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=A.pageX;
this._lastY=A.pageY
}else{new this.mover(this.node,A,this)
}dojo.stopEvent(A)
},onMouseMove:function(A){if(Math.abs(A.pageX-this._lastX)>this.delay||Math.abs(A.pageY-this._lastY)>this.delay){this.onMouseUp(A);
new this.mover(this.node,A,this)
}dojo.stopEvent(A)
},onMouseUp:function(A){dojo.disconnect(this.events.pop());
dojo.disconnect(this.events.pop())
},onSelectStart:function(A){if(!this.skip||!dojo.dnd.isFormElement(A)){dojo.stopEvent(A)
}},onMoveStart:function(A){dojo.publish("/dnd/move/start",[A]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(A){dojo.publish("/dnd/move/stop",[A]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(A){},onMove:function(A,B){this.onMoving(A,B);
dojo.marginBox(A.node,B);
this.onMoved(A,B)
},onMoving:function(A,B){},onMoved:function(A,B){}})
};