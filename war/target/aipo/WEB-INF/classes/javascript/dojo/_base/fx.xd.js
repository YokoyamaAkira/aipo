dojo._xdResourceLoaded({depends:[["provide","dojo._base.fx"],["require","dojo._base.Color"],["require","dojo._base.connect"],["require","dojo._base.declare"],["require","dojo._base.lang"],["require","dojo._base.html"]],defineResource:function(A){if(!A._hasResource["dojo._base.fx"]){A._hasResource["dojo._base.fx"]=true;
A.provide("dojo._base.fx");
A.require("dojo._base.Color");
A.require("dojo._base.connect");
A.require("dojo._base.declare");
A.require("dojo._base.lang");
A.require("dojo._base.html");
A._Line=function(B,C){this.start=B;
this.end=C;
this.getValue=function(D){return((this.end-this.start)*D)+this.start
}
};
A.declare("dojo._Animation",null,{constructor:function(B){A.mixin(this,B);
if(A.isArray(this.curve)){this.curve=new A._Line(this.curve[0],this.curve[1])
}},duration:1000,repeat:0,rate:10,_percent:0,_startRepeatCount:0,fire:function(C,B){if(this[C]){this[C].apply(this,B||[])
}return this
},play:function(E,D){var F=this;
if(D){F._stopTimer();
F._active=F._paused=false;
F._percent=0
}else{if(F._active&&!F._paused){return F
}}F.fire("beforeBegin");
var B=E||F.delay;
var C=A.hitch(F,"_play",D);
if(B>0){setTimeout(C,B);
return F
}C();
return F
},_play:function(C){var B=this;
B._startTime=new Date().valueOf();
if(B._paused){B._startTime-=B.duration*B._percent
}B._endTime=B._startTime+B.duration;
B._active=true;
B._paused=false;
var D=B.curve.getValue(B._percent);
if(!B._percent){if(!B._startRepeatCount){B._startRepeatCount=B.repeat
}B.fire("onBegin",[D])
}B.fire("onPlay",[D]);
B._cycle();
return B
},pause:function(){this._stopTimer();
if(!this._active){return this
}this._paused=true;
this.fire("onPause",[this.curve.getValue(this._percent)]);
return this
},gotoPercent:function(B,C){this._stopTimer();
this._active=this._paused=true;
this._percent=B;
if(C){this.play()
}return this
},stop:function(B){if(!this._timer){return 
}this._stopTimer();
if(B){this._percent=1
}this.fire("onStop",[this.curve.getValue(this._percent)]);
this._active=this._paused=false;
return this
},status:function(){if(this._active){return this._paused?"paused":"playing"
}return"stopped"
},_cycle:function(){var D=this;
if(D._active){var B=new Date().valueOf();
var C=(B-D._startTime)/(D._endTime-D._startTime);
if(C>=1){C=1
}D._percent=C;
if(D.easing){C=D.easing(C)
}D.fire("onAnimate",[D.curve.getValue(C)]);
if(C<1){D._startTimer()
}else{D._active=false;
if(D.repeat>0){D.repeat--;
D.play(null,true)
}else{if(D.repeat==-1){D.play(null,true)
}else{if(D._startRepeatCount){D.repeat=D._startRepeatCount;
D._startRepeatCount=0
}}}D._percent=0;
D.fire("onEnd")
}}return D
}});
(function(){var F=A;
var D=0;
var C=[];
var H={run:function(){}};
var B=null;
A._Animation.prototype._startTimer=function(){if(!this._timer){this._timer=A.connect(H,"run",this,"_cycle");
D++
}if(!B){B=setInterval(A.hitch(H,"run"),this.rate)
}};
A._Animation.prototype._stopTimer=function(){A.disconnect(this._timer);
this._timer=null;
D--;
if(!D){clearInterval(B);
B=null
}};
var E=(F.isIE)?function(J){var I=J.style;
if(!I.zoom.length&&F.style(J,"zoom")=="normal"){I.zoom="1"
}if(!I.width.length&&F.style(J,"width")=="auto"){I.width="auto"
}}:function(){};
A._fade=function(I){I.node=F.byId(I.node);
var L=F.mixin({properties:{}},I);
var J=(L.properties.opacity={});
J.start=!("start" in L)?function(){return Number(F.style(L.node,"opacity"))
}:L.start;
J.end=L.end;
var K=F.animateProperty(L);
F.connect(K,"beforeBegin",F.partial(E,L.node));
return K
};
A.fadeIn=function(I){return F._fade(F.mixin({end:1},I))
};
A.fadeOut=function(I){return F._fade(F.mixin({end:0},I))
};
A._defaultEasing=function(I){return 0.5+((Math.sin((I+1.5)*Math.PI))/2)
};
var G=function(I){this._properties=I;
for(var J in I){var K=I[J];
if(K.start instanceof F.Color){K.tempColor=new F.Color()
}}this.getValue=function(N){var P={};
for(var O in this._properties){var M=this._properties[O];
var L=M.start;
if(L instanceof F.Color){P[O]=F.blendColors(L,M.end,N,M.tempColor).toCss()
}else{if(!F.isArray(L)){P[O]=((M.end-L)*N)+L+(O!="opacity"?M.units||"px":"")
}}}return P
}
};
A.animateProperty=function(I){I.node=F.byId(I.node);
if(!I.easing){I.easing=F._defaultEasing
}var J=new F._Animation(I);
F.connect(J,"beforeBegin",J,function(){var O={};
for(var K in this.properties){var L=(O[K]=F.mixin({},this.properties[K]));
if(F.isFunction(L.start)){L.start=L.start()
}if(F.isFunction(L.end)){L.end=L.end()
}var N=(K.toLowerCase().indexOf("color")>=0);
function M(Q,R){var P=({height:Q.offsetHeight,width:Q.offsetWidth})[R];
if(P!==undefined){return P
}P=F.style(Q,R);
return(R=="opacity")?Number(P):parseFloat(P)
}if(!("end" in L)){L.end=M(this.node,K)
}else{if(!("start" in L)){L.start=M(this.node,K)
}}if(N){L.start=new F.Color(L.start);
L.end=new F.Color(L.end)
}else{L.start=(K=="opacity")?Number(L.start):parseFloat(L.start)
}}this.curve=new G(O)
});
F.connect(J,"onAnimate",J,function(K){for(var L in K){F.style(this.node,L,K[L])
}});
return J
}
})()
}}});