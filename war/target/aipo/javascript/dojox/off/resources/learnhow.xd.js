dojo._xdResourceLoaded({defineResource:function(A){window.onload=function(){var C=window.location.href;
var H=C.match(/appName=([a-z0-9 \%]*)/i);
var J="Application";
if(H&&H.length>0){J=decodeURIComponent(H[1])
}var I=document.getElementById("dot-learn-how-app-name");
I.innerHTML="";
I.appendChild(document.createTextNode(J));
H=C.match(/hasOfflineCache=(true|false)/);
var F=false;
if(H&&H.length>0){F=H[1];
F=(F=="true")?true:false
}if(F==true){var E=document.getElementById("dot-download-step");
var G=document.getElementById("dot-install-step");
E.parentNode.removeChild(E);
G.parentNode.removeChild(G)
}H=C.match(/runLink=([^\&]*)\&runLinkText=([^\&]*)/);
if(H&&H.length>0){var D=decodeURIComponent(H[1]);
var B=document.getElementById("dot-learn-how-run-link");
B.setAttribute("href",D);
var K=decodeURIComponent(H[2]);
B.innerHTML="";
B.appendChild(document.createTextNode(K))
}}
}});