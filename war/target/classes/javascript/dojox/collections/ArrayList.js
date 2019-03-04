if(!dojo._hasResource["dojox.collections.ArrayList"]){dojo._hasResource["dojox.collections.ArrayList"]=true;
dojo.provide("dojox.collections.ArrayList");
dojo.require("dojox.collections._base");
dojox.collections.ArrayList=function(A){var B=[];
if(A){B=B.concat(A)
}this.count=B.length;
this.add=function(C){B.push(C);
this.count=B.length
};
this.addRange=function(C){if(C.getIterator){var E=C.getIterator();
while(!E.atEnd()){this.add(E.get())
}this.count=B.length
}else{for(var D=0;
D<C.length;
D++){B.push(C[D])
}this.count=B.length
}};
this.clear=function(){B.splice(0,B.length);
this.count=0
};
this.clone=function(){return new dojox.collections.ArrayList(B)
};
this.contains=function(D){for(var C=0;
C<B.length;
C++){if(B[C]==D){return true
}}return false
};
this.forEach=function(D,C){dojo.forEach(B,D,C)
};
this.getIterator=function(){return new dojox.collections.Iterator(B)
};
this.indexOf=function(D){for(var C=0;
C<B.length;
C++){if(B[C]==D){return C
}}return -1
};
this.insert=function(C,D){B.splice(C,0,D);
this.count=B.length
};
this.item=function(C){return B[C]
};
this.remove=function(D){var C=this.indexOf(D);
if(C>=0){B.splice(C,1)
}this.count=B.length
};
this.removeAt=function(C){B.splice(C,1);
this.count=B.length
};
this.reverse=function(){B.reverse()
};
this.sort=function(C){if(C){B.sort(C)
}else{B.sort()
}};
this.setByIndex=function(C,D){B[C]=D;
this.count=B.length
};
this.toArray=function(){return[].concat(B)
};
this.toString=function(C){return B.join((C||","))
}
}
};