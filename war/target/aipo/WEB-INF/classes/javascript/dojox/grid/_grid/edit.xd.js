dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.edit"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.edit"]){A._hasResource["dojox.grid._grid.edit"]=true;
A.provide("dojox.grid._grid.edit");
A.declare("dojox.grid.edit",null,{constructor:function(B){this.grid=B;
this.connections=[];
if(A.isIE){this.connections.push(A.connect(document.body,"onfocus",A.hitch(this,"_boomerangFocus")))
}},info:{},destroy:function(){A.forEach(this.connections,function(B){A.disconnect(B)
})
},cellFocus:function(C,B){if(this.grid.singleClickEdit||this.isEditRow(B)){this.setEditCell(C,B)
}else{this.apply()
}if(this.isEditing()||(C&&(C.editor||0).alwaysOn)){this._focusEditor(C,B)
}},rowClick:function(B){if(this.isEditing()&&!this.isEditRow(B.rowIndex)){this.apply()
}},styleRow:function(B){if(B.index==this.info.rowIndex){B.customClasses+=" dojoxGrid-row-editing"
}},dispatchEvent:function(D){var B=D.cell,C=B&&B.editor;
return C&&C.dispatchEvent(D.dispatch,D)
},isEditing:function(){return this.info.rowIndex!==undefined
},isEditCell:function(B,C){return(this.info.rowIndex===B)&&(this.info.cell.index==C)
},isEditRow:function(B){return this.info.rowIndex===B
},setEditCell:function(C,B){if(!this.isEditCell(B,C.index)){this.start(C,B,this.isEditRow(B)||C.editor)
}},_focusEditor:function(C,B){dojox.grid.fire(C.editor,"focus",[B])
},focusEditor:function(){if(this.isEditing()){this._focusEditor(this.info.cell,this.info.rowIndex)
}},_boomerangWindow:500,_shouldCatchBoomerang:function(){return this._catchBoomerang>new Date().getTime()
},_boomerangFocus:function(){if(this._shouldCatchBoomerang()){this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0
}},_doCatchBoomerang:function(){if(A.isIE){this._catchBoomerang=new Date().getTime()+this._boomerangWindow
}},start:function(C,B,D){this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(B)){this.applyRowEdit();
this.grid.updateRow(B)
}if(D){this.info={cell:C,rowIndex:B};
this.grid.doStartEdit(C,B);
this.grid.updateRow(B)
}else{this.info={}
}this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(C,B);
this._doCatchBoomerang()
},_editorDo:function(C){var B=this.info.cell;
B&&B.editor&&B.editor[C](this.info.rowIndex)
},editorApply:function(){this._editorDo("apply")
},editorCancel:function(){this._editorDo("cancel")
},applyCellEdit:function(C,D,B){this.grid.doApplyCellEdit(C,B,D.fieldIndex)
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
}},save:function(D,C){var B=this.info.cell;
if(this.isEditRow(D)&&(!C||B.view==C)&&B.editor){B.editor.save(B,this.info.rowIndex)
}},restore:function(C,D){var B=this.info.cell;
if(this.isEditRow(D)&&B.view==C&&B.editor){B.editor.restore(B,this.info.rowIndex)
}}})
}}});