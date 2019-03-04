dojo.provide("aipo.customize");
aipo.customize.positionInitialize=function(){dojo.query(".body-child").forEach(function(A){dojo.place(A,dojo.query("body")[0],"last")
})
};
aipo.customize.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(!!A){A.hide()
}}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.customize.showMenu=function(F){var D=dojo.query("#menubar_"+F);
var B=dojo.query("#menubar_button_"+F);
if(D.length==0||B.length==0){return 
}var E=B[0].getBoundingClientRect();
var C=document.documentElement.getBoundingClientRect();
if(D.style("display")=="none"){dojo.query("div.menubar").style("display","none");
var A={left:document.documentElement.scrollLeft||document.body.scrollLeft,top:document.documentElement.scrollTop||document.body.scrollTop};
D.style("opacity","0");
D.style("display","block");
if(C.right-D[0].clientWidth>E.left){D.style("left",E.left+A.left+"px")
}else{D.style("left",E.right-D[0].clientWidth+A.left+"px")
}if(C.bottom-D[0].clientHeight>E.bottom){D.style("top",E.bottom+A.top+"px")
}else{D.style("top",E.top-D[0].clientHeight+A.top+"px")
}D.style("opacity","1");
if(dojo.byId("timeline_"+F)&&(dojo.query("div.timeline").length==1)){dojo.query("#accessControlDelete_"+F).style("display","none")
}}else{aipo.customize.hideMenu(F)
}};
aipo.customize.showMenuSchedule=function(D){var C=dojo.query("#menubar_"+D+"_date");
if(C.style("display")=="none"){dojo.query("div.menubar").style("display","none");
C.style("display","block");
if(dojo.byId("timeline_"+D)&&(dojo.query("div.timeline").length==1)){dojo.query("#accessControlDelete_"+D).style("display","none")
}var B=dojo.byId("indicateDate_"+D);
if(dojo.isIE){var A=function(I){var H=0;
while(I){H+=I.offsetLeft;
I=I.offsetParent
}return H
};
var E=function(I){var H=0;
while(I){H+=I.offsetTop;
I=I.offsetParent
}return H
};
var G=A(B)-A(B.offsetParent.offsetParent);
var F=E(B)-E(B.offsetParent.offsetParent)
}else{var G=B.offsetLeft-B.clientLeft;
var F=B.offsetTop-B.clientTop
}C.style("left",G+"px");
C.style("top",F+24+"px")
}else{aipo.customize.hideMenu(D)
}};
aipo.customize.hideMenu=function(B){var A=dojo.query("div.menubar").style("display","none")
};
aipo.customize.setController=function(F,C){var A=C.parentNode.id;
dojo.query("form#form"+F+' input[name="controller"]')[0].value=A;
var D=dojo.query("form#form"+F+" table.controllerTable td");
var E=D.length;
for(var B=0;
B<E;
B++){dojo.removeClass(D[B],"selected")
}var G=dojo.query("form#form"+F+" td#"+A)[0];
dojo.addClass(G,"selected")
};
aipo.customize.deletesubmit=function(A,B,C){if(confirm("このアプリを削除してもよろしいですか？")){aipo.customize.submit(A,B,C)
}};
aipo.customize.submit=function(A,B,D){try{dojo.xhrPost({url:A,timeout:30000,content:{portlet_id:B},encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(F,E){var G="";
if(dojo.isArray(F)&&F.length>0){if(F[0]=="PermissionError"){G+="<ul>";
G+="<li><span class='caution'>"+F[1]+"</span></li>";
G+="</ul>"
}else{G+="<ul>";
dojo.forEach(F,function(H){G+="<li><span class='caution'>"+H+"</span></li>"
});
G+="</ul>"
}}D.call(D,G);
if(G!=""){aimluck.io.disableForm(form,false)
}},error:function(E){}})
}catch(C){}};