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
},_updateBBox:function(A,B){if(this.bbox&&("l" in this.bbox)){if(this.bbox.l>A){this.bbox.l=A
}if(this.bbox.r<A){this.bbox.r=A
}if(this.bbox.t>B){this.bbox.t=B
}if(this.bbox.b<B){this.bbox.b=B
}}else{this.bbox={l:A,b:B,r:A,t:B}
}},_updateWithSegment:function(D){var G=D.args,B=G.length;
switch(D.action){case"M":case"L":case"C":case"S":case"Q":case"T":for(var C=0;
C<B;
C+=2){this._updateBBox(G[C],G[C+1])
}this.last.x=G[B-2];
this.last.y=G[B-1];
this.absolute=true;
break;
case"H":for(var C=0;
C<B;
++C){this._updateBBox(G[C],this.last.y)
}this.last.x=G[B-1];
this.absolute=true;
break;
case"V":for(var C=0;
C<B;
++C){this._updateBBox(this.last.x,G[C])
}this.last.y=G[B-1];
this.absolute=true;
break;
case"m":var F=0;
if(!("x" in this.last)){this._updateBBox(this.last.x=G[0],this.last.y=G[1]);
F=2
}for(var C=F;
C<B;
C+=2){this._updateBBox(this.last.x+=G[C],this.last.y+=G[C+1])
}this.absolute=false;
break;
case"l":case"t":for(var C=0;
C<B;
C+=2){this._updateBBox(this.last.x+=G[C],this.last.y+=G[C+1])
}this.absolute=false;
break;
case"h":for(var C=0;
C<B;
++C){this._updateBBox(this.last.x+=G[C],this.last.y)
}this.absolute=false;
break;
case"v":for(var C=0;
C<B;
++C){this._updateBBox(this.last.x,this.last.y+=G[C])
}this.absolute=false;
break;
case"c":for(var C=0;
C<B;
C+=6){this._updateBBox(this.last.x+G[C],this.last.y+G[C+1]);
this._updateBBox(this.last.x+G[C+2],this.last.y+G[C+3]);
this._updateBBox(this.last.x+=G[C+4],this.last.y+=G[C+5])
}this.absolute=false;
break;
case"s":case"q":for(var C=0;
C<B;
C+=4){this._updateBBox(this.last.x+G[C],this.last.y+G[C+1]);
this._updateBBox(this.last.x+=G[C+2],this.last.y+=G[C+3])
}this.absolute=false;
break;
case"A":for(var C=0;
C<B;
C+=7){this._updateBBox(G[C+5],G[C+6])
}this.last.x=G[B-2];
this.last.y=G[B-1];
this.absolute=true;
break;
case"a":for(var C=0;
C<B;
C+=7){this._updateBBox(this.last.x+=G[C+5],this.last.y+=G[C+6])
}this.absolute=false;
break
}var E=[D.action];
for(var C=0;
C<B;
++C){E.push(dojox.gfx.formatNumber(G[C],true))
}if(typeof this.shape.path=="string"){this.shape.path+=E.join("")
}else{var B=E.length,A=this.shape.path;
for(var C=0;
C<B;
++C){A.push(E[C])
}}},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(C,A){var D=this._validSegments[C.toLowerCase()];
if(typeof D=="number"){if(D){if(A.length>=D){var B={action:C,args:A.slice(0,A.length-A.length%D)};
this.segments.push(B);
this._updateWithSegment(B)
}}else{var B={action:C,args:[]};
this.segments.push(B);
this._updateWithSegment(B)
}}},_collectArgs:function(D,A){for(var C=0;
C<A.length;
++C){var B=A[C];
if(typeof B=="boolean"){D.push(B?1:0)
}else{if(typeof B=="number"){D.push(B)
}else{if(B instanceof Array){this._collectArgs(D,B)
}else{if("x" in B&&"y" in B){D.push(B.x,B.y)
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
},_setPath:function(H){var G=dojo.isArray(H)?H:H.match(dojox.gfx.pathSvgRegExp);
this.segments=[];
this.absolute=true;
this.bbox={};
this.last={};
if(!G){return 
}var F="",C=[],B=G.length;
for(var E=0;
E<B;
++E){var D=G[E],A=parseFloat(D);
if(isNaN(A)){if(F){this._pushSegment(F,C)
}C=[];
F=D
}else{C.push(A)
}}this._pushSegment(F,C)
},setShape:function(A){dojox.gfx.Shape.prototype.setShape.call(this,typeof A=="string"?{path:A}:A);
var B=this.shape.path;
this.shape.path=[];
this._setPath(B);
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