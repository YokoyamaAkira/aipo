if(!dojo._hasResource["dojo.data.api.Notification"]){dojo._hasResource["dojo.data.api.Notification"]=true;
dojo.provide("dojo.data.api.Notification");
dojo.require("dojo.data.api.Read");
dojo.declare("dojo.data.api.Notification",dojo.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Notification":true}
},onSet:function(C,B,A,D){throw new Error("Unimplemented API: dojo.data.api.Notification.onSet")
},onNew:function(B,A){throw new Error("Unimplemented API: dojo.data.api.Notification.onNew")
},onDelete:function(A){throw new Error("Unimplemented API: dojo.data.api.Notification.onDelete")
}})
};