dojo._xdResourceLoaded({depends:[["provide","dojox.uuid._base"]],defineResource:function(A){if(!A._hasResource["dojox.uuid._base"]){A._hasResource["dojox.uuid._base"]=true;
A.provide("dojox.uuid._base");
dojox.uuid.NIL_UUID="00000000-0000-0000-0000-000000000000";
dojox.uuid.version={UNKNOWN:0,TIME_BASED:1,DCE_SECURITY:2,NAME_BASED_MD5:3,RANDOM:4,NAME_BASED_SHA1:5};
dojox.uuid.variant={NCS:"0",DCE:"10",MICROSOFT:"110",UNKNOWN:"111"};
dojox.uuid.assert=function(B,C){if(!B){if(!C){C="An assert statement failed.\nThe method dojox.uuid.assert() was called with a 'false' value.\n"
}throw new Error(C)
}};
dojox.uuid.generateNilUuid=function(){return dojox.uuid.NIL_UUID
};
dojox.uuid.isValid=function(F){F=F.toString();
var E=(A.isString(F)&&(F.length==36)&&(F==F.toLowerCase()));
if(E){var D=F.split("-");
E=((D.length==5)&&(D[0].length==8)&&(D[1].length==4)&&(D[2].length==4)&&(D[3].length==4)&&(D[4].length==12));
var C=16;
for(var B in D){var H=D[B];
var G=parseInt(H,C);
E=E&&isFinite(G)
}}return E
};
dojox.uuid.getVariant=function(G){if(!dojox.uuid._ourVariantLookupTable){var D=dojox.uuid.variant;
var E=[];
E[0]=D.NCS;
E[1]=D.NCS;
E[2]=D.NCS;
E[3]=D.NCS;
E[4]=D.NCS;
E[5]=D.NCS;
E[6]=D.NCS;
E[7]=D.NCS;
E[8]=D.DCE;
E[9]=D.DCE;
E[10]=D.DCE;
E[11]=D.DCE;
E[12]=D.MICROSOFT;
E[13]=D.MICROSOFT;
E[14]=D.UNKNOWN;
E[15]=D.UNKNOWN;
dojox.uuid._ourVariantLookupTable=E
}G=G.toString();
var F=G.charAt(19);
var C=16;
var B=parseInt(F,C);
dojox.uuid.assert((B>=0)&&(B<=16));
return dojox.uuid._ourVariantLookupTable[B]
};
dojox.uuid.getVersion=function(F){var C="dojox.uuid.getVersion() was not passed a DCE Variant UUID.";
dojox.uuid.assert(dojox.uuid.getVariant(F)==dojox.uuid.variant.DCE,C);
F=F.toString();
var E=F.charAt(14);
var B=16;
var D=parseInt(E,B);
return D
};
dojox.uuid.getNode=function(D){var C="dojox.uuid.getNode() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(D)==dojox.uuid.version.TIME_BASED,C);
D=D.toString();
var B=D.split("-");
var E=B[4];
return E
};
dojox.uuid.getTimestamp=function(Q,W){var T="dojox.uuid.getTimestamp() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(Q)==dojox.uuid.version.TIME_BASED,T);
Q=Q.toString();
if(!W){W=null
}switch(W){case"string":case String:return dojox.uuid.getTimestamp(Q,Date).toUTCString();
break;
case"hex":var C=Q.split("-");
var O=C[0];
var M=C[1];
var R=C[2];
R=R.slice(1);
var J=R+M+O;
dojox.uuid.assert(J.length==15);
return J;
break;
case null:case"date":case Date:var H=3394248;
var K=16;
var P=Q.split("-");
var D=parseInt(P[0],K);
var V=parseInt(P[1],K);
var N=parseInt(P[2],K);
var S=N&4095;
S<<=16;
S+=V;
S*=4294967296;
S+=D;
var E=S/10000;
var F=60*60;
var I=H;
var U=I*F;
var G=U*1000;
var B=E-G;
var L=new Date(B);
return L;
break;
default:dojox.uuid.assert(false,"dojox.uuid.getTimestamp was not passed a valid returnType: "+W);
break
}}
}}});