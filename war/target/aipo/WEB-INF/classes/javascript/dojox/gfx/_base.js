if(!dojo._hasResource["dojox.gfx._base"]){dojo._hasResource["dojox.gfx._base"]=true;
dojo.provide("dojox.gfx._base");
dojox.gfx._hasClass=function(A,B){return((" "+A.getAttribute("className")+" ").indexOf(" "+B+" ")>=0)
};
dojox.gfx._addClass=function(B,A){var C=B.getAttribute("className");
if((" "+C+" ").indexOf(" "+A+" ")<0){B.setAttribute("className",C+(C?" ":"")+A)
}};
dojox.gfx._removeClass=function(A,B){A.setAttribute("className",A.getAttribute("className").replace(new RegExp("(^|\\s+)"+B+"(\\s+|$)"),"$1$2"))
};
dojox.gfx._base._getFontMeasurements=function(){var C={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,small:0,medium:0,large:0,"x-large":0,"xx-large":0};
if(dojo.isIE){dojo.doc.documentElement.style.fontSize="100%"
}var B=dojo.doc.createElement("div");
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
dojo.body().appendChild(B);
for(var A in C){B.style.fontSize=A;
C[A]=Math.round(B.offsetHeight*12/16)*16/12/1000
}dojo.body().removeChild(B);
B=null;
return C
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
},normalizeParameters:function(A,C){if(C){var B={};
for(var D in A){if(D in C&&!(D in B)){A[D]=C[D]
}}}return A
},makeParameters:function(B,C){if(!C){return dojo.clone(B)
}var D={};
for(var A in B){if(!(A in D)){D[A]=dojo.clone((A in C)?C[A]:B[A])
}}return D
},formatNumber:function(A,B){var C=A.toString();
if(C.indexOf("e")>=0){C=A.toFixed(4)
}else{var D=C.indexOf(".");
if(D>=0&&C.length-D>5){C=A.toFixed(4)
}}if(A<0){return C
}return B?" "+C:C
},makeFontString:function(A){return A.style+" "+A.variant+" "+A.weight+" "+A.size+" "+A.family
},splitFontString:function(D){var E=dojo.clone(dojox.gfx.defaultFont);
var C=D.split(/\s+/);
do{if(C.length<5){break
}E.style=C[0];
E.varian=C[1];
E.weight=C[2];
var B=C[3].indexOf("/");
E.size=B<0?C[3]:C[3].substring(0,B);
var A=4;
if(B<0){if(C[4]=="/"){A=6;
break
}if(C[4].substr(0,1)=="/"){A=5;
break
}}if(A+3>C.length){break
}E.size=C[A];
E.family=C[A+1]
}while(false);
return E
},cm_in_pt:72/2.54,mm_in_pt:7.2/2.54,px_in_pt:function(){return dojox.gfx._base._getCachedFontMeasurements()["12pt"]/12
},pt2px:function(A){return A*dojox.gfx.px_in_pt()
},px2pt:function(A){return A/dojox.gfx.px_in_pt()
},normalizedLength:function(C){if(C.length==0){return 0
}if(C.length>2){var B=dojox.gfx.px_in_pt();
var A=parseFloat(C);
switch(C.slice(-2)){case"px":return A;
case"pt":return A*B;
case"in":return A*72*B;
case"pc":return A*12*B;
case"mm":return A/dojox.gfx.mm_in_pt*B;
case"cm":return A/dojox.gfx.cm_in_pt*B
}}return parseFloat(C)
},pathVmlRegExp:/([A-Za-z]+)|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,pathSvgRegExp:/([A-Za-z])|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,equalSources:function(A,B){return A&&B&&A==B
}})
};