dojo._xdResourceLoaded({depends:[["provide","dojox.charting.scaler"]],defineResource:function(A){if(!A._hasResource["dojox.charting.scaler"]){A._hasResource["dojox.charting.scaler"]=true;
A.provide("dojox.charting.scaler");
(function(){var C=3;
var B=function(G,F){G=G.toLowerCase();
for(var E=0;
E<F.length;
++E){if(G==F[E]){return true
}}return false
};
var D=function(T,V,E,Q,K,H,U){E=A.clone(E);
if(!Q){if(E.fixUpper=="major"){E.fixUpper="minor"
}if(E.fixLower=="major"){E.fixLower="minor"
}}if(!K){if(E.fixUpper=="minor"){E.fixUpper="micro"
}if(E.fixLower=="minor"){E.fixLower="micro"
}}if(!H){if(E.fixUpper=="micro"){E.fixUpper="none"
}if(E.fixLower=="micro"){E.fixLower="none"
}}var L=B(E.fixLower,["major"])?Math.floor(T/Q)*Q:B(E.fixLower,["minor"])?Math.floor(T/K)*K:B(E.fixLower,["micro"])?Math.floor(T/H)*unit:T,O=B(E.fixUpper,["major"])?Math.ceil(V/Q)*Q:B(E.fixUpper,["minor"])?Math.ceil(V/K)*K:B(E.fixUpper,["unit"])?Math.ceil(V/unit)*unit:V,I=(B(E.fixLower,["major"])||!Q)?L:Math.ceil(L/Q)*Q,N=(B(E.fixLower,["major","minor"])||!K)?L:Math.ceil(L/K)*K,W=(B(E.fixLower,["major","minor","micro"])||!H)?L:Math.ceil(L/H)*H,J=!Q?0:(B(E.fixUpper,["major"])?Math.round((O-I)/Q):Math.floor((O-I)/Q))+1,P=!K?0:(B(E.fixUpper,["major","minor"])?Math.round((O-N)/K):Math.floor((O-N)/K))+1,X=!H?0:(B(E.fixUpper,["major","minor","micro"])?Math.round((O-W)/H):Math.floor((O-W)/H))+1,S=K?Math.round(Q/K):0,M=H?Math.round(K/H):0,G=Q?Math.floor(Math.log(Q)/Math.LN10):0,R=K?Math.floor(Math.log(K)/Math.LN10):0,F=U/(O-L);
if(!isFinite(F)){F=1
}return{bounds:{lower:L,upper:O},major:{tick:Q,start:I,count:J,prec:G},minor:{tick:K,start:N,count:P,prec:R},micro:{tick:H,start:W,count:X,prec:0},minorPerMajor:S,microPerMinor:M,scale:F}
};
dojox.charting.scaler=function(H,N,F,L){var K={fixUpper:"none",fixLower:"none",natural:false};
if(L){if("fixUpper" in L){K.fixUpper=String(L.fixUpper)
}if("fixLower" in L){K.fixLower=String(L.fixLower)
}if("natural" in L){K.natural=Boolean(L.natural)
}}if(N<=H){return D(H,N,K,0,0,0,F)
}var I=Math.floor(Math.log(N-H)/Math.LN10),M=L&&("majorTick" in L)?L.majorTick:Math.pow(10,I),J=0,G=0,E;
if(L&&("minorTick" in L)){J=L.minorTick
}else{do{J=M/10;
if(!K.natural||J>0.9){E=D(H,N,K,M,J,0,F);
if(E.scale*E.minor.tick>C){break
}}J=M/5;
if(!K.natural||J>0.9){E=D(H,N,K,M,J,0,F);
if(E.scale*E.minor.tick>C){break
}}J=M/2;
if(!K.natural||J>0.9){E=D(H,N,K,M,J,0,F);
if(E.scale*E.minor.tick>C){break
}}return D(H,N,K,M,0,0,F)
}while(false)
}if(L&&("microTick" in L)){G=L.microTick;
E=D(H,N,K,M,J,G,F)
}else{do{G=J/10;
if(!K.natural||G>0.9){E=D(H,N,K,M,J,G,F);
if(E.scale*E.micro.tick>C){break
}}G=J/5;
if(!K.natural||G>0.9){E=D(H,N,K,M,J,G,F);
if(E.scale*E.micro.tick>C){break
}}G=J/2;
if(!K.natural||G>0.9){E=D(H,N,K,M,J,G,F);
if(E.scale*E.micro.tick>C){break
}}G=0
}while(false)
}return G?E:D(H,N,K,M,J,0,F)
}
})()
}}});