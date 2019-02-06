if(!dojo._hasResource["aipo.widget.ActivityList"]){dojo._hasResource["aipo.widget.ActivityList"]=true;
dojo.provide("aipo.widget.ActivityList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("aimluck.widget.Contentpane");
dojo.declare("aipo.widget.ActivityList",[dijit._Widget,dijit._Templated],{widgetId:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}" style="width: 420px;"><div class="activityPopup"><div class="clearfix"><div id="activityListPane" widgetId="activityListPane"></div></div></div></div>\n',postCreate:function(){},reload:function(){var A=dijit.byId("activityListPane");
if(!A){A=new aimluck.widget.Contentpane({},"activityListPane")
}if(window.webkitNotifications){A.viewPage("?template=ActivityListScreen&s=1&p="+window.webkitNotifications.checkPermission())
}else{A.viewPage("?template=ActivityListScreen&s=0")
}}})
};