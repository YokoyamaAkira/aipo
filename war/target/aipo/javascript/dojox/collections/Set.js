if(!dojo._hasResource["dojox.collections.Set"]){dojo._hasResource["dojox.collections.Set"]=true;
dojo.provide("dojox.collections.Set");
dojo.require("dojox.collections.ArrayList");
(function(){var A=dojox.collections;
A.Set=new (function(){function B(C){if(C.constructor==Array){return new dojox.collections.ArrayList(C)
}return C
}this.union=function(D,G){D=B(D);
G=B(G);
var C=new dojox.collections.ArrayList(D.toArray());
var F=G.getIterator();
while(!F.atEnd()){var E=F.get();
if(!C.contains(E)){C.add(E)
}}return C
};
this.intersection=function(D,G){D=B(D);
G=B(G);
var C=new dojox.collections.ArrayList();
var F=G.getIterator();
while(!F.atEnd()){var E=F.get();
if(D.contains(E)){C.add(E)
}}return C
};
this.difference=function(D,G){D=B(D);
G=B(G);
var C=new dojox.collections.ArrayList();
var F=D.getIterator();
while(!F.atEnd()){var E=F.get();
if(!G.contains(E)){C.add(E)
}}return C
};
this.isSubSet=function(C,E){C=B(C);
E=B(E);
var D=C.getIterator();
while(!D.atEnd()){if(!E.contains(D.get())){return false
}}return true
};
this.isSuperSet=function(C,E){C=B(C);
E=B(E);
var D=E.getIterator();
while(!D.atEnd()){if(!C.contains(D.get())){return false
}}return true
}
})()
})()
};