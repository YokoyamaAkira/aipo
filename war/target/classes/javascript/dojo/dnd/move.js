if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.require("dojo.dnd.Mover");
dojo.require("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(B,A){return new dojo.dnd.move.constrainedMoveable(A,B)
},constructor:function(A,B){if(!B){B={}
}this.constraints=B.constraints;
this.within=B.within
},onFirstMove:function(B){var C=this.constraintBox=this.constraints.call(this,B),A=B.marginBox;
C.r=C.l+C.w-(this.within?A.w:0);
C.b=C.t+C.h-(this.within?A.h:0)
},onMove:function(B,A){var C=this.constraintBox;
A.l=A.l<C.l?C.l:C.r<A.l?C.r:A.l;
A.t=A.t<C.t?C.t:C.b<A.t?C.b:A.t;
dojo.marginBox(B.node,A)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(B,A){return new dojo.dnd.move.boxConstrainedMoveable(A,B)
},constructor:function(B,C){var A=C&&C.box;
this.constraints=function(){return A
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(B,A){return new dojo.dnd.move.parentConstrainedMoveable(A,B)
},constructor:function(B,C){var A=C&&C.area;
this.constraints=function(){var G=this.node.parentNode,E=dojo.getComputedStyle(G),F=dojo._getMarginBox(G,E);
if(A=="margin"){return F
}var D=dojo._getMarginExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(A=="border"){return F
}D=dojo._getBorderExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(A=="padding"){return F
}D=dojo._getPadExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
return F
}
}});
dojo.dnd.move.constrainedMover=function(A,C){var B=function(E,F,D){dojo.dnd.Mover.call(this,E,F,D)
};
dojo.extend(B,dojo.dnd.Mover.prototype);
dojo.extend(B,{onMouseMove:function(G){dojo.dnd.autoScroll(G);
var D=this.marginBox,H=this.constraintBox,E=D.l+G.pageX,F=D.t+G.pageY;
E=E<H.l?H.l:H.r<E?H.r:E;
F=F<H.t?H.t:H.b<F?H.b:F;
this.host.onMove(this,{l:E,t:F})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var E=this.constraintBox=A.call(this),D=this.marginBox;
E.r=E.l+E.w-(C?D.w:0);
E.b=E.t+E.h-(C?D.h:0)
}});
return B
};
dojo.dnd.move.boxConstrainedMover=function(B,A){return dojo.dnd.move.constrainedMover(function(){return B
},A)
};
dojo.dnd.move.parentConstrainedMover=function(C,B){var A=function(){var G=this.node.parentNode,E=dojo.getComputedStyle(G),F=dojo._getMarginBox(G,E);
if(C=="margin"){return F
}var D=dojo._getMarginExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(C=="border"){return F
}D=dojo._getBorderExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(C=="padding"){return F
}D=dojo._getPadExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
return F
};
return dojo.dnd.move.constrainedMover(A,B)
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover
};