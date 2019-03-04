if(!dojo._hasResource["dojox.charting.Chart3D"]){dojo._hasResource["dojox.charting.Chart3D"]=true;
dojo.provide("dojox.charting.Chart3D");
dojo.require("dojox.gfx3d");
(function(){var B={x:0,y:0,z:1},A=dojox.gfx3d.vector,C=dojox.gfx.normalizedLength;
dojo.declare("dojox.charting.Chart3D",null,{constructor:function(F,D,E,G){this.node=dojo.byId(F);
this.surface=dojox.gfx.createSurface(this.node,C(this.node.style.width),C(this.node.style.height));
this.view=this.surface.createViewport();
this.view.setLights(D.lights,D.ambient,D.specular);
this.view.setCameraTransform(E);
this.theme=G;
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
},_add:function(E,D){if(!dojo.some(E,function(F){return F==D
})){E.push(D);
this.view.invalidate()
}return this
},_remove:function(F,E){var D=dojo.filter(F,function(G){return G!=E
});
return D.length<F.length?(F=D,this.invalidate()):this
},_generateWalls:function(){for(var D=0;
D<this.walls.length;
++D){if(A.dotProduct(B,this.walls[D].normal)>0){this.walls[D].generate(this)
}}return this
},_generatePlots:function(){var G=0,D=dojox.gfx3d.matrix,E=0;
for(;
E<this.plots.length;
++E){G+=this.plots[E].getDepth()
}for(--E;
E>=0;
--E){var F=this.view.createScene();
F.setTransform(D.translate(0,0,-G));
this.plots[E].generate(this,F);
G-=this.plots[E].getDepth()
}return this
}})
})()
};