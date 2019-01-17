if(!dojo._hasResource["dojox.dtl.tag.logic"]){dojo._hasResource["dojox.dtl.tag.logic"]=true;
dojo.provide("dojox.dtl.tag.logic");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.logic.IfNode=function(D,C,A,B){this.bools=D;
this.trues=C;
this.falses=A;
this.type=B
};
dojo.extend(dojox.dtl.tag.logic.IfNode,{render:function(E,B){if(this.type=="or"){for(var D=0,C;
C=this.bools[D];
D++){var A=C[0];
var F=C[1];
var G=F.resolve(E);
if((G&&!A)||(A&&!G)){if(this.falses){B=this.falses.unrender(E,B)
}return this.trues.render(E,B,this)
}B=this.trues.unrender(E,B);
if(this.falses){return this.falses.render(E,B,this)
}}}else{for(var D=0,C;
C=this.bools[D];
D++){var A=C[0];
var F=C[1];
var G=F.resolve(E);
if(!((G&&!A)||(A&&!G))){if(this.trues){B=this.trues.unrender(E,B)
}return this.falses.render(E,B,this)
}B=this.falses.unrender(E,B);
if(this.falses){return this.trues.render(E,B,this)
}}}return B
},unrender:function(B,A){if(this.trues){A=this.trues.unrender(B,A)
}if(this.falses){A=this.falses.unrender(B,A)
}return A
},clone:function(A){var C=this.trues;
var B=this.falses;
if(C){C=C.clone(A)
}if(B){B=B.clone(A)
}return new this.constructor(this.bools,C,B,this.type)
},toString:function(){return"dojox.dtl.tag.logic.IfNode"
}});
dojox.dtl.tag.logic.ForNode=function(B,A,D,C){this.assign=B;
this.loop=A;
this.reversed=D;
this.nodelist=C;
this.pool=[]
};
dojo.extend(dojox.dtl.tag.logic.ForNode,{render:function(E,A){var G={};
if(E.forloop){G=E.forloop
}var B=dojox.dtl.resolveVariable(this.loop,E);
E.push();
for(var D=B.length;
D<this.pool.length;
D++){this.pool[D].unrender(E,A)
}if(this.reversed){B=B.reversed()
}var C=0;
for(var D in B){var F=B[D];
E.forloop={key:D,counter0:C,counter:C+1,revcounter0:B.length-C-1,revcounter:B.length-C,first:C==0,parentloop:G};
E[this.assign]=F;
if(C+1>this.pool.length){this.pool.push(this.nodelist.clone(A))
}A=this.pool[C].render(E,A,this);
++C
}E.pop();
return A
},unrender:function(D,A){for(var C=0,B;
B=this.pool[C];
C++){A=B.unrender(D,A)
}return A
},clone:function(A){return new this.constructor(this.assign,this.loop,this.reversed,this.nodelist.clone(A))
},toString:function(){return"dojox.dtl.tag.logic.ForNode"
}});
dojox.dtl.tag.logic.if_=function(A,K){var F=K.split(/\s+/g);
var J;
var B=[];
F.shift();
K=F.join(" ");
F=K.split(" and ");
if(F.length==1){J="or";
F=K.split(" or ")
}else{J="and";
for(var G=0;
G<F.length;
G++){if(F[G]=="or"){throw new Error("'if' tags can't mix 'and' and 'or'")
}}}for(var G=0,C;
C=F[G];
G++){var D=false;
if(C.indexOf("not ")==0){C=C.substring(4);
D=true
}B.push([D,new dojox.dtl.Filter(C)])
}var H=A.parse(["else","endif"]);
var I=false;
var E=A.next();
if(E.text=="else"){var I=A.parse(["endif"]);
A.next()
}return new dojox.dtl.tag.logic.IfNode(B,H,I,J)
};
dojox.dtl.tag.logic.for_=function(E,D){var B=D.split(/\s+/g);
var C=B.length==5;
var A=E.parse(["endfor"]);
E.next();
return new dojox.dtl.tag.logic.ForNode(B[1],B[3],C,A)
}
};