dojo._xdResourceLoaded({depends:[["provide","dojo.behavior"]],defineResource:function(A){if(!A._hasResource["dojo.behavior"]){A._hasResource["dojo.behavior"]=true;
A.provide("dojo.behavior");
A.behavior=new function(){function C(G,F){if(!G[F]){G[F]=[]
}return G[F]
}var D=0;
function B(I,G,H){var J={};
for(var F in I){if(typeof J[F]=="undefined"){if(!H){G(I[F],F)
}else{H.call(G,I[F],F)
}}}}this._behaviors={};
this.add=function(F){var G={};
B(F,this,function(J,H){var I=C(this._behaviors,H);
if(typeof I.id!="number"){I.id=D++
}var K=[];
I.push(K);
if((A.isString(J))||(A.isFunction(J))){J={found:J}
}B(J,function(M,L){C(K,L).push(M)
})
})
};
var E=function(G,H,F){if(A.isString(H)){if(F=="found"){A.publish(H,[G])
}else{A.connect(G,F,function(){A.publish(H,arguments)
})
}}else{if(A.isFunction(H)){if(F=="found"){H(G)
}else{A.connect(G,F,H)
}}}};
this.apply=function(){B(this._behaviors,function(F,G){A.query(G).forEach(function(L){var K=0;
var I="_dj_behavior_"+F.id;
if(typeof L[I]=="number"){K=L[I];
if(K==(F.length)){return 
}}for(var H=K,J;
J=F[H];
H++){B(J,function(N,M){if(A.isArray(N)){A.forEach(N,function(O){E(L,O,M)
})
}})
}L[I]=F.length
})
})
}
};
A.addOnLoad(A.behavior,"apply")
}}});