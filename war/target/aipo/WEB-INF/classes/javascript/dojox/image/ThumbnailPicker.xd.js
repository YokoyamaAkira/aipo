dojo._xdResourceLoaded({depends:[["provide","dojox.image.ThumbnailPicker"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dojox.fx.scroll"],["require","dojox.fx.easing"]],defineResource:function(A){if(!A._hasResource["dojox.image.ThumbnailPicker"]){A._hasResource["dojox.image.ThumbnailPicker"]=true;
A.provide("dojox.image.ThumbnailPicker");
A.experimental("dojox.image.ThumbnailPicker");
A.require("dojo.fx");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dojox.image.ThumbnailPicker",[dijit._Widget,dijit._Templated],{imageStore:null,request:null,size:500,thumbHeight:75,thumbWidth:100,useLoadNotifier:false,useHyperlink:false,hyperlinkTarget:"new",isClickable:true,isScrollable:true,isHorizontal:true,autoLoad:true,linkAttr:"link",imageThumbAttr:"imageUrlThumb",imageLargeAttr:"imageUrl",pageSize:20,titleAttr:"title",templateString:'<div dojoAttachPoint="outerNode" class="thumbOuter">\r\n\t<div dojoAttachPoint="navPrev" class="thumbNav thumbClickable">\r\n\t  <img src="" dojoAttachPoint="navPrevImg"/>    \r\n\t</div>\r\n\t<div dojoAttachPoint="thumbScroller" class="thumbScroller">\r\n\t  <div dojoAttachPoint="thumbsNode" class="thumbWrapper"></div>\r\n\t</div>\r\n\t<div dojoAttachPoint="navNext" class="thumbNav thumbClickable">\r\n\t  <img src="" dojoAttachPoint="navNextImg"/>  \r\n\t</div>\r\n</div>\r\n',tempImgPath:A.moduleUrl("dojox.image","resources/images/1pixel.gif"),_thumbs:[],_thumbIndex:0,_maxPhotos:0,_loadedImages:{},postCreate:function(){this.widgetid=this.id;
this.inherited("postCreate",arguments);
this.pageSize=Number(this.pageSize);
this._scrollerSize=this.size-(51*2);
var B=this._sizeProperty=this.isHorizontal?"width":"height";
A.style(this.outerNode,"textAlign","center");
A.style(this.outerNode,B,this.size+"px");
A.style(this.thumbScroller,B,this._scrollerSize+"px");
if(this.useHyperlink){A.subscribe(this.getClickTopicName(),this,function(E){var D=E.index;
var C=this.imageStore.getValue(E.data,this.linkAttr);
if(!C){return 
}if(this.hyperlinkTarget=="new"){window.open(C)
}else{window.location=C
}})
}if(this.isScrollable){A.require("dojox.fx.scroll");
A.require("dojox.fx.easing")
}if(this.isClickable){A.addClass(this.thumbsNode,"thumbClickable")
}this._totalSize=0;
this.init()
},init:function(){if(this.isInitialized){return false
}var B=this.isHorizontal?"Horiz":"Vert";
A.addClass(this.navPrev,"prev"+B);
A.addClass(this.navNext,"next"+B);
A.addClass(this.thumbsNode,"thumb"+B);
A.addClass(this.outerNode,"thumb"+B);
this.navNextImg.setAttribute("src",this.tempImgPath);
this.navPrevImg.setAttribute("src",this.tempImgPath);
A.connect(this.navPrev,"onclick",this,"_prev");
A.connect(this.navNext,"onclick",this,"_next");
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
},setDataStore:function(B,D,F){this.reset();
this.request={query:{},start:D.start?D.start:0,count:D.count?D.count:10,onBegin:A.hitch(this,function(G){this._maxPhotos=G
})};
if(D.query){A.mixin(this.request.query,D.query)
}if(F&&F.imageThumbAttr){var E=["imageThumbAttr","imageLargeAttr","linkAttr","titleAttr"];
for(var C=0;
C<E.length;
C++){if(F[E[C]]){this[E[C]]=F[E[C]]
}}}this.request.start=0;
this.request.count=this.pageSize;
this.imageStore=B;
if(!this.init()){this._loadNextPage()
}},reset:function(){this._loadedImages={};
var B;
for(var C=0;
C<this._thumbs.length;
C++){B=this._thumbs[C];
if(B){if(B.parentNode){B.parentNode.removeChild(B)
}}}this._thumbs=[];
this.isInitialized=false;
this._noImages=true
},isVisible:function(B){var D=this._thumbs[B];
if(!D){return false
}var G=this.isHorizontal?"offsetLeft":"offsetTop";
var E=this.isHorizontal?"offsetWidth":"offsetHeight";
var C=this.isHorizontal?"scrollLeft":"scrollTop";
var F=D[G]-this.thumbsNode[G];
return(F>=this.thumbScroller[C]&&F+D[E]<=this.thumbScroller[C]+this._scrollerSize)
},_next:function(){var I=this.isHorizontal?"offsetLeft":"offsetTop";
var F=this.isHorizontal?"offsetWidth":"offsetHeight";
var H=this.thumbsNode[I];
var C=this._thumbs[this._thumbIndex];
var G=C[I]-H;
var B=-1,D;
for(var E=this._thumbIndex+1;
E<this._thumbs.length;
E++){D=this._thumbs[E];
if(D[I]-H+D[F]-G>this._scrollerSize){this._showThumbs(E);
return 
}}},_prev:function(){if(this.thumbScroller[this.isHorizontal?"scrollLeft":"scrollTop"]==0){return 
}var H=this.isHorizontal?"offsetLeft":"offsetTop";
var F=this.isHorizontal?"offsetWidth":"offsetHeight";
var C=this._thumbs[this._thumbIndex];
var G=C[H]-this.thumbsNode[H];
var B=-1,D;
for(var E=this._thumbIndex-1;
E>-1;
E--){D=this._thumbs[E];
if(G-D[H]>this._scrollerSize){this._showThumbs(E+1);
return 
}}this._showThumbs(0)
},_checkLoad:function(C,B){A.publish(this.getShowTopicName(),[{index:B}]);
this._updateNavControls();
this._loadingImages={};
this._thumbIndex=B;
if(this.thumbsNode.offsetWidth-C.offsetLeft<(this._scrollerSize*2)){this._loadNextPage()
}},_showThumbs:function(B){var H=this;
var B=arguments.length==0?this._thumbIndex:arguments[0];
B=Math.min(Math.max(B,0),this._maxPhotos);
if(B>=this._maxPhotos){return 
}var C=this._thumbs[B];
if(!C){return 
}var F=C.offsetLeft-this.thumbsNode.offsetLeft;
var E=C.offsetTop-this.thumbsNode.offsetTop;
var G=this.isHorizontal?F:E;
if((G>=this.thumbScroller[this._scrollAttr])&&(G+C[this._sizeAttr]<=this.thumbScroller[this._scrollAttr]+this._scrollerSize)){return 
}if(this.isScrollable){var D=this.isHorizontal?{x:F,y:0}:{x:0,y:E};
dojox.fx.smoothScroll({target:D,win:this.thumbScroller,duration:300,easing:dojox.fx.easing.easeOut,onEnd:A.hitch(this,"_checkLoad",C,B)}).play(10)
}else{if(this.isHorizontal){this.thumbScroller.scrollLeft=F
}else{this.thumbScroller.scrollTop=E
}this._checkLoad(C,B)
}},markImageLoaded:function(B){var C=A.byId("loadingDiv_"+this.widgetid+"_"+B);
if(C){this._setThumbClass(C,"thumbLoaded")
}this._loadedImages[B]=true
},_setThumbClass:function(B,C){if(!this.autoLoad){return 
}A.addClass(B,C)
},_loadNextPage:function(){if(this._loadInProgress){return 
}this._loadInProgress=true;
var F=this.request.start+(this._noImages==true?0:this.pageSize);
var E=F;
while(E<this._thumbs.length&&this._thumbs[E]){E++
}var D=this;
var B=function(G,I){if(G&&G.length){var H=0;
var J=function(){if(H>=G.length){D._loadInProgress=false;
return 
}var K=H++;
D._loadImage(G[K],E+K,J)
};
J();
D._updateNavControls()
}else{D._loadInProgress=false
}};
var C=function(){D._loadInProgress=false;
console.debug("Error getting items")
};
this.request.onComplete=B;
this.request.onError=C;
this.request.start=F;
this._noImages=false;
this.imageStore.fetch(this.request)
},_loadImage:function(G,I,L){var B=this.imageStore.getValue(G,this.imageThumbAttr);
var H=document.createElement("img");
var C=document.createElement("div");
C.setAttribute("id","img_"+this.widgetid+"_"+I);
C.appendChild(H);
H._index=I;
H._data=G;
this._thumbs[I]=C;
var E;
if(this.useLoadNotifier){E=document.createElement("div");
E.setAttribute("id","loadingDiv_"+this.widgetid+"_"+I);
this._setThumbClass(E,this._loadedImages[I]?"thumbLoaded":"thumbNotifier");
C.appendChild(E)
}var N=A.marginBox(this.thumbsNode);
var K;
var D;
if(this.isHorizontal){K=this.thumbWidth;
D="w"
}else{K=this.thumbHeight;
D="h"
}N=N[D];
var F=this.thumbScroller.scrollLeft,M=this.thumbScroller.scrollTop;
A.style(this.thumbsNode,this._sizeProperty,(N+K+20)+"px");
this.thumbScroller.scrollLeft=F;
this.thumbScroller.scrollTop=M;
this.thumbsNode.appendChild(C);
A.connect(H,"onload",this,function(){var O=A.marginBox(H)[D];
this._totalSize+=(Number(O)+4);
A.style(this.thumbsNode,this._sizeProperty,this._totalSize+"px");
if(this.useLoadNotifier){A.style(E,"width",(H.width-4)+"px")
}L();
return false
});
A.connect(H,"onclick",this,function(O){A.publish(this.getClickTopicName(),[{index:O.target._index,data:O.target._data,url:H.getAttribute("src"),largeUrl:this.imageStore.getValue(G,this.imageLargeAttr),title:this.imageStore.getValue(G,this.titleAttr),link:this.imageStore.getValue(G,this.linkAttr)}]);
return false
});
A.addClass(H,"imageGalleryThumb");
H.setAttribute("src",B);
var J=this.imageStore.getValue(G,this.titleAttr);
if(J){H.setAttribute("title",J)
}this._updateNavControls()
},_updateNavControls:function(){var B=[];
var G=function(I,J){var H=J?"addClass":"removeClass";
A[H](I,"enabled");
A[H](I,"thumbClickable")
};
var F=this.isHorizontal?"scrollLeft":"scrollTop";
var C=this.isHorizontal?"offsetWidth":"offsetHeight";
G(this.navPrev,(this.thumbScroller[F]>0));
var D=this._thumbs[this._thumbs.length-1];
var E=(this.thumbScroller[F]+this._scrollerSize<this.thumbsNode[C]);
G(this.navNext,E)
}})
}}});