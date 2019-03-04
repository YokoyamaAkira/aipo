if(!dojo._hasResource["dojox.uuid.generateRandomUuid"]){dojo._hasResource["dojox.uuid.generateRandomUuid"]=true;
dojo.provide("dojox.uuid.generateRandomUuid");
dojox.uuid.generateRandomUuid=function(){var B=16;
function C(){var K=Math.floor((Math.random()%1)*Math.pow(2,32));
var L=K.toString(B);
while(L.length<8){L="0"+L
}return L
}var J="-";
var E="4";
var D="8";
var I=C();
var H=C();
H=H.substring(0,4)+J+E+H.substring(5,8);
var G=C();
G=D+G.substring(1,4)+J+G.substring(4,8);
var F=C();
var A=I+J+H+J+G+F;
A=A.toLowerCase();
return A
}
};