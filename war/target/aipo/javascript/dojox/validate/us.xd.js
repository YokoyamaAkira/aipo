dojo._xdResourceLoaded({depends:[["provide","dojox.validate.us"],["require","dojox.validate._base"]],defineResource:function(A){if(!A._hasResource["dojox.validate.us"]){A._hasResource["dojox.validate.us"]=true;
A.provide("dojox.validate.us");
A.require("dojox.validate._base");
dojox.validate.us.isState=function(D,B){var C=new RegExp("^"+dojox.regexp.us.state(B)+"$","i");
return C.test(D)
};
dojox.validate.us.isPhoneNumber=function(C){var B={format:["###-###-####","(###) ###-####","(###) ### ####","###.###.####","###/###-####","### ### ####","###-###-#### x#???","(###) ###-#### x#???","(###) ### #### x#???","###.###.#### x#???","###/###-#### x#???","### ### #### x#???","##########"]};
return dojox.validate.isNumberFormat(C,B)
};
dojox.validate.us.isSocialSecurityNumber=function(C){var B={format:["###-##-####","### ## ####","#########"]};
return dojox.validate.isNumberFormat(C,B)
};
dojox.validate.us.isZipCode=function(C){var B={format:["#####-####","##### ####","#########","#####"]};
return dojox.validate.isNumberFormat(C,B)
}
}}});