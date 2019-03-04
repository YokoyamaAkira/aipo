dojo._xdResourceLoaded({depends:[["provide","dojo._base.NodeList"],["require","dojo._base.lang"],["require","dojo._base.array"]],defineResource:function(A){if(!A._hasResource["dojo._base.NodeList"]){A._hasResource["dojo._base.NodeList"]=true;
A.provide("dojo._base.NodeList");
A.require("dojo._base.lang");
A.require("dojo._base.array");
(function(){var B=A;
var C=function(D){D.constructor=A.NodeList;
A._mixin(D,A.NodeList.prototype);
return D
};
A.NodeList=function(){return C(Array.apply(null,arguments))
};
A.NodeList._wrap=C;
A.extend(A.NodeList,{slice:function(){var D=A._toArray(arguments);
return C(D.slice.apply(this,D))
},splice:function(){var D=A._toArray(arguments);
return C(D.splice.apply(this,D))
},concat:function(){var D=A._toArray(arguments,0,[this]);
return C(D.concat.apply([],D))
},indexOf:function(E,D){return B.indexOf(this,E,D)
},lastIndexOf:function(){return B.lastIndexOf.apply(B,B._toArray(arguments,0,[this]))
},every:function(E,D){return B.every(this,E,D)
},some:function(E,D){return B.some(this,E,D)
},map:function(D,E){return B.map(this,D,E,B.NodeList)
},forEach:function(E,D){B.forEach(this,E,D);
return this
},coords:function(){return B.map(this,B.coords)
},style:function(){var E=B._toArray(arguments,0,[null]);
var D=this.map(function(F){E[0]=F;
return B.style.apply(B,E)
});
return(arguments.length>1)?this:D
},styles:function(){B.deprecated("NodeList.styles","use NodeList.style instead","1.1");
return this.style.apply(this,arguments)
},addClass:function(D){this.forEach(function(E){B.addClass(E,D)
});
return this
},removeClass:function(D){this.forEach(function(E){B.removeClass(E,D)
});
return this
},place:function(F,E){var G=B.query(F)[0];
E=E||"last";
for(var D=0;
D<this.length;
D++){B.place(this[D],G,E)
}return this
},connect:function(D,E,F){this.forEach(function(G){B.connect(G,D,E,F)
});
return this
},orphan:function(E){var D=(E)?B._filterQueryResult(this,E):this;
D.forEach(function(F){if(F.parentNode){F.parentNode.removeChild(F)
}});
return D
},adopt:function(E,D){var F=this[0];
return B.query(E).forEach(function(G){B.place(G,F,(D||"last"))
})
},query:function(E){E=E||"";
var D=B.NodeList();
this.forEach(function(F){B.query(E,F).forEach(function(G){if(typeof G!="undefined"){D.push(G)
}})
});
return D
},filter:function(H){var D=this;
var E=arguments;
var G=B.NodeList();
var F=function(I){if(typeof I!="undefined"){G.push(I)
}};
if(B.isString(H)){D=B._filterQueryResult(this,E[0]);
if(E.length==1){return D
}B.forEach(B.filter(D,E[1],E[2]),F);
return G
}B.forEach(B.filter(D,E[0],E[1]),F);
return G
},addContent:function(G,D){var E=B.doc.createElement("span");
if(B.isString(G)){E.innerHTML=G
}else{E.appendChild(G)
}var F=((D=="first")||(D=="after"))?"lastChild":"firstChild";
this.forEach(function(I){var H=E.cloneNode(true);
while(H[F]){B.place(H[F],I,D)
}});
return this
}});
B.forEach(["blur","click","keydown","keypress","keyup","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"],function(D){var E="on"+D;
A.NodeList.prototype[E]=function(G,F){return this.connect(E,G,F)
}
})
})()
}}});