dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.logic"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.logic"]){A._hasResource["dojox.dtl.tag.logic"]=true;
A.provide("dojox.dtl.tag.logic");
A.require("dojox.dtl._base");
dojox.dtl.tag.logic.IfNode=function(E,D,B,C){this.bools=E;
this.trues=D;
this.falses=B;
this.type=C
};
A.extend(dojox.dtl.tag.logic.IfNode,{render:function(F,C){if(this.type=="or"){for(var E=0,D;
D=this.bools[E];
E++){var B=D[0];
var G=D[1];
var H=G.resolve(F);
if((H&&!B)||(B&&!H)){if(this.falses){C=this.falses.unrender(F,C)
}return this.trues.render(F,C,this)
}C=this.trues.unrender(F,C);
if(this.falses){return this.falses.render(F,C,this)
}}}else{for(var E=0,D;
D=this.bools[E];
E++){var B=D[0];
var G=D[1];
var H=G.resolve(F);
if(!((H&&!B)||(B&&!H))){if(this.trues){C=this.trues.unrender(F,C)
}return this.falses.render(F,C,this)
}C=this.falses.unrender(F,C);
if(this.falses){return this.trues.render(F,C,this)
}}}return C
},unrender:function(C,B){if(this.trues){B=this.trues.unrender(C,B)
}if(this.falses){B=this.falses.unrender(C,B)
}return B
},clone:function(B){var D=this.trues;
var C=this.falses;
if(D){D=D.clone(B)
}if(C){C=C.clone(B)
}return new this.constructor(this.bools,D,C,this.type)
},toString:function(){return"dojox.dtl.tag.logic.IfNode"
}});
dojox.dtl.tag.logic.ForNode=function(C,B,E,D){this.assign=C;
this.loop=B;
this.reversed=E;
this.nodelist=D;
this.pool=[]
};
A.extend(dojox.dtl.tag.logic.ForNode,{render:function(F,B){var H={};
if(F.forloop){H=F.forloop
}var C=dojox.dtl.resolveVariable(this.loop,F);
F.push();
for(var E=C.length;
E<this.pool.length;
E++){this.pool[E].unrender(F,B)
}if(this.reversed){C=C.reversed()
}var D=0;
for(var E in C){var G=C[E];
F.forloop={key:E,counter0:D,counter:D+1,revcounter0:C.length-D-1,revcounter:C.length-D,first:D==0,parentloop:H};
F[this.assign]=G;
if(D+1>this.pool.length){this.pool.push(this.nodelist.clone(B))
}B=this.pool[D].render(F,B,this);
++D
}F.pop();
return B
},unrender:function(E,B){for(var D=0,C;
C=this.pool[D];
D++){B=C.unrender(E,B)
}return B
},clone:function(B){return new this.constructor(this.assign,this.loop,this.reversed,this.nodelist.clone(B))
},toString:function(){return"dojox.dtl.tag.logic.ForNode"
}});
dojox.dtl.tag.logic.if_=function(B,L){var G=L.split(/\s+/g);
var K;
var C=[];
G.shift();
L=G.join(" ");
G=L.split(" and ");
if(G.length==1){K="or";
G=L.split(" or ")
}else{K="and";
for(var H=0;
H<G.length;
H++){if(G[H]=="or"){throw new Error("'if' tags can't mix 'and' and 'or'")
}}}for(var H=0,D;
D=G[H];
H++){var E=false;
if(D.indexOf("not ")==0){D=D.substring(4);
E=true
}C.push([E,new dojox.dtl.Filter(D)])
}var I=B.parse(["else","endif"]);
var J=false;
var F=B.next();
if(F.text=="else"){var J=B.parse(["endif"]);
B.next()
}return new dojox.dtl.tag.logic.IfNode(C,I,J,K)
};
dojox.dtl.tag.logic.for_=function(F,E){var C=E.split(/\s+/g);
var D=C.length==5;
var B=F.parse(["endfor"]);
F.next();
return new dojox.dtl.tag.logic.ForNode(C[1],C[3],D,B)
}
}}});