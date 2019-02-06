dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.dates"],["require","dojox.dtl.utils.date"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.dates"]){A._hasResource["dojox.dtl.filter.dates"]=true;
A.provide("dojox.dtl.filter.dates");
A.require("dojox.dtl.utils.date");
A.mixin(dojox.dtl.filter.dates,{date:function(B,C){if(!B||!(B instanceof Date)){return""
}C=C||"N j, Y";
return dojox.dtl.utils.date.format(B,C)
},time:function(B,C){if(!B||!(B instanceof Date)){return""
}C=C||"P";
return dojox.dtl.utils.date.format(B,C)
},timesince:function(B,C){var D=dojox.dtl.utils.date.timesince;
if(!B){return""
}if(C){return D(C,B)
}return D(B)
},timeuntil:function(B,C){var D=dojox.dtl.utils.date.timesince;
if(!B){return""
}if(C){return D(C,B)
}return D(new Date(),B)
}})
}}});