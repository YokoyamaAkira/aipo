dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Action"],["provide","dojox.wire.ml.ActionFilter"],["require","dijit._Widget"],["require","dijit._Container"],["require","dojox.wire.Wire"],["require","dojox.wire.ml.util"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.Action"]){A._hasResource["dojox.wire.ml.Action"]=true;
A.provide("dojox.wire.ml.Action");
A.provide("dojox.wire.ml.ActionFilter");
A.require("dijit._Widget");
A.require("dijit._Container");
A.require("dojox.wire.Wire");
A.require("dojox.wire.ml.util");
A.declare("dojox.wire.ml.Action",[dijit._Widget,dijit._Container],{trigger:"",triggerEvent:"",triggerTopic:"",postCreate:function(){this._connect()
},_connect:function(){if(this.triggerEvent){if(this.trigger){var C=dojox.wire.ml._getValue(this.trigger);
if(C){if(!C[this.triggerEvent]){C[this.triggerEvent]=function(){}
}this._triggerHandle=A.connect(C,this.triggerEvent,this,"run")
}}else{var D=this.triggerEvent.toLowerCase();
if(D=="onload"){var B=this;
A.addOnLoad(function(){B._run.apply(B,arguments)
})
}}}else{if(this.triggerTopic){this._triggerHandle=A.subscribe(this.triggerTopic,this,"run")
}}},_disconnect:function(){if(this._triggerHandle){if(this.triggerTopic){A.unsubscribe(this.triggerTopic,this._triggerHandle)
}else{A.disconnect(this._triggerHandle)
}}},run:function(){var C=this.getChildren();
for(var B in C){var D=C[B];
if(D instanceof dojox.wire.ml.ActionFilter){if(!D.filter.apply(D,arguments)){return 
}}}this._run.apply(this,arguments)
},_run:function(){var C=this.getChildren();
for(var B in C){var D=C[B];
if(D instanceof dojox.wire.ml.Action){D.run.apply(D,arguments)
}}},uninitialize:function(){this._disconnect();
return true
}});
A.declare("dojox.wire.ml.ActionFilter",dijit._Widget,{required:"",requiredValue:"",type:"",message:"",error:"",filter:function(){if(this.required===""){return true
}else{var D=dojox.wire.ml._getValue(this.required,arguments);
if(this.requiredValue===""){if(D){return true
}}else{var C=this.requiredValue;
if(this.type!==""){var B=this.type.toLowerCase();
if(B==="boolean"){if(C.toLowerCase()==="false"){C=false
}else{C=true
}}else{if(B==="number"){C=parseInt(C,10)
}}}if(D===C){return true
}}}if(this.message){if(this.error){dojox.wire.ml._setValue(this.error,this.message)
}else{alert(this.message)
}}return false
}})
}}});