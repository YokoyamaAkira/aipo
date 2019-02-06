dojo.provide("aipo.timecard");
dojo.require("aimluck.widget.Contentpane");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.timecard.onLoadTimecardDialog=function(C){var D=dojo.byId("reason");
if(D){D.focus()
}};
aipo.timecard.formSwitchCategoryInput=function(B){if(B.form.is_new_category.value=="TRUE"||B.form.is_new_category.value=="true"){B.value="新しく入力する";
aipo.timecard.formCategoryInputOff(B.form)
}else{B.value="一覧から選択する";
aipo.timecard.formCategoryInputOn(B.form)
}};
aipo.timecard.formCategoryInputOn=function(B){dojo.html.setDisplay(dojo.byId("timecardCategorySelectField"),false);
dojo.html.setDisplay(dojo.byId("timecardCategoryInputField"),true);
B.is_new_category.value="TRUE"
};
aipo.timecard.formCategoryInputOff=function(B){dojo.html.setDisplay(dojo.byId("timecardCategoryInputField"),false);
dojo.html.setDisplay(dojo.byId("timecardCategorySelectField"),true);
B.is_new_category.value="FALSE"
};
aipo.timecard.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("timecard")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.timecard.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("timecard")
}if(dojo.byId("timecardmessageDiv")){dojo.byId("timecardmessageDiv").innerHTML=D
}};