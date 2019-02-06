dojo._xdResourceLoaded({depends:[["provide","dojox.validate.web"],["require","dojox.validate._base"]],defineResource:function(A){if(!A._hasResource["dojox.validate.web"]){A._hasResource["dojox.validate.web"]=true;
A.provide("dojox.validate.web");
A.require("dojox.validate._base");
dojox.validate.isIpAddress=function(B,C){var D=new RegExp("^"+dojox.regexp.ipAddress(C)+"$","i");
return D.test(B)
};
dojox.validate.isUrl=function(B,C){var D=new RegExp("^"+dojox.regexp.url(C)+"$","i");
return D.test(B)
};
dojox.validate.isEmailAddress=function(B,C){var D=new RegExp("^"+dojox.regexp.emailAddress(C)+"$","i");
return D.test(B)
};
dojox.validate.isEmailAddressList=function(B,C){var D=new RegExp("^"+dojox.regexp.emailAddressList(C)+"$","i");
return D.test(B)
};
dojox.validate.getEmailAddressList=function(B,C){if(!C){C={}
}if(!C.listSeparator){C.listSeparator="\\s;,"
}if(dojox.validate.isEmailAddressList(B,C)){return B.split(new RegExp("\\s*["+C.listSeparator+"]\\s*"))
}return[]
}
}}});