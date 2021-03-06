dojo._xdResourceLoaded({depends:[["provide","dojox.image.Gallery"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dojox.image.ThumbnailPicker"],["require","dojox.image.SlideShow"]],defineResource:function(A){if(!A._hasResource["dojox.image.Gallery"]){A._hasResource["dojox.image.Gallery"]=true;
A.provide("dojox.image.Gallery");
A.experimental("dojox.image.Gallery");
A.require("dojo.fx");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("dojox.image.ThumbnailPicker");
A.require("dojox.image.SlideShow");
A.declare("dojox.image.Gallery",[dijit._Widget,dijit._Templated],{imageHeight:375,imageWidth:500,pageSize:dojox.image.SlideShow.prototype.pageSize,autoLoad:true,linkAttr:"link",imageThumbAttr:"imageUrlThumb",imageLargeAttr:"imageUrl",titleAttr:"title",slideshowInterval:3,templateString:'<div dojoAttachPoint="outerNode" class="imageGalleryWrapper">\r\n\t<div dojoAttachPoint="thumbPickerNode"></div>\r\n\t<div dojoAttachPoint="slideShowNode"></div>\r\n</div>\r\n',postCreate:function(){this.widgetid=this.id;
this.inherited("postCreate",arguments);
this.thumbPicker=new dojox.image.ThumbnailPicker({linkAttr:this.linkAttr,imageLargeAttr:this.imageLargeAttr,titleAttr:this.titleAttr,useLoadNotifier:true},this.thumbPickerNode);
this.slideShow=new dojox.image.SlideShow({imageHeight:this.imageHeight,imageWidth:this.imageWidth,autoLoad:this.autoLoad,linkAttr:this.linkAttr,imageLargeAttr:this.imageLargeAttr,titleAttr:this.titleAttr,slideshowInterval:this.slideshowInterval,pageSize:this.pageSize},this.slideShowNode);
var B=this;
A.subscribe(this.slideShow.getShowTopicName(),function(C){B.thumbPicker._showThumbs(C.index)
});
A.subscribe(this.thumbPicker.getClickTopicName(),function(C){B.slideShow.showImage(C.index)
});
A.subscribe(this.thumbPicker.getShowTopicName(),function(C){B.slideShow.moveImageLoadingPointer(C.index)
});
A.subscribe(this.slideShow.getLoadTopicName(),function(C){B.thumbPicker.markImageLoaded(C)
});
this._centerChildren()
},setDataStore:function(C,D,B){this.thumbPicker.setDataStore(C,D,B);
this.slideShow.setDataStore(C,D,B)
},reset:function(){this.slideShow.reset();
this.thumbPicker.reset()
},showNextImage:function(B){this.slideShow.showNextImage()
},toggleSlideshow:function(){this.slideShow.toggleSlideshow()
},showImage:function(C,B){this.slideShow.showImage(C,B)
},_centerChildren:function(){var C=A.marginBox(this.thumbPicker.outerNode);
var D=A.marginBox(this.slideShow.outerNode);
var B=(C.w-D.w)/2;
if(B>0){A.style(this.slideShow.outerNode,"marginLeft",B+"px")
}else{if(B<0){A.style(this.thumbPicker.outerNode,"marginLeft",(B*-1)+"px")
}}}})
}}});