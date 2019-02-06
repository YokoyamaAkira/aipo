if(!dojo._hasResource["dojox.collections.Queue"]){dojo._hasResource["dojox.collections.Queue"]=true;
dojo.provide("dojox.collections.Queue");
dojo.require("dojox.collections._base");
dojox.collections.Queue=function(A){var B=[];
if(A){B=B.concat(A)
}this.count=B.length;
this.clear=function(){B=[];
this.count=B.length
};
this.clone=function(){return new dojox.collections.Queue(B)
};
this.contains=function(D){for(var C=0;
C<B.length;
C++){if(B[C]==D){return true
}}return false
};
this.copyTo=function(C,D){C.splice(D,0,B)
};
this.dequeue=function(){var C=B.shift();
this.count=B.length;
return C
};
this.enqueue=function(C){this.count=B.push(C)
};
this.forEach=function(D,C){dojo.forEach(B,D,C)
};
this.getIterator=function(){return new dojox.collections.Iterator(B)
};
this.peek=function(){return B[0]
};
this.toArray=function(){return[].concat(B)
}
}
};