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
B.ThreadPool=new (function(K,J){var M=this;
var I=K;
var L=I;
var D=J;
var F=Math.floor((D/2)/I);
var H=[];
var E=new Array(I+1);
var C=new dojox.timing.Timer();
var G=function(){var P=E[0]={};
for(var O=0;
O<E.length;
O++){window.clearTimeout(E[O]);
var N=H.shift();
if(typeof (N)=="undefined"){break
}P["thread-"+O]=N;
E[O]=window.setTimeout(N.invoke,(F*O))
}L=I-(O-1)
};
this.getMaxThreads=function(){return I
};
this.getAvailableThreads=function(){return L
};
this.getTickInterval=function(){return D
};
this.queueUserWorkItem=function(P){var Q=P;
if(Q instanceof Function){Q=new B.Thread(Q)
}var N=H.length;
for(var O=0;
O<H.length;
O++){if(H[O].priority<Q.priority){N=O;
break
}}if(N<H.length){H.splice(N,0,Q)
}else{H.push(Q)
}return true
};
this.removeQueuedUserWorkItem=function(P){if(P instanceof Function){var N=-1;
for(var O=0;
O<H.length;
O++){if(H[O].func==P){N=O;
break
}}if(N>-1){H.splice(N,1);
return true
}return false
}var N=-1;
for(var O=0;
O<H.length;
O++){if(H[O]==P){N=O;
break
}}if(N>-1){H.splice(N,1);
return true
}return false
};
this.start=function(){C.start()
};
this.stop=function(){C.stop()
};
this.abort=function(){this.stop();
for(var O=1;
O<E.length;
O++){if(E[O]){window.clearTimeout(E[O])
}}for(var N in E[0]){this.queueUserWorkItem(N)
}E[0]={}
};
this.reset=function(){this.abort();
H=[]
};
this.sleep=function(N){C.stop();
window.setTimeout(C.start,N)
};
C.onTick=M.invoke
})(16,5000)
})()
}}});