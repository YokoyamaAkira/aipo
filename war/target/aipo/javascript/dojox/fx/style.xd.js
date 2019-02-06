dojo._xdResourceLoaded({depends:[["provide","dojox.fx.style"],["require","dojox.fx._base"]],defineResource:function(A){if(!A._hasResource["dojox.fx.style"]){A._hasResource["dojox.fx.style"]=true;
A.provide("dojox.fx.style");
A.experimental("dojox.fx.style");
A.require("dojox.fx._base");
dojox.fx.addClass=function(B){var F=(B.node=A.byId(B.node));
var E=(function(){var H=F;
return function(){A.addClass(H,B.cssClass);
H.style.cssText=G
}
})();
var C=dojox.fx._getCalculatedStyleChanges(B,true);
var G=F.style.cssText;
var D=A.animateProperty(A.mixin({properties:C},B));
A.connect(D,"onEnd",D,E);
return D
};
dojox.fx.removeClass=function(C){var F=(C.node=A.byId(C.node));
var B=(function(){var H=F;
return function(){A.removeClass(H,C.cssClass);
H.style.cssText=G
}
})();
var D=dojox.fx._getCalculatedStyleChanges(C,false);
var G=F.style.cssText;
var E=A.animateProperty(A.mixin({properties:D},C));
A.connect(E,"onEnd",E,B);
return E
};
dojox.fx.toggleClass=function(C,B,D){if(typeof D=="undefined"){D=!A.hasClass(C,B)
}return dojox.fx[(D?"addClass":"removeClass")]({node:C,cssClass:B})
};
dojox.fx._allowedProperties=["width","height","left","top","right","bottom","backgroundColor","color","borderBottomColor","borderBottomWidth","borderTopColor","borderTopWidth","borderLeftColor","borderLeftWidth","borderRightColor","borderRightWidth","paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginTop","marginRight","marginBottom","lineHeight","letterSpacing","fontSize"];
dojox.fx._getStyleSnapshot=function(B){return A.map(dojox.fx._allowedProperties,function(C){return B[C]
})
};
dojox.fx._getCalculatedStyleChanges=function(D,H){var G=(D.node=A.byId(D.node));
var I=A.getComputedStyle(G);
var B=dojox.fx._getStyleSnapshot(I);
A[(H?"addClass":"removeClass")](G,D.cssClass);
var F=dojox.fx._getStyleSnapshot(I);
A[(H?"removeClass":"addClass")](G,D.cssClass);
var C={};
var E=0;
A.forEach(dojox.fx._allowedProperties,function(J){if(B[E]!=F[E]){C[J]={end:parseInt(F[E])}
}E++
});
return C
}
}}});