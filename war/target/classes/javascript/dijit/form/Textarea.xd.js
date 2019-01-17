dojo._xdResourceLoaded({depends:[["provide","dijit.form.Textarea"],["require","dijit.form._FormWidget"],["require","dojo.i18n"],["requireLocalization","dijit","Textarea",null,"ROOT","ROOT"]],defineResource:function(A){if(!A._hasResource["dijit.form.Textarea"]){A._hasResource["dijit.form.Textarea"]=true;
A.provide("dijit.form.Textarea");
A.require("dijit.form._FormWidget");
A.require("dojo.i18n");
A.declare("dijit.form.Textarea",dijit.form._FormWidget,{attributeMap:A.mixin(A.clone(dijit.form._FormWidget.prototype.attributeMap),{style:"styleNode","class":"styleNode"}),templateString:(A.isIE||A.isSafari||A.isMozilla)?((A.isIE||A.isSafari)?'<fieldset id="${id}" class="dijitInline dijitInputField dijitTextArea" dojoAttachPoint="styleNode" waiRole="presentation"><div dojoAttachPoint="editNode,focusNode,eventNode" dojoAttachEvent="onpaste:_changing,oncut:_changing" waiRole="textarea" style="text-decoration:none;_padding-bottom:16px;display:block;overflow:auto;" contentEditable="true"></div>':'<span id="${id}" class="dijitReset"><iframe src="javascript:<html><head><title>${_iframeEditTitle}</title></head><body><script>var _postCreate=window.frameElement?window.frameElement.postCreate:null;if(_postCreate)_postCreate();<\/script></body></html>" dojoAttachPoint="iframe,styleNode" dojoAttachEvent="onblur:_onIframeBlur" class="dijitInline dijitInputField dijitTextArea"></iframe>')+'<textarea name="${name}" value="${value}" dojoAttachPoint="formValueNode" style="display:none;"></textarea>'+((A.isIE||A.isSafari)?"</fieldset>":"</span>"):'<textarea id="${id}" name="${name}" value="${value}" dojoAttachPoint="formValueNode,editNode,focusNode,styleNode" class="dijitInputField dijitTextArea"></textarea>',focus:function(){if(!this.disabled){this._changing()
}if(A.isMozilla){dijit.focus(this.iframe)
}else{dijit.focus(this.focusNode)
}},setValue:function(G,F){var D=this.editNode;
if(typeof G=="string"){D.innerHTML="";
if(G.split){var H=this;
var B=true;
A.forEach(G.split("\n"),function(I){if(B){B=false
}else{D.appendChild(document.createElement("BR"))
}D.appendChild(document.createTextNode(I))
})
}else{D.appendChild(document.createTextNode(G))
}}else{G=D.innerHTML;
if(this.iframe){G=G.replace(/<div><\/div>\r?\n?$/i,"")
}G=G.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=G;
if(this.iframe){var E=document.createElement("div");
D.appendChild(E);
var C=E.offsetTop;
if(D.scrollWidth>D.clientWidth){C+=16
}if(this.lastHeight!=C){if(C==0){C=16
}A.contentBox(this.iframe,{h:C});
this.lastHeight=C
}D.removeChild(E)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),F)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(A.isMozilla){var C=A.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=C.iframeEditTitle;
this._iframeFocusTitle=C.iframeFocusTitle;
var D=A.query('label[for="'+this.id+'"]');
if(D.length){this._iframeEditTitle=D[0].innerHTML+" "+this._iframeEditTitle
}var B=this.focusNode=this.editNode=document.createElement("BODY");
B.style.margin="0px";
B.style.padding="0px";
B.style.border="0px"
}},postCreate:function(){if(A.isIE||A.isSafari){this.domNode.style.overflowY="hidden"
}else{if(A.isMozilla){var B=this.iframe.contentWindow;
try{var E=this.iframe.contentDocument.title
}catch(C){var E=""
}if(!B||!E){this.iframe.postCreate=A.hitch(this,this.postCreate);
return 
}var D=B.document;
D.getElementsByTagName("HTML")[0].replaceChild(this.editNode,D.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){D.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=D;
B.addEventListener("resize",A.hitch(this,this._changed),false)
}else{this.focusNode=this.domNode
}}if(this.eventNode){this.connect(this.eventNode,"keypress",this._onKeyPress);
this.connect(this.eventNode,"mousemove",this._changed);
this.connect(this.eventNode,"focus",this._focused);
this.connect(this.eventNode,"blur",this._blurred)
}if(this.editNode){this.connect(this.editNode,"change",this._changed)
}this.inherited("postCreate",arguments)
},_focused:function(B){A.addClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(B)
},_blurred:function(B){A.removeClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(B,true)
},_onIframeBlur:function(){this.iframe.contentDocument.title=this._iframeEditTitle
},_onKeyPress:function(B){if(B.keyCode==A.keys.TAB&&!B.shiftKey&&!B.ctrlKey&&!B.altKey&&this.iframe){this.iframe.contentDocument.title=this._iframeFocusTitle;
this.iframe.focus();
A.stopEvent(B)
}else{if(B.keyCode==A.keys.ENTER){B.stopPropagation()
}else{if(this.inherited("_onKeyPress",arguments)&&this.iframe){var C=document.createEvent("KeyEvents");
C.initKeyEvent("keypress",true,true,null,B.ctrlKey,B.altKey,B.shiftKey,B.metaKey,B.keyCode,B.charCode);
this.iframe.dispatchEvent(C)
}}}this._changing()
},_changing:function(B){setTimeout(A.hitch(this,"_changed",B,false),1)
},_changed:function(C,B){if(this.iframe&&this.iframe.contentDocument.designMode!="on"){this.iframe.contentDocument.designMode="on"
}this.setValue(null,B)
}})
}}});