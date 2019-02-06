dojo._xdResourceLoaded({depends:[["provide","dojox.validate.ca"],["require","dojox.validate._base"]],defineResource:function(A){if(!A._hasResource["dojox.validate.ca"]){A._hasResource["dojox.validate.ca"]=true;
A.provide("dojox.validate.ca");
A.require("dojox.validate._base");
dojox.validate.ca.isPhoneNumber=function(B){return dojox.validate.us.isPhoneNumber(B)
};
dojox.validate.ca.isProvince=function(B){var C=new RegExp("^"+dojox.regexp.ca.province()+"$","i");
return C.test(B)
};
dojox.validate.ca.isSocialInsuranceNumber=function(B){var C={format:["###-###-###","### ### ###","#########"]};
return dojox.validate.isNumberFormat(B,C)
};
dojox.validate.ca.isPostalCode=function(B){var C=new RegExp("^"+dojox.regexp.ca.postalCode()+"$","i");
return C.test(B)
}
}}});