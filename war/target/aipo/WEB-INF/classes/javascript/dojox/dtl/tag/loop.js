if(!dojo._hasResource["dojox.dtl.tag.loop"]){dojo._hasResource["dojox.dtl.tag.loop"]=true;
dojo.provide("dojox.dtl.tag.loop");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.loop.CycleNode=function(A,C,B){this._cyclevars=A;
this._counter=-1;
this._name=C;
this._map={};
this._VarNode=B
};
dojo.extend(dojox.dtl.tag.loop.CycleNode,{render:function(A,D){if(A.forloop&&!A.forloop.counter0){this._counter=-1
}++this._counter;
var C=this._cyclevars[this._counter%this._cyclevars.length];
if(this._name){A[this._name]=C
}if(!this._map[C]){this._map[C]={}
}var B=this._map[C][this._counter]=new this._VarNode(C);
return B.render(A,D,this)
},unrender:function(A,B){return B
},clone:function(){return new this.constructor(this._cyclevars,this._name)
},_onEnd:function(){this._counter=-1
},toString:function(){return"dojox.dtl.tag.loop.CycleNode"
}});
dojox.dtl.tag.loop.cycle=function(D,C){var F=C.split(" ");
if(F.length<2){throw new Error("'cycle' tag requires at least two arguments")
}if(F[1].indexOf(",")!=-1){var B=F[1].split(",");
F=[F[0]];
for(var G=0;
G<B.length;
G++){F.push('"'+B[G]+'"')
}}if(F.length==2){var E=F[F.length-1];
if(!D._namedCycleNodes){throw new Error("No named cycles in template: '"+E+"' is not defined")
}if(!D._namedCycleNodes[E]){throw new Error("Named cycle '"+E+"' does not exist")
}return D._namedCycleNodes[E]
}if(F.length>4&&F[F.length-2]=="as"){var E=F[F.length-1];
var A=new dojox.dtl.tag.loop.CycleNode(F.slice(1,F.length-2),E,D.getVarNode());
if(!D._namedCycleNodes){D._namedCycleNodes={}
}D._namedCycleNodes[E]=A
}else{A=new dojox.dtl.tag.loop.CycleNode(F.slice(1),null,D.getVarNode())
}return A
}
};