dojo._xdResourceLoaded({depends:[["provide","dojox.layout.ResizeHandle"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dojo.fx"]],defineResource:function(A){if(!A._hasResource["dojox.layout.ResizeHandle"]){A._hasResource["dojox.layout.ResizeHandle"]=true;
A.provide("dojox.layout.ResizeHandle");
A.experimental("dojox.layout.ResizeHandle");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("dojo.fx");
A.declare("dojox.layout.ResizeHandle",[dijit._Widget,dijit._Templated],{targetId:"",targetContainer:null,resizeAxis:"xy",activeResize:false,activeResizeClass:"dojoxResizeHandleClone",animateSizing:true,animateMethod:"chain",animateDuration:225,minHeight:100,minWidth:100,templateString:'<div dojoAttachPoint="resizeHandle" class="dojoxResizeHandle"><div></div></div>',_isSizing:false,_connects:[],_activeResizeNode:null,_activeResizeLastEvent:null,_resizeX:true,_resizeY:true,postCreate:function(){A.connect(this.resizeHandle,"onmousedown",this,"_beginSizing");
if(!this.activeResize){this._activeResizeNode=document.createElement("div");
A.addClass(this._activeResizeNode,this.activeResizeClass)
}else{this.animateSizing=false
}if(!this.minSize){this.minSize={w:this.minWidth,h:this.minHeight}
}this._resizeX=this._resizeY=false;
switch(this.resizeAxis.toLowerCase()){case"xy":this._resizeX=this._resizeY=true;
A.addClass(this.resizeHandle,"dojoxResizeNW");
break;
case"x":this._resizeX=true;
A.addClass(this.resizeHandle,"dojoxResizeW");
break;
case"y":this._resizeY=true;
A.addClass(this.resizeHandle,"dojoxResizeN");
break
}},_beginSizing:function(B){if(this._isSizing){return false
}this.targetWidget=dijit.byId(this.targetId);
if(this.targetWidget){this.activeResize=true
}this.targetDomNode=this.targetWidget?this.targetWidget.domNode:A.byId(this.targetId);
if(this.targetContainer){this.targetDomNode=this.targetContainer
}if(!this.targetDomNode){return 
}if(!this.activeResize){this.targetDomNode.appendChild(this._activeResizeNode);
A.fadeIn({node:this._activeResizeNode,duration:120,beforeBegin:A.hitch(this,function(){this._activeResizeNode.style.display=""
})}).play()
}this._isSizing=true;
this.startPoint={x:B.clientX,y:B.clientY};
var C=(this.targetWidget)?A.marginBox(this.targetDomNode):A.contentBox(this.targetDomNode);
this.startSize={w:C.w,h:C.h};
this._connects=[];
this._connects.push(A.connect(document,"onmousemove",this,"_updateSizing"));
this._connects.push(A.connect(document,"onmouseup",this,"_endSizing"));
B.preventDefault()
},_updateSizing:function(C){if(this.activeResize){this._changeSizing(C)
}else{var B=this._getNewCoords(C);
if(B===false){return 
}A.style(this._activeResizeNode,"width",B.width+"px");
A.style(this._activeResizeNode,"height",B.height+"px");
this._activeResizeNode.style.display=""
}},_getNewCoords:function(E){try{if(!E.clientX||!E.clientY){return false
}}catch(E){return false
}this._activeResizeLastEvent=E;
var C=this.startPoint.x-E.clientX;
var B=this.startPoint.y-E.clientY;
var F=(this._resizeX)?this.startSize.w-C:this.startSize.w;
var D=(this._resizeY)?this.startSize.h-B:this.startSize.h;
if(this.minSize){if(F<this.minSize.w){F=this.minSize.w
}if(D<this.minSize.h){D=this.minSize.h
}}return{width:F,height:D}
},_changeSizing:function(D){var B=this._getNewCoords(D);
if(B===false){return 
}if(this.targetWidget&&typeof this.targetWidget.resize=="function"){this.targetWidget.resize({w:B.width,h:B.height})
}else{if(this.animateSizing){var C=A.fx[this.animateMethod]([A.animateProperty({node:this.targetDomNode,properties:{width:{start:this.startSize.w,end:B.width,unit:"px"}},duration:this.animateDuration}),A.animateProperty({node:this.targetDomNode,properties:{height:{start:this.startSize.h,end:B.height,unit:"px"}},duration:this.animateDuration})]);
C.play()
}else{A.style(this.targetDomNode,"width",B.width+"px");
A.style(this.targetDomNode,"height",B.height+"px")
}}D.preventDefault()
},_endSizing:function(B){A.forEach(this._connects,function(C){A.disconnect(C)
});
if(!this.activeResize){A.fadeOut({node:this._activeResizeNode,duration:250,onEnd:A.hitch(this,function(){this._activeResizeNode.style.display="none"
})}).play();
this._changeSizing(B)
}this._isSizing=false
}})
}}});