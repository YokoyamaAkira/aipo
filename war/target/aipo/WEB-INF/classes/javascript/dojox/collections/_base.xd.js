dojo._xdResourceLoaded({depends:[["provide","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections._base"]){A._hasResource["dojox.collections._base"]=true;
A.provide("dojox.collections._base");
dojox.collections.DictionaryEntry=function(B,C){this.key=B;
this.value=C;
this.valueOf=function(){return this.value
};
this.toString=function(){return String(this.value)
}
};
dojox.collections.Iterator=function(D){var B=D;
var C=0;
this.element=B[C]||null;
this.atEnd=function(){return(C>=B.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=B[C++];
return this.element
};
this.map=function(F,E){return A.map(B,F,E)
};
this.reset=function(){C=0;
this.element=B[C]
}
};
dojox.collections.DictionaryIterator=function(B){var D=[];
var E={};
for(var F in B){if(!E[F]){D.push(B[F])
}}var C=0;
this.element=D[C]||null;
this.atEnd=function(){return(C>=D.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=D[C++];
return this.element
};
this.map=function(H,G){return A.map(D,H,G)
};
this.reset=function(){C=0;
this.element=D[C]
}
}
}}});