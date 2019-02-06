dojo._xdResourceLoaded({depends:[["provide","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.lang.functional"]){A._hasResource["dojox.lang.functional"]=true;
A.provide("dojox.lang.functional");
(function(){var E=A,H=dojox.lang.functional,G=/\bfor\b|\bif\b/gm,B={};
var F="ab".split(/a*/).length>1?String.prototype.split:function(L){var M=this.split.call(this,L),N=L.exec(this);
if(N&&N.index==0){M.unshift("")
}return M
};
var C=function(N){var L=[],Q=F.call(N,/\s*->\s*/m);
if(Q.length>1){while(Q.length){N=Q.pop();
L=Q.pop().split(/\s*,\s*|\s+/m);
if(Q.length){Q.push("(function("+L+"){return ("+N+")})")
}}}else{if(N.match(/\b_\b/)){L=["_"]
}else{var R=N.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/m),O=N.match(/[+\-*\/%&|\^\.=<>!]\s*$/m);
if(R||O){if(R){L.push("$1");
N="$1"+N
}if(O){L.push("$2");
N=N+"$2"
}}else{var P=N.replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*:|this|true|false|null|undefined|typeof|instanceof|in|delete|new|void|arguments|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|dojo|dijit|dojox|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,"").match(/([a-z_$][a-z_$\d]*)/gi)||[];
var M={};
E.forEach(P,function(S){if(!(S in M)){L.push(S);
M[S]=1
}})
}}}return{args:L,body:"return ("+N+");"}
};
var J=function(P){var R=P.split(G),L=P.match(G),O=["var r = [];"],M=[];
for(var N=0;
N<L.length;
){var S=L[N],Q=R[++N];
if(S=="for"&&!/^\s*\(\s*(;|var)/.test(Q)){Q=Q.replace(/^\s*\(/,"(var ")
}O.push(S,Q,"{");
M.push("}")
}return O.join("")+"r.push("+R[0]+");"+M.join("")+"return r;"
};
var K=function(L){return function(){if(arguments.length+L.args.length<L.arity){return K({func:L.func,arity:L.arity,args:Array.prototype.concat.apply(L.args,arguments)})
}return L.func.apply(this,Array.prototype.concat.apply(L.args,arguments))
}
};
var D=function(L){return L
};
var I=function(L){return L.length?function(){var N=L.length-1,M=H.lambda(L[N]).apply(this,arguments);
for(--N;
N>=0;
--N){M=H.lambda(L[N]).call(this,M)
}return M
}:D
};
E.mixin(H,{buildLambda:function(L){L=C(L);
return"function("+L.args.join(",")+"){"+L.body+"}"
},lambda:function(L){if(typeof L=="function"){return L
}if(L instanceof Array){return I(L)
}L=C(L);
return new Function(L.args,L.body)
},repeat:function(P,M,O,N){N=N||E.global;
M=H.lambda(M);
var L=new Array(P);
L[0]=O;
for(var Q=1;
Q<P;
L[Q]=O=M.call(N,O),++Q){}return L
},until:function(O,L,N,M){M=M||E.global;
L=H.lambda(L);
O=H.lambda(O);
var P=[];
for(;
!O.call(M,N);
P.push(N),N=L.call(M,N)){}return P
},buildListcomp:function(L){return"function(){"+J(L)+"}"
},compileListcomp:function(L){return new Function([],J(L))
},listcomp:function(L){return(new Function([],J(L)))()
},foldl:function(P,M,O,N){P=typeof P=="string"?P.split(""):P;
N=N||E.global;
M=H.lambda(M);
for(var L=0;
L<P.length;
O=M.call(N,O,P[L],L,P),++L){}return O
},foldl1:function(P,M,O){P=typeof P=="string"?P.split(""):P;
O=O||E.global;
M=H.lambda(M);
var N=P[0];
for(var L=1;
L<P.length;
N=M.call(O,N,P[L],L,P),++L){}return N
},scanl:function(R,N,P,O){R=typeof R=="string"?R.split(""):R;
O=O||E.global;
N=H.lambda(N);
var Q=R.length,M=new Array(Q+1);
M[0]=P;
for(var L=0;
L<Q;
P=N.call(O,P,R[L],L,R),M[++L]=P){}return M
},scanl1:function(R,N,P,O){R=typeof R=="string"?R.split(""):R;
O=O||E.global;
N=H.lambda(N);
var Q=R.length,M=new Array(Q),P=R[0];
M[0]=P;
for(var L=1;
L<Q;
P=N.call(O,P,R[L],L,R),M[L++]=P){}return M
},foldr:function(P,M,O,N){P=typeof P=="string"?P.split(""):P;
N=N||E.global;
M=H.lambda(M);
for(var L=P.length;
L>0;
--L,O=M.call(N,O,P[L],L,P)){}return O
},foldr1:function(Q,M,O){Q=typeof Q=="string"?Q.split(""):Q;
O=O||E.global;
M=H.lambda(M);
var P=Q.length,N=Q[P-1];
for(var L=P-1;
L>0;
--L,N=M.call(O,N,Q[L],L,Q)){}return N
},scanr:function(R,N,P,O){R=typeof R=="string"?R.split(""):R;
O=O||E.global;
N=H.lambda(N);
var Q=R.length,M=new Array(Q+1);
M[Q]=P;
for(var L=Q;
L>0;
--L,P=N.call(O,P,R[L],L,R),M[L]=P){}return M
},scanr1:function(R,N,P,O){R=typeof R=="string"?R.split(""):R;
O=O||E.global;
N=H.lambda(N);
var Q=R.length,M=new Array(Q),P=R[Q-1];
M[Q-1]=P;
for(var L=Q-1;
L>0;
--L,P=N.call(O,P,R[L],L,R),M[L]=P){}return M
},filter:function(R,O,P){R=typeof R=="string"?R.split(""):R;
P=P||E.global;
O=H.lambda(O);
var Q=R.length,N=[],L;
for(var M=0;
M<Q;
++M){L=R[M];
if(O.call(P,L,M,R)){N.push(L)
}}return N
},forEach:function(P,M,N){P=typeof P=="string"?P.split(""):P;
N=N||E.global;
M=H.lambda(M);
var O=P.length;
for(var L=0;
L<O;
M.call(N,P[L],L,P),++L){}},map:function(Q,N,O){Q=typeof Q=="string"?Q.split(""):Q;
O=O||E.global;
N=H.lambda(N);
var P=Q.length,M=new Array(P);
for(var L=0;
L<P;
M[L]=N.call(O,Q[L],L,Q),++L){}return M
},every:function(P,M,N){P=typeof P=="string"?P.split(""):P;
N=N||E.global;
M=H.lambda(M);
var O=P.length;
for(var L=0;
L<O;
++L){if(!M.call(N,P[L],L,P)){return false
}}return true
},some:function(P,M,N){P=typeof P=="string"?P.split(""):P;
N=N||E.global;
M=H.lambda(M);
var O=P.length;
for(var L=0;
L<O;
++L){if(M.call(N,P[L],L,P)){return true
}}return false
},reduce:function(N,L,M){return arguments.length<3?H.foldl1(N,L):H.foldl(N,L,M)
},reduceRight:function(N,L,M){return arguments.length<3?H.foldr1(N,L):H.foldr(N,L,M)
},curry:function(L,M){L=H.lambda(L);
M=typeof M=="number"?M:L.length;
return K({func:L,arity:M,args:[]})
},arg:{},partial:function(O){var Q=arguments,L=new Array(Q.length-1),P=[];
O=H.lambda(O);
for(var N=1;
N<Q.length;
++N){var M=Q[N];
L[N-1]=M;
if(M==H.arg){P.push(N-1)
}}return function(){var S=Array.prototype.slice.call(L,0);
for(var R=0;
R<P.length;
++R){S[P[R]]=arguments[R]
}return O.apply(this,S)
}
},mixer:function(L,M){L=H.lambda(L);
return function(){var O=new Array(M.length);
for(var N=0;
N<M.length;
++N){O[N]=arguments[M[N]]
}return L.apply(this,O)
}
},flip:function(L){L=H.lambda(L);
return function(){var N=arguments,M=N.length-1,P=new Array(M+1),O;
for(O=0;
O<=M;
++O){P[M-O]=N[O]
}return L.apply(this,P)
}
},zip:function(){var P=arguments[0].length,Q=arguments.length,N;
for(N=1;
N<Q;
P=Math.min(P,arguments[N++].length)){}var M=new Array(P),L;
for(N=0;
N<P;
++N){var O=new Array(Q);
for(L=0;
L<Q;
O[L]=arguments[L][N],++L){}M[N]=O
}return M
},unzip:function(L){return H.zip.apply(null,L)
},constFun:function(L){return function(){return L
}
},invoke:function(L){return function(M){return M[L].apply(M,Array.prototype.slice.call(arguments,1))
}
},pluck:function(L){return function(M){return M[L]
}
},forIn:function(M,L,N){N=N||E.global;
L=H.lambda(L);
for(var O in M){if(O in B){continue
}L.call(N,M[O],O,M)
}},forEachReversed:function(O,M,N){O=typeof O=="string"?O.split(""):O;
N=N||E.global;
M=H.lambda(M);
for(var L=O.length-1;
L>=0;
M.call(N,O[L],L,O),--L){}}});
A.declare("dojox.lang.functional.MaybeMonad",null,{constructor:function(L){if(arguments.length){this.value=L
}},bind:function(L,N,M){if(!("value" in L)){return new this.constructor()
}M=M||E.global;
N=H.lambda(N);
return N.call(M,L.value)
},isNothing:function(){return !("value" in this)
}});
H.MaybeMonad.returnMonad=function(L){return new H.MaybeMonad(L)
};
H.MaybeMonad.zero=new H.MaybeMonad()
})()
}}});