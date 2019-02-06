dojo.provide("aipo.note");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.note.afterFunction=function(B){aipo.note.onLoadNoteDialog(B)
};
aipo.note.onLoadDetail=function(B){aipo.portletReload("whatsnew")
};
aipo.note.onLoadNoteDialog=function(F){var E=dojo.byId("urlUserlist"+F).value;
var D=dojo.byId("urlDstUser"+F).value;
if(E){aipo.note.changeGroup(E,"LoginUser",D)
}};
aipo.note.formSwitchCategoryInput=function(B){if(B.form.is_new_category.value=="TRUE"||B.form.is_new_category.value=="true"){B.value="新しく入力する";
aipo.note.formCategoryInputOff(B.form)
}else{B.value="一覧から選択する";
aipo.note.formCategoryInputOn(B.form)
}};
aipo.note.formCategoryInputOn=function(B){dojo.byId("noteCategorySelectField").style.display="none";
dojo.byId("noteCategoryInputField").style.display="";
B.is_new_category.value="TRUE"
};
aipo.note.formCategoryInputOff=function(B){dojo.byId("noteCategoryInputField").style.display="none";
dojo.byId("noteCategorySelectField").style.display="";
B.is_new_category.value="FALSE"
};
aipo.note.changeGroup=function(J,G,H){var I=aimluck.io.escapeText("note_val_destuser1");
var F=aimluck.io.escapeText("note_val_destuser2");
aimluck.utils.form.createSelect("dest_user_id","destuserDiv",J+"?mode=group&groupname="+G+"&inc_luser=false","userId","aliasName",H,'<option value="">'+I+'</option><option value="all">'+F+"</option>",'class="w49"')
};
aipo.note.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("note");
aipo.portletReload("whatsnew")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.note.oncheck0=function(B){chk=dojo.byId(B);
chk.checked=true;
return 
};
aipo.note.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("note")
};
aipo.note.onSubmitFilter=function(D,E){var F=encodeURIComponent(dojo.byId("q").value);
D+="?template=NoteListScreen";
D+="&search="+F;
aipo.viewPage(D,E)
};