if(!dojo._hasResource["dojo._base.connect"]){dojo._hasResource["dojo._base.connect"]=true;
dojo.provide("dojo._base.connect");
dojo.require("dojo._base.lang");
dojo._listener={getDispatcher:function(){return function(){var C=Array.prototype,E=arguments.callee,F=E._listeners,B=E.target;
var D=B&&B.apply(this,arguments);
for(var A in F){if(!(A in C)){F[A].apply(this,arguments)
}}return D
}
},add:function(B,D,A){B=B||dojo.global;
var E=B[D];
if(!E||!E._listeners){var C=dojo._listener.getDispatcher();
C.target=E;
C._listeners=[];
E=B[D]=C
}return E._listeners.push(A)
},remove:function(B,C,A){var D=(B||dojo.global)[C];
if(D&&D._listeners&&A--){delete D._listeners[A]
}}};
dojo.connect=function(B,H,J,G,F){var E=arguments,D=[],C=0;
D.push(dojo.isString(E[0])?null:E[C++],E[C++]);
var I=E[C+1];
D.push(dojo.isString(I)||dojo.isFunction(I)?E[C++]:null,E[C++]);
for(var A=E.length;
C<A;
C++){D.push(E[C])
}return dojo._connect.apply(this,D)
};
dojo._connect=function(D,C,A,E){var F=dojo._listener,B=F.add(D,C,dojo.hitch(A,E));
return[D,C,B,F]
};
dojo.disconnect=function(A){if(A&&A[0]!==undefined){dojo._disconnect.apply(this,A);
delete A[0]
}};
dojo._disconnect=function(C,D,B,A){A.remove(C,D,B)
};
dojo._topics={};
dojo.subscribe=function(C,A,B){return[C,dojo._listener.add(dojo._topics,C,dojo.hitch(A,B))]
};
dojo.unsubscribe=function(A){if(A){dojo._listener.remove(dojo._topics,A[0],A[1])
}};
dojo.publish=function(A,C){var B=dojo._topics[A];
if(B){B.apply(this,C||[])
}};
dojo.connectPublisher=function(A,C,B){var D=function(){dojo.publish(A,arguments)
};
return(B)?dojo.connect(C,B,D):dojo.connect(C,D)
}
};