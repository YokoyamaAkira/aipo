dojo.provide("aipo.addressbook");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.addressbook.onLoadAddressbookDialog=function(I){var J=dijit.byId("groupnormalselect");
if(J){var G=dojo.byId("init_grouplist");
var K;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(K=0;
K<L.length;
K++){J.addOptionSync(L[K].value,L[K].text,true)
}}var H=dojo.byId("lastname");
if(H){H.focus()
}};
aipo.addressbook.onLoadAddressbookCompanyDialog=function(C){var D=dojo.byId("company_name");
if(D){D.focus()
}};
aipo.addressbook.onLoadAddressbookGroupDialog=function(I){var K=dijit.byId("membernormalselect");
if(K){var G=dojo.byId("init_memberlist");
var J;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(J=0;
J<L.length;
J++){K.addOptionSync(L[J].value,L[J].text,true)
}}var H=dojo.byId("group_name");
if(H){H.focus()
}};
aipo.addressbook.formSwitchCompanyInput=function(B){if(B.form.is_new_company.value=="TRUE"||B.form.is_new_company.value=="true"){B.value=aimluck.io.escapeText("addressbook_val_switch1");
aipo.addressbook.formCompanyInputOff(B.form)
}else{B.value=aimluck.io.escapeText("addressbook_val_switch2");
aipo.addressbook.formCompanyInputOn(B.form)
}};
aipo.addressbook.formCompanyInputOn=function(B){dojo.byId("AddressBookCompanySelectField").style.display="none";
dojo.byId("AddressBookCompanyInputField").style.display="";
B.is_new_company.value="TRUE"
};
aipo.addressbook.formCompanyInputOff=function(B){dojo.byId("AddressBookCompanyInputField").style.display="none";
dojo.byId("AddressBookCompanySelectField").style.display="";
B.is_new_company.value="FALSE"
};
aipo.addressbook.onSubmitSerchButton=function(L,I,M,N,O){var J=dojo.byId(O+M);
if(J){dojo.style(J,"display","")
}var K=I;
if(N==""){if(L.tab!=undefined){if(L.tab[0].checked){N=L.tab[0].value
}else{N=L.tab[1].value
}}}var P=[["sword",L.sword.value],["tab",N],["mode",L.mode.value]];
aipo.viewPage(K,M,P)
};
aipo.addressbook.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("addressbook")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.addressbook.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("addressbook")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};