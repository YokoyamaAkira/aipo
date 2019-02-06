dojo._xdResourceLoaded({depends:[["provide","dijit.layout._LayoutWidget"],["require","dijit._Widget"],["require","dijit._Container"]],defineResource:function(A){if(!A._hasResource["dijit.layout._LayoutWidget"]){A._hasResource["dijit.layout._LayoutWidget"]=true;
A.provide("dijit.layout._LayoutWidget");
A.require("dijit._Widget");
A.require("dijit._Container");
A.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){A.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){A.forEach(this.getChildren(),function(B){B.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(C){var D=this.domNode;
if(C){A.marginBox(D,C);
if(C.t){D.style.top=C.t+"px"
}if(C.l){D.style.left=C.l+"px"
}}var B=A.mixin(A.marginBox(D),C||{});
this._contentBox=dijit.layout.marginBox2contentBox(D,B);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(F,B){var D=A.getComputedStyle(F);
var E=A._getMarginExtents(F,D);
var C=A._getPadBorderExtents(F,D);
return{l:A._toPixelValue(F,D.paddingLeft),t:A._toPixelValue(F,D.paddingTop),w:B.w-(E.w+C.w),h:B.h-(E.h+C.h)}
};
(function(){var B=function(D){return D.substring(0,1).toUpperCase()+D.substring(1)
};
var C=function(D,E){D.resize?D.resize(E):A.marginBox(D.domNode,E);
A.mixin(D,A.marginBox(D.domNode));
A.mixin(D,E)
};
dijit.layout.layoutChildren=function(D,F,E){F=A.mixin({},F);
A.addClass(D,"dijitLayoutContainer");
E=A.filter(E,function(G){return G.layoutAlign!="client"
}).concat(A.filter(E,function(G){return G.layoutAlign=="client"
}));
A.forEach(E,function(J){var I=J.domNode,H=J.layoutAlign;
var G=I.style;
G.left=F.l+"px";
G.top=F.t+"px";
G.bottom=G.right="auto";
A.addClass(I,"dijitAlign"+B(H));
if(H=="top"||H=="bottom"){C(J,{w:F.w});
F.h-=J.h;
if(H=="top"){F.t+=J.h
}else{G.top=F.t+F.h+"px"
}}else{if(H=="left"||H=="right"){C(J,{h:F.h});
F.w-=J.w;
if(H=="left"){F.l+=J.w
}else{G.left=F.l+F.w+"px"
}}else{if(H=="client"){C(J,F)
}}}})
}
})()
}}});