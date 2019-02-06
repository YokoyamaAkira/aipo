if(!dojo._hasResource["dojox.validate._base"]){dojo._hasResource["dojox.validate._base"]=true;
dojo.provide("dojox.validate._base");
dojo.require("dojo.regexp");
dojo.require("dojo.number");
dojo.require("dojox.validate.regexp");
dojox.validate.isText=function(A,B){B=(typeof B=="object")?B:{};
if(/^\s*$/.test(A)){return false
}if(typeof B.length=="number"&&B.length!=A.length){return false
}if(typeof B.minlength=="number"&&B.minlength>A.length){return false
}if(typeof B.maxlength=="number"&&B.maxlength<A.length){return false
}return true
};
dojox.validate._isInRangeCache={};
dojox.validate.isInRange=function(C,F){C=dojo.number.parse(C,F);
if(isNaN(C)){return false
}F=(typeof F=="object")?F:{};
var E=(typeof F.max=="number")?F.max:Infinity;
var A=(typeof F.min=="number")?F.min:-Infinity;
var D=(typeof F.decimal=="string")?F.decimal:".";
var G=dojox.validate._isInRangeCache;
var B=C+"max"+E+"min"+A+"dec"+D;
if(typeof G[B]!="undefined"){return G[B]
}if(C<A||C>E){G[B]=false;
return false
}G[B]=true;
return true
};
dojox.validate.isNumberFormat=function(B,C){var A=new RegExp("^"+dojox.regexp.numberFormat(C)+"$","i");
return A.test(B)
};
dojox.validate.isValidLuhn=function(D){var B,C,E;
if(typeof D!="string"){D=String(D)
}D=D.replace(/[- ]/g,"");
C=D.length%2;
B=0;
for(var A=0;
A<D.length;
A++){E=parseInt(D.charAt(A));
if(A%2==C){E*=2
}if(E>9){E-=9
}B+=E
}return !(B%10)
}
};