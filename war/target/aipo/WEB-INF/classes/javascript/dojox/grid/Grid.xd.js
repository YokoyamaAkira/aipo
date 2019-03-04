dojo._xdResourceLoaded({depends:[["provide","dojox.grid.Grid"],["require","dojox.grid.VirtualGrid"],["require","dojox.grid._data.model"],["require","dojox.grid._data.editors"]],defineResource:function(A){if(!A._hasResource["dojox.grid.Grid"]){A._hasResource["dojox.grid.Grid"]=true;
A.provide("dojox.grid.Grid");
A.require("dojox.grid.VirtualGrid");
A.require("dojox.grid._data.model");
A.require("dojox.grid._data.editors");
A.declare("dojox.Grid",dojox.VirtualGrid,{model:"dojox.grid.data.Table",postCreate:function(){if(this.model){var B=this.model;
if(A.isString(B)){B=A.getObject(B)
}this.model=(A.isFunction(B))?new B():B;
this._setModel(this.model)
}this.inherited(arguments)
},destroy:function(){this.setModel(null);
this.inherited(arguments)
},_structureChanged:function(){this.indexCellFields();
this.inherited(arguments)
},_setModel:function(B){this.model=B;
if(this.model){this.model.observer(this);
this.model.measure();
this.indexCellFields()
}},setModel:function(B){if(this.model){this.model.notObserver(this)
}this._setModel(B)
},get:function(B){return this.grid.model.getDatum(B,this.fieldIndex)
},modelAllChange:function(){this.rowCount=(this.model?this.model.getRowCount():0);
this.updateRowCount(this.rowCount)
},modelRowChange:function(B,C){this.updateRow(C)
},modelDatumChange:function(D,C,B){this.updateRow(C)
},modelFieldsChange:function(){this.indexCellFields();
this.render()
},modelInsertion:function(B){this.updateRowCount(this.model.getRowCount())
},modelRemoval:function(B){this.updateRowCount(this.model.getRowCount())
},getCellName:function(D){var B=this.model.fields.values,C=D.fieldIndex;
return C>=0&&C<B.length&&B[C].name||this.inherited(arguments)
},indexCellFields:function(){var B=this.layout.cells;
for(var C=0,D;
B&&(D=B[C]);
C++){if(A.isString(D.field)){D.fieldIndex=this.model.fields.indexOf(D.field)
}}},refresh:function(){this.edit.cancel();
this.model.measure()
},canSort:function(B){var C=this.getSortField(B);
return C&&this.model.canSort(C)
},getSortField:function(B){var C=this.getCell(this.getSortIndex(B));
return(C.fieldIndex+1)*(this.sortInfo>0?1:-1)
},sort:function(){this.edit.apply();
this.model.sort(this.getSortField())
},addRow:function(B,F){this.edit.apply();
var D=F||-1;
if(D<0){D=this.selection.getFirstSelected()||0
}if(D<0){D=0
}this.model.insert(B,D);
this.model.beginModifyRow(D);
for(var C=0,E;
((E=this.getCell(C))&&!E.editor);
C++){}if(E&&E.editor){this.edit.setEditCell(E,D)
}},removeSelectedRows:function(){this.edit.apply();
var B=this.selection.getSelected();
if(B.length){this.model.remove(B);
this.selection.clear()
}},canEdit:function(B,C){return(this.model.canModify?this.model.canModify(C):true)
},doStartEdit:function(B,D){var C=this.canEdit(B,D);
if(C){this.model.beginModifyRow(D);
this.onStartEdit(B,D)
}return C
},doApplyCellEdit:function(B,D,C){this.model.setDatum(B,D,C);
this.onApplyCellEdit(B,D,C)
},doCancelEdit:function(B){this.model.cancelModifyRow(B);
this.onCancelEdit.apply(this,arguments)
},doApplyEdit:function(B){this.model.endModifyRow(B);
this.onApplyEdit(B)
},styleRowState:function(F){if(this.model.getState){var B=this.model.getState(F.index),G="";
for(var D=0,C=["inflight","error","inserting"],E;
E=C[D];
D++){if(B[E]){G=" dojoxGrid-row-"+E;
break
}}F.customClasses+=G
}},onStyleRow:function(B){this.styleRowState(B);
this.inherited(arguments)
},junk:0})
}}});