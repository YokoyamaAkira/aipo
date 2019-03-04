dojo.provide("aipo.blog");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.blog.onLoadBlogDialog=function(A){var B=dojo.byId("title");
if(B){B.focus()
}};
aipo.blog.onLoadBlogThemaDialog=function(A){var B=dojo.byId("thema_name");
if(B){B.focus()
}};
aipo.blog.onLoadBlogDetailDialog=function(A){aipo.portletReload("whatsnew")
};
aipo.blog.onLoadBlogCommentDialog=function(A){var B=dojo.byId("comment");
if(B){B.focus()
}aipo.portletReload("whatsnew")
};
aipo.blog.expandImageWidth=function(A){var B=A.className;
if(!B.match(/width_auto/i)){A.className=A.className.replace(/\bwidth_thumbs\b/g,"width_auto")
}else{A.className=A.className.replace(/\bwidth_auto\b/g,"width_thumbs")
}};
aipo.blog.ExpandImage=function(D){var C=new Image();
C.src=D;
var F=C.width;
if(screen.width<C.width){F=screen.width
}var E=C.height;
if(screen.height<C.height){E=screen.height
}var A=(screen.width-F)/2;
var G=(screen.height-E)/2;
var B=window.open("image","_blank","left=+x+","top=+y+","width=+imwidth+","height=+imheight+","scrollbars=yes","resizable=yes");
B.window.document.open();
B.window.document.write("<html><head><title>"+C.alt+'</title></head><body style="margin:0;padding:0;border:0;"><img src="'+C.src+'" width="100%" alt="" /></body></html>');
B.window.document.close()
};
aipo.blog.formSwitchThemaInput=function(A){if(A.form.is_new_thema.value=="TRUE"||A.form.is_new_thema.value=="true"){A.value=aimluck.io.escapeText("blog_val_switch1");
aipo.blog.formThemaInputOff(A.form)
}else{A.value=aimluck.io.escapeText("blog_val_switch2");
aipo.blog.formThemaInputOn(A.form)
}};
aipo.blog.formThemaInputOn=function(A){dojo.byId("blogThemaSelectField").style.display="none";
dojo.byId("blogThemaInputField").style.display="";
A.is_new_thema.value="TRUE"
};
aipo.blog.formThemaInputOff=function(A){dojo.byId("blogThemaInputField").style.display="none";
dojo.byId("blogThemaSelectField").style.display="";
A.is_new_thema.value="FALSE"
};
aipo.blog.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("blog");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.blog.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("blog")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};
aipo.blog.onSubmitSerchButton=function(C,A,E){var D=A;
var B=[["sword",C.sword.value]];
aipo.viewPage(D,E,B);
if(C.sword.value==""){return false
}aipo.viewPage(D,E)
};
aipo.blog.delCommentReply=function(B,F,C,E){var D=aimluck.io.escapeText("blog_val_confirm1");
if(confirm(D)){disableButton(B.form);
var A=B.form.action+"&mode=commentdel&"+B.name+"=1&comment_id="+F;
aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,E,aipo.blog.onReceiveMessage)
}};
aipo.blog.delBlogEntry=function(B,C,E){var D=aimluck.io.escapeText("blog_val_confirm2");
if(confirm(D)){disableButton(B.form);
var A=B.form.action+"&mode=delete&"+B.name+"=1";
aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,E,aipo.blog.onReceiveMessage)
}};