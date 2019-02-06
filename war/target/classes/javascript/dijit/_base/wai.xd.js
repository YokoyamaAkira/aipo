dojo._xdResourceLoaded({depends:[["provide","dijit._base.wai"]],defineResource:function(A){if(!A._hasResource["dijit._base.wai"]){A._hasResource["dijit._base.wai"]=true;
A.provide("dijit._base.wai");
dijit.wai={onload:function(){var B=document.createElement("div");
B.id="a11yTestNode";
B.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+A.moduleUrl("dijit","form/templates/blank.gif")+'");';
A.body().appendChild(B);
function C(){var E=A.getComputedStyle(B);
if(E){var D=E.backgroundImage;
var F=(E.borderTopColor==E.borderRightColor)||(D!=null&&(D=="none"||D=="url(invalid-url:)"));
A[F?"addClass":"removeClass"](A.body(),"dijit_a11y")
}}C();
if(A.isIE){setInterval(C,4000)
}}};
if(A.isIE||A.isMoz){A._loaders.unshift(dijit.wai.onload)
}A.mixin(dijit,{hasWaiRole:function(B){if(B.hasAttribute){return B.hasAttribute("role")
}else{return B.getAttribute("role")?true:false
}},getWaiRole:function(D){var B=D.getAttribute("role");
if(B){var C=B.indexOf(":");
return C==-1?B:B.substring(C+1)
}else{return""
}},setWaiRole:function(C,B){if(A.isFF&&A.isFF<3){C.setAttribute("role","wairole:"+B)
}else{C.setAttribute("role",B)
}},removeWaiRole:function(B){B.removeAttribute("role")
},hasWaiState:function(C,B){if(A.isFF&&A.isFF<3){return C.hasAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{if(C.hasAttribute){return C.hasAttribute("aria-"+B)
}else{return C.getAttribute("aria-"+B)?true:false
}}},getWaiState:function(C,B){if(A.isFF&&A.isFF<3){return C.getAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{var D=C.getAttribute("aria-"+B);
return D?D:""
}},setWaiState:function(C,B,D){if(A.isFF&&A.isFF<3){C.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+B,D)
}else{C.setAttribute("aria-"+B,D)
}},removeWaiState:function(C,B){if(A.isFF&&A.isFF<3){C.removeAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{C.removeAttribute("aria-"+B)
}}})
}}});