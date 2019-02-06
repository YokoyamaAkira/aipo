dojo.provide("aipo.workflow");
var before=0;
aipo.workflow.onLoadWorkflowDetail=function(B){aipo.portletReload("whatsnew")
};
aipo.workflow.onLoadWorkflowDialog=function(J){var L=dijit.byId("membernormalselect");
if(L){var N=L;
var H=dojo.byId("init_memberlist");
var K;
var M=H.options;
if(M.length==1&&M[0].value==""){return 
}for(K=0;
K<M.length;
K++){N.addOptionSync(M[K].value,M[K].text,true)
}}var I=dojo.byId("route_name");
if(I){I.focus()
}if(dojo.byId("mode_"+J).value=="insert"){dojo.byId("category_id").onchange()
}};
aipo.workflow.onChangeSelecter=function(J,K,L,G,H){dojo.byId(H).checked=false;
var I=new Array();
I.named="workflow_"+G;
aimluck.io.sendRawData(K+"&value="+L,L,aipo.workflow.setTemplate,I);
return false
};
aipo.workflow.setTemplate=function(J,O){var M=aipo.workflow.getJsonDataOne(O);
var I=M.route_h;
var P=M.route;
var K=P.split(",");
var L=(K.length-1)/2;
if(P==null||P==""){dojo.byId(J.named).style.display="none"
}else{dojo.byId(J.named).style.display=""
}if(P==null||P==""){dojo.byId(J.named).innerHTML=""
}else{dojo.byId(J.named).innerHTML=I
}memberFrom=dojo.byId("tmp_member_from");
memberFromOpts=memberFrom.options;
for(i=0;
i<memberFromOpts.length;
i++){memberFromOpts[i].selected=false
}memberTo=dojo.byId("positions");
while(memberTo.lastChild){memberTo.removeChild(memberTo.lastChild)
}var N;
for(i=0;
i<L;
i++){memberTo.options[i]=new Option(K[2*i+1],K[2*i])
}};
aipo.workflow.categoryOnChangeSelecter=function(L,M,N,O,J,P,I){if(aipo.workflow.NoteChangeConfirm(J)){before=dojo.byId("category_id").selectedIndex;
dojo.byId(J).checked=false;
var K=new Array();
K.named="workflow_"+O;
K.namedRoute="workflow_"+P;
K.selectRoute=I;
aimluck.io.sendRawData(M+"&value="+N,N,aipo.workflow.categorySetTemplate,K)
}else{dojo.byId("category_id").selectedIndex=before
}return false
};
aipo.workflow.categorySetTemplate=function(M,X){var V=aipo.workflow.getJsonDataOne(X);
var S=V.template;
var W=V.route_id.toString();
var U=V.route_h;
var T=V.route;
var O=T.split(",");
var N=(O.length-1)/2;
if(U==null||U==""){dojo.byId(M.namedRoute).style.display="none"
}else{dojo.byId(M.namedRoute).style.display=""
}if(null!=S){dojo.byId(M.named).value=S
}else{dojo.byId(M.named).value=""
}dojo.byId(M.namedRoute).value="";
var Q=dojo.byId(M.selectRoute);
var R=Q.options;
R[0].selected=true;
if(!(W.match(/[^0-9]/g)||parseInt(W,10)+""!=W)){for(i=0;
i<Q.length;
i++){if(R[i].value==W){R[i].selected=true
}}dojo.byId(M.namedRoute).value=U;
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
var P;
for(i=0;
i<N;
i++){memberTo.options[i]=new Option(O[2*i+1],O[2*i])
}}};
aipo.workflow.onFocusComment=function(B){};
aipo.workflow.onChangeNote=function(){dojo.byId("isChangedNote").checked=true
};
aipo.workflow.NoteChangeConfirm=function(B){if(dojo.byId(B).checked){if(!confirm(aimluck.io.escapeText("workflow_val_confirm1"))){return false
}}return true
};
aipo.workflow.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("workflow");
aipo.portletReload("whatsnew");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.workflow.onAccept=function(C){dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(A){dojo.removeClass(A,"auiButtonAction")
});
dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(A){dojo.addClass(A,"auiButtonDisabled")
});
var D=dojo.byId("workflowForm"+C);
aipo.workflow._portletId=C;
D.mode.value="accept"
};
aipo.workflow.onDenial=function(C){dojo.query(".auiButtonAction").forEach(function(A){dojo.removeClass(A,"auiButtonAction")
});
dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(A){dojo.addClass(A,"auiButtonDisabled")
});
var D=dojo.byId("workflowForm"+C);
aipo.workflow._portletId=C;
D.mode.value="denial"
};
aipo.workflow.onDelete=function(C){var D=dojo.byId("workflowForm"+C);
aipo.workflow._portletId=C;
D.mode.value="delete"
};
aipo.workflow.submit_list=function(E){var D=E.member_to.options;
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
aipo.workflow.formSwitchRouteSelect=function(B){if(B.form.is_saved_route.value=="TRUE"||B.form.is_saved_route.value=="true"){B.value=aimluck.io.escapeText("workflow_val_route2");
aipo.workflow.formRouteSelectOff(B.form)
}else{B.value=aimluck.io.escapeText("workflow_val_route1");
aipo.workflow.formRouteSelectOn(B.form)
}};
aipo.workflow.formRouteSelectOn=function(B){dojo.byId("workflowRouteSelectField").style.display="";
dojo.byId("workflowRouteInputField").style.display="none";
B.is_saved_route.value="TRUE"
};
aipo.workflow.formRouteSelectOff=function(B){dojo.byId("workflowRouteSelectField").style.display="none";
dojo.byId("workflowRouteInputField").style.display="";
B.is_saved_route.value="FALSE"
};
aipo.workflow.getJsonDataOne=function(rtnData){var cStartIdx=rtnData.type.indexOf("/*");
var cEndIdx=rtnData.type.lastIndexOf("*/");
var rawData=dojo.eval(rtnData.type.substring(cStartIdx+2,cEndIdx));
var jsonData="";
if(dojo.isArray(rawData)&&rawData.length>0){jsonData=rawData[0]
}return jsonData
};
aipo.workflow.onChangeFilter=aipo.workflow.onChangeSearch=function(D,E){var F=encodeURIComponent(dojo.byId("q").value);
D+="?template=WorkflowListScreen";
D+="&filter="+dojo.byId("topic").value;
D+="&filtertype=category";
D+="&search="+F;
aipo.viewPage(D,E)
};