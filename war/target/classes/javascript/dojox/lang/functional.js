if(!dojo._hasResource["dojox.lang.functional"]){dojo._hasResource["dojox.lang.functional"]=true;
dojo.provide("dojox.lang.functional");
(function(){var B=dojo,E=dojox.lang.functional,D=/\bfor\b|\bif\b/gm,I={};
var C="ab".split(/a*/).length>1?String.prototype.split:function(K){var L=this.split.call(this,K),M=K.exec(this);
if(M&&M.index==0){L.unshift("")
}return L
};
var J=function(M){var K=[],P=C.call(M,/\s*->\s*/m);
if(P.length>1){while(P.length){M=P.pop();
K=P.pop().split(/\s*,\s*|\s+/m);
if(P.length){P.push("(function("+K+"){return ("+M+")})")
}}}else{if(M.match(/\b_\b/)){K=["_"]
}else{var Q=M.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/m),N=M.match(/[+\-*\/%&|\^\.=<>!]\s*$/m);
if(Q||N){if(Q){K.push("$1");
M="$1"+M
}if(N){K.push("$2");
M=M+"$2"
}}else{var O=M.replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*:|this|true|false|null|undefined|typeof|instanceof|in|delete|new|void|arguments|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|dojo|dijit|dojox|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,"").match(/([a-z_$][a-z_$\d]*)/gi)||[];
var L={};
B.forEach(O,function(R){if(!(R in L)){K.push(R);
L[R]=1
}})
}}}return{args:K,body:"return ("+M+");"}
};
var G=function(O){var Q=O.split(D),K=O.match(D),N=["var r = [];"],L=[];
for(var M=0;
M<K.length;
){var R=K[M],P=Q[++M];
if(R=="for"&&!/^\s*\(\s*(;|var)/.test(P)){P=P.replace(/^\s*\(/,"(var ")
}N.push(R,P,"{");
L.push("}")
}return N.join("")+"r.push("+Q[0]+");"+L.join("")+"return r;"
};
var H=function(K){return function(){if(arguments.length+K.args.length<K.arity){return H({func:K.func,arity:K.arity,args:Array.prototype.concat.apply(K.args,arguments)})
}return K.func.apply(this,Array.prototype.concat.apply(K.args,arguments))
}
};
var A=function(K){return K
};
var F=function(K){return K.length?function(){var L=K.length-1,M=E.lambda(K[L]).apply(this,arguments);
for(--L;
L>=0;
--L){M=E.lambda(K[L]).call(this,M)
}return M
}:A
};
B.mixin(E,{buildLambda:function(K){K=J(K);
return"function("+K.args.join(",")+"){"+K.body+"}"
},lambda:function(K){if(typeof K=="function"){return K
}if(K instanceof Array){return F(K)
}K=J(K);
return new Function(K.args,K.body)
},repeat:function(O,L,N,M){M=M||B.global;
L=E.lambda(L);
var K=new Array(O);
K[0]=N;
for(var P=1;
P<O;
K[P]=N=L.call(M,N),++P){}return K
},until:function(N,K,M,L){L=L||B.global;
K=E.lambda(K);
N=E.lambda(N);
var O=[];
for(;
!N.call(L,M);
O.push(M),M=K.call(L,M)){}return O
},buildListcomp:function(K){return"function(){"+G(K)+"}"
},compileListcomp:function(K){return new Function([],G(K))
},listcomp:function(K){return(new Function([],G(K)))()
},foldl:function(O,L,N,M){O=typeof O=="string"?O.split(""):O;
M=M||B.global;
L=E.lambda(L);
for(var K=0;
K<O.length;
N=L.call(M,N,O[K],K,O),++K){}return N
},foldl1:function(O,L,N){O=typeof O=="string"?O.split(""):O;
N=N||B.global;
L=E.lambda(L);
var M=O[0];
for(var K=1;
K<O.length;
M=L.call(N,M,O[K],K,O),++K){}return M
},scanl:function(Q,M,O,N){Q=typeof Q=="string"?Q.split(""):Q;
N=N||B.global;
M=E.lambda(M);
var P=Q.length,L=new Array(P+1);
L[0]=O;
for(var K=0;
K<P;
O=M.call(N,O,Q[K],K,Q),L[++K]=O){}return L
},scanl1:function(Q,M,O,N){Q=typeof Q=="string"?Q.split(""):Q;
N=N||B.global;
M=E.lambda(M);
var P=Q.length,L=new Array(P),O=Q[0];
L[0]=O;
for(var K=1;
K<P;
O=M.call(N,O,Q[K],K,Q),L[K++]=O){}return L
},foldr:function(O,L,N,M){O=typeof O=="string"?O.split(""):O;
M=M||B.global;
L=E.lambda(L);
for(var K=O.length;
K>0;
--K,N=L.call(M,N,O[K],K,O)){}return N
},foldr1:function(P,L,N){P=typeof P=="string"?P.split(""):P;
N=N||B.global;
L=E.lambda(L);
var O=P.length,M=P[O-1];
for(var K=O-1;
K>0;
--K,M=L.call(N,M,P[K],K,P)){}return M
},scanr:function(Q,M,O,N){Q=typeof Q=="string"?Q.split(""):Q;
N=N||B.global;
M=E.lambda(M);
var P=Q.length,L=new Array(P+1);
L[P]=O;
for(var K=P;
K>0;
--K,O=M.call(N,O,Q[K],K,Q),L[K]=O){}return L
},scanr1:function(Q,M,O,N){Q=typeof Q=="string"?Q.split(""):Q;
N=N||B.global;
M=E.lambda(M);
var P=Q.length,L=new Array(P),O=Q[P-1];
L[P-1]=O;
for(var K=P-1;
K>0;
--K,O=M.call(N,O,Q[K],K,Q),L[K]=O){}return L
},filter:function(Q,N,O){Q=typeof Q=="string"?Q.split(""):Q;
O=O||B.global;
N=E.lambda(N);
var P=Q.length,M=[],K;
for(var L=0;
L<P;
++L){K=Q[L];
if(N.call(O,K,L,Q)){M.push(K)
}}return M
},forEach:function(O,L,M){O=typeof O=="string"?O.split(""):O;
M=M||B.global;
L=E.lambda(L);
var N=O.length;
for(var K=0;
K<N;
L.call(M,O[K],K,O),++K){}},map:function(P,M,N){P=typeof P=="string"?P.split(""):P;
N=N||B.global;
M=E.lambda(M);
var O=P.length,L=new Array(O);
for(var K=0;
K<O;
L[K]=M.call(N,P[K],K,P),++K){}return L
},every:function(O,L,M){O=typeof O=="string"?O.split(""):O;
M=M||B.global;
L=E.lambda(L);
var N=O.length;
for(var K=0;
K<N;
++K){if(!L.call(M,O[K],K,O)){return false
}}return true
},some:function(O,L,M){O=typeof O=="string"?O.split(""):O;
M=M||B.global;
L=E.lambda(L);
var N=O.length;
for(var K=0;
K<N;
++K){if(L.call(M,O[K],K,O)){return true
}}return false
},reduce:function(M,K,L){return arguments.length<3?E.foldl1(M,K):E.foldl(M,K,L)
},reduceRight:function(M,K,L){return arguments.length<3?E.foldr1(M,K):E.foldr(M,K,L)
},curry:function(K,L){K=E.lambda(K);
L=typeof L=="number"?L:K.length;
return H({func:K,arity:L,args:[]})
},arg:{},partial:function(N){var P=arguments,K=new Array(P.length-1),O=[];
N=E.lambda(N);
for(var M=1;
M<P.length;
++M){var L=P[M];
K[M-1]=L;
if(L==E.arg){O.push(M-1)
}}return function(){var R=Array.prototype.slice.call(K,0);
for(var Q=0;
Q<O.length;
++Q){R[O[Q]]=arguments[Q]
}return N.apply(this,R)
}
},mixer:function(K,L){K=E.lambda(K);
return function(){var N=new Array(L.length);
for(var M=0;
M<L.length;
++M){N[M]=arguments[L[M]]
}return K.apply(this,N)
}
},flip:function(K){K=E.lambda(K);
return function(){var L=arguments,O=L.length-1,N=new Array(O+1),M;
for(M=0;
M<=O;
++M){N[O-M]=L[M]
}return K.apply(this,N)
}
},zip:function(){var O=arguments[0].length,P=arguments.length,M;
for(M=1;
M<P;
O=Math.min(O,arguments[M++].length)){}var L=new Array(O),K;
for(M=0;
M<O;
++M){var N=new Array(P);
for(K=0;
K<P;
N[K]=arguments[K][M],++K){}L[M]=N
}return L
},unzip:function(K){return E.zip.apply(null,K)
},constFun:function(K){return function(){return K
}
},invoke:function(K){return function(L){return L[K].apply(L,Array.prototype.slice.call(arguments,1))
}
},pluck:function(K){return function(L){return L[K]
}
},forIn:function(L,K,M){M=M||B.global;
K=E.lambda(K);
for(var N in L){if(N in I){continue
}K.call(M,L[N],N,L)
}},forEachReversed:function(N,L,M){N=typeof N=="string"?N.split(""):N;
M=M||B.global;
L=E.lambda(L);
for(var K=N.length-1;
K>=0;
L.call(M,N[K],K,N),--K){}}});
dojo.declare("dojox.lang.functional.MaybeMonad",null,{constructor:function(K){if(arguments.length){this.value=K
}},bind:function(K,M,L){if(!("value" in K)){return new this.constructor()
}L=L||B.global;
M=E.lambda(M);
return M.call(L,K.value)
},isNothing:function(){return !("value" in this)
}});
E.MaybeMonad.returnMonad=function(K){return new E.MaybeMonad(K)
};
E.MaybeMonad.zero=new E.MaybeMonad()
})()
};