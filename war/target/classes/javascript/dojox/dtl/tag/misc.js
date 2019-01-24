if(!dojo._hasResource["dojox.dtl.tag.misc"]){dojo._hasResource["dojox.dtl.tag.misc"]=true;
dojo.provide("dojox.dtl.tag.misc");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.misc.commentNode=new function(){this.render=this.unrender=function(B,A){return A
};
this.clone=function(){return this
};
this.toString=function(){return"dojox.dtl.tag.misc.CommentNode"
}
};
dojox.dtl.tag.misc.DebugNode=function(A){this._TextNode=A
};
dojo.extend(dojox.dtl.tag.misc.DebugNode,{render:function(E,A){var F=E.getKeys();
var B="";
for(var D=0,C;
C=F[D];
D++){console.debug("DEBUG",C,":",E[C]);
B+=C+": "+dojo.toJson(E[C])+"\n\n"
}return new this._TextNode(B).render(E,A,this)
},unrender:function(B,A){return A
},clone:function(A){return new this.constructor(this._TextNode)
},toString:function(){return"dojox.dtl.tag.misc.DebugNode"
}});
dojox.dtl.tag.misc.FilterNode=function(A,B){this._varnode=A;
this._nodelist=B
};
dojo.extend(dojox.dtl.tag.misc.FilterNode,{render:function(D,A){var B=this._nodelist.render(D,new dojox.string.Builder());
D.update({"var":B.toString()});
var C=this._varnode.render(D,A);
D.pop();
return A
},unrender:function(B,A){return A
},clone:function(A){return new this.constructor(this._expression,this._nodelist.clone(A))
}});
dojox.dtl.tag.misc.comment=function(B,A){B.skipPast("endcomment");
return dojox.dtl.tag.misc.commentNode
};
dojox.dtl.tag.misc.debug=function(B,A){return new dojox.dtl.tag.misc.DebugNode(B.getTextNode())
};
dojox.dtl.tag.misc.filter=function(E,D){var C=D.split(" ",2);
var A=new (E.getVarNode())("var|"+C[1]);
var B=E.parse(["endfilter"]);
E.next();
return new dojox.dtl.tag.misc.FilterNode(A,B)
}
};