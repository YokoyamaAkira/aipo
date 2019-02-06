if(!dojo._hasResource["dojox.charting.Theme"]){dojo._hasResource["dojox.charting.Theme"]=true;
dojo.provide("dojox.charting.Theme");
dojo.require("dojox.charting._color");
(function(){var A=dojox.charting;
A.Theme=function(B){B=B||{};
this.chart=dojo.mixin(dojo.clone(A.Theme._def.chart),B.chart||{});
this.plotarea=dojo.mixin(dojo.clone(A.Theme._def.plotarea),B.plotarea||{});
this.axis=dojo.mixin(dojo.clone(A.Theme._def.axis),B.axis||{});
this.series=dojo.mixin(dojo.clone(A.Theme._def.series),B.series||{});
this.marker=dojo.mixin(dojo.clone(A.Theme._def.marker),B.marker||{});
this.markers=dojo.mixin(dojo.clone(A.Theme.Markers),B.markers||{});
this.colors=[];
this.antiAlias=("antiAlias" in B)?B.antiAlias:true;
this.assignColors=("assignColors" in B)?B.assignColors:true;
this.assignMarkers=("assignMarkers" in B)?B.assignMarkers:true;
this._colorCache=null;
B.colors=B.colors||A.Theme._def.colors;
dojo.forEach(B.colors,function(C){this.colors.push(C)
},this);
this._current={color:0,marker:0};
this._markers=[];
this._buildMarkerArray()
};
A.Theme.Markers={CIRCLE:"m-3,0 c0,-4 6,-4 6,0 m-6,0 c0,4 6,4 6,0",SQUARE:"m-3,-3 l0,6 6,0 0,-6 z",DIAMOND:"m0,-3 l3,3 -3,3 -3,-3 z",CROSS:"m0,-3 l0,6 m-3,-3 l6,0",X:"m-3,-3 l6,6 m0,-6 l-6,6",TRIANGLE:"m-3,3 l3,-6 3,6 z",TRIANGLE_INVERTED:"m-3,-3 l3,6 3,-6 z"};
A.Theme._def={chart:{stroke:null,fill:"white"},plotarea:{stroke:null,fill:"white"},axis:{stroke:{color:"#333",width:1},line:{color:"#ccc",width:1,style:"Dot",cap:"round"},majorTick:{color:"#666",width:1,length:6,position:"center"},minorTick:{color:"#666",width:0.8,length:3,position:"center"},font:"normal normal normal 7pt Tahoma",fontColor:"#333"},series:{outline:{width:2,color:"#ccc"},stroke:{width:2,color:"#333"},fill:"#ccc",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},marker:{stroke:{width:1},fill:"#333",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},colors:["#000","#111","#222","#333","#444","#555","#666","#777","#888","#999","#aaa","#bbb","#ccc"]};
dojo.extend(A.Theme,{defineColors:function(H){var J=H||{};
var B=false;
if(J.cache===undefined){B=true
}if(J.cache==true){B=true
}if(B){this._colorCache=J
}else{var M=this._colorCache||{};
J=dojo.mixin(dojo.clone(M),J)
}var K=[],E=J.num||32;
if(J.colors){var F=J.colors.length;
for(var I=0;
I<E;
I++){K.push(J.colors[I%F])
}this.colors=K
}else{if(J.hue){var N=J.saturation||100;
var L=J.low||30;
var G=J.high||90;
var D=(G-L)/E;
for(var I=0;
I<E;
I++){K.push(A._color.fromHsb(J.hue,N,L+(D*I)).toHex())
}this.colors=K
}else{if(J.stops){var F=J.stops.length;
if(F<2){throw new Error("dojox.charting.Theme::defineColors: when using stops to define a color range, you MUST specify at least 2 colors.")
}if(typeof (J.stops[0].offset)=="undefined"){var C=1/(F-1);
for(var I=0;
I<F;
I++){J.stops[I]={color:J.stops[I],offset:C*I}
}}J.stops[0].offset=0;
J.stops[F-1].offset=1;
J.stops.sort(function(P,O){return P.offset-O.offset
});
K.push(J.stops[0].color.toHex());
K.push(J.stops[F-1].color.toHex());
this.colors=K
}}}},_buildMarkerArray:function(){this._markers=[];
for(var B in this.markers){this._markers.push(this.markers[B])
}this._current.marker=0
},addMarker:function(B,C){this.markers[B]=C;
this._buildMarkerArray()
},setMarkers:function(B){this.markers=B;
this._buildMarkerArray()
},next:function(B){if(!B){B="color"
}if(B=="color"){return this.colors[this._current.color++%this.colors.length]
}else{if(B=="marker"){return this._markers[this._current.marker++%this._markers.length]
}}},clear:function(){this._current={color:0,marker:0}
}})
})()
};