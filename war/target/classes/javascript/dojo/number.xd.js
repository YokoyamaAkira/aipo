dojo._xdResourceLoaded({depends:[["provide","dojo.number"],["require","dojo.i18n"],["requireLocalization","dojo.cldr","number",null,"de,de-de,en,en-ca,en-us,es,es-es,fr,it,ja-jp,ko-kr,ROOT,pt,zh-cn,zh-tw","de,de-de,en,en-ca,en-us,es,es-es,fr,it,ja-jp,ko-kr,ROOT,pt,zh-cn,zh-tw"],["require","dojo.string"],["require","dojo.regexp"]],defineResource:function(A){if(!A._hasResource["dojo.number"]){A._hasResource["dojo.number"]=true;
A.provide("dojo.number");
A.require("dojo.i18n");
A.require("dojo.string");
A.require("dojo.regexp");
A.number.format=function(B,E){E=A.mixin({},E||{});
var C=A.i18n.normalizeLocale(E.locale);
var D=A.i18n.getLocalization("dojo.cldr","number",C);
E.customs=D;
var F=E.pattern||D[(E.type||"decimal")+"Format"];
if(isNaN(B)){return null
}return A.number._applyPattern(B,F,E)
};
A.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
A.number._applyPattern=function(E,D,H){H=H||{};
var F=H.customs.group;
var J=H.customs.decimal;
var I=D.split(";");
var G=I[0];
D=I[(E<0)?1:0]||("-"+G);
if(D.indexOf("%")!=-1){E*=100
}else{if(D.indexOf("\u2030")!=-1){E*=1000
}else{if(D.indexOf("\u00a4")!=-1){F=H.customs.currencyGroup||F;
J=H.customs.currencyDecimal||J;
D=D.replace(/\u00a4{1,3}/,function(K){var L=["symbol","currency","displayName"][K.length-1];
return H[L]||H.currency||""
})
}else{if(D.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var C=A.number._numberPatternRE;
var B=G.match(C);
if(!B){throw new Error("unable to find a number expression in pattern: "+D)
}return D.replace(C,A.number._formatAbsolute(E,B[0],{decimal:J,group:F,places:H.places}))
};
A.number.round=function(C,D,B){var G=String(C).split(".");
var F=(G[1]&&G[1].length)||0;
if(F>D){var E=Math.pow(10,D);
if(B>0){E*=10/B;
D++
}C=Math.round(C*E)/E;
G=String(C).split(".");
F=(G[1]&&G[1].length)||0;
if(F>D){G[1]=G[1].substr(0,D);
C=Number(G.join("."))
}}return C
};
A.number._formatAbsolute=function(B,Q,H){H=H||{};
if(H.places===true){H.places=0
}if(H.places===Infinity){H.places=6
}var E=Q.split(".");
var G=(H.places>=0)?H.places:(E[1]&&E[1].length)||0;
if(!(H.round<0)){B=A.number.round(B,G,H.round)
}var P=String(Math.abs(B)).split(".");
var N=P[1]||"";
if(H.places){P[1]=A.string.pad(N.substr(0,H.places),H.places,"0",true)
}else{if(E[1]&&H.places!==0){var M=E[1].lastIndexOf("0")+1;
if(M>N.length){P[1]=A.string.pad(N,M,"0",true)
}var I=E[1].length;
if(I<N.length){P[1]=N.substr(0,I)
}}else{if(P[1]){P.pop()
}}}var D=E[0].replace(",","");
M=D.indexOf("0");
if(M!=-1){M=D.length-M;
if(M>P[0].length){P[0]=A.string.pad(P[0],M)
}if(D.indexOf("#")==-1){P[0]=P[0].substr(P[0].length-M)
}}var O=E[0].lastIndexOf(",");
var C,J;
if(O!=-1){C=E[0].length-O-1;
var F=E[0].substr(0,O);
O=F.lastIndexOf(",");
if(O!=-1){J=F.length-O-1
}}var L=[];
for(var R=P[0];
R;
){var K=R.length-C;
L.push((K>0)?R.substr(K):R);
R=(K>0)?R.slice(0,K):"";
if(J){C=J;
delete J
}}P[0]=L.reverse().join(H.group||",");
return P.join(H.decimal||".")
};
A.number.regexp=function(B){return A.number._parseInfo(B).regexp
};
A.number._parseInfo=function(H){H=H||{};
var E=A.i18n.normalizeLocale(H.locale);
var I=A.i18n.getLocalization("dojo.cldr","number",E);
var C=H.pattern||I[(H.type||"decimal")+"Format"];
var F=I.group;
var B=I.decimal;
var D=1;
if(C.indexOf("%")!=-1){D/=100
}else{if(C.indexOf("\u2030")!=-1){D/=1000
}else{var K=C.indexOf("\u00a4")!=-1;
if(K){F=I.currencyGroup||F;
B=I.currencyDecimal||B
}}}var J=C.split(";");
if(J.length==1){J.push("-"+J[0])
}var G=A.regexp.buildGroupRE(J,function(L){L="(?:"+A.regexp.escapeString(L,".")+")";
return L.replace(A.number._numberPatternRE,function(Q){var N={signed:false,separator:H.strict?F:[F,""],fractional:H.fractional,decimal:B,exponent:false};
var P=Q.split(".");
var O=H.places;
if(P.length==1||O===0){N.fractional=false
}else{if(typeof O=="undefined"){O=P[1].lastIndexOf("0")+1
}if(O&&H.fractional==undefined){N.fractional=true
}if(!H.places&&(O<P[1].length)){O+=","+P[1].length
}N.places=O
}var M=P[0].split(",");
if(M.length>1){N.groupSize=M.pop().length;
if(M.length>1){N.groupSize2=M.pop().length
}}return"("+A.number._realNumberRegexp(N)+")"
})
},true);
if(K){G=G.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(Q,M,N,O){var P=["symbol","currency","displayName"][N.length-1];
var L=A.regexp.escapeString(H[P]||H.currency||"");
M=M?"\\s":"";
O=O?"\\s":"";
if(!H.strict){if(M){M+="*"
}if(O){O+="*"
}return"(?:"+M+L+O+")?"
}return M+L+O
})
}return{regexp:G.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:F,decimal:B,factor:D}
};
A.number.parse=function(F,C){var E=A.number._parseInfo(C);
var D=(new RegExp("^"+E.regexp+"$")).exec(F);
if(!D){return NaN
}var B=D[1];
if(!D[1]){if(!D[2]){return NaN
}B=D[2];
E.factor*=-1
}B=B.replace(new RegExp("["+E.group+"\\s\\xa0]","g"),"").replace(E.decimal,".");
return Number(B)*E.factor
};
A.number._realNumberRegexp=function(C){C=C||{};
if(typeof C.places=="undefined"){C.places=Infinity
}if(typeof C.decimal!="string"){C.decimal="."
}if(typeof C.fractional=="undefined"||/^0/.test(C.places)){C.fractional=[true,false]
}if(typeof C.exponent=="undefined"){C.exponent=[true,false]
}if(typeof C.eSigned=="undefined"){C.eSigned=[true,false]
}var D=A.number._integerRegexp(C);
var B=A.regexp.buildGroupRE(C.fractional,function(H){var G="";
if(H&&(C.places!==0)){G="\\"+C.decimal;
if(C.places==Infinity){G="(?:"+G+"\\d+)?"
}else{G+="\\d{"+C.places+"}"
}}return G
},true);
var E=A.regexp.buildGroupRE(C.exponent,function(G){if(G){return"([eE]"+A.number._integerRegexp({signed:C.eSigned})+")"
}return""
});
var F=D+B;
if(B){F="(?:(?:"+F+")|(?:"+B+"))"
}return F+E
};
A.number._integerRegexp=function(C){C=C||{};
if(typeof C.signed=="undefined"){C.signed=[true,false]
}if(typeof C.separator=="undefined"){C.separator=""
}else{if(typeof C.groupSize=="undefined"){C.groupSize=3
}}var D=A.regexp.buildGroupRE(C.signed,function(E){return E?"[-+]":""
},true);
var B=A.regexp.buildGroupRE(C.separator,function(G){if(!G){return"(?:0|[1-9]\\d*)"
}G=A.regexp.escapeString(G);
if(G==" "){G="\\s"
}else{if(G=="\xa0"){G="\\s\\xa0"
}}var E=C.groupSize,F=C.groupSize2;
if(F){var H="(?:0|[1-9]\\d{0,"+(F-1)+"}(?:["+G+"]\\d{"+F+"})*["+G+"]\\d{"+E+"})";
return((E-F)>0)?"(?:"+H+"|(?:0|[1-9]\\d{0,"+(E-1)+"}))":H
}return"(?:0|[1-9]\\d{0,"+(E-1)+"}(?:["+G+"]\\d{"+E+"})*)"
},true);
return D+B
}
}}});