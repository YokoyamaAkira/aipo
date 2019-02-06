dojo._xdResourceLoaded({depends:[["provide","dojox.uuid.generateRandomUuid"]],defineResource:function(A){if(!A._hasResource["dojox.uuid.generateRandomUuid"]){A._hasResource["dojox.uuid.generateRandomUuid"]=true;
A.provide("dojox.uuid.generateRandomUuid");
dojox.uuid.generateRandomUuid=function(){var C=16;
function D(){var L=Math.floor((Math.random()%1)*Math.pow(2,32));
var M=L.toString(C);
while(M.length<8){M="0"+M
}return M
}var K="-";
var F="4";
var E="8";
var J=D();
var I=D();
I=I.substring(0,4)+K+F+I.substring(5,8);
var H=D();
H=E+H.substring(1,4)+K+H.substring(4,8);
var G=D();
var B=J+K+I+K+H+G;
B=B.toLowerCase();
return B
}
}}});