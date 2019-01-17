dojo.provide("aipo.workflow_category");
aipo.workflow_category.onLoadWorkflowCategoryDialog=function(A){var B=dojo.byId("category_name");
if(B){B.focus()
}};
aipo.workflow_category.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("workflow_category")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.workflow_category.onChangeSelecter=function(D,C,B,A,F){dojo.byId(F).checked=false;
var E=new Array();
E.named="workflow_"+A;
aimluck.io.sendRawData(C+"&value="+B,B,aipo.workflow_category.setTemplate,E);
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