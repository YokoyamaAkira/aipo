if(!dojo._hasResource["dojox.fx.easing"]){dojo._hasResource["dojox.fx.easing"]=true;
dojo.provide("dojox.fx.easing");
dojox.fx.easing={easeIn:function(A){return Math.pow(A,3)
},easeOut:function(A){return(1-Math.pow(1-A,3))
},easeInOut:function(A){return((3*Math.pow(A,2))-(2*Math.pow(A,3)))
}}
};