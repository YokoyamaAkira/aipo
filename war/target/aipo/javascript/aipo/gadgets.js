var gadgets=gadgets||{};
var shindig=shindig||{};
var osapi=osapi||{};
gadgets.config=function(){var C={};
var D;
return{register:function(B,G,H){var A=C[B];
if(!A){A=[];
C[B]=A
}A.push({validators:G||{},callback:H})
},get:function(A){if(A){return D[A]||{}
}return D
},init:function(T,M){D=T;
for(var B in C){if(C.hasOwnProperty(B)){var A=C[B],P=T[B];
for(var Q=0,R=A.length;
Q<R;
++Q){var O=A[Q];
if(P&&!M){var S=O.validators;
for(var N in S){if(S.hasOwnProperty(N)){if(!S[N](P[N])){throw new Error('Invalid config value "'+P[N]+'" for parameter "'+N+'" in component "'+B+'"')
}}}}if(O.callback){O.callback(T)
}}}}},EnumValidator:function(A){var B=[];
if(arguments.length>1){for(var G=0,H;
(H=arguments[G]);
++G){B.push(H)
}}else{B=A
}return function(F){for(var J=0,E;
(E=B[J]);
++J){if(F===B[J]){return true
}}return false
}
},RegExValidator:function(A){return function(B){return A.test(B)
}
},ExistsValidator:function(A){return typeof A!=="undefined"
},NonEmptyStringValidator:function(A){return typeof A==="string"&&A.length>0
},BooleanValidator:function(A){return typeof A==="boolean"
},LikeValidator:function(A){return function(G){for(var B in A){if(A.hasOwnProperty(B)){var H=A[B];
if(!H(G[B])){return false
}}}return true
}
}}
}();
gadgets.config.isGadget=false;
gadgets.config.isContainer=true;
gadgets.util=function(){function K(B){var A;
var D=B.indexOf("?");
var C=B.indexOf("#");
if(C===-1){A=B.substr(D+1)
}else{A=[B.substr(D+1,C-D-1),"&",B.substr(C+1)].join("")
}return A.split("&")
}var M=null;
var N={};
var O={};
var L=[];
var I={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true};
function P(B,A){return String.fromCharCode(A)
}function J(A){N=A["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,J)
}return{getUrlParameters:function(A){var S=typeof A==="undefined";
if(M!==null&&S){return M
}var E={};
var H=K(A||document.location.href);
var C=window.decodeURIComponent?decodeURIComponent:unescape;
for(var F=0,G=H.length;
F<G;
++F){var D=H[F].indexOf("=");
if(D===-1){continue
}var T=H[F].substring(0,D);
var B=H[F].substring(D+1);
B=B.replace(/\+/g," ");
E[T]=C(B)
}if(S){M=E
}return E
},makeClosure:function(A,E,F){var B=[];
for(var C=2,D=arguments.length;
C<D;
++C){B.push(arguments[C])
}return function(){var R=B.slice();
for(var G=0,H=arguments.length;
G<H;
++G){R.push(arguments[G])
}return E.apply(A,R)
}
},makeEnum:function(C){var B,D,A={};
for(B=0;
(D=C[B]);
++B){A[D]=D
}return A
},getFeatureParameters:function(A){return typeof N[A]==="undefined"?null:N[A]
},hasFeature:function(A){return typeof N[A]!=="undefined"
},getServices:function(){return O
},registerOnLoadHandler:function(A){L.push(A)
},runOnLoadHandlers:function(){for(var A=0,B=L.length;
A<B;
++A){L[A]()
}},escape:function(D,F){if(!D){return D
}else{if(typeof D==="string"){return gadgets.util.escapeString(D)
}else{if(typeof D==="array"){for(var A=0,C=D.length;
A<C;
++A){D[A]=gadgets.util.escape(D[A])
}}else{if(typeof D==="object"&&F){var B={};
for(var E in D){if(D.hasOwnProperty(E)){B[gadgets.util.escapeString(E)]=gadgets.util.escape(D[E],true)
}}return B
}}}}return D
},escapeString:function(F){if(!F){return F
}var C=[],A,E;
for(var B=0,D=F.length;
B<D;
++B){A=F.charCodeAt(B);
E=I[A];
if(E===true){C.push("&#",A,";")
}else{if(E!==false){C.push(F.charAt(B))
}}}return C.join("")
},unescapeString:function(A){if(!A){return A
}return A.replace(/&#([0-9]+);/g,P)
},attachBrowserEvent:function(B,C,A,D){if(typeof B.addEventListener!="undefined"){B.addEventListener(C,A,D)
}else{if(typeof B.attachEvent!="undefined"){B.attachEvent("on"+C,A)
}else{gadgets.warn("cannot attachBrowserEvent: "+C)
}}},removeBrowserEvent:function(B,C,A,D){if(B.removeEventListener){B.removeEventListener(C,A,D)
}else{if(B.detachEvent){B.detachEvent("on"+C,A)
}else{gadgets.warn("cannot removeBrowserEvent: "+C)
}}}}
}();
gadgets.util.getUrlParameters();
var tamings___=tamings___||[];
tamings___.push(function(B){caja___.whitelistFuncs([[gadgets.util,"escapeString"],[gadgets.util,"getFeatureParameters"],[gadgets.util,"getUrlParameters"],[gadgets.util,"hasFeature"],[gadgets.util,"registerOnLoadHandler"],[gadgets.util,"unescapeString"]])
});
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json=(function(){var B=/___$/;
return{parse:function(A){try{return window.JSON.parse(A)
}catch(D){return false
}},stringify:function(A){try{return window.JSON.stringify(A,function(C,F){return !B.test(C)?F:null
})
}catch(D){return null
}}}
})()
}else{gadgets.json=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",f(this.getUTCMonth()+1),"-",f(this.getUTCDate()),"T",f(this.getUTCHours()),":",f(this.getUTCMinutes()),":",f(this.getUTCSeconds()),"Z"].join("")
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;
switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c
}c=a.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}a=[];
if(typeof value.length==="number"&&!value.propertyIsEnumerable("length")){l=value.length;
for(i=0;
i<l;
i+=1){a.push(stringify(value[i])||"null")
}return"["+a.join(",")+"]"
}for(k in value){if(k.match("___$")){continue
}if(value.hasOwnProperty(k)){if(typeof k==="string"){v=stringify(value[k]);
if(v){a.push(stringify(k)+":"+v)
}}}}return"{"+a.join(",")+"}"
}return""
}return{stringify:stringify,parse:function(text){if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return eval("("+text+")")
}return false
}}
}()
}gadgets.json.flatten=function(G){var F={};
if(G===null||G===undefined){return F
}for(var E in G){if(G.hasOwnProperty(E)){var H=G[E];
if(null===H||undefined===H){continue
}F[E]=(typeof H==="string")?H:gadgets.json.stringify(H)
}}return F
};
var tamings___=tamings___||[];
tamings___.push(function(B){___.tamesTo(gadgets.json.stringify,safeJSON.stringify);
___.tamesTo(gadgets.json.parse,safeJSON.parse)
});
shindig.Auth=function(){var authToken=null;
var trusted=null;
function addParamsToToken(urlParams){var args=authToken.split("&");
for(var i=0;
i<args.length;
i++){var nameAndValue=args[i].split("=");
if(nameAndValue.length===2){var name=nameAndValue[0];
var value=nameAndValue[1];
if(value==="$"){value=encodeURIComponent(urlParams[name]);
args[i]=name+"="+value
}}}authToken=args.join("&")
}function init(configuration){var urlParams=gadgets.util.getUrlParameters();
var config=configuration["shindig.auth"]||{};
if(config.authToken){authToken=config.authToken
}else{if(urlParams.st){authToken=urlParams.st
}}if(authToken!==null){addParamsToToken(urlParams)
}if(config.trustedJson){trusted=eval("("+config.trustedJson+")")
}}gadgets.config.register("shindig.auth",null,init);
return{getSecurityToken:function(){return authToken
},updateSecurityToken:function(newToken){authToken=newToken
},getTrustedData:function(){return trusted
}}
};
shindig.auth=new shindig.Auth();
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.wpm){gadgets.rpctx.wpm=function(){var H,I;
function J(B,A,C){if(typeof window.addEventListener!="undefined"){window.addEventListener(B,A,C)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("on"+B,A)
}}}function F(B,A,C){if(window.removeEventListener){window.removeEventListener(B,A,C)
}else{if(window.detachEvent){window.detachEvent("on"+B,A)
}}}function G(B){var A=gadgets.json.parse(B.data);
if(!A||!A.f){return 
}var C=gadgets.rpc.getTargetOrigin(A.f);
if(typeof B.origin!=="undefined"?B.origin!==C:B.domain!==/^.+:\/\/([^:]+).*/.exec(C)[1]){return 
}H(A,B.origin)
}return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(B,A){H=B;
I=A;
J("message",G,false);
I("..",true);
return true
},setup:function(A,B){I(A,true);
return true
},call:function(D,A,B){var E=gadgets.rpc.getTargetOrigin(D);
var C=gadgets.rpc._getTargetWin(D);
if(E){window.setTimeout(function(){C.postMessage(gadgets.json.stringify(B),E)
},0)
}else{gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message")
}return true
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.flash){gadgets.rpctx.flash=function(){var k="___xpcswf";
var t=null;
var AA=false;
var z=null;
var AN=null;
var p=null;
var AM=100;
var s=50;
var AT=[];
var AL=null;
var AJ=0;
var o="_scr";
var AE="_pnt";
var AB=100;
var u=50;
var x=0;
var AF=null;
var l={};
var AR=window.location.protocol+"//"+window.location.host;
var w="___jsl";
var AG="_fm";
var AC;
function q(){window[w]=window[w]||{};
var B=window[w];
var A=B[AG]={};
AC=w+"."+AG;
return A
}var y=q();
function AK(A,C){var B=function(){A.apply({},arguments)
};
y[C]=y[C]||B;
return AC+"."+C
}function v(A){return A===".."?gadgets.rpc.RPC_ID:A
}function AQ(A){return A===".."?"INNER":"OUTER"
}function AO(A){if(AA){t=A.rpc.commSwf||"/xpc.swf"
}}gadgets.config.register("rpc",null,AO);
function n(){if(p===null&&document.body&&t){var A=t+"?cb="+Math.random()+"&origin="+AR+"&jsl=1";
var B=document.createElement("div");
B.style.height="1px";
B.style.width="1px";
var C='<object height="1" width="1" id="'+k+'" type="application/x-shockwave-flash"><param name="allowScriptAccess" value="always"></param><param name="movie" value="'+A+'"></param><embed type="application/x-shockwave-flash" allowScriptAccess="always" src="'+A+'" height="1" width="1"></embed></object>';
document.body.appendChild(B);
B.innerHTML=C;
p=B.firstChild
}++AJ;
if(AL!==null&&(p!==null||AJ>=s)){window.clearTimeout(AL)
}else{AL=window.setTimeout(n,AM)
}}function AS(){if(l[".."]){return 
}m("..");
x++;
if(x>=u&&AF!==null){window.clearTimeout(AF);
AF=null
}else{AF=window.setTimeout(AS,AB)
}}function AP(){if(p!==null){while(AT.length>0){var A=AT.shift();
var B=A.targetId;
p.setup(A.token,v(B),AQ(B))
}}}function AD(){AP();
if(AL!==null){window.clearTimeout(AL)
}AL=null
}AK(AD,"ready");
function AI(){if(!l[".."]&&AF===null){AF=window.setTimeout(AS,AB)
}}AK(AI,"setupDone");
function AH(A,D,F){var B=gadgets.rpc.getTargetOrigin(A);
var E=gadgets.rpc.getAuthToken(A);
var C="sendMessage_"+v(A)+"_"+E+"_"+AQ(A);
var G=p[C];
G.call(p,gadgets.json.stringify(F),B);
return true
}function r(A,D,E){var C=gadgets.json.parse(A);
var B=C[o];
if(B){AN(B,true);
l[B]=true;
if(B!==".."){m(B,true)
}return 
}window.setTimeout(function(){z(C,D)
},0)
}AK(r,"receiveMessage");
function m(D,A){var C=gadgets.rpc.RPC_ID;
var B={};
B[o]=A?"..":C;
B[AE]=C;
AH(D,C,B)
}return{getCode:function(){return"flash"
},isParentVerifiable:function(){return true
},init:function(A,B){z=A;
AN=B;
AA=true;
return true
},setup:function(A,B){AT.push({token:B,targetId:A});
if(p===null&&AL===null){AL=window.setTimeout(n,AM)
}AP();
return true
},call:AH,_receiveMessage:r,_ready:AD,_setupDone:AI}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.frameElement){gadgets.rpctx.frameElement=function(){var G="__g2c_rpc";
var J="__c2g_rpc";
var H;
var I;
function F(E,A,B){try{if(A!==".."){var L=window.frameElement;
if(typeof L[G]==="function"){if(typeof L[G][J]!=="function"){L[G][J]=function(K){H(gadgets.json.parse(K))
}
}L[G](gadgets.json.stringify(B));
return true
}}else{var C=document.getElementById(E);
if(typeof C[G]==="function"&&typeof C[G][J]==="function"){C[G][J](gadgets.json.stringify(B));
return true
}}}catch(D){}return false
}return{getCode:function(){return"fe"
},isParentVerifiable:function(){return false
},init:function(B,A){H=B;
I=A;
return true
},setup:function(A,E){if(A!==".."){try{var B=document.getElementById(A);
B[G]=function(L){H(gadgets.json.parse(L))
}
}catch(C){return false
}}if(A===".."){I("..",true);
var D=function(){window.setTimeout(function(){gadgets.rpc.call(A,gadgets.rpc.ACK)
},500)
};
gadgets.util.registerOnLoadHandler(D)
}return true
},call:function(C,A,B){return F(C,A,B)
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.nix){gadgets.rpctx.nix=function(){var L="GRPC____NIXVBS_wrapper";
var K="GRPC____NIXVBS_get_wrapper";
var S="GRPC____NIXVBS_handle_message";
var M="GRPC____NIXVBS_create_channel";
var N=10;
var O=500;
var P={};
var Q;
var R=0;
function T(){var A=P[".."];
if(A){return 
}if(++R>N){gadgets.warn("Nix transport setup failed, falling back...");
Q("..",false);
return 
}if(!A&&window.opener&&"GetAuthToken" in window.opener){A=window.opener;
if(A.GetAuthToken()==gadgets.rpc.getAuthToken("..")){var B=gadgets.rpc.getAuthToken("..");
A.CreateChannel(window[K]("..",B),B);
P[".."]=A;
window.opener=null;
Q("..",true);
return 
}}window.setTimeout(function(){T()
},O)
}return{getCode:function(){return"nix"
},isParentVerifiable:function(){return false
},init:function(A,D){Q=D;
if(typeof window[K]!=="unknown"){window[S]=function(E){window.setTimeout(function(){A(gadgets.json.parse(E))
},0)
};
window[M]=function(G,E,F){if(gadgets.rpc.getAuthToken(G)===F){P[G]=E;
Q(G,true)
}};
var B="Class "+L+"\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended = name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n "+S+"(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call "+M+"(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction "+K+"(name, auth)\nDim wrap\nSet wrap = New "+L+"\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet "+K+" = wrap\nEnd Function";
try{window.execScript(B,"vbscript")
}catch(C){return false
}}return true
},setup:function(C,B){if(C===".."){T();
return true
}try{var E=document.getElementById(C);
var D=window[K](C,B);
E.contentWindow.opener=D
}catch(A){return false
}return true
},call:function(B,C,D){try{if(P[B]){P[B].SendMessage(gadgets.json.stringify(D))
}}catch(A){return false
}return true
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.rmr){gadgets.rpctx.rmr=function(){var W=500;
var Y=10;
var V={};
var Q=gadgets.util.getUrlParameters()["parent"];
var O;
var U;
function S(B,D,C,E){var A=function(){document.body.appendChild(B);
B.src="about:blank";
if(E){B.onload=function(){R(E)
}
}B.src=D+"#"+C
};
if(document.body){A()
}else{gadgets.util.registerOnLoadHandler(function(){A()
})
}}function N(B){if(typeof V[B]==="object"){return 
}var A=document.createElement("iframe");
var D=A.style;
D.position="absolute";
D.top="0px";
D.border="0";
D.opacity="0";
D.width="10px";
D.height="1px";
A.id="rmrtransport-"+B;
A.name=A.id;
var C=gadgets.rpc.getRelayUrl(B);
var E=gadgets.rpc.getOrigin(Q);
if(!C){C=E+"/robots.txt"
}V[B]={frame:A,receiveWindow:null,relayUri:C,relayOrigin:E,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0,verifySendToken:String(Math.random()),verifyRecvToken:null,originVerified:false};
if(B!==".."){S(A,C,P(B))
}Z(B)
}function Z(C){var A=null;
V[C].searchCounter++;
try{var D=gadgets.rpc._getTargetWin(C);
if(C===".."){A=D.frames["rmrtransport-"+gadgets.rpc.RPC_ID]
}else{A=D.frames["rmrtransport-.."]
}}catch(B){}var E=false;
if(A){E=X(C,A)
}if(!E){if(V[C].searchCounter>Y){return 
}window.setTimeout(function(){Z(C)
},W)
}}function T(G,E,A,B){var F=null;
if(A!==".."){F=V[".."]
}else{F=V[G]
}if(F){if(E!==gadgets.rpc.ACK){F.queue.push(B)
}if(F.waiting||(F.queue.length===0&&!(E===gadgets.rpc.ACK&&B&&B.ackAlone===true))){return true
}if(F.queue.length>0){F.waiting=true
}var H=F.relayUri+"#"+P(G);
try{F.frame.contentWindow.location=H;
var D=F.width==10?20:10;
F.frame.style.width=D+"px";
F.width=D
}catch(C){return false
}}return true
}function P(C){var B=V[C];
var D={id:B.sendId};
if(B){D.d=Array.prototype.slice.call(B.queue,0);
var A={s:gadgets.rpc.ACK,id:B.recvId};
if(!B.originVerified){A.sendToken=B.verifySendToken
}if(B.verifyRecvToken){A.recvToken=B.verifyRecvToken
}D.d.push(A)
}return gadgets.json.stringify(D)
}function R(B){var E=V[B];
var I=E.receiveWindow.location.hash.substring(1);
var A=gadgets.json.parse(decodeURIComponent(I))||{};
var L=A.d||[];
var K=false;
var F=false;
var D=0;
var M=(E.recvId-A.id);
for(var J=0;
J<L.length;
++J){var G=L[J];
if(G.s===gadgets.rpc.ACK){U(B,true);
E.verifyRecvToken=G.sendToken;
if(!E.originVerified&&G.recvToken&&String(G.recvToken)==String(E.verifySendToken)){E.originVerified=true
}if(E.waiting){F=true
}E.waiting=false;
var H=Math.max(0,G.id-E.sendId);
E.queue.splice(0,H);
E.sendId=Math.max(E.sendId,G.id||0);
continue
}K=true;
if(++D<=M){continue
}++E.recvId;
O(G,E.originVerified?E.relayOrigin:undefined)
}if(K||(F&&E.queue.length>0)){var C=(B==="..")?gadgets.rpc.RPC_ID:"..";
T(B,gadgets.rpc.ACK,C,{ackAlone:K})
}}function X(D,A){var E=V[D];
try{var F=false;
F="document" in A;
if(!F){return false
}F=typeof A.document=="object";
if(!F){return false
}var B=A.location.href;
if(B==="about:blank"){return false
}}catch(G){return false
}E.receiveWindow=A;
function C(){R(D)
}if(typeof A.attachEvent==="undefined"){A.onresize=C
}else{A.attachEvent("onresize",C)
}if(D===".."){S(E.frame,E.relayUri,P(D),D)
}else{R(D)
}return true
}return{getCode:function(){return"rmr"
},isParentVerifiable:function(){return true
},init:function(B,A){O=B;
U=A;
return true
},setup:function(A,C){try{N(A)
}catch(B){gadgets.warn("Caught exception setting up RMR: "+B);
return false
}return true
},call:function(C,A,B){return T(C,B.s,A,B)
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.ifpc){gadgets.rpctx.ifpc=function(){var J=[];
var M=0;
var N;
var I=2000;
var K={};
function O(B){var D=[];
for(var A=0,C=B.length;
A<C;
++A){D.push(encodeURIComponent(gadgets.json.stringify(B[A])))
}return D.join("&")
}function P(A){var C;
for(var D=J.length-1;
D>=0;
--D){var E=J[D];
try{if(E&&(E.recyclable||E.readyState==="complete")){E.parentNode.removeChild(E);
if(window.ActiveXObject){J[D]=E=null;
J.splice(D,1)
}else{E.recyclable=false;
C=E;
break
}}}catch(B){}}if(!C){C=document.createElement("iframe");
C.style.border=C.style.width=C.style.height="0px";
C.style.visibility="hidden";
C.style.position="absolute";
C.onload=function(){this.recyclable=true
};
J.push(C)
}C.src=A;
window.setTimeout(function(){document.body.appendChild(C)
},0)
}function L(C,A){for(var B=A-1;
B>=0;
--B){if(typeof C[B]==="undefined"){return false
}}return true
}return{getCode:function(){return"ifpc"
},isParentVerifiable:function(){return true
},init:function(B,A){N=A;
N("..",true);
return true
},setup:function(A,B){N(A,true);
return true
},call:function(B,C,D){var U=gadgets.rpc.getRelayUrl(B);
++M;
if(!U){gadgets.warn("No relay file assigned for IFPC");
return false
}var X=null,W=[];
if(D.l){var F=D.a;
X=[U,"#",O([C,M,1,0,O([C,D.s,"","",C].concat(F))])].join("");
W.push(X)
}else{X=[U,"#",B,"&",C,"@",M,"&"].join("");
var A=encodeURIComponent(gadgets.json.stringify(D)),G=I-X.length,E=Math.ceil(A.length/G),H=0,V;
while(A.length>0){V=A.substring(0,G);
A=A.substring(G);
W.push([X,E,"&",H,"&",V].join(""));
H+=1
}}do{P(W.shift())
}while(W.length>0);
return true
},_receiveMessage:function(D,F){var E=D[1],G=parseInt(D[2],10),B=parseInt(D[3],10),A=D[D.length-1],C=G===1;
if(G>1){if(!K[E]){K[E]=[]
}K[E][B]=A;
if(L(K[E],G)){A=K[E].join("");
delete K[E];
C=true
}}if(C){F(gadgets.json.parse(decodeURIComponent(A)))
}}}
}()
}if(!window.gadgets.rpc){gadgets.rpc=function(){var Au="__cb";
var An="";
var Am="__ack";
var Aa=500;
var A0=10;
var Ae="|";
var AM="callback";
var AZ="origin";
var AO="referer";
var AP={};
var Aj={};
var A3={};
var A5={};
var AE=0;
var AU={};
var AT={};
var Ap={};
var Ac={};
var AS={};
var A2={};
var Ab=null;
var AQ=null;
var AD=(window.top!==window.self);
var AL=window.name;
var Ax=function(){};
var Aq=0;
var Ah=1;
var Af=2;
var AH=window.console;
var Ak=AH&&AH.log&&function(A){AH.log(A)
}||function(){};
var Ao=(function(){function A(B){return function(){Ak(B+": call ignored")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:A("init"),setup:A("setup"),call:A("call")}
})();
if(gadgets.util){Ac=gadgets.util.getUrlParameters()
}function Aw(){if(Ac.rpctx=="flash"){return gadgets.rpctx.flash
}if(Ac.rpctx=="rmr"){return gadgets.rpctx.rmr
}return typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?(gadgets.rpctx.flash?gadgets.rpctx.flash:gadgets.rpctx.nix):navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc
}function AV(A,C){if(AS[A]){return 
}var E=Az;
if(!C){E=Ao
}AS[A]=E;
var F=A2[A]||[];
for(var D=0;
D<F.length;
++D){var B=F[D];
B.t=A1(A);
E.call(A,B.f,B)
}A2[A]=[]
}var Ay=false,Al=false;
function As(){if(Al){return 
}function A(){Ay=true
}if(typeof window.addEventListener!="undefined"){window.addEventListener("unload",A,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onunload",A)
}}Al=true
}function AW(E,A,D,B,C){if(!A5[A]||A5[A]!==D){gadgets.error("Invalid auth token. "+A5[A]+" vs "+D);
Ax(A,Af)
}C.onunload=function(){if(AT[A]&&!Ay){Ax(A,Ah);
gadgets.rpc.removeReceiver(A)
}};
As();
B=gadgets.json.parse(decodeURIComponent(B))
}function Ag(A,D){if(A&&typeof A.s==="string"&&typeof A.f==="string"&&A.a instanceof Array){if(A5[A.f]){if(A5[A.f]!==A.t){gadgets.error("Invalid auth token. "+A5[A.f]+" vs "+A.t);
Ax(A.f,Af)
}}if(A.s===Am){window.setTimeout(function(){AV(A.f,true)
},0);
return 
}if(A.c){A[AM]=function(F){gadgets.rpc.call(A.f,Au,null,A.c,F)
}
}if(D){var C=AN(D);
A[AZ]=D;
var B=A.r;
if(!B||AN(B)!=C){B=D
}A[AO]=B
}var E=(AP[A.s]||AP[An]).apply(A,A.a);
if(A.c&&typeof E!=="undefined"){gadgets.rpc.call(A.f,Au,null,A.c,E)
}}}function AN(E){if(!E){return""
}E=E.toLowerCase();
if(E.indexOf("//")==0){E=window.location.protocol+E
}if(E.indexOf("://")==-1){E=window.location.protocol+"//"+E
}var D=E.substring(E.indexOf("://")+3);
var G=D.indexOf("/");
if(G!=-1){D=D.substring(0,G)
}var B=E.substring(0,E.indexOf("://"));
var C="";
var A=D.indexOf(":");
if(A!=-1){var F=D.substring(A+1);
D=D.substring(0,A);
if((B==="http"&&F!=="80")||(B==="https"&&F!=="443")){C=":"+F
}}return B+"://"+D+C
}function A4(A,B){return"/"+A+(B?Ae+B:"")
}function AF(A){if(A.charAt(0)=="/"){var C=A.indexOf(Ae);
var B=C>0?A.substring(1,C):A.substring(1);
var D=C>0?A.substring(C+1):null;
return{id:B,origin:D}
}else{return null
}}function AG(A){if(typeof A==="undefined"||A===".."){return window.parent
}var B=AF(A);
if(B){return window.top.frames[B.id]
}A=String(A);
var C=window.frames[A];
if(C){return C
}C=document.getElementById(A);
if(C&&C.contentWindow){return C.contentWindow
}return null
}function Av(A){var B=null;
var D=Ar(A);
if(D){B=D
}else{var C=AF(A);
if(C){B=C.origin
}else{if(A==".."){B=Ac.parent
}else{B=document.getElementById(A).src
}}}return AN(B)
}var Az=Aw();
AP[An]=function(){Ak("Unknown RPC service: "+this.s)
};
AP[Au]=function(B,C){var A=AU[B];
if(A){delete AU[B];
A.call(this,C)
}};
function Ai(A,C){if(AT[A]===true){return 
}if(typeof AT[A]==="undefined"){AT[A]=0
}var B=AG(A);
if(A===".."||B!=null){if(Az.setup(A,C)===true){AT[A]=true;
return 
}}if(AT[A]!==true&&AT[A]++<A0){window.setTimeout(function(){Ai(A,C)
},Aa)
}else{AS[A]=Ao;
AT[A]=true
}}function At(E,B){if(typeof Ap[E]==="undefined"){Ap[E]=false;
var C=Ar(E);
if(AN(C)!==AN(window.location.href)){return false
}var D=AG(E);
try{var A=D.gadgets;
Ap[E]=A.rpc.receiveSameDomain
}catch(F){}}if(typeof Ap[E]==="function"){Ap[E](B);
return true
}return false
}function Ar(A){var B=Aj[A];
if(B&&B.substring(0,1)==="/"){if(B.substring(1,2)==="/"){B=document.location.protocol+B
}else{B=document.location.protocol+"//"+document.location.host+B
}}return B
}function AJ(B,C,A){if(!/http(s)?:\/\/.+/.test(C)){if(C.indexOf("//")==0){C=window.location.protocol+C
}else{if(C.charAt(0)=="/"){C=window.location.protocol+"//"+window.location.host+C
}else{if(C.indexOf("://")==-1){C=window.location.protocol+"//"+C
}}}}Aj[B]=C;
A3[B]=!!A
}function A1(A){return A5[A]
}function Ad(B,A){A=A||"";
A5[B]=String(A);
Ai(B,A)
}function AK(B){var C=B.passReferrer||"";
var A=C.split(":",2);
Ab=A[0]||"none";
AQ=A[1]||"origin"
}function AY(B,C){function A(E){var F=E?E.rpc:{};
var D=String(F.useLegacyProtocol)==="true";
AK(F);
var G=F.parentRelayUrl||"";
G=AN(Ac.parent||C)+G;
AJ("..",G,D);
if(D){Az=gadgets.rpctx.ifpc;
Az.init(Ag,AV)
}Ad("..",B)
}if(!Ac.parent&&C){A({});
return 
}gadgets.config.register("rpc",null,A)
}function AR(F,B,H){if(F.charAt(0)!="/"){if(!gadgets.util){return 
}var C=document.getElementById(F);
if(!C){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+F+", element not found.")
}}var G=C&&C.src;
var E=B||gadgets.rpc.getOrigin(G);
AJ(F,E);
var A=gadgets.util.getUrlParameters(G);
var D=H||A.rpctoken;
Ad(F,D)
}function AX(D,B,A){if(D===".."){var C=A||Ac.rpctoken||Ac.ifpctok||"";
AY(C,B)
}else{AR(D,B,A)
}}function AI(B){if(Ab==="bidir"||(Ab==="c2p"&&B==="..")||(Ab==="p2c"&&B!=="..")){var C=window.location.href;
var A="?";
if(AQ==="query"){A="#"
}else{if(AQ==="hash"){return C
}}var D=C.lastIndexOf(A);
D=D===-1?C.length:D;
return C.substring(0,D)
}return null
}return{config:function(A){if(typeof A.securityCallback==="function"){Ax=A.securityCallback
}},register:function(A,B){if(A===Au||A===Am){throw new Error("Cannot overwrite callback/ack service")
}if(A===An){throw new Error("Cannot overwrite default service: use registerDefault")
}AP[A]=B
},unregister:function(A){if(A===Au||A===Am){throw new Error("Cannot delete callback/ack service")
}if(A===An){throw new Error("Cannot delete default service: use unregisterDefault")
}delete AP[A]
},registerDefault:function(A){AP[An]=A
},unregisterDefault:function(){delete AP[An]
},forceParentVerifiable:function(){if(!Az.isParentVerifiable()){Az=gadgets.rpctx.ifpc
}},call:function(G,E,H,B){G=G||"..";
var A="..";
if(G===".."){A=AL
}else{if(G.charAt(0)=="/"){A=A4(AL,gadgets.rpc.getOrigin(window.location.href))
}}++AE;
if(H){AU[AE]=H
}var C={s:E,f:A,c:H?AE:0,a:Array.prototype.slice.call(arguments,3),t:A5[G],l:A3[G]};
var F=AI(G);
if(F){C.r=F
}if(G!==".."&&AF(G)==null&&!document.getElementById(G)){return 
}if(At(G,C)){return 
}var D=AS[G];
if(!D&&AF(G)!==null){D=Az
}if(!D){if(!A2[G]){A2[G]=[C]
}else{A2[G].push(C)
}return 
}if(A3[G]){D=gadgets.rpctx.ifpc
}if(D.call(G,A,C)===false){AS[G]=Ao;
Az.call(G,A,C)
}},getRelayUrl:Ar,setRelayUrl:AJ,setAuthToken:Ad,setupReceiver:AX,getAuthToken:A1,removeReceiver:function(A){delete Aj[A];
delete A3[A];
delete A5[A];
delete AT[A];
delete Ap[A];
delete AS[A]
},getRelayChannel:function(){return Az.getCode()
},receive:function(A,B){if(A.length>4){Az._receiveMessage(A,Ag)
}else{AW.apply(null,A.concat(B))
}},receiveSameDomain:function(A){A.a=Array.prototype.slice.call(A.a);
window.setTimeout(function(){Ag(A)
},0)
},getOrigin:AN,getTargetOrigin:Av,init:function(){if(Az.init(Ag,AV)===false){Az=Ao
}if(AD){AX("..")
}else{gadgets.config.register("rpc",null,function(A){AK(A.rpc||{})
})
}},_getTargetWin:AG,_parseSiblingId:AF,ACK:Am,RPC_ID:AL||"..",SEC_ERROR_LOAD_TIMEOUT:Aq,SEC_ERROR_FRAME_PHISH:Ah,SEC_ERROR_FORGED_MSG:Af}
}();
gadgets.rpc.init()
}gadgets.io=function(){var config={};
var oauthState;
function makeXhr(){var x;
if(typeof shindig!="undefined"&&shindig.xhrwrapper&&shindig.xhrwrapper.createXHR){return shindig.xhrwrapper.createXHR()
}else{if(typeof ActiveXObject!="undefined"){x=new ActiveXObject("Msxml2.XMLHTTP");
if(!x){x=new ActiveXObject("Microsoft.XMLHTTP")
}return x
}else{if(typeof XMLHttpRequest!="undefined"||window.XMLHttpRequest){return new window.XMLHttpRequest()
}else{throw ("no xhr available")
}}}}function hadError(xobj,callback){if(xobj.readyState!==4){return true
}try{if(xobj.status!==200){var error=(""+xobj.status);
if(xobj.responseText){error=error+" "+xobj.responseText
}callback({errors:[error],rc:xobj.status,text:xobj.responseText});
return true
}}catch(e){callback({errors:[e.number+" Error not specified"],rc:e.number,text:e.description});
return true
}return false
}function processNonProxiedResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var data={body:xobj.responseText};
callback(transformResponseData(params,data))
}var UNPARSEABLE_CRUFT="throw 1; < don't be evil' >";
function processResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var txt=xobj.responseText;
var offset=txt.indexOf(UNPARSEABLE_CRUFT)+UNPARSEABLE_CRUFT.length;
if(offset<UNPARSEABLE_CRUFT.length){return 
}txt=txt.substr(offset);
var data=eval("("+txt+")");
data=data[url];
if(data.oauthState){oauthState=data.oauthState
}if(data.st){shindig.auth.updateSecurityToken(data.st)
}callback(transformResponseData(params,data))
}function transformResponseData(params,data){var resp={text:data.body,rc:data.rc||200,headers:data.headers,oauthApprovalUrl:data.oauthApprovalUrl,oauthError:data.oauthError,oauthErrorText:data.oauthErrorText,errors:[]};
if(resp.rc<200||resp.rc>=400){resp.errors=[resp.rc+" Error"]
}else{if(resp.text){if(resp.rc>=300&&resp.rc<400){params.CONTENT_TYPE="TEXT"
}switch(params.CONTENT_TYPE){case"JSON":case"FEED":resp.data=gadgets.json.parse(resp.text);
if(!resp.data){resp.errors.push("500 Failed to parse JSON");
resp.rc=500;
resp.data=null
}break;
case"DOM":var dom;
if(typeof ActiveXObject!="undefined"){dom=new ActiveXObject("Microsoft.XMLDOM");
dom.async=false;
dom.validateOnParse=false;
dom.resolveExternals=false;
if(!dom.loadXML(resp.text)){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}else{var parser=new DOMParser();
dom=parser.parseFromString(resp.text,"text/xml");
if("parsererror"===dom.documentElement.nodeName){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}break;
default:resp.data=resp.text;
break
}}}return resp
}function makeXhrRequest(realUrl,proxyUrl,callback,paramData,method,params,processResponseFunction,opt_contentType){var xhr=makeXhr();
if(proxyUrl.indexOf("//")==0){proxyUrl=document.location.protocol+proxyUrl
}xhr.open(method,proxyUrl,true);
if(callback){xhr.onreadystatechange=gadgets.util.makeClosure(null,processResponseFunction,realUrl,callback,params,xhr)
}if(paramData!==null){xhr.setRequestHeader("Content-Type",opt_contentType||"application/x-www-form-urlencoded");
xhr.send(paramData)
}else{xhr.send(null)
}}function respondWithPreload(postData,params,callback){if(gadgets.io.preloaded_&&postData.httpMethod==="GET"){for(var i=0;
i<gadgets.io.preloaded_.length;
i++){var preload=gadgets.io.preloaded_[i];
if(preload&&(preload.id===postData.url)){delete gadgets.io.preloaded_[i];
if(preload.rc!==200){callback({rc:preload.rc,errors:[preload.rc+" Error"]})
}else{if(preload.oauthState){oauthState=preload.oauthState
}var resp={body:preload.body,rc:preload.rc,headers:preload.headers,oauthApprovalUrl:preload.oauthApprovalUrl,oauthError:preload.oauthError,oauthErrorText:preload.oauthErrorText,errors:[]};
callback(transformResponseData(params,resp))
}return true
}}}return false
}function init(configuration){config=configuration["core.io"]||{}
}var requiredConfig={proxyUrl:new gadgets.config.RegExValidator(/.*%(raw)?url%.*/),jsonProxyUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("core.io",requiredConfig,init);
return{makeRequest:function(url,callback,opt_params){var params=opt_params||{};
var httpMethod=params.METHOD||"GET";
var refreshInterval=params.REFRESH_INTERVAL;
var auth,st;
if(params.AUTHORIZATION&&params.AUTHORIZATION!=="NONE"){auth=params.AUTHORIZATION.toLowerCase();
st=shindig.auth.getSecurityToken()
}else{if(httpMethod==="GET"&&refreshInterval===undefined){refreshInterval=3600
}}var signOwner=true;
if(typeof params.OWNER_SIGNED!=="undefined"){signOwner=params.OWNER_SIGNED
}var signViewer=true;
if(typeof params.VIEWER_SIGNED!=="undefined"){signViewer=params.VIEWER_SIGNED
}var headers=params.HEADERS||{};
if(httpMethod==="POST"&&!headers["Content-Type"]){headers["Content-Type"]="application/x-www-form-urlencoded"
}var urlParams=gadgets.util.getUrlParameters();
var paramData={url:url,httpMethod:httpMethod,headers:gadgets.io.encodeValues(headers,false),postData:params.POST_DATA||"",authz:auth||"",st:st||"",contentType:params.CONTENT_TYPE||"TEXT",numEntries:params.NUM_ENTRIES||"3",getSummaries:!!params.GET_SUMMARIES,signOwner:signOwner,signViewer:signViewer,gadget:urlParams.url,container:urlParams.container||urlParams.synd||"default",bypassSpecCache:gadgets.util.getUrlParameters().nocache||"",getFullHeaders:!!params.GET_FULL_HEADERS};
if(auth==="oauth"||auth==="signed"){if(gadgets.io.oauthReceivedCallbackUrl_){paramData.OAUTH_RECEIVED_CALLBACK=gadgets.io.oauthReceivedCallbackUrl_;
gadgets.io.oauthReceivedCallbackUrl_=null
}paramData.oauthState=oauthState||"";
for(var opt in params){if(params.hasOwnProperty(opt)){if(opt.indexOf("OAUTH_")===0){paramData[opt]=params[opt]
}}}}var proxyUrl=config.jsonProxyUrl.replace("%host%",document.location.host);
if(!respondWithPreload(paramData,params,callback,processResponse)){if(httpMethod==="GET"&&refreshInterval>0){var extraparams="?refresh="+refreshInterval+"&"+gadgets.io.encodeValues(paramData);
makeXhrRequest(url,proxyUrl+extraparams,callback,null,"GET",params,processResponse)
}else{makeXhrRequest(url,proxyUrl,callback,gadgets.io.encodeValues(paramData),"POST",params,processResponse)
}}},makeNonProxiedRequest:function(relativeUrl,callback,opt_params,opt_contentType){var params=opt_params||{};
makeXhrRequest(relativeUrl,relativeUrl,callback,params.POST_DATA,params.METHOD,params,processNonProxiedResponse,opt_contentType)
},clearOAuthState:function(){oauthState=undefined
},encodeValues:function(fields,opt_noEscaping){var escape=!opt_noEscaping;
var buf=[];
var first=false;
for(var i in fields){if(fields.hasOwnProperty(i)&&!/___$/.test(i)){if(!first){first=true
}else{buf.push("&")
}buf.push(escape?encodeURIComponent(i):i);
buf.push("=");
buf.push(escape?encodeURIComponent(fields[i]):fields[i])
}}return buf.join("")
},getProxyUrl:function(url,opt_params){return url
}}
}();
gadgets.io.RequestParameters=gadgets.util.makeEnum(["METHOD","CONTENT_TYPE","POST_DATA","HEADERS","AUTHORIZATION","NUM_ENTRIES","GET_SUMMARIES","GET_FULL_HEADERS","REFRESH_INTERVAL","OAUTH_SERVICE_NAME","OAUTH_USE_TOKEN","OAUTH_TOKEN_NAME","OAUTH_REQUEST_TOKEN","OAUTH_REQUEST_TOKEN_SECRET","OAUTH_RECEIVED_CALLBACK"]);
gadgets.io.MethodType=gadgets.util.makeEnum(["GET","POST","PUT","DELETE","HEAD"]);
gadgets.io.ContentType=gadgets.util.makeEnum(["TEXT","DOM","JSON","FEED"]);
gadgets.io.AuthorizationType=gadgets.util.makeEnum(["NONE","SIGNED","OAUTH"]);
var tamings___=tamings___||[];
tamings___.push(function(B){caja___.whitelistFuncs([[gadgets.io,"encodeValues"],[gadgets.io,"getProxyUrl"],[gadgets.io,"makeRequest"]])
});
gadgets.log=(function(){var M=1;
var I=2;
var L=3;
var O=4;
var N=function(A){P(M,A)
};
gadgets.warn=function(A){P(I,A)
};
gadgets.error=function(A){P(L,A)
};
gadgets.setLogLevel=function(A){J=A
};
function P(A,B){if(A<J||!K){return 
}if(A===I&&K.warn){K.warn(B)
}else{if(A===L&&K.error){K.error(B)
}else{if(K.log){K.log(B)
}}}}N.INFO=M;
N.WARNING=I;
N.NONE=O;
var J=M;
var K=window.console?window.console:window.opera?window.opera.postError:undefined;
return N
})();
var tamings___=tamings___||[];
tamings___.push(function(B){___.grantRead(gadgets.log,"INFO");
___.grantRead(gadgets.log,"WARNING");
___.grantRead(gadgets.log,"ERROR");
___.grantRead(gadgets.log,"NONE");
caja___.whitelistFuncs([[gadgets,"log"],[gadgets,"warn"],[gadgets,"error"],[gadgets,"setLogLevel"]])
});
shindig.uri=(function(){var B=new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?");
return function(a){var h="";
var l="";
var w="";
var r="";
var v=null;
var q="";
var p=null;
var n=window.decodeURIComponent?decodeURIComponent:unescape;
var b=window.encodeURIComponent?encodeURIComponent:escape;
var o=null;
function e(C){if(C.match(B)===null){throw"Malformed URL: "+C
}h=RegExp.$1;
l=RegExp.$2;
w=RegExp.$3;
r=RegExp.$4;
q=RegExp.$5
}function f(E){var F=[];
for(var H=0,D=E.length;
H<D;
++H){var C=E[H][0];
var G=E[H][1];
if(G===undefined){continue
}F.push(b(C)+(G!==null?"="+b(G):""))
}return F.join("&")
}function i(){if(v){r=f(v);
v=null
}return r
}function A(){if(p){q=f(p);
p=null
}return q
}function k(C){v=v||t(r);
return g(v,C)
}function c(C){p=p||t(q);
return g(p,C)
}function x(C,D){v=m(v||t(r),C,D);
return o
}function s(C,D){p=m(p||t(q),C,D);
return o
}function d(){return[h,h!==""?":":"",l!==""?"//":"",l].join("")
}function j(){var C=i();
var D=A();
return[d(),w,C!==""?"?":"",C,D!==""?"#":"",D].join("")
}function t(E){var F=[];
var G=E.split("&");
for(var J=0,D=G.length;
J<D;
++J){var H=G[J].split("=");
var C=H.shift();
var I=null;
if(H.length>0){I=H.join("").replace(/\+/g," ")
}F.push([C,I!=null?n(I):null])
}return F
}function g(D,E){for(var F=0,C=D.length;
F<C;
++F){if(D[F][0]==E){return D[F][1]
}}return undefined
}function m(H,G,I){var E=G;
if(typeof G==="string"){E={};
E[G]=I
}for(var J in E){var F=false;
for(var C=0,D=H.length;
!F&&C<D;
++C){if(H[C][0]==J){H[C][1]=E[J];
F=true
}}if(!F){H.push([J,E[J]])
}}return H
}function u(C,D){C=C||"";
if(C[0]===D){C=C.substr(D.length)
}return C
}if(typeof a==="object"&&typeof a.toString==="function"){e(a.toString())
}else{if(a){e(a)
}}o={getSchema:function(){return h
},getAuthority:function(){return l
},getOrigin:d,getPath:function(){return w
},getQuery:i,getFragment:A,getQP:k,getFP:c,setSchema:function(C){h=C;
return o
},setAuthority:function(C){l=C;
return o
},setPath:function(C){w=(C[0]==="/"?"":"/")+C;
return o
},setQuery:function(C){v=null;
r=u(C,"?");
return o
},setFragment:function(C){p=null;
q=u(C,"#");
return o
},setQP:x,setFP:s,setExistingP:function(D,C){if(k(D,C)!==undefined){x(D,C)
}if(c(D,C)!==undefined){s(D,C)
}return o
},toString:j};
return o
}
})();
(function(){osapi._registerMethod=function(I,J){var H=typeof ___!=="undefined";
if(I=="newBatch"){return 
}var L=I.split(".");
var M=osapi;
for(var N=0;
N<L.length-1;
N++){M[L[N]]=M[L[N]]||{};
M=M[L[N]]
}var K=function(A){var B=osapi.newBatch();
var C={};
C.execute=function(F){var E=H?___.untame(F):F;
var D=H?___.USELESS:this;
B.add(I,this);
B.execute(function(G){if(G.error){E.call(D,G.error)
}else{E.call(D,G[I])
}})
};
if(H){___.markInnocent(C.execute,"execute")
}A=A||{};
A.userId=A.userId||"@viewer";
A.groupId=A.groupId||"@self";
C.method=I;
C.transport=J;
C.rpc=A;
return C
};
if(H&&typeof ___.markInnocent!=="undefined"){___.markInnocent(K,I)
}if(M[L[L.length-1]]){}else{M[L[L.length-1]]=K
}}
})();
(function(){var B=function(){var I={};
var J=[];
var A=function(D,C){if(C&&D){J.push({key:D,request:C})
}return I
};
var G=function(C){var D={method:C.request.method,id:C.key};
if(C.request.rpc){D.params=C.request.rpc
}return D
};
var H=function(T){var S={};
var C={};
var Q=0;
var P=[];
for(var E=0;
E<J.length;
E++){var R=J[E].request.transport;
if(!C[R.name]){P.push(R);
Q++
}C[R.name]=C[R.name]||[];
C[R.name].push(G(J[E]))
}var D=function(K){if(K.error){S.error=K.error
}for(var L=0;
L<J.length;
L++){var M=J[L].key;
var N=K[M];
if(N){if(N.error){S[M]=N
}else{S[M]=N.data||N.result
}}}Q--;
if(Q===0){T(S)
}};
for(var F=0;
F<P.length;
F++){P[F].execute(C[P[F].name],D)
}if(Q==0){window.setTimeout(function(){T(S)
},0)
}};
I.execute=H;
I.add=A;
return I
};
osapi.newBatch=B
})();
(function(){function C(A,B){function I(G){if(G.errors[0]){B({error:{code:G.rc,message:G.text}})
}else{var F=G.result||G.data;
if(F.error){B(F)
}else{var H={};
for(var E=0;
E<F.length;
E++){H[F[E].id]=F[E]
}B(H)
}}}var J={POST_DATA:gadgets.json.stringify(A),CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED"};
var L=this.name;
var K=shindig.auth.getSecurityToken();
if(K){L+="?st=";
L+=encodeURIComponent(K)
}gadgets.io.makeNonProxiedRequest(L,I,J,"application/json")
}function D(K){var B=K["osapi.services"];
if(B){for(var L in B){if(B.hasOwnProperty(L)){if(L.indexOf("http")==0||L.indexOf("//")==0){var N=L.replace("%host%",document.location.host);
var A={name:N,execute:C};
var M=B[L];
for(var J=0;
J<M.length;
J++){osapi._registerMethod(M[J],A)
}}}}}}if(gadgets.config){gadgets.config.register("osapi.services",null,D)
}})();
if(gadgets&&gadgets.rpc){(function(){function C(A,B){var F=function(I){if(!I){B({code:500,message:"Container refused the request"})
}else{if(I.error){B(I)
}else{var J={};
for(var E=0;
E<I.length;
E++){J[I[E].id]=I[E]
}B(J)
}}};
gadgets.rpc.call("..","osapi._handleGadgetRpcMethod",F,A)
}function D(B){var Q={name:"gadgets.rpc",execute:C};
var L=B["osapi.services"];
if(L){for(var A in L){if(L.hasOwnProperty(A)){if(A==="gadgets.rpc"){var R=L[A];
for(var O=0;
O<R.length;
O++){osapi._registerMethod(R[O],Q)
}}}}}if(osapi.container&&osapi.container.listMethods){var P=gadgets.util.runOnLoadHandlers;
var N=2;
var M=function(){N--;
if(N==0){P()
}};
gadgets.util.runOnLoadHandlers=M;
osapi.container.listMethods({}).execute(function(E){if(!E.error){for(var F=0;
F<E.length;
F++){if(E[F]!="container.listMethods"){osapi._registerMethod(E[F],Q)
}}}M()
});
window.setTimeout(M,500)
}}if(gadgets.config&&gadgets.config.isGadget){gadgets.config.register("osapi.services",null,D)
}})()
}gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){osapi.people.getViewer=function(B){B=B||{};
B.userId="@viewer";
B.groupId="@self";
return osapi.people.get(B)
};
osapi.people.getViewerFriends=function(B){B=B||{};
B.userId="@viewer";
B.groupId="@friends";
return osapi.people.get(B)
};
osapi.people.getOwner=function(B){B=B||{};
B.userId="@owner";
B.groupId="@self";
return osapi.people.get(B)
};
osapi.people.getOwnerFriends=function(B){B=B||{};
B.userId="@owner";
B.groupId="@friends";
return osapi.people.get(B)
}
}});
var tamings___=tamings___||[];
tamings___.push(function(C){___.tamesTo(osapi.newBatch,___.markFuncFreeze(function(){var A=osapi.newBatch();
___.markInnocent(A.add,"add");
___.markInnocent(A.execute,"execute");
return ___.tame(A)
}));
C.outers.osapi=___.tame(osapi);
___.grantRead(C.outers,"osapi");
var D=C;
gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){caja___.whitelistFuncs([[osapi.people,"getViewer"],[osapi.people,"getViewerFriends"],[osapi.people,"getOwner"],[osapi.people,"getOwnerFriends"]]);
D.outers.osapi.people.getViewer=___.tame(osapi.people.getViewer);
D.outers.osapi.people.getViewerFriends=___.tame(osapi.people.getViewerFriends);
D.outers.osapi.people.getOwner=___.tame(osapi.people.getOwner);
D.outers.osapi.people.getOwnerFriends=___.tame(osapi.people.getOwnerFriends)
}})
});
shindig._uri=shindig.uri;
shindig.uri=(function(){var E=shindig._uri;
shindig._uri=null;
function D(A,B){return A.getOrigin()==B.getOrigin()
}function F(I,B){if(I.getSchema()==""){I.setSchema(B.getSchema())
}if(I.getAuthority()==""){I.setAuthority(B.getAuthority())
}var C=I.getPath();
if(C==""||C.charAt(0)!="/"){var A=B.getPath();
var J=A.lastIndexOf("/");
if(J!=-1){A=A.substring(0,J+1)
}I.setPath(B.getPath()+C)
}}return function(B){var A=E(B);
A.hasSameOrigin=function(C){return D(A,C)
};
A.resolve=function(C){return F(A,C)
};
return A
}
})();
Function.prototype.inherits=function(C){function D(){}D.prototype=C.prototype;
this.superClass_=C.prototype;
this.prototype=new D();
this.prototype.constructor=this
};
shindig.cookies={};
shindig.cookies.JsType_={UNDEFINED:"undefined"};
shindig.cookies.isDef=function(B){return typeof B!=shindig.cookies.JsType_.UNDEFINED
};
shindig.cookies.set=function(L,P,Q,M,K){if(/;=/g.test(L)){throw new Error('Invalid cookie name "'+L+'"')
}if(/;/g.test(P)){throw new Error('Invalid cookie value "'+P+'"')
}if(!shindig.cookies.isDef(Q)){Q=-1
}var S=K?";domain="+K:"";
var O=M?";path="+M:"";
var T;
if(Q<0){T=""
}else{if(Q===0){var R=new Date(1970,1,1);
T=";expires="+R.toUTCString()
}else{var N=new Date((new Date).getTime()+Q*1000);
T=";expires="+N.toUTCString()
}}document.cookie=L+"="+P+S+O+T
};
shindig.cookies.get=function(P,K){var L=P+"=";
var N=String(document.cookie);
for(var J=-1;
(J=N.indexOf(L,J+1))>=0;
){var O=J;
while(--O>=0){var M=N.charAt(O);
if(M==";"){O=-1;
break
}}if(O==-1){var I=N.indexOf(";",J);
if(I<0){I=N.length
}return N.substring(J+L.length,I)
}}return K
};
shindig.cookies.remove=function(H,E,G){var F=shindig.cookies.containsKey(H);
shindig.cookies.set(H,"",0,E,G);
return F
};
shindig.cookies.getKeyValues_=function(){var K=String(document.cookie);
var I=K.split(/\s*;\s*/);
var J=[],H=[],M,N;
for(var L=0;
N=I[L];
L++){M=N.indexOf("=");
if(M==-1){J.push("");
H.push(N)
}else{J.push(N.substring(0,M));
H.push(N.substring(M+1))
}}return{keys:J,values:H}
};
shindig.cookies.getKeys=function(){return shindig.cookies.getKeyValues_().keys
};
shindig.cookies.getValues=function(){return shindig.cookies.getKeyValues_().values
};
shindig.cookies.isEmpty=function(){return document.cookie===""
};
shindig.cookies.getCount=function(){var C=String(document.cookie);
if(C===""){return 0
}var D=C.split(/\s*;\s*/);
return D.length
};
shindig.cookies.containsKey=function(D){var C={};
return shindig.cookies.get(D,C)!==C
};
shindig.cookies.containsValue=function(E){var D=shindig.cookies.getKeyValues_().values;
for(var F=0;
F<D.length;
F++){if(D[F]==E){return true
}}return false
};
shindig.cookies.clear=function(){var D=shindig.cookies.getKeyValues_().keys;
for(var C=D.length-1;
C>=0;
C--){shindig.cookies.remove(D[C])
}};
shindig.cookies.MAX_COOKIE_LENGTH=3950;
shindig.errors={};
shindig.errors.SUBCLASS_RESPONSIBILITY="subclass responsibility";
shindig.errors.TO_BE_DONE="to be done";
shindig.callAsyncAndJoin=function(K,H,L){var J=K.length;
var M=[];
for(var N=0;
N<K.length;
N++){var I=function(B){var A=K[B];
if(typeof A==="string"){A=L[A]
}A.call(L,function(C){M[B]=C;
if(--J===0){H(M)
}})
};
I(N)
}};
shindig.Extensible=function(){};
shindig.Extensible.prototype.setDependencies=function(C){for(var D in C){this[D]=C[D]
}};
shindig.Extensible.prototype.getDependencies=function(B){return this[B]
};
shindig.UserPrefStore=function(){};
shindig.UserPrefStore.prototype.getPrefs=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.UserPrefStore.prototype.savePrefs=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.DefaultUserPrefStore=function(){shindig.UserPrefStore.call(this)
};
shindig.DefaultUserPrefStore.inherits(shindig.UserPrefStore);
shindig.DefaultUserPrefStore.prototype.getPrefs=function(B){};
shindig.DefaultUserPrefStore.prototype.savePrefs=function(B){};
shindig.GadgetService=function(){};
shindig.GadgetService.prototype.setHeight=function(D,C){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.GadgetService.prototype.setTitle=function(C,D){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.GadgetService.prototype.setUserPref=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.IfrGadgetService=function(){shindig.GadgetService.call(this);
gadgets.rpc.register("resize_iframe",this.setHeight);
gadgets.rpc.register("set_pref",this.setUserPref);
gadgets.rpc.register("set_title",this.setTitle);
gadgets.rpc.register("requestNavigateTo",this.requestNavigateTo);
gadgets.rpc.register("requestSendMessage",this.requestSendMessage)
};
shindig.IfrGadgetService.inherits(shindig.GadgetService);
shindig.IfrGadgetService.prototype.setHeight=function(C){if(C>shindig.container.maxheight_){C=shindig.container.maxheight_
}var D=document.getElementById(this.f);
if(D){D.style.height=C+"px"
}};
shindig.IfrGadgetService.prototype.setTitle=function(D){var C=document.getElementById(this.f+"_title");
if(C){C.innerHTML=D.replace(/&/g,"&amp;").replace(/</g,"&lt;")
}};
shindig.IfrGadgetService.prototype.setUserPref=function(I,N,L){var J=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
var K=shindig.container.getGadget(J);
for(var M=1,H=arguments.length;
M<H;
M+=2){this.userPrefs[arguments[M]].value=arguments[M+1]
}K.saveUserPrefs()
};
shindig.IfrGadgetService.prototype.requestSendMessage=function(E,F,H,G){if(H){window.setTimeout(function(){H(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
shindig.IfrGadgetService.prototype.requestNavigateTo=function(F,H){var G=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
var J=shindig.container.gadgetService.getUrlForView(F);
if(H){var I=gadgets.json.stringify(H);
if(I.length>0){J+="&appParams="+encodeURIComponent(I)
}}if(J&&document.location.href.indexOf(J)==-1){document.location.href=J
}};
shindig.IfrGadgetService.prototype.getUrlForView=function(B){if(B==="canvas"){return"/canvas"
}else{if(B==="profile"){return"/profile"
}else{return null
}}};
shindig.IfrGadgetService.prototype.getGadgetIdFromModuleId=function(B){return parseInt(B.match(/_([0-9]+)$/)[1],10)
};
shindig.LayoutManager=function(){};
shindig.LayoutManager.prototype.getGadgetChrome=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.StaticLayoutManager=function(){shindig.LayoutManager.call(this)
};
shindig.StaticLayoutManager.inherits(shindig.LayoutManager);
shindig.StaticLayoutManager.prototype.setGadgetChromeIds=function(B){this.gadgetChromeIds_=B
};
shindig.StaticLayoutManager.prototype.getGadgetChrome=function(D){var C=this.gadgetChromeIds_[D.id];
return C?document.getElementById(C):null
};
shindig.FloatLeftLayoutManager=function(B){shindig.LayoutManager.call(this);
this.layoutRootId_=B
};
shindig.FloatLeftLayoutManager.inherits(shindig.LayoutManager);
shindig.FloatLeftLayoutManager.prototype.getGadgetChrome=function(E){var F=document.getElementById(this.layoutRootId_);
if(F){var D=document.createElement("div");
D.className="gadgets-gadget-chrome";
D.style.cssFloat="left";
F.appendChild(D);
return D
}else{return null
}};
shindig.Gadget=function(D){this.userPrefs={};
if(D){for(var C in D){if(D.hasOwnProperty(C)){this[C]=D[C]
}}}if(!this.secureToken){this.secureToken="john.doe:john.doe:appid:cont:url:0:default"
}};
shindig.Gadget.prototype.getUserPrefs=function(){return this.userPrefs
};
shindig.Gadget.prototype.saveUserPrefs=function(){shindig.container.userPrefStore.savePrefs(this)
};
shindig.Gadget.prototype.getUserPrefValue=function(D){var C=this.userPrefs[D];
return typeof (C.value)!="undefined"&&C.value!=null?C.value:C["default"]
};
shindig.Gadget.prototype.render=function(C){if(C){var D=this;
this.getContent(function(A){C.innerHTML=A;
D.finishRender(C)
})
}};
shindig.Gadget.prototype.getContent=function(B){shindig.callAsyncAndJoin(["getTitleBarContent","getUserPrefsDialogContent","getMainContent"],function(A){B(A.join(""))
},this)
};
shindig.Gadget.prototype.getTitleBarContent=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getUserPrefsDialogContent=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getMainContent=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.finishRender=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getAdditionalParams=function(){return""
};
shindig.BaseIfrGadget=function(B){shindig.Gadget.call(this,B);
this.serverBase_="/gadgets/";
this.queryIfrGadgetType_()
};
shindig.BaseIfrGadget.inherits(shindig.Gadget);
shindig.BaseIfrGadget.prototype.GADGET_IFRAME_PREFIX_="remote_iframe_";
shindig.BaseIfrGadget.prototype.CONTAINER="default";
shindig.BaseIfrGadget.prototype.cssClassGadget="gadgets-gadget";
shindig.BaseIfrGadget.prototype.cssClassTitleBar="gadgets-gadget-title-bar";
shindig.BaseIfrGadget.prototype.cssClassTitle="gadgets-gadget-title";
shindig.BaseIfrGadget.prototype.cssClassTitleButtonBar="gadgets-gadget-title-button-bar";
shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialog="gadgets-gadget-user-prefs-dialog";
shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialogActionBar="gadgets-gadget-user-prefs-dialog-action-bar";
shindig.BaseIfrGadget.prototype.cssClassTitleButton="gadgets-gadget-title-button";
shindig.BaseIfrGadget.prototype.cssClassGadgetContent="gadgets-gadget-content";
shindig.BaseIfrGadget.prototype.rpcToken=(2147483647*Math.random())|0;
shindig.BaseIfrGadget.prototype.rpcRelay="../container/rpc_relay.html";
shindig.BaseIfrGadget.prototype.getTitleBarContent=function(C){var D=this.hasViewablePrefs_()?'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleOpenUserPrefsDialog();return false;" class="'+this.cssClassTitleButton+'">settings</a> ':"";
C('<div id="'+this.cssClassTitleBar+"-"+this.id+'" class="'+this.cssClassTitleBar+'"><span id="'+this.getIframeId()+'_title" class="'+this.cssClassTitle+'">'+(this.title?this.title:"Title")+'</span> | <span class="'+this.cssClassTitleButtonBar+'">'+D+'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleToggle();return false;" class="'+this.cssClassTitleButton+'">toggle</a></span></div>')
};
shindig.BaseIfrGadget.prototype.getUserPrefsDialogContent=function(B){B('<div id="'+this.getUserPrefsDialogId()+'" class="'+this.cssClassGadgetUserPrefsDialog+'"></div>')
};
shindig.BaseIfrGadget.prototype.setServerBase=function(B){this.serverBase_=B
};
shindig.BaseIfrGadget.prototype.getServerBase=function(){return this.serverBase_
};
shindig.BaseIfrGadget.prototype.getMainContent=function(C){var D=this;
window.setTimeout(function(){D.getMainContent(C)
},0)
};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.id
};
shindig.BaseIfrGadget.prototype.getUserPrefsDialogId=function(){return this.getIframeId()+"_userPrefsDialog"
};
shindig.BaseIfrGadget.prototype.getUserPrefsParams=function(){var D="";
for(var C in this.getUserPrefs()){D+="&up_"+encodeURIComponent(C)+"="+encodeURIComponent(this.getUserPrefValue(C))
}return D
};
shindig.BaseIfrGadget.prototype.handleToggle=function(){var F=document.getElementById(this.getIframeId());
if(F){var D=F.parentNode;
var E=D.style.display;
D.style.display=E?"":"none"
}};
shindig.BaseIfrGadget.prototype.hasViewablePrefs_=function(){for(var D in this.getUserPrefs()){var C=this.userPrefs[D];
if(C.type!="hidden"){return true
}}return false
};
shindig.BaseIfrGadget.prototype.handleOpenUserPrefsDialog=function(){if(this.userPrefsDialogContentLoaded){this.showUserPrefsDialog()
}else{var E=this;
var F="ig_callback_"+this.id;
window[F]=function(A){E.userPrefsDialogContentLoaded=true;
E.buildUserPrefsDialog(A);
E.showUserPrefsDialog()
};
var D=document.createElement("script");
D.src="http://www.gmodules.com/ig/gadgetsettings?mid="+this.id+"&output=js"+this.getUserPrefsParams()+"&url="+this.specUrl;
document.body.appendChild(D)
}};
shindig.BaseIfrGadget.prototype.buildUserPrefsDialog=function(C){var D=document.getElementById(this.getUserPrefsDialogId());
D.innerHTML=C+'<div class="'+this.cssClassGadgetUserPrefsDialogActionBar+'"><input type="button" value="Save" onclick="shindig.container.getGadget('+this.id+').handleSaveUserPrefs()"> <input type="button" value="Cancel" onclick="shindig.container.getGadget('+this.id+').handleCancelUserPrefs()"></div>';
D.childNodes[0].style.display=""
};
shindig.BaseIfrGadget.prototype.showUserPrefsDialog=function(C){var D=document.getElementById(this.getUserPrefsDialogId());
D.style.display=(C||C===undefined)?"":"none"
};
shindig.BaseIfrGadget.prototype.hideUserPrefsDialog=function(){this.showUserPrefsDialog(false)
};
shindig.BaseIfrGadget.prototype.handleSaveUserPrefs=function(){this.hideUserPrefsDialog();
var G=document.getElementById("m_"+this.id+"_numfields").value;
for(var J=0;
J<G;
J++){var L=document.getElementById("m_"+this.id+"_"+J);
var H="m_"+this.id+"_up_";
var K=L.name.substring(H.length);
var I=L.value;
this.userPrefs[K].value=I
}this.saveUserPrefs();
this.refresh()
};
shindig.BaseIfrGadget.prototype.handleCancelUserPrefs=function(){this.hideUserPrefsDialog()
};
shindig.BaseIfrGadget.prototype.refresh=function(){var B=this.getIframeId();
document.getElementById(B).src=this.getIframeUrl()
};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var I={context:{country:"default",language:"default",view:"default",container:"default"},gadgets:[{url:this.specUrl,moduleId:1}]};
var J={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(I)};
var F=this.serverBase_+"metadata?st="+this.secureToken;
gadgets.io.makeNonProxiedRequest(F,H,J,"application/javascript");
var G=this;
function H(B){var A=false;
var L=B.data.gadgets[0].features;
for(var D=0;
D<L.length;
D++){if(L[D]==="pubsub-2"){A=true;
break
}}var C=A?shindig.OAAIfrGadget:shindig.IfrGadget;
for(var E in C){if(C.hasOwnProperty(E)){G[E]=C[E]
}}}};
shindig.IfrGadget={getMainContent:function(C){var D=this.getIframeId();
gadgets.rpc.setRelayUrl(D,this.serverBase_+this.rpcRelay);
gadgets.rpc.setAuthToken(D,this.rpcToken);
C('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+D+'" name="'+D+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no" scrolling="no"'+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")
},finishRender:function(B){window.frames[this.getIframeId()].location=this.getIframeUrl()
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(shindig.container.parentUrl_?"&parent="+encodeURIComponent(shindig.container.parentUrl_):"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+"#rpctoken="+this.rpcToken+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"&"+this.hashData:"")
}};
shindig.OAAIfrGadget={getMainContent:function(B){B('<div id="'+this.cssClassGadgetContent+"-"+this.id+'" class="'+this.cssClassGadgetContent+'"></div>')
},finishRender:function(C){var D={className:this.cssClassGadget,frameborder:"no",scrolling:"no"};
if(this.height){D.height=this.height
}if(this.width){D.width=this.width
}new OpenAjax.hub.IframeContainer(gadgets.pubsub2router.hub,this.getIframeId(),{Container:{onSecurityAlert:function(A,B){gadgets.error("Security error for container "+A.getClientID()+" : "+B);
A.getIframe().src="about:blank"
}},IframeContainer:{parent:document.getElementById(this.cssClassGadgetContent+"-"+this.id),uri:this.getIframeUrl(),tunnelURI:shindig.uri(this.serverBase_+this.rpcRelay).resolve(shindig.uri(window.location.href)),iframeAttrs:D}})
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"#"+this.hashData:"")
}};
shindig.Container=function(){this.gadgets_={};
this.parentUrl_=document.location.href+"://"+document.location.host;
this.country_="ALL";
this.language_="ALL";
this.view_="default";
this.nocache_=1;
this.maxheight_=2147483647
};
shindig.Container.inherits(shindig.Extensible);
shindig.Container.prototype.gadgetClass=shindig.Gadget;
shindig.Container.prototype.userPrefStore=new shindig.DefaultUserPrefStore();
shindig.Container.prototype.gadgetService=new shindig.GadgetService();
shindig.Container.prototype.layoutManager=new shindig.StaticLayoutManager();
shindig.Container.prototype.setParentUrl=function(B){this.parentUrl_=B
};
shindig.Container.prototype.setCountry=function(B){this.country_=B
};
shindig.Container.prototype.setNoCache=function(B){this.nocache_=B
};
shindig.Container.prototype.setLanguage=function(B){this.language_=B
};
shindig.Container.prototype.setView=function(B){this.view_=B
};
shindig.Container.prototype.setMaxHeight=function(B){this.maxheight_=B
};
shindig.Container.prototype.getGadgetKey_=function(B){return"gadget_"+B
};
shindig.Container.prototype.getGadget=function(B){return this.gadgets_[this.getGadgetKey_(B)]
};
shindig.Container.prototype.createGadget=function(B){return new this.gadgetClass(B)
};
shindig.Container.prototype.addGadget=function(B){B.id=this.getNextGadgetInstanceId();
this.gadgets_[this.getGadgetKey_(B.id)]=B
};
shindig.Container.prototype.addGadgets=function(C){for(var D=0;
D<C.length;
D++){this.addGadget(C[D])
}};
shindig.Container.prototype.renderGadgets=function(){for(var B in this.gadgets_){this.renderGadget(this.gadgets_[B])
}};
shindig.Container.prototype.renderGadget=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Container.prototype.nextGadgetInstanceId_=0;
shindig.Container.prototype.getNextGadgetInstanceId=function(){return this.nextGadgetInstanceId_++
};
shindig.Container.prototype.refreshGadgets=function(){for(var B in this.gadgets_){this.gadgets_[B].refresh()
}};
shindig.IfrContainer=function(){shindig.Container.call(this)
};
shindig.IfrContainer.inherits(shindig.Container);
shindig.IfrContainer.prototype.gadgetClass=shindig.BaseIfrGadget;
shindig.IfrContainer.prototype.gadgetService=new shindig.IfrGadgetService();
shindig.IfrContainer.prototype.setParentUrl=function(B){if(!B.match(/^http[s]?:\/\//)){B=document.location.href.match(/^[^?#]+\//)[0]+B
}this.parentUrl_=B
};
shindig.IfrContainer.prototype.renderGadget=function(D){var C=this.layoutManager.getGadgetChrome(D);
D.render(C)
};
shindig.container=new shindig.IfrContainer();
if(gadgets&&gadgets.rpc){osapi._handleGadgetRpcMethod=function(M){var Q=new Array(M.length);
var R=0;
var O=this.callback;
var L=function(A,B){B({})
};
for(var J=0;
J<M.length;
J++){var P=osapi;
if(M[J].method.indexOf("_")==-1){var N=M[J].method.split(".");
for(var K=0;
K<N.length;
K++){if(P.hasOwnProperty(N[K])){P=P[N[K]]
}else{P=L;
break
}}}else{P=L
}P(M[J].params,function(A){return function(B){Q[A]={id:M[A].id,data:B};
R++;
if(R==M.length){O(Q)
}}
}(J))
}};
osapi.container={};
osapi.container.listMethods=function(D,E){var F=[];
recurseNames(osapi,"",5,F);
E(F)
};
function recurseNames(K,J,I,L){if(I==0){return 
}for(var H in K){if(K.hasOwnProperty(H)){if(H.indexOf("_")==-1){var G=typeof (K[H]);
if(G=="function"){L.push(J+H)
}else{if(G=="object"){recurseNames(K[H],J+H+".",I-1,L)
}}}}}}gadgets.rpc.register("osapi._handleGadgetRpcMethod",osapi._handleGadgetRpcMethod)
}gadgets.config.init({"shindig.auth":{},osapi:{endPoints:["https://%host%/rpc"]},"osapi.services":{"gadgets.rpc":["container.listMethods"],"https://%host%/rpc":["activities.supportedFields","activities.update","gadgets.metadata","activities.delete","activities.get","appdata.update","http.put","http.post","gadgets.tokenSupportedFields","appdata.get","activities.create","system.listMethods","cache.invalidate","groups.get","people.supportedFields","http.get","http.head","appdata.delete","http.delete","aipo.version","gadgets.token","appdata.create","people.get","gadgets.supportedFields"]},rpc:{parentRelayUrl:"/gadgets/files/container/rpc_relay.html",useLegacyProtocol:false},"core.io":{proxyUrl:"//%host%/gadgets/proxy?container=default&refresh=%refresh%&url=%url%%rewriteMime%",jsonProxyUrl:"//%host%/gadgets/makeRequest"}});