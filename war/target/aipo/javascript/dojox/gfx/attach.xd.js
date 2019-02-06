dojo._xdResourceLoaded({depends:[["require","dojox.gfx"],["requireIf",dojox.gfx.renderer=="svg","dojox.gfx.svg_attach"],["requireIf",dojox.gfx.renderer=="vml","dojox.gfx.vml_attach"],["requireIf",dojox.gfx.renderer=="silverlight","dojox.gfx.silverlight_attach"],["requireIf",dojox.gfx.renderer=="canvas","dojox.gfx.canvas_attach"]],defineResource:function(A){A.require("dojox.gfx");
A.requireIf(dojox.gfx.renderer=="svg","dojox.gfx.svg_attach");
A.requireIf(dojox.gfx.renderer=="vml","dojox.gfx.vml_attach");
A.requireIf(dojox.gfx.renderer=="silverlight","dojox.gfx.silverlight_attach");
A.requireIf(dojox.gfx.renderer=="canvas","dojox.gfx.canvas_attach")
}});