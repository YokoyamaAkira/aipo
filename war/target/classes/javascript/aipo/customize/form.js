dojo.provide("aipo.customize");
aipo.customize.positionInitialize=function(){dojo.query(".body-child").forEach(function(A){dojo.place(A,dojo.query("body")[0],"last")
})
};
aipo.customize.onReceiveMessage=function(A){if(!A){var B=dijit.byId("modalDialog");
if(!!B){B.hide()
}}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=A
}};
aipo.customize.showMenu=function(E){var C=dojo.query("#menubar_"+E);
var A=dojo.query("#menubar_button_"+E);
if(C.length==0||A.length==0){return 
}var D=A[0].getBoundingClientRect();
var B=document.documentElement.getBoundingClientRect();
if(C.style("display")=="none"){dojo.query("div.menubar").style("display","none");
var F={left:document.documentElement.scrollLeft||document.body.scrollLeft,top:document.documentElement.scrollTop||document.body.scrollTop};
C.style("opacity","0");
C.style("display","block");
if(B.right-C[0].clientWidth>D.left){C.style("left",D.left+F.left+"px")
}else{C.style("left",D.right-C[0].clientWidth+F.left+"px")
}if(B.bottom-C[0].clientHeight>D.bottom){C.style("top",D.bottom+F.top+"px")
}else{C.style("top",D.top-C[0].clientHeight+F.top+"px")
}C.style("opacity","1");
if(dojo.byId("timeline_"+E)&&(dojo.query("div.timeline").length==1)){dojo.query("#accessControlDelete_"+E).style("display","none")
}}else{aipo.customize.hideMenu(E)
}};
aipo.customize.showMenuSchedule=function(A){var G=dojo.query("#menubar_"+A+"_date");
if(G.style("display")=="none"){dojo.query("div.menubar").style("display","none");
G.style("display","block");
if(dojo.byId("timeline_"+A)&&(dojo.query("div.timeline").length==1)){dojo.query("#accessControlDelete_"+A).style("display","none")
}var F=dojo.byId("indicateDate_"+A);
if(dojo.isIE){var E=function(H){var I=0;
while(H){I+=H.offsetLeft;
H=H.offsetParent
}return I
};
var B=function(H){var I=0;
while(H){I+=H.offsetTop;
H=H.offsetParent
}return I
};
var D=E(F)-E(F.offsetParent.offsetParent);
var C=B(F)-B(F.offsetParent.offsetParent)
}else{var D=F.offsetLeft-F.clientLeft;
var C=F.offsetTop-F.clientTop
}G.style("left",D+"px");
G.style("top",C+24+"px")
}else{aipo.customize.hideMenu(A)
}};
aipo.customize.hideMenu=function(A){var B=dojo.query("div.menubar").style("display","none")
};
aipo.customize.setController=function(C,G){var E=G.parentNode.id;
dojo.query("form#form"+C+' input[name="controller"]')[0].value=E;
var A=dojo.query("form#form"+C+" table.controllerTable td");
var B=A.length;
for(var F=0;
F<B;
F++){dojo.removeClass(A[F],"selected")
}var D=dojo.query("form#form"+C+" td#"+E)[0];
dojo.addClass(D,"selected")
};
aipo.customize.deletesubmit=function(C,A,B){if(confirm("このアプリを削除してもよろしいですか？")){aipo.customize.submit(C,A,B)
}};
aipo.customize.submit=function(D,A,C){try{dojo.xhrPost({url:D,timeout:30000,content:{portlet_id:A},encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(G,F){var E="";
if(dojo.isArray(G)&&G.length>0){if(G[0]=="PermissionError"){E+="<ul>";
E+="<li><span class='caution'>"+G[1]+"</span></li>";
E+="</ul>"
}else{E+="<ul>";
dojo.forEach(G,function(H){E+="<li><span class='caution'>"+H+"</span></li>"
});
E+="</ul>"
}}C.call(C,E);
if(E!=""){aimluck.io.disableForm(form,false)
}},error:function(E){}})
}catch(B){}};