dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.move"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.move"]){A._hasResource["dojox.gfx.move"]=true;
A.provide("dojox.gfx.move");
A.experimental("dojox.gfx.move");
dojox.gfx.Mover=function(B,D){this.shape=B;
this.lastX=D.clientX;
this.lastY=D.clientY;
var E=document,C=A.connect(E,"onmousemove",this,"onFirstMove");
this.events=[A.connect(E,"onmousemove",this,"onMouseMove"),A.connect(E,"onmouseup",this,"destroy"),A.connect(E,"ondragstart",A,"stopEvent"),A.connect(E,"onselectstart",A,"stopEvent"),C];
A.publish("/gfx/move/start",[this]);
A.addClass(A.body(),"dojoMove")
};
A.extend(dojox.gfx.Mover,{onMouseMove:function(C){var B=C.clientX;
var D=C.clientY;
this.shape.applyLeftTransform({dx:B-this.lastX,dy:D-this.lastY});
this.lastX=B;
this.lastY=D;
A.stopEvent(C)
},onFirstMove:function(){A.disconnect(this.events.pop())
},destroy:function(){A.forEach(this.events,A.disconnect);
A.publish("/gfx/move/stop",[this]);
A.removeClass(A.body(),"dojoMove");
this.events=this.shape=null
}});
dojox.gfx.Moveable=function(B,C){this.shape=B;
this.delay=(C&&C.delay>0)?C.delay:0;
this.mover=(C&&C.mover)?C.mover:dojox.gfx.Mover;
this.events=[this.shape.connect("onmousedown",this,"onMouseDown"),]
};
A.extend(dojox.gfx.Moveable,{destroy:function(){A.forEach(this.events,"disconnect",this.shape);
this.events=this.shape=null
},onMouseDown:function(B){if(this.delay){this.events.push(this.shape.connect("onmousemove",this,"onMouseMove"));
this.events.push(this.shape.connect("onmouseup",this,"onMouseUp"));
this._lastX=B.clientX;
this._lastY=B.clientY
}else{new this.mover(this.shape,B)
}A.stopEvent(B)
},onMouseMove:function(B){if(Math.abs(B.clientX-this._lastX)>this.delay||Math.abs(B.clientY-this._lastY)>this.delay){this.onMouseUp(B);
new this.mover(this.shape,B)
}A.stopEvent(B)
},onMouseUp:function(B){this.shape.disconnect(this.events.pop());
this.shape.disconnect(this.events.pop())
}})
}}});