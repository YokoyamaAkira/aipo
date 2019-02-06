if(!dojo._hasResource["dojo.currency"]){dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.require("dojo.number");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","currency",null,"ROOT,de,en,en-au,en-ca,en-us,es,fr,it,ja,ko,pt,zh");
dojo.require("dojo.cldr.monetary");
dojo.currency._mixInDefaults=function(A){A=A||{};
A.type="currency";
var D=dojo.i18n.getLocalization("dojo.cldr","currency",A.locale)||{};
var B=A.currency;
var C=dojo.cldr.monetary.getData(B);
dojo.forEach(["displayName","symbol","group","decimal"],function(E){C[E]=D[B+"_"+E]
});
C.fractional=[true,false];
return dojo.mixin(C,A)
};
dojo.currency.format=function(A,B){return dojo.number.format(A,dojo.currency._mixInDefaults(B))
};
dojo.currency.regexp=function(A){return dojo.number.regexp(dojo.currency._mixInDefaults(A))
};
dojo.currency.parse=function(A,B){return dojo.number.parse(A,dojo.currency._mixInDefaults(B))
}
};