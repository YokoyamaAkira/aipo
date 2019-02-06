if(!dojo._hasResource["dojox.validate.creditCard"]){dojo._hasResource["dojox.validate.creditCard"]=true;
dojo.provide("dojox.validate.creditCard");
dojo.require("dojox.validate._base");
dojox.validate.isValidCreditCard=function(A,B){if(A&&B&&((B.toLowerCase()=="er"||dojox.validate.isValidLuhn(A))&&(dojox.validate.isValidCreditCardNumber(A,B.toLowerCase())))){return true
}return false
};
dojox.validate.isValidCreditCardNumber=function(C,A){if(typeof C!="string"){C=String(C)
}C=C.replace(/[- ]/g,"");
var E=[];
var B={mc:"5[1-5][0-9]{14}",ec:"5[1-5][0-9]{14}",vi:"4([0-9]{12}|[0-9]{15})",ax:"3[47][0-9]{13}",dc:"3(0[0-5][0-9]{11}|[68][0-9]{12})",bl:"3(0[0-5][0-9]{11}|[68][0-9]{12})",di:"6011[0-9]{12}",jcb:"(3[0-9]{15}|(2131|1800)[0-9]{11})",er:"2(014|149)[0-9]{11}"};
if(A&&dojo.indexOf(B,A.toLowerCase())){return Boolean(C.match(B[A.toLowerCase()]))
}else{for(var D in B){if(C.match("^"+B[D]+"$")!=null){E.push(D)
}}return(E.length)?E.join("|"):false
}};
dojox.validate.isValidCvv=function(B,A){if(typeof B!="string"){B=String(B)
}var C;
switch(A.toLowerCase()){case"mc":case"ec":case"vi":case"di":C="###";
break;
case"ax":C="####";
break;
default:return false
}var D={format:C};
if((B.length==C.length)&&(dojox.validate.isNumberFormat(B,D))){return true
}return false
}
};