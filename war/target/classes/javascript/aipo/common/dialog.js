dojo.provide("aipo.common");
aipo.common.showDialog=function(D,B,C){var A=dijit.byId("modalDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#modalDialog").addClass("mb_dialog");
if(!A){A=new aimluck.widget.Dialog({widgetId:"modalDialog",_portlet_id:B,_callback:C},"modalDialog")
}else{A.setCallback(B,C)
}if(A){A.setHref(D);
A.show()
}};
aipo.common.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}};
aipo.common.showDialogSub=function(A,B,D){var E=dijit.byId("modalDialog");
var C=window.navigator.userAgent.toLowerCase();
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
if(!E){E=new aimluck.widget.DialogSub({widgetId:"modalDialog",_portlet_id:B,_callback:D,templateString:"<div id='modalDialogSub' class='modalDialogSub' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>"},"modalDialog")
}else{E.setCallback(B,D)
}if(E){E.setHref(A);
E.show()
}};
aipo.common.hideDialogSub=function(){dijit.byId("modalDialog").hide()
};
aipo.common.customizeDialog=function(){if(dojo.byId("data-activecustomizeurl")!=undefined&&dojo.byId("data-activecustomizeurl")!=""){var A=dojo.byId("data-activecustomizeurl").value;
aipo.common.showDialog(A)
}};