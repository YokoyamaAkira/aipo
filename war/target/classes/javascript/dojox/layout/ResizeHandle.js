if(!dojo._hasResource["dojox.layout.ResizeHandle"]){dojo._hasResource["dojox.layout.ResizeHandle"]=true;
dojo.provide("dojox.layout.ResizeHandle");
dojo.experimental("dojox.layout.ResizeHandle");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.fx");
dojo.declare("dojox.layout.ResizeHandle",[dijit._Widget,dijit._Templated],{targetId:"",targetContainer:null,resizeAxis:"xy",activeResize:false,activeResizeClass:"dojoxResizeHandleClone",animateSizing:true,animateMethod:"chain",animateDuration:225,minHeight:100,minWidth:100,templateString:'<div dojoAttachPoint="resizeHandle" class="dojoxResizeHandle"><div></div></div>',_isSizing:false,_connects:[],_activeResizeNode:null,_activeResizeLastEvent:null,_resizeX:true,_resizeY:true,postCreate:function(){dojo.connect(this.resizeHandle,"onmousedown",this,"_beginSizing");
if(!this.activeResize){this._activeResizeNode=document.createElement("div");
dojo.addClass(this._activeResizeNode,this.activeResizeClass)
}else{this.animateSizing=false
}if(!this.minSize){this.minSize={w:this.minWidth,h:this.minHeight}
}this._resizeX=this._resizeY=false;
switch(this.resizeAxis.toLowerCase()){case"xy":this._resizeX=this._resizeY=true;
dojo.addClass(this.resizeHandle,"dojoxResizeNW");
break;
case"x":this._resizeX=true;
dojo.addClass(this.resizeHandle,"dojoxResizeW");
break;
case"y":this._resizeY=true;
dojo.addClass(this.resizeHandle,"dojoxResizeN");
break
}},_beginSizing:function(B){if(this._isSizing){return false
}this.targetWidget=dijit.byId(this.targetId);
if(this.targetWidget){this.activeResize=true
}this.targetDomNode=this.targetWidget?this.targetWidget.domNode:dojo.byId(this.targetId);
if(this.targetContainer){this.targetDomNode=this.targetContainer
}if(!this.targetDomNode){return 
}if(!this.activeResize){this.targetDomNode.appendChild(this._activeResizeNode);
dojo.fadeIn({node:this._activeResizeNode,duration:120,beforeBegin:dojo.hitch(this,function(){this._activeResizeNode.style.display=""
})}).play()
}this._isSizing=true;
this.startPoint={x:B.clientX,y:B.clientY};
var A=(this.targetWidget)?dojo.marginBox(this.targetDomNode):dojo.contentBox(this.targetDomNode);
this.startSize={w:A.w,h:A.h};
this._connects=[];
this._connects.push(dojo.connect(document,"onmousemove",this,"_updateSizing"));
this._connects.push(dojo.connect(document,"onmouseup",this,"_endSizing"));
B.preventDefault()
},_updateSizing:function(A){if(this.activeResize){this._changeSizing(A)
}else{var B=this._getNewCoords(A);
if(B===false){return 
}dojo.style(this._activeResizeNode,"width",B.width+"px");
dojo.style(this._activeResizeNode,"height",B.height+"px");
this._activeResizeNode.style.display=""
}},_getNewCoords:function(C){try{if(!C.clientX||!C.clientY){return false
}}catch(C){return false
}this._activeResizeLastEvent=C;
var A=this.startPoint.x-C.clientX;
var E=this.startPoint.y-C.clientY;
var D=(this._resizeX)?this.startSize.w-A:this.startSize.w;
var B=(this._resizeY)?this.startSize.h-E:this.startSize.h;
if(this.minSize){if(D<this.minSize.w){D=this.minSize.w
}if(B<this.minSize.h){B=this.minSize.h
}}return{width:D,height:B}
},_changeSizing:function(B){var C=this._getNewCoords(B);
if(C===false){return 
}if(this.targetWidget&&typeof this.targetWidget.resize=="function"){this.targetWidget.resize({w:C.width,h:C.height})
}else{if(this.animateSizing){var A=dojo.fx[this.animateMethod]([dojo.animateProperty({node:this.targetDomNode,properties:{width:{start:this.startSize.w,end:C.width,unit:"px"}},duration:this.animateDuration}),dojo.animateProperty({node:this.targetDomNode,properties:{height:{start:this.startSize.h,end:C.height,unit:"px"}},duration:this.animateDuration})]);
A.play()
}else{dojo.style(this.targetDomNode,"width",C.width+"px");
dojo.style(this.targetDomNode,"height",C.height+"px")
}}B.preventDefault()
},_endSizing:function(A){dojo.forEach(this._connects,function(B){dojo.disconnect(B)
});
if(!this.activeResize){dojo.fadeOut({node:this._activeResizeNode,duration:250,onEnd:dojo.hitch(this,function(){this._activeResizeNode.style.display="none"
})}).play();
this._changeSizing(A)
}this._isSizing=false
}})
};