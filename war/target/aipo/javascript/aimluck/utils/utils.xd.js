dojo._xdResourceLoaded({defineResource:function(dojo){aimluck.namespace("utils");
aimluck.utils.createCSS=function(url){if(document.createStyleSheet){document.createStyleSheet(url)
}else{var head=document.getElementsByTagName("head")[0];
var stylesheet=document.createElement("link");
with(stylesheet){rel="stylesheet";
type="text/css";
href=url
}head.appendChild(stylesheet)
}}
}});