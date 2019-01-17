if(!dojo._hasResource["dojox.collections._base"]){dojo._hasResource["dojox.collections._base"]=true;
dojo.provide("dojox.collections._base");
dojox.collections.DictionaryEntry=function(B,A){this.key=B;
this.value=A;
this.valueOf=function(){return this.value
};
this.toString=function(){return String(this.value)
}
};
dojox.collections.Iterator=function(B){var C=B;
var A=0;
this.element=C[A]||null;
this.atEnd=function(){return(A>=C.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=C[A++];
return this.element
};
this.map=function(E,D){return dojo.map(C,E,D)
};
this.reset=function(){A=0;
this.element=C[A]
}
};
dojox.collections.DictionaryIterator=function(E){var B=[];
var C={};
for(var D in E){if(!C[D]){B.push(E[D])
}}var A=0;
this.element=B[A]||null;
this.atEnd=function(){return(A>=B.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=B[A++];
return this.element
};
this.map=function(G,F){return dojo.map(B,G,F)
};
this.reset=function(){A=0;
this.element=B[A]
}
}
};