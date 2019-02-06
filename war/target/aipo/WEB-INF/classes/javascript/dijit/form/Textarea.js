if(!dojo._hasResource["dijit.form.Textarea"]){dojo._hasResource["dijit.form.Textarea"]=true;
dojo.provide("dijit.form.Textarea");
dojo.require("dijit.form._FormWidget");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit","Textarea",null,"ROOT");
dojo.declare("dijit.form.Textarea",dijit.form._FormWidget,{attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{style:"styleNode","class":"styleNode"}),templateString:(dojo.isIE||dojo.isSafari||dojo.isMozilla)?((dojo.isIE||dojo.isSafari)?'<fieldset id="${id}" class="dijitInline dijitInputField dijitTextArea" dojoAttachPoint="styleNode" waiRole="presentation"><div dojoAttachPoint="editNode,focusNode,eventNode" dojoAttachEvent="onpaste:_changing,oncut:_changing" waiRole="textarea" style="text-decoration:none;_padding-bottom:16px;display:block;overflow:auto;" contentEditable="true"></div>':'<span id="${id}" class="dijitReset"><iframe src="javascript:<html><head><title>${_iframeEditTitle}</title></head><body><script>var _postCreate=window.frameElement?window.frameElement.postCreate:null;if(_postCreate)_postCreate();<\/script></body></html>" dojoAttachPoint="iframe,styleNode" dojoAttachEvent="onblur:_onIframeBlur" class="dijitInline dijitInputField dijitTextArea"></iframe>')+'<textarea name="${name}" value="${value}" dojoAttachPoint="formValueNode" style="display:none;"></textarea>'+((dojo.isIE||dojo.isSafari)?"</fieldset>":"</span>"):'<textarea id="${id}" name="${name}" value="${value}" dojoAttachPoint="formValueNode,editNode,focusNode,styleNode" class="dijitInputField dijitTextArea"></textarea>',focus:function(){if(!this.disabled){this._changing()
}if(dojo.isMozilla){dijit.focus(this.iframe)
}else{dijit.focus(this.focusNode)
}},setValue:function(C,B){var G=this.editNode;
if(typeof C=="string"){G.innerHTML="";
if(C.split){var D=this;
var E=true;
dojo.forEach(C.split("\n"),function(H){if(E){E=false
}else{G.appendChild(document.createElement("BR"))
}G.appendChild(document.createTextNode(H))
})
}else{G.appendChild(document.createTextNode(C))
}}else{C=G.innerHTML;
if(this.iframe){C=C.replace(/<div><\/div>\r?\n?$/i,"")
}C=C.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=C;
if(this.iframe){var A=document.createElement("div");
G.appendChild(A);
var F=A.offsetTop;
if(G.scrollWidth>G.clientWidth){F+=16
}if(this.lastHeight!=F){if(F==0){F=16
}dojo.contentBox(this.iframe,{h:F});
this.lastHeight=F
}G.removeChild(A)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),B)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(dojo.isMozilla){var A=dojo.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=A.iframeEditTitle;
this._iframeFocusTitle=A.iframeFocusTitle;
var B=dojo.query('label[for="'+this.id+'"]');
if(B.length){this._iframeEditTitle=B[0].innerHTML+" "+this._iframeEditTitle
}var C=this.focusNode=this.editNode=document.createElement("BODY");
C.style.margin="0px";
C.style.padding="0px";
C.style.border="0px"
}},postCreate:function(){if(dojo.isIE||dojo.isSafari){this.domNode.style.overflowY="hidden"
}else{if(dojo.isMozilla){var D=this.iframe.contentWindow;
try{var C=this.iframe.contentDocument.title
}catch(A){var C=""
}if(!D||!C){this.iframe.postCreate=dojo.hitch(this,this.postCreate);
return 
}var B=D.document;
B.getElementsByTagName("HTML")[0].replaceChild(this.editNode,B.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){B.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=B;
D.addEventListener("resize",dojo.hitch(this,this._changed),false)
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
},_onKeyPress:function(B){if(B.keyCode==dojo.keys.TAB&&!B.shiftKey&&!B.ctrlKey&&!B.altKey&&this.iframe){this.iframe.contentDocument.title=this._iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(B)
}else{if(B.keyCode==dojo.keys.ENTER){B.stopPropagation()
}else{if(this.inherited("_onKeyPress",arguments)&&this.iframe){var A=document.createEvent("KeyEvents");
A.initKeyEvent("keypress",true,true,null,B.ctrlKey,B.altKey,B.shiftKey,B.metaKey,B.keyCode,B.charCode);
this.iframe.dispatchEvent(A)
}}}this._changing()
},_changing:function(A){setTimeout(dojo.hitch(this,"_changed",A,false),1)
},_changed:function(A,B){if(this.iframe&&this.iframe.contentDocument.designMode!="on"){this.iframe.contentDocument.designMode="on"
}this.setValue(null,B)
}})
};