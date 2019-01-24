if(!dojo._hasResource["dojox.gfx.move"]){dojo._hasResource["dojox.gfx.move"]=true;
dojo.provide("dojox.gfx.move");
dojo.experimental("dojox.gfx.move");
dojox.gfx.Mover=function(A,C){this.shape=A;
this.lastX=C.clientX;
this.lastY=C.clientY;
var D=document,B=dojo.connect(D,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(D,"onmousemove",this,"onMouseMove"),dojo.connect(D,"onmouseup",this,"destroy"),dojo.connect(D,"ondragstart",dojo,"stopEvent"),dojo.connect(D,"onselectstart",dojo,"stopEvent"),B];
dojo.publish("/gfx/move/start",[this]);
dojo.addClass(dojo.body(),"dojoMove")
};
dojo.extend(dojox.gfx.Mover,{onMouseMove:function(B){var A=B.clientX;
var C=B.clientY;
this.shape.applyLeftTransform({dx:A-this.lastX,dy:C-this.lastY});
this.lastX=A;
this.lastY=C;
dojo.stopEvent(B)
},onFirstMove:function(){dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
dojo.publish("/gfx/move/stop",[this]);
dojo.removeClass(dojo.body(),"dojoMove");
this.events=this.shape=null
}});
dojox.gfx.Moveable=function(A,B){this.shape=A;
this.delay=(B&&B.delay>0)?B.delay:0;
this.mover=(B&&B.mover)?B.mover:dojox.gfx.Mover;
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