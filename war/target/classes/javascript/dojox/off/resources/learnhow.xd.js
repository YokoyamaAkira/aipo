dojo._xdResourceLoaded({defineResource:function(A){window.onload=function(){var K=window.location.href;
var F=K.match(/appName=([a-z0-9 \%]*)/i);
var H="Application";
if(F&&F.length>0){H=decodeURIComponent(F[1])
}var G=document.getElementById("dot-learn-how-app-name");
G.innerHTML="";
G.appendChild(document.createTextNode(H));
F=K.match(/hasOfflineCache=(true|false)/);
var D=false;
if(F&&F.length>0){D=F[1];
D=(D=="true")?true:false
}if(D==true){var C=document.getElementById("dot-download-step");
var E=document.getElementById("dot-install-step");
C.parentNode.removeChild(C);
E.parentNode.removeChild(E)
}F=K.match(/runLink=([^\&]*)\&runLinkText=([^\&]*)/);
if(F&&F.length>0){var B=decodeURIComponent(F[1]);
var J=document.getElementById("dot-learn-how-run-link");
J.setAttribute("href",B);
var I=decodeURIComponent(F[2]);
J.innerHTML="";
J.appendChild(document.createTextNode(I))
}}
}});