if(!dojo._hasResource["dojox.gfx._base"]){dojo._hasResource["dojox.gfx._base"]=true;
dojo.provide("dojox.gfx._base");
dojox.gfx._hasClass=function(B,A){return((" "+B.getAttribute("className")+" ").indexOf(" "+A+" ")>=0)
};
dojox.gfx._addClass=function(C,B){var A=C.getAttribute("className");
if((" "+A+" ").indexOf(" "+B+" ")<0){C.setAttribute("className",A+(A?" ":"")+B)
}};
dojox.gfx._removeClass=function(B,A){B.setAttribute("className",B.getAttribute("className").replace(new RegExp("(^|\\s+)"+A+"(\\s+|$)"),"$1$2"))
};
dojox.gfx._base._getFontMeasurements=function(){var A={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,small:0,medium:0,large:0,"x-large":0,"xx-large":0};
if(dojo.isIE){dojo.doc.documentElement.style.fontSize="100%"
}var C=dojo.doc.createElement("div");
C.style.position="absolute";
C.style.left="-100px";
C.style.top="0";
C.style.width="30px";
C.style.height="1000em";
C.style.border="0";
C.style.margin="0";
C.style.padding="0";
C.style.outline="0";
C.style.lineHeight="1";
C.style.overflow="hidden";
dojo.body().appendChild(C);
for(var B in A){C.style.fontSize=B;
A[B]=Math.round(C.offsetHeight*12/16)*16/12/1000
}dojo.body().removeChild(C);
C=null;
return A
};
dojox.gfx._base._fontMeasurements=null;
dojox.gfx._base._getCachedFontMeasurements=function(A){if(A||!dojox.gfx._base._fontMeasurements){dojox.gfx._base._fontMeasurements=dojox.gfx._base._getFontMeasurements()
}return dojox.gfx._base._fontMeasurements
};
dojox.gfx._base._uniqueId=0;
dojox.gfx._base._getUniqueId=function(){var A;
do{A="dojoUnique"+(++dojox.gfx._base._uniqueId)
}while(dojo.byId(A));
return A
};
dojo.mixin(dojox.gfx,{defaultPath:{type:"path",path:""},defaultPolyline:{type:"polyline",points:[]},defaultRect:{type:"rect",x:0,y:0,width:100,height:100,r:0},defaultEllipse:{type:"ellipse",cx:0,cy:0,rx:200,ry:100},defaultCircle:{type:"circle",cx:0,cy:0,r:100},defaultLine:{type:"line",x1:0,y1:0,x2:100,y2:100},defaultImage:{type:"image",x:0,y:0,width:0,height:0,src:""},defaultText:{type:"text",x:0,y:0,text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultTextPath:{type:"textpath",text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultStroke:{type:"stroke",color:"black",style:"solid",width:1,cap:"butt",join:4},defaultLinearGradient:{type:"linear",x1:0,y1:0,x2:100,y2:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultRadialGradient:{type:"radial",cx:0,cy:0,r:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultPattern:{type:"pattern",x:0,y:0,width:0,height:0,src:""},defaultFont:{type:"font",style:"normal",variant:"normal",weight:"normal",size:"10pt",family:"serif"},normalizeColor:function(A){return(A instanceof dojo.Color)?A:new dojo.Color(A)
},normalizeParameters:function(B,D){if(D){var C={};
for(var A in B){if(A in D&&!(A in C)){B[A]=D[A]
}}}return B
},makeParameters:function(C,D){if(!D){return dojo.clone(C)
}var A={};
for(var B in C){if(!(B in A)){A[B]=dojo.clone((B in D)?D[B]:C[B])
}}return A
},formatNumber:function(B,C){var D=B.toString();
if(D.indexOf("e")>=0){D=B.toFixed(4)
}else{var A=D.indexOf(".");
if(A>=0&&D.length-A>5){D=B.toFixed(4)
}}if(B<0){return D
}return C?" "+D:D
},makeFontString:function(A){return A.style+" "+A.variant+" "+A.weight+" "+A.size+" "+A.family
},splitFontString:function(E){var A=dojo.clone(dojox.gfx.defaultFont);
var D=E.split(/\s+/);
do{if(D.length<5){break
}A.style=D[0];
A.varian=D[1];
A.weight=D[2];
var C=D[3].indexOf("/");
A.size=C<0?D[3]:D[3].substring(0,C);
var B=4;
if(C<0){if(D[4]=="/"){B=6;
break
}if(D[4].substr(0,1)=="/"){B=5;
break
}}if(B+3>D.length){break
}A.size=D[B];
A.family=D[B+1]
}while(false);
return A
},cm_in_pt:72/2.54,mm_in_pt:7.2/2.54,px_in_pt:function(){return dojox.gfx._base._getCachedFontMeasurements()["12pt"]/12
},pt2px:function(A){return A*dojox.gfx.px_in_pt()
},px2pt:function(A){return A/dojox.gfx.px_in_pt()
},normalizedLength:function(A){if(A.length==0){return 0
}if(A.length>2){var C=dojox.gfx.px_in_pt();
var B=parseFloat(A);
switch(A.slice(-2)){case"px":return B;
case"pt":return B*C;
case"in":return B*72*C;
case"pc":return B*12*C;
case"mm":return B/dojox.gfx.mm_in_pt*C;
case"cm":return B/dojox.gfx.cm_in_pt*C
}}return parseFloat(A)
},pathVmlRegExp:/([A-Za-z]+)|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,pathSvgRegExp:/([A-Za-z])|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,equalSources:function(B,A){return B&&A&&B==A
}})
};