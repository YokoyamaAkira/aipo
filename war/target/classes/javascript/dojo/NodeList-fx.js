if(!dojo._hasResource["dojo.NodeList-fx"]){dojo._hasResource["dojo.NodeList-fx"]=true;
dojo.provide("dojo.NodeList-fx");
dojo.require("dojo.fx");
dojo.extend(dojo.NodeList,{_anim:function(C,D,B){var A=[];
B=B||{};
this.forEach(function(F){var E={node:F};
dojo.mixin(E,B);
A.push(C[D](E))
});
return dojo.fx.combine(A)
},wipeIn:function(A){return this._anim(dojo.fx,"wipeIn",A)
},wipeOut:function(A){return this._anim(dojo.fx,"wipeOut",A)
},slideTo:function(A){return this._anim(dojo.fx,"slideTo",A)
},fadeIn:function(A){return this._anim(dojo,"fadeIn",A)
},fadeOut:function(A){return this._anim(dojo,"fadeOut",A)
},animateProperty:function(A){return this._anim(dojo,"animateProperty",A)
}})
};