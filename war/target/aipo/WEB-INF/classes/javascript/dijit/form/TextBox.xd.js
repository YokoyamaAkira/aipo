dojo._xdResourceLoaded({depends:[["provide","dijit.form.TextBox"],["require","dijit.form._FormWidget"]],defineResource:function(A){if(!A._hasResource["dijit.form.TextBox"]){A._hasResource["dijit.form.TextBox"]=true;
A.provide("dijit.form.TextBox");
A.require("dijit.form._FormWidget");
A.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\r\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\r\n\tautocomplete="off" type="${type}"\r\n\t/>\r\n',baseClass:"dijitTextBox",attributeMap:A.mixin(A.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(B,E,D){var C=this.filter(B);
if((typeof C==typeof B)&&(D==null||D==undefined)){D=this.format(C,this.constraints)
}if(D!=null&&D!=undefined){this.textbox.value=D
}dijit.form.TextBox.superclass.setValue.call(this,C,E)
},setDisplayedValue:function(B){this.textbox.value=B;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(C,B){return((C==null||C==undefined)?"":(C.toString?C.toString():C))
},parse:function(C,B){return C
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){A.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(A.isFF==2&&this.domNode.tagName=="TABLE"){var B=this.domNode;
var C=B.style.opacity;
B.style.opacity="0.999";
setTimeout(function(){B.style.opacity=C
},0)
}},filter:function(B){if(B==undefined||B==null){return""
}else{if(typeof B!="string"){return B
}}if(this.trim){B=A.trim(B)
}if(this.uppercase){B=B.toUpperCase()
}if(this.lowercase){B=B.toLowerCase()
}if(this.propercase){B=B.replace(/[^\s]+/g,function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
})
}return B
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}}});