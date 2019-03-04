dojo.provide("aipo.mygroup");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.mygroup.onLoadMygroupDialog=function(F){var C=dijit.byId("membernormalselect");
if(C){var A=dojo.byId("init_memberlist");
var D;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(D=0;
D<B.length;
D++){C.addOptionSync(B[D].value,B[D].text,true)
}}var E=dijit.byId("facilityselect");
if(E){var A=dojo.byId("init_facilitylist");
var D;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(D=0;
D<B.length;
D++){E.addOptionSync(B[D].value,B[D].text,true)
}}dojo.byId("group_alias_name").focus()
};
aipo.mygroup.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("mygroup")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};