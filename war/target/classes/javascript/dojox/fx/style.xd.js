dojo._xdResourceLoaded({depends:[["provide","dojox.fx.style"],["require","dojox.fx._base"]],defineResource:function(A){if(!A._hasResource["dojox.fx.style"]){A._hasResource["dojox.fx.style"]=true;
A.provide("dojox.fx.style");
A.experimental("dojox.fx.style");
A.require("dojox.fx._base");
dojox.fx.addClass=function(C){var G=(C.node=A.byId(C.node));
var F=(function(){var H=G;
return function(){A.addClass(H,C.cssClass);
H.style.cssText=B
}
})();
var D=dojox.fx._getCalculatedStyleChanges(C,true);
var B=G.style.cssText;
var E=A.animateProperty(A.mixin({properties:D},C));
A.connect(E,"onEnd",E,F);
return E
};
dojox.fx.removeClass=function(D){var G=(D.node=A.byId(D.node));
var C=(function(){var H=G;
return function(){A.removeClass(H,D.cssClass);
H.style.cssText=B
}
})();
var E=dojox.fx._getCalculatedStyleChanges(D,false);
var B=G.style.cssText;
var F=A.animateProperty(A.mixin({properties:E},D));
A.connect(F,"onEnd",F,C);
return F
};
dojox.fx.toggleClass=function(D,C,B){if(typeof B=="undefined"){B=!A.hasClass(D,C)
}return dojox.fx[(B?"addClass":"removeClass")]({node:D,cssClass:C})
};
dojox.fx._allowedProperties=["width","height","left","top","right","bottom","backgroundColor","color","borderBottomColor","borderBottomWidth","borderTopColor","borderTopWidth","borderLeftColor","borderLeftWidth","borderRightColor","borderRightWidth","paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginTop","marginRight","marginBottom","lineHeight","letterSpacing","fontSize"];
dojox.fx._getStyleSnapshot=function(B){return A.map(dojox.fx._allowedProperties,function(C){return B[C]
})
};
dojox.fx._getCalculatedStyleChanges=function(H,E){var D=(H.node=A.byId(H.node));
var C=A.getComputedStyle(D);
var F=dojox.fx._getStyleSnapshot(C);
A[(E?"addClass":"removeClass")](D,H.cssClass);
var B=dojox.fx._getStyleSnapshot(C);
A[(E?"removeClass":"addClass")](D,H.cssClass);
var G={};
var I=0;
A.forEach(dojox.fx._allowedProperties,function(J){if(F[I]!=B[I]){G[J]={end:parseInt(B[I])}
}I++
});
return G
}
}}});