dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Transfer"],["provide","dojox.wire.ml.ChildWire"],["provide","dojox.wire.ml.ColumnWire"],["provide","dojox.wire.ml.NodeWire"],["provide","dojox.wire.ml.SegmentWire"],["require","dijit._Widget"],["require","dijit._Container"],["require","dojox.wire._base"],["require","dojox.wire.ml.Action"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.Transfer"]){A._hasResource["dojox.wire.ml.Transfer"]=true;
A.provide("dojox.wire.ml.Transfer");
A.provide("dojox.wire.ml.ChildWire");
A.provide("dojox.wire.ml.ColumnWire");
A.provide("dojox.wire.ml.NodeWire");
A.provide("dojox.wire.ml.SegmentWire");
A.require("dijit._Widget");
A.require("dijit._Container");
A.require("dojox.wire._base");
A.require("dojox.wire.ml.Action");
A.declare("dojox.wire.ml.Transfer",dojox.wire.ml.Action,{source:"",sourceStore:"",sourceAttribute:"",sourcePath:"",type:"",converter:"",delimiter:"",target:"",targetStore:"",targetAttribute:"",targetPath:"",_run:function(){var C=this._getWire("source");
var B=this._getWire("target");
dojox.wire.transfer(C,B,arguments)
},_getWire:function(F){var C=undefined;
if(F=="source"){C={object:this.source,dataStore:this.sourceStore,attribute:this.sourceAttribute,path:this.sourcePath,type:this.type,converter:this.converter}
}else{C={object:this.target,dataStore:this.targetStore,attribute:this.targetAttribute,path:this.targetPath}
}if(C.object){if(C.object.length>=9&&C.object.substring(0,9)=="arguments"){C.property=C.object.substring(9);
C.object=null
}else{var E=C.object.indexOf(".");
if(E<0){C.object=dojox.wire.ml._getValue(C.object)
}else{C.property=C.object.substring(E+1);
C.object=dojox.wire.ml._getValue(C.object.substring(0,E))
}}}if(C.dataStore){C.dataStore=dojox.wire.ml._getValue(C.dataStore)
}var B=undefined;
var D=this.getChildren();
for(var E in D){var G=D[E];
if(G instanceof dojox.wire.ml.ChildWire&&G.which==F){if(!B){B={}
}G._addWire(this,B)
}}if(B){B.object=dojox.wire.create(C);
B.dataStore=C.dataStore;
C=B
}return C
}});
A.declare("dojox.wire.ml.ChildWire",dijit._Widget,{which:"source",object:"",property:"",type:"",converter:"",attribute:"",path:"",name:"",_addWire:function(C,B){if(this.name){if(!B.children){B.children={}
}B.children[this.name]=this._getWire(C)
}else{if(!B.children){B.children=[]
}B.children.push(this._getWire(C))
}},_getWire:function(B){return{object:(this.object?dojox.wire.ml._getValue(this.object):undefined),property:this.property,type:this.type,converter:this.converter,attribute:this.attribute,path:this.path}
}});
A.declare("dojox.wire.ml.ColumnWire",dojox.wire.ml.ChildWire,{column:"",_addWire:function(C,B){if(this.column){if(!B.columns){B.columns={}
}B.columns[this.column]=this._getWire(C)
}else{if(!B.columns){B.columns=[]
}B.columns.push(this._getWire(C))
}}});
A.declare("dojox.wire.ml.NodeWire",[dojox.wire.ml.ChildWire,dijit._Container],{titleProperty:"",titleAttribute:"",titlePath:"",_addWire:function(C,B){if(!B.nodes){B.nodes=[]
}B.nodes.push(this._getWires(C))
},_getWires:function(F){var C={node:this._getWire(F),title:{type:"string",property:this.titleProperty,attribute:this.titleAttribute,path:this.titlePath}};
var B=[];
var E=this.getChildren();
for(var D in E){var G=E[D];
if(G instanceof dojox.wire.ml.NodeWire){B.push(G._getWires(F))
}}if(B.length>0){C.children=B
}return C
}});
A.declare("dojox.wire.ml.SegmentWire",dojox.wire.ml.ChildWire,{_addWire:function(C,B){if(!B.segments){B.segments=[]
}B.segments.push(this._getWire(C));
if(C.delimiter&&!B.delimiter){B.delimiter=C.delimiter
}}})
}}});