dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.misc"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.misc"]){A._hasResource["dojox.dtl.tag.misc"]=true;
A.provide("dojox.dtl.tag.misc");
A.require("dojox.dtl._base");
dojox.dtl.tag.misc.commentNode=new function(){this.render=this.unrender=function(B,C){return C
};
this.clone=function(){return this
};
this.toString=function(){return"dojox.dtl.tag.misc.CommentNode"
}
};
dojox.dtl.tag.misc.DebugNode=function(B){this._TextNode=B
};
A.extend(dojox.dtl.tag.misc.DebugNode,{render:function(G,C){var B=G.getKeys();
var D="";
for(var F=0,E;
E=B[F];
F++){console.debug("DEBUG",E,":",G[E]);
D+=E+": "+A.toJson(G[E])+"\n\n"
}return new this._TextNode(D).render(G,C,this)
},unrender:function(B,C){return C
},clone:function(B){return new this.constructor(this._TextNode)
},toString:function(){return"dojox.dtl.tag.misc.DebugNode"
}});
dojox.dtl.tag.misc.FilterNode=function(C,B){this._varnode=C;
this._nodelist=B
};
A.extend(dojox.dtl.tag.misc.FilterNode,{render:function(B,C){var D=this._nodelist.render(B,new dojox.string.Builder());
B.update({"var":D.toString()});
var E=this._varnode.render(B,C);
B.pop();
return C
},unrender:function(B,C){return C
},clone:function(B){return new this.constructor(this._expression,this._nodelist.clone(B))
}});
dojox.dtl.tag.misc.comment=function(B,C){B.skipPast("endcomment");
return dojox.dtl.tag.misc.commentNode
};
dojox.dtl.tag.misc.debug=function(B,C){return new dojox.dtl.tag.misc.DebugNode(B.getTextNode())
};
dojox.dtl.tag.misc.filter=function(B,F){var E=F.split(" ",2);
var C=new (B.getVarNode())("var|"+E[1]);
var D=B.parse(["endfilter"]);
B.next();
return new dojox.dtl.tag.misc.FilterNode(C,D)
}
}}});