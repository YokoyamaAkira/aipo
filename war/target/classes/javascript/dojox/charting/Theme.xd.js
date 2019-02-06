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
A.extend(B.Theme,{defineColors:function(E){var G=E||{};
var L=false;
if(G.cache===undefined){L=true
}if(G.cache==true){L=true
}if(L){this._colorCache=G
}else{var J=this._colorCache||{};
G=A.mixin(A.clone(J),G)
}var H=[],O=G.num||32;
if(G.colors){var C=G.colors.length;
for(var F=0;
F<O;
F++){H.push(G.colors[F%C])
}this.colors=H
}else{if(G.hue){var K=G.saturation||100;
var I=G.low||30;
var D=G.high||90;
var N=(D-I)/O;
for(var F=0;
F<O;
F++){H.push(B._color.fromHsb(G.hue,K,I+(N*F)).toHex())
}this.colors=H
}else{if(G.stops){var C=G.stops.length;
if(C<2){throw new Error("dojox.charting.Theme::defineColors: when using stops to define a color range, you MUST specify at least 2 colors.")
}if(typeof (G.stops[0].offset)=="undefined"){var M=1/(C-1);
for(var F=0;
F<C;
F++){G.stops[F]={color:G.stops[F],offset:M*F}
}}G.stops[0].offset=0;
G.stops[C-1].offset=1;
G.stops.sort(function(Q,P){return Q.offset-P.offset
});
H.push(G.stops[0].color.toHex());
H.push(G.stops[C-1].color.toHex());
this.colors=H
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