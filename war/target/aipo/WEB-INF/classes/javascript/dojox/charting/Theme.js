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
dojo.extend(A.Theme,{defineColors:function(F){var H=F||{};
var M=false;
if(H.cache===undefined){M=true
}if(H.cache==true){M=true
}if(M){this._colorCache=H
}else{var K=this._colorCache||{};
H=dojo.mixin(dojo.clone(K),H)
}var I=[],B=H.num||32;
if(H.colors){var C=H.colors.length;
for(var G=0;
G<B;
G++){I.push(H.colors[G%C])
}this.colors=I
}else{if(H.hue){var L=H.saturation||100;
var J=H.low||30;
var E=H.high||90;
var D=(E-J)/B;
for(var G=0;
G<B;
G++){I.push(A._color.fromHsb(H.hue,L,J+(D*G)).toHex())
}this.colors=I
}else{if(H.stops){var C=H.stops.length;
if(C<2){throw new Error("dojox.charting.Theme::defineColors: when using stops to define a color range, you MUST specify at least 2 colors.")
}if(typeof (H.stops[0].offset)=="undefined"){var N=1/(C-1);
for(var G=0;
G<C;
G++){H.stops[G]={color:H.stops[G],offset:N*G}
}}H.stops[0].offset=0;
H.stops[C-1].offset=1;
H.stops.sort(function(P,O){return P.offset-O.offset
});
I.push(H.stops[0].color.toHex());
I.push(H.stops[C-1].color.toHex());
this.colors=I
}}}},_buildMarkerArray:function(){this._markers=[];
for(var B in this.markers){this._markers.push(this.markers[B])
}this._current.marker=0
},addMarker:function(C,B){this.markers[C]=B;
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