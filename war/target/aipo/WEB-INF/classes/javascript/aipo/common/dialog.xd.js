dojo._xdResourceLoaded({depends:[["provide","aipo.common"]],defineResource:function(A){if(!A._hasResource["aipo.common"]){A._hasResource["aipo.common"]=true;
A.provide("aipo.common");
aipo.common.showDialog=function(C,E,B){var D=dijit.byId("modalDialog");
A.query(".roundBlockContent").addClass("mb_dialoghide");
A.query("#modalDialog").addClass("mb_dialog");
if(!D){D=new aimluck.widget.Dialog({widgetId:"modalDialog",_portlet_id:E,_callback:B},"modalDialog")
}else{D.setCallback(E,B)
}if(D){D.setHref(C);
D.show()
}};
aipo.common.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}}
}}});