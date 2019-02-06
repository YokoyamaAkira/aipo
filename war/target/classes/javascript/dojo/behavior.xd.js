dojo._xdResourceLoaded({depends:[["provide","dojo.behavior"]],defineResource:function(A){if(!A._hasResource["dojo.behavior"]){A._hasResource["dojo.behavior"]=true;
A.provide("dojo.behavior");
A.behavior=new function(){function D(G,F){if(!G[F]){G[F]=[]
}return G[F]
}var E=0;
function C(I,G,H){var J={};
for(var F in I){if(typeof J[F]=="undefined"){if(!H){G(I[F],F)
}else{H.call(G,I[F],F)
}}}}this._behaviors={};
this.add=function(F){var G={};
C(F,this,function(H,J){var K=D(this._behaviors,J);
if(typeof K.id!="number"){K.id=E++
}var I=[];
K.push(I);
if((A.isString(H))||(A.isFunction(H))){H={found:H}
}C(H,function(L,M){D(I,M).push(L)
})
})
};
var B=function(G,H,F){if(A.isString(H)){if(F=="found"){A.publish(H,[G])
}else{A.connect(G,F,function(){A.publish(H,arguments)
})
}}else{if(A.isFunction(H)){if(F=="found"){H(G)
}else{A.connect(G,F,H)
}}}};
this.apply=function(){C(this._behaviors,function(F,G){A.query(G).forEach(function(I){var L=0;
var J="_dj_behavior_"+F.id;
if(typeof I[J]=="number"){L=I[J];
if(L==(F.length)){return 
}}for(var H=L,K;
K=F[H];
H++){C(K,function(N,M){if(A.isArray(N)){A.forEach(N,function(O){B(I,O,M)
})
}})
}I[J]=F.length
})
})
}
};
A.addOnLoad(A.behavior,"apply")
}}});