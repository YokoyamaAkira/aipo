if(!dojo._hasResource["dojox.uuid.generateTimeBasedUuid"]){dojo._hasResource["dojox.uuid.generateTimeBasedUuid"]=true;
dojo.provide("dojox.uuid.generateTimeBasedUuid");
dojox.uuid.generateTimeBasedUuid=function(A){var B=dojox.uuid.generateTimeBasedUuid._generator.generateUuidString(A);
return B
};
dojox.uuid.generateTimeBasedUuid.isValidNode=function(C){var D=16;
var A=parseInt(C,D);
var B=dojo.isString(C)&&C.length==12&&isFinite(A);
return B
};
dojox.uuid.generateTimeBasedUuid.setNode=function(A){dojox.uuid.assert((A===null)||this.isValidNode(A));
this._uniformNode=A
};
dojox.uuid.generateTimeBasedUuid.getNode=function(){return this._uniformNode
};
dojox.uuid.generateTimeBasedUuid._generator=new function(){this.GREGORIAN_CHANGE_OFFSET_IN_HOURS=3394248;
var D=null;
var K=null;
var L=null;
var G=0;
var F=null;
var E=null;
var B=16;
function A(N){N[2]+=N[3]>>>16;
N[3]&=65535;
N[1]+=N[2]>>>16;
N[2]&=65535;
N[0]+=N[1]>>>16;
N[1]&=65535;
dojox.uuid.assert((N[0]>>>16)===0)
}function H(O){var N=new Array(0,0,0,0);
N[3]=O%65536;
O-=N[3];
O/=65536;
N[2]=O%65536;
O-=N[2];
O/=65536;
N[1]=O%65536;
O-=N[1];
O/=65536;
N[0]=O;
return N
}function J(P,O){dojox.uuid.assert(dojo.isArray(P));
dojox.uuid.assert(dojo.isArray(O));
dojox.uuid.assert(P.length==4);
dojox.uuid.assert(O.length==4);
var N=new Array(0,0,0,0);
N[3]=P[3]+O[3];
N[2]=P[2]+O[2];
N[1]=P[1]+O[1];
N[0]=P[0]+O[0];
A(N);
return N
}function I(P,O){dojox.uuid.assert(dojo.isArray(P));
dojox.uuid.assert(dojo.isArray(O));
dojox.uuid.assert(P.length==4);
dojox.uuid.assert(O.length==4);
var Q=false;
if(P[0]*O[0]!==0){Q=true
}if(P[0]*O[1]!==0){Q=true
}if(P[0]*O[2]!==0){Q=true
}if(P[1]*O[0]!==0){Q=true
}if(P[1]*O[1]!==0){Q=true
}if(P[2]*O[0]!==0){Q=true
}dojox.uuid.assert(!Q);
var N=new Array(0,0,0,0);
N[0]+=P[0]*O[3];
A(N);
N[0]+=P[1]*O[2];
A(N);
N[0]+=P[2]*O[1];
A(N);
N[0]+=P[3]*O[0];
A(N);
N[1]+=P[1]*O[3];
A(N);
N[1]+=P[2]*O[2];
A(N);
N[1]+=P[3]*O[1];
A(N);
N[2]+=P[2]*O[3];
A(N);
N[2]+=P[3]*O[2];
A(N);
N[3]+=P[3]*O[3];
A(N);
return N
}function M(O,N){while(O.length<N){O="0"+O
}return O
}function C(){var O=Math.floor((Math.random()%1)*Math.pow(2,32));
var N=O.toString(B);
while(N.length<8){N="0"+N
}return N
}this.generateUuidString=function(f){if(f){dojox.uuid.assert(dojox.uuid.generateTimeBasedUuid.isValidNode(f))
}else{if(dojox.uuid.generateTimeBasedUuid._uniformNode){f=dojox.uuid.generateTimeBasedUuid._uniformNode
}else{if(!D){var d=32768;
var h=Math.floor((Math.random()%1)*Math.pow(2,15));
var S=(d|h).toString(B);
D=S+C()
}f=D
}}if(!K){var Q=32768;
var T=Math.floor((Math.random()%1)*Math.pow(2,14));
K=(Q|T).toString(B)
}var N=new Date();
var k=N.valueOf();
var X=H(k);
if(!F){var U=H(60*60);
var g=H(dojox.uuid.generateTimeBasedUuid._generator.GREGORIAN_CHANGE_OFFSET_IN_HOURS);
var i=I(g,U);
var e=H(1000);
F=I(i,e);
E=H(10000)
}var W=X;
var Z=J(F,W);
var c=I(Z,E);
if(N.valueOf()==L){c[3]+=G;
A(c);
G+=1;
if(G==10000){while(N.valueOf()==L){N=new Date()
}}}else{L=N.valueOf();
G=1
}var R=c[2].toString(B);
var O=c[3].toString(B);
var Y=M(R,4)+M(O,4);
var V=c[1].toString(B);
V=M(V,4);
var a=c[0].toString(B);
a=M(a,3);
var b="-";
var P="1";
var j=Y+b+V+b+P+a+b+K+b+f;
j=j.toLowerCase();
return j
}
}()
};