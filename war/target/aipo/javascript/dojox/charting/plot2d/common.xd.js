dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.common"],["require","dojo.colors"],["require","dojox.gfx"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.common"]){A._hasResource["dojox.charting.plot2d.common"]=true;
A.provide("dojox.charting.plot2d.common");
A.require("dojo.colors");
A.require("dojox.gfx");
A.require("dojox.lang.functional");
(function(){var C=dojox.lang.functional,B=dojox.charting.plot2d.common;
A.mixin(dojox.charting.plot2d.common,{makeStroke:function(D){if(!D){return D
}if(typeof D=="string"||D instanceof A.Color){D={color:D}
}return dojox.gfx.makeParameters(dojox.gfx.defaultStroke,D)
},augmentColor:function(F,D){var E=new A.Color(F),G=new A.Color(D);
G.a=E.a;
return G
},augmentStroke:function(F,D){var E=B.makeStroke(F);
if(E){E.color=B.augmentColor(E.color,D)
}return E
},augmentFill:function(F,D){var E,G=new A.Color(D);
if(typeof F=="string"||F instanceof A.Color){return B.augmentColor(F,D)
}return F
},defaultStats:{hmin:Number.POSITIVE_INFINITY,hmax:Number.NEGATIVE_INFINITY,vmin:Number.POSITIVE_INFINITY,vmax:Number.NEGATIVE_INFINITY},collectSimpleStats:function(G){var F=A.clone(B.defaultStats);
for(var E=0;
E<G.length;
++E){var J=G[E];
if(!J.data.length){continue
}if(typeof J.data[0]=="number"){var D=F.vmin,I=F.vmax;
if(!("ymin" in J)||!("ymax" in J)){A.forEach(J.data,function(N,M){var L=M+1,O=N;
if(isNaN(O)){O=0
}F.hmin=Math.min(F.hmin,L);
F.hmax=Math.max(F.hmax,L);
F.vmin=Math.min(F.vmin,O);
F.vmax=Math.max(F.vmax,O)
})
}if("ymin" in J){F.vmin=Math.min(D,J.ymin)
}if("ymax" in J){F.vmax=Math.max(I,J.ymax)
}}else{var K=F.hmin,H=F.hmax,D=F.vmin,I=F.vmax;
if(!("xmin" in J)||!("xmax" in J)||!("ymin" in J)||!("ymax" in J)){A.forEach(J.data,function(N,M){var L=N.x,O=N.y;
if(isNaN(L)){L=0
}if(isNaN(O)){O=0
}F.hmin=Math.min(F.hmin,L);
F.hmax=Math.max(F.hmax,L);
F.vmin=Math.min(F.vmin,O);
F.vmax=Math.max(F.vmax,O)
})
}if("xmin" in J){F.hmin=Math.min(K,J.xmin)
}if("xmax" in J){F.hmax=Math.max(H,J.xmax)
}if("ymin" in J){F.vmin=Math.min(D,J.ymin)
}if("ymax" in J){F.vmax=Math.max(I,J.ymax)
}}}return F
},collectStackedStats:function(I){var H=A.clone(B.defaultStats);
if(I.length){H.hmin=Math.min(H.hmin,1);
H.hmax=C.foldl(I,"seed, run -> Math.max(seed, run.data.length)",H.hmax);
for(var G=0;
G<H.hmax;
++G){var D=I[0].data[G];
if(isNaN(D)){D=0
}H.vmin=Math.min(H.vmin,D);
for(var E=1;
E<I.length;
++E){var F=I[E].data[G];
if(isNaN(F)){F=0
}D+=F
}H.vmax=Math.max(H.vmax,D)
}}return H
}})
})()
}}});