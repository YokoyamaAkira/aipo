dojo.provide("aipo.gadgets_admin");
dojo.provide("aipo.gadgets_admin.form");
aipo.gadgets_admin.onLoadDialog=function(A){};
aipo.gadgets_admin.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("gadgets_admin")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.gadgets_admin.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("gadgets_admin")
};
aipo.gadgets_admin.ajaxCheckboxDeleteSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aipo.gadgets_admin.ajaxMultiDeleteSubmit,B,A,C,D,E)
};
aipo.gadgets_admin.ajaxMultiDeleteSubmit=function(B,A,C,D,E){if(confirm("選択したアプリをアンインストールしてよろしいでしょうか？")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aipo.gadgets_admin.ajaxDeleteSubmit=function(B,A,C,D,E){if(confirm("このアプリをアンインストールしてよろしいでしょうか？")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aipo.gadgets_admin.onReceiveMessageUpdate=function(C){var D=dojo.byId("caution_update");
if(D){D.innerHTML=""
}var A=dojo.byId("caution_default");
if(A){A.innerHTML=""
}var B=dojo.byId("caution_all_user");
if(B){B.innerHTML=""
}if(dojo.byId("caution_"+Mode)){dojo.byId("caution_"+Mode).innerHTML=!C?"更新が完了しました。":"設定に失敗しました。時間をおいてから再度試してください。";
aimluck.io.disableForm(form,false)
}};
var Mode="";
var form;
aipo.gadgets_admin.beforeSubmit=function(A,B,C){dojo.byId(B+"-mode").value=C;
form=A.form;
Mode=C
};
aipo.gadgets_admin.submit=function(C,A,B,D){if(Mode=="timeline"||Mode=="schedule"||Mode=="all_user"){aimluck.io.submit(C,A,B,D)
}};