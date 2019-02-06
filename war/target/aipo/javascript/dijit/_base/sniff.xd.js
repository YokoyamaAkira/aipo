dojo._xdResourceLoaded({depends:[["provide","dijit._base.sniff"]],defineResource:function(A){if(!A._hasResource["dijit._base.sniff"]){A._hasResource["dijit._base.sniff"]=true;
A.provide("dijit._base.sniff");
(function(){var H=A;
var G=H.isIE;
var B=H.isOpera;
var C=Math.floor;
var E={dj_ie:G,dj_ie6:C(G)==6,dj_ie7:C(G)==7,dj_iequirks:G&&H.isQuirks,dj_opera:B,dj_opera8:C(B)==8,dj_opera9:C(B)==9,dj_khtml:H.isKhtml,dj_safari:H.isSafari,dj_gecko:H.isMozilla};
for(var F in E){if(E[F]){var D=A.doc.documentElement;
if(D.className){D.className+=" "+F
}else{D.className=F
}}}})()
}}});