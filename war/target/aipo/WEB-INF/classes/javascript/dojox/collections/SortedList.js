if(!dojo._hasResource["dojox.collections.SortedList"]){dojo._hasResource["dojox.collections.SortedList"]=true;
dojo.provide("dojox.collections.SortedList");
dojo.require("dojox.collections._base");
dojox.collections.SortedList=function(B){var H=this;
var A={};
var F=[];
var E=function(J,K){if(J.key>K.key){return 1
}if(J.key<K.key){return -1
}return 0
};
var C=function(){F=[];
var J=H.getIterator();
while(!J.atEnd()){F.push(J.get())
}F.sort(E)
};
var G={};
this.count=F.length;
this.add=function(J,K){if(!A[J]){A[J]=new dojox.collections.DictionaryEntry(J,K);
this.count=F.push(A[J]);
F.sort(E)
}};
this.clear=function(){A={};
F=[];
this.count=F.length
};
this.clone=function(){return new dojox.collections.SortedList(this)
};
this.contains=this.containsKey=function(J){if(G[J]){return false
}return(A[J]!=null)
};
this.containsValue=function(J){var L=this.getIterator();
while(!L.atEnd()){var K=L.get();
if(K.value==J){return true
}}return false
};
this.copyTo=function(M,J){var K=this.getIterator();
var L=J;
while(!K.atEnd()){M.splice(L,0,K.get());
L++
}};
this.entry=function(J){return A[J]
};
this.forEach=function(J,K){dojo.forEach(F,J,K)
};
this.getByIndex=function(J){return F[J].valueOf()
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(A)
};
this.getKey=function(J){return F[J].key
};
this.getKeyList=function(){var K=[];
var J=this.getIterator();
while(!J.atEnd()){K.push(J.get().key)
}return K
};
this.getValueList=function(){var K=[];
var J=this.getIterator();
while(!J.atEnd()){K.push(J.get().value)
}return K
};
this.indexOfKey=function(K){for(var J=0;
J<F.length;
J++){if(F[J].key==K){return J
}}return -1
};
this.indexOfValue=function(J){for(var K=0;
K<F.length;
K++){if(F[K].value==J){return K
}}return -1
};
this.item=function(J){if(J in A&&!G[J]){return A[J].valueOf()
}return undefined
};
this.remove=function(J){delete A[J];
C();
this.count=F.length
};
this.removeAt=function(J){delete A[F[J].key];
C();
this.count=F.length
};
this.replace=function(J,K){if(!A[J]){this.add(J,K);
return false
}else{A[J]=new dojox.collections.DictionaryEntry(J,K);
C();
return true
}};
this.setByIndex=function(K,J){A[F[K].key].value=J;
C();
this.count=F.length
};
if(B){var I=B.getIterator();
while(!I.atEnd()){var D=I.get();
F[F.length]=A[D.key]=new dojox.collections.DictionaryEntry(D.key,D.value)
}F.sort(E)
}}
};