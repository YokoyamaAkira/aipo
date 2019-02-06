if(!dojo._hasResource["dojo.data.api.Identity"]){dojo._hasResource["dojo.data.api.Identity"]=true;
dojo.provide("dojo.data.api.Identity");
dojo.require("dojo.data.api.Read");
dojo.declare("dojo.data.api.Identity",dojo.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Identity":true}
},getIdentity:function(A){throw new Error("Unimplemented API: dojo.data.api.Identity.getIdentity");
var B=null;
return B
},getIdentityAttributes:function(A){throw new Error("Unimplemented API: dojo.data.api.Identity.getIdentityAttributes");
return null
},fetchItemByIdentity:function(A){if(!this.isItemLoaded(A.item)){throw new Error("Unimplemented API: dojo.data.api.Identity.fetchItemByIdentity")
}}})
};