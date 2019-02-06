dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Dictionary"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.Dictionary"]){A._hasResource["dojox.collections.Dictionary"]=true;
A.provide("dojox.collections.Dictionary");
A.require("dojox.collections._base");
dojox.collections.Dictionary=function(E){var B={};
this.count=0;
var C={};
this.add=function(H,G){var F=(H in B);
B[H]=new dojox.collections.DictionaryEntry(H,G);
if(!F){this.count++
}};
this.clear=function(){B={};
this.count=0
};
this.clone=function(){return new dojox.collections.Dictionary(this)
};
this.contains=this.containsKey=function(F){if(C[F]){return false
}return(B[F]!=null)
};
this.containsValue=function(F){var G=this.getIterator();
while(G.get()){if(G.element.value==F){return true
}}return false
};
this.entry=function(F){return B[F]
};
this.forEach=function(H,G){var F=[];
for(var I in B){if(!C[I]){F.push(B[I])
}}A.forEach(F,H,G)
};
this.getKeyList=function(){return(this.getIterator()).map(function(F){return F.key
})
};
this.getValueList=function(){return(this.getIterator()).map(function(F){return F.value
})
};
this.item=function(F){if(F in B){return B[F].valueOf()
}return undefined
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(B)
};
this.remove=function(F){if(F in B&&!C[F]){delete B[F];
this.count--;
return true
}return false
};
if(E){var D=E.getIterator();
while(D.get()){this.add(D.element.key,D.element.value)
}}}
}}});