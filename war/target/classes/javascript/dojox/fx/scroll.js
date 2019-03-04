if(!dojo._hasResource["dojox.fx.scroll"]){dojo._hasResource["dojox.fx.scroll"]=true;
dojo.provide("dojox.fx.scroll");
dojo.experimental("dojox.fx.scroll");
dojo.require("dojox.fx._core");
dojox.fx.smoothScroll=function(B){if(!B.target){B.target=dojo.coords(B.node,true)
}var A=dojo[(dojo.isIE?"isObject":"isFunction")](B.win.scrollTo);
var C=(A)?(function(E){B.win.scrollTo(E[0],E[1])
}):(function(E){B.win.scrollLeft=E[0];
B.win.scrollTop=E[1]
});
var D=new dojo._Animation(dojo.mixin({beforeBegin:function(){if(this.curve){delete this.curve
}var E=A?dojo._docScroll():{x:B.win.scrollLeft,y:B.win.scrollTop};
D.curve=new dojox.fx._Line([E.x,E.y],[B.target.x,B.target.y])
},onAnimate:C},B));
return D
}
};