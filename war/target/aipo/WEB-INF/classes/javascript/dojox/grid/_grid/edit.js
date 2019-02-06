if(!dojo._hasResource["dojox.grid._grid.edit"]){dojo._hasResource["dojox.grid._grid.edit"]=true;
dojo.provide("dojox.grid._grid.edit");
dojo.declare("dojox.grid.edit",null,{constructor:function(A){this.grid=A;
this.connections=[];
if(dojo.isIE){this.connections.push(dojo.connect(document.body,"onfocus",dojo.hitch(this,"_boomerangFocus")))
}},info:{},destroy:function(){dojo.forEach(this.connections,function(A){dojo.disconnect(A)
})
},cellFocus:function(B,A){if(this.grid.singleClickEdit||this.isEditRow(A)){this.setEditCell(B,A)
}else{this.apply()
}if(this.isEditing()||(B&&(B.editor||0).alwaysOn)){this._focusEditor(B,A)
}},rowClick:function(A){if(this.isEditing()&&!this.isEditRow(A.rowIndex)){this.apply()
}},styleRow:function(A){if(A.index==this.info.rowIndex){A.customClasses+=" dojoxGrid-row-editing"
}},dispatchEvent:function(A){var B=A.cell,C=B&&B.editor;
return C&&C.dispatchEvent(A.dispatch,A)
},isEditing:function(){return this.info.rowIndex!==undefined
},isEditCell:function(A,B){return(this.info.rowIndex===A)&&(this.info.cell.index==B)
},isEditRow:function(A){return this.info.rowIndex===A
},setEditCell:function(B,A){if(!this.isEditCell(A,B.index)){this.start(B,A,this.isEditRow(A)||B.editor)
}},_focusEditor:function(B,A){dojox.grid.fire(B.editor,"focus",[A])
},focusEditor:function(){if(this.isEditing()){this._focusEditor(this.info.cell,this.info.rowIndex)
}},_boomerangWindow:500,_shouldCatchBoomerang:function(){return this._catchBoomerang>new Date().getTime()
},_boomerangFocus:function(){if(this._shouldCatchBoomerang()){this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0
}},_doCatchBoomerang:function(){if(dojo.isIE){this._catchBoomerang=new Date().getTime()+this._boomerangWindow
}},start:function(C,B,A){this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(B)){this.applyRowEdit();
this.grid.updateRow(B)
}if(A){this.info={cell:C,rowIndex:B};
this.grid.doStartEdit(C,B);
this.grid.updateRow(B)
}else{this.info={}
}this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(C,B);
this._doCatchBoomerang()
},_editorDo:function(B){var A=this.info.cell;
A&&A.editor&&A.editor[B](this.info.rowIndex)
},editorApply:function(){this._editorDo("apply")
},editorCancel:function(){this._editorDo("cancel")
},applyCellEdit:function(C,A,B){this.grid.doApplyCellEdit(C,B,A.fieldIndex)
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
}},save:function(A,C){var B=this.info.cell;
if(this.isEditRow(A)&&(!C||B.view==C)&&B.editor){B.editor.save(B,this.info.rowIndex)
}},restore:function(C,A){var B=this.info.cell;
if(this.isEditRow(A)&&B.view==C&&B.editor){B.editor.restore(B,this.info.rowIndex)
}}})
};