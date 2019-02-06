if(!dojo._hasResource["dojox.wire.ml.Data"]){dojo._hasResource["dojox.wire.ml.Data"]=true;
dojo.provide("dojox.wire.ml.Data");
dojo.provide("dojox.wire.ml.DataProperty");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dojox.wire.ml.util");
dojo.declare("dojox.wire.ml.Data",[dijit._Widget,dijit._Container],{startup:function(){this._initializeProperties()
},_initializeProperties:function(B){if(!this._properties||B){this._properties={}
}var A=this.getChildren();
for(var D in A){var C=A[D];
if((C instanceof dojox.wire.ml.DataProperty)&&C.name){this.setPropertyValue(C.name,C.getValue())
}}},getPropertyValue:function(A){return this._properties[A]
},setPropertyValue:function(A,B){this._properties[A]=B
}});
dojo.declare("dojox.wire.ml.DataProperty",[dijit._Widget,dijit._Container],{name:"",type:"",value:"",getValue:function(){var B=this.value;
if(this.type){if(this.type=="number"){B=parseInt(B)
}else{if(this.type=="boolean"){B=(B=="true")
}else{if(this.type=="array"){B=[];
var A=this.getChildren();
for(var D in A){var C=A[D];
if(C instanceof dojox.wire.ml.DataProperty){B.push(C.getValue())
}}}else{if(this.type=="object"){B={};
var A=this.getChildren();
for(var D in A){var C=A[D];
if((C instanceof dojox.wire.ml.DataProperty)&&C.name){B[C.name]=C.getValue()
}}}else{if(this.type=="element"){B=new dojox.wire.ml.XmlElement(B);
var A=this.getChildren();
for(var D in A){var C=A[D];
if((C instanceof dojox.wire.ml.DataProperty)&&C.name){B.setPropertyValue(C.name,C.getValue())
}}}}}}}}return B
}})
};