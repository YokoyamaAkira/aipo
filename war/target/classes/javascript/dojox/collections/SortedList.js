if(!dojo._hasResource["dojox.collections.SortedList"]){dojo._hasResource["dojox.collections.SortedList"]=true;
dojo.provide("dojox.collections.SortedList");
dojo.require("dojox.collections._base");
dojox.collections.SortedList=function(F){var C=this;
var E={};
var A=[];
var I=function(K,J){if(K.key>J.key){return 1
}if(K.key<J.key){return -1
}return 0
};
var G=function(){A=[];
var J=C.getIterator();
while(!J.atEnd()){A.push(J.get())
}A.sort(I)
};
var B={};
this.count=A.length;
this.add=function(K,J){if(!E[K]){E[K]=new dojox.collections.DictionaryEntry(K,J);
this.count=A.push(E[K]);
A.sort(I)
}};
this.clear=function(){E={};
A=[];
this.count=A.length
};
this.clone=function(){return new dojox.collections.SortedList(this)
};
this.contains=this.containsKey=function(J){if(B[J]){return false
}return(E[J]!=null)
};
this.containsValue=function(L){var K=this.getIterator();
while(!K.atEnd()){var J=K.get();
if(J.value==L){return true
}}return false
};
this.copyTo=function(K,L){var M=this.getIterator();
var J=L;
while(!M.atEnd()){K.splice(J,0,M.get());
J++
}};
this.entry=function(J){return E[J]
};
this.forEach=function(K,J){dojo.forEach(A,K,J)
};
this.getByIndex=function(J){return A[J].valueOf()
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(E)
};
this.getKey=function(J){return A[J].key
};
this.getKeyList=function(){var J=[];
var K=this.getIterator();
while(!K.atEnd()){J.push(K.get().key)
}return J
};
this.getValueList=function(){var J=[];
var K=this.getIterator();
while(!K.atEnd()){J.push(K.get().value)
}return J
};
this.indexOfKey=function(J){for(var K=0;
K<A.length;
K++){if(A[K].key==J){return K
}}return -1
};
this.indexOfValue=function(K){for(var J=0;
J<A.length;
J++){if(A[J].value==K){return J
}}return -1
};
this.item=function(J){if(J in E&&!B[J]){return E[J].valueOf()
}return undefined
};
this.remove=function(J){delete E[J];
G();
this.count=A.length
};
this.removeAt=function(J){delete E[A[J].key];
G();
this.count=A.length
};
this.replace=function(K,J){if(!E[K]){this.add(K,J);
return false
}else{E[K]=new dojox.collections.DictionaryEntry(K,J);
G();
return true
}};
this.setByIndex=function(J,K){E[A[J].key].value=K;
G();
this.count=A.length
};
if(F){var D=F.getIterator();
while(!D.atEnd()){var H=D.get();
A[A.length]=E[H.key]=new dojox.collections.DictionaryEntry(H.key,H.value)
}A.sort(I)
}}
};