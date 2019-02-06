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
A.declare("dojox.wire.ml.Transfer",dojox.wire.ml.Action,{source:"",sourceStore:"",sourceAttribute:"",sourcePath:"",type:"",converter:"",delimiter:"",target:"",targetStore:"",targetAttribute:"",targetPath:"",_run:function(){var B=this._getWire("source");
var C=this._getWire("target");
dojox.wire.transfer(B,C,arguments)
},_getWire:function(G){var D=undefined;
if(G=="source"){D={object:this.source,dataStore:this.sourceStore,attribute:this.sourceAttribute,path:this.sourcePath,type:this.type,converter:this.converter}
}else{D={object:this.target,dataStore:this.targetStore,attribute:this.targetAttribute,path:this.targetPath}
}if(D.object){if(D.object.length>=9&&D.object.substring(0,9)=="arguments"){D.property=D.object.substring(9);
D.object=null
}else{var F=D.object.indexOf(".");
if(F<0){D.object=dojox.wire.ml._getValue(D.object)
}else{D.property=D.object.substring(F+1);
D.object=dojox.wire.ml._getValue(D.object.substring(0,F))
}}}if(D.dataStore){D.dataStore=dojox.wire.ml._getValue(D.dataStore)
}var C=undefined;
var E=this.getChildren();
for(var F in E){var B=E[F];
if(B instanceof dojox.wire.ml.ChildWire&&B.which==G){if(!C){C={}
}B._addWire(this,C)
}}if(C){C.object=dojox.wire.create(D);
C.dataStore=D.dataStore;
D=C
}return D
}});
A.declare("dojox.wire.ml.ChildWire",dijit._Widget,{which:"source",object:"",property:"",type:"",converter:"",attribute:"",path:"",name:"",_addWire:function(B,C){if(this.name){if(!C.children){C.children={}
}C.children[this.name]=this._getWire(B)
}else{if(!C.children){C.children=[]
}C.children.push(this._getWire(B))
}},_getWire:function(B){return{object:(this.object?dojox.wire.ml._getValue(this.object):undefined),property:this.property,type:this.type,converter:this.converter,attribute:this.attribute,path:this.path}
}});
A.declare("dojox.wire.ml.ColumnWire",dojox.wire.ml.ChildWire,{column:"",_addWire:function(B,C){if(this.column){if(!C.columns){C.columns={}
}C.columns[this.column]=this._getWire(B)
}else{if(!C.columns){C.columns=[]
}C.columns.push(this._getWire(B))
}}});
A.declare("dojox.wire.ml.NodeWire",[dojox.wire.ml.ChildWire,dijit._Container],{titleProperty:"",titleAttribute:"",titlePath:"",_addWire:function(B,C){if(!C.nodes){C.nodes=[]
}C.nodes.push(this._getWires(B))
},_getWires:function(G){var D={node:this._getWire(G),title:{type:"string",property:this.titleProperty,attribute:this.titleAttribute,path:this.titlePath}};
var C=[];
var F=this.getChildren();
for(var E in F){var B=F[E];
if(B instanceof dojox.wire.ml.NodeWire){C.push(B._getWires(G))
}}if(C.length>0){D.children=C
}return D
}});
A.declare("dojox.wire.ml.SegmentWire",dojox.wire.ml.ChildWire,{_addWire:function(B,C){if(!C.segments){C.segments=[]
}C.segments.push(this._getWire(B));
if(B.delimiter&&!C.delimiter){C.delimiter=B.delimiter
}}})
}}});