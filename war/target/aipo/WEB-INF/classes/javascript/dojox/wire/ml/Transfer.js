if(!dojo._hasResource["dojox.wire.ml.Transfer"]){dojo._hasResource["dojox.wire.ml.Transfer"]=true;
dojo.provide("dojox.wire.ml.Transfer");
dojo.provide("dojox.wire.ml.ChildWire");
dojo.provide("dojox.wire.ml.ColumnWire");
dojo.provide("dojox.wire.ml.NodeWire");
dojo.provide("dojox.wire.ml.SegmentWire");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dojox.wire._base");
dojo.require("dojox.wire.ml.Action");
dojo.declare("dojox.wire.ml.Transfer",dojox.wire.ml.Action,{source:"",sourceStore:"",sourceAttribute:"",sourcePath:"",type:"",converter:"",delimiter:"",target:"",targetStore:"",targetAttribute:"",targetPath:"",_run:function(){var B=this._getWire("source");
var A=this._getWire("target");
dojox.wire.transfer(B,A,arguments)
},_getWire:function(E){var B=undefined;
if(E=="source"){B={object:this.source,dataStore:this.sourceStore,attribute:this.sourceAttribute,path:this.sourcePath,type:this.type,converter:this.converter}
}else{B={object:this.target,dataStore:this.targetStore,attribute:this.targetAttribute,path:this.targetPath}
}if(B.object){if(B.object.length>=9&&B.object.substring(0,9)=="arguments"){B.property=B.object.substring(9);
B.object=null
}else{var D=B.object.indexOf(".");
if(D<0){B.object=dojox.wire.ml._getValue(B.object)
}else{B.property=B.object.substring(D+1);
B.object=dojox.wire.ml._getValue(B.object.substring(0,D))
}}}if(B.dataStore){B.dataStore=dojox.wire.ml._getValue(B.dataStore)
}var A=undefined;
var C=this.getChildren();
for(var D in C){var F=C[D];
if(F instanceof dojox.wire.ml.ChildWire&&F.which==E){if(!A){A={}
}F._addWire(this,A)
}}if(A){A.object=dojox.wire.create(B);
A.dataStore=B.dataStore;
B=A
}return B
}});
dojo.declare("dojox.wire.ml.ChildWire",dijit._Widget,{which:"source",object:"",property:"",type:"",converter:"",attribute:"",path:"",name:"",_addWire:function(B,A){if(this.name){if(!A.children){A.children={}
}A.children[this.name]=this._getWire(B)
}else{if(!A.children){A.children=[]
}A.children.push(this._getWire(B))
}},_getWire:function(A){return{object:(this.object?dojox.wire.ml._getValue(this.object):undefined),property:this.property,type:this.type,converter:this.converter,attribute:this.attribute,path:this.path}
}});
dojo.declare("dojox.wire.ml.ColumnWire",dojox.wire.ml.ChildWire,{column:"",_addWire:function(B,A){if(this.column){if(!A.columns){A.columns={}
}A.columns[this.column]=this._getWire(B)
}else{if(!A.columns){A.columns=[]
}A.columns.push(this._getWire(B))
}}});
dojo.declare("dojox.wire.ml.NodeWire",[dojox.wire.ml.ChildWire,dijit._Container],{titleProperty:"",titleAttribute:"",titlePath:"",_addWire:function(B,A){if(!A.nodes){A.nodes=[]
}A.nodes.push(this._getWires(B))
},_getWires:function(E){var B={node:this._getWire(E),title:{type:"string",property:this.titleProperty,attribute:this.titleAttribute,path:this.titlePath}};
var A=[];
var D=this.getChildren();
for(var C in D){var F=D[C];
if(F instanceof dojox.wire.ml.NodeWire){A.push(F._getWires(E))
}}if(A.length>0){B.children=A
}return B
}});
dojo.declare("dojox.wire.ml.SegmentWire",dojox.wire.ml.ChildWire,{_addWire:function(B,A){if(!A.segments){A.segments=[]
}A.segments.push(this._getWire(B));
if(B.delimiter&&!A.delimiter){A.delimiter=B.delimiter
}}})
};