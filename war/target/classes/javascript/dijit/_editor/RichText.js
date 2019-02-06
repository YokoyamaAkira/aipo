if(!dojo._hasResource["dijit._editor.RichText"]){dojo._hasResource["dijit._editor.RichText"]=true;
dojo.provide("dijit._editor.RichText");
dojo.require("dijit._Widget");
dojo.require("dijit._editor.selection");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit","Textarea",null,"ROOT");
if(!djConfig.useXDomain||djConfig.allowXdRichTextSave){if(dojo._postLoad){(function(){var B=dojo.doc.createElement("textarea");
B.id="dijit._editor.RichText.savedContent";
var A=B.style;
A.display="none";
A.position="absolute";
A.top="-100px";
A.left="-100px";
A.height="3px";
A.width="3px";
dojo.body().appendChild(B)
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
},setupDefaultShortcuts:function(){var A=this.KEY_CTRL;
var B=function(C,D){return arguments.length==1?function(){this.execCommand(C)
}:function(){this.execCommand(C,D)
}
};
this.addKeyHandler("b",A,B("bold"));
this.addKeyHandler("i",A,B("italic"));
this.addKeyHandler("u",A,B("underline"));
this.addKeyHandler("a",A,B("selectall"));
this.addKeyHandler("s",A,function(){this.save(true)
});
this.addKeyHandler("1",A,B("formatblock","h1"));
this.addKeyHandler("2",A,B("formatblock","h2"));
this.addKeyHandler("3",A,B("formatblock","h3"));
this.addKeyHandler("4",A,B("formatblock","h4"));
this.addKeyHandler("\\",A,B("insertunorderedlist"));
if(!dojo.isIE){this.addKeyHandler("Z",A,B("redo"))
}},events:["onKeyPress","onKeyDown","onKeyUp","onClick"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){if(this._editorCommandsLocalized){return 
}this._editorCommandsLocalized=true;
var F=["p","pre","address","h1","h2","h3","h4","h5","h6","ol","div","ul"];
var B="",C,G=0;
while((C=F[G++])){if(C.charAt(1)!="l"){B+="<"+C+"><span>content</span></"+C+">"
}else{B+="<"+C+"><li>content</li></"+C+">"
}}var D=document.createElement("div");
D.style.position="absolute";
D.style.left="-2000px";
D.style.top="-2000px";
document.body.appendChild(D);
D.innerHTML=B;
var A=D.firstChild;
while(A){dijit._editor.selection.selectElement(A.firstChild);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A.firstChild]);
var E=A.tagName.toLowerCase();
this._local2NativeFormatNames[E]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[E]]=E;
A=A.nextSibling
}document.body.removeChild(D)
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
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_localizedIframeTitles:null,_getIframeDocTxt:function(A){var C=dojo.getComputedStyle(this.domNode);
if(!this.height&&!dojo.isMoz){A="<div>"+A+"</div>"
}var D=[C.fontWeight,C.fontSize,C.fontFamily].join(" ");
var B=C.lineHeight;
if(B.indexOf("px")>=0){B=parseFloat(B)/parseFloat(C.fontSize)
}else{if(B.indexOf("em")>=0){B=parseFloat(B)
}else{B="1.0"
}}return[this.isLeftToRight()?"<html><head>":"<html dir='rtl'><head>",(dojo.isMoz?"<title>"+this._localizedIframeTitles.iframeEditTitle+"</title>":""),"<style>","body,html {","	background:transparent;","	padding: 0;","	margin: 0;","}","body{","	top:0px; left:0px; right:0px;",((this.height||dojo.isOpera)?"":"position: fixed;"),"	font:",D,";","	min-height:",this.minHeight,";","	line-height:",B,"}","p{ margin: 1em 0 !important; }",(this.height?"":"body,html{overflow-y:hidden;/*for IE*/} body > div {overflow-x:auto;/*for FF to show vertical scrollbar*/}"),"li > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; } ","li{ min-height:1.2em; }","</style>",this._applyEditingAreaStyleSheets(),"</head><body>"+A+"</body></html>"].join("")
},_drawIframe:function(A){if(!this.iframe){var C=this.iframe=dojo.doc.createElement("iframe");
var B=C.style;
B.border="none";
B.lineHeight="0";
B.verticalAlign="bottom";
this.editorObject=this.iframe;
this._localizedIframeTitles=dojo.i18n.getLocalization("dijit","Textarea");
var H=dojo.query('label[for="'+this.id+'"]');
if(H.length){this._localizedIframeTitles.iframeEditTitle=H[0].innerHTML+" "+this._localizedIframeTitles.iframeEditTitle
}}this.iframe.style.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){this.iframe.style.height=this.height
}else{this.iframe.height=this._oldHeight
}if(this.textarea){var G=this.srcNodeRef
}else{var G=dojo.doc.createElement("div");
G.style.display="none";
G.innerHTML=A;
this.editingArea.appendChild(G)
}this.editingArea.appendChild(this.iframe);
var D=false;
var F=this.iframe.contentDocument;
F.open();
F.write(this._getIframeDocTxt(A));
F.close();
var E=dojo.hitch(this,function(){if(!D){D=true
}else{return 
}if(!this.editNode){try{if(this.iframe.contentWindow){this.window=this.iframe.contentWindow;
this.document=this.iframe.contentWindow.document
}else{if(this.iframe.contentDocument){this.window=this.iframe.contentDocument.window;
this.document=this.iframe.contentDocument
}}if(!this.document.body){throw"Error"
}}catch(I){setTimeout(E,500);
D=false;
return 
}dojo._destroyElement(G);
this.document.designMode="on";
this.onLoad()
}else{dojo._destroyElement(G);
this.editNode.innerHTML=A;
this.onDisplayChanged()
}this._preDomFilterContent(this.editNode)
});
E()
},_applyEditingAreaStyleSheets:function(){var C=[];
if(this.styleSheets){C=this.styleSheets.split(";");
this.styleSheets=""
}C=C.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var D="",B=0,A;
while((A=C[B++])){var E=(new dojo._Url(dojo.global.location,A)).toString();
this.editingAreaStyleSheets.push(E);
D+='<link rel="stylesheet" type="text/css" href="'+E+'"/>'
}return D
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
}},removeStyleSheet:function(B){var A=B.toString();
if(A.charAt(0)=="."||(A.charAt(0)!="/"&&!B.host)){A=(new dojo._Url(dojo.global.location,A)).toString()
}var C=dojo.indexOf(this.editingAreaStyleSheets,A);
if(C==-1){console.debug("dijit._editor.RichText.removeStyleSheet: Style sheet "+A+" is not applied to the editing area so it can not be removed!");
return 
}delete this.editingAreaStyleSheets[C];
dojo.withGlobal(this.window,"query",dojo,['link:[href="'+A+'"]']).orphan()
},disabled:false,_mozSettingProps:["styleWithCSS","insertBrOnReturn"],setDisabled:function(A){if(dojo.isIE||dojo.isSafari||dojo.isOpera){this.editNode.contentEditable=!A
}else{if(A){this._mozSettings=[false,this.blockNodeForEnter==="BR"]
}this.document.designMode=(A?"off":"on");
if(!A){dojo.forEach(this._mozSettingProps,function(B,C){this.document.execCommand(B,false,this._mozSettings[C])
},this)
}}this.disabled=A
},_isResized:function(){return false
},onLoad:function(D){this.isLoaded=true;
if(this.height||dojo.isMoz){this.editNode=this.document.body
}else{this.editNode=this.document.body.firstChild
}this.editNode.contentEditable=true;
this._preDomFilterContent(this.editNode);
var A=this.events.concat(this.captureEvents),E=0,C;
while((C=A[E++])){this.connect(this.document,C.toLowerCase(),C)
}if(!dojo.isIE){try{this.document.execCommand("styleWithCSS",false,false)
}catch(B){}}else{this.editNode.style.zoom=1
}if(this.focusOnLoad){this.focus()
}this.onDisplayChanged(D);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},onKeyDown:function(A){if(dojo.isIE){if(A.keyCode===dojo.keys.BACKSPACE&&this.document.selection.type==="Control"){dojo.stopEvent(A);
this.execCommand("delete")
}else{if((65<=A.keyCode&&A.keyCode<=90)||(A.keyCode>=37&&A.keyCode<=40)){A.charCode=A.keyCode;
this.onKeyPress(A)
}}}else{if(dojo.isMoz){if(A.keyCode==dojo.keys.TAB&&!A.shiftKey&&!A.ctrlKey&&!A.altKey&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(A)
}else{if(A.keyCode==dojo.keys.TAB&&A.shiftKey){if(this.toolbar){this.toolbar.focus()
}dojo.stopEvent(A)
}}}}},onKeyUp:function(A){return 
},KEY_CTRL:1,KEY_SHIFT:2,onKeyPress:function(E){var A=E.ctrlKey?this.KEY_CTRL:0|E.shiftKey?this.KEY_SHIFT:0;
var C=E.keyChar||E.keyCode;
if(this._keyHandlers[C]){var F=this._keyHandlers[C],B=0,D;
while((D=F[B++])){if(A==D.modifiers){if(!D.handler.apply(this,arguments)){E.preventDefault()
}break
}}}setTimeout(dojo.hitch(this,function(){this.onKeyPressed(E)
}),1)
},addKeyHandler:function(A,C,B){if(!dojo.isArray(this._keyHandlers[A])){this._keyHandlers[A]=[]
}this._keyHandlers[A].push({modifiers:C||0,handler:B})
},onKeyPressed:function(A){this.onDisplayChanged()
},onClick:function(A){this.onDisplayChanged(A)
},_onBlur:function(A){var B=this.getValue(true);
if(B!=this.savedContent){this.onChange(B);
this.savedContent=B
}if(dojo.isMoz&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeEditTitle
}},_initialFocus:true,_onFocus:function(A){if((dojo.isMoz)&&(this._initialFocus)){this._initialFocus=false;
if(this.editNode.innerHTML.replace(/^\s+|\s+$/g,"")=="&nbsp;"){this.placeCursorAtStart()
}}},blur:function(){if(this.iframe){this.window.blur()
}else{if(this.editNode){this.editNode.blur()
}}},focus:function(){if(this.iframe&&!dojo.isIE){dijit.focus(this.iframe)
}else{if(this.editNode&&this.editNode.focus){dijit.focus(this.editNode)
}else{console.debug("Have no idea how to focus into the editor!")
}}},updateInterval:200,_updateTimer:null,onDisplayChanged:function(A){if(!this._updateTimer){if(this._updateTimer){clearTimeout(this._updateTimer)
}this._updateTimer=setTimeout(dojo.hitch(this,this.onNormalizedDisplayChanged),this.updateInterval)
}},onNormalizedDisplayChanged:function(){this._updateTimer=null
},onChange:function(A){},_normalizeCommand:function(B){var A=B.toLowerCase();
if(A=="formatblock"){if(dojo.isSafari){A="heading"
}}else{if(A=="hilitecolor"&&!dojo.isMoz){A="backcolor"
}}return A
},queryCommandAvailable:function(A){var F=1;
var D=1<<1;
var G=1<<2;
var H=1<<3;
var E=1<<4;
var B=dojo.isSafari;
function I(J){return{ie:Boolean(J&F),mozilla:Boolean(J&D),safari:Boolean(J&G),safari420:Boolean(J&E),opera:Boolean(J&H)}
}var C=null;
switch(A.toLowerCase()){case"bold":case"italic":case"underline":case"subscript":case"superscript":case"fontname":case"fontsize":case"forecolor":case"hilitecolor":case"justifycenter":case"justifyfull":case"justifyleft":case"justifyright":case"delete":case"selectall":C=I(D|F|G|H);
break;
case"createlink":case"unlink":case"removeformat":case"inserthorizontalrule":case"insertimage":case"insertorderedlist":case"insertunorderedlist":case"indent":case"outdent":case"formatblock":case"inserthtml":case"undo":case"redo":case"strikethrough":C=I(D|F|H|E);
break;
case"blockdirltr":case"blockdirrtl":case"dirltr":case"dirrtl":case"inlinedirltr":case"inlinedirrtl":C=I(F);
break;
case"cut":case"copy":case"paste":C=I(F|D|E);
break;
case"inserttable":C=I(D|F);
break;
case"insertcell":case"insertcol":case"insertrow":case"deletecells":case"deletecols":case"deleterows":case"mergecells":case"splitcell":C=I(F|D);
break;
default:return false
}return(dojo.isIE&&C.ie)||(dojo.isMoz&&C.mozilla)||(dojo.isSafari&&C.safari)||(B&&C.safari420)||(dojo.isOpera&&C.opera)
},execCommand:function(D,C){var B;
this.focus();
D=this._normalizeCommand(D);
if(C!=undefined){if(D=="heading"){throw new Error("unimplemented")
}else{if((D=="formatblock")&&dojo.isIE){C="<"+C+">"
}}}if(D=="inserthtml"){C=this._preFilterContent(C);
if(dojo.isIE){var E=this.document.selection.createRange();
E.pasteHTML(C);
E.select();
B=true
}else{if(dojo.isMoz&&!C.length){dojo.withGlobal(this.window,"remove",dijit._editor.selection);
B=true
}else{B=this.document.execCommand(D,false,C)
}}}else{if((D=="unlink")&&(this.queryCommandEnabled("unlink"))&&(dojo.isMoz||dojo.isSafari)){var A=this.window.getSelection();
var F=dojo.withGlobal(this.window,"getAncestorElement",dijit._editor.selection,["a"]);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[F]);
B=this.document.execCommand("unlink",false,null)
}else{if((D=="hilitecolor")&&(dojo.isMoz)){this.document.execCommand("styleWithCSS",false,true);
B=this.document.execCommand(D,false,C);
this.document.execCommand("styleWithCSS",false,false)
}else{if((dojo.isIE)&&((D=="backcolor")||(D=="forecolor"))){C=arguments.length>1?C:null;
B=this.document.execCommand(D,false,C)
}else{C=arguments.length>1?C:null;
if(C||D!="createlink"){B=this.document.execCommand(D,false,C)
}}}}}this.onDisplayChanged();
return B
},queryCommandEnabled:function(A){A=this._normalizeCommand(A);
if(dojo.isMoz||dojo.isSafari){if(A=="unlink"){return dojo.withGlobal(this.window,"hasAncestorElement",dijit._editor.selection,["a"])
}else{if(A=="inserttable"){return true
}}}if(dojo.isSafari){if(A=="copy"){A="cut"
}else{if(A=="paste"){return true
}}}var B=(dojo.isIE)?this.document.selection.createRange():this.document;
return B.queryCommandEnabled(A)
},queryCommandState:function(A){A=this._normalizeCommand(A);
return this.document.queryCommandState(A)
},queryCommandValue:function(A){A=this._normalizeCommand(A);
if(dojo.isIE&&A=="formatblock"){return this._local2NativeFormatNames[this.document.queryCommandValue(A)]
}return this.document.queryCommandValue(A)
},placeCursorAtStart:function(){this.focus();
var B=false;
if(dojo.isMoz){var A=this.editNode.firstChild;
while(A){if(A.nodeType==3){if(A.nodeValue.replace(/^\s+|\s+$/g,"").length>0){B=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A]);
break
}}else{if(A.nodeType==1){B=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[A]);
break
}}A=A.nextSibling
}}else{B=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(B){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[true])
}},placeCursorAtEnd:function(){this.focus();
var B=false;
if(dojo.isMoz){var A=this.editNode.lastChild;
while(A){if(A.nodeType==3){if(A.nodeValue.replace(/^\s+|\s+$/g,"").length>0){B=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A]);
break
}}else{if(A.nodeType==1){B=true;
if(A.lastChild){dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A.lastChild])
}else{dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A])
}break
}}A=A.previousSibling
}}else{B=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(B){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[false])
}},getValue:function(A){if(this.textarea){if(this.isClosed||!this.isLoaded){return this.textarea.value
}}return this._postFilterContent(null,A)
},setValue:function(A){if(this.textarea&&(this.isClosed||!this.isLoaded)){this.textarea.value=A
}else{A=this._preFilterContent(A);
if(this.isClosed){this.domNode.innerHTML=A;
this._preDomFilterContent(this.domNode)
}else{this.editNode.innerHTML=A;
this._preDomFilterContent(this.editNode)
}}},replaceValue:function(A){if(this.isClosed){this.setValue(A)
}else{if(this.window&&this.window.getSelection&&!dojo.isMoz){this.setValue(A)
}else{if(this.window&&this.window.getSelection){A=this._preFilterContent(A);
this.execCommand("selectall");
if(dojo.isMoz&&!A){A="&nbsp;"
}this.execCommand("inserthtml",A);
this._preDomFilterContent(this.editNode)
}else{if(this.document&&this.document.selection){this.setValue(A)
}}}}},_preFilterContent:function(A){var B=A;
dojo.forEach(this.contentPreFilters,function(C){if(C){B=C(B)
}});
return B
},_preDomFilterContent:function(A){A=A||this.editNode;
dojo.forEach(this.contentDomPreFilters,function(B){if(B&&dojo.isFunction(B)){B(A)
}},this)
},_postFilterContent:function(B,A){B=B||this.editNode;
if(this.contentDomPostFilters.length){if(A&&B.cloneNode){B=B.cloneNode(true)
}dojo.forEach(this.contentDomPostFilters,function(D){B=D(B)
})
}var C=this.getNodeChildrenHtml(B);
if(!C.replace(/^(?:\s|\xA0)+/g,"").replace(/(?:\s|\xA0)+$/g,"").length){C=""
}dojo.forEach(this.contentPostFilters,function(D){C=D(C)
});
return C
},_saveContent:function(A){var B=dojo.byId("dijit._editor.RichText.savedContent");
B.value+=this._SEPARATOR+this.name+":"+this.getValue()
},escapeXml:function(B,A){B=B.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!A){B=B.replace(/'/gm,"&#39;")
}return B
},getNodeHtml:function(J){switch(J.nodeType){case 1:var I="<"+J.tagName.toLowerCase();
if(dojo.isMoz){if(J.getAttribute("type")=="_moz"){J.removeAttribute("type")
}if(J.getAttribute("_moz_dirty")!=undefined){J.removeAttribute("_moz_dirty")
}}var C=[];
if(dojo.isIE){var G=J.outerHTML;
G=G.substr(0,G.indexOf(">"));
G=G.replace(/(?:['"])[^"']*\1/g,"");
var H=/([^\s=]+)=/g;
var K,F;
while((K=H.exec(G))!=undefined){F=K[1];
if(F.substr(0,3)!="_dj"){if(F=="src"||F=="href"){if(J.getAttribute("_djrealurl")){C.push([F,J.getAttribute("_djrealurl")]);
continue
}}if(F=="class"){C.push([F,J.className])
}else{C.push([F,J.getAttribute(F)])
}}}}else{var B,A=0,E=J.attributes;
while((B=E[A++])){if(B.name.substr(0,3)!="_dj"){var D=B.value;
if(B.name=="src"||B.name=="href"){if(J.getAttribute("_djrealurl")){D=J.getAttribute("_djrealurl")
}}C.push([B.name,D])
}}}C.sort(function(M,L){return M[0]<L[0]?-1:(M[0]==L[0]?0:1)
});
A=0;
while((B=C[A++])){I+=" "+B[0]+'="'+B[1]+'"'
}if(J.childNodes.length){I+=">"+this.getNodeChildrenHtml(J)+"</"+J.tagName.toLowerCase()+">"
}else{I+=" />"
}break;
case 3:var I=this.escapeXml(J.nodeValue,true);
break;
case 8:var I="<!--"+this.escapeXml(J.nodeValue,true)+"-->";
break;
default:var I="Element not recognized - Type: "+J.nodeType+" Name: "+J.nodeName
}return I
},getNodeChildrenHtml:function(D){var A="";
if(!D){return A
}var E=D.childNodes||D;
var B=0;
var C;
while((C=E[B++])){A+=this.getNodeHtml(C)
}return A
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
},_fixContentForMoz:function(A){A=A.replace(/<(\/)?strong([ \>])/gi,"<$1b$2");
A=A.replace(/<(\/)?em([ \>])/gi,"<$1i$2");
return A
},_srcInImgRegex:/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,_hrefInARegex:/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,_preFixUrlAttributes:function(A){A=A.replace(this._hrefInARegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
A=A.replace(this._srcInImgRegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
return A
}})
};