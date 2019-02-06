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
})(),cancel:function(){var B;
if(this.fired==-1){if(this.canceller){B=this.canceller(this)
}else{this.silentlyCancelled=true
}if(this.fired==-1){if(!(B instanceof Error)){var C=B;
B=new Error("Deferred Cancelled");
B.dojoType="cancel";
B.cancelResult=C
}this.errback(B)
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
},addBoth:function(C,D){var B=A.hitch(C,D);
if(arguments.length>2){B=A.partial(B,arguments,2)
}return this.addCallbacks(B,B)
},addCallback:function(C,D){var B=A.hitch(C,D);
if(arguments.length>2){B=A.partial(B,arguments,2)
}return this.addCallbacks(B,null)
},addErrback:function(C,D){var B=A.hitch(C,D);
if(arguments.length>2){B=A.partial(B,arguments,2)
}return this.addCallbacks(null,B)
},addCallbacks:function(C,B){this.chain.push([C,B]);
if(this.fired>=0){this._fire()
}return this
},_fire:function(){var D=this.chain;
var C=this.fired;
var B=this.results[C];
var H=this;
var G=null;
while((D.length>0)&&(this.paused==0)){var F=D.shift()[C];
if(!F){continue
}try{B=F(B);
C=((B instanceof Error)?1:0);
if(B instanceof A.Deferred){G=function(I){H._resback(I);
H.paused--;
if((H.paused==0)&&(H.fired>=0)){H._fire()
}};
this.paused++
}}catch(E){console.debug(E);
C=1;
B=E
}}this.fired=C;
this.results[C]=B;
if((G)&&(this.paused)){B.addBoth(G)
}}})
}}});