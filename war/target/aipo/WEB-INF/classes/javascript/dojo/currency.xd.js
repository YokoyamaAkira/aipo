dojo._xdResourceLoaded({depends:[["provide","dojo.currency"],["require","dojo.number"],["require","dojo.i18n"],["requireLocalization","dojo.cldr","currency",null,"ROOT,de,en,en-au,en-ca,en-us,es,fr,it,ja,ko,pt,zh","ROOT,de,en,en-au,en-ca,en-us,es,fr,it,ja,ko,pt,zh"],["require","dojo.cldr.monetary"]],defineResource:function(A){if(!A._hasResource["dojo.currency"]){A._hasResource["dojo.currency"]=true;
A.provide("dojo.currency");
A.require("dojo.number");
A.require("dojo.i18n");
A.require("dojo.cldr.monetary");
A.currency._mixInDefaults=function(C){C=C||{};
C.type="currency";
var B=A.i18n.getLocalization("dojo.cldr","currency",C.locale)||{};
var D=C.currency;
var E=A.cldr.monetary.getData(D);
A.forEach(["displayName","symbol","group","decimal"],function(F){E[F]=B[D+"_"+F]
});
E.fractional=[true,false];
return A.mixin(E,C)
};
A.currency.format=function(C,B){return A.number.format(C,A.currency._mixInDefaults(B))
};
A.currency.regexp=function(B){return A.number.regexp(A.currency._mixInDefaults(B))
};
A.currency.parse=function(C,B){return A.number.parse(C,A.currency._mixInDefaults(B))
}
}}});