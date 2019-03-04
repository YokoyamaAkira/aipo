dojo._xdResourceLoaded({depends:[["provide","dojox.widget.Iterator"],["require","dijit.Declaration"]],defineResource:function(A){if(!A._hasResource["dojox.widget.Iterator"]){A._hasResource["dojox.widget.Iterator"]=true;
A.provide("dojox.widget.Iterator");
A.require("dijit.Declaration");
A.experimental("dojox.widget.Iterator");
A.declare("dojox.widget.Iterator",[dijit.Declaration],{constructor:(function(){var B=0;
return function(){this.attrs=[];
this.children=[];
this.widgetClass="dojox.widget.Iterator._classes._"+(B++)
}
})(),start:0,fetchMax:1000,query:{name:"*"},attrs:[],defaultValue:"",widgetCtor:null,dataValues:[],data:null,store:null,_srcIndex:0,_srcParent:null,_setSrcIndex:function(B){this._srcIndex=0;
this._srcParent=B.parentNode;
var C=B;
while(C.previousSibling){this._srcIndex++;
C=C.previousSibling
}},postscript:function(D,B){this._setSrcIndex(B);
this.inherited("postscript",arguments);
var C=this.widgetCtor=A.getObject(this.widgetClass);
this.attrs=A.map(C.prototype.templateString.match(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g),function(E){return E.slice(2,-1)
});
A.forEach(this.attrs,function(E){C.prototype[E]=""
});
this.update()
},clear:function(){if(this.children.length){this._setSrcIndex(this.children[0].domNode)
}A.forEach(this.children,"item.destroy();");
this.children=[]
},update:function(){if(this.store){this.fetch()
}else{this.onDataAvailable(this.data||this.dataValues)
}},_addItem:function(C,B){if(A.isString(C)){C={value:C}
}var D=new this.widgetCtor(C);
this.children.push(D);
A.place(D.domNode,this._srcParent,this._srcIndex+B)
},getAttrValuesObj:function(B){var C={};
if(A.isString(B)){A.forEach(this.attrs,function(D){C[D]=(D=="value")?B:this.defaultValue
},this)
}else{A.forEach(this.attrs,function(D){if(this.store){C[D]=this.store.getValue(B,D)||this.defaultValue
}else{C[D]=B[D]||this.defaultValue
}},this)
}return C
},onDataAvailable:function(B){this.clear();
A.forEach(B,function(D,C){this._addItem(this.getAttrValuesObj(D),C)
},this)
},fetch:function(C,D,B){this.store.fetch({query:C||this.query,start:D||this.start,count:B||this.fetchMax,onComplete:A.hitch(this,"onDataAvailable"),})
}});
dojox.widget.Iterator._classes={}
}}});