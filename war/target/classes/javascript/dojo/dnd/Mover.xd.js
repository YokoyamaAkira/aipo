dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Mover"],["require","dojo.dnd.common"],["require","dojo.dnd.autoscroll"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Mover"]){A._hasResource["dojo.dnd.Mover"]=true;
A.provide("dojo.dnd.Mover");
A.require("dojo.dnd.common");
A.require("dojo.dnd.autoscroll");
A.declare("dojo.dnd.Mover",null,{constructor:function(F,G,E){this.node=A.byId(F);
this.marginBox={l:G.pageX,t:G.pageY};
this.mouseButton=G.button;
var D=this.host=E,C=F.ownerDocument,B=A.connect(C,"onmousemove",this,"onFirstMove");
this.events=[A.connect(C,"onmousemove",this,"onMouseMove"),A.connect(C,"onmouseup",this,"onMouseUp"),A.connect(C,"ondragstart",A,"stopEvent"),A.connect(C,"onselectstart",A,"stopEvent"),B];
if(D&&D.onMoveStart){D.onMoveStart(this)
}},onMouseMove:function(B){A.dnd.autoScroll(B);
var C=this.marginBox;
this.host.onMove(this,{l:C.l+B.pageX,t:C.t+B.pageY})
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