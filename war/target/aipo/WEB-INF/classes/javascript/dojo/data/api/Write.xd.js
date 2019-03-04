dojo._xdResourceLoaded({depends:[["provide","dojo.data.api.Write"],["require","dojo.data.api.Read"]],defineResource:function(A){if(!A._hasResource["dojo.data.api.Write"]){A._hasResource["dojo.data.api.Write"]=true;
A.provide("dojo.data.api.Write");
A.require("dojo.data.api.Read");
A.declare("dojo.data.api.Write",A.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Write":true}
},newItem:function(C,B){var D;
throw new Error("Unimplemented API: dojo.data.api.Write.newItem");
return D
},deleteItem:function(B){throw new Error("Unimplemented API: dojo.data.api.Write.deleteItem");
return false
},setValue:function(C,B,D){throw new Error("Unimplemented API: dojo.data.api.Write.setValue");
return false
},setValues:function(D,C,B){throw new Error("Unimplemented API: dojo.data.api.Write.setValues");
return false
},unsetAttribute:function(C,B){throw new Error("Unimplemented API: dojo.data.api.Write.clear");
return false
},save:function(B){throw new Error("Unimplemented API: dojo.data.api.Write.save")
},revert:function(){throw new Error("Unimplemented API: dojo.data.api.Write.revert");
return false
},isDirty:function(B){throw new Error("Unimplemented API: dojo.data.api.Write.isDirty");
return false
}})
}}});