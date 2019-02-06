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
if(this.useHyperlink){dojo.subscribe(this.getClickTopicName(),this,function(D){var C=D.index;
var B=this.imageStore.getValue(D.data,this.linkAttr);
if(!B){return 
}if(this.hyperlinkTarget=="new"){window.open(B)
}else{window.location=B
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
},setDataStore:function(A,C,E){this.reset();
this.request={query:{},start:C.start?C.start:0,count:C.count?C.count:10,onBegin:dojo.hitch(this,function(F){this._maxPhotos=F
})};
if(C.query){dojo.mixin(this.request.query,C.query)
}if(E&&E.imageThumbAttr){var D=["imageThumbAttr","imageLargeAttr","linkAttr","titleAttr"];
for(var B=0;
B<D.length;
B++){if(E[D[B]]){this[D[B]]=E[D[B]]
}}}this.request.start=0;
this.request.count=this.pageSize;
this.imageStore=A;
if(!this.init()){this._loadNextPage()
}},reset:function(){this._loadedImages={};
var A;
for(var B=0;
B<this._thumbs.length;
B++){A=this._thumbs[B];
if(A){if(A.parentNode){A.parentNode.removeChild(A)
}}}this._thumbs=[];
this.isInitialized=false;
this._noImages=true
},isVisible:function(A){var C=this._thumbs[A];
if(!C){return false
}var F=this.isHorizontal?"offsetLeft":"offsetTop";
var D=this.isHorizontal?"offsetWidth":"offsetHeight";
var B=this.isHorizontal?"scrollLeft":"scrollTop";
var E=C[F]-this.thumbsNode[F];
return(E>=this.thumbScroller[B]&&E+C[D]<=this.thumbScroller[B]+this._scrollerSize)
},_next:function(){var H=this.isHorizontal?"offsetLeft":"offsetTop";
var E=this.isHorizontal?"offsetWidth":"offsetHeight";
var G=this.thumbsNode[H];
var B=this._thumbs[this._thumbIndex];
var F=B[H]-G;
var A=-1,C;
for(var D=this._thumbIndex+1;
D<this._thumbs.length;
D++){C=this._thumbs[D];
if(C[H]-G+C[E]-F>this._scrollerSize){this._showThumbs(D);
return 
}}},_prev:function(){if(this.thumbScroller[this.isHorizontal?"scrollLeft":"scrollTop"]==0){return 
}var G=this.isHorizontal?"offsetLeft":"offsetTop";
var E=this.isHorizontal?"offsetWidth":"offsetHeight";
var B=this._thumbs[this._thumbIndex];
var F=B[G]-this.thumbsNode[G];
var A=-1,C;
for(var D=this._thumbIndex-1;
D>-1;
D--){C=this._thumbs[D];
if(F-C[G]>this._scrollerSize){this._showThumbs(D+1);
return 
}}this._showThumbs(0)
},_checkLoad:function(B,A){dojo.publish(this.getShowTopicName(),[{index:A}]);
this._updateNavControls();
this._loadingImages={};
this._thumbIndex=A;
if(this.thumbsNode.offsetWidth-B.offsetLeft<(this._scrollerSize*2)){this._loadNextPage()
}},_showThumbs:function(A){var G=this;
var A=arguments.length==0?this._thumbIndex:arguments[0];
A=Math.min(Math.max(A,0),this._maxPhotos);
if(A>=this._maxPhotos){return 
}var B=this._thumbs[A];
if(!B){return 
}var E=B.offsetLeft-this.thumbsNode.offsetLeft;
var D=B.offsetTop-this.thumbsNode.offsetTop;
var F=this.isHorizontal?E:D;
if((F>=this.thumbScroller[this._scrollAttr])&&(F+B[this._sizeAttr]<=this.thumbScroller[this._scrollAttr]+this._scrollerSize)){return 
}if(this.isScrollable){var C=this.isHorizontal?{x:E,y:0}:{x:0,y:D};
dojox.fx.smoothScroll({target:C,win:this.thumbScroller,duration:300,easing:dojox.fx.easing.easeOut,onEnd:dojo.hitch(this,"_checkLoad",B,A)}).play(10)
}else{if(this.isHorizontal){this.thumbScroller.scrollLeft=E
}else{this.thumbScroller.scrollTop=D
}this._checkLoad(B,A)
}},markImageLoaded:function(A){var B=dojo.byId("loadingDiv_"+this.widgetid+"_"+A);
if(B){this._setThumbClass(B,"thumbLoaded")
}this._loadedImages[A]=true
},_setThumbClass:function(A,B){if(!this.autoLoad){return 
}dojo.addClass(A,B)
},_loadNextPage:function(){if(this._loadInProgress){return 
}this._loadInProgress=true;
var E=this.request.start+(this._noImages==true?0:this.pageSize);
var D=E;
while(D<this._thumbs.length&&this._thumbs[D]){D++
}var C=this;
var A=function(F,H){if(F&&F.length){var G=0;
var I=function(){if(G>=F.length){C._loadInProgress=false;
return 
}var J=G++;
C._loadImage(F[J],D+J,I)
};
I();
C._updateNavControls()
}else{C._loadInProgress=false
}};
var B=function(){C._loadInProgress=false;
console.debug("Error getting items")
};
this.request.onComplete=A;
this.request.onError=B;
this.request.start=E;
this._noImages=false;
this.imageStore.fetch(this.request)
},_loadImage:function(F,H,K){var A=this.imageStore.getValue(F,this.imageThumbAttr);
var G=document.createElement("img");
var B=document.createElement("div");
B.setAttribute("id","img_"+this.widgetid+"_"+H);
B.appendChild(G);
G._index=H;
G._data=F;
this._thumbs[H]=B;
var D;
if(this.useLoadNotifier){D=document.createElement("div");
D.setAttribute("id","loadingDiv_"+this.widgetid+"_"+H);
this._setThumbClass(D,this._loadedImages[H]?"thumbLoaded":"thumbNotifier");
B.appendChild(D)
}var M=dojo.marginBox(this.thumbsNode);
var J;
var C;
if(this.isHorizontal){J=this.thumbWidth;
C="w"
}else{J=this.thumbHeight;
C="h"
}M=M[C];
var E=this.thumbScroller.scrollLeft,L=this.thumbScroller.scrollTop;
dojo.style(this.thumbsNode,this._sizeProperty,(M+J+20)+"px");
this.thumbScroller.scrollLeft=E;
this.thumbScroller.scrollTop=L;
this.thumbsNode.appendChild(B);
dojo.connect(G,"onload",this,function(){var N=dojo.marginBox(G)[C];
this._totalSize+=(Number(N)+4);
dojo.style(this.thumbsNode,this._sizeProperty,this._totalSize+"px");
if(this.useLoadNotifier){dojo.style(D,"width",(G.width-4)+"px")
}K();
return false
});
dojo.connect(G,"onclick",this,function(N){dojo.publish(this.getClickTopicName(),[{index:N.target._index,data:N.target._data,url:G.getAttribute("src"),largeUrl:this.imageStore.getValue(F,this.imageLargeAttr),title:this.imageStore.getValue(F,this.titleAttr),link:this.imageStore.getValue(F,this.linkAttr)}]);
return false
});
dojo.addClass(G,"imageGalleryThumb");
G.setAttribute("src",A);
var I=this.imageStore.getValue(F,this.titleAttr);
if(I){G.setAttribute("title",I)
}this._updateNavControls()
},_updateNavControls:function(){var A=[];
var F=function(H,I){var G=I?"addClass":"removeClass";
dojo[G](H,"enabled");
dojo[G](H,"thumbClickable")
};
var E=this.isHorizontal?"scrollLeft":"scrollTop";
var B=this.isHorizontal?"offsetWidth":"offsetHeight";
F(this.navPrev,(this.thumbScroller[E]>0));
var C=this._thumbs[this._thumbs.length-1];
var D=(this.thumbScroller[E]+this._scrollerSize<this.thumbsNode[B]);
F(this.navNext,D)
}})
};