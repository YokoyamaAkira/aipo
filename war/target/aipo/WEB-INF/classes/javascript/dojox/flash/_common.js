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
dojox.flash.Info.prototype={version:-1,versionMajor:-1,versionMinor:-1,versionRevision:-1,capable:false,commVersion:6,installing:false,isVersionOrAbove:function(B,C,A){A=parseFloat("."+A);
if(this.versionMajor>=B&&this.versionMinor>=C&&this.versionRevision>=A){return true
}else{return false
}},getResourceList:function(C,B){var D=[];
var A=C;
D.push(A);
A=A+"?baseRelativePath="+escape(dojo.baseUrl);
D.push(A);
A+="'%20'%20quality=";
D.push(A);
A=B;
D.push(A);
A+="?baseRelativePath="+escape(dojo.baseUrl);
D.push(A);
A+="'%20'%20quality=";
D.push(A);
D.push(dojo.moduleUrl("dojox","flash/flash6/flash6_gateway.swf")+"");
return D
},_detectVersion:function(){var E;
for(var A=25;
A>0;
A--){if(dojo.isIE){E=VBGetSwfVer(A)
}else{E=this._JSFlashInfo(A)
}if(E==-1){this.capable=false;
return 
}else{if(E!=0){var C;
if(dojo.isIE){var D=E.split(" ");
var B=D[1];
C=B.split(",")
}else{C=E.split(".")
}this.versionMajor=C[0];
this.versionMinor=C[1];
this.versionRevision=C[2];
var F=this.versionMajor+"."+this.versionRevision;
this.version=parseFloat(F);
this.capable=true;
break
}}}},_JSFlashInfo:function(H){if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var D=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";
var E=navigator.plugins["Shockwave Flash"+D].description;
var J=E.split(" ");
var A=J[2].split(".");
var G=A[0];
var F=A[1];
if(J[3]!=""){var I=J[3].split("r")
}else{var I=J[4].split("r")
}var B=I[1]>0?I[1]:0;
var C=G+"."+F+"."+B;
return C
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
}},write:function(A,G){G=!!G;
var E="";
E+=("width: "+this.width+"px; ");
E+=("height: "+this.height+"px; ");
if(this._visible==false){E+="position: absolute; z-index: 10000; top: -1000px; left: -1000px; "
}var J;
var F;
if(A==6){F=dojox.flash.flash6_version;
var B=djConfig.baseRelativePath;
F=F+"?baseRelativePath="+escape(B);
J='<embed id="'+this.id+'" src="'+F+'"     quality="high" bgcolor="#ffffff"     width="'+this.width+'" height="'+this.height+'"     name="'+this.id+'"     align="middle" allowScriptAccess="sameDomain"     type="application/x-shockwave-flash" swLiveConnect="true"     pluginspage="'+this.protocol()+'://www.macromedia.com/go/getflashplayer">'
}else{F=dojox.flash.flash8_version;
var D=F;
var I=F;
var B=djConfig.baseRelativePath;
if(G){var C=escape(window.location);
document.title=document.title.slice(0,47)+" - Flash Player Installation";
var H=escape(document.title);
D+="?MMredirectURL="+C+"&MMplayerType=ActiveX&MMdoctitle="+H+"&baseRelativePath="+escape(B);
I+="?MMredirectURL="+C+"&MMplayerType=PlugIn&baseRelativePath="+escape(B)
}if(I.indexOf("?")==-1){I+="?baseRelativePath="+escape(B)+"' "
}J='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+this.protocol()+'://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+this.width+'" height="'+this.height+'" id="'+this.id+'" align="middle"> <param name="allowScriptAccess" value="sameDomain" /> <param name="movie" value="'+D+'" /> <param name="quality" value="high" /> <param name="bgcolor" value="#ffffff" /> <embed src="'+I+'\' quality="high" bgcolor="#ffffff" width="'+this.width+'" height="'+this.height+'" id="'+this.id+'" name="'+this.id+'" swLiveConnect="true" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="'+this.protocol()+'://www.macromedia.com/go/getflashplayer" /></object>'
}J='<div id="'+this.id+'Container" style="'+E+'"> '+J+"</div>";
document.writeln(J)
},get:function(){return document.getElementById(this.id)
},setVisible:function(A){var B=dojo.byId(this.id+"Container");
if(A==true){B.style.visibility="visible"
}else{B.style.position="absolute";
B.style.x="-1000px";
B.style.y="-1000px";
B.style.visibility="hidden"
}},center:function(){var C=100;
var B=100;
var A=dojo.byId(this.id+"Container");
A.style.top=B+"px";
A.style.left=C+"px"
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
}},_writeFlash8:function(){},_handleFSCommand:function(A,B){if((A)&&dojo.isString(A)&&(/^FSCommand:(.*)/.test(A)==true)){A=A.match(/^FSCommand:(.*)/)[1]
}if(A=="addCallback"){this._fscommandAddCallback(A,B)
}else{if(A=="call"){this._fscommandCall(A,B)
}else{if(A=="fscommandReady"){this._fscommandReady()
}}}},_fscommandAddCallback:function(C,A){var B=A;
var D=function(){return dojox.flash.comm._call(B,arguments)
};
dojox.flash.comm[B]=D;
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
},_call:function(E,F){var C=dojox.flash.obj.get();
C.SetVariable("_functionName",E);
C.SetVariable("_numArgs",F.length);
for(var B=0;
B<F.length;
B++){var D=F[B];
D=D.replace(/\0/g,"\\0");
C.SetVariable("_"+B,D)
}C.TCallLabel("/_flashRunner","execute");
var A=C.GetVariable("_returnResult");
A=A.replace(/\\0/g,"\0");
return A
},_addExternalInterfaceCallback:function(B){var A=function(){var D=new Array(arguments.length);
for(var C=0;
C<arguments.length;
C++){D[C]=arguments[C]
}return dojox.flash.comm._execFlash(B,D)
};
dojox.flash.comm[B]=A
},_encodeData:function(B){var A=/\&([^;]*)\;/g;
B=B.replace(A,"&amp;$1;");
B=B.replace(/</g,"&lt;");
B=B.replace(/>/g,"&gt;");
B=B.replace("\\","&custom_backslash;&custom_backslash;");
B=B.replace(/\n/g,"\\n");
B=B.replace(/\r/g,"\\r");
B=B.replace(/\f/g,"\\f");
B=B.replace(/\0/g,"\\0");
B=B.replace(/\'/g,"\\'");
B=B.replace(/\"/g,'\\"');
return B
},_decodeData:function(data){if(data==null||typeof data=="undefined"){return data
}data=data.replace(/\&custom_lt\;/g,"<");
data=data.replace(/\&custom_gt\;/g,">");
data=eval('"'+data+'"');
return data
},_chunkArgumentData:function(C,B){var H=dojox.flash.obj.get();
var A=Math.ceil(C.length/1024);
for(var F=0;
F<A;
F++){var E=F*1024;
var D=F*1024+1024;
if(F==(A-1)){D=F*1024+C.length
}var G=C.substring(E,D);
G=this._encodeData(G);
H.CallFunction('<invoke name="chunkArgumentData" returntype="javascript"><arguments><string>'+G+"</string><number>"+B+"</number></arguments></invoke>")
}},_chunkReturnData:function(){var C=dojox.flash.obj.get();
var D=C.getReturnLength();
var E=new Array();
for(var A=0;
A<D;
A++){var B=C.CallFunction('<invoke name="chunkReturnData" returntype="javascript"><arguments><number>'+A+"</number></arguments></invoke>");
if(B=='""'||B=="''"){B=""
}else{B=B.substring(1,B.length-1)
}E.push(B)
}var F=E.join("");
return F
},_execFlash:function(A,E){var D=dojox.flash.obj.get();
D.startExec();
D.setNumberArguments(E.length);
for(var C=0;
C<E.length;
C++){this._chunkArgumentData(E[C],C)
}D.exec(A);
var B=this._chunkReturnData();
B=this._decodeData(B);
D.endExec();
return B
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