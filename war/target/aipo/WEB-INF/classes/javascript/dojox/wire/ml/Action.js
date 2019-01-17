if(!dojo._hasResource["dojox.wire.ml.Action"]){dojo._hasResource["dojox.wire.ml.Action"]=true;
dojo.provide("dojox.wire.ml.Action");
dojo.provide("dojox.wire.ml.ActionFilter");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dojox.wire.Wire");
dojo.require("dojox.wire.ml.util");
dojo.declare("dojox.wire.ml.Action",[dijit._Widget,dijit._Container],{trigger:"",triggerEvent:"",triggerTopic:"",postCreate:function(){this._connect()
},_connect:function(){if(this.triggerEvent){if(this.trigger){var B=dojox.wire.ml._getValue(this.trigger);
if(B){if(!B[this.triggerEvent]){B[this.triggerEvent]=function(){}
}this._triggerHandle=dojo.connect(B,this.triggerEvent,this,"run")
}}else{var C=this.triggerEvent.toLowerCase();
if(C=="onload"){var A=this;
dojo.addOnLoad(function(){A._run.apply(A,arguments)
})
}}}else{if(this.triggerTopic){this._triggerHandle=dojo.subscribe(this.triggerTopic,this,"run")
}}},_disconnect:function(){if(this._triggerHandle){if(this.triggerTopic){dojo.unsubscribe(this.triggerTopic,this._triggerHandle)
}else{dojo.disconnect(this._triggerHandle)
}}},run:function(){var B=this.getChildren();
for(var A in B){var C=B[A];
if(C instanceof dojox.wire.ml.ActionFilter){if(!C.filter.apply(C,arguments)){return 
}}}this._run.apply(this,arguments)
},_run:function(){var B=this.getChildren();
for(var A in B){var C=B[A];
if(C instanceof dojox.wire.ml.Action){C.run.apply(C,arguments)
}}},uninitialize:function(){this._disconnect();
return true
}});
dojo.declare("dojox.wire.ml.ActionFilter",dijit._Widget,{required:"",requiredValue:"",type:"",message:"",error:"",filter:function(){if(this.required===""){return true
}else{var C=dojox.wire.ml._getValue(this.required,arguments);
if(this.requiredValue===""){if(C){return true
}}else{var B=this.requiredValue;
if(this.type!==""){var A=this.type.toLowerCase();
if(A==="boolean"){if(B.toLowerCase()==="false"){B=false
}else{B=true
}}else{if(A==="number"){B=parseInt(B,10)
}}}if(C===B){return true
}}}if(this.message){if(this.error){dojox.wire.ml._setValue(this.error,this.message)
}else{alert(this.message)
}}return false
}})
};