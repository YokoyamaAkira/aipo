dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.render.html"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.render.html"]){A._hasResource["dojox.dtl.render.html"]=true;
A.provide("dojox.dtl.render.html");
dojox.dtl.render.html.sensitivity={NODE:1,ATTRIBUTE:2,TEXT:3};
dojox.dtl.render.html.Render=function(B,C){this._tpl=C;
this._node=B;
this._swap=A.hitch(this,function(){if(this._node===this._tpl.getRootNode()){var D=this._node;
this._node=this._node.cloneNode(true);
D.parentNode.replaceChild(this._node,D)
}})
};
A.extend(dojox.dtl.render.html.Render,{sensitivity:dojox.dtl.render.html.sensitivity,setAttachPoint:function(B){this._node=B
},render:function(D,F,C){if(!this._node){throw new Error("You cannot use the Render object without specifying where you want to render it")
}C=C||D.getBuffer();
if(F.getThis()&&F.getThis().buffer==this.sensitivity.NODE){var B=A.connect(C,"onAddNode",this,"_swap");
var E=A.connect(C,"onRemoveNode",this,"_swap")
}if(this._tpl&&this._tpl!==D){this._tpl.unrender(F,C)
}this._tpl=D;
var G=D.render(F,C).getParent();
A.disconnect(B);
A.disconnect(E);
if(this._node!==G){this._node.parentNode.replaceChild(G,this._node);
A._destroyElement(this._node);
this._node=G
}}})
}}});