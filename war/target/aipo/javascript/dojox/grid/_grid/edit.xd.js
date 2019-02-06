dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.edit"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.edit"]){A._hasResource["dojox.grid._grid.edit"]=true;
A.provide("dojox.grid._grid.edit");
A.declare("dojox.grid.edit",null,{constructor:function(B){this.grid=B;
this.connections=[];
if(A.isIE){this.connections.push(A.connect(document.body,"onfocus",A.hitch(this,"_boomerangFocus")))
}},info:{},destroy:function(){A.forEach(this.connections,function(B){A.disconnect(B)
})
},cellFocus:function(B,C){if(this.grid.singleClickEdit||this.isEditRow(C)){this.setEditCell(B,C)
}else{this.apply()
}if(this.isEditing()||(B&&(B.editor||0).alwaysOn)){this._focusEditor(B,C)
}},rowClick:function(B){if(this.isEditing()&&!this.isEditRow(B.rowIndex)){this.apply()
}},styleRow:function(B){if(B.index==this.info.rowIndex){B.customClasses+=" dojoxGrid-row-editing"
}},dispatchEvent:function(C){var D=C.cell,B=D&&D.editor;
return B&&B.dispatchEvent(C.dispatch,C)
},isEditing:function(){return this.info.rowIndex!==undefined
},isEditCell:function(C,B){return(this.info.rowIndex===C)&&(this.info.cell.index==B)
},isEditRow:function(B){return this.info.rowIndex===B
},setEditCell:function(B,C){if(!this.isEditCell(C,B.index)){this.start(B,C,this.isEditRow(C)||B.editor)
}},_focusEditor:function(B,C){dojox.grid.fire(B.editor,"focus",[C])
},focusEditor:function(){if(this.isEditing()){this._focusEditor(this.info.cell,this.info.rowIndex)
}},_boomerangWindow:500,_shouldCatchBoomerang:function(){return this._catchBoomerang>new Date().getTime()
},_boomerangFocus:function(){if(this._shouldCatchBoomerang()){this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0
}},_doCatchBoomerang:function(){if(A.isIE){this._catchBoomerang=new Date().getTime()+this._boomerangWindow
}},start:function(B,D,C){this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(D)){this.applyRowEdit();
this.grid.updateRow(D)
}if(C){this.info={cell:B,rowIndex:D};
this.grid.doStartEdit(B,D);
this.grid.updateRow(D)
}else{this.info={}
}this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(B,D);
this._doCatchBoomerang()
},_editorDo:function(B){var C=this.info.cell;
C&&C.editor&&C.editor[B](this.info.rowIndex)
},editorApply:function(){this._editorDo("apply")
},editorCancel:function(){this._editorDo("cancel")
},applyCellEdit:function(B,C,D){this.grid.doApplyCellEdit(B,D,C.fieldIndex)
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
}},save:function(C,B){var D=this.info.cell;
if(this.isEditRow(C)&&(!B||D.view==B)&&D.editor){D.editor.save(D,this.info.rowIndex)
}},restore:function(B,C){var D=this.info.cell;
if(this.isEditRow(C)&&D.view==B&&D.editor){D.editor.restore(D,this.info.rowIndex)
}}})
}}});