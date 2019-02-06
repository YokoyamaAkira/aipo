dojo._xdResourceLoaded({depends:[["provide","dojo._firebug.firebug"]],defineResource:function(dojo){if(!dojo._hasResource["dojo._firebug.firebug"]){dojo._hasResource["dojo._firebug.firebug"]=true;
dojo.provide("dojo._firebug.firebug");
dojo.deprecated=function(behaviour,extra,removal){var message="DEPRECATED: "+behaviour;
if(extra){message+=" "+extra
}if(removal){message+=" -- will be removed in version: "+removal
}console.debug(message)
};
dojo.experimental=function(moduleName,extra){var message="EXPERIMENTAL: "+moduleName+" -- APIs subject to change without notice.";
if(extra){message+=" "+extra
}console.debug(message)
};
if(((!("console" in window))||(!("firebug" in console)))&&((djConfig.noFirebugLite!==true))){(function(){try{if(window!=window.parent){if(window.parent.console){window.console=window.parent.console
}return 
}}catch(e){}window.console={log:function(){logFormatted(arguments,"")
},debug:function(){logFormatted(arguments,"debug")
},info:function(){logFormatted(arguments,"info")
},warn:function(){logFormatted(arguments,"warning")
},error:function(){logFormatted(arguments,"error")
},assert:function(truth,message){if(!truth){var args=[];
for(var i=1;
i<arguments.length;
++i){args.push(arguments[i])
}logFormatted(args.length?args:["Assertion Failure"],"error");
throw message?message:"Assertion Failure"
}},dir:function(object){var html=[];
var pairs=[];
for(var name in object){try{pairs.push([name,object[name]])
}catch(e){}}pairs.sort(function(a,b){return a[0]<b[0]?-1:1
});
html.push("<table>");
for(var i=0;
i<pairs.length;
++i){var name=pairs[i][0],value=pairs[i][1];
html.push("<tr>",'<td class="propertyNameCell"><span class="propertyName">',escapeHTML(name),"</span></td>",'<td><span class="propertyValue">');
appendObject(value,html);
html.push("</span></td></tr>")
}html.push("</table>");
logRow(html,"dir")
},dirxml:function(node){var html=[];
appendNode(node,html);
logRow(html,"dirxml")
},group:function(){logRow(arguments,"group",pushGroup)
},groupEnd:function(){logRow(arguments,"",popGroup)
},time:function(name){timeMap[name]=(new Date()).getTime()
},timeEnd:function(name){if(name in timeMap){var delta=(new Date()).getTime()-timeMap[name];
logFormatted([name+":",delta+"ms"]);
delete timeMap[name]
}},count:function(){this.warn(["count() not supported."])
},trace:function(){this.warn(["trace() not supported."])
},profile:function(){this.warn(["profile() not supported."])
},profileEnd:function(){},clear:function(){consoleBody.innerHTML=""
},open:function(){toggleConsole(true)
},close:function(){if(frameVisible){toggleConsole()
}},closeObjectInspector:function(){consoleObjectInspector.innerHTML="";
consoleObjectInspector.style.display="none";
consoleBody.style.display="block"
}};
var _firebugDoc=document;
var _firebugWin=window;
var __consoleAnchorId__=0;
var consoleFrame=null;
var consoleBody=null;
var commandLine=null;
var frameVisible=false;
var messageQueue=[];
var groupStack=[];
var timeMap={};
var clPrefix=">>> ";
function toggleConsole(forceOpen){frameVisible=forceOpen||!frameVisible;
if(consoleFrame){consoleFrame.style.display=frameVisible?"block":"none"
}}function focusCommandLine(){toggleConsole(true);
if(commandLine){commandLine.focus()
}}openWin=function(){var win=window.open("","_firebug","status=0,menubar=0,resizable=1,width=640,height=480,scrollbars=1,addressbar=0");
var newDoc=win.document;
HTMLstring="<html><head><title>Firebug Lite</title></head>\n";
HTMLstring+='<body bgColor="#CCCCCC">\n';
HTMLstring+='<div id="fb"></div>';
HTMLstring+="</body></html>";
newDoc.write(HTMLstring);
newDoc.close();
return win
};
function createFrame(){if(consoleFrame){return 
}if(djConfig.popup){_firebugWin=openWin();
_firebugDoc=_firebugWin.document;
djConfig.debugContainerId="fb";
var containerHeight="100%";
_firebugWin.console=window.console;
_firebugWin.dojo=window.dojo
}else{_firebugDoc=document;
var containerHeight=(djConfig.debugHeight)?djConfig.debugHeight+"px":"300px"
}var styleElement=_firebugDoc.createElement("link");
styleElement.href=dojo.moduleUrl("dojo._firebug","firebug.css");
styleElement.rel="stylesheet";
styleElement.type="text/css";
var styleParent=_firebugDoc.getElementsByTagName("head");
if(styleParent){styleParent=styleParent[0]
}if(!styleParent){styleParent=_firebugDoc.getElementsByTagName("html")[0]
}if(dojo.isIE){window.setTimeout(function(){styleParent.appendChild(styleElement)
},0)
}else{styleParent.appendChild(styleElement)
}if(typeof djConfig!="undefined"&&djConfig.debugContainerId){consoleFrame=_firebugDoc.getElementById(djConfig.debugContainerId)
}if(!consoleFrame){consoleFrame=_firebugDoc.createElement("div");
_firebugDoc.body.appendChild(consoleFrame)
}consoleFrame.className+=" firebug";
consoleFrame.style.height=containerHeight;
consoleFrame.style.display=(frameVisible?"block":"none");
var closeStr=(djConfig.popup)?"":'    <a href="#" onclick="console.close(); return false;">Close</a>';
consoleFrame.innerHTML='<div id="firebugToolbar">  <a href="#" onclick="console.clear(); return false;">Clear</a>  <span class="firebugToolbarRight">'+closeStr+'  </span></div><input type="text" id="firebugCommandLine"><div id="firebugLog"></div><div id="objectLog" style="display:none;"></div>';
var toolbar=_firebugDoc.getElementById("firebugToolbar");
toolbar.onmousedown=onSplitterMouseDown;
commandLine=_firebugDoc.getElementById("firebugCommandLine");
addEvent(commandLine,"keydown",onCommandLineKeyDown);
addEvent(_firebugDoc,dojo.isIE||dojo.isSafari?"keydown":"keypress",onKeyDown);
consoleBody=_firebugDoc.getElementById("firebugLog");
consoleObjectInspector=_firebugDoc.getElementById("objectLog");
layout();
flush()
}dojo.addOnLoad(createFrame);
function evalCommandLine(){var text=commandLine.value;
commandLine.value="";
logRow([clPrefix,text],"command");
var value;
try{value=eval(text)
}catch(e){console.debug(e)
}console.log(value)
}function layout(){var toolbar=consoleBody.ownerDocument.getElementById("firebugToolbar");
var height=consoleFrame.offsetHeight-(toolbar.offsetHeight+commandLine.offsetHeight);
consoleBody.style.top=toolbar.offsetHeight+"px";
consoleBody.style.height=height+"px";
commandLine.style.top=(consoleFrame.offsetHeight-commandLine.offsetHeight)+"px"
}function logRow(message,className,handler){if(consoleBody){writeMessage(message,className,handler)
}else{messageQueue.push([message,className,handler])
}}function flush(){var queue=messageQueue;
messageQueue=[];
for(var i=0;
i<queue.length;
++i){writeMessage(queue[i][0],queue[i][1],queue[i][2])
}}function writeMessage(message,className,handler){var isScrolledToBottom=consoleBody.scrollTop+consoleBody.offsetHeight>=consoleBody.scrollHeight;
handler=handler||writeRow;
handler(message,className);
if(isScrolledToBottom){consoleBody.scrollTop=consoleBody.scrollHeight-consoleBody.offsetHeight
}}function appendRow(row){var container=groupStack.length?groupStack[groupStack.length-1]:consoleBody;
container.appendChild(row)
}function writeRow(message,className){var row=consoleBody.ownerDocument.createElement("div");
row.className="logRow"+(className?" logRow-"+className:"");
row.innerHTML=message.join("");
appendRow(row)
}function pushGroup(message,className){logFormatted(message,className);
var groupRow=consoleBody.ownerDocument.createElement("div");
groupRow.className="logGroup";
var groupRowBox=consoleBody.ownerDocument.createElement("div");
groupRowBox.className="logGroupBox";
groupRow.appendChild(groupRowBox);
appendRow(groupRowBox);
groupStack.push(groupRowBox)
}function popGroup(){groupStack.pop()
}function logFormatted(objects,className){var html=[];
var format=objects[0];
var objIndex=0;
if(typeof (format)!="string"){format="";
objIndex=-1
}var parts=parseFormat(format);
for(var i=0;
i<parts.length;
++i){var part=parts[i];
if(part&&typeof (part)=="object"){var object=objects[++objIndex];
part.appender(object,html)
}else{appendText(part,html)
}}var ids=[];
var obs=[];
for(var i=objIndex+1;
i<objects.length;
++i){appendText(" ",html);
var object=objects[i];
if(!object){continue
}if(typeof (object)=="string"){appendText(object,html)
}else{if(object.nodeType==1){appendText("< "+object.tagName+' id="'+object.id+'" />',html)
}else{var id="_a"+__consoleAnchorId__++;
ids.push(id);
obs.push(object);
var str='<a id="'+id+'" href="javascript:void(0);">'+getObjectAbbr(object)+"</a>";
appendLink(str,html)
}}}logRow(html,className);
for(var i=0;
i<ids.length;
i++){var btn=_firebugDoc.getElementById(ids[i]);
if(!btn){continue
}btn.obj=obs[i];
dojo.connect(btn,"onclick",function(){consoleBody.style.display="none";
consoleObjectInspector.style.display="block";
var bkBtn='<a href="javascript:console.closeObjectInspector();">&nbsp;<<&nbsp;Back</a>';
consoleObjectInspector.innerHTML=bkBtn+"<pre>"+printObject(this.obj)+"</pre>"
})
}}function parseFormat(format){var parts=[];
var reg=/((^%|[^\\]%)(\d+)?(\.)([a-zA-Z]))|((^%|[^\\]%)([a-zA-Z]))/;
var appenderMap={s:appendText,d:appendInteger,i:appendInteger,f:appendFloat};
for(var m=reg.exec(format);
m;
m=reg.exec(format)){var type=m[8]?m[8]:m[5];
var appender=type in appenderMap?appenderMap[type]:appendObject;
var precision=m[3]?parseInt(m[3]):(m[4]=="."?-1:0);
parts.push(format.substr(0,m[0][0]=="%"?m.index:m.index+1));
parts.push({appender:appender,precision:precision});
format=format.substr(m.index+m[0].length)
}parts.push(format);
return parts
}function escapeHTML(value){function replaceChars(ch){switch(ch){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
}return String(value).replace(/[<>&"']/g,replaceChars)
}function objectToString(object){try{return object+""
}catch(e){return null
}}function appendLink(object,html){html.push(objectToString(object))
}function appendText(object,html){html.push(escapeHTML(objectToString(object)))
}function appendNull(object,html){html.push('<span class="objectBox-null">',escapeHTML(objectToString(object)),"</span>")
}function appendString(object,html){html.push('<span class="objectBox-string">&quot;',escapeHTML(objectToString(object)),"&quot;</span>")
}function appendInteger(object,html){html.push('<span class="objectBox-number">',escapeHTML(objectToString(object)),"</span>")
}function appendFloat(object,html){html.push('<span class="objectBox-number">',escapeHTML(objectToString(object)),"</span>")
}function appendFunction(object,html){var reName=/function ?(.*?)\(/;
var m=reName.exec(objectToString(object));
var name=m?m[1]:"function";
html.push('<span class="objectBox-function">',escapeHTML(name),"()</span>")
}function appendObject(object,html){try{if(object==undefined){appendNull("undefined",html)
}else{if(object==null){appendNull("null",html)
}else{if(typeof object=="string"){appendString(object,html)
}else{if(typeof object=="number"){appendInteger(object,html)
}else{if(typeof object=="function"){appendFunction(object,html)
}else{if(object.nodeType==1){appendSelector(object,html)
}else{if(typeof object=="object"){appendObjectFormatted(object,html)
}else{appendText(object,html)
}}}}}}}}catch(e){}}function appendObjectFormatted(object,html){var text=objectToString(object);
var reObject=/\[object (.*?)\]/;
var m=reObject.exec(text);
html.push('<span class="objectBox-object">',m?m[1]:text,"</span>")
}function appendSelector(object,html){html.push('<span class="objectBox-selector">');
html.push('<span class="selectorTag">',escapeHTML(object.nodeName.toLowerCase()),"</span>");
if(object.id){html.push('<span class="selectorId">#',escapeHTML(object.id),"</span>")
}if(object.className){html.push('<span class="selectorClass">.',escapeHTML(object.className),"</span>")
}html.push("</span>")
}function appendNode(node,html){if(node.nodeType==1){html.push('<div class="objectBox-element">','&lt;<span class="nodeTag">',node.nodeName.toLowerCase(),"</span>");
for(var i=0;
i<node.attributes.length;
++i){var attr=node.attributes[i];
if(!attr.specified){continue
}html.push('&nbsp;<span class="nodeName">',attr.nodeName.toLowerCase(),'</span>=&quot;<span class="nodeValue">',escapeHTML(attr.nodeValue),"</span>&quot;")
}if(node.firstChild){html.push('&gt;</div><div class="nodeChildren">');
for(var child=node.firstChild;
child;
child=child.nextSibling){appendNode(child,html)
}html.push('</div><div class="objectBox-element">&lt;/<span class="nodeTag">',node.nodeName.toLowerCase(),"&gt;</span></div>")
}else{html.push("/&gt;</div>")
}}else{if(node.nodeType==3){html.push('<div class="nodeText">',escapeHTML(node.nodeValue),"</div>")
}}}function addEvent(object,name,handler){if(document.all){object.attachEvent("on"+name,handler)
}else{object.addEventListener(name,handler,false)
}}function removeEvent(object,name,handler){if(document.all){object.detachEvent("on"+name,handler)
}else{object.removeEventListener(name,handler,false)
}}function cancelEvent(event){if(document.all){event.cancelBubble=true
}else{event.stopPropagation()
}}function onError(msg,href,lineNo){var html=[];
var lastSlash=href.lastIndexOf("/");
var fileName=lastSlash==-1?href:href.substr(lastSlash+1);
html.push('<span class="errorMessage">',msg,"</span>",'<div class="objectBox-sourceLink">',fileName," (line ",lineNo,")</div>");
logRow(html,"error")
}var onKeyDownTime=(new Date()).getTime();
function onKeyDown(event){var timestamp=(new Date()).getTime();
if(timestamp>onKeyDownTime+200){var event=dojo.fixEvent(event);
var keys=dojo.keys;
var ekc=event.keyCode;
onKeyDownTime=timestamp;
if(ekc==keys.F12){toggleConsole()
}else{if((ekc==keys.NUMPAD_ENTER||ekc==76)&&event.shiftKey&&(event.metaKey||event.ctrlKey)){focusCommandLine()
}else{return 
}}cancelEvent(event)
}}function onSplitterMouseDown(event){if(dojo.isSafari||dojo.isOpera){return 
}addEvent(document,"mousemove",onSplitterMouseMove);
addEvent(document,"mouseup",onSplitterMouseUp);
for(var i=0;
i<frames.length;
++i){addEvent(frames[i].document,"mousemove",onSplitterMouseMove);
addEvent(frames[i].document,"mouseup",onSplitterMouseUp)
}}function onSplitterMouseMove(event){var win=document.all?event.srcElement.ownerDocument.parentWindow:event.target.ownerDocument.defaultView;
var clientY=event.clientY;
if(win!=win.parent){clientY+=win.frameElement?win.frameElement.offsetTop:0
}var height=consoleFrame.offsetTop+consoleFrame.clientHeight;
var y=height-clientY;
consoleFrame.style.height=y+"px";
layout()
}function onSplitterMouseUp(event){removeEvent(document,"mousemove",onSplitterMouseMove);
removeEvent(document,"mouseup",onSplitterMouseUp);
for(var i=0;
i<frames.length;
++i){removeEvent(frames[i].document,"mousemove",onSplitterMouseMove);
removeEvent(frames[i].document,"mouseup",onSplitterMouseUp)
}}function onCommandLineKeyDown(event){if(event.keyCode==13){evalCommandLine()
}else{if(event.keyCode==27){commandLine.value=""
}}}getAtts=function(o){if(dojo.isArray(o)){return"[array with "+o.length+" slots]"
}else{var i=0;
for(var nm in o){i++
}return"{object with "+i+" items}"
}};
printObject=function(o,i,txt){var br="\n";
var ind="  ";
txt=(txt)?txt:"";
i=(i)?i:ind;
for(var nm in o){if(typeof (o[nm])=="object"){txt+=i+nm+" -> "+getAtts(o[nm])+br;
txt+=printObject(o[nm],i+ind)
}else{txt+=i+nm+" : "+o[nm]+br
}}return txt
};
getObjectAbbr=function(obj){var isError=(obj instanceof Error);
var nm=obj.id||obj.name||obj.ObjectID||obj.widgetId;
if(!isError&&nm){return"{"+nm+"}"
}var obCnt=2;
var arCnt=4;
var cnt=0;
if(isError){nm="[ Error: "+(obj.message||obj.description||obj)+" ]"
}else{if(dojo.isArray(obj)){nm="[";
for(var i=0;
i<obj.length;
i++){nm+=obj[i]+",";
if(i>arCnt){nm+=" ... ("+obj.length+" items)";
break
}}nm+="]"
}else{if((!dojo.isObject(obj))||dojo.isString(obj)){nm=obj+""
}else{nm="{";
for(var i in obj){cnt++;
if(cnt>obCnt){break
}nm+=i+"="+obj[i]+"  "
}nm+="}"
}}}return nm
};
window.onerror=onError;
addEvent(document,dojo.isIE||dojo.isSafari?"keydown":"keypress",onKeyDown);
if((document.documentElement.getAttribute("debug")=="true")||(djConfig.isDebug)){toggleConsole(true)
}})()
}}}});