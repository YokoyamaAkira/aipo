dojo._xdResourceLoaded({depends:[["provide","dojox.charting.axis2d.common"],["require","dojox.gfx"]],defineResource:function(A){if(!A._hasResource["dojox.charting.axis2d.common"]){A._hasResource["dojox.charting.axis2d.common"]=true;
A.provide("dojox.charting.axis2d.common");
A.require("dojox.gfx");
(function(){var B=dojox.gfx;
A.mixin(dojox.charting.axis2d.common,{createText:{gfx:function(F,E,C,J,I,H,D,G){return E.createText({x:C,y:J,text:H,align:I}).setFont(D).setFill(G)
},html:function(I,E,L,K,G,N,D,H){var C=A.doc.createElement("div"),P=C.style;
P.marginLeft="0px";
P.marginTop="0px";
P.marginRight="0px";
P.marginBottom="0px";
P.paddingLeft="0px";
P.paddingTop="0px";
P.paddingRight="0px";
P.paddingBottom="0px";
P.borderLeftWidth="0px";
P.borderTopWidth="0px";
P.borderRightWidth="0px";
P.borderBottomWidth="0px";
P.position="absolute";
P.font=D;
C.innerHTML=N;
P.color=H;
I.node.appendChild(C);
var M=I.getCoords(),F=A.marginBox(C),O=B.normalizedLength(B.splitFontString(D).size),J=M.y+Math.floor(K-O);
switch(G){case"middle":A.marginBox(C,{l:M.x+Math.floor(L-F.w/2),t:J});
break;
case"end":A.marginBox(C,{l:M.x+Math.floor(L-F.w),t:J});
break;
default:A.marginBox(C,{l:M.x+Math.floor(L),t:J});
break
}return C
}}})
})()
}}});