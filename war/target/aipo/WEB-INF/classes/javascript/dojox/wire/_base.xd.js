dojo._xdResourceLoaded({depends:[["provide","dojox.wire._base"]],defineResource:function(A){if(!A._hasResource["dojox.wire._base"]){A._hasResource["dojox.wire._base"]=true;
A.provide("dojox.wire._base");
dojox.wire._defaultWireClass="dojox.wire.Wire";
dojox.wire._wireClasses={attribute:"dojox.wire.DataWire",path:"dojox.wire.XmlWire",children:"dojox.wire.CompositeWire",columns:"dojox.wire.TableAdapter",nodes:"dojox.wire.TreeAdapter",segments:"dojox.wire.TextAdapter"};
dojox.wire.register=function(B,C){if(!B||!C){return 
}if(dojox.wire._wireClasses[C]){return 
}dojox.wire._wireClasses[C]=B
};
dojox.wire._getClass=function(B){A.require(B);
return A.getObject(B)
};
dojox.wire.create=function(C){if(!C){C={}
}var B=C.wireClass;
if(B){if(A.isString(B)){B=dojox.wire._getClass(B)
}}else{for(var D in C){if(!C[D]){continue
}B=dojox.wire._wireClasses[D];
if(B){if(A.isString(B)){B=dojox.wire._getClass(B);
dojox.wire._wireClasses[D]=B
}break
}}}if(!B){if(A.isString(dojox.wire._defaultWireClass)){dojox.wire._defaultWireClass=dojox.wire._getClass(dojox.wire._defaultWireClass)
}B=dojox.wire._defaultWireClass
}return new B(C)
};
dojox.wire.isWire=function(B){return(B&&B._wireClass)
};
dojox.wire.transfer=function(F,B,D,C){if(!F||!B){return 
}if(!dojox.wire.isWire(F)){F=dojox.wire.create(F)
}if(!dojox.wire.isWire(B)){B=dojox.wire.create(B)
}var E=F.getValue(D);
B.setValue(E,(C||D))
};
dojox.wire.connect=function(D,E,B){if(!D||!E||!B){return 
}var C={topic:D.topic};
if(D.topic){C.handle=A.subscribe(D.topic,function(){dojox.wire.transfer(E,B,arguments)
})
}else{if(D.event){C.handle=A.connect(D.scope,D.event,function(){dojox.wire.transfer(E,B,arguments)
})
}}return C
};
dojox.wire.disconnect=function(B){if(!B||!B.handle){return 
}if(B.topic){A.unsubscribe(B.handle)
}else{A.disconnect(B.handle)
}}
}}});