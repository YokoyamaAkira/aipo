if(!dojo._hasResource["dojox.wire.ml.Action"]){dojo._hasResource["dojox.wire.ml.Action"]=true;
dojo.provide("dojox.wire.ml.Action");
dojo.provide("dojox.wire.ml.ActionFilter");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dojox.wire.Wire");
dojo.require("dojox.wire.ml.util");
dojo.declare("dojox.wire.ml.Action",[dijit._Widget,dijit._Container],{trigger:"",triggerEvent:"",triggerTopic:"",postCreate:function(){this._connect()
},_connect:function(){if(this.triggerEvent){if(this.trigger){var A=dojox.wire.ml._getValue(this.trigger);
if(A){if(!A[this.triggerEvent]){A[this.triggerEvent]=function(){}
}this._triggerHandle=dojo.connect(A,this.triggerEvent,this,"run")
}}else{var B=this.triggerEvent.toLowerCase();
if(B=="onload"){var C=this;
dojo.addOnLoad(function(){C._run.apply(C,arguments)
})
}}}else{if(this.triggerTopic){this._triggerHandle=dojo.subscribe(this.triggerTopic,this,"run")
}}},_disconnect:function(){if(this._triggerHandle){if(this.triggerTopic){dojo.unsubscribe(this.triggerTopic,this._triggerHandle)
}else{dojo.disconnect(this._triggerHandle)
}}},run:function(){var A=this.getChildren();
for(var C in A){var B=A[C];
if(B instanceof dojox.wire.ml.ActionFilter){if(!B.filter.apply(B,arguments)){return 
}}}this._run.apply(this,arguments)
},_run:function(){var A=this.getChildren();
for(var C in A){var B=A[C];
if(B instanceof dojox.wire.ml.Action){B.run.apply(B,arguments)
}}},uninitialize:function(){this._disconnect();
return true
}});
dojo.declare("dojox.wire.ml.ActionFilter",dijit._Widget,{required:"",requiredValue:"",type:"",message:"",error:"",filter:function(){if(this.required===""){return true
}else{var B=dojox.wire.ml._getValue(this.required,arguments);
if(this.requiredValue===""){if(B){return true
}}else{var A=this.requiredValue;
if(this.type!==""){var C=this.type.toLowerCase();
if(C==="boolean"){if(A.toLowerCase()==="false"){A=false
}else{A=true
}}else{if(C==="number"){A=parseInt(A,10)
}}}if(B===A){return true
}}}if(this.message){if(this.error){dojox.wire.ml._setValue(this.error,this.message)
}else{alert(this.message)
}}return false
}})
};