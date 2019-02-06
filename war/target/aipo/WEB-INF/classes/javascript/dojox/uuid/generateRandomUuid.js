if(!dojo._hasResource["dojox.uuid.generateRandomUuid"]){dojo._hasResource["dojox.uuid.generateRandomUuid"]=true;
dojo.provide("dojox.uuid.generateRandomUuid");
dojox.uuid.generateRandomUuid=function(){var H=16;
function I(){var L=Math.floor((Math.random()%1)*Math.pow(2,32));
var K=L.toString(H);
while(K.length<8){K="0"+K
}return K
}var F="-";
var A="4";
var J="8";
var E=I();
var D=I();
D=D.substring(0,4)+F+A+D.substring(5,8);
var C=I();
C=J+C.substring(1,4)+F+C.substring(4,8);
var B=I();
var G=E+F+D+F+C+B;
G=G.toLowerCase();
return G
}
};