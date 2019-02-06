dojo._xdResourceLoaded({depends:[["provide","dojox.validate.regexp"],["require","dojo.regexp"]],defineResource:function(A){if(!A._hasResource["dojox.validate.regexp"]){A._hasResource["dojox.validate.regexp"]=true;
A.provide("dojox.validate.regexp");
A.require("dojo.regexp");
dojox.regexp={ca:{},us:{}};
dojox.regexp.tld=function(E){E=(typeof E=="object")?E:{};
if(typeof E.allowCC!="boolean"){E.allowCC=true
}if(typeof E.allowInfra!="boolean"){E.allowInfra=true
}if(typeof E.allowGeneric!="boolean"){E.allowGeneric=true
}var C="arpa";
var G="aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|xxx|jobs|mobi|post";
var F="ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|eu|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sk|sl|sm|sn|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw";
var D=[];
if(E.allowInfra){D.push(C)
}if(E.allowGeneric){D.push(G)
}if(E.allowCC){D.push(F)
}var B="";
if(D.length>0){B="("+D.join("|")+")"
}return B
};
dojox.regexp.ipAddress=function(B){B=(typeof B=="object")?B:{};
if(typeof B.allowDottedDecimal!="boolean"){B.allowDottedDecimal=true
}if(typeof B.allowDottedHex!="boolean"){B.allowDottedHex=true
}if(typeof B.allowDottedOctal!="boolean"){B.allowDottedOctal=true
}if(typeof B.allowDecimal!="boolean"){B.allowDecimal=true
}if(typeof B.allowHex!="boolean"){B.allowHex=true
}if(typeof B.allowIPv6!="boolean"){B.allowIPv6=true
}if(typeof B.allowHybrid!="boolean"){B.allowHybrid=true
}var G="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var J="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var D="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var C="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var K="0[xX]0*[\\da-fA-F]{1,8}";
var I="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var H="([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var F=[];
if(B.allowDottedDecimal){F.push(G)
}if(B.allowDottedHex){F.push(J)
}if(B.allowDottedOctal){F.push(D)
}if(B.allowDecimal){F.push(C)
}if(B.allowHex){F.push(K)
}if(B.allowIPv6){F.push(I)
}if(B.allowHybrid){F.push(H)
}var E="";
if(F.length>0){E="("+F.join("|")+")"
}return E
};
dojox.regexp.host=function(C){C=(typeof C=="object")?C:{};
if(typeof C.allowIP!="boolean"){C.allowIP=true
}if(typeof C.allowLocal!="boolean"){C.allowLocal=false
}if(typeof C.allowPort!="boolean"){C.allowPort=true
}var B="([0-9a-zA-Z]([-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?\\.)+"+dojox.regexp.tld(C);
var E=(C.allowPort)?"(\\:"+dojox.regexp.integer({signed:false})+")?":"";
var D=B;
if(C.allowIP){D+="|"+dojox.regexp.ipAddress(C)
}if(C.allowLocal){D+="|localhost"
}return"("+D+")"+E
};
dojox.regexp.url=function(D){D=(typeof D=="object")?D:{};
if(typeof D.scheme=="undefined"){D.scheme=[true,false]
}var B=A.regexp.buildGroupRE(D.scheme,function(E){if(E){return"(https?|ftps?)\\://"
}return""
});
var C="(/([^?#\\s/]+/)*)?([^?#\\s/]+(\\?[^?#\\s/]*)?(#[A-Za-z][\\w.:-]*)?)?";
return B+dojox.regexp.host(D)+C
};
dojox.regexp.emailAddress=function(C){C=(typeof C=="object")?C:{};
if(typeof C.allowCruft!="boolean"){C.allowCruft=false
}C.allowPort=false;
var D="([\\da-zA-Z]+[-._+&'])*[\\da-zA-Z]+";
var B=D+"@"+dojox.regexp.host(C);
if(C.allowCruft){B="<?(mailto\\:)?"+B+">?"
}return B
};
dojox.regexp.emailAddressList=function(C){C=(typeof C=="object")?C:{};
if(typeof C.listSeparator!="string"){C.listSeparator="\\s;,"
}var B=dojox.regexp.emailAddress(C);
var D="("+B+"\\s*["+C.listSeparator+"]\\s*)*"+B+"\\s*["+C.listSeparator+"]?\\s*";
return D
};
dojox.regexp.us.state=function(D){D=(typeof D=="object")?D:{};
if(typeof D.allowTerritories!="boolean"){D.allowTerritories=true
}if(typeof D.allowMilitary!="boolean"){D.allowMilitary=true
}var E="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var C="AS|FM|GU|MH|MP|PW|PR|VI";
var B="AA|AE|AP";
if(D.allowTerritories){E+="|"+C
}if(D.allowMilitary){E+="|"+B
}return"("+E+")"
};
dojox.regexp.ca.postalCode=function(){var B="[A-Z][0-9][A-Z] [0-9][A-Z][0-9]";
return"("+B+")"
};
dojox.regexp.ca.province=function(){var B="AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT";
return"("+statesRE+")"
};
dojox.regexp.numberFormat=function(C){C=(typeof C=="object")?C:{};
if(typeof C.format=="undefined"){C.format="###-###-####"
}var B=function(D){D=A.regexp.escapeString(D,"?");
D=D.replace(/\?/g,"\\d?");
D=D.replace(/#/g,"\\d");
return D
};
return A.regexp.buildGroupRE(C.format,B)
}
}}});