dojo._xdResourceLoaded({depends:[["provide","dojox.validate._base"],["require","dojo.regexp"],["require","dojo.number"],["require","dojox.validate.regexp"]],defineResource:function(A){if(!A._hasResource["dojox.validate._base"]){A._hasResource["dojox.validate._base"]=true;
A.provide("dojox.validate._base");
A.require("dojo.regexp");
A.require("dojo.number");
A.require("dojox.validate.regexp");
dojox.validate.isText=function(C,B){B=(typeof B=="object")?B:{};
if(/^\s*$/.test(C)){return false
}if(typeof B.length=="number"&&B.length!=C.length){return false
}if(typeof B.minlength=="number"&&B.minlength>C.length){return false
}if(typeof B.maxlength=="number"&&B.maxlength<C.length){return false
}return true
};
dojox.validate._isInRangeCache={};
dojox.validate.isInRange=function(G,C){G=A.number.parse(G,C);
if(isNaN(G)){return false
}C=(typeof C=="object")?C:{};
var B=(typeof C.max=="number")?C.max:Infinity;
var E=(typeof C.min=="number")?C.min:-Infinity;
var H=(typeof C.decimal=="string")?C.decimal:".";
var D=dojox.validate._isInRangeCache;
var F=G+"max"+B+"min"+E+"dec"+H;
if(typeof D[F]!="undefined"){return D[F]
}if(G<E||G>B){D[F]=false;
return false
}D[F]=true;
return true
};
dojox.validate.isNumberFormat=function(D,B){var C=new RegExp("^"+dojox.regexp.numberFormat(B)+"$","i");
return C.test(D)
};
dojox.validate.isValidLuhn=function(F){var D,E,B;
if(typeof F!="string"){F=String(F)
}F=F.replace(/[- ]/g,"");
E=F.length%2;
D=0;
for(var C=0;
C<F.length;
C++){B=parseInt(F.charAt(C));
if(C%2==E){B*=2
}if(B>9){B-=9
}D+=B
}return !(D%10)
}
}}});