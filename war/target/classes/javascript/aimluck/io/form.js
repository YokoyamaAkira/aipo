aimluck.namespace("aimluck.io");
dojo.provide("aimluck.io");
aimluck.io.submit=function(B,G,A,F){aimluck.io.disableForm(B,true);
var D=dojo.byId(G+A);
if(D){dojo.style(D,"display","")
}try{dojo.xhrPost({url:B.action,timeout:30000,form:B,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(I,H){var E="";
if(dojo.isArray(I)&&I.length>0){if(I[0]=="PermissionError"){E+="<ul>";
E+="<li><span class='caution'>"+I[1]+"</span></li>";
E+="</ul>"
}else{E+="<ul>";
dojo.forEach(I,function(J){E+="<li><span class='caution'>"+J+"</span></li>"
});
E+="</ul>"
}}F.call(F,E);
D=dojo.byId(G+A);
if(D){dojo.style(D,"display","none")
}if(E!=""){aimluck.io.disableForm(B,false)
}},error:function(E){}})
}catch(C){}return false
};
aimluck.io.sendData=function(D,B,C){var A=new Array();
A.callback=C;
aimluck.io.sendRawData(D,B,sendErrorData,A);
return false
};
aimluck.io.sendErrorData=function(B,C){var A="";
if(dojo.isArray(C.data)&&C.data.length>0){A+="<ul>";
dojo.forEach(C.data,function(D){A+="<li>"+D+"</li>"
});
A+="</ul>"
}B.callback.call(B.callback,A);
return false
};
aimluck.io.sendRawData=function(A,D,F,C){var G=new Array;
try{dojo.xhrGet({url:A,method:"POST",encoding:"utf-8",content:D,mimetype:"text/json",sync:true,load:function(I,E,J,H){G.type=I;
G.data=E;
G.event=J;
G.args=H;
G.bool=true;
F.call(F,C,G);
return G
}})
}catch(B){alert("error")
}};
aimluck.io.escapeText=function(B){var A;
if(typeof (dojo.byId(B).innerText)!="undefined"){A=dojo.byId(B).innerText
}else{if(typeof (dojo.byId(B).value)!="undefined"){A=dojo.byId(B).value
}else{if(typeof (dojo.byId(B).textContent)!="undefined"){A=dojo.byId(B).textContent
}}}return A
};
aimluck.io.disableForm=function(B,D){var C=B.elements;
for(var A=0;
A<C.length;
A++){if(C[A].type=="submit"||C[A].type=="button"){C[A].disabled=D
}}};
aimluck.io.actionSubmit=function(A){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
};
aimluck.io.ajaxActionSubmit=function(A,E,B,C,D){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=E;
aimluck.io.submit(A.form,B,C,D)
};
aimluck.io.actionSubmitReturn=function(B,A){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1&action="+A;
B.form.submit()
};
aimluck.io.deleteSubmit=function(A){if(confirm("\u3053\u306e"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}};
aimluck.io.ajaxDeleteSubmit=function(A,E,B,C,D){if(confirm("\u3053\u306e"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=E;
aimluck.io.submit(A.form,B,C,D)
}};
aimluck.io.ajaxEnableSubmit=function(A,E,B,C,D){if(confirm("\u3053\u306e"+A.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=E;
aimluck.io.submit(A.form,B,C,D)
}};
aimluck.io.ajaxDisableSubmit=function(A,E,B,C,D){if(confirm("\u3053\u306e"+A.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=E;
aimluck.io.submit(A.form,B,C,D)
}};
aimluck.io.deleteSubmitReturn=function(B,A){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1&action="+A;
B.form.submit()
}};
aimluck.io.multiDeleteSubmit=function(A){if(confirm("\u9078\u629e\u3057\u305f"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}};
aimluck.io.ajaxMultiDeleteSubmit=function(A,E,B,C,D){if(confirm("\u9078\u629e\u3057\u305f"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=E;
aimluck.io.submit(A.form,B,C,D)
}};
aimluck.io.ajaxMultiEnableSubmit=function(A,E,B,C,D){if(confirm("\u9078\u629e\u3057\u305f"+A.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=E;
aimluck.io.submit(A.form,B,C,D)
}};
aimluck.io.ajaxMultiDisableSubmit=function(A,E,B,C,D){if(confirm("\u9078\u629e\u3057\u305f"+A.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=E;
aimluck.io.submit(A.form,B,C,D)
}};
aimluck.io.setHiddenValue=function(B){if(B.name){var A=document.createElement("input");
A.type="hidden";
A.name=B.name;
A.value=B.value;
B.form.appendChild(A)
}};
aimluck.io.openDialog=function(A,D,B,C){aimluck.io.disableForm(A.form,true);
aipo.common.showDialog(D,B,C)
};
aimluck.io.checkboxActionSubmit=function(A){aimluck.io.verifyCheckbox(A.form,aimluck.io.actionSubmit,A)
};
aimluck.io.ajaxCheckboxActionSubmit=function(A,E,B,C,D){aimluck.io.ajaxVerifyCheckbox(A.form,aimluck.io.ajaxActionSubmit,A,E,B,C,D)
};
aimluck.io.checkboxDeleteSubmit=function(A){aimluck.io.verifyCheckbox(A.form,aimluck.io.multiDeleteSubmit,A)
};
aimluck.io.ajaxCheckboxDeleteSubmit=function(A,E,B,C,D){aimluck.io.ajaxVerifyCheckbox(A.form,aimluck.io.ajaxMultiDeleteSubmit,A,E,B,C,D)
};
aimluck.io.ajaxCheckboxEnableSubmit=function(A,E,B,C,D){aimluck.io.ajaxVerifyCheckbox(A.form,aimluck.io.ajaxMultiEnableSubmit,A,E,B,C,D)
};
aimluck.io.ajaxCheckboxDisableSubmit=function(A,E,B,C,D){aimluck.io.ajaxVerifyCheckbox(A.form,aimluck.io.ajaxMultiDisableSubmit,A,E,B,C,D)
};
aimluck.io.verifyCheckbox=function(C,D,B){var A=0;
var E;
for(E=0;
E<C.elements.length;
E++){if(C.elements[E].checked){A++
}}if(A==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return D(B)
}};
aimluck.io.ajaxVerifyCheckbox=function(G,A,E,F,D,C,I){var H=0;
var B;
for(B=0;
B<G.elements.length;
B++){if(G.elements[B].checked){H++
}}if(H==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return A(E,F,D,C,I)
}};
aimluck.io.createOptions=function(I,B){var J,A,E,D,H,K,G,F;
if(B.url){H=B.url
}if(B.key){E=B.key
}if(B.value){D=B.value
}if(typeof B.selectedId=="undefined"){}else{J=B.selectedId
}if(typeof B.preOptions=="undefined"){}else{A=B.preOptions
}if(typeof B.indicator=="undefined"){}else{K=B.indicator;
var C=dojo.byId(K);
if(C){dojo.style(C,"display","none")
}}if(typeof B.callback=="undefined"){}else{G=B.callback;
if(typeof B.callbackTarget=="undefined"){}else{F=B.callbackTarget
}}dojo.xhrGet({url:H,timeout:10000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(N,M){var L=dojo.byId(I);
L.options.length=0;
if(typeof A=="undefined"){}else{aimluck.io.addOption(L,A.key,A.value,false)
}dojo.forEach(N,function(O){if(typeof O[E]=="undefined"||typeof O[D]=="undefined"){}else{if(O[E]==J){aimluck.io.addOption(L,O[E],O[D],true)
}else{aimluck.io.addOption(L,O[E],O[D],false)
}}});
if(C){dojo.style(C,"display","none")
}if(G){G.call(F?F:G,N)
}}})
};
aimluck.io.addFileToList=function(B,C,A){if(B.parentNode.style.display=="none"){B.parentNode.style.display=""
}if(document.all){var D=document.createElement("li");
D.setAttribute("data-fileid",C);
D.setAttribute("data-filename",A);
D.innerHTML="<span>"+A+'</span><span class="deletebutton" onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
return B.appendChild(D)
}else{var D=document.createElement("li");
D.setAttribute("data-fileid",C);
D.setAttribute("data-filename",A);
D.innerHTML="<span>"+A+'</span><span class="deletebutton"  onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
return B.appendChild(D)
}};
aimluck.io.replaceFileToList=function(B,C,A){if(document.all){var D=document.createElement("li");
D.setAttribute("data-fileid",C);
D.setAttribute("data-filename",A);
D.innerHTML="<span>"+A+'</span><span class="deletebutton" onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
B.innerHTML="";
return B.appendChild(D)
}else{var D=document.createElement("li");
D.setAttribute("data-fileid",C);
D.setAttribute("data-filename",A);
D.innerHTML="<span>"+A+'</span><span class="deletebutton"  onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
B.innerHTML="";
return B.appendChild(D)
}};
aimluck.io.removeFileFromList=function(A,B){return A.removeChild(B)
};
aimluck.io.createSelectFromFileList=function(D,F){var B=dojo.byId("attachments_"+F);
var E=document.createElement("select");
E.style.display="none";
E.id="attachments_select";
E.multiple="multiple";
E.name="attachments";
var G=B.children;
for(var A=0;
A<G.length;
A++){var C=document.createElement("option");
C.value=G[A].getAttribute("data-fileid");
C.text=G[A].getAttribute("data-filename");
C.selected=true;
E.appendChild(C)
}D.appendChild(E)
};
aimluck.io.addOption=function(E,B,C,D){if(document.all){var A=document.createElement("OPTION");
A.value=B;
A.text=C;
A.selected=D;
if(E.options.length==1&&E.options[0].value==""){E.options.remove(0)
}E.add(A,E.options.length)
}else{var A=document.createElement("OPTION");
A.value=B;
A.text=C;
A.selected=D;
if(E.options.length==1&&E.options[0].value==""){E.removeChild(E.options[0])
}E.insertBefore(A,E.options[E.options.length])
}};
aimluck.io.removeOptions=function(B){if(document.all){var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1
}}}else{var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){B.removeChild(A[i]);
i-=1
}}}if(A.length==0){add_option(B,"","\u3000",false)
}};
aimluck.io.removeAllOptions=function(B){if(B.options.length==0){return 
}aimluck.io.selectAllOptions(B);
if(document.all){var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1
}}}else{var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){B.removeChild(A[i]);
i-=1
}}}if(A.length==0){add_option(B,"","\u3000",false)
}};
aimluck.io.selectAllOptions=function(B){var A=B.options;
if(A.length==0){return 
}for(i=0;
i<A.length;
i++){A[i].selected=true
}};
aimluck.io.switchCheckbox=function(A){var B;
if(A.checked){for(i=0;
i<A.form.elements.length;
i++){B=A.form.elements[i];
if(!B.disabled&&B.type=="checkbox"){B.checked=true
}}}else{for(i=0;
i<A.form.elements.length;
i++){B=A.form.elements[i];
if(!B.disabled&&B.type=="checkbox"){B.checked=false
}}}};
aimluck.io.postViewPage=function(B,A,D){aimluck.io.disableForm(B,true);
var C=dojo.byId(D+A);
if(C){dojo.style(C,"display","")
}dojo.xhrPost({url:B.action,timeout:30000,form:B,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(G,F){var H=G;
C=dojo.byId(D+A);
if(C){dojo.style(C,"display","none")
}if(H!=""){aimluck.io.disableForm(B,false);
var E=dijit.byId("portlet_"+A);
if(!E){E=new aimluck.widget.Contentpane({},"portlet_"+A)
}if(E){ptConfig[A].reloadUrl=ptConfig[A].initUrl;
E._isDownloaded=true;
E.setContent(H)
}}if(aipo.onloadSmartPhone==null){aipo.onloadSmartPhone()
}},error:function(E){}})
};