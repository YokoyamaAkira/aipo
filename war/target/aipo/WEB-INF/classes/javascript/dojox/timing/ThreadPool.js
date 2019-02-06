if(!dojo._hasResource["dojox.timing.ThreadPool"]){dojo._hasResource["dojox.timing.ThreadPool"]=true;
dojo.provide("dojox.timing.ThreadPool");
dojo.require("dojox.timing");
dojo.experimental("dojox.timing.ThreadPool");
(function(){var A=dojox.timing;
A.threadStates={UNSTARTED:"unstarted",STOPPED:"stopped",PENDING:"pending",RUNNING:"running",SUSPENDED:"suspended",WAITING:"waiting",COMPLETE:"complete",ERROR:"error"};
A.threadPriorities={LOWEST:1,BELOWNORMAL:2,NORMAL:3,ABOVENORMAL:4,HIGHEST:5};
A.Thread=function(B,D){var C=this;
this.state=A.threadStates.UNSTARTED;
this.priority=D||A.threadPriorities.NORMAL;
this.lastError=null;
this.func=B;
this.invoke=function(){C.state=A.threadStates.RUNNING;
try{B(this);
C.state=A.threadStates.COMPLETE
}catch(E){C.lastError=E;
C.state=A.threadStates.ERROR
}}
};
A.ThreadPool=new (function(H,G){var J=this;
var F=H;
var I=F;
var L=G;
var C=Math.floor((L/2)/F);
var E=[];
var B=new Array(F+1);
var K=new dojox.timing.Timer();
var D=function(){var O=B[0]={};
for(var N=0;
N<B.length;
N++){window.clearTimeout(B[N]);
var M=E.shift();
if(typeof (M)=="undefined"){break
}O["thread-"+N]=M;
B[N]=window.setTimeout(M.invoke,(C*N))
}I=F-(N-1)
};
this.getMaxThreads=function(){return F
};
this.getAvailableThreads=function(){return I
};
this.getTickInterval=function(){return L
};
this.queueUserWorkItem=function(O){var P=O;
if(P instanceof Function){P=new A.Thread(P)
}var M=E.length;
for(var N=0;
N<E.length;
N++){if(E[N].priority<P.priority){M=N;
break
}}if(M<E.length){E.splice(M,0,P)
}else{E.push(P)
}return true
};
this.removeQueuedUserWorkItem=function(O){if(O instanceof Function){var M=-1;
for(var N=0;
N<E.length;
N++){if(E[N].func==O){M=N;
break
}}if(M>-1){E.splice(M,1);
return true
}return false
}var M=-1;
for(var N=0;
N<E.length;
N++){if(E[N]==O){M=N;
break
}}if(M>-1){E.splice(M,1);
return true
}return false
};
this.start=function(){K.start()
};
this.stop=function(){K.stop()
};
this.abort=function(){this.stop();
for(var N=1;
N<B.length;
N++){if(B[N]){window.clearTimeout(B[N])
}}for(var M in B[0]){this.queueUserWorkItem(M)
}B[0]={}
};
this.reset=function(){this.abort();
E=[]
};
this.sleep=function(M){K.stop();
window.setTimeout(K.start,M)
};
K.onTick=J.invoke
})(16,5000)
})()
};