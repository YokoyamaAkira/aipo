if(!dojo._hasResource["dojox.widget.Iterator"]){dojo._hasResource["dojox.widget.Iterator"]=true;
dojo.provide("dojox.widget.Iterator");
dojo.require("dijit.Declaration");
dojo.experimental("dojox.widget.Iterator");
dojo.declare("dojox.widget.Iterator",[dijit.Declaration],{constructor:(function(){var A=0;
return function(){this.attrs=[];
this.children=[];
this.widgetClass="dojox.widget.Iterator._classes._"+(A++)
}
})(),start:0,fetchMax:1000,query:{name:"*"},attrs:[],defaultValue:"",widgetCtor:null,dataValues:[],data:null,store:null,_srcIndex:0,_srcParent:null,_setSrcIndex:function(A){this._srcIndex=0;
this._srcParent=A.parentNode;
var B=A;
while(B.previousSibling){this._srcIndex++;
B=B.previousSibling
}},postscript:function(C,A){this._setSrcIndex(A);
this.inherited("postscript",arguments);
var B=this.widgetCtor=dojo.getObject(this.widgetClass);
this.attrs=dojo.map(B.prototype.templateString.match(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g),function(D){return D.slice(2,-1)
});
dojo.forEach(this.attrs,function(D){B.prototype[D]=""
});
this.update()
},clear:function(){if(this.children.length){this._setSrcIndex(this.children[0].domNode)
}dojo.forEach(this.children,"item.destroy();");
this.children=[]
},update:function(){if(this.store){this.fetch()
}else{this.onDataAvailable(this.data||this.dataValues)
}},_addItem:function(B,A){if(dojo.isString(B)){B={value:B}
}var C=new this.widgetCtor(B);
this.children.push(C);
dojo.place(C.domNode,this._srcParent,this._srcIndex+A)
},getAttrValuesObj:function(A){var B={};
if(dojo.isString(A)){dojo.forEach(this.attrs,function(C){B[C]=(C=="value")?A:this.defaultValue
},this)
}else{dojo.forEach(this.attrs,function(C){if(this.store){B[C]=this.store.getValue(A,C)||this.defaultValue
}else{B[C]=A[C]||this.defaultValue
}},this)
}return B
},onDataAvailable:function(A){this.clear();
dojo.forEach(A,function(C,B){this._addItem(this.getAttrValuesObj(C),B)
},this)
},fetch:function(B,C,A){this.store.fetch({query:B||this.query,start:C||this.start,count:A||this.fetchMax,onComplete:dojo.hitch(this,"onDataAvailable"),})
}});
dojox.widget.Iterator._classes={}
};