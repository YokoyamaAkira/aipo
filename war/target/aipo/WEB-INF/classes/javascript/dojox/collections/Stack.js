if(!dojo._hasResource["dojox.collections.Stack"]){dojo._hasResource["dojox.collections.Stack"]=true;
dojo.provide("dojox.collections.Stack");
dojo.require("dojox.collections._base");
dojox.collections.Stack=function(B){var A=[];
if(B){A=A.concat(B)
}this.count=A.length;
this.clear=function(){A=[];
this.count=A.length
};
this.clone=function(){return new dojox.collections.Stack(A)
};
this.contains=function(C){for(var D=0;
D<A.length;
D++){if(A[D]==C){return true
}}return false
};
this.copyTo=function(D,C){D.splice(C,0,A)
};
this.forEach=function(C,D){dojo.forEach(A,C,D)
};
this.getIterator=function(){return new dojox.collections.Iterator(A)
};
this.peek=function(){return A[(A.length-1)]
};
this.pop=function(){var C=A.pop();
this.count=A.length;
return C
};
this.push=function(C){this.count=A.push(C)
};
this.toArray=function(){return[].concat(A)
}
}
};