if(!dojo._hasResource["dojox.charting.scaler"]){dojo._hasResource["dojox.charting.scaler"]=true;
dojo.provide("dojox.charting.scaler");
(function(){var C=3;
var B=function(D,F){D=D.toLowerCase();
for(var E=0;
E<F.length;
++E){if(D==F[E]){return true
}}return false
};
var A=function(U,W,F,R,L,I,V){F=dojo.clone(F);
if(!R){if(F.fixUpper=="major"){F.fixUpper="minor"
}if(F.fixLower=="major"){F.fixLower="minor"
}}if(!L){if(F.fixUpper=="minor"){F.fixUpper="micro"
}if(F.fixLower=="minor"){F.fixLower="micro"
}}if(!I){if(F.fixUpper=="micro"){F.fixUpper="none"
}if(F.fixLower=="micro"){F.fixLower="none"
}}var M=B(F.fixLower,["major"])?Math.floor(U/R)*R:B(F.fixLower,["minor"])?Math.floor(U/L)*L:B(F.fixLower,["micro"])?Math.floor(U/I)*unit:U,P=B(F.fixUpper,["major"])?Math.ceil(W/R)*R:B(F.fixUpper,["minor"])?Math.ceil(W/L)*L:B(F.fixUpper,["unit"])?Math.ceil(W/unit)*unit:W,J=(B(F.fixLower,["major"])||!R)?M:Math.ceil(M/R)*R,O=(B(F.fixLower,["major","minor"])||!L)?M:Math.ceil(M/L)*L,D=(B(F.fixLower,["major","minor","micro"])||!I)?M:Math.ceil(M/I)*I,K=!R?0:(B(F.fixUpper,["major"])?Math.round((P-J)/R):Math.floor((P-J)/R))+1,Q=!L?0:(B(F.fixUpper,["major","minor"])?Math.round((P-O)/L):Math.floor((P-O)/L))+1,E=!I?0:(B(F.fixUpper,["major","minor","micro"])?Math.round((P-D)/I):Math.floor((P-D)/I))+1,T=L?Math.round(R/L):0,N=I?Math.round(L/I):0,H=R?Math.floor(Math.log(R)/Math.LN10):0,S=L?Math.floor(Math.log(L)/Math.LN10):0,G=V/(P-M);
if(!isFinite(G)){G=1
}return{bounds:{lower:M,upper:P},major:{tick:R,start:J,count:K,prec:H},minor:{tick:L,start:O,count:Q,prec:S},micro:{tick:I,start:D,count:E,prec:0},minorPerMajor:T,microPerMinor:N,scale:G}
};
dojox.charting.scaler=function(G,M,E,K){var J={fixUpper:"none",fixLower:"none",natural:false};
if(K){if("fixUpper" in K){J.fixUpper=String(K.fixUpper)
}if("fixLower" in K){J.fixLower=String(K.fixLower)
}if("natural" in K){J.natural=Boolean(K.natural)
}}if(M<=G){return A(G,M,J,0,0,0,E)
}var H=Math.floor(Math.log(M-G)/Math.LN10),L=K&&("majorTick" in K)?K.majorTick:Math.pow(10,H),I=0,F=0,D;
if(K&&("minorTick" in K)){I=K.minorTick
}else{do{I=L/10;
if(!J.natural||I>0.9){D=A(G,M,J,L,I,0,E);
if(D.scale*D.minor.tick>C){break
}}I=L/5;
if(!J.natural||I>0.9){D=A(G,M,J,L,I,0,E);
if(D.scale*D.minor.tick>C){break
}}I=L/2;
if(!J.natural||I>0.9){D=A(G,M,J,L,I,0,E);
if(D.scale*D.minor.tick>C){break
}}return A(G,M,J,L,0,0,E)
}while(false)
}if(K&&("microTick" in K)){F=K.microTick;
D=A(G,M,J,L,I,F,E)
}else{do{F=I/10;
if(!J.natural||F>0.9){D=A(G,M,J,L,I,F,E);
if(D.scale*D.micro.tick>C){break
}}F=I/5;
if(!J.natural||F>0.9){D=A(G,M,J,L,I,F,E);
if(D.scale*D.micro.tick>C){break
}}F=I/2;
if(!J.natural||F>0.9){D=A(G,M,J,L,I,F,E);
if(D.scale*D.micro.tick>C){break
}}F=0
}while(false)
}return F?D:A(G,M,J,L,I,0,E)
}
})()
};