dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Invocation"],["require","dojox.wire.ml.Action"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.Invocation"]){A._hasResource["dojox.wire.ml.Invocation"]=true;
A.provide("dojox.wire.ml.Invocation");
A.require("dojox.wire.ml.Action");
A.declare("dojox.wire.ml.Invocation",dojox.wire.ml.Action,{object:"",method:"",topic:"",parameters:"",result:"",error:"",_run:function(){if(this.topic){var G=this._getParameters(arguments);
try{A.publish(this.topic,G);
this.onComplete()
}catch(F){this.onError(F)
}}else{if(this.method){var I=(this.object?dojox.wire.ml._getValue(this.object):A.global);
if(!I){return 
}var G=this._getParameters(arguments);
var D=I[this.method];
if(!D){D=I.callMethod;
if(!D){return 
}G=[this.method,G]
}try{var E=false;
if(I.getFeatures){var C=I.getFeatures();
if((this.method=="fetch"&&C["dojo.data.api.Read"])||(this.method=="save"&&C["dojo.data.api.Write"])){var J=G[0];
if(!J.onComplete){J.onComplete=function(){}
}this.connect(J,"onComplete","onComplete");
if(!J.onError){J.onError=function(){}
}this.connect(J,"onError","onError");
E=true
}}var B=D.apply(I,G);
if(!E){if(B&&(B instanceof A.Deferred)){var H=this;
B.addCallbacks(function(K){H.onComplete(K)
},function(K){H.onError(K)
})
}else{this.onComplete(B)
}}}catch(F){this.onError(F)
}}}},onComplete:function(B){if(this.result){dojox.wire.ml._setValue(this.result,B)
}if(this.error){dojox.wire.ml._setValue(this.error,"")
}},onError:function(B){if(this.error){if(B&&B.message){B=B.message
}dojox.wire.ml._setValue(this.error,B)
}},_getParameters:function(B){if(!this.parameters){return B
}var D=[];
var E=this.parameters.split(",");
if(E.length==1){var F=dojox.wire.ml._getValue(E[0],B);
if(A.isArray(F)){D=F
}else{D.push(F)
}}else{for(var C in E){D.push(dojox.wire.ml._getValue(E[C],B))
}}return D
}})
}}});