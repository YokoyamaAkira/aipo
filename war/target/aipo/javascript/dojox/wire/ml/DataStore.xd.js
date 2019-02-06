dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.DataStore"],["require","dijit._Widget"],["require","dojox.wire._base"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.DataStore"]){A._hasResource["dojox.wire.ml.DataStore"]=true;
A.provide("dojox.wire.ml.DataStore");
A.require("dijit._Widget");
A.require("dojox.wire._base");
A.declare("dojox.wire.ml.DataStore",dijit._Widget,{storeClass:"",postCreate:function(){this.store=this._createStore()
},_createStore:function(){if(!this.storeClass){return null
}var B=dojox.wire._getClass(this.storeClass);
if(!B){return null
}var E={};
var D=this.domNode.attributes;
for(var F=0;
F<D.length;
F++){var C=D.item(F);
if(C.specified&&!this[C.nodeName]){E[C.nodeName]=C.nodeValue
}}return new B(E)
},getFeatures:function(){return this.store.getFeatures()
},fetch:function(B){return this.store.fetch(B)
},save:function(B){this.store.save(B)
},newItem:function(B){return this.store.newItem(B)
},deleteItem:function(B){return this.store.deleteItem(B)
},revert:function(){return this.store.revert()
}})
}}});