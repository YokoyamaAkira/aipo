dojo.provide("aipo.todo");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.todo.onLoadTodoDialog=function(J){var G=dojo.byId("urlUserlist"+J).value;
var I=dojo.byId("loginUser"+J).value;
var F=dojo.byId("todoUser"+J).value;
if(F==0){F=I
}if(G){aipo.todo.changeGroup(G,"LoginUser",F)
}var H=dojo.byId("todo_name");
if(H){H.focus()
}};
aipo.todo.onLoadCategoryDialog=function(C){var D=dojo.byId("category_name");
if(D){D.focus()
}};
aipo.todo.formSwitchCategoryInput=function(B){if(B.form.is_new_category.value=="TRUE"||B.form.is_new_category.value=="true"){B.value=aimluck.io.escapeText("todo_val_switch1");
aipo.todo.formCategoryInputOff(B.form)
}else{B.value=aimluck.io.escapeText("todo_val_switch2");
aipo.todo.formCategoryInputOn(B.form)
}};
aipo.todo.formCategoryInputOn=function(B){dojo.byId("todoCategorySelectField").style.display="none";
dojo.byId("todoCategoryInputField").style.display="";
B.is_new_category.value="TRUE"
};
aipo.todo.formCategoryInputOff=function(B){dojo.byId("todoCategoryInputField").style.display="none";
dojo.byId("todoCategorySelectField").style.display="";
B.is_new_category.value="FALSE"
};
aipo.todo.changeGroup=function(D,E,F){aimluck.utils.form.createSelect("user_id","destuserDiv",D+"?mode=group&groupname="+E+"&inc_luser=true","userId","aliasName",F,"",'class="w49"')
};
aipo.todo.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("todo");
aipo.portletReload("schedule");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.todo.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("todo");
aipo.portletReload("schedule")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};
aipo.todo.doKeywordSearch=function(D,F){var E=new Array(2);
E[0]=["template","ToDoListScreen"];
E[1]=["keyword",dojo.byId("q"+F).value];
aipo.viewPage(D,F,E)
};