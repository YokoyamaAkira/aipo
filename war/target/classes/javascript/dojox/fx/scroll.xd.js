dojo._xdResourceLoaded({depends:[["provide","dojox.fx.scroll"],["require","dojox.fx._core"]],defineResource:function(A){if(!A._hasResource["dojox.fx.scroll"]){A._hasResource["dojox.fx.scroll"]=true;
A.provide("dojox.fx.scroll");
A.experimental("dojox.fx.scroll");
A.require("dojox.fx._core");
dojox.fx.smoothScroll=function(D){if(!D.target){D.target=A.coords(D.node,true)
}var C=A[(A.isIE?"isObject":"isFunction")](D.win.scrollTo);
var E=(C)?(function(F){D.win.scrollTo(F[0],F[1])
}):(function(F){D.win.scrollLeft=F[0];
D.win.scrollTop=F[1]
});
var B=new A._Animation(A.mixin({beforeBegin:function(){if(this.curve){delete this.curve
}var F=C?A._docScroll():{x:D.win.scrollLeft,y:D.win.scrollTop};
B.curve=new dojox.fx._Line([F.x,F.y],[D.target.x,D.target.y])
},onAnimate:E},D));
return B
}
}}});