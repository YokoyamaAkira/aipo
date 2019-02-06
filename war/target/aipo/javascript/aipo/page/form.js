dojo.provide("aipo.page");
aipo.page.onLoadPageDialog=function(C){var D=dojo.byId("page_title");
if(D){D.focus()
}};
aipo.page.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}location.href=location
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};