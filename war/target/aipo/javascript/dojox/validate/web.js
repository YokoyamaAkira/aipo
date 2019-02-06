if(!dojo._hasResource["dojox.validate.web"]){dojo._hasResource["dojox.validate.web"]=true;
dojo.provide("dojox.validate.web");
dojo.require("dojox.validate._base");
dojox.validate.isIpAddress=function(C,A){var B=new RegExp("^"+dojox.regexp.ipAddress(A)+"$","i");
return B.test(C)
};
dojox.validate.isUrl=function(C,A){var B=new RegExp("^"+dojox.regexp.url(A)+"$","i");
return B.test(C)
};
dojox.validate.isEmailAddress=function(C,A){var B=new RegExp("^"+dojox.regexp.emailAddress(A)+"$","i");
return B.test(C)
};
dojox.validate.isEmailAddressList=function(C,A){var B=new RegExp("^"+dojox.regexp.emailAddressList(A)+"$","i");
return B.test(C)
};
dojox.validate.getEmailAddressList=function(B,A){if(!A){A={}
}if(!A.listSeparator){A.listSeparator="\\s;,"
}if(dojox.validate.isEmailAddressList(B,A)){return B.split(new RegExp("\\s*["+A.listSeparator+"]\\s*"))
}return[]
}
};