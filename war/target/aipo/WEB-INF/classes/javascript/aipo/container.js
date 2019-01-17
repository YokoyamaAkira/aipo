aipo.PortletLayoutManager=function(){shindig.LayoutManager.call(this)
};
aipo.PortletLayoutManager.inherits(shindig.LayoutManager);
aipo.PortletLayoutManager.prototype.getGadgetChrome=function(B){var A="gadget-chrome-"+B.portletId;
return A?document.getElementById(A):null
};
aipo.PsmlUserPrefStore=function(){shindig.UserPrefStore.call(this)
};
aipo.PsmlUserPrefStore.inherits(shindig.UserPrefStore);
aipo.PsmlUserPrefStore.prototype.getPrefs=function(A){};
aipo.PsmlUserPrefStore.prototype.savePrefs=function(A){};
aipo.IfrGadget={getMainContent:function(A){var B=this.getIframeId();
gadgets.rpc.setRelayUrl(B,this.serverBase_+this.rpcRelay);
gadgets.rpc.setAuthToken(B,this.rpcToken);
A('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+B+'" name="'+B+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no"'+(this.scrolling?' scrolling="'+this.scrolling+'"':"no")+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")
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
aipo.IfrGadgetService.prototype.setUserPref=function(H,B,L){var J=this.f.replace("remote_iframe_","").split("_NN_")[0].replace("-popup","");
var K=null;
for(key in aipo.container.gadgets_){var C=aipo.container.gadgets_[key];
if(J==C.portletId){K=key;
break
}}var E={};
for(var G=1,D=arguments.length;
G<D;
G+=2){E[arguments[G]]=arguments[G+1];
if(K){aipo.container.gadgets_[K].userPrefs[arguments[G]]={};
aipo.container.gadgets_[K].userPrefs[arguments[G]]["value"]=arguments[G+1]
}}var F={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(E)};
var A="?template=UserPrefUpdateJSONScreen&js_peid="+encodeURIComponent(J);
gadgets.io.makeNonProxiedRequest(A,I,F,"application/javascript");
function I(M){if(M.rc==200){}}};
aipo.IfrGadgetService.prototype.setTitle=function(A){};
aipo.IfrGadgetService.prototype.requestNavigateTo=function(A,E){var C=this.f.replace("remote_iframe_","").split("_NN_")[0].replace("-popup","");
var B="?js_peid="+encodeURIComponent(C);
if(A=="canvas"){B+="&action=controls.Maximize"
}else{if(A=="home"){B+="&action=controls.Restore"
}}if(E){var D=gadgets.json.stringify(E);
if(D.length>0){B+="&appParams="+encodeURIComponent(D)
}}document.location.href=B
};
aipo.activityDesktopNotifyEnable=null;
aipo.IfrGadgetService.prototype.requestDesktopNotifyEnable=function(B){function E(G){if(G.rc==200){var F=G.data;
if(F){aipo.activityDesktopNotifyEnable=F.enable
}}}var D={};
var C={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(D)};
var A="?template=ActivityNotifyEnableJSONScreen";
if(aipo.activityDesktopNotifyEnable!=null){if(!aipo.activityDesktopNotifyEnable||window.webkitNotifications.checkPermission()!=0){window.webkitNotifications.requestPermission(function(){if(window.webkitNotifications.checkPermission()==0){A+="&enable=T";
gadgets.io.makeNonProxiedRequest(A,E,C,"application/javascript")
}})
}else{A+="&enable=F";
gadgets.io.makeNonProxiedRequest(A,E,C,"application/javascript")
}}else{gadgets.io.makeNonProxiedRequest(A,E,C,"application/javascript")
}};
aipo.activityMax=null;
aipo.IfrGadgetService.prototype.requestCheckActivity=function(A){var D={};
var C={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(D)};
var B="?template=CheckActivityJSONScreen&isRead="+A;
if(aipo.activityMax){B+="&max="+aipo.activityMax
}gadgets.io.makeNonProxiedRequest(B,E,C,"application/javascript");
function E(J){if(J.rc==200){var K=J.data;
var I=K.unreadCount;
var H={Workflow:"workflow",todo:"todo",Report:"report",Note:"note"};
aipo.activityMax=K.max;
var Q=dijit.byId("activitycheckerContainer");
var L;
if(dojo.byId("messagechecker")!=undefined){L=parseInt(I)+parseInt(dojo.byId("messagechecker").innerHTML)
}else{L=parseInt(I)
}if(!L){document.title=djConfig.siteTitle
}else{if(L>99){document.title="(99+) "+djConfig.siteTitle
}else{document.title="("+L+") "+djConfig.siteTitle
}}if(Q){Q.onCheckActivity(I);
for(key in K.activities){var N=K.activities[key];
var P=N.appId;
var M=H[P];
if(M=="workflow"||M=="todo"||M=="report"||M=="note"){aipo.portletReload(M)
}}}if(aipo.activityDesktopNotifyEnable&&window.webkitNotifications&&window.webkitNotifications.checkPermission()==0){var O=new Array();
for(key in K.activities){var G=K.activities[key];
var F=window.webkitNotifications.createNotification("images/favicon48.png",G.displayName,G.text);
F.show();
F.ondisplay=function(R){setTimeout(function(){R.currentTarget.cancel()
},7*1000)
};
O.push(F)
}}}}};
aipo.IfrGadgetService.prototype.requestCheckTimeline=function(){var A=0;
var B=dojo.byId("getTimelineOnClick").innerHTML;
if(B!="true"){dojo.query("#timelineOuter .elastic").forEach(function(C){if(C.value!=C.defaultValue){A++
}});
if(dojo.byId("modalDialog")!=undefined&&dojo.byId("modalDialog").style.display!="none"){A++
}}if(A==0){aipo.portletReload("timeline")
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
aipo.IfrContainer.prototype.renderGadget=function(B){var A=this.layoutManager.getGadgetChrome(B);
if(!B.count){B.count=0
}B.count++;
B.render(A)
};
aipo.IfrContainer.prototype.renderGadgets=function(){var B=this.context;
for(var A=0;
A<B.length;
A++){var D=B[A];
var C=this.createGadget(D);
C.setServerBase(D.serverBase);
this.addGadget(C)
}aipo.cron.start()
};
var tmpGadget;
aipo.IfrContainer.prototype.renderGadgetFromContext=function(C){var D=this.createGadget(C);
D.setServerBase(C.serverBase);
D.id=this.getNextGadgetInstanceId();
D.portletId+="-popup";
var B="gadget-chrome-"+D.portletId;
var A=B?document.getElementById(B):null;
if(!D.count){D.count=0
}D.count++;
D.render(A);
tmpGadget=D
};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.portletId+"_NN_"+this.count
};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var C=this;
var B=aipo.IfrGadget;
for(var A in B){if(B.hasOwnProperty(A)){C[A]=B[A]
}}};
shindig.Gadget.prototype.getContent=function(A){shindig.callAsyncAndJoin(["getMainContent"],function(B){A(B.join(""))
},this)
};
aipo.container=new aipo.IfrContainer();
aipo.container.layoutManager=new aipo.PortletLayoutManager();
aipo.container.userPrefStore=new aipo.PsmlUserPrefStore();
aipo.cron=new CronTask(function(D){var A=aipo.container.context;
var C={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(aipo.container.context)};
var B="?template=GadgetsSecurityTokenUpdateJSONScreen&view="+aipo.container.view_;
if(!aipo.cron.isFirst){B+="&update=1"
}function E(I){if(I.rc==200){var J=I.data;
for(var K=0;
K<J.length;
K++){var G=J[K];
var H=aipo.container.gadgets_["gadget_"+G.id];
if(!aipo.cron.isFirst){gadgets.rpc.call("remote_iframe_"+G.portletId+"_NN_"+H.count,"update_security_token",null,G.secureToken);
H.secureToken=G.secureToken
}var N=G.height;
var M=null;
if(G.views){M=G.views[aipo.container.view_];
var F=0;
if(M){F=M.preferredHeight
}else{var L=G.views["default"];
if(L){F=L.preferredHeight
}}}if(N>0){H.height=N
}if(F>0){H.height=F
}H.scrolling=G.scrolling?"true":"no";
if(aipo.cron.isFirst){aipo.container.renderGadget(H)
}}aipo.cron.isFirst=false
}}gadgets.io.makeNonProxiedRequest(B,E,C,"application/javascript");
D()
},30*60*1000,true);
aipo.cron.isFirst=true;
aipo.container.onPopupGadgets=function(){var A=document.getElementById("gadgets-popup-action");
if(A){location.href=A.href
}};