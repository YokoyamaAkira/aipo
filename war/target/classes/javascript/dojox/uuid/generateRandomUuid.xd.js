dojo._xdResourceLoaded({depends:[["provide","dojox.uuid.generateRandomUuid"]],defineResource:function(A){if(!A._hasResource["dojox.uuid.generateRandomUuid"]){A._hasResource["dojox.uuid.generateRandomUuid"]=true;
A.provide("dojox.uuid.generateRandomUuid");
dojox.uuid.generateRandomUuid=function(){var K=16;
function B(){var M=Math.floor((Math.random()%1)*Math.pow(2,32));
var L=M.toString(K);
while(L.length<8){L="0"+L
}return L
}var I="-";
var D="4";
var C="8";
var H=B();
var G=B();
G=G.substring(0,4)+I+D+G.substring(5,8);
var F=B();
F=C+F.substring(1,4)+I+F.substring(4,8);
var E=B();
var J=H+I+G+I+F+E;
J=J.toLowerCase();
return J
}
}}});