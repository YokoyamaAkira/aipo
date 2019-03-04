dojo._xdResourceLoaded({depends:[["provide","dojo._base.Deferred"],["require","dojo._base.lang"]],defineResource:function(A){if(!A._hasResource["dojo._base.Deferred"]){A._hasResource["dojo._base.Deferred"]=true;
A.provide("dojo._base.Deferred");
A.require("dojo._base.lang");
A.Deferred=function(B){this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=B;
this.silentlyCancelled=false
};
A.extend(A.Deferred,{_nextId:(function(){var B=1;
return function(){return B++
}
})(),cancel:function(){var C;
if(this.fired==-1){if(this.canceller){C=this.canceller(this)
}else{this.silentlyCancelled=true
}if(this.fired==-1){if(!(C instanceof Error)){var B=C;
C=new Error("Deferred Cancelled");
C.dojoType="cancel";
C.cancelResult=B
}this.errback(C)
}}else{if((this.fired==0)&&(this.results[0] instanceof A.Deferred)){this.results[0].cancel()
}}},_resback:function(B){this.fired=((B instanceof Error)?1:0);
this.results[this.fired]=B;
this._fire()
},_check:function(){if(this.fired!=-1){if(!this.silentlyCancelled){throw new Error("already called!")
}this.silentlyCancelled=false;
return 
}},callback:function(B){this._check();
this._resback(B)
},errback:function(B){this._check();
if(!(B instanceof Error)){B=new Error(B)
}this._resback(B)
},addBoth:function(B,C){var D=A.hitch(B,C);
if(arguments.length>2){D=A.partial(D,arguments,2)
}return this.addCallbacks(D,D)
},addCallback:function(B,C){var D=A.hitch(B,C);
if(arguments.length>2){D=A.partial(D,arguments,2)
}return this.addCallbacks(D,null)
},addErrback:function(B,C){var D=A.hitch(B,C);
if(arguments.length>2){D=A.partial(D,arguments,2)
}return this.addCallbacks(null,D)
},addCallbacks:function(B,C){this.chain.push([B,C]);
if(this.fired>=0){this._fire()
}return this
},_fire:function(){var E=this.chain;
var H=this.fired;
var D=this.results[H];
var C=this;
var B=null;
while((E.length>0)&&(this.paused==0)){var G=E.shift()[H];
if(!G){continue
}try{D=G(D);
H=((D instanceof Error)?1:0);
if(D instanceof A.Deferred){B=function(I){C._resback(I);
C.paused--;
if((C.paused==0)&&(C.fired>=0)){C._fire()
}};
this.paused++
}}catch(F){console.debug(F);
H=1;
D=F
}}this.fired=H;
this.results[H]=D;
if((B)&&(this.paused)){D.addBoth(B)
}}})
}}});