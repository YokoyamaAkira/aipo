dojo._xdResourceLoaded({depends:[["provide","dojox.validate.us"],["require","dojox.validate._base"]],defineResource:function(A){if(!A._hasResource["dojox.validate.us"]){A._hasResource["dojox.validate.us"]=true;
A.provide("dojox.validate.us");
A.require("dojox.validate._base");
dojox.validate.us.isState=function(B,C){var D=new RegExp("^"+dojox.regexp.us.state(C)+"$","i");
return D.test(B)
};
dojox.validate.us.isPhoneNumber=function(B){var C={format:["###-###-####","(###) ###-####","(###) ### ####","###.###.####","###/###-####","### ### ####","###-###-#### x#???","(###) ###-#### x#???","(###) ### #### x#???","###.###.#### x#???","###/###-#### x#???","### ### #### x#???","##########"]};
return dojox.validate.isNumberFormat(B,C)
};
dojox.validate.us.isSocialSecurityNumber=function(B){var C={format:["###-##-####","### ## ####","#########"]};
return dojox.validate.isNumberFormat(B,C)
};
dojox.validate.us.isZipCode=function(B){var C={format:["#####-####","##### ####","#########","#####"]};
return dojox.validate.isNumberFormat(B,C)
}
}}});