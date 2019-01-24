if(!dojo._hasResource["dojox.dtl.filter.dates"]){dojo._hasResource["dojox.dtl.filter.dates"]=true;
dojo.provide("dojox.dtl.filter.dates");
dojo.require("dojox.dtl.utils.date");
dojo.mixin(dojox.dtl.filter.dates,{date:function(B,A){if(!B||!(B instanceof Date)){return""
}A=A||"N j, Y";
return dojox.dtl.utils.date.format(B,A)
},time:function(B,A){if(!B||!(B instanceof Date)){return""
}A=A||"P";
return dojox.dtl.utils.date.format(B,A)
},timesince:function(C,A){var B=dojox.dtl.utils.date.timesince;
if(!C){return""
}if(A){return B(A,C)
}return B(C)
},timeuntil:function(C,A){var B=dojox.dtl.utils.date.timesince;
if(!C){return""
}if(A){return B(A,C)
}return B(new Date(),C)
}})
};