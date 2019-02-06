dojo.require("aipo.widget.MemberNormalSelectList");
dojo.provide("aipo.cabinet");
aipo.cabinet.onLoadCabinetFileDialog=function(C){var D=dojo.byId("file_title");
if(D){D.focus()
}};
aipo.cabinet.onLoadCabinetFolderDialog=function(L){var H=dojo.byId("folder_name");
if(H){H.focus()
}var J=dijit.byId("membernormalselect");
if(J){var G=dojo.byId("init_memberlist");
var I;
var K=G.options;
if(K.length==1&&K[0].value==""){return 
}for(I=0;
I<K.length;
I++){J.addOptionSync(K[I].value,K[I].text,true)
}}};
aipo.cabinet.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("cabinet");
aipo.portletReload("schedule");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.cabinet.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("cabinet")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};
aipo.cabinet.onSubmitSerchButton=function(I,F,G){var H=F;
var J=[["sword",I.sword.value]];
aipo.viewPage(H,G,J)
};
aipo.cabinet.viewpageByFolderId=function(D,E,F){D=D+"&folder_id="+F;
aipo.viewPage(D,E)
};
aipo.cabinet.ajaxDeleteSubmit=function(J,F,I,H,G){if(confirm("この"+J.form._name.value+"を削除してよろしいですか？なお、フォルダに含まれるファイルやフォルダはすべて削除されます。")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aipo.cabinet.showMember=function(B){dojo.byId("Block-GroupMember-Show").style.display="";
dojo.byId("is_member").value="TRUE"
};
aipo.cabinet.hideMember=function(B){dojo.byId("Block-GroupMember-Show").style.display="none";
dojo.byId("member_to").options.length=0;
dojo.byId("is_member").value="FALSE"
};