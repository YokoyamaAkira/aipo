dojo.require("aipo.widget.MemberNormalSelectList");
dojo.provide("aipo.timeline");
aipo.timeline.addHiddenValue=function(H,E,F){if(H[E]&&document.getElementsByName(E).item(0)){H[E].value=F
}else{var G=document.createElement("input");
G.type="hidden";
G.name=E;
G.value=F;
H.appendChild(G)
}};
aipo.timeline.addLike=function(F,D,E){};
aipo.timeline.showCommentField=function(D,E){dojo.byId("comments_"+D+"_"+E).style.display="block";
dojo.byId("commentField_"+D+"_"+E).style.display="";
dojo.byId("note_"+D+"_"+E).focus();
dojo.byId("note_"+D+"_"+E).style.color="black";
var F=dojo.byId("commentInputDummy_"+D+"_"+E);
if(typeof F!="undefined"&&F!=null){dojo.byId("commentInputDummy_"+D+"_"+E).style.display="none"
}};
aipo.timeline.showCommentAll=function(C,D){dojo.byId("commentCaption_"+C+"_"+D).style.display="none";
dojo.query("#comments_"+C+"_"+D+" .message").forEach(function(A){A.style.display=""
})
};
aipo.timeline.onClick=function(I,J,H,F){try{dojo.xhrPost({portletId:J,url:I,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(A,B){dojo.byId("content_"+J+"_"+H).removeChild(dojo.byId("content_"+J+"_"+H).children[0]);
dojo.byId("content_"+J+"_"+H).removeChild(dojo.byId("content_"+J+"_"+H).children[0]);
dojo.byId("content_"+J+"_"+H).removeChild(dojo.byId("content_"+J+"_"+H).children[0]);
H++;
dojo.byId("content_"+J+"_"+H).innerHTML=A;
if(H==F){dojo.byId("more_"+J).style.display="none"
}}})
}catch(G){alert(G)
}};
aipo.timeline.onScroll=function(N,O,L,I){var K=dojo.byId("timeline_"+O).scrollTop;
var P=dojo.byId("timeline_"+O).clientHeight;
var M=dojo.byId("timeline_"+O).scrollHeight;
var J=M-P-K;
if(dojo.byId("height_"+O)==0||J<5){aipo.timeline.onClick(N,O,L,I)
}};
aipo.timeline.nextThumbnail=function(J){var G=dojo.byId("TimelinePage_"+J);
var H=parseInt(G.value);
var F=dojo.byId("TimelinePage_"+J+"_imagesMaxCount").value;
var I=parseInt(F);
if(H<I){dojo.byId("tlClipImage_"+J+"_1").style.display="none";
dojo.byId("tlClipImage_"+J+"_"+G.value).style.display="none";
H++;
G.value=H;
dojo.byId("tlClipImage_"+J+"_"+G.value).style.display="";
dojo.byId("count_"+J).innerHTML=F+" 件中 "+G.value+" 件"
}};
aipo.timeline.prevThumbnail=function(J){var G=dojo.byId("TimelinePage_"+J);
var H=parseInt(G.value);
var F=dojo.byId("TimelinePage_"+J+"_imagesMaxCount").value;
var I=parseInt(F);
if(H>1){dojo.byId("tlClipImage_"+J+"_1").style.display="none";
dojo.byId("tlClipImage_"+J+"_"+G.value).style.display="none";
H--;
G.value=H;
dojo.byId("tlClipImage_"+J+"_"+G.value).style.display="";
dojo.byId("count_"+J).innerHTML=I+" 件中 "+G.value+" 件"
}};
if(!aipo.timeline.revmaxlist){aipo.timeline.revmaxlist=[]
}aipo.timeline.refreshImageList=function(Z,b){function P(C){var A=dojo.byId("TimelinePage_"+C);
var B=parseInt(A.value);
if(aipo.timeline.revmaxlist[C]>0){if(dojo.byId("auiSummaryMeta_"+C).style.display!="block"){document.getElementById("tlClipImage_"+C+"_1").style.display="";
dojo.byId("auiSummaryMeta_"+C).style.display="block";
dojo.byId("ViewThumbnail_"+C).style.display="block"
}if(!B){B=1
}dojo.byId("count_"+C).innerHTML=aipo.timeline.revmaxlist[C]+" 件中 "+B+" 件";
dojo.byId("TimelinePage_"+C+"_imagesMaxCount").value=aipo.timeline.revmaxlist[C]
}}var Y=dojo.byId("TimelinePage_"+Z);
var U=parseInt(Y.value);
var W=dojo.byId("TimelinePage_"+Z+"_imagesMaxCount").value;
var T=parseInt(W);
var R=0;
var V=dojo.byId("tlClipImage_"+Z+"_"+b+"_img").naturalWidth;
var a=dojo.byId("tlClipImage_"+Z+"_"+b+"_img").naturalHeight;
if((V>80)&&(a>80)||dojo.isIE){if(aipo.timeline.revmaxlist.hasOwnProperty(Z)){R=aipo.timeline.revmaxlist[Z]
}R++;
aipo.timeline.revmaxlist[Z]=R;
var Q=dojo.byId("tlClipImage_"+Z+"_1_untiview");
var X=document.createElement("div");
X.id="tlClipImage_"+Z+"_"+R;
X.className="tlClipImage";
X.style.display="none";
var S=document.createElement("img");
S.src=dojo.byId("tlClipImage_"+Z+"_"+b+"_img").src;
S.name=dojo.byId("tlClipImage_"+Z+"_"+b+"_img").name;
X.appendChild(S);
Q.parentNode.insertBefore(X,Q);
var O=0;
if(dojo.isIE){O=200
}setTimeout(function(){P(Z)
},O)
}};
aipo.timeline.getUrl=function(F,D){try{dojo.xhrPost({portletId:D,url:dojo.byId("TimelineUrl_"+D).value,content:{url:F},encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(A,B){if(A!="error"){dojo.byId("tlInputClip_"+D).innerHTML=A;
dojo.byId("flag_"+D).value="exist"
}else{dojo.byId("flag_"+D).value="forbidden"
}}})
}catch(E){alert(E)
}};
aipo.timeline.setScrollTop=function(C,D){dojo.byId("timeline_"+C).scrollTop=D
};
aipo.timeline.onKeyUp=function(V,M,U){var O;
if((typeof M!=="undefined")&&(M!=null)){O="note_"+V+"_"+M
}else{O="note_"+V;
var T;
if(window.event){T=window.event.keyCode
}else{if(U){T=U.which
}}if((T==13)|(T==32)){var X=dojo.byId(O).value;
if(dojo.byId("flag_"+V).value=="none"){var Q=X.split(/\r\n|\n/g);
for(i in Q){if(Q[i].match(/^https?:\/\/[^ 	]/i)){aipo.timeline.getUrl(Q[i],V);
aipo.timeline.revmaxlist[V]=0
}}}}}var N=dojo.byId(O).value;
var P=N.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&/g,"&amp;").replace(/\n$/,"<br/>&nbsp;").replace(/\n/g,"<br/>").replace(/ {2,}/g,function(A){return times("&nbsp;",A.length)+" "
});
var S=document.createElement("div");
S.id="shadow";
S.style.position="absolute";
S.style.top="-1000";
S.style.left="-1000";
S.style.border="0";
S.style.outline="0";
S.style.lineHeight="normal";
S.style.height="auto";
S.style.resize="none";
S.cols="10";
S.innerHTML=P+"あ";
var R=document.getElementsByTagName("body").item(0);
R.appendChild(S);
dojo.byId("shadow").style.width=document.getElementById(O).offsetWidth+"px";
var W=document.getElementById("shadow").offsetHeight;
if(W<18){W=18
}dojo.byId(O).style.height=W+21+"px";
R.removeChild(S)
};
aipo.timeline.onReceiveMessage=function(E){var D=dojo.byId("getTimelinePortletId").innerHTML;
if(!E){var F=dijit.byId("modalDialog_"+D);
if(F){F.hide()
}aipo.portletReload("timeline")
}else{dojo.byId("getTimelineOnClick").innerHTML=""
}if(dojo.byId("messageDiv_"+D)){dojo.byId("messageDiv_"+D).innerHTML=E
}};
aipo.timeline.onReceiveLikeMessage=function(W,V,X,R){var Z=dojo.byId("getTimelinePortletId").innerHTML;
var S=dijit.byId("modalDialog_"+Z);
if(S){S.hide()
}var P=dojo.query("#likeForm_"+W+"_"+V)[0];
var U=dojo.query("#likeForm_"+W+"_"+V+" > a")[0];
var O=dojo.query("#likeForm_"+W+"_"+V+" > input")[1];
if(X=="like"){var Y=P.getAttribute("onsubmit");
if(typeof Y=="string"){Y=Y.replace("'like'","'dislike'");
P.setAttribute("onsubmit",Y)
}else{var Q=Y.toString().replace("'like'","'dislike'");
Q=Q.substring(Q.indexOf("{")+1,Q.indexOf("}")-1);
P.setAttribute("onsubmit",new Function(Q))
}var T=U.getAttribute("onclick");
if(typeof T=="string"){T=T.replace("'like'","'dislike'");
U.setAttribute("onclick",T)
}else{var N=T.toString().replace("'like'","'dislike'");
N=N.substring(N.indexOf("{")+1,N.indexOf("}")-1);
U.setAttribute("onclick",new Function(N))
}U.innerHTML="いいね！を取り消す";
if(R){aipo.timeline.increaseComLikeValue(V)
}else{aipo.timeline.increaseLikeValue(V)
}}else{if(X=="dislike"){var Y=P.getAttribute("onsubmit");
if(typeof Y=="string"){Y=Y.replace("'dislike'","'like'");
P.setAttribute("onsubmit",Y)
}else{var Q=Y.toString().replace("'dislike'","'like'");
Q=Q.substring(Q.indexOf("{")+1,Q.indexOf("}")-1);
P.setAttribute("onsubmit",new Function(Q))
}var T=U.getAttribute("onclick");
if(typeof T=="string"){T=T.replace("'dislike'","'like'");
U.setAttribute("onclick",T)
}else{var N=T.toString().replace("'dislike'","'like'");
N=N.substring(N.indexOf("{")+1,N.indexOf("}")-1);
U.setAttribute("onclick",new Function(N))
}U.innerHTML="いいね！";
if(R){aipo.timeline.decreaseComLikeValue(V)
}else{aipo.timeline.decreaseLikeValue(V)
}}}};
aipo.timeline.increaseLikeValue=function(H){var G=dojo.query("#like_"+H)[0];
var F=dojo.query("#like_"+H+" > a")[0];
if(dojo.isFF>0){var I=F.textContent
}else{var I=F.innerText
}var J=parseInt(I.substring(0,I.length-1))+1;
if(G.style.display=="none"){G.style.display=""
}if(dojo.isFF>0){F.textContent=J+I.charAt(I.length-1)
}else{F.innerText=J+I.charAt(I.length-1)
}};
aipo.timeline.increaseComLikeValue=function(F){var E=dojo.query("#likeCount_"+F)[0];
var G=E.innerText;
var H=parseInt(G)+1;
if(E.style.display=="none"){E.style.display="";
H=1
}E.innerHTML=E.innerHTML.replace(E.innerText,H)
};
aipo.timeline.decreaseLikeValue=function(F){var E=dojo.query("#like_"+F+" > a")[0];
if(dojo.isFF>0){var G=E.textContent
}else{var G=E.innerText
}var H=parseInt(G.substring(0,G.length-1))-1;
if(H<=0){E.parentElement.style.display="none"
}if(dojo.isFF>0){E.textContent=H+G.charAt(G.length-1)
}else{E.innerText=H+G.charAt(G.length-1)
}};
aipo.timeline.decreaseComLikeValue=function(F){var E=dojo.query("#likeCount_"+F)[0];
var G=E.innerText;
var H=parseInt(G)-1;
if(H<=0){E.style.display="none"
}E.innerHTML=E.innerHTML.replace(E.innerText,H)
};
aipo.timeline.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("timeline")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};
aipo.timeline.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("timeline")
};
aipo.timeline.ellipse_message=function(E){var F=E.parentElement;
var D=F.parentElement;
dojo.query(F).addClass("opened");
dojo.query(".text_exposed_show",D).removeClass("ellipsis")
};
aipo.timeline.onFocus=function(B){dojo.byId("guide_"+B).style.display="none"
};
aipo.timeline.onBlur=function(C){var D=dojo.byId("note_"+C);
if(D.value==""){dojo.byId("guide_"+C).style.display=""
}};
aipo.timeline.onBlurCommentField=function(F,G){var J=dojo.byId("note_"+F+"_"+G);
var H=dojo.byId("commentInputDummy_"+F+"_"+G);
var I=dojo.byId("commentField_"+F+"_"+G);
if(J.value==""){J.value=dojo.byId("note_"+F+"_"+G).defaultValue;
H.style.display="";
I.style.display="none"
}};
aipo.timeline.addText=function(F,D){if(dojo.byId("tlInputClip_"+D).innerHTML.length>1){var E=dojo.byId("TimelinePage_"+D);
if(dojo.byId("tlClipImage_"+D+"_"+E.value)!=null&&dojo.byId("tlClipImage_"+D+"_"+E.value).style.display!="none"){aipo.timeline.addHiddenValue(F,"tlClipImage",dojo.byId("tlClipImage_"+D+"_"+E.value).children[0].name)
}aipo.timeline.addHiddenValue(F,"tlClipTitle",dojo.byId("tlClipTitle_"+D).children[0].innerHTML);
if(dojo.byId("tlClipUrl_"+D).children[0].innerHTML){aipo.timeline.addHiddenValue(F,"tlClipUrl",dojo.byId("tlClipUrl_"+D).children[0].getAttribute("href"))
}aipo.timeline.addHiddenValue(F,"tlClipBody",dojo.byId("tlClipBody_"+D).innerHTML)
}};
aipo.timeline.viewThumbnail=function(D){var E=dojo.byId("TimelinePage_"+D);
var F=parseInt(E.value);
if(dojo.byId("checkbox_"+D).checked){dojo.byId("tlClipImage_"+D+"_"+E.value).style.display="none";
dojo.byId("auiSummaryMeta_"+D).style.display="none"
}else{dojo.byId("tlClipImage_"+D+"_"+E.value).style.display="";
dojo.byId("auiSummaryMeta_"+D).style.display=""
}};
aipo.timeline.deleteClip=function(B){dojo.byId("tlInputClip_"+B).innerHTML="";
dojo.byId("flag_"+B).value="forbidden"
};
aipo.timeline.submit=function(I,J,G,H,L){var K=dojo.byId("note_"+G);
if(dojo.byId(J+G).style.display=="none"||L>=8){aimluck.io.createSelectFromFileList(I,G);
if(K.value!=K.defaultValue){aimluck.io.submit(I,J,G,H)
}}else{setTimeout(function(){aipo.timeline.submit(I,J,G,H,L+1)
},Math.pow(2,L)*1000)
}};
aipo.timeline.write=function(E,F,D){aipo.timeline.addText(dojo.byId("form"+D),D);
aipo.timeline.addHiddenValue(dojo.byId("form"+D),"mode","insert");
aimluck.io.setHiddenValue(E);
dojo.byId("getTimelineOnClick").innerHTML="true"
};
aipo.timeline.setMinHeight=function(C){var D=0;
if(document.all){D+=(document.documentElement.clientHeight-dojo.byId("message_"+C).getBoundingClientRect().top)
}else{D+=(innerHeight-dojo.byId("message_"+C).getBoundingClientRect().top)
}dojo.byId("message_"+C).style.minHeight=D+"px"
};
aipo.timeline.changeDisplayCallback=function(B){if(dojo.byId("menubar_tlDisplayChanger_"+B).style.display=="none"){dojo.byId("menubar_tlDisplayChanger_"+B).style.display="block"
}else{dojo.byId("menubar_tlDisplayChanger_"+B).style.display="none"
}};
aipo.timeline.changeDisplay=function(B){if(dojo.byId("menubar_tlDisplayChanger_"+B).style.display=="none"){setTimeout(function(){aipo.timeline.changeDisplayCallback(B)
},0)
}else{aipo.timeline.changeDisplayCallback(B)
}};
aipo.timeline.getNewMessage=function(H,E){var G=dojo.byId("newMessage_"+E);
if(G){dojo.style(G,"display","none")
}try{dojo.xhrPost({portletId:E,url:H,content:{lastTimelineId:dojo.byId("last_timelineId_"+E).value},encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(B,C){dojo.query(".message.first").removeClass("first");
if(B.length>0){var A=dojo.byId("timeline_"+E);
var D=document.createElement("div");
D.innerHTML=B;
A.insertBefore(D,A.childNodes[1])
}}})
}catch(F){alert(F)
}};
aipo.timeline.displayIndicator=function(F,H,I,J){dojo.byId("tlDisplayGroup_"+H).innerHTML=dojo.byId("PostName_"+H+"_"+J).innerHTML;
var G=dojo.byId(I+H);
if(G){dojo.style(G,"display","")
}aipo.viewPage(F,H);
G=dojo.byId(I+H)
};