if(!dojo._hasResource["dojox.wire._base"]){dojo._hasResource["dojox.wire._base"]=true;
dojo.provide("dojox.wire._base");
dojox.wire._defaultWireClass="dojox.wire.Wire";
dojox.wire._wireClasses={attribute:"dojox.wire.DataWire",path:"dojox.wire.XmlWire",children:"dojox.wire.CompositeWire",columns:"dojox.wire.TableAdapter",nodes:"dojox.wire.TreeAdapter",segments:"dojox.wire.TextAdapter"};
dojox.wire.register=function(A,B){if(!A||!B){return 
}if(dojox.wire._wireClasses[B]){return 
}dojox.wire._wireClasses[B]=A
};
dojox.wire._getClass=function(A){dojo.require(A);
return dojo.getObject(A)
};
dojox.wire.create=function(C){if(!C){C={}
}var B=C.wireClass;
if(B){if(dojo.isString(B)){B=dojox.wire._getClass(B)
}}else{for(var A in C){if(!C[A]){continue
}B=dojox.wire._wireClasses[A];
if(B){if(dojo.isString(B)){B=dojox.wire._getClass(B);
dojox.wire._wireClasses[A]=B
}break
}}}if(!B){if(dojo.isString(dojox.wire._defaultWireClass)){dojox.wire._defaultWireClass=dojox.wire._getClass(dojox.wire._defaultWireClass)
}B=dojox.wire._defaultWireClass
}return new B(C)
};
dojox.wire.isWire=function(A){return(A&&A._wireClass)
};
dojox.wire.transfer=function(C,D,A,E){if(!C||!D){return 
}if(!dojox.wire.isWire(C)){C=dojox.wire.create(C)
}if(!dojox.wire.isWire(D)){D=dojox.wire.create(D)
}var B=C.getValue(A);
D.setValue(B,(E||A))
};
dojox.wire.connect=function(A,B,C){if(!A||!B||!C){return 
}var D={topic:A.topic};
if(A.topic){D.handle=dojo.subscribe(A.topic,function(){dojox.wire.transfer(B,C,arguments)
})
}else{if(A.event){D.handle=dojo.connect(A.scope,A.event,function(){dojox.wire.transfer(B,C,arguments)
})
}}return D
};
dojox.wire.disconnect=function(A){if(!A||!A.handle){return 
}if(A.topic){dojo.unsubscribe(A.handle)
}else{dojo.disconnect(A.handle)
}}
};