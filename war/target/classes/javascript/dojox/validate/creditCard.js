if(!dojo._hasResource["dojox.validate.creditCard"]){dojo._hasResource["dojox.validate.creditCard"]=true;
dojo.provide("dojox.validate.creditCard");
dojo.require("dojox.validate._base");
dojox.validate.isValidCreditCard=function(B,A){if(B&&A&&((A.toLowerCase()=="er"||dojox.validate.isValidLuhn(B))&&(dojox.validate.isValidCreditCardNumber(B,A.toLowerCase())))){return true
}return false
};
dojox.validate.isValidCreditCardNumber=function(D,B){if(typeof D!="string"){D=String(D)
}D=D.replace(/[- ]/g,"");
var A=[];
var C={mc:"5[1-5][0-9]{14}",ec:"5[1-5][0-9]{14}",vi:"4([0-9]{12}|[0-9]{15})",ax:"3[47][0-9]{13}",dc:"3(0[0-5][0-9]{11}|[68][0-9]{12})",bl:"3(0[0-5][0-9]{11}|[68][0-9]{12})",di:"6011[0-9]{12}",jcb:"(3[0-9]{15}|(2131|1800)[0-9]{11})",er:"2(014|149)[0-9]{11}"};
if(B&&dojo.indexOf(C,B.toLowerCase())){return Boolean(D.match(C[B.toLowerCase()]))
}else{for(var E in C){if(D.match("^"+C[E]+"$")!=null){A.push(E)
}}return(A.length)?A.join("|"):false
}};
dojox.validate.isValidCvv=function(C,B){if(typeof C!="string"){C=String(C)
}var D;
switch(B.toLowerCase()){case"mc":case"ec":case"vi":case"di":D="###";
break;
case"ax":D="####";
break;
default:return false
}var A={format:D};
if((C.length==D.length)&&(dojox.validate.isNumberFormat(C,A))){return true
}return false
}
};