dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.misc"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.misc"]){A._hasResource["dojox.dtl.tag.misc"]=true;
A.provide("dojox.dtl.tag.misc");
A.require("dojox.dtl._base");
dojox.dtl.tag.misc.commentNode=new function(){this.render=this.unrender=function(C,B){return B
};
this.clone=function(){return this
};
this.toString=function(){return"dojox.dtl.tag.misc.CommentNode"
}
};
dojox.dtl.tag.misc.DebugNode=function(B){this._TextNode=B
};
A.extend(dojox.dtl.tag.misc.DebugNode,{render:function(F,B){var G=F.getKeys();
var C="";
for(var E=0,D;
D=G[E];
E++){console.debug("DEBUG",D,":",F[D]);
C+=D+": "+A.toJson(F[D])+"\n\n"
}return new this._TextNode(C).render(F,B,this)
},unrender:function(C,B){return B
},clone:function(B){return new this.constructor(this._TextNode)
},toString:function(){return"dojox.dtl.tag.misc.DebugNode"
}});
dojox.dtl.tag.misc.FilterNode=function(B,C){this._varnode=B;
this._nodelist=C
};
A.extend(dojox.dtl.tag.misc.FilterNode,{render:function(E,B){var C=this._nodelist.render(E,new dojox.string.Builder());
E.update({"var":C.toString()});
var D=this._varnode.render(E,B);
E.pop();
return B
},unrender:function(C,B){return B
},clone:function(B){return new this.constructor(this._expression,this._nodelist.clone(B))
}});
dojox.dtl.tag.misc.comment=function(C,B){C.skipPast("endcomment");
return dojox.dtl.tag.misc.commentNode
};
dojox.dtl.tag.misc.debug=function(C,B){return new dojox.dtl.tag.misc.DebugNode(C.getTextNode())
};
dojox.dtl.tag.misc.filter=function(F,E){var D=E.split(" ",2);
var B=new (F.getVarNode())("var|"+D[1]);
var C=F.parse(["endfilter"]);
F.next();
return new dojox.dtl.tag.misc.FilterNode(B,C)
}
}}});