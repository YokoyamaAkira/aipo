window.aipo=window.aipo||{};
aipo.namespace=function(B){if(!B||!B.length){return null
}var C=B.split(".");
var A=aipo;
for(var D=(C[0]=="aipo")?1:0;
D<C.length;
++D){A[C[D]]=A[C[D]]||{};
A=A[C[D]]
}return A
};
var ptConfig=[];
aipo.onReceiveMessage=function(B,A){if(!B){var C=dijit.byId("modalDialog");
C.hide();
aipo.portletReload(A)
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.getCookie=function(C){var B="";
var E=0;
var D=0;
var F=C+"=";
var A="";
while(E<document.cookie.length){D=E+F.length;
if(document.cookie.substring(E,D)==F){A=document.cookie.indexOf(";",D);
if(A==-1){B=document.cookie.substring(D,document.cookie.length)
}else{B=document.cookie.substring(D,A)
}break
}E=document.cookie.indexOf(" ",E)+1;
if(E==0){break
}}return B
};
aipo.setCookie=function(A,D,C,B){var E=new Date();
E.setTime(E.getTime()+(typeof B!="number"?10*24*60*60*1000:B));
if(typeof C=="undefined"||C==null){document.cookie=A+"="+D+"; expires="+E.toGMTString()+"; path=${context_path}/"
}else{document.cookie=A+"="+D+"; expires="+E.toGMTString()+"; path="+C
}};
aipo.removeCookie=function remove_cookie(A,B){var C;
var D=new Date();
D.setTime(D.getTime()-1);
C=get_cookie(A);
if(typeof B=="undefined"){document.cookie=A+"="+C+"; expires="+D.toGMTString()+"; path=${context_path}/"
}else{document.cookie=A+"="+C+"; expires="+D.toGMTString()+"; path="+B
}};
aipo.portletReload=function(B,A){for(var C in ptConfig){if(C!=A){if(ptConfig[C].group==B){ptConfig[C].reloadFunction.call(ptConfig[C].reloadFunction,C)
}}}};
aipo.reloadPage=function(A){if(typeof ptConfig[A].reloadUrl=="undefined"){aipo.viewPage(ptConfig[A].initUrl,A)
}else{aipo.viewPage(ptConfig[A].reloadUrl,A)
}};
var setMouseListener=function(){aipo.customize.positionInitialize();
dojo.query(".customizeMenuIcon,.menubarOpenButton").forEach(function(B){dojo.connect(B,"onmouseenter",null,function(){dojo.addClass(this,"customizeMenuIconMouseenter")
});
dojo.connect(B,"onmouseleave",null,function(){dojo.removeClass(this,"customizeMenuIconMouseenter")
})
});
var A=dojo.connect(dojo.query("body")[0],"onclick",null,function(){if(dojo.query(".customizeMenuIconMouseenter").length==0){dojo.query("div.menubar").style("display","none")
}});
if(aipo.onloadSmartPhone!=null){aipo.onloadSmartPhone()
}};
aipo.viewPage=function(D,A,C){var B=dijit.byId("portlet_"+A);
if(!B){B=new aimluck.widget.Contentpane({},"portlet_"+A)
}if(B){ptConfig[A].reloadUrl=D;
if(C){for(i=0;
i<C.length;
i++){B.setParam(C[i][0],C[i][1])
}}B.onLoad=dojo.hitch(B.onLoad,setMouseListener);
B.viewPage(D)
}};
aipo.errorTreatment=function(A,B){if(A.error){if(A.error==1){window.location.href=B
}else{return true
}return false
}else{return true
}};
var favicon={change:function(A){this.addLink(A,"icon");
this.addLink(A,"shortcut icon")
},addLink:function(B,A){var C=document.createElement("link");
C.type="image/x-icon";
C.rel=A;
C.href=B;
this.removeLinkIfExists(A);
this.docHead.appendChild(C)
},removeLinkIfExists:function(C){var D=this.docHead.getElementsByTagName("link");
for(var A=0;
A<D.length;
A++){var B=D[A];
if(B.type=="image/x-icon"&&B.rel==C){this.docHead.removeChild(B);
return 
}}},docHead:document.getElementsByTagName("head")[0]};
function CronTask(A,C,B){this.task=A;
this.isDecay=B;
this.interval=C;
this.decayRate=1;
this.decayMultiplier=1.5;
this.maxDecayTime=5*60*1000
}CronTask.prototype={start:function(){this.stop().run();
return this
},stop:function(){if(this.worker){window.clearTimeout(this.worker)
}return this
},run:function(){var A=this;
this.task(function(){A.decayRate=A.isDecay?Math.max(1,A.decayRate/A.decayMultiplier):A.decayRate*A.decayMultiplier;
var B=A.interval*A.decayRate;
if(!A.isDecay){B=(B>=A.maxDecayTime)?A.maxDecayTime:B
}B=Math.floor(B);
A.worker=window.setTimeout(function(){A.run.call(A)
},B)
})
},reset:function(){this.destroy().run();
return this
},destroy:function(){this.stop();
this.decayRate=1;
return this
}};
aipo.userAgent={__userAgent:window.navigator.userAgent.toLowerCase(),isAndroid:function(){return this.__userAgent.indexOf("android")>-1
},isIphone:function(){return this.__userAgent.indexOf("iphone")>-1
},isSmartPhone:function(){return this.isAndroid()||this.isIphone()
}};
aipo.escapeHTML=function(A){var B=function(C){switch(C){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
};
return String(A).replace(/[<>&"']/g,B)
};