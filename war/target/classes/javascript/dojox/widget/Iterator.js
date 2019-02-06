if(!dojo._hasResource["dojox.widget.Iterator"]){dojo._hasResource["dojox.widget.Iterator"]=true;
dojo.provide("dojox.widget.Iterator");
dojo.require("dijit.Declaration");
dojo.experimental("dojox.widget.Iterator");
dojo.declare("dojox.widget.Iterator",[dijit.Declaration],{constructor:(function(){var A=0;
return function(){this.attrs=[];
this.children=[];
this.widgetClass="dojox.widget.Iterator._classes._"+(A++)
}
})(),start:0,fetchMax:1000,query:{name:"*"},attrs:[],defaultValue:"",widgetCtor:null,dataValues:[],data:null,store:null,_srcIndex:0,_srcParent:null,_setSrcIndex:function(B){this._srcIndex=0;
this._srcParent=B.parentNode;
var A=B;
while(A.previousSibling){this._srcIndex++;
A=A.previousSibling
}},postscript:function(B,C){this._setSrcIndex(C);
this.inherited("postscript",arguments);
var A=this.widgetCtor=dojo.getObject(this.widgetClass);
this.attrs=dojo.map(A.prototype.templateString.match(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g),function(D){return D.slice(2,-1)
});
dojo.forEach(this.attrs,function(D){A.prototype[D]=""
});
this.update()
},clear:function(){if(this.children.length){this._setSrcIndex(this.children[0].domNode)
}dojo.forEach(this.children,"item.destroy();");
this.children=[]
},update:function(){if(this.store){this.fetch()
}else{this.onDataAvailable(this.data||this.dataValues)
}},_addItem:function(A,C){if(dojo.isString(A)){A={value:A}
}var B=new this.widgetCtor(A);
this.children.push(B);
dojo.place(B.domNode,this._srcParent,this._srcIndex+C)
},getAttrValuesObj:function(B){var A={};
if(dojo.isString(B)){dojo.forEach(this.attrs,function(C){A[C]=(C=="value")?B:this.defaultValue
},this)
}else{dojo.forEach(this.attrs,function(C){if(this.store){A[C]=this.store.getValue(B,C)||this.defaultValue
}else{A[C]=B[C]||this.defaultValue
}},this)
}return A
},onDataAvailable:function(A){this.clear();
dojo.forEach(A,function(B,C){this._addItem(this.getAttrValuesObj(B),C)
},this)
},fetch:function(A,B,C){this.store.fetch({query:A||this.query,start:B||this.start,count:C||this.fetchMax,onComplete:dojo.hitch(this,"onDataAvailable"),})
}});
dojox.widget.Iterator._classes={}
};