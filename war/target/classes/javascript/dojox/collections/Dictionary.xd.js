dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Dictionary"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.Dictionary"]){A._hasResource["dojox.collections.Dictionary"]=true;
A.provide("dojox.collections.Dictionary");
A.require("dojox.collections._base");
dojox.collections.Dictionary=function(B){var C={};
this.count=0;
var D={};
this.add=function(H,G){var F=(H in C);
C[H]=new dojox.collections.DictionaryEntry(H,G);
if(!F){this.count++
}};
this.clear=function(){C={};
this.count=0
};
this.clone=function(){return new dojox.collections.Dictionary(this)
};
this.contains=this.containsKey=function(F){if(D[F]){return false
}return(C[F]!=null)
};
this.containsValue=function(F){var G=this.getIterator();
while(G.get()){if(G.element.value==F){return true
}}return false
};
this.entry=function(F){return C[F]
};
this.forEach=function(H,G){var F=[];
for(var I in C){if(!D[I]){F.push(C[I])
}}A.forEach(F,H,G)
};
this.getKeyList=function(){return(this.getIterator()).map(function(F){return F.key
})
};
this.getValueList=function(){return(this.getIterator()).map(function(F){return F.value
})
};
this.item=function(F){if(F in C){return C[F].valueOf()
}return undefined
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(C)
};
this.remove=function(F){if(F in C&&!D[F]){delete C[F];
this.count--;
return true
}return false
};
if(B){var E=B.getIterator();
while(E.get()){this.add(E.element.key,E.element.value)
}}}
}}});