if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.require("dijit._base");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(A,B){this.create(A,B)
},create:function(D,A){this.srcNodeRef=dojo.byId(A);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(D){dojo.mixin(this,D)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var E in this.attributeMap){var C=this[this.attributeMap[E]||"domNode"];
var B=this[E];
if(typeof B!="object"&&(B!==""||(D&&D[E]))){switch(E){case"class":dojo.addClass(C,B);
break;
case"style":if(C.style.cssText){C.style.cssText+="; "+B
}else{C.style.cssText=B
}break;
default:C.setAttribute(E,B)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||dojo.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(A){this.destroyDescendants();
this.destroy()
},destroy:function(A){this.uninitialize();
dojo.forEach(this._connects,function(B){dojo.forEach(B,dojo.disconnect)
});
this.destroyRendering(A);
dijit.registry.remove(this.id)
},destroyRendering:function(A){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){dojo._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){dojo._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){dojo.forEach(this.getDescendants(),function(A){A.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var A=dojo.query("[widgetId]",this.domNode);
return A.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(C,B,D){var A=[];
if(B=="ondijitclick"){var E=this;
if(!this.nodesWithKeyClick[C.nodeName]){A.push(dojo.connect(C,"onkeydown",this,function(F){if(F.keyCode==dojo.keys.ENTER){return(dojo.isString(D))?E[D](F):D.call(E,F)
}else{if(F.keyCode==dojo.keys.SPACE){dojo.stopEvent(F)
}}}));
A.push(dojo.connect(C,"onkeyup",this,function(F){if(F.keyCode==dojo.keys.SPACE){return dojo.isString(D)?E[D](F):D.call(E,F)
}}))
}B="onclick"
}A.push(dojo.connect(C,B,this,D));
this._connects.push(A);
return A
},disconnect:function(A){for(var B=0;
B<this._connects.length;
B++){if(this._connects[B]==A){dojo.forEach(A,dojo.disconnect);
this._connects.splice(B,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=dojo.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(dojo.style(this.domNode,"display")!="none")
}})
};