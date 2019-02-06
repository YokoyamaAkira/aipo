if(!dojo._hasResource["dojox.collections.Dictionary"]){dojo._hasResource["dojox.collections.Dictionary"]=true;
dojo.provide("dojox.collections.Dictionary");
dojo.require("dojox.collections._base");
dojox.collections.Dictionary=function(C){var D={};
this.count=0;
var A={};
this.add=function(E,G){var F=(E in D);
D[E]=new dojox.collections.DictionaryEntry(E,G);
if(!F){this.count++
}};
this.clear=function(){D={};
this.count=0
};
this.clone=function(){return new dojox.collections.Dictionary(this)
};
this.contains=this.containsKey=function(E){if(A[E]){return false
}return(D[E]!=null)
};
this.containsValue=function(F){var E=this.getIterator();
while(E.get()){if(E.element.value==F){return true
}}return false
};
this.entry=function(E){return D[E]
};
this.forEach=function(H,G){var F=[];
for(var E in D){if(!A[E]){F.push(D[E])
}}dojo.forEach(F,H,G)
};
this.getKeyList=function(){return(this.getIterator()).map(function(E){return E.key
})
};
this.getValueList=function(){return(this.getIterator()).map(function(E){return E.value
})
};
this.item=function(E){if(E in D){return D[E].valueOf()
}return undefined
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(D)
};
this.remove=function(E){if(E in D&&!A[E]){delete D[E];
this.count--;
return true
}return false
};
if(C){var B=C.getIterator();
while(B.get()){this.add(B.element.key,B.element.value)
}}}
};