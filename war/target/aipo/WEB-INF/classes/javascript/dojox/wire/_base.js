if(!dojo._hasResource["dojox.wire._base"]){dojo._hasResource["dojox.wire._base"]=true;
dojo.provide("dojox.wire._base");
dojox.wire._defaultWireClass="dojox.wire.Wire";
dojox.wire._wireClasses={attribute:"dojox.wire.DataWire",path:"dojox.wire.XmlWire",children:"dojox.wire.CompositeWire",columns:"dojox.wire.TableAdapter",nodes:"dojox.wire.TreeAdapter",segments:"dojox.wire.TextAdapter"};
dojox.wire.register=function(B,A){if(!B||!A){return 
}if(dojox.wire._wireClasses[A]){return 
}dojox.wire._wireClasses[A]=B
};
dojox.wire._getClass=function(A){dojo.require(A);
return dojo.getObject(A)
};
dojox.wire.create=function(A){if(!A){A={}
}var C=A.wireClass;
if(C){if(dojo.isString(C)){C=dojox.wire._getClass(C)
}}else{for(var B in A){if(!A[B]){continue
}C=dojox.wire._wireClasses[B];
if(C){if(dojo.isString(C)){C=dojox.wire._getClass(C);
dojox.wire._wireClasses[B]=C
}break
}}}if(!C){if(dojo.isString(dojox.wire._defaultWireClass)){dojox.wire._defaultWireClass=dojox.wire._getClass(dojox.wire._defaultWireClass)
}C=dojox.wire._defaultWireClass
}return new C(A)
};
dojox.wire.isWire=function(A){return(A&&A._wireClass)
};
dojox.wire.transfer=function(D,E,B,A){if(!D||!E){return 
}if(!dojox.wire.isWire(D)){D=dojox.wire.create(D)
}if(!dojox.wire.isWire(E)){E=dojox.wire.create(E)
}var C=D.getValue(B);
E.setValue(C,(A||B))
};
dojox.wire.connect=function(B,C,D){if(!B||!C||!D){return 
}var A={topic:B.topic};
if(B.topic){A.handle=dojo.subscribe(B.topic,function(){dojox.wire.transfer(C,D,arguments)
})
}else{if(B.event){A.handle=dojo.connect(B.scope,B.event,function(){dojox.wire.transfer(C,D,arguments)
})
}}return A
};
dojox.wire.disconnect=function(A){if(!A||!A.handle){return 
}if(A.topic){dojo.unsubscribe(A.handle)
}else{dojo.disconnect(A.handle)
}}
};