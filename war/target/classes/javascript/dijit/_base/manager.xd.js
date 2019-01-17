dojo._xdResourceLoaded({depends:[["provide","dijit._base.manager"]],defineResource:function(A){if(!A._hasResource["dijit._base.manager"]){A._hasResource["dijit._base.manager"]=true;
A.provide("dijit._base.manager");
A.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(B){if(this._hash[B.id]){throw new Error("Tried to register widget with id=="+B.id+" but that id is already registered")
}this._hash[B.id]=B
},remove:function(B){delete this._hash[B]
},forEach:function(B){for(var C in this._hash){B(this._hash[C])
}},filter:function(C){var B=new dijit.WidgetSet();
this.forEach(function(D){if(C(D)){B.add(D)
}});
return B
},byId:function(B){return this._hash[B]
},byClass:function(B){return this.filter(function(C){return C.declaredClass==B
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(B){var C;
do{C=B+"_"+(dijit._widgetTypeCtr[B]!==undefined?++dijit._widgetTypeCtr[B]:dijit._widgetTypeCtr[B]=0)
}while(dijit.byId(C));
return C
};
if(A.isIE){A.addOnUnload(function(){dijit.registry.forEach(function(B){B.destroy()
})
})
}dijit.byId=function(B){return(A.isString(B))?dijit.registry.byId(B):B
};
dijit.byNode=function(B){return dijit.registry.byId(B.getAttribute("widgetId"))
};
dijit.getEnclosingWidget=function(B){while(B){if(B.getAttribute&&B.getAttribute("widgetId")){return dijit.registry.byId(B.getAttribute("widgetId"))
}B=B.parentNode
}return null
}
}}});