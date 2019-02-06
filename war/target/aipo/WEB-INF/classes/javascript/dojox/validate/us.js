if(!dojo._hasResource["dojox.validate.us"]){dojo._hasResource["dojox.validate.us"]=true;
dojo.provide("dojox.validate.us");
dojo.require("dojox.validate._base");
dojox.validate.us.isState=function(B,C){var A=new RegExp("^"+dojox.regexp.us.state(C)+"$","i");
return A.test(B)
};
dojox.validate.us.isPhoneNumber=function(A){var B={format:["###-###-####","(###) ###-####","(###) ### ####","###.###.####","###/###-####","### ### ####","###-###-#### x#???","(###) ###-#### x#???","(###) ### #### x#???","###.###.#### x#???","###/###-#### x#???","### ### #### x#???","##########"]};
return dojox.validate.isNumberFormat(A,B)
};
dojox.validate.us.isSocialSecurityNumber=function(A){var B={format:["###-##-####","### ## ####","#########"]};
return dojox.validate.isNumberFormat(A,B)
};
dojox.validate.us.isZipCode=function(A){var B={format:["#####-####","##### ####","#########","#####"]};
return dojox.validate.isNumberFormat(A,B)
}
};