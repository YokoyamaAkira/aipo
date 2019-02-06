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
},_checkIfSingleChild:function(){var A=dojo.query(">",this.containerNode||this.domNode),B=A.filter("[widgetId]");
if(A.length==1&&B.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(B[0])
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
},resize:function(C){dojo.marginBox(this.domNode,C);
var A=this.containerNode||this.domNode,B=dojo.mixin(dojo.marginBox(A),C||{});
this._contentBox=dijit.layout.marginBox2contentBox(A,B);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(A){this.cancel();
this.isLoaded=false;
this._loadCheck(A)
},_loadCheck:function(A){var B=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(A||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&B&&!this._xhrDfd)||(!this.isLoaded&&B&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var A=this;
var B={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(B,this.ioArgs)
}var C=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(B);
C.addCallback(function(E){try{A.onDownloadEnd.call(A);
A._isDownloaded=true;
A.setContent.call(A,E)
}catch(D){A._onError.call(A,"Content",D)
}delete A._xhrDfd;
return E
});
C.addErrback(function(D){if(!C.cancelled){A._onError.call(A,"Download",D)
}delete A._xhrDfd;
return D
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(D){this.destroyDescendants();
try{var A=this.containerNode||this.domNode;
while(A.firstChild){dojo._destroyElement(A.firstChild)
}if(typeof D=="string"){if(this.extractContent){match=D.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){D=match[1]
}}A.innerHTML=D
}else{if(D.nodeType){A.appendChild(D)
}else{dojo.forEach(D,function(E){A.appendChild(E.cloneNode(true))
})
}}}catch(C){var B=this.onContentError(C);
try{A.innerHTML=B
}catch(C){console.error("Fatal "+this.id+" could not change content due to "+C.message,C)
}}},_onError:function(A,C,D){var B=this["on"+A+"Error"].call(this,C);
if(D){console.error(D,C)
}else{if(B){this._setContent.call(this,B)
}}},_createSubWidgets:function(){var B=this.containerNode||this.domNode;
try{dojo.parser.parse(B,true)
}catch(A){this._onError("Content",A,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(A){},onUnload:function(A){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(A){},onDownloadError:function(A){return this.errorMessage
},onDownloadEnd:function(){}})
};