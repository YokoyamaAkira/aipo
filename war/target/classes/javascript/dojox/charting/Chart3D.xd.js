dojo._xdResourceLoaded({depends:[["provide","dojox.charting.Chart3D"],["require","dojox.gfx3d"]],defineResource:function(A){if(!A._hasResource["dojox.charting.Chart3D"]){A._hasResource["dojox.charting.Chart3D"]=true;
A.provide("dojox.charting.Chart3D");
A.require("dojox.gfx3d");
(function(){var D={x:0,y:0,z:1},C=dojox.gfx3d.vector,B=dojox.gfx.normalizedLength;
A.declare("dojox.charting.Chart3D",null,{constructor:function(G,E,F,H){this.node=A.byId(G);
this.surface=dojox.gfx.createSurface(this.node,B(this.node.style.width),B(this.node.style.height));
this.view=this.surface.createViewport();
this.view.setLights(E.lights,E.ambient,E.specular);
this.view.setCameraTransform(F);
this.theme=H;
this.walls=[];
this.plots=[]
},generate:function(){return this._generateWalls()._generatePlots()
},invalidate:function(){this.view.invalidate();
return this
},render:function(){this.view.render();
return this
},addPlot:function(E){return this._add(this.plots,E)
},removePlot:function(E){return this._remove(this.plots,E)
},addWall:function(E){return this._add(this.walls,E)
},removeWall:function(E){return this._remove(this.walls,E)
},_add:function(F,E){if(!A.some(F,function(G){return G==E
})){F.push(E);
this.view.invalidate()
}return this
},_remove:function(G,F){var E=A.filter(G,function(H){return H!=F
});
return E.length<G.length?(G=E,this.invalidate()):this
},_generateWalls:function(){for(var E=0;
E<this.walls.length;
++E){if(C.dotProduct(D,this.walls[E].normal)>0){this.walls[E].generate(this)
}}return this
},_generatePlots:function(){var H=0,E=dojox.gfx3d.matrix,F=0;
for(;
F<this.plots.length;
++F){H+=this.plots[F].getDepth()
}for(--F;
F>=0;
--F){var G=this.view.createScene();
G.setTransform(E.translate(0,0,-H));
this.plots[F].generate(this,G);
H-=this.plots[F].getDepth()
}return this
}})
})()
}}});