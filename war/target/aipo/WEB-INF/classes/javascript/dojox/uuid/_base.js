if(!dojo._hasResource["dojox.uuid._base"]){dojo._hasResource["dojox.uuid._base"]=true;
dojo.provide("dojox.uuid._base");
dojox.uuid.NIL_UUID="00000000-0000-0000-0000-000000000000";
dojox.uuid.version={UNKNOWN:0,TIME_BASED:1,DCE_SECURITY:2,NAME_BASED_MD5:3,RANDOM:4,NAME_BASED_SHA1:5};
dojox.uuid.variant={NCS:"0",DCE:"10",MICROSOFT:"110",UNKNOWN:"111"};
dojox.uuid.assert=function(B,A){if(!B){if(!A){A="An assert statement failed.\nThe method dojox.uuid.assert() was called with a 'false' value.\n"
}throw new Error(A)
}};
dojox.uuid.generateNilUuid=function(){return dojox.uuid.NIL_UUID
};
dojox.uuid.isValid=function(F){F=F.toString();
var E=(dojo.isString(F)&&(F.length==36)&&(F==F.toLowerCase()));
if(E){var D=F.split("-");
E=((D.length==5)&&(D[0].length==8)&&(D[1].length==4)&&(D[2].length==4)&&(D[3].length==4)&&(D[4].length==12));
var G=16;
for(var C in D){var B=D[C];
var A=parseInt(B,G);
E=E&&isFinite(A)
}}return E
};
dojox.uuid.getVariant=function(E){if(!dojox.uuid._ourVariantLookupTable){var B=dojox.uuid.variant;
var C=[];
C[0]=B.NCS;
C[1]=B.NCS;
C[2]=B.NCS;
C[3]=B.NCS;
C[4]=B.NCS;
C[5]=B.NCS;
C[6]=B.NCS;
C[7]=B.NCS;
C[8]=B.DCE;
C[9]=B.DCE;
C[10]=B.DCE;
C[11]=B.DCE;
C[12]=B.MICROSOFT;
C[13]=B.MICROSOFT;
C[14]=B.UNKNOWN;
C[15]=B.UNKNOWN;
dojox.uuid._ourVariantLookupTable=C
}E=E.toString();
var D=E.charAt(19);
var F=16;
var A=parseInt(D,F);
dojox.uuid.assert((A>=0)&&(A<=16));
return dojox.uuid._ourVariantLookupTable[A]
};
dojox.uuid.getVersion=function(D){var A="dojox.uuid.getVersion() was not passed a DCE Variant UUID.";
dojox.uuid.assert(dojox.uuid.getVariant(D)==dojox.uuid.variant.DCE,A);
D=D.toString();
var C=D.charAt(14);
var E=16;
var B=parseInt(C,E);
return B
};
dojox.uuid.getNode=function(B){var A="dojox.uuid.getNode() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(B)==dojox.uuid.version.TIME_BASED,A);
B=B.toString();
var D=B.split("-");
var C=D[4];
return C
};
dojox.uuid.getTimestamp=function(L,R){var O="dojox.uuid.getTimestamp() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(L)==dojox.uuid.version.TIME_BASED,O);
L=L.toString();
if(!R){R=null
}switch(R){case"string":case String:return dojox.uuid.getTimestamp(L,Date).toUTCString();
break;
case"hex":var T=L.split("-");
var J=T[0];
var H=T[1];
var M=T[2];
M=M.slice(1);
var E=M+H+J;
dojox.uuid.assert(E.length==15);
return E;
break;
case null:case"date":case Date:var V=3394248;
var F=16;
var K=L.split("-");
var U=parseInt(K[0],F);
var Q=parseInt(K[1],F);
var I=parseInt(K[2],F);
var N=I&4095;
N<<=16;
N+=Q;
N*=4294967296;
N+=U;
var A=N/10000;
var B=60*60;
var D=V;
var P=D*B;
var C=P*1000;
var S=A-C;
var G=new Date(S);
return G;
break;
default:dojox.uuid.assert(false,"dojox.uuid.getTimestamp was not passed a valid returnType: "+R);
break
}}
};