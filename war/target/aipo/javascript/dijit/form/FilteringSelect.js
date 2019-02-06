if(!dojo._hasResource["dijit.form.FilteringSelect"]){dojo._hasResource["dijit.form.FilteringSelect"]=true;
dojo.provide("dijit.form.FilteringSelect");
dojo.require("dijit.form.ComboBox");
dojo.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{labelAttr:"",labelType:"text",_isvalid:true,isValid:function(){return this._isvalid
},_callbackSetLabel:function(A,B,C){if(B&&B.query[this.searchAttr]!=this._lastQuery){return 
}if(!A.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(A[0],C)
}},_openResultList:function(A,B){if(B.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=A.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(C,A,B){this.valueNode.value=C;
dijit.form.FilteringSelect.superclass.setValue.call(this,C,B,A);
this._lastDisplayedValue=A
},setValue:function(D,B){var A=this;
var C=function(F,E){if(F){if(A.store.isItemLoaded(F)){A._callbackSetLabel([F],undefined,E)
}else{A.store.loadItem({item:F,onItem:function(G,H){A._callbackSetLabel(G,H,E)
}})
}}else{A._isvalid=false;
A.validate(false)
}};
this.store.fetchItemByIdentity({identity:D,onItem:function(E){C(E,B)
}})
},_setValueFromItem:function(B,A){this._isvalid=true;
this._setValue(this.store.getIdentity(B),this.labelFunc(B,this.store),A)
},labelFunc:function(B,A){return A.getValue(B,this.searchAttr)
},onkeyup:function(A){},_doSelect:function(A){this.item=A.item;
this._setValueFromItem(A.item,true)
},setDisplayedValue:function(A){if(this.store){var B={};
this._lastQuery=B[this.searchAttr]=A;
this.textbox.value=A;
this._lastDisplayedValue=A;
this.store.fetch({query:B,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:dojo.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(A){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(A,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
};