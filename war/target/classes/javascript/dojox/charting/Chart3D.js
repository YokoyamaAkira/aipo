if(!dojo._hasResource["dojox.charting.Chart3D"]){dojo._hasResource["dojox.charting.Chart3D"]=true;
dojo.provide("dojox.charting.Chart3D");
dojo.require("dojox.gfx3d");
(function(){var A={x:0,y:0,z:1},C=dojox.gfx3d.vector,B=dojox.gfx.normalizedLength;
dojo.declare("dojox.charting.Chart3D",null,{constructor:function(G,E,F,D){this.node=dojo.byId(G);
this.surface=dojox.gfx.createSurface(this.node,B(this.node.style.width),B(this.node.style.height));
this.view=this.surface.createViewport();
this.view.setLights(E.lights,E.ambient,E.specular);
this.view.setCameraTransform(F);
this.theme=D;
this.walls=[];
this.plots=[]
},generate:function(){return this._generateWalls()._generatePlots()
},invalidate:function(){this.view.invalidate();
return this
},render:function(){this.view.render();
return this
},addPlot:function(D){return this._add(this.plots,D)
},removePlot:function(D){return this._remove(this.plots,D)
},addWall:function(D){return this._add(this.walls,D)
},removeWall:function(D){return this._remove(this.walls,D)
},_add:function(D,E){if(!dojo.some(D,function(F){return F==E
})){D.push(E);
this.view.invalidate()
}return this
},_remove:function(D,F){var E=dojo.filter(D,function(G){return G!=F
});
return E.length<D.length?(D=E,this.invalidate()):this
},_generateWalls:function(){for(var D=0;
D<this.walls.length;
++D){if(C.dotProduct(A,this.walls[D].normal)>0){this.walls[D].generate(this)
}}return this
},_generatePlots:function(){var D=0,E=dojox.gfx3d.matrix,F=0;
for(;
F<this.plots.length;
++F){D+=this.plots[F].getDepth()
}for(--F;
F>=0;
--F){var G=this.view.createScene();
G.setTransform(E.translate(0,0,-D));
this.plots[F].generate(this,G);
D-=this.plots[F].getDepth()
}return this
}})
})()
};