dojo._xdResourceLoaded({depends:[["provide","dojox.collections.ArrayList"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.ArrayList"]){A._hasResource["dojox.collections.ArrayList"]=true;
A.provide("dojox.collections.ArrayList");
A.require("dojox.collections._base");
dojox.collections.ArrayList=function(B){var C=[];
if(B){C=C.concat(B)
}this.count=C.length;
this.add=function(D){C.push(D);
this.count=C.length
};
this.addRange=function(D){if(D.getIterator){var F=D.getIterator();
while(!F.atEnd()){this.add(F.get())
}this.count=C.length
}else{for(var E=0;
E<D.length;
E++){C.push(D[E])
}this.count=C.length
}};
this.clear=function(){C.splice(0,C.length);
this.count=0
};
this.clone=function(){return new dojox.collections.ArrayList(C)
};
this.contains=function(E){for(var D=0;
D<C.length;
D++){if(C[D]==E){return true
}}return false
};
this.forEach=function(E,D){A.forEach(C,E,D)
};
this.getIterator=function(){return new dojox.collections.Iterator(C)
};
this.indexOf=function(E){for(var D=0;
D<C.length;
D++){if(C[D]==E){return D
}}return -1
};
this.insert=function(D,E){C.splice(D,0,E);
this.count=C.length
};
this.item=function(D){return C[D]
};
this.remove=function(E){var D=this.indexOf(E);
if(D>=0){C.splice(D,1)
}this.count=C.length
};
this.removeAt=function(D){C.splice(D,1);
this.count=C.length
};
this.reverse=function(){C.reverse()
};
this.sort=function(D){if(D){C.sort(D)
}else{C.sort()
}};
this.setByIndex=function(D,E){C[D]=E;
this.count=C.length
};
this.toArray=function(){return[].concat(C)
};
this.toString=function(D){return C.join((D||","))
}
}
}}});