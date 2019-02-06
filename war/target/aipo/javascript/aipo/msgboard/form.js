dojo.require("aipo.widget.MemberNormalSelectList");
dojo.provide("aipo.msgboard");
aipo.msgboard.toggleMenu=function(H,I,J){var K=I.getBoundingClientRect();
var L=document.documentElement.getBoundingClientRect();
if(H.style.display=="none"){dojo.query("div.menubar").style("display","none");
var G={left:document.documentElement.scrollLeft||document.body.scrollLeft,top:document.documentElement.scrollTop||document.body.scrollTop};
H.style.opacity="0";
H.style.display="block";
if(L.right-H.clientWidth>K.left){H.style.left=K.left+G.left+"px"
}else{H.style.left=K.right-H.clientWidth+G.left+"px"
}if(L.bottom-H.clientHeight>K.bottom){H.style.top=K.bottom+G.top+"px"
}else{H.style.top=K.top-H.clientHeight+G.top+"px"
}H.style.opacity=""
}else{dojo.query("div.menubar").style("display","none")
}};
aipo.msgboard.initFilterSearch=function(F){var E=dojo.byId("q"+F);
var D=dojo.byId("filters_"+F);
if(D&&E){E.style.paddingLeft=D.offsetWidth+"px"
}};
aipo.msgboard.filteredSearch=function(J){var G=dojo.byId("baseuri_"+J).value;
var K=[];
var H=[];
dojo.query("ul.filtertype_"+J,dojo.byId("searchForm_"+J)).forEach(function(C){var B=C.getAttribute("data-type");
K.push(B);
var D=dojo.query("li.selected",C)[0];
if(D){var A=D.getAttribute("data-param");
H.push(A)
}else{H.push(C.getAttribute("data-defaultparam"))
}});
var I=dojo.byId("q"+J);
var L=I?encodeURIComponent(I.value):"";
G+="&filter="+H.join(",");
G+="&filtertype="+K.join(",");
G+="&keyword="+L;
aipo.viewPage(G,J)
};
aipo.msgboard.filterSetDefault=function(G,H){var I=dojo.query("ul.filtertype[data-type="+H+"]",dojo.byId("searchForm_"+G))[0];
var J=I.getAttribute("data-defaultparam");
var F=dojo.query("li[data-param="+J+"]",I);
aipo.msgboard.filterSelect(I,F);
aipo.msgboard.filteredSearch(G)
};
aipo.msgboard.filterSelect=function(D,C){dojo.query("li",D).removeClass("selected");
dojo.query(C).addClass("selected")
};
aipo.msgboard.filterClick=function(J,I,K){var G=I.parentNode;
var L=G.parentNode;
var H=G.getAttribute("data-param");
aipo.msgboard.filterSelect(L,G);
aipo.msgboard.filteredSearch(J)
};
aipo.msgboard.onLoadMsgboardDetail=function(B){aipo.portletReload("whatsnew")
};
aipo.msgboard.onLoadMsgboardDialog=function(C){var D=dojo.byId("topic_name");
if(D){D.focus()
}};
aipo.msgboard.onChangeFilter=aipo.msgboard.onChangeSearch=function(D,E){var F=encodeURIComponent(dojo.byId("q").value);
D+="?template=MsgboardTopicListScreen";
D+="&filter="+dojo.byId("topic").value;
D+="&filtertype=category";
D+="&search="+F;
aipo.viewPage(D,E)
};
aipo.msgboard.onLoadCategoryDialog=function(I){var H=dojo.byId("category_name");
if(H){H.focus()
}var K=dijit.byId("membernormalselect");
if(K){var G=dojo.byId("init_memberlist");
var J;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(J=0;
J<L.length;
J++){K.addOptionSync(L[J].value,L[J].text,true)
}}};
aipo.msgboard.showMember=function(B){dojo.byId("Block-GroupMember-Show").style.display="";
dojo.byId("is_member").value="TRUE"
};
aipo.msgboard.hideMember=function(B){dojo.byId("Block-GroupMember-Show").style.display="none";
dojo.byId("member_to").options.length=0;
dojo.byId("is_member").value="FALSE"
};
aipo.msgboard.expandImageWidth=function(C){var D=C.className;
if(!D.match(/width_auto/i)){C.className=C.className.replace(/\bwidth_thumbs\b/g,"width_auto")
}else{C.className=C.className.replace(/\bwidth_auto\b/g,"width_thumbs")
}};
aipo.msgboard.formSwitchCategoryInput=function(B){if(B.form.is_new_category.value=="TRUE"||B.form.is_new_category.value=="true"){B.value=aimluck.io.escapeText("msgboard_val_switch1");
aipo.msgboard.formCategoryInputOff(B.form)
}else{B.value=aimluck.io.escapeText("msgboard_val_switch2");
aipo.msgboard.formCategoryInputOn(B.form)
}};
aipo.msgboard.formCategoryInputOn=function(B){dojo.byId("msgboardCategorySelectField").style.display="none";
dojo.byId("msgboardCategoryInputField").style.display="";
B.is_new_category.value="TRUE"
};
aipo.msgboard.formCategoryInputOff=function(B){dojo.byId("msgboardCategoryInputField").style.display="none";
dojo.byId("msgboardCategorySelectField").style.display="";
B.is_new_category.value="FALSE"
};
aipo.msgboard.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("msgboard");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.msgboard.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("msgboard")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};
aipo.msgboard.ajaxCheckboxDeleteSubmit=function(J,F,I,H,G){aimluck.io.ajaxVerifyCheckbox(J.form,aipo.msgboard.ajaxMultiDeleteSubmit,J,F,I,H,G)
};
aipo.msgboard.ajaxMultiDeleteSubmit=function(J,F,I,H,G){if(confirm("選択した"+J.form._name.value+"を削除してよろしいですか？なお、カテゴリに含まれるトピックはすべて削除されます。")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aipo.msgboard.ajaxDeleteSubmit=function(J,F,I,H,G){if(confirm("この"+J.form._name.value+"を削除してよろしいですか？なお、カテゴリに含まれるトピックはすべて削除されます。")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};