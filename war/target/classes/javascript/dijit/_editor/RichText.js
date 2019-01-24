if(!dojo._hasResource["dijit._editor.RichText"]){dojo._hasResource["dijit._editor.RichText"]=true;
dojo.provide("dijit._editor.RichText");
dojo.require("dijit._Widget");
dojo.require("dijit._editor.selection");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit","Textarea",null,"ROOT");
if(!djConfig.useXDomain||djConfig.allowXdRichTextSave){if(dojo._postLoad){(function(){var A=dojo.doc.createElement("textarea");
A.id="dijit._editor.RichText.savedContent";
var B=A.style;
B.display="none";
B.position="absolute";
B.top="-100px";
B.left="-100px";
B.height="3px";
B.width="3px";
dojo.body().appendChild(A)
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
},setupDefaultShortcuts:function(){var B=this.KEY_CTRL;
var A=function(D,C){return arguments.length==1?function(){this.execCommand(D)
}:function(){this.execCommand(D,C)
}
};
this.addKeyHandler("b",B,A("bold"));
this.addKeyHandler("i",B,A("italic"));
this.addKeyHandler("u",B,A("underline"));
this.addKeyHandler("a",B,A("selectall"));
this.addKeyHandler("s",B,function(){this.save(true)
});
this.addKeyHandler("1",B,A("formatblock","h1"));
this.addKeyHandler("2",B,A("formatblock","h2"));
this.addKeyHandler("3",B,A("formatblock","h3"));
this.addKeyHandler("4",B,A("formatblock","h4"));
this.addKeyHandler("\\",B,A("insertunorderedlist"));
if(!dojo.isIE){this.addKeyHandler("Z",B,A("redo"))
}},events:["onKeyPress","onKeyDown","onKeyUp","onClick"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){if(this._editorCommandsLocalized){return 
}this._editorCommandsLocalized=true;
var B=["p","pre","address","h1","h2","h3","h4","h5","h6","ol","div","ul"];
var E="",F,C=0;
while((F=B[C++])){if(F.charAt(1)!="l"){E+="<"+F+"><span>content</span></"+F+">"
}else{E+="<"+F+"><li>content</li></"+F+">"
}}var G=document.createElement("div");
G.style.position="absolute";
G.style.left="-2000px";
G.style.top="-2000px";
document.body.appendChild(G);
G.innerHTML=E;
var D=G.firstChild;
while(D){dijit._editor.selection.selectElement(D.firstChild);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[D.firstChild]);
var A=D.tagName.toLowerCase();
this._local2NativeFormatNames[A]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[A]]=A;
D=D.nextSibling
}document.body.removeChild(G)
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
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_localizedIframeTitles:null,_getIframeDocTxt:function(B){var D=dojo.getComputedStyle(this.domNode);
if(!this.height&&!dojo.isMoz){B="<div>"+B+"</div>"
}var A=[D.fontWeight,D.fontSize,D.fontFamily].join(" ");
var C=D.lineHeight;
if(C.indexOf("px")>=0){C=parseFloat(C)/parseFloat(D.fontSize)
}else{if(C.indexOf("em")>=0){C=parseFloat(C)
}else{C="1.0"
}}return[this.isLeftToRight()?"<html><head>":"<html dir='rtl'><head>",(dojo.isMoz?"<title>"+this._localizedIframeTitles.iframeEditTitle+"</title>":""),"<style>","body,html {","	background:transparent;","	padding: 0;","	margin: 0;","}","body{","	top:0px; left:0px; right:0px;",((this.height||dojo.isOpera)?"":"position: fixed;"),"	font:",A,";","	min-height:",this.minHeight,";","	line-height:",C,"}","p{ margin: 1em 0 !important; }",(this.height?"":"body,html{overflow-y:hidden;/*for IE*/} body > div {overflow-x:auto;/*for FF to show vertical scrollbar*/}"),"li > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; } ","li{ min-height:1.2em; }","</style>",this._applyEditingAreaStyleSheets(),"</head><body>"+B+"</body></html>"].join("")
},_drawIframe:function(F){if(!this.iframe){var H=this.iframe=dojo.doc.createElement("iframe");
var G=H.style;
G.border="none";
G.lineHeight="0";
G.verticalAlign="bottom";
this.editorObject=this.iframe;
this._localizedIframeTitles=dojo.i18n.getLocalization("dijit","Textarea");
var E=dojo.query('label[for="'+this.id+'"]');
if(E.length){this._localizedIframeTitles.iframeEditTitle=E[0].innerHTML+" "+this._localizedIframeTitles.iframeEditTitle
}}this.iframe.style.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){this.iframe.style.height=this.height
}else{this.iframe.height=this._oldHeight
}if(this.textarea){var D=this.srcNodeRef
}else{var D=dojo.doc.createElement("div");
D.style.display="none";
D.innerHTML=F;
this.editingArea.appendChild(D)
}this.editingArea.appendChild(this.iframe);
var A=false;
var C=this.iframe.contentDocument;
C.open();
C.write(this._getIframeDocTxt(F));
C.close();
var B=dojo.hitch(this,function(){if(!A){A=true
}else{return 
}if(!this.editNode){try{if(this.iframe.contentWindow){this.window=this.iframe.contentWindow;
this.document=this.iframe.contentWindow.document
}else{if(this.iframe.contentDocument){this.window=this.iframe.contentDocument.window;
this.document=this.iframe.contentDocument
}}if(!this.document.body){throw"Error"
}}catch(I){setTimeout(B,500);
A=false;
return 
}dojo._destroyElement(D);
this.document.designMode="on";
this.onLoad()
}else{dojo._destroyElement(D);
this.editNode.innerHTML=F;
this.onDisplayChanged()
}this._preDomFilterContent(this.editNode)
});
B()
},_applyEditingAreaStyleSheets:function(){var D=[];
if(this.styleSheets){D=this.styleSheets.split(";");
this.styleSheets=""
}D=D.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var E="",C=0,B;
while((B=D[C++])){var A=(new dojo._Url(dojo.global.location,B)).toString();
this.editingAreaStyleSheets.push(A);
E+='<link rel="stylesheet" type="text/css" href="'+A+'"/>'
}return E
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
}},removeStyleSheet:function(C){var B=C.toString();
if(B.charAt(0)=="."||(B.charAt(0)!="/"&&!C.host)){B=(new dojo._Url(dojo.global.location,B)).toString()
}var A=dojo.indexOf(this.editingAreaStyleSheets,B);
if(A==-1){console.debug("dijit._editor.RichText.removeStyleSheet: Style sheet "+B+" is not applied to the editing area so it can not be removed!");
return 
}delete this.editingAreaStyleSheets[A];
dojo.withGlobal(this.window,"query",dojo,['link:[href="'+B+'"]']).orphan()
},disabled:false,_mozSettingProps:["styleWithCSS","insertBrOnReturn"],setDisabled:function(A){if(dojo.isIE||dojo.isSafari||dojo.isOpera){this.editNode.contentEditable=!A
}else{if(A){this._mozSettings=[false,this.blockNodeForEnter==="BR"]
}this.document.designMode=(A?"off":"on");
if(!A){dojo.forEach(this._mozSettingProps,function(C,B){this.document.execCommand(C,false,this._mozSettings[B])
},this)
}}this.disabled=A
},_isResized:function(){return false
},onLoad:function(E){this.isLoaded=true;
if(this.height||dojo.isMoz){this.editNode=this.document.body
}else{this.editNode=this.document.body.firstChild
}this.editNode.contentEditable=true;
this._preDomFilterContent(this.editNode);
var B=this.events.concat(this.captureEvents),A=0,D;
while((D=B[A++])){this.connect(this.document,D.toLowerCase(),D)
}if(!dojo.isIE){try{this.document.execCommand("styleWithCSS",false,false)
}catch(C){}}else{this.editNode.style.zoom=1
}if(this.focusOnLoad){this.focus()
}this.onDisplayChanged(E);
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
},KEY_CTRL:1,KEY_SHIFT:2,onKeyPress:function(F){var B=F.ctrlKey?this.KEY_CTRL:0|F.shiftKey?this.KEY_SHIFT:0;
var D=F.keyChar||F.keyCode;
if(this._keyHandlers[D]){var A=this._keyHandlers[D],C=0,E;
while((E=A[C++])){if(B==E.modifiers){if(!E.handler.apply(this,arguments)){F.preventDefault()
}break
}}}setTimeout(dojo.hitch(this,function(){this.onKeyPressed(F)
}),1)
},addKeyHandler:function(B,A,C){if(!dojo.isArray(this._keyHandlers[B])){this._keyHandlers[B]=[]
}this._keyHandlers[B].push({modifiers:A||0,handler:C})
},onKeyPressed:function(A){this.onDisplayChanged()
},onClick:function(A){this.onDisplayChanged(A)
},_onBlur:function(B){var A=this.getValue(true);
if(A!=this.savedContent){this.onChange(A);
this.savedContent=A
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
},onChange:function(A){},_normalizeCommand:function(A){var B=A.toLowerCase();
if(B=="formatblock"){if(dojo.isSafari){B="heading"
}}else{if(B=="hilitecolor"&&!dojo.isMoz){B="backcolor"
}}return B
},queryCommandAvailable:function(E){var A=1;
var H=1<<1;
var B=1<<2;
var C=1<<3;
var I=1<<4;
var F=dojo.isSafari;
function D(J){return{ie:Boolean(J&A),mozilla:Boolean(J&H),safari:Boolean(J&B),safari420:Boolean(J&I),opera:Boolean(J&C)}
}var G=null;
switch(E.toLowerCase()){case"bold":case"italic":case"underline":case"subscript":case"superscript":case"fontname":case"fontsize":case"forecolor":case"hilitecolor":case"justifycenter":case"justifyfull":case"justifyleft":case"justifyright":case"delete":case"selectall":G=D(H|A|B|C);
break;
case"createlink":case"unlink":case"removeformat":case"inserthorizontalrule":case"insertimage":case"insertorderedlist":case"insertunorderedlist":case"indent":case"outdent":case"formatblock":case"inserthtml":case"undo":case"redo":case"strikethrough":G=D(H|A|C|I);
break;
case"blockdirltr":case"blockdirrtl":case"dirltr":case"dirrtl":case"inlinedirltr":case"inlinedirrtl":G=D(A);
break;
case"cut":case"copy":case"paste":G=D(A|H|I);
break;
case"inserttable":G=D(H|A);
break;
case"insertcell":case"insertcol":case"insertrow":case"deletecells":case"deletecols":case"deleterows":case"mergecells":case"splitcell":G=D(A|H);
break;
default:return false
}return(dojo.isIE&&G.ie)||(dojo.isMoz&&G.mozilla)||(dojo.isSafari&&G.safari)||(F&&G.safari420)||(dojo.isOpera&&G.opera)
},execCommand:function(E,D){var C;
this.focus();
E=this._normalizeCommand(E);
if(D!=undefined){if(E=="heading"){throw new Error("unimplemented")
}else{if((E=="formatblock")&&dojo.isIE){D="<"+D+">"
}}}if(E=="inserthtml"){D=this._preFilterContent(D);
if(dojo.isIE){var F=this.document.selection.createRange();
F.pasteHTML(D);
F.select();
C=true
}else{if(dojo.isMoz&&!D.length){dojo.withGlobal(this.window,"remove",dijit._editor.selection);
C=true
}else{C=this.document.execCommand(E,false,D)
}}}else{if((E=="unlink")&&(this.queryCommandEnabled("unlink"))&&(dojo.isMoz||dojo.isSafari)){var B=this.window.getSelection();
var A=dojo.withGlobal(this.window,"getAncestorElement",dijit._editor.selection,["a"]);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A]);
C=this.document.execCommand("unlink",false,null)
}else{if((E=="hilitecolor")&&(dojo.isMoz)){this.document.execCommand("styleWithCSS",false,true);
C=this.document.execCommand(E,false,D);
this.document.execCommand("styleWithCSS",false,false)
}else{if((dojo.isIE)&&((E=="backcolor")||(E=="forecolor"))){D=arguments.length>1?D:null;
C=this.document.execCommand(E,false,D)
}else{D=arguments.length>1?D:null;
if(D||E!="createlink"){C=this.document.execCommand(E,false,D)
}}}}}this.onDisplayChanged();
return C
},queryCommandEnabled:function(B){B=this._normalizeCommand(B);
if(dojo.isMoz||dojo.isSafari){if(B=="unlink"){return dojo.withGlobal(this.window,"hasAncestorElement",dijit._editor.selection,["a"])
}else{if(B=="inserttable"){return true
}}}if(dojo.isSafari){if(B=="copy"){B="cut"
}else{if(B=="paste"){return true
}}}var A=(dojo.isIE)?this.document.selection.createRange():this.document;
return A.queryCommandEnabled(B)
},queryCommandState:function(A){A=this._normalizeCommand(A);
return this.document.queryCommandState(A)
},queryCommandValue:function(A){A=this._normalizeCommand(A);
if(dojo.isIE&&A=="formatblock"){return this._local2NativeFormatNames[this.document.queryCommandValue(A)]
}return this.document.queryCommandValue(A)
},placeCursorAtStart:function(){this.focus();
var A=false;
if(dojo.isMoz){var B=this.editNode.firstChild;
while(B){if(B.nodeType==3){if(B.nodeValue.replace(/^\s+|\s+$/g,"").length>0){A=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[B]);
break
}}else{if(B.nodeType==1){A=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[B]);
break
}}B=B.nextSibling
}}else{A=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(A){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[true])
}},placeCursorAtEnd:function(){this.focus();
var A=false;
if(dojo.isMoz){var B=this.editNode.lastChild;
while(B){if(B.nodeType==3){if(B.nodeValue.replace(/^\s+|\s+$/g,"").length>0){A=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[B]);
break
}}else{if(B.nodeType==1){A=true;
if(B.lastChild){dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[B.lastChild])
}else{dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[B])
}break
}}B=B.previousSibling
}}else{A=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(A){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[false])
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
}}}}},_preFilterContent:function(B){var A=B;
dojo.forEach(this.contentPreFilters,function(C){if(C){A=C(A)
}});
return A
},_preDomFilterContent:function(A){A=A||this.editNode;
dojo.forEach(this.contentDomPreFilters,function(B){if(B&&dojo.isFunction(B)){B(A)
}},this)
},_postFilterContent:function(C,B){C=C||this.editNode;
if(this.contentDomPostFilters.length){if(B&&C.cloneNode){C=C.cloneNode(true)
}dojo.forEach(this.contentDomPostFilters,function(D){C=D(C)
})
}var A=this.getNodeChildrenHtml(C);
if(!A.replace(/^(?:\s|\xA0)+/g,"").replace(/(?:\s|\xA0)+$/g,"").length){A=""
}dojo.forEach(this.contentPostFilters,function(D){A=D(A)
});
return A
},_saveContent:function(B){var A=dojo.byId("dijit._editor.RichText.savedContent");
A.value+=this._SEPARATOR+this.name+":"+this.getValue()
},escapeXml:function(A,B){A=A.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!B){A=A.replace(/'/gm,"&#39;")
}return A
},getNodeHtml:function(C){switch(C.nodeType){case 1:var B="<"+C.tagName.toLowerCase();
if(dojo.isMoz){if(C.getAttribute("type")=="_moz"){C.removeAttribute("type")
}if(C.getAttribute("_moz_dirty")!=undefined){C.removeAttribute("_moz_dirty")
}}var G=[];
if(dojo.isIE){var K=C.outerHTML;
K=K.substr(0,K.indexOf(">"));
K=K.replace(/(?:['"])[^"']*\1/g,"");
var A=/([^\s=]+)=/g;
var D,J;
while((D=A.exec(K))!=undefined){J=D[1];
if(J.substr(0,3)!="_dj"){if(J=="src"||J=="href"){if(C.getAttribute("_djrealurl")){G.push([J,C.getAttribute("_djrealurl")]);
continue
}}if(J=="class"){G.push([J,C.className])
}else{G.push([J,C.getAttribute(J)])
}}}}else{var F,E=0,I=C.attributes;
while((F=I[E++])){if(F.name.substr(0,3)!="_dj"){var H=F.value;
if(F.name=="src"||F.name=="href"){if(C.getAttribute("_djrealurl")){H=C.getAttribute("_djrealurl")
}}G.push([F.name,H])
}}}G.sort(function(M,L){return M[0]<L[0]?-1:(M[0]==L[0]?0:1)
});
E=0;
while((F=G[E++])){B+=" "+F[0]+'="'+F[1]+'"'
}if(C.childNodes.length){B+=">"+this.getNodeChildrenHtml(C)+"</"+C.tagName.toLowerCase()+">"
}else{B+=" />"
}break;
case 3:var B=this.escapeXml(C.nodeValue,true);
break;
case 8:var B="<!--"+this.escapeXml(C.nodeValue,true)+"-->";
break;
default:var B="Element not recognized - Type: "+C.nodeType+" Name: "+C.nodeName
}return B
},getNodeChildrenHtml:function(E){var B="";
if(!E){return B
}var A=E.childNodes||E;
var C=0;
var D;
while((D=A[C++])){B+=this.getNodeHtml(D)
}return B
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