if(!dojo._hasResource["dojox.validate.us"]){dojo._hasResource["dojox.validate.us"]=true;
dojo.provide("dojox.validate.us");
dojo.require("dojox.validate._base");
dojox.validate.us.isState=function(C,A){var B=new RegExp("^"+dojox.regexp.us.state(A)+"$","i");
return B.test(C)
};
dojox.validate.us.isPhoneNumber=function(B){var A={format:["###-###-####","(###) ###-####","(###) ### ####","###.###.####","###/###-####","### ### ####","###-###-#### x#???","(###) ###-#### x#???","(###) ### #### x#???","###.###.#### x#???","###/###-#### x#???","### ### #### x#???","##########"]};
return dojox.validate.isNumberFormat(B,A)
};
dojox.validate.us.isSocialSecurityNumber=function(B){var A={format:["###-##-####","### ## ####","#########"]};
return dojox.validate.isNumberFormat(B,A)
};
dojox.validate.us.isZipCode=function(B){var A={format:["#####-####","##### ####","#########","#####"]};
return dojox.validate.isNumberFormat(B,A)
}
};