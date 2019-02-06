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
},modelRowChange:function(B,A){this.updateRow(A)
},modelDatumChange:function(B,A,C){this.updateRow(A)
},modelFieldsChange:function(){this.indexCellFields();
this.render()
},modelInsertion:function(A){this.updateRowCount(this.model.getRowCount())
},modelRemoval:function(A){this.updateRowCount(this.model.getRowCount())
},getCellName:function(B){var C=this.model.fields.values,A=B.fieldIndex;
return A>=0&&A<C.length&&C[A].name||this.inherited(arguments)
},indexCellFields:function(){var C=this.layout.cells;
for(var A=0,B;
C&&(B=C[A]);
A++){if(dojo.isString(B.field)){B.fieldIndex=this.model.fields.indexOf(B.field)
}}},refresh:function(){this.edit.cancel();
this.model.measure()
},canSort:function(B){var A=this.getSortField(B);
return A&&this.model.canSort(A)
},getSortField:function(B){var A=this.getCell(this.getSortIndex(B));
return(A.fieldIndex+1)*(this.sortInfo>0?1:-1)
},sort:function(){this.edit.apply();
this.model.sort(this.getSortField())
},addRow:function(E,D){this.edit.apply();
var B=D||-1;
if(B<0){B=this.selection.getFirstSelected()||0
}if(B<0){B=0
}this.model.insert(E,B);
this.model.beginModifyRow(B);
for(var A=0,C;
((C=this.getCell(A))&&!C.editor);
A++){}if(C&&C.editor){this.edit.setEditCell(C,B)
}},removeSelectedRows:function(){this.edit.apply();
var A=this.selection.getSelected();
if(A.length){this.model.remove(A);
this.selection.clear()
}},canEdit:function(B,A){return(this.model.canModify?this.model.canModify(A):true)
},doStartEdit:function(C,B){var A=this.canEdit(C,B);
if(A){this.model.beginModifyRow(B);
this.onStartEdit(C,B)
}return A
},doApplyCellEdit:function(C,B,A){this.model.setDatum(C,B,A);
this.onApplyCellEdit(C,B,A)
},doCancelEdit:function(A){this.model.cancelModifyRow(A);
this.onCancelEdit.apply(this,arguments)
},doApplyEdit:function(A){this.model.endModifyRow(A);
this.onApplyEdit(A)
},styleRowState:function(D){if(this.model.getState){var F=this.model.getState(D.index),E="";
for(var B=0,A=["inflight","error","inserting"],C;
C=A[B];
B++){if(F[C]){E=" dojoxGrid-row-"+C;
break
}}D.customClasses+=E
}},onStyleRow:function(A){this.styleRowState(A);
this.inherited(arguments)
},junk:0})
};