if(!dojo._hasResource["dojo.back"]){dojo._hasResource["dojo.back"]=true;
dojo.provide("dojo.back");
(function(){var S=dojo.back;
function R(){var U=window.location.hash;
if(U.charAt(0)=="#"){U=U.substring(1)
}return dojo.isMozilla?U:decodeURIComponent(U)
}function M(U){if(!U){U=""
}window.location.hash=encodeURIComponent(U);
D=history.length
}if(dojo.exists("tests.back-hash")){S.getHash=R;
S.setHash=M
}var B=(typeof (window)!=="undefined")?window.location.href:"";
var I=(typeof (window)!=="undefined")?R():"";
var A=null;
var T=null;
var H=null;
var L=null;
var P=[];
var F=[];
var G=false;
var J=false;
var D;
function O(){var U=F.pop();
if(!U){return 
}var V=F[F.length-1];
if(!V&&F.length==0){V=A
}if(V){if(V.kwArgs.back){V.kwArgs.back()
}else{if(V.kwArgs.backButton){V.kwArgs.backButton()
}else{if(V.kwArgs.handle){V.kwArgs.handle("back")
}}}}P.push(U)
}S.goBack=O;
function E(){var U=P.pop();
if(!U){return 
}if(U.kwArgs.forward){U.kwArgs.forward()
}else{if(U.kwArgs.forwardButton){U.kwArgs.forwardButton()
}else{if(U.kwArgs.handle){U.kwArgs.handle("forward")
}}}F.push(U)
}S.goForward=E;
function Q(W,V,U){return{url:W,kwArgs:V,urlHash:U}
}function K(U){var V=U.split("?");
if(V.length<2){return null
}else{return V[1]
}}function C(){var U=(djConfig.dojoIframeHistoryUrl||dojo.moduleUrl("dojo","resources/iframe_history.html"))+"?"+(new Date()).getTime();
G=true;
if(L){(dojo.isSafari)?L.location=U:window.frames[L.name].location=U
}else{}return U
}function N(){if(!J){var V=F.length;
var U=R();
if((U===I||window.location.href==B)&&(V==1)){O();
return 
}if(P.length>0){if(P[P.length-1].urlHash===U){E();
return 
}}if((V>=2)&&(F[V-2])){if(F[V-2].urlHash===U){O();
return 
}}if(dojo.isSafari&&dojo.isSafari<3){var W=history.length;
if(W>D){E()
}else{if(W<D){O()
}}D=W
}}}S.init=function(){if(dojo.byId("dj_history")){return 
}var U=djConfig.dojoIframeHistoryUrl||dojo.moduleUrl("dojo","resources/iframe_history.html");
document.write('<iframe style="border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;" name="dj_history" id="dj_history" src="'+U+'"></iframe>')
};
S.setInitialState=function(U){A=Q(B,U,I)
};
S.addToHistory=function(Z){P=[];
var W=null;
var Y=null;
if(!L){if(djConfig.useXDomain&&!djConfig.dojoIframeHistoryUrl){console.debug("dojo.back: When using cross-domain Dojo builds, please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl to the path on your domain to iframe_history.html")
}L=window.frames.dj_history
}if(!H){H=document.createElement("a");
dojo.body().appendChild(H);
H.style.display="none"
}if(Z.changeUrl){W=""+((Z.changeUrl!==true)?Z.changeUrl:(new Date()).getTime());
if(F.length==0&&A.urlHash==W){A=Q(Y,Z,W);
return 
}else{if(F.length>0&&F[F.length-1].urlHash==W){F[F.length-1]=Q(Y,Z,W);
return 
}}J=true;
setTimeout(function(){M(W);
J=false
},1);
H.href=W;
if(dojo.isIE){Y=C();
var a=Z.back||Z.backButton||Z.handle;
var X=function(b){if(R()!=""){setTimeout(function(){M(W)
},1)
}a.apply(this,[b])
};
if(Z.back){Z.back=X
}else{if(Z.backButton){Z.backButton=X
}else{if(Z.handle){Z.handle=X
}}}var V=Z.forward||Z.forwardButton||Z.handle;
var U=function(b){if(R()!=""){M(W)
}if(V){V.apply(this,[b])
}};
if(Z.forward){Z.forward=U
}else{if(Z.forwardButton){Z.forwardButton=U
}else{if(Z.handle){Z.handle=U
}}}}else{if(!dojo.isIE){if(!T){T=setInterval(N,200)
}}}}else{Y=C()
}F.push(Q(Y,Z,W))
};
S._iframeLoaded=function(V,U){var W=K(U.href);
if(W==null){if(F.length==1){O()
}return 
}if(G){G=false;
return 
}if(F.length>=2&&W==K(F[F.length-2].url)){O()
}else{if(P.length>0&&W==K(P[P.length-1].url)){E()
}}}
})()
};