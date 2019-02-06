if(!dojo._hasResource["dojox.collections.Dictionary"]){dojo._hasResource["dojox.collections.Dictionary"]=true;
dojo.provide("dojox.collections.Dictionary");
dojo.require("dojox.collections._base");
dojox.collections.Dictionary=function(D){var A={};
this.count=0;
var B={};
this.add=function(G,F){var E=(G in A);
A[G]=new dojox.collections.DictionaryEntry(G,F);
if(!E){this.count++
}};
this.clear=function(){A={};
this.count=0
};
this.clone=function(){return new dojox.collections.Dictionary(this)
};
this.contains=this.containsKey=function(E){if(B[E]){return false
}return(A[E]!=null)
};
this.containsValue=function(E){var F=this.getIterator();
while(F.get()){if(F.element.value==E){return true
}}return false
};
this.entry=function(E){return A[E]
};
this.forEach=function(G,F){var E=[];
for(var H in A){if(!B[H]){E.push(A[H])
}}dojo.forEach(E,G,F)
};
this.getKeyList=function(){return(this.getIterator()).map(function(E){return E.key
})
};
this.getValueList=function(){return(this.getIterator()).map(function(E){return E.value
})
};
this.item=function(E){if(E in A){return A[E].valueOf()
}return undefined
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(A)
};
this.remove=function(E){if(E in A&&!B[E]){delete A[E];
this.count--;
return true
}return false
};
if(D){var C=D.getIterator();
while(C.get()){this.add(C.element.key,C.element.value)
}}}
};