dojo._xdResourceLoaded({depends:[["provide","dojox.gfx._base"]],defineResource:function(A){if(!A._hasResource["dojox.gfx._base"]){A._hasResource["dojox.gfx._base"]=true;
A.provide("dojox.gfx._base");
dojox.gfx._hasClass=function(C,B){return((" "+C.getAttribute("className")+" ").indexOf(" "+B+" ")>=0)
};
dojox.gfx._addClass=function(D,C){var B=D.getAttribute("className");
if((" "+B+" ").indexOf(" "+C+" ")<0){D.setAttribute("className",B+(B?" ":"")+C)
}};
dojox.gfx._removeClass=function(C,B){C.setAttribute("className",C.getAttribute("className").replace(new RegExp("(^|\\s+)"+B+"(\\s+|$)"),"$1$2"))
};
dojox.gfx._base._getFontMeasurements=function(){var B={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,small:0,medium:0,large:0,"x-large":0,"xx-large":0};
if(A.isIE){A.doc.documentElement.style.fontSize="100%"
}var D=A.doc.createElement("div");
D.style.position="absolute";
D.style.left="-100px";
D.style.top="0";
D.style.width="30px";
D.style.height="1000em";
D.style.border="0";
D.style.margin="0";
D.style.padding="0";
D.style.outline="0";
D.style.lineHeight="1";
D.style.overflow="hidden";
A.body().appendChild(D);
for(var C in B){D.style.fontSize=C;
B[C]=Math.round(D.offsetHeight*12/16)*16/12/1000
}A.body().removeChild(D);
D=null;
return B
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
},normalizeParameters:function(C,E){if(E){var D={};
for(var B in C){if(B in E&&!(B in D)){C[B]=E[B]
}}}return C
},makeParameters:function(D,E){if(!E){return A.clone(D)
}var B={};
for(var C in D){if(!(C in B)){B[C]=A.clone((C in E)?E[C]:D[C])
}}return B
},formatNumber:function(C,D){var E=C.toString();
if(E.indexOf("e")>=0){E=C.toFixed(4)
}else{var B=E.indexOf(".");
if(B>=0&&E.length-B>5){E=C.toFixed(4)
}}if(C<0){return E
}return D?" "+E:E
},makeFontString:function(B){return B.style+" "+B.variant+" "+B.weight+" "+B.size+" "+B.family
},splitFontString:function(F){var B=A.clone(dojox.gfx.defaultFont);
var E=F.split(/\s+/);
do{if(E.length<5){break
}B.style=E[0];
B.varian=E[1];
B.weight=E[2];
var D=E[3].indexOf("/");
B.size=D<0?E[3]:E[3].substring(0,D);
var C=4;
if(D<0){if(E[4]=="/"){C=6;
break
}if(E[4].substr(0,1)=="/"){C=5;
break
}}if(C+3>E.length){break
}B.size=E[C];
B.family=E[C+1]
}while(false);
return B
},cm_in_pt:72/2.54,mm_in_pt:7.2/2.54,px_in_pt:function(){return dojox.gfx._base._getCachedFontMeasurements()["12pt"]/12
},pt2px:function(B){return B*dojox.gfx.px_in_pt()
},px2pt:function(B){return B/dojox.gfx.px_in_pt()
},normalizedLength:function(B){if(B.length==0){return 0
}if(B.length>2){var D=dojox.gfx.px_in_pt();
var C=parseFloat(B);
switch(B.slice(-2)){case"px":return C;
case"pt":return C*D;
case"in":return C*72*D;
case"pc":return C*12*D;
case"mm":return C/dojox.gfx.mm_in_pt*D;
case"cm":return C/dojox.gfx.cm_in_pt*D
}}return parseFloat(B)
},pathVmlRegExp:/([A-Za-z]+)|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,pathSvgRegExp:/([A-Za-z])|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,equalSources:function(C,B){return C&&B&&C==B
}})
}}});