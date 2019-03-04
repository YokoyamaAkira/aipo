dojo._xdResourceLoaded({depends:[["provide","dijit.Tree"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"],["require","dojo.cookie"]],defineResource:function(A){if(!A._hasResource["dijit.Tree"]){A._hasResource["dijit.Tree"]=true;
A.provide("dijit.Tree");
A.require("dojo.fx");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("dijit._Container");
A.require("dojo.cookie");
A.declare("dijit._TreeNode",[dijit._Widget,dijit._Templated,dijit._Container,dijit._Contained],{item:null,isTreeNode:true,label:"",isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:'<div class="dijitTreeNode dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t></span\r\n\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t></span\r\n\t>\r\n\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="-1"></span>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setLabelNode(this.label);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){dijit.setWaiState(this.labelNode,"expanded",this.isExpanded)
}},markProcessing:function(){this.state="LOADING";
this._setExpando(true)
},unmarkProcessing:function(){this._setExpando(false)
},_updateItemClasses:function(B){this.iconNode.className="dijitInline dijitTreeIcon "+this.tree.getIconClass(B);
this.labelNode.className="dijitTreeLabel "+this.tree.getLabelClass(B)
},_updateLayout:function(){var B=this.getParent();
if(B&&B.isTree&&B._hideRoot){A.addClass(this.domNode,"dijitTreeIsRoot")
}else{A.toggleClass(this.domNode,"dijitTreeIsLast",!this.getNextSibling())
}},_setExpando:function(D){var C=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var B=D?0:(this.isExpandable?(this.isExpanded?1:2):3);
A.forEach(C,function(E){A.removeClass(this.expandoNode,E)
},this);
A.addClass(this.expandoNode,C[B]);
this.expandoNodeText.innerHTML=D?"*":(this.isExpandable?(this.isExpanded?"-":"+"):"*")
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
},setLabelNode:function(B){this.labelNode.innerHTML="";
this.labelNode.appendChild(document.createTextNode(B))
},_setChildren:function(E){this.destroyDescendants();
this.state="LOADED";
var D={};
if(E&&E.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}A.forEach(E,function(G){var H=new dijit._TreeNode(A.mixin({tree:this.tree,label:this.tree.getLabel(G.item)},G));
this.addChild(H);
var F=this.tree.store.getIdentity(G.item);
D[F]=H;
if(this.tree.persist){if(this.tree._openedItemIds[F]){this.tree._expandNode(H)
}}},this);
A.forEach(this.getChildren(),function(G,F){G._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var C=this.getChildren()[0];
var B=C?C.labelNode:this.domNode;
B.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=A.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=A.fx.wipeOut({node:this.containerNode,duration:150})
}return D
},_addChildren:function(C){var B={};
if(C&&C.length>0){A.forEach(C,function(D){var E=new dijit._TreeNode(A.mixin({tree:this.tree,label:this.tree.getLabel(D.item)},D));
this.addChild(E);
B[this.tree.store.getIdentity(D.item)]=E
},this);
A.forEach(this.getChildren(),function(E,D){E._updateLayout()
})
}return B
},deleteNode:function(C){C.destroy();
var B=this.getChildren();
if(B.length==0){this.isExpandable=false;
this.collapse()
}A.forEach(B,function(D){D._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
A.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(B,C){A.publish(this.id,[A.mixin({tree:this,event:B},C||{})])
},postMixInProperties:function(){this.tree=this;
this.lastFocused=this.labelNode;
this._itemNodeMap={};
this._hideRoot=!this.label;
if(!this.store.getFeatures()["dojo.data.api.Identity"]){throw new Error("dijit.tree requires access to a store supporting the dojo.data Identity api")
}if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie"
}if(this.store.getFeatures()["dojo.data.api.Notification"]){this.connect(this.store,"onNew","_onNewItem");
this.connect(this.store,"onDelete","_onDeleteItem");
this.connect(this.store,"onSet","_onSetItem")
}},postCreate:function(){if(this.persist){var C=A.cookie(this.cookieName);
this._openedItemIds={};
if(C){A.forEach(C.split(","),function(F){this._openedItemIds[F]=true
},this)
}}var E=document.createElement("div");
E.style.display="none";
E.className="dijitTreeContainer";
dijit.setWaiRole(E,"presentation");
this.containerNodeTemplate=E;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(A.isString(this.dndController)){this.dndController=A.getObject(this.dndController)
}var D={};
for(var B=0;
B<this.dndParams.length;
B++){if(this[this.dndParams[B]]){D[this.dndParams[B]]=this[this.dndParams[B]]
}}this.dndController=new this.dndController(this,D)
}this.connect(this.domNode,A.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(B){return A.some(this.childrenAttr,function(C){return this.store.hasAttribute(B,C)
},this)
},getItemChildren:function(C,G){var D=this.store;
if(C==null){D.fetch({query:this.query,onComplete:G})
}else{var H=[];
for(var F=0;
F<this.childrenAttr.length;
F++){H=H.concat(D.getValues(C,this.childrenAttr[F]))
}var B=0;
A.forEach(H,function(I){if(!D.isItemLoaded(I)){B++
}});
if(B==0){G(H)
}else{function E(I){if(--B==0){G(H)
}}A.forEach(H,function(I){if(!D.isItemLoaded(I)){D.loadItem({item:I,onItem:E})
}})
}}},getItemParentIdentity:function(C,B){return this.store.getIdentity(B.item)
},getLabel:function(B){return this.store.getLabel(B)
},getIconClass:function(B){},getLabelClass:function(B){},_onLoadAllItems:function(C,B){var D=A.map(B,function(E){return{item:E,isExpandable:this.mayHaveChildren(E)}
},this);
A.mixin(this._itemNodeMap,C._setChildren(D));
this._expandNode(C)
},_onKeyPress:function(D){if(D.altKey){return 
}var B=dijit.getEnclosingWidget(D.target);
if(!B){return 
}if(D.charCode){var E=D.charCode;
if(!D.altKey&&!D.ctrlKey&&!D.shiftKey&&!D.metaKey){E=(String.fromCharCode(E)).toLowerCase();
this._onLetterKeyNav({node:B,key:E});
A.stopEvent(D)
}}else{var C=this._keyHandlerMap;
if(!C){C={};
C[A.keys.ENTER]="_onEnterKey";
C[A.keys.LEFT_ARROW]="_onLeftArrow";
C[A.keys.RIGHT_ARROW]="_onRightArrow";
C[A.keys.UP_ARROW]="_onUpArrow";
C[A.keys.DOWN_ARROW]="_onDownArrow";
C[A.keys.HOME]="_onHomeKey";
C[A.keys.END]="_onEndKey";
this._keyHandlerMap=C
}if(this._keyHandlerMap[D.keyCode]){this[this._keyHandlerMap[D.keyCode]]({node:B,item:B.item});
A.stopEvent(D)
}}},_onEnterKey:function(B){this._publish("execute",{item:B.item,node:B.node});
this.onClick(B.item,B.node)
},_onDownArrow:function(C){var B=this._navToNextNode(C.node);
if(B&&B.isTreeNode){B.tree.focusNode(B);
return B
}},_onUpArrow:function(G){var B=G.node;
var E=B;
var F=B.getPreviousSibling();
if(F){B=F;
while(B.isExpandable&&B.isExpanded&&B.hasChildren()){E=B;
var C=B.getChildren();
B=C[C.length-1]
}}else{var D=B.getParent();
if(!(this._hideRoot&&D===this)){B=D
}}if(B&&B.isTreeNode){E=B
}if(E&&E.isTreeNode){E.tree.focusNode(E);
return E
}},_onRightArrow:function(D){var B=D.node;
var C=B;
if(B.isExpandable&&!B.isExpanded){this._expandNode(B)
}else{if(B.hasChildren()){B=B.getChildren()[0]
}}if(B&&B.isTreeNode){C=B
}if(C&&C.isTreeNode){C.tree.focusNode(C);
return C
}},_onLeftArrow:function(D){var C=D.node;
var B=C;
if(C.isExpandable&&C.isExpanded){this._collapseNode(C)
}else{C=C.getParent()
}if(C&&C.isTreeNode){B=C
}if(B&&B.isTreeNode){B.tree.focusNode(B);
return B
}},_onHomeKey:function(){var B=this._navToRootOrFirstNode();
if(B){B.tree.focusNode(B);
return B
}},_onEndKey:function(D){var B=D.node.tree;
var C=B;
while(C.isExpanded){var E=C.getChildren();
C=E[E.length-1];
if(C.isTreeNode){B=C
}}if(B&&B.isTreeNode){B.tree.focusNode(B);
return B
}},_onLetterKeyNav:function(D){var C=startNode=D.node;
var B=D.key;
do{C=this._navToNextNode(C);
if(!C){C=this._navToRootOrFirstNode()
}}while(C!==startNode&&(C.label.charAt(0).toLowerCase()!=B));
if(C&&C.isTreeNode){if(C!==startNode){C.tree.focusNode(C)
}return C
}},_onClick:function(C){var D=C.target;
var B=dijit.getEnclosingWidget(D);
if(!B||!B.isTreeNode){return 
}if(D==B.expandoNode||D==B.expandoNodeText){if(B.isExpandable){this._onExpandoClick({node:B})
}}else{this._publish("execute",{item:B.item,node:B});
this.onClick(B.item,B);
this.focusNode(B)
}A.stopEvent(C)
},_onExpandoClick:function(C){var B=C.node;
if(B.isExpanded){this._collapseNode(B)
}else{this._expandNode(B)
}},onClick:function(C,B){},_navToNextNode:function(C){var B;
if(C.isExpandable&&C.isExpanded&&C.hasChildren()){B=C.getChildren()[0]
}else{while(C&&C.isTreeNode){B=C.getNextSibling();
if(B){break
}C=C.getParent()
}}return B
},_navToRootOrFirstNode:function(){if(!this._hideRoot){return this
}else{var B=this.getChildren()[0];
if(B&&B.isTreeNode){return B
}}},_collapseNode:function(B){if(B.isExpandable){if(B.state=="LOADING"){return 
}if(this.lastFocused){if(A.isDescendant(this.lastFocused.domNode,B.domNode)){this.focusNode(B)
}else{this.focusNode(this.lastFocused)
}}B.collapse();
if(this.persist&&B.item){delete this._openedItemIds[this.store.getIdentity(B.item)];
this._saveState()
}}},_expandNode:function(E){var D=E.tree;
if(D.lastFocused){D.focusNode(D.lastFocused)
}if(!E.isExpandable){return 
}var C=this.store;
var B=this.store.getValue;
switch(E.state){case"LOADING":return ;
case"UNCHECKED":E.markProcessing();
var G=this;
var F=function(H){E.unmarkProcessing();
G._onLoadAllItems(E,H)
};
this.getItemChildren(E.item,F);
break;
default:if(E.expand){E.expand();
if(this.persist&&E.item){this._openedItemIds[this.store.getIdentity(E.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var C=this.lastFocused;
if(!C){return 
}var B=C.labelNode;
A.removeClass(B,"dijitTreeLabelFocused");
B.setAttribute("tabIndex","-1");
this.lastFocused=null
},focusNode:function(B){B.labelNode.focus()
},_onBlur:function(){if(this.lastFocused){var B=this.lastFocused.labelNode;
A.removeClass(B,"dijitTreeLabelFocused")
}},_onTreeFocus:function(B){var D=dijit.getEnclosingWidget(B.target);
if(D!=this.lastFocused){this.blurNode()
}var C=D.labelNode;
C.setAttribute("tabIndex","0");
A.addClass(C,"dijitTreeLabelFocused");
this.lastFocused=D
},_onNewItem:function(E,B){var F;
if(B){var D=this._itemNodeMap[this.getItemParentIdentity(E,B)];
if(!D||A.indexOf(this.childrenAttr,B.attribute)==-1){return 
}}var G={item:E,isExpandable:this.mayHaveChildren(E)};
if(D){if(!D.isExpandable){D.makeExpandable()
}if(D.state=="LOADED"||D.isExpanded){var C=D._addChildren([G])
}}else{var C=this._addChildren([G])
}if(C){A.mixin(this._itemNodeMap,C)
}},_onDeleteItem:function(E){var B=this.store.getIdentity(E);
var D=this._itemNodeMap[B];
if(D){var C=D.getParent();
C.deleteNode(D);
this._itemNodeMap[B]=null
}},_onSetItem:function(C){var B=this.store.getIdentity(C);
node=this._itemNodeMap[B];
if(node){node.setLabelNode(this.getLabel(C));
node._updateItemClasses(C)
}},_saveState:function(){if(!this.persist){return 
}var B=[];
for(var C in this._openedItemIds){B.push(C)
}A.cookie(this.cookieName,B.join(","))
}})
}}});