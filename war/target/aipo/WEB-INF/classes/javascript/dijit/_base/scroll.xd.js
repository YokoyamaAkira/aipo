dojo._xdResourceLoaded({depends:[["provide","dijit._base.scroll"]],defineResource:function(A){if(!A._hasResource["dijit._base.scroll"]){A._hasResource["dijit._base.scroll"]=true;
A.provide("dijit._base.scroll");
dijit.scrollIntoView=function(E){if(A.isIE){if(A.marginBox(E.parentNode).h<=E.parentNode.scrollHeight){E.scrollIntoView(false)
}}else{if(A.isMozilla){E.scrollIntoView(false)
}else{var C=E.parentNode;
var D=C.scrollTop+A.marginBox(C).h;
var B=E.offsetTop+A.marginBox(E).h;
if(D<B){C.scrollTop+=(B-D)
}else{if(C.scrollTop>E.offsetTop){C.scrollTop-=(C.scrollTop-E.offsetTop)
}}}}}
}}});