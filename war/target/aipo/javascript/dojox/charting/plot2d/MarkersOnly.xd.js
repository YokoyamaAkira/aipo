dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.MarkersOnly"],["require","dojox.charting.plot2d.Default"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.MarkersOnly"]){A._hasResource["dojox.charting.plot2d.MarkersOnly"]=true;
A.provide("dojox.charting.plot2d.MarkersOnly");
A.require("dojox.charting.plot2d.Default");
A.declare("dojox.charting.plot2d.MarkersOnly",dojox.charting.plot2d.Default,{constructor:function(){this.opt.lines=false;
this.opt.markers=true
}})
}}});