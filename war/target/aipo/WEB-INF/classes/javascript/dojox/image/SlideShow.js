if(!dojo._hasResource["dojox.image.SlideShow"]){dojo._hasResource["dojox.image.SlideShow"]=true;
dojo.provide("dojox.image.SlideShow");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dojox.image.SlideShow",[dijit._Widget,dijit._Templated],{imageHeight:375,imageWidth:500,title:"",titleTemplate:'@title <span class="slideShowCounterText">(@current of @total)</span>',noLink:false,loop:true,hasNav:true,images:[],pageSize:20,autoLoad:true,fixedHeight:false,imageStore:null,linkAttr:"link",imageLargeAttr:"imageUrl",titleAttr:"title",slideshowInterval:3,templateString:'<div dojoAttachPoint="outerNode" class="slideShowWrapper">\r\n\t<div style="position:relative;" dojoAttachPoint="innerWrapper">\r\n\t\t<div class="slideShowNav" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<div class="dijitInline slideShowTitle" dojoAttachPoint="titleNode">${title}</div>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="navNode" class="slideShowCtrl" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<span dojoAttachPoint="navPrev" class="slideShowCtrlPrev"></span>\r\n\t\t\t<span dojoAttachPoint="navPlay" class="slideShowCtrlPlay"></span>\r\n\t\t\t<span dojoAttachPoint="navNext" class="slideShowCtrlNext"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="largeNode" class="slideShowImageWrapper"></div>\t\t\r\n\t\t<div dojoAttachPoint="hiddenNode" class="slideShowHidden"></div>\r\n\t</div>\r\n</div>\r\n',_tempImgPath:dojo.moduleUrl("dojox.image","resources/images/1pixel.gif"),_imageCounter:0,_tmpImage:null,_request:null,postCreate:function(){this.inherited("postCreate",arguments);
var B=document.createElement("img");
B.setAttribute("width",this.imageWidth);
B.setAttribute("height",this.imageHeight);
if(this.hasNav){dojo.connect(this.outerNode,"onmouseover",function(D){try{A._showNav()
}catch(C){}});
dojo.connect(this.outerNode,"onmouseout",function(D){try{A._hideNav(D)
}catch(C){}})
}this.outerNode.style.width=this.imageWidth+"px";
B.setAttribute("src",this._tempImgPath);
var A=this;
this.largeNode.appendChild(B);
this._tmpImage=B;
this._currentImage=B;
this._fitSize(true);
this._loadImage(0,function(){A.showImage(0)
});
this._calcNavDimensions()
},setDataStore:function(A,B,D){this.reset();
var C=this;
this._request={query:{},start:((B.start)?B.start:0),count:((B.count)?B.count:this.pageSize),onBegin:function(F,G){C.maxPhotos=F
}};
if(B.query){dojo.mixin(this._request.query,B.query)
}if(D&&D.imageLargeAttr){this.imageLargeAttr=D.imageLargeAttr
}var C=this;
var E=function(F){C.showImage(0);
C._request.onComplete=null
};
this.imageStore=A;
this._request.onComplete=E;
this._request.start=0;
this.imageStore.fetch(this._request)
},reset:function(){while(this.largeNode.firstChild){this.largeNode.removeChild(this.largeNode.firstChild)
}this.largeNode.appendChild(this._tmpImage);
while(this.hiddenNode.firstChild){this.hiddenNode.removeChild(this.hiddenNode.firstChild)
}var B;
for(var A=0;
A<this.images.length;
A++){B=this.images[A];
if(B&&B.parentNode){B.parentNode.removeChild(B)
}}this.images=[];
this.isInitialized=false;
this._imageCounter=0
},isImageLoaded:function(A){return this.images&&this.images.length>index&&this.images[A]
},moveImageLoadingPointer:function(A){this._imageCounter=A
},destroy:function(){if(this._slideId){this._stop()
}this.inherited("destroy",arguments)
},showNextImage:function(A,C){if(A&&this._timerCancelled){return false
}if(this.imageIndex+1>=this.maxPhotos){if(A&&(this.loop||C)){this.imageIndex=-1
}else{if(this._slideId){this._stop()
}return false
}}var B=this;
this.showImage(this.imageIndex+1,function(){if(A){B._startTimer()
}});
return true
},toggleSlideShow:function(){if(this._slideId){this._stop()
}else{dojo.toggleClass(this.domNode,"slideShowPaused");
this._timerCancelled=false;
var A=this.showNextImage(true,true);
if(!A){this._stop()
}}},getShowTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageShow"
},getLoadTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageLoad"
},showImage:function(E,D){if(!D&&this._slideId){this.toggleSlideShow()
}var C=this;
var B=this.largeNode.getElementsByTagName("div");
this.imageIndex=E;
var A=function(){if(C.images[E]){while(C.largeNode.firstChild){C.largeNode.removeChild(C.largeNode.firstChild)
}C.images[E].style.opacity=0;
C.largeNode.appendChild(C.images[E]);
C._currentImage=C.images[E]._img;
C._fitSize();
var F=function(H,G,J){var I=C.images[E].firstChild;
if(I.tagName.toLowerCase()!="img"){I=I.firstChild
}title=I.getAttribute("title");
if(C._navShowing){C._showNav(true)
}dojo.publish(C.getShowTopicName(),[{index:E,title:title,url:I.getAttribute("src")}]);
if(D){D(H,G,J)
}C._setTitle(title)
};
dojo.fadeIn({node:C.images[E],duration:300,onEnd:F}).play()
}else{C._loadImage(E,function(){dojo.publish(C.getLoadTopicName(),[E]);
C.showImage(E,D)
})
}};
if(B&&B.length>0){dojo.fadeOut({node:B[0],duration:300,onEnd:function(){C.hiddenNode.appendChild(B[0]);
A()
}}).play()
}else{A()
}},_fitSize:function(A){if(!this.fixedHeight||A){var B=(this._currentImage.height+(this.hasNav?20:0));
dojo.style(this.innerWrapper,"height",B+"px");
return 
}dojo.style(this.largeNode,"paddingTop",this._getTopPadding()+"px")
},_getTopPadding:function(){if(!this.fixedHeight){return 0
}return(this.imageHeight-this._currentImage.height)/2
},_loadNextImage:function(){if(!this.autoLoad){return 
}while(this.images.length>=this._imageCounter&&this.images[this._imageCounter]){this._imageCounter++
}this._loadImage(this._imageCounter)
},_loadImage:function(E,A){if(this.images[E]||!this._request){return 
}var B=E-(E%this.pageSize);
this._request.start=B;
this._request.onComplete=function(G){var F=E-B;
if(G&&G.length>F){C(G[F])
}else{}};
var D=this;
var C=function(L){var H=D.imageStore.getValue(L,D.imageLargeAttr);
var K=document.createElement("img");
var G=document.createElement("div");
G._img=K;
var J=D.imageStore.getValue(L,D.linkAttr);
if(!J||D.noLink){G.appendChild(K)
}else{var I=document.createElement("a");
I.setAttribute("href",J);
I.setAttribute("target","_blank");
G.appendChild(I);
I.appendChild(K)
}G.setAttribute("id",D.id+"_imageDiv"+E);
dojo.connect(K,"onload",function(){D._fitImage(K);
G.setAttribute("width",D.imageWidth);
G.setAttribute("height",D.imageHeight);
dojo.publish(D.getLoadTopicName(),[E]);
D._loadNextImage();
if(A){A()
}});
D.hiddenNode.appendChild(G);
var M=document.createElement("div");
dojo.addClass(M,"slideShowTitle");
G.appendChild(M);
D.images[E]=G;
K.setAttribute("src",H);
var F=D.imageStore.getValue(L,D.titleAttr);
if(F){K.setAttribute("title",F)
}};
this.imageStore.fetch(this._request)
},_stop:function(){if(this._slideId){clearTimeout(this._slideId)
}this._slideId=null;
this._timerCancelled=true;
dojo.removeClass(this.domNode,"slideShowPaused")
},_prev:function(){if(this.imageIndex<1){return 
}this.showImage(this.imageIndex-1)
},_next:function(){this.showNextImage()
},_startTimer:function(){this._slideId=setTimeout("dijit.byId('"+this.id+"').showNextImage(true);",this.slideshowInterval*1000)
},_calcNavDimensions:function(){dojo.style(this.navNode,"position","absolute");
dojo.style(this.navNode,"left","-10000px");
dojo._setOpacity(this.navNode,99);
this.navPlay._size=dojo.marginBox(this.navPlay);
this.navPrev._size=dojo.marginBox(this.navPrev);
this.navNext._size=dojo.marginBox(this.navNext);
dojo._setOpacity(this.navNode,0);
dojo.style(this.navNode,"position","");
dojo.style(this.navNode,"left","")
},_setTitle:function(A){this.titleNode.innerHTML=this.titleTemplate.replace("@title",A).replace("@current",String(Number(this.imageIndex)+1)).replace("@total",String(this.maxPhotos))
},_fitImage:function(A){var B=A.width;
var C=A.height;
if(B>this.imageWidth){C=Math.floor(C*(this.imageWidth/B));
A.setAttribute("height",C+"px");
A.setAttribute("width",this.imageWidth+"px")
}if(C>this.imageHeight){B=Math.floor(B*(this.imageHeight/C));
A.setAttribute("height",this.imageHeight+"px");
A.setAttribute("width",B+"px")
}},_handleClick:function(A){switch(A.target){case this.navNext:this._next();
break;
case this.navPrev:this._prev();
break;
case this.navPlay:this.toggleSlideShow();
break
}},_showNav:function(B){if(this._navShowing&&!B){return 
}dojo.style(this.navNode,"marginTop","0px");
dojo.style(this.navPlay,"marginLeft","0px");
var D=dojo.marginBox(this.outerNode);
var A=this._currentImage.height-this.navPlay._size.h-10+this._getTopPadding();
if(A>this._currentImage.height){A+=10
}dojo[this.imageIndex<1?"addClass":"removeClass"](this.navPrev,"slideShowCtrlHide");
dojo[this.imageIndex+1>=this.maxPhotos?"addClass":"removeClass"](this.navNext,"slideShowCtrlHide");
var C=this;
if(this._navAnim){this._navAnim.stop()
}if(this._navShowing){return 
}this._navAnim=dojo.fadeIn({node:this.navNode,duration:300,onEnd:function(){C._navAnim=null
}});
this._navAnim.play();
this._navShowing=true
},_hideNav:function(B){if(!B||!this._overElement(this.outerNode,B)){var A=this;
if(this._navAnim){this._navAnim.stop()
}this._navAnim=dojo.fadeOut({node:this.navNode,duration:300,onEnd:function(){A._navAnim=null
}});
this._navAnim.play();
this._navShowing=false
}},_overElement:function(A,C){if(typeof (dojo)=="undefined"){return false
}A=dojo.byId(A);
var F={x:C.pageX,y:C.pageY};
var D=dojo._getBorderBox(A);
var E=dojo.coords(A,true);
var B=E.x;
return(F.x>=B&&F.x<=(B+D.w)&&F.y>=E.y&&F.y<=(top+D.h))
}})
};