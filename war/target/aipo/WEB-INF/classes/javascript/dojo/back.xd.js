dojo._xdResourceLoaded({depends:[["provide","dojo.back"]],defineResource:function(A){if(!A._hasResource["dojo.back"]){A._hasResource["dojo.back"]=true;
A.provide("dojo.back");
(function(){var T=A.back;
function S(){var V=window.location.hash;
if(V.charAt(0)=="#"){V=V.substring(1)
}return A.isMozilla?V:decodeURIComponent(V)
}function N(V){if(!V){V=""
}window.location.hash=encodeURIComponent(V);
E=history.length
}if(A.exists("tests.back-hash")){T.getHash=S;
T.setHash=N
}var C=(typeof (window)!=="undefined")?window.location.href:"";
var J=(typeof (window)!=="undefined")?S():"";
var B=null;
var U=null;
var I=null;
var M=null;
var Q=[];
var G=[];
var H=false;
var K=false;
var E;
function P(){var W=G.pop();
if(!W){return 
}var V=G[G.length-1];
if(!V&&G.length==0){V=B
}if(V){if(V.kwArgs.back){V.kwArgs.back()
}else{if(V.kwArgs.backButton){V.kwArgs.backButton()
}else{if(V.kwArgs.handle){V.kwArgs.handle("back")
}}}}Q.push(W)
}T.goBack=P;
function F(){var V=Q.pop();
if(!V){return 
}if(V.kwArgs.forward){V.kwArgs.forward()
}else{if(V.kwArgs.forwardButton){V.kwArgs.forwardButton()
}else{if(V.kwArgs.handle){V.kwArgs.handle("forward")
}}}G.push(V)
}T.goForward=F;
function R(X,W,V){return{url:X,kwArgs:W,urlHash:V}
}function L(W){var V=W.split("?");
if(V.length<2){return null
}else{return V[1]
}}function D(){var V=(djConfig.dojoIframeHistoryUrl||A.moduleUrl("dojo","resources/iframe_history.html"))+"?"+(new Date()).getTime();
H=true;
if(M){(A.isSafari)?M.location=V:window.frames[M.name].location=V
}else{}return V
}function O(){if(!K){var W=G.length;
var V=S();
if((V===J||window.location.href==C)&&(W==1)){P();
return 
}if(Q.length>0){if(Q[Q.length-1].urlHash===V){F();
return 
}}if((W>=2)&&(G[W-2])){if(G[W-2].urlHash===V){P();
return 
}}if(A.isSafari&&A.isSafari<3){var X=history.length;
if(X>E){F()
}else{if(X<E){P()
}}E=X
}}}T.init=function(){if(A.byId("dj_history")){return 
}var V=djConfig.dojoIframeHistoryUrl||A.moduleUrl("dojo","resources/iframe_history.html");
document.write('<iframe style="border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;" name="dj_history" id="dj_history" src="'+V+'"></iframe>')
};
T.setInitialState=function(V){B=R(C,V,J)
};
T.addToHistory=function(a){Q=[];
var X=null;
var Y=null;
if(!M){if(djConfig.useXDomain&&!djConfig.dojoIframeHistoryUrl){console.debug("dojo.back: When using cross-domain Dojo builds, please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl to the path on your domain to iframe_history.html")
}M=window.frames.dj_history
}if(!I){I=document.createElement("a");
A.body().appendChild(I);
I.style.display="none"
}if(a.changeUrl){X=""+((a.changeUrl!==true)?a.changeUrl:(new Date()).getTime());
if(G.length==0&&B.urlHash==X){B=R(Y,a,X);
return 
}else{if(G.length>0&&G[G.length-1].urlHash==X){G[G.length-1]=R(Y,a,X);
return 
}}K=true;
setTimeout(function(){N(X);
K=false
},1);
I.href=X;
if(A.isIE){Y=D();
var b=a.back||a.backButton||a.handle;
var Z=function(c){if(S()!=""){setTimeout(function(){N(X)
},1)
}b.apply(this,[c])
};
if(a.back){a.back=Z
}else{if(a.backButton){a.backButton=Z
}else{if(a.handle){a.handle=Z
}}}var W=a.forward||a.forwardButton||a.handle;
var V=function(c){if(S()!=""){N(X)
}if(W){W.apply(this,[c])
}};
if(a.forward){a.forward=V
}else{if(a.forwardButton){a.forwardButton=V
}else{if(a.handle){a.handle=V
}}}}else{if(!A.isIE){if(!U){U=setInterval(O,200)
}}}}else{Y=D()
}G.push(R(Y,a,X))
};
T._iframeLoaded=function(W,V){var X=L(V.href);
if(X==null){if(G.length==1){P()
}return 
}if(H){H=false;
return 
}if(G.length>=2&&X==L(G[G.length-2].url)){P()
}else{if(Q.length>0&&X==L(Q[Q.length-1].url)){F()
}}}
})()
}}});