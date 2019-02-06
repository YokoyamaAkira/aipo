dojo._xdResourceLoaded({depends:[["provide","dojo.data.api.Notification"],["require","dojo.data.api.Read"]],defineResource:function(A){if(!A._hasResource["dojo.data.api.Notification"]){A._hasResource["dojo.data.api.Notification"]=true;
A.provide("dojo.data.api.Notification");
A.require("dojo.data.api.Read");
A.declare("dojo.data.api.Notification",A.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Notification":true}
},onSet:function(E,D,C,B){throw new Error("Unimplemented API: dojo.data.api.Notification.onSet")
},onNew:function(B,C){throw new Error("Unimplemented API: dojo.data.api.Notification.onNew")
},onDelete:function(B){throw new Error("Unimplemented API: dojo.data.api.Notification.onDelete")
}})
}}});