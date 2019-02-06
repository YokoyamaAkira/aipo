aipo.PortletLayoutManager=function(){shindig.LayoutManager.call(this)
};
aipo.PortletLayoutManager.inherits(shindig.LayoutManager);
aipo.PortletLayoutManager.prototype.getGadgetChrome=function(A){var B="gadget-chrome-"+A.portletId;
return B?document.getElementById(B):null
};
aipo.PsmlUserPrefStore=function(){shindig.UserPrefStore.call(this)
};
aipo.PsmlUserPrefStore.inherits(shindig.UserPrefStore);
aipo.PsmlUserPrefStore.prototype.getPrefs=function(A){};
aipo.PsmlUserPrefStore.prototype.savePrefs=function(A){};
aipo.IfrGadget={getMainContent:function(B){var A=this.getIframeId();
gadgets.rpc.setRelayUrl(A,this.serverBase_+this.rpcRelay);
gadgets.rpc.setAuthToken(A,this.rpcToken);
B('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+A+'" name="'+A+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no"'+(this.scrolling?' scrolling="'+this.scrolling+'"':"no")+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")
},finishRender:function(A){window.frames[this.getIframeId()].location=this.getIframeUrl()
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+aipo.container.nocache_+"&country="+aipo.container.country_+"&lang="+aipo.container.language_+"&view="+aipo.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(shindig.container.parentUrl_?"&parent="+encodeURIComponent(shindig.container.parentUrl_):"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+"#rpctoken="+this.rpcToken+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"&"+this.hashData:"")
}};
aipo.IfrGadgetService=function(){shindig.IfrGadgetService.call(this);
gadgets.rpc.register("set_pref",this.setUserPref);
gadgets.rpc.register("set_title",this.setTitle);
gadgets.rpc.register("requestNavigateTo",this.requestNavigateTo);
gadgets.rpc.register("requestCheckActivity",this.requestCheckActivity);
gadgets.rpc.register("requestCheckTimeline",this.requestCheckTimeline)
};
aipo.IfrGadgetService.inherits(shindig.IfrGadgetService);
aipo.IfrGadgetService.prototype.setUserPref=function(D,J,H){var F=this.f.replace("remote_iframe_","").split("_NN_")[0].replace("-popup","");
var G=null;
for(key in aipo.container.gadgets_){var K=aipo.container.gadgets_[key];
if(F==K.portletId){G=key;
break
}}var A={};
for(var C=1,L=arguments.length;
C<L;
C+=2){A[arguments[C]]=arguments[C+1];
if(G){aipo.container.gadgets_[G].userPrefs[arguments[C]]={};
aipo.container.gadgets_[G].userPrefs[arguments[C]]["value"]=arguments[C+1]
}}var B={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(A)};
var I="?template=UserPrefUpdateJSONScreen&js_peid="+encodeURIComponent(F);
gadgets.io.makeNonProxiedRequest(I,E,B,"application/javascript");
function E(M){if(M.rc==200){}}};
aipo.IfrGadgetService.prototype.setTitle=function(A){};
aipo.IfrGadgetService.prototype.requestNavigateTo=function(E,D){var B=this.f.replace("remote_iframe_","").split("_NN_")[0].replace("-popup","");
var A="?js_peid="+encodeURIComponent(B);
if(E=="canvas"){A+="&action=controls.Maximize"
}else{if(E=="home"){A+="&action=controls.Restore"
}}if(D){var C=gadgets.json.stringify(D);
if(C.length>0){A+="&appParams="+encodeURIComponent(C)
}}document.location.href=A
};
aipo.activityDesktopNotifyEnable=null;
aipo.IfrGadgetService.prototype.requestDesktopNotifyEnable=function(A){function D(F){if(F.rc==200){var G=F.data;
if(G){aipo.activityDesktopNotifyEnable=G.enable
}}}var C={};
var B={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(C)};
var E="?template=ActivityNotifyEnableJSONScreen";
if(aipo.activityDesktopNotifyEnable!=null){if(!aipo.activityDesktopNotifyEnable||window.webkitNotifications.checkPermission()!=0){window.webkitNotifications.requestPermission(function(){if(window.webkitNotifications.checkPermission()==0){E+="&enable=T";
gadgets.io.makeNonProxiedRequest(E,D,B,"application/javascript")
}})
}else{E+="&enable=F";
gadgets.io.makeNonProxiedRequest(E,D,B,"application/javascript")
}}else{gadgets.io.makeNonProxiedRequest(E,D,B,"application/javascript")
}};
aipo.activityMax=null;
aipo.IfrGadgetService.prototype.requestCheckActivity=function(E){var C={};
var B={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(C)};
var A="?template=CheckActivityJSONScreen&isRead="+E;
if(aipo.activityMax){A+="&max="+aipo.activityMax
}gadgets.io.makeNonProxiedRequest(A,D,B,"application/javascript");
function D(N){if(N.rc==200){var O=N.data;
var M=O.unreadCount;
var L={Workflow:"workflow",todo:"todo",Report:"report",Note:"note"};
aipo.activityMax=O.max;
var J=dijit.byId("activitycheckerContainer");
var P;
if(dojo.byId("messagechecker")!=undefined){P=parseInt(M)+parseInt(dojo.byId("messagechecker").innerHTML)
}else{P=parseInt(M)
}if(!P){document.title=djConfig.siteTitle
}else{if(P>99){document.title="(99+) "+djConfig.siteTitle
}else{document.title="("+P+") "+djConfig.siteTitle
}}if(J){J.onCheckActivity(M);
for(key in O.activities){var F=O.activities[key];
var H=F.appId;
var Q=L[H];
if(Q=="workflow"||Q=="todo"||Q=="report"||Q=="note"){aipo.portletReload(Q)
}}}if(aipo.activityDesktopNotifyEnable&&window.webkitNotifications&&window.webkitNotifications.checkPermission()==0){var G=new Array();
for(key in O.activities){var K=O.activities[key];
var I=window.webkitNotifications.createNotification("images/favicon48.png",K.displayName,K.text);
I.show();
I.ondisplay=function(R){setTimeout(function(){R.currentTarget.cancel()
},7*1000)
};
G.push(I)
}}}}};
aipo.IfrGadgetService.prototype.requestCheckTimeline=function(){var B=0;
var A=dojo.byId("getTimelineOnClick").innerHTML;
if(A!="true"){dojo.query("#timelineOuter .elastic").forEach(function(C){if(C.value!=C.defaultValue){B++
}});
if(dojo.byId("modalDialog")!=undefined&&dojo.byId("modalDialog").style.display!="none"){B++
}}if(B==0){aipo.portletReload("timeline")
}else{dojo.query(".newMessage").style("display","")
}};
aipo.IfrContainer=function(){shindig.Container.call(this);
this.context=new Array()
};
aipo.IfrContainer.inherits(shindig.Container);
aipo.IfrContainer.prototype.gadgetClass=shindig.BaseIfrGadget;
aipo.IfrContainer.prototype.gadgetService=new aipo.IfrGadgetService();
aipo.IfrContainer.prototype.setParentUrl=function(A){if(!A.match(/^http[s]?:\/\//)){A=document.location.href.match(/^[^?#]+\//)[0]+A
}this.parentUrl_=A
};
aipo.IfrContainer.prototype.assign=function(A){this.context.push(A)
};
aipo.IfrContainer.prototype.getContext=function(){return this.context
};
aipo.IfrContainer.prototype.addGadget=function(A){this.gadgets_[this.getGadgetKey_(A.id)]=A
};
aipo.IfrContainer.prototype.renderGadget=function(A){var B=this.layoutManager.getGadgetChrome(A);
if(!A.count){A.count=0
}A.count++;
A.render(B)
};
aipo.IfrContainer.prototype.renderGadgets=function(){var A=this.context;
for(var D=0;
D<A.length;
D++){var C=A[D];
var B=this.createGadget(C);
B.setServerBase(C.serverBase);
this.addGadget(B)
}aipo.cron.start()
};
var tmpGadget;
aipo.IfrContainer.prototype.renderGadgetFromContext=function(B){var C=this.createGadget(B);
C.setServerBase(B.serverBase);
C.id=this.getNextGadgetInstanceId();
C.portletId+="-popup";
var A="gadget-chrome-"+C.portletId;
var D=A?document.getElementById(A):null;
if(!C.count){C.count=0
}C.count++;
C.render(D);
tmpGadget=C
};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.portletId+"_NN_"+this.count
};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var B=this;
var A=aipo.IfrGadget;
for(var C in A){if(A.hasOwnProperty(C)){B[C]=A[C]
}}};
shindig.Gadget.prototype.getContent=function(A){shindig.callAsyncAndJoin(["getMainContent"],function(B){A(B.join(""))
},this)
};
aipo.container=new aipo.IfrContainer();
aipo.container.layoutManager=new aipo.PortletLayoutManager();
aipo.container.userPrefStore=new aipo.PsmlUserPrefStore();
aipo.cron=new CronTask(function(C){var E=aipo.container.context;
var B={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(aipo.container.context)};
var A="?template=GadgetsSecurityTokenUpdateJSONScreen&view="+aipo.container.view_;
if(!aipo.cron.isFirst){A+="&update=1"
}function D(M){if(M.rc==200){var N=M.data;
for(var F=0;
F<N.length;
F++){var K=N[F];
var L=aipo.container.gadgets_["gadget_"+K.id];
if(!aipo.cron.isFirst){gadgets.rpc.call("remote_iframe_"+K.portletId+"_NN_"+L.count,"update_security_token",null,K.secureToken);
L.secureToken=K.secureToken
}var I=K.height;
var H=null;
if(K.views){H=K.views[aipo.container.view_];
var J=0;
if(H){J=H.preferredHeight
}else{var G=K.views["default"];
if(G){J=G.preferredHeight
}}}if(I>0){L.height=I
}if(J>0){L.height=J
}L.scrolling=K.scrolling?"true":"no";
if(aipo.cron.isFirst){aipo.container.renderGadget(L)
}}aipo.cron.isFirst=false
}}gadgets.io.makeNonProxiedRequest(A,D,B,"application/javascript");
C()
},30*60*1000,true);
aipo.cron.isFirst=true;
aipo.container.onPopupGadgets=function(){var A=document.getElementById("gadgets-popup-action");
if(A){location.href=A.href
}};