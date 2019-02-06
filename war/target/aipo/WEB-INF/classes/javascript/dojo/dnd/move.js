if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.require("dojo.dnd.Mover");
dojo.require("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(A,B){return new dojo.dnd.move.constrainedMoveable(B,A)
},constructor:function(B,A){if(!A){A={}
}this.constraints=A.constraints;
this.within=A.within
},onFirstMove:function(A){var B=this.constraintBox=this.constraints.call(this,A),C=A.marginBox;
B.r=B.l+B.w-(this.within?C.w:0);
B.b=B.t+B.h-(this.within?C.h:0)
},onMove:function(A,C){var B=this.constraintBox;
C.l=C.l<B.l?B.l:B.r<C.l?B.r:C.l;
C.t=C.t<B.t?B.t:B.b<C.t?B.b:C.t;
dojo.marginBox(A.node,C)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(A,B){return new dojo.dnd.move.boxConstrainedMoveable(B,A)
},constructor:function(A,B){var C=B&&B.box;
this.constraints=function(){return C
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(A,B){return new dojo.dnd.move.parentConstrainedMoveable(B,A)
},constructor:function(A,B){var C=B&&B.area;
this.constraints=function(){var D=this.node.parentNode,F=dojo.getComputedStyle(D),G=dojo._getMarginBox(D,F);
if(C=="margin"){return G
}var E=dojo._getMarginExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(C=="border"){return G
}E=dojo._getBorderExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(C=="padding"){return G
}E=dojo._getPadExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
return G
}
}});
dojo.dnd.move.constrainedMover=function(C,B){var A=function(F,D,E){dojo.dnd.Mover.call(this,F,D,E)
};
dojo.extend(A,dojo.dnd.Mover.prototype);
dojo.extend(A,{onMouseMove:function(H){dojo.dnd.autoScroll(H);
var E=this.marginBox,D=this.constraintBox,F=E.l+H.pageX,G=E.t+H.pageY;
F=F<D.l?D.l:D.r<F?D.r:F;
G=G<D.t?D.t:D.b<G?D.b:G;
this.host.onMove(this,{l:F,t:G})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var D=this.constraintBox=C.call(this),E=this.marginBox;
D.r=D.l+D.w-(B?E.w:0);
D.b=D.t+D.h-(B?E.h:0)
}});
return A
};
dojo.dnd.move.boxConstrainedMover=function(A,B){return dojo.dnd.move.constrainedMover(function(){return A
},B)
};
dojo.dnd.move.parentConstrainedMover=function(B,A){var C=function(){var D=this.node.parentNode,F=dojo.getComputedStyle(D),G=dojo._getMarginBox(D,F);
if(B=="margin"){return G
}var E=dojo._getMarginExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(B=="border"){return G
}E=dojo._getBorderExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(B=="padding"){return G
}E=dojo._getPadExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
return G
};
return dojo.dnd.move.constrainedMover(C,A)
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover
};