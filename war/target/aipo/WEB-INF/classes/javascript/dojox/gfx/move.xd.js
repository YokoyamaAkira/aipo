dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.move"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.move"]){A._hasResource["dojox.gfx.move"]=true;
A.provide("dojox.gfx.move");
A.experimental("dojox.gfx.move");
dojox.gfx.Mover=function(C,E){this.shape=C;
this.lastX=E.clientX;
this.lastY=E.clientY;
var B=document,D=A.connect(B,"onmousemove",this,"onFirstMove");
this.events=[A.connect(B,"onmousemove",this,"onMouseMove"),A.connect(B,"onmouseup",this,"destroy"),A.connect(B,"ondragstart",A,"stopEvent"),A.connect(B,"onselectstart",A,"stopEvent"),D];
A.publish("/gfx/move/start",[this]);
A.addClass(A.body(),"dojoMove")
};
A.extend(dojox.gfx.Mover,{onMouseMove:function(D){var C=D.clientX;
var B=D.clientY;
this.shape.applyLeftTransform({dx:C-this.lastX,dy:B-this.lastY});
this.lastX=C;
this.lastY=B;
A.stopEvent(D)
},onFirstMove:function(){A.disconnect(this.events.pop())
},destroy:function(){A.forEach(this.events,A.disconnect);
A.publish("/gfx/move/stop",[this]);
A.removeClass(A.body(),"dojoMove");
this.events=this.shape=null
}});
dojox.gfx.Moveable=function(C,B){this.shape=C;
this.delay=(B&&B.delay>0)?B.delay:0;
this.mover=(B&&B.mover)?B.mover:dojox.gfx.Mover;
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