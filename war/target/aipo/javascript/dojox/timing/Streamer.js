if(!dojo._hasResource["dojox.timing.Streamer"]){dojo._hasResource["dojox.timing.Streamer"]=true;
dojo.provide("dojox.timing.Streamer");
dojo.require("dojox.timing._base");
dojox.timing.Streamer=function(H,C,B,G,D){var I=this;
var F=[];
this.interval=B||1000;
this.minimumSize=G||10;
this.inputFunction=H||function(J){};
this.outputFunction=C||function(J){};
var A=new dojox.timing.Timer(this.interval);
var E=function(){I.onTick(I);
if(F.length<I.minimumSize){I.inputFunction(F)
}var J=F.shift();
while(typeof (J)=="undefined"&&F.length>0){J=F.shift()
}if(typeof (J)=="undefined"){I.stop();
return 
}I.outputFunction(J)
};
this.setInterval=function(J){this.interval=J;
A.setInterval(J)
};
this.onTick=function(J){};
this.start=function(){if(typeof (this.inputFunction)=="function"&&typeof (this.outputFunction)=="function"){A.start();
return 
}throw new Error("You cannot start a Streamer without an input and an output function.")
};
this.onStart=function(){};
this.stop=function(){A.stop()
};
this.onStop=function(){};
A.onTick=this.tick;
A.onStart=this.onStart;
A.onStop=this.onStop;
if(D){F.concat(D)
}}
};