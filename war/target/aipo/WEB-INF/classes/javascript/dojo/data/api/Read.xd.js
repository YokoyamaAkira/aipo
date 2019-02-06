dojo._xdResourceLoaded({depends:[["provide","dojo.data.api.Read"],["require","dojo.data.api.Request"]],defineResource:function(A){if(!A._hasResource["dojo.data.api.Read"]){A._hasResource["dojo.data.api.Read"]=true;
A.provide("dojo.data.api.Read");
A.require("dojo.data.api.Request");
A.declare("dojo.data.api.Read",null,{getValue:function(B,E,C){var D=null;
throw new Error("Unimplemented API: dojo.data.api.Read.getValue");
return D
},getValues:function(D,C){var B=[];
throw new Error("Unimplemented API: dojo.data.api.Read.getValues");
return B
},getAttributes:function(C){var B=[];
throw new Error("Unimplemented API: dojo.data.api.Read.getAttributes");
return B
},hasAttribute:function(B,C){throw new Error("Unimplemented API: dojo.data.api.Read.hasAttribute");
return false
},containsValue:function(D,C,B){throw new Error("Unimplemented API: dojo.data.api.Read.containsValue");
return false
},isItem:function(B){throw new Error("Unimplemented API: dojo.data.api.Read.isItem");
return false
},isItemLoaded:function(B){throw new Error("Unimplemented API: dojo.data.api.Read.isItemLoaded");
return false
},loadItem:function(B){if(!this.isItemLoaded(B.item)){throw new Error("Unimplemented API: dojo.data.api.Read.loadItem")
}},fetch:function(C){var B=null;
throw new Error("Unimplemented API: dojo.data.api.Read.fetch");
return B
},getFeatures:function(){return{"dojo.data.api.Read":true}
},close:function(B){throw new Error("Unimplemented API: dojo.data.api.Read.close")
},getLabel:function(B){throw new Error("Unimplemented API: dojo.data.api.Read.getLabel");
return undefined
},getLabelAttributes:function(B){throw new Error("Unimplemented API: dojo.data.api.Read.getLabelAttributes");
return null
}})
}}});