if(!dojo._hasResource["dojox.uuid._base"]){dojo._hasResource["dojox.uuid._base"]=true;
dojo.provide("dojox.uuid._base");
dojox.uuid.NIL_UUID="00000000-0000-0000-0000-000000000000";
dojox.uuid.version={UNKNOWN:0,TIME_BASED:1,DCE_SECURITY:2,NAME_BASED_MD5:3,RANDOM:4,NAME_BASED_SHA1:5};
dojox.uuid.variant={NCS:"0",DCE:"10",MICROSOFT:"110",UNKNOWN:"111"};
dojox.uuid.assert=function(A,B){if(!A){if(!B){B="An assert statement failed.\nThe method dojox.uuid.assert() was called with a 'false' value.\n"
}throw new Error(B)
}};
dojox.uuid.generateNilUuid=function(){return dojox.uuid.NIL_UUID
};
dojox.uuid.isValid=function(C){C=C.toString();
var B=(dojo.isString(C)&&(C.length==36)&&(C==C.toLowerCase()));
if(B){var A=C.split("-");
B=((A.length==5)&&(A[0].length==8)&&(A[1].length==4)&&(A[2].length==4)&&(A[3].length==4)&&(A[4].length==12));
var D=16;
for(var G in A){var F=A[G];
var E=parseInt(F,D);
B=B&&isFinite(E)
}}return B
};
dojox.uuid.getVariant=function(D){if(!dojox.uuid._ourVariantLookupTable){var A=dojox.uuid.variant;
var B=[];
B[0]=A.NCS;
B[1]=A.NCS;
B[2]=A.NCS;
B[3]=A.NCS;
B[4]=A.NCS;
B[5]=A.NCS;
B[6]=A.NCS;
B[7]=A.NCS;
B[8]=A.DCE;
B[9]=A.DCE;
B[10]=A.DCE;
B[11]=A.DCE;
B[12]=A.MICROSOFT;
B[13]=A.MICROSOFT;
B[14]=A.UNKNOWN;
B[15]=A.UNKNOWN;
dojox.uuid._ourVariantLookupTable=B
}D=D.toString();
var C=D.charAt(19);
var E=16;
var F=parseInt(C,E);
dojox.uuid.assert((F>=0)&&(F<=16));
return dojox.uuid._ourVariantLookupTable[F]
};
dojox.uuid.getVersion=function(C){var E="dojox.uuid.getVersion() was not passed a DCE Variant UUID.";
dojox.uuid.assert(dojox.uuid.getVariant(C)==dojox.uuid.variant.DCE,E);
C=C.toString();
var B=C.charAt(14);
var D=16;
var A=parseInt(B,D);
return A
};
dojox.uuid.getNode=function(A){var D="dojox.uuid.getNode() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(A)==dojox.uuid.version.TIME_BASED,D);
A=A.toString();
var C=A.split("-");
var B=C[4];
return B
};
dojox.uuid.getTimestamp=function(P,V){var S="dojox.uuid.getTimestamp() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(P)==dojox.uuid.version.TIME_BASED,S);
P=P.toString();
if(!V){V=null
}switch(V){case"string":case String:return dojox.uuid.getTimestamp(P,Date).toUTCString();
break;
case"hex":var B=P.split("-");
var N=B[0];
var L=B[1];
var Q=B[2];
Q=Q.slice(1);
var I=Q+L+N;
dojox.uuid.assert(I.length==15);
return I;
break;
case null:case"date":case Date:var D=3394248;
var J=16;
var O=P.split("-");
var C=parseInt(O[0],J);
var U=parseInt(O[1],J);
var M=parseInt(O[2],J);
var R=M&4095;
R<<=16;
R+=U;
R*=4294967296;
R+=C;
var E=R/10000;
var F=60*60;
var H=D;
var T=H*F;
var G=T*1000;
var A=E-G;
var K=new Date(A);
return K;
break;
default:dojox.uuid.assert(false,"dojox.uuid.getTimestamp was not passed a valid returnType: "+V);
break
}}
};