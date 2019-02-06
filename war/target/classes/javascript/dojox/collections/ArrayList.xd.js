dojo._xdResourceLoaded({depends:[["provide","dojox.collections.ArrayList"],["require","dojox.collections._base"]],defineResource:function(A){if(!A._hasResource["dojox.collections.ArrayList"]){A._hasResource["dojox.collections.ArrayList"]=true;
A.provide("dojox.collections.ArrayList");
A.require("dojox.collections._base");
dojox.collections.ArrayList=function(C){var B=[];
if(C){B=B.concat(C)
}this.count=B.length;
this.add=function(D){B.push(D);
this.count=B.length
};
this.addRange=function(D){if(D.getIterator){var F=D.getIterator();
while(!F.atEnd()){this.add(F.get())
}this.count=B.length
}else{for(var E=0;
E<D.length;
E++){B.push(D[E])
}this.count=B.length
}};
this.clear=function(){B.splice(0,B.length);
this.count=0
};
this.clone=function(){return new dojox.collections.ArrayList(B)
};
this.contains=function(E){for(var D=0;
D<B.length;
D++){if(B[D]==E){return true
}}return false
};
this.forEach=function(E,D){A.forEach(B,E,D)
};
this.getIterator=function(){return new dojox.collections.Iterator(B)
};
this.indexOf=function(E){for(var D=0;
D<B.length;
D++){if(B[D]==E){return D
}}return -1
};
this.insert=function(D,E){B.splice(D,0,E);
this.count=B.length
};
this.item=function(D){return B[D]
};
this.remove=function(E){var D=this.indexOf(E);
if(D>=0){B.splice(D,1)
}this.count=B.length
};
this.removeAt=function(D){B.splice(D,1);
this.count=B.length
};
this.reverse=function(){B.reverse()
};
this.sort=function(D){if(D){B.sort(D)
}else{B.sort()
}};
this.setByIndex=function(D,E){B[D]=E;
this.count=B.length
};
this.toArray=function(){return[].concat(B)
};
this.toString=function(D){return B.join((D||","))
}
}
}}});