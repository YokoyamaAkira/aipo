dojo.provide("aipo.memo");
aipo.memo.onLoadMemoDialog=function(A){dojo.byId("memo_name").focus()
};
aipo.memo.formSwitchCategoryInput=function(A){if(A.form.is_new_category.value=="TRUE"||A.form.is_new_category.value=="true"){A.value="新しく入力する";
aipo.memo.formCategoryInputOff(A.form)
}else{A.value="一覧から選択する";
aipo.memo.formCategoryInputOn(A.form)
}};
aipo.memo.formCategoryInputOn=function(A){dojo.byId("memoCategorySelectField").style.display="none";
dojo.byId("memoCategoryInputField").style.display="";
A.is_new_category.value="TRUE"
};
aipo.memo.formCategoryInputOff=function(A){dojo.byId("memoCategoryInputField").style.display="none";
dojo.byId("memoCategorySelectField").style.display="";
A.is_new_category.value="FALSE"
};
aipo.memo.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(!!A){A.hide()
}aipo.portletReload("memo")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.memo.onReceiveMessageUpdate=function(C){if(!C){var A=dijit.byId("modalDialog");
if(!!A){A.hide()
}aipo.portletReload("memo")
}var B=dojo.query(".messageDiv_memo.enabled");
if(B.length>=1){B[0].innerHTML=C
}};
aipo.memo.enableMessageDiv=function(A){dojo.query(".messageDiv_memo").forEach(function(D,C,B){dojo.removeClass(D,"enabled")
});
dojo.addClass("memo_"+A,"enabled")
};