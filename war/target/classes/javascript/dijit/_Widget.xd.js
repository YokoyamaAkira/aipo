dojo._xdResourceLoaded({depends:[["provide","dijit._Widget"],["require","dijit._base"]],defineResource:function(A){if(!A._hasResource["dijit._Widget"]){A._hasResource["dijit._Widget"]=true;
A.provide("dijit._Widget");
A.require("dijit._base");
A.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(B,C){this.create(B,C)
},create:function(B,D){this.srcNodeRef=A.byId(D);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(B){A.mixin(this,B)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var C in this.attributeMap){var F=this[this.attributeMap[C]||"domNode"];
var E=this[C];
if(typeof E!="object"&&(E!==""||(B&&B[C]))){switch(C){case"class":A.addClass(F,E);
break;
case"style":if(F.style.cssText){F.style.cssText+="; "+E
}else{F.style.cssText=E
}break;
default:F.setAttribute(C,E)
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
},nodesWithKeyClick:["input","button"],connect:function(F,E,B){var D=[];
if(E=="ondijitclick"){var C=this;
if(!this.nodesWithKeyClick[F.nodeName]){D.push(A.connect(F,"onkeydown",this,function(G){if(G.keyCode==A.keys.ENTER){return(A.isString(B))?C[B](G):B.call(C,G)
}else{if(G.keyCode==A.keys.SPACE){A.stopEvent(G)
}}}));
D.push(A.connect(F,"onkeyup",this,function(G){if(G.keyCode==A.keys.SPACE){return A.isString(B)?C[B](G):B.call(C,G)
}}))
}E="onclick"
}D.push(A.connect(F,E,this,B));
this._connects.push(D);
return D
},disconnect:function(B){for(var C=0;
C<this._connects.length;
C++){if(this._connects[C]==B){A.forEach(B,A.disconnect);
this._connects.splice(C,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=A.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(A.style(this.domNode,"display")!="none")
}})
}}});