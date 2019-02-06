dojo._xdResourceLoaded({depends:[["provide","dojox.validate.web"],["require","dojox.validate._base"]],defineResource:function(A){if(!A._hasResource["dojox.validate.web"]){A._hasResource["dojox.validate.web"]=true;
A.provide("dojox.validate.web");
A.require("dojox.validate._base");
dojox.validate.isIpAddress=function(D,B){var C=new RegExp("^"+dojox.regexp.ipAddress(B)+"$","i");
return C.test(D)
};
dojox.validate.isUrl=function(D,B){var C=new RegExp("^"+dojox.regexp.url(B)+"$","i");
return C.test(D)
};
dojox.validate.isEmailAddress=function(D,B){var C=new RegExp("^"+dojox.regexp.emailAddress(B)+"$","i");
return C.test(D)
};
dojox.validate.isEmailAddressList=function(D,B){var C=new RegExp("^"+dojox.regexp.emailAddressList(B)+"$","i");
return C.test(D)
};
dojox.validate.getEmailAddressList=function(C,B){if(!B){B={}
}if(!B.listSeparator){B.listSeparator="\\s;,"
}if(dojox.validate.isEmailAddressList(C,B)){return C.split(new RegExp("\\s*["+B.listSeparator+"]\\s*"))
}return[]
}
}}});