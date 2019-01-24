dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.loop"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.loop"]){A._hasResource["dojox.dtl.tag.loop"]=true;
A.provide("dojox.dtl.tag.loop");
A.require("dojox.dtl._base");
dojox.dtl.tag.loop.CycleNode=function(C,B,D){this._cyclevars=C;
this._counter=-1;
this._name=B;
this._map={};
this._VarNode=D
};
A.extend(dojox.dtl.tag.loop.CycleNode,{render:function(C,B){if(C.forloop&&!C.forloop.counter0){this._counter=-1
}++this._counter;
var E=this._cyclevars[this._counter%this._cyclevars.length];
if(this._name){C[this._name]=E
}if(!this._map[E]){this._map[E]={}
}var D=this._map[E][this._counter]=new this._VarNode(E);
return D.render(C,B,this)
},unrender:function(C,B){return B
},clone:function(){return new this.constructor(this._cyclevars,this._name)
},_onEnd:function(){this._counter=-1
},toString:function(){return"dojox.dtl.tag.loop.CycleNode"
}});
dojox.dtl.tag.loop.cycle=function(H,G){var C=G.split(" ");
if(C.length<2){throw new Error("'cycle' tag requires at least two arguments")
}if(C[1].indexOf(",")!=-1){var F=C[1].split(",");
C=[C[0]];
for(var D=0;
D<F.length;
D++){C.push('"'+F[D]+'"')
}}if(C.length==2){var B=C[C.length-1];
if(!H._namedCycleNodes){throw new Error("No named cycles in template: '"+B+"' is not defined")
}if(!H._namedCycleNodes[B]){throw new Error("Named cycle '"+B+"' does not exist")
}return H._namedCycleNodes[B]
}if(C.length>4&&C[C.length-2]=="as"){var B=C[C.length-1];
var E=new dojox.dtl.tag.loop.CycleNode(C.slice(1,C.length-2),B,H.getVarNode());
if(!H._namedCycleNodes){H._namedCycleNodes={}
}H._namedCycleNodes[B]=E
}else{E=new dojox.dtl.tag.loop.CycleNode(C.slice(1),null,H.getVarNode())
}return E
}
}}});