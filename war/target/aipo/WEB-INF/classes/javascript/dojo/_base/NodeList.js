if(!dojo._hasResource["dojo._base.NodeList"]){dojo._hasResource["dojo._base.NodeList"]=true;
dojo.provide("dojo._base.NodeList");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.array");
(function(){var A=dojo;
var B=function(C){C.constructor=dojo.NodeList;
dojo._mixin(C,dojo.NodeList.prototype);
return C
};
dojo.NodeList=function(){return B(Array.apply(null,arguments))
};
dojo.NodeList._wrap=B;
dojo.extend(dojo.NodeList,{slice:function(){var C=dojo._toArray(arguments);
return B(C.slice.apply(this,C))
},splice:function(){var C=dojo._toArray(arguments);
return B(C.splice.apply(this,C))
},concat:function(){var C=dojo._toArray(arguments,0,[this]);
return B(C.concat.apply([],C))
},indexOf:function(D,C){return A.indexOf(this,D,C)
},lastIndexOf:function(){return A.lastIndexOf.apply(A,A._toArray(arguments,0,[this]))
},every:function(D,C){return A.every(this,D,C)
},some:function(D,C){return A.some(this,D,C)
},map:function(C,D){return A.map(this,C,D,A.NodeList)
},forEach:function(D,C){A.forEach(this,D,C);
return this
},coords:function(){return A.map(this,A.coords)
},style:function(){var D=A._toArray(arguments,0,[null]);
var C=this.map(function(E){D[0]=E;
return A.style.apply(A,D)
});
return(arguments.length>1)?this:C
},styles:function(){A.deprecated("NodeList.styles","use NodeList.style instead","1.1");
return this.style.apply(this,arguments)
},addClass:function(C){this.forEach(function(D){A.addClass(D,C)
});
return this
},removeClass:function(C){this.forEach(function(D){A.removeClass(D,C)
});
return this
},place:function(E,D){var F=A.query(E)[0];
D=D||"last";
for(var C=0;
C<this.length;
C++){A.place(this[C],F,D)
}return this
},connect:function(C,D,E){this.forEach(function(F){A.connect(F,C,D,E)
});
return this
},orphan:function(D){var C=(D)?A._filterQueryResult(this,D):this;
C.forEach(function(E){if(E.parentNode){E.parentNode.removeChild(E)
}});
return C
},adopt:function(D,C){var E=this[0];
return A.query(D).forEach(function(F){A.place(F,E,(C||"last"))
})
},query:function(D){D=D||"";
var C=A.NodeList();
this.forEach(function(E){A.query(D,E).forEach(function(F){if(typeof F!="undefined"){C.push(F)
}})
});
return C
},filter:function(G){var C=this;
var D=arguments;
var F=A.NodeList();
var E=function(H){if(typeof H!="undefined"){F.push(H)
}};
if(A.isString(G)){C=A._filterQueryResult(this,D[0]);
if(D.length==1){return C
}A.forEach(A.filter(C,D[1],D[2]),E);
return F
}A.forEach(A.filter(C,D[0],D[1]),E);
return F
},addContent:function(F,C){var D=A.doc.createElement("span");
if(A.isString(F)){D.innerHTML=F
}else{D.appendChild(F)
}var E=((C=="first")||(C=="after"))?"lastChild":"firstChild";
this.forEach(function(H){var G=D.cloneNode(true);
while(G[E]){A.place(G[E],H,C)
}});
return this
}});
A.forEach(["blur","click","keydown","keypress","keyup","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"],function(C){var D="on"+C;
dojo.NodeList.prototype[D]=function(F,E){return this.connect(D,F,E)
}
})
})()
};