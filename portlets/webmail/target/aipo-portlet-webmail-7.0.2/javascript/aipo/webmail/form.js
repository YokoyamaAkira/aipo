dojo.provide("aipo.webmail");
aipo.webmail.onLoadMailDialog=function(A){var B=dojo.byId("to");
if(B){B.focus()
}};
aipo.webmail.onLoadMailAccountDialog=function(A){var B=dojo.byId("account_name");
if(B){B.focus()
}};
aipo.webmail.onLoadMailFolderDialog=function(A){var B=dojo.byId("folder_name");
if(B){B.focus()
}};
aipo.webmail.onLoadMailFilterDialog=function(A){var B=dojo.byId("filter_name");
if(B){B.focus()
}};
aipo.webmail.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("webmail")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.webmail.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("webmail")
};
aipo.webmail.ajaxDeleteSubmit=function(B,A,C,D,E){if(confirm("この"+B.form._name.value+"を削除してよろしいですか？なお、フォルダに含まれるメールはすべて削除されます。\nまた、このフォルダを振り分け先として指定してあるフィルタは、振り分け先がデフォルト（フォルダリストの一番上のフォルダ）に変更されます。")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
var mailReceviingTimerId;
aipo.webmail.onProcessingTimer=function(){if(mailReceviingTimerId){clearTimeout(mailReceviingTimerId)
}mailReceviingTimerId=setTimeout("aipo.webmail.reloadMail()",10000)
};
aipo.webmail.reloadMailList=function(A){if(typeof ptConfig[A].reloadUrl!="undefined"){ptConfig[A].reloadUrl+="&updateunread=1"
}aipo.reloadPage(A)
};
aipo.webmail.reloadMail=function(){var D=dojo.byId("receiving");
if(D){var C=D.value;
var A=dojo.byId("page_start");
if(A){C+="&start="+A.value
}C+="&updateunread=1";
var B=dojo.byId("receivingPid");
aipo.viewPage(C,B.value);
aipo.webmail.onProcessingTimer()
}};
aipo.webmail.open_help=function(A){wx=400;
wy=250;
x=(screen.width-wx)/2;
y=(screen.height-wy)/2;
help_subwin=window.open(A,"help_window","left="+x+",top="+y+",width="+wx+",height="+wy+",resizable=no");
help_subwin.opener=self;
help_subwin.focus()
};
aipo.webmail.switchHeader=function(A,C){var B=dojo.byId("is_header_tiny");
if(B.value=="TRUE"||B.value=="true"){A.innerHTML="簡易表示";
aipo.webmail.switchHeaderDetail()
}else{A.innerHTML="詳細表示";
aipo.webmail.switchHeaderTiny()
}};
aipo.webmail.switchHeaderTiny=function(){var A=dojo.byId("is_header_tiny");
dojo.byId("WebMailHeaderFieldTiny").style.display="";
dojo.byId("WebMailHeaderFieldDetail").style.display="none";
A.value="TRUE"
};
aipo.webmail.switchHeaderDetail=function(){var A=dojo.byId("is_header_tiny");
dojo.byId("WebMailHeaderFieldTiny").style.display="none";
dojo.byId("WebMailHeaderFieldDetail").style.display="";
A.value="FALSE"
};
aipo.webmail.doDeleteAccount=function(A,B){if(confirm("このメールアカウントを削除してもよろしいですか？\n保存されているメールはすべて削除されます。")){aipo.viewPage(A,B)
}};
aipo.webmail.doDeleteFilter=function(A,B){if(confirm("このフィルタを削除してもよろしいですか？")){aipo.viewPage(A,B)
}};
aipo.webmail.AccountChange=function(D,A,F){var E=A;
var C=D.account_type;
for(i=0;
i<C.length;
i++){if(C[i].checked){var B=C[i].value
}}E+="&account_type="+B;
aipo.viewPage(E,F)
};
aipo.webmail.onReceiveMessageAdmin=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("webmailadmin")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.webmail.onDeleteAdminAccount=function(A){if(!A){aipo.portletReload("webmailadmin")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=A
}};
aipo.webmail.hideDialogAdmin=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("webmailadmin")
};
aipo.webmail.switchDelAtPop3=function(A){if(A.value==0){dojo.byId("del_at_pop3_flg_on_field").style.display=""
}else{dojo.byId("del_at_pop3_flg_on_field").style.display="none"
}};
aipo.webmail.switchAuthSendAdmin=function(A){if(A.value==2){dojo.byId("smtp_auth_field").style.display="";
dojo.byId("pop_auth_field").style.display="none"
}else{if(A.value==1){dojo.byId("smtp_auth_field").style.display="none";
dojo.byId("pop_auth_field").style.display=""
}else{dojo.byId("smtp_auth_field").style.display="none";
dojo.byId("pop_auth_field").style.display="none"
}}};
aipo.webmail.switchAuthSend=function(A){if(A.value==2){dojo.byId("smtp_auth_field").style.display=""
}else{dojo.byId("smtp_auth_field").style.display="none"
}};
aipo.webmail.showAddressbookDialog=function(A,C,D){var B=dijit.byId("addressbookDialog");
if(!B){B=new aipo.webmail.widget.AddressbookDialog({widgetId:"addressbookDialog",_portlet_id:C,_callback:D},"addressbookDialog")
}else{B.setCallback(C,D)
}if(B){B.setHref(A);
B.show()
}};
aipo.webmail.onLoadAddressbookDialog=function(A){var C=dojo.byId("urlUserlist"+A).value;
aipo.webmail.changeInternalGroup(C,"LoginUser");
var B=dojo.byId("urlAddrlist"+A).value;
aipo.webmail.changeExternalGroup(B,"");
aipo.webmail.getDataSub(dojo.byId("detail_to_recipients"),dojo.byId("to").value);
aipo.webmail.getDataSub(dojo.byId("detail_cc_recipients"),dojo.byId("cc").value);
aipo.webmail.getDataSub(dojo.byId("detail_bcc_recipients"),dojo.byId("bcc").value)
};
aipo.webmail.getDataSub=function(B,A){if(A==null||A.length==0){return 
}var C=A.split(",");
for(i=0;
i<C.length;
i++){add_option(B,aipo.webmail.trim(C[i]),aipo.webmail.trim(C[i]),false)
}};
aipo.webmail.insertData=function(){dojo.byId("to").value=aipo.webmail.getStringLine(dojo.byId("detail_to_recipients").options);
dojo.byId("cc").value=aipo.webmail.getStringLine(dojo.byId("detail_cc_recipients").options);
dojo.byId("bcc").value=aipo.webmail.getStringLine(dojo.byId("detail_bcc_recipients").options);
dijit.byId("addressbookDialog").hide()
};
aipo.webmail.switchTypeCompany=function(A){if(A.value=="1"){dojo.byId("Block_Internal_Group").style.display="block";
dojo.byId("Block_External_Group").style.display="none";
dojo.byId("userDiv").style.display="block";
dojo.byId("addrDiv").style.display="none"
}else{dojo.byId("Block_Internal_Group").style.display="none";
dojo.byId("Block_External_Group").style.display="block";
dojo.byId("userDiv").style.display="none";
dojo.byId("addrDiv").style.display="block"
}};
aipo.webmail.changeInternalGroup=function(A,B){aipo.webmail.createSelect("internal_member_from","userDiv",A+"?mode=group&groupname="+B+"&inc_luser=true","aliasName","email","","",'size="12" multiple="multiple" style="width: 99%"',"addresslist-indicator")
};
aipo.webmail.changeExternalGroup=function(A,B){aipo.webmail.createSelect("external_member_from","addrDiv",A+"?mode=group&groupname="+B+"&inc_luser=true","fullName","email","","",'size="12" multiple="multiple" style="width: 99%"',"addresslist-indicator")
};
aipo.webmail.createSelect=function(J,F,A,E,I,B,D,G,C){var H=dojo.byId(C);
if(H){dojo.style(H,"display","")
}dojo.xhrGet({url:A,timeout:10000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(M,K){var L="";
if(typeof G=="undefined"){L+='<select name="'+J+'">'
}else{L+='<select name="'+J+'" '+G+"/>"
}if(typeof D=="undefined"){L+=""
}else{L+=D
}dojo.forEach(M,function(N){if(typeof N[E]=="undefined"||typeof N[I]=="undefined"){}else{if(N[E]==B){L+="<option value='"+N[E]+"' selected='selected'>"+N[I]+"</option>"
}else{L+="<option value='"+N[E]+"&lt;"+N[I]+"&gt;'>"+N[E]+"&lt;"+N[I]+"&gt;</option>"
}}});
L+="</select>";
dojo.byId(F).innerHTML=L;
if(H){dojo.style(H,"display","none")
}}})
};
aipo.webmail.sendForm=function(){aipo.webmail.selectAll(document.WebMailAddressbook.detail_to_recipients);
aipo.webmail.selectAll(document.WebMailAddressbook.detail_cc_recipients);
aipo.webmail.selectAll(document.WebMailAddressbook.detail_bcc_recipients);
document.WebMailAddressbook.submit()
};
aipo.webmail.getStringLine=function(A){var C="";
if(A.length>0){var B=A.length-1;
for(i=0;
i<B;
i++){C=C+A[i].value+","
}C=C+A[B].value
}return C
};
aipo.webmail.selectAll=function(A){var B=A.options;
for(i=0;
i<B.length;
i++){B[i].selected=true
}};
aipo.webmail.exAddMember=function(C,A,B){if(dojo.byId("corpId"+B).checked==true){add_member(C.internal_member_from,A)
}else{add_member(C.external_member_from,A)
}};
aipo.webmail.removeAll=function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){B.remove(i);
i-=1
}}else{var B=A.options;
for(i=0;
i<B.length;
i++){A.removeChild(B[i]);
i-=1
}}};
aipo.webmail.ltrim=function(A){while(A.charAt(0)==" "||A.charAt(0)=="　"){A=A.substring(1,A.length)
}return(A)
};
aipo.webmail.rtrim=function(A){while(A.charAt(A.length-1)==" "||A.charAt(A.length-1)=="　"){A=A.substring(0,A.length-1)
}return(A)
};
aipo.webmail.trim=function(A){return aipo.webmail.ltrim(aipo.webmail.rtrim(A))
};
aipo.webmail.filter_order_submit=function(C){var A=C.filter_so.options;
var B="";
for(i=0;
i<A.length;
i++){A[i].selected=false
}if(A.length>0){for(i=0;
i<A.length-1;
i++){B=B+A[i].value+","
}B=B+A[A.length-1].value
}C.positions.value=B
};
aipo.webmail.action=function(C,A){var B=dojo.byId(A+"_action").value;
aimluck.io.openDialog(C,B,A,aipo.webmail.onLoadMailDialog)
};