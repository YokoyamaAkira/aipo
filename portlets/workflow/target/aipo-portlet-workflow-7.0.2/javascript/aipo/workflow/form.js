dojo.provide("aipo.workflow");
var before=0;
aipo.workflow.onLoadWorkflowDetail=function(A){aipo.portletReload("whatsnew")
};
aipo.workflow.onLoadWorkflowDialog=function(F){var D=dijit.byId("membernormalselect");
if(D){var B=D;
var A=dojo.byId("init_memberlist");
var E;
var C=A.options;
if(C.length==1&&C[0].value==""){return 
}for(E=0;
E<C.length;
E++){B.addOptionSync(C[E].value,C[E].text,true)
}}var G=dojo.byId("route_name");
if(G){G.focus()
}if(dojo.byId("mode_"+F).value=="insert"){dojo.byId("category_id").onchange()
}};
aipo.workflow.onChangeSelecter=function(D,C,B,A,F){dojo.byId(F).checked=false;
var E=new Array();
E.named="workflow_"+A;
aimluck.io.sendRawData(C+"&value="+B,B,aipo.workflow.setTemplate,E);
return false
};
aipo.workflow.setTemplate=function(H,C){var E=aipo.workflow.getJsonDataOne(C);
var A=E.route_h;
var B=E.route;
var G=B.split(",");
var F=(G.length-1)/2;
if(B==null||B==""){dojo.byId(H.named).style.display="none"
}else{dojo.byId(H.named).style.display=""
}if(B==null||B==""){dojo.byId(H.named).innerHTML=""
}else{dojo.byId(H.named).innerHTML=A
}memberFrom=dojo.byId("tmp_member_from");
memberFromOpts=memberFrom.options;
for(i=0;
i<memberFromOpts.length;
i++){memberFromOpts[i].selected=false
}memberTo=dojo.byId("positions");
while(memberTo.lastChild){memberTo.removeChild(memberTo.lastChild)
}var D;
for(i=0;
i<F;
i++){memberTo.options[i]=new Option(G[2*i+1],G[2*i])
}};
aipo.workflow.categoryOnChangeSelecter=function(F,E,D,C,H,B,A){if(aipo.workflow.NoteChangeConfirm(H)){before=dojo.byId("category_id").selectedIndex;
dojo.byId(H).checked=false;
var G=new Array();
G.named="workflow_"+C;
G.namedRoute="workflow_"+B;
G.selectRoute=A;
aimluck.io.sendRawData(E+"&value="+D,D,aipo.workflow.categorySetTemplate,G)
}else{dojo.byId("category_id").selectedIndex=before
}return false
};
aipo.workflow.categorySetTemplate=function(D,E){var G=aipo.workflow.getJsonDataOne(E);
var J=G.template;
var F=G.route_id.toString();
var H=G.route_h;
var I=G.route;
var B=I.split(",");
var C=(B.length-1)/2;
if(H==null||H==""){dojo.byId(D.namedRoute).style.display="none"
}else{dojo.byId(D.namedRoute).style.display=""
}if(null!=J){dojo.byId(D.named).value=J
}else{dojo.byId(D.named).value=""
}dojo.byId(D.namedRoute).value="";
var L=dojo.byId(D.selectRoute);
var K=L.options;
K[0].selected=true;
if(!(F.match(/[^0-9]/g)||parseInt(F,10)+""!=F)){for(i=0;
i<L.length;
i++){if(K[i].value==F){K[i].selected=true
}}dojo.byId(D.namedRoute).value=H;
dojo.byId("is_saved_route_button").value=aimluck.io.escapeText("workflow_val_route1");
dojo.byId("workflowRouteSelectField").style.display="";
dojo.byId("workflowRouteInputField").style.display="none";
dojo.byId("is_saved_route").value="TRUE";
memberTo=dojo.byId("positions");
while(memberTo.lastChild){memberTo.removeChild(memberTo.lastChild)
}memberFrom=dojo.byId("tmp_member_from");
memberFromOpts=memberFrom.options;
for(i=0;
i<memberFromOpts.length;
i++){memberFromOpts[i].selected=false
}memberTo=dojo.byId("positions");
var A;
for(i=0;
i<C;
i++){memberTo.options[i]=new Option(B[2*i+1],B[2*i])
}}};
aipo.workflow.onFocusComment=function(A){};
aipo.workflow.onChangeNote=function(){dojo.byId("isChangedNote").checked=true
};
aipo.workflow.NoteChangeConfirm=function(A){if(dojo.byId(A).checked){if(!confirm(aimluck.io.escapeText("workflow_val_confirm1"))){return false
}}return true
};
aipo.workflow.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("workflow");
aipo.portletReload("whatsnew");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.workflow.onAccept=function(A){dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(C){dojo.removeClass(C,"auiButtonAction")
});
dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(C){dojo.addClass(C,"auiButtonDisabled")
});
var B=dojo.byId("workflowForm"+A);
aipo.workflow._portletId=A;
B.mode.value="accept"
};
aipo.workflow.onDenial=function(A){dojo.query(".auiButtonAction").forEach(function(C){dojo.removeClass(C,"auiButtonAction")
});
dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(C){dojo.addClass(C,"auiButtonDisabled")
});
var B=dojo.byId("workflowForm"+A);
aipo.workflow._portletId=A;
B.mode.value="denial"
};
aipo.workflow.onDelete=function(A){var B=dojo.byId("workflowForm"+A);
aipo.workflow._portletId=A;
B.mode.value="delete"
};
aipo.workflow.submit_list=function(C){var A=C.member_to.options;
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
aipo.workflow.formSwitchRouteSelect=function(A){if(A.form.is_saved_route.value=="TRUE"||A.form.is_saved_route.value=="true"){A.value=aimluck.io.escapeText("workflow_val_route2");
aipo.workflow.formRouteSelectOff(A.form)
}else{A.value=aimluck.io.escapeText("workflow_val_route1");
aipo.workflow.formRouteSelectOn(A.form)
}};
aipo.workflow.formRouteSelectOn=function(A){dojo.byId("workflowRouteSelectField").style.display="";
dojo.byId("workflowRouteInputField").style.display="none";
A.is_saved_route.value="TRUE"
};
aipo.workflow.formRouteSelectOff=function(A){dojo.byId("workflowRouteSelectField").style.display="none";
dojo.byId("workflowRouteInputField").style.display="";
A.is_saved_route.value="FALSE"
};
aipo.workflow.getJsonDataOne=function(rtnData){var cStartIdx=rtnData.type.indexOf("/*");
var cEndIdx=rtnData.type.lastIndexOf("*/");
var rawData=dojo.eval(rtnData.type.substring(cStartIdx+2,cEndIdx));
var jsonData="";
if(dojo.isArray(rawData)&&rawData.length>0){jsonData=rawData[0]
}return jsonData
};
aipo.workflow.onChangeFilter=aipo.workflow.onChangeSearch=function(A,C){var B=encodeURIComponent(dojo.byId("q").value);
A+="?template=WorkflowListScreen";
A+="&filter="+dojo.byId("topic").value;
A+="&filtertype=category";
A+="&search="+B;
aipo.viewPage(A,C)
};