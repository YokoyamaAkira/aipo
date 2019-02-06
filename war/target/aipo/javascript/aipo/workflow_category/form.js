dojo.provide("aipo.workflow_category");
aipo.workflow_category.onLoadWorkflowCategoryDialog=function(C){var D=dojo.byId("category_name");
if(D){D.focus()
}};
aipo.workflow_category.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("workflow_category")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.workflow_category.onChangeSelecter=function(J,K,L,G,H){dojo.byId(H).checked=false;
var I=new Array();
I.named="workflow_"+G;
aimluck.io.sendRawData(K+"&value="+L,L,aipo.workflow_category.setTemplate,I);
return false
};
aipo.workflow_category.setTemplate=function(array,rtnData){var cStartIdx=rtnData.type.indexOf("/*");
var cEndIdx=rtnData.type.lastIndexOf("*/");
var rawData=dojo.eval(rtnData.type.substring(cStartIdx+2,cEndIdx));
var jsonData="";
if(dojo.isArray(rawData)&&rawData.length>0){jsonData=rawData[0]
}if(jsonData!=""){dojo.byId(array.named).style.display=""
}else{dojo.byId(array.named).style.display="none"
}dojo.byId(array.named).value=jsonData
};