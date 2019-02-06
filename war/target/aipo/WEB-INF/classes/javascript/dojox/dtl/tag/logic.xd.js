dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.logic"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.logic"]){A._hasResource["dojox.dtl.tag.logic"]=true;
A.provide("dojox.dtl.tag.logic");
A.require("dojox.dtl._base");
dojox.dtl.tag.logic.IfNode=function(B,E,C,D){this.bools=B;
this.trues=E;
this.falses=C;
this.type=D
};
A.extend(dojox.dtl.tag.logic.IfNode,{render:function(E,H){if(this.type=="or"){for(var D=0,C;
C=this.bools[D];
D++){var G=C[0];
var F=C[1];
var B=F.resolve(E);
if((B&&!G)||(G&&!B)){if(this.falses){H=this.falses.unrender(E,H)
}return this.trues.render(E,H,this)
}H=this.trues.unrender(E,H);
if(this.falses){return this.falses.render(E,H,this)
}}}else{for(var D=0,C;
C=this.bools[D];
D++){var G=C[0];
var F=C[1];
var B=F.resolve(E);
if(!((B&&!G)||(G&&!B))){if(this.trues){H=this.trues.unrender(E,H)
}return this.falses.render(E,H,this)
}H=this.falses.unrender(E,H);
if(this.falses){return this.trues.render(E,H,this)
}}}return H
},unrender:function(B,C){if(this.trues){C=this.trues.unrender(B,C)
}if(this.falses){C=this.falses.unrender(B,C)
}return C
},clone:function(C){var B=this.trues;
var D=this.falses;
if(B){B=B.clone(C)
}if(D){D=D.clone(C)
}return new this.constructor(this.bools,B,D,this.type)
},toString:function(){return"dojox.dtl.tag.logic.IfNode"
}});
dojox.dtl.tag.logic.ForNode=function(D,C,B,E){this.assign=D;
this.loop=C;
this.reversed=B;
this.nodelist=E;
this.pool=[]
};
A.extend(dojox.dtl.tag.logic.ForNode,{render:function(E,G){var C={};
if(E.forloop){C=E.forloop
}var H=dojox.dtl.resolveVariable(this.loop,E);
E.push();
for(var D=H.length;
D<this.pool.length;
D++){this.pool[D].unrender(E,G)
}if(this.reversed){H=H.reversed()
}var B=0;
for(var D in H){var F=H[D];
E.forloop={key:D,counter0:B,counter:B+1,revcounter0:H.length-B-1,revcounter:H.length-B,first:B==0,parentloop:C};
E[this.assign]=F;
if(B+1>this.pool.length){this.pool.push(this.nodelist.clone(G))
}G=this.pool[B].render(E,G,this);
++B
}E.pop();
return G
},unrender:function(B,C){for(var E=0,D;
D=this.pool[E];
E++){C=D.unrender(B,C)
}return C
},clone:function(B){return new this.constructor(this.assign,this.loop,this.reversed,this.nodelist.clone(B))
},toString:function(){return"dojox.dtl.tag.logic.ForNode"
}});
dojox.dtl.tag.logic.if_=function(K,J){var E=J.split(/\s+/g);
var I;
var L=[];
E.shift();
J=E.join(" ");
E=J.split(" and ");
if(E.length==1){I="or";
E=J.split(" or ")
}else{I="and";
for(var F=0;
F<E.length;
F++){if(E[F]=="or"){throw new Error("'if' tags can't mix 'and' and 'or'")
}}}for(var F=0,B;
B=E[F];
F++){var C=false;
if(B.indexOf("not ")==0){B=B.substring(4);
C=true
}L.push([C,new dojox.dtl.Filter(B)])
}var G=K.parse(["else","endif"]);
var H=false;
var D=K.next();
if(D.text=="else"){var H=K.parse(["endif"]);
K.next()
}return new dojox.dtl.tag.logic.IfNode(L,G,H,I)
};
dojox.dtl.tag.logic.for_=function(B,F){var D=F.split(/\s+/g);
var E=D.length==5;
var C=B.parse(["endfor"]);
B.next();
return new dojox.dtl.tag.logic.ForNode(D[1],D[3],E,C)
}
}}});