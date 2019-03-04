if(!dojo._hasResource["dojox.image.SlideShow"]){dojo._hasResource["dojox.image.SlideShow"]=true;
dojo.provide("dojox.image.SlideShow");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dojox.image.SlideShow",[dijit._Widget,dijit._Templated],{imageHeight:375,imageWidth:500,title:"",titleTemplate:'@title <span class="slideShowCounterText">(@current of @total)</span>',noLink:false,loop:true,hasNav:true,images:[],pageSize:20,autoLoad:true,fixedHeight:false,imageStore:null,linkAttr:"link",imageLargeAttr:"imageUrl",titleAttr:"title",slideshowInterval:3,templateString:'<div dojoAttachPoint="outerNode" class="slideShowWrapper">\r\n\t<div style="position:relative;" dojoAttachPoint="innerWrapper">\r\n\t\t<div class="slideShowNav" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<div class="dijitInline slideShowTitle" dojoAttachPoint="titleNode">${title}</div>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="navNode" class="slideShowCtrl" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<span dojoAttachPoint="navPrev" class="slideShowCtrlPrev"></span>\r\n\t\t\t<span dojoAttachPoint="navPlay" class="slideShowCtrlPlay"></span>\r\n\t\t\t<span dojoAttachPoint="navNext" class="slideShowCtrlNext"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="largeNode" class="slideShowImageWrapper"></div>\t\t\r\n\t\t<div dojoAttachPoint="hiddenNode" class="slideShowHidden"></div>\r\n\t</div>\r\n</div>\r\n',_tempImgPath:dojo.moduleUrl("dojox.image","resources/images/1pixel.gif"),_imageCounter:0,_tmpImage:null,_request:null,postCreate:function(){this.inherited("postCreate",arguments);
var A=document.createElement("img");
A.setAttribute("width",this.imageWidth);
A.setAttribute("height",this.imageHeight);
if(this.hasNav){dojo.connect(this.outerNode,"onmouseover",function(C){try{B._showNav()
}catch(D){}});
dojo.connect(this.outerNode,"onmouseout",function(C){try{B._hideNav(C)
}catch(D){}})
}this.outerNode.style.width=this.imageWidth+"px";
A.setAttribute("src",this._tempImgPath);
var B=this;
this.largeNode.appendChild(A);
this._tmpImage=A;
this._currentImage=A;
this._fitSize(true);
this._loadImage(0,function(){B.showImage(0)
});
this._calcNavDimensions()
},setDataStore:function(B,C,E){this.reset();
var D=this;
this._request={query:{},start:((C.start)?C.start:0),count:((C.count)?C.count:this.pageSize),onBegin:function(G,F){D.maxPhotos=G
}};
if(C.query){dojo.mixin(this._request.query,C.query)
}if(E&&E.imageLargeAttr){this.imageLargeAttr=E.imageLargeAttr
}var D=this;
var A=function(F){D.showImage(0);
D._request.onComplete=null
};
this.imageStore=B;
this._request.onComplete=A;
this._request.start=0;
this.imageStore.fetch(this._request)
},reset:function(){while(this.largeNode.firstChild){this.largeNode.removeChild(this.largeNode.firstChild)
}this.largeNode.appendChild(this._tmpImage);
while(this.hiddenNode.firstChild){this.hiddenNode.removeChild(this.hiddenNode.firstChild)
}var A;
for(var B=0;
B<this.images.length;
B++){A=this.images[B];
if(A&&A.parentNode){A.parentNode.removeChild(A)
}}this.images=[];
this.isInitialized=false;
this._imageCounter=0
},isImageLoaded:function(A){return this.images&&this.images.length>index&&this.images[A]
},moveImageLoadingPointer:function(A){this._imageCounter=A
},destroy:function(){if(this._slideId){this._stop()
}this.inherited("destroy",arguments)
},showNextImage:function(B,A){if(B&&this._timerCancelled){return false
}if(this.imageIndex+1>=this.maxPhotos){if(B&&(this.loop||A)){this.imageIndex=-1
}else{if(this._slideId){this._stop()
}return false
}}var C=this;
this.showImage(this.imageIndex+1,function(){if(B){C._startTimer()
}});
return true
},toggleSlideShow:function(){if(this._slideId){this._stop()
}else{dojo.toggleClass(this.domNode,"slideShowPaused");
this._timerCancelled=false;
var A=this.showNextImage(true,true);
if(!A){this._stop()
}}},getShowTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageShow"
},getLoadTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageLoad"
},showImage:function(A,E){if(!E&&this._slideId){this.toggleSlideShow()
}var D=this;
var C=this.largeNode.getElementsByTagName("div");
this.imageIndex=A;
var B=function(){if(D.images[A]){while(D.largeNode.firstChild){D.largeNode.removeChild(D.largeNode.firstChild)
}D.images[A].style.opacity=0;
D.largeNode.appendChild(D.images[A]);
D._currentImage=D.images[A]._img;
D._fitSize();
var F=function(H,G,J){var I=D.images[A].firstChild;
if(I.tagName.toLowerCase()!="img"){I=I.firstChild
}title=I.getAttribute("title");
if(D._navShowing){D._showNav(true)
}dojo.publish(D.getShowTopicName(),[{index:A,title:title,url:I.getAttribute("src")}]);
if(E){E(H,G,J)
}D._setTitle(title)
};
dojo.fadeIn({node:D.images[A],duration:300,onEnd:F}).play()
}else{D._loadImage(A,function(){dojo.publish(D.getLoadTopicName(),[A]);
D.showImage(A,E)
})
}};
if(C&&C.length>0){dojo.fadeOut({node:C[0],duration:300,onEnd:function(){D.hiddenNode.appendChild(C[0]);
B()
}}).play()
}else{B()
}},_fitSize:function(B){if(!this.fixedHeight||B){var A=(this._currentImage.height+(this.hasNav?20:0));
dojo.style(this.innerWrapper,"height",A+"px");
return 
}dojo.style(this.largeNode,"paddingTop",this._getTopPadding()+"px")
},_getTopPadding:function(){if(!this.fixedHeight){return 0
}return(this.imageHeight-this._currentImage.height)/2
},_loadNextImage:function(){if(!this.autoLoad){return 
}while(this.images.length>=this._imageCounter&&this.images[this._imageCounter]){this._imageCounter++
}this._loadImage(this._imageCounter)
},_loadImage:function(A,B){if(this.images[A]||!this._request){return 
}var C=A-(A%this.pageSize);
this._request.start=C;
this._request.onComplete=function(F){var G=A-C;
if(F&&F.length>G){D(F[G])
}else{}};
var E=this;
var D=function(J){var H=E.imageStore.getValue(J,E.imageLargeAttr);
var G=document.createElement("img");
var M=document.createElement("div");
M._img=G;
var I=E.imageStore.getValue(J,E.linkAttr);
if(!I||E.noLink){M.appendChild(G)
}else{var F=document.createElement("a");
F.setAttribute("href",I);
F.setAttribute("target","_blank");
M.appendChild(F);
F.appendChild(G)
}M.setAttribute("id",E.id+"_imageDiv"+A);
dojo.connect(G,"onload",function(){E._fitImage(G);
M.setAttribute("width",E.imageWidth);
M.setAttribute("height",E.imageHeight);
dojo.publish(E.getLoadTopicName(),[A]);
E._loadNextImage();
if(B){B()
}});
E.hiddenNode.appendChild(M);
var K=document.createElement("div");
dojo.addClass(K,"slideShowTitle");
M.appendChild(K);
E.images[A]=M;
G.setAttribute("src",H);
var L=E.imageStore.getValue(J,E.titleAttr);
if(L){G.setAttribute("title",L)
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
},_fitImage:function(B){var C=B.width;
var A=B.height;
if(C>this.imageWidth){A=Math.floor(A*(this.imageWidth/C));
B.setAttribute("height",A+"px");
B.setAttribute("width",this.imageWidth+"px")
}if(A>this.imageHeight){C=Math.floor(C*(this.imageHeight/A));
B.setAttribute("height",this.imageHeight+"px");
B.setAttribute("width",C+"px")
}},_handleClick:function(A){switch(A.target){case this.navNext:this._next();
break;
case this.navPrev:this._prev();
break;
case this.navPlay:this.toggleSlideShow();
break
}},_showNav:function(C){if(this._navShowing&&!C){return 
}dojo.style(this.navNode,"marginTop","0px");
dojo.style(this.navPlay,"marginLeft","0px");
var A=dojo.marginBox(this.outerNode);
var B=this._currentImage.height-this.navPlay._size.h-10+this._getTopPadding();
if(B>this._currentImage.height){B+=10
}dojo[this.imageIndex<1?"addClass":"removeClass"](this.navPrev,"slideShowCtrlHide");
dojo[this.imageIndex+1>=this.maxPhotos?"addClass":"removeClass"](this.navNext,"slideShowCtrlHide");
var D=this;
if(this._navAnim){this._navAnim.stop()
}if(this._navShowing){return 
}this._navAnim=dojo.fadeIn({node:this.navNode,duration:300,onEnd:function(){D._navAnim=null
}});
this._navAnim.play();
this._navShowing=true
},_hideNav:function(A){if(!A||!this._overElement(this.outerNode,A)){var B=this;
if(this._navAnim){this._navAnim.stop()
}this._navAnim=dojo.fadeOut({node:this.navNode,duration:300,onEnd:function(){B._navAnim=null
}});
this._navAnim.play();
this._navShowing=false
}},_overElement:function(B,D){if(typeof (dojo)=="undefined"){return false
}B=dojo.byId(B);
var A={x:D.pageX,y:D.pageY};
var E=dojo._getBorderBox(B);
var F=dojo.coords(B,true);
var C=F.x;
return(A.x>=C&&A.x<=(C+E.w)&&A.y>=F.y&&A.y<=(top+E.h))
}})
};