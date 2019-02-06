if(!dojo._hasResource["dijit.Tree"]){dojo._hasResource["dijit.Tree"]=true;
dojo.provide("dijit.Tree");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.require("dojo.cookie");
dojo.declare("dijit._TreeNode",[dijit._Widget,dijit._Templated,dijit._Container,dijit._Contained],{item:null,isTreeNode:true,label:"",isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:'<div class="dijitTreeNode dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t></span\r\n\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t></span\r\n\t>\r\n\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="-1"></span>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setLabelNode(this.label);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){dijit.setWaiState(this.labelNode,"expanded",this.isExpanded)
}},markProcessing:function(){this.state="LOADING";
this._setExpando(true)
},unmarkProcessing:function(){this._setExpando(false)
},_updateItemClasses:function(A){this.iconNode.className="dijitInline dijitTreeIcon "+this.tree.getIconClass(A);
this.labelNode.className="dijitTreeLabel "+this.tree.getLabelClass(A)
},_updateLayout:function(){var A=this.getParent();
if(A&&A.isTree&&A._hideRoot){dojo.addClass(this.domNode,"dijitTreeIsRoot")
}else{dojo.toggleClass(this.domNode,"dijitTreeIsLast",!this.getNextSibling())
}},_setExpando:function(B){var A=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var C=B?0:(this.isExpandable?(this.isExpanded?1:2):3);
dojo.forEach(A,function(D){dojo.removeClass(this.expandoNode,D)
},this);
dojo.addClass(this.expandoNode,A[C]);
this.expandoNodeText.innerHTML=B?"*":(this.isExpandable?(this.isExpanded?"-":"+"):"*")
},expand:function(){if(this.isExpanded){return 
}if(this._wipeOut.status()=="playing"){this._wipeOut.stop()
}this.isExpanded=true;
dijit.setWaiState(this.labelNode,"expanded","true");
dijit.setWaiRole(this.containerNode,"group");
this._setExpando();
this._wipeIn.play()
},collapse:function(){if(!this.isExpanded){return 
}if(this._wipeIn.status()=="playing"){this._wipeIn.stop()
}this.isExpanded=false;
dijit.setWaiState(this.labelNode,"expanded","false");
this._setExpando();
this._wipeOut.play()
},setLabelNode:function(A){this.labelNode.innerHTML="";
this.labelNode.appendChild(document.createTextNode(A))
},_setChildren:function(C){this.destroyDescendants();
this.state="LOADED";
var B={};
if(C&&C.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}dojo.forEach(C,function(G){var E=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(G.item)},G));
this.addChild(E);
var F=this.tree.store.getIdentity(G.item);
B[F]=E;
if(this.tree.persist){if(this.tree._openedItemIds[F]){this.tree._expandNode(E)
}}},this);
dojo.forEach(this.getChildren(),function(E,F){E._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var A=this.getChildren()[0];
var D=A?A.labelNode:this.domNode;
D.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=dojo.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=dojo.fx.wipeOut({node:this.containerNode,duration:150})
}return B
},_addChildren:function(A){var B={};
if(A&&A.length>0){dojo.forEach(A,function(D){var C=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(D.item)},D));
this.addChild(C);
B[this.tree.store.getIdentity(D.item)]=C
},this);
dojo.forEach(this.getChildren(),function(C,D){C._updateLayout()
})
}return B
},deleteNode:function(A){A.destroy();
var B=this.getChildren();
if(B.length==0){this.isExpandable=false;
this.collapse()
}dojo.forEach(B,function(C){C._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
dojo.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(B,A){dojo.publish(this.id,[dojo.mixin({tree:this,event:B},A||{})])
},postMixInProperties:function(){this.tree=this;
this.lastFocused=this.labelNode;
this._itemNodeMap={};
this._hideRoot=!this.label;
if(!this.store.getFeatures()["dojo.data.api.Identity"]){throw new Error("dijit.tree requires access to a store supporting the dojo.data Identity api")
}if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie"
}if(this.store.getFeatures()["dojo.data.api.Notification"]){this.connect(this.store,"onNew","_onNewItem");
this.connect(this.store,"onDelete","_onDeleteItem");
this.connect(this.store,"onSet","_onSetItem")
}},postCreate:function(){if(this.persist){var A=dojo.cookie(this.cookieName);
this._openedItemIds={};
if(A){dojo.forEach(A.split(","),function(E){this._openedItemIds[E]=true
},this)
}}var C=document.createElement("div");
C.style.display="none";
C.className="dijitTreeContainer";
dijit.setWaiRole(C,"presentation");
this.containerNodeTemplate=C;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(dojo.isString(this.dndController)){this.dndController=dojo.getObject(this.dndController)
}var B={};
for(var D=0;
D<this.dndParams.length;
D++){if(this[this.dndParams[D]]){B[this.dndParams[D]]=this[this.dndParams[D]]
}}this.dndController=new this.dndController(this,B)
}this.connect(this.domNode,dojo.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(A){return dojo.some(this.childrenAttr,function(B){return this.store.hasAttribute(A,B)
},this)
},getItemChildren:function(F,C){var G=this.store;
if(F==null){G.fetch({query:this.query,onComplete:C})
}else{var D=[];
for(var B=0;
B<this.childrenAttr.length;
B++){D=D.concat(G.getValues(F,this.childrenAttr[B]))
}var E=0;
dojo.forEach(D,function(H){if(!G.isItemLoaded(H)){E++
}});
if(E==0){C(D)
}else{function A(H){if(--E==0){C(D)
}}dojo.forEach(D,function(H){if(!G.isItemLoaded(H)){G.loadItem({item:H,onItem:A})
}})
}}},getItemParentIdentity:function(A,B){return this.store.getIdentity(B.item)
},getLabel:function(A){return this.store.getLabel(A)
},getIconClass:function(A){},getLabelClass:function(A){},_onLoadAllItems:function(A,C){var B=dojo.map(C,function(D){return{item:D,isExpandable:this.mayHaveChildren(D)}
},this);
dojo.mixin(this._itemNodeMap,A._setChildren(B));
this._expandNode(A)
},_onKeyPress:function(B){if(B.altKey){return 
}var D=dijit.getEnclosingWidget(B.target);
if(!D){return 
}if(B.charCode){var C=B.charCode;
if(!B.altKey&&!B.ctrlKey&&!B.shiftKey&&!B.metaKey){C=(String.fromCharCode(C)).toLowerCase();
this._onLetterKeyNav({node:D,key:C});
dojo.stopEvent(B)
}}else{var A=this._keyHandlerMap;
if(!A){A={};
A[dojo.keys.ENTER]="_onEnterKey";
A[dojo.keys.LEFT_ARROW]="_onLeftArrow";
A[dojo.keys.RIGHT_ARROW]="_onRightArrow";
A[dojo.keys.UP_ARROW]="_onUpArrow";
A[dojo.keys.DOWN_ARROW]="_onDownArrow";
A[dojo.keys.HOME]="_onHomeKey";
A[dojo.keys.END]="_onEndKey";
this._keyHandlerMap=A
}if(this._keyHandlerMap[B.keyCode]){this[this._keyHandlerMap[B.keyCode]]({node:D,item:D.item});
dojo.stopEvent(B)
}}},_onEnterKey:function(A){this._publish("execute",{item:A.item,node:A.node});
this.onClick(A.item,A.node)
},_onDownArrow:function(A){var B=this._navToNextNode(A.node);
if(B&&B.isTreeNode){B.tree.focusNode(B);
return B
}},_onUpArrow:function(E){var F=E.node;
var C=F;
var D=F.getPreviousSibling();
if(D){F=D;
while(F.isExpandable&&F.isExpanded&&F.hasChildren()){C=F;
var A=F.getChildren();
F=A[A.length-1]
}}else{var B=F.getParent();
if(!(this._hideRoot&&B===this)){F=B
}}if(F&&F.isTreeNode){C=F
}if(C&&C.isTreeNode){C.tree.focusNode(C);
return C
}},_onRightArrow:function(B){var C=B.node;
var A=C;
if(C.isExpandable&&!C.isExpanded){this._expandNode(C)
}else{if(C.hasChildren()){C=C.getChildren()[0]
}}if(C&&C.isTreeNode){A=C
}if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onLeftArrow:function(B){var A=B.node;
var C=A;
if(A.isExpandable&&A.isExpanded){this._collapseNode(A)
}else{A=A.getParent()
}if(A&&A.isTreeNode){C=A
}if(C&&C.isTreeNode){C.tree.focusNode(C);
return C
}},_onHomeKey:function(){var A=this._navToRootOrFirstNode();
if(A){A.tree.focusNode(A);
return A
}},_onEndKey:function(B){var D=B.node.tree;
var A=D;
while(A.isExpanded){var C=A.getChildren();
A=C[C.length-1];
if(A.isTreeNode){D=A
}}if(D&&D.isTreeNode){D.tree.focusNode(D);
return D
}},_onLetterKeyNav:function(B){var A=startNode=B.node;
var C=B.key;
do{A=this._navToNextNode(A);
if(!A){A=this._navToRootOrFirstNode()
}}while(A!==startNode&&(A.label.charAt(0).toLowerCase()!=C));
if(A&&A.isTreeNode){if(A!==startNode){A.tree.focusNode(A)
}return A
}},_onClick:function(A){var B=A.target;
var C=dijit.getEnclosingWidget(B);
if(!C||!C.isTreeNode){return 
}if(B==C.expandoNode||B==C.expandoNodeText){if(C.isExpandable){this._onExpandoClick({node:C})
}}else{this._publish("execute",{item:C.item,node:C});
this.onClick(C.item,C);
this.focusNode(C)
}dojo.stopEvent(A)
},_onExpandoClick:function(A){var B=A.node;
if(B.isExpanded){this._collapseNode(B)
}else{this._expandNode(B)
}},onClick:function(A,B){},_navToNextNode:function(A){var B;
if(A.isExpandable&&A.isExpanded&&A.hasChildren()){B=A.getChildren()[0]
}else{while(A&&A.isTreeNode){B=A.getNextSibling();
if(B){break
}A=A.getParent()
}}return B
},_navToRootOrFirstNode:function(){if(!this._hideRoot){return this
}else{var A=this.getChildren()[0];
if(A&&A.isTreeNode){return A
}}},_collapseNode:function(A){if(A.isExpandable){if(A.state=="LOADING"){return 
}if(this.lastFocused){if(dojo.isDescendant(this.lastFocused.domNode,A.domNode)){this.focusNode(A)
}else{this.focusNode(this.lastFocused)
}}A.collapse();
if(this.persist&&A.item){delete this._openedItemIds[this.store.getIdentity(A.item)];
this._saveState()
}}},_expandNode:function(C){var B=C.tree;
if(B.lastFocused){B.focusNode(B.lastFocused)
}if(!C.isExpandable){return 
}var A=this.store;
var F=this.store.getValue;
switch(C.state){case"LOADING":return ;
case"UNCHECKED":C.markProcessing();
var E=this;
var D=function(G){C.unmarkProcessing();
E._onLoadAllItems(C,G)
};
this.getItemChildren(C.item,D);
break;
default:if(C.expand){C.expand();
if(this.persist&&C.item){this._openedItemIds[this.store.getIdentity(C.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var A=this.lastFocused;
if(!A){return 
}var B=A.labelNode;
dojo.removeClass(B,"dijitTreeLabelFocused");
B.setAttribute("tabIndex","-1");
this.lastFocused=null
},focusNode:function(A){A.labelNode.focus()
},_onBlur:function(){if(this.lastFocused){var A=this.lastFocused.labelNode;
dojo.removeClass(A,"dijitTreeLabelFocused")
}},_onTreeFocus:function(C){var B=dijit.getEnclosingWidget(C.target);
if(B!=this.lastFocused){this.blurNode()
}var A=B.labelNode;
A.setAttribute("tabIndex","0");
dojo.addClass(A,"dijitTreeLabelFocused");
this.lastFocused=B
},_onNewItem:function(C,F){var D;
if(F){var B=this._itemNodeMap[this.getItemParentIdentity(C,F)];
if(!B||dojo.indexOf(this.childrenAttr,F.attribute)==-1){return 
}}var E={item:C,isExpandable:this.mayHaveChildren(C)};
if(B){if(!B.isExpandable){B.makeExpandable()
}if(B.state=="LOADED"||B.isExpanded){var A=B._addChildren([E])
}}else{var A=this._addChildren([E])
}if(A){dojo.mixin(this._itemNodeMap,A)
}},_onDeleteItem:function(C){var D=this.store.getIdentity(C);
var B=this._itemNodeMap[D];
if(B){var A=B.getParent();
A.deleteNode(B);
this._itemNodeMap[D]=null
}},_onSetItem:function(A){var B=this.store.getIdentity(A);
node=this._itemNodeMap[B];
if(node){node.setLabelNode(this.getLabel(A));
node._updateItemClasses(A)
}},_saveState:function(){if(!this.persist){return 
}var B=[];
for(var A in this._openedItemIds){B.push(A)
}dojo.cookie(this.cookieName,B.join(","))
}})
};