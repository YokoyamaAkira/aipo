if(!dojo._hasResource["dijit.form.ValidationTextBox"]){dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.require("dojo.i18n");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.Tooltip");
dojo.requireLocalization("dijit.form","validate",null,"cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,ROOT,zh,zh-cn,zh-tw");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\r\n\t\t\ttype=\'${type}\' name=\'${name}\'\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(A){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(B,A){return(new RegExp("^("+this.regExpGen(A)+")"+(this.required?"":"?")+"$")).test(B)&&(!this.required||!this._isEmpty(B))&&(this._isEmpty(B)||this.parse(B,A)!==null)
},isValid:function(A){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(A){return/^\s*$/.test(A)
},getErrorMessage:function(A){return this.invalidMessage
},getPromptMessage:function(A){return this.promptMessage
},validate:function(D){var A="";
var B=this.isValid(D);
var C=this._isEmpty(this.textbox.value);
this.state=(B||(!this._hasBeenBlurred&&C))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(B?"false":"true"));
if(D){if(C){A=this.getPromptMessage(true)
}if(!A&&!B){A=this.getErrorMessage(true)
}}this._displayMessage(A)
},_message:"",_displayMessage:function(A){if(this._message==A){return 
}this._message=A;
this.displayMessage(A)
},displayMessage:function(A){if(A){dijit.showTooltip(A,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(A){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(A){this.validate(true);
this._onMouse(A)
},onkeyup:function(A){this.onfocus(A)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var A=this.regExpGen(this.constraints);
this.regExp=A
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(A,B){return(A.toString?A.toString():"")
},toString:function(){var A=this.filter(this.getValue());
return(A!=null)?((typeof A=="string")?A:this.serialize(A,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var A=this.textbox;
var B=(this.valueNode=document.createElement("input"));
B.setAttribute("type",A.type);
B.setAttribute("value",this.toString());
dojo.style(B,"display","none");
B.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(B,A,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(A,B){return A-B
},rangeCheck:function(D,C){var B=(typeof C.min!="undefined");
var A=(typeof C.max!="undefined");
if(B||A){return(!B||this.compare(D,C.min)>=0)&&(!A||this.compare(D,C.max)<=0)
}else{return true
}},isInRange:function(A){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(A){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(A))
},getErrorMessage:function(A){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(A)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
};