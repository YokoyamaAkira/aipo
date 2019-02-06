dojo._xdResourceLoaded({depends:[["provide","dijit.form.ValidationTextBox"],["require","dojo.i18n"],["require","dijit.form.TextBox"],["require","dijit.Tooltip"],["requireLocalization","dijit.form","validate",null,"cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,ROOT,zh,zh-cn,zh-tw","cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,ROOT,zh,zh-cn,zh-tw"]],defineResource:function(A){if(!A._hasResource["dijit.form.ValidationTextBox"]){A._hasResource["dijit.form.ValidationTextBox"]=true;
A.provide("dijit.form.ValidationTextBox");
A.require("dojo.i18n");
A.require("dijit.form.TextBox");
A.require("dijit.Tooltip");
A.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\r\n\t\t\ttype=\'${type}\' name=\'${name}\'\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(B){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(C,B){return(new RegExp("^("+this.regExpGen(B)+")"+(this.required?"":"?")+"$")).test(C)&&(!this.required||!this._isEmpty(C))&&(this._isEmpty(C)||this.parse(C,B)!==null)
},isValid:function(B){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(B){return/^\s*$/.test(B)
},getErrorMessage:function(B){return this.invalidMessage
},getPromptMessage:function(B){return this.promptMessage
},validate:function(C){var D="";
var E=this.isValid(C);
var B=this._isEmpty(this.textbox.value);
this.state=(E||(!this._hasBeenBlurred&&B))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(E?"false":"true"));
if(C){if(B){D=this.getPromptMessage(true)
}if(!D&&!E){D=this.getErrorMessage(true)
}}this._displayMessage(D)
},_message:"",_displayMessage:function(B){if(this._message==B){return 
}this._message=B;
this.displayMessage(B)
},displayMessage:function(B){if(B){dijit.showTooltip(B,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(B){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(B){this.validate(true);
this._onMouse(B)
},onkeyup:function(B){this.onfocus(B)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=A.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var B=this.regExpGen(this.constraints);
this.regExp=B
}});
A.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(B,C){return(B.toString?B.toString():"")
},toString:function(){var B=this.filter(this.getValue());
return(B!=null)?((typeof B=="string")?B:this.serialize(B,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var B=this.textbox;
var C=(this.valueNode=document.createElement("input"));
C.setAttribute("type",B.type);
C.setAttribute("value",this.toString());
A.style(C,"display","none");
C.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
A.place(C,B,"after");
this.inherited("postCreate",arguments)
}});
A.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(B,C){return B-C
},rangeCheck:function(C,B){var E=(typeof B.min!="undefined");
var D=(typeof B.max!="undefined");
if(E||D){return(!E||this.compare(C,B.min)>=0)&&(!D||this.compare(C,B.max)<=0)
}else{return true
}},isInRange:function(B){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(B){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(B))
},getErrorMessage:function(B){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(B)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=A.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
}}});