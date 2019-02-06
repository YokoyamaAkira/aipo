if(!dojo._hasResource["dojox.lang.functional"]){dojo._hasResource["dojox.lang.functional"]=true;
dojo.provide("dojox.lang.functional");
(function(){var F=dojo,I=dojox.lang.functional,H=/\bfor\b|\bif\b/gm,C={};
var G="ab".split(/a*/).length>1?String.prototype.split:function(L){var M=this.split.call(this,L),K=L.exec(this);
if(K&&K.index==0){M.unshift("")
}return M
};
var D=function(N){var L=[],Q=G.call(N,/\s*->\s*/m);
if(Q.length>1){while(Q.length){N=Q.pop();
L=Q.pop().split(/\s*,\s*|\s+/m);
if(Q.length){Q.push("(function("+L+"){return ("+N+")})")
}}}else{if(N.match(/\b_\b/)){L=["_"]
}else{var K=N.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/m),O=N.match(/[+\-*\/%&|\^\.=<>!]\s*$/m);
if(K||O){if(K){L.push("$1");
N="$1"+N
}if(O){L.push("$2");
N=N+"$2"
}}else{var P=N.replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*:|this|true|false|null|undefined|typeof|instanceof|in|delete|new|void|arguments|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|dojo|dijit|dojox|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,"").match(/([a-z_$][a-z_$\d]*)/gi)||[];
var M={};
F.forEach(P,function(R){if(!(R in M)){L.push(R);
M[R]=1
}})
}}}return{args:L,body:"return ("+N+");"}
};
var A=function(P){var R=P.split(H),L=P.match(H),O=["var r = [];"],M=[];
for(var N=0;
N<L.length;
){var K=L[N],Q=R[++N];
if(K=="for"&&!/^\s*\(\s*(;|var)/.test(Q)){Q=Q.replace(/^\s*\(/,"(var ")
}O.push(K,Q,"{");
M.push("}")
}return O.join("")+"r.push("+R[0]+");"+M.join("")+"return r;"
};
var B=function(K){return function(){if(arguments.length+K.args.length<K.arity){return B({func:K.func,arity:K.arity,args:Array.prototype.concat.apply(K.args,arguments)})
}return K.func.apply(this,Array.prototype.concat.apply(K.args,arguments))
}
};
var E=function(K){return K
};
var J=function(K){return K.length?function(){var M=K.length-1,L=I.lambda(K[M]).apply(this,arguments);
for(--M;
M>=0;
--M){L=I.lambda(K[M]).call(this,L)
}return L
}:E
};
F.mixin(I,{buildLambda:function(K){K=D(K);
return"function("+K.args.join(",")+"){"+K.body+"}"
},lambda:function(K){if(typeof K=="function"){return K
}if(K instanceof Array){return J(K)
}K=D(K);
return new Function(K.args,K.body)
},repeat:function(P,M,O,N){N=N||F.global;
M=I.lambda(M);
var L=new Array(P);
L[0]=O;
for(var K=1;
K<P;
L[K]=O=M.call(N,O),++K){}return L
},until:function(O,L,N,M){M=M||F.global;
L=I.lambda(L);
O=I.lambda(O);
var K=[];
for(;
!O.call(M,N);
K.push(N),N=L.call(M,N)){}return K
},buildListcomp:function(K){return"function(){"+A(K)+"}"
},compileListcomp:function(K){return new Function([],A(K))
},listcomp:function(K){return(new Function([],A(K)))()
},foldl:function(K,M,O,N){K=typeof K=="string"?K.split(""):K;
N=N||F.global;
M=I.lambda(M);
for(var L=0;
L<K.length;
O=M.call(N,O,K[L],L,K),++L){}return O
},foldl1:function(K,M,O){K=typeof K=="string"?K.split(""):K;
O=O||F.global;
M=I.lambda(M);
var N=K[0];
for(var L=1;
L<K.length;
N=M.call(O,N,K[L],L,K),++L){}return N
},scanl:function(K,N,P,O){K=typeof K=="string"?K.split(""):K;
O=O||F.global;
N=I.lambda(N);
var Q=K.length,M=new Array(Q+1);
M[0]=P;
for(var L=0;
L<Q;
P=N.call(O,P,K[L],L,K),M[++L]=P){}return M
},scanl1:function(K,N,P,O){K=typeof K=="string"?K.split(""):K;
O=O||F.global;
N=I.lambda(N);
var Q=K.length,M=new Array(Q),P=K[0];
M[0]=P;
for(var L=1;
L<Q;
P=N.call(O,P,K[L],L,K),M[L++]=P){}return M
},foldr:function(K,M,O,N){K=typeof K=="string"?K.split(""):K;
N=N||F.global;
M=I.lambda(M);
for(var L=K.length;
L>0;
--L,O=M.call(N,O,K[L],L,K)){}return O
},foldr1:function(K,M,O){K=typeof K=="string"?K.split(""):K;
O=O||F.global;
M=I.lambda(M);
var P=K.length,N=K[P-1];
for(var L=P-1;
L>0;
--L,N=M.call(O,N,K[L],L,K)){}return N
},scanr:function(K,N,P,O){K=typeof K=="string"?K.split(""):K;
O=O||F.global;
N=I.lambda(N);
var Q=K.length,M=new Array(Q+1);
M[Q]=P;
for(var L=Q;
L>0;
--L,P=N.call(O,P,K[L],L,K),M[L]=P){}return M
},scanr1:function(K,N,P,O){K=typeof K=="string"?K.split(""):K;
O=O||F.global;
N=I.lambda(N);
var Q=K.length,M=new Array(Q),P=K[Q-1];
M[Q-1]=P;
for(var L=Q-1;
L>0;
--L,P=N.call(O,P,K[L],L,K),M[L]=P){}return M
},filter:function(K,O,P){K=typeof K=="string"?K.split(""):K;
P=P||F.global;
O=I.lambda(O);
var Q=K.length,N=[],L;
for(var M=0;
M<Q;
++M){L=K[M];
if(O.call(P,L,M,K)){N.push(L)
}}return N
},forEach:function(K,M,N){K=typeof K=="string"?K.split(""):K;
N=N||F.global;
M=I.lambda(M);
var O=K.length;
for(var L=0;
L<O;
M.call(N,K[L],L,K),++L){}},map:function(K,N,O){K=typeof K=="string"?K.split(""):K;
O=O||F.global;
N=I.lambda(N);
var P=K.length,M=new Array(P);
for(var L=0;
L<P;
M[L]=N.call(O,K[L],L,K),++L){}return M
},every:function(K,M,N){K=typeof K=="string"?K.split(""):K;
N=N||F.global;
M=I.lambda(M);
var O=K.length;
for(var L=0;
L<O;
++L){if(!M.call(N,K[L],L,K)){return false
}}return true
},some:function(K,M,N){K=typeof K=="string"?K.split(""):K;
N=N||F.global;
M=I.lambda(M);
var O=K.length;
for(var L=0;
L<O;
++L){if(M.call(N,K[L],L,K)){return true
}}return false
},reduce:function(K,L,M){return arguments.length<3?I.foldl1(K,L):I.foldl(K,L,M)
},reduceRight:function(K,L,M){return arguments.length<3?I.foldr1(K,L):I.foldr(K,L,M)
},curry:function(L,K){L=I.lambda(L);
K=typeof K=="number"?K:L.length;
return B({func:L,arity:K,args:[]})
},arg:{},partial:function(O){var K=arguments,L=new Array(K.length-1),P=[];
O=I.lambda(O);
for(var N=1;
N<K.length;
++N){var M=K[N];
L[N-1]=M;
if(M==I.arg){P.push(N-1)
}}return function(){var R=Array.prototype.slice.call(L,0);
for(var Q=0;
Q<P.length;
++Q){R[P[Q]]=arguments[Q]
}return O.apply(this,R)
}
},mixer:function(L,K){L=I.lambda(L);
return function(){var N=new Array(K.length);
for(var M=0;
M<K.length;
++M){N[M]=arguments[K[M]]
}return L.apply(this,N)
}
},flip:function(K){K=I.lambda(K);
return function(){var M=arguments,L=M.length-1,O=new Array(L+1),N;
for(N=0;
N<=L;
++N){O[L-N]=M[N]
}return K.apply(this,O)
}
},zip:function(){var P=arguments[0].length,K=arguments.length,N;
for(N=1;
N<K;
P=Math.min(P,arguments[N++].length)){}var M=new Array(P),L;
for(N=0;
N<P;
++N){var O=new Array(K);
for(L=0;
L<K;
O[L]=arguments[L][N],++L){}M[N]=O
}return M
},unzip:function(K){return I.zip.apply(null,K)
},constFun:function(K){return function(){return K
}
},invoke:function(K){return function(L){return L[K].apply(L,Array.prototype.slice.call(arguments,1))
}
},pluck:function(K){return function(L){return L[K]
}
},forIn:function(M,L,N){N=N||F.global;
L=I.lambda(L);
for(var K in M){if(K in C){continue
}L.call(N,M[K],K,M)
}},forEachReversed:function(K,M,N){K=typeof K=="string"?K.split(""):K;
N=N||F.global;
M=I.lambda(M);
for(var L=K.length-1;
L>=0;
M.call(N,K[L],L,K),--L){}}});
dojo.declare("dojox.lang.functional.MaybeMonad",null,{constructor:function(K){if(arguments.length){this.value=K
}},bind:function(L,K,M){if(!("value" in L)){return new this.constructor()
}M=M||F.global;
K=I.lambda(K);
return K.call(M,L.value)
},isNothing:function(){return !("value" in this)
}});
I.MaybeMonad.returnMonad=function(K){return new I.MaybeMonad(K)
};
I.MaybeMonad.zero=new I.MaybeMonad()
})()
};