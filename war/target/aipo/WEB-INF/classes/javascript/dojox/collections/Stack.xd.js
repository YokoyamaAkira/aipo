dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Stack"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.Stack"]){A._hasResource["dojox.collections.Stack"]=true;
A.provide("dojox.collections.Stack");
A.require("dojox.collections._base");
dojox.collections.Stack=function(C){var B=[];
if(C){B=B.concat(C)
}this.count=B.length;
this.clear=function(){B=[];
this.count=B.length
};
this.clone=function(){return new dojox.collections.Stack(B)
};
this.contains=function(E){for(var D=0;
D<B.length;
D++){if(B[D]==E){return true
}}return false
};
this.copyTo=function(D,E){D.splice(E,0,B)
};
this.forEach=function(E,D){A.forEach(B,E,D)
};
this.getIterator=function(){return new dojox.collections.Iterator(B)
};
this.peek=function(){return B[(B.length-1)]
};
this.pop=function(){var D=B.pop();
this.count=B.length;
return D
};
this.push=function(D){this.count=B.push(D)
};
this.toArray=function(){return[].concat(B)
}
}
}}});