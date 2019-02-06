if(!dojo._hasResource["dojox.validate.regexp"]){dojo._hasResource["dojox.validate.regexp"]=true;
dojo.provide("dojox.validate.regexp");
dojo.require("dojo.regexp");
dojox.regexp={ca:{},us:{}};
dojox.regexp.tld=function(C){C=(typeof C=="object")?C:{};
if(typeof C.allowCC!="boolean"){C.allowCC=true
}if(typeof C.allowInfra!="boolean"){C.allowInfra=true
}if(typeof C.allowGeneric!="boolean"){C.allowGeneric=true
}var F="arpa";
var E="aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|xxx|jobs|mobi|post";
var D="ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|eu|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sk|sl|sm|sn|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw";
var B=[];
if(C.allowInfra){B.push(F)
}if(C.allowGeneric){B.push(E)
}if(C.allowCC){B.push(D)
}var A="";
if(B.length>0){A="("+B.join("|")+")"
}return A
};
dojox.regexp.ipAddress=function(C){C=(typeof C=="object")?C:{};
if(typeof C.allowDottedDecimal!="boolean"){C.allowDottedDecimal=true
}if(typeof C.allowDottedHex!="boolean"){C.allowDottedHex=true
}if(typeof C.allowDottedOctal!="boolean"){C.allowDottedOctal=true
}if(typeof C.allowDecimal!="boolean"){C.allowDecimal=true
}if(typeof C.allowHex!="boolean"){C.allowHex=true
}if(typeof C.allowIPv6!="boolean"){C.allowIPv6=true
}if(typeof C.allowHybrid!="boolean"){C.allowHybrid=true
}var H="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var A="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var E="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var D="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var B="0[xX]0*[\\da-fA-F]{1,8}";
var J="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var I="([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var G=[];
if(C.allowDottedDecimal){G.push(H)
}if(C.allowDottedHex){G.push(A)
}if(C.allowDottedOctal){G.push(E)
}if(C.allowDecimal){G.push(D)
}if(C.allowHex){G.push(B)
}if(C.allowIPv6){G.push(J)
}if(C.allowHybrid){G.push(I)
}var F="";
if(G.length>0){F="("+G.join("|")+")"
}return F
};
dojox.regexp.host=function(A){A=(typeof A=="object")?A:{};
if(typeof A.allowIP!="boolean"){A.allowIP=true
}if(typeof A.allowLocal!="boolean"){A.allowLocal=false
}if(typeof A.allowPort!="boolean"){A.allowPort=true
}var D="([0-9a-zA-Z]([-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?\\.)+"+dojox.regexp.tld(A);
var C=(A.allowPort)?"(\\:"+dojox.regexp.integer({signed:false})+")?":"";
var B=D;
if(A.allowIP){B+="|"+dojox.regexp.ipAddress(A)
}if(A.allowLocal){B+="|localhost"
}return"("+B+")"+C
};
dojox.regexp.url=function(B){B=(typeof B=="object")?B:{};
if(typeof B.scheme=="undefined"){B.scheme=[true,false]
}var C=dojo.regexp.buildGroupRE(B.scheme,function(D){if(D){return"(https?|ftps?)\\://"
}return""
});
var A="(/([^?#\\s/]+/)*)?([^?#\\s/]+(\\?[^?#\\s/]*)?(#[A-Za-z][\\w.:-]*)?)?";
return C+dojox.regexp.host(B)+A
};
dojox.regexp.emailAddress=function(A){A=(typeof A=="object")?A:{};
if(typeof A.allowCruft!="boolean"){A.allowCruft=false
}A.allowPort=false;
var B="([\\da-zA-Z]+[-._+&'])*[\\da-zA-Z]+";
var C=B+"@"+dojox.regexp.host(A);
if(A.allowCruft){C="<?(mailto\\:)?"+C+">?"
}return C
};
dojox.regexp.emailAddressList=function(A){A=(typeof A=="object")?A:{};
if(typeof A.listSeparator!="string"){A.listSeparator="\\s;,"
}var C=dojox.regexp.emailAddress(A);
var B="("+C+"\\s*["+A.listSeparator+"]\\s*)*"+C+"\\s*["+A.listSeparator+"]?\\s*";
return B
};
dojox.regexp.us.state=function(B){B=(typeof B=="object")?B:{};
if(typeof B.allowTerritories!="boolean"){B.allowTerritories=true
}if(typeof B.allowMilitary!="boolean"){B.allowMilitary=true
}var C="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var A="AS|FM|GU|MH|MP|PW|PR|VI";
var D="AA|AE|AP";
if(B.allowTerritories){C+="|"+A
}if(B.allowMilitary){C+="|"+D
}return"("+C+")"
};
dojox.regexp.ca.postalCode=function(){var A="[A-Z][0-9][A-Z] [0-9][A-Z][0-9]";
return"("+A+")"
};
dojox.regexp.ca.province=function(){var A="AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT";
return"("+statesRE+")"
};
dojox.regexp.numberFormat=function(A){A=(typeof A=="object")?A:{};
if(typeof A.format=="undefined"){A.format="###-###-####"
}var B=function(C){C=dojo.regexp.escapeString(C,"?");
C=C.replace(/\?/g,"\\d?");
C=C.replace(/#/g,"\\d");
return C
};
return dojo.regexp.buildGroupRE(A.format,B)
}
};