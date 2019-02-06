if(!dojo._hasResource["dojox.charting.axis2d.common"]){dojo._hasResource["dojox.charting.axis2d.common"]=true;
dojo.provide("dojox.charting.axis2d.common");
dojo.require("dojox.gfx");
(function(){var A=dojox.gfx;
dojo.mixin(dojox.charting.axis2d.common,{createText:{gfx:function(I,H,F,C,E,D,G,B){return H.createText({x:F,y:C,text:D,align:E}).setFont(G).setFill(B)
},html:function(C,E,G,F,O,I,M,B){var L=dojo.doc.createElement("div"),K=L.style;
K.marginLeft="0px";
K.marginTop="0px";
K.marginRight="0px";
K.marginBottom="0px";
K.paddingLeft="0px";
K.paddingTop="0px";
K.paddingRight="0px";
K.paddingBottom="0px";
K.borderLeftWidth="0px";
K.borderTopWidth="0px";
K.borderRightWidth="0px";
K.borderBottomWidth="0px";
K.position="absolute";
K.font=M;
L.innerHTML=I;
K.color=B;
C.node.appendChild(L);
var H=C.getCoords(),N=dojo.marginBox(L),J=A.normalizedLength(A.splitFontString(M).size),D=H.y+Math.floor(F-J);
switch(O){case"middle":dojo.marginBox(L,{l:H.x+Math.floor(G-N.w/2),t:D});
break;
case"end":dojo.marginBox(L,{l:H.x+Math.floor(G-N.w),t:D});
break;
default:dojo.marginBox(L,{l:H.x+Math.floor(G),t:D});
break
}return L
}}})
})()
};