if(!dojo._hasResource["dojox.validate._base"]){dojo._hasResource["dojox.validate._base"]=true;
dojo.provide("dojox.validate._base");
dojo.require("dojo.regexp");
dojo.require("dojo.number");
dojo.require("dojox.validate.regexp");
dojox.validate.isText=function(B,A){A=(typeof A=="object")?A:{};
if(/^\s*$/.test(B)){return false
}if(typeof A.length=="number"&&A.length!=B.length){return false
}if(typeof A.minlength=="number"&&A.minlength>B.length){return false
}if(typeof A.maxlength=="number"&&A.maxlength<B.length){return false
}return true
};
dojox.validate._isInRangeCache={};
dojox.validate.isInRange=function(F,B){F=dojo.number.parse(F,B);
if(isNaN(F)){return false
}B=(typeof B=="object")?B:{};
var A=(typeof B.max=="number")?B.max:Infinity;
var D=(typeof B.min=="number")?B.min:-Infinity;
var G=(typeof B.decimal=="string")?B.decimal:".";
var C=dojox.validate._isInRangeCache;
var E=F+"max"+A+"min"+D+"dec"+G;
if(typeof C[E]!="undefined"){return C[E]
}if(F<D||F>A){C[E]=false;
return false
}C[E]=true;
return true
};
dojox.validate.isNumberFormat=function(C,A){var B=new RegExp("^"+dojox.regexp.numberFormat(A)+"$","i");
return B.test(C)
};
dojox.validate.isValidLuhn=function(E){var C,D,A;
if(typeof E!="string"){E=String(E)
}E=E.replace(/[- ]/g,"");
D=E.length%2;
C=0;
for(var B=0;
B<E.length;
B++){A=parseInt(E.charAt(B));
if(B%2==D){A*=2
}if(A>9){A-=9
}C+=A
}return !(C%10)
}
};