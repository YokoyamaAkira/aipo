dojo._xdResourceLoaded({depends:[["provide","dijit._editor.plugins.FontChoice"],["require","dijit._editor._Plugin"],["require","dijit.form.FilteringSelect"],["require","dojo.data.ItemFileReadStore"],["require","dojo.i18n"],["requireLocalization","dijit._editor","FontChoice",null,"ROOT","ROOT"]],defineResource:function(A){if(!A._hasResource["dijit._editor.plugins.FontChoice"]){A._hasResource["dijit._editor.plugins.FontChoice"]=true;
A.provide("dijit._editor.plugins.FontChoice");
A.require("dijit._editor._Plugin");
A.require("dijit.form.FilteringSelect");
A.require("dojo.data.ItemFileReadStore");
A.require("dojo.i18n");
A.declare("dijit._editor.plugins.FontChoice",dijit._editor._Plugin,{_uniqueId:0,buttonClass:dijit.form.FilteringSelect,_initButton:function(){this.inherited("_initButton",arguments);
var D={fontName:["serif","sans-serif","monospaced","cursive","fantasy"],fontSize:[1,2,3,4,5,6,7],formatBlock:["p","h1","h2","h3","pre"]}[this.command];
var B=A.i18n.getLocalization("dijit._editor","FontChoice");
var C=A.map(D,function(E){return{name:B[E],value:E}
});
C.push({name:"",value:""});
this.button.store=new A.data.ItemFileReadStore({data:{identifier:"value",items:C}});
this.button.setValue("");
A.connect(this.button,"onChange",this,function(E){this.editor.execCommand(this.command,E)
})
},updateState:function(){this.inherited("updateState",arguments);
var B=this.editor;
var C=this.command;
if(!B||!B.isLoaded||!C.length){return 
}if(this.button){var D=B.queryCommandValue(C);
this.button.setValue(D)
}},setToolbar:function(){this.inherited("setToolbar",arguments);
var D=this.button;
if(!D.id){D.id="dijitEditorButton-"+this.command+(this._uniqueId++)
}var C=A.doc.createElement("label");
C.setAttribute("for",D.id);
var B=A.i18n.getLocalization("dijit._editor","FontChoice");
C.appendChild(A.doc.createTextNode(B[this.command]));
A.place(C,this.button.domNode,"before")
}})
}}});