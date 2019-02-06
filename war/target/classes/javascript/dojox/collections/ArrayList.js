if(!dojo._hasResource["dojox.collections.ArrayList"]){dojo._hasResource["dojox.collections.ArrayList"]=true;
dojo.provide("dojox.collections.ArrayList");
dojo.require("dojox.collections._base");
dojox.collections.ArrayList=function(B){var A=[];
if(B){A=A.concat(B)
}this.count=A.length;
this.add=function(C){A.push(C);
this.count=A.length
};
this.addRange=function(D){if(D.getIterator){var C=D.getIterator();
while(!C.atEnd()){this.add(C.get())
}this.count=A.length
}else{for(var E=0;
E<D.length;
E++){A.push(D[E])
}this.count=A.length
}};
this.clear=function(){A.splice(0,A.length);
this.count=0
};
this.clone=function(){return new dojox.collections.ArrayList(A)
};
this.contains=function(C){for(var D=0;
D<A.length;
D++){if(A[D]==C){return true
}}return false
};
this.forEach=function(C,D){dojo.forEach(A,C,D)
};
this.getIterator=function(){return new dojox.collections.Iterator(A)
};
this.indexOf=function(C){for(var D=0;
D<A.length;
D++){if(A[D]==C){return D
}}return -1
};
this.insert=function(D,C){A.splice(D,0,C);
this.count=A.length
};
this.item=function(C){return A[C]
};
this.remove=function(C){var D=this.indexOf(C);
if(D>=0){A.splice(D,1)
}this.count=A.length
};
this.removeAt=function(C){A.splice(C,1);
this.count=A.length
};
this.reverse=function(){A.reverse()
};
this.sort=function(C){if(C){A.sort(C)
}else{A.sort()
}};
this.setByIndex=function(D,C){A[D]=C;
this.count=A.length
};
this.toArray=function(){return[].concat(A)
};
this.toString=function(C){return A.join((C||","))
}
}
};