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
},modelRowChange:function(C,B){this.updateRow(B)
},modelDatumChange:function(B,D,C){this.updateRow(D)
},modelFieldsChange:function(){this.indexCellFields();
this.render()
},modelInsertion:function(B){this.updateRowCount(this.model.getRowCount())
},modelRemoval:function(B){this.updateRowCount(this.model.getRowCount())
},getCellName:function(B){var C=this.model.fields.values,D=B.fieldIndex;
return D>=0&&D<C.length&&C[D].name||this.inherited(arguments)
},indexCellFields:function(){var C=this.layout.cells;
for(var D=0,B;
C&&(B=C[D]);
D++){if(A.isString(B.field)){B.fieldIndex=this.model.fields.indexOf(B.field)
}}},refresh:function(){this.edit.cancel();
this.model.measure()
},canSort:function(C){var B=this.getSortField(C);
return B&&this.model.canSort(B)
},getSortField:function(C){var B=this.getCell(this.getSortIndex(C));
return(B.fieldIndex+1)*(this.sortInfo>0?1:-1)
},sort:function(){this.edit.apply();
this.model.sort(this.getSortField())
},addRow:function(C,B){this.edit.apply();
var E=B||-1;
if(E<0){E=this.selection.getFirstSelected()||0
}if(E<0){E=0
}this.model.insert(C,E);
this.model.beginModifyRow(E);
for(var D=0,F;
((F=this.getCell(D))&&!F.editor);
D++){}if(F&&F.editor){this.edit.setEditCell(F,E)
}},removeSelectedRows:function(){this.edit.apply();
var B=this.selection.getSelected();
if(B.length){this.model.remove(B);
this.selection.clear()
}},canEdit:function(C,B){return(this.model.canModify?this.model.canModify(B):true)
},doStartEdit:function(C,B){var D=this.canEdit(C,B);
if(D){this.model.beginModifyRow(B);
this.onStartEdit(C,B)
}return D
},doApplyCellEdit:function(C,B,D){this.model.setDatum(C,B,D);
this.onApplyCellEdit(C,B,D)
},doCancelEdit:function(B){this.model.cancelModifyRow(B);
this.onCancelEdit.apply(this,arguments)
},doApplyEdit:function(B){this.model.endModifyRow(B);
this.onApplyEdit(B)
},styleRowState:function(G){if(this.model.getState){var C=this.model.getState(G.index),B="";
for(var E=0,D=["inflight","error","inserting"],F;
F=D[E];
E++){if(C[F]){B=" dojoxGrid-row-"+F;
break
}}G.customClasses+=B
}},onStyleRow:function(B){this.styleRowState(B);
this.inherited(arguments)
},junk:0})
}}});