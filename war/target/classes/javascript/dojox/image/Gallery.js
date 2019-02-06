if(!dojo._hasResource["dojox.image.Gallery"]){dojo._hasResource["dojox.image.Gallery"]=true;
dojo.provide("dojox.image.Gallery");
dojo.experimental("dojox.image.Gallery");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojox.image.ThumbnailPicker");
dojo.require("dojox.image.SlideShow");
dojo.declare("dojox.image.Gallery",[dijit._Widget,dijit._Templated],{imageHeight:375,imageWidth:500,pageSize:dojox.image.SlideShow.prototype.pageSize,autoLoad:true,linkAttr:"link",imageThumbAttr:"imageUrlThumb",imageLargeAttr:"imageUrl",titleAttr:"title",slideshowInterval:3,templateString:'<div dojoAttachPoint="outerNode" class="imageGalleryWrapper">\r\n\t<div dojoAttachPoint="thumbPickerNode"></div>\r\n\t<div dojoAttachPoint="slideShowNode"></div>\r\n</div>\r\n',postCreate:function(){this.widgetid=this.id;
this.inherited("postCreate",arguments);
this.thumbPicker=new dojox.image.ThumbnailPicker({linkAttr:this.linkAttr,imageLargeAttr:this.imageLargeAttr,titleAttr:this.titleAttr,useLoadNotifier:true},this.thumbPickerNode);
this.slideShow=new dojox.image.SlideShow({imageHeight:this.imageHeight,imageWidth:this.imageWidth,autoLoad:this.autoLoad,linkAttr:this.linkAttr,imageLargeAttr:this.imageLargeAttr,titleAttr:this.titleAttr,slideshowInterval:this.slideshowInterval,pageSize:this.pageSize},this.slideShowNode);
var A=this;
dojo.subscribe(this.slideShow.getShowTopicName(),function(B){A.thumbPicker._showThumbs(B.index)
});
dojo.subscribe(this.thumbPicker.getClickTopicName(),function(B){A.slideShow.showImage(B.index)
});
dojo.subscribe(this.thumbPicker.getShowTopicName(),function(B){A.slideShow.moveImageLoadingPointer(B.index)
});
dojo.subscribe(this.slideShow.getLoadTopicName(),function(B){A.thumbPicker.markImageLoaded(B)
});
this._centerChildren()
},setDataStore:function(C,A,B){this.thumbPicker.setDataStore(C,A,B);
this.slideShow.setDataStore(C,A,B)
},reset:function(){this.slideShow.reset();
this.thumbPicker.reset()
},showNextImage:function(A){this.slideShow.showNextImage()
},toggleSlideshow:function(){this.slideShow.toggleSlideshow()
},showImage:function(B,A){this.slideShow.showImage(B,A)
},_centerChildren:function(){var C=dojo.marginBox(this.thumbPicker.outerNode);
var A=dojo.marginBox(this.slideShow.outerNode);
var B=(C.w-A.w)/2;
if(B>0){dojo.style(this.slideShow.outerNode,"marginLeft",B+"px")
}else{if(B<0){dojo.style(this.thumbPicker.outerNode,"marginLeft",(B*-1)+"px")
}}}})
};