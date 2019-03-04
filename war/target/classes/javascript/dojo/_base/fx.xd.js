dojo._xdResourceLoaded({depends:[["provide","dojo._base.fx"],["require","dojo._base.Color"],["require","dojo._base.connect"],["require","dojo._base.declare"],["require","dojo._base.lang"],["require","dojo._base.html"]],defineResource:function(A){if(!A._hasResource["dojo._base.fx"]){A._hasResource["dojo._base.fx"]=true;
A.provide("dojo._base.fx");
A.require("dojo._base.Color");
A.require("dojo._base.connect");
A.require("dojo._base.declare");
A.require("dojo._base.lang");
A.require("dojo._base.html");
A._Line=function(C,B){this.start=C;
this.end=B;
this.getValue=function(D){return((this.end-this.start)*D)+this.start
}
};
A.declare("dojo._Animation",null,{constructor:function(B){A.mixin(this,B);
if(A.isArray(this.curve)){this.curve=new A._Line(this.curve[0],this.curve[1])
}},duration:1000,repeat:0,rate:10,_percent:0,_startRepeatCount:0,fire:function(B,C){if(this[B]){this[B].apply(this,C||[])
}return this
},play:function(D,C){var E=this;
if(C){E._stopTimer();
E._active=E._paused=false;
E._percent=0
}else{if(E._active&&!E._paused){return E
}}E.fire("beforeBegin");
var F=D||E.delay;
var B=A.hitch(E,"_play",C);
if(F>0){setTimeout(B,F);
return E
}B();
return E
},_play:function(B){var D=this;
D._startTime=new Date().valueOf();
if(D._paused){D._startTime-=D.duration*D._percent
}D._endTime=D._startTime+D.duration;
D._active=true;
D._paused=false;
var C=D.curve.getValue(D._percent);
if(!D._percent){if(!D._startRepeatCount){D._startRepeatCount=D.repeat
}D.fire("onBegin",[C])
}D.fire("onPlay",[C]);
D._cycle();
return D
},pause:function(){this._stopTimer();
if(!this._active){return this
}this._paused=true;
this.fire("onPause",[this.curve.getValue(this._percent)]);
return this
},gotoPercent:function(C,B){this._stopTimer();
this._active=this._paused=true;
this._percent=C;
if(B){this.play()
}return this
},stop:function(B){if(!this._timer){return 
}this._stopTimer();
if(B){this._percent=1
}this.fire("onStop",[this.curve.getValue(this._percent)]);
this._active=this._paused=false;
return this
},status:function(){if(this._active){return this._paused?"paused":"playing"
}return"stopped"
},_cycle:function(){var C=this;
if(C._active){var D=new Date().valueOf();
var B=(D-C._startTime)/(C._endTime-C._startTime);
if(B>=1){B=1
}C._percent=B;
if(C.easing){B=C.easing(B)
}C.fire("onAnimate",[C.curve.getValue(B)]);
if(B<1){C._startTimer()
}else{C._active=false;
if(C.repeat>0){C.repeat--;
C.play(null,true)
}else{if(C.repeat==-1){C.play(null,true)
}else{if(C._startRepeatCount){C.repeat=C._startRepeatCount;
C._startRepeatCount=0
}}}C._percent=0;
C.fire("onEnd")
}}return C
}});
(function(){var G=A;
var E=0;
var D=[];
var C={run:function(){}};
var H=null;
A._Animation.prototype._startTimer=function(){if(!this._timer){this._timer=A.connect(C,"run",this,"_cycle");
E++
}if(!H){H=setInterval(A.hitch(C,"run"),this.rate)
}};
A._Animation.prototype._stopTimer=function(){A.disconnect(this._timer);
this._timer=null;
E--;
if(!E){clearInterval(H);
H=null
}};
var F=(G.isIE)?function(J){var I=J.style;
if(!I.zoom.length&&G.style(J,"zoom")=="normal"){I.zoom="1"
}if(!I.width.length&&G.style(J,"width")=="auto"){I.width="auto"
}}:function(){};
A._fade=function(I){I.node=G.byId(I.node);
var L=G.mixin({properties:{}},I);
var J=(L.properties.opacity={});
J.start=!("start" in L)?function(){return Number(G.style(L.node,"opacity"))
}:L.start;
J.end=L.end;
var K=G.animateProperty(L);
G.connect(K,"beforeBegin",G.partial(F,L.node));
return K
};
A.fadeIn=function(I){return G._fade(G.mixin({end:1},I))
};
A.fadeOut=function(I){return G._fade(G.mixin({end:0},I))
};
A._defaultEasing=function(I){return 0.5+((Math.sin((I+1.5)*Math.PI))/2)
};
var B=function(I){this._properties=I;
for(var J in I){var K=I[J];
if(K.start instanceof G.Color){K.tempColor=new G.Color()
}}this.getValue=function(M){var L={};
for(var N in this._properties){var P=this._properties[N];
var O=P.start;
if(O instanceof G.Color){L[N]=G.blendColors(O,P.end,M,P.tempColor).toCss()
}else{if(!G.isArray(O)){L[N]=((P.end-O)*M)+O+(N!="opacity"?P.units||"px":"")
}}}return L
}
};
A.animateProperty=function(I){I.node=G.byId(I.node);
if(!I.easing){I.easing=G._defaultEasing
}var J=new G._Animation(I);
G.connect(J,"beforeBegin",J,function(){var M={};
for(var N in this.properties){var O=(M[N]=G.mixin({},this.properties[N]));
if(G.isFunction(O.start)){O.start=O.start()
}if(G.isFunction(O.end)){O.end=O.end()
}var L=(N.toLowerCase().indexOf("color")>=0);
function K(Q,R){var P=({height:Q.offsetHeight,width:Q.offsetWidth})[R];
if(P!==undefined){return P
}P=G.style(Q,R);
return(R=="opacity")?Number(P):parseFloat(P)
}if(!("end" in O)){O.end=K(this.node,N)
}else{if(!("start" in O)){O.start=K(this.node,N)
}}if(L){O.start=new G.Color(O.start);
O.end=new G.Color(O.end)
}else{O.start=(N=="opacity")?Number(O.start):parseFloat(O.start)
}}this.curve=new B(M)
});
G.connect(J,"onAnimate",J,function(K){for(var L in K){G.style(this.node,L,K[L])
}});
return J
}
})()
}}});