dojo.provide("aipo.report");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("dijit.form.ComboBox");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.report.onLoadReportDetail=function(A){aipo.portletReload("report");
aipo.portletReload("whatsnew")
};
aipo.report.onLoadReportDialog=function(F){var C=dijit.byId("membernormalselect");
if(C){var A=dojo.byId("init_memberlist");
var E;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(E=0;
E<B.length;
E++){C.addOptionSync(B[E].value,B[E].text,true)
}}var C=dijit.byId("mapnormalselect");
if(C){var A=dojo.byId("init_maplist");
var E;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(E=0;
E<B.length;
E++){C.addOptionSync(B[E].value,B[E].text,true)
}}var G=dojo.byId("button_member_add");
if(G){dojo.connect(G,"onclick",function(){aipo.report.expandMember()
})
}var G=dojo.byId("button_map_add");
if(G){dojo.connect(G,"onclick",function(){aipo.report.expandMap()
})
}var D=dojo.byId("button_member_remove");
if(D){dojo.connect(D,"onclick",function(){var H=dojo.byId("members");
if(H.options.length==0){if((C)&&(aipo.report.login_aliasname!="undefined")){var I=aipo.report.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
C.addOptionSync(aipo.report.login_name,I,true)
}}aipo.report.expandMember()
})
}var D=dojo.byId("button_map_remove");
if(D){dojo.connect(D,"onclick",function(){var H=dojo.byId("positions");
if(H.options.length==0){if((C)&&(aipo.report.login_aliasname!="undefined")){var I=aipo.report.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
C.addOptionSync(aipo.report.login_name,I,true)
}}aipo.report.expandMap()
})
}aipo.report.shrinkMember();
aipo.report.expandMap()
};
aipo.report.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("report");
aipo.portletReload("whatsnew");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.report.shrinkMember=function(){var C=dojo.byId("memberFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var A=dojo.byId("members");
if(A){var F=A.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member1")+'" onclick="aipo.report.expandMember();" />';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var B=dojo.byId("memberField");
if(B){dojo.style(B,"display","none")
}};
aipo.report.shrinkMap=function(){var C=dojo.byId("mapFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var A=dojo.byId("positions");
if(A){var F=A.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member2")+'" onclick="aipo.report.expandMap();" />';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var B=dojo.byId("mapField");
if(B){dojo.style(B,"display","none")
}};
aipo.report.expandMember=function(){var C=dojo.byId("memberFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var A=dojo.byId("members");
if(A){var F=A.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member3")+'" onclick="aipo.report.shrinkMember();" />';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var B=dojo.byId("memberField");
if(B){dojo.style(B,"display","block")
}};
aipo.report.expandMap=function(){var C=dojo.byId("mapFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var A=dojo.byId("positions");
if(A){var F=A.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var B=dojo.byId("mapField");
if(B){dojo.style(B,"display","block")
}};
aipo.report.formatNum=function(A){var C=new String(A);
var B=2-C.length;
if(B<=0){return C
}while(B-->0){C="0"+C
}return C
};
aipo.report.delaySelectAllOptions=function(B,A){return function(C){aimluck.io.selectAllOptions(C.attachments)
}
};