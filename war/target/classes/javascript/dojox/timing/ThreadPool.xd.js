dojo._xdResourceLoaded({depends:[["provide","dojox.timing.ThreadPool"],["require","dojox.timing"]],defineResource:function(A){if(!A._hasResource["dojox.timing.ThreadPool"]){A._hasResource["dojox.timing.ThreadPool"]=true;
A.provide("dojox.timing.ThreadPool");
A.require("dojox.timing");
A.experimental("dojox.timing.ThreadPool");
(function(){var B=dojox.timing;
B.threadStates={UNSTARTED:"unstarted",STOPPED:"stopped",PENDING:"pending",RUNNING:"running",SUSPENDED:"suspended",WAITING:"waiting",COMPLETE:"complete",ERROR:"error"};
B.threadPriorities={LOWEST:1,BELOWNORMAL:2,NORMAL:3,ABOVENORMAL:4,HIGHEST:5};
B.Thread=function(E,D){var C=this;
this.state=B.threadStates.UNSTARTED;
this.priority=D||B.threadPriorities.NORMAL;
this.lastError=null;
this.func=E;
this.invoke=function(){C.state=B.threadStates.RUNNING;
try{E(this);
C.state=B.threadStates.COMPLETE
}catch(F){C.lastError=F;
C.state=B.threadStates.ERROR
}}
};
B.ThreadPool=new (function(I,H){var K=this;
var G=I;
var J=G;
var M=H;
var D=Math.floor((M/2)/G);
var F=[];
var C=new Array(G+1);
var L=new dojox.timing.Timer();
var E=function(){var P=C[0]={};
for(var O=0;
O<C.length;
O++){window.clearTimeout(C[O]);
var N=F.shift();
if(typeof (N)=="undefined"){break
}P["thread-"+O]=N;
C[O]=window.setTimeout(N.invoke,(D*O))
}J=G-(O-1)
};
this.getMaxThreads=function(){return G
};
this.getAvailableThreads=function(){return J
};
this.getTickInterval=function(){return M
};
this.queueUserWorkItem=function(P){var Q=P;
if(Q instanceof Function){Q=new B.Thread(Q)
}var N=F.length;
for(var O=0;
O<F.length;
O++){if(F[O].priority<Q.priority){N=O;
break
}}if(N<F.length){F.splice(N,0,Q)
}else{F.push(Q)
}return true
};
this.removeQueuedUserWorkItem=function(P){if(P instanceof Function){var N=-1;
for(var O=0;
O<F.length;
O++){if(F[O].func==P){N=O;
break
}}if(N>-1){F.splice(N,1);
return true
}return false
}var N=-1;
for(var O=0;
O<F.length;
O++){if(F[O]==P){N=O;
break
}}if(N>-1){F.splice(N,1);
return true
}return false
};
this.start=function(){L.start()
};
this.stop=function(){L.stop()
};
this.abort=function(){this.stop();
for(var O=1;
O<C.length;
O++){if(C[O]){window.clearTimeout(C[O])
}}for(var N in C[0]){this.queueUserWorkItem(N)
}C[0]={}
};
this.reset=function(){this.abort();
F=[]
};
this.sleep=function(N){L.stop();
window.setTimeout(L.start,N)
};
L.onTick=K.invoke
})(16,5000)
})()
}}});