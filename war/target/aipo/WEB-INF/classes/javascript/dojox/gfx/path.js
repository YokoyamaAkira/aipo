if(!dojo._hasResource["dojox.gfx.path"]){dojo._hasResource["dojox.gfx.path"]=true;
dojo.provide("dojox.gfx.path");
dojo.require("dojox.gfx.shape");
dojo.declare("dojox.gfx.path.Path",dojox.gfx.Shape,{constructor:function(A){this.shape=dojo.clone(dojox.gfx.defaultPath);
this.segments=[];
this.absolute=true;
this.last={};
this.rawNode=A
},setAbsoluteMode:function(A){this.absolute=typeof A=="string"?(A=="absolute"):A;
return this
},getAbsoluteMode:function(){return this.absolute
},getBoundingBox:function(){return(this.bbox&&("l" in this.bbox))?{x:this.bbox.l,y:this.bbox.t,width:this.bbox.r-this.bbox.l,height:this.bbox.b-this.bbox.t}:null
},getLastPosition:function(){return"x" in this.last?this.last:null
},_updateBBox:function(B,A){if(this.bbox&&("l" in this.bbox)){if(this.bbox.l>B){this.bbox.l=B
}if(this.bbox.r<B){this.bbox.r=B
}if(this.bbox.t>A){this.bbox.t=A
}if(this.bbox.b<A){this.bbox.b=A
}}else{this.bbox={l:B,b:A,r:B,t:A}
}},_updateWithSegment:function(A){var D=A.args,F=D.length;
switch(A.action){case"M":case"L":case"C":case"S":case"Q":case"T":for(var G=0;
G<F;
G+=2){this._updateBBox(D[G],D[G+1])
}this.last.x=D[F-2];
this.last.y=D[F-1];
this.absolute=true;
break;
case"H":for(var G=0;
G<F;
++G){this._updateBBox(D[G],this.last.y)
}this.last.x=D[F-1];
this.absolute=true;
break;
case"V":for(var G=0;
G<F;
++G){this._updateBBox(this.last.x,D[G])
}this.last.y=D[F-1];
this.absolute=true;
break;
case"m":var C=0;
if(!("x" in this.last)){this._updateBBox(this.last.x=D[0],this.last.y=D[1]);
C=2
}for(var G=C;
G<F;
G+=2){this._updateBBox(this.last.x+=D[G],this.last.y+=D[G+1])
}this.absolute=false;
break;
case"l":case"t":for(var G=0;
G<F;
G+=2){this._updateBBox(this.last.x+=D[G],this.last.y+=D[G+1])
}this.absolute=false;
break;
case"h":for(var G=0;
G<F;
++G){this._updateBBox(this.last.x+=D[G],this.last.y)
}this.absolute=false;
break;
case"v":for(var G=0;
G<F;
++G){this._updateBBox(this.last.x,this.last.y+=D[G])
}this.absolute=false;
break;
case"c":for(var G=0;
G<F;
G+=6){this._updateBBox(this.last.x+D[G],this.last.y+D[G+1]);
this._updateBBox(this.last.x+D[G+2],this.last.y+D[G+3]);
this._updateBBox(this.last.x+=D[G+4],this.last.y+=D[G+5])
}this.absolute=false;
break;
case"s":case"q":for(var G=0;
G<F;
G+=4){this._updateBBox(this.last.x+D[G],this.last.y+D[G+1]);
this._updateBBox(this.last.x+=D[G+2],this.last.y+=D[G+3])
}this.absolute=false;
break;
case"A":for(var G=0;
G<F;
G+=7){this._updateBBox(D[G+5],D[G+6])
}this.last.x=D[F-2];
this.last.y=D[F-1];
this.absolute=true;
break;
case"a":for(var G=0;
G<F;
G+=7){this._updateBBox(this.last.x+=D[G+5],this.last.y+=D[G+6])
}this.absolute=false;
break
}var B=[A.action];
for(var G=0;
G<F;
++G){B.push(dojox.gfx.formatNumber(D[G],true))
}if(typeof this.shape.path=="string"){this.shape.path+=B.join("")
}else{var F=B.length,E=this.shape.path;
for(var G=0;
G<F;
++G){E.push(B[G])
}}},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(B,D){var C=this._validSegments[B.toLowerCase()];
if(typeof C=="number"){if(C){if(D.length>=C){var A={action:B,args:D.slice(0,D.length-D.length%C)};
this.segments.push(A);
this._updateWithSegment(A)
}}else{var A={action:B,args:[]};
this.segments.push(A);
this._updateWithSegment(A)
}}},_collectArgs:function(C,D){for(var B=0;
B<D.length;
++B){var A=D[B];
if(typeof A=="boolean"){C.push(A?1:0)
}else{if(typeof A=="number"){C.push(A)
}else{if(A instanceof Array){this._collectArgs(C,A)
}else{if("x" in A&&"y" in A){C.push(A.x,A.y)
}}}}}},moveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"M":"m",A);
return this
},lineTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"L":"l",A);
return this
},hLineTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"H":"h",A);
return this
},vLineTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"V":"v",A);
return this
},curveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"C":"c",A);
return this
},smoothCurveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"S":"s",A);
return this
},qCurveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"Q":"q",A);
return this
},qSmoothCurveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"T":"t",A);
return this
},arcTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"A":"a",A);
return this
},closePath:function(){this._pushSegment("Z",[]);
return this
},_setPath:function(C){var B=dojo.isArray(C)?C:C.match(dojox.gfx.pathSvgRegExp);
this.segments=[];
this.absolute=true;
this.bbox={};
this.last={};
if(!B){return 
}var A="",F=[],E=B.length;
for(var H=0;
H<E;
++H){var G=B[H],D=parseFloat(G);
if(isNaN(D)){if(A){this._pushSegment(A,F)
}F=[];
A=G
}else{F.push(D)
}}this._pushSegment(A,F)
},setShape:function(B){dojox.gfx.Shape.prototype.setShape.call(this,typeof B=="string"?{path:B}:B);
var A=this.shape.path;
this.shape.path=[];
this._setPath(A);
this.shape.path=this.shape.path.join("");
return this
},_2PI:Math.PI*2});
dojo.declare("dojox.gfx.path.TextPath",dojox.gfx.path.Path,{constructor:function(A){if(!("text" in this)){this.text=dojo.clone(dojox.gfx.defaultTextPath)
}if(!("fontStyle" in this)){this.fontStyle=dojo.clone(dojox.gfx.defaultFont)
}},setText:function(A){this.text=dojox.gfx.makeParameters(this.text,typeof A=="string"?{text:A}:A);
this._setText();
return this
},setFont:function(A){this.fontStyle=typeof A=="string"?dojox.gfx.splitFontString(A):dojox.gfx.makeParameters(dojox.gfx.defaultFont,A);
this._setFont();
return this
}})
};