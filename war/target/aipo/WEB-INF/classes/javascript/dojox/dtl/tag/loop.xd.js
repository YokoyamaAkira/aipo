dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.loop"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.loop"]){A._hasResource["dojox.dtl.tag.loop"]=true;
A.provide("dojox.dtl.tag.loop");
A.require("dojox.dtl._base");
dojox.dtl.tag.loop.CycleNode=function(D,C,B){this._cyclevars=D;
this._counter=-1;
this._name=C;
this._map={};
this._VarNode=B
};
A.extend(dojox.dtl.tag.loop.CycleNode,{render:function(D,C){if(D.forloop&&!D.forloop.counter0){this._counter=-1
}++this._counter;
var B=this._cyclevars[this._counter%this._cyclevars.length];
if(this._name){D[this._name]=B
}if(!this._map[B]){this._map[B]={}
}var E=this._map[B][this._counter]=new this._VarNode(B);
return E.render(D,C,this)
},unrender:function(B,C){return C
},clone:function(){return new this.constructor(this._cyclevars,this._name)
},_onEnd:function(){this._counter=-1
},toString:function(){return"dojox.dtl.tag.loop.CycleNode"
}});
dojox.dtl.tag.loop.cycle=function(C,F){var H=F.split(" ");
if(H.length<2){throw new Error("'cycle' tag requires at least two arguments")
}if(H[1].indexOf(",")!=-1){var E=H[1].split(",");
H=[H[0]];
for(var B=0;
B<E.length;
B++){H.push('"'+E[B]+'"')
}}if(H.length==2){var G=H[H.length-1];
if(!C._namedCycleNodes){throw new Error("No named cycles in template: '"+G+"' is not defined")
}if(!C._namedCycleNodes[G]){throw new Error("Named cycle '"+G+"' does not exist")
}return C._namedCycleNodes[G]
}if(H.length>4&&H[H.length-2]=="as"){var G=H[H.length-1];
var D=new dojox.dtl.tag.loop.CycleNode(H.slice(1,H.length-2),G,C.getVarNode());
if(!C._namedCycleNodes){C._namedCycleNodes={}
}C._namedCycleNodes[G]=D
}else{D=new dojox.dtl.tag.loop.CycleNode(H.slice(1),null,C.getVarNode())
}return D
}
}}});