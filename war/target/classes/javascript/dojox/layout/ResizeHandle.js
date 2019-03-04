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
}},_beginSizing:function(A){if(this._isSizing){return false
}this.targetWidget=dijit.byId(this.targetId);
if(this.targetWidget){this.activeResize=true
}this.targetDomNode=this.targetWidget?this.targetWidget.domNode:dojo.byId(this.targetId);
if(this.targetContainer){this.targetDomNode=this.targetContainer
}if(!this.targetDomNode){return 
}if(!this.activeResize){this.targetDomNode.appendChild(this._activeResizeNode);
dojo.fadeIn({node:this._activeResizeNode,duration:120,beforeBegin:dojo.hitch(this,function(){this._activeResizeNode.style.display=""
})}).play()
}this._isSizing=true;
this.startPoint={x:A.clientX,y:A.clientY};
var B=(this.targetWidget)?dojo.marginBox(this.targetDomNode):dojo.contentBox(this.targetDomNode);
this.startSize={w:B.w,h:B.h};
this._connects=[];
this._connects.push(dojo.connect(document,"onmousemove",this,"_updateSizing"));
this._connects.push(dojo.connect(document,"onmouseup",this,"_endSizing"));
A.preventDefault()
},_updateSizing:function(B){if(this.activeResize){this._changeSizing(B)
}else{var A=this._getNewCoords(B);
if(A===false){return 
}dojo.style(this._activeResizeNode,"width",A.width+"px");
dojo.style(this._activeResizeNode,"height",A.height+"px");
this._activeResizeNode.style.display=""
}},_getNewCoords:function(D){try{if(!D.clientX||!D.clientY){return false
}}catch(D){return false
}this._activeResizeLastEvent=D;
var B=this.startPoint.x-D.clientX;
var A=this.startPoint.y-D.clientY;
var E=(this._resizeX)?this.startSize.w-B:this.startSize.w;
var C=(this._resizeY)?this.startSize.h-A:this.startSize.h;
if(this.minSize){if(E<this.minSize.w){E=this.minSize.w
}if(C<this.minSize.h){C=this.minSize.h
}}return{width:E,height:C}
},_changeSizing:function(C){var A=this._getNewCoords(C);
if(A===false){return 
}if(this.targetWidget&&typeof this.targetWidget.resize=="function"){this.targetWidget.resize({w:A.width,h:A.height})
}else{if(this.animateSizing){var B=dojo.fx[this.animateMethod]([dojo.animateProperty({node:this.targetDomNode,properties:{width:{start:this.startSize.w,end:A.width,unit:"px"}},duration:this.animateDuration}),dojo.animateProperty({node:this.targetDomNode,properties:{height:{start:this.startSize.h,end:A.height,unit:"px"}},duration:this.animateDuration})]);
B.play()
}else{dojo.style(this.targetDomNode,"width",A.width+"px");
dojo.style(this.targetDomNode,"height",A.height+"px")
}}C.preventDefault()
},_endSizing:function(A){dojo.forEach(this._connects,function(B){dojo.disconnect(B)
});
if(!this.activeResize){dojo.fadeOut({node:this._activeResizeNode,duration:250,onEnd:dojo.hitch(this,function(){this._activeResizeNode.style.display="none"
})}).play();
this._changeSizing(A)
}this._isSizing=false
}})
};