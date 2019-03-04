if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.autoscroll");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(D,E,C){this.node=dojo.byId(D);
this.marginBox={l:E.pageX,t:E.pageY};
this.mouseButton=E.button;
var B=this.host=C,F=D.ownerDocument,A=dojo.connect(F,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(F,"onmousemove",this,"onMouseMove"),dojo.connect(F,"onmouseup",this,"onMouseUp"),dojo.connect(F,"ondragstart",dojo,"stopEvent"),dojo.connect(F,"onselectstart",dojo,"stopEvent"),A];
if(B&&B.onMoveStart){B.onMoveStart(this)
}},onMouseMove:function(B){dojo.dnd.autoScroll(B);
var A=this.marginBox;
this.host.onMove(this,{l:A.l+B.pageX,t:A.t+B.pageY})
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