if(!dojo._hasResource["dojox.dtl.tag.loop"]){dojo._hasResource["dojox.dtl.tag.loop"]=true;
dojo.provide("dojox.dtl.tag.loop");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.loop.CycleNode=function(B,A,C){this._cyclevars=B;
this._counter=-1;
this._name=A;
this._map={};
this._VarNode=C
};
dojo.extend(dojox.dtl.tag.loop.CycleNode,{render:function(B,A){if(B.forloop&&!B.forloop.counter0){this._counter=-1
}++this._counter;
var D=this._cyclevars[this._counter%this._cyclevars.length];
if(this._name){B[this._name]=D
}if(!this._map[D]){this._map[D]={}
}var C=this._map[D][this._counter]=new this._VarNode(D);
return C.render(B,A,this)
},unrender:function(B,A){return A
},clone:function(){return new this.constructor(this._cyclevars,this._name)
},_onEnd:function(){this._counter=-1
},toString:function(){return"dojox.dtl.tag.loop.CycleNode"
}});
dojox.dtl.tag.loop.cycle=function(G,F){var B=F.split(" ");
if(B.length<2){throw new Error("'cycle' tag requires at least two arguments")
}if(B[1].indexOf(",")!=-1){var E=B[1].split(",");
B=[B[0]];
for(var C=0;
C<E.length;
C++){B.push('"'+E[C]+'"')
}}if(B.length==2){var A=B[B.length-1];
if(!G._namedCycleNodes){throw new Error("No named cycles in template: '"+A+"' is not defined")
}if(!G._namedCycleNodes[A]){throw new Error("Named cycle '"+A+"' does not exist")
}return G._namedCycleNodes[A]
}if(B.length>4&&B[B.length-2]=="as"){var A=B[B.length-1];
var D=new dojox.dtl.tag.loop.CycleNode(B.slice(1,B.length-2),A,G.getVarNode());
if(!G._namedCycleNodes){G._namedCycleNodes={}
}G._namedCycleNodes[A]=D
}else{D=new dojox.dtl.tag.loop.CycleNode(B.slice(1),null,G.getVarNode())
}return D
}
};