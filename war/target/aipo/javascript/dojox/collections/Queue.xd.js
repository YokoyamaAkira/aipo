dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Queue"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.Queue"]){A._hasResource["dojox.collections.Queue"]=true;
A.provide("dojox.collections.Queue");
A.require("dojox.collections._base");
dojox.collections.Queue=function(B){var C=[];
if(B){C=C.concat(B)
}this.count=C.length;
this.clear=function(){C=[];
this.count=C.length
};
this.clone=function(){return new dojox.collections.Queue(C)
};
this.contains=function(E){for(var D=0;
D<C.length;
D++){if(C[D]==E){return true
}}return false
};
this.copyTo=function(D,E){D.splice(E,0,C)
};
this.dequeue=function(){var D=C.shift();
this.count=C.length;
return D
};
this.enqueue=function(D){this.count=C.push(D)
};
this.forEach=function(E,D){A.forEach(C,E,D)
};
this.getIterator=function(){return new dojox.collections.Iterator(C)
};
this.peek=function(){return C[0]
};
this.toArray=function(){return[].concat(C)
}
}
}}});