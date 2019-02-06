dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Invocation"],["require","dojox.wire.ml.Action"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.Invocation"]){A._hasResource["dojox.wire.ml.Invocation"]=true;
A.provide("dojox.wire.ml.Invocation");
A.require("dojox.wire.ml.Action");
A.declare("dojox.wire.ml.Invocation",dojox.wire.ml.Action,{object:"",method:"",topic:"",parameters:"",result:"",error:"",_run:function(){if(this.topic){var E=this._getParameters(arguments);
try{A.publish(this.topic,E);
this.onComplete()
}catch(D){this.onError(D)
}}else{if(this.method){var G=(this.object?dojox.wire.ml._getValue(this.object):A.global);
if(!G){return 
}var E=this._getParameters(arguments);
var B=G[this.method];
if(!B){B=G.callMethod;
if(!B){return 
}E=[this.method,E]
}try{var C=false;
if(G.getFeatures){var J=G.getFeatures();
if((this.method=="fetch"&&J["dojo.data.api.Read"])||(this.method=="save"&&J["dojo.data.api.Write"])){var H=E[0];
if(!H.onComplete){H.onComplete=function(){}
}this.connect(H,"onComplete","onComplete");
if(!H.onError){H.onError=function(){}
}this.connect(H,"onError","onError");
C=true
}}var I=B.apply(G,E);
if(!C){if(I&&(I instanceof A.Deferred)){var F=this;
I.addCallbacks(function(K){F.onComplete(K)
},function(K){F.onError(K)
})
}else{this.onComplete(I)
}}}catch(D){this.onError(D)
}}}},onComplete:function(B){if(this.result){dojox.wire.ml._setValue(this.result,B)
}if(this.error){dojox.wire.ml._setValue(this.error,"")
}},onError:function(B){if(this.error){if(B&&B.message){B=B.message
}dojox.wire.ml._setValue(this.error,B)
}},_getParameters:function(C){if(!this.parameters){return C
}var E=[];
var F=this.parameters.split(",");
if(F.length==1){var B=dojox.wire.ml._getValue(F[0],C);
if(A.isArray(B)){E=B
}else{E.push(B)
}}else{for(var D in F){E.push(dojox.wire.ml._getValue(F[D],C))
}}return E
}})
}}});