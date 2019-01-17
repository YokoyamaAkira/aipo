dojo._xdResourceLoaded({depends:[["provide","aimluck.io"]],defineResource:function(A){if(!A._hasResource["aimluck.io"]){A._hasResource["aimluck.io"]=true;
aimluck.namespace("aimluck.io");
A.provide("aimluck.io");
aimluck.io.submit=function(D,B,C,H){aimluck.io.disableForm(D,true);
var G=A.byId(B+C);
if(G){A.style(G,"display","")
}try{A.xhrPost({url:D.action,timeout:30000,form:D,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(I,E){var J="";
if(A.isArray(I)&&I.length>0){if(I[0]=="PermissionError"){J+="<ul>";
J+="<li><span class='caution'>"+I[1]+"</span></li>";
J+="</ul>"
}else{J+="<ul>";
A.forEach(I,function(K){J+="<li><span class='caution'>"+K+"</span></li>"
});
J+="</ul>"
}}H.call(H,J);
G=A.byId(B+C);
if(G){A.style(G,"display","none")
}if(J!=""){aimluck.io.disableForm(D,false)
}},error:function(E){}})
}catch(F){}return false
};
aimluck.io.sendData=function(B,D,E){var C=new Array();
C.callback=E;
aimluck.io.sendRawData(B,D,sendErrorData,C);
return false
};
aimluck.io.sendErrorData=function(D,B){var C="";
if(A.isArray(B.data)&&B.data.length>0){C+="<ul>";
A.forEach(B.data,function(E){C+="<li>"+E+"</li>"
});
C+="</ul>"
}D.callback.call(D.callback,C);
return false
};
aimluck.io.sendRawData=function(C,G,H,F){var B=new Array;
try{A.xhrGet({url:C,method:"POST",encoding:"utf-8",content:G,mimetype:"text/json",sync:true,load:function(I,K,J,E){B.type=I;
B.data=K;
B.event=J;
B.args=E;
B.bool=true;
H.call(H,F,B);
return B
}})
}catch(D){alert("error")
}};
aimluck.io.escapeText=function(B){var C;
if(typeof (A.byId(B).innerText)!="undefined"){C=A.byId(B).innerText
}else{if(typeof (A.byId(B).value)!="undefined"){C=A.byId(B).value
}else{if(typeof (A.byId(B).textContent)!="undefined"){C=A.byId(B).textContent
}}}return C
};
aimluck.io.disableForm=function(D,B){var E=D.elements;
for(var C=0;
C<E.length;
C++){if(E[C].type=="submit"||E[C].type=="button"){E[C].disabled=B
}}};
aimluck.io.actionSubmit=function(B){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
};
aimluck.io.ajaxActionSubmit=function(C,B,D,E,F){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
};
aimluck.io.actionSubmitReturn=function(B,C){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1&action="+C;
B.form.submit()
};
aimluck.io.deleteSubmit=function(B){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}};
aimluck.io.ajaxDeleteSubmit=function(C,B,D,E,F){if(confirm("\u3053\u306e"+C.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.ajaxEnableSubmit=function(C,B,D,E,F){if(confirm("\u3053\u306e"+C.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.ajaxDisableSubmit=function(C,B,D,E,F){if(confirm("\u3053\u306e"+C.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.deleteSubmitReturn=function(B,C){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1&action="+C;
B.form.submit()
}};
aimluck.io.multiDeleteSubmit=function(B){if(confirm("\u9078\u629e\u3057\u305f"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}};
aimluck.io.ajaxMultiDeleteSubmit=function(C,B,D,E,F){if(confirm("\u9078\u629e\u3057\u305f"+C.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.ajaxMultiEnableSubmit=function(C,B,D,E,F){if(confirm("\u9078\u629e\u3057\u305f"+C.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.ajaxMultiDisableSubmit=function(C,B,D,E,F){if(confirm("\u9078\u629e\u3057\u305f"+C.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.setHiddenValue=function(B){if(B.name){var C=document.createElement("input");
C.type="hidden";
C.name=B.name;
C.value=B.value;
B.form.appendChild(C)
}};
aimluck.io.openDialog=function(C,B,D,E){aimluck.io.disableForm(C.form,true);
aipo.common.showDialog(B,D,E)
};
aimluck.io.checkboxActionSubmit=function(B){aimluck.io.verifyCheckbox(B.form,aimluck.io.actionSubmit,B)
};
aimluck.io.ajaxCheckboxActionSubmit=function(C,B,D,E,F){aimluck.io.ajaxVerifyCheckbox(C.form,aimluck.io.ajaxActionSubmit,C,B,D,E,F)
};
aimluck.io.checkboxDeleteSubmit=function(B){aimluck.io.verifyCheckbox(B.form,aimluck.io.multiDeleteSubmit,B)
};
aimluck.io.ajaxCheckboxDeleteSubmit=function(C,B,D,E,F){aimluck.io.ajaxVerifyCheckbox(C.form,aimluck.io.ajaxMultiDeleteSubmit,C,B,D,E,F)
};
aimluck.io.ajaxCheckboxEnableSubmit=function(C,B,D,E,F){aimluck.io.ajaxVerifyCheckbox(C.form,aimluck.io.ajaxMultiEnableSubmit,C,B,D,E,F)
};
aimluck.io.ajaxCheckboxDisableSubmit=function(C,B,D,E,F){aimluck.io.ajaxVerifyCheckbox(C.form,aimluck.io.ajaxMultiDisableSubmit,C,B,D,E,F)
};
aimluck.io.verifyCheckbox=function(E,F,D){var C=0;
var B;
for(B=0;
B<E.elements.length;
B++){if(E.elements[B].checked){C++
}}if(C==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return F(D)
}};
aimluck.io.ajaxVerifyCheckbox=function(C,F,J,B,I,H,E){var D=0;
var G;
for(G=0;
G<C.elements.length;
G++){if(C.elements[G].checked){D++
}}if(D==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return F(J,B,I,H,E)
}};
aimluck.io.createOptions=function(C,G){var D,F,J,I,B,E,L,K;
if(G.url){B=G.url
}if(G.key){J=G.key
}if(G.value){I=G.value
}if(typeof G.selectedId=="undefined"){}else{D=G.selectedId
}if(typeof G.preOptions=="undefined"){}else{F=G.preOptions
}if(typeof G.indicator=="undefined"){}else{E=G.indicator;
var H=A.byId(E);
if(H){A.style(H,"display","none")
}}if(typeof G.callback=="undefined"){}else{L=G.callback;
if(typeof G.callbackTarget=="undefined"){}else{K=G.callbackTarget
}}A.xhrGet({url:B,timeout:10000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(O,N){var M=A.byId(C);
M.options.length=0;
if(typeof F=="undefined"){}else{aimluck.io.addOption(M,F.key,F.value,false)
}A.forEach(O,function(P){if(typeof P[J]=="undefined"||typeof P[I]=="undefined"){}else{if(P[J]==D){aimluck.io.addOption(M,P[J],P[I],true)
}else{aimluck.io.addOption(M,P[J],P[I],false)
}}});
if(H){A.style(H,"display","none")
}if(L){L.call(K?K:L,O)
}}})
};
aimluck.io.addOption=function(B,D,E,F){if(document.all){var C=document.createElement("OPTION");
C.value=D;
C.text=E;
C.selected=F;
if(B.options.length==1&&B.options[0].value==""){B.options.remove(0)
}B.add(C,B.options.length)
}else{var C=document.createElement("OPTION");
C.value=D;
C.text=E;
C.selected=F;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}B.insertBefore(C,B.options[B.options.length])
}};
aimluck.io.removeOptions=function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}if(C.length==0){add_option(B,"","\u3000",false)
}};
aimluck.io.removeAllOptions=function(B){if(B.options.length==0){return 
}aimluck.io.selectAllOptions(B);
if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}if(C.length==0){add_option(B,"","\u3000",false)
}};
aimluck.io.selectAllOptions=function(B){var C=B.options;
if(C.length==0){return 
}for(i=0;
i<C.length;
i++){C[i].selected=true
}};
aimluck.io.switchCheckbox=function(C){var B;
if(C.checked){for(i=0;
i<C.form.elements.length;
i++){B=C.form.elements[i];
if(!B.disabled){B.checked=true
}}}else{for(i=0;
i<C.form.elements.length;
i++){B=C.form.elements[i];
if(!B.disabled){B.checked=false
}}}};
aimluck.io.postViewPage=function(D,C,B){aimluck.io.disableForm(D,true);
var E=A.byId(B+C);
if(E){A.style(E,"display","")
}A.xhrPost({url:D.action,timeout:30000,form:D,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(G,F){var H=G;
E=A.byId(B+C);
if(E){A.style(E,"display","none")
}if(H!=""){aimluck.io.disableForm(D,false);
var I=dijit.byId("portlet_"+C);
if(!I){I=new aimluck.widget.Contentpane({},"portlet_"+C)
}if(I){ptConfig[C].reloadUrl=ptConfig[C].initUrl;
I._isDownloaded=true;
I.setContent(H)
}}if(aipo.onloadSmartPhone==null){aipo.onloadSmartPhone()
}},error:function(F){}})
}
}}});