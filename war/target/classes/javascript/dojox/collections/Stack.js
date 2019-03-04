if(!dojo._hasResource["dojox.collections.Stack"]){dojo._hasResource["dojox.collections.Stack"]=true;
dojo.provide("dojox.collections.Stack");
dojo.require("dojox.collections._base");
dojox.collections.Stack=function(A){var B=[];
if(A){B=B.concat(A)
}this.count=B.length;
this.clear=function(){B=[];
this.count=B.length
};
this.clone=function(){return new dojox.collections.Stack(B)
};
this.contains=function(D){for(var C=0;
C<B.length;
C++){if(B[C]==D){return true
}}return false
};
this.copyTo=function(C,D){C.splice(D,0,B)
};
this.forEach=function(D,C){dojo.forEach(B,D,C)
};
this.getIterator=function(){return new dojox.collections.Iterator(B)
};
this.peek=function(){return B[(B.length-1)]
};
this.pop=function(){var C=B.pop();
this.count=B.length;
return C
};
this.push=function(C){this.count=B.push(C)
};
this.toArray=function(){return[].concat(B)
}
}
};