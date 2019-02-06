if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.autoscroll");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(C,D,B){this.node=dojo.byId(C);
this.marginBox={l:D.pageX,t:D.pageY};
this.mouseButton=D.button;
var A=this.host=B,E=C.ownerDocument,F=dojo.connect(E,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(E,"onmousemove",this,"onMouseMove"),dojo.connect(E,"onmouseup",this,"onMouseUp"),dojo.connect(E,"ondragstart",dojo,"stopEvent"),dojo.connect(E,"onselectstart",dojo,"stopEvent"),F];
if(A&&A.onMoveStart){A.onMoveStart(this)
}},onMouseMove:function(A){dojo.dnd.autoScroll(A);
var B=this.marginBox;
this.host.onMove(this,{l:B.l+A.pageX,t:B.t+A.pageY})
},onMouseUp:function(A){if(this.mouseButton==A.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var A=dojo.marginBox(this.node);
A.l-=this.marginBox.l;
A.t-=this.marginBox.t;
this.marginBox=A;
this.host.onFirstMove(this);
dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
var A=this.host;
if(A&&A.onMoveStop){A.onMoveStop(this)
}this.events=this.node=null
}})
};