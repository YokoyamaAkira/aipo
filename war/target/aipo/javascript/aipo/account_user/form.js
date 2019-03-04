dojo.provide("aipo.account_user");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.account_user.onLoadUserDialog=function(E){var D=dijit.byId("groupnormalselect");
if(D){var A=dojo.byId("init_grouplist");
var C;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(C=0;
C<B.length;
C++){D.addOptionSync(B[C].value,B[C].text,true)
}}var F=dojo.byId("username");
if(F&&F.type=="text"){F.focus()
}};
aipo.account_user.formSwitchPostInput=function(A){if(A.form.is_new_post.value=="TRUE"||A.form.is_new_post.value=="true"){A.value="新しく入力する";
aipo.account_user.formPostInputOff(A.form)
}else{A.value="一覧から選択する";
aipo.account_user.formPostInputOn(A.form)
}};
aipo.account_user.formPostInputOn=function(A){dojo.byId("postSelectField").style.display="none";
dojo.byId("postInputField").style.display="";
A.is_new_post.value="TRUE"
};
aipo.account_user.formPostInputOff=function(A){dojo.byId("postInputField").style.display="none";
dojo.byId("postSelectField").style.display="";
A.is_new_post.value="FALSE"
};
aipo.account_user.formSwitchPositionInput=function(A){if(A.form.is_new_position.value=="TRUE"||A.form.is_new_position.value=="true"){A.value="新しく入力する";
aipo.account_user.formPositionInputOff(A.form)
}else{A.value="一覧から選択する";
aipo.account_user.formPositionInputOn(A.form)
}};
aipo.account_user.formPositionInputOn=function(A){dojo.byId("positionSelectField").style.display="none";
dojo.byId("positionInputField").style.display="";
A.is_new_position.value="TRUE"
};
aipo.account_user.formPositionInputOff=function(A){dojo.byId("positionInputField").style.display="none";
dojo.byId("positionSelectField").style.display="";
A.is_new_position.value="FALSE"
};
aipo.account_user.formAdminToggle=function(A){dojo.byId("is_admin").value=A.checked?"true":"false"
};
aipo.account_user.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("account_user")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.account_user.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("account_user")
}if(dojo.byId("listMessageDiv")){dojo.byId("listMessageDiv").innerHTML=B
}};
aipo.account_user.submit2=function(C){var A=C.member_so.options;
var B="";
for(i=0;
i<A.length;
i++){A[i].selected=false
}if(A.length>0){for(i=0;
i<A.length-1;
i++){B=B+A[i].value+","
}B=B+A[A.length-1].value
}C.positions.value=B
};