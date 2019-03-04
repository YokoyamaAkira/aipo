if(!dojo._hasResource["dojox.grid._grid.edit"]){dojo._hasResource["dojox.grid._grid.edit"]=true;
dojo.provide("dojox.grid._grid.edit");
dojo.declare("dojox.grid.edit",null,{constructor:function(A){this.grid=A;
this.connections=[];
if(dojo.isIE){this.connections.push(dojo.connect(document.body,"onfocus",dojo.hitch(this,"_boomerangFocus")))
}},info:{},destroy:function(){dojo.forEach(this.connections,function(A){dojo.disconnect(A)
})
},cellFocus:function(A,B){if(this.grid.singleClickEdit||this.isEditRow(B)){this.setEditCell(A,B)
}else{this.apply()
}if(this.isEditing()||(A&&(A.editor||0).alwaysOn)){this._focusEditor(A,B)
}},rowClick:function(A){if(this.isEditing()&&!this.isEditRow(A.rowIndex)){this.apply()
}},styleRow:function(A){if(A.index==this.info.rowIndex){A.customClasses+=" dojoxGrid-row-editing"
}},dispatchEvent:function(B){var C=B.cell,A=C&&C.editor;
return A&&A.dispatchEvent(B.dispatch,B)
},isEditing:function(){return this.info.rowIndex!==undefined
},isEditCell:function(B,A){return(this.info.rowIndex===B)&&(this.info.cell.index==A)
},isEditRow:function(A){return this.info.rowIndex===A
},setEditCell:function(A,B){if(!this.isEditCell(B,A.index)){this.start(A,B,this.isEditRow(B)||A.editor)
}},_focusEditor:function(A,B){dojox.grid.fire(A.editor,"focus",[B])
},focusEditor:function(){if(this.isEditing()){this._focusEditor(this.info.cell,this.info.rowIndex)
}},_boomerangWindow:500,_shouldCatchBoomerang:function(){return this._catchBoomerang>new Date().getTime()
},_boomerangFocus:function(){if(this._shouldCatchBoomerang()){this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0
}},_doCatchBoomerang:function(){if(dojo.isIE){this._catchBoomerang=new Date().getTime()+this._boomerangWindow
}},start:function(A,C,B){this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(C)){this.applyRowEdit();
this.grid.updateRow(C)
}if(B){this.info={cell:A,rowIndex:C};
this.grid.doStartEdit(A,C);
this.grid.updateRow(C)
}else{this.info={}
}this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(A,C);
this._doCatchBoomerang()
},_editorDo:function(A){var B=this.info.cell;
B&&B.editor&&B.editor[A](this.info.rowIndex)
},editorApply:function(){this._editorDo("apply")
},editorCancel:function(){this._editorDo("cancel")
},applyCellEdit:function(A,B,C){this.grid.doApplyCellEdit(A,C,B.fieldIndex)
},applyRowEdit:function(){this.grid.doApplyEdit(this.info.rowIndex)
},apply:function(){if(this.isEditing()){this.grid.beginUpdate();
this.editorApply();
this.applyRowEdit();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang()
}},cancel:function(){if(this.isEditing()){this.grid.beginUpdate();
this.editorCancel();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang()
}},save:function(B,A){var C=this.info.cell;
if(this.isEditRow(B)&&(!A||C.view==A)&&C.editor){C.editor.save(C,this.info.rowIndex)
}},restore:function(A,B){var C=this.info.cell;
if(this.isEditRow(B)&&C.view==A&&C.editor){C.editor.restore(C,this.info.rowIndex)
}}})
};