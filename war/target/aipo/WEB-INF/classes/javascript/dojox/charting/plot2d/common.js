if(!dojo._hasResource["dojox.charting.plot2d.common"]){dojo._hasResource["dojox.charting.plot2d.common"]=true;
dojo.provide("dojox.charting.plot2d.common");
dojo.require("dojo.colors");
dojo.require("dojox.gfx");
dojo.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,A=dojox.charting.plot2d.common;
dojo.mixin(dojox.charting.plot2d.common,{makeStroke:function(C){if(!C){return C
}if(typeof C=="string"||C instanceof dojo.Color){C={color:C}
}return dojox.gfx.makeParameters(dojox.gfx.defaultStroke,C)
},augmentColor:function(E,C){var D=new dojo.Color(E),F=new dojo.Color(C);
F.a=D.a;
return F
},augmentStroke:function(E,C){var D=A.makeStroke(E);
if(D){D.color=A.augmentColor(D.color,C)
}return D
},augmentFill:function(E,C){var D,F=new dojo.Color(C);
if(typeof E=="string"||E instanceof dojo.Color){return A.augmentColor(E,C)
}return E
},defaultStats:{hmin:Number.POSITIVE_INFINITY,hmax:Number.NEGATIVE_INFINITY,vmin:Number.POSITIVE_INFINITY,vmax:Number.NEGATIVE_INFINITY},collectSimpleStats:function(F){var E=dojo.clone(A.defaultStats);
for(var D=0;
D<F.length;
++D){var I=F[D];
if(!I.data.length){continue
}if(typeof I.data[0]=="number"){var C=E.vmin,H=E.vmax;
if(!("ymin" in I)||!("ymax" in I)){dojo.forEach(I.data,function(M,L){var K=L+1,N=M;
if(isNaN(N)){N=0
}E.hmin=Math.min(E.hmin,K);
E.hmax=Math.max(E.hmax,K);
E.vmin=Math.min(E.vmin,N);
E.vmax=Math.max(E.vmax,N)
})
}if("ymin" in I){E.vmin=Math.min(C,I.ymin)
}if("ymax" in I){E.vmax=Math.max(H,I.ymax)
}}else{var J=E.hmin,G=E.hmax,C=E.vmin,H=E.vmax;
if(!("xmin" in I)||!("xmax" in I)||!("ymin" in I)||!("ymax" in I)){dojo.forEach(I.data,function(M,L){var K=M.x,N=M.y;
if(isNaN(K)){K=0
}if(isNaN(N)){N=0
}E.hmin=Math.min(E.hmin,K);
E.hmax=Math.max(E.hmax,K);
E.vmin=Math.min(E.vmin,N);
E.vmax=Math.max(E.vmax,N)
})
}if("xmin" in I){E.hmin=Math.min(J,I.xmin)
}if("xmax" in I){E.hmax=Math.max(G,I.xmax)
}if("ymin" in I){E.vmin=Math.min(C,I.ymin)
}if("ymax" in I){E.vmax=Math.max(H,I.ymax)
}}}return E
},collectStackedStats:function(H){var G=dojo.clone(A.defaultStats);
if(H.length){G.hmin=Math.min(G.hmin,1);
G.hmax=B.foldl(H,"seed, run -> Math.max(seed, run.data.length)",G.hmax);
for(var F=0;
F<G.hmax;
++F){var C=H[0].data[F];
if(isNaN(C)){C=0
}G.vmin=Math.min(G.vmin,C);
for(var D=1;
D<H.length;
++D){var E=H[D].data[F];
if(isNaN(E)){E=0
}C+=E
}G.vmax=Math.max(G.vmax,C)
}}return G
}})
})()
};