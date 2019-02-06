dojo._xdResourceLoaded({depends:[["provide","aimluck.io"]],defineResource:function(A){if(!A._hasResource["aimluck.io"]){A._hasResource["aimluck.io"]=true;
aimluck.namespace("aimluck.io");
A.provide("aimluck.io");
aimluck.io.submit=function(F,C,D,B){aimluck.io.disableForm(F,true);
var H=A.byId(C+D);
if(H){A.style(H,"display","")
}try{A.xhrPost({url:F.action,timeout:30000,form:F,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(I,E){var J="";
if(A.isArray(I)&&I.length>0){if(I[0]=="PermissionError"){J+="<ul>";
J+="<li><span class='caution'>"+I[1]+"</span></li>";
J+="</ul>"
}else{J+="<ul>";
A.forEach(I,function(K){J+="<li><span class='caution'>"+K+"</span></li>"
});
J+="</ul>"
}}B.call(B,J);
H=A.byId(C+D);
if(H){A.style(H,"display","none")
}if(J!=""){aimluck.io.disableForm(F,false)
}},error:function(E){}})
}catch(G){}return false
};
aimluck.io.sendData=function(C,E,B){var D=new Array();
D.callback=B;
aimluck.io.sendRawData(C,E,sendErrorData,D);
return false
};
aimluck.io.sendErrorData=function(B,C){var D="";
if(A.isArray(C.data)&&C.data.length>0){D+="<ul>";
A.forEach(C.data,function(E){D+="<li>"+E+"</li>"
});
D+="</ul>"
}B.callback.call(B.callback,D);
return false
};
aimluck.io.sendRawData=function(D,H,C,G){var B=new Array;
try{A.xhrGet({url:D,method:"POST",encoding:"utf-8",content:H,mimetype:"text/json",sync:true,load:function(I,K,J,E){B.type=I;
B.data=K;
B.event=J;
B.args=E;
B.bool=true;
C.call(C,G,B);
return B
}})
}catch(F){alert("error")
}};
aimluck.io.escapeText=function(C){var B;
if(typeof (A.byId(C).innerText)!="undefined"){B=A.byId(C).innerText
}else{if(typeof (A.byId(C).value)!="undefined"){B=A.byId(C).value
}else{if(typeof (A.byId(C).textContent)!="undefined"){B=A.byId(C).textContent
}}}return B
};
aimluck.io.disableForm=function(E,C){var B=E.elements;
for(var D=0;
D<B.length;
D++){if(B[D].type=="submit"||B[D].type=="button"){B[D].disabled=C
}}};
aimluck.io.actionSubmit=function(B){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
};
aimluck.io.ajaxActionSubmit=function(D,C,E,F,B){aimluck.io.disableForm(D.form,true);
aimluck.io.setHiddenValue(D);
D.form.action=C;
aimluck.io.submit(D.form,E,F,B)
};
aimluck.io.actionSubmitReturn=function(C,B){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=C.form.action+"?"+C.name+"=1&action="+B;
C.form.submit()
};
aimluck.io.deleteSubmit=function(B){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}};
aimluck.io.ajaxDeleteSubmit=function(D,C,E,F,B){if(confirm("\u3053\u306e"+D.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(D.form,true);
aimluck.io.setHiddenValue(D);
D.form.action=C;
aimluck.io.submit(D.form,E,F,B)
}};
aimluck.io.ajaxEnableSubmit=function(D,C,E,F,B){if(confirm("\u3053\u306e"+D.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(D.form,true);
aimluck.io.setHiddenValue(D);
D.form.action=C;
aimluck.io.submit(D.form,E,F,B)
}};
aimluck.io.ajaxDisableSubmit=function(D,C,E,F,B){if(confirm("\u3053\u306e"+D.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(D.form,true);
aimluck.io.setHiddenValue(D);
D.form.action=C;
aimluck.io.submit(D.form,E,F,B)
}};
aimluck.io.deleteSubmitReturn=function(C,B){if(confirm("\u3053\u306e"+C.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=C.form.action+"?"+C.name+"=1&action="+B;
C.form.submit()
}};
aimluck.io.multiDeleteSubmit=function(B){if(confirm("\u9078\u629e\u3057\u305f"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}};
aimluck.io.ajaxMultiDeleteSubmit=function(D,C,E,F,B){if(confirm("\u9078\u629e\u3057\u305f"+D.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(D.form,true);
aimluck.io.setHiddenValue(D);
D.form.action=C;
aimluck.io.submit(D.form,E,F,B)
}};
aimluck.io.ajaxMultiEnableSubmit=function(D,C,E,F,B){if(confirm("\u9078\u629e\u3057\u305f"+D.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(D.form,true);
aimluck.io.setHiddenValue(D);
D.form.action=C;
aimluck.io.submit(D.form,E,F,B)
}};
aimluck.io.ajaxMultiDisableSubmit=function(D,C,E,F,B){if(confirm("\u9078\u629e\u3057\u305f"+D.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(D.form,true);
aimluck.io.setHiddenValue(D);
D.form.action=C;
aimluck.io.submit(D.form,E,F,B)
}};
aimluck.io.setHiddenValue=function(C){if(C.name){var B=document.createElement("input");
B.type="hidden";
B.name=C.name;
B.value=C.value;
C.form.appendChild(B)
}};
aimluck.io.openDialog=function(D,C,E,B){aimluck.io.disableForm(D.form,true);
aipo.common.showDialog(C,E,B)
};
aimluck.io.checkboxActionSubmit=function(B){aimluck.io.verifyCheckbox(B.form,aimluck.io.actionSubmit,B)
};
aimluck.io.ajaxCheckboxActionSubmit=function(D,C,E,F,B){aimluck.io.ajaxVerifyCheckbox(D.form,aimluck.io.ajaxActionSubmit,D,C,E,F,B)
};
aimluck.io.checkboxDeleteSubmit=function(B){aimluck.io.verifyCheckbox(B.form,aimluck.io.multiDeleteSubmit,B)
};
aimluck.io.ajaxCheckboxDeleteSubmit=function(D,C,E,F,B){aimluck.io.ajaxVerifyCheckbox(D.form,aimluck.io.ajaxMultiDeleteSubmit,D,C,E,F,B)
};
aimluck.io.ajaxCheckboxEnableSubmit=function(D,C,E,F,B){aimluck.io.ajaxVerifyCheckbox(D.form,aimluck.io.ajaxMultiEnableSubmit,D,C,E,F,B)
};
aimluck.io.ajaxCheckboxDisableSubmit=function(D,C,E,F,B){aimluck.io.ajaxVerifyCheckbox(D.form,aimluck.io.ajaxMultiDisableSubmit,D,C,E,F,B)
};
aimluck.io.verifyCheckbox=function(F,B,E){var D=0;
var C;
for(C=0;
C<F.elements.length;
C++){if(F.elements[C].checked){D++
}}if(D==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return B(E)
}};
aimluck.io.ajaxVerifyCheckbox=function(J,D,H,I,G,F,C){var B=0;
var E;
for(E=0;
E<J.elements.length;
E++){if(J.elements[E].checked){B++
}}if(B==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return D(H,I,G,F,C)
}};
aimluck.io.createOptions=function(L,E){var B,D,H,G,K,C,J,I;
if(E.url){K=E.url
}if(E.key){H=E.key
}if(E.value){G=E.value
}if(typeof E.selectedId=="undefined"){}else{B=E.selectedId
}if(typeof E.preOptions=="undefined"){}else{D=E.preOptions
}if(typeof E.indicator=="undefined"){}else{C=E.indicator;
var F=A.byId(C);
if(F){A.style(F,"display","none")
}}if(typeof E.callback=="undefined"){}else{J=E.callback;
if(typeof E.callbackTarget=="undefined"){}else{I=E.callbackTarget
}}A.xhrGet({url:K,timeout:10000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(O,N){var M=A.byId(L);
M.options.length=0;
if(typeof D=="undefined"){}else{aimluck.io.addOption(M,D.key,D.value,false)
}A.forEach(O,function(P){if(typeof P[H]=="undefined"||typeof P[G]=="undefined"){}else{if(P[H]==B){aimluck.io.addOption(M,P[H],P[G],true)
}else{aimluck.io.addOption(M,P[H],P[G],false)
}}});
if(F){A.style(F,"display","none")
}if(J){J.call(I?I:J,O)
}}})
};
aimluck.io.addOption=function(C,E,F,B){if(document.all){var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=B;
if(C.options.length==1&&C.options[0].value==""){C.options.remove(0)
}C.add(D,C.options.length)
}else{var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=B;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0])
}C.insertBefore(D,C.options[C.options.length])
}};
aimluck.io.removeOptions=function(C){if(document.all){var B=C.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=C.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){C.removeChild(B[i]);
i-=1
}}}if(B.length==0){add_option(C,"","\u3000",false)
}};
aimluck.io.removeAllOptions=function(C){if(C.options.length==0){return 
}aimluck.io.selectAllOptions(C);
if(document.all){var B=C.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=C.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){C.removeChild(B[i]);
i-=1
}}}if(B.length==0){add_option(C,"","\u3000",false)
}};
aimluck.io.selectAllOptions=function(C){var B=C.options;
if(B.length==0){return 
}for(i=0;
i<B.length;
i++){B[i].selected=true
}};
aimluck.io.switchCheckbox=function(B){var C;
if(B.checked){for(i=0;
i<B.form.elements.length;
i++){C=B.form.elements[i];
if(!C.disabled){C.checked=true
}}}else{for(i=0;
i<B.form.elements.length;
i++){C=B.form.elements[i];
if(!C.disabled){C.checked=false
}}}};
aimluck.io.postViewPage=function(E,D,C){aimluck.io.disableForm(E,true);
var B=A.byId(C+D);
if(B){A.style(B,"display","")
}A.xhrPost({url:E.action,timeout:30000,form:E,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(G,F){var H=G;
B=A.byId(C+D);
if(B){A.style(B,"display","none")
}if(H!=""){aimluck.io.disableForm(E,false);
var I=dijit.byId("portlet_"+D);
if(!I){I=new aimluck.widget.Contentpane({},"portlet_"+D)
}if(I){ptConfig[D].reloadUrl=ptConfig[D].initUrl;
I._isDownloaded=true;
I.setContent(H)
}}if(aipo.onloadSmartPhone==null){aipo.onloadSmartPhone()
}},error:function(F){}})
}
}}});