if(!dojo._hasResource["dijit.form.TimeTextBox"]){dojo._hasResource["dijit.form.TimeTextBox"]=true;
dojo.provide("dijit.form.TimeTextBox");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.date.stamp");
dojo.require("dijit._TimePicker");
dojo.require("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.TimeTextBox",dijit.form.RangeBoundTextBox,{regExpGen:dojo.date.locale.regexp,compare:dojo.date.compare,format:function(B,A){if(!B||B.toString()==this._invalid){return null
}return dojo.date.locale.format(B,A)
},parse:dojo.date.locale.parse,serialize:dojo.date.stamp.toISOString,value:new Date(""),_invalid:(new Date("")).toString(),_popupClass:"dijit._TimePicker",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
var A=this.constraints;
A.selector="time";
if(typeof A.min=="string"){A.min=dojo.date.stamp.fromISOString(A.min)
}if(typeof A.max=="string"){A.max=dojo.date.stamp.fromISOString(A.max)
}},_onFocus:function(A){this._open()
},setValue:function(A,B){this.inherited("setValue",arguments);
if(this._picker){if(!A||A.toString()==this._invalid){A=new Date()
}this._picker.setValue(A)
}},_open:function(){if(this.disabled){return 
}var B=this;
if(!this._picker){var A=dojo.getObject(this._popupClass,false);
this._picker=new A({onValueSelected:function(C){B.focus();
setTimeout(dojo.hitch(B,"_close"),1);
dijit.form.TimeTextBox.superclass.setValue.call(B,C,true)
},lang:this.lang,constraints:this.constraints,isDisabledDate:function(C){return B.constraints&&(dojo.date.compare(B.constraints.min,C)>0||dojo.date.compare(B.constraints.max,C)<0)
}});
this._picker.setValue(this.getValue()||new Date())
}if(!this._opened){dijit.popup.open({parent:this,popup:this._picker,around:this.domNode,onCancel:dojo.hitch(this,this._close),onClose:function(){B._opened=false
}});
this._opened=true
}dojo.marginBox(this._picker.domNode,{w:this.domNode.offsetWidth})
},_close:function(){if(this._opened){dijit.popup.close(this._picker);
this._opened=false
}},_onBlur:function(){this._close();
this.inherited("_onBlur",arguments)
},getDisplayedValue:function(){return this.textbox.value
},setDisplayedValue:function(A){this.textbox.value=A
}})
};