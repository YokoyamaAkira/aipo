if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var B=document.createElement("div");
B.id="a11yTestNode";
B.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(B);
function A(){var D=dojo.getComputedStyle(B);
if(D){var C=D.backgroundImage;
var E=(D.borderTopColor==D.borderRightColor)||(C!=null&&(C=="none"||C=="url(invalid-url:)"));
dojo[E?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}A();
if(dojo.isIE){setInterval(A,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(A){if(A.hasAttribute){return A.hasAttribute("role")
}else{return A.getAttribute("role")?true:false
}},getWaiRole:function(B){var C=B.getAttribute("role");
if(C){var A=C.indexOf(":");
return A==-1?C:C.substring(A+1)
}else{return""
}},setWaiRole:function(A,B){if(dojo.isFF&&dojo.isFF<3){A.setAttribute("role","wairole:"+B)
}else{A.setAttribute("role",B)
}},removeWaiRole:function(A){A.removeAttribute("role")
},hasWaiState:function(A,B){if(dojo.isFF&&dojo.isFF<3){return A.hasAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{if(A.hasAttribute){return A.hasAttribute("aria-"+B)
}else{return A.getAttribute("aria-"+B)?true:false
}}},getWaiState:function(A,C){if(dojo.isFF&&dojo.isFF<3){return A.getAttributeNS("http://www.w3.org/2005/07/aaa",C)
}else{var B=A.getAttribute("aria-"+C);
return B?B:""
}},setWaiState:function(A,C,B){if(dojo.isFF&&dojo.isFF<3){A.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+C,B)
}else{A.setAttribute("aria-"+C,B)
}},removeWaiState:function(A,B){if(dojo.isFF&&dojo.isFF<3){A.removeAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{A.removeAttribute("aria-"+B)
}}})
};