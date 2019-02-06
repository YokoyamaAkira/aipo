dojo._xdResourceLoaded({depends:[["provide","dijit.Toolbar"],["require","dijit._Widget"],["require","dijit._Container"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.Toolbar"]){A._hasResource["dijit.Toolbar"]=true;
A.provide("dijit.Toolbar");
A.require("dijit._Widget");
A.require("dijit._Container");
A.require("dijit._Templated");
A.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:'<div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div>',tabIndex:"0",postCreate:function(){this.connectKeyNavHandlers(this.isLeftToRight()?[A.keys.LEFT_ARROW]:[A.keys.RIGHT_ARROW],this.isLeftToRight()?[A.keys.RIGHT_ARROW]:[A.keys.LEFT_ARROW])
},startup:function(){this.startupKeyNavChildren()
}});
A.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:'<div class="dijitToolbarSeparator dijitInline"></div>',postCreate:function(){A.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}}});