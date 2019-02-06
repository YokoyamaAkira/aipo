dojo.provide("aipo.mygroup");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.mygroup.onLoadMygroupDialog=function(H){var K=dijit.byId("membernormalselect");
if(K){var G=dojo.byId("init_memberlist");
var J;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(J=0;
J<L.length;
J++){K.addOptionSync(L[J].value,L[J].text,true)
}}var I=dijit.byId("facilityselect");
if(I){var G=dojo.byId("init_facilitylist");
var J;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(J=0;
J<L.length;
J++){I.addOptionSync(L[J].value,L[J].text,true)
}}dojo.byId("group_alias_name").focus()
};
aipo.mygroup.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("mygroup")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};