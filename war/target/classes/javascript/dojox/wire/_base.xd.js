dojo._xdResourceLoaded({depends:[["provide","dojox.wire._base"]],defineResource:function(A){if(!A._hasResource["dojox.wire._base"]){A._hasResource["dojox.wire._base"]=true;
A.provide("dojox.wire._base");
dojox.wire._defaultWireClass="dojox.wire.Wire";
dojox.wire._wireClasses={attribute:"dojox.wire.DataWire",path:"dojox.wire.XmlWire",children:"dojox.wire.CompositeWire",columns:"dojox.wire.TableAdapter",nodes:"dojox.wire.TreeAdapter",segments:"dojox.wire.TextAdapter"};
dojox.wire.register=function(C,B){if(!C||!B){return 
}if(dojox.wire._wireClasses[B]){return 
}dojox.wire._wireClasses[B]=C
};
dojox.wire._getClass=function(B){A.require(B);
return A.getObject(B)
};
dojox.wire.create=function(B){if(!B){B={}
}var D=B.wireClass;
if(D){if(A.isString(D)){D=dojox.wire._getClass(D)
}}else{for(var C in B){if(!B[C]){continue
}D=dojox.wire._wireClasses[C];
if(D){if(A.isString(D)){D=dojox.wire._getClass(D);
dojox.wire._wireClasses[C]=D
}break
}}}if(!D){if(A.isString(dojox.wire._defaultWireClass)){dojox.wire._defaultWireClass=dojox.wire._getClass(dojox.wire._defaultWireClass)
}D=dojox.wire._defaultWireClass
}return new D(B)
};
dojox.wire.isWire=function(B){return(B&&B._wireClass)
};
dojox.wire.transfer=function(E,F,C,B){if(!E||!F){return 
}if(!dojox.wire.isWire(E)){E=dojox.wire.create(E)
}if(!dojox.wire.isWire(F)){F=dojox.wire.create(F)
}var D=E.getValue(C);
F.setValue(D,(B||C))
};
dojox.wire.connect=function(C,D,E){if(!C||!D||!E){return 
}var B={topic:C.topic};
if(C.topic){B.handle=A.subscribe(C.topic,function(){dojox.wire.transfer(D,E,arguments)
})
}else{if(C.event){B.handle=A.connect(C.scope,C.event,function(){dojox.wire.transfer(D,E,arguments)
})
}}return B
};
dojox.wire.disconnect=function(B){if(!B||!B.handle){return 
}if(B.topic){A.unsubscribe(B.handle)
}else{A.disconnect(B.handle)
}}
}}});