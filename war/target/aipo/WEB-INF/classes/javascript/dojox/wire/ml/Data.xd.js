dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Data"],["provide","dojox.wire.ml.DataProperty"],["require","dijit._Widget"],["require","dijit._Container"],["require","dojox.wire.ml.util"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.Data"]){A._hasResource["dojox.wire.ml.Data"]=true;
A.provide("dojox.wire.ml.Data");
A.provide("dojox.wire.ml.DataProperty");
A.require("dijit._Widget");
A.require("dijit._Container");
A.require("dojox.wire.ml.util");
A.declare("dojox.wire.ml.Data",[dijit._Widget,dijit._Container],{startup:function(){this._initializeProperties()
},_initializeProperties:function(E){if(!this._properties||E){this._properties={}
}var D=this.getChildren();
for(var C in D){var B=D[C];
if((B instanceof dojox.wire.ml.DataProperty)&&B.name){this.setPropertyValue(B.name,B.getValue())
}}},getPropertyValue:function(B){return this._properties[B]
},setPropertyValue:function(B,C){this._properties[B]=C
}});
A.declare("dojox.wire.ml.DataProperty",[dijit._Widget,dijit._Container],{name:"",type:"",value:"",getValue:function(){var E=this.value;
if(this.type){if(this.type=="number"){E=parseInt(E)
}else{if(this.type=="boolean"){E=(E=="true")
}else{if(this.type=="array"){E=[];
var D=this.getChildren();
for(var C in D){var B=D[C];
if(B instanceof dojox.wire.ml.DataProperty){E.push(B.getValue())
}}}else{if(this.type=="object"){E={};
var D=this.getChildren();
for(var C in D){var B=D[C];
if((B instanceof dojox.wire.ml.DataProperty)&&B.name){E[B.name]=B.getValue()
}}}else{if(this.type=="element"){E=new dojox.wire.ml.XmlElement(E);
var D=this.getChildren();
for(var C in D){var B=D[C];
if((B instanceof dojox.wire.ml.DataProperty)&&B.name){E.setPropertyValue(B.name,B.getValue())
}}}}}}}}return E
}})
}}});