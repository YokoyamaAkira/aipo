dojo._xdResourceLoaded({depends:[["provide","dijit.form.FilteringSelect"],["require","dijit.form.ComboBox"]],defineResource:function(A){if(!A._hasResource["dijit.form.FilteringSelect"]){A._hasResource["dijit.form.FilteringSelect"]=true;
A.provide("dijit.form.FilteringSelect");
A.require("dijit.form.ComboBox");
A.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{labelAttr:"",labelType:"text",_isvalid:true,isValid:function(){return this._isvalid
},_callbackSetLabel:function(C,D,B){if(D&&D.query[this.searchAttr]!=this._lastQuery){return 
}if(!C.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(C[0],B)
}},_openResultList:function(C,B){if(B.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=C.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(B,C,D){this.valueNode.value=B;
dijit.form.FilteringSelect.superclass.setValue.call(this,B,D,C);
this._lastDisplayedValue=C
},setValue:function(B,D){var C=this;
var E=function(G,F){if(G){if(C.store.isItemLoaded(G)){C._callbackSetLabel([G],undefined,F)
}else{C.store.loadItem({item:G,onItem:function(H,I){C._callbackSetLabel(H,I,F)
}})
}}else{C._isvalid=false;
C.validate(false)
}};
this.store.fetchItemByIdentity({identity:B,onItem:function(F){E(F,D)
}})
},_setValueFromItem:function(B,C){this._isvalid=true;
this._setValue(this.store.getIdentity(B),this.labelFunc(B,this.store),C)
},labelFunc:function(B,C){return C.getValue(B,this.searchAttr)
},onkeyup:function(B){},_doSelect:function(B){this.item=B.item;
this._setValueFromItem(B.item,true)
},setDisplayedValue:function(C){if(this.store){var B={};
this._lastQuery=B[this.searchAttr]=C;
this.textbox.value=C;
this._lastDisplayedValue=C;
this.store.fetch({query:B,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:A.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(B){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(B,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}}});