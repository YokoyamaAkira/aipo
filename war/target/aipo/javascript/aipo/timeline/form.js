dojo.require("aipo.widget.MemberNormalSelectList");
dojo.provide("aipo.timeline");
aipo.timeline.addHiddenValue=function(B,A,D){if(B[A]&&document.getElementsByName(A).item(0)){B[A].value=D
}else{var C=document.createElement("input");
C.type="hidden";
C.name=A;
C.value=D;
B.appendChild(C)
}};
aipo.timeline.addLike=function(B,A,C){};
aipo.timeline.showCommentField=function(A,C){dojo.byId("comments_"+A+"_"+C).style.display="block";
dojo.byId("commentField_"+A+"_"+C).style.display="";
dojo.byId("note_"+A+"_"+C).focus();
dojo.byId("note_"+A+"_"+C).style.color="black";
var B=dojo.byId("commentInputDummy_"+A+"_"+C);
if(typeof B!="undefined"&&B!=null){dojo.byId("commentInputDummy_"+A+"_"+C).style.display="none"
}};
aipo.timeline.showCommentAll=function(A,B){dojo.byId("commentCaption_"+A+"_"+B).style.display="none";
dojo.query("#comments_"+A+"_"+B+" .message").forEach(function(C){C.style.display=""
})
};
aipo.timeline.onClick=function(C,B,D,A){try{dojo.xhrPost({portletId:B,url:C,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(G,F){dojo.byId("content_"+B+"_"+D).removeChild(dojo.byId("content_"+B+"_"+D).children[0]);
dojo.byId("content_"+B+"_"+D).removeChild(dojo.byId("content_"+B+"_"+D).children[0]);
dojo.byId("content_"+B+"_"+D).removeChild(dojo.byId("content_"+B+"_"+D).children[0]);
D++;
dojo.byId("content_"+B+"_"+D).innerHTML=G;
if(D==A){dojo.byId("more_"+B).style.display="none"
}}})
}catch(E){alert(E)
}};
aipo.timeline.onScroll=function(D,C,F,A){var G=dojo.byId("timeline_"+C).scrollTop;
var B=dojo.byId("timeline_"+C).clientHeight;
var E=dojo.byId("timeline_"+C).scrollHeight;
var H=E-B-G;
if(dojo.byId("height_"+C)==0||H<5){aipo.timeline.onClick(D,C,F,A)
}};
aipo.timeline.nextThumbnail=function(B){var E=dojo.byId("TimelinePage_"+B);
var D=parseInt(E.value);
var A=dojo.byId("TimelinePage_"+B+"_imagesMaxCount").value;
var C=parseInt(A);
if(D<C){dojo.byId("tlClipImage_"+B+"_1").style.display="none";
dojo.byId("tlClipImage_"+B+"_"+E.value).style.display="none";
D++;
E.value=D;
dojo.byId("tlClipImage_"+B+"_"+E.value).style.display="";
dojo.byId("count_"+B).innerHTML=A+" 件中 "+E.value+" 件"
}};
aipo.timeline.prevThumbnail=function(B){var E=dojo.byId("TimelinePage_"+B);
var D=parseInt(E.value);
var A=dojo.byId("TimelinePage_"+B+"_imagesMaxCount").value;
var C=parseInt(A);
if(D>1){dojo.byId("tlClipImage_"+B+"_1").style.display="none";
dojo.byId("tlClipImage_"+B+"_"+E.value).style.display="none";
D--;
E.value=D;
dojo.byId("tlClipImage_"+B+"_"+E.value).style.display="";
dojo.byId("count_"+B).innerHTML=C+" 件中 "+E.value+" 件"
}};
if(!aipo.timeline.revmaxlist){aipo.timeline.revmaxlist=[]
}aipo.timeline.refreshImageList=function(G,E){function C(O){var Q=dojo.byId("TimelinePage_"+O);
var P=parseInt(Q.value);
if(aipo.timeline.revmaxlist[O]>0){if(dojo.byId("auiSummaryMeta_"+O).style.display!="block"){document.getElementById("tlClipImage_"+O+"_1").style.display="";
dojo.byId("auiSummaryMeta_"+O).style.display="block";
dojo.byId("ViewThumbnail_"+O).style.display="block"
}if(!P){P=1
}dojo.byId("count_"+O).innerHTML=aipo.timeline.revmaxlist[O]+" 件中 "+P+" 件";
dojo.byId("TimelinePage_"+O+"_imagesMaxCount").value=aipo.timeline.revmaxlist[O]
}}var H=dojo.byId("TimelinePage_"+G);
var L=parseInt(H.value);
var J=dojo.byId("TimelinePage_"+G+"_imagesMaxCount").value;
var M=parseInt(J);
var A=0;
var K=dojo.byId("tlClipImage_"+G+"_"+E+"_img").naturalWidth;
var F=dojo.byId("tlClipImage_"+G+"_"+E+"_img").naturalHeight;
if((K>80)&&(F>80)||dojo.isIE){if(aipo.timeline.revmaxlist.hasOwnProperty(G)){A=aipo.timeline.revmaxlist[G]
}A++;
aipo.timeline.revmaxlist[G]=A;
var B=dojo.byId("tlClipImage_"+G+"_1_untiview");
var I=document.createElement("div");
I.id="tlClipImage_"+G+"_"+A;
I.className="tlClipImage";
I.style.display="none";
var N=document.createElement("img");
N.src=dojo.byId("tlClipImage_"+G+"_"+E+"_img").src;
N.name=dojo.byId("tlClipImage_"+G+"_"+E+"_img").name;
I.appendChild(N);
B.parentNode.insertBefore(I,B);
var D=0;
if(dojo.isIE){D=200
}setTimeout(function(){C(G)
},D)
}};
aipo.timeline.getUrl=function(B,A){try{dojo.xhrPost({portletId:A,url:dojo.byId("TimelineUrl_"+A).value,content:{url:B},encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(E,D){if(E!="error"){dojo.byId("tlInputClip_"+A).innerHTML=E;
dojo.byId("flag_"+A).value="exist"
}else{dojo.byId("flag_"+A).value="forbidden"
}}})
}catch(C){alert(C)
}};
aipo.timeline.setScrollTop=function(A,B){dojo.byId("timeline_"+A).scrollTop=B
};
aipo.timeline.onKeyUp=function(G,D,H){var B;
if((typeof D!=="undefined")&&(D!=null)){B="note_"+G+"_"+D
}else{B="note_"+G;
var I;
if(window.event){I=window.event.keyCode
}else{if(H){I=H.which
}}if((I==13)|(I==32)){var E=dojo.byId(B).value;
if(dojo.byId("flag_"+G).value=="none"){var L=E.split(/\r\n|\n/g);
for(i in L){if(L[i].match(/^https?:\/\/[^ 	]/i)){aipo.timeline.getUrl(L[i],G);
aipo.timeline.revmaxlist[G]=0
}}}}}var C=dojo.byId(B).value;
var A=C.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&/g,"&amp;").replace(/\n$/,"<br/>&nbsp;").replace(/\n/g,"<br/>").replace(/ {2,}/g,function(M){return times("&nbsp;",M.length)+" "
});
var J=document.createElement("div");
J.id="shadow";
J.style.position="absolute";
J.style.top="-1000";
J.style.left="-1000";
J.style.border="0";
J.style.outline="0";
J.style.lineHeight="normal";
J.style.height="auto";
J.style.resize="none";
J.cols="10";
J.innerHTML=A+"あ";
var K=document.getElementsByTagName("body").item(0);
K.appendChild(J);
dojo.byId("shadow").style.width=document.getElementById(B).offsetWidth+"px";
var F=document.getElementById("shadow").offsetHeight;
if(F<18){F=18
}dojo.byId(B).style.height=F+21+"px";
K.removeChild(J)
};
aipo.timeline.onReceiveMessage=function(C){var A=dojo.byId("getTimelinePortletId").innerHTML;
if(!C){var B=dijit.byId("modalDialog_"+A);
if(B){B.hide()
}aipo.portletReload("timeline")
}else{dojo.byId("getTimelineOnClick").innerHTML=""
}if(dojo.byId("messageDiv_"+A)){dojo.byId("messageDiv_"+A).innerHTML=C
}};
aipo.timeline.onReceiveLikeMessage=function(H,I,G,M){var E=dojo.byId("getTimelinePortletId").innerHTML;
var L=dijit.byId("modalDialog_"+E);
if(L){L.hide()
}var B=dojo.query("#likeForm_"+H+"_"+I)[0];
var J=dojo.query("#likeForm_"+H+"_"+I+" > a")[0];
var C=dojo.query("#likeForm_"+H+"_"+I+" > input")[1];
if(G=="like"){var F=B.getAttribute("onsubmit");
if(typeof F=="string"){F=F.replace("'like'","'dislike'");
B.setAttribute("onsubmit",F)
}else{var A=F.toString().replace("'like'","'dislike'");
A=A.substring(A.indexOf("{")+1,A.indexOf("}")-1);
B.setAttribute("onsubmit",new Function(A))
}var K=J.getAttribute("onclick");
if(typeof K=="string"){K=K.replace("'like'","'dislike'");
J.setAttribute("onclick",K)
}else{var D=K.toString().replace("'like'","'dislike'");
D=D.substring(D.indexOf("{")+1,D.indexOf("}")-1);
J.setAttribute("onclick",new Function(D))
}J.innerHTML="いいね！を取り消す";
if(M){aipo.timeline.increaseComLikeValue(I)
}else{aipo.timeline.increaseLikeValue(I)
}}else{if(G=="dislike"){var F=B.getAttribute("onsubmit");
if(typeof F=="string"){F=F.replace("'dislike'","'like'");
B.setAttribute("onsubmit",F)
}else{var A=F.toString().replace("'dislike'","'like'");
A=A.substring(A.indexOf("{")+1,A.indexOf("}")-1);
B.setAttribute("onsubmit",new Function(A))
}var K=J.getAttribute("onclick");
if(typeof K=="string"){K=K.replace("'dislike'","'like'");
J.setAttribute("onclick",K)
}else{var D=K.toString().replace("'dislike'","'like'");
D=D.substring(D.indexOf("{")+1,D.indexOf("}")-1);
J.setAttribute("onclick",new Function(D))
}J.innerHTML="いいね！";
if(M){aipo.timeline.decreaseComLikeValue(I)
}else{aipo.timeline.decreaseLikeValue(I)
}}}};
aipo.timeline.increaseLikeValue=function(D){var E=dojo.query("#like_"+D)[0];
var A=dojo.query("#like_"+D+" > a")[0];
if(dojo.isFF>0){var C=A.textContent
}else{var C=A.innerText
}var B=parseInt(C.substring(0,C.length-1))+1;
if(E.style.display=="none"){E.style.display=""
}if(dojo.isFF>0){A.textContent=B+C.charAt(C.length-1)
}else{A.innerText=B+C.charAt(C.length-1)
}};
aipo.timeline.increaseComLikeValue=function(D){var A=dojo.query("#likeCount_"+D)[0];
var C=A.innerText;
var B=parseInt(C)+1;
if(A.style.display=="none"){A.style.display="";
B=1
}A.innerHTML=A.innerHTML.replace(A.innerText,B)
};
aipo.timeline.decreaseLikeValue=function(D){var A=dojo.query("#like_"+D+" > a")[0];
if(dojo.isFF>0){var C=A.textContent
}else{var C=A.innerText
}var B=parseInt(C.substring(0,C.length-1))-1;
if(B<=0){A.parentElement.style.display="none"
}if(dojo.isFF>0){A.textContent=B+C.charAt(C.length-1)
}else{A.innerText=B+C.charAt(C.length-1)
}};
aipo.timeline.decreaseComLikeValue=function(D){var A=dojo.query("#likeCount_"+D)[0];
var C=A.innerText;
var B=parseInt(C)-1;
if(B<=0){A.style.display="none"
}A.innerHTML=A.innerHTML.replace(A.innerText,B)
};
aipo.timeline.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("timeline")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};
aipo.timeline.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("timeline")
};
aipo.timeline.ellipse_message=function(C){var B=C.parentElement;
var A=B.parentElement;
dojo.query(B).addClass("opened");
dojo.query(".text_exposed_show",A).removeClass("ellipsis")
};
aipo.timeline.onFocus=function(A){dojo.byId("guide_"+A).style.display="none"
};
aipo.timeline.onBlur=function(A){var B=dojo.byId("note_"+A);
if(B.value==""){dojo.byId("guide_"+A).style.display=""
}};
aipo.timeline.onBlurCommentField=function(A,E){var B=dojo.byId("note_"+A+"_"+E);
var D=dojo.byId("commentInputDummy_"+A+"_"+E);
var C=dojo.byId("commentField_"+A+"_"+E);
if(B.value==""){B.value=dojo.byId("note_"+A+"_"+E).defaultValue;
D.style.display="";
C.style.display="none"
}};
aipo.timeline.addText=function(B,A){if(dojo.byId("tlInputClip_"+A).innerHTML.length>1){var C=dojo.byId("TimelinePage_"+A);
if(dojo.byId("tlClipImage_"+A+"_"+C.value)!=null&&dojo.byId("tlClipImage_"+A+"_"+C.value).style.display!="none"){aipo.timeline.addHiddenValue(B,"tlClipImage",dojo.byId("tlClipImage_"+A+"_"+C.value).children[0].name)
}aipo.timeline.addHiddenValue(B,"tlClipTitle",dojo.byId("tlClipTitle_"+A).children[0].innerHTML);
if(dojo.byId("tlClipUrl_"+A).children[0].innerHTML){aipo.timeline.addHiddenValue(B,"tlClipUrl",dojo.byId("tlClipUrl_"+A).children[0].getAttribute("href"))
}aipo.timeline.addHiddenValue(B,"tlClipBody",dojo.byId("tlClipBody_"+A).innerHTML)
}};
aipo.timeline.viewThumbnail=function(A){var C=dojo.byId("TimelinePage_"+A);
var B=parseInt(C.value);
if(dojo.byId("checkbox_"+A).checked){dojo.byId("tlClipImage_"+A+"_"+C.value).style.display="none";
dojo.byId("auiSummaryMeta_"+A).style.display="none"
}else{dojo.byId("tlClipImage_"+A+"_"+C.value).style.display="";
dojo.byId("auiSummaryMeta_"+A).style.display=""
}};
aipo.timeline.deleteClip=function(A){dojo.byId("tlInputClip_"+A).innerHTML="";
dojo.byId("flag_"+A).value="forbidden"
};
aipo.timeline.submit=function(E,D,A,F,B){var C=dojo.byId("note_"+A);
if(dojo.byId(D+A).style.display=="none"||B>=8){aimluck.io.createSelectFromFileList(E,A);
if(C.value!=C.defaultValue){aimluck.io.submit(E,D,A,F)
}}else{setTimeout(function(){aipo.timeline.submit(E,D,A,F,B+1)
},Math.pow(2,B)*1000)
}};
aipo.timeline.write=function(C,B,A){aipo.timeline.addText(dojo.byId("form"+A),A);
aipo.timeline.addHiddenValue(dojo.byId("form"+A),"mode","insert");
aimluck.io.setHiddenValue(C);
dojo.byId("getTimelineOnClick").innerHTML="true"
};
aipo.timeline.setMinHeight=function(A){var B=0;
if(document.all){B+=(document.documentElement.clientHeight-dojo.byId("message_"+A).getBoundingClientRect().top)
}else{B+=(innerHeight-dojo.byId("message_"+A).getBoundingClientRect().top)
}dojo.byId("message_"+A).style.minHeight=B+"px"
};
aipo.timeline.changeDisplayCallback=function(A){if(dojo.byId("menubar_tlDisplayChanger_"+A).style.display=="none"){dojo.byId("menubar_tlDisplayChanger_"+A).style.display="block"
}else{dojo.byId("menubar_tlDisplayChanger_"+A).style.display="none"
}};
aipo.timeline.changeDisplay=function(A){if(dojo.byId("menubar_tlDisplayChanger_"+A).style.display=="none"){setTimeout(function(){aipo.timeline.changeDisplayCallback(A)
},0)
}else{aipo.timeline.changeDisplayCallback(A)
}};
aipo.timeline.getNewMessage=function(B,A){var C=dojo.byId("newMessage_"+A);
if(C){dojo.style(C,"display","none")
}try{dojo.xhrPost({portletId:A,url:B,content:{lastTimelineId:dojo.byId("last_timelineId_"+A).value},encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(G,F){dojo.query(".message.first").removeClass("first");
if(G.length>0){var H=dojo.byId("timeline_"+A);
var E=document.createElement("div");
E.innerHTML=G;
H.insertBefore(E,H.childNodes[1])
}}})
}catch(D){alert(D)
}};
aipo.timeline.displayIndicator=function(A,D,C,B){dojo.byId("tlDisplayGroup_"+D).innerHTML=dojo.byId("PostName_"+D+"_"+B).innerHTML;
var E=dojo.byId(C+D);
if(E){dojo.style(E,"display","")
}aipo.viewPage(A,D);
E=dojo.byId(C+D)
};