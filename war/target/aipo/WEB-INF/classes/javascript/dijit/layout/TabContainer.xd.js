dojo._xdResourceLoaded({depends:[["provide","dijit.layout.TabContainer"],["require","dijit.layout.StackContainer"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.layout.TabContainer"]){A._hasResource["dijit.layout.TabContainer"]=true;
A.provide("dijit.layout.TabContainer");
A.require("dijit.layout.StackContainer");
A.require("dijit._Templated");
A.declare("dijit.layout.TabContainer",[dijit.layout.StackContainer,dijit._Templated],{tabPosition:"top",templateString:null,templateString:'<div class="dijitTabContainer">\r\n\t<div dojoAttachPoint="tablistNode"></div>\r\n\t<div class="dijitTabPaneWrapper" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',postCreate:function(){dijit.layout.TabContainer.superclass.postCreate.apply(this,arguments);
this.tablist=new dijit.layout.TabController({id:this.id+"_tablist",tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id},this.tablistNode)
},_setupChild:function(B){A.addClass(B.domNode,"dijitTabPane");
this.inherited("_setupChild",arguments);
return B
},startup:function(){if(this._started){return 
}this.tablist.startup();
this.inherited("startup",arguments);
if(A.isSafari){setTimeout(A.hitch(this,"layout"),0)
}},layout:function(){if(!this.doLayout){return 
}var B=this.tabPosition.replace(/-h/,"");
var C=[{domNode:this.tablist.domNode,layoutAlign:B},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,C);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,C[1]);
if(this.selectedChildWidget){this._showChild(this.selectedChildWidget);
if(this.doLayout&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._containerContentBox)
}}},destroy:function(){this.tablist.destroy();
this.inherited("destroy",arguments)
}});
A.declare("dijit.layout.TabController",dijit.layout.StackController,{templateString:"<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",tabPosition:"top",doLayout:true,buttonWidget:"dijit.layout._TabButton",postMixInProperties:function(){this["class"]="dijitTabLabels-"+this.tabPosition+(this.doLayout?"":" dijitTabNoLayout");
this.inherited("postMixInProperties",arguments)
}});
A.declare("dijit.layout._TabButton",dijit.layout._StackButton,{baseClass:"dijitTab",templateString:"<div dojoAttachEvent='onclick:onClick,onmouseenter:_onMouse,onmouseleave:_onMouse'>\r\n    <div class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\r\n        <span dojoAttachPoint='containerNode,focusNode'>${!label}</span>\r\n        <span dojoAttachPoint='closeButtonNode' class='closeImage' dojoAttachEvent='onmouseenter:_onMouse, onmouseleave:_onMouse, onclick:onClickCloseButton' stateModifier='CloseButton'>\r\n            <span dojoAttachPoint='closeText' class='closeText'>x</span>\r\n        </span>\r\n    </div>\r\n</div>\r\n",postCreate:function(){if(this.closeButton){A.addClass(this.innerDiv,"dijitClosable")
}else{this.closeButtonNode.style.display="none"
}this.inherited("postCreate",arguments);
A.setSelectable(this.containerNode,false)
}})
}}});