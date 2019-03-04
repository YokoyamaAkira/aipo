if(!dojo._hasResource["dojox.charting.scaler"]){dojo._hasResource["dojox.charting.scaler"]=true;
dojo.provide("dojox.charting.scaler");
(function(){var A=3;
var C=function(F,E){F=F.toLowerCase();
for(var D=0;
D<E.length;
++D){if(F==E[D]){return true
}}return false
};
var B=function(O,Q,T,L,F,W,P){T=dojo.clone(T);
if(!L){if(T.fixUpper=="major"){T.fixUpper="minor"
}if(T.fixLower=="major"){T.fixLower="minor"
}}if(!F){if(T.fixUpper=="minor"){T.fixUpper="micro"
}if(T.fixLower=="minor"){T.fixLower="micro"
}}if(!W){if(T.fixUpper=="micro"){T.fixUpper="none"
}if(T.fixLower=="micro"){T.fixLower="none"
}}var G=C(T.fixLower,["major"])?Math.floor(O/L)*L:C(T.fixLower,["minor"])?Math.floor(O/F)*F:C(T.fixLower,["micro"])?Math.floor(O/W)*unit:O,J=C(T.fixUpper,["major"])?Math.ceil(Q/L)*L:C(T.fixUpper,["minor"])?Math.ceil(Q/F)*F:C(T.fixUpper,["unit"])?Math.ceil(Q/unit)*unit:Q,D=(C(T.fixLower,["major"])||!L)?G:Math.ceil(G/L)*L,I=(C(T.fixLower,["major","minor"])||!F)?G:Math.ceil(G/F)*F,R=(C(T.fixLower,["major","minor","micro"])||!W)?G:Math.ceil(G/W)*W,E=!L?0:(C(T.fixUpper,["major"])?Math.round((J-D)/L):Math.floor((J-D)/L))+1,K=!F?0:(C(T.fixUpper,["major","minor"])?Math.round((J-I)/F):Math.floor((J-I)/F))+1,S=!W?0:(C(T.fixUpper,["major","minor","micro"])?Math.round((J-R)/W):Math.floor((J-R)/W))+1,N=F?Math.round(L/F):0,H=W?Math.round(F/W):0,V=L?Math.floor(Math.log(L)/Math.LN10):0,M=F?Math.floor(Math.log(F)/Math.LN10):0,U=P/(J-G);
if(!isFinite(U)){U=1
}return{bounds:{lower:G,upper:J},major:{tick:L,start:D,count:E,prec:V},minor:{tick:F,start:I,count:K,prec:M},micro:{tick:W,start:R,count:S,prec:0},minorPerMajor:N,microPerMinor:H,scale:U}
};
dojox.charting.scaler=function(E,K,M,I){var H={fixUpper:"none",fixLower:"none",natural:false};
if(I){if("fixUpper" in I){H.fixUpper=String(I.fixUpper)
}if("fixLower" in I){H.fixLower=String(I.fixLower)
}if("natural" in I){H.natural=Boolean(I.natural)
}}if(K<=E){return B(E,K,H,0,0,0,M)
}var F=Math.floor(Math.log(K-E)/Math.LN10),J=I&&("majorTick" in I)?I.majorTick:Math.pow(10,F),G=0,D=0,L;
if(I&&("minorTick" in I)){G=I.minorTick
}else{do{G=J/10;
if(!H.natural||G>0.9){L=B(E,K,H,J,G,0,M);
if(L.scale*L.minor.tick>A){break
}}G=J/5;
if(!H.natural||G>0.9){L=B(E,K,H,J,G,0,M);
if(L.scale*L.minor.tick>A){break
}}G=J/2;
if(!H.natural||G>0.9){L=B(E,K,H,J,G,0,M);
if(L.scale*L.minor.tick>A){break
}}return B(E,K,H,J,0,0,M)
}while(false)
}if(I&&("microTick" in I)){D=I.microTick;
L=B(E,K,H,J,G,D,M)
}else{do{D=G/10;
if(!H.natural||D>0.9){L=B(E,K,H,J,G,D,M);
if(L.scale*L.micro.tick>A){break
}}D=G/5;
if(!H.natural||D>0.9){L=B(E,K,H,J,G,D,M);
if(L.scale*L.micro.tick>A){break
}}D=G/2;
if(!H.natural||D>0.9){L=B(E,K,H,J,G,D,M);
if(L.scale*L.micro.tick>A){break
}}D=0
}while(false)
}return D?L:B(E,K,H,J,G,0,M)
}
})()
};