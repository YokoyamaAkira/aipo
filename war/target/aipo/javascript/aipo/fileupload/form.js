dojo.provide("aipo.fileupload");
aipo.fileupload.getFolderName=function(){var A=dojo.byId("folderName")
};
aipo.fileupload.onAddFileInfo=function(A,E,C,B){var D=dojo.byId("attachments_"+B);
if(D.nodeName.toLowerCase()=="ul"){aimluck.io.addFileToList(D,E,C)
}else{aimluck.io.addOption(D,E,C,false)
}dojo.byId("folderName_"+B).value=A
};
aipo.fileupload.replaceFileInfo=function(A,E,C,B){var D=dojo.byId("attachments_"+B);
if(D.nodeName.toLowerCase()=="ul"){aimluck.io.replaceFileToList(D,E,C)
}else{aimluck.io.addOption(D,E,C,false)
}dojo.byId("folderName_"+B).value=A
};
aipo.fileupload.openAttachment=function(A,F){var E=430;
var D=130;
var I=(screen.width-E)/2;
var H=(screen.height-D)/2;
var G=dojo.byId("attachments_"+F);
if(G.nodeName.toLowerCase()=="ul"){var J=G.children.length
}else{var J=G.options.length;
if(J==1&&G.options[0].value==""){J=0
}}var C=dojo.byId("folderName_"+F).value;
var B=window.open(A+"&nsize="+J+"&folderName="+C,"attachment_window","left="+I+",top="+H+",width="+E+",height="+D+",resizable=yes,status=yes");
B.focus()
};
aipo.fileupload.ImageDialog;
aipo.fileupload.showImageDialog=function(A,C,D){var B=dojo.byId("imageDialog");
dojo.query("#imageDialog").addClass("preLoadImage");
aipo.fileupload.ImageDialog=dijit.byId("imageDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#imageDialog").addClass("mb_dialog");
if(!aipo.fileupload.ImageDialog){aipo.fileupload.ImageDialog=new aipo.fileupload.widget.FileuploadViewDialog({widgetId:"imageDialog",_portlet_id:C,_callback:D},"imageDialog")
}else{aipo.fileupload.ImageDialog.setCallback(C,D)
}if(aipo.fileupload.ImageDialog){aipo.fileupload.ImageDialog.setHref(A);
aipo.fileupload.ImageDialog.show()
}};
aipo.fileupload.hideImageDialog=function(){var A=dijit.byId("imageDialog");
if(A){A.hide()
}};
aipo.fileupload.onLoadImage=function(B){var A=dojo.byId("imageDialog");
A.style.width=B.width+"px";
A.style.height=B.height+"px";
aipo.fileupload.ImageDialog._position();
dojo.query("#imageDialog").removeClass("preLoadImage")
};
aipo.fileupload.removeFileFromList=function(C,A,B){dojo.style("facephoto_"+B,"display","none");
return C.removeChild(A)
};