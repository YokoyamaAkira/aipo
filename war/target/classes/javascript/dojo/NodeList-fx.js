if(!dojo._hasResource["dojo.NodeList-fx"]){dojo._hasResource["dojo.NodeList-fx"]=true;
dojo.provide("dojo.NodeList-fx");
dojo.require("dojo.fx");
dojo.extend(dojo.NodeList,{_anim:function(B,C,A){var D=[];
A=A||{};
this.forEach(function(E){var F={node:E};
dojo.mixin(F,A);
D.push(B[C](F))
});
return dojo.fx.combine(D)
},wipeIn:function(A){return this._anim(dojo.fx,"wipeIn",A)
},wipeOut:function(A){return this._anim(dojo.fx,"wipeOut",A)
},slideTo:function(A){return this._anim(dojo.fx,"slideTo",A)
},fadeIn:function(A){return this._anim(dojo,"fadeIn",A)
},fadeOut:function(A){return this._anim(dojo,"fadeOut",A)
},animateProperty:function(A){return this._anim(dojo,"animateProperty",A)
}})
};