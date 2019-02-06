if(!dojo._hasResource["dojox.flash._common"]){dojo._hasResource["dojox.flash._common"]=true;
dojo.provide("dojox.flash._common");
dojox.flash=function(){};
dojox.flash={flash6_version:null,flash8_version:null,ready:false,_visible:true,_loadedListeners:new Array(),_installingListeners:new Array(),setSwf:function(A){if(!A){return 
}if(A.flash6){this.flash6_version=A.flash6
}if(A.flash8){this.flash8_version=A.flash8
}if(A.visible){this._visible=A.visible
}this._initialize()
},useFlash6:function(){if(this.flash6_version==null){return false
}else{if(this.flash6_version!=null&&dojox.flash.info.commVersion==6){return true
}else{return false
}}},useFlash8:function(){if(this.flash8_version==null){return false
}else{if(this.flash8_version!=null&&dojox.flash.info.commVersion==8){return true
}else{return false
}}},addLoadedListener:function(A){this._loadedListeners.push(A)
},addInstallingListener:function(A){this._installingListeners.push(A)
},loaded:function(){dojox.flash.ready=true;
if(dojox.flash._loadedListeners.length>0){for(var A=0;
A<dojox.flash._loadedListeners.length;
A++){dojox.flash._loadedListeners[A].call(null)
}}},installing:function(){if(dojox.flash._installingListeners.length>0){for(var A=0;
A<dojox.flash._installingListeners.length;
A++){dojox.flash._installingListeners[A].call(null)
}}},_initialize:function(){var A=new dojox.flash.Install();
dojox.flash.installer=A;
if(A.needed()==true){A.install()
}else{dojox.flash.obj=new dojox.flash.Embed(this._visible);
dojox.flash.obj.write(dojox.flash.info.commVersion);
dojox.flash.comm=new dojox.flash.Communicator()
}}};
dojox.flash.Info=function(){if(dojo.isIE){document.write(['<script language="VBScript" type="text/vbscript">',"Function VBGetSwfVer(i)","  on error resume next","  Dim swControl, swVersion","  swVersion = 0",'  set swControl = CreateObject("ShockwaveFlash.ShockwaveFlash." + CStr(i))',"  if (IsObject(swControl)) then",'    swVersion = swControl.GetVariable("$version")',"  end if","  VBGetSwfVer = swVersion","End Function","<\/script>"].join("\r\n"))
}this._detectVersion();
this._detectCommunicationVersion()
};
dojox.flash.Info.prototype={version:-1,versionMajor:-1,versionMinor:-1,versionRevision:-1,capable:false,commVersion:6,installing:false,isVersionOrAbove:function(C,A,B){B=parseFloat("."+B);
if(this.versionMajor>=C&&this.versionMinor>=A&&this.versionRevision>=B){return true
}else{return false
}},getResourceList:function(D,C){var A=[];
var B=D;
A.push(B);
B=B+"?baseRelativePath="+escape(dojo.baseUrl);
A.push(B);
B+="'%20'%20quality=";
A.push(B);
B=C;
A.push(B);
B+="?baseRelativePath="+escape(dojo.baseUrl);
A.push(B);
B+="'%20'%20quality=";
A.push(B);
A.push(dojo.moduleUrl("dojox","flash/flash6/flash6_gateway.swf")+"");
return A
},_detectVersion:function(){var F;
for(var B=25;
B>0;
B--){if(dojo.isIE){F=VBGetSwfVer(B)
}else{F=this._JSFlashInfo(B)
}if(F==-1){this.capable=false;
return 
}else{if(F!=0){var D;
if(dojo.isIE){var E=F.split(" ");
var C=E[1];
D=C.split(",")
}else{D=F.split(".")
}this.versionMajor=D[0];
this.versionMinor=D[1];
this.versionRevision=D[2];
var A=this.versionMajor+"."+this.versionRevision;
this.version=parseFloat(A);
this.capable=true;
break
}}}},_JSFlashInfo:function(B){if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var H=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";
var I=navigator.plugins["Shockwave Flash"+H].description;
var D=I.split(" ");
var E=D[2].split(".");
var A=E[0];
var J=E[1];
if(D[3]!=""){var C=D[3].split("r")
}else{var C=D[4].split("r")
}var F=C[1]>0?C[1]:0;
var G=A+"."+J+"."+F;
return G
}}return -1
},_detectCommunicationVersion:function(){if(this.capable==false){this.commVersion=null;
return 
}if(typeof djConfig.forceFlashComm!="undefined"&&typeof djConfig.forceFlashComm!=null){this.commVersion=djConfig.forceFlashComm;
return 
}if(dojo.isSafari||dojo.isOpera){this.commVersion=8
}else{this.commVersion=6
}}};
dojox.flash.Embed=function(A){this._visible=A
};
dojox.flash.Embed.prototype={width:215,height:138,id:"flashObject",_visible:true,protocol:function(){switch(window.location.protocol){case"https:":return"https";
break;
default:return"http";
break
}},write:function(E,A){A=!!A;
var I="";
I+=("width: "+this.width+"px; ");
I+=("height: "+this.height+"px; ");
if(this._visible==false){I+="position: absolute; z-index: 10000; top: -1000px; left: -1000px; "
}var D;
var J;
if(E==6){J=dojox.flash.flash6_version;
var F=djConfig.baseRelativePath;
J=J+"?baseRelativePath="+escape(F);
D='<embed id="'+this.id+'" src="'+J+'"     quality="high" bgcolor="#ffffff"     width="'+this.width+'" height="'+this.height+'"     name="'+this.id+'"     align="middle" allowScriptAccess="sameDomain"     type="application/x-shockwave-flash" swLiveConnect="true"     pluginspage="'+this.protocol()+'://www.macromedia.com/go/getflashplayer">'
}else{J=dojox.flash.flash8_version;
var H=J;
var C=J;
var F=djConfig.baseRelativePath;
if(A){var G=escape(window.location);
document.title=document.title.slice(0,47)+" - Flash Player Installation";
var B=escape(document.title);
H+="?MMredirectURL="+G+"&MMplayerType=ActiveX&MMdoctitle="+B+"&baseRelativePath="+escape(F);
C+="?MMredirectURL="+G+"&MMplayerType=PlugIn&baseRelativePath="+escape(F)
}if(C.indexOf("?")==-1){C+="?baseRelativePath="+escape(F)+"' "
}D='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+this.protocol()+'://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+this.width+'" height="'+this.height+'" id="'+this.id+'" align="middle"> <param name="allowScriptAccess" value="sameDomain" /> <param name="movie" value="'+H+'" /> <param name="quality" value="high" /> <param name="bgcolor" value="#ffffff" /> <embed src="'+C+'\' quality="high" bgcolor="#ffffff" width="'+this.width+'" height="'+this.height+'" id="'+this.id+'" name="'+this.id+'" swLiveConnect="true" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="'+this.protocol()+'://www.macromedia.com/go/getflashplayer" /></object>'
}D='<div id="'+this.id+'Container" style="'+I+'"> '+D+"</div>";
document.writeln(D)
},get:function(){return document.getElementById(this.id)
},setVisible:function(B){var A=dojo.byId(this.id+"Container");
if(B==true){A.style.visibility="visible"
}else{A.style.position="absolute";
A.style.x="-1000px";
A.style.y="-1000px";
A.style.visibility="hidden"
}},center:function(){var A=100;
var C=100;
var B=dojo.byId(this.id+"Container");
B.style.top=C+"px";
B.style.left=A+"px"
}};
dojox.flash.Communicator=function(){if(dojox.flash.useFlash6()){this._writeFlash6()
}else{if(dojox.flash.useFlash8()){this._writeFlash8()
}}};
dojox.flash.Communicator.prototype={_writeFlash6:function(){var A=dojox.flash.obj.id;
document.writeln('<script language="JavaScript">');
document.writeln("  function "+A+"_DoFSCommand(command, args){ ");
document.writeln("    dojox.flash.comm._handleFSCommand(command, args); ");
document.writeln("}");
document.writeln("<\/script>");
if(dojo.isIE){document.writeln("<SCRIPT LANGUAGE=VBScript> ");
document.writeln("on error resume next ");
document.writeln("Sub "+A+"_FSCommand(ByVal command, ByVal args)");
document.writeln(" call "+A+"_DoFSCommand(command, args)");
document.writeln("end sub");
document.writeln("</SCRIPT> ")
}},_writeFlash8:function(){},_handleFSCommand:function(B,A){if((B)&&dojo.isString(B)&&(/^FSCommand:(.*)/.test(B)==true)){B=B.match(/^FSCommand:(.*)/)[1]
}if(B=="addCallback"){this._fscommandAddCallback(B,A)
}else{if(B=="call"){this._fscommandCall(B,A)
}else{if(B=="fscommandReady"){this._fscommandReady()
}}}},_fscommandAddCallback:function(D,B){var C=B;
var A=function(){return dojox.flash.comm._call(C,arguments)
};
dojox.flash.comm[C]=A;
dojox.flash.obj.get().SetVariable("_succeeded",true)
},_fscommandCall:function(command,args){var plugin=dojox.flash.obj.get();
var functionName=args;
var numArgs=parseInt(plugin.GetVariable("_numArgs"));
var flashArgs=new Array();
for(var i=0;
i<numArgs;
i++){var currentArg=plugin.GetVariable("_"+i);
flashArgs.push(currentArg)
}var runMe;
if(functionName.indexOf(".")==-1){runMe=window[functionName]
}else{runMe=eval(functionName)
}var results=null;
if(dojo.isFunction(runMe)){results=runMe.apply(null,flashArgs)
}plugin.SetVariable("_returnResult",results)
},_fscommandReady:function(){var A=dojox.flash.obj.get();
A.SetVariable("fscommandReady","true")
},_call:function(F,A){var D=dojox.flash.obj.get();
D.SetVariable("_functionName",F);
D.SetVariable("_numArgs",A.length);
for(var C=0;
C<A.length;
C++){var E=A[C];
E=E.replace(/\0/g,"\\0");
D.SetVariable("_"+C,E)
}D.TCallLabel("/_flashRunner","execute");
var B=D.GetVariable("_returnResult");
B=B.replace(/\\0/g,"\0");
return B
},_addExternalInterfaceCallback:function(A){var B=function(){var C=new Array(arguments.length);
for(var D=0;
D<arguments.length;
D++){C[D]=arguments[D]
}return dojox.flash.comm._execFlash(A,C)
};
dojox.flash.comm[A]=B
},_encodeData:function(A){var B=/\&([^;]*)\;/g;
A=A.replace(B,"&amp;$1;");
A=A.replace(/</g,"&lt;");
A=A.replace(/>/g,"&gt;");
A=A.replace("\\","&custom_backslash;&custom_backslash;");
A=A.replace(/\n/g,"\\n");
A=A.replace(/\r/g,"\\r");
A=A.replace(/\f/g,"\\f");
A=A.replace(/\0/g,"\\0");
A=A.replace(/\'/g,"\\'");
A=A.replace(/\"/g,'\\"');
return A
},_decodeData:function(data){if(data==null||typeof data=="undefined"){return data
}data=data.replace(/\&custom_lt\;/g,"<");
data=data.replace(/\&custom_gt\;/g,">");
data=eval('"'+data+'"');
return data
},_chunkArgumentData:function(H,G){var E=dojox.flash.obj.get();
var F=Math.ceil(H.length/1024);
for(var C=0;
C<F;
C++){var B=C*1024;
var A=C*1024+1024;
if(C==(F-1)){A=C*1024+H.length
}var D=H.substring(B,A);
D=this._encodeData(D);
E.CallFunction('<invoke name="chunkArgumentData" returntype="javascript"><arguments><string>'+D+"</string><number>"+G+"</number></arguments></invoke>")
}},_chunkReturnData:function(){var D=dojox.flash.obj.get();
var E=D.getReturnLength();
var F=new Array();
for(var B=0;
B<E;
B++){var C=D.CallFunction('<invoke name="chunkReturnData" returntype="javascript"><arguments><number>'+B+"</number></arguments></invoke>");
if(C=='""'||C=="''"){C=""
}else{C=C.substring(1,C.length-1)
}F.push(C)
}var A=F.join("");
return A
},_execFlash:function(B,A){var E=dojox.flash.obj.get();
E.startExec();
E.setNumberArguments(A.length);
for(var D=0;
D<A.length;
D++){this._chunkArgumentData(A[D],D)
}E.exec(B);
var C=this._chunkReturnData();
C=this._decodeData(C);
E.endExec();
return C
}};
dojox.flash.Install=function(){};
dojox.flash.Install.prototype={needed:function(){if(dojox.flash.info.capable==false){return true
}var A=(navigator.appVersion.indexOf("Macintosh")>=0);
if(A&&(!dojox.flash.info.isVersionOrAbove(8,0,0))){return true
}if(!dojox.flash.info.isVersionOrAbove(6,0,0)){return true
}return false
},install:function(){dojox.flash.info.installing=true;
dojox.flash.installing();
if(dojox.flash.info.capable==false){var A=new dojox.flash.Embed(false);
A.write(8)
}else{if(dojox.flash.info.isVersionOrAbove(6,0,65)){var A=new dojox.flash.Embed(false);
A.write(8,true);
A.setVisible(true);
A.center()
}else{alert("This content requires a more recent version of the Macromedia  Flash Player.");
window.location.href=+dojox.flash.Embed.protocol()+"://www.macromedia.com/go/getflashplayer"
}}},_onInstallStatus:function(A){if(A=="Download.Complete"){dojox.flash._initialize()
}else{if(A=="Download.Cancelled"){alert("This content requires a more recent version of the Macromedia  Flash Player.");
window.location.href=dojox.flash.Embed.protocol()+"://www.macromedia.com/go/getflashplayer"
}else{if(A=="Download.Failed"){alert("There was an error downloading the Flash Player update. Please try again later, or visit macromedia.com to download the latest version of the Flash plugin.")
}}}}};
dojox.flash.info=new dojox.flash.Info()
};