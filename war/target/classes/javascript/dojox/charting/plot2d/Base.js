if(!dojo._hasResource["dojox.charting.plot2d.Base"]){dojo._hasResource["dojox.charting.plot2d.Base"]=true;
dojo.provide("dojox.charting.plot2d.Base");
dojo.require("dojox.charting.Element");
dojo.require("dojox.charting.plot2d.common");
dojo.declare("dojox.charting.plot2d.Base",dojox.charting.Element,{clear:function(){this.series=[];
this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this
},setAxis:function(A){if(A){this[A.vertical?"_vAxis":"_hAxis"]=A
}return this
},addSeries:function(A){this.series.push(A);
return this
},calculateAxes:function(A){return this
},render:function(A,B){return this
},getRequiredColors:function(){return this.series.length
},_calc:function(A,B){if(this._hAxis){if(!this._hAxis.initialized()){this._hAxis.calculate(B.hmin,B.hmax,A.width)
}this._hScaler=this._hAxis.getScaler()
}else{this._hScaler={bounds:{lower:B.hmin,upper:B.hmax},scale:A.width/(B.hmax-B.hmin)}
}if(this._vAxis){if(!this._vAxis.initialized()){this._vAxis.calculate(B.vmin,B.vmax,A.height)
}this._vScaler=this._vAxis.getScaler()
}else{this._vScaler={bounds:{lower:B.vmin,upper:B.vmax},scale:A.height/(B.vmax-B.vmin)}
}}})
};