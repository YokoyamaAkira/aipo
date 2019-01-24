dojo._xdResourceLoaded({depends:[["provide","dojox.validate.ca"],["require","dojox.validate._base"]],defineResource:function(A){if(!A._hasResource["dojox.validate.ca"]){A._hasResource["dojox.validate.ca"]=true;
A.provide("dojox.validate.ca");
A.require("dojox.validate._base");
dojox.validate.ca.isPhoneNumber=function(B){return dojox.validate.us.isPhoneNumber(B)
};
dojox.validate.ca.isProvince=function(C){var B=new RegExp("^"+dojox.regexp.ca.province()+"$","i");
return B.test(C)
};
dojox.validate.ca.isSocialInsuranceNumber=function(C){var B={format:["###-###-###","### ### ###","#########"]};
return dojox.validate.isNumberFormat(C,B)
};
dojox.validate.ca.isPostalCode=function(C){var B=new RegExp("^"+dojox.regexp.ca.postalCode()+"$","i");
return B.test(C)
}
}}});