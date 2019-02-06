if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var D=dojo;
var C=D.isIE;
var E=D.isOpera;
var F=Math.floor;
var A={dj_ie:C,dj_ie6:F(C)==6,dj_ie7:F(C)==7,dj_iequirks:C&&D.isQuirks,dj_opera:E,dj_opera8:F(E)==8,dj_opera9:F(E)==9,dj_khtml:D.isKhtml,dj_safari:D.isSafari,dj_gecko:D.isMozilla};
for(var B in A){if(A[B]){var G=dojo.doc.documentElement;
if(G.className){G.className+=" "+B
}else{G.className=B
}}}})()
};