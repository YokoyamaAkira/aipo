dojo._xdResourceLoaded({depends:[["provide","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections._base"]){A._hasResource["dojox.collections._base"]=true;
A.provide("dojox.collections._base");
dojox.collections.DictionaryEntry=function(C,B){this.key=C;
this.value=B;
this.valueOf=function(){return this.value
};
this.toString=function(){return String(this.value)
}
};
dojox.collections.Iterator=function(C){var D=C;
var B=0;
this.element=D[B]||null;
this.atEnd=function(){return(B>=D.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=D[B++];
return this.element
};
this.map=function(F,E){return A.map(D,F,E)
};
this.reset=function(){B=0;
this.element=D[B]
}
};
dojox.collections.DictionaryIterator=function(F){var C=[];
var D={};
for(var E in F){if(!D[E]){C.push(F[E])
}}var B=0;
this.element=C[B]||null;
this.atEnd=function(){return(B>=C.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=C[B++];
return this.element
};
this.map=function(H,G){return A.map(C,H,G)
};
this.reset=function(){B=0;
this.element=C[B]
}
}
}}});