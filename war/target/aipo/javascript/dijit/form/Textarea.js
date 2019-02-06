if(!dojo._hasResource["dijit.form.Textarea"]){dojo._hasResource["dijit.form.Textarea"]=true;
dojo.provide("dijit.form.Textarea");
dojo.require("dijit.form._FormWidget");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit","Textarea",null,"ROOT");
dojo.declare("dijit.form.Textarea",dijit.form._FormWidget,{attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{style:"styleNode","class":"styleNode"}),templateString:(dojo.isIE||dojo.isSafari||dojo.isMozilla)?((dojo.isIE||dojo.isSafari)?'<fieldset id="${id}" class="dijitInline dijitInputField dijitTextArea" dojoAttachPoint="styleNode" waiRole="presentation"><div dojoAttachPoint="editNode,focusNode,eventNode" dojoAttachEvent="onpaste:_changing,oncut:_changing" waiRole="textarea" style="text-decoration:none;_padding-bottom:16px;display:block;overflow:auto;" contentEditable="true"></div>':'<span id="${id}" class="dijitReset"><iframe src="javascript:<html><head><title>${_iframeEditTitle}</title></head><body><script>var _postCreate=window.frameElement?window.frameElement.postCreate:null;if(_postCreate)_postCreate();<\/script></body></html>" dojoAttachPoint="iframe,styleNode" dojoAttachEvent="onblur:_onIframeBlur" class="dijitInline dijitInputField dijitTextArea"></iframe>')+'<textarea name="${name}" value="${value}" dojoAttachPoint="formValueNode" style="display:none;"></textarea>'+((dojo.isIE||dojo.isSafari)?"</fieldset>":"</span>"):'<textarea id="${id}" name="${name}" value="${value}" dojoAttachPoint="formValueNode,editNode,focusNode,styleNode" class="dijitInputField dijitTextArea"></textarea>',focus:function(){if(!this.disabled){this._changing()
}if(dojo.isMozilla){dijit.focus(this.iframe)
}else{dijit.focus(this.focusNode)
}},setValue:function(F,E){var C=this.editNode;
if(typeof F=="string"){C.innerHTML="";
if(F.split){var G=this;
var A=true;
dojo.forEach(F.split("\n"),function(H){if(A){A=false
}else{C.appendChild(document.createElement("BR"))
}C.appendChild(document.createTextNode(H))
})
}else{C.appendChild(document.createTextNode(F))
}}else{F=C.innerHTML;
if(this.iframe){F=F.replace(/<div><\/div>\r?\n?$/i,"")
}F=F.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=F;
if(this.iframe){var D=document.createElement("div");
C.appendChild(D);
var B=D.offsetTop;
if(C.scrollWidth>C.clientWidth){B+=16
}if(this.lastHeight!=B){if(B==0){B=16
}dojo.contentBox(this.iframe,{h:B});
this.lastHeight=B
}C.removeChild(D)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),E)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(dojo.isMozilla){var B=dojo.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=B.iframeEditTitle;
this._iframeFocusTitle=B.iframeFocusTitle;
var C=dojo.query('label[for="'+this.id+'"]');
if(C.length){this._iframeEditTitle=C[0].innerHTML+" "+this._iframeEditTitle
}var A=this.focusNode=this.editNode=document.createElement("BODY");
A.style.margin="0px";
A.style.padding="0px";
A.style.border="0px"
}},postCreate:function(){if(dojo.isIE||dojo.isSafari){this.domNode.style.overflowY="hidden"
}else{if(dojo.isMozilla){var A=this.iframe.contentWindow;
try{var D=this.iframe.contentDocument.title
}catch(B){var D=""
}if(!A||!D){this.iframe.postCreate=dojo.hitch(this,this.postCreate);
return 
}var C=A.document;
C.getElementsByTagName("HTML")[0].replaceChild(this.editNode,C.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){C.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=C;
A.addEventListener("resize",dojo.hitch(this,this._changed),false)
}else{this.focusNode=this.domNode
}}if(this.eventNode){this.connect(this.eventNode,"keypress",this._onKeyPress);
this.connect(this.eventNode,"mousemove",this._changed);
this.connect(this.eventNode,"focus",this._focused);
this.connect(this.eventNode,"blur",this._blurred)
}if(this.editNode){this.connect(this.editNode,"change",this._changed)
}this.inherited("postCreate",arguments)
},_focused:function(A){dojo.addClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(A)
},_blurred:function(A){dojo.removeClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(A,true)
},_onIframeBlur:function(){this.iframe.contentDocument.title=this._iframeEditTitle
},_onKeyPress:function(A){if(A.keyCode==dojo.keys.TAB&&!A.shiftKey&&!A.ctrlKey&&!A.altKey&&this.iframe){this.iframe.contentDocument.title=this._iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(A)
}else{if(A.keyCode==dojo.keys.ENTER){A.stopPropagation()
}else{if(this.inherited("_onKeyPress",arguments)&&this.iframe){var B=document.createEvent("KeyEvents");
B.initKeyEvent("keypress",true,true,null,A.ctrlKey,A.altKey,A.shiftKey,A.metaKey,A.keyCode,A.charCode);
this.iframe.dispatchEvent(B)
}}}this._changing()
},_changing:function(A){setTimeout(dojo.hitch(this,"_changed",A,false),1)
},_changed:function(B,A){if(this.iframe&&this.iframe.contentDocument.designMode!="on"){this.iframe.contentDocument.designMode="on"
}this.setValue(null,A)
}})
};