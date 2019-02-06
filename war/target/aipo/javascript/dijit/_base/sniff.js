if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var G=dojo;
var F=G.isIE;
var A=G.isOpera;
var B=Math.floor;
var D={dj_ie:F,dj_ie6:B(F)==6,dj_ie7:B(F)==7,dj_iequirks:F&&G.isQuirks,dj_opera:A,dj_opera8:B(A)==8,dj_opera9:B(A)==9,dj_khtml:G.isKhtml,dj_safari:G.isSafari,dj_gecko:G.isMozilla};
for(var E in D){if(D[E]){var C=dojo.doc.documentElement;
if(C.className){C.className+=" "+E
}else{C.className=E
}}}})()
};