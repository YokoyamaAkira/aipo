if(!dojo._hasResource["dijit._editor.plugins.FontChoice"]){dojo._hasResource["dijit._editor.plugins.FontChoice"]=true;
dojo.provide("dijit._editor.plugins.FontChoice");
dojo.require("dijit._editor._Plugin");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit._editor","FontChoice",null,"ROOT");
dojo.declare("dijit._editor.plugins.FontChoice",dijit._editor._Plugin,{_uniqueId:0,buttonClass:dijit.form.FilteringSelect,_initButton:function(){this.inherited("_initButton",arguments);
var C={fontName:["serif","sans-serif","monospaced","cursive","fantasy"],fontSize:[1,2,3,4,5,6,7],formatBlock:["p","h1","h2","h3","pre"]}[this.command];
var A=dojo.i18n.getLocalization("dijit._editor","FontChoice");
var B=dojo.map(C,function(D){return{name:A[D],value:D}
});
B.push({name:"",value:""});
this.button.store=new dojo.data.ItemFileReadStore({data:{identifier:"value",items:B}});
this.button.setValue("");
dojo.connect(this.button,"onChange",this,function(D){this.editor.execCommand(this.command,D)
})
},updateState:function(){this.inherited("updateState",arguments);
var A=this.editor;
var B=this.command;
if(!A||!A.isLoaded||!B.length){return 
}if(this.button){var C=A.queryCommandValue(B);
this.button.setValue(C)
}},setToolbar:function(){this.inherited("setToolbar",arguments);
var C=this.button;
if(!C.id){C.id="dijitEditorButton-"+this.command+(this._uniqueId++)
}var B=dojo.doc.createElement("label");
B.setAttribute("for",C.id);
var A=dojo.i18n.getLocalization("dijit._editor","FontChoice");
B.appendChild(dojo.doc.createTextNode(A[this.command]));
dojo.place(B,this.button.domNode,"before")
}})
};