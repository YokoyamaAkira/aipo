dojo._xdResourceLoaded({depends:[["provide","dojox.widget.Iterator"],["require","dijit.Declaration"]],defineResource:function(A){if(!A._hasResource["dojox.widget.Iterator"]){A._hasResource["dojox.widget.Iterator"]=true;
A.provide("dojox.widget.Iterator");
A.require("dijit.Declaration");
A.experimental("dojox.widget.Iterator");
A.declare("dojox.widget.Iterator",[dijit.Declaration],{constructor:(function(){var B=0;
return function(){this.attrs=[];
this.children=[];
this.widgetClass="dojox.widget.Iterator._classes._"+(B++)
}
})(),start:0,fetchMax:1000,query:{name:"*"},attrs:[],defaultValue:"",widgetCtor:null,dataValues:[],data:null,store:null,_srcIndex:0,_srcParent:null,_setSrcIndex:function(C){this._srcIndex=0;
this._srcParent=C.parentNode;
var B=C;
while(B.previousSibling){this._srcIndex++;
B=B.previousSibling
}},postscript:function(B,C){this._setSrcIndex(C);
this.inherited("postscript",arguments);
var D=this.widgetCtor=A.getObject(this.widgetClass);
this.attrs=A.map(D.prototype.templateString.match(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g),function(E){return E.slice(2,-1)
});
A.forEach(this.attrs,function(E){D.prototype[E]=""
});
this.update()
},clear:function(){if(this.children.length){this._setSrcIndex(this.children[0].domNode)
}A.forEach(this.children,"item.destroy();");
this.children=[]
},update:function(){if(this.store){this.fetch()
}else{this.onDataAvailable(this.data||this.dataValues)
}},_addItem:function(D,C){if(A.isString(D)){D={value:D}
}var B=new this.widgetCtor(D);
this.children.push(B);
A.place(B.domNode,this._srcParent,this._srcIndex+C)
},getAttrValuesObj:function(C){var B={};
if(A.isString(C)){A.forEach(this.attrs,function(D){B[D]=(D=="value")?C:this.defaultValue
},this)
}else{A.forEach(this.attrs,function(D){if(this.store){B[D]=this.store.getValue(C,D)||this.defaultValue
}else{B[D]=C[D]||this.defaultValue
}},this)
}return B
},onDataAvailable:function(B){this.clear();
A.forEach(B,function(D,C){this._addItem(this.getAttrValuesObj(D),C)
},this)
},fetch:function(D,B,C){this.store.fetch({query:D||this.query,start:B||this.start,count:C||this.fetchMax,onComplete:A.hitch(this,"onDataAvailable"),})
}});
dojox.widget.Iterator._classes={}
}}});