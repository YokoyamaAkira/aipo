dojo._xdResourceLoaded({depends:[["provide","dojox.uuid.generateTimeBasedUuid"]],defineResource:function(A){if(!A._hasResource["dojox.uuid.generateTimeBasedUuid"]){A._hasResource["dojox.uuid.generateTimeBasedUuid"]=true;
A.provide("dojox.uuid.generateTimeBasedUuid");
dojox.uuid.generateTimeBasedUuid=function(B){var C=dojox.uuid.generateTimeBasedUuid._generator.generateUuidString(B);
return C
};
dojox.uuid.generateTimeBasedUuid.isValidNode=function(D){var E=16;
var B=parseInt(D,E);
var C=A.isString(D)&&D.length==12&&isFinite(B);
return C
};
dojox.uuid.generateTimeBasedUuid.setNode=function(B){dojox.uuid.assert((B===null)||this.isValidNode(B));
this._uniformNode=B
};
dojox.uuid.generateTimeBasedUuid.getNode=function(){return this._uniformNode
};
dojox.uuid.generateTimeBasedUuid._generator=new function(){this.GREGORIAN_CHANGE_OFFSET_IN_HOURS=3394248;
var E=null;
var L=null;
var M=null;
var H=0;
var G=null;
var F=null;
var C=16;
function B(O){O[2]+=O[3]>>>16;
O[3]&=65535;
O[1]+=O[2]>>>16;
O[2]&=65535;
O[0]+=O[1]>>>16;
O[1]&=65535;
dojox.uuid.assert((O[0]>>>16)===0)
}function I(P){var O=new Array(0,0,0,0);
O[3]=P%65536;
P-=O[3];
P/=65536;
O[2]=P%65536;
P-=O[2];
P/=65536;
O[1]=P%65536;
P-=O[1];
P/=65536;
O[0]=P;
return O
}function K(Q,P){dojox.uuid.assert(A.isArray(Q));
dojox.uuid.assert(A.isArray(P));
dojox.uuid.assert(Q.length==4);
dojox.uuid.assert(P.length==4);
var O=new Array(0,0,0,0);
O[3]=Q[3]+P[3];
O[2]=Q[2]+P[2];
O[1]=Q[1]+P[1];
O[0]=Q[0]+P[0];
B(O);
return O
}function J(Q,P){dojox.uuid.assert(A.isArray(Q));
dojox.uuid.assert(A.isArray(P));
dojox.uuid.assert(Q.length==4);
dojox.uuid.assert(P.length==4);
var R=false;
if(Q[0]*P[0]!==0){R=true
}if(Q[0]*P[1]!==0){R=true
}if(Q[0]*P[2]!==0){R=true
}if(Q[1]*P[0]!==0){R=true
}if(Q[1]*P[1]!==0){R=true
}if(Q[2]*P[0]!==0){R=true
}dojox.uuid.assert(!R);
var O=new Array(0,0,0,0);
O[0]+=Q[0]*P[3];
B(O);
O[0]+=Q[1]*P[2];
B(O);
O[0]+=Q[2]*P[1];
B(O);
O[0]+=Q[3]*P[0];
B(O);
O[1]+=Q[1]*P[3];
B(O);
O[1]+=Q[2]*P[2];
B(O);
O[1]+=Q[3]*P[1];
B(O);
O[2]+=Q[2]*P[3];
B(O);
O[2]+=Q[3]*P[2];
B(O);
O[3]+=Q[3]*P[3];
B(O);
return O
}function N(P,O){while(P.length<O){P="0"+P
}return P
}function D(){var P=Math.floor((Math.random()%1)*Math.pow(2,32));
var O=P.toString(C);
while(O.length<8){O="0"+O
}return O
}this.generateUuidString=function(g){if(g){dojox.uuid.assert(dojox.uuid.generateTimeBasedUuid.isValidNode(g))
}else{if(dojox.uuid.generateTimeBasedUuid._uniformNode){g=dojox.uuid.generateTimeBasedUuid._uniformNode
}else{if(!E){var e=32768;
var i=Math.floor((Math.random()%1)*Math.pow(2,15));
var T=(e|i).toString(C);
E=T+D()
}g=E
}}if(!L){var R=32768;
var U=Math.floor((Math.random()%1)*Math.pow(2,14));
L=(R|U).toString(C)
}var O=new Date();
var l=O.valueOf();
var Y=I(l);
if(!G){var V=I(60*60);
var h=I(dojox.uuid.generateTimeBasedUuid._generator.GREGORIAN_CHANGE_OFFSET_IN_HOURS);
var j=J(h,V);
var f=I(1000);
G=J(j,f);
F=I(10000)
}var X=Y;
var a=K(G,X);
var d=J(a,F);
if(O.valueOf()==M){d[3]+=H;
B(d);
H+=1;
if(H==10000){while(O.valueOf()==M){O=new Date()
}}}else{M=O.valueOf();
H=1
}var S=d[2].toString(C);
var P=d[3].toString(C);
var Z=N(S,4)+N(P,4);
var W=d[1].toString(C);
W=N(W,4);
var b=d[0].toString(C);
b=N(b,3);
var c="-";
var Q="1";
var k=Z+c+W+c+Q+b+c+L+c+g;
k=k.toLowerCase();
return k
}
}()
}}});