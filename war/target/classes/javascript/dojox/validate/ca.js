if(!dojo._hasResource["dojox.validate.ca"]){dojo._hasResource["dojox.validate.ca"]=true;
dojo.provide("dojox.validate.ca");
dojo.require("dojox.validate._base");
dojox.validate.ca.isPhoneNumber=function(A){return dojox.validate.us.isPhoneNumber(A)
};
dojox.validate.ca.isProvince=function(A){var B=new RegExp("^"+dojox.regexp.ca.province()+"$","i");
return B.test(A)
};
dojox.validate.ca.isSocialInsuranceNumber=function(A){var B={format:["###-###-###","### ### ###","#########"]};
return dojox.validate.isNumberFormat(A,B)
};
dojox.validate.ca.isPostalCode=function(A){var B=new RegExp("^"+dojox.regexp.ca.postalCode()+"$","i");
return B.test(A)
}
};