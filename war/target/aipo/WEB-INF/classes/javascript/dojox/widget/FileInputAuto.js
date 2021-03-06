if(!dojo._hasResource["dojox.widget.FileInputAuto"]){dojo._hasResource["dojox.widget.FileInputAuto"]=true;
dojo.provide("dojox.widget.FileInputAuto");
dojo.require("dojox.widget.FileInput");
dojo.require("dojo.io.iframe");
dojo.declare("dojox.widget.FileInputAuto",dojox.widget.FileInput,{url:"",blurDelay:2000,duration:500,uploadMessage:"Uploading ...",_sent:false,templateString:'<div class="dijitFileInput">\r\n\t<input class="dijitFileInputReal" type="file" dojoAttachPoint="fileInput" />\r\n\t<div class="dijitFakeInput" dojoAttachPoint="fakeNodeHolder">\r\n\t\t<input class="dijitFileInputVisible" type="text" dojoAttachPoint="focusNode, inputNode" />\r\n\t\t<span class="dijitInline dijitFileInputText" dojoAttachPoint="titleNode">${label}</span>\r\n\t\t<span class="dijitInline dijitFileInputButton" dojoAttachPoint="cancelNode" dojoAttachEvent="onclick:_onClick">${cancelText}</span>\r\n\t</div>\r\n\t<div class="dijitProgressOverlay" dojoAttachPoint="overlay">&nbsp;</div>\r\n</div>\r\n',startup:function(){this._blurListener=dojo.connect(this.fileInput,"onblur",this,"_onBlur");
this._focusListener=dojo.connect(this.fileInput,"onfocus",this,"_onFocus");
this.inherited("startup",arguments)
},_onFocus:function(){if(this._blurTimer){clearTimeout(this._blurTimer)
}},_onBlur:function(){if(this._blurTimer){clearTimeout(this._blurTimer)
}if(!this._sent){this._blurTimer=setTimeout(dojo.hitch(this,"_sendFile"),this.blurDelay)
}},setMessage:function(A){if(!dojo.isIE){this.overlay.innerHTML=A
}},_sendFile:function(B){if(!this.fileInput.value||this._sent){return 
}dojo.style(this.fakeNodeHolder,"display","none");
dojo.style(this.overlay,"opacity","0");
dojo.style(this.overlay,"display","block");
this.setMessage(this.uploadMessage);
dojo.fadeIn({node:this.overlay,duration:this.duration}).play();
var C=document.createElement("form");
C.setAttribute("enctype","multipart/form-data");
var A=dojo.clone(this.fileInput);
C.appendChild(this.fileInput);
dojo.body().appendChild(C);
dojo.io.iframe.send({url:this.url+"?name="+this.name,form:C,handleAs:"text",handle:dojo.hitch(this,"_handleSend")})
},_handleSend:function(A,B){if(!dojo.isIE){this.overlay.innerHTML=""
}this._sent=true;
dojo.style(this.overlay,"opacity","0");
dojo.style(this.overlay,"border","none");
dojo.style(this.overlay,"background","none");
this.overlay.style.backgroundImage="none";
this.fileInput.style.display="none";
this.fakeNodeHolder.style.display="none";
dojo.fadeIn({node:this.overlay,duration:this.duration}).play(250);
dojo.disconnect(this._blurListener);
dojo.disconnect(this._focusListener);
this.onComplete(A,B,this)
},_onClick:function(A){if(this._blurTimer){clearTimeout(this._blurTimer)
}dojo.disconnect(this._blurListener);
dojo.disconnect(this._focusListener);
this.inherited("_onClick",arguments);
this._blurListener=dojo.connect(this.fileInput,"onblur",this,"_onBlur");
this._focusListener=dojo.connect(this.fileInput,"onfocus",this,"_onFocus")
},onComplete:function(B,A,C){}});
dojo.declare("dojox.widget.FileInputBlind",dojox.widget.FileInputAuto,{startup:function(){this.inherited("startup",arguments);
this._off=dojo.style(this.inputNode,"width");
this.inputNode.style.display="none";
this._fixPosition()
},_fixPosition:function(){if(dojo.isIE){dojo.style(this.fileInput,"width","1px")
}else{dojo.style(this.fileInput,"left","-"+(this._off)+"px")
}},_onClick:function(A){this.inherited("_onClick",arguments);
this._fixPosition()
}})
};