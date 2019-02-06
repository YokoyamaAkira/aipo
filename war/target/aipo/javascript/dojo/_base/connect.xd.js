dojo._xdResourceLoaded({depends:[["provide","dojo._base.connect"],["require","dojo._base.lang"]],defineResource:function(A){if(!A._hasResource["dojo._base.connect"]){A._hasResource["dojo._base.connect"]=true;
A.provide("dojo._base.connect");
A.require("dojo._base.lang");
A._listener={getDispatcher:function(){return function(){var E=Array.prototype,G=arguments.callee,B=G._listeners,D=G.target;
var F=D&&D.apply(this,arguments);
for(var C in B){if(!(C in E)){B[C].apply(this,arguments)
}}return F
}
},add:function(D,F,C){D=D||A.global;
var B=D[F];
if(!B||!B._listeners){var E=A._listener.getDispatcher();
E.target=B;
E._listeners=[];
B=D[F]=E
}return B._listeners.push(C)
},remove:function(D,E,C){var B=(D||A.global)[E];
if(B&&B._listeners&&C--){delete B._listeners[C]
}}};
A.connect=function(G,C,E,B,K){var J=arguments,I=[],H=0;
I.push(A.isString(J[0])?null:J[H++],J[H++]);
var D=J[H+1];
I.push(A.isString(D)||A.isFunction(D)?J[H++]:null,J[H++]);
for(var F=J.length;
H<F;
H++){I.push(J[H])
}return A._connect.apply(this,I)
};
A._connect=function(F,E,C,G){var B=A._listener,D=B.add(F,E,A.hitch(C,G));
return[F,E,D,B]
};
A.disconnect=function(B){if(B&&B[0]!==undefined){A._disconnect.apply(this,B);
delete B[0]
}};
A._disconnect=function(E,B,D,C){C.remove(E,B,D)
};
A._topics={};
A.subscribe=function(B,C,D){return[B,A._listener.add(A._topics,B,A.hitch(C,D))]
};
A.unsubscribe=function(B){if(B){A._listener.remove(A._topics,B[0],B[1])
}};
A.publish=function(C,B){var D=A._topics[C];
if(D){D.apply(this,B||[])
}};
A.connectPublisher=function(C,E,D){var B=function(){A.publish(C,arguments)
};
return(D)?A.connect(E,D,B):A.connect(E,B)
}
}}});