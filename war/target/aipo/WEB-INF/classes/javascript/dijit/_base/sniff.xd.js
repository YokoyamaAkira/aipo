dojo._xdResourceLoaded({depends:[["provide","dijit._base.sniff"]],defineResource:function(A){if(!A._hasResource["dijit._base.sniff"]){A._hasResource["dijit._base.sniff"]=true;
A.provide("dijit._base.sniff");
(function(){var C=A;
var F=C.isIE;
var G=C.isOpera;
var H=Math.floor;
var D={dj_ie:F,dj_ie6:H(F)==6,dj_ie7:H(F)==7,dj_iequirks:F&&C.isQuirks,dj_opera:G,dj_opera8:H(G)==8,dj_opera9:H(G)==9,dj_khtml:C.isKhtml,dj_safari:C.isSafari,dj_gecko:C.isMozilla};
for(var E in D){if(D[E]){var B=A.doc.documentElement;
if(B.className){B.className+=" "+E
}else{B.className=E
}}}})()
}}});