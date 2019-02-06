if(!dojo._hasResource["dijit.form.TextBox"]){dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.require("dijit.form._FormWidget");
dojo.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\r\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\r\n\tautocomplete="off" type="${type}"\r\n\t/>\r\n',baseClass:"dijitTextBox",attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(C,B,A){var D=this.filter(C);
if((typeof D==typeof C)&&(A==null||A==undefined)){A=this.format(D,this.constraints)
}if(A!=null&&A!=undefined){this.textbox.value=A
}dijit.form.TextBox.superclass.setValue.call(this,D,B)
},setDisplayedValue:function(A){this.textbox.value=A;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(B,A){return((B==null||B==undefined)?"":(B.toString?B.toString():B))
},parse:function(B,A){return B
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){dojo.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var A=this.domNode;
var B=A.style.opacity;
A.style.opacity="0.999";
setTimeout(function(){A.style.opacity=B
},0)
}},filter:function(A){if(A==undefined||A==null){return""
}else{if(typeof A!="string"){return A
}}if(this.trim){A=dojo.trim(A)
}if(this.uppercase){A=A.toUpperCase()
}if(this.lowercase){A=A.toLowerCase()
}if(this.propercase){A=A.replace(/[^\s]+/g,function(B){return B.substring(0,1).toUpperCase()+B.substring(1)
})
}return A
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
};