if(!dojo._hasResource["dojox.dtl.render.html"]){dojo._hasResource["dojox.dtl.render.html"]=true;
dojo.provide("dojox.dtl.render.html");
dojox.dtl.render.html.sensitivity={NODE:1,ATTRIBUTE:2,TEXT:3};
dojox.dtl.render.html.Render=function(B,A){this._tpl=A;
this._node=B;
this._swap=dojo.hitch(this,function(){if(this._node===this._tpl.getRootNode()){var C=this._node;
this._node=this._node.cloneNode(true);
C.parentNode.replaceChild(this._node,C)
}})
};
dojo.extend(dojox.dtl.render.html.Render,{sensitivity:dojox.dtl.render.html.sensitivity,setAttachPoint:function(A){this._node=A
},render:function(B,D,A){if(!this._node){throw new Error("You cannot use the Render object without specifying where you want to render it")
}A=A||B.getBuffer();
if(D.getThis()&&D.getThis().buffer==this.sensitivity.NODE){var F=dojo.connect(A,"onAddNode",this,"_swap");
var C=dojo.connect(A,"onRemoveNode",this,"_swap")
}if(this._tpl&&this._tpl!==B){this._tpl.unrender(D,A)
}this._tpl=B;
var E=B.render(D,A).getParent();
dojo.disconnect(F);
dojo.disconnect(C);
if(this._node!==E){this._node.parentNode.replaceChild(E,this._node);
dojo._destroyElement(this._node);
this._node=E
}}})
};