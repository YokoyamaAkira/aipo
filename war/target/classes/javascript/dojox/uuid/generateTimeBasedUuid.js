if(!dojo._hasResource["dojox.uuid.generateTimeBasedUuid"]){dojo._hasResource["dojox.uuid.generateTimeBasedUuid"]=true;
dojo.provide("dojox.uuid.generateTimeBasedUuid");
dojox.uuid.generateTimeBasedUuid=function(B){var A=dojox.uuid.generateTimeBasedUuid._generator.generateUuidString(B);
return A
};
dojox.uuid.generateTimeBasedUuid.isValidNode=function(B){var C=16;
var D=parseInt(B,C);
var A=dojo.isString(B)&&B.length==12&&isFinite(D);
return A
};
dojox.uuid.generateTimeBasedUuid.setNode=function(A){dojox.uuid.assert((A===null)||this.isValidNode(A));
this._uniformNode=A
};
dojox.uuid.generateTimeBasedUuid.getNode=function(){return this._uniformNode
};
dojox.uuid.generateTimeBasedUuid._generator=new function(){this.GREGORIAN_CHANGE_OFFSET_IN_HOURS=3394248;
var M=null;
var G=null;
var H=null;
var C=0;
var B=null;
var A=null;
var K=16;
function J(N){N[2]+=N[3]>>>16;
N[3]&=65535;
N[1]+=N[2]>>>16;
N[2]&=65535;
N[0]+=N[1]>>>16;
N[1]&=65535;
dojox.uuid.assert((N[0]>>>16)===0)
}function D(N){var O=new Array(0,0,0,0);
O[3]=N%65536;
N-=O[3];
N/=65536;
O[2]=N%65536;
N-=O[2];
N/=65536;
O[1]=N%65536;
N-=O[1];
N/=65536;
O[0]=N;
return O
}function F(N,P){dojox.uuid.assert(dojo.isArray(N));
dojox.uuid.assert(dojo.isArray(P));
dojox.uuid.assert(N.length==4);
dojox.uuid.assert(P.length==4);
var O=new Array(0,0,0,0);
O[3]=N[3]+P[3];
O[2]=N[2]+P[2];
O[1]=N[1]+P[1];
O[0]=N[0]+P[0];
J(O);
return O
}function E(Q,P){dojox.uuid.assert(dojo.isArray(Q));
dojox.uuid.assert(dojo.isArray(P));
dojox.uuid.assert(Q.length==4);
dojox.uuid.assert(P.length==4);
var N=false;
if(Q[0]*P[0]!==0){N=true
}if(Q[0]*P[1]!==0){N=true
}if(Q[0]*P[2]!==0){N=true
}if(Q[1]*P[0]!==0){N=true
}if(Q[1]*P[1]!==0){N=true
}if(Q[2]*P[0]!==0){N=true
}dojox.uuid.assert(!N);
var O=new Array(0,0,0,0);
O[0]+=Q[0]*P[3];
J(O);
O[0]+=Q[1]*P[2];
J(O);
O[0]+=Q[2]*P[1];
J(O);
O[0]+=Q[3]*P[0];
J(O);
O[1]+=Q[1]*P[3];
J(O);
O[1]+=Q[2]*P[2];
J(O);
O[1]+=Q[3]*P[1];
J(O);
O[2]+=Q[2]*P[3];
J(O);
O[2]+=Q[3]*P[2];
J(O);
O[3]+=Q[3]*P[3];
J(O);
return O
}function I(N,O){while(N.length<O){N="0"+N
}return N
}function L(){var N=Math.floor((Math.random()%1)*Math.pow(2,32));
var O=N.toString(K);
while(O.length<8){O="0"+O
}return O
}this.generateUuidString=function(e){if(e){dojox.uuid.assert(dojox.uuid.generateTimeBasedUuid.isValidNode(e))
}else{if(dojox.uuid.generateTimeBasedUuid._uniformNode){e=dojox.uuid.generateTimeBasedUuid._uniformNode
}else{if(!M){var Z=32768;
var h=Math.floor((Math.random()%1)*Math.pow(2,15));
var S=(Z|h).toString(K);
M=S+L()
}e=M
}}if(!G){var Q=32768;
var U=Math.floor((Math.random()%1)*Math.pow(2,14));
G=(Q|U).toString(K)
}var N=new Date();
var k=N.valueOf();
var b=D(k);
if(!B){var W=D(60*60);
var g=D(dojox.uuid.generateTimeBasedUuid._generator.GREGORIAN_CHANGE_OFFSET_IN_HOURS);
var i=E(g,W);
var c=D(1000);
B=E(i,c);
A=D(10000)
}var a=b;
var f=F(B,a);
var Y=E(f,A);
if(N.valueOf()==H){Y[3]+=C;
J(Y);
C+=1;
if(C==10000){while(N.valueOf()==H){N=new Date()
}}}else{H=N.valueOf();
C=1
}var R=Y[2].toString(K);
var O=Y[3].toString(K);
var d=I(R,4)+I(O,4);
var X=Y[1].toString(K);
X=I(X,4);
var T=Y[0].toString(K);
T=I(T,3);
var V="-";
var P="1";
var j=d+V+X+V+P+T+V+G+V+e;
j=j.toLowerCase();
return j
}
}()
};