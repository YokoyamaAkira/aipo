dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Data"],["provide","dojox.wire.ml.DataProperty"],["require","dijit._Widget"],["require","dijit._Container"],["require","dojox.wire.ml.util"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.Data"]){A._hasResource["dojox.wire.ml.Data"]=true;
A.provide("dojox.wire.ml.Data");
A.provide("dojox.wire.ml.DataProperty");
A.require("dijit._Widget");
A.require("dijit._Container");
A.require("dojox.wire.ml.util");
A.declare("dojox.wire.ml.Data",[dijit._Widget,dijit._Container],{startup:function(){this._initializeProperties()
},_initializeProperties:function(D){if(!this._properties||D){this._properties={}
}var C=this.getChildren();
for(var B in C){var E=C[B];
if((E instanceof dojox.wire.ml.DataProperty)&&E.name){this.setPropertyValue(E.name,E.getValue())
}}},getPropertyValue:function(B){return this._properties[B]
},setPropertyValue:function(C,B){this._properties[C]=B
}});
A.declare("dojox.wire.ml.DataProperty",[dijit._Widget,dijit._Container],{name:"",type:"",value:"",getValue:function(){var D=this.value;
if(this.type){if(this.type=="number"){D=parseInt(D)
}else{if(this.type=="boolean"){D=(D=="true")
}else{if(this.type=="array"){D=[];
var C=this.getChildren();
for(var B in C){var E=C[B];
if(E instanceof dojox.wire.ml.DataProperty){D.push(E.getValue())
}}}else{if(this.type=="object"){D={};
var C=this.getChildren();
for(var B in C){var E=C[B];
if((E instanceof dojox.wire.ml.DataProperty)&&E.name){D[E.name]=E.getValue()
}}}else{if(this.type=="element"){D=new dojox.wire.ml.XmlElement(D);
var C=this.getChildren();
for(var B in C){var E=C[B];
if((E instanceof dojox.wire.ml.DataProperty)&&E.name){D.setPropertyValue(E.name,E.getValue())
}}}}}}}}return D
}})
}}});