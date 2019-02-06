if(!dojo._hasResource["dojox.charting.plot2d.Grid"]){dojo._hasResource["dojox.charting.plot2d.Grid"]=true;
dojo.provide("dojox.charting.plot2d.Grid");
dojo.require("dojox.charting.Element");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.lang.functional");
(function(){var A=dojox.lang.utils;
dojo.declare("dojox.charting.plot2d.Grid",dojox.charting.Element,{defaultParams:{hAxis:"x",vAxis:"y",hMajorLines:true,hMinorLines:false,vMajorLines:true,vMinorLines:false,hStripes:"none",vStripes:"none"},optionalParams:{},constructor:function(C,B){this.opt=dojo.clone(this.defaultParams);
A.updateWithObject(this.opt,B);
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},clear:function(){this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this
},setAxis:function(B){if(B){this[B.vertical?"_vAxis":"_hAxis"]=B
}return this
},addSeries:function(B){return this
},calculateAxes:function(B){return this
},getRequiredColors:function(){return 0
},render:function(G,F){if(!this.dirty){return this
}this.cleanGroup();
var E=this.group,C=this.chart.theme.axis,I=this._vAxis.getScaler();
if(this.opt.hMinorLines&&I.minor.tick){for(var D=0;
D<I.minor.count;
++D){var H=G.height-F.b-I.scale*(I.minor.start-I.bounds.lower+D*I.minor.tick);
E.createLine({x1:F.l,y1:H,x2:G.width-F.r,y2:H}).setStroke(C.minorTick)
}}if(this.opt.hMajorLines&&I.major.tick){for(var D=0;
D<I.major.count;
++D){var H=G.height-F.b-I.scale*(I.major.start-I.bounds.lower+D*I.major.tick);
E.createLine({x1:F.l,y1:H,x2:G.width-F.r,y2:H}).setStroke(C.majorTick)
}}I=this._hAxis.getScaler();
if(this.opt.vMinorLines&&I.minor.tick){for(var D=0;
D<I.minor.count;
++D){var B=F.l+I.scale*(I.minor.start-I.bounds.lower+D*I.minor.tick);
E.createLine({x1:B,y1:F.t,x2:B,y2:G.height-F.b}).setStroke(C.minorTick)
}}if(this.opt.vMajorLines&&I.major.tick){for(var D=0;
D<I.major.count;
++D){var B=F.l+I.scale*(I.major.start-I.bounds.lower+D*I.major.tick);
E.createLine({x1:B,y1:F.t,x2:B,y2:G.height-F.b}).setStroke(C.majorTick)
}}this.dirty=false;
return this
}})
})()
};