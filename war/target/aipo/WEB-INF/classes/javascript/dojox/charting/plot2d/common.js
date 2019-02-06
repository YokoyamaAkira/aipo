if(!dojo._hasResource["dojox.charting.plot2d.common"]){dojo._hasResource["dojox.charting.plot2d.common"]=true;
dojo.provide("dojox.charting.plot2d.common");
dojo.require("dojo.colors");
dojo.require("dojox.gfx");
dojo.require("dojox.lang.functional");
(function(){var A=dojox.lang.functional,B=dojox.charting.plot2d.common;
dojo.mixin(dojox.charting.plot2d.common,{makeStroke:function(C){if(!C){return C
}if(typeof C=="string"||C instanceof dojo.Color){C={color:C}
}return dojox.gfx.makeParameters(dojox.gfx.defaultStroke,C)
},augmentColor:function(F,D){var E=new dojo.Color(F),C=new dojo.Color(D);
C.a=E.a;
return C
},augmentStroke:function(C,D){var E=B.makeStroke(C);
if(E){E.color=B.augmentColor(E.color,D)
}return E
},augmentFill:function(F,D){var E,C=new dojo.Color(D);
if(typeof F=="string"||F instanceof dojo.Color){return B.augmentColor(F,D)
}return F
},defaultStats:{hmin:Number.POSITIVE_INFINITY,hmax:Number.NEGATIVE_INFINITY,vmin:Number.POSITIVE_INFINITY,vmax:Number.NEGATIVE_INFINITY},collectSimpleStats:function(J){var H=dojo.clone(B.defaultStats);
for(var G=0;
G<J.length;
++G){var I=J[G];
if(!I.data.length){continue
}if(typeof I.data[0]=="number"){var F=H.vmin,E=H.vmax;
if(!("ymin" in I)||!("ymax" in I)){dojo.forEach(I.data,function(K,N){var M=N+1,L=K;
if(isNaN(L)){L=0
}H.hmin=Math.min(H.hmin,M);
H.hmax=Math.max(H.hmax,M);
H.vmin=Math.min(H.vmin,L);
H.vmax=Math.max(H.vmax,L)
})
}if("ymin" in I){H.vmin=Math.min(F,I.ymin)
}if("ymax" in I){H.vmax=Math.max(E,I.ymax)
}}else{var D=H.hmin,C=H.hmax,F=H.vmin,E=H.vmax;
if(!("xmin" in I)||!("xmax" in I)||!("ymin" in I)||!("ymax" in I)){dojo.forEach(I.data,function(K,N){var M=K.x,L=K.y;
if(isNaN(M)){M=0
}if(isNaN(L)){L=0
}H.hmin=Math.min(H.hmin,M);
H.hmax=Math.max(H.hmax,M);
H.vmin=Math.min(H.vmin,L);
H.vmax=Math.max(H.vmax,L)
})
}if("xmin" in I){H.hmin=Math.min(D,I.xmin)
}if("xmax" in I){H.hmax=Math.max(C,I.xmax)
}if("ymin" in I){H.vmin=Math.min(F,I.ymin)
}if("ymax" in I){H.vmax=Math.max(E,I.ymax)
}}}return H
},collectStackedStats:function(D){var H=dojo.clone(B.defaultStats);
if(D.length){H.hmin=Math.min(H.hmin,1);
H.hmax=A.foldl(D,"seed, run -> Math.max(seed, run.data.length)",H.hmax);
for(var G=0;
G<H.hmax;
++G){var C=D[0].data[G];
if(isNaN(C)){C=0
}H.vmin=Math.min(H.vmin,C);
for(var E=1;
E<D.length;
++E){var F=D[E].data[G];
if(isNaN(F)){F=0
}C+=F
}H.vmax=Math.max(H.vmax,C)
}}return H
}})
})()
};