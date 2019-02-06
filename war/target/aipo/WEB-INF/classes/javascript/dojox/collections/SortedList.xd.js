dojo._xdResourceLoaded({depends:[["provide","dojox.collections.SortedList"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.SortedList"]){A._hasResource["dojox.collections.SortedList"]=true;
A.provide("dojox.collections.SortedList");
A.require("dojox.collections._base");
dojox.collections.SortedList=function(E){var B=this;
var D={};
var I=[];
var H=function(L,K){if(L.key>K.key){return 1
}if(L.key<K.key){return -1
}return 0
};
var F=function(){I=[];
var K=B.getIterator();
while(!K.atEnd()){I.push(K.get())
}I.sort(H)
};
var J={};
this.count=I.length;
this.add=function(L,K){if(!D[L]){D[L]=new dojox.collections.DictionaryEntry(L,K);
this.count=I.push(D[L]);
I.sort(H)
}};
this.clear=function(){D={};
I=[];
this.count=I.length
};
this.clone=function(){return new dojox.collections.SortedList(this)
};
this.contains=this.containsKey=function(K){if(J[K]){return false
}return(D[K]!=null)
};
this.containsValue=function(K){var M=this.getIterator();
while(!M.atEnd()){var L=M.get();
if(L.value==K){return true
}}return false
};
this.copyTo=function(N,K){var L=this.getIterator();
var M=K;
while(!L.atEnd()){N.splice(M,0,L.get());
M++
}};
this.entry=function(K){return D[K]
};
this.forEach=function(L,K){A.forEach(I,L,K)
};
this.getByIndex=function(K){return I[K].valueOf()
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(D)
};
this.getKey=function(K){return I[K].key
};
this.getKeyList=function(){var K=[];
var L=this.getIterator();
while(!L.atEnd()){K.push(L.get().key)
}return K
};
this.getValueList=function(){var K=[];
var L=this.getIterator();
while(!L.atEnd()){K.push(L.get().value)
}return K
};
this.indexOfKey=function(K){for(var L=0;
L<I.length;
L++){if(I[L].key==K){return L
}}return -1
};
this.indexOfValue=function(L){for(var K=0;
K<I.length;
K++){if(I[K].value==L){return K
}}return -1
};
this.item=function(K){if(K in D&&!J[K]){return D[K].valueOf()
}return undefined
};
this.remove=function(K){delete D[K];
F();
this.count=I.length
};
this.removeAt=function(K){delete D[I[K].key];
F();
this.count=I.length
};
this.replace=function(L,K){if(!D[L]){this.add(L,K);
return false
}else{D[L]=new dojox.collections.DictionaryEntry(L,K);
F();
return true
}};
this.setByIndex=function(K,L){D[I[K].key].value=L;
F();
this.count=I.length
};
if(E){var C=E.getIterator();
while(!C.atEnd()){var G=C.get();
I[I.length]=D[G.key]=new dojox.collections.DictionaryEntry(G.key,G.value)
}I.sort(H)
}}
}}});