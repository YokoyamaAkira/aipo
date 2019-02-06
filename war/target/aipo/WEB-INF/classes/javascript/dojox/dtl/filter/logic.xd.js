dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.logic"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.logic"]){A._hasResource["dojox.dtl.filter.logic"]=true;
A.provide("dojox.dtl.filter.logic");
A.mixin(dojox.dtl.filter.logic,{default_:function(B,C){return B||C||""
},default_if_none:function(B,C){return(B===null)?C||"":B||""
},divisibleby:function(B,C){return(parseInt(B)%parseInt(C))==0
},_yesno:/\s*,\s*/g,yesno:function(D,C){if(!C){C="yes,no,maybe"
}var B=C.split(dojox.dtl.filter.logic._yesno);
if(B.length<2){return D
}if(D){return B[0]
}if((!D&&D!==null)||B.length<3){return B[1]
}return B[2]
}})
}}});