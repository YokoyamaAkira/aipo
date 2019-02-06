if(!dojo._hasResource["dojox.wire.ml.DataStore"]){dojo._hasResource["dojox.wire.ml.DataStore"]=true;
dojo.provide("dojox.wire.ml.DataStore");
dojo.require("dijit._Widget");
dojo.require("dojox.wire._base");
dojo.declare("dojox.wire.ml.DataStore",dijit._Widget,{storeClass:"",postCreate:function(){this.store=this._createStore()
},_createStore:function(){if(!this.storeClass){return null
}var A=dojox.wire._getClass(this.storeClass);
if(!A){return null
}var D={};
var C=this.domNode.attributes;
for(var E=0;
E<C.length;
E++){var B=C.item(E);
if(B.specified&&!this[B.nodeName]){D[B.nodeName]=B.nodeValue
}}return new A(D)
},getFeatures:function(){return this.store.getFeatures()
},fetch:function(A){return this.store.fetch(A)
},save:function(A){this.store.save(A)
},newItem:function(A){return this.store.newItem(A)
},deleteItem:function(A){return this.store.deleteItem(A)
},revert:function(){return this.store.revert()
}})
};