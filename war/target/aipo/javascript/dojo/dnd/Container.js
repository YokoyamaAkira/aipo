if(!dojo._hasResource["dojo.dnd.Container"]){dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.require("dojo.dnd.common");
dojo.require("dojo.parser");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(A,B){this.node=dojo.byId(A);
if(!B){B={}
}this.creator=B.creator||null;
this.skipForm=B.skipForm;
this.defaultCreator=dojo.dnd._defaultCreator(this.node);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(B&&B._skipStartup)){this.startup()
}this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")]
},creator:function(){},getItem:function(A){return this.map[A]
},setItem:function(A,B){this.map[A]=B
},delItem:function(A){delete this.map[A]
},forInItems:function(C,E){E=E||dojo.global;
var A=this.map,D=dojo.dnd._empty;
for(var B in this.map){if(B in D){continue
}C.call(E,A[B],B,A)
}},clearItems:function(){this.map={}
},getAllNodes:function(){return dojo.query("> .dojoDndItem",this.parent)
},insertNodes:function(E,D,A){if(!this.parent.firstChild){A=null
}else{if(D){if(!A){A=this.parent.firstChild
}}else{if(A){A=A.nextSibling
}}}if(A){for(var C=0;
C<E.length;
++C){var B=this._normalizedCreator(E[C]);
this.setItem(B.node.id,{data:B.data,type:B.type});
this.parent.insertBefore(B.node,A)
}}else{for(var C=0;
C<E.length;
++C){var B=this._normalizedCreator(E[C]);
this.setItem(B.node.id,{data:B.data,type:B.type});
this.parent.appendChild(B.node)
}}return this
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current
},markupFactory:function(B,A){B._skipStartup=true;
return new dojo.dnd.Container(A,B)
},startup:function(){this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){var A=this.parent.getElementsByTagName("tbody");
if(A&&A.length){this.parent=A[0]
}}dojo.query("> .dojoDndItem",this.parent).forEach(function(C){if(!C.id){C.id=dojo.dnd.getUniqueId()
}var B=C.getAttribute("dndType"),D=C.getAttribute("dndData");
this.setItem(C.id,{data:D?D:C.innerHTML,type:B?B.split(/\s*,\s*/):["text"]})
},this)
},onMouseOver:function(B){var C=B.relatedTarget;
while(C){if(C==this.node){break
}try{C=C.parentNode
}catch(A){C=null
}}if(!C){this._changeState("Container","Over");
this.onOverEvent()
}C=this._getChildByEvent(B);
if(this.current==C){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(C){this._addItemClass(C,"Over")
}this.current=C
},onMouseOut:function(B){for(var C=B.relatedTarget;
C;
){if(C==this.node){return 
}try{C=C.parentNode
}catch(A){C=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},onSelectStart:function(A){if(!this.skipForm||!dojo.dnd.isFormElement(A)){dojo.stopEvent(A)
}},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(A,D){var C="dojoDnd"+A;
var B=A.toLowerCase()+"State";
dojo.removeClass(this.node,C+this[B]);
dojo.addClass(this.node,C+D);
this[B]=D
},_addItemClass:function(B,A){dojo.addClass(B,"dojoDndItem"+A)
},_removeItemClass:function(B,A){dojo.removeClass(B,"dojoDndItem"+A)
},_getChildByEvent:function(C){var B=C.target;
if(B){for(var A=B.parentNode;
A;
B=A,A=B.parentNode){if(A==this.parent&&dojo.hasClass(B,"dojoDndItem")){return B
}}}return null
},_normalizedCreator:function(B,C){var A=(this.creator?this.creator:this.defaultCreator)(B,C);
if(!dojo.isArray(A.type)){A.type=["text"]
}if(!A.node.id){A.node.id=dojo.dnd.getUniqueId()
}dojo.addClass(A.node,"dojoDndItem");
return A
}});
dojo.dnd._createNode=function(A){if(!A){return dojo.dnd._createSpan
}return function(B){var C=dojo.doc.createElement(A);
C.innerHTML=B;
return C
}
};
dojo.dnd._createTrTd=function(B){var A=dojo.doc.createElement("tr");
var C=dojo.doc.createElement("td");
C.innerHTML=B;
A.appendChild(C);
return A
};
dojo.dnd._createSpan=function(A){var B=dojo.doc.createElement("span");
B.innerHTML=A;
return B
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(B){var A=B.tagName.toLowerCase();
var C=A=="table"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[A]);
return function(G,I){var D=dojo.isObject(G)&&G;
var H=(D&&G.data)?G.data:G;
var F=(D&&G.type)?G.type:["text"];
var E=String(H),J=(I=="avatar"?dojo.dnd._createSpan:C)(E);
J.id=dojo.dnd.getUniqueId();
return{node:J,data:H,type:F}
}
}
};