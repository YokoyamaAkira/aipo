dojo._xdResourceLoaded({depends:[["provide","dojox.uuid._base"]],defineResource:function(A){if(!A._hasResource["dojox.uuid._base"]){A._hasResource["dojox.uuid._base"]=true;
A.provide("dojox.uuid._base");
dojox.uuid.NIL_UUID="00000000-0000-0000-0000-000000000000";
dojox.uuid.version={UNKNOWN:0,TIME_BASED:1,DCE_SECURITY:2,NAME_BASED_MD5:3,RANDOM:4,NAME_BASED_SHA1:5};
dojox.uuid.variant={NCS:"0",DCE:"10",MICROSOFT:"110",UNKNOWN:"111"};
dojox.uuid.assert=function(C,B){if(!C){if(!B){B="An assert statement failed.\nThe method dojox.uuid.assert() was called with a 'false' value.\n"
}throw new Error(B)
}};
dojox.uuid.generateNilUuid=function(){return dojox.uuid.NIL_UUID
};
dojox.uuid.isValid=function(G){G=G.toString();
var F=(A.isString(G)&&(G.length==36)&&(G==G.toLowerCase()));
if(F){var E=G.split("-");
F=((E.length==5)&&(E[0].length==8)&&(E[1].length==4)&&(E[2].length==4)&&(E[3].length==4)&&(E[4].length==12));
var H=16;
for(var D in E){var C=E[D];
var B=parseInt(C,H);
F=F&&isFinite(B)
}}return F
};
dojox.uuid.getVariant=function(F){if(!dojox.uuid._ourVariantLookupTable){var C=dojox.uuid.variant;
var D=[];
D[0]=C.NCS;
D[1]=C.NCS;
D[2]=C.NCS;
D[3]=C.NCS;
D[4]=C.NCS;
D[5]=C.NCS;
D[6]=C.NCS;
D[7]=C.NCS;
D[8]=C.DCE;
D[9]=C.DCE;
D[10]=C.DCE;
D[11]=C.DCE;
D[12]=C.MICROSOFT;
D[13]=C.MICROSOFT;
D[14]=C.UNKNOWN;
D[15]=C.UNKNOWN;
dojox.uuid._ourVariantLookupTable=D
}F=F.toString();
var E=F.charAt(19);
var G=16;
var B=parseInt(E,G);
dojox.uuid.assert((B>=0)&&(B<=16));
return dojox.uuid._ourVariantLookupTable[B]
};
dojox.uuid.getVersion=function(E){var B="dojox.uuid.getVersion() was not passed a DCE Variant UUID.";
dojox.uuid.assert(dojox.uuid.getVariant(E)==dojox.uuid.variant.DCE,B);
E=E.toString();
var D=E.charAt(14);
var F=16;
var C=parseInt(D,F);
return C
};
dojox.uuid.getNode=function(C){var B="dojox.uuid.getNode() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(C)==dojox.uuid.version.TIME_BASED,B);
C=C.toString();
var E=C.split("-");
var D=E[4];
return D
};
dojox.uuid.getTimestamp=function(M,S){var P="dojox.uuid.getTimestamp() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(M)==dojox.uuid.version.TIME_BASED,P);
M=M.toString();
if(!S){S=null
}switch(S){case"string":case String:return dojox.uuid.getTimestamp(M,Date).toUTCString();
break;
case"hex":var U=M.split("-");
var K=U[0];
var I=U[1];
var N=U[2];
N=N.slice(1);
var F=N+I+K;
dojox.uuid.assert(F.length==15);
return F;
break;
case null:case"date":case Date:var W=3394248;
var G=16;
var L=M.split("-");
var V=parseInt(L[0],G);
var R=parseInt(L[1],G);
var J=parseInt(L[2],G);
var O=J&4095;
O<<=16;
O+=R;
O*=4294967296;
O+=V;
var B=O/10000;
var C=60*60;
var E=W;
var Q=E*C;
var D=Q*1000;
var T=B-D;
var H=new Date(T);
return H;
break;
default:dojox.uuid.assert(false,"dojox.uuid.getTimestamp was not passed a valid returnType: "+S);
break
}}
}}});