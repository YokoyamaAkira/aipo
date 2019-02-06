dojo._xdResourceLoaded({depends:[["provide","dojo._base.NodeList"],["require","dojo._base.lang"],["require","dojo._base.array"]],defineResource:function(A){if(!A._hasResource["dojo._base.NodeList"]){A._hasResource["dojo._base.NodeList"]=true;
A.provide("dojo._base.NodeList");
A.require("dojo._base.lang");
A.require("dojo._base.array");
(function(){var C=A;
var B=function(D){D.constructor=A.NodeList;
A._mixin(D,A.NodeList.prototype);
return D
};
A.NodeList=function(){return B(Array.apply(null,arguments))
};
A.NodeList._wrap=B;
A.extend(A.NodeList,{slice:function(){var D=A._toArray(arguments);
return B(D.slice.apply(this,D))
},splice:function(){var D=A._toArray(arguments);
return B(D.splice.apply(this,D))
},concat:function(){var D=A._toArray(arguments,0,[this]);
return B(D.concat.apply([],D))
},indexOf:function(E,D){return C.indexOf(this,E,D)
},lastIndexOf:function(){return C.lastIndexOf.apply(C,C._toArray(arguments,0,[this]))
},every:function(E,D){return C.every(this,E,D)
},some:function(E,D){return C.some(this,E,D)
},map:function(D,E){return C.map(this,D,E,C.NodeList)
},forEach:function(E,D){C.forEach(this,E,D);
return this
},coords:function(){return C.map(this,C.coords)
},style:function(){var E=C._toArray(arguments,0,[null]);
var D=this.map(function(F){E[0]=F;
return C.style.apply(C,E)
});
return(arguments.length>1)?this:D
},styles:function(){C.deprecated("NodeList.styles","use NodeList.style instead","1.1");
return this.style.apply(this,arguments)
},addClass:function(D){this.forEach(function(E){C.addClass(E,D)
});
return this
},removeClass:function(D){this.forEach(function(E){C.removeClass(E,D)
});
return this
},place:function(F,E){var G=C.query(F)[0];
E=E||"last";
for(var D=0;
D<this.length;
D++){C.place(this[D],G,E)
}return this
},connect:function(D,E,F){this.forEach(function(G){C.connect(G,D,E,F)
});
return this
},orphan:function(E){var D=(E)?C._filterQueryResult(this,E):this;
D.forEach(function(F){if(F.parentNode){F.parentNode.removeChild(F)
}});
return D
},adopt:function(E,D){var F=this[0];
return C.query(E).forEach(function(G){C.place(G,F,(D||"last"))
})
},query:function(E){E=E||"";
var D=C.NodeList();
this.forEach(function(F){C.query(E,F).forEach(function(G){if(typeof G!="undefined"){D.push(G)
}})
});
return D
},filter:function(H){var D=this;
var E=arguments;
var G=C.NodeList();
var F=function(I){if(typeof I!="undefined"){G.push(I)
}};
if(C.isString(H)){D=C._filterQueryResult(this,E[0]);
if(E.length==1){return D
}C.forEach(C.filter(D,E[1],E[2]),F);
return G
}C.forEach(C.filter(D,E[0],E[1]),F);
return G
},addContent:function(G,D){var E=C.doc.createElement("span");
if(C.isString(G)){E.innerHTML=G
}else{E.appendChild(G)
}var F=((D=="first")||(D=="after"))?"lastChild":"firstChild";
this.forEach(function(I){var H=E.cloneNode(true);
while(H[F]){C.place(H[F],I,D)
}});
return this
}});
C.forEach(["blur","click","keydown","keypress","keyup","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"],function(D){var E="on"+D;
A.NodeList.prototype[E]=function(G,F){return this.connect(E,G,F)
}
})
})()
}}});