dojo._xdResourceLoaded({depends:[["provide","dojox.validate._base"],["require","dojo.regexp"],["require","dojo.number"],["require","dojox.validate.regexp"]],defineResource:function(A){if(!A._hasResource["dojox.validate._base"]){A._hasResource["dojox.validate._base"]=true;
A.provide("dojox.validate._base");
A.require("dojo.regexp");
A.require("dojo.number");
A.require("dojox.validate.regexp");
dojox.validate.isText=function(B,C){C=(typeof C=="object")?C:{};
if(/^\s*$/.test(B)){return false
}if(typeof C.length=="number"&&C.length!=B.length){return false
}if(typeof C.minlength=="number"&&C.minlength>B.length){return false
}if(typeof C.maxlength=="number"&&C.maxlength<B.length){return false
}return true
};
dojox.validate._isInRangeCache={};
dojox.validate.isInRange=function(F,H){F=A.number.parse(F,H);
if(isNaN(F)){return false
}H=(typeof H=="object")?H:{};
var G=(typeof H.max=="number")?H.max:Infinity;
var D=(typeof H.min=="number")?H.min:-Infinity;
var C=(typeof H.decimal=="string")?H.decimal:".";
var B=dojox.validate._isInRangeCache;
var E=F+"max"+G+"min"+D+"dec"+C;
if(typeof B[E]!="undefined"){return B[E]
}if(F<D||F>G){B[E]=false;
return false
}B[E]=true;
return true
};
dojox.validate.isNumberFormat=function(B,C){var D=new RegExp("^"+dojox.regexp.numberFormat(C)+"$","i");
return D.test(B)
};
dojox.validate.isValidLuhn=function(B){var E,F,C;
if(typeof B!="string"){B=String(B)
}B=B.replace(/[- ]/g,"");
F=B.length%2;
E=0;
for(var D=0;
D<B.length;
D++){C=parseInt(B.charAt(D));
if(D%2==F){C*=2
}if(C>9){C-=9
}E+=C
}return !(E%10)
}
}}});