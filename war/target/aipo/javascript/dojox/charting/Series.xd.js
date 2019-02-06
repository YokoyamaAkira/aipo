dojo._xdResourceLoaded({depends:[["provide","dojox.charting.Series"],["require","dojox.charting.Element"]],defineResource:function(A){if(!A._hasResource["dojox.charting.Series"]){A._hasResource["dojox.charting.Series"]=true;
A.provide("dojox.charting.Series");
A.require("dojox.charting.Element");
A.declare("dojox.charting.Series",dojox.charting.Element,{constructor:function(C,D,B){A.mixin(this,B);
if(typeof this.plot!="string"){this.plot="default"
}this.data=D;
this.dirty=true;
this.clear()
},clear:function(){this.dyn={}
}})
}}});