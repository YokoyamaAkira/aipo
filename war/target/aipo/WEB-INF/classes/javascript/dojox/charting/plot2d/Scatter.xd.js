dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Scatter"],["require","dojox.charting.plot2d.Default"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Scatter"]){A._hasResource["dojox.charting.plot2d.Scatter"]=true;
A.provide("dojox.charting.plot2d.Scatter");
A.require("dojox.charting.plot2d.Default");
A.declare("dojox.charting.plot2d.Scatter",dojox.charting.plot2d.Default,{constructor:function(){this.opt.lines=false;
this.opt.markers=true
}})
}}});