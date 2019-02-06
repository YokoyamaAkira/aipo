if(!dojo._hasResource["dojox.image.ThumbnailPicker"]){dojo._hasResource["dojox.image.ThumbnailPicker"]=true;
dojo.provide("dojox.image.ThumbnailPicker");
dojo.experimental("dojox.image.ThumbnailPicker");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dojox.image.ThumbnailPicker",[dijit._Widget,dijit._Templated],{imageStore:null,request:null,size:500,thumbHeight:75,thumbWidth:100,useLoadNotifier:false,useHyperlink:false,hyperlinkTarget:"new",isClickable:true,isScrollable:true,isHorizontal:true,autoLoad:true,linkAttr:"link",imageThumbAttr:"imageUrlThumb",imageLargeAttr:"imageUrl",pageSize:20,titleAttr:"title",templateString:'<div dojoAttachPoint="outerNode" class="thumbOuter">\r\n\t<div dojoAttachPoint="navPrev" class="thumbNav thumbClickable">\r\n\t  <img src="" dojoAttachPoint="navPrevImg"/>    \r\n\t</div>\r\n\t<div dojoAttachPoint="thumbScroller" class="thumbScroller">\r\n\t  <div dojoAttachPoint="thumbsNode" class="thumbWrapper"></div>\r\n\t</div>\r\n\t<div dojoAttachPoint="navNext" class="thumbNav thumbClickable">\r\n\t  <img src="" dojoAttachPoint="navNextImg"/>  \r\n\t</div>\r\n</div>\r\n',tempImgPath:dojo.moduleUrl("dojox.image","resources/images/1pixel.gif"),_thumbs:[],_thumbIndex:0,_maxPhotos:0,_loadedImages:{},postCreate:function(){this.widgetid=this.id;
this.inherited("postCreate",arguments);
this.pageSize=Number(this.pageSize);
this._scrollerSize=this.size-(51*2);
var A=this._sizeProperty=this.isHorizontal?"width":"height";
dojo.style(this.outerNode,"textAlign","center");
dojo.style(this.outerNode,A,this.size+"px");
dojo.style(this.thumbScroller,A,this._scrollerSize+"px");
if(this.useHyperlink){dojo.subscribe(this.getClickTopicName(),this,function(B){var D=B.index;
var C=this.imageStore.getValue(B.data,this.linkAttr);
if(!C){return 
}if(this.hyperlinkTarget=="new"){window.open(C)
}else{window.location=C
}})
}if(this.isScrollable){dojo.require("dojox.fx.scroll");
dojo.require("dojox.fx.easing")
}if(this.isClickable){dojo.addClass(this.thumbsNode,"thumbClickable")
}this._totalSize=0;
this.init()
},init:function(){if(this.isInitialized){return false
}var A=this.isHorizontal?"Horiz":"Vert";
dojo.addClass(this.navPrev,"prev"+A);
dojo.addClass(this.navNext,"next"+A);
dojo.addClass(this.thumbsNode,"thumb"+A);
dojo.addClass(this.outerNode,"thumb"+A);
this.navNextImg.setAttribute("src",this.tempImgPath);
this.navPrevImg.setAttribute("src",this.tempImgPath);
dojo.connect(this.navPrev,"onclick",this,"_prev");
dojo.connect(this.navNext,"onclick",this,"_next");
this.isInitialized=true;
if(this.isHorizontal){this._offsetAttr="offsetLeft";
this._sizeAttr="offsetWidth";
this._scrollAttr="scrollLeft"
}else{this._offsetAttr="offsetTop";
this._sizeAttr="offsetHeight";
this._scrollAttr="scrollTop"
}this._updateNavControls();
if(this.imageStore&&this.request){this._loadNextPage()
}return true
},getClickTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/select"
},getShowTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/show"
},setDataStore:function(E,B,D){this.reset();
this.request={query:{},start:B.start?B.start:0,count:B.count?B.count:10,onBegin:dojo.hitch(this,function(F){this._maxPhotos=F
})};
if(B.query){dojo.mixin(this.request.query,B.query)
}if(D&&D.imageThumbAttr){var C=["imageThumbAttr","imageLargeAttr","linkAttr","titleAttr"];
for(var A=0;
A<C.length;
A++){if(D[C[A]]){this[C[A]]=D[C[A]]
}}}this.request.start=0;
this.request.count=this.pageSize;
this.imageStore=E;
if(!this.init()){this._loadNextPage()
}},reset:function(){this._loadedImages={};
var B;
for(var A=0;
A<this._thumbs.length;
A++){B=this._thumbs[A];
if(B){if(B.parentNode){B.parentNode.removeChild(B)
}}}this._thumbs=[];
this.isInitialized=false;
this._noImages=true
},isVisible:function(F){var B=this._thumbs[F];
if(!B){return false
}var E=this.isHorizontal?"offsetLeft":"offsetTop";
var C=this.isHorizontal?"offsetWidth":"offsetHeight";
var A=this.isHorizontal?"scrollLeft":"scrollTop";
var D=B[E]-this.thumbsNode[E];
return(D>=this.thumbScroller[A]&&D+B[C]<=this.thumbScroller[A]+this._scrollerSize)
},_next:function(){var C=this.isHorizontal?"offsetLeft":"offsetTop";
var H=this.isHorizontal?"offsetWidth":"offsetHeight";
var B=this.thumbsNode[C];
var E=this._thumbs[this._thumbIndex];
var A=E[C]-B;
var D=-1,F;
for(var G=this._thumbIndex+1;
G<this._thumbs.length;
G++){F=this._thumbs[G];
if(F[C]-B+F[H]-A>this._scrollerSize){this._showThumbs(G);
return 
}}},_prev:function(){if(this.thumbScroller[this.isHorizontal?"scrollLeft":"scrollTop"]==0){return 
}var D=this.isHorizontal?"offsetLeft":"offsetTop";
var B=this.isHorizontal?"offsetWidth":"offsetHeight";
var F=this._thumbs[this._thumbIndex];
var C=F[D]-this.thumbsNode[D];
var E=-1,G;
for(var A=this._thumbIndex-1;
A>-1;
A--){G=this._thumbs[A];
if(C-G[D]>this._scrollerSize){this._showThumbs(A+1);
return 
}}this._showThumbs(0)
},_checkLoad:function(A,B){dojo.publish(this.getShowTopicName(),[{index:B}]);
this._updateNavControls();
this._loadingImages={};
this._thumbIndex=B;
if(this.thumbsNode.offsetWidth-A.offsetLeft<(this._scrollerSize*2)){this._loadNextPage()
}},_showThumbs:function(E){var D=this;
var E=arguments.length==0?this._thumbIndex:arguments[0];
E=Math.min(Math.max(E,0),this._maxPhotos);
if(E>=this._maxPhotos){return 
}var F=this._thumbs[E];
if(!F){return 
}var B=F.offsetLeft-this.thumbsNode.offsetLeft;
var A=F.offsetTop-this.thumbsNode.offsetTop;
var C=this.isHorizontal?B:A;
if((C>=this.thumbScroller[this._scrollAttr])&&(C+F[this._sizeAttr]<=this.thumbScroller[this._scrollAttr]+this._scrollerSize)){return 
}if(this.isScrollable){var G=this.isHorizontal?{x:B,y:0}:{x:0,y:A};
dojox.fx.smoothScroll({target:G,win:this.thumbScroller,duration:300,easing:dojox.fx.easing.easeOut,onEnd:dojo.hitch(this,"_checkLoad",F,E)}).play(10)
}else{if(this.isHorizontal){this.thumbScroller.scrollLeft=B
}else{this.thumbScroller.scrollTop=A
}this._checkLoad(F,E)
}},markImageLoaded:function(B){var A=dojo.byId("loadingDiv_"+this.widgetid+"_"+B);
if(A){this._setThumbClass(A,"thumbLoaded")
}this._loadedImages[B]=true
},_setThumbClass:function(B,A){if(!this.autoLoad){return 
}dojo.addClass(B,A)
},_loadNextPage:function(){if(this._loadInProgress){return 
}this._loadInProgress=true;
var D=this.request.start+(this._noImages==true?0:this.pageSize);
var C=D;
while(C<this._thumbs.length&&this._thumbs[C]){C++
}var B=this;
var E=function(G,I){if(G&&G.length){var H=0;
var F=function(){if(H>=G.length){B._loadInProgress=false;
return 
}var J=H++;
B._loadImage(G[J],C+J,F)
};
F();
B._updateNavControls()
}else{B._loadInProgress=false
}};
var A=function(){B._loadInProgress=false;
console.debug("Error getting items")
};
this.request.onComplete=E;
this.request.onError=A;
this.request.start=D;
this._noImages=false;
this.imageStore.fetch(this.request)
},_loadImage:function(B,D,G){var J=this.imageStore.getValue(B,this.imageThumbAttr);
var C=document.createElement("img");
var K=document.createElement("div");
K.setAttribute("id","img_"+this.widgetid+"_"+D);
K.appendChild(C);
C._index=D;
C._data=B;
this._thumbs[D]=K;
var M;
if(this.useLoadNotifier){M=document.createElement("div");
M.setAttribute("id","loadingDiv_"+this.widgetid+"_"+D);
this._setThumbClass(M,this._loadedImages[D]?"thumbLoaded":"thumbNotifier");
K.appendChild(M)
}var I=dojo.marginBox(this.thumbsNode);
var F;
var L;
if(this.isHorizontal){F=this.thumbWidth;
L="w"
}else{F=this.thumbHeight;
L="h"
}I=I[L];
var A=this.thumbScroller.scrollLeft,H=this.thumbScroller.scrollTop;
dojo.style(this.thumbsNode,this._sizeProperty,(I+F+20)+"px");
this.thumbScroller.scrollLeft=A;
this.thumbScroller.scrollTop=H;
this.thumbsNode.appendChild(K);
dojo.connect(C,"onload",this,function(){var N=dojo.marginBox(C)[L];
this._totalSize+=(Number(N)+4);
dojo.style(this.thumbsNode,this._sizeProperty,this._totalSize+"px");
if(this.useLoadNotifier){dojo.style(M,"width",(C.width-4)+"px")
}G();
return false
});
dojo.connect(C,"onclick",this,function(N){dojo.publish(this.getClickTopicName(),[{index:N.target._index,data:N.target._data,url:C.getAttribute("src"),largeUrl:this.imageStore.getValue(B,this.imageLargeAttr),title:this.imageStore.getValue(B,this.titleAttr),link:this.imageStore.getValue(B,this.linkAttr)}]);
return false
});
dojo.addClass(C,"imageGalleryThumb");
C.setAttribute("src",J);
var E=this.imageStore.getValue(B,this.titleAttr);
if(E){C.setAttribute("title",E)
}this._updateNavControls()
},_updateNavControls:function(){var F=[];
var E=function(I,G){var H=G?"addClass":"removeClass";
dojo[H](I,"enabled");
dojo[H](I,"thumbClickable")
};
var D=this.isHorizontal?"scrollLeft":"scrollTop";
var A=this.isHorizontal?"offsetWidth":"offsetHeight";
E(this.navPrev,(this.thumbScroller[D]>0));
var B=this._thumbs[this._thumbs.length-1];
var C=(this.thumbScroller[D]+this._scrollerSize<this.thumbsNode[A]);
E(this.navNext,C)
}})
};