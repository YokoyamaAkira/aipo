dojo.provide("aipo.webmail");
aipo.webmail.onLoadMailDialog=function(C){var D=dojo.byId("to");
if(D){D.focus()
}};
aipo.webmail.onLoadMailAccountDialog=function(C){var D=dojo.byId("account_name");
if(D){D.focus()
}};
aipo.webmail.onLoadMailFolderDialog=function(C){var D=dojo.byId("folder_name");
if(D){D.focus()
}};
aipo.webmail.onLoadMailFilterDialog=function(C){var D=dojo.byId("filter_name");
if(D){D.focus()
}};
aipo.webmail.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("webmail")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.webmail.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("webmail")
};
aipo.webmail.ajaxDeleteSubmit=function(J,F,I,H,G){if(confirm("この"+J.form._name.value+"を削除してよろしいですか？なお、フォルダに含まれるメールはすべて削除されます。\nまた、このフォルダを振り分け先として指定してあるフィルタは、振り分け先がデフォルト（フォルダリストの一番上のフォルダ）に変更されます。")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
var mailReceviingTimerId;
aipo.webmail.onProcessingTimer=function(){if(mailReceviingTimerId){clearTimeout(mailReceviingTimerId)
}mailReceviingTimerId=setTimeout("aipo.webmail.reloadMail()",10000)
};
aipo.webmail.reloadMailList=function(B){if(typeof ptConfig[B].reloadUrl!="undefined"){ptConfig[B].reloadUrl+="&updateunread=1"
}aipo.reloadPage(B)
};
aipo.webmail.reloadMail=function(){var F=dojo.byId("receiving");
if(F){var G=F.value;
var E=dojo.byId("page_start");
if(E){G+="&start="+E.value
}G+="&updateunread=1";
var H=dojo.byId("receivingPid");
aipo.viewPage(G,H.value);
aipo.webmail.onProcessingTimer()
}};
aipo.webmail.open_help=function(B){wx=400;
wy=250;
x=(screen.width-wx)/2;
y=(screen.height-wy)/2;
help_subwin=window.open(B,"help_window","left="+x+",top="+y+",width="+wx+",height="+wy+",resizable=no");
help_subwin.opener=self;
help_subwin.focus()
};
aipo.webmail.switchHeader=function(D,E){var F=dojo.byId("is_header_tiny");
if(F.value=="TRUE"||F.value=="true"){D.innerHTML="簡易表示";
aipo.webmail.switchHeaderDetail()
}else{D.innerHTML="詳細表示";
aipo.webmail.switchHeaderTiny()
}};
aipo.webmail.switchHeaderTiny=function(){var B=dojo.byId("is_header_tiny");
dojo.byId("WebMailHeaderFieldTiny").style.display="";
dojo.byId("WebMailHeaderFieldDetail").style.display="none";
B.value="TRUE"
};
aipo.webmail.switchHeaderDetail=function(){var B=dojo.byId("is_header_tiny");
dojo.byId("WebMailHeaderFieldTiny").style.display="none";
dojo.byId("WebMailHeaderFieldDetail").style.display="";
B.value="FALSE"
};
aipo.webmail.doDeleteAccount=function(C,D){if(confirm("このメールアカウントを削除してもよろしいですか？\n保存されているメールはすべて削除されます。")){aipo.viewPage(C,D)
}};
aipo.webmail.doDeleteFilter=function(C,D){if(confirm("このフィルタを削除してもよろしいですか？")){aipo.viewPage(C,D)
}};
aipo.webmail.AccountChange=function(J,G,H){var I=G;
var K=J.account_type;
for(i=0;
i<K.length;
i++){if(K[i].checked){var L=K[i].value
}}I+="&account_type="+L;
aipo.viewPage(I,H)
};
aipo.webmail.onReceiveMessageAdmin=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("webmailadmin")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.webmail.onDeleteAdminAccount=function(B){if(!B){aipo.portletReload("webmailadmin")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.webmail.hideDialogAdmin=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("webmailadmin")
};
aipo.webmail.switchDelAtPop3=function(B){if(B.value==0){dojo.byId("del_at_pop3_flg_on_field").style.display=""
}else{dojo.byId("del_at_pop3_flg_on_field").style.display="none"
}};
aipo.webmail.switchAuthSendAdmin=function(B){if(B.value==2){dojo.byId("smtp_auth_field").style.display="";
dojo.byId("pop_auth_field").style.display="none"
}else{if(B.value==1){dojo.byId("smtp_auth_field").style.display="none";
dojo.byId("pop_auth_field").style.display=""
}else{dojo.byId("smtp_auth_field").style.display="none";
dojo.byId("pop_auth_field").style.display="none"
}}};
aipo.webmail.switchAuthSend=function(B){if(B.value==2){dojo.byId("smtp_auth_field").style.display=""
}else{dojo.byId("smtp_auth_field").style.display="none"
}};
aipo.webmail.showAddressbookDialog=function(E,G,F){var H=dijit.byId("addressbookDialog");
if(!H){H=new aipo.webmail.widget.AddressbookDialog({widgetId:"addressbookDialog",_portlet_id:G,_callback:F},"addressbookDialog")
}else{H.setCallback(G,F)
}if(H){H.setHref(E);
H.show()
}};
aipo.webmail.onLoadAddressbookDialog=function(D){var E=dojo.byId("urlUserlist"+D).value;
aipo.webmail.changeInternalGroup(E,"LoginUser");
var F=dojo.byId("urlAddrlist"+D).value;
aipo.webmail.changeExternalGroup(F,"");
aipo.webmail.getDataSub(dojo.byId("detail_to_recipients"),dojo.byId("to").value);
aipo.webmail.getDataSub(dojo.byId("detail_cc_recipients"),dojo.byId("cc").value);
aipo.webmail.getDataSub(dojo.byId("detail_bcc_recipients"),dojo.byId("bcc").value)
};
aipo.webmail.getDataSub=function(F,D){if(D==null||D.length==0){return 
}var E=D.split(",");
for(i=0;
i<E.length;
i++){add_option(F,aipo.webmail.trim(E[i]),aipo.webmail.trim(E[i]),false)
}};
aipo.webmail.insertData=function(){dojo.byId("to").value=aipo.webmail.getStringLine(dojo.byId("detail_to_recipients").options);
dojo.byId("cc").value=aipo.webmail.getStringLine(dojo.byId("detail_cc_recipients").options);
dojo.byId("bcc").value=aipo.webmail.getStringLine(dojo.byId("detail_bcc_recipients").options);
dijit.byId("addressbookDialog").hide()
};
aipo.webmail.switchTypeCompany=function(B){if(B.value=="1"){dojo.byId("Block_Internal_Group").style.display="block";
dojo.byId("Block_External_Group").style.display="none";
dojo.byId("userDiv").style.display="block";
dojo.byId("addrDiv").style.display="none"
}else{dojo.byId("Block_Internal_Group").style.display="none";
dojo.byId("Block_External_Group").style.display="block";
dojo.byId("userDiv").style.display="none";
dojo.byId("addrDiv").style.display="block"
}};
aipo.webmail.changeInternalGroup=function(C,D){aipo.webmail.createSelect("internal_member_from","userDiv",C+"?mode=group&groupname="+D+"&inc_luser=true","aliasName","email","","",'size="12" multiple="multiple" style="width: 99%"',"addresslist-indicator")
};
aipo.webmail.changeExternalGroup=function(C,D){aipo.webmail.createSelect("external_member_from","addrDiv",C+"?mode=group&groupname="+D+"&inc_luser=true","fullName","email","","",'size="12" multiple="multiple" style="width: 99%"',"addresslist-indicator")
};
aipo.webmail.createSelect=function(O,S,N,T,P,M,K,R,L){var Q=dojo.byId(L);
if(Q){dojo.style(Q,"display","")
}dojo.xhrGet({url:N,timeout:10000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(C,B){var A="";
if(typeof R=="undefined"){A+='<select name="'+O+'">'
}else{A+='<select name="'+O+'" '+R+"/>"
}if(typeof K=="undefined"){A+=""
}else{A+=K
}dojo.forEach(C,function(D){if(typeof D[T]=="undefined"||typeof D[P]=="undefined"){}else{if(D[T]==M){A+="<option value='"+D[T]+"' selected='selected'>"+D[P]+"</option>"
}else{A+="<option value='"+D[T]+"&lt;"+D[P]+"&gt;'>"+D[T]+"&lt;"+D[P]+"&gt;</option>"
}}});
A+="</select>";
dojo.byId(S).innerHTML=A;
if(Q){dojo.style(Q,"display","none")
}}})
};
aipo.webmail.sendForm=function(){aipo.webmail.selectAll(document.WebMailAddressbook.detail_to_recipients);
aipo.webmail.selectAll(document.WebMailAddressbook.detail_cc_recipients);
aipo.webmail.selectAll(document.WebMailAddressbook.detail_bcc_recipients);
document.WebMailAddressbook.submit()
};
aipo.webmail.getStringLine=function(D){var E="";
if(D.length>0){var F=D.length-1;
for(i=0;
i<F;
i++){E=E+D[i].value+","
}E=E+D[F].value
}return E
};
aipo.webmail.selectAll=function(C){var D=C.options;
for(i=0;
i<D.length;
i++){D[i].selected=true
}};
aipo.webmail.exAddMember=function(E,D,F){if(dojo.byId("corpId"+F).checked==true){add_member(E.internal_member_from,D)
}else{add_member(E.external_member_from,D)
}};
aipo.webmail.removeAll=function(C){if(document.all){var D=C.options;
for(i=0;
i<D.length;
i++){D.remove(i);
i-=1
}}else{var D=C.options;
for(i=0;
i<D.length;
i++){C.removeChild(D[i]);
i-=1
}}};
aipo.webmail.ltrim=function(B){while(B.charAt(0)==" "||B.charAt(0)=="　"){B=B.substring(1,B.length)
}return(B)
};
aipo.webmail.rtrim=function(B){while(B.charAt(B.length-1)==" "||B.charAt(B.length-1)=="　"){B=B.substring(0,B.length-1)
}return(B)
};
aipo.webmail.trim=function(B){return aipo.webmail.ltrim(aipo.webmail.rtrim(B))
};
aipo.webmail.filter_order_submit=function(E){var D=E.filter_so.options;
var F="";
for(i=0;
i<D.length;
i++){D[i].selected=false
}if(D.length>0){for(i=0;
i<D.length-1;
i++){F=F+D[i].value+","
}F=F+D[D.length-1].value
}E.positions.value=F
};
aipo.webmail.action=function(E,D){var F=dojo.byId(D+"_action").value;
aimluck.io.openDialog(E,F,D,aipo.webmail.onLoadMailDialog)
};