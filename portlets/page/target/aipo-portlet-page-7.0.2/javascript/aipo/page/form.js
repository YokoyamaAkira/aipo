dojo.provide("aipo.page");
aipo.page.onLoadPageDialog=function(A){var B=dojo.byId("page_title");
if(B){B.focus()
}};
aipo.page.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}location.href=location
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};