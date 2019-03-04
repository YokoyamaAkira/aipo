dojo._xdResourceLoaded({depends:[["provide","dojox.image.SlideShow"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dojox.image.SlideShow"]){A._hasResource["dojox.image.SlideShow"]=true;
A.provide("dojox.image.SlideShow");
A.require("dojo.fx");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dojox.image.SlideShow",[dijit._Widget,dijit._Templated],{imageHeight:375,imageWidth:500,title:"",titleTemplate:'@title <span class="slideShowCounterText">(@current of @total)</span>',noLink:false,loop:true,hasNav:true,images:[],pageSize:20,autoLoad:true,fixedHeight:false,imageStore:null,linkAttr:"link",imageLargeAttr:"imageUrl",titleAttr:"title",slideshowInterval:3,templateString:'<div dojoAttachPoint="outerNode" class="slideShowWrapper">\r\n\t<div style="position:relative;" dojoAttachPoint="innerWrapper">\r\n\t\t<div class="slideShowNav" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<div class="dijitInline slideShowTitle" dojoAttachPoint="titleNode">${title}</div>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="navNode" class="slideShowCtrl" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<span dojoAttachPoint="navPrev" class="slideShowCtrlPrev"></span>\r\n\t\t\t<span dojoAttachPoint="navPlay" class="slideShowCtrlPlay"></span>\r\n\t\t\t<span dojoAttachPoint="navNext" class="slideShowCtrlNext"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="largeNode" class="slideShowImageWrapper"></div>\t\t\r\n\t\t<div dojoAttachPoint="hiddenNode" class="slideShowHidden"></div>\r\n\t</div>\r\n</div>\r\n',_tempImgPath:A.moduleUrl("dojox.image","resources/images/1pixel.gif"),_imageCounter:0,_tmpImage:null,_request:null,postCreate:function(){this.inherited("postCreate",arguments);
var B=document.createElement("img");
B.setAttribute("width",this.imageWidth);
B.setAttribute("height",this.imageHeight);
if(this.hasNav){A.connect(this.outerNode,"onmouseover",function(D){try{C._showNav()
}catch(E){}});
A.connect(this.outerNode,"onmouseout",function(D){try{C._hideNav(D)
}catch(E){}})
}this.outerNode.style.width=this.imageWidth+"px";
B.setAttribute("src",this._tempImgPath);
var C=this;
this.largeNode.appendChild(B);
this._tmpImage=B;
this._currentImage=B;
this._fitSize(true);
this._loadImage(0,function(){C.showImage(0)
});
this._calcNavDimensions()
},setDataStore:function(C,D,F){this.reset();
var E=this;
this._request={query:{},start:((D.start)?D.start:0),count:((D.count)?D.count:this.pageSize),onBegin:function(H,G){E.maxPhotos=H
}};
if(D.query){A.mixin(this._request.query,D.query)
}if(F&&F.imageLargeAttr){this.imageLargeAttr=F.imageLargeAttr
}var E=this;
var B=function(G){E.showImage(0);
E._request.onComplete=null
};
this.imageStore=C;
this._request.onComplete=B;
this._request.start=0;
this.imageStore.fetch(this._request)
},reset:function(){while(this.largeNode.firstChild){this.largeNode.removeChild(this.largeNode.firstChild)
}this.largeNode.appendChild(this._tmpImage);
while(this.hiddenNode.firstChild){this.hiddenNode.removeChild(this.hiddenNode.firstChild)
}var B;
for(var C=0;
C<this.images.length;
C++){B=this.images[C];
if(B&&B.parentNode){B.parentNode.removeChild(B)
}}this.images=[];
this.isInitialized=false;
this._imageCounter=0
},isImageLoaded:function(B){return this.images&&this.images.length>index&&this.images[B]
},moveImageLoadingPointer:function(B){this._imageCounter=B
},destroy:function(){if(this._slideId){this._stop()
}this.inherited("destroy",arguments)
},showNextImage:function(C,B){if(C&&this._timerCancelled){return false
}if(this.imageIndex+1>=this.maxPhotos){if(C&&(this.loop||B)){this.imageIndex=-1
}else{if(this._slideId){this._stop()
}return false
}}var D=this;
this.showImage(this.imageIndex+1,function(){if(C){D._startTimer()
}});
return true
},toggleSlideShow:function(){if(this._slideId){this._stop()
}else{A.toggleClass(this.domNode,"slideShowPaused");
this._timerCancelled=false;
var B=this.showNextImage(true,true);
if(!B){this._stop()
}}},getShowTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageShow"
},getLoadTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageLoad"
},showImage:function(B,F){if(!F&&this._slideId){this.toggleSlideShow()
}var E=this;
var D=this.largeNode.getElementsByTagName("div");
this.imageIndex=B;
var C=function(){if(E.images[B]){while(E.largeNode.firstChild){E.largeNode.removeChild(E.largeNode.firstChild)
}E.images[B].style.opacity=0;
E.largeNode.appendChild(E.images[B]);
E._currentImage=E.images[B]._img;
E._fitSize();
var G=function(I,H,K){var J=E.images[B].firstChild;
if(J.tagName.toLowerCase()!="img"){J=J.firstChild
}title=J.getAttribute("title");
if(E._navShowing){E._showNav(true)
}A.publish(E.getShowTopicName(),[{index:B,title:title,url:J.getAttribute("src")}]);
if(F){F(I,H,K)
}E._setTitle(title)
};
A.fadeIn({node:E.images[B],duration:300,onEnd:G}).play()
}else{E._loadImage(B,function(){A.publish(E.getLoadTopicName(),[B]);
E.showImage(B,F)
})
}};
if(D&&D.length>0){A.fadeOut({node:D[0],duration:300,onEnd:function(){E.hiddenNode.appendChild(D[0]);
C()
}}).play()
}else{C()
}},_fitSize:function(C){if(!this.fixedHeight||C){var B=(this._currentImage.height+(this.hasNav?20:0));
A.style(this.innerWrapper,"height",B+"px");
return 
}A.style(this.largeNode,"paddingTop",this._getTopPadding()+"px")
},_getTopPadding:function(){if(!this.fixedHeight){return 0
}return(this.imageHeight-this._currentImage.height)/2
},_loadNextImage:function(){if(!this.autoLoad){return 
}while(this.images.length>=this._imageCounter&&this.images[this._imageCounter]){this._imageCounter++
}this._loadImage(this._imageCounter)
},_loadImage:function(B,C){if(this.images[B]||!this._request){return 
}var D=B-(B%this.pageSize);
this._request.start=D;
this._request.onComplete=function(G){var H=B-D;
if(G&&G.length>H){E(G[H])
}else{}};
var F=this;
var E=function(K){var I=F.imageStore.getValue(K,F.imageLargeAttr);
var H=document.createElement("img");
var N=document.createElement("div");
N._img=H;
var J=F.imageStore.getValue(K,F.linkAttr);
if(!J||F.noLink){N.appendChild(H)
}else{var G=document.createElement("a");
G.setAttribute("href",J);
G.setAttribute("target","_blank");
N.appendChild(G);
G.appendChild(H)
}N.setAttribute("id",F.id+"_imageDiv"+B);
A.connect(H,"onload",function(){F._fitImage(H);
N.setAttribute("width",F.imageWidth);
N.setAttribute("height",F.imageHeight);
A.publish(F.getLoadTopicName(),[B]);
F._loadNextImage();
if(C){C()
}});
F.hiddenNode.appendChild(N);
var L=document.createElement("div");
A.addClass(L,"slideShowTitle");
N.appendChild(L);
F.images[B]=N;
H.setAttribute("src",I);
var M=F.imageStore.getValue(K,F.titleAttr);
if(M){H.setAttribute("title",M)
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
},_fitImage:function(C){var D=C.width;
var B=C.height;
if(D>this.imageWidth){B=Math.floor(B*(this.imageWidth/D));
C.setAttribute("height",B+"px");
C.setAttribute("width",this.imageWidth+"px")
}if(B>this.imageHeight){D=Math.floor(D*(this.imageHeight/B));
C.setAttribute("height",this.imageHeight+"px");
C.setAttribute("width",D+"px")
}},_handleClick:function(B){switch(B.target){case this.navNext:this._next();
break;
case this.navPrev:this._prev();
break;
case this.navPlay:this.toggleSlideShow();
break
}},_showNav:function(D){if(this._navShowing&&!D){return 
}A.style(this.navNode,"marginTop","0px");
A.style(this.navPlay,"marginLeft","0px");
var B=A.marginBox(this.outerNode);
var C=this._currentImage.height-this.navPlay._size.h-10+this._getTopPadding();
if(C>this._currentImage.height){C+=10
}A[this.imageIndex<1?"addClass":"removeClass"](this.navPrev,"slideShowCtrlHide");
A[this.imageIndex+1>=this.maxPhotos?"addClass":"removeClass"](this.navNext,"slideShowCtrlHide");
var E=this;
if(this._navAnim){this._navAnim.stop()
}if(this._navShowing){return 
}this._navAnim=A.fadeIn({node:this.navNode,duration:300,onEnd:function(){E._navAnim=null
}});
this._navAnim.play();
this._navShowing=true
},_hideNav:function(B){if(!B||!this._overElement(this.outerNode,B)){var C=this;
if(this._navAnim){this._navAnim.stop()
}this._navAnim=A.fadeOut({node:this.navNode,duration:300,onEnd:function(){C._navAnim=null
}});
this._navAnim.play();
this._navShowing=false
}},_overElement:function(C,E){if(typeof (A)=="undefined"){return false
}C=A.byId(C);
var B={x:E.pageX,y:E.pageY};
var F=A._getBorderBox(C);
var G=A.coords(C,true);
var D=G.x;
return(B.x>=D&&B.x<=(D+F.w)&&B.y>=G.y&&B.y<=(top+F.h))
}})
}}});