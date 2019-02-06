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
})(),cancel:function(){var A;
if(this.fired==-1){if(this.canceller){A=this.canceller(this)
}else{this.silentlyCancelled=true
}if(this.fired==-1){if(!(A instanceof Error)){var B=A;
A=new Error("Deferred Cancelled");
A.dojoType="cancel";
A.cancelResult=B
}this.errback(A)
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
},addBoth:function(C,A){var B=dojo.hitch(C,A);
if(arguments.length>2){B=dojo.partial(B,arguments,2)
}return this.addCallbacks(B,B)
},addCallback:function(C,A){var B=dojo.hitch(C,A);
if(arguments.length>2){B=dojo.partial(B,arguments,2)
}return this.addCallbacks(B,null)
},addErrback:function(C,A){var B=dojo.hitch(C,A);
if(arguments.length>2){B=dojo.partial(B,arguments,2)
}return this.addCallbacks(null,B)
},addCallbacks:function(B,A){this.chain.push([B,A]);
if(this.fired>=0){this._fire()
}return this
},_fire:function(){var A=this.chain;
var D=this.fired;
var G=this.results[D];
var F=this;
var E=null;
while((A.length>0)&&(this.paused==0)){var C=A.shift()[D];
if(!C){continue
}try{G=C(G);
D=((G instanceof Error)?1:0);
if(G instanceof dojo.Deferred){E=function(H){F._resback(H);
F.paused--;
if((F.paused==0)&&(F.fired>=0)){F._fire()
}};
this.paused++
}}catch(B){console.debug(B);
D=1;
G=B
}}this.fired=D;
this.results[D]=G;
if((E)&&(this.paused)){G.addBoth(E)
}}})
};