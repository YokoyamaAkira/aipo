if(!dojo._hasResource["dojo._base.fx"]){dojo._hasResource["dojo._base.fx"]=true;
dojo.provide("dojo._base.fx");
dojo.require("dojo._base.Color");
dojo.require("dojo._base.connect");
dojo.require("dojo._base.declare");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.html");
dojo._Line=function(B,A){this.start=B;
this.end=A;
this.getValue=function(C){return((this.end-this.start)*C)+this.start
}
};
dojo.declare("dojo._Animation",null,{constructor:function(A){dojo.mixin(this,A);
if(dojo.isArray(this.curve)){this.curve=new dojo._Line(this.curve[0],this.curve[1])
}},duration:1000,repeat:0,rate:10,_percent:0,_startRepeatCount:0,fire:function(A,B){if(this[A]){this[A].apply(this,B||[])
}return this
},play:function(C,B){var D=this;
if(B){D._stopTimer();
D._active=D._paused=false;
D._percent=0
}else{if(D._active&&!D._paused){return D
}}D.fire("beforeBegin");
var E=C||D.delay;
var A=dojo.hitch(D,"_play",B);
if(E>0){setTimeout(A,E);
return D
}A();
return D
},_play:function(A){var C=this;
C._startTime=new Date().valueOf();
if(C._paused){C._startTime-=C.duration*C._percent
}C._endTime=C._startTime+C.duration;
C._active=true;
C._paused=false;
var B=C.curve.getValue(C._percent);
if(!C._percent){if(!C._startRepeatCount){C._startRepeatCount=C.repeat
}C.fire("onBegin",[B])
}C.fire("onPlay",[B]);
C._cycle();
return C
},pause:function(){this._stopTimer();
if(!this._active){return this
}this._paused=true;
this.fire("onPause",[this.curve.getValue(this._percent)]);
return this
},gotoPercent:function(B,A){this._stopTimer();
this._active=this._paused=true;
this._percent=B;
if(A){this.play()
}return this
},stop:function(A){if(!this._timer){return 
}this._stopTimer();
if(A){this._percent=1
}this.fire("onStop",[this.curve.getValue(this._percent)]);
this._active=this._paused=false;
return this
},status:function(){if(this._active){return this._paused?"paused":"playing"
}return"stopped"
},_cycle:function(){var B=this;
if(B._active){var C=new Date().valueOf();
var A=(C-B._startTime)/(B._endTime-B._startTime);
if(A>=1){A=1
}B._percent=A;
if(B.easing){A=B.easing(A)
}B.fire("onAnimate",[B.curve.getValue(A)]);
if(A<1){B._startTimer()
}else{B._active=false;
if(B.repeat>0){B.repeat--;
B.play(null,true)
}else{if(B.repeat==-1){B.play(null,true)
}else{if(B._startRepeatCount){B.repeat=B._startRepeatCount;
B._startRepeatCount=0
}}}B._percent=0;
B.fire("onEnd")
}}return B
}});
(function(){var F=dojo;
var D=0;
var C=[];
var B={run:function(){}};
var G=null;
dojo._Animation.prototype._startTimer=function(){if(!this._timer){this._timer=dojo.connect(B,"run",this,"_cycle");
D++
}if(!G){G=setInterval(dojo.hitch(B,"run"),this.rate)
}};
dojo._Animation.prototype._stopTimer=function(){dojo.disconnect(this._timer);
this._timer=null;
D--;
if(!D){clearInterval(G);
G=null
}};
var E=(F.isIE)?function(I){var H=I.style;
if(!H.zoom.length&&F.style(I,"zoom")=="normal"){H.zoom="1"
}if(!H.width.length&&F.style(I,"width")=="auto"){H.width="auto"
}}:function(){};
dojo._fade=function(H){H.node=F.byId(H.node);
var K=F.mixin({properties:{}},H);
var I=(K.properties.opacity={});
I.start=!("start" in K)?function(){return Number(F.style(K.node,"opacity"))
}:K.start;
I.end=K.end;
var J=F.animateProperty(K);
F.connect(J,"beforeBegin",F.partial(E,K.node));
return J
};
dojo.fadeIn=function(H){return F._fade(F.mixin({end:1},H))
};
dojo.fadeOut=function(H){return F._fade(F.mixin({end:0},H))
};
dojo._defaultEasing=function(H){return 0.5+((Math.sin((H+1.5)*Math.PI))/2)
};
var A=function(H){this._properties=H;
for(var I in H){var J=H[I];
if(J.start instanceof F.Color){J.tempColor=new F.Color()
}}this.getValue=function(L){var K={};
for(var M in this._properties){var O=this._properties[M];
var N=O.start;
if(N instanceof F.Color){K[M]=F.blendColors(N,O.end,L,O.tempColor).toCss()
}else{if(!F.isArray(N)){K[M]=((O.end-N)*L)+N+(M!="opacity"?O.units||"px":"")
}}}return K
}
};
dojo.animateProperty=function(H){H.node=F.byId(H.node);
if(!H.easing){H.easing=F._defaultEasing
}var I=new F._Animation(H);
F.connect(I,"beforeBegin",I,function(){var L={};
for(var M in this.properties){var N=(L[M]=F.mixin({},this.properties[M]));
if(F.isFunction(N.start)){N.start=N.start()
}if(F.isFunction(N.end)){N.end=N.end()
}var K=(M.toLowerCase().indexOf("color")>=0);
function J(P,Q){var O=({height:P.offsetHeight,width:P.offsetWidth})[Q];
if(O!==undefined){return O
}O=F.style(P,Q);
return(Q=="opacity")?Number(O):parseFloat(O)
}if(!("end" in N)){N.end=J(this.node,M)
}else{if(!("start" in N)){N.start=J(this.node,M)
}}if(K){N.start=new F.Color(N.start);
N.end=new F.Color(N.end)
}else{N.start=(M=="opacity")?Number(N.start):parseFloat(N.start)
}}this.curve=new A(L)
});
F.connect(I,"onAnimate",I,function(J){for(var K in J){F.style(this.node,K,J[K])
}});
return I
}
})()
};