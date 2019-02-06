dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Queue"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.Queue"]){A._hasResource["dojox.collections.Queue"]=true;
A.provide("dojox.collections.Queue");
A.require("dojox.collections._base");
dojox.collections.Queue=function(C){var B=[];
if(C){B=B.concat(C)
}this.count=B.length;
this.clear=function(){B=[];
this.count=B.length
};
this.clone=function(){return new dojox.collections.Queue(B)
};
this.contains=function(E){for(var D=0;
D<B.length;
D++){if(B[D]==E){return true
}}return false
};
this.copyTo=function(D,E){D.splice(E,0,B)
};
this.dequeue=function(){var D=B.shift();
this.count=B.length;
return D
};
this.enqueue=function(D){this.count=B.push(D)
};
this.forEach=function(E,D){A.forEach(B,E,D)
};
this.getIterator=function(){return new dojox.collections.Iterator(B)
};
this.peek=function(){return B[0]
};
this.toArray=function(){return[].concat(B)
}
}
}}});