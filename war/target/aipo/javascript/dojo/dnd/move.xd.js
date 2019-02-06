dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.move"],["require","dojo.dnd.Mover"],["require","dojo.dnd.Moveable"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.move"]){A._hasResource["dojo.dnd.move"]=true;
A.provide("dojo.dnd.move");
A.require("dojo.dnd.Mover");
A.require("dojo.dnd.Moveable");
A.declare("dojo.dnd.move.constrainedMoveable",A.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(C,B){return new A.dnd.move.constrainedMoveable(B,C)
},constructor:function(B,C){if(!C){C={}
}this.constraints=C.constraints;
this.within=C.within
},onFirstMove:function(C){var D=this.constraintBox=this.constraints.call(this,C),B=C.marginBox;
D.r=D.l+D.w-(this.within?B.w:0);
D.b=D.t+D.h-(this.within?B.h:0)
},onMove:function(C,B){var D=this.constraintBox;
B.l=B.l<D.l?D.l:D.r<B.l?D.r:B.l;
B.t=B.t<D.t?D.t:D.b<B.t?D.b:B.t;
A.marginBox(C.node,B)
}});
A.declare("dojo.dnd.move.boxConstrainedMoveable",A.dnd.move.constrainedMoveable,{box:{},markupFactory:function(C,B){return new A.dnd.move.boxConstrainedMoveable(B,C)
},constructor:function(C,D){var B=D&&D.box;
this.constraints=function(){return B
}
}});
A.declare("dojo.dnd.move.parentConstrainedMoveable",A.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(C,B){return new A.dnd.move.parentConstrainedMoveable(B,C)
},constructor:function(C,D){var B=D&&D.area;
this.constraints=function(){var H=this.node.parentNode,F=A.getComputedStyle(H),G=A._getMarginBox(H,F);
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
}
}});
A.dnd.move.constrainedMover=function(B,D){var C=function(F,G,E){A.dnd.Mover.call(this,F,G,E)
};
A.extend(C,A.dnd.Mover.prototype);
A.extend(C,{onMouseMove:function(H){A.dnd.autoScroll(H);
var E=this.marginBox,I=this.constraintBox,F=E.l+H.pageX,G=E.t+H.pageY;
F=F<I.l?I.l:I.r<F?I.r:F;
G=G<I.t?I.t:I.b<G?I.b:G;
this.host.onMove(this,{l:F,t:G})
},onFirstMove:function(){A.dnd.Mover.prototype.onFirstMove.call(this);
var F=this.constraintBox=B.call(this),E=this.marginBox;
F.r=F.l+F.w-(D?E.w:0);
F.b=F.t+F.h-(D?E.h:0)
}});
return C
};
A.dnd.move.boxConstrainedMover=function(C,B){return A.dnd.move.constrainedMover(function(){return C
},B)
};
A.dnd.move.parentConstrainedMover=function(D,C){var B=function(){var H=this.node.parentNode,F=A.getComputedStyle(H),G=A._getMarginBox(H,F);
if(D=="margin"){return G
}var E=A._getMarginExtents(H,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(D=="border"){return G
}E=A._getBorderExtents(H,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(D=="padding"){return G
}E=A._getPadExtents(H,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
return G
};
return A.dnd.move.constrainedMover(B,C)
};
A.dnd.constrainedMover=A.dnd.move.constrainedMover;
A.dnd.boxConstrainedMover=A.dnd.move.boxConstrainedMover;
A.dnd.parentConstrainedMover=A.dnd.move.parentConstrainedMover
}}});