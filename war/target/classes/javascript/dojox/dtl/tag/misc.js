if(!dojo._hasResource["dojox.dtl.tag.misc"]){dojo._hasResource["dojox.dtl.tag.misc"]=true;
dojo.provide("dojox.dtl.tag.misc");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.misc.commentNode=new function(){this.render=this.unrender=function(A,B){return B
};
this.clone=function(){return this
};
this.toString=function(){return"dojox.dtl.tag.misc.CommentNode"
}
};
dojox.dtl.tag.misc.DebugNode=function(A){this._TextNode=A
};
dojo.extend(dojox.dtl.tag.misc.DebugNode,{render:function(D,F){var E=D.getKeys();
var A="";
for(var C=0,B;
B=E[C];
C++){console.debug("DEBUG",B,":",D[B]);
A+=B+": "+dojo.toJson(D[B])+"\n\n"
}return new this._TextNode(A).render(D,F,this)
},unrender:function(A,B){return B
},clone:function(A){return new this.constructor(this._TextNode)
},toString:function(){return"dojox.dtl.tag.misc.DebugNode"
}});
dojox.dtl.tag.misc.FilterNode=function(B,A){this._varnode=B;
this._nodelist=A
};
dojo.extend(dojox.dtl.tag.misc.FilterNode,{render:function(C,D){var A=this._nodelist.render(C,new dojox.string.Builder());
C.update({"var":A.toString()});
var B=this._varnode.render(C,D);
C.pop();
return D
},unrender:function(A,B){return B
},clone:function(A){return new this.constructor(this._expression,this._nodelist.clone(A))
}});
dojox.dtl.tag.misc.comment=function(A,B){A.skipPast("endcomment");
return dojox.dtl.tag.misc.commentNode
};
dojox.dtl.tag.misc.debug=function(A,B){return new dojox.dtl.tag.misc.DebugNode(A.getTextNode())
};
dojox.dtl.tag.misc.filter=function(D,C){var B=C.split(" ",2);
var E=new (D.getVarNode())("var|"+B[1]);
var A=D.parse(["endfilter"]);
D.next();
return new dojox.dtl.tag.misc.FilterNode(E,A)
}
};