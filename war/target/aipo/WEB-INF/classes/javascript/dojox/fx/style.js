if(!dojo._hasResource["dojox.fx.style"]){dojo._hasResource["dojox.fx.style"]=true;
dojo.provide("dojox.fx.style");
dojo.experimental("dojox.fx.style");
dojo.require("dojox.fx._base");
dojox.fx.addClass=function(A){var E=(A.node=dojo.byId(A.node));
var D=(function(){var G=E;
return function(){dojo.addClass(G,A.cssClass);
G.style.cssText=F
}
})();
var B=dojox.fx._getCalculatedStyleChanges(A,true);
var F=E.style.cssText;
var C=dojo.animateProperty(dojo.mixin({properties:B},A));
dojo.connect(C,"onEnd",C,D);
return C
};
dojox.fx.removeClass=function(B){var E=(B.node=dojo.byId(B.node));
var A=(function(){var G=E;
return function(){dojo.removeClass(G,B.cssClass);
G.style.cssText=F
}
})();
var C=dojox.fx._getCalculatedStyleChanges(B,false);
var F=E.style.cssText;
var D=dojo.animateProperty(dojo.mixin({properties:C},B));
dojo.connect(D,"onEnd",D,A);
return D
};
dojox.fx.toggleClass=function(B,A,C){if(typeof C=="undefined"){C=!dojo.hasClass(B,A)
}return dojox.fx[(C?"addClass":"removeClass")]({node:B,cssClass:A})
};
dojox.fx._allowedProperties=["width","height","left","top","right","bottom","backgroundColor","color","borderBottomColor","borderBottomWidth","borderTopColor","borderTopWidth","borderLeftColor","borderLeftWidth","borderRightColor","borderRightWidth","paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginTop","marginRight","marginBottom","lineHeight","letterSpacing","fontSize"];
dojox.fx._getStyleSnapshot=function(A){return dojo.map(dojox.fx._allowedProperties,function(B){return A[B]
})
};
dojox.fx._getCalculatedStyleChanges=function(C,G){var F=(C.node=dojo.byId(C.node));
var H=dojo.getComputedStyle(F);
var A=dojox.fx._getStyleSnapshot(H);
dojo[(G?"addClass":"removeClass")](F,C.cssClass);
var E=dojox.fx._getStyleSnapshot(H);
dojo[(G?"removeClass":"addClass")](F,C.cssClass);
var B={};
var D=0;
dojo.forEach(dojox.fx._allowedProperties,function(I){if(A[D]!=E[D]){B[I]={end:parseInt(E[D])}
}D++
});
return B
}
};