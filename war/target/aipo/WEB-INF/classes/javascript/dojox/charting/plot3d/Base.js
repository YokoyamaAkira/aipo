if(!dojo._hasResource["dojox.charting.plot3d.Base"]){dojo._hasResource["dojox.charting.plot3d.Base"]=true;
dojo.provide("dojox.charting.plot3d.Base");
dojo.require("dojox.charting.Chart3D");
dojo.declare("dojox.charting.plot3d.Base",null,{constructor:function(C,A,B){this.width=C;
this.height=A
},setData:function(A){this.data=A?A:[];
return this
},getDepth:function(){return this.depth
},generate:function(B,A){}})
};