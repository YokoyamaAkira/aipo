dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.path"],["require","dojox.gfx.shape"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.path"]){A._hasResource["dojox.gfx.path"]=true;
A.provide("dojox.gfx.path");
A.require("dojox.gfx.shape");
A.declare("dojox.gfx.path.Path",dojox.gfx.Shape,{constructor:function(B){this.shape=A.clone(dojox.gfx.defaultPath);
this.segments=[];
this.absolute=true;
this.last={};
this.rawNode=B
},setAbsoluteMode:function(B){this.absolute=typeof B=="string"?(B=="absolute"):B;
return this
},getAbsoluteMode:function(){return this.absolute
},getBoundingBox:function(){return(this.bbox&&("l" in this.bbox))?{x:this.bbox.l,y:this.bbox.t,width:this.bbox.r-this.bbox.l,height:this.bbox.b-this.bbox.t}:null
},getLastPosition:function(){return"x" in this.last?this.last:null
},_updateBBox:function(C,B){if(this.bbox&&("l" in this.bbox)){if(this.bbox.l>C){this.bbox.l=C
}if(this.bbox.r<C){this.bbox.r=C
}if(this.bbox.t>B){this.bbox.t=B
}if(this.bbox.b<B){this.bbox.b=B
}}else{this.bbox={l:C,b:B,r:C,t:B}
}},_updateWithSegment:function(D){var C=D.args,H=C.length;
switch(D.action){case"M":case"L":case"C":case"S":case"Q":case"T":for(var B=0;
B<H;
B+=2){this._updateBBox(C[B],C[B+1])
}this.last.x=C[H-2];
this.last.y=C[H-1];
this.absolute=true;
break;
case"H":for(var B=0;
B<H;
++B){this._updateBBox(C[B],this.last.y)
}this.last.x=C[H-1];
this.absolute=true;
break;
case"V":for(var B=0;
B<H;
++B){this._updateBBox(this.last.x,C[B])
}this.last.y=C[H-1];
this.absolute=true;
break;
case"m":var F=0;
if(!("x" in this.last)){this._updateBBox(this.last.x=C[0],this.last.y=C[1]);
F=2
}for(var B=F;
B<H;
B+=2){this._updateBBox(this.last.x+=C[B],this.last.y+=C[B+1])
}this.absolute=false;
break;
case"l":case"t":for(var B=0;
B<H;
B+=2){this._updateBBox(this.last.x+=C[B],this.last.y+=C[B+1])
}this.absolute=false;
break;
case"h":for(var B=0;
B<H;
++B){this._updateBBox(this.last.x+=C[B],this.last.y)
}this.absolute=false;
break;
case"v":for(var B=0;
B<H;
++B){this._updateBBox(this.last.x,this.last.y+=C[B])
}this.absolute=false;
break;
case"c":for(var B=0;
B<H;
B+=6){this._updateBBox(this.last.x+C[B],this.last.y+C[B+1]);
this._updateBBox(this.last.x+C[B+2],this.last.y+C[B+3]);
this._updateBBox(this.last.x+=C[B+4],this.last.y+=C[B+5])
}this.absolute=false;
break;
case"s":case"q":for(var B=0;
B<H;
B+=4){this._updateBBox(this.last.x+C[B],this.last.y+C[B+1]);
this._updateBBox(this.last.x+=C[B+2],this.last.y+=C[B+3])
}this.absolute=false;
break;
case"A":for(var B=0;
B<H;
B+=7){this._updateBBox(C[B+5],C[B+6])
}this.last.x=C[H-2];
this.last.y=C[H-1];
this.absolute=true;
break;
case"a":for(var B=0;
B<H;
B+=7){this._updateBBox(this.last.x+=C[B+5],this.last.y+=C[B+6])
}this.absolute=false;
break
}var E=[D.action];
for(var B=0;
B<H;
++B){E.push(dojox.gfx.formatNumber(C[B],true))
}if(typeof this.shape.path=="string"){this.shape.path+=E.join("")
}else{var H=E.length,G=this.shape.path;
for(var B=0;
B<H;
++B){G.push(E[B])
}}},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(E,C){var B=this._validSegments[E.toLowerCase()];
if(typeof B=="number"){if(B){if(C.length>=B){var D={action:E,args:C.slice(0,C.length-C.length%B)};
this.segments.push(D);
this._updateWithSegment(D)
}}else{var D={action:E,args:[]};
this.segments.push(D);
this._updateWithSegment(D)
}}},_collectArgs:function(B,C){for(var E=0;
E<C.length;
++E){var D=C[E];
if(typeof D=="boolean"){B.push(D?1:0)
}else{if(typeof D=="number"){B.push(D)
}else{if(D instanceof Array){this._collectArgs(B,D)
}else{if("x" in D&&"y" in D){B.push(D.x,D.y)
}}}}}},moveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"M":"m",B);
return this
},lineTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"L":"l",B);
return this
},hLineTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"H":"h",B);
return this
},vLineTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"V":"v",B);
return this
},curveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"C":"c",B);
return this
},smoothCurveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"S":"s",B);
return this
},qCurveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"Q":"q",B);
return this
},qSmoothCurveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"T":"t",B);
return this
},arcTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"A":"a",B);
return this
},closePath:function(){this._pushSegment("Z",[]);
return this
},_setPath:function(C){var E=A.isArray(C)?C:C.match(dojox.gfx.pathSvgRegExp);
this.segments=[];
this.absolute=true;
this.bbox={};
this.last={};
if(!E){return 
}var D="",H=[],G=E.length;
for(var B=0;
B<G;
++B){var I=E[B],F=parseFloat(I);
if(isNaN(F)){if(D){this._pushSegment(D,H)
}H=[];
D=I
}else{H.push(F)
}}this._pushSegment(D,H)
},setShape:function(C){dojox.gfx.Shape.prototype.setShape.call(this,typeof C=="string"?{path:C}:C);
var B=this.shape.path;
this.shape.path=[];
this._setPath(B);
this.shape.path=this.shape.path.join("");
return this
},_2PI:Math.PI*2});
A.declare("dojox.gfx.path.TextPath",dojox.gfx.path.Path,{constructor:function(B){if(!("text" in this)){this.text=A.clone(dojox.gfx.defaultTextPath)
}if(!("fontStyle" in this)){this.fontStyle=A.clone(dojox.gfx.defaultFont)
}},setText:function(B){this.text=dojox.gfx.makeParameters(this.text,typeof B=="string"?{text:B}:B);
this._setText();
return this
},setFont:function(B){this.fontStyle=typeof B=="string"?dojox.gfx.splitFontString(B):dojox.gfx.makeParameters(dojox.gfx.defaultFont,B);
this._setFont();
return this
}})
}}});