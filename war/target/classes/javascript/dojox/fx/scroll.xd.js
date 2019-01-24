dojo._xdResourceLoaded({depends:[["provide","dojox.fx.scroll"],["require","dojox.fx._core"]],defineResource:function(A){if(!A._hasResource["dojox.fx.scroll"]){A._hasResource["dojox.fx.scroll"]=true;
A.provide("dojox.fx.scroll");
A.experimental("dojox.fx.scroll");
A.require("dojox.fx._core");
dojox.fx.smoothScroll=function(C){if(!C.target){C.target=A.coords(C.node,true)
}var B=A[(A.isIE?"isObject":"isFunction")](C.win.scrollTo);
var D=(B)?(function(F){C.win.scrollTo(F[0],F[1])
}):(function(F){C.win.scrollLeft=F[0];
C.win.scrollTop=F[1]
});
var E=new A._Animation(A.mixin({beforeBegin:function(){if(this.curve){delete this.curve
}var F=B?A._docScroll():{x:C.win.scrollLeft,y:C.win.scrollTop};
E.curve=new dojox.fx._Line([F.x,F.y],[C.target.x,C.target.y])
},onAnimate:D},C));
return E
}
}}});