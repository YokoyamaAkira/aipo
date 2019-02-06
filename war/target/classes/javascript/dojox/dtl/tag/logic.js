if(!dojo._hasResource["dojox.dtl.tag.logic"]){dojo._hasResource["dojox.dtl.tag.logic"]=true;
dojo.provide("dojox.dtl.tag.logic");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.logic.IfNode=function(C,B,D,A){this.bools=C;
this.trues=B;
this.falses=D;
this.type=A
};
dojo.extend(dojox.dtl.tag.logic.IfNode,{render:function(B,F){if(this.type=="or"){for(var A=0,G;
G=this.bools[A];
A++){var E=G[0];
var C=G[1];
var D=C.resolve(B);
if((D&&!E)||(E&&!D)){if(this.falses){F=this.falses.unrender(B,F)
}return this.trues.render(B,F,this)
}F=this.trues.unrender(B,F);
if(this.falses){return this.falses.render(B,F,this)
}}}else{for(var A=0,G;
G=this.bools[A];
A++){var E=G[0];
var C=G[1];
var D=C.resolve(B);
if(!((D&&!E)||(E&&!D))){if(this.trues){F=this.trues.unrender(B,F)
}return this.falses.render(B,F,this)
}F=this.falses.unrender(B,F);
if(this.falses){return this.trues.render(B,F,this)
}}}return F
},unrender:function(A,B){if(this.trues){B=this.trues.unrender(A,B)
}if(this.falses){B=this.falses.unrender(A,B)
}return B
},clone:function(C){var B=this.trues;
var A=this.falses;
if(B){B=B.clone(C)
}if(A){A=A.clone(C)
}return new this.constructor(this.bools,B,A,this.type)
},toString:function(){return"dojox.dtl.tag.logic.IfNode"
}});
dojox.dtl.tag.logic.ForNode=function(A,D,C,B){this.assign=A;
this.loop=D;
this.reversed=C;
this.nodelist=B;
this.pool=[]
};
dojo.extend(dojox.dtl.tag.logic.ForNode,{render:function(B,E){var D={};
if(B.forloop){D=B.forloop
}var F=dojox.dtl.resolveVariable(this.loop,B);
B.push();
for(var A=F.length;
A<this.pool.length;
A++){this.pool[A].unrender(B,E)
}if(this.reversed){F=F.reversed()
}var G=0;
for(var A in F){var C=F[A];
B.forloop={key:A,counter0:G,counter:G+1,revcounter0:F.length-G-1,revcounter:F.length-G,first:G==0,parentloop:D};
B[this.assign]=C;
if(G+1>this.pool.length){this.pool.push(this.nodelist.clone(E))
}E=this.pool[G].render(B,E,this);
++G
}B.pop();
return E
},unrender:function(C,D){for(var B=0,A;
A=this.pool[B];
B++){D=A.unrender(C,D)
}return D
},clone:function(A){return new this.constructor(this.assign,this.loop,this.reversed,this.nodelist.clone(A))
},toString:function(){return"dojox.dtl.tag.logic.ForNode"
}});
dojox.dtl.tag.logic.if_=function(H,G){var B=G.split(/\s+/g);
var F;
var I=[];
B.shift();
G=B.join(" ");
B=G.split(" and ");
if(B.length==1){F="or";
B=G.split(" or ")
}else{F="and";
for(var C=0;
C<B.length;
C++){if(B[C]=="or"){throw new Error("'if' tags can't mix 'and' and 'or'")
}}}for(var C=0,J;
J=B[C];
C++){var K=false;
if(J.indexOf("not ")==0){J=J.substring(4);
K=true
}I.push([K,new dojox.dtl.Filter(J)])
}var D=H.parse(["else","endif"]);
var E=false;
var A=H.next();
if(A.text=="else"){var E=H.parse(["endif"]);
H.next()
}return new dojox.dtl.tag.logic.IfNode(I,D,E,F)
};
dojox.dtl.tag.logic.for_=function(D,C){var A=C.split(/\s+/g);
var B=A.length==5;
var E=D.parse(["endfor"]);
D.next();
return new dojox.dtl.tag.logic.ForNode(A[1],A[3],B,E)
}
};