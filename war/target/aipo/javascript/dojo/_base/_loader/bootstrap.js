(function(){if(typeof this["djConfig"]=="undefined"){this.djConfig={}
}if((!this["console"])||(!console.firebug)){this.console={}
}var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","log","profile","profileEnd","time","timeEnd","trace","warn"];
var i=0,tn;
while((tn=cn[i++])){if(!console[tn]){console[tn]=function(){}
}}if(typeof this["dojo"]=="undefined"){this.dojo={}
}var d=dojo;
dojo.global=this;
var _config={isDebug:false,libraryScriptUri:"",preventBackButtonFix:true,delayMozLoadingFix:false};
for(var option in _config){if(typeof djConfig[option]=="undefined"){djConfig[option]=_config[option]
}}var _platforms=["Browser","Rhino","Spidermonkey","Mobile"];
var t;
while(t=_platforms.shift()){d["is"+t]=false
}dojo.locale=djConfig.locale;
dojo.version={major:1,minor:0,patch:2,flag:"",revision:Number("$Rev: 11832 $".match(/[0-9]+/)[0]),toString:function(){with(d.version){return major+"."+minor+"."+patch+flag+" ("+revision+")"
}}};
if(typeof OpenAjax!="undefined"){OpenAjax.hub.registerLibrary("dojo","http://dojotoolkit.org",d.version.toString())
}dojo._mixin=function(obj,props){var tobj={};
for(var x in props){if(tobj[x]===undefined||tobj[x]!=props[x]){obj[x]=props[x]
}}if(d.isIE&&props){var p=props.toString;
if(typeof p=="function"&&p!=obj.toString&&p!=tobj.toString&&p!="\nfunction toString() {\n    [native code]\n}\n"){obj.toString=props.toString
}}return obj
};
dojo.mixin=function(obj,props){for(var i=1,l=arguments.length;
i<l;
i++){d._mixin(obj,arguments[i])
}return obj
};
dojo._getProp=function(parts,create,context){var obj=context||d.global;
for(var i=0,p;
obj&&(p=parts[i]);
i++){obj=(p in obj?obj[p]:(create?obj[p]={}:undefined))
}return obj
};
dojo.setObject=function(name,value,context){var parts=name.split("."),p=parts.pop(),obj=d._getProp(parts,true,context);
return(obj&&p?(obj[p]=value):undefined)
};
dojo.getObject=function(name,create,context){return d._getProp(name.split("."),create,context)
};
dojo.exists=function(name,obj){return !!d.getObject(name,false,obj)
};
dojo["eval"]=function(scriptFragment){return d.global.eval?d.global.eval(scriptFragment):eval(scriptFragment)
};
d.deprecated=d.experimental=function(){}
})();