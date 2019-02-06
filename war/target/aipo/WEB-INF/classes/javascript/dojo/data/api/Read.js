if(!dojo._hasResource["dojo.data.api.Read"]){dojo._hasResource["dojo.data.api.Read"]=true;
dojo.provide("dojo.data.api.Read");
dojo.require("dojo.data.api.Request");
dojo.declare("dojo.data.api.Read",null,{getValue:function(C,B,D){var A=null;
throw new Error("Unimplemented API: dojo.data.api.Read.getValue");
return A
},getValues:function(A,C){var B=[];
throw new Error("Unimplemented API: dojo.data.api.Read.getValues");
return B
},getAttributes:function(B){var A=[];
throw new Error("Unimplemented API: dojo.data.api.Read.getAttributes");
return A
},hasAttribute:function(A,B){throw new Error("Unimplemented API: dojo.data.api.Read.hasAttribute");
return false
},containsValue:function(A,C,B){throw new Error("Unimplemented API: dojo.data.api.Read.containsValue");
return false
},isItem:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.isItem");
return false
},isItemLoaded:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.isItemLoaded");
return false
},loadItem:function(A){if(!this.isItemLoaded(A.item)){throw new Error("Unimplemented API: dojo.data.api.Read.loadItem")
}},fetch:function(B){var A=null;
throw new Error("Unimplemented API: dojo.data.api.Read.fetch");
return A
},getFeatures:function(){return{"dojo.data.api.Read":true}
},close:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.close")
},getLabel:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.getLabel");
return undefined
},getLabelAttributes:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.getLabelAttributes");
return null
}})
};