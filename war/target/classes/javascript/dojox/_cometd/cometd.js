if(!dojo._hasResource["dojox._cometd.cometd"]){dojo._hasResource["dojox._cometd.cometd"]=true;
dojo.provide("dojox._cometd.cometd");
dojo.require("dojo.AdapterRegistry");
dojo.require("dojo.io.script");
dojox.cometd=new function(){this._initialized=false;
this._connected=false;
this._polling=false;
this.connectionTypes=new dojo.AdapterRegistry(true);
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
this.tunnelInit=function(A,B){};
this.tunnelCollapse=function(){console.debug("tunnel collapsed!")
};
this.init=function(K,J,C){J=J||{};
J.version=this.version;
J.minimumVersion=this.minimumVersion;
J.channel="/meta/handshake";
J.id=""+this.messageId++;
this.url=K||djConfig.cometdRoot;
if(!this.url){console.debug("no cometd root specified in djConfig and no root passed");
return 
}var I="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var A=(""+window.location).match(new RegExp(I));
if(A[4]){var G=A[4].split(":");
var B=G[0];
var E=G[1]||"80";
A=this.url.match(new RegExp(I));
if(A[4]){G=A[4].split(":");
var D=G[0];
var H=G[1]||"80";
this._isXD=((D!=B)||(H!=E))
}}if(!this._isXD){if(J.ext){if(J.ext["json-comment-filtered"]!==true&&J.ext["json-comment-filtered"]!==false){J.ext["json-comment-filtered"]=true
}}else{J.ext={"json-comment-filtered":true}
}}var F={url:this.url,handleAs:this.handleAs,content:{message:dojo.toJson([J])},load:dojo.hitch(this,"finishInit"),error:function(L){console.debug("handshake error!:",L)
}};
if(C){dojo.mixin(F,C)
}this._props=J;
this._initialized=true;
this.batch=0;
this.startBatch();
if(this._isXD){F.callbackParamName="jsonp";
return dojo.io.script.get(F)
}return dojo.xhrPost(F)
};
this.finishInit=function(B){B=B[0];
this.handshakeReturn=B;
if(B.advice){this.advice=B.advice
}if(!B.successful){console.debug("cometd init failed");
if(this.advice&&this.advice.reconnect=="none"){return 
}if(this.advice&&this.advice.interval&&this.advice.interval>0){var A=this;
setTimeout(function(){A.init(A.url,A._props)
},this.advice.interval)
}else{this.init(this.url,this._props)
}return 
}if(B.version<this.minimumVersion){console.debug("cometd protocol version mismatch. We wanted",this.minimumVersion,"but got",B.version);
return 
}this.currentTransport=this.connectionTypes.match(B.supportedConnectionTypes,B.version,this._isXD);
this.currentTransport._cometd=this;
this.currentTransport.version=B.version;
this.clientId=B.clientId;
this.tunnelInit=dojo.hitch(this.currentTransport,"tunnelInit");
this.tunnelCollapse=dojo.hitch(this.currentTransport,"tunnelCollapse");
this.currentTransport.startup(B)
};
this.deliver=function(A){dojo.forEach(A,this._deliver,this);
return A
};
this._deliver=function(B){if(!B.channel){if(B.success!==true){console.debug("cometd error: no channel for message!",B);
return 
}}this.lastMessage=B;
if(B.advice){this.advice=B.advice
}if((B.channel)&&(B.channel.length>5)&&(B.channel.substr(0,5)=="/meta")){switch(B.channel){case"/meta/connect":if(B.successful&&!this._connected){this._connected=this._initialized;
this.endBatch()
}else{if(!this._initialized){this._connected=false
}}break;
case"/meta/subscribe":var C=this.pendingSubscriptions[B.subscription];
if(!B.successful){if(C){C.errback(new Error(B.error));
delete this.pendingSubscriptions[B.subscription]
}return 
}dojox.cometd.subscribed(B.subscription,B);
if(C){C.callback(true);
delete this.pendingSubscriptions[B.subscription]
}break;
case"/meta/unsubscribe":var C=this.pendingUnsubscriptions[B.subscription];
if(!B.successful){if(C){C.errback(new Error(B.error));
delete this.pendingUnsubscriptions[B.subscription]
}return 
}this.unsubscribed(B.subscription,B);
if(C){C.callback(true);
delete this.pendingUnsubscriptions[B.subscription]
}break
}}this.currentTransport.deliver(B);
if(B.data){var A="/cometd"+B.channel;
dojo.publish(A,[B])
}};
this.disconnect=function(){dojo.forEach(this._subscriptions,dojo.unsubscribe);
this._subscriptions=[];
this._messageQ=[];
if(this._initialized&&this.currentTransport){this._initialized=false;
this.currentTransport.disconnect()
}this._initialized=false;
if(!this._polling){this._connected=false
}};
this.publish=function(C,D,A){var B={data:D,channel:C};
if(A){dojo.mixin(B,A)
}this._sendMessage(B)
};
this._sendMessage=function(A){if(this.currentTransport&&this._connected&&this.batch==0){return this.currentTransport.sendMessages([A])
}else{this._messageQ.push(A)
}};
this.subscribe=function(E,C,G){if(this.pendingSubscriptions[E]){var A=this.pendingSubscriptions[E];
A.cancel();
delete this.pendingSubscriptions[E]
}var F=new dojo.Deferred();
this.pendingSubscriptions[E]=F;
if(C){var D="/cometd"+E;
if(this.topics[D]){dojo.unsubscribe(this.topics[D])
}var B=dojo.subscribe(D,C,G);
this.topics[D]=B
}this._sendMessage({channel:"/meta/subscribe",subscription:E});
return F
};
this.subscribed=function(B,A){};
this.unsubscribe=function(C){if(this.pendingUnsubscriptions[C]){var A=this.pendingUnsubscriptions[C];
A.cancel();
delete this.pendingUnsubscriptions[C]
}var D=new dojo.Deferred();
this.pendingUnsubscriptions[C]=D;
var B="/cometd"+C;
if(this.topics[B]){dojo.unsubscribe(this.topics[B])
}this._sendMessage({channel:"/meta/unsubscribe",subscription:C});
return D
};
this.unsubscribed=function(B,A){};
this.startBatch=function(){this.batch++
};
this.endBatch=function(){if(--this.batch<=0&&this.currentTransport&&this._connected){this.batch=0;
var A=this._messageQ;
this._messageQ=[];
if(A.length>0){this.currentTransport.sendMessages(A)
}}};
this._onUnload=function(){dojo.addOnUnload(dojox.cometd,"disconnect")
}
};
dojox.cometd.longPollTransport=new function(){this._connectionType="long-polling";
this._cometd=null;
this.lastTimestamp=null;
this.check=function(C,A,B){return((!B)&&(dojo.indexOf(C,"long-polling")>=0))
};
this.tunnelInit=function(){if(this._cometd._polling){return 
}this.openTunnelWith({message:dojo.toJson([{channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++}])})
};
this.tunnelCollapse=function(){if(!this._cometd._polling){this._cometd._polling=false;
if(this._cometd.advice){if(this._cometd.advice.reconnect=="none"){return 
}if((this._cometd.advice.interval)&&(this._cometd.advice.interval>0)){var A=this;
setTimeout(function(){A._connect()
},this._cometd.advice.interval)
}else{this._connect()
}}else{this._connect()
}}};
this._connect=function(){if((this._cometd.advice)&&(this._cometd.advice.reconnect=="handshake")){this._cometd.init(this._cometd.url,this._cometd._props)
}else{if(this._cometd._connected){this.openTunnelWith({message:dojo.toJson([{channel:"/meta/connect",connectionType:this._connectionType,clientId:this._cometd.clientId,timestamp:this.lastTimestamp,id:""+this._cometd.messageId++}])})
}}};
this.deliver=function(A){if(A.timestamp){this.lastTimestamp=A.timestamp
}};
this.openTunnelWith=function(B,A){var C=dojo.xhrPost({url:(A||this._cometd.url),content:B,handleAs:this._cometd.handleAs,load:dojo.hitch(this,function(D){this._cometd._polling=false;
this._cometd.deliver(D);
this.tunnelCollapse()
}),error:function(D){console.debug("tunnel opening failed:",D);
dojo.cometd._polling=false
}});
this._cometd._polling=true
};
this.sendMessages=function(B){for(var A=0;
A<B.length;
A++){B[A].clientId=this._cometd.clientId;
B[A].id=""+this._cometd.messageId++
}return dojo.xhrPost({url:this._cometd.url||djConfig.cometdRoot,handleAs:this._cometd.handleAs,load:dojo.hitch(this._cometd,"deliver"),content:{message:dojo.toJson(B)}})
};
this.startup=function(A){if(this._cometd._connected){return 
}this.tunnelInit()
};
this.disconnect=function(){dojo.xhrPost({url:this._cometd.url||djConfig.cometdRoot,handleAs:this._cometd.handleAs,content:{message:dojo.toJson([{channel:"/meta/disconnect",clientId:this._cometd.clientId,id:""+this._cometd.messageId++}])}})
}
};
dojox.cometd.callbackPollTransport=new function(){this._connectionType="callback-polling";
this._cometd=null;
this.lastTimestamp=null;
this.check=function(C,A,B){return(dojo.indexOf(C,"callback-polling")>=0)
};
this.tunnelInit=function(){if(this._cometd._polling){return 
}this.openTunnelWith({message:dojo.toJson([{channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++}])})
};
this.tunnelCollapse=dojox.cometd.longPollTransport.tunnelCollapse;
this._connect=dojox.cometd.longPollTransport._connect;
this.deliver=dojox.cometd.longPollTransport.deliver;
this.openTunnelWith=function(B,A){dojo.io.script.get({load:dojo.hitch(this,function(C){this._cometd._polling=false;
this._cometd.deliver(C);
this.tunnelCollapse()
}),error:function(){this._cometd._polling=false;
console.debug("tunnel opening failed")
},url:(A||this._cometd.url),content:B,callbackParamName:"jsonp"});
this._cometd._polling=true
};
this.sendMessages=function(C){for(var B=0;
B<C.length;
B++){C[B].clientId=this._cometd.clientId;
C[B].id=""+this._cometd.messageId++
}var A={url:this._cometd.url||djConfig.cometdRoot,load:dojo.hitch(this._cometd,"deliver"),callbackParamName:"jsonp",content:{message:dojo.toJson(C)}};
return dojo.io.script.get(A)
};
this.startup=function(A){if(this._cometd._connected){return 
}this.tunnelInit()
};
this.disconnect=dojox.cometd.longPollTransport.disconnect;
this.disconnect=function(){dojo.io.script.get({url:this._cometd.url||djConfig.cometdRoot,callbackParamName:"jsonp",content:{message:dojo.toJson([{channel:"/meta/disconnect",clientId:this._cometd.clientId,id:""+this._cometd.messageId++}])}})
}
};
dojox.cometd.connectionTypes.register("long-polling",dojox.cometd.longPollTransport.check,dojox.cometd.longPollTransport);
dojox.cometd.connectionTypes.register("callback-polling",dojox.cometd.callbackPollTransport.check,dojox.cometd.callbackPollTransport);
dojo.addOnUnload(dojox.cometd,"_onUnload")
};