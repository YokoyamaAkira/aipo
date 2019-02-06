if(!dojo._hasResource["dojox.gfx.move"]){dojo._hasResource["dojox.gfx.move"]=true;
dojo.provide("dojox.gfx.move");
dojo.experimental("dojox.gfx.move");
dojox.gfx.Mover=function(D,B){this.shape=D;
this.lastX=B.clientX;
this.lastY=B.clientY;
var C=document,A=dojo.connect(C,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(C,"onmousemove",this,"onMouseMove"),dojo.connect(C,"onmouseup",this,"destroy"),dojo.connect(C,"ondragstart",dojo,"stopEvent"),dojo.connect(C,"onselectstart",dojo,"stopEvent"),A];
dojo.publish("/gfx/move/start",[this]);
dojo.addClass(dojo.body(),"dojoMove")
};
dojo.extend(dojox.gfx.Mover,{onMouseMove:function(A){var C=A.clientX;
var B=A.clientY;
this.shape.applyLeftTransform({dx:C-this.lastX,dy:B-this.lastY});
this.lastX=C;
this.lastY=B;
dojo.stopEvent(A)
},onFirstMove:function(){dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
dojo.publish("/gfx/move/stop",[this]);
dojo.removeClass(dojo.body(),"dojoMove");
this.events=this.shape=null
}});
dojox.gfx.Moveable=function(B,A){this.shape=B;
this.delay=(A&&A.delay>0)?A.delay:0;
this.mover=(A&&A.mover)?A.mover:dojox.gfx.Mover;
this.events=[this.shape.connect("onmousedown",this,"onMouseDown"),]
};
dojo.extend(dojox.gfx.Moveable,{destroy:function(){dojo.forEach(this.events,"disconnect",this.shape);
this.events=this.shape=null
},onMouseDown:function(A){if(this.delay){this.events.push(this.shape.connect("onmousemove",this,"onMouseMove"));
this.events.push(this.shape.connect("onmouseup",this,"onMouseUp"));
this._lastX=A.clientX;
this._lastY=A.clientY
}else{new this.mover(this.shape,A)
}dojo.stopEvent(A)
},onMouseMove:function(A){if(Math.abs(A.clientX-this._lastX)>this.delay||Math.abs(A.clientY-this._lastY)>this.delay){this.onMouseUp(A);
new this.mover(this.shape,A)
}dojo.stopEvent(A)
},onMouseUp:function(A){this.shape.disconnect(this.events.pop());
this.shape.disconnect(this.events.pop())
}})
};