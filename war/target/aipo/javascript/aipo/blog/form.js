dojo.provide("aipo.blog");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.blog.onLoadBlogDialog=function(C){var D=dojo.byId("title");
if(D){D.focus()
}};
aipo.blog.onLoadBlogThemaDialog=function(C){var D=dojo.byId("thema_name");
if(D){D.focus()
}};
aipo.blog.onLoadBlogDetailDialog=function(B){aipo.portletReload("whatsnew")
};
aipo.blog.onLoadBlogCommentDialog=function(C){var D=dojo.byId("comment");
if(D){D.focus()
}aipo.portletReload("whatsnew")
};
aipo.blog.expandImageWidth=function(C){var D=C.className;
if(!D.match(/width_auto/i)){C.className=C.className.replace(/\bwidth_thumbs\b/g,"width_auto")
}else{C.className=C.className.replace(/\bwidth_auto\b/g,"width_thumbs")
}};
aipo.blog.ExpandImage=function(L){var M=new Image();
M.src=L;
var J=M.width;
if(screen.width<M.width){J=screen.width
}var K=M.height;
if(screen.height<M.height){K=screen.height
}var H=(screen.width-J)/2;
var I=(screen.height-K)/2;
var N=window.open("image","_blank","left=+x+","top=+y+","width=+imwidth+","height=+imheight+","scrollbars=yes","resizable=yes");
N.window.document.open();
N.window.document.write("<html><head><title>"+M.alt+'</title></head><body style="margin:0;padding:0;border:0;"><img src="'+M.src+'" width="100%" alt="" /></body></html>');
N.window.document.close()
};
aipo.blog.formSwitchThemaInput=function(B){if(B.form.is_new_thema.value=="TRUE"||B.form.is_new_thema.value=="true"){B.value=aimluck.io.escapeText("blog_val_switch1");
aipo.blog.formThemaInputOff(B.form)
}else{B.value=aimluck.io.escapeText("blog_val_switch2");
aipo.blog.formThemaInputOn(B.form)
}};
aipo.blog.formThemaInputOn=function(B){dojo.byId("blogThemaSelectField").style.display="none";
dojo.byId("blogThemaInputField").style.display="";
B.is_new_thema.value="TRUE"
};
aipo.blog.formThemaInputOff=function(B){dojo.byId("blogThemaInputField").style.display="none";
dojo.byId("blogThemaSelectField").style.display="";
B.is_new_thema.value="FALSE"
};
aipo.blog.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("blog");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.blog.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("blog")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};
aipo.blog.onSubmitSerchButton=function(I,F,G){var H=F;
var J=[["sword",I.sword.value]];
aipo.viewPage(H,G,J);
if(I.sword.value==""){return false
}aipo.viewPage(H,G)
};
aipo.blog.delCommentReply=function(L,H,K,I){var J=aimluck.io.escapeText("blog_val_confirm1");
if(confirm(J)){disableButton(L.form);
var G=L.form.action+"&mode=commentdel&"+L.name+"=1&comment_id="+H;
aimluck.io.disableForm(L.form,true);
aimluck.io.setHiddenValue(L);
L.form.action=G;
aimluck.io.submit(L.form,K,I,aipo.blog.onReceiveMessage)
}};
aipo.blog.delBlogEntry=function(J,I,G){var H=aimluck.io.escapeText("blog_val_confirm2");
if(confirm(H)){disableButton(J.form);
var F=J.form.action+"&mode=delete&"+J.name+"=1";
aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,G,aipo.blog.onReceiveMessage)
}};