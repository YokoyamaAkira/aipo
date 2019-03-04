dojo.require("aipo.widget.MemberNormalSelectList");
dojo.provide("aipo.msgboard");
aipo.msgboard.toggleMenu=function(F,E,D){var C=E.getBoundingClientRect();
var B=document.documentElement.getBoundingClientRect();
if(F.style.display=="none"){dojo.query("div.menubar").style("display","none");
var A={left:document.documentElement.scrollLeft||document.body.scrollLeft,top:document.documentElement.scrollTop||document.body.scrollTop};
F.style.opacity="0";
F.style.display="block";
if(B.right-F.clientWidth>C.left){F.style.left=C.left+A.left+"px"
}else{F.style.left=C.right-F.clientWidth+A.left+"px"
}if(B.bottom-F.clientHeight>C.bottom){F.style.top=C.bottom+A.top+"px"
}else{F.style.top=C.top-F.clientHeight+A.top+"px"
}F.style.opacity=""
}else{dojo.query("div.menubar").style("display","none")
}};
aipo.msgboard.initFilterSearch=function(B){var C=dojo.byId("q"+B);
var A=dojo.byId("filters_"+B);
if(A&&C){C.style.paddingLeft=A.offsetWidth+"px"
}};
aipo.msgboard.filteredSearch=function(D){var A=dojo.byId("baseuri_"+D).value;
var C=[];
var F=[];
dojo.query("ul.filtertype_"+D,dojo.byId("searchForm_"+D)).forEach(function(H){var I=H.getAttribute("data-type");
C.push(I);
var G=dojo.query("li.selected",H)[0];
if(G){var J=G.getAttribute("data-param");
F.push(J)
}else{F.push(H.getAttribute("data-defaultparam"))
}});
var E=dojo.byId("q"+D);
var B=E?encodeURIComponent(E.value):"";
A+="&filter="+F.join(",");
A+="&filtertype="+C.join(",");
A+="&keyword="+B;
aipo.viewPage(A,D)
};
aipo.msgboard.filterSetDefault=function(E,D){var C=dojo.query("ul.filtertype[data-type="+D+"]",dojo.byId("searchForm_"+E))[0];
var B=C.getAttribute("data-defaultparam");
var A=dojo.query("li[data-param="+B+"]",C);
aipo.msgboard.filterSelect(C,A);
aipo.msgboard.filteredSearch(E)
};
aipo.msgboard.filterSelect=function(B,A){dojo.query("li",B).removeClass("selected");
dojo.query(A).addClass("selected")
};
aipo.msgboard.filterClick=function(D,E,C){var A=E.parentNode;
var B=A.parentNode;
var F=A.getAttribute("data-param");
aipo.msgboard.filterSelect(B,A);
aipo.msgboard.filteredSearch(D)
};
aipo.msgboard.onLoadMsgboardDetail=function(A){aipo.portletReload("whatsnew")
};
aipo.msgboard.onLoadMsgboardDialog=function(A){var B=dojo.byId("topic_name");
if(B){B.focus()
}};
aipo.msgboard.onChangeFilter=aipo.msgboard.onChangeSearch=function(A,C){var B=encodeURIComponent(dojo.byId("q").value);
A+="?template=MsgboardTopicListScreen";
A+="&filter="+dojo.byId("topic").value;
A+="&filtertype=category";
A+="&search="+B;
aipo.viewPage(A,C)
};
aipo.msgboard.onLoadCategoryDialog=function(E){var F=dojo.byId("category_name");
if(F){F.focus()
}var C=dijit.byId("membernormalselect");
if(C){var A=dojo.byId("init_memberlist");
var D;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(D=0;
D<B.length;
D++){C.addOptionSync(B[D].value,B[D].text,true)
}}};
aipo.msgboard.showMember=function(A){dojo.byId("Block-GroupMember-Show").style.display="";
dojo.byId("is_member").value="TRUE"
};
aipo.msgboard.hideMember=function(A){dojo.byId("Block-GroupMember-Show").style.display="none";
dojo.byId("member_to").options.length=0;
dojo.byId("is_member").value="FALSE"
};
aipo.msgboard.expandImageWidth=function(A){var B=A.className;
if(!B.match(/width_auto/i)){A.className=A.className.replace(/\bwidth_thumbs\b/g,"width_auto")
}else{A.className=A.className.replace(/\bwidth_auto\b/g,"width_thumbs")
}};
aipo.msgboard.formSwitchCategoryInput=function(A){if(A.form.is_new_category.value=="TRUE"||A.form.is_new_category.value=="true"){A.value=aimluck.io.escapeText("msgboard_val_switch1");
aipo.msgboard.formCategoryInputOff(A.form)
}else{A.value=aimluck.io.escapeText("msgboard_val_switch2");
aipo.msgboard.formCategoryInputOn(A.form)
}};
aipo.msgboard.formCategoryInputOn=function(A){dojo.byId("msgboardCategorySelectField").style.display="none";
dojo.byId("msgboardCategoryInputField").style.display="";
A.is_new_category.value="TRUE"
};
aipo.msgboard.formCategoryInputOff=function(A){dojo.byId("msgboardCategoryInputField").style.display="none";
dojo.byId("msgboardCategorySelectField").style.display="";
A.is_new_category.value="FALSE"
};
aipo.msgboard.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("msgboard");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.msgboard.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("msgboard")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};
aipo.msgboard.ajaxCheckboxDeleteSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aipo.msgboard.ajaxMultiDeleteSubmit,B,A,C,D,E)
};
aipo.msgboard.ajaxMultiDeleteSubmit=function(B,A,C,D,E){if(confirm("選択した"+B.form._name.value+"を削除してよろしいですか？なお、カテゴリに含まれるトピックはすべて削除されます。")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aipo.msgboard.ajaxDeleteSubmit=function(B,A,C,D,E){if(confirm("この"+B.form._name.value+"を削除してよろしいですか？なお、カテゴリに含まれるトピックはすべて削除されます。")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};