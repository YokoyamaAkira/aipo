if(!dojo._hasResource["dojox.timing.Streamer"]){dojo._hasResource["dojox.timing.Streamer"]=true;
dojo.provide("dojox.timing.Streamer");
dojo.require("dojox.timing._base");
dojox.timing.Streamer=function(D,H,G,C,I){var E=this;
var B=[];
this.interval=G||1000;
this.minimumSize=C||10;
this.inputFunction=D||function(J){};
this.outputFunction=H||function(J){};
var F=new dojox.timing.Timer(this.interval);
var A=function(){E.onTick(E);
if(B.length<E.minimumSize){E.inputFunction(B)
}var J=B.shift();
while(typeof (J)=="undefined"&&B.length>0){J=B.shift()
}if(typeof (J)=="undefined"){E.stop();
return 
}E.outputFunction(J)
};
this.setInterval=function(J){this.interval=J;
F.setInterval(J)
};
this.onTick=function(J){};
this.start=function(){if(typeof (this.inputFunction)=="function"&&typeof (this.outputFunction)=="function"){F.start();
return 
}throw new Error("You cannot start a Streamer without an input and an output function.")
};
this.onStart=function(){};
this.stop=function(){F.stop()
};
this.onStop=function(){};
F.onTick=this.tick;
F.onStart=this.onStart;
F.onStop=this.onStop;
if(I){B.concat(I)
}}
};