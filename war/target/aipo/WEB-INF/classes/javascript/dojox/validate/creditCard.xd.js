dojo._xdResourceLoaded({depends:[["provide","dojox.validate.creditCard"],["require","dojox.validate._base"]],defineResource:function(A){if(!A._hasResource["dojox.validate.creditCard"]){A._hasResource["dojox.validate.creditCard"]=true;
A.provide("dojox.validate.creditCard");
A.require("dojox.validate._base");
dojox.validate.isValidCreditCard=function(B,C){if(B&&C&&((C.toLowerCase()=="er"||dojox.validate.isValidLuhn(B))&&(dojox.validate.isValidCreditCardNumber(B,C.toLowerCase())))){return true
}return false
};
dojox.validate.isValidCreditCardNumber=function(F,D){if(typeof F!="string"){F=String(F)
}F=F.replace(/[- ]/g,"");
var C=[];
var E={mc:"5[1-5][0-9]{14}",ec:"5[1-5][0-9]{14}",vi:"4([0-9]{12}|[0-9]{15})",ax:"3[47][0-9]{13}",dc:"3(0[0-5][0-9]{11}|[68][0-9]{12})",bl:"3(0[0-5][0-9]{11}|[68][0-9]{12})",di:"6011[0-9]{12}",jcb:"(3[0-9]{15}|(2131|1800)[0-9]{11})",er:"2(014|149)[0-9]{11}"};
if(D&&A.indexOf(E,D.toLowerCase())){return Boolean(F.match(E[D.toLowerCase()]))
}else{for(var B in E){if(F.match("^"+E[B]+"$")!=null){C.push(B)
}}return(C.length)?C.join("|"):false
}};
dojox.validate.isValidCvv=function(E,D){if(typeof E!="string"){E=String(E)
}var B;
switch(D.toLowerCase()){case"mc":case"ec":case"vi":case"di":B="###";
break;
case"ax":B="####";
break;
default:return false
}var C={format:B};
if((E.length==B.length)&&(dojox.validate.isNumberFormat(E,C))){return true
}return false
}
}}});