dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Action"],["provide","dojox.wire.ml.ActionFilter"],["require","dijit._Widget"],["require","dijit._Container"],["require","dojox.wire.Wire"],["require","dojox.wire.ml.util"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.Action"]){A._hasResource["dojox.wire.ml.Action"]=true;
A.provide("dojox.wire.ml.Action");
A.provide("dojox.wire.ml.ActionFilter");
A.require("dijit._Widget");
A.require("dijit._Container");
A.require("dojox.wire.Wire");
A.require("dojox.wire.ml.util");
A.declare("dojox.wire.ml.Action",[dijit._Widget,dijit._Container],{trigger:"",triggerEvent:"",triggerTopic:"",postCreate:function(){this._connect()
},_connect:function(){if(this.triggerEvent){if(this.trigger){var D=dojox.wire.ml._getValue(this.trigger);
if(D){if(!D[this.triggerEvent]){D[this.triggerEvent]=function(){}
}this._triggerHandle=A.connect(D,this.triggerEvent,this,"run")
}}else{var B=this.triggerEvent.toLowerCase();
if(B=="onload"){var C=this;
A.addOnLoad(function(){C._run.apply(C,arguments)
})
}}}else{if(this.triggerTopic){this._triggerHandle=A.subscribe(this.triggerTopic,this,"run")
}}},_disconnect:function(){if(this._triggerHandle){if(this.triggerTopic){A.unsubscribe(this.triggerTopic,this._triggerHandle)
}else{A.disconnect(this._triggerHandle)
}}},run:function(){var D=this.getChildren();
for(var C in D){var B=D[C];
if(B instanceof dojox.wire.ml.ActionFilter){if(!B.filter.apply(B,arguments)){return 
}}}this._run.apply(this,arguments)
},_run:function(){var D=this.getChildren();
for(var C in D){var B=D[C];
if(B instanceof dojox.wire.ml.Action){B.run.apply(B,arguments)
}}},uninitialize:function(){this._disconnect();
return true
}});
A.declare("dojox.wire.ml.ActionFilter",dijit._Widget,{required:"",requiredValue:"",type:"",message:"",error:"",filter:function(){if(this.required===""){return true
}else{var B=dojox.wire.ml._getValue(this.required,arguments);
if(this.requiredValue===""){if(B){return true
}}else{var D=this.requiredValue;
if(this.type!==""){var C=this.type.toLowerCase();
if(C==="boolean"){if(D.toLowerCase()==="false"){D=false
}else{D=true
}}else{if(C==="number"){D=parseInt(D,10)
}}}if(B===D){return true
}}}if(this.message){if(this.error){dojox.wire.ml._setValue(this.error,this.message)
}else{alert(this.message)
}}return false
}})
}}});