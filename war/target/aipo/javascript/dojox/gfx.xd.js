dojo._xdResourceLoaded({depends:[["provide","dojox.gfx"],["require","dojox.gfx.matrix"],["require","dojox.gfx._base"],["requireIf",dojox.gfx.renderer=="svg","dojox.gfx.svg"],["requireIf",dojox.gfx.renderer=="vml","dojox.gfx.vml"],["requireIf",dojox.gfx.renderer=="silverlight","dojox.gfx.silverlight"],["requireIf",dojox.gfx.renderer=="canvas","dojox.gfx.canvas"]],defineResource:function(A){if(!A._hasResource["dojox.gfx"]){A._hasResource["dojox.gfx"]=true;
A.provide("dojox.gfx");
A.require("dojox.gfx.matrix");
A.require("dojox.gfx._base");
(function(){var B=(typeof djConfig.gfxRenderer=="string"?djConfig.gfxRenderer:"svg,vml,silverlight,canvas").split(",");
for(var C=0;
C<B.length;
++C){switch(B[C]){case"svg":if(!A.isIE&&(navigator.userAgent.indexOf("iPhone")<0)&&(navigator.userAgent.indexOf("iPod")<0)){dojox.gfx.renderer="svg"
}break;
case"vml":if(A.isIE!=0){dojox.gfx.renderer="vml"
}break;
case"silverlight":if(window.Silverlight){dojox.gfx.renderer="silverlight"
}break;
case"canvas":if(A.isIE==0){dojox.gfx.renderer="canvas"
}break
}if(dojox.gfx.renderer){break
}}})();
A.requireIf(dojox.gfx.renderer=="svg","dojox.gfx.svg");
A.requireIf(dojox.gfx.renderer=="vml","dojox.gfx.vml");
A.requireIf(dojox.gfx.renderer=="silverlight","dojox.gfx.silverlight");
A.requireIf(dojox.gfx.renderer=="canvas","dojox.gfx.canvas")
}}});