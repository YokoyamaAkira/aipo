if(!dojo._hasResource["dojo._base.fx"]){dojo._hasResource["dojo._base.fx"]=true;
dojo.provide("dojo._base.fx");
dojo.require("dojo._base.Color");
dojo.require("dojo._base.connect");
dojo.require("dojo._base.declare");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.html");
dojo._Line=function(A,B){this.start=A;
this.end=B;
this.getValue=function(C){return((this.end-this.start)*C)+this.start
}
};
dojo.declare("dojo._Animation",null,{constructor:function(A){dojo.mixin(this,A);
if(dojo.isArray(this.curve)){this.curve=new dojo._Line(this.curve[0],this.curve[1])
}},duration:1000,repeat:0,rate:10,_percent:0,_startRepeatCount:0,fire:function(B,A){if(this[B]){this[B].apply(this,A||[])
}return this
},play:function(B,A){var C=this;
if(A){C._stopTimer();
C._active=C._paused=false;
C._percent=0
}else{if(C._active&&!C._paused){return C
}}C.fire("beforeBegin");
var D=B||C.delay;
var E=dojo.hitch(C,"_play",A);
if(D>0){setTimeout(E,D);
return C
}E();
return C
},_play:function(C){var B=this;
B._startTime=new Date().valueOf();
if(B._paused){B._startTime-=B.duration*B._percent
}B._endTime=B._startTime+B.duration;
B._active=true;
B._paused=false;
var A=B.curve.getValue(B._percent);
if(!B._percent){if(!B._startRepeatCount){B._startRepeatCount=B.repeat
}B.fire("onBegin",[A])
}B.fire("onPlay",[A]);
B._cycle();
return B
},pause:function(){this._stopTimer();
if(!this._active){return this
}this._paused=true;
this.fire("onPause",[this.curve.getValue(this._percent)]);
return this
},gotoPercent:function(A,B){this._stopTimer();
this._active=this._paused=true;
this._percent=A;
if(B){this.play()
}return this
},stop:function(A){if(!this._timer){return 
}this._stopTimer();
if(A){this._percent=1
}this.fire("onStop",[this.curve.getValue(this._percent)]);
this._active=this._paused=false;
return this
},status:function(){if(this._active){return this._paused?"paused":"playing"
}return"stopped"
},_cycle:function(){var A=this;
if(A._active){var B=new Date().valueOf();
var C=(B-A._startTime)/(A._endTime-A._startTime);
if(C>=1){C=1
}A._percent=C;
if(A.easing){C=A.easing(C)
}A.fire("onAnimate",[A.curve.getValue(C)]);
if(C<1){A._startTimer()
}else{A._active=false;
if(A.repeat>0){A.repeat--;
A.play(null,true)
}else{if(A.repeat==-1){A.play(null,true)
}else{if(A._startRepeatCount){A.repeat=A._startRepeatCount;
A._startRepeatCount=0
}}}A._percent=0;
A.fire("onEnd")
}}return A
}});
(function(){var C=dojo;
var A=0;
var G=[];
var F={run:function(){}};
var D=null;
dojo._Animation.prototype._startTimer=function(){if(!this._timer){this._timer=dojo.connect(F,"run",this,"_cycle");
A++
}if(!D){D=setInterval(dojo.hitch(F,"run"),this.rate)
}};
dojo._Animation.prototype._stopTimer=function(){dojo.disconnect(this._timer);
this._timer=null;
A--;
if(!A){clearInterval(D);
D=null
}};
var B=(C.isIE)?function(H){var I=H.style;
if(!I.zoom.length&&C.style(H,"zoom")=="normal"){I.zoom="1"
}if(!I.width.length&&C.style(H,"width")=="auto"){I.width="auto"
}}:function(){};
dojo._fade=function(I){I.node=C.byId(I.node);
var H=C.mixin({properties:{}},I);
var J=(H.properties.opacity={});
J.start=!("start" in H)?function(){return Number(C.style(H.node,"opacity"))
}:H.start;
J.end=H.end;
var K=C.animateProperty(H);
C.connect(K,"beforeBegin",C.partial(B,H.node));
return K
};
dojo.fadeIn=function(H){return C._fade(C.mixin({end:1},H))
};
dojo.fadeOut=function(H){return C._fade(C.mixin({end:0},H))
};
dojo._defaultEasing=function(H){return 0.5+((Math.sin((H+1.5)*Math.PI))/2)
};
var E=function(I){this._properties=I;
for(var J in I){var H=I[J];
if(H.start instanceof C.Color){H.tempColor=new C.Color()
}}this.getValue=function(O){var N={};
for(var M in this._properties){var L=this._properties[M];
var K=L.start;
if(K instanceof C.Color){N[M]=C.blendColors(K,L.end,O,L.tempColor).toCss()
}else{if(!C.isArray(K)){N[M]=((L.end-K)*O)+K+(M!="opacity"?L.units||"px":"")
}}}return N
}
};
dojo.animateProperty=function(I){I.node=C.byId(I.node);
if(!I.easing){I.easing=C._defaultEasing
}var H=new C._Animation(I);
C.connect(H,"beforeBegin",H,function(){var N={};
for(var J in this.properties){var K=(N[J]=C.mixin({},this.properties[J]));
if(C.isFunction(K.start)){K.start=K.start()
}if(C.isFunction(K.end)){K.end=K.end()
}var M=(J.toLowerCase().indexOf("color")>=0);
function L(P,Q){var O=({height:P.offsetHeight,width:P.offsetWidth})[Q];
if(O!==undefined){return O
}O=C.style(P,Q);
return(Q=="opacity")?Number(O):parseFloat(O)
}if(!("end" in K)){K.end=L(this.node,J)
}else{if(!("start" in K)){K.start=L(this.node,J)
}}if(M){K.start=new C.Color(K.start);
K.end=new C.Color(K.end)
}else{K.start=(J=="opacity")?Number(K.start):parseFloat(K.start)
}}this.curve=new E(N)
});
C.connect(H,"onAnimate",H,function(J){for(var K in J){C.style(this.node,K,J[K])
}});
return H
}
})()
};