dojo._xdResourceLoaded({depends:[["provide","aipo.common"]],defineResource:function(A){if(!A._hasResource["aipo.common"]){A._hasResource["aipo.common"]=true;
A.provide("aipo.common");
aipo.common.showDialog=function(B,D,E){var C=dijit.byId("modalDialog");
A.query(".roundBlockContent").addClass("mb_dialoghide");
A.query("#modalDialog").addClass("mb_dialog");
if(!C){C=new aimluck.widget.Dialog({widgetId:"modalDialog",_portlet_id:D,_callback:E},"modalDialog")
}else{C.setCallback(D,E)
}if(C){C.setHref(B);
C.show()
}};
aipo.common.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}}
}}});