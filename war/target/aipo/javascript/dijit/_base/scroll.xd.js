dojo._xdResourceLoaded({depends:[["provide","dijit._base.scroll"]],defineResource:function(A){if(!A._hasResource["dijit._base.scroll"]){A._hasResource["dijit._base.scroll"]=true;
A.provide("dijit._base.scroll");
dijit.scrollIntoView=function(D){if(A.isIE){if(A.marginBox(D.parentNode).h<=D.parentNode.scrollHeight){D.scrollIntoView(false)
}}else{if(A.isMozilla){D.scrollIntoView(false)
}else{var B=D.parentNode;
var C=B.scrollTop+A.marginBox(B).h;
var E=D.offsetTop+A.marginBox(D).h;
if(C<E){B.scrollTop+=(E-C)
}else{if(B.scrollTop>D.offsetTop){B.scrollTop-=(B.scrollTop-D.offsetTop)
}}}}}
}}});