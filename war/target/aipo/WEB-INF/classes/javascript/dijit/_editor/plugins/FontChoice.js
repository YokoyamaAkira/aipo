if(!dojo._hasResource["dijit._editor.plugins.FontChoice"]){dojo._hasResource["dijit._editor.plugins.FontChoice"]=true;
dojo.provide("dijit._editor.plugins.FontChoice");
dojo.require("dijit._editor._Plugin");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit._editor","FontChoice",null,"ROOT");
dojo.declare("dijit._editor.plugins.FontChoice",dijit._editor._Plugin,{_uniqueId:0,buttonClass:dijit.form.FilteringSelect,_initButton:function(){this.inherited("_initButton",arguments);
var B={fontName:["serif","sans-serif","monospaced","cursive","fantasy"],fontSize:[1,2,3,4,5,6,7],formatBlock:["p","h1","h2","h3","pre"]}[this.command];
var C=dojo.i18n.getLocalization("dijit._editor","FontChoice");
var A=dojo.map(B,function(D){return{name:C[D],value:D}
});
A.push({name:"",value:""});
this.button.store=new dojo.data.ItemFileReadStore({data:{identifier:"value",items:A}});
this.button.setValue("");
dojo.connect(this.button,"onChange",this,function(D){this.editor.execCommand(this.command,D)
})
},updateState:function(){this.inherited("updateState",arguments);
var C=this.editor;
var A=this.command;
if(!C||!C.isLoaded||!A.length){return 
}if(this.button){var B=C.queryCommandValue(A);
this.button.setValue(B)
}},setToolbar:function(){this.inherited("setToolbar",arguments);
var B=this.button;
if(!B.id){B.id="dijitEditorButton-"+this.command+(this._uniqueId++)
}var A=dojo.doc.createElement("label");
A.setAttribute("for",B.id);
var C=dojo.i18n.getLocalization("dijit._editor","FontChoice");
A.appendChild(dojo.doc.createTextNode(C[this.command]));
dojo.place(A,this.button.domNode,"before")
}})
};