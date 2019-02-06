dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.render.html"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.render.html"]){A._hasResource["dojox.dtl.render.html"]=true;
A.provide("dojox.dtl.render.html");
dojox.dtl.render.html.sensitivity={NODE:1,ATTRIBUTE:2,TEXT:3};
dojox.dtl.render.html.Render=function(C,B){this._tpl=B;
this._node=C;
this._swap=A.hitch(this,function(){if(this._node===this._tpl.getRootNode()){var D=this._node;
this._node=this._node.cloneNode(true);
D.parentNode.replaceChild(this._node,D)
}})
};
A.extend(dojox.dtl.render.html.Render,{sensitivity:dojox.dtl.render.html.sensitivity,setAttachPoint:function(B){this._node=B
},render:function(E,G,D){if(!this._node){throw new Error("You cannot use the Render object without specifying where you want to render it")
}D=D||E.getBuffer();
if(G.getThis()&&G.getThis().buffer==this.sensitivity.NODE){var C=A.connect(D,"onAddNode",this,"_swap");
var F=A.connect(D,"onRemoveNode",this,"_swap")
}if(this._tpl&&this._tpl!==E){this._tpl.unrender(G,D)
}this._tpl=E;
var B=E.render(G,D).getParent();
A.disconnect(C);
A.disconnect(F);
if(this._node!==B){this._node.parentNode.replaceChild(B,this._node);
A._destroyElement(this._node);
this._node=B
}}})
}}});