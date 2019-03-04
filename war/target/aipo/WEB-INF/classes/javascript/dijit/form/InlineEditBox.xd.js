dojo._xdResourceLoaded({depends:[["provide","dijit.form.InlineEditBox"],["require","dojo.i18n"],["require","dijit.form._FormWidget"],["require","dijit._Container"],["require","dijit.form.Button"],["requireLocalization","dijit","common",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"]],defineResource:function(A){if(!A._hasResource["dijit.form.InlineEditBox"]){A._hasResource["dijit.form.InlineEditBox"]=true;
A.provide("dijit.form.InlineEditBox");
A.require("dojo.i18n");
A.require("dijit.form._FormWidget");
A.require("dijit._Container");
A.require("dijit.form.Button");
A.deprecated("dijit.form.InlineEditBox is deprecated, use dijit.InlineEditBox instead","","1.1");
A.declare("dijit.form.InlineEditBox",[dijit.form._FormWidget,dijit._Container],{templateString:'<span\r\n\t><fieldset dojoAttachPoint="editNode" style="display:none;" waiRole="presentation"\r\n\t\t><div dojoAttachPoint="containerNode" dojoAttachEvent="onkeypress:_onEditWidgetKeyPress"></div\r\n\t\t><div dojoAttachPoint="buttonContainer"\r\n\t\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t\t></div\r\n\t></fieldset\r\n\t><span tabIndex="0" dojoAttachPoint="textNode,focusNode" waiRole="button" style="display:none;"\r\n\t\tdojoAttachEvent="onkeypress:_onKeyPress,onclick:_onClick,onmouseout:_onMouseOut,onmouseover:_onMouseOver,onfocus:_onMouseOver,onblur:_onMouseOut"\r\n\t></span\r\n></span>\r\n',editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,widgetsInTemplate:true,_display:"",startup:function(){if(!this._started){if(this.editWidget){this.containerNode.appendChild(this.editWidget.domNode)
}else{this.editWidget=this.getChildren()[0]
}var B=A.getComputedStyle(this.domNode);
A.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(D){this.editWidget.focusNode.style[D]=B[D]
},this);
this._setEditValue=A.hitch(this.editWidget,this.editWidget.setDisplayedValue||this.editWidget.setValue);
this._getEditValue=A.hitch(this.editWidget,this.editWidget.getDisplayedValue||this.editWidget.getValue);
this._setEditFocus=A.hitch(this.editWidget,this.editWidget.focus);
this._isEditValid=A.hitch(this.editWidget,this.editWidget.isValid||function(){return true
});
this.editWidget.onChange=A.hitch(this,"_onChange");
if(!this.autoSave){this._oldSetValue=this.editWidget.setValue;
var C=this;
this.editWidget.setValue=A.hitch(this,function(D){C._oldSetValue.apply(C.editWidget,arguments);
C._onEditWidgetKeyPress(null)
})
}this._showText();
this._started=true
}},postMixInProperties:function(){this._srcTag=this.srcNodeRef.tagName;
this._srcStyle=A.getComputedStyle(this.srcNodeRef);
var B=this.srcNodeRef.style;
this._display="";
if(B&&B.display){this._display=B.display
}else{switch(this.srcNodeRef.tagName.toLowerCase()){case"span":case"input":case"img":case"button":this._display="inline";
break;
default:this._display="block";
break
}}this.inherited("postMixInProperties",arguments);
this.messages=A.i18n.getLocalization("dijit","common",this.lang);
A.forEach(["buttonSave","buttonCancel"],function(C){if(!this[C]){this[C]=this.messages[C]
}},this)
},postCreate:function(){if(this.autoSave){A.style(this.buttonContainer,"display","none")
}},_onKeyPress:function(B){if(this.disabled||B.altKey||B.ctrlKey){return 
}if(B.charCode==A.keys.SPACE||B.keyCode==A.keys.ENTER){A.stopEvent(B);
this._onClick(B)
}},_onMouseOver:function(){if(!this.editing){var B=this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion";
A.addClass(this.textNode,B)
}},_onMouseOut:function(){if(!this.editing){var B=this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion";
A.removeClass(this.textNode,B)
}},_onClick:function(B){if(this.editing||this.disabled){return 
}this._onMouseOut();
this.editing=true;
this._setEditValue(this._isEmpty?"":(this.renderAsHtml?this.textNode.innerHTML:this.textNode.innerHTML.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&")));
this._initialText=this._getEditValue();
this._visualize();
setTimeout(A.hitch(this,function(){this._setEditFocus();
this.saveButton.setDisabled(true)
}),1)
},_visualize:function(){A.style(this.editNode,"display",this.editing?this._display:"none");
if(this.editing){this._setEditFocus()
}A.style(this.textNode,"display",this.editing?"none":this._display)
},_showText:function(){var C=""+this._getEditValue();
dijit.form.InlineEditBox.superclass.setValue.call(this,C);
if(/^\s*$/.test(C)){C="?";
this._isEmpty=true
}else{this._isEmpty=false
}if(this.renderAsHtml){this.textNode.innerHTML=C
}else{this.textNode.innerHTML="";
if(C.split){var D=this;
var B=true;
A.forEach(C.split("\n"),function(E){if(B){B=false
}else{D.textNode.appendChild(document.createElement("BR"))
}D.textNode.appendChild(document.createTextNode(E))
})
}else{this.textNode.appendChild(document.createTextNode(C))
}}this._visualize()
},save:function(B){if(typeof B=="object"){A.stopEvent(B)
}if(!this.enableSave()){return 
}this.editing=false;
this._showText();
if(B){dijit.focus(this.focusNode)
}if(this._lastValue!=this._lastValueReported){this.onChange(this._lastValue)
}},cancel:function(B){if(B){A.stopEvent(B)
}this.editing=false;
this._visualize();
if(B){dijit.focus(this.focusNode)
}},setValue:function(B){this._setEditValue(B);
this.editing=false;
this._showText()
},_onEditWidgetKeyPress:function(B){if(!this.editing){return 
}if(this.autoSave){if(B.keyCode==A.keys.ESCAPE){this.cancel(B)
}else{if(B.keyCode==A.keys.ENTER){this.save(B)
}}}else{var C=this;
setTimeout(function(){C.saveButton.setDisabled(C._getEditValue()==C._initialText)
},100)
}},_onBlur:function(){if(this.autoSave&&this.editing){if(this._getEditValue()==this._initialText){this.cancel()
}else{this.save()
}}},enableSave:function(){return this._isEditValid()
},_onChange:function(){if(!this.editing){this._showText()
}else{if(this.autoSave){this.save(1)
}else{this.saveButton.setDisabled((this._getEditValue()==this._initialText)||!this.enableSave())
}}},setDisabled:function(B){this.saveButton.setDisabled(B);
this.cancelButton.setDisabled(B);
this.textNode.disabled=B;
this.editWidget.setDisabled(B);
this.inherited("setDisabled",arguments)
}})
}}});