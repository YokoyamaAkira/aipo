dojo.provide("aipo.memo");
aipo.memo.onLoadMemoDialog=function(B){dojo.byId("memo_name").focus()
};
aipo.memo.formSwitchCategoryInput=function(B){if(B.form.is_new_category.value=="TRUE"||B.form.is_new_category.value=="true"){B.value="新しく入力する";
aipo.memo.formCategoryInputOff(B.form)
}else{B.value="一覧から選択する";
aipo.memo.formCategoryInputOn(B.form)
}};
aipo.memo.formCategoryInputOn=function(B){dojo.byId("memoCategorySelectField").style.display="none";
dojo.byId("memoCategoryInputField").style.display="";
B.is_new_category.value="TRUE"
};
aipo.memo.formCategoryInputOff=function(B){dojo.byId("memoCategoryInputField").style.display="none";
dojo.byId("memoCategorySelectField").style.display="";
B.is_new_category.value="FALSE"
};
aipo.memo.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(!!C){C.hide()
}aipo.portletReload("memo")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.memo.onReceiveMessageUpdate=function(E){if(!E){var D=dijit.byId("modalDialog");
if(!!D){D.hide()
}aipo.portletReload("memo")
}var F=dojo.query(".messageDiv_memo.enabled");
if(F.length>=1){F[0].innerHTML=E
}};
aipo.memo.enableMessageDiv=function(B){dojo.query(".messageDiv_memo").forEach(function(A,E,F){dojo.removeClass(A,"enabled")
});
dojo.addClass("memo_"+B,"enabled")
};