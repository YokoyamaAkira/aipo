dojo._xdResourceLoaded({depends:[["provide","dijit._editor.plugins.FontChoice"],["require","dijit._editor._Plugin"],["require","dijit.form.FilteringSelect"],["require","dojo.data.ItemFileReadStore"],["require","dojo.i18n"],["requireLocalization","dijit._editor","FontChoice",null,"ROOT","ROOT"]],defineResource:function(A){if(!A._hasResource["dijit._editor.plugins.FontChoice"]){A._hasResource["dijit._editor.plugins.FontChoice"]=true;
A.provide("dijit._editor.plugins.FontChoice");
A.require("dijit._editor._Plugin");
A.require("dijit.form.FilteringSelect");
A.require("dojo.data.ItemFileReadStore");
A.require("dojo.i18n");
A.declare("dijit._editor.plugins.FontChoice",dijit._editor._Plugin,{_uniqueId:0,buttonClass:dijit.form.FilteringSelect,_initButton:function(){this.inherited("_initButton",arguments);
var B={fontName:["serif","sans-serif","monospaced","cursive","fantasy"],fontSize:[1,2,3,4,5,6,7],formatBlock:["p","h1","h2","h3","pre"]}[this.command];
var C=A.i18n.getLocalization("dijit._editor","FontChoice");
var D=A.map(B,function(E){return{name:C[E],value:E}
});
D.push({name:"",value:""});
this.button.store=new A.data.ItemFileReadStore({data:{identifier:"value",items:D}});
this.button.setValue("");
A.connect(this.button,"onChange",this,function(E){this.editor.execCommand(this.command,E)
})
},updateState:function(){this.inherited("updateState",arguments);
var C=this.editor;
var D=this.command;
if(!C||!C.isLoaded||!D.length){return 
}if(this.button){var B=C.queryCommandValue(D);
this.button.setValue(B)
}},setToolbar:function(){this.inherited("setToolbar",arguments);
var B=this.button;
if(!B.id){B.id="dijitEditorButton-"+this.command+(this._uniqueId++)
}var D=A.doc.createElement("label");
D.setAttribute("for",B.id);
var C=A.i18n.getLocalization("dijit._editor","FontChoice");
D.appendChild(A.doc.createTextNode(C[this.command]));
A.place(D,this.button.domNode,"before")
}})
}}});