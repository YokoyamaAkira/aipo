if(!dojo._hasResource["dojox.wire.ml.DataStore"]){dojo._hasResource["dojox.wire.ml.DataStore"]=true;
dojo.provide("dojox.wire.ml.DataStore");
dojo.require("dijit._Widget");
dojo.require("dojox.wire._base");
dojo.declare("dojox.wire.ml.DataStore",dijit._Widget,{storeClass:"",postCreate:function(){this.store=this._createStore()
},_createStore:function(){if(!this.storeClass){return null
}var E=dojox.wire._getClass(this.storeClass);
if(!E){return null
}var C={};
var B=this.domNode.attributes;
for(var D=0;
D<B.length;
D++){var A=B.item(D);
if(A.specified&&!this[A.nodeName]){C[A.nodeName]=A.nodeValue
}}return new E(C)
},getFeatures:function(){return this.store.getFeatures()
},fetch:function(A){return this.store.fetch(A)
},save:function(A){this.store.save(A)
},newItem:function(A){return this.store.newItem(A)
},deleteItem:function(A){return this.store.deleteItem(A)
},revert:function(){return this.store.revert()
}})
};