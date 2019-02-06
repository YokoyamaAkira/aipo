dojo._xdResourceLoaded({depends:[["provide","dojox.image.SlideShow"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dojox.image.SlideShow"]){A._hasResource["dojox.image.SlideShow"]=true;
A.provide("dojox.image.SlideShow");
A.require("dojo.fx");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dojox.image.SlideShow",[dijit._Widget,dijit._Templated],{imageHeight:375,imageWidth:500,title:"",titleTemplate:'@title <span class="slideShowCounterText">(@current of @total)</span>',noLink:false,loop:true,hasNav:true,images:[],pageSize:20,autoLoad:true,fixedHeight:false,imageStore:null,linkAttr:"link",imageLargeAttr:"imageUrl",titleAttr:"title",slideshowInterval:3,templateString:'<div dojoAttachPoint="outerNode" class="slideShowWrapper">\r\n\t<div style="position:relative;" dojoAttachPoint="innerWrapper">\r\n\t\t<div class="slideShowNav" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<div class="dijitInline slideShowTitle" dojoAttachPoint="titleNode">${title}</div>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="navNode" class="slideShowCtrl" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<span dojoAttachPoint="navPrev" class="slideShowCtrlPrev"></span>\r\n\t\t\t<span dojoAttachPoint="navPlay" class="slideShowCtrlPlay"></span>\r\n\t\t\t<span dojoAttachPoint="navNext" class="slideShowCtrlNext"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="largeNode" class="slideShowImageWrapper"></div>\t\t\r\n\t\t<div dojoAttachPoint="hiddenNode" class="slideShowHidden"></div>\r\n\t</div>\r\n</div>\r\n',_tempImgPath:A.moduleUrl("dojox.image","resources/images/1pixel.gif"),_imageCounter:0,_tmpImage:null,_request:null,postCreate:function(){this.inherited("postCreate",arguments);
var C=document.createElement("img");
C.setAttribute("width",this.imageWidth);
C.setAttribute("height",this.imageHeight);
if(this.hasNav){A.connect(this.outerNode,"onmouseover",function(D){try{B._showNav()
}catch(E){}});
A.connect(this.outerNode,"onmouseout",function(D){try{B._hideNav(D)
}catch(E){}})
}this.outerNode.style.width=this.imageWidth+"px";
C.setAttribute("src",this._tempImgPath);
var B=this;
this.largeNode.appendChild(C);
this._tmpImage=C;
this._currentImage=C;
this._fitSize(true);
this._loadImage(0,function(){B.showImage(0)
});
this._calcNavDimensions()
},setDataStore:function(D,E,B){this.reset();
var F=this;
this._request={query:{},start:((E.start)?E.start:0),count:((E.count)?E.count:this.pageSize),onBegin:function(H,G){F.maxPhotos=H
}};
if(E.query){A.mixin(this._request.query,E.query)
}if(B&&B.imageLargeAttr){this.imageLargeAttr=B.imageLargeAttr
}var F=this;
var C=function(G){F.showImage(0);
F._request.onComplete=null
};
this.imageStore=D;
this._request.onComplete=C;
this._request.start=0;
this.imageStore.fetch(this._request)
},reset:function(){while(this.largeNode.firstChild){this.largeNode.removeChild(this.largeNode.firstChild)
}this.largeNode.appendChild(this._tmpImage);
while(this.hiddenNode.firstChild){this.hiddenNode.removeChild(this.hiddenNode.firstChild)
}var C;
for(var B=0;
B<this.images.length;
B++){C=this.images[B];
if(C&&C.parentNode){C.parentNode.removeChild(C)
}}this.images=[];
this.isInitialized=false;
this._imageCounter=0
},isImageLoaded:function(B){return this.images&&this.images.length>index&&this.images[B]
},moveImageLoadingPointer:function(B){this._imageCounter=B
},destroy:function(){if(this._slideId){this._stop()
}this.inherited("destroy",arguments)
},showNextImage:function(D,C){if(D&&this._timerCancelled){return false
}if(this.imageIndex+1>=this.maxPhotos){if(D&&(this.loop||C)){this.imageIndex=-1
}else{if(this._slideId){this._stop()
}return false
}}var B=this;
this.showImage(this.imageIndex+1,function(){if(D){B._startTimer()
}});
return true
},toggleSlideShow:function(){if(this._slideId){this._stop()
}else{A.toggleClass(this.domNode,"slideShowPaused");
this._timerCancelled=false;
var B=this.showNextImage(true,true);
if(!B){this._stop()
}}},getShowTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageShow"
},getLoadTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageLoad"
},showImage:function(C,B){if(!B&&this._slideId){this.toggleSlideShow()
}var F=this;
var E=this.largeNode.getElementsByTagName("div");
this.imageIndex=C;
var D=function(){if(F.images[C]){while(F.largeNode.firstChild){F.largeNode.removeChild(F.largeNode.firstChild)
}F.images[C].style.opacity=0;
F.largeNode.appendChild(F.images[C]);
F._currentImage=F.images[C]._img;
F._fitSize();
var G=function(I,H,K){var J=F.images[C].firstChild;
if(J.tagName.toLowerCase()!="img"){J=J.firstChild
}title=J.getAttribute("title");
if(F._navShowing){F._showNav(true)
}A.publish(F.getShowTopicName(),[{index:C,title:title,url:J.getAttribute("src")}]);
if(B){B(I,H,K)
}F._setTitle(title)
};
A.fadeIn({node:F.images[C],duration:300,onEnd:G}).play()
}else{F._loadImage(C,function(){A.publish(F.getLoadTopicName(),[C]);
F.showImage(C,B)
})
}};
if(E&&E.length>0){A.fadeOut({node:E[0],duration:300,onEnd:function(){F.hiddenNode.appendChild(E[0]);
D()
}}).play()
}else{D()
}},_fitSize:function(B){if(!this.fixedHeight||B){var C=(this._currentImage.height+(this.hasNav?20:0));
A.style(this.innerWrapper,"height",C+"px");
return 
}A.style(this.largeNode,"paddingTop",this._getTopPadding()+"px")
},_getTopPadding:function(){if(!this.fixedHeight){return 0
}return(this.imageHeight-this._currentImage.height)/2
},_loadNextImage:function(){if(!this.autoLoad){return 
}while(this.images.length>=this._imageCounter&&this.images[this._imageCounter]){this._imageCounter++
}this._loadImage(this._imageCounter)
},_loadImage:function(C,D){if(this.images[C]||!this._request){return 
}var E=C-(C%this.pageSize);
this._request.start=E;
this._request.onComplete=function(G){var H=C-E;
if(G&&G.length>H){F(G[H])
}else{}};
var B=this;
var F=function(M){var I=B.imageStore.getValue(M,B.imageLargeAttr);
var L=document.createElement("img");
var H=document.createElement("div");
H._img=L;
var K=B.imageStore.getValue(M,B.linkAttr);
if(!K||B.noLink){H.appendChild(L)
}else{var J=document.createElement("a");
J.setAttribute("href",K);
J.setAttribute("target","_blank");
H.appendChild(J);
J.appendChild(L)
}H.setAttribute("id",B.id+"_imageDiv"+C);
A.connect(L,"onload",function(){B._fitImage(L);
H.setAttribute("width",B.imageWidth);
H.setAttribute("height",B.imageHeight);
A.publish(B.getLoadTopicName(),[C]);
B._loadNextImage();
if(D){D()
}});
B.hiddenNode.appendChild(H);
var N=document.createElement("div");
A.addClass(N,"slideShowTitle");
H.appendChild(N);
B.images[C]=H;
L.setAttribute("src",I);
var G=B.imageStore.getValue(M,B.titleAttr);
if(G){L.setAttribute("title",G)
}};
this.imageStore.fetch(this._request)
},_stop:function(){if(this._slideId){clearTimeout(this._slideId)
}this._slideId=null;
this._timerCancelled=true;
A.removeClass(this.domNode,"slideShowPaused")
},_prev:function(){if(this.imageIndex<1){return 
}this.showImage(this.imageIndex-1)
},_next:function(){this.showNextImage()
},_startTimer:function(){this._slideId=setTimeout("dijit.byId('"+this.id+"').showNextImage(true);",this.slideshowInterval*1000)
},_calcNavDimensions:function(){A.style(this.navNode,"position","absolute");
A.style(this.navNode,"left","-10000px");
A._setOpacity(this.navNode,99);
this.navPlay._size=A.marginBox(this.navPlay);
this.navPrev._size=A.marginBox(this.navPrev);
this.navNext._size=A.marginBox(this.navNext);
A._setOpacity(this.navNode,0);
A.style(this.navNode,"position","");
A.style(this.navNode,"left","")
},_setTitle:function(B){this.titleNode.innerHTML=this.titleTemplate.replace("@title",B).replace("@current",String(Number(this.imageIndex)+1)).replace("@total",String(this.maxPhotos))
},_fitImage:function(D){var B=D.width;
var C=D.height;
if(B>this.imageWidth){C=Math.floor(C*(this.imageWidth/B));
D.setAttribute("height",C+"px");
D.setAttribute("width",this.imageWidth+"px")
}if(C>this.imageHeight){B=Math.floor(B*(this.imageHeight/C));
D.setAttribute("height",this.imageHeight+"px");
D.setAttribute("width",B+"px")
}},_handleClick:function(B){switch(B.target){case this.navNext:this._next();
break;
case this.navPrev:this._prev();
break;
case this.navPlay:this.toggleSlideShow();
break
}},_showNav:function(E){if(this._navShowing&&!E){return 
}A.style(this.navNode,"marginTop","0px");
A.style(this.navPlay,"marginLeft","0px");
var C=A.marginBox(this.outerNode);
var D=this._currentImage.height-this.navPlay._size.h-10+this._getTopPadding();
if(D>this._currentImage.height){D+=10
}A[this.imageIndex<1?"addClass":"removeClass"](this.navPrev,"slideShowCtrlHide");
A[this.imageIndex+1>=this.maxPhotos?"addClass":"removeClass"](this.navNext,"slideShowCtrlHide");
var B=this;
if(this._navAnim){this._navAnim.stop()
}if(this._navShowing){return 
}this._navAnim=A.fadeIn({node:this.navNode,duration:300,onEnd:function(){B._navAnim=null
}});
this._navAnim.play();
this._navShowing=true
},_hideNav:function(C){if(!C||!this._overElement(this.outerNode,C)){var B=this;
if(this._navAnim){this._navAnim.stop()
}this._navAnim=A.fadeOut({node:this.navNode,duration:300,onEnd:function(){B._navAnim=null
}});
this._navAnim.play();
this._navShowing=false
}},_overElement:function(D,F){if(typeof (A)=="undefined"){return false
}D=A.byId(D);
var C={x:F.pageX,y:F.pageY};
var G=A._getBorderBox(D);
var B=A.coords(D,true);
var E=B.x;
return(C.x>=E&&C.x<=(E+G.w)&&C.y>=B.y&&C.y<=(top+G.h))
}})
}}});