if(!dojo._hasResource["dojox.timing.ThreadPool"]){dojo._hasResource["dojox.timing.ThreadPool"]=true;
dojo.provide("dojox.timing.ThreadPool");
dojo.require("dojox.timing");
dojo.experimental("dojox.timing.ThreadPool");
(function(){var A=dojox.timing;
A.threadStates={UNSTARTED:"unstarted",STOPPED:"stopped",PENDING:"pending",RUNNING:"running",SUSPENDED:"suspended",WAITING:"waiting",COMPLETE:"complete",ERROR:"error"};
A.threadPriorities={LOWEST:1,BELOWNORMAL:2,NORMAL:3,ABOVENORMAL:4,HIGHEST:5};
A.Thread=function(D,C){var B=this;
this.state=A.threadStates.UNSTARTED;
this.priority=C||A.threadPriorities.NORMAL;
this.lastError=null;
this.func=D;
this.invoke=function(){B.state=A.threadStates.RUNNING;
try{D(this);
B.state=A.threadStates.COMPLETE
}catch(E){B.lastError=E;
B.state=A.threadStates.ERROR
}}
};
A.ThreadPool=new (function(J,I){var L=this;
var H=J;
var K=H;
var C=I;
var E=Math.floor((C/2)/H);
var G=[];
var D=new Array(H+1);
var B=new dojox.timing.Timer();
var F=function(){var O=D[0]={};
for(var N=0;
N<D.length;
N++){window.clearTimeout(D[N]);
var M=G.shift();
if(typeof (M)=="undefined"){break
}O["thread-"+N]=M;
D[N]=window.setTimeout(M.invoke,(E*N))
}K=H-(N-1)
};
this.getMaxThreads=function(){return H
};
this.getAvailableThreads=function(){return K
};
this.getTickInterval=function(){return C
};
this.queueUserWorkItem=function(O){var P=O;
if(P instanceof Function){P=new A.Thread(P)
}var M=G.length;
for(var N=0;
N<G.length;
N++){if(G[N].priority<P.priority){M=N;
break
}}if(M<G.length){G.splice(M,0,P)
}else{G.push(P)
}return true
};
this.removeQueuedUserWorkItem=function(O){if(O instanceof Function){var M=-1;
for(var N=0;
N<G.length;
N++){if(G[N].func==O){M=N;
break
}}if(M>-1){G.splice(M,1);
return true
}return false
}var M=-1;
for(var N=0;
N<G.length;
N++){if(G[N]==O){M=N;
break
}}if(M>-1){G.splice(M,1);
return true
}return false
};
this.start=function(){B.start()
};
this.stop=function(){B.stop()
};
this.abort=function(){this.stop();
for(var N=1;
N<D.length;
N++){if(D[N]){window.clearTimeout(D[N])
}}for(var M in D[0]){this.queueUserWorkItem(M)
}D[0]={}
};
this.reset=function(){this.abort();
G=[]
};
this.sleep=function(M){B.stop();
window.setTimeout(B.start,M)
};
B.onTick=L.invoke
})(16,5000)
})()
};