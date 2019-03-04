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
},render:function(H,G){if(!this.dirty){return this
}this.cleanGroup();
var F=this.group,D=this.chart.theme.axis,J=this._vAxis.getScaler();
if(this.opt.hMinorLines&&J.minor.tick){for(var E=0;
E<J.minor.count;
++E){var I=H.height-G.b-J.scale*(J.minor.start-J.bounds.lower+E*J.minor.tick);
F.createLine({x1:G.l,y1:I,x2:H.width-G.r,y2:I}).setStroke(D.minorTick)
}}if(this.opt.hMajorLines&&J.major.tick){for(var E=0;
E<J.major.count;
++E){var I=H.height-G.b-J.scale*(J.major.start-J.bounds.lower+E*J.major.tick);
F.createLine({x1:G.l,y1:I,x2:H.width-G.r,y2:I}).setStroke(D.majorTick)
}}J=this._hAxis.getScaler();
if(this.opt.vMinorLines&&J.minor.tick){for(var E=0;
E<J.minor.count;
++E){var C=G.l+J.scale*(J.minor.start-J.bounds.lower+E*J.minor.tick);
F.createLine({x1:C,y1:G.t,x2:C,y2:H.height-G.b}).setStroke(D.minorTick)
}}if(this.opt.vMajorLines&&J.major.tick){for(var E=0;
E<J.major.count;
++E){var C=G.l+J.scale*(J.major.start-J.bounds.lower+E*J.major.tick);
F.createLine({x1:C,y1:G.t,x2:C,y2:H.height-G.b}).setStroke(D.majorTick)
}}this.dirty=false;
return this
}})
})()
}}});