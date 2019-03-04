dojo.provide("aipo.workflow_route");
dojo.require("aipo.workflow.MemberNormalSelectList");
dojo.require("dijit.form.ComboBox");
aipo.workflow_route.onLoadWorkflowRouteDialog=function(E){var C=dijit.byId("membernormalselect");
if(C){var A=dojo.byId("init_memberlist");
var D;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(D=0;
D<B.length;
D++){C.addOptionSync(B[D].value,B[D].text,true)
}}var F=dojo.byId("route_name");
if(F){F.focus()
}};
aipo.workflow_route.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("workflow_route")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.workflow_route.submit_list=function(C){var A=C.member_to.options;
var B="";
for(i=0;
i<A.length;
i++){A[i].selected=false
}if(A.length>0){for(i=0;
i<A.length-1;
i++){B=B+A[i].value+","
}B=B+A[A.length-1].value
}C.positions.value=B
};