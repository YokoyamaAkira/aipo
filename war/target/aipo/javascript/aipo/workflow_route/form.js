dojo.provide("aipo.workflow_route");
dojo.require("aipo.workflow.MemberNormalSelectList");
dojo.require("dijit.form.ComboBox");
aipo.workflow_route.onLoadWorkflowRouteDialog=function(I){var K=dijit.byId("membernormalselect");
if(K){var G=dojo.byId("init_memberlist");
var J;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(J=0;
J<L.length;
J++){K.addOptionSync(L[J].value,L[J].text,true)
}}var H=dojo.byId("route_name");
if(H){H.focus()
}};
aipo.workflow_route.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("workflow_route")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.workflow_route.submit_list=function(E){var D=E.member_to.options;
var F="";
for(i=0;
i<D.length;
i++){D[i].selected=false
}if(D.length>0){for(i=0;
i<D.length-1;
i++){F=F+D[i].value+","
}F=F+D[D.length-1].value
}E.positions.value=F
};