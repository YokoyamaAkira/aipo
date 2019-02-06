if(!dojo._hasResource["dojo._base.Deferred"]){dojo._hasResource["dojo._base.Deferred"]=true;
dojo.provide("dojo._base.Deferred");
dojo.require("dojo._base.lang");
dojo.Deferred=function(A){this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=A;
this.silentlyCancelled=false
};
dojo.extend(dojo.Deferred,{_nextId:(function(){var A=1;
return function(){return A++
}
})(),cancel:function(){var B;
if(this.fired==-1){if(this.canceller){B=this.canceller(this)
}else{this.silentlyCancelled=true
}if(this.fired==-1){if(!(B instanceof Error)){var A=B;
B=new Error("Deferred Cancelled");
B.dojoType="cancel";
B.cancelResult=A
}this.errback(B)
}}else{if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){this.results[0].cancel()
}}},_resback:function(A){this.fired=((A instanceof Error)?1:0);
this.results[this.fired]=A;
this._fire()
},_check:function(){if(this.fired!=-1){if(!this.silentlyCancelled){throw new Error("already called!")
}this.silentlyCancelled=false;
return 
}},callback:function(A){this._check();
this._resback(A)
},errback:function(A){this._check();
if(!(A instanceof Error)){A=new Error(A)
}this._resback(A)
},addBoth:function(A,B){var C=dojo.hitch(A,B);
if(arguments.length>2){C=dojo.partial(C,arguments,2)
}return this.addCallbacks(C,C)
},addCallback:function(A,B){var C=dojo.hitch(A,B);
if(arguments.length>2){C=dojo.partial(C,arguments,2)
}return this.addCallbacks(C,null)
},addErrback:function(A,B){var C=dojo.hitch(A,B);
if(arguments.length>2){C=dojo.partial(C,arguments,2)
}return this.addCallbacks(null,C)
},addCallbacks:function(A,B){this.chain.push([A,B]);
if(this.fired>=0){this._fire()
}return this
},_fire:function(){var D=this.chain;
var G=this.fired;
var C=this.results[G];
var B=this;
var A=null;
while((D.length>0)&&(this.paused==0)){var F=D.shift()[G];
if(!F){continue
}try{C=F(C);
G=((C instanceof Error)?1:0);
if(C instanceof dojo.Deferred){A=function(H){B._resback(H);
B.paused--;
if((B.paused==0)&&(B.fired>=0)){B._fire()
}};
this.paused++
}}catch(E){console.debug(E);
G=1;
C=E
}}this.fired=G;
this.results[G]=C;
if((A)&&(this.paused)){C.addBoth(A)
}}})
};