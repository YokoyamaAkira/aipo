dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.common"],["require","dojo.colors"],["require","dojox.gfx"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.common"]){A._hasResource["dojox.charting.plot2d.common"]=true;
A.provide("dojox.charting.plot2d.common");
A.require("dojo.colors");
A.require("dojox.gfx");
A.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,C=dojox.charting.plot2d.common;
A.mixin(dojox.charting.plot2d.common,{makeStroke:function(D){if(!D){return D
}if(typeof D=="string"||D instanceof A.Color){D={color:D}
}return dojox.gfx.makeParameters(dojox.gfx.defaultStroke,D)
},augmentColor:function(F,D){var E=new A.Color(F),G=new A.Color(D);
G.a=E.a;
return G
},augmentStroke:function(F,D){var E=C.makeStroke(F);
if(E){E.color=C.augmentColor(E.color,D)
}return E
},augmentFill:function(F,D){var E,G=new A.Color(D);
if(typeof F=="string"||F instanceof A.Color){return C.augmentColor(F,D)
}return F
},defaultStats:{hmin:Number.POSITIVE_INFINITY,hmax:Number.NEGATIVE_INFINITY,vmin:Number.POSITIVE_INFINITY,vmax:Number.NEGATIVE_INFINITY},collectSimpleStats:function(H){var G=A.clone(C.defaultStats);
for(var F=0;
F<H.length;
++F){var D=H[F];
if(!D.data.length){continue
}if(typeof D.data[0]=="number"){var E=G.vmin,K=G.vmax;
if(!("ymin" in D)||!("ymax" in D)){A.forEach(D.data,function(M,L){var O=L+1,N=M;
if(isNaN(N)){N=0
}G.hmin=Math.min(G.hmin,O);
G.hmax=Math.max(G.hmax,O);
G.vmin=Math.min(G.vmin,N);
G.vmax=Math.max(G.vmax,N)
})
}if("ymin" in D){G.vmin=Math.min(E,D.ymin)
}if("ymax" in D){G.vmax=Math.max(K,D.ymax)
}}else{var J=G.hmin,I=G.hmax,E=G.vmin,K=G.vmax;
if(!("xmin" in D)||!("xmax" in D)||!("ymin" in D)||!("ymax" in D)){A.forEach(D.data,function(M,L){var O=M.x,N=M.y;
if(isNaN(O)){O=0
}if(isNaN(N)){N=0
}G.hmin=Math.min(G.hmin,O);
G.hmax=Math.max(G.hmax,O);
G.vmin=Math.min(G.vmin,N);
G.vmax=Math.max(G.vmax,N)
})
}if("xmin" in D){G.hmin=Math.min(J,D.xmin)
}if("xmax" in D){G.hmax=Math.max(I,D.xmax)
}if("ymin" in D){G.vmin=Math.min(E,D.ymin)
}if("ymax" in D){G.vmax=Math.max(K,D.ymax)
}}}return G
},collectStackedStats:function(H){var F=A.clone(C.defaultStats);
if(H.length){F.hmin=Math.min(F.hmin,1);
F.hmax=B.foldl(H,"seed, run -> Math.max(seed, run.data.length)",F.hmax);
for(var E=0;
E<F.hmax;
++E){var G=H[0].data[E];
if(isNaN(G)){G=0
}F.vmin=Math.min(F.vmin,G);
for(var I=1;
I<H.length;
++I){var D=H[I].data[E];
if(isNaN(D)){D=0
}G+=D
}F.vmax=Math.max(F.vmax,G)
}}return F
}})
})()
}}});