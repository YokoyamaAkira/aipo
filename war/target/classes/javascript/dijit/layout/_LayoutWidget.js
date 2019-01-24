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
}},resize:function(A){var B=this.domNode;
if(A){dojo.marginBox(B,A);
if(A.t){B.style.top=A.t+"px"
}if(A.l){B.style.left=A.l+"px"
}}var C=dojo.mixin(dojo.marginBox(B),A||{});
this._contentBox=dijit.layout.marginBox2contentBox(B,C);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(D,E){var B=dojo.getComputedStyle(D);
var C=dojo._getMarginExtents(D,B);
var A=dojo._getPadBorderExtents(D,B);
return{l:dojo._toPixelValue(D,B.paddingLeft),t:dojo._toPixelValue(D,B.paddingTop),w:E.w-(C.w+A.w),h:E.h-(C.h+A.h)}
};
(function(){var B=function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
};
var A=function(C,D){C.resize?C.resize(D):dojo.marginBox(C.domNode,D);
dojo.mixin(C,dojo.marginBox(C.domNode));
dojo.mixin(C,D)
};
dijit.layout.layoutChildren=function(C,E,D){E=dojo.mixin({},E);
dojo.addClass(C,"dijitLayoutContainer");
D=dojo.filter(D,function(F){return F.layoutAlign!="client"
}).concat(dojo.filter(D,function(F){return F.layoutAlign=="client"
}));
dojo.forEach(D,function(I){var H=I.domNode,G=I.layoutAlign;
var F=H.style;
F.left=E.l+"px";
F.top=E.t+"px";
F.bottom=F.right="auto";
dojo.addClass(H,"dijitAlign"+B(G));
if(G=="top"||G=="bottom"){A(I,{w:E.w});
E.h-=I.h;
if(G=="top"){E.t+=I.h
}else{F.top=E.t+E.h+"px"
}}else{if(G=="left"||G=="right"){A(I,{h:E.h});
E.w-=I.w;
if(G=="left"){E.l+=I.w
}else{F.left=E.l+E.w+"px"
}}else{if(G=="client"){A(I,E)
}}}})
}
})()
};