if(!dojo._hasResource["dojo.currency"]){dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.require("dojo.number");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","currency",null,"ROOT,de,en,en-au,en-ca,en-us,es,fr,it,ja,ko,pt,zh");
dojo.require("dojo.cldr.monetary");
dojo.currency._mixInDefaults=function(B){B=B||{};
B.type="currency";
var A=dojo.i18n.getLocalization("dojo.cldr","currency",B.locale)||{};
var C=B.currency;
var D=dojo.cldr.monetary.getData(C);
dojo.forEach(["displayName","symbol","group","decimal"],function(E){D[E]=A[C+"_"+E]
});
D.fractional=[true,false];
return dojo.mixin(D,B)
};
dojo.currency.format=function(B,A){return dojo.number.format(B,dojo.currency._mixInDefaults(A))
};
dojo.currency.regexp=function(A){return dojo.number.regexp(dojo.currency._mixInDefaults(A))
};
dojo.currency.parse=function(B,A){return dojo.number.parse(B,dojo.currency._mixInDefaults(A))
}
};