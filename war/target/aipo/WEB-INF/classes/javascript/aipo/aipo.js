window.aipo=window.aipo||{};
aipo.namespace=function(C){if(!C||!C.length){return null
}var D=C.split(".");
var B=aipo;
for(var A=(D[0]=="aipo")?1:0;
A<D.length;
++A){B[D[A]]=B[D[A]]||{};
B=B[D[A]]
}return B
};
var ptConfig=[];
aipo.onReceiveMessage=function(C,B){if(!C){var A=dijit.byId("modalDialog");
A.hide();
aipo.portletReload(B)
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.getCookie=function(D){var C="";
var F=0;
var E=0;
var A=D+"=";
var B="";
while(F<document.cookie.length){E=F+A.length;
if(document.cookie.substring(F,E)==A){B=document.cookie.indexOf(";",E);
if(B==-1){C=document.cookie.substring(E,document.cookie.length)
}else{C=document.cookie.substring(E,B)
}break
}F=document.cookie.indexOf(" ",F)+1;
if(F==0){break
}}return C
};
aipo.setCookie=function(B,E,D,C){var A=new Date();
A.setTime(A.getTime()+(typeof C!="number"?10*24*60*60*1000:C));
if(typeof D=="undefined"||D==null){document.cookie=B+"="+E+"; expires="+A.toGMTString()+"; path=${context_path}/"
}else{document.cookie=B+"="+E+"; expires="+A.toGMTString()+"; path="+D
}};
aipo.removeCookie=function remove_cookie(B,C){var D;
var A=new Date();
A.setTime(A.getTime()-1);
D=get_cookie(B);
if(typeof C=="undefined"){document.cookie=B+"="+D+"; expires="+A.toGMTString()+"; path=${context_path}/"
}else{document.cookie=B+"="+D+"; expires="+A.toGMTString()+"; path="+C
}};
aipo.portletReload=function(C,B){for(var A in ptConfig){if(A!=B){if(ptConfig[A].group==C){ptConfig[A].reloadFunction.call(ptConfig[A].reloadFunction,A)
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
aipo.viewPage=function(A,B,D){var C=dijit.byId("portlet_"+B);
if(!C){C=new aimluck.widget.Contentpane({},"portlet_"+B)
}if(C){ptConfig[B].reloadUrl=A;
if(D){for(i=0;
i<D.length;
i++){C.setParam(D[i][0],D[i][1])
}}C.onLoad=dojo.hitch(C.onLoad,setMouseListener);
C.viewPage(A)
}};
aipo.errorTreatment=function(B,A){if(B.error){if(B.error==1){window.location.href=A
}else{return true
}return false
}else{return true
}};
var favicon={change:function(A){this.addLink(A,"icon");
this.addLink(A,"shortcut icon")
},addLink:function(C,B){var A=document.createElement("link");
A.type="image/x-icon";
A.rel=B;
A.href=C;
this.removeLinkIfExists(B);
this.docHead.appendChild(A)
},removeLinkIfExists:function(D){var A=this.docHead.getElementsByTagName("link");
for(var B=0;
B<A.length;
B++){var C=A[B];
if(C.type=="image/x-icon"&&C.rel==D){this.docHead.removeChild(C);
return 
}}},docHead:document.getElementsByTagName("head")[0]};
function CronTask(B,A,C){this.task=B;
this.isDecay=C;
this.interval=A;
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
aipo.escapeHTML=function(B){var A=function(C){switch(C){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
};
return String(B).replace(/[<>&"']/g,A)
};