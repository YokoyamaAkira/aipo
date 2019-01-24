if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.require("dijit._base");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(B,A){this.create(B,A)
},create:function(E,B){this.srcNodeRef=dojo.byId(B);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(E){dojo.mixin(this,E)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var A in this.attributeMap){var D=this[this.attributeMap[A]||"domNode"];
var C=this[A];
if(typeof C!="object"&&(C!==""||(E&&E[A]))){switch(A){case"class":dojo.addClass(D,C);
break;
case"style":if(D.style.cssText){D.style.cssText+="; "+C
}else{D.style.cssText=C
}break;
default:D.setAttribute(A,C)
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
},nodesWithKeyClick:["input","button"],connect:function(D,C,E){var B=[];
if(C=="ondijitclick"){var A=this;
if(!this.nodesWithKeyClick[D.nodeName]){B.push(dojo.connect(D,"onkeydown",this,function(F){if(F.keyCode==dojo.keys.ENTER){return(dojo.isString(E))?A[E](F):E.call(A,F)
}else{if(F.keyCode==dojo.keys.SPACE){dojo.stopEvent(F)
}}}));
B.push(dojo.connect(D,"onkeyup",this,function(F){if(F.keyCode==dojo.keys.SPACE){return dojo.isString(E)?A[E](F):E.call(A,F)
}}))
}C="onclick"
}B.push(dojo.connect(D,C,this,E));
this._connects.push(B);
return B
},disconnect:function(B){for(var A=0;
A<this._connects.length;
A++){if(this._connects[A]==B){dojo.forEach(B,dojo.disconnect);
this._connects.splice(A,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=dojo.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(dojo.style(this.domNode,"display")!="none")
}})
};