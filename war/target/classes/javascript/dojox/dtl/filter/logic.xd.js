dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.logic"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.logic"]){A._hasResource["dojox.dtl.filter.logic"]=true;
A.provide("dojox.dtl.filter.logic");
A.mixin(dojox.dtl.filter.logic,{default_:function(C,B){return C||B||""
},default_if_none:function(C,B){return(C===null)?B||"":C||""
},divisibleby:function(C,B){return(parseInt(C)%parseInt(B))==0
},_yesno:/\s*,\s*/g,yesno:function(C,B){if(!B){B="yes,no,maybe"
}var D=B.split(dojox.dtl.filter.logic._yesno);
if(D.length<2){return C
}if(C){return D[0]
}if((!C&&C!==null)||D.length<3){return D[1]
}return D[2]
}})
}}});