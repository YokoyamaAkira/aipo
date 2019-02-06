dojo._xdResourceLoaded({depends:[["provide","dijit.InlineEditBox"],["require","dojo.i18n"],["require","dijit._Widget"],["require","dijit._Container"],["require","dijit.form.Button"],["require","dijit.form.TextBox"],["requireLocalization","dijit","common",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"]],defineResource:function(A){if(!A._hasResource["dijit.InlineEditBox"]){A._hasResource["dijit.InlineEditBox"]=true;
A.provide("dijit.InlineEditBox");
A.require("dojo.i18n");
A.require("dijit._Widget");
A.require("dijit._Container");
A.require("dijit.form.Button");
A.require("dijit.form.TextBox");
A.declare("dijit.InlineEditBox",dijit._Widget,{editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,editor:"dijit.form.TextBox",editorParams:{},onChange:function(B){},width:"100%",value:"",noValueIndicator:"<span style='font-family: wingdings; text-decoration: underline;'>&nbsp;&nbsp;&nbsp;&nbsp;&#x270d;&nbsp;&nbsp;&nbsp;&nbsp;</span>",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.displayNode=this.srcNodeRef;
var B={ondijitclick:"_onClick",onmouseover:"_onMouseOver",onmouseout:"_onMouseOut",onfocus:"_onMouseOver",onblur:"_onMouseOut"};
for(var C in B){this.connect(this.displayNode,C,B[C])
}dijit.setWaiRole(this.displayNode,"button");
if(!this.displayNode.getAttribute("tabIndex")){this.displayNode.setAttribute("tabIndex",0)
}if(!this.value){this.value=this.displayNode.innerHTML
}this._setDisplayValue(this.value)
},_onMouseOver:function(){A.addClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onMouseOut:function(){A.removeClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onClick:function(B){if(this.disabled){return 
}if(B){A.stopEvent(B)
}this._onMouseOut();
setTimeout(A.hitch(this,"_edit"),0)
},_edit:function(){this.editing=true;
var C=(this.renderAsHtml?this.value:this.value.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&"));
var B=document.createElement("span");
A.place(B,this.domNode,"before");
var E=this.editWidget=new dijit._InlineEditor({value:A.trim(C),autoSave:this.autoSave,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,renderAsHtml:this.renderAsHtml,editor:this.editor,editorParams:this.editorParams,style:A.getComputedStyle(this.displayNode),save:A.hitch(this,"save"),cancel:A.hitch(this,"cancel"),width:this.width},B);
var D=E.domNode.style;
this.displayNode.style.display="none";
D.position="static";
D.visibility="visible";
this.domNode=E.domNode;
setTimeout(function(){E.focus()
},100)
},_showText:function(C){this.displayNode.style.display="";
var D=this.editWidget.domNode.style;
D.position="absolute";
D.visibility="hidden";
this.domNode=this.displayNode;
var B=this;
setTimeout(function(){if(C){dijit.focus(B.displayNode)
}B.editWidget.destroy();
delete B.editWidget
},100)
},save:function(B){this.editing=false;
this.value=this.editWidget.getValue()+"";
if(this.renderAsHtml){this.value=this.value.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace("\n","<br>")
}this._setDisplayValue(this.value);
this.onChange(this.value);
this._showText(B)
},_setDisplayValue:function(B){this.displayNode.innerHTML=B||this.noValueIndicator
},cancel:function(B){this.editing=false;
this._showText(B)
}});
A.declare("dijit._InlineEditor",[dijit._Widget,dijit._Templated],{templateString:'<fieldset dojoAttachPoint="editNode" waiRole="presentation" style="position: absolute; visibility:hidden" class="dijitReset dijitInline"\r\n\tdojoAttachEvent="onkeypress: _onKeyPress" \r\n\t><input dojoAttachPoint="editorPlaceholder"\r\n\t/><span dojoAttachPoint="buttonContainer"\r\n\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t></span\r\n></fieldset>\r\n',widgetsInTemplate:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.messages=A.i18n.getLocalization("dijit","common",this.lang);
A.forEach(["buttonSave","buttonCancel"],function(B){if(!this[B]){this[B]=this.messages[B]
}},this)
},postCreate:function(){var C=A.getObject(this.editor);
var B=this.editWidget=new C(this.editorParams,this.editorPlaceholder);
var D=this.style;
A.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(E){B.focusNode.style[E]=D[E]
},this);
A.forEach(["marginTop","marginBottom","marginLeft","marginRight"],function(E){this.domNode.style[E]=D[E]
},this);
if(this.width=="100%"){B.domNode.style.width="100%";
this.domNode.style.display="block"
}else{B.domNode.style.width=this.width+(Number(this.width)==this.width?"px":"")
}this.connect(this.editWidget,"onChange","_onChange");
this._ignoreNextOnChange=true;
(this.editWidget.setDisplayedValue||this.editWidget.setValue).call(this.editWidget,this.value);
this._initialText=this.getValue();
if(this.autoSave){this.buttonContainer.style.display="none"
}},destroy:function(){this.editWidget.destroy();
this.inherited(arguments)
},getValue:function(){var B=this.editWidget;
return B.getDisplayedValue?B.getDisplayedValue():B.getValue()
},_onKeyPress:function(C){if(this._exitInProgress){return 
}if(this.autoSave){if(C.keyCode==A.keys.ESCAPE){A.stopEvent(C);
this._exitInProgress=true;
this.cancel(true)
}else{if(C.keyCode==A.keys.ENTER){A.stopEvent(C);
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
dijit.selectInputText=function(E){var B=A.global;
var C=A.doc;
E=A.byId(E);
if(C.selection&&A.body()["createTextRange"]){if(E.createTextRange){var D=E.createTextRange();
D.moveStart("character",0);
D.moveEnd("character",E.value.length);
D.select()
}}else{if(B.getSelection){var F=B.getSelection();
if(E.setSelectionRange){E.setSelectionRange(0,E.value.length)
}}}E.focus()
}
}}});