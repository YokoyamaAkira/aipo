dojo._xdResourceLoaded({depends:[["provide","dojox.collections.SortedList"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.SortedList"]){A._hasResource["dojox.collections.SortedList"]=true;
A.provide("dojox.collections.SortedList");
A.require("dojox.collections._base");
dojox.collections.SortedList=function(G){var D=this;
var F={};
var B=[];
var J=function(L,K){if(L.key>K.key){return 1
}if(L.key<K.key){return -1
}return 0
};
var H=function(){B=[];
var K=D.getIterator();
while(!K.atEnd()){B.push(K.get())
}B.sort(J)
};
var C={};
this.count=B.length;
this.add=function(L,K){if(!F[L]){F[L]=new dojox.collections.DictionaryEntry(L,K);
this.count=B.push(F[L]);
B.sort(J)
}};
this.clear=function(){F={};
B=[];
this.count=B.length
};
this.clone=function(){return new dojox.collections.SortedList(this)
};
this.contains=this.containsKey=function(K){if(C[K]){return false
}return(F[K]!=null)
};
this.containsValue=function(M){var L=this.getIterator();
while(!L.atEnd()){var K=L.get();
if(K.value==M){return true
}}return false
};
this.copyTo=function(L,M){var N=this.getIterator();
var K=M;
while(!N.atEnd()){L.splice(K,0,N.get());
K++
}};
this.entry=function(K){return F[K]
};
this.forEach=function(L,K){A.forEach(B,L,K)
};
this.getByIndex=function(K){return B[K].valueOf()
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(F)
};
this.getKey=function(K){return B[K].key
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
L<B.length;
L++){if(B[L].key==K){return L
}}return -1
};
this.indexOfValue=function(L){for(var K=0;
K<B.length;
K++){if(B[K].value==L){return K
}}return -1
};
this.item=function(K){if(K in F&&!C[K]){return F[K].valueOf()
}return undefined
};
this.remove=function(K){delete F[K];
H();
this.count=B.length
};
this.removeAt=function(K){delete F[B[K].key];
H();
this.count=B.length
};
this.replace=function(L,K){if(!F[L]){this.add(L,K);
return false
}else{F[L]=new dojox.collections.DictionaryEntry(L,K);
H();
return true
}};
this.setByIndex=function(K,L){F[B[K].key].value=L;
H();
this.count=B.length
};
if(G){var E=G.getIterator();
while(!E.atEnd()){var I=E.get();
B[B.length]=F[I.key]=new dojox.collections.DictionaryEntry(I.key,I.value)
}B.sort(J)
}}
}}});