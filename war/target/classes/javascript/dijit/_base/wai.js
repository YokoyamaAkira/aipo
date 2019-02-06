if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var A=document.createElement("div");
A.id="a11yTestNode";
A.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(A);
function B(){var E=dojo.getComputedStyle(A);
if(E){var D=E.backgroundImage;
var C=(E.borderTopColor==E.borderRightColor)||(D!=null&&(D=="none"||D=="url(invalid-url:)"));
dojo[C?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}B();
if(dojo.isIE){setInterval(B,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(A){if(A.hasAttribute){return A.hasAttribute("role")
}else{return A.getAttribute("role")?true:false
}},getWaiRole:function(A){var B=A.getAttribute("role");
if(B){var C=B.indexOf(":");
return C==-1?B:B.substring(C+1)
}else{return""
}},setWaiRole:function(B,A){if(dojo.isFF&&dojo.isFF<3){B.setAttribute("role","wairole:"+A)
}else{B.setAttribute("role",A)
}},removeWaiRole:function(A){A.removeAttribute("role")
},hasWaiState:function(B,A){if(dojo.isFF&&dojo.isFF<3){return B.hasAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{if(B.hasAttribute){return B.hasAttribute("aria-"+A)
}else{return B.getAttribute("aria-"+A)?true:false
}}},getWaiState:function(C,B){if(dojo.isFF&&dojo.isFF<3){return C.getAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{var A=C.getAttribute("aria-"+B);
return A?A:""
}},setWaiState:function(C,B,A){if(dojo.isFF&&dojo.isFF<3){C.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+B,A)
}else{C.setAttribute("aria-"+B,A)
}},removeWaiState:function(B,A){if(dojo.isFF&&dojo.isFF<3){B.removeAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{B.removeAttribute("aria-"+A)
}}})
};