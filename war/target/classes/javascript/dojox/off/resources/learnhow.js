window.onload=function(){var H=window.location.href;
var C=H.match(/appName=([a-z0-9 \%]*)/i);
var E="Application";
if(C&&C.length>0){E=decodeURIComponent(C[1])
}var D=document.getElementById("dot-learn-how-app-name");
D.innerHTML="";
D.appendChild(document.createTextNode(E));
C=H.match(/hasOfflineCache=(true|false)/);
var A=false;
if(C&&C.length>0){A=C[1];
A=(A=="true")?true:false
}if(A==true){var J=document.getElementById("dot-download-step");
var B=document.getElementById("dot-install-step");
J.parentNode.removeChild(J);
B.parentNode.removeChild(B)
}C=H.match(/runLink=([^\&]*)\&runLinkText=([^\&]*)/);
if(C&&C.length>0){var I=decodeURIComponent(C[1]);
var G=document.getElementById("dot-learn-how-run-link");
G.setAttribute("href",I);
var F=decodeURIComponent(C[2]);
G.innerHTML="";
G.appendChild(document.createTextNode(F))
}};