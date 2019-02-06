dojo.provide("aipo.gadgets_admin");
dojo.provide("aipo.gadgets_admin.form");
aipo.gadgets_admin.onLoadDialog=function(B){};
aipo.gadgets_admin.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("gadgets_admin")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.gadgets_admin.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("gadgets_admin")
};
aipo.gadgets_admin.ajaxCheckboxDeleteSubmit=function(J,F,I,H,G){aimluck.io.ajaxVerifyCheckbox(J.form,aipo.gadgets_admin.ajaxMultiDeleteSubmit,J,F,I,H,G)
};
aipo.gadgets_admin.ajaxMultiDeleteSubmit=function(J,F,I,H,G){if(confirm("選択したアプリをアンインストールしてよろしいでしょうか？")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aipo.gadgets_admin.ajaxDeleteSubmit=function(J,F,I,H,G){if(confirm("このアプリをアンインストールしてよろしいでしょうか？")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aipo.gadgets_admin.onReceiveMessageUpdate=function(G){var F=dojo.byId("caution_update");
if(F){F.innerHTML=""
}var E=dojo.byId("caution_default");
if(E){E.innerHTML=""
}var H=dojo.byId("caution_all_user");
if(H){H.innerHTML=""
}if(dojo.byId("caution_"+Mode)){dojo.byId("caution_"+Mode).innerHTML=!G?"更新が完了しました。":"設定に失敗しました。時間をおいてから再度試してください。";
aimluck.io.disableForm(form,false)
}};
var Mode="";
var form;
aipo.gadgets_admin.beforeSubmit=function(D,F,E){dojo.byId(F+"-mode").value=E;
form=D.form;
Mode=E
};
aipo.gadgets_admin.submit=function(G,E,H,F){if(Mode=="timeline"||Mode=="schedule"||Mode=="all_user"){aimluck.io.submit(G,E,H,F)
}};