dojo.provide("aipo.fileupload");
aipo.fileupload.getFolderName=function(){var B=dojo.byId("folderName")
};
aipo.fileupload.onAddFileInfo=function(F,G,I,J){var H=dojo.byId("attachments_"+J);
if(H.nodeName.toLowerCase()=="ul"){aimluck.io.addFileToList(H,G,I)
}else{aimluck.io.addOption(H,G,I,false)
}dojo.byId("folderName_"+J).value=F
};
aipo.fileupload.replaceFileInfo=function(F,G,I,J){var H=dojo.byId("attachments_"+J);
if(H.nodeName.toLowerCase()=="ul"){aimluck.io.replaceFileToList(H,G,I)
}else{aimluck.io.addOption(H,G,I,false)
}dojo.byId("folderName_"+J).value=F
};
aipo.fileupload.openAttachment=function(N,S){var T=430;
var K=130;
var P=(screen.width-T)/2;
var Q=(screen.height-K)/2;
var R=dojo.byId("attachments_"+S);
if(R.nodeName.toLowerCase()=="ul"){var O=R.children.length
}else{var O=R.options.length;
if(O==1&&R.options[0].value==""){O=0
}}var L=dojo.byId("folderName_"+S).value;
var M=window.open(N+"&nsize="+O+"&folderName="+L,"attachment_window","left="+P+",top="+Q+",width="+T+",height="+K+",resizable=yes,status=yes");
M.focus()
};
aipo.fileupload.ImageDialog;
aipo.fileupload.showImageDialog=function(E,G,F){var H=dojo.byId("imageDialog");
dojo.query("#imageDialog").addClass("preLoadImage");
aipo.fileupload.ImageDialog=dijit.byId("imageDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#imageDialog").addClass("mb_dialog");
if(!aipo.fileupload.ImageDialog){aipo.fileupload.ImageDialog=new aipo.fileupload.widget.FileuploadViewDialog({widgetId:"imageDialog",_portlet_id:G,_callback:F},"imageDialog")
}else{aipo.fileupload.ImageDialog.setCallback(G,F)
}if(aipo.fileupload.ImageDialog){aipo.fileupload.ImageDialog.setHref(E);
aipo.fileupload.ImageDialog.show()
}};
aipo.fileupload.hideImageDialog=function(){var B=dijit.byId("imageDialog");
if(B){B.hide()
}};
aipo.fileupload.onLoadImage=function(D){var C=dojo.byId("imageDialog");
C.style.width=D.width+"px";
C.style.height=D.height+"px";
aipo.fileupload.ImageDialog._position();
dojo.query("#imageDialog").removeClass("preLoadImage")
};
aipo.fileupload.removeFileFromList=function(E,D,F){dojo.style("facephoto_"+F,"display","none");
return E.removeChild(D)
};