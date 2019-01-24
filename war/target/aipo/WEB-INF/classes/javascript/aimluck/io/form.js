aimluck.namespace("aimluck.io");
dojo.provide("aimluck.io");
aimluck.io.submit=function(C,A,B,G){aimluck.io.disableForm(C,true);
var F=dojo.byId(A+B);
if(F){dojo.style(F,"display","")
}try{dojo.xhrPost({url:C.action,timeout:30000,form:C,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(H,E){var I="";
if(dojo.isArray(H)&&H.length>0){if(H[0]=="PermissionError"){I+="<ul>";
I+="<li><span class='caution'>"+H[1]+"</span></li>";
I+="</ul>"
}else{I+="<ul>";
dojo.forEach(H,function(J){I+="<li><span class='caution'>"+J+"</span></li>"
});
I+="</ul>"
}}G.call(G,I);
F=dojo.byId(A+B);
if(F){dojo.style(F,"display","none")
}if(I!=""){aimluck.io.disableForm(C,false)
}},error:function(E){}})
}catch(D){}return false
};
aimluck.io.sendData=function(A,C,D){var B=new Array();
B.callback=D;
aimluck.io.sendRawData(A,C,sendErrorData,B);
return false
};
aimluck.io.sendErrorData=function(C,A){var B="";
if(dojo.isArray(A.data)&&A.data.length>0){B+="<ul>";
dojo.forEach(A.data,function(D){B+="<li>"+D+"</li>"
});
B+="</ul>"
}C.callback.call(C.callback,B);
return false
};
aimluck.io.sendRawData=function(B,F,G,D){var A=new Array;
try{dojo.xhrGet({url:B,method:"POST",encoding:"utf-8",content:F,mimetype:"text/json",sync:true,load:function(H,J,I,E){A.type=H;
A.data=J;
A.event=I;
A.args=E;
A.bool=true;
G.call(G,D,A);
return A
}})
}catch(C){alert("error")
}};
aimluck.io.escapeText=function(A){var B;
if(typeof (dojo.byId(A).innerText)!="undefined"){B=dojo.byId(A).innerText
}else{if(typeof (dojo.byId(A).value)!="undefined"){B=dojo.byId(A).value
}else{if(typeof (dojo.byId(A).textContent)!="undefined"){B=dojo.byId(A).textContent
}}}return B
};
aimluck.io.disableForm=function(C,A){var D=C.elements;
for(var B=0;
B<D.length;
B++){if(D[B].type=="submit"||D[B].type=="button"){D[B].disabled=A
}}};
aimluck.io.actionSubmit=function(A){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
};
aimluck.io.ajaxActionSubmit=function(B,A,C,D,E){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
};
aimluck.io.actionSubmitReturn=function(A,B){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1&action="+B;
A.form.submit()
};
aimluck.io.deleteSubmit=function(A){if(confirm("\u3053\u306e"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}};
aimluck.io.ajaxDeleteSubmit=function(B,A,C,D,E){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.ajaxEnableSubmit=function(B,A,C,D,E){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.ajaxDisableSubmit=function(B,A,C,D,E){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.deleteSubmitReturn=function(A,B){if(confirm("\u3053\u306e"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1&action="+B;
A.form.submit()
}};
aimluck.io.multiDeleteSubmit=function(A){if(confirm("\u9078\u629e\u3057\u305f"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}};
aimluck.io.ajaxMultiDeleteSubmit=function(B,A,C,D,E){if(confirm("\u9078\u629e\u3057\u305f"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.ajaxMultiEnableSubmit=function(B,A,C,D,E){if(confirm("\u9078\u629e\u3057\u305f"+B.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.ajaxMultiDisableSubmit=function(B,A,C,D,E){if(confirm("\u9078\u629e\u3057\u305f"+B.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.setHiddenValue=function(A){if(A.name){var B=document.createElement("input");
B.type="hidden";
B.name=A.name;
B.value=A.value;
A.form.appendChild(B)
}};
aimluck.io.openDialog=function(B,A,C,D){aimluck.io.disableForm(B.form,true);
aipo.common.showDialog(A,C,D)
};
aimluck.io.checkboxActionSubmit=function(A){aimluck.io.verifyCheckbox(A.form,aimluck.io.actionSubmit,A)
};
aimluck.io.ajaxCheckboxActionSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aimluck.io.ajaxActionSubmit,B,A,C,D,E)
};
aimluck.io.checkboxDeleteSubmit=function(A){aimluck.io.verifyCheckbox(A.form,aimluck.io.multiDeleteSubmit,A)
};
aimluck.io.ajaxCheckboxDeleteSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aimluck.io.ajaxMultiDeleteSubmit,B,A,C,D,E)
};
aimluck.io.ajaxCheckboxEnableSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aimluck.io.ajaxMultiEnableSubmit,B,A,C,D,E)
};
aimluck.io.ajaxCheckboxDisableSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aimluck.io.ajaxMultiDisableSubmit,B,A,C,D,E)
};
aimluck.io.verifyCheckbox=function(D,E,C){var B=0;
var A;
for(A=0;
A<D.elements.length;
A++){if(D.elements[A].checked){B++
}}if(B==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return E(C)
}};
aimluck.io.ajaxVerifyCheckbox=function(B,E,I,A,H,G,D){var C=0;
var F;
for(F=0;
F<B.elements.length;
F++){if(B.elements[F].checked){C++
}}if(C==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return E(I,A,H,G,D)
}};
aimluck.io.createOptions=function(B,F){var C,E,I,H,A,D,K,J;
if(F.url){A=F.url
}if(F.key){I=F.key
}if(F.value){H=F.value
}if(typeof F.selectedId=="undefined"){}else{C=F.selectedId
}if(typeof F.preOptions=="undefined"){}else{E=F.preOptions
}if(typeof F.indicator=="undefined"){}else{D=F.indicator;
var G=dojo.byId(D);
if(G){dojo.style(G,"display","none")
}}if(typeof F.callback=="undefined"){}else{K=F.callback;
if(typeof F.callbackTarget=="undefined"){}else{J=F.callbackTarget
}}dojo.xhrGet({url:A,timeout:10000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(N,M){var L=dojo.byId(B);
L.options.length=0;
if(typeof E=="undefined"){}else{aimluck.io.addOption(L,E.key,E.value,false)
}dojo.forEach(N,function(O){if(typeof O[I]=="undefined"||typeof O[H]=="undefined"){}else{if(O[I]==C){aimluck.io.addOption(L,O[I],O[H],true)
}else{aimluck.io.addOption(L,O[I],O[H],false)
}}});
if(G){dojo.style(G,"display","none")
}if(K){K.call(J?J:K,N)
}}})
};
aimluck.io.addFileToList=function(C,D,B){if(C.parentNode.style.display=="none"){C.parentNode.style.display=""
}if(document.all){var A=document.createElement("li");
A.setAttribute("data-fileid",D);
A.setAttribute("data-filename",B);
A.innerHTML="<span>"+B+'</span><span class="deletebutton" onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
return C.appendChild(A)
}else{var A=document.createElement("li");
A.setAttribute("data-fileid",D);
A.setAttribute("data-filename",B);
A.innerHTML="<span>"+B+'</span><span class="deletebutton"  onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
return C.appendChild(A)
}};
aimluck.io.replaceFileToList=function(C,D,B){if(document.all){var A=document.createElement("li");
A.setAttribute("data-fileid",D);
A.setAttribute("data-filename",B);
A.innerHTML="<span>"+B+'</span><span class="deletebutton" onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
C.innerHTML="";
return C.appendChild(A)
}else{var A=document.createElement("li");
A.setAttribute("data-fileid",D);
A.setAttribute("data-filename",B);
A.innerHTML="<span>"+B+'</span><span class="deletebutton"  onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
C.innerHTML="";
return C.appendChild(A)
}};
aimluck.io.removeFileFromList=function(B,A){return B.removeChild(A)
};
aimluck.io.createSelectFromFileList=function(G,B){var E=dojo.byId("attachments_"+B);
var A=document.createElement("select");
A.style.display="none";
A.id="attachments_select";
A.multiple="multiple";
A.name="attachments";
var C=E.children;
for(var D=0;
D<C.length;
D++){var F=document.createElement("option");
F.value=C[D].getAttribute("data-fileid");
F.text=C[D].getAttribute("data-filename");
F.selected=true;
A.appendChild(F)
}G.appendChild(A)
};
aimluck.io.addOption=function(A,C,D,E){if(document.all){var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.options.remove(0)
}A.add(B,A.options.length)
}else{var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.removeChild(A.options[0])
}A.insertBefore(B,A.options[A.options.length])
}};
aimluck.io.removeOptions=function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}if(B.length==0){add_option(A,"","\u3000",false)
}};
aimluck.io.removeAllOptions=function(A){if(A.options.length==0){return 
}aimluck.io.selectAllOptions(A);
if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}if(B.length==0){add_option(A,"","\u3000",false)
}};
aimluck.io.selectAllOptions=function(A){var B=A.options;
if(B.length==0){return 
}for(i=0;
i<B.length;
i++){B[i].selected=true
}};
aimluck.io.switchCheckbox=function(B){var A;
if(B.checked){for(i=0;
i<B.form.elements.length;
i++){A=B.form.elements[i];
if(!A.disabled&&A.type=="checkbox"){A.checked=true
}}}else{for(i=0;
i<B.form.elements.length;
i++){A=B.form.elements[i];
if(!A.disabled&&A.type=="checkbox"){A.checked=false
}}}};
aimluck.io.postViewPage=function(C,B,A){aimluck.io.disableForm(C,true);
var D=dojo.byId(A+B);
if(D){dojo.style(D,"display","")
}dojo.xhrPost({url:C.action,timeout:30000,form:C,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(F,E){var G=F;
D=dojo.byId(A+B);
if(D){dojo.style(D,"display","none")
}if(G!=""){aimluck.io.disableForm(C,false);
var H=dijit.byId("portlet_"+B);
if(!H){H=new aimluck.widget.Contentpane({},"portlet_"+B)
}if(H){ptConfig[B].reloadUrl=ptConfig[B].initUrl;
H._isDownloaded=true;
H.setContent(G)
}}if(aipo.onloadSmartPhone==null){aipo.onloadSmartPhone()
}},error:function(E){}})
};