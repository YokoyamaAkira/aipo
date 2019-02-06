if(!dojo._hasResource["dijit.layout.ContentPane"]){dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.require("dijit._Widget");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dojo.parser");
dojo.require("dojo.string");
dojo.requireLocalization("dijit","loading",null,"cs,de,es,fr,hu,it,ja,ko,ROOT,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var A=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,A);
this.errorMessage=dojo.string.substitute(this.errorMessage,A);
dojo.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var B=dojo.query(">",this.containerNode||this.domNode),A=B.filter("[widgetId]");
if(B.length==1&&A.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(A[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(A){this.href=A;
return this._prepareLoad()
},setContent:function(A){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(A||"");
this._isDownloaded=false;
if(this.parseOnLoad){this._createSubWidgets()
}this._checkIfSingleChild();
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}this._onLoadHandler()
},cancel:function(){if(this._xhrDfd&&(this._xhrDfd.fired==-1)){this._xhrDfd.cancel()
}delete this._xhrDfd
},destroy:function(){if(this._beingDestroyed){return 
}this._onUnloadHandler();
this._beingDestroyed=true;
this.inherited("destroy",arguments)
},resize:function(A){dojo.marginBox(this.domNode,A);
var B=this.containerNode||this.domNode,C=dojo.mixin(dojo.marginBox(B),A||{});
this._contentBox=dijit.layout.marginBox2contentBox(B,C);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(A){this.cancel();
this.isLoaded=false;
this._loadCheck(A)
},_loadCheck:function(B){var A=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(B||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&A&&!this._xhrDfd)||(!this.isLoaded&&A&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var B=this;
var C={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(C,this.ioArgs)
}var A=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(C);
A.addCallback(function(D){try{B.onDownloadEnd.call(B);
B._isDownloaded=true;
B.setContent.call(B,D)
}catch(E){B._onError.call(B,"Content",E)
}delete B._xhrDfd;
return D
});
A.addErrback(function(D){if(!A.cancelled){B._onError.call(B,"Download",D)
}delete B._xhrDfd;
return D
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(A){this.destroyDescendants();
try{var B=this.containerNode||this.domNode;
while(B.firstChild){dojo._destroyElement(B.firstChild)
}if(typeof A=="string"){if(this.extractContent){match=A.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){A=match[1]
}}B.innerHTML=A
}else{if(A.nodeType){B.appendChild(A)
}else{dojo.forEach(A,function(E){B.appendChild(E.cloneNode(true))
})
}}}catch(D){var C=this.onContentError(D);
try{B.innerHTML=C
}catch(D){console.error("Fatal "+this.id+" could not change content due to "+D.message,D)
}}},_onError:function(B,D,A){var C=this["on"+B+"Error"].call(this,D);
if(A){console.error(A,D)
}else{if(C){this._setContent.call(this,C)
}}},_createSubWidgets:function(){var A=this.containerNode||this.domNode;
try{dojo.parser.parse(A,true)
}catch(B){this._onError("Content",B,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(A){},onUnload:function(A){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(A){},onDownloadError:function(A){return this.errorMessage
},onDownloadEnd:function(){}})
};