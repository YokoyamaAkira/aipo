if(!dojo._hasResource["dojox.fx.scroll"]){dojo._hasResource["dojox.fx.scroll"]=true;
dojo.provide("dojox.fx.scroll");
dojo.experimental("dojox.fx.scroll");
dojo.require("dojox.fx._core");
dojox.fx.smoothScroll=function(A){if(!A.target){A.target=dojo.coords(A.node,true)
}var D=dojo[(dojo.isIE?"isObject":"isFunction")](A.win.scrollTo);
var B=(D)?(function(E){A.win.scrollTo(E[0],E[1])
}):(function(E){A.win.scrollLeft=E[0];
A.win.scrollTop=E[1]
});
var C=new dojo._Animation(dojo.mixin({beforeBegin:function(){if(this.curve){delete this.curve
}var E=D?dojo._docScroll():{x:A.win.scrollLeft,y:A.win.scrollTop};
C.curve=new dojox.fx._Line([E.x,E.y],[A.target.x,A.target.y])
},onAnimate:B},A));
return C
}
};