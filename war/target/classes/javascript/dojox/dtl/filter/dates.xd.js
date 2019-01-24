dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.dates"],["require","dojox.dtl.utils.date"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.dates"]){A._hasResource["dojox.dtl.filter.dates"]=true;
A.provide("dojox.dtl.filter.dates");
A.require("dojox.dtl.utils.date");
A.mixin(dojox.dtl.filter.dates,{date:function(C,B){if(!C||!(C instanceof Date)){return""
}B=B||"N j, Y";
return dojox.dtl.utils.date.format(C,B)
},time:function(C,B){if(!C||!(C instanceof Date)){return""
}B=B||"P";
return dojox.dtl.utils.date.format(C,B)
},timesince:function(D,B){var C=dojox.dtl.utils.date.timesince;
if(!D){return""
}if(B){return C(B,D)
}return C(D)
},timeuntil:function(D,B){var C=dojox.dtl.utils.date.timesince;
if(!D){return""
}if(B){return C(B,D)
}return C(new Date(),D)
}})
}}});