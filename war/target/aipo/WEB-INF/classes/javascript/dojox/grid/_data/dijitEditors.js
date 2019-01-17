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
},format:function(B,A){this.needFormatNode(B,A);
return"<div></div>"
},getValue:function(A){return this.editor.getValue()
},setValue:function(B,A){if(this.editor&&this.editor.setValue){this.editor.setValue(A)
}else{this.inherited(arguments)
}},getEditorProps:function(A){return dojo.mixin({},this.cell.editorProps||{},{constraints:dojo.mixin({},this.cell.constraint)||{},value:A})
},createEditor:function(C,B,A){return new this.editorClass(this.getEditorProps(B),C)
},attachEditor:function(C,B,A){C.appendChild(this.editor.domNode);
this.setValue(A,B)
},formatNode:function(C,B,A){if(!this.editorClass){return B
}if(!this.editor){this.editor=this.createEditor.apply(this,arguments)
}else{this.attachEditor.apply(this,arguments)
}this.sizeEditor.apply(this,arguments);
this.cell.grid.rowHeightChanged(A);
this.focus()
},sizeEditor:function(E,D,C){var B=this.cell.getNode(C),A=dojo.contentBox(B);
dojo.marginBox(this.editor.domNode,{w:A.w})
},focus:function(A,B){if(this.editor){setTimeout(dojo.hitch(this.editor,function(){dojox.grid.fire(this,"focus")
}),0)
}},_finish:function(A){this.inherited(arguments);
dojox.grid.removeNode(this.editor.domNode)
}});
dojo.declare("dojox.grid.editors.ComboBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.ComboBox",getEditorProps:function(C){var B=[];
dojo.forEach(this.cell.options,function(D){B.push({name:D,value:D})
});
var A=new dojo.data.ItemFileReadStore({data:{identifier:"name",items:B}});
return dojo.mixin({},this.cell.editorProps||{},{value:C,store:A})
},getValue:function(){var A=this.editor;
A.setDisplayedValue(A.getDisplayedValue());
return A.getValue()
}});
dojo.declare("dojox.grid.editors.DateTextBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.DateTextBox",setValue:function(B,A){if(this.editor){this.editor.setValue(new Date(A))
}else{this.inherited(arguments)
}},getEditorProps:function(A){return dojo.mixin(this.inherited(arguments),{value:new Date(A)})
}});
dojo.declare("dojox.grid.editors.CheckBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.CheckBox",getValue:function(){return this.editor.checked
}});
dojo.declare("dojox.grid.editors.Editor",dojox.grid.editors.Dijit,{editorClass:"dijit.Editor",getEditorProps:function(A){return dojo.mixin({},this.cell.editorProps||{},{height:this.cell.editorHeight||"100px"})
},createEditor:function(D,C,B){var A=new this.editorClass(this.getEditorProps(C),D);
A.setValue(C);
return A
},formatNode:function(D,C,B){this.inherited(arguments);
var A=this.editor;
A.open();
if(this.cell.editorToolbar){dojo.place(A.toolbar.domNode,A.editingArea,"before")
}}})
};