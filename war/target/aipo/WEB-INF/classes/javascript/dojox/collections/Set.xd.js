dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Set"],["require","dojox.collections.ArrayList"]],defineResource:function(A){if(!A._hasResource["dojox.collections.Set"]){A._hasResource["dojox.collections.Set"]=true;
A.provide("dojox.collections.Set");
A.require("dojox.collections.ArrayList");
(function(){var B=dojox.collections;
B.Set=new (function(){function C(D){if(D.constructor==Array){return new dojox.collections.ArrayList(D)
}return D
}this.union=function(E,H){E=C(E);
H=C(H);
var D=new dojox.collections.ArrayList(E.toArray());
var G=H.getIterator();
while(!G.atEnd()){var F=G.get();
if(!D.contains(F)){D.add(F)
}}return D
};
this.intersection=function(E,H){E=C(E);
H=C(H);
var D=new dojox.collections.ArrayList();
var G=H.getIterator();
while(!G.atEnd()){var F=G.get();
if(E.contains(F)){D.add(F)
}}return D
};
this.difference=function(E,H){E=C(E);
H=C(H);
var D=new dojox.collections.ArrayList();
var G=E.getIterator();
while(!G.atEnd()){var F=G.get();
if(!H.contains(F)){D.add(F)
}}return D
};
this.isSubSet=function(D,F){D=C(D);
F=C(F);
var E=D.getIterator();
while(!E.atEnd()){if(!F.contains(E.get())){return false
}}return true
};
this.isSuperSet=function(D,F){D=C(D);
F=C(F);
var E=F.getIterator();
while(!E.atEnd()){if(!D.contains(E.get())){return false
}}return true
}
})()
})()
}}});