if(!dojo._hasResource["dojox.grid.Grid"]){dojo._hasResource["dojox.grid.Grid"]=true;
dojo.provide("dojox.grid.Grid");
dojo.require("dojox.grid.VirtualGrid");
dojo.require("dojox.grid._data.model");
dojo.require("dojox.grid._data.editors");
dojo.declare("dojox.Grid",dojox.VirtualGrid,{model:"dojox.grid.data.Table",postCreate:function(){if(this.model){var A=this.model;
if(dojo.isString(A)){A=dojo.getObject(A)
}this.model=(dojo.isFunction(A))?new A():A;
this._setModel(this.model)
}this.inherited(arguments)
},destroy:function(){this.setModel(null);
this.inherited(arguments)
},_structureChanged:function(){this.indexCellFields();
this.inherited(arguments)
},_setModel:function(A){this.model=A;
if(this.model){this.model.observer(this);
this.model.measure();
this.indexCellFields()
}},setModel:function(A){if(this.model){this.model.notObserver(this)
}this._setModel(A)
},get:function(A){return this.grid.model.getDatum(A,this.fieldIndex)
},modelAllChange:function(){this.rowCount=(this.model?this.model.getRowCount():0);
this.updateRowCount(this.rowCount)
},modelRowChange:function(A,B){this.updateRow(B)
},modelDatumChange:function(C,B,A){this.updateRow(B)
},modelFieldsChange:function(){this.indexCellFields();
this.render()
},modelInsertion:function(A){this.updateRowCount(this.model.getRowCount())
},modelRemoval:function(A){this.updateRowCount(this.model.getRowCount())
},getCellName:function(C){var A=this.model.fields.values,B=C.fieldIndex;
return B>=0&&B<A.length&&A[B].name||this.inherited(arguments)
},indexCellFields:function(){var A=this.layout.cells;
for(var B=0,C;
A&&(C=A[B]);
B++){if(dojo.isString(C.field)){C.fieldIndex=this.model.fields.indexOf(C.field)
}}},refresh:function(){this.edit.cancel();
this.model.measure()
},canSort:function(A){var B=this.getSortField(A);
return B&&this.model.canSort(B)
},getSortField:function(A){var B=this.getCell(this.getSortIndex(A));
return(B.fieldIndex+1)*(this.sortInfo>0?1:-1)
},sort:function(){this.edit.apply();
this.model.sort(this.getSortField())
},addRow:function(A,E){this.edit.apply();
var C=E||-1;
if(C<0){C=this.selection.getFirstSelected()||0
}if(C<0){C=0
}this.model.insert(A,C);
this.model.beginModifyRow(C);
for(var B=0,D;
((D=this.getCell(B))&&!D.editor);
B++){}if(D&&D.editor){this.edit.setEditCell(D,C)
}},removeSelectedRows:function(){this.edit.apply();
var A=this.selection.getSelected();
if(A.length){this.model.remove(A);
this.selection.clear()
}},canEdit:function(A,B){return(this.model.canModify?this.model.canModify(B):true)
},doStartEdit:function(A,C){var B=this.canEdit(A,C);
if(B){this.model.beginModifyRow(C);
this.onStartEdit(A,C)
}return B
},doApplyCellEdit:function(A,C,B){this.model.setDatum(A,C,B);
this.onApplyCellEdit(A,C,B)
},doCancelEdit:function(A){this.model.cancelModifyRow(A);
this.onCancelEdit.apply(this,arguments)
},doApplyEdit:function(A){this.model.endModifyRow(A);
this.onApplyEdit(A)
},styleRowState:function(E){if(this.model.getState){var A=this.model.getState(E.index),F="";
for(var C=0,B=["inflight","error","inserting"],D;
D=B[C];
C++){if(A[D]){F=" dojoxGrid-row-"+D;
break
}}E.customClasses+=F
}},onStyleRow:function(A){this.styleRowState(A);
this.inherited(arguments)
},junk:0})
};