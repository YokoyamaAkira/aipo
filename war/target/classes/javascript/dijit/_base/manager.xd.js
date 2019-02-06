dojo._xdResourceLoaded({depends:[["provide","dijit._base.manager"]],defineResource:function(A){if(!A._hasResource["dijit._base.manager"]){A._hasResource["dijit._base.manager"]=true;
A.provide("dijit._base.manager");
A.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(B){if(this._hash[B.id]){throw new Error("Tried to register widget with id=="+B.id+" but that id is already registered")
}this._hash[B.id]=B
},remove:function(B){delete this._hash[B]
},forEach:function(C){for(var B in this._hash){C(this._hash[B])
}},filter:function(B){var C=new dijit.WidgetSet();
this.forEach(function(D){if(B(D)){C.add(D)
}});
return C
},byId:function(B){return this._hash[B]
},byClass:function(B){return this.filter(function(C){return C.declaredClass==B
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(C){var B;
do{B=C+"_"+(dijit._widgetTypeCtr[C]!==undefined?++dijit._widgetTypeCtr[C]:dijit._widgetTypeCtr[C]=0)
}while(dijit.byId(B));
return B
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