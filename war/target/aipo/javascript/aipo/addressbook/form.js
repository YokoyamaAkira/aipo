dojo.provide("aipo.addressbook");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.addressbook.onLoadAddressbookDialog=function(E){var D=dijit.byId("groupnormalselect");
if(D){var A=dojo.byId("init_grouplist");
var C;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(C=0;
C<B.length;
C++){D.addOptionSync(B[C].value,B[C].text,true)
}}var F=dojo.byId("lastname");
if(F){F.focus()
}};
aipo.addressbook.onLoadAddressbookCompanyDialog=function(A){var B=dojo.byId("company_name");
if(B){B.focus()
}};
aipo.addressbook.onLoadAddressbookGroupDialog=function(E){var C=dijit.byId("membernormalselect");
if(C){var A=dojo.byId("init_memberlist");
var D;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(D=0;
D<B.length;
D++){C.addOptionSync(B[D].value,B[D].text,true)
}}var F=dojo.byId("group_name");
if(F){F.focus()
}};
aipo.addressbook.formSwitchCompanyInput=function(A){if(A.form.is_new_company.value=="TRUE"||A.form.is_new_company.value=="true"){A.value=aimluck.io.escapeText("addressbook_val_switch1");
aipo.addressbook.formCompanyInputOff(A.form)
}else{A.value=aimluck.io.escapeText("addressbook_val_switch2");
aipo.addressbook.formCompanyInputOn(A.form)
}};
aipo.addressbook.formCompanyInputOn=function(A){dojo.byId("AddressBookCompanySelectField").style.display="none";
dojo.byId("AddressBookCompanyInputField").style.display="";
A.is_new_company.value="TRUE"
};
aipo.addressbook.formCompanyInputOff=function(A){dojo.byId("AddressBookCompanyInputField").style.display="none";
dojo.byId("AddressBookCompanySelectField").style.display="";
A.is_new_company.value="FALSE"
};
aipo.addressbook.onSubmitSerchButton=function(F,A,E,D,C){var H=dojo.byId(C+E);
if(H){dojo.style(H,"display","")
}var G=A;
if(D==""){if(F.tab!=undefined){if(F.tab[0].checked){D=F.tab[0].value
}else{D=F.tab[1].value
}}}var B=[["sword",F.sword.value],["tab",D],["mode",F.mode.value]];
aipo.viewPage(G,E,B)
};
aipo.addressbook.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("addressbook")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.addressbook.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("addressbook")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};