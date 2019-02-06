dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Base"],["require","dojox.charting.Element"],["require","dojox.charting.plot2d.common"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Base"]){A._hasResource["dojox.charting.plot2d.Base"]=true;
A.provide("dojox.charting.plot2d.Base");
A.require("dojox.charting.Element");
A.require("dojox.charting.plot2d.common");
A.declare("dojox.charting.plot2d.Base",dojox.charting.Element,{clear:function(){this.series=[];
this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this
},setAxis:function(B){if(B){this[B.vertical?"_vAxis":"_hAxis"]=B
}return this
},addSeries:function(B){this.series.push(B);
return this
},calculateAxes:function(B){return this
},render:function(B,C){return this
},getRequiredColors:function(){return this.series.length
},_calc:function(B,C){if(this._hAxis){if(!this._hAxis.initialized()){this._hAxis.calculate(C.hmin,C.hmax,B.width)
}this._hScaler=this._hAxis.getScaler()
}else{this._hScaler={bounds:{lower:C.hmin,upper:C.hmax},scale:B.width/(C.hmax-C.hmin)}
}if(this._vAxis){if(!this._vAxis.initialized()){this._vAxis.calculate(C.vmin,C.vmax,B.height)
}this._vScaler=this._vAxis.getScaler()
}else{this._vScaler={bounds:{lower:C.vmin,upper:C.vmax},scale:B.height/(C.vmax-C.vmin)}
}}})
}}});