dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Areas"],["require","dojox.charting.plot2d.Default"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Areas"]){A._hasResource["dojox.charting.plot2d.Areas"]=true;
A.provide("dojox.charting.plot2d.Areas");
A.require("dojox.charting.plot2d.Default");
A.declare("dojox.charting.plot2d.Areas",dojox.charting.plot2d.Default,{constructor:function(){this.opt.lines=true;
this.opt.areas=true
}})
}}});