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
this.tunnelInit=function(C,B){};
this.tunnelCollapse=function(){console.debug("tunnel collapsed!")
};
this.init=function(J,I,B){I=I||{};
I.version=this.version;
I.minimumVersion=this.minimumVersion;
I.channel="/meta/handshake";
I.id=""+this.messageId++;
this.url=J||djConfig.cometdRoot;
if(!this.url){console.debug("no cometd root specified in djConfig and no root passed");
return 
}var H="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var K=(""+window.location).match(new RegExp(H));
if(K[4]){var F=K[4].split(":");
var L=F[0];
var D=F[1]||"80";
K=this.url.match(new RegExp(H));
if(K[4]){F=K[4].split(":");
var C=F[0];
var G=F[1]||"80";
this._isXD=((C!=L)||(G!=D))
}}if(!this._isXD){if(I.ext){if(I.ext["json-comment-filtered"]!==true&&I.ext["json-comment-filtered"]!==false){I.ext["json-comment-filtered"]=true
}}else{I.ext={"json-comment-filtered":true}
}}var E={url:this.url,handleAs:this.handleAs,content:{message:A.toJson([I])},load:A.hitch(this,"finishInit"),error:function(M){console.debug("handshake error!:",M)
}};
if(B){A.mixin(E,B)
}this._props=I;
this._initialized=true;
this.batch=0;
this.startBatch();
if(this._isXD){E.callbackParamName="jsonp";
return A.io.script.get(E)
}return A.xhrPost(E)
};
this.finishInit=function(B){B=B[0];
this.handshakeReturn=B;
if(B.advice){this.advice=B.advice
}if(!B.successful){console.debug("cometd init failed");
if(this.advice&&this.advice.reconnect=="none"){return 
}if(this.advice&&this.advice.interval&&this.advice.interval>0){var C=this;
setTimeout(function(){C.init(C.url,C._props)
},this.advice.interval)
}else{this.init(this.url,this._props)
}return 
}if(B.version<this.minimumVersion){console.debug("cometd protocol version mismatch. We wanted",this.minimumVersion,"but got",B.version);
return 
}this.currentTransport=this.connectionTypes.match(B.supportedConnectionTypes,B.version,this._isXD);
this.currentTransport._cometd=this;
this.currentTransport.version=B.version;
this.clientId=B.clientId;
this.tunnelInit=A.hitch(this.currentTransport,"tunnelInit");
this.tunnelCollapse=A.hitch(this.currentTransport,"tunnelCollapse");
this.currentTransport.startup(B)
};
this.deliver=function(B){A.forEach(B,this._deliver,this);
return B
};
this._deliver=function(D){if(!D.channel){if(D.success!==true){console.debug("cometd error: no channel for message!",D);
return 
}}this.lastMessage=D;
if(D.advice){this.advice=D.advice
}if((D.channel)&&(D.channel.length>5)&&(D.channel.substr(0,5)=="/meta")){switch(D.channel){case"/meta/connect":if(D.successful&&!this._connected){this._connected=this._initialized;
this.endBatch()
}else{if(!this._initialized){this._connected=false
}}break;
case"/meta/subscribe":var B=this.pendingSubscriptions[D.subscription];
if(!D.successful){if(B){B.errback(new Error(D.error));
delete this.pendingSubscriptions[D.subscription]
}return 
}dojox.cometd.subscribed(D.subscription,D);
if(B){B.callback(true);
delete this.pendingSubscriptions[D.subscription]
}break;
case"/meta/unsubscribe":var B=this.pendingUnsubscriptions[D.subscription];
if(!D.successful){if(B){B.errback(new Error(D.error));
delete this.pendingUnsubscriptions[D.subscription]
}return 
}this.unsubscribed(D.subscription,D);
if(B){B.callback(true);
delete this.pendingUnsubscriptions[D.subscription]
}break
}}this.currentTransport.deliver(D);
if(D.data){var C="/cometd"+D.channel;
A.publish(C,[D])
}};
this.disconnect=function(){A.forEach(this._subscriptions,A.unsubscribe);
this._subscriptions=[];
this._messageQ=[];
if(this._initialized&&this.currentTransport){this._initialized=false;
this.currentTransport.disconnect()
}this._initialized=false;
if(!this._polling){this._connected=false
}};
this.publish=function(E,B,C){var D={data:B,channel:E};
if(C){A.mixin(D,C)
}this._sendMessage(D)
};
this._sendMessage=function(B){if(this.currentTransport&&this._connected&&this.batch==0){return this.currentTransport.sendMessages([B])
}else{this._messageQ.push(B)
}};
this.subscribe=function(E,C,B){if(this.pendingSubscriptions[E]){var G=this.pendingSubscriptions[E];
G.cancel();
delete this.pendingSubscriptions[E]
}var F=new A.Deferred();
this.pendingSubscriptions[E]=F;
if(C){var D="/cometd"+E;
if(this.topics[D]){A.unsubscribe(this.topics[D])
}var H=A.subscribe(D,C,B);
this.topics[D]=H
}this._sendMessage({channel:"/meta/subscribe",subscription:E});
return F
};
this.subscribed=function(B,C){};
this.unsubscribe=function(E){if(this.pendingUnsubscriptions[E]){var C=this.pendingUnsubscriptions[E];
C.cancel();
delete this.pendingUnsubscriptions[E]
}var B=new A.Deferred();
this.pendingUnsubscriptions[E]=B;
var D="/cometd"+E;
if(this.topics[D]){A.unsubscribe(this.topics[D])
}this._sendMessage({channel:"/meta/unsubscribe",subscription:E});
return B
};
this.unsubscribed=function(B,C){};
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
this.check=function(B,C,D){return((!D)&&(A.indexOf(B,"long-polling")>=0))
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
this.openTunnelWith=function(D,C){var B=A.xhrPost({url:(C||this._cometd.url),content:D,handleAs:this._cometd.handleAs,load:A.hitch(this,function(E){this._cometd._polling=false;
this._cometd.deliver(E);
this.tunnelCollapse()
}),error:function(E){console.debug("tunnel opening failed:",E);
A.cometd._polling=false
}});
this._cometd._polling=true
};
this.sendMessages=function(B){for(var C=0;
C<B.length;
C++){B[C].clientId=this._cometd.clientId;
B[C].id=""+this._cometd.messageId++
}return A.xhrPost({url:this._cometd.url||djConfig.cometdRoot,handleAs:this._cometd.handleAs,load:A.hitch(this._cometd,"deliver"),content:{message:A.toJson(B)}})
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
this.check=function(B,C,D){return(A.indexOf(B,"callback-polling")>=0)
};
this.tunnelInit=function(){if(this._cometd._polling){return 
}this.openTunnelWith({message:A.toJson([{channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++}])})
};
this.tunnelCollapse=dojox.cometd.longPollTransport.tunnelCollapse;
this._connect=dojox.cometd.longPollTransport._connect;
this.deliver=dojox.cometd.longPollTransport.deliver;
this.openTunnelWith=function(B,C){A.io.script.get({load:A.hitch(this,function(D){this._cometd._polling=false;
this._cometd.deliver(D);
this.tunnelCollapse()
}),error:function(){this._cometd._polling=false;
console.debug("tunnel opening failed")
},url:(C||this._cometd.url),content:B,callbackParamName:"jsonp"});
this._cometd._polling=true
};
this.sendMessages=function(B){for(var D=0;
D<B.length;
D++){B[D].clientId=this._cometd.clientId;
B[D].id=""+this._cometd.messageId++
}var C={url:this._cometd.url||djConfig.cometdRoot,load:A.hitch(this._cometd,"deliver"),callbackParamName:"jsonp",content:{message:A.toJson(B)}};
return A.io.script.get(C)
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