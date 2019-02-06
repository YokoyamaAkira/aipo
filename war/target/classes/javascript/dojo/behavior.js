if(!dojo._hasResource["dojo.behavior"]){dojo._hasResource["dojo.behavior"]=true;
dojo.provide("dojo.behavior");
dojo.behavior=new function(){function A(E,F){if(!E[F]){E[F]=[]
}return E[F]
}var B=0;
function D(I,G,H){var E={};
for(var F in I){if(typeof E[F]=="undefined"){if(!H){G(I[F],F)
}else{H.call(G,I[F],F)
}}}}this._behaviors={};
this.add=function(F){var E={};
D(F,this,function(I,G){var H=A(this._behaviors,G);
if(typeof H.id!="number"){H.id=B++
}var J=[];
H.push(J);
if((dojo.isString(I))||(dojo.isFunction(I))){I={found:I}
}D(I,function(L,K){A(J,K).push(L)
})
})
};
var C=function(G,E,F){if(dojo.isString(E)){if(F=="found"){dojo.publish(E,[G])
}else{dojo.connect(G,F,function(){dojo.publish(E,arguments)
})
}}else{if(dojo.isFunction(E)){if(F=="found"){E(G)
}else{dojo.connect(G,F,E)
}}}};
this.apply=function(){D(this._behaviors,function(F,E){dojo.query(E).forEach(function(J){var H=0;
var K="_dj_behavior_"+F.id;
if(typeof J[K]=="number"){H=J[K];
if(H==(F.length)){return 
}}for(var I=H,G;
G=F[I];
I++){D(G,function(L,M){if(dojo.isArray(L)){dojo.forEach(L,function(N){C(J,N,M)
})
}})
}J[K]=F.length
})
})
}
};
dojo.addOnLoad(dojo.behavior,"apply")
};