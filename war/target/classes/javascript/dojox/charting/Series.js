if(!dojo._hasResource["dojox.charting.Series"]){dojo._hasResource["dojox.charting.Series"]=true;
dojo.provide("dojox.charting.Series");
dojo.require("dojox.charting.Element");
dojo.declare("dojox.charting.Series",dojox.charting.Element,{constructor:function(A,B,C){dojo.mixin(this,C);
if(typeof this.plot!="string"){this.plot="default"
}this.data=B;
this.dirty=true;
this.clear()
},clear:function(){this.dyn={}
}})
};