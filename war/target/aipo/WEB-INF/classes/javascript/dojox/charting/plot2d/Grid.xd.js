dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Grid"],["require","dojox.charting.Element"],["require","dojox.charting.plot2d.common"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Grid"]){A._hasResource["dojox.charting.plot2d.Grid"]=true;
A.provide("dojox.charting.plot2d.Grid");
A.require("dojox.charting.Element");
A.require("dojox.charting.plot2d.common");
A.require("dojox.lang.functional");
(function(){var B=dojox.lang.utils;
A.declare("dojox.charting.plot2d.Grid",dojox.charting.Element,{defaultParams:{hAxis:"x",vAxis:"y",hMajorLines:true,hMinorLines:false,vMajorLines:true,vMinorLines:false,hStripes:"none",vStripes:"none"},optionalParams:{},constructor:function(D,C){this.opt=A.clone(this.defaultParams);
B.updateWithObject(this.opt,C);
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},clear:function(){this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this
},setAxis:function(C){if(C){this[C.vertical?"_vAxis":"_hAxis"]=C
}return this
},addSeries:function(C){return this
},calculateAxes:function(C){return this
},getRequiredColors:function(){return 0
},render:function(J,I){if(!this.dirty){return this
}this.cleanGroup();
var H=this.group,F=this.chart.theme.axis,D=this._vAxis.getScaler();
if(this.opt.hMinorLines&&D.minor.tick){for(var G=0;
G<D.minor.count;
++G){var C=J.height-I.b-D.scale*(D.minor.start-D.bounds.lower+G*D.minor.tick);
H.createLine({x1:I.l,y1:C,x2:J.width-I.r,y2:C}).setStroke(F.minorTick)
}}if(this.opt.hMajorLines&&D.major.tick){for(var G=0;
G<D.major.count;
++G){var C=J.height-I.b-D.scale*(D.major.start-D.bounds.lower+G*D.major.tick);
H.createLine({x1:I.l,y1:C,x2:J.width-I.r,y2:C}).setStroke(F.majorTick)
}}D=this._hAxis.getScaler();
if(this.opt.vMinorLines&&D.minor.tick){for(var G=0;
G<D.minor.count;
++G){var E=I.l+D.scale*(D.minor.start-D.bounds.lower+G*D.minor.tick);
H.createLine({x1:E,y1:I.t,x2:E,y2:J.height-I.b}).setStroke(F.minorTick)
}}if(this.opt.vMajorLines&&D.major.tick){for(var G=0;
G<D.major.count;
++G){var E=I.l+D.scale*(D.major.start-D.bounds.lower+G*D.major.tick);
H.createLine({x1:E,y1:I.t,x2:E,y2:J.height-I.b}).setStroke(F.majorTick)
}}this.dirty=false;
return this
}})
})()
}}});