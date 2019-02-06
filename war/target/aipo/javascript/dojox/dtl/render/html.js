if(!dojo._hasResource["dojox.dtl.render.html"]){dojo._hasResource["dojox.dtl.render.html"]=true;
dojo.provide("dojox.dtl.render.html");
dojox.dtl.render.html.sensitivity={NODE:1,ATTRIBUTE:2,TEXT:3};
dojox.dtl.render.html.Render=function(A,B){this._tpl=B;
this._node=A;
this._swap=dojo.hitch(this,function(){if(this._node===this._tpl.getRootNode()){var C=this._node;
this._node=this._node.cloneNode(true);
C.parentNode.replaceChild(this._node,C)
}})
};
dojo.extend(dojox.dtl.render.html.Render,{sensitivity:dojox.dtl.render.html.sensitivity,setAttachPoint:function(A){this._node=A
},render:function(C,E,B){if(!this._node){throw new Error("You cannot use the Render object without specifying where you want to render it")
}B=B||C.getBuffer();
if(E.getThis()&&E.getThis().buffer==this.sensitivity.NODE){var A=dojo.connect(B,"onAddNode",this,"_swap");
var D=dojo.connect(B,"onRemoveNode",this,"_swap")
}if(this._tpl&&this._tpl!==C){this._tpl.unrender(E,B)
}this._tpl=C;
var F=C.render(E,B).getParent();
dojo.disconnect(A);
dojo.disconnect(D);
if(this._node!==F){this._node.parentNode.replaceChild(F,this._node);
dojo._destroyElement(this._node);
this._node=F
}}})
};