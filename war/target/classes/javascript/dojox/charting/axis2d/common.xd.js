dojo._xdResourceLoaded({depends:[["provide","dojox.charting.axis2d.common"],["require","dojox.gfx"]],defineResource:function(A){if(!A._hasResource["dojox.charting.axis2d.common"]){A._hasResource["dojox.charting.axis2d.common"]=true;
A.provide("dojox.charting.axis2d.common");
A.require("dojox.gfx");
(function(){var B=dojox.gfx;
A.mixin(dojox.charting.axis2d.common,{createText:{gfx:function(H,G,E,D,C,J,F,I){return G.createText({x:E,y:D,text:J,align:C}).setFont(F).setFill(I)
},html:function(C,M,F,E,O,H,L,P){var K=A.doc.createElement("div"),J=K.style;
J.marginLeft="0px";
J.marginTop="0px";
J.marginRight="0px";
J.marginBottom="0px";
J.paddingLeft="0px";
J.paddingTop="0px";
J.paddingRight="0px";
J.paddingBottom="0px";
J.borderLeftWidth="0px";
J.borderTopWidth="0px";
J.borderRightWidth="0px";
J.borderBottomWidth="0px";
J.position="absolute";
J.font=L;
K.innerHTML=H;
J.color=P;
C.node.appendChild(K);
var G=C.getCoords(),N=A.marginBox(K),I=B.normalizedLength(B.splitFontString(L).size),D=G.y+Math.floor(E-I);
switch(O){case"middle":A.marginBox(K,{l:G.x+Math.floor(F-N.w/2),t:D});
break;
case"end":A.marginBox(K,{l:G.x+Math.floor(F-N.w),t:D});
break;
default:A.marginBox(K,{l:G.x+Math.floor(F),t:D});
break
}return K
}}})
})()
}}});