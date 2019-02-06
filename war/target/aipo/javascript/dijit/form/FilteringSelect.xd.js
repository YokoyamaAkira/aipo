dojo._xdResourceLoaded({depends:[["provide","dijit.form.FilteringSelect"],["require","dijit.form.ComboBox"]],defineResource:function(A){if(!A._hasResource["dijit.form.FilteringSelect"]){A._hasResource["dijit.form.FilteringSelect"]=true;
A.provide("dijit.form.FilteringSelect");
A.require("dijit.form.ComboBox");
A.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{labelAttr:"",labelType:"text",_isvalid:true,isValid:function(){return this._isvalid
},_callbackSetLabel:function(B,C,D){if(C&&C.query[this.searchAttr]!=this._lastQuery){return 
}if(!B.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(B[0],D)
}},_openResultList:function(B,C){if(C.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=B.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(D,B,C){this.valueNode.value=D;
dijit.form.FilteringSelect.superclass.setValue.call(this,D,C,B);
this._lastDisplayedValue=B
},setValue:function(E,C){var B=this;
var D=function(G,F){if(G){if(B.store.isItemLoaded(G)){B._callbackSetLabel([G],undefined,F)
}else{B.store.loadItem({item:G,onItem:function(H,I){B._callbackSetLabel(H,I,F)
}})
}}else{B._isvalid=false;
B.validate(false)
}};
this.store.fetchItemByIdentity({identity:E,onItem:function(F){D(F,C)
}})
},_setValueFromItem:function(C,B){this._isvalid=true;
this._setValue(this.store.getIdentity(C),this.labelFunc(C,this.store),B)
},labelFunc:function(C,B){return B.getValue(C,this.searchAttr)
},onkeyup:function(B){},_doSelect:function(B){this.item=B.item;
this._setValueFromItem(B.item,true)
},setDisplayedValue:function(B){if(this.store){var C={};
this._lastQuery=C[this.searchAttr]=B;
this.textbox.value=B;
this._lastDisplayedValue=B;
this.store.fetch({query:C,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:A.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(B){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(B,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}}});