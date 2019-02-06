dojo._xdResourceLoaded({depends:[["provide","dojox.uuid.generateTimeBasedUuid"]],defineResource:function(A){if(!A._hasResource["dojox.uuid.generateTimeBasedUuid"]){A._hasResource["dojox.uuid.generateTimeBasedUuid"]=true;
A.provide("dojox.uuid.generateTimeBasedUuid");
dojox.uuid.generateTimeBasedUuid=function(C){var B=dojox.uuid.generateTimeBasedUuid._generator.generateUuidString(C);
return B
};
dojox.uuid.generateTimeBasedUuid.isValidNode=function(E){var B=16;
var C=parseInt(E,B);
var D=A.isString(E)&&E.length==12&&isFinite(C);
return D
};
dojox.uuid.generateTimeBasedUuid.setNode=function(B){dojox.uuid.assert((B===null)||this.isValidNode(B));
this._uniformNode=B
};
dojox.uuid.generateTimeBasedUuid.getNode=function(){return this._uniformNode
};
dojox.uuid.generateTimeBasedUuid._generator=new function(){this.GREGORIAN_CHANGE_OFFSET_IN_HOURS=3394248;
var B=null;
var J=null;
var K=null;
var F=0;
var E=null;
var C=null;
var N=16;
function M(O){O[2]+=O[3]>>>16;
O[3]&=65535;
O[1]+=O[2]>>>16;
O[2]&=65535;
O[0]+=O[1]>>>16;
O[1]&=65535;
dojox.uuid.assert((O[0]>>>16)===0)
}function G(P){var O=new Array(0,0,0,0);
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
}function I(Q,P){dojox.uuid.assert(A.isArray(Q));
dojox.uuid.assert(A.isArray(P));
dojox.uuid.assert(Q.length==4);
dojox.uuid.assert(P.length==4);
var O=new Array(0,0,0,0);
O[3]=Q[3]+P[3];
O[2]=Q[2]+P[2];
O[1]=Q[1]+P[1];
O[0]=Q[0]+P[0];
M(O);
return O
}function H(Q,P){dojox.uuid.assert(A.isArray(Q));
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
M(O);
O[0]+=Q[1]*P[2];
M(O);
O[0]+=Q[2]*P[1];
M(O);
O[0]+=Q[3]*P[0];
M(O);
O[1]+=Q[1]*P[3];
M(O);
O[1]+=Q[2]*P[2];
M(O);
O[1]+=Q[3]*P[1];
M(O);
O[2]+=Q[2]*P[3];
M(O);
O[2]+=Q[3]*P[2];
M(O);
O[3]+=Q[3]*P[3];
M(O);
return O
}function L(P,O){while(P.length<O){P="0"+P
}return P
}function D(){var P=Math.floor((Math.random()%1)*Math.pow(2,32));
var O=P.toString(N);
while(O.length<8){O="0"+O
}return O
}this.generateUuidString=function(g){if(g){dojox.uuid.assert(dojox.uuid.generateTimeBasedUuid.isValidNode(g))
}else{if(dojox.uuid.generateTimeBasedUuid._uniformNode){g=dojox.uuid.generateTimeBasedUuid._uniformNode
}else{if(!B){var c=32768;
var i=Math.floor((Math.random()%1)*Math.pow(2,15));
var T=(c|i).toString(N);
B=T+D()
}g=B
}}if(!J){var R=32768;
var W=Math.floor((Math.random()%1)*Math.pow(2,14));
J=(R|W).toString(N)
}var O=new Date();
var l=O.valueOf();
var e=G(l);
if(!E){var Y=G(60*60);
var h=G(dojox.uuid.generateTimeBasedUuid._generator.GREGORIAN_CHANGE_OFFSET_IN_HOURS);
var j=H(h,Y);
var d=G(1000);
E=H(j,d);
C=G(10000)
}var b=e;
var U=I(E,b);
var a=H(U,C);
if(O.valueOf()==K){a[3]+=F;
M(a);
F+=1;
if(F==10000){while(O.valueOf()==K){O=new Date()
}}}else{K=O.valueOf();
F=1
}var S=a[2].toString(N);
var P=a[3].toString(N);
var f=L(S,4)+L(P,4);
var Z=a[1].toString(N);
Z=L(Z,4);
var V=a[0].toString(N);
V=L(V,3);
var X="-";
var Q="1";
var k=f+X+Z+X+Q+V+X+J+X+g;
k=k.toLowerCase();
return k
}
}()
}}});