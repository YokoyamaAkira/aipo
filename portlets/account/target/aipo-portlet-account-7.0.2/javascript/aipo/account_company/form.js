dojo.provide("aipo.account_company");
dojo.require("aipo.widget.MemberNormalSelectList");
aipo.account_company.onLoadPostDialog=function(F){var D=dijit.byId("membernormalselect");
if(D){var B=D;
var A=dojo.byId("init_memberlist");
var E;
var C=A.options;
if(C.length==1&&C[0].value==""){return 
}for(E=0;
E<C.length;
E++){B.addOptionSync(C[E].value,C[E].text,true)
}dojo.byId("post_name").focus()
}};
aipo.account_company.onLoadPositionDialog=function(A){var B=dojo.byId("position_name");
if(B){B.focus()
}};
aipo.account_company.onLoadCompanyDialog=function(A){var B=dojo.byId("company_name");
if(B){B.focus()
}};
aipo.account_company.onLoadPasswdDialog=function(A){var B=dojo.byId("new_passwd");
if(B){B.focus()
}};
aipo.account_company.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("account_company")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};