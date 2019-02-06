dojo.provide("aipo.report");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("dijit.form.ComboBox");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.report.onLoadReportDetail=function(B){aipo.portletReload("report");
aipo.portletReload("whatsnew")
};
aipo.report.onLoadReportDialog=function(J){var M=dijit.byId("membernormalselect");
if(M){var H=dojo.byId("init_memberlist");
var K;
var N=H.options;
if(N.length==1&&N[0].value==""){return 
}for(K=0;
K<N.length;
K++){M.addOptionSync(N[K].value,N[K].text,true)
}}var M=dijit.byId("mapnormalselect");
if(M){var H=dojo.byId("init_maplist");
var K;
var N=H.options;
if(N.length==1&&N[0].value==""){return 
}for(K=0;
K<N.length;
K++){M.addOptionSync(N[K].value,N[K].text,true)
}}var I=dojo.byId("button_member_add");
if(I){dojo.connect(I,"onclick",function(){aipo.report.expandMember()
})
}var I=dojo.byId("button_map_add");
if(I){dojo.connect(I,"onclick",function(){aipo.report.expandMap()
})
}var L=dojo.byId("button_member_remove");
if(L){dojo.connect(L,"onclick",function(){var B=dojo.byId("members");
if(B.options.length==0){if((M)&&(aipo.report.login_aliasname!="undefined")){var A=aipo.report.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
M.addOptionSync(aipo.report.login_name,A,true)
}}aipo.report.expandMember()
})
}var L=dojo.byId("button_map_remove");
if(L){dojo.connect(L,"onclick",function(){var B=dojo.byId("positions");
if(B.options.length==0){if((M)&&(aipo.report.login_aliasname!="undefined")){var A=aipo.report.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
M.addOptionSync(aipo.report.login_name,A,true)
}}aipo.report.expandMap()
})
}aipo.report.shrinkMember();
aipo.report.expandMap()
};
aipo.report.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("report");
aipo.portletReload("whatsnew");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.report.shrinkMember=function(){var K=dojo.byId("memberFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var G=dojo.byId("members");
if(G){var H=G.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member1")+'" onclick="aipo.report.expandMember();" />';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var L=dojo.byId("memberField");
if(L){dojo.style(L,"display","none")
}};
aipo.report.shrinkMap=function(){var K=dojo.byId("mapFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var G=dojo.byId("positions");
if(G){var H=G.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member2")+'" onclick="aipo.report.expandMap();" />';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var L=dojo.byId("mapField");
if(L){dojo.style(L,"display","none")
}};
aipo.report.expandMember=function(){var K=dojo.byId("memberFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var G=dojo.byId("members");
if(G){var H=G.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member3")+'" onclick="aipo.report.shrinkMember();" />';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var L=dojo.byId("memberField");
if(L){dojo.style(L,"display","block")
}};
aipo.report.expandMap=function(){var K=dojo.byId("mapFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var G=dojo.byId("positions");
if(G){var H=G.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var L=dojo.byId("mapField");
if(L){dojo.style(L,"display","block")
}};
aipo.report.formatNum=function(D){var E=new String(D);
var F=2-E.length;
if(F<=0){return E
}while(F-->0){E="0"+E
}return E
};
aipo.report.delaySelectAllOptions=function(D,C){return function(A){aimluck.io.selectAllOptions(A.attachments)
}
};