if(!dojo._hasResource["dojo.data.api.Write"]){dojo._hasResource["dojo.data.api.Write"]=true;
dojo.provide("dojo.data.api.Write");
dojo.require("dojo.data.api.Read");
dojo.declare("dojo.data.api.Write",dojo.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Write":true}
},newItem:function(A,C){var B;
throw new Error("Unimplemented API: dojo.data.api.Write.newItem");
return B
},deleteItem:function(A){throw new Error("Unimplemented API: dojo.data.api.Write.deleteItem");
return false
},setValue:function(A,C,B){throw new Error("Unimplemented API: dojo.data.api.Write.setValue");
return false
},setValues:function(B,A,C){throw new Error("Unimplemented API: dojo.data.api.Write.setValues");
return false
},unsetAttribute:function(A,B){throw new Error("Unimplemented API: dojo.data.api.Write.clear");
return false
},save:function(A){throw new Error("Unimplemented API: dojo.data.api.Write.save")
},revert:function(){throw new Error("Unimplemented API: dojo.data.api.Write.revert");
return false
},isDirty:function(A){throw new Error("Unimplemented API: dojo.data.api.Write.isDirty");
return false
}})
};