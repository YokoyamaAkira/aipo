if(!dojo._hasResource["dijit.layout._LayoutWidget"]){dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){dojo.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){dojo.forEach(this.getChildren(),function(A){A.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(C){var A=this.domNode;
if(C){dojo.marginBox(A,C);
if(C.t){A.style.top=C.t+"px"
}if(C.l){A.style.left=C.l+"px"
}}var B=dojo.mixin(dojo.marginBox(A),C||{});
this._contentBox=dijit.layout.marginBox2contentBox(A,B);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(C,D){var A=dojo.getComputedStyle(C);
var B=dojo._getMarginExtents(C,A);
var E=dojo._getPadBorderExtents(C,A);
return{l:dojo._toPixelValue(C,A.paddingLeft),t:dojo._toPixelValue(C,A.paddingTop),w:D.w-(B.w+E.w),h:D.h-(B.h+E.h)}
};
(function(){var A=function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
};
var B=function(D,C){D.resize?D.resize(C):dojo.marginBox(D.domNode,C);
dojo.mixin(D,dojo.marginBox(D.domNode));
dojo.mixin(D,C)
};
dijit.layout.layoutChildren=function(D,C,E){C=dojo.mixin({},C);
dojo.addClass(D,"dijitLayoutContainer");
E=dojo.filter(E,function(F){return F.layoutAlign!="client"
}).concat(dojo.filter(E,function(F){return F.layoutAlign=="client"
}));
dojo.forEach(E,function(I){var H=I.domNode,G=I.layoutAlign;
var F=H.style;
F.left=C.l+"px";
F.top=C.t+"px";
F.bottom=F.right="auto";
dojo.addClass(H,"dijitAlign"+A(G));
if(G=="top"||G=="bottom"){B(I,{w:C.w});
C.h-=I.h;
if(G=="top"){C.t+=I.h
}else{F.top=C.t+C.h+"px"
}}else{if(G=="left"||G=="right"){B(I,{h:C.h});
C.w-=I.w;
if(G=="left"){C.l+=I.w
}else{F.left=C.l+C.w+"px"
}}else{if(G=="client"){B(I,C)
}}}})
}
})()
};