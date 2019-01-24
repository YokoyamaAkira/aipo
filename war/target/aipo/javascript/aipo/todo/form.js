dojo.provide("aipo.todo");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.todo.onLoadTodoDialog=function(B){var E=dojo.byId("urlUserlist"+B).value;
var C=dojo.byId("loginUser"+B).value;
var A=dojo.byId("todoUser"+B).value;
if(A==0){A=C
}if(E){aipo.todo.changeGroup(E,"LoginUser",A)
}var D=dojo.byId("todo_name");
if(D){D.focus()
}};
aipo.todo.onLoadCategoryDialog=function(A){var B=dojo.byId("category_name");
if(B){B.focus()
}};
aipo.todo.formSwitchCategoryInput=function(A){if(A.form.is_new_category.value=="TRUE"||A.form.is_new_category.value=="true"){A.value=aimluck.io.escapeText("todo_val_switch1");
aipo.todo.formCategoryInputOff(A.form)
}else{A.value=aimluck.io.escapeText("todo_val_switch2");
aipo.todo.formCategoryInputOn(A.form)
}};
aipo.todo.formCategoryInputOn=function(A){dojo.byId("todoCategorySelectField").style.display="none";
dojo.byId("todoCategoryInputField").style.display="";
A.is_new_category.value="TRUE"
};
aipo.todo.formCategoryInputOff=function(A){dojo.byId("todoCategoryInputField").style.display="none";
dojo.byId("todoCategorySelectField").style.display="";
A.is_new_category.value="FALSE"
};
aipo.todo.changeGroup=function(A,C,B){aimluck.utils.form.createSelect("user_id","destuserDiv",A+"?mode=group&groupname="+C+"&inc_luser=true","userId","aliasName",B,"",'class="w49"')
};
aipo.todo.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("todo");
aipo.portletReload("schedule");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.todo.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("todo");
aipo.portletReload("schedule")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};
aipo.todo.doKeywordSearch=function(A,B){var C=new Array(2);
C[0]=["template","ToDoListScreen"];
C[1]=["keyword",dojo.byId("q"+B).value];
aipo.viewPage(A,B,C)
};