dojo.provide("aipo.account_company");
dojo.require("aipo.widget.MemberNormalSelectList");
aipo.account_company.onLoadPostDialog=function(H){var J=dijit.byId("membernormalselect");
if(J){var L=J;
var G=dojo.byId("init_memberlist");
var I;
var K=G.options;
if(K.length==1&&K[0].value==""){return 
}for(I=0;
I<K.length;
I++){L.addOptionSync(K[I].value,K[I].text,true)
}dojo.byId("post_name").focus()
}};
aipo.account_company.onLoadPositionDialog=function(C){var D=dojo.byId("position_name");
if(D){D.focus()
}};
aipo.account_company.onLoadCompanyDialog=function(C){var D=dojo.byId("company_name");
if(D){D.focus()
}};
aipo.account_company.onLoadPasswdDialog=function(C){var D=dojo.byId("new_passwd");
if(D){D.focus()
}};
aipo.account_company.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("account_company")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};