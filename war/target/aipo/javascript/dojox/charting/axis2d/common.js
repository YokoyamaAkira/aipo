if(!dojo._hasResource["dojox.charting.axis2d.common"]){dojo._hasResource["dojox.charting.axis2d.common"]=true;
dojo.provide("dojox.charting.axis2d.common");
dojo.require("dojox.gfx");
(function(){var A=dojox.gfx;
dojo.mixin(dojox.charting.axis2d.common,{createText:{gfx:function(E,D,B,I,H,G,C,F){return D.createText({x:B,y:I,text:G,align:H}).setFont(C).setFill(F)
},html:function(H,D,K,J,F,M,C,G){var B=dojo.doc.createElement("div"),O=B.style;
O.marginLeft="0px";
O.marginTop="0px";
O.marginRight="0px";
O.marginBottom="0px";
O.paddingLeft="0px";
O.paddingTop="0px";
O.paddingRight="0px";
O.paddingBottom="0px";
O.borderLeftWidth="0px";
O.borderTopWidth="0px";
O.borderRightWidth="0px";
O.borderBottomWidth="0px";
O.position="absolute";
O.font=C;
B.innerHTML=M;
O.color=G;
H.node.appendChild(B);
var L=H.getCoords(),E=dojo.marginBox(B),N=A.normalizedLength(A.splitFontString(C).size),I=L.y+Math.floor(J-N);
switch(F){case"middle":dojo.marginBox(B,{l:L.x+Math.floor(K-E.w/2),t:I});
break;
case"end":dojo.marginBox(B,{l:L.x+Math.floor(K-E.w),t:I});
break;
default:dojo.marginBox(B,{l:L.x+Math.floor(K),t:I});
break
}return B
}}})
})()
};