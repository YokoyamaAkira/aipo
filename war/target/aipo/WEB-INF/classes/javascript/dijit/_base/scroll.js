if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(B){if(dojo.isIE){if(dojo.marginBox(B.parentNode).h<=B.parentNode.scrollHeight){B.scrollIntoView(false)
}}else{if(dojo.isMozilla){B.scrollIntoView(false)
}else{var D=B.parentNode;
var A=D.scrollTop+dojo.marginBox(D).h;
var C=B.offsetTop+dojo.marginBox(B).h;
if(A<C){D.scrollTop+=(C-A)
}else{if(D.scrollTop>B.offsetTop){D.scrollTop-=(D.scrollTop-B.offsetTop)
}}}}}
};