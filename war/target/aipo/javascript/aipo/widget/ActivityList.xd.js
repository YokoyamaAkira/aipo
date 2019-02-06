dojo._xdResourceLoaded({depends:[["provide","aipo.widget.ActivityList"],["require","dijit._Widget"],["require","dijit._Templated"],["require","aimluck.widget.Contentpane"]],defineResource:function(A){if(!A._hasResource["aipo.widget.ActivityList"]){A._hasResource["aipo.widget.ActivityList"]=true;
A.provide("aipo.widget.ActivityList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("aimluck.widget.Contentpane");
A.declare("aipo.widget.ActivityList",[dijit._Widget,dijit._Templated],{widgetId:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><div class="activityPopup"><div class="clearfix"><div id="activityListPane" widgetId="activityListPane"></div></div></div></div>\n',postCreate:function(){},reload:function(){var B=dijit.byId("activityListPane");
if(!B){B=new aimluck.widget.Contentpane({},"activityListPane")
}if(window.webkitNotifications){B.viewPage("?template=ActivityListScreen&s=1&p="+window.webkitNotifications.checkPermission())
}else{B.viewPage("?template=ActivityListScreen&s=0")
}}})
}}});