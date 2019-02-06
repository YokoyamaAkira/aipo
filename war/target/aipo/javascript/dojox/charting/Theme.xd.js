dojo._xdResourceLoaded({depends:[["provide","dojox.charting.Theme"],["require","dojox.charting._color"]],defineResource:function(A){if(!A._hasResource["dojox.charting.Theme"]){A._hasResource["dojox.charting.Theme"]=true;
A.provide("dojox.charting.Theme");
A.require("dojox.charting._color");
(function(){var B=dojox.charting;
B.Theme=function(C){C=C||{};
this.chart=A.mixin(A.clone(B.Theme._def.chart),C.chart||{});
this.plotarea=A.mixin(A.clone(B.Theme._def.plotarea),C.plotarea||{});
this.axis=A.mixin(A.clone(B.Theme._def.axis),C.axis||{});
this.series=A.mixin(A.clone(B.Theme._def.series),C.series||{});
this.marker=A.mixin(A.clone(B.Theme._def.marker),C.marker||{});
this.markers=A.mixin(A.clone(B.Theme.Markers),C.markers||{});
this.colors=[];
this.antiAlias=("antiAlias" in C)?C.antiAlias:true;
this.assignColors=("assignColors" in C)?C.assignColors:true;
this.assignMarkers=("assignMarkers" in C)?C.assignMarkers:true;
this._colorCache=null;
C.colors=C.colors||B.Theme._def.colors;
A.forEach(C.colors,function(D){this.colors.push(D)
},this);
this._current={color:0,marker:0};
this._markers=[];
this._buildMarkerArray()
};
B.Theme.Markers={CIRCLE:"m-3,0 c0,-4 6,-4 6,0 m-6,0 c0,4 6,4 6,0",SQUARE:"m-3,-3 l0,6 6,0 0,-6 z",DIAMOND:"m0,-3 l3,3 -3,3 -3,-3 z",CROSS:"m0,-3 l0,6 m-3,-3 l6,0",X:"m-3,-3 l6,6 m0,-6 l-6,6",TRIANGLE:"m-3,3 l3,-6 3,6 z",TRIANGLE_INVERTED:"m-3,-3 l3,6 3,-6 z"};
B.Theme._def={chart:{stroke:null,fill:"white"},plotarea:{stroke:null,fill:"white"},axis:{stroke:{color:"#333",width:1},line:{color:"#ccc",width:1,style:"Dot",cap:"round"},majorTick:{color:"#666",width:1,length:6,position:"center"},minorTick:{color:"#666",width:0.8,length:3,position:"center"},font:"normal normal normal 7pt Tahoma",fontColor:"#333"},series:{outline:{width:2,color:"#ccc"},stroke:{width:2,color:"#333"},fill:"#ccc",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},marker:{stroke:{width:1},fill:"#333",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},colors:["#000","#111","#222","#333","#444","#555","#666","#777","#888","#999","#aaa","#bbb","#ccc"]};
A.extend(B.Theme,{defineColors:function(I){var K=I||{};
var C=false;
if(K.cache===undefined){C=true
}if(K.cache==true){C=true
}if(C){this._colorCache=K
}else{var N=this._colorCache||{};
K=A.mixin(A.clone(N),K)
}var L=[],F=K.num||32;
if(K.colors){var G=K.colors.length;
for(var J=0;
J<F;
J++){L.push(K.colors[J%G])
}this.colors=L
}else{if(K.hue){var O=K.saturation||100;
var M=K.low||30;
var H=K.high||90;
var E=(H-M)/F;
for(var J=0;
J<F;
J++){L.push(B._color.fromHsb(K.hue,O,M+(E*J)).toHex())
}this.colors=L
}else{if(K.stops){var G=K.stops.length;
if(G<2){throw new Error("dojox.charting.Theme::defineColors: when using stops to define a color range, you MUST specify at least 2 colors.")
}if(typeof (K.stops[0].offset)=="undefined"){var D=1/(G-1);
for(var J=0;
J<G;
J++){K.stops[J]={color:K.stops[J],offset:D*J}
}}K.stops[0].offset=0;
K.stops[G-1].offset=1;
K.stops.sort(function(Q,P){return Q.offset-P.offset
});
L.push(K.stops[0].color.toHex());
L.push(K.stops[G-1].color.toHex());
this.colors=L
}}}},_buildMarkerArray:function(){this._markers=[];
for(var C in this.markers){this._markers.push(this.markers[C])
}this._current.marker=0
},addMarker:function(C,D){this.markers[C]=D;
this._buildMarkerArray()
},setMarkers:function(C){this.markers=C;
this._buildMarkerArray()
},next:function(C){if(!C){C="color"
}if(C=="color"){return this.colors[this._current.color++%this.colors.length]
}else{if(C=="marker"){return this._markers[this._current.marker++%this._markers.length]
}}},clear:function(){this._current={color:0,marker:0}
}})
})()
}}});