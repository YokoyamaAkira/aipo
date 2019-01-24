if(!dojo._hasResource["dojox.dtl.filter.logic"]){dojo._hasResource["dojox.dtl.filter.logic"]=true;
dojo.provide("dojox.dtl.filter.logic");
dojo.mixin(dojox.dtl.filter.logic,{default_:function(B,A){return B||A||""
},default_if_none:function(B,A){return(B===null)?A||"":B||""
},divisibleby:function(B,A){return(parseInt(B)%parseInt(A))==0
},_yesno:/\s*,\s*/g,yesno:function(B,A){if(!A){A="yes,no,maybe"
}var C=A.split(dojox.dtl.filter.logic._yesno);
if(C.length<2){return B
}if(B){return C[0]
}if((!B&&B!==null)||C.length<3){return C[1]
}return C[2]
}})
};