if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(C){if(dojo.isIE){if(dojo.marginBox(C.parentNode).h<=C.parentNode.scrollHeight){C.scrollIntoView(false)
}}else{if(dojo.isMozilla){C.scrollIntoView(false)
}else{var A=C.parentNode;
var B=A.scrollTop+dojo.marginBox(A).h;
var D=C.offsetTop+dojo.marginBox(C).h;
if(B<D){A.scrollTop+=(D-B)
}else{if(A.scrollTop>C.offsetTop){A.scrollTop-=(A.scrollTop-C.offsetTop)
}}}}}
};