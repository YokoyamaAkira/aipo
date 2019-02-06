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
},_checkIfSingleChild:function(){var C=A.query(">",this.containerNode||this.domNode),B=C.filter("[widgetId]");
if(C.length==1&&B.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(B[0])
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
},resize:function(B){A.marginBox(this.domNode,B);
var C=this.containerNode||this.domNode,D=A.mixin(A.marginBox(C),B||{});
this._contentBox=dijit.layout.marginBox2contentBox(C,D);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(B){this.cancel();
this.isLoaded=false;
this._loadCheck(B)
},_loadCheck:function(C){var B=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(C||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&B&&!this._xhrDfd)||(!this.isLoaded&&B&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var C=this;
var D={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(A.isObject(this.ioArgs)){A.mixin(D,this.ioArgs)
}var B=this._xhrDfd=(this.ioMethod||A.xhrGet)(D);
B.addCallback(function(E){try{C.onDownloadEnd.call(C);
C._isDownloaded=true;
C.setContent.call(C,E)
}catch(F){C._onError.call(C,"Content",F)
}delete C._xhrDfd;
return E
});
B.addErrback(function(E){if(!B.cancelled){C._onError.call(C,"Download",E)
}delete C._xhrDfd;
return E
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(B){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(B){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(B){this.destroyDescendants();
try{var C=this.containerNode||this.domNode;
while(C.firstChild){A._destroyElement(C.firstChild)
}if(typeof B=="string"){if(this.extractContent){match=B.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){B=match[1]
}}C.innerHTML=B
}else{if(B.nodeType){C.appendChild(B)
}else{A.forEach(B,function(F){C.appendChild(F.cloneNode(true))
})
}}}catch(E){var D=this.onContentError(E);
try{C.innerHTML=D
}catch(E){console.error("Fatal "+this.id+" could not change content due to "+E.message,E)
}}},_onError:function(C,E,B){var D=this["on"+C+"Error"].call(this,E);
if(B){console.error(B,E)
}else{if(D){this._setContent.call(this,D)
}}},_createSubWidgets:function(){var B=this.containerNode||this.domNode;
try{A.parser.parse(B,true)
}catch(C){this._onError("Content",C,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(B){},onUnload:function(B){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(B){},onDownloadError:function(B){return this.errorMessage
},onDownloadEnd:function(){}})
}}});