dojo.require("aipo.widget.MemberNormalSelectList");
dojo.provide("aipo.cabinet");
aipo.cabinet.onLoadCabinetFileDialog=function(A){var B=dojo.byId("file_title");
if(B){B.focus()
}};
aipo.cabinet.onLoadCabinetFolderDialog=function(B){var F=dojo.byId("folder_name");
if(F){F.focus()
}var D=dijit.byId("membernormalselect");
if(D){var A=dojo.byId("init_memberlist");
var E;
var C=A.options;
if(C.length==1&&C[0].value==""){return 
}for(E=0;
E<C.length;
E++){D.addOptionSync(C[E].value,C[E].text,true)
}}};
aipo.cabinet.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("cabinet");
aipo.portletReload("schedule");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.cabinet.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("cabinet")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};
aipo.cabinet.onSubmitSerchButton=function(C,A,E){var D=A;
var B=[["sword",C.sword.value]];
aipo.viewPage(D,E,B)
};
aipo.cabinet.viewpageByFolderId=function(A,C,B){A=A+"&folder_id="+B;
aipo.viewPage(A,C)
};
aipo.cabinet.ajaxDeleteSubmit=function(B,A,C,D,E){if(confirm("この"+B.form._name.value+"を削除してよろしいですか？なお、フォルダに含まれるファイルやフォルダはすべて削除されます。")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aipo.cabinet.showMember=function(A){dojo.byId("Block-GroupMember-Show").style.display="";
dojo.byId("is_member").value="TRUE"
};
aipo.cabinet.hideMember=function(A){dojo.byId("Block-GroupMember-Show").style.display="none";
dojo.byId("member_to").options.length=0;
dojo.byId("is_member").value="FALSE"
};