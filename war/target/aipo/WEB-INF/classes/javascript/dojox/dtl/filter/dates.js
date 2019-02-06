if(!dojo._hasResource["dojox.dtl.filter.dates"]){dojo._hasResource["dojox.dtl.filter.dates"]=true;
dojo.provide("dojox.dtl.filter.dates");
dojo.require("dojox.dtl.utils.date");
dojo.mixin(dojox.dtl.filter.dates,{date:function(A,B){if(!A||!(A instanceof Date)){return""
}B=B||"N j, Y";
return dojox.dtl.utils.date.format(A,B)
},time:function(A,B){if(!A||!(A instanceof Date)){return""
}B=B||"P";
return dojox.dtl.utils.date.format(A,B)
},timesince:function(B,C){var A=dojox.dtl.utils.date.timesince;
if(!B){return""
}if(C){return A(C,B)
}return A(B)
},timeuntil:function(B,C){var A=dojox.dtl.utils.date.timesince;
if(!B){return""
}if(C){return A(C,B)
}return A(new Date(),B)
}})
};