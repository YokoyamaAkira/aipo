dojo._xdResourceLoaded({depends:[["provide","dijit._editor.RichText"],["require","dijit._Widget"],["require","dijit._editor.selection"],["require","dojo.i18n"],["requireLocalization","dijit","Textarea",null,"ROOT","ROOT"]],defineResource:function(dojo){if(!dojo._hasResource["dijit._editor.RichText"]){dojo._hasResource["dijit._editor.RichText"]=true;
dojo.provide("dijit._editor.RichText");
dojo.require("dijit._Widget");
dojo.require("dijit._editor.selection");
dojo.require("dojo.i18n");
if(!djConfig.useXDomain||djConfig.allowXdRichTextSave){if(dojo._postLoad){(function(){var savetextarea=dojo.doc.createElement("textarea");
savetextarea.id="dijit._editor.RichText.savedContent";
var s=savetextarea.style;
s.display="none";
s.position="absolute";
s.top="-100px";
s.left="-100px";
s.height="3px";
s.width="3px";
dojo.body().appendChild(savetextarea)
})()
}else{try{dojo.doc.write('<textarea id="dijit._editor.RichText.savedContent" style="display:none;position:absolute;top:-100px;left:-100px;height:3px;width:3px;overflow:hidden;"></textarea>')
}catch(e){}}}dojo.declare("dijit._editor.RichText",[dijit._Widget],{constructor:function(){this.contentPreFilters=[];
this.contentPostFilters=[];
this.contentDomPreFilters=[];
this.contentDomPostFilters=[];
this.editingAreaStyleSheets=[];
this._keyHandlers={};
this.contentPreFilters.push(dojo.hitch(this,"_preFixUrlAttributes"));
if(dojo.isMoz){this.contentPreFilters.push(this._fixContentForMoz)
}this.onLoadDeferred=new dojo.Deferred()
},inheritWidth:false,focusOnLoad:false,name:"",styleSheets:"",_content:"",height:"300px",minHeight:"1em",isClosed:true,isLoaded:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",onLoadDeferred:null,postCreate:function(){dojo.publish("dijit._editor.RichText::init",[this]);
this.open();
this.setupDefaultShortcuts()
},setupDefaultShortcuts:function(){var ctrl=this.KEY_CTRL;
var exec=function(cmd,arg){return arguments.length==1?function(){this.execCommand(cmd)
}:function(){this.execCommand(cmd,arg)
}
};
this.addKeyHandler("b",ctrl,exec("bold"));
this.addKeyHandler("i",ctrl,exec("italic"));
this.addKeyHandler("u",ctrl,exec("underline"));
this.addKeyHandler("a",ctrl,exec("selectall"));
this.addKeyHandler("s",ctrl,function(){this.save(true)
});
this.addKeyHandler("1",ctrl,exec("formatblock","h1"));
this.addKeyHandler("2",ctrl,exec("formatblock","h2"));
this.addKeyHandler("3",ctrl,exec("formatblock","h3"));
this.addKeyHandler("4",ctrl,exec("formatblock","h4"));
this.addKeyHandler("\\",ctrl,exec("insertunorderedlist"));
if(!dojo.isIE){this.addKeyHandler("Z",ctrl,exec("redo"))
}},events:["onKeyPress","onKeyDown","onKeyUp","onClick"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){if(this._editorCommandsLocalized){return 
}this._editorCommandsLocalized=true;
var formats=["p","pre","address","h1","h2","h3","h4","h5","h6","ol","div","ul"];
var localhtml="",format,i=0;
while((format=formats[i++])){if(format.charAt(1)!="l"){localhtml+="<"+format+"><span>content</span></"+format+">"
}else{localhtml+="<"+format+"><li>content</li></"+format+">"
}}var div=document.createElement("div");
div.style.position="absolute";
div.style.left="-2000px";
div.style.top="-2000px";
document.body.appendChild(div);
div.innerHTML=localhtml;
var node=div.firstChild;
while(node){dijit._editor.selection.selectElement(node.firstChild);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[node.firstChild]);
var nativename=node.tagName.toLowerCase();
this._local2NativeFormatNames[nativename]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[nativename]]=nativename;
node=node.nextSibling
}document.body.removeChild(div)
},open:function(element){if((!this.onLoadDeferred)||(this.onLoadDeferred.fired>=0)){this.onLoadDeferred=new dojo.Deferred()
}if(!this.isClosed){this.close()
}dojo.publish("dijit._editor.RichText::open",[this]);
this._content="";
if((arguments.length==1)&&(element.nodeName)){this.domNode=element
}if((this.domNode.nodeName)&&(this.domNode.nodeName.toLowerCase()=="textarea")){this.textarea=this.domNode;
this.name=this.textarea.name;
var html=this._preFilterContent(this.textarea.value);
this.domNode=dojo.doc.createElement("div");
this.domNode.setAttribute("widgetId",this.id);
this.textarea.removeAttribute("widgetId");
this.domNode.cssText=this.textarea.cssText;
this.domNode.className+=" "+this.textarea.className;
dojo.place(this.domNode,this.textarea,"before");
var tmpFunc=dojo.hitch(this,function(){with(this.textarea.style){display="block";
position="absolute";
left=top="-1000px";
if(dojo.isIE){this.__overflow=overflow;
overflow="hidden"
}}});
if(dojo.isIE){setTimeout(tmpFunc,10)
}else{tmpFunc()
}}else{var html=this._preFilterContent(this.getNodeChildrenHtml(this.domNode));
this.domNode.innerHTML=""
}if(html==""){html="&nbsp;"
}var content=dojo.contentBox(this.domNode);
this._oldHeight=content.h;
this._oldWidth=content.w;
this.savedContent=html;
if((this.domNode.nodeName)&&(this.domNode.nodeName=="LI")){this.domNode.innerHTML=" <br>"
}this.editingArea=dojo.doc.createElement("div");
this.domNode.appendChild(this.editingArea);
if(this.name!=""&&(!djConfig.useXDomain||djConfig.allowXdRichTextSave)){var saveTextarea=dojo.byId("dijit._editor.RichText.savedContent");
if(saveTextarea.value!=""){var datas=saveTextarea.value.split(this._SEPARATOR),i=0,dat;
while((dat=datas[i++])){var data=dat.split(":");
if(data[0]==this.name){html=data[1];
datas.splice(i,1);
break
}}}dojo.connect(window,"onbeforeunload",this,"_saveContent")
}this.isClosed=false;
if(dojo.isIE||dojo.isSafari||dojo.isOpera){var ifr=this.iframe=dojo.doc.createElement("iframe");
ifr.src="javascript:void(0)";
this.editorObject=ifr;
ifr.style.border="none";
ifr.style.width="100%";
ifr.frameBorder=0;
this.editingArea.appendChild(ifr);
this.window=ifr.contentWindow;
this.document=this.window.document;
this.document.open();
this.document.write(this._getIframeDocTxt(html));
this.document.close();
if(dojo.isIE>=7){if(this.height){ifr.style.height=this.height
}if(this.minHeight){ifr.style.minHeight=this.minHeight
}}else{ifr.style.height=this.height?this.height:this.minHeight
}if(dojo.isIE){this._localizeEditorCommands()
}this.onLoad()
}else{this._drawIframe(html)
}if(this.domNode.nodeName=="LI"){this.domNode.lastChild.style.marginTop="-1.2em"
}this.domNode.className+=" RichTextEditable"
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_localizedIframeTitles:null,_getIframeDocTxt:function(html){var _cs=dojo.getComputedStyle(this.domNode);
if(!this.height&&!dojo.isMoz){html="<div>"+html+"</div>"
}var font=[_cs.fontWeight,_cs.fontSize,_cs.fontFamily].join(" ");
var lineHeight=_cs.lineHeight;
if(lineHeight.indexOf("px")>=0){lineHeight=parseFloat(lineHeight)/parseFloat(_cs.fontSize)
}else{if(lineHeight.indexOf("em")>=0){lineHeight=parseFloat(lineHeight)
}else{lineHeight="1.0"
}}return[this.isLeftToRight()?"<html><head>":"<html dir='rtl'><head>",(dojo.isMoz?"<title>"+this._localizedIframeTitles.iframeEditTitle+"</title>":""),"<style>","body,html {","	background:transparent;","	padding: 0;","	margin: 0;","}","body{","	top:0px; left:0px; right:0px;",((this.height||dojo.isOpera)?"":"position: fixed;"),"	font:",font,";","	min-height:",this.minHeight,";","	line-height:",lineHeight,"}","p{ margin: 1em 0 !important; }",(this.height?"":"body,html{overflow-y:hidden;/*for IE*/} body > div {overflow-x:auto;/*for FF to show vertical scrollbar*/}"),"li > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; } ","li{ min-height:1.2em; }","</style>",this._applyEditingAreaStyleSheets(),"</head><body>"+html+"</body></html>"].join("")
},_drawIframe:function(html){if(!this.iframe){var ifr=this.iframe=dojo.doc.createElement("iframe");
var ifrs=ifr.style;
ifrs.border="none";
ifrs.lineHeight="0";
ifrs.verticalAlign="bottom";
this.editorObject=this.iframe;
this._localizedIframeTitles=dojo.i18n.getLocalization("dijit","Textarea");
var label=dojo.query('label[for="'+this.id+'"]');
if(label.length){this._localizedIframeTitles.iframeEditTitle=label[0].innerHTML+" "+this._localizedIframeTitles.iframeEditTitle
}}this.iframe.style.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){this.iframe.style.height=this.height
}else{this.iframe.height=this._oldHeight
}if(this.textarea){var tmpContent=this.srcNodeRef
}else{var tmpContent=dojo.doc.createElement("div");
tmpContent.style.display="none";
tmpContent.innerHTML=html;
this.editingArea.appendChild(tmpContent)
}this.editingArea.appendChild(this.iframe);
var _iframeInitialized=false;
var contentDoc=this.iframe.contentDocument;
contentDoc.open();
contentDoc.write(this._getIframeDocTxt(html));
contentDoc.close();
var ifrFunc=dojo.hitch(this,function(){if(!_iframeInitialized){_iframeInitialized=true
}else{return 
}if(!this.editNode){try{if(this.iframe.contentWindow){this.window=this.iframe.contentWindow;
this.document=this.iframe.contentWindow.document
}else{if(this.iframe.contentDocument){this.window=this.iframe.contentDocument.window;
this.document=this.iframe.contentDocument
}}if(!this.document.body){throw"Error"
}}catch(e){setTimeout(ifrFunc,500);
_iframeInitialized=false;
return 
}dojo._destroyElement(tmpContent);
this.document.designMode="on";
this.onLoad()
}else{dojo._destroyElement(tmpContent);
this.editNode.innerHTML=html;
this.onDisplayChanged()
}this._preDomFilterContent(this.editNode)
});
ifrFunc()
},_applyEditingAreaStyleSheets:function(){var files=[];
if(this.styleSheets){files=this.styleSheets.split(";");
this.styleSheets=""
}files=files.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var text="",i=0,url;
while((url=files[i++])){var abstring=(new dojo._Url(dojo.global.location,url)).toString();
this.editingAreaStyleSheets.push(abstring);
text+='<link rel="stylesheet" type="text/css" href="'+abstring+'"/>'
}return text
},addStyleSheet:function(uri){var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){url=(new dojo._Url(dojo.global.location,url)).toString()
}if(dojo.indexOf(this.editingAreaStyleSheets,url)>-1){console.debug("dijit._editor.RichText.addStyleSheet: Style sheet "+url+" is already applied to the editing area!");
return 
}this.editingAreaStyleSheets.push(url);
if(this.document.createStyleSheet){this.document.createStyleSheet(url)
}else{var head=this.document.getElementsByTagName("head")[0];
var stylesheet=this.document.createElement("link");
with(stylesheet){rel="stylesheet";
type="text/css";
href=url
}head.appendChild(stylesheet)
}},removeStyleSheet:function(uri){var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){url=(new dojo._Url(dojo.global.location,url)).toString()
}var index=dojo.indexOf(this.editingAreaStyleSheets,url);
if(index==-1){console.debug("dijit._editor.RichText.removeStyleSheet: Style sheet "+url+" is not applied to the editing area so it can not be removed!");
return 
}delete this.editingAreaStyleSheets[index];
dojo.withGlobal(this.window,"query",dojo,['link:[href="'+url+'"]']).orphan()
},disabled:false,_mozSettingProps:["styleWithCSS","insertBrOnReturn"],setDisabled:function(disabled){if(dojo.isIE||dojo.isSafari||dojo.isOpera){this.editNode.contentEditable=!disabled
}else{if(disabled){this._mozSettings=[false,this.blockNodeForEnter==="BR"]
}this.document.designMode=(disabled?"off":"on");
if(!disabled){dojo.forEach(this._mozSettingProps,function(s,i){this.document.execCommand(s,false,this._mozSettings[i])
},this)
}}this.disabled=disabled
},_isResized:function(){return false
},onLoad:function(e){this.isLoaded=true;
if(this.height||dojo.isMoz){this.editNode=this.document.body
}else{this.editNode=this.document.body.firstChild
}this.editNode.contentEditable=true;
this._preDomFilterContent(this.editNode);
var events=this.events.concat(this.captureEvents),i=0,et;
while((et=events[i++])){this.connect(this.document,et.toLowerCase(),et)
}if(!dojo.isIE){try{this.document.execCommand("styleWithCSS",false,false)
}catch(e2){}}else{this.editNode.style.zoom=1
}if(this.focusOnLoad){this.focus()
}this.onDisplayChanged(e);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},onKeyDown:function(e){if(dojo.isIE){if(e.keyCode===dojo.keys.BACKSPACE&&this.document.selection.type==="Control"){dojo.stopEvent(e);
this.execCommand("delete")
}else{if((65<=e.keyCode&&e.keyCode<=90)||(e.keyCode>=37&&e.keyCode<=40)){e.charCode=e.keyCode;
this.onKeyPress(e)
}}}else{if(dojo.isMoz){if(e.keyCode==dojo.keys.TAB&&!e.shiftKey&&!e.ctrlKey&&!e.altKey&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(e)
}else{if(e.keyCode==dojo.keys.TAB&&e.shiftKey){if(this.toolbar){this.toolbar.focus()
}dojo.stopEvent(e)
}}}}},onKeyUp:function(e){return 
},KEY_CTRL:1,KEY_SHIFT:2,onKeyPress:function(e){var modifiers=e.ctrlKey?this.KEY_CTRL:0|e.shiftKey?this.KEY_SHIFT:0;
var key=e.keyChar||e.keyCode;
if(this._keyHandlers[key]){var handlers=this._keyHandlers[key],i=0,h;
while((h=handlers[i++])){if(modifiers==h.modifiers){if(!h.handler.apply(this,arguments)){e.preventDefault()
}break
}}}setTimeout(dojo.hitch(this,function(){this.onKeyPressed(e)
}),1)
},addKeyHandler:function(key,modifiers,handler){if(!dojo.isArray(this._keyHandlers[key])){this._keyHandlers[key]=[]
}this._keyHandlers[key].push({modifiers:modifiers||0,handler:handler})
},onKeyPressed:function(e){this.onDisplayChanged()
},onClick:function(e){this.onDisplayChanged(e)
},_onBlur:function(e){var _c=this.getValue(true);
if(_c!=this.savedContent){this.onChange(_c);
this.savedContent=_c
}if(dojo.isMoz&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeEditTitle
}},_initialFocus:true,_onFocus:function(e){if((dojo.isMoz)&&(this._initialFocus)){this._initialFocus=false;
if(this.editNode.innerHTML.replace(/^\s+|\s+$/g,"")=="&nbsp;"){this.placeCursorAtStart()
}}},blur:function(){if(this.iframe){this.window.blur()
}else{if(this.editNode){this.editNode.blur()
}}},focus:function(){if(this.iframe&&!dojo.isIE){dijit.focus(this.iframe)
}else{if(this.editNode&&this.editNode.focus){dijit.focus(this.editNode)
}else{console.debug("Have no idea how to focus into the editor!")
}}},updateInterval:200,_updateTimer:null,onDisplayChanged:function(e){if(!this._updateTimer){if(this._updateTimer){clearTimeout(this._updateTimer)
}this._updateTimer=setTimeout(dojo.hitch(this,this.onNormalizedDisplayChanged),this.updateInterval)
}},onNormalizedDisplayChanged:function(){this._updateTimer=null
},onChange:function(newContent){},_normalizeCommand:function(cmd){var command=cmd.toLowerCase();
if(command=="formatblock"){if(dojo.isSafari){command="heading"
}}else{if(command=="hilitecolor"&&!dojo.isMoz){command="backcolor"
}}return command
},queryCommandAvailable:function(command){var ie=1;
var mozilla=1<<1;
var safari=1<<2;
var opera=1<<3;
var safari420=1<<4;
var gt420=dojo.isSafari;
function isSupportedBy(browsers){return{ie:Boolean(browsers&ie),mozilla:Boolean(browsers&mozilla),safari:Boolean(browsers&safari),safari420:Boolean(browsers&safari420),opera:Boolean(browsers&opera)}
}var supportedBy=null;
switch(command.toLowerCase()){case"bold":case"italic":case"underline":case"subscript":case"superscript":case"fontname":case"fontsize":case"forecolor":case"hilitecolor":case"justifycenter":case"justifyfull":case"justifyleft":case"justifyright":case"delete":case"selectall":supportedBy=isSupportedBy(mozilla|ie|safari|opera);
break;
case"createlink":case"unlink":case"removeformat":case"inserthorizontalrule":case"insertimage":case"insertorderedlist":case"insertunorderedlist":case"indent":case"outdent":case"formatblock":case"inserthtml":case"undo":case"redo":case"strikethrough":supportedBy=isSupportedBy(mozilla|ie|opera|safari420);
break;
case"blockdirltr":case"blockdirrtl":case"dirltr":case"dirrtl":case"inlinedirltr":case"inlinedirrtl":supportedBy=isSupportedBy(ie);
break;
case"cut":case"copy":case"paste":supportedBy=isSupportedBy(ie|mozilla|safari420);
break;
case"inserttable":supportedBy=isSupportedBy(mozilla|ie);
break;
case"insertcell":case"insertcol":case"insertrow":case"deletecells":case"deletecols":case"deleterows":case"mergecells":case"splitcell":supportedBy=isSupportedBy(ie|mozilla);
break;
default:return false
}return(dojo.isIE&&supportedBy.ie)||(dojo.isMoz&&supportedBy.mozilla)||(dojo.isSafari&&supportedBy.safari)||(gt420&&supportedBy.safari420)||(dojo.isOpera&&supportedBy.opera)
},execCommand:function(command,argument){var returnValue;
this.focus();
command=this._normalizeCommand(command);
if(argument!=undefined){if(command=="heading"){throw new Error("unimplemented")
}else{if((command=="formatblock")&&dojo.isIE){argument="<"+argument+">"
}}}if(command=="inserthtml"){argument=this._preFilterContent(argument);
if(dojo.isIE){var insertRange=this.document.selection.createRange();
insertRange.pasteHTML(argument);
insertRange.select();
returnValue=true
}else{if(dojo.isMoz&&!argument.length){dojo.withGlobal(this.window,"remove",dijit._editor.selection);
returnValue=true
}else{returnValue=this.document.execCommand(command,false,argument)
}}}else{if((command=="unlink")&&(this.queryCommandEnabled("unlink"))&&(dojo.isMoz||dojo.isSafari)){var selection=this.window.getSelection();
var a=dojo.withGlobal(this.window,"getAncestorElement",dijit._editor.selection,["a"]);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[a]);
returnValue=this.document.execCommand("unlink",false,null)
}else{if((command=="hilitecolor")&&(dojo.isMoz)){this.document.execCommand("styleWithCSS",false,true);
returnValue=this.document.execCommand(command,false,argument);
this.document.execCommand("styleWithCSS",false,false)
}else{if((dojo.isIE)&&((command=="backcolor")||(command=="forecolor"))){argument=arguments.length>1?argument:null;
returnValue=this.document.execCommand(command,false,argument)
}else{argument=arguments.length>1?argument:null;
if(argument||command!="createlink"){returnValue=this.document.execCommand(command,false,argument)
}}}}}this.onDisplayChanged();
return returnValue
},queryCommandEnabled:function(command){command=this._normalizeCommand(command);
if(dojo.isMoz||dojo.isSafari){if(command=="unlink"){return dojo.withGlobal(this.window,"hasAncestorElement",dijit._editor.selection,["a"])
}else{if(command=="inserttable"){return true
}}}if(dojo.isSafari){if(command=="copy"){command="cut"
}else{if(command=="paste"){return true
}}}var elem=(dojo.isIE)?this.document.selection.createRange():this.document;
return elem.queryCommandEnabled(command)
},queryCommandState:function(command){command=this._normalizeCommand(command);
return this.document.queryCommandState(command)
},queryCommandValue:function(command){command=this._normalizeCommand(command);
if(dojo.isIE&&command=="formatblock"){return this._local2NativeFormatNames[this.document.queryCommandValue(command)]
}return this.document.queryCommandValue(command)
},placeCursorAtStart:function(){this.focus();
var isvalid=false;
if(dojo.isMoz){var first=this.editNode.firstChild;
while(first){if(first.nodeType==3){if(first.nodeValue.replace(/^\s+|\s+$/g,"").length>0){isvalid=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[first]);
break
}}else{if(first.nodeType==1){isvalid=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[first]);
break
}}first=first.nextSibling
}}else{isvalid=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(isvalid){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[true])
}},placeCursorAtEnd:function(){this.focus();
var isvalid=false;
if(dojo.isMoz){var last=this.editNode.lastChild;
while(last){if(last.nodeType==3){if(last.nodeValue.replace(/^\s+|\s+$/g,"").length>0){isvalid=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[last]);
break
}}else{if(last.nodeType==1){isvalid=true;
if(last.lastChild){dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[last.lastChild])
}else{dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[last])
}break
}}last=last.previousSibling
}}else{isvalid=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(isvalid){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[false])
}},getValue:function(nonDestructive){if(this.textarea){if(this.isClosed||!this.isLoaded){return this.textarea.value
}}return this._postFilterContent(null,nonDestructive)
},setValue:function(html){if(this.textarea&&(this.isClosed||!this.isLoaded)){this.textarea.value=html
}else{html=this._preFilterContent(html);
if(this.isClosed){this.domNode.innerHTML=html;
this._preDomFilterContent(this.domNode)
}else{this.editNode.innerHTML=html;
this._preDomFilterContent(this.editNode)
}}},replaceValue:function(html){if(this.isClosed){this.setValue(html)
}else{if(this.window&&this.window.getSelection&&!dojo.isMoz){this.setValue(html)
}else{if(this.window&&this.window.getSelection){html=this._preFilterContent(html);
this.execCommand("selectall");
if(dojo.isMoz&&!html){html="&nbsp;"
}this.execCommand("inserthtml",html);
this._preDomFilterContent(this.editNode)
}else{if(this.document&&this.document.selection){this.setValue(html)
}}}}},_preFilterContent:function(html){var ec=html;
dojo.forEach(this.contentPreFilters,function(ef){if(ef){ec=ef(ec)
}});
return ec
},_preDomFilterContent:function(dom){dom=dom||this.editNode;
dojo.forEach(this.contentDomPreFilters,function(ef){if(ef&&dojo.isFunction(ef)){ef(dom)
}},this)
},_postFilterContent:function(dom,nonDestructive){dom=dom||this.editNode;
if(this.contentDomPostFilters.length){if(nonDestructive&&dom.cloneNode){dom=dom.cloneNode(true)
}dojo.forEach(this.contentDomPostFilters,function(ef){dom=ef(dom)
})
}var ec=this.getNodeChildrenHtml(dom);
if(!ec.replace(/^(?:\s|\xA0)+/g,"").replace(/(?:\s|\xA0)+$/g,"").length){ec=""
}dojo.forEach(this.contentPostFilters,function(ef){ec=ef(ec)
});
return ec
},_saveContent:function(e){var saveTextarea=dojo.byId("dijit._editor.RichText.savedContent");
saveTextarea.value+=this._SEPARATOR+this.name+":"+this.getValue()
},escapeXml:function(str,noSingleQuotes){str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!noSingleQuotes){str=str.replace(/'/gm,"&#39;")
}return str
},getNodeHtml:function(node){switch(node.nodeType){case 1:var output="<"+node.tagName.toLowerCase();
if(dojo.isMoz){if(node.getAttribute("type")=="_moz"){node.removeAttribute("type")
}if(node.getAttribute("_moz_dirty")!=undefined){node.removeAttribute("_moz_dirty")
}}var attrarray=[];
if(dojo.isIE){var s=node.outerHTML;
s=s.substr(0,s.indexOf(">"));
s=s.replace(/(?:['"])[^"']*\1/g,"");
var reg=/([^\s=]+)=/g;
var m,key;
while((m=reg.exec(s))!=undefined){key=m[1];
if(key.substr(0,3)!="_dj"){if(key=="src"||key=="href"){if(node.getAttribute("_djrealurl")){attrarray.push([key,node.getAttribute("_djrealurl")]);
continue
}}if(key=="class"){attrarray.push([key,node.className])
}else{attrarray.push([key,node.getAttribute(key)])
}}}}else{var attr,i=0,attrs=node.attributes;
while((attr=attrs[i++])){if(attr.name.substr(0,3)!="_dj"){var v=attr.value;
if(attr.name=="src"||attr.name=="href"){if(node.getAttribute("_djrealurl")){v=node.getAttribute("_djrealurl")
}}attrarray.push([attr.name,v])
}}}attrarray.sort(function(a,b){return a[0]<b[0]?-1:(a[0]==b[0]?0:1)
});
i=0;
while((attr=attrarray[i++])){output+=" "+attr[0]+'="'+attr[1]+'"'
}if(node.childNodes.length){output+=">"+this.getNodeChildrenHtml(node)+"</"+node.tagName.toLowerCase()+">"
}else{output+=" />"
}break;
case 3:var output=this.escapeXml(node.nodeValue,true);
break;
case 8:var output="<!--"+this.escapeXml(node.nodeValue,true)+"-->";
break;
default:var output="Element not recognized - Type: "+node.nodeType+" Name: "+node.nodeName
}return output
},getNodeChildrenHtml:function(dom){var out="";
if(!dom){return out
}var nodes=dom.childNodes||dom;
var i=0;
var node;
while((node=nodes[i++])){out+=this.getNodeHtml(node)
}return out
},close:function(save,force){if(this.isClosed){return false
}if(!arguments.length){save=true
}this._content=this.getValue();
var changed=(this.savedContent!=this._content);
if(this.interval){clearInterval(this.interval)
}if(this.textarea){with(this.textarea.style){position="";
left=top="";
if(dojo.isIE){overflow=this.__overflow;
this.__overflow=null
}}if(save){this.textarea.value=this._content
}else{this.textarea.value=this.savedContent
}dojo._destroyElement(this.domNode);
this.domNode=this.textarea
}else{if(save){this.domNode.innerHTML=this._content
}else{this.domNode.innerHTML=this.savedContent
}}dojo.removeClass(this.domNode,"RichTextEditable");
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
if(this.window&&this.window._frameElement){this.window._frameElement=null
}this.window=null;
this.document=null;
this.editingArea=null;
this.editorObject=null;
return changed
},destroyRendering:function(){},destroy:function(){this.destroyRendering();
if(!this.isClosed){this.close(false)
}this.inherited("destroy",arguments)
},_fixContentForMoz:function(html){html=html.replace(/<(\/)?strong([ \>])/gi,"<$1b$2");
html=html.replace(/<(\/)?em([ \>])/gi,"<$1i$2");
return html
},_srcInImgRegex:/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,_hrefInARegex:/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,_preFixUrlAttributes:function(html){html=html.replace(this._hrefInARegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
html=html.replace(this._srcInImgRegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
return html
}})
}}});