if(!dojo._hasResource["dojox.collections._base"]){dojo._hasResource["dojox.collections._base"]=true;
dojo.provide("dojox.collections._base");
dojox.collections.DictionaryEntry=function(A,B){this.key=A;
this.value=B;
this.valueOf=function(){return this.value
};
this.toString=function(){return String(this.value)
}
};
dojox.collections.Iterator=function(A){var B=A;
var C=0;
this.element=B[C]||null;
this.atEnd=function(){return(C>=B.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=B[C++];
return this.element
};
this.map=function(D,E){return dojo.map(B,D,E)
};
this.reset=function(){C=0;
this.element=B[C]
}
};
dojox.collections.DictionaryIterator=function(D){var A=[];
var B={};
for(var C in D){if(!B[C]){A.push(D[C])
}}var E=0;
this.element=A[E]||null;
this.atEnd=function(){return(E>=A.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=A[E++];
return this.element
};
this.map=function(F,G){return dojo.map(A,F,G)
};
this.reset=function(){E=0;
this.element=A[E]
}
}
};