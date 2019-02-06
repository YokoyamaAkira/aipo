if(!dojo._hasResource["dojox.dtl.filter.logic"]){dojo._hasResource["dojox.dtl.filter.logic"]=true;
dojo.provide("dojox.dtl.filter.logic");
dojo.mixin(dojox.dtl.filter.logic,{default_:function(A,B){return A||B||""
},default_if_none:function(A,B){return(A===null)?B||"":A||""
},divisibleby:function(A,B){return(parseInt(A)%parseInt(B))==0
},_yesno:/\s*,\s*/g,yesno:function(A,C){if(!C){C="yes,no,maybe"
}var B=C.split(dojox.dtl.filter.logic._yesno);
if(B.length<2){return A
}if(A){return B[0]
}if((!A&&A!==null)||B.length<3){return B[1]
}return B[2]
}})
};