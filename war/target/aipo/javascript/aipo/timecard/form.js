dojo.provide("aipo.timecard");
dojo.require("aimluck.widget.Contentpane");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.timecard.onLoadTimecardDialog=function(A){var B=dojo.byId("reason");
if(B){B.focus()
}};
aipo.timecard.formSwitchCategoryInput=function(A){if(A.form.is_new_category.value=="TRUE"||A.form.is_new_category.value=="true"){A.value="新しく入力する";
aipo.timecard.formCategoryInputOff(A.form)
}else{A.value="一覧から選択する";
aipo.timecard.formCategoryInputOn(A.form)
}};
aipo.timecard.formCategoryInputOn=function(A){dojo.html.setDisplay(dojo.byId("timecardCategorySelectField"),false);
dojo.html.setDisplay(dojo.byId("timecardCategoryInputField"),true);
A.is_new_category.value="TRUE"
};
aipo.timecard.formCategoryInputOff=function(A){dojo.html.setDisplay(dojo.byId("timecardCategoryInputField"),false);
dojo.html.setDisplay(dojo.byId("timecardCategorySelectField"),true);
A.is_new_category.value="FALSE"
};
aipo.timecard.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("timecard")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.timecard.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("timecard")
}if(dojo.byId("timecardmessageDiv")){dojo.byId("timecardmessageDiv").innerHTML=B
}};