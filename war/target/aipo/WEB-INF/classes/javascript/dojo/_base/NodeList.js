if(!dojo._hasResource["dojo._base.NodeList"]){dojo._hasResource["dojo._base.NodeList"]=true;
dojo.provide("dojo._base.NodeList");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.array");
(function(){var B=dojo;
var A=function(C){C.constructor=dojo.NodeList;
dojo._mixin(C,dojo.NodeList.prototype);
return C
};
dojo.NodeList=function(){return A(Array.apply(null,arguments))
};
dojo.NodeList._wrap=A;
dojo.extend(dojo.NodeList,{slice:function(){var C=dojo._toArray(arguments);
return A(C.slice.apply(this,C))
},splice:function(){var C=dojo._toArray(arguments);
return A(C.splice.apply(this,C))
},concat:function(){var C=dojo._toArray(arguments,0,[this]);
return A(C.concat.apply([],C))
},indexOf:function(C,D){return B.indexOf(this,C,D)
},lastIndexOf:function(){return B.lastIndexOf.apply(B,B._toArray(arguments,0,[this]))
},every:function(C,D){return B.every(this,C,D)
},some:function(C,D){return B.some(this,C,D)
},map:function(D,C){return B.map(this,D,C,B.NodeList)
},forEach:function(C,D){B.forEach(this,C,D);
return this
},coords:function(){return B.map(this,B.coords)
},style:function(){var C=B._toArray(arguments,0,[null]);
var D=this.map(function(E){C[0]=E;
return B.style.apply(B,C)
});
return(arguments.length>1)?this:D
},styles:function(){B.deprecated("NodeList.styles","use NodeList.style instead","1.1");
return this.style.apply(this,arguments)
},addClass:function(C){this.forEach(function(D){B.addClass(D,C)
});
return this
},removeClass:function(C){this.forEach(function(D){B.removeClass(D,C)
});
return this
},place:function(F,E){var C=B.query(F)[0];
E=E||"last";
for(var D=0;
D<this.length;
D++){B.place(this[D],C,E)
}return this
},connect:function(D,E,C){this.forEach(function(F){B.connect(F,D,E,C)
});
return this
},orphan:function(C){var D=(C)?B._filterQueryResult(this,C):this;
D.forEach(function(E){if(E.parentNode){E.parentNode.removeChild(E)
}});
return D
},adopt:function(E,D){var C=this[0];
return B.query(E).forEach(function(F){B.place(F,C,(D||"last"))
})
},query:function(C){C=C||"";
var D=B.NodeList();
this.forEach(function(E){B.query(C,E).forEach(function(F){if(typeof F!="undefined"){D.push(F)
}})
});
return D
},filter:function(C){var D=this;
var E=arguments;
var G=B.NodeList();
var F=function(H){if(typeof H!="undefined"){G.push(H)
}};
if(B.isString(C)){D=B._filterQueryResult(this,E[0]);
if(E.length==1){return D
}B.forEach(B.filter(D,E[1],E[2]),F);
return G
}B.forEach(B.filter(D,E[0],E[1]),F);
return G
},addContent:function(C,D){var E=B.doc.createElement("span");
if(B.isString(C)){E.innerHTML=C
}else{E.appendChild(C)
}var F=((D=="first")||(D=="after"))?"lastChild":"firstChild";
this.forEach(function(H){var G=E.cloneNode(true);
while(G[F]){B.place(G[F],H,D)
}});
return this
}});
B.forEach(["blur","click","keydown","keypress","keyup","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"],function(D){var C="on"+D;
dojo.NodeList.prototype[C]=function(F,E){return this.connect(C,F,E)
}
})
})()
};