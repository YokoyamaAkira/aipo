dojo._xdResourceLoaded({depends:[["provide","dijit._Widget"],["require","dijit._base"]],defineResource:function(A){if(!A._hasResource["dijit._Widget"]){A._hasResource["dijit._Widget"]=true;
A.provide("dijit._Widget");
A.require("dijit._base");
A.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(C,B){this.create(C,B)
},create:function(F,C){this.srcNodeRef=A.byId(C);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(F){A.mixin(this,F)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var B in this.attributeMap){var E=this[this.attributeMap[B]||"domNode"];
var D=this[B];
if(typeof D!="object"&&(D!==""||(F&&F[B]))){switch(B){case"class":A.addClass(E,D);
break;
case"style":if(E.style.cssText){E.style.cssText+="; "+D
}else{E.style.cssText=D
}break;
default:E.setAttribute(B,D)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||A.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(B){this.destroyDescendants();
this.destroy()
},destroy:function(B){this.uninitialize();
A.forEach(this._connects,function(C){A.forEach(C,A.disconnect)
});
this.destroyRendering(B);
dijit.registry.remove(this.id)
},destroyRendering:function(B){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){A._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){A._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){A.forEach(this.getDescendants(),function(B){B.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var B=A.query("[widgetId]",this.domNode);
return B.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(E,D,F){var C=[];
if(D=="ondijitclick"){var B=this;
if(!this.nodesWithKeyClick[E.nodeName]){C.push(A.connect(E,"onkeydown",this,function(G){if(G.keyCode==A.keys.ENTER){return(A.isString(F))?B[F](G):F.call(B,G)
}else{if(G.keyCode==A.keys.SPACE){A.stopEvent(G)
}}}));
C.push(A.connect(E,"onkeyup",this,function(G){if(G.keyCode==A.keys.SPACE){return A.isString(F)?B[F](G):F.call(B,G)
}}))
}D="onclick"
}C.push(A.connect(E,D,this,F));
this._connects.push(C);
return C
},disconnect:function(C){for(var B=0;
B<this._connects.length;
B++){if(this._connects[B]==C){A.forEach(C,A.disconnect);
this._connects.splice(B,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=A.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(A.style(this.domNode,"display")!="none")
}})
}}});