if(!dojo._hasResource["dojox.fx.style"]){dojo._hasResource["dojox.fx.style"]=true;
dojo.provide("dojox.fx.style");
dojo.experimental("dojox.fx.style");
dojo.require("dojox.fx._base");
dojox.fx.addClass=function(F){var D=(F.node=dojo.byId(F.node));
var C=(function(){var G=D;
return function(){dojo.addClass(G,F.cssClass);
G.style.cssText=E
}
})();
var A=dojox.fx._getCalculatedStyleChanges(F,true);
var E=D.style.cssText;
var B=dojo.animateProperty(dojo.mixin({properties:A},F));
dojo.connect(B,"onEnd",B,C);
return B
};
dojox.fx.removeClass=function(A){var D=(A.node=dojo.byId(A.node));
var F=(function(){var G=D;
return function(){dojo.removeClass(G,A.cssClass);
G.style.cssText=E
}
})();
var B=dojox.fx._getCalculatedStyleChanges(A,false);
var E=D.style.cssText;
var C=dojo.animateProperty(dojo.mixin({properties:B},A));
dojo.connect(C,"onEnd",C,F);
return C
};
dojox.fx.toggleClass=function(A,C,B){if(typeof B=="undefined"){B=!dojo.hasClass(A,C)
}return dojox.fx[(B?"addClass":"removeClass")]({node:A,cssClass:C})
};
dojox.fx._allowedProperties=["width","height","left","top","right","bottom","backgroundColor","color","borderBottomColor","borderBottomWidth","borderTopColor","borderTopWidth","borderLeftColor","borderLeftWidth","borderRightColor","borderRightWidth","paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginTop","marginRight","marginBottom","lineHeight","letterSpacing","fontSize"];
dojox.fx._getStyleSnapshot=function(A){return dojo.map(dojox.fx._allowedProperties,function(B){return A[B]
})
};
dojox.fx._getCalculatedStyleChanges=function(F,B){var A=(F.node=dojo.byId(F.node));
var C=dojo.getComputedStyle(A);
var D=dojox.fx._getStyleSnapshot(C);
dojo[(B?"addClass":"removeClass")](A,F.cssClass);
var H=dojox.fx._getStyleSnapshot(C);
dojo[(B?"removeClass":"addClass")](A,F.cssClass);
var E={};
var G=0;
dojo.forEach(dojox.fx._allowedProperties,function(I){if(D[G]!=H[G]){E[I]={end:parseInt(H[G])}
}G++
});
return E
}
};