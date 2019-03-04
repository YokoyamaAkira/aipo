if(!dojo._hasResource["dojox.charting.Series"]){dojo._hasResource["dojox.charting.Series"]=true;
dojo.provide("dojox.charting.Series");
dojo.require("dojox.charting.Element");
dojo.declare("dojox.charting.Series",dojox.charting.Element,{constructor:function(B,C,A){dojo.mixin(this,A);
if(typeof this.plot!="string"){this.plot="default"
}this.data=C;
this.dirty=true;
this.clear()
},clear:function(){this.dyn={}
}})
};