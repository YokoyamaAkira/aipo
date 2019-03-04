dojo._xdResourceLoaded({depends:[["provide","dojo.back"]],defineResource:function(A){if(!A._hasResource["dojo.back"]){A._hasResource["dojo.back"]=true;
A.provide("dojo.back");
(function(){var N=A.back;
function M(){var V=window.location.hash;
if(V.charAt(0)=="#"){V=V.substring(1)
}return A.isMozilla?V:decodeURIComponent(V)
}function H(V){if(!V){V=""
}window.location.hash=encodeURIComponent(V);
S=history.length
}if(A.exists("tests.back-hash")){N.getHash=M;
N.setHash=H
}var Q=(typeof (window)!=="undefined")?window.location.href:"";
var D=(typeof (window)!=="undefined")?M():"";
var P=null;
var O=null;
var C=null;
var G=null;
var K=[];
var U=[];
var B=false;
var E=false;
var S;
function J(){var W=U.pop();
if(!W){return 
}var V=U[U.length-1];
if(!V&&U.length==0){V=P
}if(V){if(V.kwArgs.back){V.kwArgs.back()
}else{if(V.kwArgs.backButton){V.kwArgs.backButton()
}else{if(V.kwArgs.handle){V.kwArgs.handle("back")
}}}}K.push(W)
}N.goBack=J;
function T(){var V=K.pop();
if(!V){return 
}if(V.kwArgs.forward){V.kwArgs.forward()
}else{if(V.kwArgs.forwardButton){V.kwArgs.forwardButton()
}else{if(V.kwArgs.handle){V.kwArgs.handle("forward")
}}}U.push(V)
}N.goForward=T;
function L(W,V,X){return{url:W,kwArgs:V,urlHash:X}
}function F(W){var V=W.split("?");
if(V.length<2){return null
}else{return V[1]
}}function R(){var V=(djConfig.dojoIframeHistoryUrl||A.moduleUrl("dojo","resources/iframe_history.html"))+"?"+(new Date()).getTime();
B=true;
if(G){(A.isSafari)?G.location=V:window.frames[G.name].location=V
}else{}return V
}function I(){if(!E){var V=U.length;
var X=M();
if((X===D||window.location.href==Q)&&(V==1)){J();
return 
}if(K.length>0){if(K[K.length-1].urlHash===X){T();
return 
}}if((V>=2)&&(U[V-2])){if(U[V-2].urlHash===X){J();
return 
}}if(A.isSafari&&A.isSafari<3){var W=history.length;
if(W>S){T()
}else{if(W<S){J()
}}S=W
}}}N.init=function(){if(A.byId("dj_history")){return 
}var V=djConfig.dojoIframeHistoryUrl||A.moduleUrl("dojo","resources/iframe_history.html");
document.write('<iframe style="border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;" name="dj_history" id="dj_history" src="'+V+'"></iframe>')
};
N.setInitialState=function(V){P=L(Q,V,D)
};
N.addToHistory=function(W){K=[];
var Z=null;
var V=null;
if(!G){if(djConfig.useXDomain&&!djConfig.dojoIframeHistoryUrl){console.debug("dojo.back: When using cross-domain Dojo builds, please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl to the path on your domain to iframe_history.html")
}G=window.frames.dj_history
}if(!C){C=document.createElement("a");
A.body().appendChild(C);
C.style.display="none"
}if(W.changeUrl){Z=""+((W.changeUrl!==true)?W.changeUrl:(new Date()).getTime());
if(U.length==0&&P.urlHash==Z){P=L(V,W,Z);
return 
}else{if(U.length>0&&U[U.length-1].urlHash==Z){U[U.length-1]=L(V,W,Z);
return 
}}E=true;
setTimeout(function(){H(Z);
E=false
},1);
C.href=Z;
if(A.isIE){V=R();
var b=W.back||W.backButton||W.handle;
var a=function(c){if(M()!=""){setTimeout(function(){H(Z)
},1)
}b.apply(this,[c])
};
if(W.back){W.back=a
}else{if(W.backButton){W.backButton=a
}else{if(W.handle){W.handle=a
}}}var Y=W.forward||W.forwardButton||W.handle;
var X=function(c){if(M()!=""){H(Z)
}if(Y){Y.apply(this,[c])
}};
if(W.forward){W.forward=X
}else{if(W.forwardButton){W.forwardButton=X
}else{if(W.handle){W.handle=X
}}}}else{if(!A.isIE){if(!O){O=setInterval(I,200)
}}}}else{V=R()
}U.push(L(V,W,Z))
};
N._iframeLoaded=function(V,X){var W=F(X.href);
if(W==null){if(U.length==1){J()
}return 
}if(B){B=false;
return 
}if(U.length>=2&&W==F(U[U.length-2].url)){J()
}else{if(K.length>0&&W==F(K[K.length-1].url)){T()
}}}
})()
}}});