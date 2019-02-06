if(!dojo._hasResource["dojox.wire.ml.Invocation"]){dojo._hasResource["dojox.wire.ml.Invocation"]=true;
dojo.provide("dojox.wire.ml.Invocation");
dojo.require("dojox.wire.ml.Action");
dojo.declare("dojox.wire.ml.Invocation",dojox.wire.ml.Action,{object:"",method:"",topic:"",parameters:"",result:"",error:"",_run:function(){if(this.topic){var B=this._getParameters(arguments);
try{dojo.publish(this.topic,B);
this.onComplete()
}catch(A){this.onError(A)
}}else{if(this.method){var D=(this.object?dojox.wire.ml._getValue(this.object):dojo.global);
if(!D){return 
}var B=this._getParameters(arguments);
var H=D[this.method];
if(!H){H=D.callMethod;
if(!H){return 
}B=[this.method,B]
}try{var I=false;
if(D.getFeatures){var G=D.getFeatures();
if((this.method=="fetch"&&G["dojo.data.api.Read"])||(this.method=="save"&&G["dojo.data.api.Write"])){var E=B[0];
if(!E.onComplete){E.onComplete=function(){}
}this.connect(E,"onComplete","onComplete");
if(!E.onError){E.onError=function(){}
}this.connect(E,"onError","onError");
I=true
}}var F=H.apply(D,B);
if(!I){if(F&&(F instanceof dojo.Deferred)){var C=this;
F.addCallbacks(function(J){C.onComplete(J)
},function(J){C.onError(J)
})
}else{this.onComplete(F)
}}}catch(A){this.onError(A)
}}}},onComplete:function(A){if(this.result){dojox.wire.ml._setValue(this.result,A)
}if(this.error){dojox.wire.ml._setValue(this.error,"")
}},onError:function(A){if(this.error){if(A&&A.message){A=A.message
}dojox.wire.ml._setValue(this.error,A)
}},_getParameters:function(E){if(!this.parameters){return E
}var B=[];
var C=this.parameters.split(",");
if(C.length==1){var D=dojox.wire.ml._getValue(C[0],E);
if(dojo.isArray(D)){B=D
}else{B.push(D)
}}else{for(var A in C){B.push(dojox.wire.ml._getValue(C[A],E))
}}return B
}})
};