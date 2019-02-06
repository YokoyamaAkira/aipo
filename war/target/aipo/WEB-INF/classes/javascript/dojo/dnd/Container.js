if(!dojo._hasResource["dojo.dnd.Container"]){dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.require("dojo.dnd.common");
dojo.require("dojo.parser");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(B,A){this.node=dojo.byId(B);
if(!A){A={}
}this.creator=A.creator||null;
this.skipForm=A.skipForm;
this.defaultCreator=dojo.dnd._defaultCreator(this.node);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(A&&A._skipStartup)){this.startup()
}this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")]
},creator:function(){},getItem:function(A){return this.map[A]
},setItem:function(B,A){this.map[B]=A
},delItem:function(A){delete this.map[A]
},forInItems:function(B,D){D=D||dojo.global;
var E=this.map,C=dojo.dnd._empty;
for(var A in this.map){if(A in C){continue
}B.call(D,E[A],A,E)
}},clearItems:function(){this.map={}
},getAllNodes:function(){return dojo.query("> .dojoDndItem",this.parent)
},insertNodes:function(D,C,E){if(!this.parent.firstChild){E=null
}else{if(C){if(!E){E=this.parent.firstChild
}}else{if(E){E=E.nextSibling
}}}if(E){for(var B=0;
B<D.length;
++B){var A=this._normalizedCreator(D[B]);
this.setItem(A.node.id,{data:A.data,type:A.type});
this.parent.insertBefore(A.node,E)
}}else{for(var B=0;
B<D.length;
++B){var A=this._normalizedCreator(D[B]);
this.setItem(A.node.id,{data:A.data,type:A.type});
this.parent.appendChild(A.node)
}}return this
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current
},markupFactory:function(A,B){A._skipStartup=true;
return new dojo.dnd.Container(B,A)
},startup:function(){this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){var A=this.parent.getElementsByTagName("tbody");
if(A&&A.length){this.parent=A[0]
}}dojo.query("> .dojoDndItem",this.parent).forEach(function(D){if(!D.id){D.id=dojo.dnd.getUniqueId()
}var C=D.getAttribute("dndType"),B=D.getAttribute("dndData");
this.setItem(D.id,{data:B?B:D.innerHTML,type:C?C.split(/\s*,\s*/):["text"]})
},this)
},onMouseOver:function(A){var B=A.relatedTarget;
while(B){if(B==this.node){break
}try{B=B.parentNode
}catch(C){B=null
}}if(!B){this._changeState("Container","Over");
this.onOverEvent()
}B=this._getChildByEvent(A);
if(this.current==B){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(B){this._addItemClass(B,"Over")
}this.current=B
},onMouseOut:function(A){for(var B=A.relatedTarget;
B;
){if(B==this.node){return 
}try{B=B.parentNode
}catch(C){B=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},onSelectStart:function(A){if(!this.skipForm||!dojo.dnd.isFormElement(A)){dojo.stopEvent(A)
}},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(D,C){var B="dojoDnd"+D;
var A=D.toLowerCase()+"State";
dojo.removeClass(this.node,B+this[A]);
dojo.addClass(this.node,B+C);
this[A]=C
},_addItemClass:function(A,B){dojo.addClass(A,"dojoDndItem"+B)
},_removeItemClass:function(A,B){dojo.removeClass(A,"dojoDndItem"+B)
},_getChildByEvent:function(B){var A=B.target;
if(A){for(var C=A.parentNode;
C;
A=C,C=A.parentNode){if(C==this.parent&&dojo.hasClass(A,"dojoDndItem")){return A
}}}return null
},_normalizedCreator:function(A,B){var C=(this.creator?this.creator:this.defaultCreator)(A,B);
if(!dojo.isArray(C.type)){C.type=["text"]
}if(!C.node.id){C.node.id=dojo.dnd.getUniqueId()
}dojo.addClass(C.node,"dojoDndItem");
return C
}});
dojo.dnd._createNode=function(A){if(!A){return dojo.dnd._createSpan
}return function(C){var B=dojo.doc.createElement(A);
B.innerHTML=C;
return B
}
};
dojo.dnd._createTrTd=function(A){var C=dojo.doc.createElement("tr");
var B=dojo.doc.createElement("td");
B.innerHTML=A;
C.appendChild(B);
return C
};
dojo.dnd._createSpan=function(B){var A=dojo.doc.createElement("span");
A.innerHTML=B;
return A
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(A){var C=A.tagName.toLowerCase();
var B=C=="table"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[C]);
return function(F,J){var H=dojo.isObject(F)&&F;
var G=(H&&F.data)?F.data:F;
var E=(H&&F.type)?F.type:["text"];
var I=String(G),D=(J=="avatar"?dojo.dnd._createSpan:B)(I);
D.id=dojo.dnd.getUniqueId();
return{node:D,data:G,type:E}
}
}
};