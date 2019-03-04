dojo._xdResourceLoaded({depends:[["provide","dojox.validate.regexp"],["require","dojo.regexp"]],defineResource:function(A){if(!A._hasResource["dojox.validate.regexp"]){A._hasResource["dojox.validate.regexp"]=true;
A.provide("dojox.validate.regexp");
A.require("dojo.regexp");
dojox.regexp={ca:{},us:{}};
dojox.regexp.tld=function(D){D=(typeof D=="object")?D:{};
if(typeof D.allowCC!="boolean"){D.allowCC=true
}if(typeof D.allowInfra!="boolean"){D.allowInfra=true
}if(typeof D.allowGeneric!="boolean"){D.allowGeneric=true
}var G="arpa";
var F="aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|xxx|jobs|mobi|post";
var E="ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|eu|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sk|sl|sm|sn|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw";
var C=[];
if(D.allowInfra){C.push(G)
}if(D.allowGeneric){C.push(F)
}if(D.allowCC){C.push(E)
}var B="";
if(C.length>0){B="("+C.join("|")+")"
}return B
};
dojox.regexp.ipAddress=function(D){D=(typeof D=="object")?D:{};
if(typeof D.allowDottedDecimal!="boolean"){D.allowDottedDecimal=true
}if(typeof D.allowDottedHex!="boolean"){D.allowDottedHex=true
}if(typeof D.allowDottedOctal!="boolean"){D.allowDottedOctal=true
}if(typeof D.allowDecimal!="boolean"){D.allowDecimal=true
}if(typeof D.allowHex!="boolean"){D.allowHex=true
}if(typeof D.allowIPv6!="boolean"){D.allowIPv6=true
}if(typeof D.allowHybrid!="boolean"){D.allowHybrid=true
}var I="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var B="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var F="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var E="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var C="0[xX]0*[\\da-fA-F]{1,8}";
var K="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var J="([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var H=[];
if(D.allowDottedDecimal){H.push(I)
}if(D.allowDottedHex){H.push(B)
}if(D.allowDottedOctal){H.push(F)
}if(D.allowDecimal){H.push(E)
}if(D.allowHex){H.push(C)
}if(D.allowIPv6){H.push(K)
}if(D.allowHybrid){H.push(J)
}var G="";
if(H.length>0){G="("+H.join("|")+")"
}return G
};
dojox.regexp.host=function(B){B=(typeof B=="object")?B:{};
if(typeof B.allowIP!="boolean"){B.allowIP=true
}if(typeof B.allowLocal!="boolean"){B.allowLocal=false
}if(typeof B.allowPort!="boolean"){B.allowPort=true
}var E="([0-9a-zA-Z]([-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?\\.)+"+dojox.regexp.tld(B);
var D=(B.allowPort)?"(\\:"+dojox.regexp.integer({signed:false})+")?":"";
var C=E;
if(B.allowIP){C+="|"+dojox.regexp.ipAddress(B)
}if(B.allowLocal){C+="|localhost"
}return"("+C+")"+D
};
dojox.regexp.url=function(C){C=(typeof C=="object")?C:{};
if(typeof C.scheme=="undefined"){C.scheme=[true,false]
}var D=A.regexp.buildGroupRE(C.scheme,function(E){if(E){return"(https?|ftps?)\\://"
}return""
});
var B="(/([^?#\\s/]+/)*)?([^?#\\s/]+(\\?[^?#\\s/]*)?(#[A-Za-z][\\w.:-]*)?)?";
return D+dojox.regexp.host(C)+B
};
dojox.regexp.emailAddress=function(B){B=(typeof B=="object")?B:{};
if(typeof B.allowCruft!="boolean"){B.allowCruft=false
}B.allowPort=false;
var C="([\\da-zA-Z]+[-._+&'])*[\\da-zA-Z]+";
var D=C+"@"+dojox.regexp.host(B);
if(B.allowCruft){D="<?(mailto\\:)?"+D+">?"
}return D
};
dojox.regexp.emailAddressList=function(B){B=(typeof B=="object")?B:{};
if(typeof B.listSeparator!="string"){B.listSeparator="\\s;,"
}var D=dojox.regexp.emailAddress(B);
var C="("+D+"\\s*["+B.listSeparator+"]\\s*)*"+D+"\\s*["+B.listSeparator+"]?\\s*";
return C
};
dojox.regexp.us.state=function(C){C=(typeof C=="object")?C:{};
if(typeof C.allowTerritories!="boolean"){C.allowTerritories=true
}if(typeof C.allowMilitary!="boolean"){C.allowMilitary=true
}var D="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var B="AS|FM|GU|MH|MP|PW|PR|VI";
var E="AA|AE|AP";
if(C.allowTerritories){D+="|"+B
}if(C.allowMilitary){D+="|"+E
}return"("+D+")"
};
dojox.regexp.ca.postalCode=function(){var B="[A-Z][0-9][A-Z] [0-9][A-Z][0-9]";
return"("+B+")"
};
dojox.regexp.ca.province=function(){var B="AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT";
return"("+statesRE+")"
};
dojox.regexp.numberFormat=function(B){B=(typeof B=="object")?B:{};
if(typeof B.format=="undefined"){B.format="###-###-####"
}var C=function(D){D=A.regexp.escapeString(D,"?");
D=D.replace(/\?/g,"\\d?");
D=D.replace(/#/g,"\\d");
return D
};
return A.regexp.buildGroupRE(B.format,C)
}
}}});