dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Container"],["require","dojo.dnd.common"],["require","dojo.parser"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Container"]){A._hasResource["dojo.dnd.Container"]=true;
A.provide("dojo.dnd.Container");
A.require("dojo.dnd.common");
A.require("dojo.parser");
A.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(C,B){this.node=A.byId(C);
if(!B){B={}
}this.creator=B.creator||null;
this.skipForm=B.skipForm;
this.defaultCreator=A.dnd._defaultCreator(this.node);
this.map={};
this.current=null;
this.containerState="";
A.addClass(this.node,"dojoDndContainer");
if(!(B&&B._skipStartup)){this.startup()
}this.events=[A.connect(this.node,"onmouseover",this,"onMouseOver"),A.connect(this.node,"onmouseout",this,"onMouseOut"),A.connect(this.node,"ondragstart",this,"onSelectStart"),A.connect(this.node,"onselectstart",this,"onSelectStart")]
},creator:function(){},getItem:function(B){return this.map[B]
},setItem:function(C,B){this.map[C]=B
},delItem:function(B){delete this.map[B]
},forInItems:function(E,B){B=B||A.global;
var C=this.map,F=A.dnd._empty;
for(var D in this.map){if(D in F){continue
}E.call(B,C[D],D,C)
}},clearItems:function(){this.map={}
},getAllNodes:function(){return A.query("> .dojoDndItem",this.parent)
},insertNodes:function(B,F,C){if(!this.parent.firstChild){C=null
}else{if(F){if(!C){C=this.parent.firstChild
}}else{if(C){C=C.nextSibling
}}}if(C){for(var E=0;
E<B.length;
++E){var D=this._normalizedCreator(B[E]);
this.setItem(D.node.id,{data:D.data,type:D.type});
this.parent.insertBefore(D.node,C)
}}else{for(var E=0;
E<B.length;
++E){var D=this._normalizedCreator(B[E]);
this.setItem(D.node.id,{data:D.data,type:D.type});
this.parent.appendChild(D.node)
}}return this
},destroy:function(){A.forEach(this.events,A.disconnect);
this.clearItems();
this.node=this.parent=this.current
},markupFactory:function(B,C){B._skipStartup=true;
return new A.dnd.Container(C,B)
},startup:function(){this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){var B=this.parent.getElementsByTagName("tbody");
if(B&&B.length){this.parent=B[0]
}}A.query("> .dojoDndItem",this.parent).forEach(function(D){if(!D.id){D.id=A.dnd.getUniqueId()
}var C=D.getAttribute("dndType"),E=D.getAttribute("dndData");
this.setItem(D.id,{data:E?E:D.innerHTML,type:C?C.split(/\s*,\s*/):["text"]})
},this)
},onMouseOver:function(D){var B=D.relatedTarget;
while(B){if(B==this.node){break
}try{B=B.parentNode
}catch(C){B=null
}}if(!B){this._changeState("Container","Over");
this.onOverEvent()
}B=this._getChildByEvent(D);
if(this.current==B){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(B){this._addItemClass(B,"Over")
}this.current=B
},onMouseOut:function(D){for(var B=D.relatedTarget;
B;
){if(B==this.node){return 
}try{B=B.parentNode
}catch(C){B=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},onSelectStart:function(B){if(!this.skipForm||!A.dnd.isFormElement(B)){A.stopEvent(B)
}},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(C,B){var E="dojoDnd"+C;
var D=C.toLowerCase()+"State";
A.removeClass(this.node,E+this[D]);
A.addClass(this.node,E+B);
this[D]=B
},_addItemClass:function(B,C){A.addClass(B,"dojoDndItem"+C)
},_removeItemClass:function(B,C){A.removeClass(B,"dojoDndItem"+C)
},_getChildByEvent:function(B){var D=B.target;
if(D){for(var C=D.parentNode;
C;
D=C,C=D.parentNode){if(C==this.parent&&A.hasClass(D,"dojoDndItem")){return D
}}}return null
},_normalizedCreator:function(D,B){var C=(this.creator?this.creator:this.defaultCreator)(D,B);
if(!A.isArray(C.type)){C.type=["text"]
}if(!C.node.id){C.node.id=A.dnd.getUniqueId()
}A.addClass(C.node,"dojoDndItem");
return C
}});
A.dnd._createNode=function(B){if(!B){return A.dnd._createSpan
}return function(C){var D=A.doc.createElement(B);
D.innerHTML=C;
return D
}
};
A.dnd._createTrTd=function(D){var C=A.doc.createElement("tr");
var B=A.doc.createElement("td");
B.innerHTML=D;
C.appendChild(B);
return C
};
A.dnd._createSpan=function(C){var B=A.doc.createElement("span");
B.innerHTML=C;
return B
};
A.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
A.dnd._defaultCreator=function(D){var C=D.tagName.toLowerCase();
var B=C=="table"?A.dnd._createTrTd:A.dnd._createNode(A.dnd._defaultCreatorNodes[C]);
return function(K,H){var F=A.isObject(K)&&K;
var E=(F&&K.data)?K.data:K;
var J=(F&&K.type)?K.type:["text"];
var G=String(E),I=(H=="avatar"?A.dnd._createSpan:B)(G);
I.id=A.dnd.getUniqueId();
return{node:I,data:E,type:J}
}
}
}}});