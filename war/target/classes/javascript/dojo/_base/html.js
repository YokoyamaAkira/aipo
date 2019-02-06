if(!dojo._hasResource["dojo._base.html"]){dojo._hasResource["dojo._base.html"]=true;
dojo.require("dojo._base.lang");
dojo.provide("dojo._base.html");
try{document.execCommand("BackgroundImageCache",false,true)
}catch(e){}if(dojo.isIE||dojo.isOpera){dojo.byId=function(E,C){if(dojo.isString(E)){var A=C||dojo.doc;
var D=A.getElementById(E);
if(D&&D.attributes.id.value==E){return D
}else{var F=A.all[E];
if(!F){return 
}if(!F.length){return F
}var B=0;
while((D=F[B++])){if(D.attributes.id.value==E){return D
}}}}else{return E
}}
}else{dojo.byId=function(A,B){if(dojo.isString(A)){return(B||dojo.doc).getElementById(A)
}else{return A
}}
}(function(){var _destroyContainer=null;
dojo._destroyElement=function(node){node=dojo.byId(node);
try{if(!_destroyContainer){_destroyContainer=document.createElement("div")
}_destroyContainer.appendChild(node.parentNode?node.parentNode.removeChild(node):node);
_destroyContainer.innerHTML=""
}catch(e){}};
dojo.isDescendant=function(node,ancestor){try{node=dojo.byId(node);
ancestor=dojo.byId(ancestor);
while(node){if(node===ancestor){return true
}node=node.parentNode
}}catch(e){return -1
}return false
};
dojo.setSelectable=function(node,selectable){node=dojo.byId(node);
if(dojo.isMozilla){node.style.MozUserSelect=selectable?"":"none"
}else{if(dojo.isKhtml){node.style.KhtmlUserSelect=selectable?"auto":"none"
}else{if(dojo.isIE){node.unselectable=selectable?"":"on";
dojo.query("*",node).forEach(function(descendant){descendant.unselectable=selectable?"":"on"
})
}}}};
var _insertBefore=function(node,ref){ref.parentNode.insertBefore(node,ref);
return true
};
var _insertAfter=function(node,ref){var pn=ref.parentNode;
if(ref==pn.lastChild){pn.appendChild(node)
}else{return _insertBefore(node,ref.nextSibling)
}return true
};
dojo.place=function(node,refNode,position){if(!node||!refNode||position===undefined){return false
}node=dojo.byId(node);
refNode=dojo.byId(refNode);
if(typeof position=="number"){var cn=refNode.childNodes;
if((position==0&&cn.length==0)||cn.length==position){refNode.appendChild(node);
return true
}if(position==0){return _insertBefore(node,refNode.firstChild)
}return _insertAfter(node,cn[position-1])
}switch(position.toLowerCase()){case"before":return _insertBefore(node,refNode);
case"after":return _insertAfter(node,refNode);
case"first":if(refNode.firstChild){return _insertBefore(node,refNode.firstChild)
}else{refNode.appendChild(node);
return true
}break;
default:refNode.appendChild(node);
return true
}};
dojo.boxModel="content-box";
if(dojo.isIE){var _dcm=document.compatMode;
dojo.boxModel=(_dcm=="BackCompat")||(_dcm=="QuirksMode")||(dojo.isIE<6)?"border-box":"content-box"
}var gcs,dv=document.defaultView;
if(dojo.isSafari){gcs=function(node){var s=dv.getComputedStyle(node,null);
if(!s&&node.style){node.style.display="";
s=dv.getComputedStyle(node,null)
}return s||{}
}
}else{if(dojo.isIE){gcs=function(node){return node.currentStyle
}
}else{gcs=function(node){return dv.getComputedStyle(node,null)
}
}}dojo.getComputedStyle=gcs;
if(!dojo.isIE){dojo._toPixelValue=function(element,value){return parseFloat(value)||0
}
}else{dojo._toPixelValue=function(element,avalue){if(!avalue){return 0
}if(avalue=="medium"){return 4
}if(avalue.slice&&(avalue.slice(-2)=="px")){return parseFloat(avalue)
}with(element){var sLeft=style.left;
var rsLeft=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{style.left=avalue;
avalue=style.pixelLeft
}catch(e){avalue=0
}style.left=sLeft;
runtimeStyle.left=rsLeft
}return avalue
}
}dojo._getOpacity=(dojo.isIE?function(node){try{return(node.filters.alpha.opacity/100)
}catch(e){return 1
}}:function(node){return dojo.getComputedStyle(node).opacity
});
dojo._setOpacity=(dojo.isIE?function(node,opacity){if(opacity==1){node.style.cssText=node.style.cssText.replace(/FILTER:[^;]*;/i,"");
if(node.nodeName.toLowerCase()=="tr"){dojo.query("> td",node).forEach(function(i){i.style.cssText=i.style.cssText.replace(/FILTER:[^;]*;/i,"")
})
}}else{var o="Alpha(Opacity="+(opacity*100)+")";
node.style.filter=o
}if(node.nodeName.toLowerCase()=="tr"){dojo.query("> td",node).forEach(function(i){i.style.filter=o
})
}return opacity
}:function(node,opacity){return node.style.opacity=opacity
});
var _pixelNamesCache={width:true,height:true,left:true,top:true};
var _toStyleValue=function(node,type,value){type=type.toLowerCase();
if(_pixelNamesCache[type]===true){return dojo._toPixelValue(node,value)
}else{if(_pixelNamesCache[type]===false){return value
}else{if(dojo.isOpera&&type=="cssText"){}if((type.indexOf("margin")>=0)||(type.indexOf("padding")>=0)||(type.indexOf("width")>=0)||(type.indexOf("height")>=0)||(type.indexOf("max")>=0)||(type.indexOf("min")>=0)||(type.indexOf("offset")>=0)){_pixelNamesCache[type]=true;
return dojo._toPixelValue(node,value)
}else{_pixelNamesCache[type]=false;
return value
}}}};
dojo.style=function(node,style,value){var n=dojo.byId(node),args=arguments.length,op=(style=="opacity");
if(args==3){return op?dojo._setOpacity(n,value):n.style[style]=value
}if(args==2&&op){return dojo._getOpacity(n)
}var s=dojo.getComputedStyle(n);
return(args==1)?s:_toStyleValue(n,style,s[style])
};
dojo._getPadExtents=function(n,computedStyle){var s=computedStyle||gcs(n),px=dojo._toPixelValue,l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return{l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)}
};
dojo._getBorderExtents=function(n,computedStyle){var ne="none",px=dojo._toPixelValue,s=computedStyle||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return{l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)}
};
dojo._getPadBorderExtents=function(n,computedStyle){var s=computedStyle||gcs(n),p=dojo._getPadExtents(n,s),b=dojo._getBorderExtents(n,s);
return{l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h}
};
dojo._getMarginExtents=function(n,computedStyle){var s=computedStyle||gcs(n),px=dojo._toPixelValue,l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(dojo.isSafari&&(s.position!="absolute")){r=l
}return{l:l,t:t,w:l+r,h:t+b}
};
dojo._getMarginBox=function(node,computedStyle){var s=computedStyle||gcs(node),me=dojo._getMarginExtents(node,s);
var l=node.offsetLeft-me.l,t=node.offsetTop-me.t;
if(dojo.isMoz){var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){l=sl,t=st
}else{var p=node.parentNode;
if(p&&p.style){var pcs=gcs(p);
if(pcs.overflow!="visible"){var be=dojo._getBorderExtents(p,pcs);
l+=be.l,t+=be.t
}}}}else{if(dojo.isOpera){var p=node.parentNode;
if(p){var be=dojo._getBorderExtents(p);
l-=be.l,t-=be.t
}}}return{l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h}
};
dojo._getContentBox=function(node,computedStyle){var s=computedStyle||gcs(node),pe=dojo._getPadExtents(node,s),be=dojo._getBorderExtents(node,s),w=node.clientWidth,h;
if(!w){w=node.offsetWidth,h=node.offsetHeight
}else{h=node.clientHeight,be.w=be.h=0
}if(dojo.isOpera){pe.l+=be.l;
pe.t+=be.t
}return{l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h}
};
dojo._getBorderBox=function(node,computedStyle){var s=computedStyle||gcs(node),pe=dojo._getPadExtents(node,s),cb=dojo._getContentBox(node,s);
return{l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h}
};
dojo._setBox=function(node,l,t,w,h,u){u=u||"px";
with(node.style){if(!isNaN(l)){left=l+u
}if(!isNaN(t)){top=t+u
}if(w>=0){width=w+u
}if(h>=0){height=h+u
}}};
dojo._usesBorderBox=function(node){var n=node.tagName;
return dojo.boxModel=="border-box"||n=="TABLE"||n=="BUTTON"
};
dojo._setContentSize=function(node,widthPx,heightPx,computedStyle){var bb=dojo._usesBorderBox(node);
if(bb){var pb=dojo._getPadBorderExtents(node,computedStyle);
if(widthPx>=0){widthPx+=pb.w
}if(heightPx>=0){heightPx+=pb.h
}}dojo._setBox(node,NaN,NaN,widthPx,heightPx)
};
dojo._setMarginBox=function(node,leftPx,topPx,widthPx,heightPx,computedStyle){var s=computedStyle||dojo.getComputedStyle(node);
var bb=dojo._usesBorderBox(node),pb=bb?_nilExtents:dojo._getPadBorderExtents(node,s),mb=dojo._getMarginExtents(node,s);
if(widthPx>=0){widthPx=Math.max(widthPx-pb.w-mb.w,0)
}if(heightPx>=0){heightPx=Math.max(heightPx-pb.h-mb.h,0)
}dojo._setBox(node,leftPx,topPx,widthPx,heightPx)
};
var _nilExtents={l:0,t:0,w:0,h:0};
dojo.marginBox=function(node,box){var n=dojo.byId(node),s=gcs(n),b=box;
return !b?dojo._getMarginBox(n,s):dojo._setMarginBox(n,b.l,b.t,b.w,b.h,s)
};
dojo.contentBox=function(node,box){var n=dojo.byId(node),s=gcs(n),b=box;
return !b?dojo._getContentBox(n,s):dojo._setContentSize(n,b.w,b.h,s)
};
var _sumAncestorProperties=function(node,prop){if(!(node=(node||0).parentNode)){return 0
}var val,retVal=0,_b=dojo.body();
while(node&&node.style){if(gcs(node).position=="fixed"){return 0
}val=node[prop];
if(val){retVal+=val-0;
if(node==_b){break
}}node=node.parentNode
}return retVal
};
dojo._docScroll=function(){var _b=dojo.body();
var _w=dojo.global;
var de=dojo.doc.documentElement;
return{y:(_w.pageYOffset||de.scrollTop||_b.scrollTop||0),x:(_w.pageXOffset||dojo._fixIeBiDiScrollLeft(de.scrollLeft)||_b.scrollLeft||0)}
};
dojo._isBodyLtr=function(){return !("_bodyLtr" in dojo)?dojo._bodyLtr=dojo.getComputedStyle(dojo.body()).direction=="ltr":dojo._bodyLtr
};
dojo._getIeDocumentElementOffset=function(){var de=dojo.doc.documentElement;
if(dojo.isIE>=7){return{x:de.getBoundingClientRect().left,y:de.getBoundingClientRect().top}
}else{return{x:dojo._isBodyLtr()||window.parent==window?de.clientLeft:de.offsetWidth-de.clientWidth-de.clientLeft,y:de.clientTop}
}};
dojo._fixIeBiDiScrollLeft=function(scrollLeft){if(dojo.isIE&&!dojo._isBodyLtr()){var de=dojo.doc.documentElement;
return scrollLeft+de.clientWidth-de.scrollWidth
}return scrollLeft
};
dojo._abs=function(node,includeScroll){var ownerDocument=node.ownerDocument;
var ret={x:0,y:0};
var hasScroll=false;
var db=dojo.body();
if(dojo.isIE){var client=node.getBoundingClientRect();
var offset=dojo._getIeDocumentElementOffset();
ret.x=client.left-offset.x;
ret.y=client.top-offset.y
}else{if(ownerDocument.getBoxObjectFor){var bo=ownerDocument.getBoxObjectFor(node);
ret.x=bo.x-_sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-_sumAncestorProperties(node,"scrollTop")
}else{if(node.offsetParent){hasScroll=true;
var endNode;
if(dojo.isSafari&&(gcs(node).position=="absolute")&&(node.parentNode==db)){endNode=db
}else{endNode=db.parentNode
}if(node.parentNode!=db){var nd=node;
if(dojo.isOpera||(dojo.isSafari>=3)){nd=db
}ret.x-=_sumAncestorProperties(nd,"scrollLeft");
ret.y-=_sumAncestorProperties(nd,"scrollTop")
}var curnode=node;
do{var n=curnode.offsetLeft;
if(!dojo.isOpera||n>0){ret.x+=isNaN(n)?0:n
}var m=curnode.offsetTop;
ret.y+=isNaN(m)?0:m;
curnode=curnode.offsetParent
}while((curnode!=endNode)&&curnode)
}else{if(node.x&&node.y){ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y
}}}}if(hasScroll||includeScroll){var scroll=dojo._docScroll();
var m=hasScroll?(!includeScroll?-1:0):1;
ret.y+=m*scroll.y;
ret.x+=m*scroll.x
}return ret
};
dojo.coords=function(node,includeScroll){var n=dojo.byId(node),s=gcs(n),mb=dojo._getMarginBox(n,s);
var abs=dojo._abs(n,includeScroll);
mb.x=abs.x;
mb.y=abs.y;
return mb
}
})();
dojo.hasClass=function(A,B){return((" "+dojo.byId(A).className+" ").indexOf(" "+B+" ")>=0)
};
dojo.addClass=function(B,A){B=dojo.byId(B);
var C=B.className;
if((" "+C+" ").indexOf(" "+A+" ")<0){B.className=C+(C?" ":"")+A
}};
dojo.removeClass=function(B,A){B=dojo.byId(B);
var C=dojo.trim((" "+B.className+" ").replace(" "+A+" "," "));
if(B.className!=C){B.className=C
}};
dojo.toggleClass=function(A,C,B){if(B===undefined){B=!dojo.hasClass(A,C)
}dojo[B?"addClass":"removeClass"](A,C)
}
};