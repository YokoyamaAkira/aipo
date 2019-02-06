if(!dojo._hasResource["dojo.back"]){dojo._hasResource["dojo.back"]=true;
dojo.provide("dojo.back");
(function(){var M=dojo.back;
function L(){var U=window.location.hash;
if(U.charAt(0)=="#"){U=U.substring(1)
}return dojo.isMozilla?U:decodeURIComponent(U)
}function G(U){if(!U){U=""
}window.location.hash=encodeURIComponent(U);
R=history.length
}if(dojo.exists("tests.back-hash")){M.getHash=L;
M.setHash=G
}var P=(typeof (window)!=="undefined")?window.location.href:"";
var C=(typeof (window)!=="undefined")?L():"";
var O=null;
var N=null;
var B=null;
var F=null;
var J=[];
var T=[];
var A=false;
var D=false;
var R;
function I(){var V=T.pop();
if(!V){return 
}var U=T[T.length-1];
if(!U&&T.length==0){U=O
}if(U){if(U.kwArgs.back){U.kwArgs.back()
}else{if(U.kwArgs.backButton){U.kwArgs.backButton()
}else{if(U.kwArgs.handle){U.kwArgs.handle("back")
}}}}J.push(V)
}M.goBack=I;
function S(){var U=J.pop();
if(!U){return 
}if(U.kwArgs.forward){U.kwArgs.forward()
}else{if(U.kwArgs.forwardButton){U.kwArgs.forwardButton()
}else{if(U.kwArgs.handle){U.kwArgs.handle("forward")
}}}T.push(U)
}M.goForward=S;
function K(V,U,W){return{url:V,kwArgs:U,urlHash:W}
}function E(V){var U=V.split("?");
if(U.length<2){return null
}else{return U[1]
}}function Q(){var U=(djConfig.dojoIframeHistoryUrl||dojo.moduleUrl("dojo","resources/iframe_history.html"))+"?"+(new Date()).getTime();
A=true;
if(F){(dojo.isSafari)?F.location=U:window.frames[F.name].location=U
}else{}return U
}function H(){if(!D){var U=T.length;
var W=L();
if((W===C||window.location.href==P)&&(U==1)){I();
return 
}if(J.length>0){if(J[J.length-1].urlHash===W){S();
return 
}}if((U>=2)&&(T[U-2])){if(T[U-2].urlHash===W){I();
return 
}}if(dojo.isSafari&&dojo.isSafari<3){var V=history.length;
if(V>R){S()
}else{if(V<R){I()
}}R=V
}}}M.init=function(){if(dojo.byId("dj_history")){return 
}var U=djConfig.dojoIframeHistoryUrl||dojo.moduleUrl("dojo","resources/iframe_history.html");
document.write('<iframe style="border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;" name="dj_history" id="dj_history" src="'+U+'"></iframe>')
};
M.setInitialState=function(U){O=K(P,U,C)
};
M.addToHistory=function(V){J=[];
var Y=null;
var U=null;
if(!F){if(djConfig.useXDomain&&!djConfig.dojoIframeHistoryUrl){console.debug("dojo.back: When using cross-domain Dojo builds, please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl to the path on your domain to iframe_history.html")
}F=window.frames.dj_history
}if(!B){B=document.createElement("a");
dojo.body().appendChild(B);
B.style.display="none"
}if(V.changeUrl){Y=""+((V.changeUrl!==true)?V.changeUrl:(new Date()).getTime());
if(T.length==0&&O.urlHash==Y){O=K(U,V,Y);
return 
}else{if(T.length>0&&T[T.length-1].urlHash==Y){T[T.length-1]=K(U,V,Y);
return 
}}D=true;
setTimeout(function(){G(Y);
D=false
},1);
B.href=Y;
if(dojo.isIE){U=Q();
var a=V.back||V.backButton||V.handle;
var Z=function(b){if(L()!=""){setTimeout(function(){G(Y)
},1)
}a.apply(this,[b])
};
if(V.back){V.back=Z
}else{if(V.backButton){V.backButton=Z
}else{if(V.handle){V.handle=Z
}}}var X=V.forward||V.forwardButton||V.handle;
var W=function(b){if(L()!=""){G(Y)
}if(X){X.apply(this,[b])
}};
if(V.forward){V.forward=W
}else{if(V.forwardButton){V.forwardButton=W
}else{if(V.handle){V.handle=W
}}}}else{if(!dojo.isIE){if(!N){N=setInterval(H,200)
}}}}else{U=Q()
}T.push(K(U,V,Y))
};
M._iframeLoaded=function(U,W){var V=E(W.href);
if(V==null){if(T.length==1){I()
}return 
}if(A){A=false;
return 
}if(T.length>=2&&V==E(T[T.length-2].url)){I()
}else{if(J.length>0&&V==E(J[J.length-1].url)){S()
}}}
})()
};