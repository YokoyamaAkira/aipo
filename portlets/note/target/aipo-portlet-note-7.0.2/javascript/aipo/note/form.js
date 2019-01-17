dojo.provide("aipo.note");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.note.afterFunction=function(A){aipo.note.onLoadNoteDialog(A)
};
aipo.note.onLoadDetail=function(A){aipo.portletReload("whatsnew")
};
aipo.note.onLoadNoteDialog=function(B){var C=dojo.byId("urlUserlist"+B).value;
var A=dojo.byId("urlDstUser"+B).value;
if(C){aipo.note.changeGroup(C,"LoginUser",A)
}};
aipo.note.formSwitchCategoryInput=function(A){if(A.form.is_new_category.value=="TRUE"||A.form.is_new_category.value=="true"){A.value="新しく入力する";
aipo.note.formCategoryInputOff(A.form)
}else{A.value="一覧から選択する";
aipo.note.formCategoryInputOn(A.form)
}};
aipo.note.formCategoryInputOn=function(A){dojo.byId("noteCategorySelectField").style.display="none";
dojo.byId("noteCategoryInputField").style.display="";
A.is_new_category.value="TRUE"
};
aipo.note.formCategoryInputOff=function(A){dojo.byId("noteCategoryInputField").style.display="none";
dojo.byId("noteCategorySelectField").style.display="";
A.is_new_category.value="FALSE"
};
aipo.note.changeGroup=function(B,E,D){var C=aimluck.io.escapeText("note_val_destuser1");
var A=aimluck.io.escapeText("note_val_destuser2");
aimluck.utils.form.createSelect("dest_user_id","destuserDiv",B+"?mode=group&groupname="+E+"&inc_luser=false","userId","aliasName",D,'<option value="">'+C+'</option><option value="all">'+A+"</option>",'class="w49"')
};
aipo.note.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("note");
aipo.portletReload("whatsnew")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.note.oncheck0=function(A){chk=dojo.byId(A);
chk.checked=true;
return 
};
aipo.note.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("note")
};
aipo.note.onSubmitFilter=function(A,C){var B=encodeURIComponent(dojo.byId("q").value);
A+="?template=NoteListScreen";
A+="&search="+B;
aipo.viewPage(A,C)
};