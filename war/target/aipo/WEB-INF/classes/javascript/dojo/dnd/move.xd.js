dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.move"],["require","dojo.dnd.Mover"],["require","dojo.dnd.Moveable"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.move"]){A._hasResource["dojo.dnd.move"]=true;
A.provide("dojo.dnd.move");
A.require("dojo.dnd.Mover");
A.require("dojo.dnd.Moveable");
A.declare("dojo.dnd.move.constrainedMoveable",A.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(B,C){return new A.dnd.move.constrainedMoveable(C,B)
},constructor:function(C,B){if(!B){B={}
}this.constraints=B.constraints;
this.within=B.within
},onFirstMove:function(D){var B=this.constraintBox=this.constraints.call(this,D),C=D.marginBox;
B.r=B.l+B.w-(this.within?C.w:0);
B.b=B.t+B.h-(this.within?C.h:0)
},onMove:function(D,C){var B=this.constraintBox;
C.l=C.l<B.l?B.l:B.r<C.l?B.r:C.l;
C.t=C.t<B.t?B.t:B.b<C.t?B.b:C.t;
A.marginBox(D.node,C)
}});
A.declare("dojo.dnd.move.boxConstrainedMoveable",A.dnd.move.constrainedMoveable,{box:{},markupFactory:function(B,C){return new A.dnd.move.boxConstrainedMoveable(C,B)
},constructor:function(D,B){var C=B&&B.box;
this.constraints=function(){return C
}
}});
A.declare("dojo.dnd.move.parentConstrainedMoveable",A.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(B,C){return new A.dnd.move.parentConstrainedMoveable(C,B)
},constructor:function(D,B){var C=B&&B.area;
this.constraints=function(){var H=this.node.parentNode,F=A.getComputedStyle(H),G=A._getMarginBox(H,F);
if(C=="margin"){return G
}var E=A._getMarginExtents(H,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(C=="border"){return G
}E=A._getBorderExtents(H,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(C=="padding"){return G
}E=A._getPadExtents(H,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
return G
}
}});
A.dnd.move.constrainedMover=function(C,B){var D=function(F,G,E){A.dnd.Mover.call(this,F,G,E)
};
A.extend(D,A.dnd.Mover.prototype);
A.extend(D,{onMouseMove:function(H){A.dnd.autoScroll(H);
var E=this.marginBox,I=this.constraintBox,F=E.l+H.pageX,G=E.t+H.pageY;
F=F<I.l?I.l:I.r<F?I.r:F;
G=G<I.t?I.t:I.b<G?I.b:G;
this.host.onMove(this,{l:F,t:G})
},onFirstMove:function(){A.dnd.Mover.prototype.onFirstMove.call(this);
var F=this.constraintBox=C.call(this),E=this.marginBox;
F.r=F.l+F.w-(B?E.w:0);
F.b=F.t+F.h-(B?E.h:0)
}});
return D
};
A.dnd.move.boxConstrainedMover=function(B,C){return A.dnd.move.constrainedMover(function(){return B
},C)
};
A.dnd.move.parentConstrainedMover=function(B,D){var C=function(){var H=this.node.parentNode,F=A.getComputedStyle(H),G=A._getMarginBox(H,F);
if(B=="margin"){return G
}var E=A._getMarginExtents(H,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(B=="border"){return G
}E=A._getBorderExtents(H,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(B=="padding"){return G
}E=A._getPadExtents(H,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
return G
};
return A.dnd.move.constrainedMover(C,D)
};
A.dnd.constrainedMover=A.dnd.move.constrainedMover;
A.dnd.boxConstrainedMover=A.dnd.move.boxConstrainedMover;
A.dnd.parentConstrainedMover=A.dnd.move.parentConstrainedMover
}}});