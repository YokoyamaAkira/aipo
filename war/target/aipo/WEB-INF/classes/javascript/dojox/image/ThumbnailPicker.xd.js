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
},setDataStore:function(C,E,B){this.reset();
this.request={query:{},start:E.start?E.start:0,count:E.count?E.count:10,onBegin:A.hitch(this,function(G){this._maxPhotos=G
})};
if(E.query){A.mixin(this.request.query,E.query)
}if(B&&B.imageThumbAttr){var F=["imageThumbAttr","imageLargeAttr","linkAttr","titleAttr"];
for(var D=0;
D<F.length;
D++){if(B[F[D]]){this[F[D]]=B[F[D]]
}}}this.request.start=0;
this.request.count=this.pageSize;
this.imageStore=C;
if(!this.init()){this._loadNextPage()
}},reset:function(){this._loadedImages={};
var C;
for(var B=0;
B<this._thumbs.length;
B++){C=this._thumbs[B];
if(C){if(C.parentNode){C.parentNode.removeChild(C)
}}}this._thumbs=[];
this.isInitialized=false;
this._noImages=true
},isVisible:function(C){var E=this._thumbs[C];
if(!E){return false
}var B=this.isHorizontal?"offsetLeft":"offsetTop";
var F=this.isHorizontal?"offsetWidth":"offsetHeight";
var D=this.isHorizontal?"scrollLeft":"scrollTop";
var G=E[B]-this.thumbsNode[B];
return(G>=this.thumbScroller[D]&&G+E[F]<=this.thumbScroller[D]+this._scrollerSize)
},_next:function(){var C=this.isHorizontal?"offsetLeft":"offsetTop";
var B=this.isHorizontal?"offsetWidth":"offsetHeight";
var E=this.thumbsNode[C];
var G=this._thumbs[this._thumbIndex];
var D=G[C]-E;
var F=-1,H;
for(var I=this._thumbIndex+1;
I<this._thumbs.length;
I++){H=this._thumbs[I];
if(H[C]-E+H[B]-D>this._scrollerSize){this._showThumbs(I);
return 
}}},_prev:function(){if(this.thumbScroller[this.isHorizontal?"scrollLeft":"scrollTop"]==0){return 
}var C=this.isHorizontal?"offsetLeft":"offsetTop";
var E=this.isHorizontal?"offsetWidth":"offsetHeight";
var H=this._thumbs[this._thumbIndex];
var F=H[C]-this.thumbsNode[C];
var G=-1,B;
for(var D=this._thumbIndex-1;
D>-1;
D--){B=this._thumbs[D];
if(F-B[C]>this._scrollerSize){this._showThumbs(D+1);
return 
}}this._showThumbs(0)
},_checkLoad:function(B,C){A.publish(this.getShowTopicName(),[{index:C}]);
this._updateNavControls();
this._loadingImages={};
this._thumbIndex=C;
if(this.thumbsNode.offsetWidth-B.offsetLeft<(this._scrollerSize*2)){this._loadNextPage()
}},_showThumbs:function(G){var C=this;
var G=arguments.length==0?this._thumbIndex:arguments[0];
G=Math.min(Math.max(G,0),this._maxPhotos);
if(G>=this._maxPhotos){return 
}var H=this._thumbs[G];
if(!H){return 
}var E=H.offsetLeft-this.thumbsNode.offsetLeft;
var D=H.offsetTop-this.thumbsNode.offsetTop;
var F=this.isHorizontal?E:D;
if((F>=this.thumbScroller[this._scrollAttr])&&(F+H[this._sizeAttr]<=this.thumbScroller[this._scrollAttr]+this._scrollerSize)){return 
}if(this.isScrollable){var B=this.isHorizontal?{x:E,y:0}:{x:0,y:D};
dojox.fx.smoothScroll({target:B,win:this.thumbScroller,duration:300,easing:dojox.fx.easing.easeOut,onEnd:A.hitch(this,"_checkLoad",H,G)}).play(10)
}else{if(this.isHorizontal){this.thumbScroller.scrollLeft=E
}else{this.thumbScroller.scrollTop=D
}this._checkLoad(H,G)
}},markImageLoaded:function(C){var B=A.byId("loadingDiv_"+this.widgetid+"_"+C);
if(B){this._setThumbClass(B,"thumbLoaded")
}this._loadedImages[C]=true
},_setThumbClass:function(C,B){if(!this.autoLoad){return 
}A.addClass(C,B)
},_loadNextPage:function(){if(this._loadInProgress){return 
}this._loadInProgress=true;
var B=this.request.start+(this._noImages==true?0:this.pageSize);
var F=B;
while(F<this._thumbs.length&&this._thumbs[F]){F++
}var E=this;
var C=function(G,I){if(G&&G.length){var H=0;
var J=function(){if(H>=G.length){E._loadInProgress=false;
return 
}var K=H++;
E._loadImage(G[K],F+K,J)
};
J();
E._updateNavControls()
}else{E._loadInProgress=false
}};
var D=function(){E._loadInProgress=false;
console.debug("Error getting items")
};
this.request.onComplete=C;
this.request.onError=D;
this.request.start=B;
this._noImages=false;
this.imageStore.fetch(this.request)
},_loadImage:function(E,G,J){var M=this.imageStore.getValue(E,this.imageThumbAttr);
var F=document.createElement("img");
var N=document.createElement("div");
N.setAttribute("id","img_"+this.widgetid+"_"+G);
N.appendChild(F);
F._index=G;
F._data=E;
this._thumbs[G]=N;
var B;
if(this.useLoadNotifier){B=document.createElement("div");
B.setAttribute("id","loadingDiv_"+this.widgetid+"_"+G);
this._setThumbClass(B,this._loadedImages[G]?"thumbLoaded":"thumbNotifier");
N.appendChild(B)
}var L=A.marginBox(this.thumbsNode);
var I;
var D;
if(this.isHorizontal){I=this.thumbWidth;
D="w"
}else{I=this.thumbHeight;
D="h"
}L=L[D];
var C=this.thumbScroller.scrollLeft,K=this.thumbScroller.scrollTop;
A.style(this.thumbsNode,this._sizeProperty,(L+I+20)+"px");
this.thumbScroller.scrollLeft=C;
this.thumbScroller.scrollTop=K;
this.thumbsNode.appendChild(N);
A.connect(F,"onload",this,function(){var O=A.marginBox(F)[D];
this._totalSize+=(Number(O)+4);
A.style(this.thumbsNode,this._sizeProperty,this._totalSize+"px");
if(this.useLoadNotifier){A.style(B,"width",(F.width-4)+"px")
}J();
return false
});
A.connect(F,"onclick",this,function(O){A.publish(this.getClickTopicName(),[{index:O.target._index,data:O.target._data,url:F.getAttribute("src"),largeUrl:this.imageStore.getValue(E,this.imageLargeAttr),title:this.imageStore.getValue(E,this.titleAttr),link:this.imageStore.getValue(E,this.linkAttr)}]);
return false
});
A.addClass(F,"imageGalleryThumb");
F.setAttribute("src",M);
var H=this.imageStore.getValue(E,this.titleAttr);
if(H){F.setAttribute("title",H)
}this._updateNavControls()
},_updateNavControls:function(){var C=[];
var B=function(I,J){var H=J?"addClass":"removeClass";
A[H](I,"enabled");
A[H](I,"thumbClickable")
};
var G=this.isHorizontal?"scrollLeft":"scrollTop";
var D=this.isHorizontal?"offsetWidth":"offsetHeight";
B(this.navPrev,(this.thumbScroller[G]>0));
var E=this._thumbs[this._thumbs.length-1];
var F=(this.thumbScroller[G]+this._scrollerSize<this.thumbsNode[D]);
B(this.navNext,F)
}})
}}});