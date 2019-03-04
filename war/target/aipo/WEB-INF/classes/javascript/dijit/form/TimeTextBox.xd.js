dojo._xdResourceLoaded({depends:[["provide","dijit.form.TimeTextBox"],["require","dojo.date"],["require","dojo.date.locale"],["require","dojo.date.stamp"],["require","dijit._TimePicker"],["require","dijit.form.ValidationTextBox"]],defineResource:function(A){if(!A._hasResource["dijit.form.TimeTextBox"]){A._hasResource["dijit.form.TimeTextBox"]=true;
A.provide("dijit.form.TimeTextBox");
A.require("dojo.date");
A.require("dojo.date.locale");
A.require("dojo.date.stamp");
A.require("dijit._TimePicker");
A.require("dijit.form.ValidationTextBox");
A.declare("dijit.form.TimeTextBox",dijit.form.RangeBoundTextBox,{regExpGen:A.date.locale.regexp,compare:A.date.compare,format:function(B,C){if(!B||B.toString()==this._invalid){return null
}return A.date.locale.format(B,C)
},parse:A.date.locale.parse,serialize:A.date.stamp.toISOString,value:new Date(""),_invalid:(new Date("")).toString(),_popupClass:"dijit._TimePicker",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
var B=this.constraints;
B.selector="time";
if(typeof B.min=="string"){B.min=A.date.stamp.fromISOString(B.min)
}if(typeof B.max=="string"){B.max=A.date.stamp.fromISOString(B.max)
}},_onFocus:function(B){this._open()
},setValue:function(C,B){this.inherited("setValue",arguments);
if(this._picker){if(!C||C.toString()==this._invalid){C=new Date()
}this._picker.setValue(C)
}},_open:function(){if(this.disabled){return 
}var B=this;
if(!this._picker){var C=A.getObject(this._popupClass,false);
this._picker=new C({onValueSelected:function(D){B.focus();
setTimeout(A.hitch(B,"_close"),1);
dijit.form.TimeTextBox.superclass.setValue.call(B,D,true)
},lang:this.lang,constraints:this.constraints,isDisabledDate:function(D){return B.constraints&&(A.date.compare(B.constraints.min,D)>0||A.date.compare(B.constraints.max,D)<0)
}});
this._picker.setValue(this.getValue()||new Date())
}if(!this._opened){dijit.popup.open({parent:this,popup:this._picker,around:this.domNode,onCancel:A.hitch(this,this._close),onClose:function(){B._opened=false
}});
this._opened=true
}A.marginBox(this._picker.domNode,{w:this.domNode.offsetWidth})
},_close:function(){if(this._opened){dijit.popup.close(this._picker);
this._opened=false
}},_onBlur:function(){this._close();
this.inherited("_onBlur",arguments)
},getDisplayedValue:function(){return this.textbox.value
},setDisplayedValue:function(B){this.textbox.value=B
}})
}}});