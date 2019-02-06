dojo._xdResourceLoaded({depends:[["provide","dojox.image.Lightbox"],["require","dijit.Dialog"],["require","dojox.fx"]],defineResource:function(A){if(!A._hasResource["dojox.image.Lightbox"]){A._hasResource["dojox.image.Lightbox"]=true;
A.provide("dojox.image.Lightbox");
A.experimental("dojox.image.Lightbox");
A.require("dijit.Dialog");
A.require("dojox.fx");
A.declare("dojox.image.Lightbox",dijit._Widget,{group:"",title:"",href:"",duration:500,_allowPassthru:false,_attachedDialog:null,startup:function(){this.inherited("startup",arguments);
var B=dijit.byId("dojoxLightboxDialog");
if(B){this._attachedDialog=B
}else{this._attachedDialog=new dojox.image._LightboxDialog({id:"dojoxLightboxDialog"});
this._attachedDialog.startup()
}if(!this.store){this._addSelf();
this.connect(this.domNode,"onclick","_handleClick")
}},_addSelf:function(){this._attachedDialog.addImage({href:this.href,title:this.title},this.group||null)
},_handleClick:function(B){if(!this._allowPassthru){B.preventDefault()
}else{return 
}this.show()
},show:function(){this._attachedDialog.show(this)
},disable:function(){this._allowPassthru=true
},enable:function(){this._allowPassthru=false
}});
A.declare("dojox.image._LightboxDialog",dijit.Dialog,{title:"",inGroup:null,imgUrl:"",_groups:{XnoGroupX:[]},_imageReady:false,templateString:'<div class="dojoxLightbox" dojoAttachPoint="containerNode">\r\n\t<div style="position:relative">\r\n\t\t<div dojoAttachPoint="imageContainer" class="dojoxLightboxContainer">\r\n\t\t\t<img dojoAttachPoint="imgNode" src="${imgUrl}" class="dojoxLightboxImage" alt="${title}">\r\n\t\t\t<div class="dojoxLightboxFooter" dojoAttachPoint="titleNode">\r\n\t\t\t\t<div class="dijitInline LightboxClose" dojoAttachPoint="closeNode"></div>\r\n\t\t\t\t<div class="dijitInline LightboxNext" dojoAttachPoint="nextNode"></div>\t\r\n\t\t\t\t<div class="dijitInline LightboxPrev" dojoAttachPoint="prevNode"></div>\r\n\r\n\t\t\t\t<div class="dojoxLightboxText"><span dojoAttachPoint="textNode">${title}</span><span dojoAttachPoint="groupCount" class="dojoxLightboxGroupText"></span></div>\r\n\t\t\t</div>\r\n\t\t</div>\t\r\n\t\t\r\n\t</div>\r\n</div>\r\n',startup:function(){this.inherited("startup",arguments);
A.connect(document.documentElement,"onkeypress",this,"_handleKey");
this.connect(window,"onresize","_position");
this.connect(this.nextNode,"onclick","_nextImage");
this.connect(this.prevNode,"onclick","_prevImage");
this.connect(this.closeNode,"onclick","hide")
},show:function(C){A.style(this.imgNode,"opacity","0");
A.style(this.titleNode,"opacity","0");
if(!this.open){this.inherited("show",arguments)
}this._imageReady=false;
this.imgNode.src=C.href;
if((C.group&&!(C=="XnoGroupX"))||this.inGroup){if(!this.inGroup){this.inGroup=this._groups[(C.group)];
var B=0;
A.forEach(this.inGroup,function(D){if(D.href==C.href){this._positionIndex=B
}B++
},this)
}if(!this._positionIndex){this._positionIndex=0;
this.imgNode.src=this.inGroup[this._positionIndex].href
}this.groupCount.innerHTML=" ("+(this._positionIndex+1)+" of "+this.inGroup.length+")";
this.prevNode.style.visibility="visible";
this.nextNode.style.visibility="visible"
}else{this.groupCount.innerHTML="";
this.prevNode.style.visibility="hidden";
this.nextNode.style.visibility="hidden"
}this.textNode.innerHTML=C.title;
if(!this._imageReady||this.imgNode.complete===true){this._imgConnect=A.connect(this.imgNode,"onload",this,function(){this._imageReady=true;
this.resizeTo({w:this.imgNode.width,h:this.imgNode.height,duration:this.duration});
A.disconnect(this._imgConnect)
});
if(A.isIE){this.imgNode.src=this.imgNode.src
}}else{this.resizeTo({w:this.imgNode.width,h:this.imgNode.height,duration:1})
}},_nextImage:function(){if(this._positionIndex+1<this.inGroup.length){this._positionIndex++
}else{this._positionIndex=0
}this._loadImage()
},_prevImage:function(){if(this._positionIndex==0){this._positionIndex=this.inGroup.length-1
}else{this._positionIndex--
}this._loadImage()
},_loadImage:function(){var B=A.fx.combine([A.fadeOut({node:this.imgNode,duration:(this.duration/2)}),A.fadeOut({node:this.titleNode,duration:(this.duration/2)})]);
this.connect(B,"onEnd","_prepNodes");
B.play(10)
},_prepNodes:function(){this._imageReady=false;
this.show({href:this.inGroup[this._positionIndex].href,title:this.inGroup[this._positionIndex].title})
},resizeTo:function(C){var B=dojox.fx.sizeTo({node:this.containerNode,duration:C.duration||this.duration,width:C.w,height:C.h+30});
this.connect(B,"onEnd","_showImage");
B.play(this.duration)
},_showImage:function(){A.fadeIn({node:this.imgNode,duration:this.duration,onEnd:A.hitch(this,"_showNav")}).play(75)
},_showNav:function(){A.fadeIn({node:this.titleNode,duration:200}).play(25)
},hide:function(){A.fadeOut({node:this.titleNode,duration:200}).play(25);
this.inherited("hide",arguments);
this.inGroup=null;
this._positionIndex=null
},addImage:function(B,D){var C=D;
if(!B.href){return 
}if(C){if(this._groups[(C)]){this._groups[(C)].push(B)
}else{this._groups[(C)]=[(B)]
}}else{this._groups.XnoGroupX.push(B)
}},_handleKey:function(B){if(!this.open){return 
}var C=(B.charCode==A.keys.SPACE?A.keys.SPACE:B.keyCode);
switch(C){case A.keys.ESCAPE:this.hide();
break;
case A.keys.DOWN_ARROW:case A.keys.RIGHT_ARROW:case 78:this._nextImage();
break;
case A.keys.UP_ARROW:case A.keys.LEFT_ARROW:case 80:this._prevImage();
break
}}})
}}});