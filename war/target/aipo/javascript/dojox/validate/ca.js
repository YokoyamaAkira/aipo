if(!dojo._hasResource["dojox.validate.ca"]){dojo._hasResource["dojox.validate.ca"]=true;
dojo.provide("dojox.validate.ca");
dojo.require("dojox.validate._base");
dojox.validate.ca.isPhoneNumber=function(A){return dojox.validate.us.isPhoneNumber(A)
};
dojox.validate.ca.isProvince=function(B){var A=new RegExp("^"+dojox.regexp.ca.province()+"$","i");
return A.test(B)
};
dojox.validate.ca.isSocialInsuranceNumber=function(B){var A={format:["###-###-###","### ### ###","#########"]};
return dojox.validate.isNumberFormat(B,A)
};
dojox.validate.ca.isPostalCode=function(B){var A=new RegExp("^"+dojox.regexp.ca.postalCode()+"$","i");
return A.test(B)
}
};