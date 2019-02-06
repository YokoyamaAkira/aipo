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
},_updateBBox:function(B,C){if(this.bbox&&("l" in this.bbox)){if(this.bbox.l>B){this.bbox.l=B
}if(this.bbox.r<B){this.bbox.r=B
}if(this.bbox.t>C){this.bbox.t=C
}if(this.bbox.b<C){this.bbox.b=C
}}else{this.bbox={l:B,b:C,r:B,t:C}
}},_updateWithSegment:function(E){var H=E.args,C=H.length;
switch(E.action){case"M":case"L":case"C":case"S":case"Q":case"T":for(var D=0;
D<C;
D+=2){this._updateBBox(H[D],H[D+1])
}this.last.x=H[C-2];
this.last.y=H[C-1];
this.absolute=true;
break;
case"H":for(var D=0;
D<C;
++D){this._updateBBox(H[D],this.last.y)
}this.last.x=H[C-1];
this.absolute=true;
break;
case"V":for(var D=0;
D<C;
++D){this._updateBBox(this.last.x,H[D])
}this.last.y=H[C-1];
this.absolute=true;
break;
case"m":var G=0;
if(!("x" in this.last)){this._updateBBox(this.last.x=H[0],this.last.y=H[1]);
G=2
}for(var D=G;
D<C;
D+=2){this._updateBBox(this.last.x+=H[D],this.last.y+=H[D+1])
}this.absolute=false;
break;
case"l":case"t":for(var D=0;
D<C;
D+=2){this._updateBBox(this.last.x+=H[D],this.last.y+=H[D+1])
}this.absolute=false;
break;
case"h":for(var D=0;
D<C;
++D){this._updateBBox(this.last.x+=H[D],this.last.y)
}this.absolute=false;
break;
case"v":for(var D=0;
D<C;
++D){this._updateBBox(this.last.x,this.last.y+=H[D])
}this.absolute=false;
break;
case"c":for(var D=0;
D<C;
D+=6){this._updateBBox(this.last.x+H[D],this.last.y+H[D+1]);
this._updateBBox(this.last.x+H[D+2],this.last.y+H[D+3]);
this._updateBBox(this.last.x+=H[D+4],this.last.y+=H[D+5])
}this.absolute=false;
break;
case"s":case"q":for(var D=0;
D<C;
D+=4){this._updateBBox(this.last.x+H[D],this.last.y+H[D+1]);
this._updateBBox(this.last.x+=H[D+2],this.last.y+=H[D+3])
}this.absolute=false;
break;
case"A":for(var D=0;
D<C;
D+=7){this._updateBBox(H[D+5],H[D+6])
}this.last.x=H[C-2];
this.last.y=H[C-1];
this.absolute=true;
break;
case"a":for(var D=0;
D<C;
D+=7){this._updateBBox(this.last.x+=H[D+5],this.last.y+=H[D+6])
}this.absolute=false;
break
}var F=[E.action];
for(var D=0;
D<C;
++D){F.push(dojox.gfx.formatNumber(H[D],true))
}if(typeof this.shape.path=="string"){this.shape.path+=F.join("")
}else{var C=F.length,B=this.shape.path;
for(var D=0;
D<C;
++D){B.push(F[D])
}}},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(D,B){var E=this._validSegments[D.toLowerCase()];
if(typeof E=="number"){if(E){if(B.length>=E){var C={action:D,args:B.slice(0,B.length-B.length%E)};
this.segments.push(C);
this._updateWithSegment(C)
}}else{var C={action:D,args:[]};
this.segments.push(C);
this._updateWithSegment(C)
}}},_collectArgs:function(E,B){for(var D=0;
D<B.length;
++D){var C=B[D];
if(typeof C=="boolean"){E.push(C?1:0)
}else{if(typeof C=="number"){E.push(C)
}else{if(C instanceof Array){this._collectArgs(E,C)
}else{if("x" in C&&"y" in C){E.push(C.x,C.y)
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
},_setPath:function(I){var H=A.isArray(I)?I:I.match(dojox.gfx.pathSvgRegExp);
this.segments=[];
this.absolute=true;
this.bbox={};
this.last={};
if(!H){return 
}var G="",D=[],C=H.length;
for(var F=0;
F<C;
++F){var E=H[F],B=parseFloat(E);
if(isNaN(B)){if(G){this._pushSegment(G,D)
}D=[];
G=E
}else{D.push(B)
}}this._pushSegment(G,D)
},setShape:function(B){dojox.gfx.Shape.prototype.setShape.call(this,typeof B=="string"?{path:B}:B);
var C=this.shape.path;
this.shape.path=[];
this._setPath(C);
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