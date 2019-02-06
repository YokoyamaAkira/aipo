dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.dijitEditors"],["require","dojox.grid._data.editors"],["require","dijit.form.DateTextBox"],["require","dijit.form.TimeTextBox"],["require","dijit.form.ComboBox"],["require","dijit.form.CheckBox"],["require","dijit.form.TextBox"],["require","dijit.form.NumberSpinner"],["require","dijit.form.NumberTextBox"],["require","dijit.form.CurrencyTextBox"],["require","dijit.form.Slider"],["require","dijit.Editor"]],defineResource:function(A){if(!A._hasResource["dojox.grid._data.dijitEditors"]){A._hasResource["dojox.grid._data.dijitEditors"]=true;
A.provide("dojox.grid._data.dijitEditors");
A.require("dojox.grid._data.editors");
A.require("dijit.form.DateTextBox");
A.require("dijit.form.TimeTextBox");
A.require("dijit.form.ComboBox");
A.require("dijit.form.CheckBox");
A.require("dijit.form.TextBox");
A.require("dijit.form.NumberSpinner");
A.require("dijit.form.NumberTextBox");
A.require("dijit.form.CurrencyTextBox");
A.require("dijit.form.Slider");
A.require("dijit.Editor");
A.declare("dojox.grid.editors.Dijit",dojox.grid.editors.base,{editorClass:"dijit.form.TextBox",constructor:function(B){this.editor=null;
this.editorClass=A.getObject(this.cell.editorClass||this.editorClass)
},format:function(B,C){this.needFormatNode(B,C);
return"<div></div>"
},getValue:function(B){return this.editor.getValue()
},setValue:function(B,C){if(this.editor&&this.editor.setValue){this.editor.setValue(C)
}else{this.inherited(arguments)
}},getEditorProps:function(B){return A.mixin({},this.cell.editorProps||{},{constraints:A.mixin({},this.cell.constraint)||{},value:B})
},createEditor:function(B,D,C){return new this.editorClass(this.getEditorProps(D),B)
},attachEditor:function(B,D,C){B.appendChild(this.editor.domNode);
this.setValue(C,D)
},formatNode:function(B,D,C){if(!this.editorClass){return D
}if(!this.editor){this.editor=this.createEditor.apply(this,arguments)
}else{this.attachEditor.apply(this,arguments)
}this.sizeEditor.apply(this,arguments);
this.cell.grid.rowHeightChanged(C);
this.focus()
},sizeEditor:function(B,F,E){var D=this.cell.getNode(E),C=A.contentBox(D);
A.marginBox(this.editor.domNode,{w:C.w})
},focus:function(C,B){if(this.editor){setTimeout(A.hitch(this.editor,function(){dojox.grid.fire(this,"focus")
}),0)
}},_finish:function(B){this.inherited(arguments);
dojox.grid.removeNode(this.editor.domNode)
}});
A.declare("dojox.grid.editors.ComboBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.ComboBox",getEditorProps:function(B){var D=[];
A.forEach(this.cell.options,function(E){D.push({name:E,value:E})
});
var C=new A.data.ItemFileReadStore({data:{identifier:"name",items:D}});
return A.mixin({},this.cell.editorProps||{},{value:B,store:C})
},getValue:function(){var B=this.editor;
B.setDisplayedValue(B.getDisplayedValue());
return B.getValue()
}});
A.declare("dojox.grid.editors.DateTextBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.DateTextBox",setValue:function(B,C){if(this.editor){this.editor.setValue(new Date(C))
}else{this.inherited(arguments)
}},getEditorProps:function(B){return A.mixin(this.inherited(arguments),{value:new Date(B)})
}});
A.declare("dojox.grid.editors.CheckBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.CheckBox",getValue:function(){return this.editor.checked
}});
A.declare("dojox.grid.editors.Editor",dojox.grid.editors.Dijit,{editorClass:"dijit.Editor",getEditorProps:function(B){return A.mixin({},this.cell.editorProps||{},{height:this.cell.editorHeight||"100px"})
},createEditor:function(B,E,D){var C=new this.editorClass(this.getEditorProps(E),B);
C.setValue(E);
return C
},formatNode:function(B,E,D){this.inherited(arguments);
var C=this.editor;
C.open();
if(this.cell.editorToolbar){A.place(C.toolbar.domNode,C.editingArea,"before")
}}})
}}});