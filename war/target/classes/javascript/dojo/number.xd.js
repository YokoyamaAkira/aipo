dojo._xdResourceLoaded({depends:[["provide","dojo.number"],["require","dojo.i18n"],["requireLocalization","dojo.cldr","number",null,"de,de-de,en,en-ca,en-us,es,es-es,fr,it,ja-jp,ko-kr,ROOT,pt,zh-cn,zh-tw","de,de-de,en,en-ca,en-us,es,es-es,fr,it,ja-jp,ko-kr,ROOT,pt,zh-cn,zh-tw"],["require","dojo.string"],["require","dojo.regexp"]],defineResource:function(A){if(!A._hasResource["dojo.number"]){A._hasResource["dojo.number"]=true;
A.provide("dojo.number");
A.require("dojo.i18n");
A.require("dojo.string");
A.require("dojo.regexp");
A.number.format=function(F,D){D=A.mixin({},D||{});
var B=A.i18n.normalizeLocale(D.locale);
var C=A.i18n.getLocalization("dojo.cldr","number",B);
D.customs=C;
var E=D.pattern||C[(D.type||"decimal")+"Format"];
if(isNaN(F)){return null
}return A.number._applyPattern(F,E,D)
};
A.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
A.number._applyPattern=function(G,F,J){J=J||{};
var H=J.customs.group;
var C=J.customs.decimal;
var B=F.split(";");
var I=B[0];
F=B[(G<0)?1:0]||("-"+I);
if(F.indexOf("%")!=-1){G*=100
}else{if(F.indexOf("\u2030")!=-1){G*=1000
}else{if(F.indexOf("\u00a4")!=-1){H=J.customs.currencyGroup||H;
C=J.customs.currencyDecimal||C;
F=F.replace(/\u00a4{1,3}/,function(K){var L=["symbol","currency","displayName"][K.length-1];
return J[L]||J.currency||""
})
}else{if(F.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var E=A.number._numberPatternRE;
var D=I.match(E);
if(!D){throw new Error("unable to find a number expression in pattern: "+F)
}return F.replace(E,A.number._formatAbsolute(G,D[0],{decimal:C,group:H,places:J.places}))
};
A.number.round=function(G,C,B){var F=String(G).split(".");
var E=(F[1]&&F[1].length)||0;
if(E>C){var D=Math.pow(10,C);
if(B>0){D*=10/B;
C++
}G=Math.round(G*D)/D;
F=String(G).split(".");
E=(F[1]&&F[1].length)||0;
if(E>C){F[1]=F[1].substr(0,C);
G=Number(F.join("."))
}}return G
};
A.number._formatAbsolute=function(M,K,R){R=R||{};
if(R.places===true){R.places=0
}if(R.places===Infinity){R.places=6
}var D=K.split(".");
var Q=(R.places>=0)?R.places:(D[1]&&D[1].length)||0;
if(!(R.round<0)){M=A.number.round(M,Q,R.round)
}var J=String(Math.abs(M)).split(".");
var H=J[1]||"";
if(R.places){J[1]=A.string.pad(H.substr(0,R.places),R.places,"0",true)
}else{if(D[1]&&R.places!==0){var G=D[1].lastIndexOf("0")+1;
if(G>H.length){J[1]=A.string.pad(H,G,"0",true)
}var B=D[1].length;
if(B<H.length){J[1]=H.substr(0,B)
}}else{if(J[1]){J.pop()
}}}var O=D[0].replace(",","");
G=O.indexOf("0");
if(G!=-1){G=O.length-G;
if(G>J[0].length){J[0]=A.string.pad(J[0],G)
}if(O.indexOf("#")==-1){J[0]=J[0].substr(J[0].length-G)
}}var I=D[0].lastIndexOf(",");
var N,C;
if(I!=-1){N=D[0].length-I-1;
var P=D[0].substr(0,I);
I=P.lastIndexOf(",");
if(I!=-1){C=P.length-I-1
}}var F=[];
for(var L=J[0];
L;
){var E=L.length-N;
F.push((E>0)?L.substr(E):L);
L=(E>0)?L.slice(0,E):"";
if(C){N=C;
delete C
}}J[0]=F.reverse().join(R.group||",");
return J.join(R.decimal||".")
};
A.number.regexp=function(B){return A.number._parseInfo(B).regexp
};
A.number._parseInfo=function(J){J=J||{};
var G=A.i18n.normalizeLocale(J.locale);
var K=A.i18n.getLocalization("dojo.cldr","number",G);
var E=J.pattern||K[(J.type||"decimal")+"Format"];
var H=K.group;
var D=K.decimal;
var F=1;
if(E.indexOf("%")!=-1){F/=100
}else{if(E.indexOf("\u2030")!=-1){F/=1000
}else{var C=E.indexOf("\u00a4")!=-1;
if(C){H=K.currencyGroup||H;
D=K.currencyDecimal||D
}}}var B=E.split(";");
if(B.length==1){B.push("-"+B[0])
}var I=A.regexp.buildGroupRE(B,function(L){L="(?:"+A.regexp.escapeString(L,".")+")";
return L.replace(A.number._numberPatternRE,function(Q){var N={signed:false,separator:J.strict?H:[H,""],fractional:J.fractional,decimal:D,exponent:false};
var P=Q.split(".");
var O=J.places;
if(P.length==1||O===0){N.fractional=false
}else{if(typeof O=="undefined"){O=P[1].lastIndexOf("0")+1
}if(O&&J.fractional==undefined){N.fractional=true
}if(!J.places&&(O<P[1].length)){O+=","+P[1].length
}N.places=O
}var M=P[0].split(",");
if(M.length>1){N.groupSize=M.pop().length;
if(M.length>1){N.groupSize2=M.pop().length
}}return"("+A.number._realNumberRegexp(N)+")"
})
},true);
if(C){I=I.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(L,N,O,P){var Q=["symbol","currency","displayName"][O.length-1];
var M=A.regexp.escapeString(J[Q]||J.currency||"");
N=N?"\\s":"";
P=P?"\\s":"";
if(!J.strict){if(N){N+="*"
}if(P){P+="*"
}return"(?:"+N+M+P+")?"
}return N+M+P
})
}return{regexp:I.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:H,decimal:D,factor:F}
};
A.number.parse=function(E,B){var D=A.number._parseInfo(B);
var C=(new RegExp("^"+D.regexp+"$")).exec(E);
if(!C){return NaN
}var F=C[1];
if(!C[1]){if(!C[2]){return NaN
}F=C[2];
D.factor*=-1
}F=F.replace(new RegExp("["+D.group+"\\s\\xa0]","g"),"").replace(D.decimal,".");
return Number(F)*D.factor
};
A.number._realNumberRegexp=function(B){B=B||{};
if(typeof B.places=="undefined"){B.places=Infinity
}if(typeof B.decimal!="string"){B.decimal="."
}if(typeof B.fractional=="undefined"||/^0/.test(B.places)){B.fractional=[true,false]
}if(typeof B.exponent=="undefined"){B.exponent=[true,false]
}if(typeof B.eSigned=="undefined"){B.eSigned=[true,false]
}var C=A.number._integerRegexp(B);
var F=A.regexp.buildGroupRE(B.fractional,function(H){var G="";
if(H&&(B.places!==0)){G="\\"+B.decimal;
if(B.places==Infinity){G="(?:"+G+"\\d+)?"
}else{G+="\\d{"+B.places+"}"
}}return G
},true);
var D=A.regexp.buildGroupRE(B.exponent,function(G){if(G){return"([eE]"+A.number._integerRegexp({signed:B.eSigned})+")"
}return""
});
var E=C+F;
if(F){E="(?:(?:"+E+")|(?:"+F+"))"
}return E+D
};
A.number._integerRegexp=function(B){B=B||{};
if(typeof B.signed=="undefined"){B.signed=[true,false]
}if(typeof B.separator=="undefined"){B.separator=""
}else{if(typeof B.groupSize=="undefined"){B.groupSize=3
}}var C=A.regexp.buildGroupRE(B.signed,function(E){return E?"[-+]":""
},true);
var D=A.regexp.buildGroupRE(B.separator,function(G){if(!G){return"(?:0|[1-9]\\d*)"
}G=A.regexp.escapeString(G);
if(G==" "){G="\\s"
}else{if(G=="\xa0"){G="\\s\\xa0"
}}var E=B.groupSize,F=B.groupSize2;
if(F){var H="(?:0|[1-9]\\d{0,"+(F-1)+"}(?:["+G+"]\\d{"+F+"})*["+G+"]\\d{"+E+"})";
return((E-F)>0)?"(?:"+H+"|(?:0|[1-9]\\d{0,"+(E-1)+"}))":H
}return"(?:0|[1-9]\\d{0,"+(E-1)+"}(?:["+G+"]\\d{"+E+"})*)"
},true);
return C+D
}
}}});