dojo._xdResourceLoaded({depends:[["provide","dojox.charting.scaler"]],defineResource:function(A){if(!A._hasResource["dojox.charting.scaler"]){A._hasResource["dojox.charting.scaler"]=true;
A.provide("dojox.charting.scaler");
(function(){var B=3;
var D=function(G,F){G=G.toLowerCase();
for(var E=0;
E<F.length;
++E){if(G==F[E]){return true
}}return false
};
var C=function(P,R,U,M,G,X,Q){U=A.clone(U);
if(!M){if(U.fixUpper=="major"){U.fixUpper="minor"
}if(U.fixLower=="major"){U.fixLower="minor"
}}if(!G){if(U.fixUpper=="minor"){U.fixUpper="micro"
}if(U.fixLower=="minor"){U.fixLower="micro"
}}if(!X){if(U.fixUpper=="micro"){U.fixUpper="none"
}if(U.fixLower=="micro"){U.fixLower="none"
}}var H=D(U.fixLower,["major"])?Math.floor(P/M)*M:D(U.fixLower,["minor"])?Math.floor(P/G)*G:D(U.fixLower,["micro"])?Math.floor(P/X)*unit:P,K=D(U.fixUpper,["major"])?Math.ceil(R/M)*M:D(U.fixUpper,["minor"])?Math.ceil(R/G)*G:D(U.fixUpper,["unit"])?Math.ceil(R/unit)*unit:R,E=(D(U.fixLower,["major"])||!M)?H:Math.ceil(H/M)*M,J=(D(U.fixLower,["major","minor"])||!G)?H:Math.ceil(H/G)*G,S=(D(U.fixLower,["major","minor","micro"])||!X)?H:Math.ceil(H/X)*X,F=!M?0:(D(U.fixUpper,["major"])?Math.round((K-E)/M):Math.floor((K-E)/M))+1,L=!G?0:(D(U.fixUpper,["major","minor"])?Math.round((K-J)/G):Math.floor((K-J)/G))+1,T=!X?0:(D(U.fixUpper,["major","minor","micro"])?Math.round((K-S)/X):Math.floor((K-S)/X))+1,O=G?Math.round(M/G):0,I=X?Math.round(G/X):0,W=M?Math.floor(Math.log(M)/Math.LN10):0,N=G?Math.floor(Math.log(G)/Math.LN10):0,V=Q/(K-H);
if(!isFinite(V)){V=1
}return{bounds:{lower:H,upper:K},major:{tick:M,start:E,count:F,prec:W},minor:{tick:G,start:J,count:L,prec:N},micro:{tick:X,start:S,count:T,prec:0},minorPerMajor:O,microPerMinor:I,scale:V}
};
dojox.charting.scaler=function(F,L,N,J){var I={fixUpper:"none",fixLower:"none",natural:false};
if(J){if("fixUpper" in J){I.fixUpper=String(J.fixUpper)
}if("fixLower" in J){I.fixLower=String(J.fixLower)
}if("natural" in J){I.natural=Boolean(J.natural)
}}if(L<=F){return C(F,L,I,0,0,0,N)
}var G=Math.floor(Math.log(L-F)/Math.LN10),K=J&&("majorTick" in J)?J.majorTick:Math.pow(10,G),H=0,E=0,M;
if(J&&("minorTick" in J)){H=J.minorTick
}else{do{H=K/10;
if(!I.natural||H>0.9){M=C(F,L,I,K,H,0,N);
if(M.scale*M.minor.tick>B){break
}}H=K/5;
if(!I.natural||H>0.9){M=C(F,L,I,K,H,0,N);
if(M.scale*M.minor.tick>B){break
}}H=K/2;
if(!I.natural||H>0.9){M=C(F,L,I,K,H,0,N);
if(M.scale*M.minor.tick>B){break
}}return C(F,L,I,K,0,0,N)
}while(false)
}if(J&&("microTick" in J)){E=J.microTick;
M=C(F,L,I,K,H,E,N)
}else{do{E=H/10;
if(!I.natural||E>0.9){M=C(F,L,I,K,H,E,N);
if(M.scale*M.micro.tick>B){break
}}E=H/5;
if(!I.natural||E>0.9){M=C(F,L,I,K,H,E,N);
if(M.scale*M.micro.tick>B){break
}}E=H/2;
if(!I.natural||E>0.9){M=C(F,L,I,K,H,E,N);
if(M.scale*M.micro.tick>B){break
}}E=0
}while(false)
}return E?M:C(F,L,I,K,H,0,N)
}
})()
}}});