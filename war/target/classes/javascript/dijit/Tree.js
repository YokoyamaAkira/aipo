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
}},_setExpando:function(C){var B=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var A=C?0:(this.isExpandable?(this.isExpanded?1:2):3);
dojo.forEach(B,function(D){dojo.removeClass(this.expandoNode,D)
},this);
dojo.addClass(this.expandoNode,B[A]);
this.expandoNodeText.innerHTML=C?"*":(this.isExpandable?(this.isExpanded?"-":"+"):"*")
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
},_setChildren:function(D){this.destroyDescendants();
this.state="LOADED";
var C={};
if(D&&D.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}dojo.forEach(D,function(F){var G=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(F.item)},F));
this.addChild(G);
var E=this.tree.store.getIdentity(F.item);
C[E]=G;
if(this.tree.persist){if(this.tree._openedItemIds[E]){this.tree._expandNode(G)
}}},this);
dojo.forEach(this.getChildren(),function(F,E){F._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var B=this.getChildren()[0];
var A=B?B.labelNode:this.domNode;
A.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=dojo.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=dojo.fx.wipeOut({node:this.containerNode,duration:150})
}return C
},_addChildren:function(B){var A={};
if(B&&B.length>0){dojo.forEach(B,function(C){var D=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(C.item)},C));
this.addChild(D);
A[this.tree.store.getIdentity(C.item)]=D
},this);
dojo.forEach(this.getChildren(),function(D,C){D._updateLayout()
})
}return A
},deleteNode:function(B){B.destroy();
var A=this.getChildren();
if(A.length==0){this.isExpandable=false;
this.collapse()
}dojo.forEach(A,function(C){C._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
dojo.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(A,B){dojo.publish(this.id,[dojo.mixin({tree:this,event:A},B||{})])
},postMixInProperties:function(){this.tree=this;
this.lastFocused=this.labelNode;
this._itemNodeMap={};
this._hideRoot=!this.label;
if(!this.store.getFeatures()["dojo.data.api.Identity"]){throw new Error("dijit.tree requires access to a store supporting the dojo.data Identity api")
}if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie"
}if(this.store.getFeatures()["dojo.data.api.Notification"]){this.connect(this.store,"onNew","_onNewItem");
this.connect(this.store,"onDelete","_onDeleteItem");
this.connect(this.store,"onSet","_onSetItem")
}},postCreate:function(){if(this.persist){var B=dojo.cookie(this.cookieName);
this._openedItemIds={};
if(B){dojo.forEach(B.split(","),function(E){this._openedItemIds[E]=true
},this)
}}var D=document.createElement("div");
D.style.display="none";
D.className="dijitTreeContainer";
dijit.setWaiRole(D,"presentation");
this.containerNodeTemplate=D;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(dojo.isString(this.dndController)){this.dndController=dojo.getObject(this.dndController)
}var C={};
for(var A=0;
A<this.dndParams.length;
A++){if(this[this.dndParams[A]]){C[this.dndParams[A]]=this[this.dndParams[A]]
}}this.dndController=new this.dndController(this,C)
}this.connect(this.domNode,dojo.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(A){return dojo.some(this.childrenAttr,function(B){return this.store.hasAttribute(A,B)
},this)
},getItemChildren:function(B,F){var C=this.store;
if(B==null){C.fetch({query:this.query,onComplete:F})
}else{var G=[];
for(var E=0;
E<this.childrenAttr.length;
E++){G=G.concat(C.getValues(B,this.childrenAttr[E]))
}var A=0;
dojo.forEach(G,function(H){if(!C.isItemLoaded(H)){A++
}});
if(A==0){F(G)
}else{function D(H){if(--A==0){F(G)
}}dojo.forEach(G,function(H){if(!C.isItemLoaded(H)){C.loadItem({item:H,onItem:D})
}})
}}},getItemParentIdentity:function(B,A){return this.store.getIdentity(A.item)
},getLabel:function(A){return this.store.getLabel(A)
},getIconClass:function(A){},getLabelClass:function(A){},_onLoadAllItems:function(B,A){var C=dojo.map(A,function(D){return{item:D,isExpandable:this.mayHaveChildren(D)}
},this);
dojo.mixin(this._itemNodeMap,B._setChildren(C));
this._expandNode(B)
},_onKeyPress:function(C){if(C.altKey){return 
}var A=dijit.getEnclosingWidget(C.target);
if(!A){return 
}if(C.charCode){var D=C.charCode;
if(!C.altKey&&!C.ctrlKey&&!C.shiftKey&&!C.metaKey){D=(String.fromCharCode(D)).toLowerCase();
this._onLetterKeyNav({node:A,key:D});
dojo.stopEvent(C)
}}else{var B=this._keyHandlerMap;
if(!B){B={};
B[dojo.keys.ENTER]="_onEnterKey";
B[dojo.keys.LEFT_ARROW]="_onLeftArrow";
B[dojo.keys.RIGHT_ARROW]="_onRightArrow";
B[dojo.keys.UP_ARROW]="_onUpArrow";
B[dojo.keys.DOWN_ARROW]="_onDownArrow";
B[dojo.keys.HOME]="_onHomeKey";
B[dojo.keys.END]="_onEndKey";
this._keyHandlerMap=B
}if(this._keyHandlerMap[C.keyCode]){this[this._keyHandlerMap[C.keyCode]]({node:A,item:A.item});
dojo.stopEvent(C)
}}},_onEnterKey:function(A){this._publish("execute",{item:A.item,node:A.node});
this.onClick(A.item,A.node)
},_onDownArrow:function(B){var A=this._navToNextNode(B.node);
if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onUpArrow:function(F){var A=F.node;
var D=A;
var E=A.getPreviousSibling();
if(E){A=E;
while(A.isExpandable&&A.isExpanded&&A.hasChildren()){D=A;
var B=A.getChildren();
A=B[B.length-1]
}}else{var C=A.getParent();
if(!(this._hideRoot&&C===this)){A=C
}}if(A&&A.isTreeNode){D=A
}if(D&&D.isTreeNode){D.tree.focusNode(D);
return D
}},_onRightArrow:function(C){var A=C.node;
var B=A;
if(A.isExpandable&&!A.isExpanded){this._expandNode(A)
}else{if(A.hasChildren()){A=A.getChildren()[0]
}}if(A&&A.isTreeNode){B=A
}if(B&&B.isTreeNode){B.tree.focusNode(B);
return B
}},_onLeftArrow:function(C){var B=C.node;
var A=B;
if(B.isExpandable&&B.isExpanded){this._collapseNode(B)
}else{B=B.getParent()
}if(B&&B.isTreeNode){A=B
}if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onHomeKey:function(){var A=this._navToRootOrFirstNode();
if(A){A.tree.focusNode(A);
return A
}},_onEndKey:function(C){var A=C.node.tree;
var B=A;
while(B.isExpanded){var D=B.getChildren();
B=D[D.length-1];
if(B.isTreeNode){A=B
}}if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onLetterKeyNav:function(C){var B=startNode=C.node;
var A=C.key;
do{B=this._navToNextNode(B);
if(!B){B=this._navToRootOrFirstNode()
}}while(B!==startNode&&(B.label.charAt(0).toLowerCase()!=A));
if(B&&B.isTreeNode){if(B!==startNode){B.tree.focusNode(B)
}return B
}},_onClick:function(B){var C=B.target;
var A=dijit.getEnclosingWidget(C);
if(!A||!A.isTreeNode){return 
}if(C==A.expandoNode||C==A.expandoNodeText){if(A.isExpandable){this._onExpandoClick({node:A})
}}else{this._publish("execute",{item:A.item,node:A});
this.onClick(A.item,A);
this.focusNode(A)
}dojo.stopEvent(B)
},_onExpandoClick:function(B){var A=B.node;
if(A.isExpanded){this._collapseNode(A)
}else{this._expandNode(A)
}},onClick:function(B,A){},_navToNextNode:function(B){var A;
if(B.isExpandable&&B.isExpanded&&B.hasChildren()){A=B.getChildren()[0]
}else{while(B&&B.isTreeNode){A=B.getNextSibling();
if(A){break
}B=B.getParent()
}}return A
},_navToRootOrFirstNode:function(){if(!this._hideRoot){return this
}else{var A=this.getChildren()[0];
if(A&&A.isTreeNode){return A
}}},_collapseNode:function(A){if(A.isExpandable){if(A.state=="LOADING"){return 
}if(this.lastFocused){if(dojo.isDescendant(this.lastFocused.domNode,A.domNode)){this.focusNode(A)
}else{this.focusNode(this.lastFocused)
}}A.collapse();
if(this.persist&&A.item){delete this._openedItemIds[this.store.getIdentity(A.item)];
this._saveState()
}}},_expandNode:function(D){var C=D.tree;
if(C.lastFocused){C.focusNode(C.lastFocused)
}if(!D.isExpandable){return 
}var B=this.store;
var A=this.store.getValue;
switch(D.state){case"LOADING":return ;
case"UNCHECKED":D.markProcessing();
var F=this;
var E=function(G){D.unmarkProcessing();
F._onLoadAllItems(D,G)
};
this.getItemChildren(D.item,E);
break;
default:if(D.expand){D.expand();
if(this.persist&&D.item){this._openedItemIds[this.store.getIdentity(D.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var B=this.lastFocused;
if(!B){return 
}var A=B.labelNode;
dojo.removeClass(A,"dijitTreeLabelFocused");
A.setAttribute("tabIndex","-1");
this.lastFocused=null
},focusNode:function(A){A.labelNode.focus()
},_onBlur:function(){if(this.lastFocused){var A=this.lastFocused.labelNode;
dojo.removeClass(A,"dijitTreeLabelFocused")
}},_onTreeFocus:function(A){var C=dijit.getEnclosingWidget(A.target);
if(C!=this.lastFocused){this.blurNode()
}var B=C.labelNode;
B.setAttribute("tabIndex","0");
dojo.addClass(B,"dijitTreeLabelFocused");
this.lastFocused=C
},_onNewItem:function(D,A){var E;
if(A){var C=this._itemNodeMap[this.getItemParentIdentity(D,A)];
if(!C||dojo.indexOf(this.childrenAttr,A.attribute)==-1){return 
}}var F={item:D,isExpandable:this.mayHaveChildren(D)};
if(C){if(!C.isExpandable){C.makeExpandable()
}if(C.state=="LOADED"||C.isExpanded){var B=C._addChildren([F])
}}else{var B=this._addChildren([F])
}if(B){dojo.mixin(this._itemNodeMap,B)
}},_onDeleteItem:function(D){var A=this.store.getIdentity(D);
var C=this._itemNodeMap[A];
if(C){var B=C.getParent();
B.deleteNode(C);
this._itemNodeMap[A]=null
}},_onSetItem:function(B){var A=this.store.getIdentity(B);
node=this._itemNodeMap[A];
if(node){node.setLabelNode(this.getLabel(B));
node._updateItemClasses(B)
}},_saveState:function(){if(!this.persist){return 
}var A=[];
for(var B in this._openedItemIds){A.push(B)
}dojo.cookie(this.cookieName,A.join(","))
}})
};