if(!dojo._hasResource["dijit.layout.TabContainer"]){dojo._hasResource["dijit.layout.TabContainer"]=true;
dojo.provide("dijit.layout.TabContainer");
dojo.require("dijit.layout.StackContainer");
dojo.require("dijit._Templated");
dojo.declare("dijit.layout.TabContainer",[dijit.layout.StackContainer,dijit._Templated],{tabPosition:"top",templateString:null,templateString:'<div class="dijitTabContainer">\r\n\t<div dojoAttachPoint="tablistNode"></div>\r\n\t<div class="dijitTabPaneWrapper" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',postCreate:function(){dijit.layout.TabContainer.superclass.postCreate.apply(this,arguments);
this.tablist=new dijit.layout.TabController({id:this.id+"_tablist",tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id},this.tablistNode)
},_setupChild:function(A){dojo.addClass(A.domNode,"dijitTabPane");
this.inherited("_setupChild",arguments);
return A
},startup:function(){if(this._started){return 
}this.tablist.startup();
this.inherited("startup",arguments);
if(dojo.isSafari){setTimeout(dojo.hitch(this,"layout"),0)
}},layout:function(){if(!this.doLayout){return 
}var B=this.tabPosition.replace(/-h/,"");
var A=[{domNode:this.tablist.domNode,layoutAlign:B},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,A);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,A[1]);
if(this.selectedChildWidget){this._showChild(this.selectedChildWidget);
if(this.doLayout&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._containerContentBox)
}}},destroy:function(){this.tablist.destroy();
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.layout.TabController",dijit.layout.StackController,{templateString:"<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",tabPosition:"top",doLayout:true,buttonWidget:"dijit.layout._TabButton",postMixInProperties:function(){this["class"]="dijitTabLabels-"+this.tabPosition+(this.doLayout?"":" dijitTabNoLayout");
this.inherited("postMixInProperties",arguments)
}});
dojo.declare("dijit.layout._TabButton",dijit.layout._StackButton,{baseClass:"dijitTab",templateString:"<div dojoAttachEvent='onclick:onClick,onmouseenter:_onMouse,onmouseleave:_onMouse'>\r\n    <div class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\r\n        <span dojoAttachPoint='containerNode,focusNode'>${!label}</span>\r\n        <span dojoAttachPoint='closeButtonNode' class='closeImage' dojoAttachEvent='onmouseenter:_onMouse, onmouseleave:_onMouse, onclick:onClickCloseButton' stateModifier='CloseButton'>\r\n            <span dojoAttachPoint='closeText' class='closeText'>x</span>\r\n        </span>\r\n    </div>\r\n</div>\r\n",postCreate:function(){if(this.closeButton){dojo.addClass(this.innerDiv,"dijitClosable")
}else{this.closeButtonNode.style.display="none"
}this.inherited("postCreate",arguments);
dojo.setSelectable(this.containerNode,false)
}})
};