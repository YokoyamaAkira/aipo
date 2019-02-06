dojo._xdResourceLoaded({depends:[["provide","dojox.wire.demos.WidgetRepeater"],["require","dojo.parser"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"],["require",this.widget]],defineResource:function(A){if(!A._hasResource["dojox.wire.demos.WidgetRepeater"]){A._hasResource["dojox.wire.demos.WidgetRepeater"]=true;
A.provide("dojox.wire.demos.WidgetRepeater");
A.require("dojo.parser");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("dijit._Container");
A.declare("dojox.wire.demos.WidgetRepeater",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<div class='WidgetRepeater' dojoAttachPoint='repeaterNode'></div>",widget:null,repeater:null,createNew:function(B){try{if(A.isString(this.widget)){A.require(this.widget);
this.widget=A.getObject(this.widget)
}this.addChild(new this.widget(B));
this.repeaterNode.appendChild(document.createElement("br"))
}catch(C){console.debug(C)
}}})
}}});