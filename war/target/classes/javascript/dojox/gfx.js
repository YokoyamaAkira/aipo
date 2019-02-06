if(!dojo._hasResource["dojox.gfx"]){dojo._hasResource["dojox.gfx"]=true;
dojo.provide("dojox.gfx");
dojo.require("dojox.gfx.matrix");
dojo.require("dojox.gfx._base");
(function(){var B=(typeof djConfig.gfxRenderer=="string"?djConfig.gfxRenderer:"svg,vml,silverlight,canvas").split(",");
for(var A=0;
A<B.length;
++A){switch(B[A]){case"svg":if(!dojo.isIE&&(navigator.userAgent.indexOf("iPhone")<0)&&(navigator.userAgent.indexOf("iPod")<0)){dojox.gfx.renderer="svg"
}break;
case"vml":if(dojo.isIE!=0){dojox.gfx.renderer="vml"
}break;
case"silverlight":if(window.Silverlight){dojox.gfx.renderer="silverlight"
}break;
case"canvas":if(dojo.isIE==0){dojox.gfx.renderer="canvas"
}break
}if(dojox.gfx.renderer){break
}}})();
dojo.requireIf(dojox.gfx.renderer=="svg","dojox.gfx.svg");
dojo.requireIf(dojox.gfx.renderer=="vml","dojox.gfx.vml");
dojo.requireIf(dojox.gfx.renderer=="silverlight","dojox.gfx.silverlight");
dojo.requireIf(dojox.gfx.renderer=="canvas","dojox.gfx.canvas")
};