dojo._xdResourceLoaded({depends:[["provide","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.lang.functional"]){A._hasResource["dojox.lang.functional"]=true;
A.provide("dojox.lang.functional");
(function(){var G=A,J=dojox.lang.functional,I=/\bfor\b|\bif\b/gm,D={};
var H="ab".split(/a*/).length>1?String.prototype.split:function(M){var N=this.split.call(this,M),L=M.exec(this);
if(L&&L.index==0){N.unshift("")
}return N
};
var E=function(O){var M=[],R=H.call(O,/\s*->\s*/m);
if(R.length>1){while(R.length){O=R.pop();
M=R.pop().split(/\s*,\s*|\s+/m);
if(R.length){R.push("(function("+M+"){return ("+O+")})")
}}}else{if(O.match(/\b_\b/)){M=["_"]
}else{var L=O.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/m),P=O.match(/[+\-*\/%&|\^\.=<>!]\s*$/m);
if(L||P){if(L){M.push("$1");
O="$1"+O
}if(P){M.push("$2");
O=O+"$2"
}}else{var Q=O.replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*:|this|true|false|null|undefined|typeof|instanceof|in|delete|new|void|arguments|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|dojo|dijit|dojox|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,"").match(/([a-z_$][a-z_$\d]*)/gi)||[];
var N={};
G.forEach(Q,function(S){if(!(S in N)){M.push(S);
N[S]=1
}})
}}}return{args:M,body:"return ("+O+");"}
};
var B=function(Q){var S=Q.split(I),M=Q.match(I),P=["var r = [];"],N=[];
for(var O=0;
O<M.length;
){var L=M[O],R=S[++O];
if(L=="for"&&!/^\s*\(\s*(;|var)/.test(R)){R=R.replace(/^\s*\(/,"(var ")
}P.push(L,R,"{");
N.push("}")
}return P.join("")+"r.push("+S[0]+");"+N.join("")+"return r;"
};
var C=function(L){return function(){if(arguments.length+L.args.length<L.arity){return C({func:L.func,arity:L.arity,args:Array.prototype.concat.apply(L.args,arguments)})
}return L.func.apply(this,Array.prototype.concat.apply(L.args,arguments))
}
};
var F=function(L){return L
};
var K=function(L){return L.length?function(){var N=L.length-1,M=J.lambda(L[N]).apply(this,arguments);
for(--N;
N>=0;
--N){M=J.lambda(L[N]).call(this,M)
}return M
}:F
};
G.mixin(J,{buildLambda:function(L){L=E(L);
return"function("+L.args.join(",")+"){"+L.body+"}"
},lambda:function(L){if(typeof L=="function"){return L
}if(L instanceof Array){return K(L)
}L=E(L);
return new Function(L.args,L.body)
},repeat:function(Q,N,P,O){O=O||G.global;
N=J.lambda(N);
var M=new Array(Q);
M[0]=P;
for(var L=1;
L<Q;
M[L]=P=N.call(O,P),++L){}return M
},until:function(P,M,O,N){N=N||G.global;
M=J.lambda(M);
P=J.lambda(P);
var L=[];
for(;
!P.call(N,O);
L.push(O),O=M.call(N,O)){}return L
},buildListcomp:function(L){return"function(){"+B(L)+"}"
},compileListcomp:function(L){return new Function([],B(L))
},listcomp:function(L){return(new Function([],B(L)))()
},foldl:function(L,N,P,O){L=typeof L=="string"?L.split(""):L;
O=O||G.global;
N=J.lambda(N);
for(var M=0;
M<L.length;
P=N.call(O,P,L[M],M,L),++M){}return P
},foldl1:function(L,N,P){L=typeof L=="string"?L.split(""):L;
P=P||G.global;
N=J.lambda(N);
var O=L[0];
for(var M=1;
M<L.length;
O=N.call(P,O,L[M],M,L),++M){}return O
},scanl:function(L,O,Q,P){L=typeof L=="string"?L.split(""):L;
P=P||G.global;
O=J.lambda(O);
var R=L.length,N=new Array(R+1);
N[0]=Q;
for(var M=0;
M<R;
Q=O.call(P,Q,L[M],M,L),N[++M]=Q){}return N
},scanl1:function(L,O,Q,P){L=typeof L=="string"?L.split(""):L;
P=P||G.global;
O=J.lambda(O);
var R=L.length,N=new Array(R),Q=L[0];
N[0]=Q;
for(var M=1;
M<R;
Q=O.call(P,Q,L[M],M,L),N[M++]=Q){}return N
},foldr:function(L,N,P,O){L=typeof L=="string"?L.split(""):L;
O=O||G.global;
N=J.lambda(N);
for(var M=L.length;
M>0;
--M,P=N.call(O,P,L[M],M,L)){}return P
},foldr1:function(L,N,P){L=typeof L=="string"?L.split(""):L;
P=P||G.global;
N=J.lambda(N);
var Q=L.length,O=L[Q-1];
for(var M=Q-1;
M>0;
--M,O=N.call(P,O,L[M],M,L)){}return O
},scanr:function(L,O,Q,P){L=typeof L=="string"?L.split(""):L;
P=P||G.global;
O=J.lambda(O);
var R=L.length,N=new Array(R+1);
N[R]=Q;
for(var M=R;
M>0;
--M,Q=O.call(P,Q,L[M],M,L),N[M]=Q){}return N
},scanr1:function(L,O,Q,P){L=typeof L=="string"?L.split(""):L;
P=P||G.global;
O=J.lambda(O);
var R=L.length,N=new Array(R),Q=L[R-1];
N[R-1]=Q;
for(var M=R-1;
M>0;
--M,Q=O.call(P,Q,L[M],M,L),N[M]=Q){}return N
},filter:function(L,P,Q){L=typeof L=="string"?L.split(""):L;
Q=Q||G.global;
P=J.lambda(P);
var R=L.length,O=[],M;
for(var N=0;
N<R;
++N){M=L[N];
if(P.call(Q,M,N,L)){O.push(M)
}}return O
},forEach:function(L,N,O){L=typeof L=="string"?L.split(""):L;
O=O||G.global;
N=J.lambda(N);
var P=L.length;
for(var M=0;
M<P;
N.call(O,L[M],M,L),++M){}},map:function(L,O,P){L=typeof L=="string"?L.split(""):L;
P=P||G.global;
O=J.lambda(O);
var Q=L.length,N=new Array(Q);
for(var M=0;
M<Q;
N[M]=O.call(P,L[M],M,L),++M){}return N
},every:function(L,N,O){L=typeof L=="string"?L.split(""):L;
O=O||G.global;
N=J.lambda(N);
var P=L.length;
for(var M=0;
M<P;
++M){if(!N.call(O,L[M],M,L)){return false
}}return true
},some:function(L,N,O){L=typeof L=="string"?L.split(""):L;
O=O||G.global;
N=J.lambda(N);
var P=L.length;
for(var M=0;
M<P;
++M){if(N.call(O,L[M],M,L)){return true
}}return false
},reduce:function(L,M,N){return arguments.length<3?J.foldl1(L,M):J.foldl(L,M,N)
},reduceRight:function(L,M,N){return arguments.length<3?J.foldr1(L,M):J.foldr(L,M,N)
},curry:function(M,L){M=J.lambda(M);
L=typeof L=="number"?L:M.length;
return C({func:M,arity:L,args:[]})
},arg:{},partial:function(P){var L=arguments,M=new Array(L.length-1),Q=[];
P=J.lambda(P);
for(var O=1;
O<L.length;
++O){var N=L[O];
M[O-1]=N;
if(N==J.arg){Q.push(O-1)
}}return function(){var S=Array.prototype.slice.call(M,0);
for(var R=0;
R<Q.length;
++R){S[Q[R]]=arguments[R]
}return P.apply(this,S)
}
},mixer:function(M,L){M=J.lambda(M);
return function(){var O=new Array(L.length);
for(var N=0;
N<L.length;
++N){O[N]=arguments[L[N]]
}return M.apply(this,O)
}
},flip:function(L){L=J.lambda(L);
return function(){var N=arguments,M=N.length-1,P=new Array(M+1),O;
for(O=0;
O<=M;
++O){P[M-O]=N[O]
}return L.apply(this,P)
}
},zip:function(){var Q=arguments[0].length,L=arguments.length,O;
for(O=1;
O<L;
Q=Math.min(Q,arguments[O++].length)){}var N=new Array(Q),M;
for(O=0;
O<Q;
++O){var P=new Array(L);
for(M=0;
M<L;
P[M]=arguments[M][O],++M){}N[O]=P
}return N
},unzip:function(L){return J.zip.apply(null,L)
},constFun:function(L){return function(){return L
}
},invoke:function(L){return function(M){return M[L].apply(M,Array.prototype.slice.call(arguments,1))
}
},pluck:function(L){return function(M){return M[L]
}
},forIn:function(N,M,O){O=O||G.global;
M=J.lambda(M);
for(var L in N){if(L in D){continue
}M.call(O,N[L],L,N)
}},forEachReversed:function(L,N,O){L=typeof L=="string"?L.split(""):L;
O=O||G.global;
N=J.lambda(N);
for(var M=L.length-1;
M>=0;
N.call(O,L[M],M,L),--M){}}});
A.declare("dojox.lang.functional.MaybeMonad",null,{constructor:function(L){if(arguments.length){this.value=L
}},bind:function(M,L,N){if(!("value" in M)){return new this.constructor()
}N=N||G.global;
L=J.lambda(L);
return L.call(N,M.value)
},isNothing:function(){return !("value" in this)
}});
J.MaybeMonad.returnMonad=function(L){return new J.MaybeMonad(L)
};
J.MaybeMonad.zero=new J.MaybeMonad()
})()
}}});