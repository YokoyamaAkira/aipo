dojo._xdResourceLoaded({depends:[["provide","dojox.gfx._base"]],defineResource:function(A){if(!A._hasResource["dojox.gfx._base"]){A._hasResource["dojox.gfx._base"]=true;
A.provide("dojox.gfx._base");
dojox.gfx._hasClass=function(B,C){return((" "+B.getAttribute("className")+" ").indexOf(" "+C+" ")>=0)
};
dojox.gfx._addClass=function(B,D){var C=B.getAttribute("className");
if((" "+C+" ").indexOf(" "+D+" ")<0){B.setAttribute("className",C+(C?" ":"")+D)
}};
dojox.gfx._removeClass=function(B,C){B.setAttribute("className",B.getAttribute("className").replace(new RegExp("(^|\\s+)"+C+"(\\s+|$)"),"$1$2"))
};
dojox.gfx._base._getFontMeasurements=function(){var C={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,small:0,medium:0,large:0,"x-large":0,"xx-large":0};
if(A.isIE){A.doc.documentElement.style.fontSize="100%"
}var B=A.doc.createElement("div");
B.style.position="absolute";
B.style.left="-100px";
B.style.top="0";
B.style.width="30px";
B.style.height="1000em";
B.style.border="0";
B.style.margin="0";
B.style.padding="0";
B.style.outline="0";
B.style.lineHeight="1";
B.style.overflow="hidden";
A.body().appendChild(B);
for(var D in C){B.style.fontSize=D;
C[D]=Math.round(B.offsetHeight*12/16)*16/12/1000
}A.body().removeChild(B);
B=null;
return C
};
dojox.gfx._base._fontMeasurements=null;
dojox.gfx._base._getCachedFontMeasurements=function(B){if(B||!dojox.gfx._base._fontMeasurements){dojox.gfx._base._fontMeasurements=dojox.gfx._base._getFontMeasurements()
}return dojox.gfx._base._fontMeasurements
};
dojox.gfx._base._uniqueId=0;
dojox.gfx._base._getUniqueId=function(){var B;
do{B="dojoUnique"+(++dojox.gfx._base._uniqueId)
}while(A.byId(B));
return B
};
A.mixin(dojox.gfx,{defaultPath:{type:"path",path:""},defaultPolyline:{type:"polyline",points:[]},defaultRect:{type:"rect",x:0,y:0,width:100,height:100,r:0},defaultEllipse:{type:"ellipse",cx:0,cy:0,rx:200,ry:100},defaultCircle:{type:"circle",cx:0,cy:0,r:100},defaultLine:{type:"line",x1:0,y1:0,x2:100,y2:100},defaultImage:{type:"image",x:0,y:0,width:0,height:0,src:""},defaultText:{type:"text",x:0,y:0,text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultTextPath:{type:"textpath",text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultStroke:{type:"stroke",color:"black",style:"solid",width:1,cap:"butt",join:4},defaultLinearGradient:{type:"linear",x1:0,y1:0,x2:100,y2:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultRadialGradient:{type:"radial",cx:0,cy:0,r:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultPattern:{type:"pattern",x:0,y:0,width:0,height:0,src:""},defaultFont:{type:"font",style:"normal",variant:"normal",weight:"normal",size:"10pt",family:"serif"},normalizeColor:function(B){return(B instanceof A.Color)?B:new A.Color(B)
},normalizeParameters:function(D,B){if(B){var E={};
for(var C in D){if(C in B&&!(C in E)){D[C]=B[C]
}}}return D
},makeParameters:function(E,B){if(!B){return A.clone(E)
}var C={};
for(var D in E){if(!(D in C)){C[D]=A.clone((D in B)?B[D]:E[D])
}}return C
},formatNumber:function(D,E){var B=D.toString();
if(B.indexOf("e")>=0){B=D.toFixed(4)
}else{var C=B.indexOf(".");
if(C>=0&&B.length-C>5){B=D.toFixed(4)
}}if(D<0){return B
}return E?" "+B:B
},makeFontString:function(B){return B.style+" "+B.variant+" "+B.weight+" "+B.size+" "+B.family
},splitFontString:function(B){var C=A.clone(dojox.gfx.defaultFont);
var F=B.split(/\s+/);
do{if(F.length<5){break
}C.style=F[0];
C.varian=F[1];
C.weight=F[2];
var E=F[3].indexOf("/");
C.size=E<0?F[3]:F[3].substring(0,E);
var D=4;
if(E<0){if(F[4]=="/"){D=6;
break
}if(F[4].substr(0,1)=="/"){D=5;
break
}}if(D+3>F.length){break
}C.size=F[D];
C.family=F[D+1]
}while(false);
return C
},cm_in_pt:72/2.54,mm_in_pt:7.2/2.54,px_in_pt:function(){return dojox.gfx._base._getCachedFontMeasurements()["12pt"]/12
},pt2px:function(B){return B*dojox.gfx.px_in_pt()
},px2pt:function(B){return B/dojox.gfx.px_in_pt()
},normalizedLength:function(C){if(C.length==0){return 0
}if(C.length>2){var B=dojox.gfx.px_in_pt();
var D=parseFloat(C);
switch(C.slice(-2)){case"px":return D;
case"pt":return D*B;
case"in":return D*72*B;
case"pc":return D*12*B;
case"mm":return D/dojox.gfx.mm_in_pt*B;
case"cm":return D/dojox.gfx.cm_in_pt*B
}}return parseFloat(C)
},pathVmlRegExp:/([A-Za-z]+)|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,pathSvgRegExp:/([A-Za-z])|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,equalSources:function(B,C){return B&&C&&B==C
}})
}}});