if(!dojo._hasResource["dojox.charting.plot2d.Grid"]){dojo._hasResource["dojox.charting.plot2d.Grid"]=true;
dojo.provide("dojox.charting.plot2d.Grid");
dojo.require("dojox.charting.Element");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.lang.functional");
(function(){var A=dojox.lang.utils;
dojo.declare("dojox.charting.plot2d.Grid",dojox.charting.Element,{defaultParams:{hAxis:"x",vAxis:"y",hMajorLines:true,hMinorLines:false,vMajorLines:true,vMinorLines:false,hStripes:"none",vStripes:"none"},optionalParams:{},constructor:function(B,C){this.opt=dojo.clone(this.defaultParams);
A.updateWithObject(this.opt,C);
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
},render:function(D,C){if(!this.dirty){return this
}this.cleanGroup();
var I=this.group,G=this.chart.theme.axis,B=this._vAxis.getScaler();
if(this.opt.hMinorLines&&B.minor.tick){for(var H=0;
H<B.minor.count;
++H){var E=D.height-C.b-B.scale*(B.minor.start-B.bounds.lower+H*B.minor.tick);
I.createLine({x1:C.l,y1:E,x2:D.width-C.r,y2:E}).setStroke(G.minorTick)
}}if(this.opt.hMajorLines&&B.major.tick){for(var H=0;
H<B.major.count;
++H){var E=D.height-C.b-B.scale*(B.major.start-B.bounds.lower+H*B.major.tick);
I.createLine({x1:C.l,y1:E,x2:D.width-C.r,y2:E}).setStroke(G.majorTick)
}}B=this._hAxis.getScaler();
if(this.opt.vMinorLines&&B.minor.tick){for(var H=0;
H<B.minor.count;
++H){var F=C.l+B.scale*(B.minor.start-B.bounds.lower+H*B.minor.tick);
I.createLine({x1:F,y1:C.t,x2:F,y2:D.height-C.b}).setStroke(G.minorTick)
}}if(this.opt.vMajorLines&&B.major.tick){for(var H=0;
H<B.major.count;
++H){var F=C.l+B.scale*(B.major.start-B.bounds.lower+H*B.major.tick);
I.createLine({x1:F,y1:C.t,x2:F,y2:D.height-C.b}).setStroke(G.majorTick)
}}this.dirty=false;
return this
}})
})()
};