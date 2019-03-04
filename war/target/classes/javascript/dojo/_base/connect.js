if(!dojo._hasResource["dojo._base.connect"]){dojo._hasResource["dojo._base.connect"]=true;
dojo.provide("dojo._base.connect");
dojo.require("dojo._base.lang");
dojo._listener={getDispatcher:function(){return function(){var D=Array.prototype,F=arguments.callee,A=F._listeners,C=F.target;
var E=C&&C.apply(this,arguments);
for(var B in A){if(!(B in D)){A[B].apply(this,arguments)
}}return E
}
},add:function(C,E,B){C=C||dojo.global;
var A=C[E];
if(!A||!A._listeners){var D=dojo._listener.getDispatcher();
D.target=A;
D._listeners=[];
A=C[E]=D
}return A._listeners.push(B)
},remove:function(C,D,B){var A=(C||dojo.global)[D];
if(A&&A._listeners&&B--){delete A._listeners[B]
}}};
dojo.connect=function(F,B,D,A,J){var I=arguments,H=[],G=0;
H.push(dojo.isString(I[0])?null:I[G++],I[G++]);
var C=I[G+1];
H.push(dojo.isString(C)||dojo.isFunction(C)?I[G++]:null,I[G++]);
for(var E=I.length;
G<E;
G++){H.push(I[G])
}return dojo._connect.apply(this,H)
};
dojo._connect=function(E,D,B,F){var A=dojo._listener,C=A.add(E,D,dojo.hitch(B,F));
return[E,D,C,A]
};
dojo.disconnect=function(A){if(A&&A[0]!==undefined){dojo._disconnect.apply(this,A);
delete A[0]
}};
dojo._disconnect=function(D,A,C,B){B.remove(D,A,C)
};
dojo._topics={};
dojo.subscribe=function(A,B,C){return[A,dojo._listener.add(dojo._topics,A,dojo.hitch(B,C))]
};
dojo.unsubscribe=function(A){if(A){dojo._listener.remove(dojo._topics,A[0],A[1])
}};
dojo.publish=function(B,A){var C=dojo._topics[B];
if(C){C.apply(this,A||[])
}};
dojo.connectPublisher=function(B,D,C){var A=function(){dojo.publish(B,arguments)
};
return(C)?dojo.connect(D,C,A):dojo.connect(D,A)
}
};