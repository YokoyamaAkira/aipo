if(!dojo._hasResource["dojox.wire.ml.Data"]){dojo._hasResource["dojox.wire.ml.Data"]=true;
dojo.provide("dojox.wire.ml.Data");
dojo.provide("dojox.wire.ml.DataProperty");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dojox.wire.ml.util");
dojo.declare("dojox.wire.ml.Data",[dijit._Widget,dijit._Container],{startup:function(){this._initializeProperties()
},_initializeProperties:function(C){if(!this._properties||C){this._properties={}
}var B=this.getChildren();
for(var A in B){var D=B[A];
if((D instanceof dojox.wire.ml.DataProperty)&&D.name){this.setPropertyValue(D.name,D.getValue())
}}},getPropertyValue:function(A){return this._properties[A]
},setPropertyValue:function(B,A){this._properties[B]=A
}});
dojo.declare("dojox.wire.ml.DataProperty",[dijit._Widget,dijit._Container],{name:"",type:"",value:"",getValue:function(){var C=this.value;
if(this.type){if(this.type=="number"){C=parseInt(C)
}else{if(this.type=="boolean"){C=(C=="true")
}else{if(this.type=="array"){C=[];
var B=this.getChildren();
for(var A in B){var D=B[A];
if(D instanceof dojox.wire.ml.DataProperty){C.push(D.getValue())
}}}else{if(this.type=="object"){C={};
var B=this.getChildren();
for(var A in B){var D=B[A];
if((D instanceof dojox.wire.ml.DataProperty)&&D.name){C[D.name]=D.getValue()
}}}else{if(this.type=="element"){C=new dojox.wire.ml.XmlElement(C);
var B=this.getChildren();
for(var A in B){var D=B[A];
if((D instanceof dojox.wire.ml.DataProperty)&&D.name){C.setPropertyValue(D.name,D.getValue())
}}}}}}}}return C
}})
};