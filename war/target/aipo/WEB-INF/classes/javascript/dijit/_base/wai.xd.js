dojo._xdResourceLoaded({depends:[["provide","dijit._base.wai"]],defineResource:function(A){if(!A._hasResource["dijit._base.wai"]){A._hasResource["dijit._base.wai"]=true;
A.provide("dijit._base.wai");
dijit.wai={onload:function(){var C=document.createElement("div");
C.id="a11yTestNode";
C.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+A.moduleUrl("dijit","form/templates/blank.gif")+'");';
A.body().appendChild(C);
function B(){var E=A.getComputedStyle(C);
if(E){var D=E.backgroundImage;
var F=(E.borderTopColor==E.borderRightColor)||(D!=null&&(D=="none"||D=="url(invalid-url:)"));
A[F?"addClass":"removeClass"](A.body(),"dijit_a11y")
}}B();
if(A.isIE){setInterval(B,4000)
}}};
if(A.isIE||A.isMoz){A._loaders.unshift(dijit.wai.onload)
}A.mixin(dijit,{hasWaiRole:function(B){if(B.hasAttribute){return B.hasAttribute("role")
}else{return B.getAttribute("role")?true:false
}},getWaiRole:function(C){var D=C.getAttribute("role");
if(D){var B=D.indexOf(":");
return B==-1?D:D.substring(B+1)
}else{return""
}},setWaiRole:function(B,C){if(A.isFF&&A.isFF<3){B.setAttribute("role","wairole:"+C)
}else{B.setAttribute("role",C)
}},removeWaiRole:function(B){B.removeAttribute("role")
},hasWaiState:function(B,C){if(A.isFF&&A.isFF<3){return B.hasAttributeNS("http://www.w3.org/2005/07/aaa",C)
}else{if(B.hasAttribute){return B.hasAttribute("aria-"+C)
}else{return B.getAttribute("aria-"+C)?true:false
}}},getWaiState:function(B,D){if(A.isFF&&A.isFF<3){return B.getAttributeNS("http://www.w3.org/2005/07/aaa",D)
}else{var C=B.getAttribute("aria-"+D);
return C?C:""
}},setWaiState:function(B,D,C){if(A.isFF&&A.isFF<3){B.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+D,C)
}else{B.setAttribute("aria-"+D,C)
}},removeWaiState:function(B,C){if(A.isFF&&A.isFF<3){B.removeAttributeNS("http://www.w3.org/2005/07/aaa",C)
}else{B.removeAttribute("aria-"+C)
}}})
}}});