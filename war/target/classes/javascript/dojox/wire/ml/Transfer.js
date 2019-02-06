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
dojo.declare("dojox.wire.ml.Transfer",dojox.wire.ml.Action,{source:"",sourceStore:"",sourceAttribute:"",sourcePath:"",type:"",converter:"",delimiter:"",target:"",targetStore:"",targetAttribute:"",targetPath:"",_run:function(){var A=this._getWire("source");
var B=this._getWire("target");
dojox.wire.transfer(A,B,arguments)
},_getWire:function(D){var A=undefined;
if(D=="source"){A={object:this.source,dataStore:this.sourceStore,attribute:this.sourceAttribute,path:this.sourcePath,type:this.type,converter:this.converter}
}else{A={object:this.target,dataStore:this.targetStore,attribute:this.targetAttribute,path:this.targetPath}
}if(A.object){if(A.object.length>=9&&A.object.substring(0,9)=="arguments"){A.property=A.object.substring(9);
A.object=null
}else{var C=A.object.indexOf(".");
if(C<0){A.object=dojox.wire.ml._getValue(A.object)
}else{A.property=A.object.substring(C+1);
A.object=dojox.wire.ml._getValue(A.object.substring(0,C))
}}}if(A.dataStore){A.dataStore=dojox.wire.ml._getValue(A.dataStore)
}var F=undefined;
var B=this.getChildren();
for(var C in B){var E=B[C];
if(E instanceof dojox.wire.ml.ChildWire&&E.which==D){if(!F){F={}
}E._addWire(this,F)
}}if(F){F.object=dojox.wire.create(A);
F.dataStore=A.dataStore;
A=F
}return A
}});
dojo.declare("dojox.wire.ml.ChildWire",dijit._Widget,{which:"source",object:"",property:"",type:"",converter:"",attribute:"",path:"",name:"",_addWire:function(A,B){if(this.name){if(!B.children){B.children={}
}B.children[this.name]=this._getWire(A)
}else{if(!B.children){B.children=[]
}B.children.push(this._getWire(A))
}},_getWire:function(A){return{object:(this.object?dojox.wire.ml._getValue(this.object):undefined),property:this.property,type:this.type,converter:this.converter,attribute:this.attribute,path:this.path}
}});
dojo.declare("dojox.wire.ml.ColumnWire",dojox.wire.ml.ChildWire,{column:"",_addWire:function(A,B){if(this.column){if(!B.columns){B.columns={}
}B.columns[this.column]=this._getWire(A)
}else{if(!B.columns){B.columns=[]
}B.columns.push(this._getWire(A))
}}});
dojo.declare("dojox.wire.ml.NodeWire",[dojox.wire.ml.ChildWire,dijit._Container],{titleProperty:"",titleAttribute:"",titlePath:"",_addWire:function(A,B){if(!B.nodes){B.nodes=[]
}B.nodes.push(this._getWires(A))
},_getWires:function(D){var A={node:this._getWire(D),title:{type:"string",property:this.titleProperty,attribute:this.titleAttribute,path:this.titlePath}};
var F=[];
var C=this.getChildren();
for(var B in C){var E=C[B];
if(E instanceof dojox.wire.ml.NodeWire){F.push(E._getWires(D))
}}if(F.length>0){A.children=F
}return A
}});
dojo.declare("dojox.wire.ml.SegmentWire",dojox.wire.ml.ChildWire,{_addWire:function(A,B){if(!B.segments){B.segments=[]
}B.segments.push(this._getWire(A));
if(A.delimiter&&!B.delimiter){B.delimiter=A.delimiter
}}})
};