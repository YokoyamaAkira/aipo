if(!dojo._hasResource["dojo.behavior"]){dojo._hasResource["dojo.behavior"]=true;
dojo.provide("dojo.behavior");
dojo.behavior=new function(){function B(F,E){if(!F[E]){F[E]=[]
}return F[E]
}var C=0;
function A(H,F,G){var I={};
for(var E in H){if(typeof I[E]=="undefined"){if(!G){F(H[E],E)
}else{G.call(F,H[E],E)
}}}}this._behaviors={};
this.add=function(E){var F={};
A(E,this,function(I,G){var H=B(this._behaviors,G);
if(typeof H.id!="number"){H.id=C++
}var J=[];
H.push(J);
if((dojo.isString(I))||(dojo.isFunction(I))){I={found:I}
}A(I,function(L,K){B(J,K).push(L)
})
})
};
var D=function(F,G,E){if(dojo.isString(G)){if(E=="found"){dojo.publish(G,[F])
}else{dojo.connect(F,E,function(){dojo.publish(G,arguments)
})
}}else{if(dojo.isFunction(G)){if(E=="found"){G(F)
}else{dojo.connect(F,E,G)
}}}};
this.apply=function(){A(this._behaviors,function(E,F){dojo.query(F).forEach(function(K){var J=0;
var H="_dj_behavior_"+E.id;
if(typeof K[H]=="number"){J=K[H];
if(J==(E.length)){return 
}}for(var G=J,I;
I=E[G];
G++){A(I,function(M,L){if(dojo.isArray(M)){dojo.forEach(M,function(N){D(K,N,L)
})
}})
}K[H]=E.length
})
})
}
};
dojo.addOnLoad(dojo.behavior,"apply")
};