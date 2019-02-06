if(!dojo._hasResource["dojox.validate.regexp"]){dojo._hasResource["dojox.validate.regexp"]=true;
dojo.provide("dojox.validate.regexp");
dojo.require("dojo.regexp");
dojox.regexp={ca:{},us:{}};
dojox.regexp.tld=function(B){B=(typeof B=="object")?B:{};
if(typeof B.allowCC!="boolean"){B.allowCC=true
}if(typeof B.allowInfra!="boolean"){B.allowInfra=true
}if(typeof B.allowGeneric!="boolean"){B.allowGeneric=true
}var E="arpa";
var D="aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|xxx|jobs|mobi|post";
var C="ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|eu|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sk|sl|sm|sn|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw";
var A=[];
if(B.allowInfra){A.push(E)
}if(B.allowGeneric){A.push(D)
}if(B.allowCC){A.push(C)
}var F="";
if(A.length>0){F="("+A.join("|")+")"
}return F
};
dojox.regexp.ipAddress=function(I){I=(typeof I=="object")?I:{};
if(typeof I.allowDottedDecimal!="boolean"){I.allowDottedDecimal=true
}if(typeof I.allowDottedHex!="boolean"){I.allowDottedHex=true
}if(typeof I.allowDottedOctal!="boolean"){I.allowDottedOctal=true
}if(typeof I.allowDecimal!="boolean"){I.allowDecimal=true
}if(typeof I.allowHex!="boolean"){I.allowHex=true
}if(typeof I.allowIPv6!="boolean"){I.allowIPv6=true
}if(typeof I.allowHybrid!="boolean"){I.allowHybrid=true
}var D="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var G="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var A="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var J="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var H="0[xX]0*[\\da-fA-F]{1,8}";
var F="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var E="([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var C=[];
if(I.allowDottedDecimal){C.push(D)
}if(I.allowDottedHex){C.push(G)
}if(I.allowDottedOctal){C.push(A)
}if(I.allowDecimal){C.push(J)
}if(I.allowHex){C.push(H)
}if(I.allowIPv6){C.push(F)
}if(I.allowHybrid){C.push(E)
}var B="";
if(C.length>0){B="("+C.join("|")+")"
}return B
};
dojox.regexp.host=function(D){D=(typeof D=="object")?D:{};
if(typeof D.allowIP!="boolean"){D.allowIP=true
}if(typeof D.allowLocal!="boolean"){D.allowLocal=false
}if(typeof D.allowPort!="boolean"){D.allowPort=true
}var C="([0-9a-zA-Z]([-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?\\.)+"+dojox.regexp.tld(D);
var B=(D.allowPort)?"(\\:"+dojox.regexp.integer({signed:false})+")?":"";
var A=C;
if(D.allowIP){A+="|"+dojox.regexp.ipAddress(D)
}if(D.allowLocal){A+="|localhost"
}return"("+A+")"+B
};
dojox.regexp.url=function(A){A=(typeof A=="object")?A:{};
if(typeof A.scheme=="undefined"){A.scheme=[true,false]
}var B=dojo.regexp.buildGroupRE(A.scheme,function(D){if(D){return"(https?|ftps?)\\://"
}return""
});
var C="(/([^?#\\s/]+/)*)?([^?#\\s/]+(\\?[^?#\\s/]*)?(#[A-Za-z][\\w.:-]*)?)?";
return B+dojox.regexp.host(A)+C
};
dojox.regexp.emailAddress=function(C){C=(typeof C=="object")?C:{};
if(typeof C.allowCruft!="boolean"){C.allowCruft=false
}C.allowPort=false;
var A="([\\da-zA-Z]+[-._+&'])*[\\da-zA-Z]+";
var B=A+"@"+dojox.regexp.host(C);
if(C.allowCruft){B="<?(mailto\\:)?"+B+">?"
}return B
};
dojox.regexp.emailAddressList=function(C){C=(typeof C=="object")?C:{};
if(typeof C.listSeparator!="string"){C.listSeparator="\\s;,"
}var B=dojox.regexp.emailAddress(C);
var A="("+B+"\\s*["+C.listSeparator+"]\\s*)*"+B+"\\s*["+C.listSeparator+"]?\\s*";
return A
};
dojox.regexp.us.state=function(A){A=(typeof A=="object")?A:{};
if(typeof A.allowTerritories!="boolean"){A.allowTerritories=true
}if(typeof A.allowMilitary!="boolean"){A.allowMilitary=true
}var B="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var D="AS|FM|GU|MH|MP|PW|PR|VI";
var C="AA|AE|AP";
if(A.allowTerritories){B+="|"+D
}if(A.allowMilitary){B+="|"+C
}return"("+B+")"
};
dojox.regexp.ca.postalCode=function(){var A="[A-Z][0-9][A-Z] [0-9][A-Z][0-9]";
return"("+A+")"
};
dojox.regexp.ca.province=function(){var A="AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT";
return"("+statesRE+")"
};
dojox.regexp.numberFormat=function(B){B=(typeof B=="object")?B:{};
if(typeof B.format=="undefined"){B.format="###-###-####"
}var A=function(C){C=dojo.regexp.escapeString(C,"?");
C=C.replace(/\?/g,"\\d?");
C=C.replace(/#/g,"\\d");
return C
};
return dojo.regexp.buildGroupRE(B.format,A)
}
};