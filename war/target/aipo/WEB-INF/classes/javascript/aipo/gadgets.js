var gadgets=gadgets||{};
var shindig=shindig||{};
var osapi=osapi||{};
gadgets.config=function(){var D={};
var C;
return{register:function(A,B,G){var H=D[A];
if(!H){H=[];
D[A]=H
}H.push({validators:B||{},callback:G})
},get:function(A){if(A){return C[A]||{}
}return C
},init:function(T,M){C=T;
for(var B in D){if(D.hasOwnProperty(B)){var A=D[B],P=T[B];
for(var Q=0,R=A.length;
Q<R;
++Q){var O=A[Q];
if(P&&!M){var S=O.validators;
for(var N in S){if(S.hasOwnProperty(N)){if(!S[N](P[N])){throw new Error('Invalid config value "'+P[N]+'" for parameter "'+N+'" in component "'+B+'"')
}}}}if(O.callback){O.callback(T)
}}}}},EnumValidator:function(H){var A=[];
if(arguments.length>1){for(var B=0,G;
(G=arguments[B]);
++B){A.push(G)
}}else{A=H
}return function(F){for(var J=0,E;
(E=A[J]);
++J){if(F===A[J]){return true
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
gadgets.util=function(){function P(A){var D;
var C=A.indexOf("?");
var B=A.indexOf("#");
if(B===-1){D=A.substr(C+1)
}else{D=[A.substr(C+1,B-C-1),"&",A.substr(B+1)].join("")
}return D.split("&")
}var J=null;
var K={};
var L={};
var I=[];
var N={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true};
function M(A,B){return String.fromCharCode(B)
}function O(A){K=A["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,O)
}return{getUrlParameters:function(G){var E=typeof G==="undefined";
if(J!==null&&E){return J
}var A={};
var D=P(G||document.location.href);
var S=window.decodeURIComponent?decodeURIComponent:unescape;
for(var B=0,C=D.length;
B<C;
++B){var T=D[B].indexOf("=");
if(T===-1){continue
}var F=D[B].substring(0,T);
var H=D[B].substring(T+1);
H=H.replace(/\+/g," ");
A[F]=S(H)
}if(E){J=A
}return A
},makeClosure:function(D,B,C){var E=[];
for(var F=2,A=arguments.length;
F<A;
++F){E.push(arguments[F])
}return function(){var G=E.slice();
for(var H=0,R=arguments.length;
H<R;
++H){G.push(arguments[H])
}return B.apply(D,G)
}
},makeEnum:function(B){var A,C,D={};
for(A=0;
(C=B[A]);
++A){D[C]=C
}return D
},getFeatureParameters:function(A){return typeof K[A]==="undefined"?null:K[A]
},hasFeature:function(A){return typeof K[A]!=="undefined"
},getServices:function(){return L
},registerOnLoadHandler:function(A){I.push(A)
},runOnLoadHandlers:function(){for(var B=0,A=I.length;
B<A;
++B){I[B]()
}},escape:function(A,C){if(!A){return A
}else{if(typeof A==="string"){return gadgets.util.escapeString(A)
}else{if(typeof A==="array"){for(var D=0,F=A.length;
D<F;
++D){A[D]=gadgets.util.escape(A[D])
}}else{if(typeof A==="object"&&C){var E={};
for(var B in A){if(A.hasOwnProperty(B)){E[gadgets.util.escapeString(B)]=gadgets.util.escape(A[B],true)
}}return E
}}}}return A
},escapeString:function(C){if(!C){return C
}var F=[],D,B;
for(var E=0,A=C.length;
E<A;
++E){D=C.charCodeAt(E);
B=N[D];
if(B===true){F.push("&#",D,";")
}else{if(B!==false){F.push(C.charAt(E))
}}}return F.join("")
},unescapeString:function(A){if(!A){return A
}return A.replace(/&#([0-9]+);/g,M)
},attachBrowserEvent:function(A,B,D,C){if(typeof A.addEventListener!="undefined"){A.addEventListener(B,D,C)
}else{if(typeof A.attachEvent!="undefined"){A.attachEvent("on"+B,D)
}else{gadgets.warn("cannot attachBrowserEvent: "+B)
}}},removeBrowserEvent:function(A,B,D,C){if(A.removeEventListener){A.removeEventListener(B,D,C)
}else{if(A.detachEvent){A.detachEvent("on"+B,D)
}else{gadgets.warn("cannot removeBrowserEvent: "+B)
}}}}
}();
gadgets.util.getUrlParameters();
var tamings___=tamings___||[];
tamings___.push(function(B){caja___.whitelistFuncs([[gadgets.util,"escapeString"],[gadgets.util,"getFeatureParameters"],[gadgets.util,"getUrlParameters"],[gadgets.util,"hasFeature"],[gadgets.util,"registerOnLoadHandler"],[gadgets.util,"unescapeString"]])
});
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json=(function(){var B=/___$/;
return{parse:function(D){try{return window.JSON.parse(D)
}catch(A){return false
}},stringify:function(D){try{return window.JSON.stringify(D,function(C,F){return !B.test(C)?F:null
})
}catch(A){return null
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
}gadgets.json.flatten=function(H){var G={};
if(H===null||H===undefined){return G
}for(var F in H){if(H.hasOwnProperty(F)){var E=H[F];
if(null===E||undefined===E){continue
}G[F]=(typeof E==="string")?E:gadgets.json.stringify(E)
}}return G
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
if(!gadgets.rpctx.wpm){gadgets.rpctx.wpm=function(){var I,J;
function F(A,C,B){if(typeof window.addEventListener!="undefined"){window.addEventListener(A,C,B)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("on"+A,C)
}}}function G(A,C,B){if(window.removeEventListener){window.removeEventListener(A,C,B)
}else{if(window.detachEvent){window.detachEvent("on"+A,C)
}}}function H(A){var C=gadgets.json.parse(A.data);
if(!C||!C.f){return 
}var B=gadgets.rpc.getTargetOrigin(C.f);
if(typeof A.origin!=="undefined"?A.origin!==B:A.domain!==/^.+:\/\/([^:]+).*/.exec(B)[1]){return 
}I(C,A.origin)
}return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(A,B){I=A;
J=B;
F("message",H,false);
J("..",true);
return true
},setup:function(B,A){J(B,true);
return true
},call:function(C,E,A){var D=gadgets.rpc.getTargetOrigin(C);
var B=gadgets.rpc._getTargetWin(C);
if(D){window.setTimeout(function(){B.postMessage(gadgets.json.stringify(A),D)
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
var A=window[w];
var B=A[AG]={};
AC=w+"."+AG;
return B
}var y=q();
function AK(C,B){var A=function(){C.apply({},arguments)
};
y[B]=y[B]||A;
return AC+"."+B
}function v(A){return A===".."?gadgets.rpc.RPC_ID:A
}function AQ(A){return A===".."?"INNER":"OUTER"
}function AO(A){if(AA){t=A.rpc.commSwf||"/xpc.swf"
}}gadgets.config.register("rpc",null,AO);
function n(){if(p===null&&document.body&&t){var C=t+"?cb="+Math.random()+"&origin="+AR+"&jsl=1";
var A=document.createElement("div");
A.style.height="1px";
A.style.width="1px";
var B='<object height="1" width="1" id="'+k+'" type="application/x-shockwave-flash"><param name="allowScriptAccess" value="always"></param><param name="movie" value="'+C+'"></param><embed type="application/x-shockwave-flash" allowScriptAccess="always" src="'+C+'" height="1" width="1"></embed></object>';
document.body.appendChild(A);
A.innerHTML=B;
p=A.firstChild
}++AJ;
if(AL!==null&&(p!==null||AJ>=s)){window.clearTimeout(AL)
}else{AL=window.setTimeout(n,AM)
}}function AS(){if(l[".."]){return 
}m("..");
x++;
if(x>=u&&AF!==null){window.clearTimeout(AF);
AF=null
}else{AF=window.setTimeout(AS,AB)
}}function AP(){if(p!==null){while(AT.length>0){var B=AT.shift();
var A=B.targetId;
p.setup(B.token,v(A),AQ(A))
}}}function AD(){AP();
if(AL!==null){window.clearTimeout(AL)
}AL=null
}AK(AD,"ready");
function AI(){if(!l[".."]&&AF===null){AF=window.setTimeout(AS,AB)
}}AK(AI,"setupDone");
function AH(C,F,A){var D=gadgets.rpc.getTargetOrigin(C);
var G=gadgets.rpc.getAuthToken(C);
var E="sendMessage_"+v(C)+"_"+G+"_"+AQ(C);
var B=p[E];
B.call(p,gadgets.json.stringify(A),D);
return true
}function r(C,A,B){var E=gadgets.json.parse(C);
var D=E[o];
if(D){AN(D,true);
l[D]=true;
if(D!==".."){m(D,true)
}return 
}window.setTimeout(function(){z(E,A)
},0)
}AK(r,"receiveMessage");
function m(B,C){var A=gadgets.rpc.RPC_ID;
var D={};
D[o]=C?"..":A;
D[AE]=A;
AH(B,A,D)
}return{getCode:function(){return"flash"
},isParentVerifiable:function(){return true
},init:function(B,A){z=B;
AN=A;
AA=true;
return true
},setup:function(B,A){AT.push({token:A,targetId:B});
if(p===null&&AL===null){AL=window.setTimeout(n,AM)
}AP();
return true
},call:AH,_receiveMessage:r,_ready:AD,_setupDone:AI}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.frameElement){gadgets.rpctx.frameElement=function(){var H="__g2c_rpc";
var F="__c2g_rpc";
var I;
var J;
function G(D,E,A){try{if(E!==".."){var L=window.frameElement;
if(typeof L[H]==="function"){if(typeof L[H][F]!=="function"){L[H][F]=function(K){I(gadgets.json.parse(K))
}
}L[H](gadgets.json.stringify(A));
return true
}}else{var B=document.getElementById(D);
if(typeof B[H]==="function"&&typeof B[H][F]==="function"){B[H][F](gadgets.json.stringify(A));
return true
}}}catch(C){}return false
}return{getCode:function(){return"fe"
},isParentVerifiable:function(){return false
},init:function(A,B){I=A;
J=B;
return true
},setup:function(E,D){if(E!==".."){try{var A=document.getElementById(E);
A[H]=function(L){I(gadgets.json.parse(L))
}
}catch(B){return false
}}if(E===".."){J("..",true);
var C=function(){window.setTimeout(function(){gadgets.rpc.call(E,gadgets.rpc.ACK)
},500)
};
gadgets.util.registerOnLoadHandler(C)
}return true
},call:function(B,C,A){return G(B,C,A)
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.nix){gadgets.rpctx.nix=function(){var P="GRPC____NIXVBS_wrapper";
var O="GRPC____NIXVBS_get_wrapper";
var M="GRPC____NIXVBS_handle_message";
var Q="GRPC____NIXVBS_create_channel";
var R=10;
var S=500;
var T={};
var K;
var L=0;
function N(){var B=T[".."];
if(B){return 
}if(++L>R){gadgets.warn("Nix transport setup failed, falling back...");
K("..",false);
return 
}if(!B&&window.opener&&"GetAuthToken" in window.opener){B=window.opener;
if(B.GetAuthToken()==gadgets.rpc.getAuthToken("..")){var A=gadgets.rpc.getAuthToken("..");
B.CreateChannel(window[O]("..",A),A);
T[".."]=B;
window.opener=null;
K("..",true);
return 
}}window.setTimeout(function(){N()
},S)
}return{getCode:function(){return"nix"
},isParentVerifiable:function(){return false
},init:function(B,A){K=A;
if(typeof window[O]!=="unknown"){window[M]=function(E){window.setTimeout(function(){B(gadgets.json.parse(E))
},0)
};
window[Q]=function(G,E,F){if(gadgets.rpc.getAuthToken(G)===F){T[G]=E;
K(G,true)
}};
var C="Class "+P+"\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended = name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n "+M+"(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call "+Q+"(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction "+O+"(name, auth)\nDim wrap\nSet wrap = New "+P+"\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet "+O+" = wrap\nEnd Function";
try{window.execScript(C,"vbscript")
}catch(D){return false
}}return true
},setup:function(D,C){if(D===".."){N();
return true
}try{var A=document.getElementById(D);
var E=window[O](D,C);
A.contentWindow.opener=E
}catch(B){return false
}return true
},call:function(C,D,A){try{if(T[C]){T[C].SendMessage(gadgets.json.stringify(A))
}}catch(B){return false
}return true
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.rmr){gadgets.rpctx.rmr=function(){var N=500;
var P=10;
var Z={};
var U=gadgets.util.getUrlParameters()["parent"];
var S;
var Y;
function W(A,C,B,D){var E=function(){document.body.appendChild(A);
A.src="about:blank";
if(D){A.onload=function(){V(D)
}
}A.src=C+"#"+B
};
if(document.body){E()
}else{gadgets.util.registerOnLoadHandler(function(){E()
})
}}function R(A){if(typeof Z[A]==="object"){return 
}var E=document.createElement("iframe");
var C=E.style;
C.position="absolute";
C.top="0px";
C.border="0";
C.opacity="0";
C.width="10px";
C.height="1px";
E.id="rmrtransport-"+A;
E.name=E.id;
var B=gadgets.rpc.getRelayUrl(A);
var D=gadgets.rpc.getOrigin(U);
if(!B){B=D+"/robots.txt"
}Z[A]={frame:E,receiveWindow:null,relayUri:B,relayOrigin:D,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0,verifySendToken:String(Math.random()),verifyRecvToken:null,originVerified:false};
if(A!==".."){W(E,B,T(A))
}Q(A)
}function Q(B){var E=null;
Z[B].searchCounter++;
try{var C=gadgets.rpc._getTargetWin(B);
if(B===".."){E=C.frames["rmrtransport-"+gadgets.rpc.RPC_ID]
}else{E=C.frames["rmrtransport-.."]
}}catch(A){}var D=false;
if(E){D=O(B,E)
}if(!D){if(Z[B].searchCounter>P){return 
}window.setTimeout(function(){Q(B)
},N)
}}function X(F,D,H,A){var E=null;
if(H!==".."){E=Z[".."]
}else{E=Z[F]
}if(E){if(D!==gadgets.rpc.ACK){E.queue.push(A)
}if(E.waiting||(E.queue.length===0&&!(D===gadgets.rpc.ACK&&A&&A.ackAlone===true))){return true
}if(E.queue.length>0){E.waiting=true
}var G=E.relayUri+"#"+T(F);
try{E.frame.contentWindow.location=G;
var C=E.width==10?20:10;
E.frame.style.width=C+"px";
E.width=C
}catch(B){return false
}}return true
}function T(B){var A=Z[B];
var C={id:A.sendId};
if(A){C.d=Array.prototype.slice.call(A.queue,0);
var D={s:gadgets.rpc.ACK,id:A.recvId};
if(!A.originVerified){D.sendToken=A.verifySendToken
}if(A.verifyRecvToken){D.recvToken=A.verifyRecvToken
}C.d.push(D)
}return gadgets.json.stringify(C)
}function V(K){var A=Z[K];
var E=A.receiveWindow.location.hash.substring(1);
var J=gadgets.json.parse(decodeURIComponent(E))||{};
var H=J.d||[];
var G=false;
var B=false;
var M=0;
var I=(A.recvId-J.id);
for(var F=0;
F<H.length;
++F){var C=H[F];
if(C.s===gadgets.rpc.ACK){Y(K,true);
A.verifyRecvToken=C.sendToken;
if(!A.originVerified&&C.recvToken&&String(C.recvToken)==String(A.verifySendToken)){A.originVerified=true
}if(A.waiting){B=true
}A.waiting=false;
var D=Math.max(0,C.id-A.sendId);
A.queue.splice(0,D);
A.sendId=Math.max(A.sendId,C.id||0);
continue
}G=true;
if(++M<=I){continue
}++A.recvId;
S(C,A.originVerified?A.relayOrigin:undefined)
}if(G||(B&&A.queue.length>0)){var L=(K==="..")?gadgets.rpc.RPC_ID:"..";
X(K,gadgets.rpc.ACK,L,{ackAlone:G})
}}function O(C,G){var D=Z[C];
try{var E=false;
E="document" in G;
if(!E){return false
}E=typeof G.document=="object";
if(!E){return false
}var A=G.location.href;
if(A==="about:blank"){return false
}}catch(F){return false
}D.receiveWindow=G;
function B(){V(C)
}if(typeof G.attachEvent==="undefined"){G.onresize=B
}else{G.attachEvent("onresize",B)
}if(C===".."){W(D.frame,D.relayUri,T(C),C)
}else{V(C)
}return true
}return{getCode:function(){return"rmr"
},isParentVerifiable:function(){return true
},init:function(A,B){S=A;
Y=B;
return true
},setup:function(C,B){try{R(C)
}catch(A){gadgets.warn("Caught exception setting up RMR: "+A);
return false
}return true
},call:function(B,C,A){return X(B,A.s,C,A)
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.ifpc){gadgets.rpctx.ifpc=function(){var O=[];
var J=0;
var K;
var N=2000;
var P={};
function L(A){var C=[];
for(var D=0,B=A.length;
D<B;
++D){C.push(encodeURIComponent(gadgets.json.stringify(A[D])))
}return C.join("&")
}function M(D){var A;
for(var B=O.length-1;
B>=0;
--B){var C=O[B];
try{if(C&&(C.recyclable||C.readyState==="complete")){C.parentNode.removeChild(C);
if(window.ActiveXObject){O[B]=C=null;
O.splice(B,1)
}else{C.recyclable=false;
A=C;
break
}}}catch(E){}}if(!A){A=document.createElement("iframe");
A.style.border=A.style.width=A.style.height="0px";
A.style.visibility="hidden";
A.style.position="absolute";
A.onload=function(){this.recyclable=true
};
O.push(A)
}A.src=D;
window.setTimeout(function(){document.body.appendChild(A)
},0)
}function I(B,C){for(var A=C-1;
A>=0;
--A){if(typeof B[A]==="undefined"){return false
}}return true
}return{getCode:function(){return"ifpc"
},isParentVerifiable:function(){return true
},init:function(A,B){K=B;
K("..",true);
return true
},setup:function(B,A){K(B,true);
return true
},call:function(V,W,X){var E=gadgets.rpc.getRelayUrl(V);
++J;
if(!E){gadgets.warn("No relay file assigned for IFPC");
return false
}var U=null,G=[];
if(X.l){var B=X.a;
U=[E,"#",L([W,J,1,0,L([W,X.s,"","",W].concat(B))])].join("");
G.push(U)
}else{U=[E,"#",V,"&",W,"@",J,"&"].join("");
var H=encodeURIComponent(gadgets.json.stringify(X)),C=N-U.length,A=Math.ceil(H.length/C),D=0,F;
while(H.length>0){F=H.substring(0,C);
H=H.substring(C);
G.push([U,A,"&",D,"&",F].join(""));
D+=1
}}do{M(G.shift())
}while(G.length>0);
return true
},_receiveMessage:function(G,B){var A=G[1],C=parseInt(G[2],10),E=parseInt(G[3],10),D=G[G.length-1],F=C===1;
if(C>1){if(!P[A]){P[A]=[]
}P[A][E]=D;
if(I(P[A],C)){D=P[A].join("");
delete P[A];
F=true
}}if(F){B(gadgets.json.parse(decodeURIComponent(D)))
}}}
}()
}if(!window.gadgets.rpc){gadgets.rpc=function(){var AN="__cb";
var AD="";
var A5="__ack";
var At=500;
var AT=10;
var Ax="|";
var AL="callback";
var As="origin";
var Ah="referer";
var Ai={};
var A2={};
var AW={};
var AY={};
var Aa=0;
var An={};
var Am={};
var AF={};
var Av={};
var Al={};
var AV={};
var Au=null;
var Aj=null;
var AZ=(window.top!==window.self);
var AJ=window.name;
var AQ=function(){};
var AH=0;
var A0=1;
var Ay=2;
var Ad=window.console;
var A3=Ad&&Ad.log&&function(A){Ad.log(A)
}||function(){};
var AE=(function(){function A(B){return function(){A3(B+": call ignored")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:A("init"),setup:A("setup"),call:A("call")}
})();
if(gadgets.util){Av=gadgets.util.getUrlParameters()
}function AP(){if(Av.rpctx=="flash"){return gadgets.rpctx.flash
}if(Av.rpctx=="rmr"){return gadgets.rpctx.rmr
}return typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?(gadgets.rpctx.flash?gadgets.rpctx.flash:gadgets.rpctx.nix):navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc
}function Ao(F,B){if(Al[F]){return 
}var D=AS;
if(!B){D=AE
}Al[F]=D;
var E=AV[F]||[];
for(var C=0;
C<E.length;
++C){var A=E[C];
A.t=AU(F);
D.call(F,A.f,A)
}AV[F]=[]
}var AR=false,A4=false;
function AK(){if(A4){return 
}function A(){AR=true
}if(typeof window.addEventListener!="undefined"){window.addEventListener("unload",A,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onunload",A)
}}A4=true
}function Ap(D,E,C,A,B){if(!AY[E]||AY[E]!==C){gadgets.error("Invalid auth token. "+AY[E]+" vs "+C);
AQ(E,Ay)
}B.onunload=function(){if(Am[E]&&!AR){AQ(E,A0);
gadgets.rpc.removeReceiver(E)
}};
AK();
A=gadgets.json.parse(decodeURIComponent(A))
}function Az(E,C){if(E&&typeof E.s==="string"&&typeof E.f==="string"&&E.a instanceof Array){if(AY[E.f]){if(AY[E.f]!==E.t){gadgets.error("Invalid auth token. "+AY[E.f]+" vs "+E.t);
AQ(E.f,Ay)
}}if(E.s===A5){window.setTimeout(function(){Ao(E.f,true)
},0);
return 
}if(E.c){E[AL]=function(F){gadgets.rpc.call(E.f,AN,null,E.c,F)
}
}if(C){var B=Ag(C);
E[As]=C;
var A=E.r;
if(!A||Ag(A)!=B){A=C
}E[Ah]=A
}var D=(Ai[E.s]||Ai[AD]).apply(E,E.a);
if(E.c&&typeof D!=="undefined"){gadgets.rpc.call(E.f,AN,null,E.c,D)
}}}function Ag(D){if(!D){return""
}D=D.toLowerCase();
if(D.indexOf("//")==0){D=window.location.protocol+D
}if(D.indexOf("://")==-1){D=window.location.protocol+"//"+D
}var C=D.substring(D.indexOf("://")+3);
var F=C.indexOf("/");
if(F!=-1){C=C.substring(0,F)
}var A=D.substring(0,D.indexOf("://"));
var B="";
var G=C.indexOf(":");
if(G!=-1){var E=C.substring(G+1);
C=C.substring(0,G);
if((A==="http"&&E!=="80")||(A==="https"&&E!=="443")){B=":"+E
}}return A+"://"+C+B
}function AX(B,A){return"/"+B+(A?Ax+A:"")
}function Ab(D){if(D.charAt(0)=="/"){var B=D.indexOf(Ax);
var A=B>0?D.substring(1,B):D.substring(1);
var C=B>0?D.substring(B+1):null;
return{id:A,origin:C}
}else{return null
}}function Ac(C){if(typeof C==="undefined"||C===".."){return window.parent
}var A=Ab(C);
if(A){return window.top.frames[A.id]
}C=String(C);
var B=window.frames[C];
if(B){return B
}B=document.getElementById(C);
if(B&&B.contentWindow){return B.contentWindow
}return null
}function AO(D){var A=null;
var C=AI(D);
if(C){A=C
}else{var B=Ab(D);
if(B){A=B.origin
}else{if(D==".."){A=Av.parent
}else{A=document.getElementById(D).src
}}}return Ag(A)
}var AS=AP();
Ai[AD]=function(){A3("Unknown RPC service: "+this.s)
};
Ai[AN]=function(A,B){var C=An[A];
if(C){delete An[A];
C.call(this,B)
}};
function A1(C,B){if(Am[C]===true){return 
}if(typeof Am[C]==="undefined"){Am[C]=0
}var A=Ac(C);
if(C===".."||A!=null){if(AS.setup(C,B)===true){Am[C]=true;
return 
}}if(Am[C]!==true&&Am[C]++<AT){window.setTimeout(function(){A1(C,B)
},At)
}else{Al[C]=AE;
Am[C]=true
}}function AM(D,A){if(typeof AF[D]==="undefined"){AF[D]=false;
var B=AI(D);
if(Ag(B)!==Ag(window.location.href)){return false
}var C=Ac(D);
try{var F=C.gadgets;
AF[D]=F.rpc.receiveSameDomain
}catch(E){}}if(typeof AF[D]==="function"){AF[D](A);
return true
}return false
}function AI(B){var A=A2[B];
if(A&&A.substring(0,1)==="/"){if(A.substring(1,2)==="/"){A=document.location.protocol+A
}else{A=document.location.protocol+"//"+document.location.host+A
}}return A
}function Af(A,B,C){if(!/http(s)?:\/\/.+/.test(B)){if(B.indexOf("//")==0){B=window.location.protocol+B
}else{if(B.charAt(0)=="/"){B=window.location.protocol+"//"+window.location.host+B
}else{if(B.indexOf("://")==-1){B=window.location.protocol+"//"+B
}}}}A2[A]=B;
AW[A]=!!C
}function AU(A){return AY[A]
}function Aw(A,B){B=B||"";
AY[A]=String(B);
A1(A,B)
}function AG(A){var B=A.passReferrer||"";
var C=B.split(":",2);
Au=C[0]||"none";
Aj=C[1]||"origin"
}function Ar(A,B){function C(E){var F=E?E.rpc:{};
var D=String(F.useLegacyProtocol)==="true";
AG(F);
var G=F.parentRelayUrl||"";
G=Ag(Av.parent||B)+G;
Af("..",G,D);
if(D){AS=gadgets.rpctx.ifpc;
AS.init(Az,Ao)
}Aw("..",A)
}if(!Av.parent&&B){C({});
return 
}gadgets.config.register("rpc",null,C)
}function Ak(D,H,F){if(D.charAt(0)!="/"){if(!gadgets.util){return 
}var A=document.getElementById(D);
if(!A){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+D+", element not found.")
}}var E=A&&A.src;
var C=H||gadgets.rpc.getOrigin(E);
Af(D,C);
var G=gadgets.util.getUrlParameters(E);
var B=F||G.rpctoken;
Aw(D,B)
}function Aq(C,A,D){if(C===".."){var B=D||Av.rpctoken||Av.ifpctok||"";
Ar(B,A)
}else{Ak(C,A,D)
}}function Ae(A){if(Au==="bidir"||(Au==="c2p"&&A==="..")||(Au==="p2c"&&A!=="..")){var B=window.location.href;
var D="?";
if(Aj==="query"){D="#"
}else{if(Aj==="hash"){return B
}}var C=B.lastIndexOf(D);
C=C===-1?B.length:C;
return B.substring(0,C)
}return null
}return{config:function(A){if(typeof A.securityCallback==="function"){AQ=A.securityCallback
}},register:function(B,A){if(B===AN||B===A5){throw new Error("Cannot overwrite callback/ack service")
}if(B===AD){throw new Error("Cannot overwrite default service: use registerDefault")
}Ai[B]=A
},unregister:function(A){if(A===AN||A===A5){throw new Error("Cannot delete callback/ack service")
}if(A===AD){throw new Error("Cannot delete default service: use unregisterDefault")
}delete Ai[A]
},registerDefault:function(A){Ai[AD]=A
},unregisterDefault:function(){delete Ai[AD]
},forceParentVerifiable:function(){if(!AS.isParentVerifiable()){AS=gadgets.rpctx.ifpc
}},call:function(E,C,F,H){E=E||"..";
var G="..";
if(E===".."){G=AJ
}else{if(E.charAt(0)=="/"){G=AX(AJ,gadgets.rpc.getOrigin(window.location.href))
}}++Aa;
if(F){An[Aa]=F
}var A={s:C,f:G,c:F?Aa:0,a:Array.prototype.slice.call(arguments,3),t:AY[E],l:AW[E]};
var D=Ae(E);
if(D){A.r=D
}if(E!==".."&&Ab(E)==null&&!document.getElementById(E)){return 
}if(AM(E,A)){return 
}var B=Al[E];
if(!B&&Ab(E)!==null){B=AS
}if(!B){if(!AV[E]){AV[E]=[A]
}else{AV[E].push(A)
}return 
}if(AW[E]){B=gadgets.rpctx.ifpc
}if(B.call(E,G,A)===false){Al[E]=AE;
AS.call(E,G,A)
}},getRelayUrl:AI,setRelayUrl:Af,setAuthToken:Aw,setupReceiver:Aq,getAuthToken:AU,removeReceiver:function(A){delete A2[A];
delete AW[A];
delete AY[A];
delete Am[A];
delete AF[A];
delete Al[A]
},getRelayChannel:function(){return AS.getCode()
},receive:function(B,A){if(B.length>4){AS._receiveMessage(B,Az)
}else{Ap.apply(null,B.concat(A))
}},receiveSameDomain:function(A){A.a=Array.prototype.slice.call(A.a);
window.setTimeout(function(){Az(A)
},0)
},getOrigin:Ag,getTargetOrigin:AO,init:function(){if(AS.init(Az,Ao)===false){AS=AE
}if(AZ){Aq("..")
}else{gadgets.config.register("rpc",null,function(A){AG(A.rpc||{})
})
}},_getTargetWin:Ac,_parseSiblingId:Ab,ACK:A5,RPC_ID:AJ||"..",SEC_ERROR_LOAD_TIMEOUT:AH,SEC_ERROR_FRAME_PHISH:A0,SEC_ERROR_FORGED_MSG:Ay}
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
gadgets.log=(function(){var J=1;
var N=2;
var I=3;
var L=4;
var K=function(A){M(J,A)
};
gadgets.warn=function(A){M(N,A)
};
gadgets.error=function(A){M(I,A)
};
gadgets.setLogLevel=function(A){O=A
};
function M(B,A){if(B<O||!P){return 
}if(B===N&&P.warn){P.warn(A)
}else{if(B===I&&P.error){P.error(A)
}else{if(P.log){P.log(A)
}}}}K.INFO=J;
K.WARNING=N;
K.NONE=L;
var O=J;
var P=window.console?window.console:window.opera?window.opera.postError:undefined;
return K
})();
var tamings___=tamings___||[];
tamings___.push(function(B){___.grantRead(gadgets.log,"INFO");
___.grantRead(gadgets.log,"WARNING");
___.grantRead(gadgets.log,"ERROR");
___.grantRead(gadgets.log,"NONE");
caja___.whitelistFuncs([[gadgets,"log"],[gadgets,"warn"],[gadgets,"error"],[gadgets,"setLogLevel"]])
});
shindig.uri=(function(){var B=new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?");
return function(A){var g="";
var k="";
var w="";
var r="";
var v=null;
var q="";
var o=null;
var m=window.decodeURIComponent?decodeURIComponent:unescape;
var a=window.encodeURIComponent?encodeURIComponent:escape;
var n=null;
function d(C){if(C.match(B)===null){throw"Malformed URL: "+C
}g=RegExp.$1;
k=RegExp.$2;
w=RegExp.$3;
r=RegExp.$4;
q=RegExp.$5
}function e(G){var H=[];
for(var D=0,F=G.length;
D<F;
++D){var E=G[D][0];
var C=G[D][1];
if(C===undefined){continue
}H.push(a(E)+(C!==null?"="+a(C):""))
}return H.join("&")
}function h(){if(v){r=e(v);
v=null
}return r
}function p(){if(o){q=e(o);
o=null
}return q
}function j(C){v=v||t(r);
return f(v,C)
}function b(C){o=o||t(q);
return f(o,C)
}function x(C,D){v=l(v||t(r),C,D);
return n
}function s(C,D){o=l(o||t(q),C,D);
return n
}function c(){return[g,g!==""?":":"",k!==""?"//":"",k].join("")
}function i(){var C=h();
var D=p();
return[c(),w,C!==""?"?":"",C,D!==""?"#":"",D].join("")
}function t(G){var H=[];
var I=G.split("&");
for(var D=0,F=I.length;
D<F;
++D){var J=I[D].split("=");
var E=J.shift();
var C=null;
if(J.length>0){C=J.join("").replace(/\+/g," ")
}H.push([E,C!=null?m(C):null])
}return H
}function f(F,C){for(var D=0,E=F.length;
D<E;
++D){if(F[D][0]==C){return F[D][1]
}}return undefined
}function l(J,I,C){var G=I;
if(typeof I==="string"){G={};
G[I]=C
}for(var D in G){var H=false;
for(var E=0,F=J.length;
!H&&E<F;
++E){if(J[E][0]==D){J[E][1]=G[D];
H=true
}}if(!H){J.push([D,G[D]])
}}return J
}function u(C,D){C=C||"";
if(C[0]===D){C=C.substr(D.length)
}return C
}if(typeof A==="object"&&typeof A.toString==="function"){d(A.toString())
}else{if(A){d(A)
}}n={getSchema:function(){return g
},getAuthority:function(){return k
},getOrigin:c,getPath:function(){return w
},getQuery:h,getFragment:p,getQP:j,getFP:b,setSchema:function(C){g=C;
return n
},setAuthority:function(C){k=C;
return n
},setPath:function(C){w=(C[0]==="/"?"":"/")+C;
return n
},setQuery:function(C){v=null;
r=u(C,"?");
return n
},setFragment:function(C){o=null;
q=u(C,"#");
return n
},setQP:x,setFP:s,setExistingP:function(D,C){if(j(D,C)!==undefined){x(D,C)
}if(b(D,C)!==undefined){s(D,C)
}return n
},toString:i};
return n
}
})();
(function(){osapi._registerMethod=function(L,M){var K=typeof ___!=="undefined";
if(L=="newBatch"){return 
}var H=L.split(".");
var I=osapi;
for(var J=0;
J<H.length-1;
J++){I[H[J]]=I[H[J]]||{};
I=I[H[J]]
}var N=function(C){var A=osapi.newBatch();
var B={};
B.execute=function(E){var D=K?___.untame(E):E;
var F=K?___.USELESS:this;
A.add(L,this);
A.execute(function(G){if(G.error){D.call(F,G.error)
}else{D.call(F,G[L])
}})
};
if(K){___.markInnocent(B.execute,"execute")
}C=C||{};
C.userId=C.userId||"@viewer";
C.groupId=C.groupId||"@self";
B.method=L;
B.transport=M;
B.rpc=C;
return B
};
if(K&&typeof ___.markInnocent!=="undefined"){___.markInnocent(N,L)
}if(I[H[H.length-1]]){}else{I[H[H.length-1]]=N
}}
})();
(function(){var B=function(){var H={};
var I=[];
var J=function(D,C){if(C&&D){I.push({key:D,request:C})
}return H
};
var A=function(C){var D={method:C.request.method,id:C.key};
if(C.request.rpc){D.params=C.request.rpc
}return D
};
var G=function(R){var Q={};
var S={};
var F=0;
var E=[];
for(var C=0;
C<I.length;
C++){var P=I[C].request.transport;
if(!S[P.name]){E.push(P);
F++
}S[P.name]=S[P.name]||[];
S[P.name].push(A(I[C]))
}var T=function(M){if(M.error){Q.error=M.error
}for(var N=0;
N<I.length;
N++){var K=I[N].key;
var L=M[K];
if(L){if(L.error){Q[K]=L
}else{Q[K]=L.data||L.result
}}}F--;
if(F===0){R(Q)
}};
for(var D=0;
D<E.length;
D++){E[D].execute(S[E[D].name],T)
}if(F==0){window.setTimeout(function(){R(Q)
},0)
}};
H.execute=G;
H.add=J;
return H
};
osapi.newBatch=B
})();
(function(){function D(K,A){function B(G){if(G.errors[0]){A({error:{code:G.rc,message:G.text}})
}else{var F=G.result||G.data;
if(F.error){A(F)
}else{var H={};
for(var E=0;
E<F.length;
E++){H[F[E].id]=F[E]
}A(H)
}}}var I={POST_DATA:gadgets.json.stringify(K),CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED"};
var L=this.name;
var J=shindig.auth.getSecurityToken();
if(J){L+="?st=";
L+=encodeURIComponent(J)
}gadgets.io.makeNonProxiedRequest(L,B,I,"application/json")
}function C(L){var A=L["osapi.services"];
if(A){for(var M in A){if(A.hasOwnProperty(M)){if(M.indexOf("http")==0||M.indexOf("//")==0){var J=M.replace("%host%",document.location.host);
var N={name:J,execute:D};
var B=A[M];
for(var K=0;
K<B.length;
K++){osapi._registerMethod(B[K],N)
}}}}}}if(gadgets.config){gadgets.config.register("osapi.services",null,C)
}})();
if(gadgets&&gadgets.rpc){(function(){function D(F,A){var B=function(I){if(!I){A({code:500,message:"Container refused the request"})
}else{if(I.error){A(I)
}else{var J={};
for(var E=0;
E<I.length;
E++){J[I[E].id]=I[E]
}A(J)
}}};
gadgets.rpc.call("..","osapi._handleGadgetRpcMethod",B,F)
}function C(B){var Q={name:"gadgets.rpc",execute:D};
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
osapi.container.listMethods({}).execute(function(F){if(!F.error){for(var E=0;
E<F.length;
E++){if(F[E]!="container.listMethods"){osapi._registerMethod(F[E],Q)
}}}M()
});
window.setTimeout(M,500)
}}if(gadgets.config&&gadgets.config.isGadget){gadgets.config.register("osapi.services",null,C)
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
tamings___.push(function(D){___.tamesTo(osapi.newBatch,___.markFuncFreeze(function(){var A=osapi.newBatch();
___.markInnocent(A.add,"add");
___.markInnocent(A.execute,"execute");
return ___.tame(A)
}));
D.outers.osapi=___.tame(osapi);
___.grantRead(D.outers,"osapi");
var C=D;
gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){caja___.whitelistFuncs([[osapi.people,"getViewer"],[osapi.people,"getViewerFriends"],[osapi.people,"getOwner"],[osapi.people,"getOwnerFriends"]]);
C.outers.osapi.people.getViewer=___.tame(osapi.people.getViewer);
C.outers.osapi.people.getViewerFriends=___.tame(osapi.people.getViewerFriends);
C.outers.osapi.people.getOwner=___.tame(osapi.people.getOwner);
C.outers.osapi.people.getOwnerFriends=___.tame(osapi.people.getOwnerFriends)
}})
});
shindig._uri=shindig.uri;
shindig.uri=(function(){var F=shindig._uri;
shindig._uri=null;
function E(B,A){return B.getOrigin()==A.getOrigin()
}function D(C,A){if(C.getSchema()==""){C.setSchema(A.getSchema())
}if(C.getAuthority()==""){C.setAuthority(A.getAuthority())
}var B=C.getPath();
if(B==""||B.charAt(0)!="/"){var J=A.getPath();
var I=J.lastIndexOf("/");
if(I!=-1){J=J.substring(0,I+1)
}C.setPath(A.getPath()+B)
}}return function(A){var B=F(A);
B.hasSameOrigin=function(C){return E(B,C)
};
B.resolve=function(C){return D(B,C)
};
return B
}
})();
Function.prototype.inherits=function(D){function C(){}C.prototype=D.prototype;
this.superClass_=D.prototype;
this.prototype=new C();
this.prototype.constructor=this
};
shindig.cookies={};
shindig.cookies.JsType_={UNDEFINED:"undefined"};
shindig.cookies.isDef=function(B){return typeof B!=shindig.cookies.JsType_.UNDEFINED
};
shindig.cookies.set=function(P,T,K,Q,O){if(/;=/g.test(P)){throw new Error('Invalid cookie name "'+P+'"')
}if(/;/g.test(T)){throw new Error('Invalid cookie value "'+T+'"')
}if(!shindig.cookies.isDef(K)){K=-1
}var M=O?";domain="+O:"";
var S=Q?";path="+Q:"";
var N;
if(K<0){N=""
}else{if(K===0){var L=new Date(1970,1,1);
N=";expires="+L.toUTCString()
}else{var R=new Date((new Date).getTime()+K*1000);
N=";expires="+R.toUTCString()
}}document.cookie=P+"="+T+M+S+N
};
shindig.cookies.get=function(M,P){var I=M+"=";
var K=String(document.cookie);
for(var O=-1;
(O=K.indexOf(I,O+1))>=0;
){var L=O;
while(--L>=0){var J=K.charAt(L);
if(J==";"){L=-1;
break
}}if(L==-1){var N=K.indexOf(";",O);
if(N<0){N=K.length
}return K.substring(O+I.length,N)
}}return P
};
shindig.cookies.remove=function(E,F,H){var G=shindig.cookies.containsKey(E);
shindig.cookies.set(E,"",0,F,H);
return G
};
shindig.cookies.getKeyValues_=function(){var N=String(document.cookie);
var L=N.split(/\s*;\s*/);
var M=[],K=[],I,J;
for(var H=0;
J=L[H];
H++){I=J.indexOf("=");
if(I==-1){M.push("");
K.push(J)
}else{M.push(J.substring(0,I));
K.push(J.substring(I+1))
}}return{keys:M,values:K}
};
shindig.cookies.getKeys=function(){return shindig.cookies.getKeyValues_().keys
};
shindig.cookies.getValues=function(){return shindig.cookies.getKeyValues_().values
};
shindig.cookies.isEmpty=function(){return document.cookie===""
};
shindig.cookies.getCount=function(){var D=String(document.cookie);
if(D===""){return 0
}var C=D.split(/\s*;\s*/);
return C.length
};
shindig.cookies.containsKey=function(C){var D={};
return shindig.cookies.get(C,D)!==D
};
shindig.cookies.containsValue=function(F){var E=shindig.cookies.getKeyValues_().values;
for(var D=0;
D<E.length;
D++){if(E[D]==F){return true
}}return false
};
shindig.cookies.clear=function(){var C=shindig.cookies.getKeyValues_().keys;
for(var D=C.length-1;
D>=0;
D--){shindig.cookies.remove(C[D])
}};
shindig.cookies.MAX_COOKIE_LENGTH=3950;
shindig.errors={};
shindig.errors.SUBCLASS_RESPONSIBILITY="subclass responsibility";
shindig.errors.TO_BE_DONE="to be done";
shindig.callAsyncAndJoin=function(N,K,H){var M=N.length;
var I=[];
for(var J=0;
J<N.length;
J++){var L=function(A){var B=N[A];
if(typeof B==="string"){B=H[B]
}B.call(H,function(C){I[A]=C;
if(--M===0){K(I)
}})
};
L(J)
}};
shindig.Extensible=function(){};
shindig.Extensible.prototype.setDependencies=function(D){for(var C in D){this[C]=D[C]
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
shindig.GadgetService.prototype.setHeight=function(C,D){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.GadgetService.prototype.setTitle=function(D,C){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
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
shindig.IfrGadgetService.prototype.setHeight=function(D){if(D>shindig.container.maxheight_){D=shindig.container.maxheight_
}var C=document.getElementById(this.f);
if(C){C.style.height=D+"px"
}};
shindig.IfrGadgetService.prototype.setTitle=function(C){var D=document.getElementById(this.f+"_title");
if(D){D.innerHTML=C.replace(/&/g,"&amp;").replace(/</g,"&lt;")
}};
shindig.IfrGadgetService.prototype.setUserPref=function(L,J,H){var M=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
var N=shindig.container.getGadget(M);
for(var I=1,K=arguments.length;
I<K;
I+=2){this.userPrefs[arguments[I]].value=arguments[I+1]
}N.saveUserPrefs()
};
shindig.IfrGadgetService.prototype.requestSendMessage=function(F,G,E,H){if(E){window.setTimeout(function(){E(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
shindig.IfrGadgetService.prototype.requestNavigateTo=function(G,I){var H=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
var F=shindig.container.gadgetService.getUrlForView(G);
if(I){var J=gadgets.json.stringify(I);
if(J.length>0){F+="&appParams="+encodeURIComponent(J)
}}if(F&&document.location.href.indexOf(F)==-1){document.location.href=F
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
shindig.StaticLayoutManager.prototype.getGadgetChrome=function(C){var D=this.gadgetChromeIds_[C.id];
return D?document.getElementById(D):null
};
shindig.FloatLeftLayoutManager=function(B){shindig.LayoutManager.call(this);
this.layoutRootId_=B
};
shindig.FloatLeftLayoutManager.inherits(shindig.LayoutManager);
shindig.FloatLeftLayoutManager.prototype.getGadgetChrome=function(F){var D=document.getElementById(this.layoutRootId_);
if(D){var E=document.createElement("div");
E.className="gadgets-gadget-chrome";
E.style.cssFloat="left";
D.appendChild(E);
return E
}else{return null
}};
shindig.Gadget=function(C){this.userPrefs={};
if(C){for(var D in C){if(C.hasOwnProperty(D)){this[D]=C[D]
}}}if(!this.secureToken){this.secureToken="john.doe:john.doe:appid:cont:url:0:default"
}};
shindig.Gadget.prototype.getUserPrefs=function(){return this.userPrefs
};
shindig.Gadget.prototype.saveUserPrefs=function(){shindig.container.userPrefStore.savePrefs(this)
};
shindig.Gadget.prototype.getUserPrefValue=function(C){var D=this.userPrefs[C];
return typeof (D.value)!="undefined"&&D.value!=null?D.value:D["default"]
};
shindig.Gadget.prototype.render=function(D){if(D){var C=this;
this.getContent(function(A){D.innerHTML=A;
C.finishRender(D)
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
shindig.BaseIfrGadget.prototype.getTitleBarContent=function(D){var C=this.hasViewablePrefs_()?'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleOpenUserPrefsDialog();return false;" class="'+this.cssClassTitleButton+'">settings</a> ':"";
D('<div id="'+this.cssClassTitleBar+"-"+this.id+'" class="'+this.cssClassTitleBar+'"><span id="'+this.getIframeId()+'_title" class="'+this.cssClassTitle+'">'+(this.title?this.title:"Title")+'</span> | <span class="'+this.cssClassTitleButtonBar+'">'+C+'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleToggle();return false;" class="'+this.cssClassTitleButton+'">toggle</a></span></div>')
};
shindig.BaseIfrGadget.prototype.getUserPrefsDialogContent=function(B){B('<div id="'+this.getUserPrefsDialogId()+'" class="'+this.cssClassGadgetUserPrefsDialog+'"></div>')
};
shindig.BaseIfrGadget.prototype.setServerBase=function(B){this.serverBase_=B
};
shindig.BaseIfrGadget.prototype.getServerBase=function(){return this.serverBase_
};
shindig.BaseIfrGadget.prototype.getMainContent=function(D){var C=this;
window.setTimeout(function(){C.getMainContent(D)
},0)
};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.id
};
shindig.BaseIfrGadget.prototype.getUserPrefsDialogId=function(){return this.getIframeId()+"_userPrefsDialog"
};
shindig.BaseIfrGadget.prototype.getUserPrefsParams=function(){var C="";
for(var D in this.getUserPrefs()){C+="&up_"+encodeURIComponent(D)+"="+encodeURIComponent(this.getUserPrefValue(D))
}return C
};
shindig.BaseIfrGadget.prototype.handleToggle=function(){var D=document.getElementById(this.getIframeId());
if(D){var E=D.parentNode;
var F=E.style.display;
E.style.display=F?"":"none"
}};
shindig.BaseIfrGadget.prototype.hasViewablePrefs_=function(){for(var C in this.getUserPrefs()){var D=this.userPrefs[C];
if(D.type!="hidden"){return true
}}return false
};
shindig.BaseIfrGadget.prototype.handleOpenUserPrefsDialog=function(){if(this.userPrefsDialogContentLoaded){this.showUserPrefsDialog()
}else{var F=this;
var D="ig_callback_"+this.id;
window[D]=function(A){F.userPrefsDialogContentLoaded=true;
F.buildUserPrefsDialog(A);
F.showUserPrefsDialog()
};
var E=document.createElement("script");
E.src="http://www.gmodules.com/ig/gadgetsettings?mid="+this.id+"&output=js"+this.getUserPrefsParams()+"&url="+this.specUrl;
document.body.appendChild(E)
}};
shindig.BaseIfrGadget.prototype.buildUserPrefsDialog=function(D){var C=document.getElementById(this.getUserPrefsDialogId());
C.innerHTML=D+'<div class="'+this.cssClassGadgetUserPrefsDialogActionBar+'"><input type="button" value="Save" onclick="shindig.container.getGadget('+this.id+').handleSaveUserPrefs()"> <input type="button" value="Cancel" onclick="shindig.container.getGadget('+this.id+').handleCancelUserPrefs()"></div>';
C.childNodes[0].style.display=""
};
shindig.BaseIfrGadget.prototype.showUserPrefsDialog=function(D){var C=document.getElementById(this.getUserPrefsDialogId());
C.style.display=(D||D===undefined)?"":"none"
};
shindig.BaseIfrGadget.prototype.hideUserPrefsDialog=function(){this.showUserPrefsDialog(false)
};
shindig.BaseIfrGadget.prototype.handleSaveUserPrefs=function(){this.hideUserPrefsDialog();
var H=document.getElementById("m_"+this.id+"_numfields").value;
for(var K=0;
K<H;
K++){var G=document.getElementById("m_"+this.id+"_"+K);
var I="m_"+this.id+"_up_";
var L=G.name.substring(I.length);
var J=G.value;
this.userPrefs[L].value=J
}this.saveUserPrefs();
this.refresh()
};
shindig.BaseIfrGadget.prototype.handleCancelUserPrefs=function(){this.hideUserPrefsDialog()
};
shindig.BaseIfrGadget.prototype.refresh=function(){var B=this.getIframeId();
document.getElementById(B).src=this.getIframeUrl()
};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var J={context:{country:"default",language:"default",view:"default",container:"default"},gadgets:[{url:this.specUrl,moduleId:1}]};
var F={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(J)};
var G=this.serverBase_+"metadata?st="+this.secureToken;
gadgets.io.makeNonProxiedRequest(G,I,F,"application/javascript");
var H=this;
function I(A){var E=false;
var L=A.data.gadgets[0].features;
for(var C=0;
C<L.length;
C++){if(L[C]==="pubsub-2"){E=true;
break
}}var B=E?shindig.OAAIfrGadget:shindig.IfrGadget;
for(var D in B){if(B.hasOwnProperty(D)){H[D]=B[D]
}}}};
shindig.IfrGadget={getMainContent:function(D){var C=this.getIframeId();
gadgets.rpc.setRelayUrl(C,this.serverBase_+this.rpcRelay);
gadgets.rpc.setAuthToken(C,this.rpcToken);
D('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+C+'" name="'+C+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no" scrolling="no"'+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")
},finishRender:function(B){window.frames[this.getIframeId()].location=this.getIframeUrl()
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(shindig.container.parentUrl_?"&parent="+encodeURIComponent(shindig.container.parentUrl_):"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+"#rpctoken="+this.rpcToken+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"&"+this.hashData:"")
}};
shindig.OAAIfrGadget={getMainContent:function(B){B('<div id="'+this.cssClassGadgetContent+"-"+this.id+'" class="'+this.cssClassGadgetContent+'"></div>')
},finishRender:function(D){var C={className:this.cssClassGadget,frameborder:"no",scrolling:"no"};
if(this.height){C.height=this.height
}if(this.width){C.width=this.width
}new OpenAjax.hub.IframeContainer(gadgets.pubsub2router.hub,this.getIframeId(),{Container:{onSecurityAlert:function(B,A){gadgets.error("Security error for container "+B.getClientID()+" : "+A);
B.getIframe().src="about:blank"
}},IframeContainer:{parent:document.getElementById(this.cssClassGadgetContent+"-"+this.id),uri:this.getIframeUrl(),tunnelURI:shindig.uri(this.serverBase_+this.rpcRelay).resolve(shindig.uri(window.location.href)),iframeAttrs:C}})
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
shindig.Container.prototype.addGadgets=function(D){for(var C=0;
C<D.length;
C++){this.addGadget(D[C])
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
shindig.IfrContainer.prototype.renderGadget=function(C){var D=this.layoutManager.getGadgetChrome(C);
C.render(D)
};
shindig.container=new shindig.IfrContainer();
if(gadgets&&gadgets.rpc){osapi._handleGadgetRpcMethod=function(Q){var L=new Array(Q.length);
var M=0;
var J=this.callback;
var P=function(B,A){A({})
};
for(var N=0;
N<Q.length;
N++){var K=osapi;
if(Q[N].method.indexOf("_")==-1){var R=Q[N].method.split(".");
for(var O=0;
O<R.length;
O++){if(K.hasOwnProperty(R[O])){K=K[R[O]]
}else{K=P;
break
}}}else{K=P
}K(Q[N].params,function(A){return function(B){L[A]={id:Q[A].id,data:B};
M++;
if(M==Q.length){J(L)
}}
}(N))
}};
osapi.container={};
osapi.container.listMethods=function(E,F){var D=[];
recurseNames(osapi,"",5,D);
F(D)
};
function recurseNames(L,K,J,G){if(J==0){return 
}for(var I in L){if(L.hasOwnProperty(I)){if(I.indexOf("_")==-1){var H=typeof (L[I]);
if(H=="function"){G.push(K+I)
}else{if(H=="object"){recurseNames(L[I],K+I+".",J-1,G)
}}}}}}gadgets.rpc.register("osapi._handleGadgetRpcMethod",osapi._handleGadgetRpcMethod)
}gadgets.config.init({"shindig.auth":{},osapi:{endPoints:["https://%host%/rpc"]},"osapi.services":{"gadgets.rpc":["container.listMethods"],"https://%host%/rpc":["activities.supportedFields","activities.update","gadgets.metadata","activities.delete","activities.get","appdata.update","http.put","http.post","gadgets.tokenSupportedFields","appdata.get","activities.create","system.listMethods","cache.invalidate","groups.get","people.supportedFields","http.get","http.head","appdata.delete","http.delete","aipo.version","gadgets.token","appdata.create","people.get","gadgets.supportedFields"]},rpc:{parentRelayUrl:"/gadgets/files/container/rpc_relay.html",useLegacyProtocol:false},"core.io":{proxyUrl:"//%host%/gadgets/proxy?container=default&refresh=%refresh%&url=%url%%rewriteMime%",jsonProxyUrl:"//%host%/gadgets/makeRequest"}});