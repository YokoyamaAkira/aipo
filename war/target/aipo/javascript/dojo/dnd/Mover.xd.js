dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Mover"],["require","dojo.dnd.common"],["require","dojo.dnd.autoscroll"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Mover"]){A._hasResource["dojo.dnd.Mover"]=true;
A.provide("dojo.dnd.Mover");
A.require("dojo.dnd.common");
A.require("dojo.dnd.autoscroll");
A.declare("dojo.dnd.Mover",null,{constructor:function(E,F,D){this.node=A.byId(E);
this.marginBox={l:F.pageX,t:F.pageY};
this.mouseButton=F.button;
var C=this.host=D,G=E.ownerDocument,B=A.connect(G,"onmousemove",this,"onFirstMove");
this.events=[A.connect(G,"onmousemove",this,"onMouseMove"),A.connect(G,"onmouseup",this,"onMouseUp"),A.connect(G,"ondragstart",A,"stopEvent"),A.connect(G,"onselectstart",A,"stopEvent"),B];
if(C&&C.onMoveStart){C.onMoveStart(this)
}},onMouseMove:function(C){A.dnd.autoScroll(C);
var B=this.marginBox;
this.host.onMove(this,{l:B.l+C.pageX,t:B.t+C.pageY})
},onMouseUp:function(B){if(this.mouseButton==B.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var B=A.marginBox(this.node);
B.l-=this.marginBox.l;
B.t-=this.marginBox.t;
this.marginBox=B;
this.host.onFirstMove(this);
A.disconnect(this.events.pop())
},destroy:function(){A.forEach(this.events,A.disconnect);
var B=this.host;
if(B&&B.onMoveStop){B.onMoveStop(this)
}this.events=this.node=null
}})
}}});