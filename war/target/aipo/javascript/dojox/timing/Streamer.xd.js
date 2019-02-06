dojo._xdResourceLoaded({depends:[["provide","dojox.timing.Streamer"],["require","dojox.timing._base"]],defineResource:function(A){if(!A._hasResource["dojox.timing.Streamer"]){A._hasResource["dojox.timing.Streamer"]=true;
A.provide("dojox.timing.Streamer");
A.require("dojox.timing._base");
dojox.timing.Streamer=function(I,D,C,H,E){var J=this;
var G=[];
this.interval=C||1000;
this.minimumSize=H||10;
this.inputFunction=I||function(K){};
this.outputFunction=D||function(K){};
var B=new dojox.timing.Timer(this.interval);
var F=function(){J.onTick(J);
if(G.length<J.minimumSize){J.inputFunction(G)
}var K=G.shift();
while(typeof (K)=="undefined"&&G.length>0){K=G.shift()
}if(typeof (K)=="undefined"){J.stop();
return 
}J.outputFunction(K)
};
this.setInterval=function(K){this.interval=K;
B.setInterval(K)
};
this.onTick=function(K){};
this.start=function(){if(typeof (this.inputFunction)=="function"&&typeof (this.outputFunction)=="function"){B.start();
return 
}throw new Error("You cannot start a Streamer without an input and an output function.")
};
this.onStart=function(){};
this.stop=function(){B.stop()
};
this.onStop=function(){};
B.onTick=this.tick;
B.onStart=this.onStart;
B.onStop=this.onStop;
if(E){G.concat(E)
}}
}}});