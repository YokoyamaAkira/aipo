dojo._xdResourceLoaded({depends:[["provide","dojo._base.connect"],["require","dojo._base.lang"]],defineResource:function(A){if(!A._hasResource["dojo._base.connect"]){A._hasResource["dojo._base.connect"]=true;
A.provide("dojo._base.connect");
A.require("dojo._base.lang");
A._listener={getDispatcher:function(){return function(){var F=Array.prototype,C=arguments.callee,B=C._listeners,E=C.target;
var G=E&&E.apply(this,arguments);
for(var D in B){if(!(D in F)){B[D].apply(this,arguments)
}}return G
}
},add:function(E,B,D){E=E||A.global;
var C=E[B];
if(!C||!C._listeners){var F=A._listener.getDispatcher();
F.target=C;
F._listeners=[];
C=E[B]=F
}return C._listeners.push(D)
},remove:function(E,B,D){var C=(E||A.global)[B];
if(C&&C._listeners&&D--){delete C._listeners[D]
}}};
A.connect=function(E,K,C,J,I){var H=arguments,G=[],F=0;
G.push(A.isString(H[0])?null:H[F++],H[F++]);
var B=H[F+1];
G.push(A.isString(B)||A.isFunction(B)?H[F++]:null,H[F++]);
for(var D=H.length;
F<D;
F++){G.push(H[F])
}return A._connect.apply(this,G)
};
A._connect=function(G,F,D,C){var B=A._listener,E=B.add(G,F,A.hitch(D,C));
return[G,F,E,B]
};
A.disconnect=function(B){if(B&&B[0]!==undefined){A._disconnect.apply(this,B);
delete B[0]
}};
A._disconnect=function(B,C,E,D){D.remove(B,C,E)
};
A._topics={};
A.subscribe=function(C,D,B){return[C,A._listener.add(A._topics,C,A.hitch(D,B))]
};
A.unsubscribe=function(B){if(B){A._listener.remove(A._topics,B[0],B[1])
}};
A.publish=function(D,C){var B=A._topics[D];
if(B){B.apply(this,C||[])
}};
A.connectPublisher=function(D,B,E){var C=function(){A.publish(D,arguments)
};
return(E)?A.connect(B,E,C):A.connect(B,C)
}
}}});