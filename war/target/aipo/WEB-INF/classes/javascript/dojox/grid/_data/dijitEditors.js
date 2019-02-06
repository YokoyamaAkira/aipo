if(!dojo._hasResource["dojox.grid._data.dijitEditors"]){dojo._hasResource["dojox.grid._data.dijitEditors"]=true;
dojo.provide("dojox.grid._data.dijitEditors");
dojo.require("dojox.grid._data.editors");
dojo.require("dijit.form.DateTextBox");
dojo.require("dijit.form.TimeTextBox");
dojo.require("dijit.form.ComboBox");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.NumberSpinner");
dojo.require("dijit.form.NumberTextBox");
dojo.require("dijit.form.CurrencyTextBox");
dojo.require("dijit.form.Slider");
dojo.require("dijit.Editor");
dojo.declare("dojox.grid.editors.Dijit",dojox.grid.editors.base,{editorClass:"dijit.form.TextBox",constructor:function(A){this.editor=null;
this.editorClass=dojo.getObject(this.cell.editorClass||this.editorClass)
},format:function(A,B){this.needFormatNode(A,B);
return"<div></div>"
},getValue:function(A){return this.editor.getValue()
},setValue:function(A,B){if(this.editor&&this.editor.setValue){this.editor.setValue(B)
}else{this.inherited(arguments)
}},getEditorProps:function(A){return dojo.mixin({},this.cell.editorProps||{},{constraints:dojo.mixin({},this.cell.constraint)||{},value:A})
},createEditor:function(B,A,C){return new this.editorClass(this.getEditorProps(A),B)
},attachEditor:function(B,A,C){B.appendChild(this.editor.domNode);
this.setValue(C,A)
},formatNode:function(B,A,C){if(!this.editorClass){return A
}if(!this.editor){this.editor=this.createEditor.apply(this,arguments)
}else{this.attachEditor.apply(this,arguments)
}this.sizeEditor.apply(this,arguments);
this.cell.grid.rowHeightChanged(C);
this.focus()
},sizeEditor:function(D,C,B){var A=this.cell.getNode(B),E=dojo.contentBox(A);
dojo.marginBox(this.editor.domNode,{w:E.w})
},focus:function(B,A){if(this.editor){setTimeout(dojo.hitch(this.editor,function(){dojox.grid.fire(this,"focus")
}),0)
}},_finish:function(A){this.inherited(arguments);
dojox.grid.removeNode(this.editor.domNode)
}});
dojo.declare("dojox.grid.editors.ComboBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.ComboBox",getEditorProps:function(B){var A=[];
dojo.forEach(this.cell.options,function(D){A.push({name:D,value:D})
});
var C=new dojo.data.ItemFileReadStore({data:{identifier:"name",items:A}});
return dojo.mixin({},this.cell.editorProps||{},{value:B,store:C})
},getValue:function(){var A=this.editor;
A.setDisplayedValue(A.getDisplayedValue());
return A.getValue()
}});
dojo.declare("dojox.grid.editors.DateTextBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.DateTextBox",setValue:function(A,B){if(this.editor){this.editor.setValue(new Date(B))
}else{this.inherited(arguments)
}},getEditorProps:function(A){return dojo.mixin(this.inherited(arguments),{value:new Date(A)})
}});
dojo.declare("dojox.grid.editors.CheckBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.CheckBox",getValue:function(){return this.editor.checked
}});
dojo.declare("dojox.grid.editors.Editor",dojox.grid.editors.Dijit,{editorClass:"dijit.Editor",getEditorProps:function(A){return dojo.mixin({},this.cell.editorProps||{},{height:this.cell.editorHeight||"100px"})
},createEditor:function(C,B,A){var D=new this.editorClass(this.getEditorProps(B),C);
D.setValue(B);
return D
},formatNode:function(C,B,A){this.inherited(arguments);
var D=this.editor;
D.open();
if(this.cell.editorToolbar){dojo.place(D.toolbar.domNode,D.editingArea,"before")
}}})
};