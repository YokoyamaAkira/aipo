dojo._xdResourceLoaded({depends:[["provide","dojo.data.api.Identity"],["require","dojo.data.api.Read"]],defineResource:function(A){if(!A._hasResource["dojo.data.api.Identity"]){A._hasResource["dojo.data.api.Identity"]=true;
A.provide("dojo.data.api.Identity");
A.require("dojo.data.api.Read");
A.declare("dojo.data.api.Identity",A.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Identity":true}
},getIdentity:function(C){throw new Error("Unimplemented API: dojo.data.api.Identity.getIdentity");
var B=null;
return B
},getIdentityAttributes:function(B){throw new Error("Unimplemented API: dojo.data.api.Identity.getIdentityAttributes");
return null
},fetchItemByIdentity:function(B){if(!this.isItemLoaded(B.item)){throw new Error("Unimplemented API: dojo.data.api.Identity.fetchItemByIdentity")
}}})
}}});