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
}},_setExpando:function(B){var D=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var C=B?0:(this.isExpandable?(this.isExpanded?1:2):3);
A.forEach(D,function(E){A.removeClass(this.expandoNode,E)
},this);
A.addClass(this.expandoNode,D[C]);
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
},setLabelNode:function(B){this.labelNode.innerHTML="";
this.labelNode.appendChild(document.createTextNode(B))
},_setChildren:function(B){this.destroyDescendants();
this.state="LOADED";
var E={};
if(B&&B.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}A.forEach(B,function(G){var H=new dijit._TreeNode(A.mixin({tree:this.tree,label:this.tree.getLabel(G.item)},G));
this.addChild(H);
var F=this.tree.store.getIdentity(G.item);
E[F]=H;
if(this.tree.persist){if(this.tree._openedItemIds[F]){this.tree._expandNode(H)
}}},this);
A.forEach(this.getChildren(),function(G,F){G._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var D=this.getChildren()[0];
var C=D?D.labelNode:this.domNode;
C.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=A.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=A.fx.wipeOut({node:this.containerNode,duration:150})
}return E
},_addChildren:function(B){var C={};
if(B&&B.length>0){A.forEach(B,function(D){var E=new dijit._TreeNode(A.mixin({tree:this.tree,label:this.tree.getLabel(D.item)},D));
this.addChild(E);
C[this.tree.store.getIdentity(D.item)]=E
},this);
A.forEach(this.getChildren(),function(E,D){E._updateLayout()
})
}return C
},deleteNode:function(B){B.destroy();
var C=this.getChildren();
if(C.length==0){this.isExpandable=false;
this.collapse()
}A.forEach(C,function(D){D._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
A.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(C,B){A.publish(this.id,[A.mixin({tree:this,event:C},B||{})])
},postMixInProperties:function(){this.tree=this;
this.lastFocused=this.labelNode;
this._itemNodeMap={};
this._hideRoot=!this.label;
if(!this.store.getFeatures()["dojo.data.api.Identity"]){throw new Error("dijit.tree requires access to a store supporting the dojo.data Identity api")
}if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie"
}if(this.store.getFeatures()["dojo.data.api.Notification"]){this.connect(this.store,"onNew","_onNewItem");
this.connect(this.store,"onDelete","_onDeleteItem");
this.connect(this.store,"onSet","_onSetItem")
}},postCreate:function(){if(this.persist){var D=A.cookie(this.cookieName);
this._openedItemIds={};
if(D){A.forEach(D.split(","),function(F){this._openedItemIds[F]=true
},this)
}}var B=document.createElement("div");
B.style.display="none";
B.className="dijitTreeContainer";
dijit.setWaiRole(B,"presentation");
this.containerNodeTemplate=B;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(A.isString(this.dndController)){this.dndController=A.getObject(this.dndController)
}var E={};
for(var C=0;
C<this.dndParams.length;
C++){if(this[this.dndParams[C]]){E[this.dndParams[C]]=this[this.dndParams[C]]
}}this.dndController=new this.dndController(this,E)
}this.connect(this.domNode,A.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(B){return A.some(this.childrenAttr,function(C){return this.store.hasAttribute(B,C)
},this)
},getItemChildren:function(H,F){var C=this.store;
if(H==null){C.fetch({query:this.query,onComplete:F})
}else{var B=[];
for(var E=0;
E<this.childrenAttr.length;
E++){B=B.concat(C.getValues(H,this.childrenAttr[E]))
}var G=0;
A.forEach(B,function(I){if(!C.isItemLoaded(I)){G++
}});
if(G==0){F(B)
}else{function D(I){if(--G==0){F(B)
}}A.forEach(B,function(I){if(!C.isItemLoaded(I)){C.loadItem({item:I,onItem:D})
}})
}}},getItemParentIdentity:function(B,C){return this.store.getIdentity(C.item)
},getLabel:function(B){return this.store.getLabel(B)
},getIconClass:function(B){},getLabelClass:function(B){},_onLoadAllItems:function(D,C){var B=A.map(C,function(E){return{item:E,isExpandable:this.mayHaveChildren(E)}
},this);
A.mixin(this._itemNodeMap,D._setChildren(B));
this._expandNode(D)
},_onKeyPress:function(E){if(E.altKey){return 
}var C=dijit.getEnclosingWidget(E.target);
if(!C){return 
}if(E.charCode){var B=E.charCode;
if(!E.altKey&&!E.ctrlKey&&!E.shiftKey&&!E.metaKey){B=(String.fromCharCode(B)).toLowerCase();
this._onLetterKeyNav({node:C,key:B});
A.stopEvent(E)
}}else{var D=this._keyHandlerMap;
if(!D){D={};
D[A.keys.ENTER]="_onEnterKey";
D[A.keys.LEFT_ARROW]="_onLeftArrow";
D[A.keys.RIGHT_ARROW]="_onRightArrow";
D[A.keys.UP_ARROW]="_onUpArrow";
D[A.keys.DOWN_ARROW]="_onDownArrow";
D[A.keys.HOME]="_onHomeKey";
D[A.keys.END]="_onEndKey";
this._keyHandlerMap=D
}if(this._keyHandlerMap[E.keyCode]){this[this._keyHandlerMap[E.keyCode]]({node:C,item:C.item});
A.stopEvent(E)
}}},_onEnterKey:function(B){this._publish("execute",{item:B.item,node:B.node});
this.onClick(B.item,B.node)
},_onDownArrow:function(B){var C=this._navToNextNode(B.node);
if(C&&C.isTreeNode){C.tree.focusNode(C);
return C
}},_onUpArrow:function(C){var B=C.node;
var F=B;
var G=B.getPreviousSibling();
if(G){B=G;
while(B.isExpandable&&B.isExpanded&&B.hasChildren()){F=B;
var D=B.getChildren();
B=D[D.length-1]
}}else{var E=B.getParent();
if(!(this._hideRoot&&E===this)){B=E
}}if(B&&B.isTreeNode){F=B
}if(F&&F.isTreeNode){F.tree.focusNode(F);
return F
}},_onRightArrow:function(B){var C=B.node;
var D=C;
if(C.isExpandable&&!C.isExpanded){this._expandNode(C)
}else{if(C.hasChildren()){C=C.getChildren()[0]
}}if(C&&C.isTreeNode){D=C
}if(D&&D.isTreeNode){D.tree.focusNode(D);
return D
}},_onLeftArrow:function(B){var D=B.node;
var C=D;
if(D.isExpandable&&D.isExpanded){this._collapseNode(D)
}else{D=D.getParent()
}if(D&&D.isTreeNode){C=D
}if(C&&C.isTreeNode){C.tree.focusNode(C);
return C
}},_onHomeKey:function(){var B=this._navToRootOrFirstNode();
if(B){B.tree.focusNode(B);
return B
}},_onEndKey:function(E){var C=E.node.tree;
var D=C;
while(D.isExpanded){var B=D.getChildren();
D=B[B.length-1];
if(D.isTreeNode){C=D
}}if(C&&C.isTreeNode){C.tree.focusNode(C);
return C
}},_onLetterKeyNav:function(B){var D=startNode=B.node;
var C=B.key;
do{D=this._navToNextNode(D);
if(!D){D=this._navToRootOrFirstNode()
}}while(D!==startNode&&(D.label.charAt(0).toLowerCase()!=C));
if(D&&D.isTreeNode){if(D!==startNode){D.tree.focusNode(D)
}return D
}},_onClick:function(D){var B=D.target;
var C=dijit.getEnclosingWidget(B);
if(!C||!C.isTreeNode){return 
}if(B==C.expandoNode||B==C.expandoNodeText){if(C.isExpandable){this._onExpandoClick({node:C})
}}else{this._publish("execute",{item:C.item,node:C});
this.onClick(C.item,C);
this.focusNode(C)
}A.stopEvent(D)
},_onExpandoClick:function(B){var C=B.node;
if(C.isExpanded){this._collapseNode(C)
}else{this._expandNode(C)
}},onClick:function(B,C){},_navToNextNode:function(B){var C;
if(B.isExpandable&&B.isExpanded&&B.hasChildren()){C=B.getChildren()[0]
}else{while(B&&B.isTreeNode){C=B.getNextSibling();
if(C){break
}B=B.getParent()
}}return C
},_navToRootOrFirstNode:function(){if(!this._hideRoot){return this
}else{var B=this.getChildren()[0];
if(B&&B.isTreeNode){return B
}}},_collapseNode:function(B){if(B.isExpandable){if(B.state=="LOADING"){return 
}if(this.lastFocused){if(A.isDescendant(this.lastFocused.domNode,B.domNode)){this.focusNode(B)
}else{this.focusNode(this.lastFocused)
}}B.collapse();
if(this.persist&&B.item){delete this._openedItemIds[this.store.getIdentity(B.item)];
this._saveState()
}}},_expandNode:function(F){var E=F.tree;
if(E.lastFocused){E.focusNode(E.lastFocused)
}if(!F.isExpandable){return 
}var D=this.store;
var C=this.store.getValue;
switch(F.state){case"LOADING":return ;
case"UNCHECKED":F.markProcessing();
var B=this;
var G=function(H){F.unmarkProcessing();
B._onLoadAllItems(F,H)
};
this.getItemChildren(F.item,G);
break;
default:if(F.expand){F.expand();
if(this.persist&&F.item){this._openedItemIds[this.store.getIdentity(F.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var B=this.lastFocused;
if(!B){return 
}var C=B.labelNode;
A.removeClass(C,"dijitTreeLabelFocused");
C.setAttribute("tabIndex","-1");
this.lastFocused=null
},focusNode:function(B){B.labelNode.focus()
},_onBlur:function(){if(this.lastFocused){var B=this.lastFocused.labelNode;
A.removeClass(B,"dijitTreeLabelFocused")
}},_onTreeFocus:function(C){var B=dijit.getEnclosingWidget(C.target);
if(B!=this.lastFocused){this.blurNode()
}var D=B.labelNode;
D.setAttribute("tabIndex","0");
A.addClass(D,"dijitTreeLabelFocused");
this.lastFocused=B
},_onNewItem:function(F,C){var G;
if(C){var E=this._itemNodeMap[this.getItemParentIdentity(F,C)];
if(!E||A.indexOf(this.childrenAttr,C.attribute)==-1){return 
}}var B={item:F,isExpandable:this.mayHaveChildren(F)};
if(E){if(!E.isExpandable){E.makeExpandable()
}if(E.state=="LOADED"||E.isExpanded){var D=E._addChildren([B])
}}else{var D=this._addChildren([B])
}if(D){A.mixin(this._itemNodeMap,D)
}},_onDeleteItem:function(B){var C=this.store.getIdentity(B);
var E=this._itemNodeMap[C];
if(E){var D=E.getParent();
D.deleteNode(E);
this._itemNodeMap[C]=null
}},_onSetItem:function(B){var C=this.store.getIdentity(B);
node=this._itemNodeMap[C];
if(node){node.setLabelNode(this.getLabel(B));
node._updateItemClasses(B)
}},_saveState:function(){if(!this.persist){return 
}var C=[];
for(var B in this._openedItemIds){C.push(B)
}A.cookie(this.cookieName,C.join(","))
}})
}}});