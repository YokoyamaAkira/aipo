if(!dojo._hasResource["aimluck.dnd.DragMoveObject"]){dojo._hasResource["aimluck.dnd.DragMoveObject"]=true;
dojo.provide("aimluck.dnd.DragMoveObject");
dojo.provide("aimluck.dnd.Draggable");
dojo.require("dojo.dnd.Mover");
dojo.require("dojo.dnd.Moveable");
dojo.require("dojo.parser");
dojo.require("dojo.dnd.Source");
dojo.declare("aimluck.dnd.DragMoveObject",[dojo.dnd.Mover],{_pageY:0,_pageX:0,portletId:null,leftTop:null,onFirstMove:function(A){dojo.dnd.Mover.prototype.onFirstMove.apply(this,arguments)
},onMouseUp:function(A){dojo.dnd.Mover.prototype.onMouseUp.apply(this,arguments)
},onMouseDown:function(B){var A=this.marginBox;
this.leftTop={l:A.l+B.pageX,t:A.t+B.pageY};
dojo.dnd.Mover.prototype.onMouseDown.apply(this,arguments)
},onMouseMove:function(B){this._pageX=B.pageX;
this._pageY=B.pageY;
dojo.dnd.autoScroll(B);
var A=this.marginBox;
this.leftTop={l:A.l+B.pageX,t:A.t+B.pageY}
}});
dojo.declare("aimluck.dnd.Draggable",dojo.dnd.Moveable,{DragMoveObject:aimluck.dnd.DragMoveObject,portletId:null,constructor:function(A,B){this.portletId=B.pid
},onMouseDown:function(A){if(this.skip&&dojo.dnd.isFormElement(A)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"))
}else{dragObj=new this.DragMoveObject(this.node,A,this);
dragObj.dragSource=this;
dragObj.portletId=this.portletId
}dragObj._pageX=A.pageX;
dragObj._pageY=A.pageY;
this._lastX=A.pageX;
this._lastY=A.pageY;
dojo.stopEvent(A)
}})
};