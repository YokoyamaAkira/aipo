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
}},resize:function(B){var C=this.domNode;
if(B){A.marginBox(C,B);
if(B.t){C.style.top=B.t+"px"
}if(B.l){C.style.left=B.l+"px"
}}var D=A.mixin(A.marginBox(C),B||{});
this._contentBox=dijit.layout.marginBox2contentBox(C,D);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(E,F){var C=A.getComputedStyle(E);
var D=A._getMarginExtents(E,C);
var B=A._getPadBorderExtents(E,C);
return{l:A._toPixelValue(E,C.paddingLeft),t:A._toPixelValue(E,C.paddingTop),w:F.w-(D.w+B.w),h:F.h-(D.h+B.h)}
};
(function(){var C=function(D){return D.substring(0,1).toUpperCase()+D.substring(1)
};
var B=function(D,E){D.resize?D.resize(E):A.marginBox(D.domNode,E);
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
A.addClass(I,"dijitAlign"+C(H));
if(H=="top"||H=="bottom"){B(J,{w:F.w});
F.h-=J.h;
if(H=="top"){F.t+=J.h
}else{G.top=F.t+F.h+"px"
}}else{if(H=="left"||H=="right"){B(J,{h:F.h});
F.w-=J.w;
if(H=="left"){F.l+=J.w
}else{G.left=F.l+F.w+"px"
}}else{if(H=="client"){B(J,F)
}}}})
}
})()
}}});