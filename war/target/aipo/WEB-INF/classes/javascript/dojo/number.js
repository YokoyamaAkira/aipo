if(!dojo._hasResource["dojo.number"]){dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","number",null,"de,de-de,en,en-ca,en-us,es,es-es,fr,it,ja-jp,ko-kr,ROOT,pt,zh-cn,zh-tw");
dojo.require("dojo.string");
dojo.require("dojo.regexp");
dojo.number.format=function(E,C){C=dojo.mixin({},C||{});
var A=dojo.i18n.normalizeLocale(C.locale);
var B=dojo.i18n.getLocalization("dojo.cldr","number",A);
C.customs=B;
var D=C.pattern||B[(C.type||"decimal")+"Format"];
if(isNaN(E)){return null
}return dojo.number._applyPattern(E,D,C)
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(F,E,I){I=I||{};
var G=I.customs.group;
var B=I.customs.decimal;
var A=E.split(";");
var H=A[0];
E=A[(F<0)?1:0]||("-"+H);
if(E.indexOf("%")!=-1){F*=100
}else{if(E.indexOf("\u2030")!=-1){F*=1000
}else{if(E.indexOf("\u00a4")!=-1){G=I.customs.currencyGroup||G;
B=I.customs.currencyDecimal||B;
E=E.replace(/\u00a4{1,3}/,function(J){var K=["symbol","currency","displayName"][J.length-1];
return I[K]||I.currency||""
})
}else{if(E.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var D=dojo.number._numberPatternRE;
var C=H.match(D);
if(!C){throw new Error("unable to find a number expression in pattern: "+E)
}return E.replace(D,dojo.number._formatAbsolute(F,C[0],{decimal:B,group:G,places:I.places}))
};
dojo.number.round=function(F,B,A){var E=String(F).split(".");
var D=(E[1]&&E[1].length)||0;
if(D>B){var C=Math.pow(10,B);
if(A>0){C*=10/A;
B++
}F=Math.round(F*C)/C;
E=String(F).split(".");
D=(E[1]&&E[1].length)||0;
if(D>B){E[1]=E[1].substr(0,B);
F=Number(E.join("."))
}}return F
};
dojo.number._formatAbsolute=function(L,J,Q){Q=Q||{};
if(Q.places===true){Q.places=0
}if(Q.places===Infinity){Q.places=6
}var C=J.split(".");
var P=(Q.places>=0)?Q.places:(C[1]&&C[1].length)||0;
if(!(Q.round<0)){L=dojo.number.round(L,P,Q.round)
}var I=String(Math.abs(L)).split(".");
var G=I[1]||"";
if(Q.places){I[1]=dojo.string.pad(G.substr(0,Q.places),Q.places,"0",true)
}else{if(C[1]&&Q.places!==0){var F=C[1].lastIndexOf("0")+1;
if(F>G.length){I[1]=dojo.string.pad(G,F,"0",true)
}var A=C[1].length;
if(A<G.length){I[1]=G.substr(0,A)
}}else{if(I[1]){I.pop()
}}}var N=C[0].replace(",","");
F=N.indexOf("0");
if(F!=-1){F=N.length-F;
if(F>I[0].length){I[0]=dojo.string.pad(I[0],F)
}if(N.indexOf("#")==-1){I[0]=I[0].substr(I[0].length-F)
}}var H=C[0].lastIndexOf(",");
var M,B;
if(H!=-1){M=C[0].length-H-1;
var O=C[0].substr(0,H);
H=O.lastIndexOf(",");
if(H!=-1){B=O.length-H-1
}}var E=[];
for(var K=I[0];
K;
){var D=K.length-M;
E.push((D>0)?K.substr(D):K);
K=(D>0)?K.slice(0,D):"";
if(B){M=B;
delete B
}}I[0]=E.reverse().join(Q.group||",");
return I.join(Q.decimal||".")
};
dojo.number.regexp=function(A){return dojo.number._parseInfo(A).regexp
};
dojo.number._parseInfo=function(I){I=I||{};
var F=dojo.i18n.normalizeLocale(I.locale);
var J=dojo.i18n.getLocalization("dojo.cldr","number",F);
var D=I.pattern||J[(I.type||"decimal")+"Format"];
var G=J.group;
var C=J.decimal;
var E=1;
if(D.indexOf("%")!=-1){E/=100
}else{if(D.indexOf("\u2030")!=-1){E/=1000
}else{var B=D.indexOf("\u00a4")!=-1;
if(B){G=J.currencyGroup||G;
C=J.currencyDecimal||C
}}}var A=D.split(";");
if(A.length==1){A.push("-"+A[0])
}var H=dojo.regexp.buildGroupRE(A,function(K){K="(?:"+dojo.regexp.escapeString(K,".")+")";
return K.replace(dojo.number._numberPatternRE,function(P){var M={signed:false,separator:I.strict?G:[G,""],fractional:I.fractional,decimal:C,exponent:false};
var O=P.split(".");
var N=I.places;
if(O.length==1||N===0){M.fractional=false
}else{if(typeof N=="undefined"){N=O[1].lastIndexOf("0")+1
}if(N&&I.fractional==undefined){M.fractional=true
}if(!I.places&&(N<O[1].length)){N+=","+O[1].length
}M.places=N
}var L=O[0].split(",");
if(L.length>1){M.groupSize=L.pop().length;
if(L.length>1){M.groupSize2=L.pop().length
}}return"("+dojo.number._realNumberRegexp(M)+")"
})
},true);
if(B){H=H.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(K,M,N,O){var P=["symbol","currency","displayName"][N.length-1];
var L=dojo.regexp.escapeString(I[P]||I.currency||"");
M=M?"\\s":"";
O=O?"\\s":"";
if(!I.strict){if(M){M+="*"
}if(O){O+="*"
}return"(?:"+M+L+O+")?"
}return M+L+O
})
}return{regexp:H.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:G,decimal:C,factor:E}
};
dojo.number.parse=function(D,A){var C=dojo.number._parseInfo(A);
var B=(new RegExp("^"+C.regexp+"$")).exec(D);
if(!B){return NaN
}var E=B[1];
if(!B[1]){if(!B[2]){return NaN
}E=B[2];
C.factor*=-1
}E=E.replace(new RegExp("["+C.group+"\\s\\xa0]","g"),"").replace(C.decimal,".");
return Number(E)*C.factor
};
dojo.number._realNumberRegexp=function(A){A=A||{};
if(typeof A.places=="undefined"){A.places=Infinity
}if(typeof A.decimal!="string"){A.decimal="."
}if(typeof A.fractional=="undefined"||/^0/.test(A.places)){A.fractional=[true,false]
}if(typeof A.exponent=="undefined"){A.exponent=[true,false]
}if(typeof A.eSigned=="undefined"){A.eSigned=[true,false]
}var B=dojo.number._integerRegexp(A);
var E=dojo.regexp.buildGroupRE(A.fractional,function(G){var F="";
if(G&&(A.places!==0)){F="\\"+A.decimal;
if(A.places==Infinity){F="(?:"+F+"\\d+)?"
}else{F+="\\d{"+A.places+"}"
}}return F
},true);
var C=dojo.regexp.buildGroupRE(A.exponent,function(F){if(F){return"([eE]"+dojo.number._integerRegexp({signed:A.eSigned})+")"
}return""
});
var D=B+E;
if(E){D="(?:(?:"+D+")|(?:"+E+"))"
}return D+C
};
dojo.number._integerRegexp=function(A){A=A||{};
if(typeof A.signed=="undefined"){A.signed=[true,false]
}if(typeof A.separator=="undefined"){A.separator=""
}else{if(typeof A.groupSize=="undefined"){A.groupSize=3
}}var B=dojo.regexp.buildGroupRE(A.signed,function(D){return D?"[-+]":""
},true);
var C=dojo.regexp.buildGroupRE(A.separator,function(F){if(!F){return"(?:0|[1-9]\\d*)"
}F=dojo.regexp.escapeString(F);
if(F==" "){F="\\s"
}else{if(F=="\xa0"){F="\\s\\xa0"
}}var D=A.groupSize,E=A.groupSize2;
if(E){var G="(?:0|[1-9]\\d{0,"+(E-1)+"}(?:["+F+"]\\d{"+E+"})*["+F+"]\\d{"+D+"})";
return((D-E)>0)?"(?:"+G+"|(?:0|[1-9]\\d{0,"+(D-1)+"}))":G
}return"(?:0|[1-9]\\d{0,"+(D-1)+"}(?:["+F+"]\\d{"+D+"})*)"
},true);
return B+C
}
};