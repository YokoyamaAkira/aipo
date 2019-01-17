dojo._xdResourceLoaded({depends:[["provide","dojox._cometd.cometd"],["require","dojo.AdapterRegistry"],["require","dojo.io.script"]],defineResource:function(A){if(!A._hasResource["dojox._cometd.cometd"]){A._hasResource["dojox._cometd.cometd"]=true;
A.provide("dojox._cometd.cometd");
A.require("dojo.AdapterRegistry");
A.require("dojo.io.script");
dojox.cometd=new function(){this._initialized=false;
this._connected=false;
this._polling=false;
this.connectionTypes=new A.AdapterRegistry(true);
this.version="1.0";
this.minimumVersion="0.9";
this.clientId=null;
this.messageId=0;
this.batch=0;
this._isXD=false;
this.handshakeReturn=null;
this.currentTransport=null;
this.url=null;
this.lastMessage=null;
this.topics={};
this._messageQ=[];
this.handleAs="json-comment-optional";
this.advice;
this.pendingSubscriptions={};
this.pendingUnsubscriptions={};
this._subscriptions=[];
this.tunnelInit=function(B,C){};
this.tunnelCollapse=function(){console.debug("tunnel collapsed!")
};
this.init=function(L,K,D){K=K||{};
K.version=this.version;
K.minimumVersion=this.minimumVersion;
K.channel="/meta/handshake";
K.id=""+this.messageId++;
this.url=L||djConfig.cometdRoot;
if(!this.url){console.debug("no cometd root specified in djConfig and no root passed");
return 
}var J="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var B=(""+window.location).match(new RegExp(J));
if(B[4]){var H=B[4].split(":");
var C=H[0];
var F=H[1]||"80";
B=this.url.match(new RegExp(J));
if(B[4]){H=B[4].split(":");
var E=H[0];
var I=H[1]||"80";
this._isXD=((E!=C)||(I!=F))
}}if(!this._isXD){if(K.ext){if(K.ext["json-comment-filtered"]!==true&&K.ext["json-comment-filtered"]!==false){K.ext["json-comment-filtered"]=true
}}else{K.ext={"json-comment-filtered":true}
}}var G={url:this.url,handleAs:this.handleAs,content:{message:A.toJson([K])},load:A.hitch(this,"finishInit"),error:function(M){console.debug("handshake error!:",M)
}};
if(D){A.mixin(G,D)
}this._props=K;
this._initialized=true;
this.batch=0;
this.startBatch();
if(this._isXD){G.callbackParamName="jsonp";
return A.io.script.get(G)
}return A.xhrPost(G)
};
this.finishInit=function(C){C=C[0];
this.handshakeReturn=C;
if(C.advice){this.advice=C.advice
}if(!C.successful){console.debug("cometd init failed");
if(this.advice&&this.advice.reconnect=="none"){return 
}if(this.advice&&this.advice.interval&&this.advice.interval>0){var B=this;
setTimeout(function(){B.init(B.url,B._props)
},this.advice.interval)
}else{this.init(this.url,this._props)
}return 
}if(C.version<this.minimumVersion){console.debug("cometd protocol version mismatch. We wanted",this.minimumVersion,"but got",C.version);
return 
}this.currentTransport=this.connectionTypes.match(C.supportedConnectionTypes,C.version,this._isXD);
this.currentTransport._cometd=this;
this.currentTransport.version=C.version;
this.clientId=C.clientId;
this.tunnelInit=A.hitch(this.currentTransport,"tunnelInit");
this.tunnelCollapse=A.hitch(this.currentTransport,"tunnelCollapse");
this.currentTransport.startup(C)
};
this.deliver=function(B){A.forEach(B,this._deliver,this);
return B
};
this._deliver=function(C){if(!C.channel){if(C.success!==true){console.debug("cometd error: no channel for message!",C);
return 
}}this.lastMessage=C;
if(C.advice){this.advice=C.advice
}if((C.channel)&&(C.channel.length>5)&&(C.channel.substr(0,5)=="/meta")){switch(C.channel){case"/meta/connect":if(C.successful&&!this._connected){this._connected=this._initialized;
this.endBatch()
}else{if(!this._initialized){this._connected=false
}}break;
case"/meta/subscribe":var D=this.pendingSubscriptions[C.subscription];
if(!C.successful){if(D){D.errback(new Error(C.error));
delete this.pendingSubscriptions[C.subscription]
}return 
}dojox.cometd.subscribed(C.subscription,C);
if(D){D.callback(true);
delete this.pendingSubscriptions[C.subscription]
}break;
case"/meta/unsubscribe":var D=this.pendingUnsubscriptions[C.subscription];
if(!C.successful){if(D){D.errback(new Error(C.error));
delete this.pendingUnsubscriptions[C.subscription]
}return 
}this.unsubscribed(C.subscription,C);
if(D){D.callback(true);
delete this.pendingUnsubscriptions[C.subscription]
}break
}}this.currentTransport.deliver(C);
if(C.data){var B="/cometd"+C.channel;
A.publish(B,[C])
}};
this.disconnect=function(){A.forEach(this._subscriptions,A.unsubscribe);
this._subscriptions=[];
this._messageQ=[];
if(this._initialized&&this.currentTransport){this._initialized=false;
this.currentTransport.disconnect()
}this._initialized=false;
if(!this._polling){this._connected=false
}};
this.publish=function(D,E,B){var C={data:E,channel:D};
if(B){A.mixin(C,B)
}this._sendMessage(C)
};
this._sendMessage=function(B){if(this.currentTransport&&this._connected&&this.batch==0){return this.currentTransport.sendMessages([B])
}else{this._messageQ.push(B)
}};
this.subscribe=function(F,D,H){if(this.pendingSubscriptions[F]){var B=this.pendingSubscriptions[F];
B.cancel();
delete this.pendingSubscriptions[F]
}var G=new A.Deferred();
this.pendingSubscriptions[F]=G;
if(D){var E="/cometd"+F;
if(this.topics[E]){A.unsubscribe(this.topics[E])
}var C=A.subscribe(E,D,H);
this.topics[E]=C
}this._sendMessage({channel:"/meta/subscribe",subscription:F});
return G
};
this.subscribed=function(C,B){};
this.unsubscribe=function(D){if(this.pendingUnsubscriptions[D]){var B=this.pendingUnsubscriptions[D];
B.cancel();
delete this.pendingUnsubscriptions[D]
}var E=new A.Deferred();
this.pendingUnsubscriptions[D]=E;
var C="/cometd"+D;
if(this.topics[C]){A.unsubscribe(this.topics[C])
}this._sendMessage({channel:"/meta/unsubscribe",subscription:D});
return E
};
this.unsubscribed=function(C,B){};
this.startBatch=function(){this.batch++
};
this.endBatch=function(){if(--this.batch<=0&&this.currentTransport&&this._connected){this.batch=0;
var B=this._messageQ;
this._messageQ=[];
if(B.length>0){this.currentTransport.sendMessages(B)
}}};
this._onUnload=function(){A.addOnUnload(dojox.cometd,"disconnect")
}
};
dojox.cometd.longPollTransport=new function(){this._connectionType="long-polling";
this._cometd=null;
this.lastTimestamp=null;
this.check=function(D,B,C){return((!C)&&(A.indexOf(D,"long-polling")>=0))
};
this.tunnelInit=function(){if(this._cometd._polling){return 
}this.openTunnelWith({message:A.toJson([{channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++}])})
};
this.tunnelCollapse=function(){if(!this._cometd._polling){this._cometd._polling=false;
if(this._cometd.advice){if(this._cometd.advice.reconnect=="none"){return 
}if((this._cometd.advice.interval)&&(this._cometd.advice.interval>0)){var B=this;
setTimeout(function(){B._connect()
},this._cometd.advice.interval)
}else{this._connect()
}}else{this._connect()
}}};
this._connect=function(){if((this._cometd.advice)&&(this._cometd.advice.reconnect=="handshake")){this._cometd.init(this._cometd.url,this._cometd._props)
}else{if(this._cometd._connected){this.openTunnelWith({message:A.toJson([{channel:"/meta/connect",connectionType:this._connectionType,clientId:this._cometd.clientId,timestamp:this.lastTimestamp,id:""+this._cometd.messageId++}])})
}}};
this.deliver=function(B){if(B.timestamp){this.lastTimestamp=B.timestamp
}};
this.openTunnelWith=function(C,B){var D=A.xhrPost({url:(B||this._cometd.url),content:C,handleAs:this._cometd.handleAs,load:A.hitch(this,function(E){this._cometd._polling=false;
this._cometd.deliver(E);
this.tunnelCollapse()
}),error:function(E){console.debug("tunnel opening failed:",E);
A.cometd._polling=false
}});
this._cometd._polling=true
};
this.sendMessages=function(C){for(var B=0;
B<C.length;
B++){C[B].clientId=this._cometd.clientId;
C[B].id=""+this._cometd.messageId++
}return A.xhrPost({url:this._cometd.url||djConfig.cometdRoot,handleAs:this._cometd.handleAs,load:A.hitch(this._cometd,"deliver"),content:{message:A.toJson(C)}})
};
this.startup=function(B){if(this._cometd._connected){return 
}this.tunnelInit()
};
this.disconnect=function(){A.xhrPost({url:this._cometd.url||djConfig.cometdRoot,handleAs:this._cometd.handleAs,content:{message:A.toJson([{channel:"/meta/disconnect",clientId:this._cometd.clientId,id:""+this._cometd.messageId++}])}})
}
};
dojox.cometd.callbackPollTransport=new function(){this._connectionType="callback-polling";
this._cometd=null;
this.lastTimestamp=null;
this.check=function(D,B,C){return(A.indexOf(D,"callback-polling")>=0)
};
this.tunnelInit=function(){if(this._cometd._polling){return 
}this.openTunnelWith({message:A.toJson([{channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++}])})
};
this.tunnelCollapse=dojox.cometd.longPollTransport.tunnelCollapse;
this._connect=dojox.cometd.longPollTransport._connect;
this.deliver=dojox.cometd.longPollTransport.deliver;
this.openTunnelWith=function(C,B){A.io.script.get({load:A.hitch(this,function(D){this._cometd._polling=false;
this._cometd.deliver(D);
this.tunnelCollapse()
}),error:function(){this._cometd._polling=false;
console.debug("tunnel opening failed")
},url:(B||this._cometd.url),content:C,callbackParamName:"jsonp"});
this._cometd._polling=true
};
this.sendMessages=function(D){for(var C=0;
C<D.length;
C++){D[C].clientId=this._cometd.clientId;
D[C].id=""+this._cometd.messageId++
}var B={url:this._cometd.url||djConfig.cometdRoot,load:A.hitch(this._cometd,"deliver"),callbackParamName:"jsonp",content:{message:A.toJson(D)}};
return A.io.script.get(B)
};
this.startup=function(B){if(this._cometd._connected){return 
}this.tunnelInit()
};
this.disconnect=dojox.cometd.longPollTransport.disconnect;
this.disconnect=function(){A.io.script.get({url:this._cometd.url||djConfig.cometdRoot,callbackParamName:"jsonp",content:{message:A.toJson([{channel:"/meta/disconnect",clientId:this._cometd.clientId,id:""+this._cometd.messageId++}])}})
}
};
dojox.cometd.connectionTypes.register("long-polling",dojox.cometd.longPollTransport.check,dojox.cometd.longPollTransport);
dojox.cometd.connectionTypes.register("callback-polling",dojox.cometd.callbackPollTransport.check,dojox.cometd.callbackPollTransport);
A.addOnUnload(dojox.cometd,"_onUnload")
}}});