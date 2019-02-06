if(!dojo._hasResource["dijit.form.FilteringSelect"]){dojo._hasResource["dijit.form.FilteringSelect"]=true;
dojo.provide("dijit.form.FilteringSelect");
dojo.require("dijit.form.ComboBox");
dojo.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{labelAttr:"",labelType:"text",_isvalid:true,isValid:function(){return this._isvalid
},_callbackSetLabel:function(C,A,B){if(A&&A.query[this.searchAttr]!=this._lastQuery){return 
}if(!C.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(C[0],B)
}},_openResultList:function(B,A){if(A.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=B.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(B,C,A){this.valueNode.value=B;
dijit.form.FilteringSelect.superclass.setValue.call(this,B,A,C);
this._lastDisplayedValue=C
},setValue:function(C,A){var D=this;
var B=function(E,F){if(E){if(D.store.isItemLoaded(E)){D._callbackSetLabel([E],undefined,F)
}else{D.store.loadItem({item:E,onItem:function(G,H){D._callbackSetLabel(G,H,F)
}})
}}else{D._isvalid=false;
D.validate(false)
}};
this.store.fetchItemByIdentity({identity:C,onItem:function(E){B(E,A)
}})
},_setValueFromItem:function(A,B){this._isvalid=true;
this._setValue(this.store.getIdentity(A),this.labelFunc(A,this.store),B)
},labelFunc:function(A,B){return B.getValue(A,this.searchAttr)
},onkeyup:function(A){},_doSelect:function(A){this.item=A.item;
this._setValueFromItem(A.item,true)
},setDisplayedValue:function(B){if(this.store){var A={};
this._lastQuery=A[this.searchAttr]=B;
this.textbox.value=B;
this._lastDisplayedValue=B;
this.store.fetch({query:A,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:dojo.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(A){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(A,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
};