if(!dojo._hasResource["dojo.data.api.Read"]){dojo._hasResource["dojo.data.api.Read"]=true;
dojo.provide("dojo.data.api.Read");
dojo.require("dojo.data.api.Request");
dojo.declare("dojo.data.api.Read",null,{getValue:function(D,C,A){var B=null;
throw new Error("Unimplemented API: dojo.data.api.Read.getValue");
return B
},getValues:function(B,A){var C=[];
throw new Error("Unimplemented API: dojo.data.api.Read.getValues");
return C
},getAttributes:function(A){var B=[];
throw new Error("Unimplemented API: dojo.data.api.Read.getAttributes");
return B
},hasAttribute:function(B,A){throw new Error("Unimplemented API: dojo.data.api.Read.hasAttribute");
return false
},containsValue:function(B,A,C){throw new Error("Unimplemented API: dojo.data.api.Read.containsValue");
return false
},isItem:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.isItem");
return false
},isItemLoaded:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.isItemLoaded");
return false
},loadItem:function(A){if(!this.isItemLoaded(A.item)){throw new Error("Unimplemented API: dojo.data.api.Read.loadItem")
}},fetch:function(A){var B=null;
throw new Error("Unimplemented API: dojo.data.api.Read.fetch");
return B
},getFeatures:function(){return{"dojo.data.api.Read":true}
},close:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.close")
},getLabel:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.getLabel");
return undefined
},getLabelAttributes:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.getLabelAttributes");
return null
}})
};