dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.StackedAreas"],["require","dojox.charting.plot2d.Stacked"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.StackedAreas"]){A._hasResource["dojox.charting.plot2d.StackedAreas"]=true;
A.provide("dojox.charting.plot2d.StackedAreas");
A.require("dojox.charting.plot2d.Stacked");
A.declare("dojox.charting.plot2d.StackedAreas",dojox.charting.plot2d.Stacked,{constructor:function(){this.opt.lines=true;
this.opt.areas=true
}})
}}});