if(!dojo._hasResource["dojo.data.api.Write"]){dojo._hasResource["dojo.data.api.Write"]=true;
dojo.provide("dojo.data.api.Write");
dojo.require("dojo.data.api.Read");
dojo.declare("dojo.data.api.Write",dojo.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Write":true}
},newItem:function(B,A){var C;
throw new Error("Unimplemented API: dojo.data.api.Write.newItem");
return C
},deleteItem:function(A){throw new Error("Unimplemented API: dojo.data.api.Write.deleteItem");
return false
},setValue:function(B,A,C){throw new Error("Unimplemented API: dojo.data.api.Write.setValue");
return false
},setValues:function(C,B,A){throw new Error("Unimplemented API: dojo.data.api.Write.setValues");
return false
},unsetAttribute:function(B,A){throw new Error("Unimplemented API: dojo.data.api.Write.clear");
return false
},save:function(A){throw new Error("Unimplemented API: dojo.data.api.Write.save")
},revert:function(){throw new Error("Unimplemented API: dojo.data.api.Write.revert");
return false
},isDirty:function(A){throw new Error("Unimplemented API: dojo.data.api.Write.isDirty");
return false
}})
};