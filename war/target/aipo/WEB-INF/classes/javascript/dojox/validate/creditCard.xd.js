dojo._xdResourceLoaded({depends:[["provide","dojox.validate.creditCard"],["require","dojox.validate._base"]],defineResource:function(A){if(!A._hasResource["dojox.validate.creditCard"]){A._hasResource["dojox.validate.creditCard"]=true;
A.provide("dojox.validate.creditCard");
A.require("dojox.validate._base");
dojox.validate.isValidCreditCard=function(C,B){if(C&&B&&((B.toLowerCase()=="er"||dojox.validate.isValidLuhn(C))&&(dojox.validate.isValidCreditCardNumber(C,B.toLowerCase())))){return true
}return false
};
dojox.validate.isValidCreditCardNumber=function(E,C){if(typeof E!="string"){E=String(E)
}E=E.replace(/[- ]/g,"");
var B=[];
var D={mc:"5[1-5][0-9]{14}",ec:"5[1-5][0-9]{14}",vi:"4([0-9]{12}|[0-9]{15})",ax:"3[47][0-9]{13}",dc:"3(0[0-5][0-9]{11}|[68][0-9]{12})",bl:"3(0[0-5][0-9]{11}|[68][0-9]{12})",di:"6011[0-9]{12}",jcb:"(3[0-9]{15}|(2131|1800)[0-9]{11})",er:"2(014|149)[0-9]{11}"};
if(C&&A.indexOf(D,C.toLowerCase())){return Boolean(E.match(D[C.toLowerCase()]))
}else{for(var F in D){if(E.match("^"+D[F]+"$")!=null){B.push(F)
}}return(B.length)?B.join("|"):false
}};
dojox.validate.isValidCvv=function(D,C){if(typeof D!="string"){D=String(D)
}var E;
switch(C.toLowerCase()){case"mc":case"ec":case"vi":case"di":E="###";
break;
case"ax":E="####";
break;
default:return false
}var B={format:E};
if((D.length==E.length)&&(dojox.validate.isNumberFormat(D,B))){return true
}return false
}
}}});