dojo._xdResourceLoaded({depends:[["provide","aimluck.dnd.DragMoveObject"],["provide","aimluck.dnd.Draggable"],["require","dojo.dnd.Mover"],["require","dojo.dnd.Moveable"],["require","dojo.parser"],["require","dojo.dnd.Source"]],defineResource:function(A){if(!A._hasResource["aimluck.dnd.DragMoveObject"]){A._hasResource["aimluck.dnd.DragMoveObject"]=true;
A.provide("aimluck.dnd.DragMoveObject");
A.provide("aimluck.dnd.Draggable");
A.require("dojo.dnd.Mover");
A.require("dojo.dnd.Moveable");
A.require("dojo.parser");
A.require("dojo.dnd.Source");
A.declare("aimluck.dnd.DragMoveObject",[A.dnd.Mover],{_pageY:0,_pageX:0,portletId:null,leftTop:null,onFirstMove:function(B){A.dnd.Mover.prototype.onFirstMove.apply(this,arguments)
},onMouseUp:function(B){A.dnd.Mover.prototype.onMouseUp.apply(this,arguments)
},onMouseDown:function(C){var B=this.marginBox;
this.leftTop={l:B.l+C.pageX,t:B.t+C.pageY};
A.dnd.Mover.prototype.onMouseDown.apply(this,arguments)
},onMouseMove:function(C){this._pageX=C.pageX;
this._pageY=C.pageY;
A.dnd.autoScroll(C);
var B=this.marginBox;
this.leftTop={l:B.l+C.pageX,t:B.t+C.pageY}
}});
A.declare("aimluck.dnd.Draggable",A.dnd.Moveable,{DragMoveObject:aimluck.dnd.DragMoveObject,portletId:null,constructor:function(B,C){this.portletId=C.pid
},onMouseDown:function(B){if(this.skip&&A.dnd.isFormElement(B)){return 
}if(this.delay){this.events.push(A.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(A.connect(this.handle,"onmouseup",this,"onMouseUp"))
}else{dragObj=new this.DragMoveObject(this.node,B,this);
dragObj.dragSource=this;
dragObj.portletId=this.portletId
}dragObj._pageX=B.pageX;
dragObj._pageY=B.pageY;
this._lastX=B.pageX;
this._lastY=B.pageY;
A.stopEvent(B)
}})
}}});