if(!dojo._hasResource["dojo.number"]){dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","number",null,"de,de-de,en,en-ca,en-us,es,es-es,fr,it,ja-jp,ko-kr,ROOT,pt,zh-cn,zh-tw");
dojo.require("dojo.string");
dojo.require("dojo.regexp");
dojo.number.format=function(D,B){B=dojo.mixin({},B||{});
var E=dojo.i18n.normalizeLocale(B.locale);
var A=dojo.i18n.getLocalization("dojo.cldr","number",E);
B.customs=A;
var C=B.pattern||A[(B.type||"decimal")+"Format"];
if(isNaN(D)){return null
}return dojo.number._applyPattern(D,C,B)
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(B,A,E){E=E||{};
var C=E.customs.group;
var G=E.customs.decimal;
var F=A.split(";");
var D=F[0];
A=F[(B<0)?1:0]||("-"+D);
if(A.indexOf("%")!=-1){B*=100
}else{if(A.indexOf("\u2030")!=-1){B*=1000
}else{if(A.indexOf("\u00a4")!=-1){C=E.customs.currencyGroup||C;
G=E.customs.currencyDecimal||G;
A=A.replace(/\u00a4{1,3}/,function(K){var J=["symbol","currency","displayName"][K.length-1];
return E[J]||E.currency||""
})
}else{if(A.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var I=dojo.number._numberPatternRE;
var H=D.match(I);
if(!H){throw new Error("unable to find a number expression in pattern: "+A)
}return A.replace(I,dojo.number._formatAbsolute(B,H[0],{decimal:G,group:C,places:E.places}))
};
dojo.number.round=function(E,A,F){var D=String(E).split(".");
var C=(D[1]&&D[1].length)||0;
if(C>A){var B=Math.pow(10,A);
if(F>0){B*=10/F;
A++
}E=Math.round(E*B)/B;
D=String(E).split(".");
C=(D[1]&&D[1].length)||0;
if(C>A){D[1]=D[1].substr(0,A);
E=Number(D.join("."))
}}return E
};
dojo.number._formatAbsolute=function(Q,O,E){E=E||{};
if(E.places===true){E.places=0
}if(E.places===Infinity){E.places=6
}var H=O.split(".");
var D=(E.places>=0)?E.places:(H[1]&&H[1].length)||0;
if(!(E.round<0)){Q=dojo.number.round(Q,D,E.round)
}var N=String(Math.abs(Q)).split(".");
var L=N[1]||"";
if(E.places){N[1]=dojo.string.pad(L.substr(0,E.places),E.places,"0",true)
}else{if(H[1]&&E.places!==0){var K=H[1].lastIndexOf("0")+1;
if(K>L.length){N[1]=dojo.string.pad(L,K,"0",true)
}var F=H[1].length;
if(F<L.length){N[1]=L.substr(0,F)
}}else{if(N[1]){N.pop()
}}}var B=H[0].replace(",","");
K=B.indexOf("0");
if(K!=-1){K=B.length-K;
if(K>N[0].length){N[0]=dojo.string.pad(N[0],K)
}if(B.indexOf("#")==-1){N[0]=N[0].substr(N[0].length-K)
}}var M=H[0].lastIndexOf(",");
var A,G;
if(M!=-1){A=H[0].length-M-1;
var C=H[0].substr(0,M);
M=C.lastIndexOf(",");
if(M!=-1){G=C.length-M-1
}}var J=[];
for(var P=N[0];
P;
){var I=P.length-A;
J.push((I>0)?P.substr(I):P);
P=(I>0)?P.slice(0,I):"";
if(G){A=G;
delete G
}}N[0]=J.reverse().join(E.group||",");
return N.join(E.decimal||".")
};
dojo.number.regexp=function(A){return dojo.number._parseInfo(A).regexp
};
dojo.number._parseInfo=function(E){E=E||{};
var B=dojo.i18n.normalizeLocale(E.locale);
var F=dojo.i18n.getLocalization("dojo.cldr","number",B);
var J=E.pattern||F[(E.type||"decimal")+"Format"];
var C=F.group;
var I=F.decimal;
var A=1;
if(J.indexOf("%")!=-1){A/=100
}else{if(J.indexOf("\u2030")!=-1){A/=1000
}else{var H=J.indexOf("\u00a4")!=-1;
if(H){C=F.currencyGroup||C;
I=F.currencyDecimal||I
}}}var G=J.split(";");
if(G.length==1){G.push("-"+G[0])
}var D=dojo.regexp.buildGroupRE(G,function(K){K="(?:"+dojo.regexp.escapeString(K,".")+")";
return K.replace(dojo.number._numberPatternRE,function(O){var L={signed:false,separator:E.strict?C:[C,""],fractional:E.fractional,decimal:I,exponent:false};
var N=O.split(".");
var M=E.places;
if(N.length==1||M===0){L.fractional=false
}else{if(typeof M=="undefined"){M=N[1].lastIndexOf("0")+1
}if(M&&E.fractional==undefined){L.fractional=true
}if(!E.places&&(M<N[1].length)){M+=","+N[1].length
}L.places=M
}var P=N[0].split(",");
if(P.length>1){L.groupSize=P.pop().length;
if(P.length>1){L.groupSize2=P.pop().length
}}return"("+dojo.number._realNumberRegexp(L)+")"
})
},true);
if(H){D=D.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(P,L,M,N){var O=["symbol","currency","displayName"][M.length-1];
var K=dojo.regexp.escapeString(E[O]||E.currency||"");
L=L?"\\s":"";
N=N?"\\s":"";
if(!E.strict){if(L){L+="*"
}if(N){N+="*"
}return"(?:"+L+K+N+")?"
}return L+K+N
})
}return{regexp:D.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:C,decimal:I,factor:A}
};
dojo.number.parse=function(C,E){var B=dojo.number._parseInfo(E);
var A=(new RegExp("^"+B.regexp+"$")).exec(C);
if(!A){return NaN
}var D=A[1];
if(!A[1]){if(!A[2]){return NaN
}D=A[2];
B.factor*=-1
}D=D.replace(new RegExp("["+B.group+"\\s\\xa0]","g"),"").replace(B.decimal,".");
return Number(D)*B.factor
};
dojo.number._realNumberRegexp=function(E){E=E||{};
if(typeof E.places=="undefined"){E.places=Infinity
}if(typeof E.decimal!="string"){E.decimal="."
}if(typeof E.fractional=="undefined"||/^0/.test(E.places)){E.fractional=[true,false]
}if(typeof E.exponent=="undefined"){E.exponent=[true,false]
}if(typeof E.eSigned=="undefined"){E.eSigned=[true,false]
}var A=dojo.number._integerRegexp(E);
var D=dojo.regexp.buildGroupRE(E.fractional,function(F){var G="";
if(F&&(E.places!==0)){G="\\"+E.decimal;
if(E.places==Infinity){G="(?:"+G+"\\d+)?"
}else{G+="\\d{"+E.places+"}"
}}return G
},true);
var B=dojo.regexp.buildGroupRE(E.exponent,function(F){if(F){return"([eE]"+dojo.number._integerRegexp({signed:E.eSigned})+")"
}return""
});
var C=A+D;
if(D){C="(?:(?:"+C+")|(?:"+D+"))"
}return C+B
};
dojo.number._integerRegexp=function(C){C=C||{};
if(typeof C.signed=="undefined"){C.signed=[true,false]
}if(typeof C.separator=="undefined"){C.separator=""
}else{if(typeof C.groupSize=="undefined"){C.groupSize=3
}}var A=dojo.regexp.buildGroupRE(C.signed,function(D){return D?"[-+]":""
},true);
var B=dojo.regexp.buildGroupRE(C.separator,function(G){if(!G){return"(?:0|[1-9]\\d*)"
}G=dojo.regexp.escapeString(G);
if(G==" "){G="\\s"
}else{if(G=="\xa0"){G="\\s\\xa0"
}}var E=C.groupSize,F=C.groupSize2;
if(F){var D="(?:0|[1-9]\\d{0,"+(F-1)+"}(?:["+G+"]\\d{"+F+"})*["+G+"]\\d{"+E+"})";
return((E-F)>0)?"(?:"+D+"|(?:0|[1-9]\\d{0,"+(E-1)+"}))":D
}return"(?:0|[1-9]\\d{0,"+(E-1)+"}(?:["+G+"]\\d{"+E+"})*)"
},true);
return A+B
}
};