if(!dojo._hasResource["dijit.InlineEditBox"]){dojo._hasResource["dijit.InlineEditBox"]=true;
dojo.provide("dijit.InlineEditBox");
dojo.require("dojo.i18n");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");
dojo.requireLocalization("dijit","common",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.InlineEditBox",dijit._Widget,{editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,editor:"dijit.form.TextBox",editorParams:{},onChange:function(A){},width:"100%",value:"",noValueIndicator:"<span style='font-family: wingdings; text-decoration: underline;'>&nbsp;&nbsp;&nbsp;&nbsp;&#x270d;&nbsp;&nbsp;&nbsp;&nbsp;</span>",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.displayNode=this.srcNodeRef;
var B={ondijitclick:"_onClick",onmouseover:"_onMouseOver",onmouseout:"_onMouseOut",onfocus:"_onMouseOver",onblur:"_onMouseOut"};
for(var A in B){this.connect(this.displayNode,A,B[A])
}dijit.setWaiRole(this.displayNode,"button");
if(!this.displayNode.getAttribute("tabIndex")){this.displayNode.setAttribute("tabIndex",0)
}if(!this.value){this.value=this.displayNode.innerHTML
}this._setDisplayValue(this.value)
},_onMouseOver:function(){dojo.addClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onMouseOut:function(){dojo.removeClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onClick:function(A){if(this.disabled){return 
}if(A){dojo.stopEvent(A)
}this._onMouseOut();
setTimeout(dojo.hitch(this,"_edit"),0)
},_edit:function(){this.editing=true;
var A=(this.renderAsHtml?this.value:this.value.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&"));
var D=document.createElement("span");
dojo.place(D,this.domNode,"before");
var C=this.editWidget=new dijit._InlineEditor({value:dojo.trim(A),autoSave:this.autoSave,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,renderAsHtml:this.renderAsHtml,editor:this.editor,editorParams:this.editorParams,style:dojo.getComputedStyle(this.displayNode),save:dojo.hitch(this,"save"),cancel:dojo.hitch(this,"cancel"),width:this.width},D);
var B=C.domNode.style;
this.displayNode.style.display="none";
B.position="static";
B.visibility="visible";
this.domNode=C.domNode;
setTimeout(function(){C.focus()
},100)
},_showText:function(A){this.displayNode.style.display="";
var B=this.editWidget.domNode.style;
B.position="absolute";
B.visibility="hidden";
this.domNode=this.displayNode;
var C=this;
setTimeout(function(){if(A){dijit.focus(C.displayNode)
}C.editWidget.destroy();
delete C.editWidget
},100)
},save:function(A){this.editing=false;
this.value=this.editWidget.getValue()+"";
if(this.renderAsHtml){this.value=this.value.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace("\n","<br>")
}this._setDisplayValue(this.value);
this.onChange(this.value);
this._showText(A)
},_setDisplayValue:function(A){this.displayNode.innerHTML=A||this.noValueIndicator
},cancel:function(A){this.editing=false;
this._showText(A)
}});
dojo.declare("dijit._InlineEditor",[dijit._Widget,dijit._Templated],{templateString:'<fieldset dojoAttachPoint="editNode" waiRole="presentation" style="position: absolute; visibility:hidden" class="dijitReset dijitInline"\r\n\tdojoAttachEvent="onkeypress: _onKeyPress" \r\n\t><input dojoAttachPoint="editorPlaceholder"\r\n\t/><span dojoAttachPoint="buttonContainer"\r\n\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t></span\r\n></fieldset>\r\n',widgetsInTemplate:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.messages=dojo.i18n.getLocalization("dijit","common",this.lang);
dojo.forEach(["buttonSave","buttonCancel"],function(A){if(!this[A]){this[A]=this.messages[A]
}},this)
},postCreate:function(){var A=dojo.getObject(this.editor);
var C=this.editWidget=new A(this.editorParams,this.editorPlaceholder);
var B=this.style;
dojo.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(D){C.focusNode.style[D]=B[D]
},this);
dojo.forEach(["marginTop","marginBottom","marginLeft","marginRight"],function(D){this.domNode.style[D]=B[D]
},this);
if(this.width=="100%"){C.domNode.style.width="100%";
this.domNode.style.display="block"
}else{C.domNode.style.width=this.width+(Number(this.width)==this.width?"px":"")
}this.connect(this.editWidget,"onChange","_onChange");
this._ignoreNextOnChange=true;
(this.editWidget.setDisplayedValue||this.editWidget.setValue).call(this.editWidget,this.value);
this._initialText=this.getValue();
if(this.autoSave){this.buttonContainer.style.display="none"
}},destroy:function(){this.editWidget.destroy();
this.inherited(arguments)
},getValue:function(){var A=this.editWidget;
return A.getDisplayedValue?A.getDisplayedValue():A.getValue()
},_onKeyPress:function(A){if(this._exitInProgress){return 
}if(this.autoSave){if(A.keyCode==dojo.keys.ESCAPE){dojo.stopEvent(A);
this._exitInProgress=true;
this.cancel(true)
}else{if(A.keyCode==dojo.keys.ENTER){dojo.stopEvent(A);
this._exitInProgress=true;
this.save(true)
}}}else{var B=this;
setTimeout(function(){B.saveButton.setDisabled(B.getValue()==B._initialText)
},100)
}},_onBlur:function(){if(this._exitInProgress){return 
}if(this.autoSave){this._exitInProgress=true;
if(this.getValue()==this._initialText){this.cancel(false)
}else{this.save(false)
}}},enableSave:function(){return this.editWidget.isValid?this.editWidget.isValid():true
},_onChange:function(){if(this._ignoreNextOnChange){delete this._ignoreNextOnChange;
return 
}if(this._exitInProgress){return 
}if(this.autoSave){this._exitInProgress=true;
this.save(true)
}else{this.saveButton.setDisabled((this.getValue()==this._initialText)||!this.enableSave())
}},enableSave:function(){return this.editWidget.isValid?this.editWidget.isValid():true
},focus:function(){this.editWidget.focus();
dijit.selectInputText(this.editWidget.focusNode)
}});
dijit.selectInputText=function(C){var E=dojo.global;
var A=dojo.doc;
C=dojo.byId(C);
if(A.selection&&dojo.body()["createTextRange"]){if(C.createTextRange){var B=C.createTextRange();
B.moveStart("character",0);
B.moveEnd("character",C.value.length);
B.select()
}}else{if(E.getSelection){var D=E.getSelection();
if(C.setSelectionRange){C.setSelectionRange(0,C.value.length)
}}}C.focus()
}
};