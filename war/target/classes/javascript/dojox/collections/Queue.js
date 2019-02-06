if(!dojo._hasResource["dojox.collections.Queue"]){dojo._hasResource["dojox.collections.Queue"]=true;
dojo.provide("dojox.collections.Queue");
dojo.require("dojox.collections._base");
dojox.collections.Queue=function(B){var A=[];
if(B){A=A.concat(B)
}this.count=A.length;
this.clear=function(){A=[];
this.count=A.length
};
this.clone=function(){return new dojox.collections.Queue(A)
};
this.contains=function(C){for(var D=0;
D<A.length;
D++){if(A[D]==C){return true
}}return false
};
this.copyTo=function(D,C){D.splice(C,0,A)
};
this.dequeue=function(){var C=A.shift();
this.count=A.length;
return C
};
this.enqueue=function(C){this.count=A.push(C)
};
this.forEach=function(C,D){dojo.forEach(A,C,D)
};
this.getIterator=function(){return new dojox.collections.Iterator(A)
};
this.peek=function(){return A[0]
};
this.toArray=function(){return[].concat(A)
}
}
};