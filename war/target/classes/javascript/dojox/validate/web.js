if(!dojo._hasResource["dojox.validate.web"]){dojo._hasResource["dojox.validate.web"]=true;
dojo.provide("dojox.validate.web");
dojo.require("dojox.validate._base");
dojox.validate.isIpAddress=function(B,C){var A=new RegExp("^"+dojox.regexp.ipAddress(C)+"$","i");
return A.test(B)
};
dojox.validate.isUrl=function(B,C){var A=new RegExp("^"+dojox.regexp.url(C)+"$","i");
return A.test(B)
};
dojox.validate.isEmailAddress=function(B,C){var A=new RegExp("^"+dojox.regexp.emailAddress(C)+"$","i");
return A.test(B)
};
dojox.validate.isEmailAddressList=function(B,C){var A=new RegExp("^"+dojox.regexp.emailAddressList(C)+"$","i");
return A.test(B)
};
dojox.validate.getEmailAddressList=function(A,B){if(!B){B={}
}if(!B.listSeparator){B.listSeparator="\\s;,"
}if(dojox.validate.isEmailAddressList(A,B)){return A.split(new RegExp("\\s*["+B.listSeparator+"]\\s*"))
}return[]
}
};