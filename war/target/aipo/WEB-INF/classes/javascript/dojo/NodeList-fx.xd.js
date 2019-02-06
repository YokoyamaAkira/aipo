dojo._xdResourceLoaded({depends:[["provide","dojo.NodeList-fx"],["require","dojo.fx"]],defineResource:function(A){if(!A._hasResource["dojo.NodeList-fx"]){A._hasResource["dojo.NodeList-fx"]=true;
A.provide("dojo.NodeList-fx");
A.require("dojo.fx");
A.extend(A.NodeList,{_anim:function(E,B,D){var C=[];
D=D||{};
this.forEach(function(G){var F={node:G};
A.mixin(F,D);
C.push(E[B](F))
});
return A.fx.combine(C)
},wipeIn:function(B){return this._anim(A.fx,"wipeIn",B)
},wipeOut:function(B){return this._anim(A.fx,"wipeOut",B)
},slideTo:function(B){return this._anim(A.fx,"slideTo",B)
},fadeIn:function(B){return this._anim(A,"fadeIn",B)
},fadeOut:function(B){return this._anim(A,"fadeOut",B)
},animateProperty:function(B){return this._anim(A,"animateProperty",B)
}})
}}});