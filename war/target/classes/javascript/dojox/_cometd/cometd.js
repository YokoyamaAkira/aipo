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
this.tunnelInit=function(B,A){};
this.tunnelCollapse=function(){console.debug("tunnel collapsed!")
};
this.init=function(G,F,J){F=F||{};
F.version=this.version;
F.minimumVersion=this.minimumVersion;
F.channel="/meta/handshake";
F.id=""+this.messageId++;
this.url=G||djConfig.cometdRoot;
if(!this.url){console.debug("no cometd root specified in djConfig and no root passed");
return 
}var E="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var H=(""+window.location).match(new RegExp(E));
if(H[4]){var C=H[4].split(":");
var I=C[0];
var A=C[1]||"80";
H=this.url.match(new RegExp(E));
if(H[4]){C=H[4].split(":");
var K=C[0];
var D=C[1]||"80";
this._isXD=((K!=I)||(D!=A))
}}if(!this._isXD){if(F.ext){if(F.ext["json-comment-filtered"]!==true&&F.ext["json-comment-filtered"]!==false){F.ext["json-comment-filtered"]=true
}}else{F.ext={"json-comment-filtered":true}
}}var B={url:this.url,handleAs:this.handleAs,content:{message:dojo.toJson([F])},load:dojo.hitch(this,"finishInit"),error:function(L){console.debug("handshake error!:",L)
}};
if(J){dojo.mixin(B,J)
}this._props=F;
this._initialized=true;
this.batch=0;
this.startBatch();
if(this._isXD){B.callbackParamName="jsonp";
return dojo.io.script.get(B)
}return dojo.xhrPost(B)
};
this.finishInit=function(A){A=A[0];
this.handshakeReturn=A;
if(A.advice){this.advice=A.advice
}if(!A.successful){console.debug("cometd init failed");
if(this.advice&&this.advice.reconnect=="none"){return 
}if(this.advice&&this.advice.interval&&this.advice.interval>0){var B=this;
setTimeout(function(){B.init(B.url,B._props)
},this.advice.interval)
}else{this.init(this.url,this._props)
}return 
}if(A.version<this.minimumVersion){console.debug("cometd protocol version mismatch. We wanted",this.minimumVersion,"but got",A.version);
return 
}this.currentTransport=this.connectionTypes.match(A.supportedConnectionTypes,A.version,this._isXD);
this.currentTransport._cometd=this;
this.currentTransport.version=A.version;
this.clientId=A.clientId;
this.tunnelInit=dojo.hitch(this.currentTransport,"tunnelInit");
this.tunnelCollapse=dojo.hitch(this.currentTransport,"tunnelCollapse");
this.currentTransport.startup(A)
};
this.deliver=function(A){dojo.forEach(A,this._deliver,this);
return A
};
this._deliver=function(A){if(!A.channel){if(A.success!==true){console.debug("cometd error: no channel for message!",A);
return 
}}this.lastMessage=A;
if(A.advice){this.advice=A.advice
}if((A.channel)&&(A.channel.length>5)&&(A.channel.substr(0,5)=="/meta")){switch(A.channel){case"/meta/connect":if(A.successful&&!this._connected){this._connected=this._initialized;
this.endBatch()
}else{if(!this._initialized){this._connected=false
}}break;
case"/meta/subscribe":var B=this.pendingSubscriptions[A.subscription];
if(!A.successful){if(B){B.errback(new Error(A.error));
delete this.pendingSubscriptions[A.subscription]
}return 
}dojox.cometd.subscribed(A.subscription,A);
if(B){B.callback(true);
delete this.pendingSubscriptions[A.subscription]
}break;
case"/meta/unsubscribe":var B=this.pendingUnsubscriptions[A.subscription];
if(!A.successful){if(B){B.errback(new Error(A.error));
delete this.pendingUnsubscriptions[A.subscription]
}return 
}this.unsubscribed(A.subscription,A);
if(B){B.callback(true);
delete this.pendingUnsubscriptions[A.subscription]
}break
}}this.currentTransport.deliver(A);
if(A.data){var C="/cometd"+A.channel;
dojo.publish(C,[A])
}};
this.disconnect=function(){dojo.forEach(this._subscriptions,dojo.unsubscribe);
this._subscriptions=[];
this._messageQ=[];
if(this._initialized&&this.currentTransport){this._initialized=false;
this.currentTransport.disconnect()
}this._initialized=false;
if(!this._polling){this._connected=false
}};
this.publish=function(B,C,D){var A={data:C,channel:B};
if(D){dojo.mixin(A,D)
}this._sendMessage(A)
};
this._sendMessage=function(A){if(this.currentTransport&&this._connected&&this.batch==0){return this.currentTransport.sendMessages([A])
}else{this._messageQ.push(A)
}};
this.subscribe=function(B,G,D){if(this.pendingSubscriptions[B]){var E=this.pendingSubscriptions[B];
E.cancel();
delete this.pendingSubscriptions[B]
}var C=new dojo.Deferred();
this.pendingSubscriptions[B]=C;
if(G){var A="/cometd"+B;
if(this.topics[A]){dojo.unsubscribe(this.topics[A])
}var F=dojo.subscribe(A,G,D);
this.topics[A]=F
}this._sendMessage({channel:"/meta/subscribe",subscription:B});
return C
};
this.subscribed=function(A,B){};
this.unsubscribe=function(B){if(this.pendingUnsubscriptions[B]){var D=this.pendingUnsubscriptions[B];
D.cancel();
delete this.pendingUnsubscriptions[B]
}var C=new dojo.Deferred();
this.pendingUnsubscriptions[B]=C;
var A="/cometd"+B;
if(this.topics[A]){dojo.unsubscribe(this.topics[A])
}this._sendMessage({channel:"/meta/unsubscribe",subscription:B});
return C
};
this.unsubscribed=function(A,B){};
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
this.check=function(B,C,A){return((!A)&&(dojo.indexOf(B,"long-polling")>=0))
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
this.openTunnelWith=function(A,C){var B=dojo.xhrPost({url:(C||this._cometd.url),content:A,handleAs:this._cometd.handleAs,load:dojo.hitch(this,function(D){this._cometd._polling=false;
this._cometd.deliver(D);
this.tunnelCollapse()
}),error:function(D){console.debug("tunnel opening failed:",D);
dojo.cometd._polling=false
}});
this._cometd._polling=true
};
this.sendMessages=function(A){for(var B=0;
B<A.length;
B++){A[B].clientId=this._cometd.clientId;
A[B].id=""+this._cometd.messageId++
}return dojo.xhrPost({url:this._cometd.url||djConfig.cometdRoot,handleAs:this._cometd.handleAs,load:dojo.hitch(this._cometd,"deliver"),content:{message:dojo.toJson(A)}})
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
this.check=function(B,C,A){return(dojo.indexOf(B,"callback-polling")>=0)
};
this.tunnelInit=function(){if(this._cometd._polling){return 
}this.openTunnelWith({message:dojo.toJson([{channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++}])})
};
this.tunnelCollapse=dojox.cometd.longPollTransport.tunnelCollapse;
this._connect=dojox.cometd.longPollTransport._connect;
this.deliver=dojox.cometd.longPollTransport.deliver;
this.openTunnelWith=function(A,B){dojo.io.script.get({load:dojo.hitch(this,function(C){this._cometd._polling=false;
this._cometd.deliver(C);
this.tunnelCollapse()
}),error:function(){this._cometd._polling=false;
console.debug("tunnel opening failed")
},url:(B||this._cometd.url),content:A,callbackParamName:"jsonp"});
this._cometd._polling=true
};
this.sendMessages=function(B){for(var A=0;
A<B.length;
A++){B[A].clientId=this._cometd.clientId;
B[A].id=""+this._cometd.messageId++
}var C={url:this._cometd.url||djConfig.cometdRoot,load:dojo.hitch(this._cometd,"deliver"),callbackParamName:"jsonp",content:{message:dojo.toJson(B)}};
return dojo.io.script.get(C)
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