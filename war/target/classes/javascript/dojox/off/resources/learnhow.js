window.onload=function(){var B=window.location.href;
var G=B.match(/appName=([a-z0-9 \%]*)/i);
var I="Application";
if(G&&G.length>0){I=decodeURIComponent(G[1])
}var H=document.getElementById("dot-learn-how-app-name");
H.innerHTML="";
H.appendChild(document.createTextNode(I));
G=B.match(/hasOfflineCache=(true|false)/);
var E=false;
if(G&&G.length>0){E=G[1];
E=(E=="true")?true:false
}if(E==true){var D=document.getElementById("dot-download-step");
var F=document.getElementById("dot-install-step");
D.parentNode.removeChild(D);
F.parentNode.removeChild(F)
}G=B.match(/runLink=([^\&]*)\&runLinkText=([^\&]*)/);
if(G&&G.length>0){var C=decodeURIComponent(G[1]);
var A=document.getElementById("dot-learn-how-run-link");
A.setAttribute("href",C);
var J=decodeURIComponent(G[2]);
A.innerHTML="";
A.appendChild(document.createTextNode(J))
}};