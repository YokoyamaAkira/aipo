dojo.provide("aipo.common");
aipo.common.showDialog=function(A,C,D){var B=dijit.byId("modalDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#modalDialog").addClass("mb_dialog");
if(!B){B=new aimluck.widget.Dialog({widgetId:"modalDialog",_portlet_id:C,_callback:D},"modalDialog")
}else{B.setCallback(C,D)
}if(B){B.setHref(A);
B.show()
}};
aipo.common.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}};
aipo.common.showDialogSub=function(B,C,E){var A=dijit.byId("modalDialog");
var D=window.navigator.userAgent.toLowerCase();
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
if(!A){A=new aimluck.widget.DialogSub({widgetId:"modalDialog",_portlet_id:C,_callback:E,templateString:"<div id='modalDialogSub' class='modalDialogSub' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>"},"modalDialog")
}else{A.setCallback(C,E)
}if(A){A.setHref(B);
A.show()
}};
aipo.common.hideDialogSub=function(){dijit.byId("modalDialog").hide()
};
aipo.common.customizeDialog=function(){if(dojo.byId("data-activecustomizeurl")!=undefined&&dojo.byId("data-activecustomizeurl")!=""){var A=dojo.byId("data-activecustomizeurl").value;
aipo.common.showDialog(A)
}};