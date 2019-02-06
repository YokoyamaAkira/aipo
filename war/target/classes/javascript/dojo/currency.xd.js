dojo._xdResourceLoaded({depends:[["provide","dojo.currency"],["require","dojo.number"],["require","dojo.i18n"],["requireLocalization","dojo.cldr","currency",null,"ROOT,de,en,en-au,en-ca,en-us,es,fr,it,ja,ko,pt,zh","ROOT,de,en,en-au,en-ca,en-us,es,fr,it,ja,ko,pt,zh"],["require","dojo.cldr.monetary"]],defineResource:function(A){if(!A._hasResource["dojo.currency"]){A._hasResource["dojo.currency"]=true;
A.provide("dojo.currency");
A.require("dojo.number");
A.require("dojo.i18n");
A.require("dojo.cldr.monetary");
A.currency._mixInDefaults=function(D){D=D||{};
D.type="currency";
var C=A.i18n.getLocalization("dojo.cldr","currency",D.locale)||{};
var E=D.currency;
var B=A.cldr.monetary.getData(E);
A.forEach(["displayName","symbol","group","decimal"],function(F){B[F]=C[E+"_"+F]
});
B.fractional=[true,false];
return A.mixin(B,D)
};
A.currency.format=function(B,C){return A.number.format(B,A.currency._mixInDefaults(C))
};
A.currency.regexp=function(B){return A.number.regexp(A.currency._mixInDefaults(B))
};
A.currency.parse=function(B,C){return A.number.parse(B,A.currency._mixInDefaults(C))
}
}}});