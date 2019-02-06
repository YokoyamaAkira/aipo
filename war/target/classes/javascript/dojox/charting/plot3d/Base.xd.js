dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot3d.Base"],["require","dojox.charting.Chart3D"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot3d.Base"]){A._hasResource["dojox.charting.plot3d.Base"]=true;
A.provide("dojox.charting.plot3d.Base");
A.require("dojox.charting.Chart3D");
A.declare("dojox.charting.plot3d.Base",null,{constructor:function(B,C,D){this.width=B;
this.height=C
},setData:function(B){this.data=B?B:[];
return this
},getDepth:function(){return this.depth
},generate:function(B,C){}})
}}});