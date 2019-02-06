dojo.provide("aipo.account_user");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.account_user.onLoadUserDialog=function(I){var J=dijit.byId("groupnormalselect");
if(J){var G=dojo.byId("init_grouplist");
var K;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(K=0;
K<L.length;
K++){J.addOptionSync(L[K].value,L[K].text,true)
}}var H=dojo.byId("username");
if(H&&H.type=="text"){H.focus()
}};
aipo.account_user.formSwitchPostInput=function(B){if(B.form.is_new_post.value=="TRUE"||B.form.is_new_post.value=="true"){B.value="新しく入力する";
aipo.account_user.formPostInputOff(B.form)
}else{B.value="一覧から選択する";
aipo.account_user.formPostInputOn(B.form)
}};
aipo.account_user.formPostInputOn=function(B){dojo.byId("postSelectField").style.display="none";
dojo.byId("postInputField").style.display="";
B.is_new_post.value="TRUE"
};
aipo.account_user.formPostInputOff=function(B){dojo.byId("postInputField").style.display="none";
dojo.byId("postSelectField").style.display="";
B.is_new_post.value="FALSE"
};
aipo.account_user.formSwitchPositionInput=function(B){if(B.form.is_new_position.value=="TRUE"||B.form.is_new_position.value=="true"){B.value="新しく入力する";
aipo.account_user.formPositionInputOff(B.form)
}else{B.value="一覧から選択する";
aipo.account_user.formPositionInputOn(B.form)
}};
aipo.account_user.formPositionInputOn=function(B){dojo.byId("positionSelectField").style.display="none";
dojo.byId("positionInputField").style.display="";
B.is_new_position.value="TRUE"
};
aipo.account_user.formPositionInputOff=function(B){dojo.byId("positionInputField").style.display="none";
dojo.byId("positionSelectField").style.display="";
B.is_new_position.value="FALSE"
};
aipo.account_user.formAdminToggle=function(B){dojo.byId("is_admin").value=B.checked?"true":"false"
};
aipo.account_user.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("account_user")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.account_user.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("account_user")
}if(dojo.byId("listMessageDiv")){dojo.byId("listMessageDiv").innerHTML=D
}};
aipo.account_user.submit2=function(E){var D=E.member_so.options;
var F="";
for(i=0;
i<D.length;
i++){D[i].selected=false
}if(D.length>0){for(i=0;
i<D.length-1;
i++){F=F+D[i].value+","
}F=F+D[D.length-1].value
}E.positions.value=F
};