if(!dojo._hasResource["dojox.wire.ml.Invocation"]){dojo._hasResource["dojox.wire.ml.Invocation"]=true;
dojo.provide("dojox.wire.ml.Invocation");
dojo.require("dojox.wire.ml.Action");
dojo.declare("dojox.wire.ml.Invocation",dojox.wire.ml.Action,{object:"",method:"",topic:"",parameters:"",result:"",error:"",_run:function(){if(this.topic){var F=this._getParameters(arguments);
try{dojo.publish(this.topic,F);
this.onComplete()
}catch(E){this.onError(E)
}}else{if(this.method){var H=(this.object?dojox.wire.ml._getValue(this.object):dojo.global);
if(!H){return 
}var F=this._getParameters(arguments);
var C=H[this.method];
if(!C){C=H.callMethod;
if(!C){return 
}F=[this.method,F]
}try{var D=false;
if(H.getFeatures){var B=H.getFeatures();
if((this.method=="fetch"&&B["dojo.data.api.Read"])||(this.method=="save"&&B["dojo.data.api.Write"])){var I=F[0];
if(!I.onComplete){I.onComplete=function(){}
}this.connect(I,"onComplete","onComplete");
if(!I.onError){I.onError=function(){}
}this.connect(I,"onError","onError");
D=true
}}var A=C.apply(H,F);
if(!D){if(A&&(A instanceof dojo.Deferred)){var G=this;
A.addCallbacks(function(J){G.onComplete(J)
},function(J){G.onError(J)
})
}else{this.onComplete(A)
}}}catch(E){this.onError(E)
}}}},onComplete:function(A){if(this.result){dojox.wire.ml._setValue(this.result,A)
}if(this.error){dojox.wire.ml._setValue(this.error,"")
}},onError:function(A){if(this.error){if(A&&A.message){A=A.message
}dojox.wire.ml._setValue(this.error,A)
}},_getParameters:function(A){if(!this.parameters){return A
}var C=[];
var D=this.parameters.split(",");
if(D.length==1){var E=dojox.wire.ml._getValue(D[0],A);
if(dojo.isArray(E)){C=E
}else{C.push(E)
}}else{for(var B in D){C.push(dojox.wire.ml._getValue(D[B],A))
}}return C
}})
};