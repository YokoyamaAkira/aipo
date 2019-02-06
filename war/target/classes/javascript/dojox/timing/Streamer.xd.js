dojo._xdResourceLoaded({depends:[["provide","dojox.timing.Streamer"],["require","dojox.timing._base"]],defineResource:function(A){if(!A._hasResource["dojox.timing.Streamer"]){A._hasResource["dojox.timing.Streamer"]=true;
A.provide("dojox.timing.Streamer");
A.require("dojox.timing._base");
dojox.timing.Streamer=function(G,B,J,F,C){var H=this;
var E=[];
this.interval=J||1000;
this.minimumSize=F||10;
this.inputFunction=G||function(K){};
this.outputFunction=B||function(K){};
var I=new dojox.timing.Timer(this.interval);
var D=function(){H.onTick(H);
if(E.length<H.minimumSize){H.inputFunction(E)
}var K=E.shift();
while(typeof (K)=="undefined"&&E.length>0){K=E.shift()
}if(typeof (K)=="undefined"){H.stop();
return 
}H.outputFunction(K)
};
this.setInterval=function(K){this.interval=K;
I.setInterval(K)
};
this.onTick=function(K){};
this.start=function(){if(typeof (this.inputFunction)=="function"&&typeof (this.outputFunction)=="function"){I.start();
return 
}throw new Error("You cannot start a Streamer without an input and an output function.")
};
this.onStart=function(){};
this.stop=function(){I.stop()
};
this.onStop=function(){};
I.onTick=this.tick;
I.onStart=this.onStart;
I.onStop=this.onStop;
if(C){E.concat(C)
}}
}}});