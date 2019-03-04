dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Stack"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.Stack"]){A._hasResource["dojox.collections.Stack"]=true;
A.provide("dojox.collections.Stack");
A.require("dojox.collections._base");
dojox.collections.Stack=function(B){var C=[];
if(B){C=C.concat(B)
}this.count=C.length;
this.clear=function(){C=[];
this.count=C.length
};
this.clone=function(){return new dojox.collections.Stack(C)
};
this.contains=function(E){for(var D=0;
D<C.length;
D++){if(C[D]==E){return true
}}return false
};
this.copyTo=function(D,E){D.splice(E,0,C)
};
this.forEach=function(E,D){A.forEach(C,E,D)
};
this.getIterator=function(){return new dojox.collections.Iterator(C)
};
this.peek=function(){return C[(C.length-1)]
};
this.pop=function(){var D=C.pop();
this.count=C.length;
return D
};
this.push=function(D){this.count=C.push(D)
};
this.toArray=function(){return[].concat(C)
}
}
}}});