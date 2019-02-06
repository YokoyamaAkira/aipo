dojo._xdResourceLoaded({depends:[["provide","dijit.layout.ContentPane"],["require","dijit._Widget"],["require","dijit.layout._LayoutWidget"],["require","dojo.parser"],["require","dojo.string"],["requireLocalization","dijit","loading",null,"cs,de,es,fr,hu,it,ja,ko,ROOT,pl,pt,ru,zh,zh-tw","cs,de,es,fr,hu,it,ja,ko,ROOT,pl,pt,ru,zh,zh-tw"]],defineResource:function(A){if(!A._hasResource["dijit.layout.ContentPane"]){A._hasResource["dijit.layout.ContentPane"]=true;
A.provide("dijit.layout.ContentPane");
A.require("dijit._Widget");
A.require("dijit.layout._LayoutWidget");
A.require("dojo.parser");
A.require("dojo.string");
A.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var B=A.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=A.string.substitute(this.loadingMessage,B);
this.errorMessage=A.string.substitute(this.errorMessage,B);
A.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var B=A.query(">",this.containerNode||this.domNode),C=B.filter("[widgetId]");
if(B.length==1&&C.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(C[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(B){this.href=B;
return this._prepareLoad()
},setContent:function(B){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(B||"");
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
},resize:function(C){A.marginBox(this.domNode,C);
var D=this.containerNode||this.domNode,B=A.mixin(A.marginBox(D),C||{});
this._contentBox=dijit.layout.marginBox2contentBox(D,B);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(B){this.cancel();
this.isLoaded=false;
this._loadCheck(B)
},_loadCheck:function(B){var C=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(B||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&C&&!this._xhrDfd)||(!this.isLoaded&&C&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var D=this;
var B={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(A.isObject(this.ioArgs)){A.mixin(B,this.ioArgs)
}var C=this._xhrDfd=(this.ioMethod||A.xhrGet)(B);
C.addCallback(function(E){try{D.onDownloadEnd.call(D);
D._isDownloaded=true;
D.setContent.call(D,E)
}catch(F){D._onError.call(D,"Content",F)
}delete D._xhrDfd;
return E
});
C.addErrback(function(E){if(!C.cancelled){D._onError.call(D,"Download",E)
}delete D._xhrDfd;
return E
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(B){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(B){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(C){this.destroyDescendants();
try{var D=this.containerNode||this.domNode;
while(D.firstChild){A._destroyElement(D.firstChild)
}if(typeof C=="string"){if(this.extractContent){match=C.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){C=match[1]
}}D.innerHTML=C
}else{if(C.nodeType){D.appendChild(C)
}else{A.forEach(C,function(F){D.appendChild(F.cloneNode(true))
})
}}}catch(B){var E=this.onContentError(B);
try{D.innerHTML=E
}catch(B){console.error("Fatal "+this.id+" could not change content due to "+B.message,B)
}}},_onError:function(D,B,C){var E=this["on"+D+"Error"].call(this,B);
if(C){console.error(C,B)
}else{if(E){this._setContent.call(this,E)
}}},_createSubWidgets:function(){var C=this.containerNode||this.domNode;
try{A.parser.parse(C,true)
}catch(B){this._onError("Content",B,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(B){},onUnload:function(B){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(B){},onDownloadError:function(B){return this.errorMessage
},onDownloadEnd:function(){}})
}}});