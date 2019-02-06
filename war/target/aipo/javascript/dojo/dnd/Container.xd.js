dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Container"],["require","dojo.dnd.common"],["require","dojo.parser"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Container"]){A._hasResource["dojo.dnd.Container"]=true;
A.provide("dojo.dnd.Container");
A.require("dojo.dnd.common");
A.require("dojo.parser");
A.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(B,C){this.node=A.byId(B);
if(!C){C={}
}this.creator=C.creator||null;
this.skipForm=C.skipForm;
this.defaultCreator=A.dnd._defaultCreator(this.node);
this.map={};
this.current=null;
this.containerState="";
A.addClass(this.node,"dojoDndContainer");
if(!(C&&C._skipStartup)){this.startup()
}this.events=[A.connect(this.node,"onmouseover",this,"onMouseOver"),A.connect(this.node,"onmouseout",this,"onMouseOut"),A.connect(this.node,"ondragstart",this,"onSelectStart"),A.connect(this.node,"onselectstart",this,"onSelectStart")]
},creator:function(){},getItem:function(B){return this.map[B]
},setItem:function(B,C){this.map[B]=C
},delItem:function(B){delete this.map[B]
},forInItems:function(D,F){F=F||A.global;
var B=this.map,E=A.dnd._empty;
for(var C in this.map){if(C in E){continue
}D.call(F,B[C],C,B)
}},clearItems:function(){this.map={}
},getAllNodes:function(){return A.query("> .dojoDndItem",this.parent)
},insertNodes:function(F,E,B){if(!this.parent.firstChild){B=null
}else{if(E){if(!B){B=this.parent.firstChild
}}else{if(B){B=B.nextSibling
}}}if(B){for(var D=0;
D<F.length;
++D){var C=this._normalizedCreator(F[D]);
this.setItem(C.node.id,{data:C.data,type:C.type});
this.parent.insertBefore(C.node,B)
}}else{for(var D=0;
D<F.length;
++D){var C=this._normalizedCreator(F[D]);
this.setItem(C.node.id,{data:C.data,type:C.type});
this.parent.appendChild(C.node)
}}return this
},destroy:function(){A.forEach(this.events,A.disconnect);
this.clearItems();
this.node=this.parent=this.current
},markupFactory:function(C,B){C._skipStartup=true;
return new A.dnd.Container(B,C)
},startup:function(){this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){var B=this.parent.getElementsByTagName("tbody");
if(B&&B.length){this.parent=B[0]
}}A.query("> .dojoDndItem",this.parent).forEach(function(D){if(!D.id){D.id=A.dnd.getUniqueId()
}var C=D.getAttribute("dndType"),E=D.getAttribute("dndData");
this.setItem(D.id,{data:E?E:D.innerHTML,type:C?C.split(/\s*,\s*/):["text"]})
},this)
},onMouseOver:function(C){var D=C.relatedTarget;
while(D){if(D==this.node){break
}try{D=D.parentNode
}catch(B){D=null
}}if(!D){this._changeState("Container","Over");
this.onOverEvent()
}D=this._getChildByEvent(C);
if(this.current==D){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(D){this._addItemClass(D,"Over")
}this.current=D
},onMouseOut:function(C){for(var D=C.relatedTarget;
D;
){if(D==this.node){return 
}try{D=D.parentNode
}catch(B){D=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},onSelectStart:function(B){if(!this.skipForm||!A.dnd.isFormElement(B)){A.stopEvent(B)
}},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(B,E){var D="dojoDnd"+B;
var C=B.toLowerCase()+"State";
A.removeClass(this.node,D+this[C]);
A.addClass(this.node,D+E);
this[C]=E
},_addItemClass:function(C,B){A.addClass(C,"dojoDndItem"+B)
},_removeItemClass:function(C,B){A.removeClass(C,"dojoDndItem"+B)
},_getChildByEvent:function(D){var C=D.target;
if(C){for(var B=C.parentNode;
B;
C=B,B=C.parentNode){if(B==this.parent&&A.hasClass(C,"dojoDndItem")){return C
}}}return null
},_normalizedCreator:function(C,D){var B=(this.creator?this.creator:this.defaultCreator)(C,D);
if(!A.isArray(B.type)){B.type=["text"]
}if(!B.node.id){B.node.id=A.dnd.getUniqueId()
}A.addClass(B.node,"dojoDndItem");
return B
}});
A.dnd._createNode=function(B){if(!B){return A.dnd._createSpan
}return function(C){var D=A.doc.createElement(B);
D.innerHTML=C;
return D
}
};
A.dnd._createTrTd=function(C){var B=A.doc.createElement("tr");
var D=A.doc.createElement("td");
D.innerHTML=C;
B.appendChild(D);
return B
};
A.dnd._createSpan=function(B){var C=A.doc.createElement("span");
C.innerHTML=B;
return C
};
A.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
A.dnd._defaultCreator=function(C){var B=C.tagName.toLowerCase();
var D=B=="table"?A.dnd._createTrTd:A.dnd._createNode(A.dnd._defaultCreatorNodes[B]);
return function(H,J){var E=A.isObject(H)&&H;
var I=(E&&H.data)?H.data:H;
var G=(E&&H.type)?H.type:["text"];
var F=String(I),K=(J=="avatar"?A.dnd._createSpan:D)(F);
K.id=A.dnd.getUniqueId();
return{node:K,data:I,type:G}
}
}
}}});